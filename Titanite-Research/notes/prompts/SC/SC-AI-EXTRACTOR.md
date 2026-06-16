# CHOKEPOINT RESEARCH REPORT — DATA EXTRACTOR (TURN 1)

### Deep AI supply chain bottleneck analysis — Stock: [TICKER]

---

## WRITING STYLE — MANDATORY

Apply these rules to every word of the output. Do not deviate.

- **Voice and register:** Write like a serious analyst who has thought about this harder than anyone else in the room. Think Leopold Aschenbrenner's _Situational Awareness_ essays crossed with Serenity's X thread style: dense with data, zero throat-clearing, no hedging language, no caveats. Every sentence should carry weight.
- **British English throughout:** Colour, behaviour, organise, licence (noun), recognise, programme, defence, centre, catalogue. Use the Oxford comma.
- **No emojis. Ever.** Do not use tick marks, cross marks, or any Unicode symbol as a substitute for prose judgment.
- **No AI-flavoured filler:** Delete on sight: "It's worth noting that," "It is important to understand that," "In the context of," "This underscores the fact that," "delve into," "nuanced," "multifaceted," "comprehensive," "robust" (unless describing a specific technical property), "leveraging," "ecosystem."
- **No hedging for its own sake:** "May," "might," "could potentially," "it appears that" — use these only when genuine epistemic uncertainty exists and you are flagging it explicitly.
- **Directness:** State the verdict first. Explain it second. Never bury the lede.

---

## STEP 0 — EXECUTION PROTOCOL (Turn 1 Data Extraction)

CRITICAL RESEARCH DEPTH & MULTI-PAGE AUDIT REQUIREMENT:
You are strictly required to avoid the "Satisficing" trap (stopping research early once raw numbers for the JSON block are found). You must run at least 8-10 distinct search queries and parse/visit at least 15-20 separate web pages (such as earnings transcripts, substack analyses, press releases, regional funding agencies, and short reports) to extract qualitative depth on parent entity structures, inventory days, customer concentration credit profiles, and national innovation cooperative realities. Every live search query, results clicked, and qualitative takeaways must be documented in the Search Execution Log table under the `## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)` header.

Do not write a single word of narrative analysis. You must perform the following data gathering and write both the Search Audit Trail Verification table and the raw, structured JSON block to the appropriate Markdown (.md) file located in the correct sub-folder (e.g. `RESEARCH-NOTES/SMALLCAP-AI-INFRA/[industry]/[TICKER]-EXTRACTION-BUFFER.md`) under the `## RAW DATA EXTRACTION BUFFER` header. Do not output this to the chat interface.

**Step A — Transcript keyword sweep (three passes)**

Pull the last three earnings call transcripts for [TICKER]. Run three separate passes.

- _Pass 1 — Opportunity signals:_ Search for every occurrence of:
  - "capacity" / "capacity constraints" / "capacity sold out"
  - "lead times" / "lead time extension" / "delivery"
  - "competitors" / "competitive" / "alternative suppliers"
  - "backlog" / "bookings" / "order book" / "pre-orders"
  - "margins" / "gross margin" / "pricing"
  - "demand" / "customer demand" / "pull" / "urgency"
  - "qualification" / "qualified" / "customer qualification" / "volume ramp" / "mass production"
  - "guidance" / "pipeline" / "visibility"
  - "crypto" / "blockchain" / "validation network" / "decentralised" / "decentralized"
    Extract exact quotes with speaker name and quarter.

- _Pass 2 — Red flag signals:_ Search for every occurrence of:
  - "material weakness" / "internal controls"
  - "related party" / "related-party transaction"
  - "going concern"
  - "SEC" / "regulatory investigation" / "subpoena"
  - "resignation" / "departure" (CFO, auditor, or board member)
  - "restatement" / "restate"
  - "dilution" / "offering" / "equity raise"
  - "ASC 842" / "capitalised software" / "capitalized software" / "bridge debt" / "OID" / "default waiver"

- _Pass 3 — Moat and concentration signals:_ Search for every occurrence of:
  - "certification" / "qualification cycle"
  - "switching" / "switching costs" / "lock-in"
  - "rest of market" / "bookings mix" / "customer concentration"

**Step B — Fraud, short seller, integrity, and deep moat sweep**

Run explicit web and X searches for:

- "[TICKER] short report" or "[TICKER] short seller"
- "[TICKER] fraud" or "[TICKER] accounting"
- "[TICKER] SEC investigation" or "[TICKER] lawsuit"
- "[TICKER] CEO history" or "[TICKER] management background"
- "[TICKER] auditor" or "[TICKER] auditor change"
- Name of the CEO and Chairman: "[Name] fraud," "[Name] SEC," "[Name] bankruptcy," "[Name] SPAC"
- "[TICKER] switching costs", "[TICKER] qualification timeline", "[TICKER] customer certification", "[TICKER] market share"
- Search for industry reports, specialist analyses, Substack write-ups, or X/Twitter discussions relating to the company's technology moat and client concentration changes.
- _Recent News Sweep:_ Search for "[Company Name] press release" and "[Company Name] news" restricted to the last 30 days.
- _National Innovation Agency Checks:_ For European/regional micro-caps, search for the company name alongside regional funding bodies (e.g. "Vinnova", "FFI", "Horizon Europe", "Innovate UK").

**Step C — Forward vs. trailing separation**

Sort evidence into:

