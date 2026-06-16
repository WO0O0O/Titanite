# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: AXTI

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `AXT Inc AXTI earnings call transcript Q1 2026 Q4 2025 Q3 2025` | 3 | Indium phosphide (InP) demand is accelerating due to the AI infrastructure build-out. Record InP backlog reached over $100 million in Q1 2026, up from $60 million in Q4 2025 and $49 million in Q3 2025. Capacity is planned to double in 2026 and double again in 2027. |
| **Pass 2:** Transcript Red Flags | `site:sec.gov "AXT, Inc." "operating lease" OR "capitalized software" 2025 OR 2026` | 3 | No material weaknesses in internal controls reported in recent filings. BPM LLP was ratified as the independent auditor in June 2026. Noncurrent operating lease liabilities were $1,309k as of Q1 2026. |
| **Pass 3:** Transcript Moats | `AXTI "indium phosphide" competitor OR market share OR "Sumitomo" OR "Freiberger" OR "Wafer Technology"` | 4 | AXTI operates in a functional duopoly with Sumitomo Electric for high-quality InP substrates, featuring massive technical barriers to entry and strict qualification cycles. |
| **Step B:** Short Seller / Accounting Fraud | `"AXT, Inc." OR "AXTI" short report OR short seller OR fraud OR accounting 2024 OR 2025 OR 2026` | 3 | J Capital Research published a short report in April 2024 alleging blocked STAR Market IPO for Tongmei, tax evasion, and related-party transactions, leading to a class-action lawsuit. Discourse today has shifted back to InP growth, though short interest remains around 11–13% of float. |
| **Step B:** Substack & Specialist Moat Analyses | `"AXT, Inc." OR "Tongmei" IPO OR "STAR Market" status 2025 OR 2026` | 3 | Beijing Tongmei's SSE STAR Market IPO remains paused/stalled since late 2022. AXTI bypassed the capital constraints by raising $632.5 million via its own common stock offering on US capital markets in April 2026. |
| **Step B:** National Innovation Agency Checks | `"AXT, Inc." national innovation OR "CHIPS Act" OR "export control" 2025 OR 2026` | 2 | Chinese export permits on gallium/germanium remain a key bottleneck and operational constraint. AXTI is expanding facilities to meet demand but remains exposed to US-China decoupling. |
| **Step B:** Executive / Leadership Background | `AXT Inc AXTI CFO name OR CFO change OR CFO "resignation" OR "Jesse Chen" OR "Gary Fischer"` | 3 | Gary Fischer continues as CFO since 2014, and CEO Morris Young remains in office with 98% support. Young sold $22.3 million in shares after option exercise in June 2026. |

```json
{
  "ticker": "AXTI",
  "audit_completed_at": "2026-06-11",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "backlog",
        "quote": "Our indium phosphide backlog reached a record high of over $100 million.",
        "speaker": "Morris Young",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "capacity",
        "quote": "We are aggressively scaling operations, with plans to double InP capacity in 2026 and again in 2027.",
        "speaker": "Morris Young",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "demand",
        "quote": "Demand is heavily linked to the AI infrastructure build-out and data centre optical components.",
        "speaker": "Morris Young",
        "quarter": "Q1 2026"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "export permit",
        "quote": "The timing of export permits remains the most significant constraint in meeting this strong demand and fulfilling the backlog.",
        "speaker": "Morris Young",
        "quarter": "Q1 2026"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "qualification",
        "quote": "Since customers typically qualify at least two substrate suppliers, AXT's ability to maintain high yields and secure long-term relationships with tier-one customers is central.",
        "speaker": "Morris Young",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q3 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [27955000.0, 23000000.0, 26924000.0],
    "accounts_receivable_converted_to_usd": [33837000.0, 26849000.0, 32016000.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [77656000.0, 81651000.0, 90168000.0],
    "stated_backlog_firm_binding_usd": [49000000.0, 60000000.0, 100000000.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 0.0],
    "projected_12m_backlog_drawdown_velocity_usd": 100000000.0,
    "average_contract_duration_months": 6,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 164622000.0,
    "operating_lease_liabilities_asc842_usd": 1309000.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO calculated as (AR / Revenue) * 90. Q3 2025 DSO = (33,837,000 / 27,955,000) * 90 = 108.93 days. Q4 2025 DSO = (26,849,000 / 23,000,000) * 90 = 105.06 days. Q1 2026 DSO = (32,016,000 / 26,924,000) * 90 = 106.99 days. Revenue growth from Q4 2025 to Q1 2026 = (26,924,000 - 23,000,000) / 23,000,000 * 100 = 17.06%. Receivables growth from Q4 2025 to Q1 2026 = (32,016,000 - 26,849,000) / 26,849,000 * 100 = 19.24%. Divergence is +2.18%. Inventory-to-binding backlog ratio Q1 2026 = 90,168,000 / 100,000,000 = 0.90.",
    "receivables_growth_vs_revenue_growth_pct": 2.18,
    "days_sales_outstanding_dso": [108.93, 105.06, 106.99],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.90
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
