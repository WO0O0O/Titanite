"""
Batch research updater for Titanite Research.

Processes active ticker batches defined in active_batch.json, pulls financial data,
and updates corresponding extraction buffer markdown files.
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, cast

from titanite import config
from titanite.extractors.sec_edgar import extract_financials_sync
from titanite.models.extraction_buffer import CalculatedRatios, WorkingCapitalMetrics


def load_active_batch_config(config_path: Optional[Path] = None) -> Dict[str, Any]:
    """Load active batch configuration file."""
    if config_path is None:
        config_path = config.RESEARCH_NOTES_DIR / "active_batch.json"

    if not config_path.exists():
        raise FileNotFoundError(f"Active batch configuration not found at: {config_path}")

    with open(config_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        return cast(Dict[str, Any], data)


def find_target_markdown_file(ticker: str) -> Path:
    """
    Locate the target extraction buffer or research note file for a given ticker.
    Searches config industry directories or falls back to notes directory.
    """
    try:
        buf_path = config.get_buffer_path(ticker)
        if buf_path.exists():
            return buf_path
        # Search parent industry dir for any matching ticker markdown file
        ind_dir = config.get_industry_dir(ticker)
        if ind_dir.exists():
            for p in ind_dir.glob("*.md"):
                if ticker.upper() in p.name.upper():
                    return p
            return buf_path
    except ValueError:
        pass

    # Fallback search across whole RESEARCH_NOTES_DIR directory
    if config.RESEARCH_NOTES_DIR.exists():
        for p in config.RESEARCH_NOTES_DIR.rglob("*.md"):
            if ticker.upper() in p.name.upper():
                return p

    return config.RESEARCH_NOTES_DIR / f"{ticker.upper()}-EXTRACTION-BUFFER.md"


def format_biweekly_update_markdown(
    ticker: str,
    wc_metrics: WorkingCapitalMetrics,
    calc_ratios: CalculatedRatios,
) -> str:
    """Format extracted SEC metrics into a standardized bi-weekly update markdown block."""
    today_str = datetime.now().strftime("%Y-%m-%d")

    def _fmt_money(val: float | None) -> str:
        if val is None:
            return "N/A"
        if abs(val) >= 1_000_000:
            return f"${val/1_000_000:.1f}M"
        if abs(val) >= 1_000:
            return f"${val/1_000:.0f}K"
        return f"${val:.0f}"

    rev_str = (
        ", ".join(_fmt_money(v) for v in wc_metrics.revenue_converted_to_usd)
        if wc_metrics.revenue_converted_to_usd else "N/A"
    )
    ar_str = (
        ", ".join(_fmt_money(v) for v in wc_metrics.accounts_receivable_converted_to_usd)
        if wc_metrics.accounts_receivable_converted_to_usd else "N/A"
    )
    ca_str = (
        ", ".join(_fmt_money(v) for v in wc_metrics.contract_assets_unbilled_converted_to_usd)
        if wc_metrics.contract_assets_unbilled_converted_to_usd else "N/A"
    )
    inv_str = (
        ", ".join(_fmt_money(v) for v in wc_metrics.inventories_converted_to_usd)
        if wc_metrics.inventories_converted_to_usd else "N/A"
    )
    dso_str = (
        ", ".join(f"{d:.1f}" if d is not None else "N/A" for d in calc_ratios.days_sales_outstanding_dso)
        if calc_ratios.days_sales_outstanding_dso else "N/A"
    )

    ar_growth = (
        f"{calc_ratios.receivables_growth_vs_revenue_growth_pct:+.1f}%"
        if calc_ratios.receivables_growth_vs_revenue_growth_pct is not None else "N/A"
    )
    ca_pct = (
        f"{calc_ratios.contract_assets_pct_receivables:.1f}%"
        if calc_ratios.contract_assets_pct_receivables is not None else "N/A"
    )

    lines = [
        f"\n## Bi-Weekly Automated Update — {today_str}",
        f"**Ticker:** {ticker.upper()}",
        f"**Source:** SEC EDGAR XBRL Data\n",
        "### Key Working Capital Metrics",
        "| Metric | Quarters (Latest Last) |",
        "| :--- | :--- |",
        f"| Revenue | {rev_str} |",
        f"| Accounts Receivable | {ar_str} |",
        f"| Contract Assets (Unbilled) | {ca_str} |",
        f"| Inventories | {inv_str} |",
        f"| DSO (Days) | {dso_str} |\n",
        "### Calculated Ratios",
        f"- **AR Growth vs Revenue Growth:** `{ar_growth}`",
        f"- **Contract Assets % of AR:** `{ca_pct}`\n"
    ]

    return "\n".join(lines)


def update_ticker_buffer(ticker: str, markdown_block: str, dry_run: bool = False) -> Path:
    """Find ticker target markdown file and append the bi-weekly update block."""
    target_path = find_target_markdown_file(ticker)

    if dry_run:
        return target_path

    # Ensure parent directory exists
    target_path.parent.mkdir(parents=True, exist_ok=True)

    # Read existing content if file exists
    existing_content = ""
    if target_path.exists():
        with open(target_path, "r", encoding="utf-8") as f:
            existing_content = f.read()

    # Append bi-weekly update block
    new_content = existing_content + "\n" + markdown_block if existing_content else markdown_block

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return target_path


def run_batch_update(config_path: Optional[Path] = None, dry_run: bool = False) -> Dict[str, Any]:
    """Execute bi-weekly research update across all active batch tickers."""
    batch_config = load_active_batch_config(config_path)
    tickers: List[str] = cast(List[str], batch_config.get("activeTickers", []))

    processed_list: List[Dict[str, str]] = []
    failed_list: List[Dict[str, str]] = []

    for ticker in tickers:
        try:
            wc_metrics, calc_ratios = extract_financials_sync(ticker)
            md_block = format_biweekly_update_markdown(ticker, wc_metrics, calc_ratios)
            buf_path = update_ticker_buffer(ticker, md_block, dry_run=dry_run)
            processed_list.append({"ticker": ticker, "path": str(buf_path)})
        except Exception as err:
            failed_list.append({"ticker": ticker, "error": str(err)})

    return {
        "processed": processed_list,
        "failed": failed_list,
        "dry_run": dry_run,
        "timestamp": datetime.now().isoformat(),
    }