- _Trailing documented:_ figures already in filed financials — reported revenue, reported gross margin, filed backlog, published lead times.
- _Forward run-rate signals:_ management language about booking pace, capacity statements, guidance, design-win pipeline, qualification progress, volume ramp timelines.

**Step D — Qualification-cycle or Segment-pivot check**

Determine whether [TICKER] is a qualification-cycle player (forward narrative focus on customer qualification milestones, low/declining trailing revenue, pre-production margins) or a segment-pivot player (companies with active legacy segments but with validated qualifications/design wins in a high-growth AI infrastructure layer that is projected to grow from <10% of revenue to >50% of revenue within 24 months, where trailing metrics are temporarily depressed or volatile due to underabsorbed fixed costs and supply buildouts).

---

## RAW DATA EXTRACTION BUFFER

## SEARCH AUDIT TRAIL VERIFICATION (MANDATORY)

Before writing out the JSON code block, you must populate this exact Search Execution Log. If any row is marked as skipped or left unexecuted, the entire run is invalid.

| Required Target Query Vector                    | Live Search Engine Query String Used | Total Results Clicked/Parsed | Primary Qualitative Insight Extracted |
| :---------------------------------------------- | :----------------------------------- | :--------------------------- | :------------------------------------ |
| **Pass 1:** Transcript Opportunities            |                                      |                              |                                       |
| **Pass 2:** Transcript Red Flags                |                                      |                              |                                       |
| **Pass 3:** Transcript Moats                    |                                      |                              |                                       |
| **Step B:** Short Seller / Accounting Fraud     |                                      |                              |                                       |
| **Step B:** Substack & Specialist Moat Analyses |                                      |                              |                                       |
| **Step B:** National Innovation Agency Checks   |                                      |                              |                                       |
| **Step B:** Executive / Leadership Background   |                                      |                              |                                       |

Output **ONLY** the Search Audit Trail Verification table followed by the raw, structured JSON block matching this schema:

```json
{
  "ticker": "[TICKER]",
  "audit_completed_at": "YYYY-MM-DD",
  "transcript_extracts": {
    "pass_1_opportunities": [
      {
        "keyword": "string",
        "quote": "verbatim quote...",
        "speaker": "name",
        "quarter": "Qx YYYY"
      }
    ],
    "pass_2_red_flags": [],
    "pass_3_moat_concentration": []
  },
  "working_capital_metrics": {
    "reporting_currency": "USD / SEK / EUR",
    "usd_exchange_rate_used": 1.0,
    "quarters": ["Q-2", "Q-1", "Current"],
    "revenue_converted_to_usd": [0.0, 0.0, 0.0],
    "accounts_receivable_converted_to_usd": [0.0, 0.0, 0.0],
    "contract_assets_unbilled_converted_to_usd": [0.0, 0.0, 0.0],
    "inventories_converted_to_usd": [0.0, 0.0, 0.0],
    "stated_backlog_firm_binding_usd": [0.0, 0.0, 0.0],
    "stated_backlog_non_binding_loi_usd": [0.0, 0.0, 0.0],
    "projected_12m_backlog_drawdown_velocity_usd": 0.0,
    "average_contract_duration_months": 0,
    "capitalised_software_balance_sheet_usd": 0.0,
    "physical_hardware_assets_usd": 0.0,
    "operating_lease_liabilities_asc842_usd": 0.0,
    "crypto_validation_revenue_pct": 0.0
  },
  "calculated_ratios": {
    "math_scratchpad_and_workings": "Show step-by-step arithmetic workings for DSO, growth variance, and contract asset ratios here...",
    "receivables_growth_vs_revenue_growth_pct": 0.0,
    "days_sales_outstanding_dso": [0.0, 0.0, 0.0],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.0
  },
  "operational_flags": {
    "working_capital_divergence_detected": false,
    "qualification_cycle_modifier_applies": false,
    "ai_segment_pivot_modifier_applies": false,
    "potential_channel_stuffing_signals": false,
    "confirmed_foundry_reference_design_status": "None / Name of Foundry",
    "confirmed_tier1_cm_sole_source_integration": "None / Name of CM",
    "direct_hyperscaler_custom_asic_design_win": false
  }
}
```

Formula guidelines for calculated ratios:

- **Receivables growth vs revenue growth %**: Delta percentage check over consecutive periods.
- **Days Sales Outstanding (DSO)**: $\left(\frac{\text{Average Accounts Receivable Converted to USD}}{\text{Quarterly Revenue Converted to USD}}\right) \times 90 \text{ days}$
- **Contract Assets % Receivables**: $\frac{\text{Contract Assets Converted to USD}}{\text{Accounts Receivable Converted to USD} + \text{Contract Assets Converted to USD}} \times 100$
- **Inventory-to-binding backlog**: $\frac{\text{Inventories Converted to USD}}{\text{Stated Backlog Firm Binding USD}}$
- **Projected 12m Backlog Drawdown Velocity USD**: Calculate or estimate the dollar value of the firm binding backlog expected to be recognised as revenue over the next 12 months based on management's explicit shipment timelines. 
  - *Qualification-Cycle Rule:* If the company is currently pre-revenue or in a factory-restart phase, but management states that commercial deliveries/shipments are locked into a specific near-term quarter (e.g., Q3 2026), you must NOT default this field to 0.0. Instead, compute the annualised run-rate of those initial shipments or divide the near-term contract value by the contract duration to establish an active, non-zero drawdown velocity baseline. If it is impossible to estimate, state "TBD via Phase Qualification" rather than inserting 0.0.
