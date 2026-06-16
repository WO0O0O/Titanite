"""
SEC EDGAR XBRL API client.

Fetches quarterly financial data for US-listed companies using the free
SEC EDGAR XBRL REST API (no API key required, no rate-limit if User-Agent is set).

API documentation: https://www.sec.gov/developer

Key endpoints used:
  - /submissions/{cik}.json  → company metadata, including ticker → CIK mapping
  - /api/xbrl/companyfacts/{cik}.json → all XBRL-tagged facts for a company
"""
from __future__ import annotations

import asyncio
import json
import time
from pathlib import Path
from typing import Any

import httpx
from rich.console import Console

from titanite import config
from titanite.models.extraction_buffer import CalculatedRatios, WorkingCapitalMetrics

console = Console()

# SEC rate limit: 10 requests/second. We stay conservative at 5 req/s.
_REQUEST_DELAY_S = 0.2

# Cache directory for raw API responses (avoids re-fetching on repeated runs)
_CACHE_DIR = Path(__file__).parent.parent.parent.parent / ".cache" / "sec_edgar"
_CACHE_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# XBRL concept names for the metrics we need
# Follows US-GAAP taxonomy (most US-listed companies)
# ---------------------------------------------------------------------------
XBRL_CONCEPTS: dict[str, list[str]] = {
    # Revenue — try multiple concept names as companies use different ones
    "revenue": [
        "Revenues",
        "RevenueFromContractWithCustomerExcludingAssessedTax",
        "RevenueFromContractWithCustomerIncludingAssessedTax",
        "SalesRevenueNet",
        "SalesRevenueGoodsNet",
    ],
    # Accounts receivable (net)
    "accounts_receivable": [
        "AccountsReceivableNetCurrent",
        "AccountsReceivableNet",
        "ReceivablesNetCurrent",
    ],
    # Contract assets / unbilled receivables
    "contract_assets": [
        "ContractWithCustomerAssetNetCurrent",
        "ContractWithCustomerAssetNet",
        "UnbilledReceivablesNotBillableAtBalanceSheetDate",
    ],
    # Inventories
    "inventories": [
        "InventoryNet",
        "InventoryFinishedGoodsNetOfReserves",
    ],
    # Capitalised software (red flag if inflating)
    "capitalised_software": [
        "CapitalizedComputerSoftwareNet",
        "CapitalizedComputerSoftwareGross",
    ],
    # Operating lease liabilities (ASC 842)
    "operating_lease_liabilities": [
        "OperatingLeaseLiabilityCurrent",
        "OperatingLeaseLiability",
    ],
}


