# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: AIRJ

---

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `"AirJoule Technologies" OR "Montana Technologies" "Q1 2026" OR "first quarter 2026" "transcript" OR "earnings call"` | 15 | AirJoule is transitioning from technology development to commercial deployment in late 2026, with the Newark showcase unit fully operational. |
| **Pass 2:** Transcript Red Flags | `"AirJoule" OR "Montana Technologies" "Q1 2026" OR "Q4 2025" OR "Q3 2025" transcript "capacity" OR "backlog" OR "lead times" OR "margins" OR "qualification"` | 12 | The company has a pre-revenue profile with large non-cash joint venture equity losses. An accounting restatement for JV equity accounting was settled in August 2024. |
| **Pass 3:** Transcript Moats | `"AirJoule" OR "Montana Technologies" "Carrier" OR "GE Vernova" OR "TenX" contract value OR volume` | 10 | Commercial partnerships with Carrier (exclusive HVAC term sheet), GE Vernova (50/50 joint venture), and TenX (exclusive Middle East distribution) establish a distribution moat. |
| **Step B:** Short Seller / Accounting Fraud | `"AirJoule" OR "Montana Technologies" OR "Matt Jore" OR "Pat Eilers" short seller report OR lawsuit OR fraud OR SEC` | 14 | No active short-seller campaigns, SEC investigations, or fraud allegations are associated with the company or its leadership as of June 2026. |
| **Step B:** Substack & Specialist Moat Analyses | `"AirJoule Technologies" OR "Montana Technologies" "backlog" OR "order book" OR "binding contract" OR "LOI" OR "MOU"` | 11 | Technology utilises Metal-Organic Framework (MOF) materials to capture water vapor, targeting data centre cooling applications. |
| **Step B:** National Innovation Agency Checks | `"AirJoule Technologies" OR "Montana Technologies" "March 31, 2026" "Property and equipment" OR "Property, plant and equipment"` | 8 | The company has an active partnership with the U.S. Army's Engineer Research and Development Centre (ERDC) for defence applications. |
| **Step B:** Executive / Leadership Background | `"AirJoule Technologies" CEO management background merger SPAC history` | 12 | Matt Jore (CEO) has 30 years of product leadership (Jore Corp IPO). Pat Eilers (Chairman) has energy private equity experience. SPAC merger completed in March 2024. |

---

## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "AIRJ",
  "audit_completed_at": "2026-06-19",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "commercialization",
        "quote": "2026 is our transition year, moving from one-off deployments to productized commercial sales.",
        "speaker": "Matt Jore",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "qualification",
        "quote": "We are focusing on UL and NSF certifications for our AirJoule Core unit to enable commercial launches by late 2026.",
        "speaker": "Matt Jore",
        "quarter": "Q4 2025"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "joint venture loss",
        "quote": "Our first quarter net loss of 49.8 million dollars was significantly impacted by a non-cash equity loss in our AirJoule LLC joint venture.",
        "speaker": "Stephen Pang",
        "quarter": "Q1 2026"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "partnership",
        "quote": "Our partnerships with Carrier and GE Vernova provide us with the manufacturing capability and distribution channels required to scale.",
        "speaker": "Pat Eilers",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q3 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [0.0, 0.0, 0.0],
    "accounts_receivable_converted_to_usd": [0.0, 0.0, 0.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [0.0, 0.0, 0.0],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 0.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 0.0],
    "projected_12m_backlog_drawdown_velocity_usd": "TBD via Phase Qualification",
    "average_contract_duration_months": 0,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 38570.0,
    "operating_lease_liabilities_asc842_usd": 106893.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO is calculated as (AR / Revenue) * 90. Since both AR and Revenue are 0.0, DSO is 0.0 across all periods. Receivables growth vs revenue growth is flat at 0.0%. Contract assets comprise 0.0% of total receivables. Inventory-to-binding backlog ratio is 0.0 due to zero binding backlog and zero inventories at the parent level.",
    "receivables_growth_vs_revenue_growth_pct": 0.0,
    "days_sales_outstanding_dso": [0.0, 0.0, 0.0],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": true,
    "ai_segment_pivot_modifier_applies": false,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
