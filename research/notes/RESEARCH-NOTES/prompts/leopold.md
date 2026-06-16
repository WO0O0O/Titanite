# AI SCALE-UP RESEARCH FRAMEWORK

### Trillion-dollar cluster beneficiary analysis — Stock: [TICKER]

_Companion framework to the Serenity Chokepoint Framework. Use this for mid-to-large-cap companies that are primary enablers or operators of the AI infrastructure buildout. The alpha here is not information asymmetry — these companies are known. The alpha is model asymmetry: proving that consensus revenue forecasts are structurally wrong because they are not using the OOM cluster-scaling math._

_Intellectual foundation: Leopold Aschenbrenner, "Situational Awareness: The Decade Ahead" (June 2024). The cluster buildout table below is the backbone of every section in this framework._

---

## THE CLUSTER SCALING TABLE — ANCHOR THIS TO EVERY SECTION

This table is non-negotiable context. Every scoring decision must be made against it, not against consensus macro assumptions.

| Year | Cluster size (H100-equivalent) | Cluster cost | Power draw | Power reference class |
|---|---|---|---|---|
| ~2022 | ~10,000 | ~$500M | ~10 MW | 10,000 average homes |
| ~2024 | ~100,000 | ~$billions | ~100 MW | 100,000 homes |
| ~2026 | ~1,000,000 | ~$10s of billions | ~1 GW | The Hoover Dam / one large nuclear reactor |
| ~2028 | ~10,000,000 | ~$100s of billions | ~10 GW | A small/medium US state |
| ~2030 | ~100,000,000 | ~$1 trillion+ | ~100 GW | >20% of total US electricity production |

Total world AI investment trajectory: ~$150B (2024) → ~$500B (2026) → ~$2T (2028) → ~$8T (2030).

This is not speculative. By 2024, Nvidia's datacenter revenue alone ran at ~$100B annualised. Microsoft and Google each disclosed $50B+ of capex. Amazon purchased a 1GW datacenter campus adjacent to a nuclear power plant. The exponential is already in the data. The question is whether [TICKER] is in the direct path of it.

---

## WRITING STYLE — MANDATORY

Apply these rules to every word of the output. Do not deviate.

**Voice and register.** Write like a serious analyst who has thought about this harder than anyone else in the room. Think Leopold Aschenbrenner's _Situational Awareness_ essays crossed with Serenity's X thread style: dense with data, zero throat-clearing, no hedging language, no caveats that exist only to protect the writer. Every sentence should carry weight. Cut anything that does not add information.

**British English throughout.** Colour, behaviour, organise, licence (noun), recognise, programme, defence, centre, catalogue. Not American spellings. Use the Oxford comma.

**No emojis. Ever.** Do not use tick marks, cross marks, or any Unicode symbol as a substitute for prose judgment. If something is good, say it is good and explain why. If something is a red flag, call it a red flag in plain English.

**No AI-flavoured filler.** Delete on sight: "It's worth noting that," "It is important to understand that," "In the context of," "This underscores the fact that," "delve into," "nuanced," "multifaceted," "comprehensive," "robust" (unless describing a specific technical property), "leveraging," "ecosystem" (unless referring to an actual biological system). These phrases signal that the writer did not know what to say.

**No hedging for its own sake.** "May," "might," "could potentially," "it appears that" — use these only when genuine epistemic uncertainty exists and you are flagging it explicitly. Do not soften a conclusion you are confident in because it sounds more measured.

**Directness.** State the verdict first. Explain it second. Never bury the lede in a paragraph of context-setting. If the thesis fails, say so in the first sentence of that section.

**Numbers over adjectives.** "Significant demand growth" is useless. "Microsoft guided $80B of capex for FY2026, up 40% YoY, with management explicitly attributing the increase to AI infrastructure" is useful. Always quantify where a number exists.

**Short sentences when making the most important points.** Long sentences for context. Short sentences for verdicts.

**Framework governance.** All framework modifications must be logged in `/docs/CHANGELOG.md`. Tier 1/2 positions should be tracked in `/docs/CATALYST-TRACKER.md` for event monitoring.

---

## STEP 0 — EXECUTION PROTOCOL (run this before writing a single word of analysis)

Do not begin scoring until all four steps below are completed in order. The most common reason an analysis misses the real thesis is starting to write before the data is assembled.

**Step A — Transcript keyword sweep (two passes)**

Pull the last three earnings call transcripts for [TICKER]. Run two separate passes.

_Pass 1 — Scale signals._ Search for every occurrence of the following and extract exact quotes with speaker name and quarter:

- "capacity" / "gigawatt" / "megawatt" / "power" / "power contract" / "interconnection"
- "backlog" / "pipeline" / "bookings" / "committed" / "contracted"
- "GPU" / "accelerator" / "cluster" / "inference" / "training"
- "hyperscaler" / "cloud" / "customer demand" / "pull" / "urgency"
- "lead times" / "delivery" / "supply constrained" / "sold out"
- "guidance" / "revenue visibility" / "multi-year" / "long-term agreement"
- "government" / "defence" / "DoD" / "federal" / "sovereign"
- "margins" / "pricing power" / "ASP" / "gross margin"

_Pass 2 — Red flag signals._ Search separately for every occurrence of the following. A single hit requires explicit investigation before scoring proceeds:

- "material weakness" / "internal controls"
- "related party" / "related-party transaction"
- "going concern"
- "SEC" / "regulatory investigation" / "subpoena"
- "resignation" / "departure" (CFO, auditor, or board member)
- "restatement" / "restate"
- "dilution" / "offering" / "equity raise" (cross-reference Section 9)
- "customer concentration" / "lost a customer" / "contract terminated"

If Pass 2 produces any hits, flag them prominently at the top of the report before scoring begins.

**Step B — Fraud, short seller, and integrity sweep**

Before scoring, run explicit web and X searches for:

- "[TICKER] short report" or "[TICKER] short seller"
- "[TICKER] fraud" or "[TICKER] accounting irregularity"
- "[TICKER] SEC investigation" or "[TICKER] lawsuit"
- "[TICKER] CEO history" or "[TICKER] management background"
- "[TICKER] auditor" or "[TICKER] auditor change"
- Name of the CEO and Chairman individually: "[Name] fraud," "[Name] SEC," "[Name] bankruptcy," "[Name] SPAC"

If any short reports exist, read them in full and include a summary of their core allegations under a prominent "Active Short Thesis" header before the scorecard.

**Step C — The consensus revenue model audit**