class SECEdgarClient:
    """Async client for the SEC EDGAR XBRL API."""

    def __init__(self) -> None:
        self._client = httpx.AsyncClient(
            headers=config.SEC_EDGAR_HEADERS,
            timeout=30.0,
            follow_redirects=True,
        )

    async def __aenter__(self) -> "SECEdgarClient":
        return self

    async def __aexit__(self, *args: Any) -> None:
        await self._client.aclose()

    async def _get(self, url: str) -> dict[str, Any]:
        """GET with caching and rate limiting."""
        cache_key = url.replace("/", "_").replace(":", "").replace(".", "_") + ".json"
        cache_file = _CACHE_DIR / cache_key

        if cache_file.exists():
            console.print(f"  [dim]Cache hit: {cache_file.name}[/dim]")
            return json.loads(cache_file.read_text())

        time.sleep(_REQUEST_DELAY_S)
        response = await self._client.get(url)
        response.raise_for_status()
        data: dict[str, Any] = response.json()
        cache_file.write_text(json.dumps(data, indent=2))
        return data

    async def get_cik(self, ticker: str) -> str:
        """
        Resolve a ticker symbol to a zero-padded 10-digit CIK.

        Uses the SEC EDGAR company tickers endpoint.
        Returns CIK as a zero-padded string, e.g. "0001234567".
        """
        url = f"{config.SEC_EDGAR_BASE_URL}/submissions/CIK0000000000.json"
        # Use the ticker lookup endpoint
        ticker_url = "https://www.sec.gov/files/company_tickers.json"
        data = await self._get(ticker_url)

        ticker_upper = ticker.upper()
        for _idx, entry in data.items():
            if entry.get("ticker", "").upper() == ticker_upper:
                cik = str(entry["cik_str"]).zfill(10)
                console.print(f"  Resolved [bold]{ticker_upper}[/bold] → CIK {cik}")
                return cik

        raise ValueError(
            f"Ticker '{ticker}' not found in SEC EDGAR. "
            f"The company may be foreign-listed or use a different ticker on EDGAR."
        )

    async def get_company_facts(self, cik: str) -> dict[str, Any]:
        """Fetch all XBRL facts for a company."""
        url = f"{config.SEC_EDGAR_BASE_URL}/api/xbrl/companyfacts/CIK{cik}.json"
        console.print(f"  Fetching XBRL facts for CIK {cik}…")
        return await self._get(url)

    def _extract_quarterly_values(
        self,
        facts: dict[str, Any],
        concept_names: list[str],
        n_quarters: int = 3,
    ) -> list[float]:
        """
        Extract the most recent `n_quarters` quarterly values for a set of
        XBRL concept names (tries each in order until one returns data).

        Returns a list of floats (oldest → newest), zero-padded if data is
        unavailable for a quarter.
        """
        us_gaap = facts.get("facts", {}).get("us-gaap", {})

        for concept in concept_names:
            concept_data = us_gaap.get(concept, {})
            units = concept_data.get("units", {})

            # Most financial facts are reported in USD
            usd_data = units.get("USD", [])
            if not usd_data:
                continue

            # Filter to quarterly (10-Q) filings only; exclude annual (10-K)
            # SEC uses 'form' field: '10-Q', '10-K', '10-Q/A', etc.
            quarterly = [
                entry for entry in usd_data
                if entry.get("form", "").startswith("10-Q")
                and entry.get("fp", "").startswith("Q")  # Q1, Q2, Q3
            ]

            if not quarterly:
                # Fall back to all filings if no 10-Q specific data
                quarterly = [
                    entry for entry in usd_data
                    if entry.get("fp", "").startswith("Q")
                ]

            if not quarterly:
                continue

            # Sort by end date descending and take the most recent n_quarters
            quarterly_sorted = sorted(
                quarterly,
                key=lambda x: x.get("end", ""),
                reverse=True,
            )
            # Deduplicate by end date (amended filings may duplicate)
            seen_dates: set[str] = set()
            deduped: list[dict[str, Any]] = []
            for entry in quarterly_sorted:
                end = entry.get("end", "")
                if end not in seen_dates:
                    seen_dates.add(end)
                    deduped.append(entry)

            recent = deduped[:n_quarters]
            # Return oldest → newest (reverse the descending sort)
            values = [float(entry.get("val", 0.0)) for entry in reversed(recent)]

            # Pad with zeros if fewer than n_quarters are available
            while len(values) < n_quarters:
                values.insert(0, 0.0)

            return values

        # Concept not found in any name variant — return zeros
        console.print(
            f"  [yellow]Warning:[/yellow] Could not find data for concepts: "
            f"{concept_names}. Returning zeros."
        )
        return [0.0] * n_quarters

    def _extract_quarter_labels(
        self,
        facts: dict[str, Any],
        n_quarters: int = 3,
    ) -> list[str]:
        """
        Derive quarter labels (e.g. 'Q1 2026') from the revenue concept's
        most recent quarterly filings.
        """
        us_gaap = facts.get("facts", {}).get("us-gaap", {})

        for concept in XBRL_CONCEPTS["revenue"]:
            concept_data = us_gaap.get(concept, {})
            usd_data = concept_data.get("units", {}).get("USD", [])

            quarterly = [
                entry for entry in usd_data
                if entry.get("form", "").startswith("10-Q")
                and entry.get("fp", "").startswith("Q")
            ]
            if not quarterly:
                continue

            quarterly_sorted = sorted(quarterly, key=lambda x: x.get("end", ""), reverse=True)

            # Deduplicate
            seen: set[str] = set()
            deduped = []
            for entry in quarterly_sorted:
                end = entry.get("end", "")
                if end not in seen:
                    seen.add(end)
                    deduped.append(entry)

            recent = list(reversed(deduped[:n_quarters]))
            labels = []
            for entry in recent:
                fp = entry.get("fp", "Qx")  # e.g. "Q1"
                fy = entry.get("fy", "????")  # fiscal year
                labels.append(f"{fp} {fy}")
            while len(labels) < n_quarters:
                labels.insert(0, "N/A")
            return labels

        return ["N/A", "N/A", "N/A"]


def _calculate_dso(ar: list[float], revenue: list[float]) -> list[float]:
    """
    DSO = (AR / quarterly_revenue) * 90 days.

    Per SC-AI-EXTRACTOR.md formula. Returns 0.0 where revenue is zero.
    """
    result = []
    for ar_val, rev_val in zip(ar, revenue):
        if rev_val > 0:
            result.append(round((ar_val / rev_val) * 90, 1))
        else:
            result.append(0.0)
    return result


def _calculate_receivables_growth_vs_revenue_growth(
    ar: list[float], revenue: list[float]
) -> float:
    """
    Delta % check: AR growth rate (Q-1 → Current) minus revenue growth rate.

    Positive values indicate AR growing faster than revenue — potential red flag.
    """
    if len(ar) < 2 or len(revenue) < 2:
        return 0.0

    prev_ar, curr_ar = ar[-2], ar[-1]
    prev_rev, curr_rev = revenue[-2], revenue[-1]

    ar_growth = ((curr_ar - prev_ar) / prev_ar * 100) if prev_ar > 0 else 0.0
    rev_growth = ((curr_rev - prev_rev) / prev_rev * 100) if prev_rev > 0 else 0.0

    return round(ar_growth - rev_growth, 2)


