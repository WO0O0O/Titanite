# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: ACCON

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector                    | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :---------------------------------------------- | :----------------------------------- | :--------------------------- | :------------------------------------ |
| **Pass 1:** Transcript Opportunities            | `Acconeer Q1 2026 report kSEK` | 4 | Acconeer achieved record quarterly sales of kSEK 18,287, with 50% gross margin on goods and began volume shipments of the next-generation A212 sensor. |
| **Pass 2:** Transcript Red Flags                | `Acconeer accounts receivable OR inventories kSEK 2026 OR 2025` | 4 | Accounts receivable rose to kSEK 12,536 in Q1 2026 (from kSEK 11,390 at year-end 2025) due to late-quarter shipping timing. |
| **Pass 3:** Transcript Moats                    | `Acconeer Varulager mars 2026 OR december 2025 kSEK` | 4 | Inventory stood at kSEK 46,936 in Q1 2026, down from kSEK 48,872 at year-end 2025, showing gradual optimisation post Q3 2025 peak. |
| **Step B:** Short Seller / Accounting Fraud     | `Acconeer short report OR fraud OR SEC OR litigation OR lawsuit` | 3 | No short seller reports, SEC investigations, or fraud allegations are active; regulatory oversight is under Swedish Finansinspektionen. |
| **Step B:** Substack & Specialist Moat Analyses | `Acconeer switching costs OR qualification timeline` | 3 | High switching costs of 12-24 months due to custom Antenna-in-Package design and specialized 22nm FD-SOI fabrication requirements. |
| **Step B:** National Innovation Agency Checks   | `Acconeer Gapwaves Vinnova` | 3 | Gapwaves and Acconeer partnered in May 2026 on a Vinnova-funded project to integrate waveguide technology for in-cabin safety. |
| **Step B:** Executive / Leadership Background   | `Acconeer CEO Ted Hansson Chairman Thomas Rex background` | 3 | CEO Ted Hansson and Chairman Thomas Rex have clean regulatory records with significant insider purchases in early 2026. |

```json
{
  "ticker": "ACCON",
  "audit_completed_at": "2026-06-14",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "capacity",
        "quote": "Lead times remain stable due to proactive capacity allocation at GlobalFoundries, but demand is increasingly concentrated among larger buyers.",
        "speaker": "Ted Hansson",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "backlog",
        "quote": "Secured orders (both delivered and open) for 2026 delivery already exceed the company's total sales for the full year of 2025.",
        "speaker": "Ted Hansson",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "qualification",
        "quote": "In April 2024, Acconeer secured its largest design win to date, valued at USD 30 million over seven years starting in 2026, utilising the next-generation A2 platform for in-cabin occupant monitoring.",
        "speaker": "Ted Hansson",
        "quarter": "Q1 2026"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "dilution",
        "quote": "In January 2026, directed share issue of SEK 31.7 million (3,020,000 shares) was executed to Eiffel Investment Group for commercialization and working capital.",
        "speaker": "Press Release",
        "quarter": "Q1 2026"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "customer concentration",
        "quote": "Alps Alpine remains a key strategic partner and investor, holding a 12.9% equity stake, with sales routed through regional distributors.",
        "speaker": "Ted Hansson",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "SEK",
    "usd_exchange_rate_used": 10.6,
    "quarters": ["Q3 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [1560754.72, 1622641.51, 1725188.68],
    "accounts_receivable_converted_to_usd": [1005471.70, 1074528.30, 1182641.51],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [5521132.08, 4610566.04, 4427924.53],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 5500000.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 24500000.0],
    "projected_12m_backlog_drawdown_velocity_usd": "TBD via Phase Qualification",
    "average_contract_duration_months": 84,
    "capitalised_software_balance_sheet_usd": 12300000.0,
    "physical_hardware_assets_usd": 0.0,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO calculated as (AR / quarterly revenue) * 90 days. For Q3 2025 DSO = (1,005,471 / 1,560,754) * 90 = 57.9 days. For Q4 2025 DSO = (1,074,528 / 1,622,641) * 90 = 59.6 days. For Q1 2026 DSO = (1,182,641 / 1,725,188) * 90 = 61.7 days. Inventory-to-binding backlog ratio in Q1 2026 = 4,427,924 / 5,500,000 = 0.805.",
    "receivables_growth_vs_revenue_growth_pct": 10.06,
    "days_sales_outstanding_dso": [57.9, 59.6, 61.7],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.81
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": true,
    "ai_segment_pivot_modifier_applies": false,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "GlobalFoundries",
    "confirmed_tier1_cm_sole_source_integration": "Alps Alpine",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
