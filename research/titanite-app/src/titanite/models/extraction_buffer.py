"""
Pydantic models that exactly mirror the SC-AI-EXTRACTOR.md JSON schema.

These are the canonical data contracts between the extraction pipeline
and the scoring engine. Any change to the framework JSON schema must be
reflected here and logged in CHANGELOG.md.

Schema version: v2.0.0 (aligned with framework CHANGELOG)
"""
from __future__ import annotations

from typing import Union
from pydantic import BaseModel, Field, field_validator


class TranscriptExtract(BaseModel):
    """A single verbatim quote extracted from an earnings transcript."""

    keyword: str
    quote: str
    speaker: str
    quarter: str  # e.g. "Q1 2026"


class TranscriptExtracts(BaseModel):
    """The three-pass keyword sweep results from SC-AI-EXTRACTOR.md Step A."""

    pass_1_opportunities: list[TranscriptExtract] = Field(default_factory=list)
    pass_2_red_flags: list[TranscriptExtract] = Field(default_factory=list)
    pass_3_moat_concentration: list[TranscriptExtract] = Field(default_factory=list)


class WorkingCapitalMetrics(BaseModel):
    """
    Structured financial data for the three most recent quarters.

    All monetary values are converted to USD for framework consistency.
    If the company reports in a foreign currency, apply usd_exchange_rate_used.
    """

    reporting_currency: str = Field(
        description="e.g. 'USD', 'SEK', 'EUR', 'NTD'"
    )
    usd_exchange_rate_used: float = Field(
        default=1.0,
        description="Exchange rate applied to convert to USD. 1.0 for USD-reporters."
    )
    quarters: list[str] = Field(
        description="Labels for the three quarters, e.g. ['Q3 2025', 'Q4 2025', 'Q1 2026']"
    )
    revenue_converted_to_usd: list[float | None]
    accounts_receivable_converted_to_usd: list[float | None]
    contract_assets_unbilled_converted_to_usd: list[float | None]
    inventories_converted_to_usd: list[float | None]
    stated_backlog_firm_binding_usd: list[float | None] = Field(
        description="Only firm, binding purchase orders / contracts."
    )
    stated_backlog_non_binding_loi_usd: list[float | None] = Field(
        description="LOIs, MOUs, and pipeline — NOT firm contracts."
    )
    # Allows "TBD via Phase Qualification" per the framework rules for
    # pre-revenue qualification-cycle players
    projected_12m_backlog_drawdown_velocity_usd: Union[float, str] = Field(
        default=0.0,
        description=(
            "Estimated USD value of firm backlog to be recognised as revenue "
            "over the next 12 months. Use string 'TBD via Phase Qualification' "
            "for pre-revenue qualification-cycle companies."
        )
    )
    average_contract_duration_months: int = Field(default=0)
    capitalised_software_balance_sheet_usd: float = Field(default=0.0)
    physical_hardware_assets_usd: float = Field(default=0.0)
    operating_lease_liabilities_asc842_usd: float = Field(default=0.0)
    crypto_validation_revenue_pct: float = Field(
        default=0.0,
        description="% of revenue attributable to crypto/blockchain validation. Red flag if >0."
    )

    @field_validator("quarters")
    @classmethod
    def must_have_three_quarters(cls, v: list[str]) -> list[str]:
        if len(v) != 3:
            raise ValueError("quarters must contain exactly 3 entries: [Q-2, Q-1, Current]")
        return v

    @field_validator(
        "revenue_converted_to_usd",
        "accounts_receivable_converted_to_usd",
        "contract_assets_unbilled_converted_to_usd",
        "inventories_converted_to_usd",
        "stated_backlog_firm_binding_usd",
        "stated_backlog_non_binding_loi_usd",
    )
    @classmethod
    def must_have_three_values(cls, v: list[float | None]) -> list[float]:
        if len(v) != 3:
            raise ValueError("All quarterly metric lists must contain exactly 3 values")
        # Coerce None → 0.0 (existing buffers use null as a 'no data' sentinel)
        return [x if x is not None else 0.0 for x in v]


