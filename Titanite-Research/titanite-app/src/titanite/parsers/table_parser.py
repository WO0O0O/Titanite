"""
TABLE.md parser.

Reads the master research index from docs/TABLE.md and returns a list of
ResearchedCompany objects.

The TABLE.md format uses a markdown table with columns:
  Ticker | Company Name | Score & Tier | Industry (Folder) | Key Summary
"""
from __future__ import annotations

import re
from pathlib import Path

from titanite.models.portfolio import ResearchedCompany, Tier, Framework


def parse_table_md(table_path: Path) -> list[ResearchedCompany]:
    """
    Parse docs/TABLE.md into a list of ResearchedCompany objects.

    Handles the formatted score strings like:
      "13 / 13 (Tier 1)", "11.5 / 13 (Tier 1)", "4 / 13 (Pass)"
    """
    content = table_path.read_text(encoding="utf-8")
    companies: list[ResearchedCompany] = []

    for line in content.splitlines():
        # Match table data rows — must start with | and contain a ticker in **bold**
        if not line.startswith("|") or "**" not in line:
            continue

        # Split and clean columns
        cols = [c.strip() for c in line.split("|") if c.strip()]
        if len(cols) < 4:
            continue

        ticker_col = cols[0]
        company_col = cols[1]
        score_col = cols[2]
        industry_col = cols[3]
        summary_col = cols[4] if len(cols) > 4 else ""

        # Extract ticker from **TICKER** markdown
        ticker_match = re.search(r"\*\*([A-Z0-9.]+)\*\*", ticker_col)
        if not ticker_match:
            continue
        ticker = ticker_match.group(1)

        # Extract company name (strip markdown bold)
        company_name = re.sub(r"\*\*|\*", "", company_col).strip()

        # Parse score: "13 / 13 (Tier 1)" or "11.5 / 13 (Tier 1)" or "4 / 13 (Pass)"
        score_match = re.search(
            r"([\d.]+)\s*/\s*13\s*\(([^)]+)\)",
            score_col,
        )
        if not score_match:
            continue

        score = float(score_match.group(1))
        tier_str = score_match.group(2).strip()

        # Map tier string to Tier enum
        tier_map: dict[str, Tier] = {
            "Tier 1": Tier.TIER_1,
            "Tier 2": Tier.TIER_2,
            "Tier 3": Tier.TIER_3,
            "Pass": Tier.PASS,
            "Disqualified": Tier.DISQUALIFIED,
        }
        tier = tier_map.get(tier_str, Tier.PASS)

        # Clean industry folder
        industry_folder = re.sub(r"\*\*|\*", "", industry_col).strip()

        # Clean summary (strip markdown bold)
        key_summary = re.sub(r"\*\*|\*", "", summary_col).strip()

        companies.append(
            ResearchedCompany(
                ticker=ticker,
                company_name=company_name,
                score=score,
                tier=tier,
                industry_folder=industry_folder,
                framework=Framework.SC_AI_INFRA,
                key_summary=key_summary,
            )
        )

    return companies