This is the most important step in this framework. Before scoring, explicitly build out what the consensus model assumes vs. what the cluster scaling math implies.

1. What is the current sell-side consensus revenue estimate for [TICKER] for the next 2 years? Provide exact figures.
2. What growth rate is embedded in that consensus?
3. Now model what the cluster scaling table implies for [TICKER]'s addressable market:
   - At the 2026 cluster scale (1M GPUs / 1GW), what is [TICKER]'s implied revenue opportunity?
   - At the 2028 cluster scale (10M GPUs / 10GW)?
   - At the 2030 cluster scale (100M GPUs / 100GW)?
4. Compute the gap between consensus and the cluster-math-implied revenue. State it as a multiple (e.g., "consensus implies 2× revenue growth through 2028; the cluster math implies 6× if [TICKER] maintains its current market share").
5. Explain specifically why the gap exists — is consensus using the wrong growth rate? The wrong addressable market definition? The wrong assumption about [TICKER]'s share of the infrastructure layer?

If the gap is less than 1.5×, the thesis is weak. If the gap is 2× or more, the thesis is strong. State the gap explicitly before proceeding.

**Step D — Stack layer classification**

Before scoring, determine [TICKER]'s exact position in the infrastructure stack. This determines which scoring modifiers apply throughout.

Classify [TICKER] into one or more of the following layers:

- **Layer P — Power & Energy:** Generation, grid interconnection, transformers, fuel cells, SMR, UPS systems
- **Layer F — Physical Fabric:** Data centre construction, land/real estate, cooling systems, rack infrastructure
- **Layer N — Networking:** Intra-cluster interconnects, optical transceivers, switches, fibre, co-packaged optics
- **Layer C — Compute Hardware:** GPUs, TPUs, custom ASICs, HBM memory, advanced packaging
- **Layer O — Operations & Cloud:** Hyperscalers, cloud operators, colocation providers, GPU-as-a-service
- **Layer S — Software & Orchestration:** MLOps, inference infrastructure, model serving, security
- **Layer G — Government & Sovereign:** Defence AI, sovereign cloud, national security infrastructure

A company that spans multiple layers scores higher on durability. A company in Layer P or Layer N scores additional modifiers in Sections 1 and 6.

**Step E — The Raw Data Extraction Buffer (Operational Guardrail)**

Before writing a single sentence of narrative analysis or scoring any section, you must first output a raw, structured JSON block containing verified quotes, balance sheet values, and working capital metrics under the header `## RAW DATA EXTRACTION BUFFER`. This separates data ingestion and extraction from analytical evaluation, preventing confirmation bias or data framing.

