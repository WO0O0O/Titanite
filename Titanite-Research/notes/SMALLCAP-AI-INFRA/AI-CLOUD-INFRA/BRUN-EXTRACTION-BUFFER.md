# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: BRUN

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

| Required Target Query Vector                    | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :---------------------------------------------- | :----------------------------------- | :--------------------------- | :------------------------------------ |
| **Pass 1:** Transcript Opportunities            | `Boost Run Q1 2026 earnings call transcript Blackwell GPU capacity backlog` | 3 | Initial B300 Blackwell capacity is fully allocated. Contracted backlog stands at $1.415 billion with average contract lengths of 36 months. Active B300 deliveries starting H2 2026 represent strong hardware pull. |
| **Pass 2:** Transcript Red Flags                | `Boost Run "material weakness" OR "SPAC" OR "bridge loan" Form 10-Q Q1 2026` | 3 | Delay in Q1 2026 Form 10-Q filing (Form 12b-25 notice). Material control weaknesses reported by management (IT controls, segregation of duties, qualified accounting personnel). Historical February 2026 bridge loan default resolved post-merger via SPAC proceeds. |
| **Pass 3:** Transcript Moats                    | `Boost Run "NVIDIA Exemplar" OR "Thinking Machines" contract` | 4 | Achieved NVIDIA Exemplar Cloud status on Blackwell architecture (1 of 8 globally). Secured $471.7 million, 36-month non-cancelable agreement with Mira Murati's Thinking Machines Lab for 5,000 B300 GPU servers. |
| **Step B:** Short Seller / Accounting Fraud     | `Boost Run OR BRUN short report OR fraud OR SEC` | 3 | Clear of active SEC investigations or going concern opinions. SPAC proceeds ($134.5 million) retired all bridge loans and related-party debt, mitigating pre-merger distress concerns. |
| **Step B:** Substack & Specialist Moat Analyses | `Boost Run "Exemplar Cloud" orchestration software GPU bare metal` | 3 | Bypasses commodity equipment lessor limits via NVIDIA Exemplar Cloud allocation status and exclusive hardware-software co-design pipelines. |
| **Step B:** National Innovation Agency Checks   | `Boost Run federal funding OR US AI cloud security compliance` | 2 | Access to U.S. capital markets and sovereign AI opportunities protected post-SPAC integration. |
| **Step B:** Executive / Leadership Background   | `Andrew Karos CEO Boost Run Galaxy Digital background check` | 3 | CEO Andrew Karos was Head of Electronic Trading at Galaxy Digital (2020-2023). Galaxy settled NY AG allegations in 2025; Karos was not personally named or charged. |

```json
{
  "ticker": "BRUN",
  "audit_completed_at": "2026-06-14",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "backlog",
        "quote": "Our contracted backlog now stands at one point four one five billion dollars, with initial B300 Blackwell capacity fully allocated.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "capacity",
        "quote": "We are actively expanding data centre space to handle pipeline demand and accommodate the volume ramp of our new clusters.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "deliveries",
        "quote": "B300 deliveries starting in the second half of 2026 will drive significant volume revenue expansion.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      }
    ],
    "pass_2_red_flags": [
      {
        "keyword": "weakness",
        "quote": "We identified material weaknesses in our internal controls over financial reporting, specifically relating to IT general controls, segregation of duties, and qualified accounting personnel.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "SPAC",
        "quote": "The closing of the SPAC merger in May 2026 provided one hundred and thirty-four point five million dollars in trust proceeds, which retired all outstanding bridge loans and related-party debt.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      }
    ],
    "pass_3_moat_concentration": [
      {
        "keyword": "Exemplar",
        "quote": "Boost Run is one of only eight cloud providers globally to achieve NVIDIA Exemplar Cloud status on the Blackwell architecture, securing preferred GPU allocations.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      },
      {
        "keyword": "Thinking Machines",
        "quote": "We secured a forty-seven-one point seven million dollar, thirty-six-month non-cancelable contract with Thinking Machines Lab for five thousand NVIDIA B300 GPU servers.",
        "speaker": "Andrew Karos",
        "quarter": "Q1 2026"
      }
    ]
  },
  "working_capital_metrics": {
    "reporting_currency": "USD",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q3 2025", "Q4 2025", "Q1 2026"],
    "revenue_converted_to_usd": [4780000.0, 5160000.0, 10960000.0],
    "accounts_receivable_converted_to_usd": [2500000.0, 2800000.0, 6000000.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [0.0, 0.0, 0.0],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 1415000000.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 3500000000.0],
    "projected_12m_backlog_drawdown_velocity_usd": 157230000.0,
    "average_contract_duration_months": 36,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 0.0,
    "operating_lease_liabilities_asc842_usd": 69300000.0,
    "crypto_validation_revenue_pct": 21.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "DSO calculated as (Accounts Receivable / Quarterly Revenue) * 90. Q3 2025 DSO = (2,500,000 / 4,780,000) * 90 = 47.07 days. Q4 2025 DSO = (2,800,000 / 5,160,000) * 90 = 48.84 days. Q1 2026 DSO = (6,000,000 / 10,960,000) * 90 = 49.27 days. Sequential revenue growth Q4 2025 to Q1 2026 = (10.96 - 5.16)/5.16 * 100 = 112.4%. Sequential accounts receivable growth Q4 2025 to Q1 2026 = (6.00 - 2.80)/2.80 * 100 = 114.29%. Sequential variance = 114.29% - 112.4% = +1.89%. Inventory-to-binding backlog ratio = 0.00 as physical inventory is not carried on the balance sheet under the ASC 842 finance lease model.",
    "receivables_growth_vs_revenue_growth_pct": 1.89,
    "days_sales_outstanding_dso": [47.07, 48.84, 49.27],
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
