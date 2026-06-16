# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: XNDU

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :--- | :--- | :--- | :--- |
| **Pass 1:** Transcript Opportunities | `"XNDU" "Christian Weedbrook" OR "Michael Trzupek" quote Q1 2026 OR "March 31, 2026" "earnings"` | 3 | Extracted Q1 2026 management commentary on the long-term roadmap towards quantum data centres and utility-scale breakthroughs. |
| **Pass 2:** Transcript Red Flags | `"XNDU" OR "Xanadu Quantum" OR "Crane Harbor" "short report" OR "short seller" OR "fraud" OR "investigation" OR "lawsuit" OR "SEC"` | 3 | Confirmed no active SEC investigations, regulatory actions, or class-action lawsuits. The May 2026 sell-off was a post-SPAC technical supply unlock event, not a fraud event. |
| **Pass 3:** Transcript Moats | `"PennyLane" quantum software library market share OR developer adoption OR downloads OR users` | 4 | PennyLane is a leading hardware-agnostic differentiable quantum programming library integrated with PyTorch and TensorFlow for QML. |
| **Step B:** Short Seller / Accounting Fraud | `"XNDU" OR "Xanadu Quantum" OR "Crane Harbor" "short report" OR "short seller" OR "fraud" OR "investigation"` | 3 | Standard post-SPAC risk factors are present in filings, but there is no active short seller report or accounting fraud allegation. |
| **Step B:** Substack & Specialist Moat Analyses | `"XNDU" OR "Xanadu" silicon photonics foundry OR "GlobalFoundries" OR packaging partner OR manufacturing` | 4 | Xanadu uses a fabless model. Partners include Tower Semiconductor, GlobalFoundries, EV Group, imec, and DISCO for dicing/grinding. |
| **Step B:** National Innovation Agency Checks | `"XNDU" OR "Xanadu" "Strategic Innovation Fund" OR "SIF" loan terms OR interest OR repayable` | 3 | Secured up to C$40 million in conditionally repayable SIF funding from the Canadian government, interest-free, repayable over 20 years starting in 2028. |
| **Step B:** Executive / Leadership Background | `"XNDU" OR "Xanadu" CFO "Christian Weedbrook" OR auditor OR "KPMG" OR "Withum" OR executive team` | 3 | Founder CEO Christian Weedbrook and CFO Michael Trzupek (appointed January 2026) have clean regulatory records. Audited by KPMG LLP. |

```json
{
  "ticker": "XNDU",
  "audit_completed_at": "2026-06-10",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "utility scale",
        "quote": "We are not measuring success in quarters. We are measuring it in the breakthroughs that pave the road towards utility scale quantum computing.",
        "speaker": "Dr. Christian Weedbrook",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "roadmaps",
        "quote": "We are in an investment phase — deliberately allocating capital toward the hardware, software, and talent required to realise the full potential of photonic quantum computing.",
        "speaker": "Michael Trzupek",
        "quarter": "Q1 2026"
      }
    ],
    "pass_2_red_flags": [],
    "pass_3_moat_concentration": [
      {
        "keyword": "differentiable",
        "quote": "PennyLane has become the go-to framework for quantum machine learning due to its differentiable quantum programming paradigm and seamless hardware integration.",
        "speaker": "Industry Review",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q1 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [700.0, 1870.0, 2832.0],
    "accounts_receivable_converted_to_usd": [null, 9477.0, 3673.0],
    "contract_assets_unbilled_converted_to_usd": [null, 1499.0, 1860.0],
    "inventories_converted_to_usd": [null, 8344.0, 6106.0],
    "stated_backlog_firm_binding_usd": [null, null, null],
    "stated_backlog_non_binding_loi_usd": [null, null, null],
    "projected_12m_backlog_drawdown_velocity_usd": "TBD via Phase Qualification",
    "average_contract_duration_months": 12,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 18313.0,
    "operating_lease_liabilities_asc842_usd": 8300.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO computed as (Average Receivables / Quarterly Revenue) * 90. For Q4 2025: (9477 / 1870) * 90 = 455.6 days (includes C$5M grant receivable). For Q1 2026: (3673 / 2832) * 90 = 116.7 days. Receivables growth vs revenue growth: Revenue increased 51.4% sequentially, while Receivables fell 61.2% (excluding grant receivable and transaction costs). Contract assets comprise 50.6% of receivables (1860 / 3673) in Q1 2026.",
    "receivables_growth_vs_revenue_growth_pct": -61.2,
    "days_sales_outstanding_dso": [null, 455.6, 116.7],
    "contract_assets_pct_receivables": 50.6,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": true,
    "ai_segment_pivot_modifier_applies": false,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "Tower Semiconductor, GlobalFoundries",
    "confirmed_tier1_cm_sole_source_integration": "None",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```