The JSON block must conform exactly to this schema:
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
    "quarters": ["Q-2", "Q-1", "Current"],
    "revenue": [0.0, 0.0, 0.0],
    "accounts_receivable": [0.0, 0.0, 0.0],
    "contract_assets_unbilled": [0.0, 0.0, 0.0],
    "inventories": [0.0, 0.0, 0.0],
    "stated_backlog_binding": [0.0, 0.0, 0.0],
    "stated_backlog_non_binding": [0.0, 0.0, 0.0]
  },
  "calculated_ratios": {
    "receivables_growth_vs_revenue_growth_pct": 0.0,
    "days_sales_outstanding_dso": [0.0, 0.0, 0.0],
    "contract_assets_pct_receivables": 0.0,
    "inventory_to_binding_backlog_ratio": 0.0
  }
}
```

Formula guidelines for calculated ratios:
*   **Receivables growth vs revenue growth %**: $\frac{\text{Current Receivables} - \text{Receivables}_{Q-1}}{\text{Receivables}_{Q-1}} \text{ vs } \frac{\text{Current Revenue} - \text{Revenue}_{Q-1}}{\text{Revenue}_{Q-1}}$
*   **Days Sales Outstanding (DSO)**: $\left(\frac{\text{Average Accounts Receivable}}{\text{Quarterly Revenue}}\right) \times 90 \text{ days}$
*   **Contract Assets % Receivables**: $\frac{\text{Contract Assets}}{\text{Accounts Receivable} + \text{Contract Assets}} \times 100$
*   **Inventory-to-binding-backlog**: $\frac{\text{Inventories}}{\text{Stated Backlog (Binding)}}$

---

## KNOWN CONTEXT / ALPHA INJECTOR

_Fill this in before submitting. Leave blank if nothing to add._

Paste here any specific intelligence that should be treated as established context:

- Serenity posts or X threads about [TICKER]
- Supply chain intelligence from industry contacts
- Recent news not yet reflected in filings
- Confirmed customer wins or power contracts not yet disclosed
- **Short reports or fraud allegations — paste full text here**
- Any qualitative signals considered relevant

```
BLANK
```

---

## GATE CHECK — MARKET CAP AND RETURN FILTER

State the current market cap and enterprise value of [TICKER].

- Market cap: $\_\_\_
- Enterprise value: $\_\_\_

**Tiered market cap rules — apply the tier that matches [TICKER]'s current market cap:**

| Market cap | Rule | Return hurdle |
|---|---|---|
| Below $25B | Full framework. Proceed. | 3× in 36 months |
| $25B–$75B | Full framework. Require explicit 3× arithmetic before proceeding. Show the maths. | 3× in 36 months |
| $75B–$150B | Continue for intelligence value. State clearly that the return hurdle is unlikely to be met at this market cap and that a position requires a different return calibration. Do not stop — the analysis is still useful for sizing, timing, and monitoring. | 2× in 36 months acceptable |
| Above $150B | Flag the market cap. Continue for intelligence value only. Do not apply a return hurdle — the framework is being used diagnostically, not to generate a primary position thesis. | Intelligence only |

The reason for the tiered approach rather than a hard stop: a company at $60B with $44B of contracted five-year revenue and a cluster-math-implied $20–30B annual run rate by 2028 should not be dismissed on a gate. The gate exists to prevent the framework from being mechanically applied to mega-caps where 3× is implausible — not to discard legitimate Tier 1 intelligence about companies that have grown past the gate since the original thesis was set.

**For all companies regardless of tier, state:**

- Current consensus revenue for next 2 years (from Step C)
- Implied revenue from cluster-scaling math (from Step C)
- Bull-case market cap in 24–36 months if the cluster math plays out
- Multiple expansion narrative: what does the company re-rate to if consensus acknowledges the true growth vector?
- Implied return from today's price to that target
- Which return tier applies and whether the return hurdle is met

**Minimum acceptable thesis for a primary position:** 3× return from current price under a reasonable bull case rooted in the cluster scaling math. Below 3×: watchlist or small tracking position only.

---

## FRAMEWORK MODIFIER — THE CONSENSUS GAP PLAYER

Some companies in this framework are **consensus gap players**. Their entire thesis rests not on being unknown, but on the gap between what consensus assumes and what the cluster math implies. This is a different analytical archetype from the micro-cap chokepoint player.

**What is a consensus gap player?**

A company whose stock is already well-covered by sell-side analysts, whose institutional ownership is high, whose story is known — but where the consensus revenue model is built on a growth rate that dramatically underestimates the true trajectory of the infrastructure buildout it serves.

The information asymmetry is gone. The model asymmetry remains. The stock has moved but not nearly enough.

**How to identify one:**

- 15+ sell-side analysts covering it, but their consensus growth rate is below what the cluster scaling table implies
- Management's language on call transcripts is significantly more bullish than what the consensus model captures
- The company's own guidance is consistently beaten by a wide margin (evidence that even management is underguiding relative to reality)
- The TAM consensus uses is based on the current cluster scale, not the projected one

**How this changes the scoring:**

If [TICKER] is identified as a consensus gap player, apply the following modifications:

- **Section 5 (Consensus Model Asymmetry):** Weight forward cluster-math implied revenue at full value, even if trailing financials look pedestrian relative to the multiple.
- **Section 6 (Execution Moat):** Score based on confirmed infrastructure commitments (power contracts, lease agreements, GPU allocations) rather than current revenue.
- **Section 11 (Under-Covered / Mismodelled):** Do not require low analyst coverage. Require instead that a provable consensus model error exists and is quantifiable.

Explicitly state at the top of the report whether [TICKER] is a consensus gap player and which modified rules are being applied.

---

## SECTION 0 — THE OOM TEST

_Required — the thesis lives or dies here_

Map [TICKER]'s revenue directly against the cluster scaling table. This is not a TAM exercise. This is a physical-math exercise.

1. **Current revenue per cluster scale.** At the current ~100k GPU / 100MW cluster scale (~2024), how much revenue does [TICKER] generate from AI infrastructure? Give an absolute figure and a percentage of total revenue.

2. **Revenue at 1M GPUs / 1GW (2026 cluster).** If the cluster scaling table is right, what does [TICKER]'s addressable market look like at 10× the current scale? Model explicitly: does [TICKER]'s revenue scale linearly, sub-linearly, or super-linearly with cluster size? Why?

3. **Revenue at 10M GPUs / 10GW (2028 cluster).** Same analysis. Is [TICKER] still in the supply chain at this scale? Does its role become more or less critical as clusters get larger?

4. **Revenue at 100M GPUs / 100GW (2030 cluster).** Identify the key risk that could break the extrapolation. Technology obsolescence? Geographic displacement? Competition from vertically integrated hyperscalers?

5. **Market share dynamics.** What is [TICKER]'s current market share of its specific supply chain layer? Is that share expanding, stable, or contracting? At scale, does the market consolidate around [TICKER] or fragment?

6. **Displacement risk.** What is the most credible scenario in which a hyperscaler or a new entrant bypasses [TICKER] entirely? How long would it take? What switching cost prevents it?

**Required verdict: PRIMARY ENABLER / SCALED BENEFICIARY / PERIPHERAL BENEFICIARY**

- **PRIMARY ENABLER:** Without [TICKER], the cluster cannot be built at this layer. Equivalent to the Chokepoint verdict in the sister framework.
- **SCALED BENEFICIARY:** [TICKER]'s revenue scales roughly in proportion to the buildout. Legitimate position but no pricing power.
- **PERIPHERAL BENEFICIARY:** [TICKER] benefits but is not in the critical path. The thesis is weak.

If PERIPHERAL BENEFICIARY, stop. The framework does not justify deep analysis of a tangential play.

---

## SECTION 1 — WHICH LAYER OF THE TRILLION-DOLLAR CLUSTER?

_1 point_

State [TICKER]'s layer classification from Step D. Then:

1. Why is this layer non-optional at scale? Quantify the demand from first principles: not from market research reports, but from the physical requirements of running 1M, 10M, or 100M GPUs.

2. Is [TICKER] a primary provider within its layer, or one of many? Name every significant competitor in this layer with their estimated market share.

3. Is [TICKER]'s layer a bottleneck right now? Evidence: lead times, sold-out capacity, explicit "supply constrained" management language from transcripts (extracted in Step A).

4. How does the physical requirement for [TICKER]'s layer change as clusters scale? Use the table. For example: power consumption per GPU cluster scales roughly linearly; optical transceivers per cluster scale super-linearly (because more GPUs require more inter-GPU communication bandwidth). Trace the curve.

5. Is there a government or national security argument for this layer? If [TICKER] is in Layer P (power) or Layer N (networking) or Layer G (government), the national security argument may create a durable non-commercial demand floor.

**Score 1 point** only if [TICKER] is a primary provider in a non-optional layer, with quantified demand growth rooted in the cluster scaling table.

---

## SECTION 2 — HYPERSCALER AND GOVERNMENT LINKAGE

_1 point_

1. Who are [TICKER]'s direct customers? Trace to the ultimate buyer.

2. Are any of AWS, Google Cloud, Microsoft Azure, Meta, Oracle, NVIDIA, or their Tier 1 suppliers ultimately dependent on [TICKER]'s product or service?

3. Is there a government or defence linkage? Any of: DoD, DARPA, NSA, US intelligence community, allied national security agencies, sovereign wealth fund partnerships, government AI programmes. Evidence with dates.

4. What percentage of revenue is driven by AI infrastructure capex vs. legacy applications?

5. "Pull" signals: Has [TICKER]'s procurement cycle shortened? Are customers approaching [TICKER] rather than the reverse? Has any hyperscaler or government customer made a public statement referencing [TICKER]?

6. Contract structure: Spot, multi-year supply agreements, take-or-pay, or cost-plus government contracts? Cost-plus government contracts with AI infrastructure scope are the highest-quality revenue in this framework.

**Score 1 point** only if confirmed hyperscaler or government linkages exist with documentary evidence, and revenue from those sources is growing faster than total company revenue.

---

## SECTION 3 — DEMAND OUTSTRIPS CAPACITY

_2 points — highest weighted category_

**Critical instruction:** This section evaluates whether physical supply is being outrun by demand. The most common scoring error is to look at trailing revenue growth, find that it looks "good," and assume supply is adequate. The question is not whether growth is good in absolute terms — it is whether demand is running so far ahead of supply that the company has pricing power and multi-year visibility regardless of what its trailing gross margin says.

**Sub-section A — Trailing documented evidence**

1. Gross margin for the last 4 quarters — provide the table. Is it expanding, contracting, or stable?
2. Any price increase announcements in press releases or regulatory filings in the past 12 months?
3. Backlog or contracted revenue — is it growing faster than recognised revenue?
4. Any "sold out," "capacity constrained," or "lead time extension" language in filed documents?
5. Capital expenditure trend — is [TICKER] investing aggressively to expand capacity? If yes, this is a bullish signal (they are capacity-constrained). If no, this is a bearish signal at scale.

**Sub-section B — Forward run-rate signals (from transcript keyword sweep)**

Using the quotes extracted in Step A, Pass 1:

1. Has management stated that current capacity is fully committed or that demand exceeds supply? Quote verbatim with quarter and speaker.
2. Has management disclosed multi-year revenue visibility or contracted pipeline? Quote verbatim.
3. What has management said about lead times or delivery timelines? Is urgency increasing across successive quarters?
4. Has management mentioned turning away business or prioritising customers? This is the strongest possible supply constraint signal.
5. Is the direction of travel in management's language becoming more or less confident across the last three calls?

**Scoring logic:**

Management explicitly stating that all capacity is committed and customers are queuing = 2/2. A company printing high revenue growth while management flags demand significantly exceeding supply is a pre-acceleration infrastructure compounder. A company printing good growth without any supply constraint language is merely riding the cycle.

**Score 2:** Supply constraint clearly evidenced in management language AND showing in trailing metrics (expanding margin, growing backlog, price increases). **Score 1:** Supply tightness emerging in forward language but not yet in financials, or strong backlog without margin evidence. **Score 0:** No supply constraint language anywhere. Revenue growth exists but is purely demand-driven with no pricing power evidence.

---

## SECTION 4 — REVENUE INFLECTION AND ACCELERATION

_1 point_

**Critical instruction:** Apply forward/trailing discipline. A company that is printing accelerating revenue against the 2024 cluster scale may be dramatically undervalued if its revenue scales super-linearly against the 2026 and 2028 cluster scales.

**Sub-section A — Trailing documented**

Quarterly revenue table from Q1 2023 through most recent quarter. YoY % and sequential % change for each quarter. Identify the inflection quarter and its cause. Count consecutive quarters of revenue acceleration since the inflection.

**Sub-section B — Forward cluster-math implied**

Using the gap analysis from Step C:

1. At what cluster scale does [TICKER]'s revenue inflect most dramatically? (e.g., a power infrastructure company inflects at the 1GW scale; an optical transceiver company inflects when inter-cluster bandwidth requirements mandate a technology upgrade)
2. Is that inflection point already in the trailing data, or is it still ahead?
3. How far through the inflection are we? Is [TICKER] in the early innings of its cluster-scale inflection or late?
4. What has management said about the current quarter's revenue trajectory and near-term visibility?

**Score 1:** 2+ consecutive quarters of accelerating revenue from a documented inflection point, with gross margin holding or improving, AND the cluster math implies the inflection still has multiple years to run. (Note: If the forward revenue inflection calculation relies heavily on non-binding LOIs/MOUs/frame agreements without a signed commercial timeline—as extracted in the JSON buffer under `stated_backlog_non_binding`—you must automatically reduce the Evidence Quality score to 'Weak' for Section 4). **Score 0:** No clear inflection, or the inflection is primarily driven by non-AI revenue, or cluster math implies the relevant inflection point has already passed.

---

## SECTION 5 — CONSENSUS MODEL ASYMMETRY

_1 point_

This section is the intellectual core of the framework. It is entirely absent from conventional sell-side research. If you cannot score this section, the thesis does not meet the framework.

1. **State the consensus model explicitly.** What is the mean sell-side revenue estimate for [TICKER] for the next 2 full fiscal years? What CAGR does that imply? What terminal multiple is embedded in the consensus price target?

2. **State the cluster math model explicitly.** Using the scaling table and [TICKER]'s current market share in its specific layer, calculate the implied revenue for 2026 and 2028 cluster scales. You must execute this as a strict, step-by-step deterministic calculation block. Show all arithmetic using the following schema:

   a. **Compute Node Normalization**: Identify the target cluster size. If reported in next-gen units (e.g., Blackwell/B200), normalize to H100 compute/power equivalents or state the upgraded kW-per-slot footprint explicitly.
   
   b. **Calculate Implied Power Demand (MW)**:
      $$\text{Implied Power (MW)} = \text{Projected Cluster Size (H100 equivalents)} \times 0.001 \text{ MW/GPU}$$
      *(Note: If using next-gen high-density architectures, adjust the multiplier up to 0.0016 - 0.002 MW/slot as physically required).*
      *(Networking Layer Non-Linear Coefficient: If [TICKER] is classified under Layer N, you must apply a super-linear multiplier to the Layer TAM in step (d) to account for scale-dependent leaf-spine cluster switching density. Stating that optical transceiver or switch demand scales strictly 1:1 with MW demand will trigger a mathematical error).*

   c. **Define Layer-Specific Spend ($C_{\text{layer}}$)**: Explicitly state and justify the dollar spend *per MW* that belongs exclusively to [TICKER]'s layer of the stack (e.g., Do not use raw datacenter shell buildout costs if the company sells optical switches; use 'Optical Spend per MW of deployed AI compute').

   d. **Calculate Layer TAM**:
      $$\text{Layer TAM} = \text{Implied Power Demand (MW)} \times C_{\text{layer}}$$

   e. **Calculate Implied Ticker Revenue**:
      $$\text{Implied [TICKER] Revenue} = \text{Layer TAM} \times \text{[TICKER]'s Estimated Market Share}$$

   f. **Asymmetry Delta Check**: Compare this physically implied revenue against current Wall Street consensus revenue for 2026/2028. State the percentage variance (The Asymmetry Gap).

3. **Compute the consensus gap.** Gap = (Implied [TICKER] Revenue) ÷ (consensus revenue estimate). State as a multiple. A gap below 1.5× is weak. A gap of 2× is strong. A gap of 3× or more is exceptional.

4. **Explain why the gap exists.** Is the consensus growth rate too low? Is the consensus TAM definition too narrow? Is the consensus model using the wrong cluster scale as its reference point? Is there a technology shift that the consensus has not yet priced in?

5. **What is the catalyst that closes the gap?** A beat-and-raise earnings quarter? A hyperscaler public announcement? A power contract disclosure? A government programme award? Name the specific event and the approximate timeline.

**Score 1 point** only if the consensus gap is at least 2× with clear explanation of the mechanism and a named catalyst for gap closure.

---

## SECTION 6 — EXECUTION MOAT

_1 point_

For infrastructure-scale companies, execution is the moat. Technology lead matters, but a company that cannot build fast enough, finance its capex, and retain key partnerships loses its position regardless of how good its technology is.

1. **Infrastructure commitments in hand.** For Layer P (power): how many GW/MW of power contracts are signed? For Layer O (cloud operators): how many MW of committed data centre capacity? For Layer N (networking): what multi-year supply agreements exist? For Layer F (physical fabric): what land bank and construction pipeline is disclosed? Provide exact figures with sources. Run the **Physical Power Feasibility Test**: compare the scaling timeline against grid interconnection lead times (e.g. PJM queue times of 4–7 years) and verify if the timeline is protected by behind-the-meter nuclear/gas PPAs.

2. **Geographic positioning.** Is [TICKER]'s infrastructure in the United States or in close democratic allies (UK, Japan, South Korea, Australia, Canada, Germany)? Infrastructure in Middle Eastern or Chinese jurisdictions is a structural risk given the national security dimension of the cluster buildout. Rate the geographic portfolio: Domestic-primary / Allied-primary / Geopolitically-exposed.

3. **Speed of execution vs. peers.** Compare [TICKER]'s announced capacity expansion timeline to the cluster scaling table. Is it fast enough? If the 2028 cluster requires 10GW and [TICKER] is the primary power provider, is there a credible construction plan to deliver that capacity before 2028?

4. **Management track record at scale.** Has this management team built and operated infrastructure at the scale required? Name specific prior projects with size and timeline. A management team that has built a 100MW facility is not automatically capable of building a 1GW one. The engineering and logistics challenges are qualitatively different.

5. **Supply chain resilience.** What are the three most critical inputs for [TICKER]'s infrastructure layer and where do they come from? Is any critical input sourced from China or subject to export restrictions?

**Score 1 point** only if [TICKER] has confirmed infrastructure commitments large enough to participate meaningfully in the 2028 cluster scale, with a credible construction timeline, domestic or allied geographic positioning, and a management team with a demonstrable track record at large-scale infrastructure.

---

## SECTION 7 — GOVERNMENT AND SOVEREIGN POSITIONING

_1 point (with 0.5 modifier for credible path to compliance — see scoring logic below)_

Leopold Aschenbrenner explicitly argues that by 2027/28, the US government will take over or heavily co-opt AGI development — "The Project." The clusters being built today may become the national defence clusters of the next decade. A company that is already in the supply chain for government AI infrastructure, or that meets the security and compliance standards required to enter it, has a qualitatively different risk/reward from one that only serves commercial hyperscalers.

1. **Current government revenue.** What percentage of [TICKER]'s revenue comes from US government, allied government, or defence contractor customers? Provide exact figures from filings.

2. **Security and compliance posture.** Does [TICKER] hold or is it pursuing: FedRAMP authorisation, IL4/IL5 (Impact Level) certification, CMMC (Cybersecurity Maturity Model Certification), or equivalent allied standards? Name the certifications with dates of award.

3. **Physical security infrastructure.** Can [TICKER]'s facilities support air-gapped operations, SCIF-adjacent deployments, or classified-workload environments? Has [TICKER] built or announced any facility that meets government physical security requirements? (Perform an **Air-Gapped Power & Grid Security Audit** to verify if the site has dedicated, off-grid power generation that is physically insulated from civilian grid vulnerabilities).

4. **Government partnerships and contracts.** List every confirmed DoD, intelligence community, or allied government contract or partnership for [TICKER] in the past 24 months. Quote the scope, value, and duration where disclosed.

5. **The Project positioning.** Given Aschenbrenner's thesis that the USG will nationalise or co-opt AI infrastructure by 2027/28: is [TICKER] on the right side of this transition? A company already selling into government AI programmes is positioned to capture additional contracts as The Project accelerates. A company with no government relationships and no path to compliance is at risk of being locked out of a potentially enormous segment of the market.

6. **Active disqualifiers for government positioning.** The following are structural barriers that prevent a company from entering classified or sensitive US government programmes, regardless of its commercial positioning: current OFAC designation or sanctions on any board member or significant shareholder; headquarters or majority infrastructure in a non-allied nation; Chinese-sourced critical inputs that cannot be substituted; CEO or founder who held citizenship of an adversarial nation within the past 36 months. Note any that apply.

7. **Sovereign Supply Chain Decoupling Test**: Audit the sub-tier component inputs for the company's hardware or infrastructure layer:
   - Does the company depend on high-purity micro-materials or specialized machinery processed exclusively within jurisdictions subject to Western export controls or Chinese retaliatory bans (e.g., advanced CMP slurries, specific precursor isotopes, localized TGV glass processing)?
   - If the company is classified as Layer P (Power) or Layer F (Physical Fabric), evaluate if its manufacturing line utilizes components (such as high-voltage transformer cores or utility-scale switchgear components) manufactured in non-NATO or non-allied nations.
   - If the company fails this test, Section 7 must be scored a 0. Additionally, the company is automatically disqualified from Tier 1 status.

**Scoring logic — three tiers:**

- **Score 1.0:** Existing government or defence revenue confirmed in filings, with one or more active certifications (FedRAMP, IL4/IL5, CMMC) and facilities capable of classified workloads, AND passes the Sovereign Supply Chain Decoupling Test.
- **Score 0.5 — Path to Government Positioning:** No current government revenue, but ALL of the following are true: (a) infrastructure is 100% in the US or NATO-allied nations; (b) no active disqualifiers from point 6 above; (c) management has made a documented public statement of intent to pursue government certifications; (d) the company's layer of the stack is one the government will require (Layer P, Layer F, Layer N, or Layer O); (e) passes the Sovereign Supply Chain Decoupling Test. **Important: Companies scoring 0.5 in Section 7 remain at 0.5 in the final scorecard—no rounding up. This prevents path-dependent score inflation.**
- **Score 0:** No government revenue, active disqualifiers present, infrastructure in geopolitically exposed jurisdictions, or fails the Sovereign Supply Chain Decoupling Test.

---

## SECTION 8 — TECHNOLOGY DURABILITY AT SCALE

_1 point_

1. **Technology generation map.** What generation of technology does [TICKER] provide today? What is the next generation? What is the timeline to the next generation? Is [TICKER] developing the next generation or will it be developed by a competitor?

2. **Scale invariance.** Does [TICKER]'s technology work at the 1M GPU cluster scale? At 10M? At 100M? Or does the physics break down at some point — e.g., does a cooling architecture that works at 1GW fail at 10GW? Explicitly trace the technology curve against the cluster scaling table.

3. **Technology lead.** How far ahead of the nearest credible competitor is [TICKER] today, measured in months of development time? What are the specific technical barriers to replication?

4. **Vertical integration risk.** Is there a credible scenario in which a hyperscaler develops [TICKER]'s capability in-house and eliminates the need for [TICKER] entirely? Has any hyperscaler announced programs in this direction? Timeline and probability?

5. **Skip risk.** Is there a next-generation AI architecture that would bypass [TICKER]'s layer entirely? (Examples: if training paradigms shift from massive centralised clusters to distributed training, the value of centralised power contracts decreases. If photonic computing matures, some optical transceiver segments become obsolete.) Assess honestly. Run the **Interconnect Standards Transition Audit**: evaluate if the networking layer is exposed to skip risk during the transition from proprietary fabrics (NVLink/InfiniBand) to open standards (Ultra Ethernet Consortium/UEC) or co-packaged optics (CPO).

**Score 1 point** only if [TICKER]'s technology is demonstrably durable through at least the 2028 cluster scale, with a credible development roadmap for the 2030 scale, no imminent vertical integration threat, and no plausible technology-skip risk within 36 months.

---

## SECTION 9 — CAPITAL STRUCTURE FOR THE ARMS RACE

_1 point_

The trillion-dollar cluster buildout requires sustained, multi-year capex at a scale most companies have never contemplated. A company that cannot finance its share of the arms race will lose its position to a better-capitalised competitor, regardless of how good its technology or execution is.

1. **Current capital structure.** Cash, total debt, net debt/EBITDA, investment-grade credit rating (if applicable), quarterly operating cash flow, quarterly capex. Provide the table.

2. **Capex intensity.** What is [TICKER]'s announced capex plan for the next 2–3 years? Is it large enough to participate at the 2026 and 2028 cluster scales? Compare to competitors.

3. **Capital access.** Can [TICKER] raise large amounts of capital cheaply? Investment-grade bond issuance, revolving credit facility size, sovereign partnership capital, infrastructure fund partnerships. A company with investment-grade debt and government-backed financing has a structural capex advantage over one dependent on equity dilution. Run the **Cost of Capital Advantage Check**: verify if the company is partnering with infrastructure private equity funds (e.g. Brookfield, Blackstone) or using off-balance-sheet joint ventures (JVs) to keep debt off the primary corporate entity.

4. **Dilution risk.** Has [TICKER] issued equity to fund capex in the past 24 months? If yes: use of proceeds (growth capex vs. debt repayment vs. runway extension), timing relative to stock price trough or peak, dilution as % of shares outstanding. Under 10% acceptable; over 20% requires justification.

5. **Balance sheet stress test.** If AI capex spending by hyperscalers was cut 30% for one year, what happens to [TICKER]'s cash position and debt covenants? Is there a refinancing risk in the next 24 months?

**Score 1 point** only if [TICKER] has: sufficient cash or access to cheap capital to fund its announced capex plan without distressed equity issuance, a debt structure that can survive a temporary capex pause by its customers, and a balance sheet that actually supports the execution claims in Section 6.

---

## SECTION 10 — SECULAR AND CYCLICAL TAILWINDS

_1 point_

**Secular (10-year structural):**

1. What is the underlying structural driver? Is it still valid in 2030 and beyond?
2. Does [TICKER]'s layer of the stack remain relevant at superintelligence-scale? (Per Aschenbrenner: hundreds of millions of GPUs running civilisations of AI agents. Does [TICKER] still supply something non-optional at that scale?)
3. Is the physical or economic reason for demand growth irreversible?
4. Does demand survive a 30% AI capex cut for one year, without permanent loss of [TICKER]'s position?

**Cyclical (1–3 year near-term):**

1. What specific cycle is accelerating [TICKER]'s business in 2025–2028?
2. When did the current upcycle begin, and where are we in it?
3. Which cluster scale transition is the primary near-term catalyst? (The 100k→1M GPU transition and the associated 100MW→1GW power requirement is the 2025–2027 transition. The 1M→10M GPU transition and the 1GW→10GW power requirement is the 2027–2029 transition.) State which one [TICKER] is riding.

**Score 1 point** only if BOTH a 10-year structural driver AND a near-term cyclical acceleration are present, compounding simultaneously, with the cluster-scaling table explicitly linked to both.

---

## SECTION 11 — UNDER-COVERED OR MISMODELLED

_1 point_

Unlike the Chokepoint Framework, this section does not require low analyst coverage. Most companies in this framework are well-covered. The question is not whether analysts are covering [TICKER] — it is whether they are modelling it correctly.

1. **Analyst coverage count.** How many sell-side analysts currently cover [TICKER]?
2. **Consensus model audit (summarise Step C).** Is the consensus using the right cluster-scale reference point? Is the consensus growth rate materially below what the cluster math implies? Provide the specific model error.
3. **"Wrong story" risk.** Has the consensus narrative fundamentally mischaracterised what [TICKER] does? (Examples: covering a power infrastructure company as a legacy utility; covering an optical transceiver company as a telecom equipment supplier rather than an AI interconnect provider.) A company being framed by the market under the wrong category faces a re-framing catalyst as well as a revenue beat catalyst.
4. **Information asymmetry.** Even for well-covered companies, is there supply chain data, power contract intelligence, or government programme information that the consensus model is missing?
5. **Institutional ownership trajectory.** Is institutional ownership growing rapidly, suggesting the consensus is just beginning to catch up, or is it already saturated?

**Score 1 point** only if a provable, quantified consensus model error exists (from Step C), with a named mechanism by which that error will be corrected and a timeline for correction.

---

## SECTION 12 — MANAGEMENT INTEGRITY AND EXECUTION

_1 point — integrity audit must pass before execution is scored_

**Component A — Integrity audit (run before reviewing execution record)**

Search the following for the CEO, Chairman, CFO, and any board members with significant ownership:

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
- Override applied: YES / NO
- If override applied, justification: [One-time event, segment divestiture, accounting standard change, etc.]
```

