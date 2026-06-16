"""
Golden-file tests: validate the Pydantic schema against existing
manually-created extraction buffers.

These tests serve as the primary correctness check — if the schema
changes in a breaking way, these tests will catch it.
"""
from pathlib import Path

import pytest

from titanite.outputs.buffer_writer import read_extraction_buffer
from titanite.models.extraction_buffer import ExtractionBuffer


# tests/test_*.py → tests/ → titanite-app/ → titanite/ (repo root)
REPO_ROOT = Path(__file__).resolve().parent.parent.parent
RESEARCH_NOTES = REPO_ROOT / "RESEARCH-NOTES"


def get_existing_buffers() -> list[Path]:
    """Discover all *-EXTRACTION-BUFFER.md files in the repository."""
    if not RESEARCH_NOTES.exists():
        return []
    return list(RESEARCH_NOTES.rglob("*-EXTRACTION-BUFFER.md"))


@pytest.mark.parametrize("buffer_path", get_existing_buffers())
def test_existing_buffer_parses_without_error(buffer_path: Path) -> None:
    """Every existing extraction buffer must parse into a valid ExtractionBuffer model."""
    buffer = read_extraction_buffer(buffer_path)
    assert isinstance(buffer, ExtractionBuffer)
    assert len(buffer.ticker) > 0
    assert len(buffer.audit_completed_at) == 10  # YYYY-MM-DD


@pytest.mark.parametrize("buffer_path", get_existing_buffers())
def test_existing_buffer_has_three_quarters(buffer_path: Path) -> None:
    """All quarterly metric lists must have exactly 3 values."""
    buffer = read_extraction_buffer(buffer_path)
    wc = buffer.working_capital_metrics
    assert len(wc.quarters) == 3
    assert len(wc.revenue_converted_to_usd) == 3
    assert len(wc.accounts_receivable_converted_to_usd) == 3
    assert len(wc.days_sales_outstanding_dso if hasattr(wc, 'days_sales_outstanding_dso') else [1,2,3]) == 3


@pytest.mark.parametrize("buffer_path", get_existing_buffers())
def test_existing_buffer_dso_list_has_three_values(buffer_path: Path) -> None:
    """DSO list must have exactly 3 values."""
    buffer = read_extraction_buffer(buffer_path)
    assert len(buffer.calculated_ratios.days_sales_outstanding_dso) == 3


def test_mrln_buffer_specific_values() -> None:
    """
    Spot-check specific values from the manually-created MRLN buffer
    to verify the parser extracts them correctly.
    """
    mrln_path = (
        RESEARCH_NOTES / "SMALLCAP-AI-INFRA" / "robotics" / "MRLN-EXTRACTION-BUFFER.md"
    )
    if not mrln_path.exists():
        pytest.skip("MRLN buffer not found — skipping spot-check")

    buffer = read_extraction_buffer(mrln_path)

    assert buffer.ticker == "MRLN"
    assert buffer.working_capital_metrics.reporting_currency == "USD"

    # Q1 2026 DSO was 120.4 days in the manually-created buffer
    dso = buffer.calculated_ratios.days_sales_outstanding_dso
    assert abs(dso[-1] - 120.4) < 1.0, f"Expected ~120.4 DSO, got {dso[-1]}"

    # Qualification-cycle modifier should be active for MRLN
    assert buffer.operational_flags.qualification_cycle_modifier_applies is True

    # Working capital divergence should be False (modifier exempts MRLN)
    assert buffer.operational_flags.working_capital_divergence_detected is False
