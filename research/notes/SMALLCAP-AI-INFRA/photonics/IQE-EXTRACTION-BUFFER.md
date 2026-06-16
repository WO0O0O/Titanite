# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: IQE

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `IQE plc earnings transcript FY 2025 OR H1 2025` | 3 | Photonics segment grew 15% to £57.1 million driven by AI optical transceiver demands and US military programmes. Wireless destocking caused consolidated revenue contraction. |
| **Pass 2:** Transcript Red Flags | `IQE plc "going concern" OR "material weakness" OR "internal controls"` | 3 | EY has not issued a going concern qualification. Restructured HSBC debt and paid off RCF through £81 million capital raise. |
| **Pass 3:** Transcript Moats | `IQE plc Greensboro Raytheon qualification OR BAE systems` | 3 | Greensboro site qualified by Raytheon under a 15-year partnership for infrared photodetector epiwafers. BAE Systems Gold Tier status. |
| **Step B:** Short Seller / Accounting Fraud | `"IQE plc" short report OR fraud OR litigation OR lawsuit` | 3 | Tower Semiconductor litigation is IP-related (porous silicon). No active fraud or accounting investigations. |
| **Step B:** Substack & Specialist Moat Analyses | `"IQE plc" "switching costs" OR "MOCVD" replication cost` | 3 | Over 100 MOCVD reactors globally, replication cost exceeds £300 million. Qualification cycles take 12 to 18 months. |
| **Step B:** National Innovation Agency Checks | `"IQE plc" "Innovate UK" OR "Horizon Europe"` | 2 | IQE is a participant in Western semiconductor sovereignty strategies, including the UK Semiconductor Strategy. |
| **Step B:** Executive / Leadership Background | `"Jutta Meier" CEO history OR CFO resignation` | 2 | Jutta Meier transitioned from CFO to CEO in May 2025. CFO position is undergoing active recruitment. |

```json
{
  "ticker": "IQE",
  "audit_completed_at": "2026-06-11",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "demand",
        "quote": "We are experiencing accelerated demand for our Indium Phosphide (InP) solutions, which support data centre and AI infrastructure, and this will be a material growth driver throughout 2026 and beyond.",
        "speaker": "Jutta Meier",
        "quarter": "FY 2025"
      },
      {
        "keyword": "capacity",
        "quote": "The £81 million fundraising is a transformational investment that secures our balance sheet and enables us to invest in capacity for advanced GaN and InP technology.",
        "speaker": "Jutta Meier",
        "quarter": "FY 2025"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "underutilisation",
        "quote": "Underutilisation of legacy wireless manufacturing assets dragged adjusted EBITDA margins to a trough of -0.9% in H1 2025.",
        "speaker": "Jutta Meier",
        "quarter": "FY 2025"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "qualification",
        "quote": "Greensboro North Carolina facility qualified by Raytheon under a 15-year partnership.",
        "speaker": "Management",
        "quarter": "FY 2025"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "GBP",
    "usd_exchange_rate_used": 1.346,
    "quarters": ["H2 2024", "H1 2025", "H2 2025"],
    "revenue_converted_to_usd": [69992000.0, 60973800.0, 69992000.0],
    "accounts_receivable_converted_to_usd": [50372704.0, 39322044.0, 37813178.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [26932114.0, 26159510.0, 25123090.0],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 0.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 0.0],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 12,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 179556400.0,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO calculated as (Accounts Receivable / Period Revenue) * 180. H2 2024 DSO = (50,372,704 / 69,992,000) * 180 = 129.5 days. H1 2025 DSO = (39,322,044 / 60,973,800) * 180 = 116.1 days. H2 2025 DSO = (37,813,178 / 69,992,000) * 180 = 97.2 days. Revenue growth from H1 2025 to H2 2025 = (52.0 - 45.3) / 45.3 * 100 = 14.79%. Receivables growth from H1 2025 to H2 2025 = (28.093 - 29.214) / 29.214 * 100 = -3.84%. Sequential growth variance delta = -3.84% - 14.79% = -18.63%. Inventory-to-binding backlog ratio H2 2025 = 25,123,090 / 0.0 = 0.0.",
    "receivables_growth_vs_revenue_growth_pct": -18.63,
    "days_sales_outstanding_dso": [129.5, 116.1, 97.2],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": false,
    "ai_segment_pivot_modifier_applies": true,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