**Graduated scoring for integrity findings — three tiers:**

- **Automatic disqualifier — score 0, halt thesis:** Material weakness in the core revenue-generating line of business. Going-concern note from the auditor. Active SEC investigation. Restatement of financials. Prior fraud or securities violations by current leadership. These findings are not mitigatable by context.

- **Score 0, monitor flag, thesis continues:** Material weakness confirmed in a non-core segment that is being wound down, divested, or restructured AND the company is actively remediating (upgrading auditor, implementing controls, management statement of remediation timeline). The finding must be isolated — it cannot affect the primary investment thesis revenue line. Flag this prominently at the top of the report. State that a full position is not justified until the material weakness is resolved, but do not stop the analysis. Alternatively, if the company triggers the 'Working Capital Divergence' monitor flag in item 6, score this a 0 under the monitor flag.

- **Score 1:** Integrity audit is fully clean. No material weaknesses, no auditor changes with unexplained departures, no regulatory investigations, no related-party concerns, and no working capital divergence anomalies.

**Component B — Execution track record at scale**

1. How many consecutive quarters has [TICKER] beaten consensus EPS and revenue estimates? (Target: 3+)
2. Has management raised forward guidance — not merely maintained it — at least once in the past four quarters?
3. Review prior calls for specific infrastructure promises: power contract commitments, facility completion dates, customer delivery timelines. Were they delivered on time? List any that were not.
4. Has [TICKER] previously built infrastructure at the scale it is now promising? If this is the first time they are attempting the next order of magnitude, flag the execution risk explicitly.
5. Insider ownership % and any open-market purchases in the past 12 months? Management buying their own stock at current prices is the strongest single signal of internal conviction.

