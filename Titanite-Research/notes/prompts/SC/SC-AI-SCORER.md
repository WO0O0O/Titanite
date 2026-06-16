# CHOKEPOINT RESEARCH REPORT — ANALYTICAL SCORER (TURN 2)

### Deep AI supply chain bottleneck analysis — Stock: [TICKER]

---

## WRITING STYLE — MANDATORY

Apply these rules to every word of the output. Do not deviate.

- **Voice and register:** Write like a serious analyst who has thought about this harder than anyone else in the room. Think Leopold Aschenbrenner's _Situational Awareness_ essays crossed with Serenity's X thread style: dense with data, zero throat-clearing, no hedging language, no caveats. Every sentence should carry weight.
- **British English throughout:** Colour, behaviour, organise, licence (noun), recognise, programme, defence, centre, catalogue. Use the Oxford comma.
- **Spelling Compliance Sweep:** You must run a mental compliance sweep on all spelling tokens before outputting. Check specifically for Americanised spellings of operational words. Banned tokens: "utilization", "optimization", "characterization", "organization", "center". You must write "utilisation", "optimisation", "characterisation", "organisation", "centre" with zero leakage.
- **No emojis. Ever.** Do not use tick marks, cross marks, or any Unicode symbol as a substitute for prose judgment.
- **No AI-flavoured filler:** Delete on sight: "It's worth noting that," "It is important to understand that," "In the context of," "This underscores the fact that," "delve into," "nuanced," "multifaceted," "comprehensive," "robust" (unless describing a specific technical property), "leveraging," "ecosystem."
- **No hedging for its own sake:** "May," "might," "could potentially," "it appears that" — use these only when genuine epistemic uncertainty exists and you are flagging it explicitly.
- **Directness:** State the verdict first. Explain it second. Never bury the lede.
- **Numbers over adjectives:** Quantify where a number exists.
- **Short sentences when making the most important points.**
- **Anti-Condensation/Token Exhaustion Guardrail:** You must provide extensive, detailed, and completely uncompressed analysis for every section. Do not combine, shorten, skip, or summarize outputs to save tokens. Every sub-question and diagnostic item must be explicitly written out as a separate clause or bullet point.
- **Framework governance:** All framework modifications must be logged in `/docs/CHANGELOG.md`. Tier 1/2 positions should be tracked in `/docs/CATALYST-TRACKER.md` for event monitoring.

---

## CONTEXT INPUT LAYER

Before proceeding, locate and read the target Markdown (.md) file located in the correct sub-folder (e.g. `RESEARCH-NOTES/SMALLCAP-AI-INFRA/[industry]/[TICKER]-[company-name].md`). Extract and parse the exact JSON block located under the `## RAW DATA EXTRACTION BUFFER` header.

This JSON block acts as your immutable data layer. Any scores, calculations, or evaluations in the sections below must reconcile with the values and flags defined in this buffer. All scoring sections, calculations, and the final compiled research report must be written directly to the target Markdown (.md) file located in the correct sub-folder (e.g. `RESEARCH-NOTES/SMALLCAP-AI-INFRA/[industry]/[TICKER]-[company-name].md`), rather than outputting to the chat interface.

---

## SECTION 00 — CRITICAL MATERIAL OVERHANG AUDIT

Examine the `pass_2_red_flags` array and the `operational_flags` inside your Raw Data Extraction Buffer. If there are active class-action lawsuits, federal regulatory investigations, or outstanding short seller fraud allegations, you must explicitly output an alert block here before proceeding to the gate check. 

If no severe overhangs are present, state: "Active Risk Overhang: CLEAN."

If active overhangs exist, you must format this section exactly as follows:

> [!WARNING]
> **ACTIVE CORPORATE / SECURITIES LITIGATION WARNING:** [TICKER] is currently exposed to material legal or regulatory headwind: [Name of Lawsuit/Investigation/Short Report]. You must explicitly summarise the exact baseline allegations concerning the company's core technology, financial statements, or executive integrity here. This risk must be explicitly reconciled against your forward thesis in the final synthesis.

---

## GATE CHECK — MARKET CAP FILTER

State the baseline capital structure parameters of [TICKER]. To prevent rounding errors or unverified valuation tracking, you are strictly forbidden from writing single hardcoded totals without detailing the underlying structural inputs. Fill out the following schema exactly:

* **Current Stock Price:** $___ (As of [Date])
* **Common Shares Outstanding:** ___ (From most recent 10-Q/10-K filing)
* **Market Capitalisation:** $___ (Calculated as Stock Price x Shares Outstanding)
* **Cash and Short-Term Investments:** $___ million (From most recent balance sheet)
* **Total Debt & Convertible Notes Payable:** $___ million
* **Net Debt Position:** $___ million (Calculated as Total Debt minus Cash)
* **Enterprise Value (EV):** $___ million (Calculated as Market Capitalisation plus Net Debt)

**Hard gate: if [TICKER] has a market cap above $5 billion, stop here. Do not continue.**

If it qualifies, also state:
* **Realistic bull-case market cap in 24–36 months if thesis plays out:** $___ billion
* **Multiple expansion embedded in that target:** Calculate and explicitly state the current trailing annualised P/S or EV/Sales multiple based on your extraction buffer. If the future target multiple (e.g. 5x) is lower than the current multiple, explicitly label the valuation shift as "Multiple Contraction offset by Volumetric Revenue Scale-Up" instead of "Multiple Expansion Target".
* **Implied return from today's price to that target:** ___x return (Minimum acceptable implied return is 5.0x / 500% for hardware, 4.0x / 400% for software).

---

## FRAMEWORK MODIFIERS — DETECTING UNPRICED ASYMMETRY

