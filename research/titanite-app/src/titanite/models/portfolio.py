"""
Portfolio data models — parsed from TABLE.md and CATALYST-TRACKER.md.

These allow the CLI to query portfolio state without manually reading markdown files.
"""
from __future__ import annotations

from enum import Enum
from pydantic import BaseModel, Field


class Tier(str, Enum):
    TIER_1 = "Tier 1"
    TIER_2 = "Tier 2"
    TIER_3 = "Tier 3"
    PASS = "Pass"  # Researched but does not meet investment criteria
    DISQUALIFIED = "Disqualified"


class Framework(str, Enum):
    SC_AI_INFRA = "sc"
    LEOPOLD = "leopold"
    SPACE_INFRA = "space"


class CatalystStatus(str, Enum):
    ACTIVE = "active"
    HIT = "hit"
    MISSED = "missed"
    CANCELLED = "cancelled"


class CatalystConfidence(str, Enum):
    HIGH = "High"
    MEDIUM_HIGH = "Medium-High"
    MEDIUM = "Medium"
    LOW = "Low"


class ResearchedCompany(BaseModel):
    """A single row in TABLE.md — a company that has been researched and scored."""

    ticker: str
    company_name: str
    score: float = Field(description="Raw score out of 13.0")
    tier: Tier
    industry_folder: str = Field(description="Subfolder under SMALLCAP-AI-INFRA/")
    framework: Framework = Field(default=Framework.SC_AI_INFRA)
    key_summary: str = Field(default="")
    has_extraction_buffer: bool = Field(default=False)
    has_research_report: bool = Field(default=False)


class Catalyst(BaseModel):
    """A single row from CATALYST-TRACKER.md."""

    ticker: str
    description: str
    expected_date: str  # Free-text, e.g. "Q3 2026 (July-Sept)"
    confidence: CatalystConfidence
    actual_date: str | None = None
    delta_days: int | None = None
    thesis_impact: str = Field(default="")
    status: CatalystStatus = Field(default=CatalystStatus.ACTIVE)


class Portfolio(BaseModel):
    """Aggregate portfolio state parsed from all docs."""

    companies: list[ResearchedCompany] = Field(default_factory=list)
    catalysts: list[Catalyst] = Field(default_factory=list)

    def tier_1(self) -> list[ResearchedCompany]:
        return [c for c in self.companies if c.tier == Tier.TIER_1]

    def tier_2(self) -> list[ResearchedCompany]:
        return [c for c in self.companies if c.tier == Tier.TIER_2]

    def active_catalysts(self) -> list[Catalyst]:
        return [c for c in self.catalysts if c.status == CatalystStatus.ACTIVE]