**Score 1 point** only if the integrity audit scores 1 (fully clean) AND there are 3+ consecutive earnings beats AND guidance has been raised AND prior infrastructure commitments were delivered without material delay. If the integrity audit is in the monitor-flag tier, Component B is still provided for informational context but does not change the score of 0.

---

## SECTION 13 — ADVERSARIAL TESTING: STEEL-MAN THE BEAR CASE

_Required — no score, but the thesis cannot stand without completing it_

Run the strongest possible bear case. If a short report exists and was identified in Step B, address it claim by claim here.

1. **Thesis killer.** The single most credible scenario in which this thesis fails completely within 24 months — specific mechanism, not generic macro risk.

2. **Short report reconciliation.** If an active short thesis exists, summarise its core allegations and explain specifically why each one is wrong using evidence from filings and transcripts — or acknowledge which allegations cannot be refuted.

3. **Substitute and competition threat.** Who is building a direct substitute right now? What is their timeline to meaningful scale? Is there a hyperscaler or state actor building in-house capability that displaces [TICKER]?

4. **Concentration stress test.** Model a loss of the largest single customer — revenue impact and implied stock price. How long could [TICKER] operate at reduced revenue before needing distressed capital?

5. **Technology skip risk.** Any risk that a next-generation AI architecture or a paradigm shift bypasses [TICKER]'s layer entirely? Be specific about the technology and the timeline.