Read the `qualification_cycle_modifier_applies` and `ai_segment_pivot_modifier_applies` flags in the JSON buffer. If either is `true`, apply the following risk-mitigation rules to prevent premature penalisation of companies during initial infrastructure scaling phases:

- **Section 3 (Demand > Supply):** Do not penalise for low, declining, or yield-depressed trailing gross margins (underabsorbed initial scaling costs are exempt). Weight forward booking language, raw material purchases, customer queue signals, and verbal capacity commentary at full value.
- **Section 4 (Revenue Inflection):** Do not score based on trailing quarterly revenue tables. Score 1 if there is documented evidence of leading indicators of inflection (e.g. raw materials inventory growth >20% sequentially, or DPO expansion indicating component hoarding for builds), or qualification progress and volume ramp timelines.
- **Section 9 (Recent Capital Raise):** Do not evaluate capital based on historical cash runway alone. Score 1 if the company has a documented track record of continuous capital access (ATM programmes, directed share issues, strategic investments, debt facilities) bridging the gap to the volume ramp.
- **Section 12 (Integrity & Execution):** Do not penalize for missing near-term quarterly estimates or maintaining/lowering near-term revenue guidance due to customer qualification timelines. Sequential DSO growth of up to 50% does not trigger the Working Capital Divergence monitor penalty if it is audited as shipment timing variance (late-quarter shipping) with clean collections, and contract assets above 30% are exempt if driven by NRE milestones. Allow the operational Branch Beta tracking (operational milestones) instead of consensus beats.
- **Section 5 (Small Cap / Asymmetry Gate Override):** If `ai_segment_pivot_modifier_applies` is `true`, allow an override for the market cap gate and return multiple hurdle if the consensus gap exceeds **2.0x**, scoring Section 5 a **1 / 1** if the model asymmetry is deterministically verified.

---

## SECTION 0 — THE STRAIT OF HORMUZ TEST

Map the complete supply chain for [TICKER]'s primary product from raw material to hyperscaler end-use:

1. What is the layer directly upstream? (raw materials, substrates, equipment, chemicals)
2. What is [TICKER]'s exact position — what do they take in and what do they produce?
3. What is the layer directly downstream? Who cannot ship without [TICKER]?
4. Trace to the hyperscaler end-use: which AI infrastructure project does this ultimately feed?
5. If [TICKER] disappeared tomorrow, what breaks and how fast? Name the specific companies affected.
6. Every known competitor or substitute. Monopoly, duopoly, or oligopoly?
7. Strait of Hormuz test: what percentage of total global industry flow passes through [TICKER]? Give a number or range with source.
8. Switching costs: how long would it take a customer to qualify an alternative supplier?
9. **Cloud & Operations (Layer O) Moat Audit:** For cloud, hosting, or colocation providers: does the provider yield full control of the equipment to the customer, retaining no operating rights under GAAP (ASC 842)? What is the value of capitalised software on the balance sheet relative to physical hardware assets? If the provider sells undifferentiated bare metal with negligible software IP (e.g. under $1M capitalised software) and retains no operating rights, it must be classified as a **COMMODITY SUPPLIER (Equipment Lessor)**. (Physical hardware, materials, semiconductor component developers, and cloud providers holding exclusive Tier 1 OEM chip allocation certifications—such as NVIDIA Exemplar Cloud status—are exempt from this software/lease audit).

- **The Architectural Moat Override:** You must evaluate the technology layer based on forward design-in status, not trailing production volume. If the extraction buffer (`operational_flags`) confirms that [TICKER] holds any of the following, you are mathematically barred from issuing a 'Commodity Supplier' verdict: 1. Status as a foundry-level reference design for a major semiconductor platform (e.g. `confirmed_foundry_reference_design_status` is not "None"). 2. Stated sole-source integration into a Tier 1 contract manufacturer's platform (e.g. `confirmed_tier1_cm_sole_source_integration` is not "None"). 3. Direct design-win inclusion in non-hot-swappable merchant CPO frameworks or hyperscaler custom ASIC programmes (e.g. `direct_hyperscaler_custom_asic_design_win` is `true`).
  If any of these conditions are met, the verdict must automatically default to a minimum of PARTIAL CHOKEPOINT or CHOKEPOINT, regardless of current global volumetric market share. To validate this override, you must explicitly cite the specific balance sheet line-item, unbilled contract asset, or Non-Recurring Engineering (NRE) development revenue metric from the Raw Data Extraction Buffer that accounts for the design-win validation.

**Required verdict:** CHOKEPOINT / PARTIAL CHOKEPOINT / COMMODITY SUPPLIER

If COMMODITY SUPPLIER, stop. The thesis does not meet the framework.

---

## SECTION 1 — WHICH AI INFRA BOTTLENECK DOES IT SOLVE?

_1 point_

Identify which specific, physically-constrained AI infrastructure bottleneck [TICKER] directly addresses:

- **Power:** 100kW+ per rack requirements, grid supply constraints
- **Optical interconnect:** GPU-to-GPU speed hitting electrical limits; optical is the only path
- **Memory bandwidth:** HBM4/HBM5 required for next-gen AI chips; fewer than three suppliers globally
- **Cooling:** Liquid cooling mandatory for 1,000W+ GPUs; air cooling cannot remove the heat
- **Advanced packaging:** 2.5D/3D chip stacking capacity does not exist at scale
- **Data storage:** AI training generates petabytes per run; nearline HDD capacity fully booked
- **Chip inspection and test:** HBM stacking requires 8–16× more optical inspections per wafer
- **Substrates and materials:** InP, GaAs, SiC, GaN — without which optical or RF components cannot be made
- **Other:** Define the bottleneck precisely

Quantify the gap, name the hyperscalers affected, and explain why [TICKER] is a primary solver rather than a peripheral beneficiary.

**Score 1 point** only if the bottleneck is specific and quantifiable and [TICKER] is a primary solver.

---

