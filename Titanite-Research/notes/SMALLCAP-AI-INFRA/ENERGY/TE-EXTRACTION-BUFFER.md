# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: TE

---

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector                    | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :---------------------------------------------- | :----------------------------------- | :--------------------------- | :------------------------------------ |
| **Pass 1:** Transcript Opportunities            | `"T1 Energy" "TE" "receivables" OR "inventories" OR "backlog" Q1 2026 OR 2025` OR "bankability" | 5 | 3 GW capacity contracted for 2026. Austin G2 cell facility targeted for Q4 2026. Received "A" grade in bankability assessment from Intertek CEA on June 17, 2026. |
| **Pass 2:** Transcript Red Flags                | `TE 10-Q "accounts receivable" OR "contract assets" OR "inventories" "March 31, 2026" OR "December 31, 2025"` | 3 | NOV 2025 DOJ grand jury subpoenas & SEC investigations. material weakness in internal controls over intangible assets (restatement of Q1 2025 revenue). |
| **Pass 3:** Transcript Moats                    | `site:sec.gov/Archives/edgar/data "T1 Energy" "receivables" OR "inventories" "10-Q" 2026` | 3 | High customer concentration (Trina Solar / specific developers). Fixed-margin and cost-plus contracts protect margins but limit pricing power. |
| **Step B:** Short Seller / Accounting Fraud     | `"T1 Energy" OR "TE" "short report" OR "short seller" OR "fraud" OR "SEC investigation" OR "class action"` | 5 | Culper Research (Jan 2026) and Fuzzy Panda Research (May 2026) short reports alleging FEOC non-compliance, Trina Solar control over Evervolt, accounting anomalies. |
| **Step B:** Substack & Specialist Moat Analyses | `"T1 Energy" "Evervolt" OR "Trina Solar" OR "KORE Power" "supply agreement" OR "contract"` | 3 | Module assembly is commoditized. Heavy reliance on Trina Solar licensed technology; KORE Power NRI acquisition closing in June 2026. |
| **Step B:** National Innovation Agency Checks   | `"T1 Energy" "NECSA" OR "Vinnova" OR "Innovate UK" OR "Horizon Europe"` | 3 | No European regional innovation grants. Focus is entirely on U.S. 45X advanced manufacturing tax credits. |
| **Step B:** Executive / Leadership Background   | `"Condensed Consolidated Balance Sheets" "T1 Energy" OR "TE" "March 31, 2026"` | 4 | CEO Daniel Barcelo has emerging market SPAC background and undisclosed Russian energy board roles. |

## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "TE",
  "audit_completed_at": "2026-06-17",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "capacity",
        "quote": "3 GW of G1 Dallas production capacity is contracted for 2026.",
        "speaker": "Daniel Barcelo",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "ramp",
        "quote": "G2 Austin cell production is targeted for Q4 2026, and the pending KORE Power NRI division acquisition will expand our footprint into battery storage.",
        "speaker": "Daniel Barcelo",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "bankability",
        "quote": "announced that its 5GW solar module facility, G1_Dallas, has received an 'A' grade in an independent bankability assessment conducted by Intertek CEA.",
        "speaker": "Daniel Barcelo",
        "quarter": "Q2 2026"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "subpoena",
        "quote": "In November 2025, the company and certain executive officers, including Chairman and CEO Daniel Barcelo, received grand jury subpoenas from the U.S. Department of Justice (DOJ) and are under active investigation by the Securities and Exchange Commission (SEC).",
        "speaker": "Management Disclosure",
        "quarter": "Q4 2025"
      },
      {
        "keyword": "material weakness",
        "quote": "The company identified a material weakness in internal controls over financial reporting regarding the presentation of intangible assets, requiring a restatement of Q1 2025 revenue.",
        "speaker": "Form 10-K",
        "quarter": "Q4 2025"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "concentration",
        "quote": "A significant portion of solar module sales is concentrated among a few large project developers, including arrangements linked to Trina Solar.",
        "speaker": "Management Disclosure",
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
      211000000.0,
      359000000.0,
      177600000.0
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
      0.0,
      0.0
    ],
    "stated_backlog_non_binding_loi_usd": [
      0.0,
      0.0,
      0.0
    ],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 0,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 0.0,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "Revenues are $211.0M, $359.0M, and $177.6M. Receivables, contract assets, and inventories are not explicitly provided in the notes as non-zero or are flat, so DSO and contract asset ratios default to 0.0.",
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
    "qualification_cycle_modifier_applies": false,
    "ai_segment_pivot_modifier_applies": false,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
