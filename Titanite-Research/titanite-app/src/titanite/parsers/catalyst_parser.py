"""
CATALYST-TRACKER.md parser.

Reads docs/CATALYST-TRACKER.md and returns a list of Catalyst objects.
"""
from __future__ import annotations

import re
from pathlib import Path

from titanite.models.portfolio import Catalyst, CatalystConfidence, CatalystStatus


def parse_catalyst_tracker_md(path: Path) -> list[Catalyst]:
    """
    Parse docs/CATALYST-TRACKER.md into a list of Catalyst objects.

    Handles rows like:
    | **ACCON** | Commercial ramp / Series C win | Q3 2026 (July-Sept) | High | ... | Active |
    """
    content = path.read_text(encoding="utf-8")
    catalysts: list[Catalyst] = []

    for line in content.splitlines():
        if not line.startswith("|") or "**" not in line:
            continue

        cols = [c.strip() for c in line.split("|") if c.strip()]
        if len(cols) < 4:
            continue

        # Extract ticker from **TICKER** markdown
        ticker_match = re.search(r"\*\*([A-Z0-9.]+)\*\*", cols[0])
        if not ticker_match:
            continue
        ticker = ticker_match.group(1)

        description = re.sub(r"\*\*|\*", "", cols[1]).strip()
        expected_date = re.sub(r"\*\*|\*", "", cols[2]).strip()

        # Confidence
        confidence_raw = re.sub(r"\*\*|\*", "", cols[3]).strip()
        confidence_map: dict[str, CatalystConfidence] = {
            "high": CatalystConfidence.HIGH,
            "medium-high": CatalystConfidence.MEDIUM_HIGH,
            "medium": CatalystConfidence.MEDIUM,
            "low": CatalystConfidence.LOW,
        }
        confidence = confidence_map.get(confidence_raw.lower(), CatalystConfidence.MEDIUM)

        # Status (last column)
        status_raw = re.sub(r"\*\*|\*", "", cols[-1]).strip().lower()
        if "active" in status_raw:
            status = CatalystStatus.ACTIVE
        elif "hit" in status_raw:
            status = CatalystStatus.HIT
        elif "missed" in status_raw:
            status = CatalystStatus.MISSED
        elif "cancelled" in status_raw:
            status = CatalystStatus.CANCELLED
        else:
            status = CatalystStatus.ACTIVE

        # Thesis impact (5th column if it exists)
        thesis_impact = ""
        if len(cols) >= 5:
            thesis_impact = re.sub(r"\*\*|\*", "", cols[4]).strip()

        catalysts.append(
            Catalyst(
                ticker=ticker,
                description=description,
                expected_date=expected_date,
                confidence=confidence,
                status=status,
                thesis_impact=thesis_impact,
            )
        )

    return catalysts