## SECTION 2 — HYPERSCALER LINKAGE

_1 point_

1. Who are [TICKER]'s direct customers? Trace to the end buyer.
2. Are any of AWS, Google Cloud, Microsoft Azure, Meta, Oracle, NVIDIA, or their Tier 1 suppliers ultimately dependent on [TICKER]'s product?
3. Confirmed design-ins, qualifications, or supply agreements? Quote with date.
4. What percentage of revenue is driven by AI infrastructure capex vs. legacy applications?
5. Any "pull" signals — increased order volumes, shortened procurement cycles, public statements referencing [TICKER]'s technology?

**Score 1 point** only if confirmed hyperscaler linkages or Tier 1 supplier relationships exist with documentary evidence. (For edge-AI, robotics, or other niche hardware, industry-specific Tier 1 supplier relationships — such as automotive Tier 1 integrators or major industrial distributors — are accepted as Tier 1 connections).

---

## SECTION 3 — DEMAND OUTWEIGHS SUPPLY

_2 points_

**Sub-section A — Trailing documented evidence**

1. Reported gross margin for the last 4 quarters — provide the table
2. Reported backlog or deferred revenue — is it growing faster than revenue?
3. Price increase announcements in press releases or regulatory filings in the past 12 months
4. Any "sold out" or "capacity constrained" language in filed documents
5. **Idle GPU Capacity Check (Layer O):** For dedicated GPU cloud providers, is any portion of revenue derived from decentralized networks (e.g. blockchain rewards or token validation)? If an AI cloud provider directs GPU clusters to validation networks during a global hardware shortage, it indicates an inability to secure commercial enterprise tenants. Deduct 1 point from Section 3 if crypto rewards exceed 10% of revenue and forward contracted backlog/pipeline remains dominated (>20%) by validation networks, unless the company is a transitioning miner utilizing legacy ASIC/non-GPU infrastructure or the validation activity was a temporary capacity-fill measure during the initial cluster ramp.

**Sub-section B — Forward run-rate signals**

1. Has management stated in any of the last three earnings calls that current production is fully allocated or that demand exceeds supply? Quote verbatim from the JSON buffer.
2. Has management stated they are not monitoring competitors because anything they produce is immediately purchased? Quote verbatim.
3. What has management said about current lead times or delivery timelines? Is urgency increasing across successive quarters?
4. What has management said about forward booking visibility? How many quarters out can they see demand?
5. Is the direction of travel in management's language becoming more or less confident across the last three calls?

**Score 2:** Shortage clearly signalled in management language AND showing in at least some trailing metrics. **Score 1:** Supply tightness emerging in forward language or lead time data but not yet in reported financials. **Score 0:** No supply constraint language anywhere in transcripts, no lead time extension, no backlog growth.

---

## SECTION 4 — REVENUE INFLECTION AFTER MULTI-YEAR TROUGH

_1 point_

**Sub-section A — Trailing documented**
Quarterly revenue table from Q1 2023 through most recent quarter. YoY % and sequential % change for each quarter. Identify the trough quarter and its cause. Count consecutive quarters of revenue acceleration since the trough.

**Sub-section B — Forward run-rate signals**

1. What has management said about the current quarter's revenue trajectory?
2. Any booking, pipeline, or demand visibility commentary implying near-term acceleration?
3. Shape of management confidence — increasing, stable, or declining across last three calls?
4. For qualification-cycle players: has the volume ramp timeline moved forward or back? Has any major customer dropped out? Is management more or less confident in the mass production date than last quarter?

**Score 1:** 2+ consecutive quarters of accelerating revenue from a documented trough (trailing evidence), OR credible and specific management language indicating the inflection or volume ramp is underway (forward evidence), with gross margin holding or improving. _(Note: If the forward revenue inflection or volume ramp calculation relies heavily on non-binding LOIs/MOUs/frame agreements without a signed, binding commercial delivery timeline—as extracted in the JSON buffer under `stated_backlog_non_binding_loi_usd`—you must automatically reduce the Evidence Quality score to 'Weak' for Section 4)._
**Score 0:** No evidence of acceleration in either trailing financials or forward management language.

---

## SECTION 5 — SMALL CAP / ASYMMETRIC UPSIDE

_1 point_