def _calculate_contract_assets_pct(
    contract_assets: list[float], ar: list[float]
) -> float:
    """
    contract_assets[-1] / (AR[-1] + contract_assets[-1]) * 100.

    Uses most recent quarter only per the framework rules.
    Flag if >30% AND company is post-revenue with >$50M TTM revenue.
    """
    ca = contract_assets[-1] if contract_assets else 0.0
    ar_curr = ar[-1] if ar else 0.0
    total = ar_curr + ca
    if total > 0:
        return round((ca / total) * 100, 2)
    return 0.0


def _calculate_inventory_to_backlog(
    inventories: list[float], backlog_binding: list[float]
) -> float:
    """inventory[-1] / backlog_binding[-1]. Flag if >0.5."""
    inv = inventories[-1] if inventories else 0.0
    backlog = backlog_binding[-1] if backlog_binding else 0.0
    if backlog > 0:
        return round(inv / backlog, 4)
    return 0.0


def _build_dso_working(
    ar: list[float], revenue: list[float], quarters: list[str]
) -> str:
    """Generate the math scratchpad string matching the MRLN buffer format."""
    lines = ["DSO calculated as (AR / quarterly revenue) * 90 days."]
    for i, (q, ar_val, rev_val) in enumerate(zip(quarters, ar, revenue)):
        if rev_val > 0:
            dso = round((ar_val / rev_val) * 90, 1)
            lines.append(f"For {q}: DSO = ({ar_val:,.0f} / {rev_val:,.0f}) * 90 = {dso} days.")
        else:
            lines.append(f"For {q}: revenue is zero, DSO = 0.0 days.")
    return " ".join(lines)


async def extract_financials(ticker: str) -> tuple[WorkingCapitalMetrics, CalculatedRatios]:
    """
    Main entry point: fetch and compute all financial metrics for a ticker.

    Returns:
        (WorkingCapitalMetrics, CalculatedRatios) — ready to populate an ExtractionBuffer.
    """
    async with SECEdgarClient() as client:
        cik = await client.get_cik(ticker)
        facts = await client.get_company_facts(cik)

        revenue = client._extract_quarterly_values(facts, XBRL_CONCEPTS["revenue"])
        ar = client._extract_quarterly_values(facts, XBRL_CONCEPTS["accounts_receivable"])
        contract_assets = client._extract_quarterly_values(facts, XBRL_CONCEPTS["contract_assets"])
        inventories = client._extract_quarterly_values(facts, XBRL_CONCEPTS["inventories"])
        cap_software = client._extract_quarterly_values(facts, XBRL_CONCEPTS["capitalised_software"])
        op_lease = client._extract_quarterly_values(facts, XBRL_CONCEPTS["operating_lease_liabilities"])
        quarters = client._extract_quarter_labels(facts)

    # Calculated ratios
    dso = _calculate_dso(ar, revenue)
    ar_growth_vs_rev = _calculate_receivables_growth_vs_revenue_growth(ar, revenue)
    ca_pct = _calculate_contract_assets_pct(contract_assets, ar)
    inv_to_backlog = 0.0  # backlog not available from EDGAR — must be set manually

    scratchpad = _build_dso_working(ar, revenue, quarters)

    wc_metrics = WorkingCapitalMetrics(
        reporting_currency="USD",
        usd_exchange_rate_used=1.0,
        quarters=quarters,
        revenue_converted_to_usd=revenue,
        accounts_receivable_converted_to_usd=ar,
        contract_assets_unbilled_converted_to_usd=contract_assets,
        inventories_converted_to_usd=inventories,
        stated_backlog_firm_binding_usd=[0.0, 0.0, 0.0],        # Must be set from transcript
        stated_backlog_non_binding_loi_usd=[0.0, 0.0, 0.0],     # Must be set from transcript
        projected_12m_backlog_drawdown_velocity_usd=0.0,         # Must be set from transcript
        average_contract_duration_months=0,                       # Must be set from transcript
        capitalised_software_balance_sheet_usd=cap_software[-1] if cap_software else 0.0,
        physical_hardware_assets_usd=0.0,
        operating_lease_liabilities_asc842_usd=op_lease[-1] if op_lease else 0.0,
        crypto_validation_revenue_pct=0.0,
    )

    calc_ratios = CalculatedRatios(
        math_scratchpad_and_workings=scratchpad,
        receivables_growth_vs_revenue_growth_pct=ar_growth_vs_rev,
        days_sales_outstanding_dso=dso,
        contract_assets_pct_receivables=ca_pct,
        inventory_to_binding_backlog_ratio=inv_to_backlog,
    )

    return wc_metrics, calc_ratios


# ---------------------------------------------------------------------------
# Convenience sync wrapper for CLI use
# ---------------------------------------------------------------------------
def extract_financials_sync(ticker: str) -> tuple[WorkingCapitalMetrics, CalculatedRatios]:
    return asyncio.run(extract_financials(ticker))
