## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `"Sivers Semiconductors" Q1 2026 Q4 2025 "pipeline" OR "capacity" OR "demand"` | 4 | Opportunity pipeline grew 77% YTD to $799M. Transitioning to mass production phase with satellite communications and LiDAR/CPO product ramps in 2027. |
| **Pass 2:** Transcript Red Flags | `"Sivers Semiconductors" "going concern" OR "material weakness" OR "Deloitte" 2025 2026` | 5 | Deloitte issued a going concern warning for FY 2025. Material weaknesses in financial control environment reported, alongside PCAOB audit uplift fee increases. |
| **Pass 3:** Transcript Moats | `"Sivers Semiconductors" "switching costs" OR "customer concentration" OR "qualification cycle" OR "reference design"` | 4 | Long qualification cycles lock in customers. Reference design integration with GlobalFoundries Silicon Photonics SCALE platform acts as a pre-qualification catalyst. |
| **Step B:** Short Seller / Accounting Fraud | `"Ningi Research" "Sivers Semiconductors" "short report"` | 5 | Ningi Research issued a short report on 1 June 2026 alleging aggressive revenue accounting and hollow customer contracts, triggering shareholder class action investigations. |
| **Step B:** Substack & Specialist Moat Analyses | `"Sivers Semiconductors" Substack OR "specialist analysis" OR "technology moat"` | 6 | SEQH Capital views Sivers as an Indium Phosphide laser chokepoint. Bears focus on 100x sales valuation and history of delayed commercial timelines. |
| **Step B:** National Innovation Agency Checks | `Vinnova "Sivers Semiconductors" OR "Sivers Photonics"` | 4 | Participates in Vinnova-funded advanced packaging consortiums (E2PackMan) and mmWave/6G connectivity research programmes with Chalmers University of Technology. |
| **Step B:** Executive / Leadership Background | `Sivers Semiconductors CEO "Anders Storm" OR "Vikas Choudhary"` | 3 | Anders Storm departed Sivers in 2024 to join Dirac. Dr. Vickram Vathulya appointed President and CEO of Sivers Semiconductors on 19 August 2024. |
| **Step B:** CEO Investigation Check | `"Vickram Vathulya" "Sivers Semiconductors" SEC OR bankruptcy OR SPAC OR fraud` | 3 | No negative governance history, SEC sanctions, SPAC involvement, or prior bankruptcy filings associated with the current CEO, Vickram Vathulya. |

## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "SIVE",
  "audit_completed_at": "2026-06-06",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "pipeline",
        "quote": "Our opportunity pipeline grew 77% year-to-date to $799 million.",
        "speaker": "Management",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "demand",
        "quote": "We see strong customer interest for our optical arrays, particularly in high-speed data centre interconnects.",
        "speaker": "Management",
        "quarter": "Q4 2025"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "going concern",
        "quote": "The auditor's report contains a section regarding material uncertainty related to going concern.",
        "speaker": "Deloitte AB",
        "quarter": "FY 2025"
      },
      {
        "keyword": "restatement",
        "quote": "The Group has adjusted its comparative periods to correct errors from previous periods, specifically related to the accrual, valuation, and reclassification of items.",
        "speaker": "Management",
        "quarter": "Q1 2026"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "customer concentration",
        "quote": "Sivers continues to show high customer concentration, with a single customer representing a significant portion of our Photonics revenue.",
        "speaker": "Management",
        "quarter": "FY 2025"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "SEK",
    "usd_exchange_rate_used": 10.527,
    "quarters": [
      "Q3 2025",
      "Q4 2025",
      "Q1 2026"
    ],
    "revenue_converted_to_usd": [
      7.79,
      7.67,
      5.88
    ],
    "accounts_receivable_converted_to_usd": [
      5.89,
      5.32,
      7.28
    ],
    "contract_assets_unbilled_converted_to_usd": [
      8.07,
      9.54,
      10.45
    ],
    "inventories_converted_to_usd": [
      4.39,
      2.82,
      3.41
    ],
    "stated_backlog_firm_binding_usd": [
      0.0,
      0.0,
      0.0
    ],
    "stated_backlog_non_binding_loi_usd": [
      799.0,
      799.0,
      799.0
    ],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 18,
    "capitalised_software_balance_sheet_usd": 17.67,
    "physical_hardware_assets_usd": 5.23,
    "operating_lease_liabilities_asc842_usd": 2.56,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "1. Receivables growth vs revenue growth %: Revenue fell -23.3% sequentially in SEK (from SEK 80.7M to SEK 61.9M). Total receivables (accounts receivable + contract assets) grew from SEK 156.4M in Q4 2025 to SEK 186.6M in Q1 2026, representing +19.3% sequential growth. Sequential growth divergence = 19.3% - (-23.3%) = 42.6%. 2. Days Sales Outstanding (DSO): Calculated using total receivables (accounts receivable + contract assets) divided by quarterly revenue multiplied by 90 days. For Q3 2025: (SEK 147.0M / SEK 82.0M) * 90 = 161.4 days. For Q4 2025: (SEK 156.4M / SEK 80.7M) * 90 = 174.3 days. For Q1 2026: (SEK 186.6M / SEK 61.9M) * 90 = 271.3 days. 3. Contract Assets % Receivables: Calculated as contract assets divided by total receivables (accounts receivable + contract assets) multiplied by 100. Q1 2026: SEK 110.0M / SEK 186.6M * 100 = 59.0%. Q4 2025: SEK 100.4M / SEK 156.4M * 100 = 64.2%. 4. Inventory-to-binding backlog ratio: SEK 35.9M / SEK 0.0M = 0.0 (no firm binding backlog). 5. Capitalised software balance sheet: SEK 186.0M / 10.527 = 17.67M USD. Physical hardware assets: SEK 55.0M / 10.527 = 5.23M USD. Lease liabilities: SEK 27.0M / 10.527 = 2.56M USD.",
    "receivables_growth_vs_revenue_growth_pct": 42.6,
    "days_sales_outstanding_dso": [
      161.4,
      174.3,
      271.3
    ],
    "contract_assets_pct_receivables": 59.0,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": true,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "GlobalFoundries",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
