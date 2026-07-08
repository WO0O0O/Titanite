# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: SHAZ

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector                    | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :---------------------------------------------- | :----------------------------------- | :--------------------------- | :------------------------------------ |
| **Pass 1:** Transcript Opportunities            | `SharonAI OR Sharon AI "capacity" OR "Blackwell" OR "GPU"` | 4 | SharonAI is deploying Grace Blackwell GB300 chips in Australia and has secured a $1.6B financing round to fund hardware. |
| **Pass 2:** Transcript Red Flags                | `SharonAI Form 10-Q OR 10-K "material weakness" OR "convertible notes"` | 4 | Reported non-cash fair value losses of $70.2M on convertible notes in Q1 2026. Amended 10-K to retract Nvidia equity claims. |
| **Pass 3:** Transcript Moats                    | `SharonAI "NEXTDC" OR "VAST Data" partnership` | 3 | Partnered with NEXTDC for colocation and VAST Data for 600PB of AI storage. Actively transitioned from Filecoin storage. |
| **Step B:** Short Seller / Accounting Fraud     | `"SharonAI" OR "Sharon AI" OR "SHAZ" short report OR Bleecker` | 4 | Bleecker Street Research short report (April 2026) alleges ESDS contract is fraudulent and CEO has history of self-dealing. |
| **Step B:** Substack & Specialist Moat Analyses | `SharonAI ESDS contract details analysis` | 3 | The $1.25B ESDS contract is challenged as ESDS has only ~$43M in annual revenue and ~$5M in net profit. |
| **Step B:** National Innovation Agency Checks   | `SharonAI Australia sovereign AI funding` | 2 | Positioned as a "Sovereign AI" provider in Australia, though funding is primarily private placement debt/convertible notes. |
| **Step B:** Executive / Leadership Background   | `SharonAI CEO James Manning history litigation Mawson` | 3 | CEO James Manning was formerly head of Mawson Infrastructure ($MIGI), facing historical litigation for self-dealing. |

```json
{
  "ticker": "SHAZ",
  "audit_completed_at": "2026-07-08",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "capacity",
        "quote": "SharonAI reported total AI factory capacity of 132MW, with 102MW already contracted to customers.",
        "speaker": "Press Release",
        "quarter": "Q2 2026"
      },
      {
        "keyword": "qualification",
        "quote": "The company continues to advance the deployment of up to 40,000 NVIDIA Grace Blackwell GB300 GPU clusters in Australia.",
        "speaker": "Management Note",
        "quarter": "Q2 2026"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "material weakness",
        "quote": "The company previously issued a correction regarding a statement in its 2025 Annual Report concerning the status of NVIDIA as a strategic shareholder, clarifying that this statement was included in error.",
        "speaker": "Form 10-K/A",
        "quarter": "Q4 2025"
      },
      {
        "keyword": "dilution",
        "quote": "In June 2026, SharonAI closed an oversubscribed US$1.6 billion private placement consisting of common stock, pre-funded warrants, and US$700 million in convertible notes.",
        "speaker": "Press Release",
        "quarter": "Q2 2026"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "switching",
        "quote": "The ESDS contract represents a US$1.25 billion five-year commitment, and a second agreement represents a US$950 million five-year contract.",
        "speaker": "Form 10-Q",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q3 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [506747.0, 388000.0, 294014.0],
    "accounts_receivable_converted_to_usd": [500000.0, 750000.0, 5043000.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [0.0, 0.0, 0.0],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 0.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 1250000000.0, 2200000000.0],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 60,
    "capitalised_software_balance_sheet_usd": 500000.0,
    "physical_hardware_assets_usd": 85000000.0,
    "operating_lease_liabilities_asc842_usd": 12000000.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO calculated as (AR / Quarterly Revenue) * 90 days. Q3 2025 DSO = (0.500 / 0.507) * 90 = 88.8 days. Q4 2025 DSO = (0.750 / 0.388) * 90 = 174.0 days. Q1 2026 DSO = (5.043 / 0.294) * 90 = 1543.8 days. Sequential Q4 2025 to Q1 2026 revenue growth = (294014 - 388000) / 388000 = -24.22%. Sequential Q4 2025 to Q1 2026 receivables growth = (5043000 - 750000) / 750000 = +572.40%. Variance = 572.40% - (-24.22%) = +596.62%. Inventory to binding backlog ratio is N/A.",
    "receivables_growth_vs_revenue_growth_pct": 596.62,
    "days_sales_outstanding_dso": [88.8, 174.0, 1543.8],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": true,
    "qualification_cycle_modifier_applies": true,
    "ai_segment_pivot_modifier_applies": false,
    "potential_channel_stuffing_signals": true,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