6. **Capital structure failure.** If [TICKER] cannot raise its next round of capex financing at acceptable terms — what happens? Is there a credible path to covering capex from operating cash flow, or is the company dependent on continued capital market access?

7. **Geopolitical disruption.** If Taiwan is blockaded, if US export controls expand, if the Middle East de-stabilises, or if the EU mandates data localisation — model the revenue impact specifically.

8. **The government-nationalisation scenario.** If The Project accelerates and the USG begins to direct AI infrastructure investment, does [TICKER] benefit (preferred supplier, cost-plus contracts) or get displaced (government builds in-house, requisitions assets, price-controls the market)?

**Rate the overall bear case: WEAK / MODERATE / STRONG**

If STRONG — explain in detail why the bull case still wins. If a short report allegation cannot be refuted, state that the thesis requires resolution before a position is justified.

---

## SECTION 14 — GEOPOLITICAL DIMENSION

_Required — no score, critical context_

1. Does [TICKER]'s supply chain pass through China at any layer? Map each layer explicitly. Any exposure to Chinese-sourced inputs subject to export controls (gallium, germanium, indium, antimony, graphite, rare earths, boron nitride, high-bandwidth memory).

2. Is [TICKER]'s physical infrastructure in the United States, in allied nations, or in geopolitically exposed jurisdictions? Per Aschenbrenner: datacenters in Middle Eastern autocracies or in Chinese territory are a national security liability for the AGI race. Any infrastructure in those jurisdictions is a structural risk.