1. Market cap and enterprise value? (Confirmed under $5B at gate check)
2. Bull-case market cap in 24–36 months?
3. Current EV/Revenue or P/S vs. comparable large-cap peers at maturity?
4. **Return maths explicitly mapped using the cluster scaling model**: Execute the step-by-step calculation check to determine return asymmetry. You must write out your step-by-step calculations in a raw Markdown table matrix before declaring the final return multiple. Do not calculate this inline or state the multiple without showing the arithmetic steps. Show all arithmetic using the following schema:

   a. **Compute Node Normalisation**: Identify the target cluster size. If reported in next-gen units (e.g. Blackwell/B200), normalise to H100 compute/power equivalents or state the upgraded kW-per-slot footprint explicitly.

   b. **Calculate Implied Power Demand (MW)**:
   $$\text{Implied Power (MW)} = \text{Projected Cluster Size (H100 equivalents)} \times 0.001 \text{ MW/GPU}$$
   _(Note: If using next-gen high-density architectures, adjust the multiplier up to 0.0016 - 0.002 MW/slot as physically required)._

   c. **Define Layer-Specific Spend Anchor**:
   * **For Layers P, F, C, O, S, G:** State and justify the dollar spend *per MW* ($C_{\text{layer}}$) that belongs exclusively to [TICKER]'s layer of the stack.
   * **For Layer N:** State and justify the _total baseline dollar spend_ ($C_{\text{base}}$) for [TICKER]'s layer of the stack across an entire standard 100,000 GPU cluster footprint.

   d. **Calculate Layer TAM**:
   _ **For Layers P, F, C, O, S, G:**
   $$\text{Layer TAM} = \text{Implied Power Demand (MW)} \times C_{\text{layer}}$$
   _ **For Layer N (Networking Super-Linear Scaling Rule):**
   $$\text{Layer TAM} = C_{\text{base}} \times \left(\frac{\text{Projected Cluster Size}}{100,000}\right)^{1.2}$$

   e. **Calculate Implied Ticker Revenue**:
   $$\text{Implied [TICKER] Revenue} = \text{Layer TAM} \times \text{[TICKER]'s Estimated Market Share}$$

   f. **Implied Return Math**: Apply a justified target multiple (EV/Sales or P/S) to future revenue to derive bull-case market cap, then divide by current market cap to get implied return.

| Arithmetic Step | Variable/Rule Factor                                         | Implied Value | Workings / Notes |
| :-------------- | :----------------------------------------------------------- | :------------ | :--------------- |
| **Step A**      | Target Cluster Size (H100 equiv)                             |               |                  |
| **Step B**      | Implied Power Demand (MW)                                    |               |                  |
| **Step C**      | Layer Spend Anchor ($C_{\text{layer}}$ or $C_{\text{base}}$) |               |                  |
| **Step D**      | Total Layer TAM ($USD$)                                      |               |                  |
| **Step E**      | Implied Ticker Revenue ($USD$)                               |               |                  |
| **Step F**      | Bull Case Valuation Target                                   |               |                  |
| **Step G**      | Asymmetric Return Multiple                                   |               |                  |

5. **REVENUE EXPANSION SANITY CHECK**: Perform a strict comparison between your calculated Implied Ticker Revenue (from the Section 5 Matrix) and the company's current trailing annualised corporate revenue. If the implied AI revenue is lower, equal, or flat relative to the trailing corporate baseline, you must explicitly flag this growth variance delta in the workings and write-up. Do not project positive revenue growth in your Gate Check or narrative if the physical cluster-scaling math implies a flat or negative growth vector.

**Score 1 point** only if the return maths produces at least 4× from today's price for software-dominant businesses (due to their higher gross margins and recurring revenue profile) or at least 5× for hardware-dominant businesses under a realistic deployment scenario.

---

## SECTION 6 — R&D TO SCALING TRANSITION

_1 point_

1. Current stage: Pre-revenue / R&D / Early Commercial / Volume Ramp / Mature?
2. Specific milestones that trigger revenue inflection — name them precisely
3. Key qualifications, certifications, or volume ramp announcements recently achieved? Quote with date.
4. Management's stated gross margin at scale vs. current gross margin — the gap is the operating leverage
5. Timeline from today to meaningful revenue? (Acceptable: 6–24 months)
6. Specific risks that could delay the transition?

**Score 1 point** only if there is a clear, near-term (6–24 month) transition to volume revenue with named catalysts and a credible management timeline.

---

## SECTION 7 — CUSTOMER CONCENTRATION WITH HYPERSCALERS

_1 point_

1. Top customer % of revenue? Top 3? Top 5? (Annual report customer concentration section)
2. Any top customers confirmed as hyperscalers or their direct Tier 1 suppliers?
3. Design wins disclosed even if customers unnamed?
4. Contract structure: spot, multi-year supply agreements, or take-or-pay?
5. Single customer loss scenario: revenue impact and implied stock price?
6. Customer concentration rate of change: calculate the growth rate of bookings and revenue outside the top-2 customers. Is the concentration risk actively dissolving?
7. **Counterparty Credit & Aggregator Audit:** Are the top customers pre-revenue startups, GPU brokers/aggregators, or related-party entities? In small caps, high concentration is normal; however, concentration must be audited for credit quality. If the customer book represents adverse selection (pre-revenue counterparties carrying high default risk), deduct 1 point. (Pre-revenue startup counterparties do not trigger this deduction if they are backed by Tier 1 venture capital or strategic partners exceeding a $100M funding threshold).

Acceptable thresholds: top customer >25%; top 3–5 >50%; confirmed hyperscaler or Tier 1 design-in even if undisclosed.

**Score 1 point** only if thresholds are met with confirmed hyperscaler or Tier 1 connections AND counterparty credit check is passed (no deduction under item 7).

---

## SECTION 8 — TECHNOLOGY LEADERSHIP / FIRST-MOVER ADVANTAGE

_1 point_

1. First to market, best-in-class, or only supplier?
2. Technology lead over nearest credible competitor in months?
3. Technical barriers to displacement in 24 months: patents, manufacturing know-how, capex to replicate, qualification time, regulatory approvals?
4. Any competitor with a credible roadmap to displace [TICKER] within 24 months?
5. Government or geopolitical moat: export controls, CHIPS Act, domestic content requirements, national security designations?

**Score 1 point** only if defensible 12–24 month technology lead, clear structural moat, or near-monopoly / duopoly positioning with evidence.

---

## SECTION 9 — RECENT CAPITAL RAISE

_1 point_

1. Any equity offerings, convertible notes, or ATM programmes in the past 12 months? Size and date?
2. Use of proceeds — quote directly from prospectus or press release
3. Timing: raised near trough or near a recent peak?
4. Dilution as % of shares outstanding: under 10% acceptable; over 20% requires justification
5. Post-raise stock performance: held / rallied (bullish) or continued falling (bearish)?
6. **Bridge Debt & Default Audit:** Review pre-listing or pre-merger bridge debt. Was there any amendment including a waiver of existing defaults, high original issue discounts (OID), or interest rates indicating distressed liquidity? If yes, score Section 9 a 0 and flag under Section 12 (Management Integrity).

Green flags: "expand manufacturing capacity," "fund growth capex," raised near trough, small dilution. Red flags: "debt repayment," "extend runway," raised at recent high, stock continued declining post-raise, or distressed debt/defaults under item 6.

- For Qualification-Cycle Players, do not evaluate capital based on historical cash runway alone. Score the section 1 if the company has a documented track record of continuous capital access (e.g. directed share issues, strategic corporate investments, or institutional loan facilities) that bridges the gap to the stated high-volume volume manufacturing inflection point.

**Score 1 point** only if the recent capital raise (or the documented continuous capital access pathway for verified Qualification-Cycle Players) was executed for growth infrastructure scaling, was well-timed, was non-distressed, features proportionate dilution, and the bridge debt audit is clean (no defaults or OID penalties; historical defaults or default waivers do not disqualify the score under Section 9 if they were fully retired, settled, or restructured as a condition of a completed merger or capital raise that leaves the company with a positive net working capital position).

---

## SECTION 10 — SECULAR AND CYCLICAL TAILWINDS

_1 point_

**Secular (10-year structural):**

1. What is the underlying structural driver? Still valid in 2030+?
2. Market size growing at \_\_\_% annually — source?
3. Is the physical reason for demand growth irreversible?
4. Does demand survive a 30% AI capex cut for one year?

**Cyclical (1–3 year near-term):**

1. What specific industry upcycle is occurring in 2025–2027 that benefits [TICKER]?
2. What trough preceded it, when did it begin, and how far through are we?
3. Duration of the cyclical driver — when does this upcycle likely peak?

**Score 1 point** only if BOTH a clearly articulated secular trend AND a near-term cyclical recovery are present, compounding simultaneously, with quantitative support for both.

---

## SECTION 11 — UNDER-FOLLOWED AND UNDER-RESEARCHED

_1 point_

1. How many sell-side analysts currently cover [TICKER]? (Target: fewer than 15)
2. Current institutional ownership %?
3. Has the stock been dismissed as "legacy tech," "dying industry," or "meme stock"?
4. Structural reasons for being ignored: foreign listing, ticker data errors, too small for mandates, esoteric supply chain role?
5. Genuine information asymmetry between consensus belief and supply chain data?

**Score 1 point** only if fewer than 15 analysts cover it, not dominated by institutional ownership, and documented information asymmetry exists.

---

## SECTION 12 — MANAGEMENT INTEGRITY AND EXECUTION

_1 point_

State the exact boolean state of `working_capital_divergence_detected` from the pasted JSON buffer as your first line of output for this section. If true, and the Qualification-Cycle modifier does not apply, you are mathematically barred from analysing Component B or scoring this section above 0.

This section has two components. A management team with a history of fraud, SPAC failures, or regulatory investigations disqualifies the thesis regardless of how well the company scores elsewhere. Run the integrity audit first. If it fails, score this section 0 and flag the finding prominently.

**Component A — Integrity audit**

1. Has any member of the current executive team or board been involved in a prior company that: went bankrupt under their leadership, was subject to a regulatory enforcement action, was delisted from a major exchange, or collapsed following a SPAC transaction? Name the companies and outcomes.
2. Has [TICKER] changed its auditor in the last 24 months? If yes, why? Did the departing auditor issue any qualified opinion, material weakness finding, or going-concern note before leaving?
3. Has the current auditor flagged any material weaknesses in internal controls in the most recent annual filing?
4. Are there any ongoing or recently settled regulatory investigations, class action lawsuits, or shareholder derivative suits?
5. Are there related-party transactions disclosed in the filings? If yes, describe them. Do they appear to benefit insiders at the company's expense?
6. **Working Capital Anomaly Check**: Calculate the directional variance between revenue growth and key working capital accounts over the last three quarters (derived from the Extraction Buffer):
   - Days Sales Outstanding (DSO): Is the collection cycle lengthening while revenue accelerates? **Trigger threshold:** DSO expanding by >15% on a quarter-over-quarter basis for 2 consecutive quarters, OR Y/Y DSO expansion >25%
   - Unbilled Receivables / Contract Assets: Is the company recognizing revenue on long-lead infrastructure rollouts before hitting billing milestones? **Trigger threshold:** Contract assets comprise >30% of total receivables (receivables + contract assets), AND the company is post-revenue with >$50M in trailing twelve-month revenue. Pre-revenue companies in qualification cycles are exempt from this threshold.
   - Inventory-to-Backlog Ratio: Is physical inventory accumulating faster than the stated near-term backlog drawdown timeline implies?
   
   If working capital divergence is detected, you must automatically downgrade Section 12 to a maximum score of 0, activate a 'Working Capital Divergence' monitor flag, and look for signs of channel-stuffing or aggressive revenue recognition.
   
   - **Pre-Volume Working Capital Calibration:** For companies verified under the 'Qualification-Cycle Player' or 'Segment-Pivot Player' modifier, a contract assets-to-receivables ratio above 30% does not trigger an automatic score of 0 or a 'Working Capital Divergence' flag if those assets are fundamentally driven by Non-Recurring Engineering (NRE) development milestones or hardware validation phases with Tier 1 customers. Sequential DSO expansion up to 50% does not trigger the automatic downgrade if it is documented as a shipment timing variance with clean collections.
   - **Memory Drift Verification Check:** Check the `working_capital_divergence_detected` flag in your Raw Data Extraction Buffer. If this flag is set to `true` (and neither the Qualification-Cycle nor the Segment-Pivot modifier applies), you are mathematically barred from scoring Section 12 above 0.

**MANDATORY: Working Capital Override Log**

Every report must include this section immediately after the integrity audit:

```markdown
### Working Capital Override Log
**Working Capital Divergence Detected:** YES / NO
**If YES:**
- Specific metric triggering flag: [DSO expansion / Contract assets ratio / Inventory accumulation]
- Quantified magnitude: [X% DSO increase Q/Q, Y% contract assets ratio]
- Management explanation: [Direct quote from filings/transcripts]
- Resolution timeline: [Expected quarter of normalization]
- Qualification-Cycle or Segment-Pivot Exemption Applied: YES / NO
- If exemption applied, justification: [NRE milestone revenue / Customer qualification phase / Segment transition]
```

If any integrity audit finding is negative (prior fraud involvement, going concern, auditor changes with unexplained departures, active regulatory investigation, material weakness, or triggering the 'Working Capital Divergence' monitor flag without qualifying for the NRE/Qualification-Cycle/Segment-Pivot Exemption) — score this section 0 and escalate to a prominent warning at the top of the report.

**Component B — Execution track record**

1. How many consecutive quarters has [TICKER] beaten consensus EPS? Revenue estimates? (Target: 3+)
2. Has management raised forward guidance — not merely maintained it — at least once in the past four quarters?
3. Review prior calls for specific promises: new customer announcements, production targets, margin improvement timelines. Were they delivered? List any that were not.
4. Insider ownership % and any open-market purchases in the past 12 months?
5. Has guidance historically proved conservative (beats guidance consistently) or optimistic (misses consistently)?

**Score 1 point if the integrity audit is fully clean (scoring 1) AND either of the following operational conditions is satisfied:**

- **Branch Alpha (US/Consensus Covered):** There are 3+ consecutive quarterly earnings beats against multi-analyst consensus estimates AND forward guidance has been raised at least once in the past four quarters.
- **Branch Beta (European/Pre-Consensus/Qualification-Cycle/Segment-Pivot Equities):** For companies with low multi-analyst coverage pools, those operating under European First North/Spotlight reporting rules, or segment-pivot players whose legacy segments distort consensus, the company has successfully achieved 2+ consecutive quarters of documented operational qualification milestones (e.g., tape-outs, reference design inclusions, strategic customer design-wins, or volume shipment qualifications) with zero customer cancellations or project abandonment on record.

---

## SECTION 13 — ADVERSARIAL TESTING: STEEL-MAN THE BEAR CASE

Run the strongest possible bear case before concluding. If a short report exists, it must be addressed here claim by claim.

**MANDATORY STRUCTURE:** You are strictly forbidden from condensing this section or combining headings. You must write out each of the following eight headings explicitly as its own sub-section header and provide a detailed, data-dense analysis:

- **Thesis Killer:** The single most credible scenario in which this thesis fails completely within 24 months — specific mechanism, not generic macro risk.
- **Short Report Reconciliation:** If an active short thesis exists, summarise its core allegations and cross-verify them against the **Architectural Moat Override** and filed tech specs. Run the **Forensic Conflation Check**: determine if the short seller is committing an architectural or generational boundary error (e.g., citing an alternative legacy component supplier to claim the target company has been displaced, while failing to recognise that the downstream architecture is shifting to a completely different physical substrate or wavelength standard, such as GaAs/GaAsP to Indium Phosphide tunable arrays). Reconcile these claims using verified ecosystem documentation (foundry PDKs, MSA standards, or Tier 1 contract manufacturing partnerships) from the extraction buffer.
- **Substitute Threat:** Who is building a substitute right now? Timeline to volume production? How credible?
- **Concentration Stress Test:** Model a loss of the largest single customer — revenue impact and implied stock price.
- **Technology Skip Risk:** Any risk that next-gen AI architecture bypasses [TICKER]'s product entirely?
- **Balance Sheet Risk:** Cash, total debt, quarterly burn, quarters of runway, next debt maturity, dilution probability.
- **Structural vs. Temporary:** Genuine 5–10 year structural chokepoint or an 18-month window closing as competitors ramp?
- **Capex Cut Scenario:** If hyperscaler AI capex is cut 40%, model the revenue impact specifically.

**Rate the overall bear case:** WEAK / MODERATE / STRONG

If STRONG — explain in detail why the bull case still wins. If a short report allegation cannot be refuted, state that the thesis requires resolution of those allegations before a position is justified.

---

## SECTION 14 — GEOPOLITICAL DIMENSION

1. Does [TICKER]'s supply chain pass through China at any layer? Map each layer explicitly.
2. Are any key inputs subject to Chinese export restrictions? (Gallium, indium, germanium, antimony, graphite, rare earths, boron nitride)
3. Does [TICKER] benefit from friend-shoring or domestic content incentives? (CHIPS Act, EU Chips Act, UK semiconductor strategy, IRA)
4. Export control risk: could [TICKER]'s products or customers be caught by US export restrictions to China? Revenue % exposed?
5. Any national security or strategic supply chain argument? Government or defence contractor engagement?
6. **Sovereign Supply Chain Decoupling Test**: Audit the sub-tier component inputs for the company's hardware or infrastructure layer:
   - Does the company depend on high-purity micro-materials or specialised machinery processed exclusively within jurisdictions subject to Western export controls or Chinese retaliatory bans?
   - If the company fails this test, Section 14 must be rated a GEOPOLITICAL HEADWIND. Additionally, the company is automatically disqualified from Tier 1 status.
   - **MANDATORY DECOUPLING AUDIT:** You must write out the explicit sub-tier auditing steps for this test as a standalone sub-section, explicitly identifying and detailing the origin of raw wafer substrates, packaging locations, assembly partners, and cleanroom equipment. Do not default to a NEUTRAL or TAILWIND verdict without writing out this sub-tier decoupling audit.
   - **Defence and Military Linkage Audit:** If any prior section notes that corporate revenue or troughs were impacted by government defence budgets, you must explicitly audit the regulatory, ITAR, and export control risks associated with the company's military application exposure under this section.

**Required verdict:** GEOPOLITICAL TAILWIND / NEUTRAL / GEOPOLITICAL HEADWIND (If the company fails the Sovereign Supply Chain Decoupling Test in item 6, this verdict must automatically be GEOPOLITICAL HEADWIND).

If HEADWIND — quantify the revenue at risk and assess whether the thesis survives.

---

## SECTION 14.5 — GEOPOLITICAL RISK PENALTY (MANDATORY)

_Penalty range: 0 to -2 points (deducted from total score)_

China supply chain exposure represents a binary, non-diversifiable tail risk capable of causing 50-80% drawdowns regardless of fundamentals due to export control expansion, CFIUS intervention, or supply chain decoupling mandates.

**Penalty Matrix:**

| Exposure Level | Criteria | Penalty | Additional Restrictions |
|---|---|---|---|
| **SEVERE** | >50% revenue from China customers OR >50% of critical manufacturing in China OR fails Sovereign Supply Chain Decoupling Test with zero diversification plan | **-2 points** | Automatic cap at Tier 2 maximum regardless of total score |
| **MODERATE** | 30-50% revenue from China customers OR 30-50% of critical manufacturing in China OR single critical input sourced exclusively from China with 18+ month requalification timeline | **-1 point** | Position size limited to 5% maximum portfolio weight |
| **LOW** | 10-30% China exposure with documented 24-month diversification plan OR non-critical inputs from China with <12 month substitution timeline | **-0.5 points** | Monitor flag active; quarterly review required |
| **MINIMAL** | <10% China exposure OR zero China manufacturing/customers | **0 points** | No restrictions |

**Critical Input Definition:** Any component, material, or manufacturing process where >70% of global supply originates from China and requalification with alternative suppliers requires >12 months.

**Mandatory Disclosure:**
Every report must include a "Geopolitical Exposure Map" section explicitly stating:
- % revenue from China customers
- % of manufacturing capacity in Chinese territory
- List of China-sourced critical inputs with switching timelines
- Management's stated diversification strategy (if any)
- Penalty assigned: [0 / -0.5 / -1 / -2]

**Automatic Tier Cap Rule:**
Any company receiving a -2 penalty (SEVERE exposure) is automatically capped at Tier 2 classification regardless of pre-penalty score. This is non-negotiable.

---

## SECTION 15 — INSTITUTIONAL ROTATION TIMING

Known AI infrastructure institutional rotation sequence:

- **Phase 1 (2023–2024, largely complete):** Memory / HBM — Micron, SK Hynix, Samsung
- **Phase 2 (2024–2025, in progress):** Optical transceivers — AAOI, COHR, LITE
- **Phase 3 (2025–2026, early innings):** External light sources, silicon photonics, co-packaged optics
- **Phase 4 (2026–2027, not yet defined):** Identify the next emerging layer

1. Which phase does [TICKER] map to? Ahead of, within, or behind institutional rotation for its category?
2. Evidence that institutional ownership is still low relative to strategic importance?
3. Most likely discovery catalyst: >20% earnings beat, first bulge-bracket initiation, hyperscaler announcement, NVIDIA design-in, M&A?
4. Realistic time to institutional consensus: 6 months / 12 months / 18+ months?
5. Risk that rotation has already occurred and the easy money is made? Assess honestly.

---

## FINAL SCORECARD

| Section | Criterion                                | Max    | Score | Evidence Quality         |
| ------- | ---------------------------------------- | ------ | ----- | ------------------------ |
| 01      | AI infra bottleneck                      | 1      |       | Strong / Moderate / Weak |
| 02      | Hyperscaler linkage                      | 1      |       | Strong / Moderate / Weak |
| 03      | Demand > supply                          | 2      |       | Strong / Moderate / Weak |
| 04      | Revenue inflection after trough          | 1      |       | Strong / Moderate / Weak |
| 05      | Small cap / asymmetric upside            | 1      |       | Strong / Moderate / Weak |
| 06      | R&D to scaling transition                | 1      |       | Strong / Moderate / Weak |
| 07      | Customer concentration with hyperscalers | 1      |       | Strong / Moderate / Weak |
| 08      | Technology leadership / first-mover      | 1      |       | Strong / Moderate / Weak |
| 09      | Recent capital raise                     | 1      |       | Strong / Moderate / Weak |
| 10      | Secular + cyclical tailwinds             | 1      |       | Strong / Moderate / Weak |
| 11      | Under-followed / under-researched        | 1      |       | Strong / Moderate / Weak |
| 12      | Management integrity and execution       | 1      |       | Strong / Moderate / Weak |
|         | **TOTAL**                                | **13** |       |                          |

**Score 1 point if the integrity audit scores a 1 (fully clean) AND either the Branch Alpha or Branch Beta operational milestones are completely satisfied as explicitly detailed in Section 12. If the integrity audit is in the monitor-flag tier, Component B is provided for informational context only and cannot alter the final score of 0.**

**Verdict:**

- **11–13 — Tier 1:** Highest conviction. Serenity-grade chokepoint. Maximum position for risk tolerance.
- **8–10 — Tier 2:** Strong thesis. Partial position now, add on catalysts.
- **5–7 — Tier 3:** Interesting but incomplete. Watchlist only until 1–2 more criteria confirmed.
- **Below 5 — Pass:** Does not meet the framework. Move on.

**Automatic disqualifiers — score 0 and do not invest regardless of total:**

- Active regulatory investigation against the company or current executives (Note: Inquiries into general market trading activity, leaks by third parties, or private shareholder class-action lawsuits do not trigger regulatory disqualification unless a regulatory authority has filed formal civil or criminal charges of fraud or securities violations against the entity or its current executive officers).
- Going concern opinion from the current auditor or unresolved going concern disclosures (Note: Standard footnote discussions of short runway or risk-factor going concern notes under liquidity management sections do not trigger disqualification if the company has recently completed a capital raise or has a signed bridge/volume ramp pathway that resolves near-term insolvency).
- Short report allegations that cannot be refuted with filed evidence (Note: In reconciling short reports against filed restatements for qualification-cycle players, forward architecture lock-ins/foundry integrations verified via official ecosystem documentation take precedence over historical period retro-adjustments).
- Integrity audit finding of prior fraud or securities violations by current leadership
- Auditor resignation or replacement with no credible explanation
- Active debt defaults or debt default waivers on bridge or related-party loans within the last 12 months that threaten entity solvency (historical defaults do not disqualify if they were fully retired, settled, or restructured as a condition of a completed merger or capital raise that leaves the company with a positive net working capital position)
- Reclassification as a commodity supplier (Layer O equipment lessor) in Section 0
- Physical delivery roadmap relies on a single-point-of-failure component that fails the Sovereign Supply Chain Decoupling Test in Section 14 (disqualifies the company from Tier 1 ranking, capping maximum conviction level to Tier 2).

---

## SYNTHESIS: THE ONE-PARAGRAPH PITCH

Write the investment thesis in one paragraph as Serenity would post it on X: direct, data-driven, aggressive, zero fluff, no hedging language. The paragraph must contain:

- **The specific chokepoint [TICKER] owns and the exact % of industry flow** (you must state the exact numeric percentage/range calculated in Section 0, e.g. "under 2%", "15-20%").
- The hyperscaler dependency chain.
- The supply shortage evidence or qualification-ramp timeline.
- **The revenue inflection data or volume ramp trigger** (you must state the specific volume ramp timeline, e.g. "late 2026 / 2027").
- The market cap vs. bull-case target with the explicit return multiple.
- **The institutional rotation phase and estimated time to discovery** (you must explicitly state the Phase number, e.g. "Phase 3").
- **Short-Seller Survival Verdict:** If an active short thesis exists, you must write one sentence acknowledging it and explicitly stating the structural mechanism by which the bull case survives the allegations (e.g. why the PDK-level reference design/foundry status bypasses historical collection or pipeline risks).

---

## POST-MORTEM PROTOCOL (MANDATORY FOR THESIS FAILURES)

When a Tier 1 or Tier 2 thesis fails (defined as stock declining >50% from entry OR company hitting an automatic disqualifier post-initial scoring), a post-mortem analysis is mandatory within 30 days.

**Post-Mortem Template:**

### Company: [TICKER]
**Original Tier:** [Tier 1 / Tier 2]
**Original Score:** [X/13]
**Entry Date:** [Date]
**Thesis Failure Trigger:** [Stock decline >50% / Going concern opinion / Fraud allegations / Other disqualifier]
**Failure Date:** [Date]

**Section-by-Section Failure Analysis:**

| Section | Original Score | Should Have Been | Error Source |
|---|---|---|---|
| 01 | X/1 | Y/1 | [What data point was missed? Was chokepoint classification too optimistic?] |
| 02 | X/1 | Y/1 | [Did hyperscaler linkage prove weaker than assessed?] |
| 03 | X/2 | Y/2 | [Was supply constraint language misinterpreted?] |
| 04 | X/1 | Y/1 | [Was revenue inflection premature or volume ramp timeline miscalculated?] |
| 05 | X/1 | Y/1 | [Did cluster math assumptions prove wrong?] |
| 06 | X/1 | Y/1 | [Did R&D-to-scaling transition fail to materialize?] |
| 07 | X/1 | Y/1 | [Was customer concentration risk underestimated?] |
| 08 | X/1 | Y/1 | [Did technology become obsolete faster than projected?] |
| 09 | X/1 | Y/1 | [Was capital structure inadequate?] |
| 10 | X/1 | Y/1 | [Did secular/cyclical assumptions break?] |
| 11 | X/1 | Y/1 | [Did institutional discovery occur or fail to materialize?] |
| 12 | X/1 | Y/1 | [Were integrity issues missed or execution failures unpredictable?] |

**Root Cause Classification:**
- [ ] Framework structural flaw (scoring criteria too loose)
- [ ] Data availability gap (critical information not accessible during initial research)
- [ ] Management integrity failure (fraud/misrepresentation not detectable via public filings)
- [ ] Exogenous shock (macro event, regulatory change, geopolitical disruption)
- [ ] Execution failure (thesis was correct but company failed to execute)
- [ ] Qualification-cycle timing error (volume ramp delayed or cancelled)
- [ ] Chokepoint displacement (competitor emerged or hyperscaler vertically integrated)
- [ ] Technology skip risk materialized (faster than 24-month window)

**Architectural Moat Override Audit:**
If the company was scored using the Architectural Moat Override (foundry reference design, Tier 1 CM sole-source, or hyperscaler custom ASIC design-win), did the forward design-in status materialize into actual production volume? Was the override applied correctly based on the evidence available at the time?

**Proposed Framework Modification:**
[If framework structural flaw identified, specify exact wording change needed. Reference section and criterion.]

**CHANGELOG Update Required:**
All post-mortems resulting in framework modifications must be logged in `/docs/CHANGELOG.md` with:
- Date of modification
- Company ticker that triggered the lesson
- Before/after wording of changed criterion
- List of other companies requiring re-audit under new rule

**Historical Re-Scoring:**
If framework modification is implemented, re-score all current Tier 1/Tier 2 holdings under the new rules within 60 days. Document results in a separate re-audit report.

---

## POST-RESEARCH PROTOCOL: UPDATE TABLE.md

Once the research report is completed and the final scorecard has been computed:

1. Open [TABLE.md](/Table.md).
2. Insert or update the company in the table under the appropriate Tier and Score sequence (highest score to lowest).
3. Populate all columns:
   - **Ticker** (in bold)
   - **Company Name**
   - **Score & Tier** (in bold)
   - **Industry (Folder)**
   - **Key Summary & Major Events** (concise, data-dense bullet points summarising the thesis, key catalysts, and risks).
