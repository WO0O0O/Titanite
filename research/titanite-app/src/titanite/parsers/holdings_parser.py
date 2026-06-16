"""
TITANITE-HOLDINGS.md parser.

Reads docs/TITANITE-HOLDINGS.md and returns a list of ResearchHolding objects
(ticker, tier, score, account) for use in the frontend enrichment layer.
"""
from __future__ import annotations

import re
from pathlib import Path

from titanite.models.portfolio import ResearchedCompany, Tier


def parse_holdings_md(path: Path, companies: list[ResearchedCompany]) -> list[ResearchedCompany]:
    """
    Cross-reference TITANITE-HOLDINGS.md against the full scored company list.

    Returns only the companies that are currently held (appear in HOLDINGS.md),
    with their research scores and tier attached.

    Args:
        path: Path to TITANITE-HOLDINGS.md
        companies: Full list from parse_table_md (includes score/tier)

    Returns:
        Subset of companies that are current holdings.
    """
    content = path.read_text(encoding="utf-8")
    held_tickers: set[str] = set()

    for line in content.splitlines():
        # Look for ticker patterns: **TICKER** or | TICKER |
        matches = re.findall(r"\*\*([A-Z0-9.]+)\*\*", line)
        for m in matches:
            if len(m) >= 2:  # Skip single chars from markdown formatting
                held_tickers.add(m.upper())

        # Also look for bare tickers in table cells (e.g. `ACCON`)
        if line.startswith("|"):
            cols = [c.strip() for c in line.split("|") if c.strip()]
            for col in cols:
                # Match bare uppercase tickers (2-6 chars, all caps)
                if re.match(r"^[A-Z]{2,6}$", col):
                    held_tickers.add(col)

    # Return the intersection of held tickers and researched companies
    company_map = {c.ticker.upper(): c for c in companies}
    return [company_map[t] for t in held_tickers if t in company_map]
