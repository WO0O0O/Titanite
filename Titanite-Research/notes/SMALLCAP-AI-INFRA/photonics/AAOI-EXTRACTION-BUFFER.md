# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: AAOI (Applied Optoelectronics, Inc.)

---

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector                    | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :---------------------------------------------- | :----------------------------------- | :--------------------------- | :------------------------------------ |
| **Pass 1:** Transcript Opportunities            | `"Applied Optoelectronics" OR "AAOI" Q1 2026 OR Q4 2025 OR Q3 2025 transcript` | 4 | 800G shipments commenced in Q1 2026; capacity scaling to 650,000 units/month by end of 2026. |
| **Pass 2:** Transcript Red Flags                | `"Applied Optoelectronics" "material weakness" OR "dilution" OR "customer concentration"` | 3 | Material weakness resolved. \$600M ATM equity distribution programme launched. Customer concentration is high (top 10 customer represent 98% of revenue). |
| **Pass 3:** Transcript Moats                    | `"Applied Optoelectronics" backlog Q1 2026 OR Q4 2025` | 3 | Stated backlog is not disclosed as a firm dollar figure; demand is tracked qualitatively. |
| **Step B:** Short Seller / Accounting Fraud     | `"Applied Optoelectronics" OR "AAOI" "short report" OR "fraud"` | 3 | No active short seller reports as of May 2026. Prior litigation resolved. |
| **Step B:** Substack & Specialist Moat Analyses | `"Applied Optoelectronics" OR "AAOI" "Substack" OR "technology moat" OR "switching costs"` | 4 | Moat is built on vertical integration of EML laser chips. Customer qualification creates high switching costs. |
| **Step B:** National Innovation Agency Checks   | `site:sec.gov "Applied Optoelectronics" "contract assets" OR "unbilled" 10-K OR 10-Q 2025 OR 2026` | 3 | No material contract assets; revenue recognized upon delivery/shipment. |
| **Step B:** Executive / Leadership Background   | `"Applied Optoelectronics" "Thompson Lin" background OR history OR SPAC OR bankruptcy` | 3 | Founded in 1997 by Dr. Lin. Not a SPAC, never filed for bankruptcy. |

---

## RAW DATA EXTRACTION BUFFER

```json
{
  "ticker": "AAOI",
  "audit_completed_at": "2026-06-09",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "capacity",
        "quote": "Demand continues to outpace production capacity, a constraint we expect to persist through mid-2027.",
        "speaker": "Dr. Thompson Lin",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "guidance",
        "quote": "Forecast demand is estimated at $1.4–$1.5 billion, while our FY2026 revenue guidance is capped at over $1.1 billion due to capacity limits.",
        "speaker": "Dr. Thompson Lin",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "shipments",
        "quote": "Completed first volume shipment of 800G single-mode transceivers to a large hyperscale customer in Q1.",
        "speaker": "Management",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "capacity",
        "quote": "Tripling laser capacity in Sugar Land, Texas by mid-2027. Approximately 31% of 800G capacity is currently based in the US.",
        "speaker": "Management",
        "quarter": "Q4 2025"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "dilution",
        "quote": "In May 2026, launched a $600 million ATM equity distribution program. In March 2026, expanded a prior ATM program to $500 million.",
        "speaker": "Management",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "concentration",
        "quote": "Three customers individually exceeded 10% of revenue: CATV (44%), Data Center A (26%), and Data Center B (25%).",
        "speaker": "Management",
        "quarter": "Q1 2026"
      }
    ],
    "pass_3_moat_concentration": []
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q3 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [118630000.0, 134270000.0, 151140000.0],
    "accounts_receivable_converted_to_usd": [117000000.0, 244404000.0, 298996000.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [170200000.0, 183105000.0, 206246000.0],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 0.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 0.0],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 0,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 449377000.0,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO Q3 2025 = ((211.452M + 117.0M)/2 / 118.63M) * 90 = 124.6 days. DSO Q4 2025 = ((117.0M + 244.404M)/2 / 134.27M) * 90 = 121.1 days. DSO Q1 2026 = ((244.404M + 298.996M)/2 / 151.14M) * 90 = 161.8 days. Receivables growth check Q1 2026 vs Q4 2025 = (298.996 - 244.404)/244.404 = +22.34%. Revenue growth check Q1 2026 vs Q4 2025 = (151.14 - 134.27)/134.27 = +12.56%. Growth divergence delta = 22.34% - 12.56% = 9.78% (receivables growing faster than revenue).",
    "receivables_growth_vs_revenue_growth_pct": 9.78,
    "days_sales_outstanding_dso": [124.6, 121.1, 161.8],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": true,
    "qualification_cycle_modifier_applies": false,
    "ai_segment_pivot_modifier_applies": true,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
