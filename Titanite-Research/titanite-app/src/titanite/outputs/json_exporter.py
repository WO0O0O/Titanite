"""
JSON exporter — writes Titanite research data to JSON files for Next.js consumption.

Output files are written to the specified output directory (defaults to
`public/research-data/` in the web app). Next.js reads these as static assets.

File format mirrors the TypeScript types in `src/types/research.ts` exactly.
If you change the JSON schema here, update the TypeScript types too.
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from titanite.models.portfolio import CatalystStatus, ResearchedCompany, Catalyst


def _company_to_dict(company: ResearchedCompany) -> dict:
    return {
        "ticker": company.ticker,
        "companyName": company.company_name,
        "score": company.score,
        "tier": company.tier.value,
        "industryFolder": company.industry_folder,
        "keySummary": company.key_summary,
        "framework": company.framework.value,
    }


def _catalyst_to_dict(catalyst: Catalyst) -> dict:
    return {
        "ticker": catalyst.ticker,
        "description": catalyst.description,
        "expectedDate": catalyst.expected_date,
        "confidence": catalyst.confidence.value,
        "status": catalyst.status.value,
        "thesisImpact": catalyst.thesis_impact,
        "actualDate": catalyst.actual_date,
        "deltaDays": catalyst.delta_days,
    }


def export_research_json(
    companies: list[ResearchedCompany],
    catalysts: list[Catalyst],
    holdings: list[ResearchedCompany],
    output_dir: Path,
) -> None:
    """
    Export research data to JSON files consumed by the Next.js frontend.

    Writes three files:
      - companies.json  — all scored companies from TABLE.md
      - catalysts.json  — all catalysts from CATALYST-TRACKER.md
      - holdings.json   — current Titanite holdings (subset of companies)

    Each file includes a metadata wrapper with export timestamp and count.
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    exported_at = datetime.utcnow().isoformat() + "Z"

    # companies.json
    companies_payload = {
        "exportedAt": exported_at,
        "count": len(companies),
        "companies": [_company_to_dict(c) for c in companies],
    }
    (output_dir / "companies.json").write_text(
        json.dumps(companies_payload, indent=2), encoding="utf-8"
    )

    # catalysts.json — active catalysts first, then others
    active = [c for c in catalysts if c.status == CatalystStatus.ACTIVE]
    other = [c for c in catalysts if c.status != CatalystStatus.ACTIVE]
    catalysts_payload = {
        "exportedAt": exported_at,
        "activeCount": len(active),
        "totalCount": len(catalysts),
        "catalysts": [_catalyst_to_dict(c) for c in active + other],
    }
    (output_dir / "catalysts.json").write_text(
        json.dumps(catalysts_payload, indent=2), encoding="utf-8"
    )

    # holdings.json — current holdings with research scores
    holdings_payload = {
        "exportedAt": exported_at,
        "count": len(holdings),
        "holdings": [_company_to_dict(h) for h in holdings],
    }
    (output_dir / "holdings.json").write_text(
        json.dumps(holdings_payload, indent=2), encoding="utf-8"
    )