class CalculatedRatios(BaseModel):
    """
    Calculated working capital ratios — computed by the extraction pipeline,
    not sourced directly from filings.

    Formulae are defined in SC-AI-EXTRACTOR.md and must not deviate.
    """

    math_scratchpad_and_workings: str = Field(
        description=(
            "Step-by-step arithmetic showing how DSO, growth variance, "
            "and contract asset ratios were calculated. Required for auditability."
        )
    )
    receivables_growth_vs_revenue_growth_pct: float = Field(
        description="Delta % check: AR growth rate minus revenue growth rate Q/Q."
    )
    days_sales_outstanding_dso: list[float | None] = Field(
        description="DSO for each of the 3 quarters. Formula: (AR / quarterly_revenue) * 90"
    )
    contract_assets_pct_receivables: float = Field(
        description=(
            "contract_assets / (AR + contract_assets) * 100. "
            "Flag if >30% and company is post-revenue with >$50M TTM revenue."
        )
    )
    inventory_to_binding_backlog_ratio: float = Field(
        description="inventories / stated_backlog_firm_binding. Flag if >0.5."
    )

    @field_validator("days_sales_outstanding_dso")
    @classmethod
    def must_have_three_dso_values(cls, v: list[float | None]) -> list[float]:
        if len(v) != 3:
            raise ValueError("days_sales_outstanding_dso must contain exactly 3 values")
        # Coerce None → 0.0
        return [x if x is not None else 0.0 for x in v]


class OperationalFlags(BaseModel):
    """
    Boolean flags set by the extraction pipeline.

    These gate scoring exemptions and modifier activations in the SC-AI-INFRA
    scorer (v2.0.0). Changing any flag logic requires a CHANGELOG entry.
    """

    working_capital_divergence_detected: bool = Field(
        default=False,
        description=(
            "True if DSO expanded >15% Q/Q for 2 consecutive quarters, "
            "OR Y/Y DSO expansion >25%, per framework v2.0.0."
        )
    )
    qualification_cycle_modifier_applies: bool = Field(
        default=False,
        description=(
            "True if company meets ALL Qualification-Cycle Modifier activation "
            "criteria: design wins with Tier 1 customers, >12 month qualification "
            "cycle, trailing revenue <$50M OR AI-segment <20% of total."
        )
    )
    ai_segment_pivot_modifier_applies: bool = Field(
        default=False,
        description=(
            "True if company has a validated AI-segment design win projected "
            "to grow from <10% to >50% of revenue within 24 months."
        )
    )
    potential_channel_stuffing_signals: bool = Field(
        default=False,
        description="True if AR growth significantly outpaces revenue growth with no explanation."
    )
    confirmed_foundry_reference_design_status: str = Field(
        default="None",
        description="Name of foundry if confirmed reference design status exists, else 'None'."
    )
    confirmed_tier1_cm_sole_source_integration: str = Field(
        default="None",
        description="Name of Tier 1 CM if sole-source integration confirmed, else 'None'."
    )
    direct_hyperscaler_custom_asic_design_win: bool = Field(
        default=False,
        description="True if company has a confirmed custom ASIC design win with a hyperscaler."
    )


class ExtractionBuffer(BaseModel):
    """
    The canonical extraction buffer — the output of Turn 1 of the research pipeline.

    Matches the JSON schema in SC-AI-EXTRACTOR.md exactly. This is the
    data contract passed to the SC-AI-INFRA scoring engine.
    """

    ticker: str
    audit_completed_at: str = Field(description="ISO date: YYYY-MM-DD")
    transcript_extracts: TranscriptExtracts = Field(default_factory=TranscriptExtracts)
    working_capital_metrics: WorkingCapitalMetrics
    calculated_ratios: CalculatedRatios
    operational_flags: OperationalFlags = Field(default_factory=OperationalFlags)
