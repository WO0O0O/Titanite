"""
Tests for the TABLE.md parser.
"""
from pathlib import Path

import pytest

from titanite.parsers.table_parser import parse_table_md
from titanite.models.portfolio import Tier


# tests/test_*.py → tests/ → titanite-app/ → titanite/ (repo root)
DOCS_DIR = Path(__file__).resolve().parent.parent.parent / "docs"


def test_parse_table_md_returns_companies() -> None:
    """TABLE.md must parse to at least 20 companies."""
    table_path = DOCS_DIR / "TABLE.md"
    if not table_path.exists():
        pytest.skip("TABLE.md not found")

    companies = parse_table_md(table_path)
    assert len(companies) >= 20


def test_parse_table_md_has_tier1() -> None:
    """At least 10 Tier 1 companies should be present."""
    table_path = DOCS_DIR / "TABLE.md"
    if not table_path.exists():
        pytest.skip("TABLE.md not found")

    companies = parse_table_md(table_path)
    tier1 = [c for c in companies if c.tier == Tier.TIER_1]
    assert len(tier1) >= 10


def test_parse_table_md_scores_in_range() -> None:
    """All scores must be between 0 and 13."""
    table_path = DOCS_DIR / "TABLE.md"
    if not table_path.exists():
        pytest.skip("TABLE.md not found")

    companies = parse_table_md(table_path)
    for company in companies:
        assert 0.0 <= company.score <= 13.0, (
            f"{company.ticker} has out-of-range score: {company.score}"
        )


def test_parse_table_md_peng_is_tier1() -> None:
    """PENG (13/13) must be classified as Tier 1."""
    table_path = DOCS_DIR / "TABLE.md"
    if not table_path.exists():
        pytest.skip("TABLE.md not found")

    companies = parse_table_md(table_path)
    peng = next((c for c in companies if c.ticker == "PENG"), None)
    assert peng is not None, "PENG not found in TABLE.md"
    assert peng.score == 13.0
    assert peng.tier == Tier.TIER_1
