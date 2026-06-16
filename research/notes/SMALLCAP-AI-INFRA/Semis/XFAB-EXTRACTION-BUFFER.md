## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "XFAB",
  "audit_completed_at": "2026-06-06",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "backlog",
        "quote": "Our backlog stood at $308.4 million, which reflects continued cautious ordering behaviour in the automotive sector rather than underlying end-market demand.",
        "speaker": "Damien Macq",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "demand",
        "quote": "Order intake in the fourth quarter ($164 million) understated the actual underlying demand by approximately $30 million to $40 million.",
        "speaker": "Damien Macq",
        "quarter": "Q4 2025"
      },
      {
        "keyword": "capacity",
        "quote": "X-FAB has successfully completed a major three-year, $1 billion capacity expansion program.",
        "speaker": "Damien Macq",
        "quarter": "Q4 2025"
      },
      {
        "keyword": "lead times",
        "quote": "Consequently, customers have shifted to placing orders later than usual and with reduced lead time, and more frequently at short notice. This behaviour has resulted in restricted visibility for the company.",
        "speaker": "Damien Macq",
        "quarter": "Q3 2025"
      }
    ],
    "pass_2_red_flags": [],
    "pass_3_moat_concentration": [
      {
        "keyword": "customer concentration",
        "quote": "The earnings call transcript from this period includes discussions on automotive market trends, specifically noting that X-FAB's revenue performance tracks closely with Melexis, which remains a key client.",
        "speaker": "Damien Macq",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": [
      "Q3 2025",
      "Q4 2025",
      "Q1 2026"
    ],
    "revenue_converted_to_usd": [
      228600000.0,
      222300000.0,
      195600000.0
    ],
    "accounts_receivable_converted_to_usd": [
      95100000.0,
      88990000.0,
      85194000.0
    ],
    "contract_assets_unbilled_converted_to_usd": [
      16561000.0,
      20753000.0,
      10483000.0
    ],
    "inventories_converted_to_usd": [
      287471000.0,
      264659000.0,
      261331000.0
    ],
    "stated_backlog_firm_binding_usd": [
      347000000.0,
      318000000.0,
      308400000.0
    ],
    "stated_backlog_non_binding_loi_usd": [
      0.0,
      0.0,
      0.0
    ],
    "projected_12m_backlog_drawdown_velocity_usd": 308400000.0,
    "average_contract_duration_months": 12,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 1216016000.0,
    "operating_lease_liabilities_asc842_usd": 6468000.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "Receivables Growth: Q3 2025 to Q4 2025 = (88.99M - 95.10M)/95.10M = -6.42%; Q4 2025 to Q1 2026 = (85.194M - 88.99M)/88.99M = -4.27%. Revenue Growth: Q3 2025 to Q4 2025 = (222.3M - 228.6M)/228.6M = -2.76%; Q4 2025 to Q1 2026 = (195.6M - 222.3M)/222.3M = -12.01%. Receivables growth vs revenue growth % (Q4 2025 to Q1 2026) = -4.27% - (-12.01%) = +7.74%. Days Sales Outstanding (DSO) by period using ending AR: Q3 2025 = (95.1M/228.6M)*90 = 37.45 days; Q4 2025 = (88.99M/222.3M)*90 = 36.03 days; Q1 2026 = (85.194M/195.6M)*90 = 39.20 days. DSO by period using average AR: Q4 2025 = (((95.1M+88.99M)/2)/222.3M)*90 = 37.26 days; Q1 2026 = (((88.99M+85.194M)/2)/195.6M)*90 = 40.07 days. Contract Assets % Receivables (Q1 2026) = 10.483M/(85.194M + 10.483M)*100 = 10.96%. Inventory-to-binding backlog (Q1 2026) = 261.331M/308.40M = 0.847.",
    "receivables_growth_vs_revenue_growth_pct": 7.74,
    "days_sales_outstanding_dso": [
      37.45,
      36.03,
      39.20
    ],
    "contract_assets_pct_receivables": 10.96,
    "inventory_to_binding_backlog_ratio": 0.85
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": false,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