3. Does [TICKER] benefit from friend-shoring or domestic content incentives? CHIPS Act, Inflation Reduction Act, EU AI Act supply chain requirements, UK National AI Strategy, AUKUS technology sharing?

4. Export control risk — could [TICKER]'s products or customers be caught by US export restrictions to China? What percentage of revenue is at risk?

5. National security positioning: is [TICKER] on the right side of the US-China technology competition? A company that is a preferred domestic supplier of AI infrastructure is structurally protected; a company with significant Chinese revenue or Chinese-sourced critical inputs is structurally at risk as the competition intensifies.

**Required verdict: GEOPOLITICAL TAILWIND / NEUTRAL / GEOPOLITICAL HEADWIND**

If HEADWIND — quantify the revenue at risk and assess whether the thesis survives.

---

## SECTION 15 — GEOPOLITICAL RISK PENALTY (MANDATORY)

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

## SECTION 16 — INSTITUTIONAL ROTATION AND DISCOVERY TIMING

_Required — no score, but timing determines whether you capture the return or watch it happen_

Known AI infrastructure institutional rotation sequence (from Serenity's framework):

- **Phase 1 (2023–2024, largely complete):** Memory / HBM — Micron, SK Hynix, Samsung
- **Phase 2 (2024–2025, in progress):** Optical transceivers — AAOI, COHR, LITE
- **Phase 3 (2025–2026, early innings):** External light sources, silicon photonics, co-packaged optics
- **Phase 4 (2026–2027, not yet defined):** Power infrastructure, cooling, advanced networking, sovereign cloud
- **Phase 5 (2027–2028, speculative):** Government AI programme supply chain — The Project beneficiaries

1. Which phase does [TICKER] map to? Is it ahead of, within, or behind institutional rotation for its category?

2. Has institutional ownership been growing rapidly in the past two quarters? Is the smart money arriving or already seated?

3. Most likely discovery catalyst: earnings beat of >20%, first bulge-bracket initiation, hyperscaler public announcement, government contract award, power contract disclosure, M&A?

4. Realistic time to institutional consensus: 6 months / 12 months / 18+ months?

5. Risk that the rotation has already occurred and the easy money is made? If institutional ownership is already high and the stock has already moved 3× from its trough, assess honestly whether the return thesis still holds.

---

## FINAL SCORECARD

| Section | Criterion | Max | Score | Evidence Quality |
|---|---|---|---|---|
| 01 | Layer classification — non-optional at scale | 1 | | Strong / Moderate / Weak |
| 02 | Hyperscaler and government linkage | 1 | | Strong / Moderate / Weak |
| 03 | Demand outstrips capacity | 2 | | Strong / Moderate / Weak |
| 04 | Revenue inflection and acceleration | 1 | | Strong / Moderate / Weak |
| 05 | Consensus model asymmetry | 1 | | Strong / Moderate / Weak |
| 06 | Execution moat | 1 | | Strong / Moderate / Weak |
| 07 | Government and sovereign positioning | 1 | | Strong / Moderate / Weak |
| 08 | Technology durability at scale | 1 | | Strong / Moderate / Weak |
| 09 | Capital structure for the arms race | 1 | | Strong / Moderate / Weak |
| 10 | Secular + cyclical tailwinds | 1 | | Strong / Moderate / Weak |
| 11 | Under-covered or mismodelled | 1 | | Strong / Moderate / Weak |
| 12 | Management integrity and execution | 1 | | Strong / Moderate / Weak |
| **TOTAL** | | **13** | | |

**Verdict:**

- **11–13 — Tier 1:** Highest conviction. Serenity-grade scale-up play. Maximum position for risk tolerance. (Note: A company that fails the Sovereign Supply Chain Decoupling Test in Section 7 is disqualified from Tier 1 and capped at Tier 2).
- **8–10 — Tier 2:** Strong thesis. Partial position now, add on catalysts.
- **5–7 — Tier 3:** Interesting but incomplete. Watchlist until 1–2 more criteria confirmed.
- **Below 5 — Pass:** Does not meet the framework. Move on.

**Automatic disqualifiers — score 0 and do not invest regardless of total:**

- Active regulatory investigation against the company or current executives
- Going-concern opinion from the current auditor
- Short report allegations that cannot be refuted with filed evidence
- Integrity audit finding of prior fraud or securities violations by current leadership
- Auditor resignation or replacement with no credible explanation
- Infrastructure in Middle Eastern autocracies or Chinese-controlled jurisdictions comprising >30% of total capacity, with no credible diversification plan
- Physical delivery roadmap relies on a single-point-of-failure component that fails the Sovereign Supply Chain Decoupling Test in Section 7 (disqualifies the company from Tier 1 ranking, capping maximum conviction level to Tier 2).

---

## SYNTHESIS: THE ONE-PARAGRAPH PITCH

Write the investment thesis in one paragraph as Serenity would post it on X: direct, data-driven, aggressive, zero fluff, no hedging language. The paragraph must contain:

- The specific layer of the trillion-dollar cluster [TICKER] serves and its OOM test verdict
- The hyperscaler or government dependency chain
- The consensus gap: what consensus models assume vs. what the cluster math implies, stated as a multiple
- The supply constraint or execution moat evidence
- The market cap vs. bull-case target with the explicit return multiple
- The institutional rotation phase and estimated time to consensus discovery
- If an active short thesis exists: one sentence acknowledging it and why the bull case survives it

If you cannot write this paragraph with hard numbers and specific evidence from transcripts and filings, state clearly that the thesis requires more data before a position is justified.

---

_Framework based on Serenity (@aleabitoreddit) Chokepoint Theory, extended for AI infrastructure scale-up plays. Intellectual foundation: Leopold Aschenbrenner, "Situational Awareness: The Decade Ahead" (June 2024). Research use only — not financial advice. DYOR._

---

## POST-MORTEM PROTOCOL (MANDATORY FOR THESIS FAILURES)

When a Tier 1 or Tier 2 thesis fails (defined as stock declining >50% from entry OR company hitting an automatic disqualifier post-initial scoring), a post-mortem analysis is mandatory within 30 days.

**Post-Mortem Template:**

### Company: [TICKER]
**Original Tier:** [Tier 1 / Tier 2]
**Original Score:** [X/13]
**Entry Date:** [Date]
**Thesis Failure Trigger:** [Stock decline >50% / Going concern opinion / SEC investigation / Other disqualifier]
**Failure Date:** [Date]

**Section-by-Section Failure Analysis:**

| Section | Original Score | Should Have Been | Error Source |
|---|---|---|---|
| 01 | X/1 | Y/1 | [What data point was missed? Was the scoring criterion too loose?] |
| 02 | X/1 | Y/1 | [Did customer linkage prove weaker than assessed?] |
| 03 | X/2 | Y/2 | [Was supply constraint language misinterpreted?] |
| 04 | X/1 | Y/1 | [Was revenue inflection premature or consensus gap miscalculated?] |
| 05 | X/1 | Y/1 | [Did cluster math assumptions prove wrong?] |
| 06 | X/1 | Y/1 | [Did execution moat fail to materialize?] |
| 07 | X/1 | Y/1 | [Was government positioning overstated?] |
| 08 | X/1 | Y/1 | [Did technology become obsolete faster than projected?] |
| 09 | X/1 | Y/1 | [Was capital structure inadequate?] |
| 10 | X/1 | Y/1 | [Did secular/cyclical assumptions break?] |
| 11 | X/1 | Y/1 | [Did consensus model actually close the gap?] |
| 12 | X/1 | Y/1 | [Were integrity issues missed or execution failures unpredictable?] |

**Root Cause Classification:**
- [ ] Framework structural flaw (scoring criteria too loose)
- [ ] Data availability gap (critical information not accessible during initial research)
- [ ] Management integrity failure (fraud/misrepresentation not detectable via public filings)
- [ ] Exogenous shock (macro event, regulatory change, geopolitical disruption)
- [ ] Execution failure (thesis was correct but company failed to execute)
- [ ] Cluster math error (scaling assumptions proved incorrect)
- [ ] Technology skip risk materialized (faster than 36-month window)

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
1. Open [TABLE.md](file:///Users/danwooster/1.%20DEV/titanite/TABLE.md).
2. Insert or update the company in the table under the appropriate Tier and Score sequence (highest score to lowest).
3. Populate all columns:
   - **Ticker** (in bold)
   - **Company Name**
   - **Score & Tier** (in bold)
   - **Industry (Folder)**
   - **Key Summary & Major Events** (concise, data-dense bullet points summarising the thesis, key catalysts, and risks).

