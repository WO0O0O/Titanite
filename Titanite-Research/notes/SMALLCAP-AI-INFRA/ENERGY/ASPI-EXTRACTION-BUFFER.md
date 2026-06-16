## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `"ASP Isotopes" "capacity" OR "demand" OR "backlog" OR "lead times" OR "margins" OR "qualification" Q1 2026 OR Q4 2025 OR Q3 2025` | 6 | Ramped Silicon-28 enrichment programme at the Pretoria facility; shipments start Q3 2026. Virginia Gas Project targets Phase 1 nameplate capacity in Q3 2026. Commercial shipments of C-14 and Yb-176 targeted for 2026. Long-term supply agreements signed with TerraPower for HALEU fuel core. |
| **Pass 2:** Transcript Red Flags | `"ASP Isotopes" OR "ASPI" "short report" OR "short seller" OR "fraud" OR "SEC investigation" OR "class action" OR "lawsuit"` | 4 | Fuzzy Panda Research short report (Nov 2024) alleging unproven technology, stock promotion, and empty facilities. Federal judge allowed class action securities fraud lawsuit (*Leone v. ASP Isotopes Inc.*) to proceed in part as of December 2025 regarding uranium enrichment capabilities testing. Delayed Q1 2026 10-Q filing. Skyline Builders deconsolidated in March 2026. |
| **Pass 3:** Transcript Moats | `"ASP Isotopes" "TerraPower" OR "Silicon-28" "supply agreement" OR "contract" OR "purchase" OR "order" OR "backlog"` | 4 | Technology protected by patents and design controls. Sourcing contracts with 3 US-based customers for Silicon-28. TerraPower loan agreement provides $22M to support Pelindaba HALEU processing plant construction. High customer concentration acts as a key credit risk factor. |
| **Step B:** Short Seller / Accounting Fraud | `"ASP Isotopes" OR "ASPI" "short report" OR "short seller" OR "fraud" OR "SEC investigation" OR "class action" OR "lawsuit"` | 4 | Federal judge certified the securities fraud class action lawsuit for the September 26 to November 26, 2024 class period. Tentative settlement discussions reported in early 2026. |
| **Step B:** Substack & Specialist Moat Analyses | `"ASP Isotopes" "TerraPower" OR "Silicon-28" "supply agreement" OR "contract" OR "purchase" OR "order" OR "backlog"` | 4 | ASPI has an unconditional order backlog of $459.10M as of Dec 31, 2025. Exposed to high capital intensity and substantial execution risk. |
| **Step B:** National Innovation Agency Checks | `"ASP Isotopes" "NECSA" OR "South African Nuclear Energy Corporation" OR "Vinnova" OR "Innovate UK" OR "Horizon Europe" OR government funding OR DFC` | 3 | Quantum Leap Energy (nuclear subsidiary) signed a pre-implementation services contract with South African Nuclear Energy Corporation (NECSA) in Feb 2026 for a Pelindaba facility. Virginia Gas Project has commitments for $500 million in senior debt from US DFC and $250 million Standard Bank facility. |
| **Step B:** Executive / Leadership Background | `"ASP Isotopes" CEO OR Chairman name background` | 3 | Paul Elliot Mann is co-founder, CEO, and Chairman. Former chemical engineer and hedge fund manager (ex-Morgan Stanley/Soros). Briefly stepped away for health reasons in late 2025, returning on January 19, 2026. |
| **Step B:** CEO Investigation Check | `"Paul Elliot Mann" SEC OR fraud OR bankruptcy OR SPAC OR Soros` | 3 | Paul Mann worked as a hedge fund manager and was affiliated with George Soros's fund. No negative regulatory sanctions, SEC enforcement orders, personal bankruptcies, or fraudulent history identified in search records. |

## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "ASPI",
  "audit_completed_at": "2026-06-06",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "qualification",
        "quote": "Initial commercial shipments of enriched Silicon-28 are expected to commence in the third quarter of 2026, following the successful restart of the Pretoria facility.",
        "speaker": "Paul Mann",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "capacity",
        "quote": "Our HALEU facility at Pelindaba is key to providing a non-Russian source of fuel for next-generation reactors, supported by our long-term supply agreement with TerraPower.",
        "speaker": "Paul Mann",
        "quarter": "Q4 2025"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "related party",
        "quote": "On March 29, 2026, the company deconsolidated Skyline, which is now reported as a discontinued operation, resulting in a gain of $19.6 million.",
        "speaker": "Management",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "material weakness",
        "quote": "A class action lawsuit was filed alleging false and misleading statements about our uranium enrichment capabilities testing.",
        "speaker": "Management",
        "quarter": "Q4 2025"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "customer concentration",
        "quote": "We continue to face risk from customer concentration, with a small number of customers accounting for a substantial portion of our receivables.",
        "speaker": "Management",
        "quarter": "Q4 2025"
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
      4.89,
      16.66,
      4.18
    ],
    "accounts_receivable_converted_to_usd": [
      17.43,
      17.88,
      2.393
    ],
    "contract_assets_unbilled_converted_to_usd": [
      1.80,
      2.33,
      0.0
    ],
    "inventories_converted_to_usd": [
      1.372,
      1.098,
      1.369
    ],
    "stated_backlog_firm_binding_usd": [
      0.0,
      459.10,
      459.10
    ],
    "stated_backlog_non_binding_loi_usd": [
      0.0,
      0.0,
      0.0
    ],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 120,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 150.2,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "1. Receivables growth vs revenue growth %: Revenue fell sequentially by -74.9% (from $16.66M in Q4 2025 to $4.18M in Q1 2026). Total receivables (accounts receivable + contract assets) fell from $20.21M in Q4 2025 to $2.393M in Q1 2026, representing -88.2% sequential growth due to the deconsolidation of Skyline. Sequential growth divergence = -88.2% - (-74.9%) = -13.3%.\n2. Days Sales Outstanding (DSO): Calculated as total receivables (accounts receivable + contract assets) divided by quarterly revenue multiplied by 90 days.\n- Q3 2025: (($17.43M + $1.80M) / $4.89M) * 90 = 353.8 days.\n- Q4 2025: (($17.88M + $2.33M) / $16.66M) * 90 = 109.2 days.\n- Q1 2026: (($2.393M + $0.0M) / $4.18M) * 90 = 51.5 days.\n3. Contract Assets % Receivables: Calculated as contract assets divided by total receivables multiplied by 100.\n- Q4 2025: $2.33M / $20.21M * 100 = 11.5%.\n- Q1 2026: $0.0 / $2.393M * 100 = 0.0%.\n4. Inventory-to-binding backlog ratio: Calculated as Q1 2026 inventories ($1.369M) divided by Q1 2026 binding backlog ($459.10M) = 0.003 (or 0.3%).\n5. Physical hardware assets: Stated at $150.2M, including $130.2M in Renergen natural gas properties and core ASPI property, plant, and equipment net of approximately $20.0M.",
    "receivables_growth_vs_revenue_growth_pct": -13.3,
    "days_sales_outstanding_dso": [
      353.8,
      109.2,
      51.5
    ],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.003
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": true,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
