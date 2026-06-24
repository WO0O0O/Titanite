## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `"POET Technologies" Q1 2026 Q4 2025 "capacity" OR "production" OR "volume"` | 4 | Management targeting shipping over 30,000 optical engines in 2026. Executing 10-fold capacity expansion in Malaysia cleanroom facilities. |
| **Pass 2:** Transcript Red Flags | `"POET Technologies" "going concern" OR "material weakness" OR "Davidson" 2025` | 5 | Davidson & Company LLP issued going concern warning in March 2026. Material weakness in financial close controls disclosed. |
| **Pass 3:** Transcript Moats | `"POET Technologies" "switching costs" OR "qualification cycle" OR "Optical Interposer"` | 4 | Wafer-scale passive alignment packaging enables standard CMOS pick-and-place assembly. Defensible patent moat of over 100 patents. |
| **Step B:** Short Seller / Accounting Fraud | `"Wolfpack Research" "POET Technologies" "short report" OR "Mika"` | 6 | Wolfpack short report (14 April 2026) alleged promotional activities. CFO Thomas Mika subsequently breached confidentiality leading to Marvell order cancellation. |
| **Step B:** Substack & Specialist Moat Analyses | `"POET Technologies" "Lumilens" OR "Sivers" "hyperscaler" OSINT` | 5 | OSINT indicates Lumilens CEO Ankur Singla confirmed Top-3 hyperscaler customer. Sivers is laser supplier, confirming DFB laser array CPO deployment. |
| **Step B:** National Innovation Agency Checks | `"POET Technologies" "funding" OR "grant" Canada` | 3 | Historical development grants from Sustainable Development Technology Canada (SDTC) but no active funding of material size. |
| **Step B:** Executive / Leadership Background | `"Suresh Venkatesan" POET Technologies "Thomas Mika" history` | 3 | Suresh Venkatesan (CEO) has semiconductor background (GLOBALFOUNDRIES). CFO Thomas Mika has ongoing class action litigation for NDA breach. |
| **Step B:** CEO Investigation Check | `"Suresh Venkatesan" SEC OR bankruptcy OR SPAC OR fraud` | 3 | CEO Suresh Venkatesan has clean regulatory background with no prior SEC sanctions, bankruptcies, or SPAC promotion history. |

## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "POET",
  "audit_completed_at": "2026-06-24",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "capacity",
        "quote": "We are executing a 10-fold capacity expansion of our wafer production and assembly lines in Malaysia to support volume shipments.",
        "speaker": "Management",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "volume",
        "quote": "Our target remains to ship over 30,000 optical engines in 2026, primarily to support early qualifications and initial pilot deployments.",
        "speaker": "Management",
        "quarter": "Q4 2025"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "going concern",
        "quote": "The company's independent auditor, Davidson & Company LLP, included a going concern note in the auditor's report for the fiscal year ended 31 December 2025.",
        "speaker": "Davidson & Company LLP",
        "quarter": "FY 2025"
      },
      {
        "keyword": "material weakness",
        "quote": "Management disclosed a material weakness in internal controls over financial reporting relating to insufficient resources to perform effective reviews within the financial close process.",
        "speaker": "Management",
        "quarter": "FY 2025"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "qualification cycle",
        "quote": "Qualification cycles for our interposer-based optical engines typically span 12 to 24 months depending on downstream module architecture requirements.",
        "speaker": "Management",
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
      0.298,
      0.341,
      0.503
    ],
    "accounts_receivable_converted_to_usd": [
      0.0,
      0.0,
      0.0
    ],
    "contract_assets_unbilled_converted_to_usd": [
      0.0,
      0.0,
      0.0
    ],
    "inventories_converted_to_usd": [
      0.0,
      0.0,
      0.0
    ],
    "stated_backlog_firm_binding_usd": [
      0.0,
      5.0,
      55.0
    ],
    "stated_backlog_non_binding_loi_usd": [
      0.0,
      0.0,
      500.0
    ],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 60,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 0.0,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "1. Receivables growth vs revenue growth %: Accounts receivable is reported as negligible/nil for individual quarters due to development NRE focus. Growth variance is set to 0.0. 2. Days Sales Outstanding (DSO): Calculated using total receivables (AR + contract assets) / revenue * 90. All inputs are 0.0, yielding 0.0 days. 3. Contract Assets % Receivables: 0.0 / 0.0 * 100 = 0.0%. 4. Inventory-to-binding backlog ratio: 0.0 / $55.0M = 0.0. 5. Stated Backlog: Firm binding backlog reflects the $5.0M Q4 2025 order and the $50.0M Lumilens PO in Q1 2026. Non-binding LOI backlog reflects the $500.0M scale-up framework agreement.",
    "receivables_growth_vs_revenue_growth_pct": 0.0,
    "days_sales_outstanding_dso": [
      0.0,
      0.0,
      0.0
    ],
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
