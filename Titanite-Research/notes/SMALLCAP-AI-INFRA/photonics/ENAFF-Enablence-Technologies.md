# CHOKEPOINT RESEARCH REPORT
### Deep AI supply chain bottleneck analysis — Stock: ENAFF / ENA (TSX-V)
### Research Date: 30 May 2026

---

## AUTOMATIC DISQUALIFIER — READ BEFORE PROCEEDING

> **STOP. Two automatic disqualifiers are active. This thesis does not meet the framework regardless of score elsewhere.**

**Disqualifier 1 — Going Concern.**
Enablence Technologies' financial filings through FY2025 and into FY2026 carry active going concern disclosures. The company's own website and SEDAR+ filings explicitly flag "material uncertainties that cast significant doubt about the company's ability to continue as a going concern," citing accumulated deficits, negative working capital, and dependence on securing additional financing. This is not a generic boilerplate. The company is in active, non-binding discussions with "major stakeholders" regarding capital provision and debt restructuring as of May 2026. Per the framework's automatic disqualifier rules, a going concern opinion from the current auditor ends the analysis here.

**Disqualifier 2 — CFO Resignation.**
CFO Stan Besko resigned effective 1 January 2026. Brian Siegel was appointed Interim CFO on 18 February 2026 — a gap of 49 days without a permanent CFO. A CFO departure at an eight-million-dollar-revenue company with active going concern language and an ongoing debt restructuring is a red flag of the first order. The framework is explicit: a CFO departure requires investigation before scoring proceeds. In this case, it compounds a going concern disclosure.

**Framework verdict: Do not invest. Do not score. Move on.**

What follows is a full analysis for educational context and to document the thesis correctly — including the genuine merits, which are real — but the automatic disqualifiers stand. No section score can override them.

---

## STEP B — INTEGRITY & FRAUD SWEEP RESULTS

No active SEC investigation, no short-seller reports, no class action lawsuits, no regulatory enforcement action found. No evidence of prior fraud by Todd Haugen (CEO) or any other current executive. Haugen's background is legitimate: 20 years at Microsoft across Windows, Office, and Azure; prior ventures in tech without material regulatory blemishes.

The CIRO trading halt on 4 May 2026 was a standard Canadian regulatory procedure to ensure orderly markets during a period of unusual price and volume movement, not a precursor to enforcement action. The company promptly confirmed it was unaware of any material undisclosed information.

The integrity audit on management is clean. The disqualifiers arise from the balance sheet and CFO departure — structural financial risk, not fraud.

---

## GATE CHECK — MARKET CAP FILTER

- **Market cap:** ~CA$133–137 million (~USD$97–100 million) as of 29 May 2026
- **Enterprise value:** Not formally disclosed; given $25 million term loan facility with Pinnacle Island II LP plus additional debenture obligations from the April 2025 $51 million recapitalisation, EV is materially higher than market cap — likely USD$130–150 million on a best-estimate basis
- **Hard gate:** Passes at under $5 billion

Theoretical bull-case maths (carried forward for completeness despite the disqualifiers):
- FY2026 guidance: CA$8 million revenue (reaffirmed, Q3 FY2026 update, 27 May 2026)
- If management reaches profitability in calendar 2026 and revenue scales to CA$30–40 million by FY2028 on CPO ramp, a 10× EV/Revenue multiple (comparable to optical component peers at volume) implies EV of CA$300–400 million
- At current market cap of ~CA$135 million, that produces a 2–3× return in the optimistic case — well below the framework's 5× minimum before accounting for the very real dilution embedded in the capital structure
- The maths fail before the disqualifiers even trigger

---

## SECTION 0 — THE STRAIT OF HORMUZ TEST

**Supply chain map:**

1. **Upstream:** Silicon wafer substrates, silica-on-silicon deposition materials, photolithography chemicals, etch gases — all commodity inputs available from multiple global suppliers.

2. **Enablence's position:** Takes in raw silicon wafers and fabricates Planar Lightwave Circuit (PLC) chips at its Fremont, California fab. Core output is the NxN Star Coupler — a passive optical component that splits and routes light across multiple channels — plus general PLC chips for LiDAR, telecom splitters, and AR/VR waveguides.

3. **Downstream:** The NxN Star Coupler feeds into External Light Source (ELS) modules assembled by O-Net Technologies, which then supply CPO-enabled AI switches and routers. The laser arrays come from Sivers Semiconductors. The ELS module is the light-delivery system for co-packaged optical (CPO) interconnects in AI data centre switches, the primary target being next-generation Ethernet and InfiniBand fabrics in hyperscaler clusters.

4. **Hyperscaler end-use:** AI GPU cluster interconnect. GPUs at 100kW+ rack densities cannot be connected by copper past roughly 2–3 metres. CPO is the architecture that puts the optical engine directly on the switch die. The ELS module is the remote laser source that CPO architectures require to avoid placing heat-sensitive lasers adjacent to processors running at 90°C+.

5. **If Enablence disappeared tomorrow:** O-Net would need to source star couplers elsewhere. Lead time to qualify an alternative supplier for a precision PLC component: estimated 6–12 months minimum. However — and this is the critical limitation — Enablence is one of several PLC manufacturers globally. The disruption would be painful but not catastrophic for the CPO supply chain.

6. **Competitors:** Not a monopoly. PLC components are manufactured by multiple firms including O-Net itself, JDSU/Viavi predecessors, NTT Electronics, NeoPhotonics (acquired by II-VI/Coherent), and various Asian foundries. Enablence's specific differentiation is its North American fab location (supply chain security narrative) and its FMCW LiDAR-optimised chip designs. In the ELS module context, Enablence's star coupler design appears to be the preferred specification in the Sivers/O-Net collaboration, but the design could theoretically be replicated.

7. **Strait of Hormuz test:** Enablence does not pass. Global industry flow of PLC star couplers does not route through Enablence in any majority sense. Enablence's current wafer capacity — even at its expanded target of 3,000 starts per month by end of FY2026 — is a minor fraction of total global PLC production. Its North American fab is unique for the reshoring narrative, but the component itself has substitutes.

8. **Switching costs:** 6–12 months to qualify an alternative PLC star coupler supplier for a given ELS module design. Non-trivial but not prohibitive.

**Verdict: PARTIAL CHOKEPOINT**

Enablence has genuine differentiation — sole North American PLC fab of this specification, a specific design-win in the Sivers/O-Net ELS module, and real expertise in FMCW LiDAR PLC designs. But it is not a chokepoint in the Strait of Hormuz sense. There are global substitutes. The framework continues for documentation purposes.

---

## SECTION 1 — WHICH AI INFRA BOTTLENECK DOES IT SOLVE?

**Score: 1/1**

Enablence addresses the optical interconnect bottleneck directly. GPU clusters at 400G–800G per port densities cannot maintain signal integrity over copper beyond 2–3 metres. CPO is the architectural solution endorsed by NVIDIA, Broadcom, Intel, and the major hyperscalers. CPO requires an External Light Source — a precision multi-wavelength laser array module mounted remotely from the switch chip. The ELS module cannot exist without a star coupler to distribute wavelengths across channels.

The bottleneck is specific and quantifiable: CPO deployments, currently in early 2026 qualification at hyperscalers, are expected to scale from near-zero units in 2025 to potentially tens of thousands of switch units by 2028 per industry projections. Enablence's NxN Star Coupler is a qualified component in one of the two or three credible ELS module designs currently in hyperscaler evaluation.

**Evidence quality: Moderate.** The partnership is documented (OFC Show announcement, 17 March 2026). The hyperscaler customer at the end of the Sivers/O-Net/Enablence chain is not publicly named.

---

## SECTION 2 — HYPERSCALER LINKAGE

**Score: 0/1**

No confirmed hyperscaler relationship with documentary evidence. The Sivers/Enablence/O-Net ELS module partnership is real and announced. O-Net Technologies is a Tier 1 optical module manufacturer supplying Google, Amazon, and Meta. That is the closest link in the chain. But Enablence's relationship is to O-Net, not to the hyperscalers directly. No design-in confirmation from a named hyperscaler is on public record.

The company states its products support "North American AI infrastructure expansion" but does not name customers. The MD&A describes "strong demand" across optical communications, sensing, and compute without naming a hyperscaler counterparty.

**Evidence quality: Weak.** Potential hyperscaler linkage via O-Net is a reasonable inference, not a documented fact.

---

## SECTION 3 — DEMAND OUTWEIGHS SUPPLY

**Score: 1/2**

**Sub-section A — Trailing documented:**

| Quarter | Revenue | Gross Margin |
|---|---|---|
| Q1 FY2025 (Jul–Sep 2024) | ~CA$0.4M | Deeply negative |
| Q2 FY2025 (Oct–Dec 2024) | ~CA$0.6M | Deeply negative |
| Q3 FY2025 (Jan–Mar 2025) | ~CA$1.2M | Negative |
| Q4 FY2025 (Apr–Jun 2025) | ~CA$3.7M | Negative |
| Q1 FY2026 (Jul–Sep 2025) | ~CA$1.8M | Negative |
| Q2 FY2026 (Oct–Dec 2025) | ~CA$3.3M | Negative |
| Q3 FY2026 (Jan–Mar 2026) | CA$2.25M | +13% (CA$297k) — first positive gross margin quarter |

FY2025 full year: CA$5.94 million (271% YoY growth). FY2026 guidance: CA$8.0 million ±CA$0.5 million.

No "sold out" language in filed documents. No disclosed backlog figure. No price increase announcements. The revenue trajectory shows clear growth from a very low base but has been revised down from the original CA$12 million FY2026 guidance.

**Sub-section B — Forward run-rate signals:**

CEO Todd Haugen, Q3 FY2026 press release (27 May 2026): "strong demand across our three core business areas — optical communications, sensing, and compute — driven by the expansion of North American AI infrastructure." This is positive but not the same as "production is fully allocated."

Management cited tooling onboarding delays and a one-time inventory adjustment as reasons for the guidance cut from CA$12 million to CA$8 million. These are operational credibility issues, not demand shortfalls. Management's characterisation of the cut as "short-term ramping issues" is plausible given the wafer capacity now exceeding 2,500 starts/month.

There is no verbatim quote from any filing where management states production is fully sold out or that demand exceeds current supply in a way that constrains deliveries. The demand language is generally positive; the shortage language is absent.

**Score 1:** Supply tightness emerging in forward narrative — the CPO story and the Sivers/O-Net partnership point toward genuine demand — but it is not yet showing in reported financials as a shortage. The guidance cut is a yellow flag on management's ability to predict near-term performance.

**Evidence quality: Moderate.**

---

## SECTION 4 — REVENUE INFLECTION AFTER MULTI-YEAR TROUGH

**Score: 1/1**

The trough was FY2024 (year ended June 2024), when revenue was approximately CA$1.6 million — the company was effectively pre-commercial. FY2025's 271% growth to CA$5.94 million is unambiguous inflection. Q3 FY2026's 80% YoY growth confirms the trajectory is sustained. Two-plus consecutive quarters of acceleration from a documented trough: criterion met.

The guidance cut from CA$12 million to CA$8 million introduces a caution flag on trajectory velocity, but the direction of travel — from sub-CA$2 million annually to CA$8+ million — is real. Q3 FY2026 also produced the first positive gross margin quarter. That is the operating leverage signal the framework looks for.

Critically, management has guided for profitability in calendar year 2026. That would require Q4 FY2026 (Apr–Jun 2026) to show further margin improvement. The wafer capacity reaching 2,500+ starts per month by end of Q3 provides a mechanical basis for that claim.

**Evidence quality: Strong on trailing documentation. Moderate on forward credibility given the guidance cut.**

---

## SECTION 5 — SMALL CAP / ASYMMETRIC UPSIDE

**Score: 0/1**

- Market cap: ~CA$135 million / ~USD$99 million
- FY2026 revenue: ~CA$8 million
- Current EV/Revenue: ~16–18× on FY2026 estimates. For a company with a going concern flag and net losses of CA$18 million in FY2025, this is expensive, not cheap.
- Comparable mature optical component companies trade at 3–8× revenue at volume scale. Even applying 8× to a bull-case CA$40 million FY2028 revenue figure gives CA$320 million EV. From CA$135 million market cap today, accounting for dilution from the convertible debentures (conversion price CA$2.25/share vs. current price ~CA$6.50 — already deeply in the money, implying significant share count inflation), the implied return is sub-3×.
- That fails the 5× minimum.

The capital structure is the killer. The April 2025 CA$51 million recapitalisation involved convertible debentures at CA$2.25/share. At CA$6.50/share today, those debentures are 189% in the money. If and when converted, the dilution could be substantial. Current shares outstanding are approximately 20.5 million; full conversion of the debentures could add a large block of new shares depending on debenture face value. Without the precise debenture principal, a conservative estimate suggests 30–50% dilution potential from conversion alone, before any future equity raises to fund ongoing losses.

**Evidence quality: Strong.** The maths are clear. This is not a 5× return thesis at current valuation and capital structure.

---

## SECTION 6 — R&D TO SCALING TRANSITION

**Score: 1/1**

The transition is real and documented.

- Stage: Early Commercial / Volume Ramp
- Wafer fab in Fremont now exceeds 2,500 starts/month (Q3 FY2026, May 2026), up from 1,500 starts at the start of FY2026
- Target: 3,000+ starts/month by FY2026 year-end (June 2026)
- Vietnam assembly facility commenced operations in Q3 FY2026
- First positive gross margin quarter achieved: Q3 FY2026 at 13%
- Management target: profitability in calendar year 2026
- Specific catalysts: CPO qualification wins at a named hyperscaler (unnamed but implied via O-Net route), further gross margin expansion as fixed fab costs are absorbed across higher volume

The 6–24 month revenue timeline is credible. The technology transition from R&D to production is not hypothetical — it is confirmed by operational data.

**Evidence quality: Strong.**

---

## SECTION 7 — CUSTOMER CONCENTRATION WITH HYPERSCALERS

**Score: 0/1**

No hyperscaler or Tier 1 supplier is named in any Enablence filing as a direct customer. O-Net Technologies is the integration partner for the ELS module and is itself a Tier 1 optical module supplier. But Enablence's relationship with O-Net appears to be a partnership for a jointly developed product, not a purchase order from O-Net for star couplers at volume. The distinction matters.

Customer concentration data is not publicly disclosed in detail. For a company with CA$8 million in annual revenue, it is almost certain that a small number of customers account for the majority. Management has not disclosed the top customer percentage. No take-or-pay contracts or multi-year supply agreements are in the public record.

**Evidence quality: Weak.** The absence of disclosure is itself informative for a CA$135 million market cap company.

---

## SECTION 8 — TECHNOLOGY LEADERSHIP / FIRST-MOVER ADVANTAGE

**Score: 1/1**

The North American PLC fab argument is genuinely differentiated. No other company operates a non-captive PLC wafer fabrication facility of this specification in North America. Coherent (formerly II-VI/NeoPhotonics) and Lumentum have photonic integration capabilities but are captive fabs serving their own product lines, not third-party foundry services. Enablence operates a merchant fab model — it will build PLC chips to customer specification.

For the reshoring narrative specifically, this is a credible moat. US and Canadian government procurement programmes, domestic content requirements emerging from the CHIPS Act framework, and hyperscaler supply chain security mandates all push toward North American sourcing for optical components. Enablence is the only name in that slot.

In FMCW LiDAR PLC specifically, the company has published proprietary low-loss waveguide designs. In the star coupler for CPO ELS applications, the design is purpose-built for wavelength uniformity requirements that competing commodity PLC suppliers have not demonstrated meeting.

Technology lead over nearest credible North American competitor: at least 18–24 months, possibly longer given that building a PLC fab requires 12–18 months of setup alone. No competitor with a credible roadmap to displace Enablence within 24 months in the North American merchant PLC space has been identified.

**Evidence quality: Moderate.** The North American moat is real but has not yet been validated by volume customer wins.

---

## SECTION 9 — RECENT CAPITAL RAISE

**Score: 0/1**

Red flags throughout.

- **April 2025 CA$51 million recapitalisation:** Convertible debentures, a new term loan with Pinnacle Island II LP, shares-for-debt settlements. The use of proceeds was explicitly to restructure existing debt and provide working capital — classic distressed-balance-sheet recapitalisation, not growth-funding. The Pinnacle Island LP counterparty is a private credit entity, not a strategic investor.
- **October 2025 term loan amendment:** Pinnacle Island II LP facility increased from CA$20 million to CA$25 million for "working capital." Further evidence of ongoing cash pressure.
- **CFO resigned effective January 2026.**
- **May 2026:** Active discussions with stakeholders about "additional capital" and "debt restructuring initiatives." The company has no assurance it will secure financing on acceptable terms.

The raises are distressed, not growth-oriented. The timing compounds the going concern disclosure. The dilution from convertibles is potentially severe. This is the capital structure profile of a company that cannot fully fund its own growth from operations.

**Evidence quality: Strong.** The red flags are clearly documented.

---

## SECTION 10 — SECULAR AND CYCLICAL TAILWINDS

**Score: 1/1**

**Secular:** CPO is not a fad. GPU-to-GPU bandwidth requirements scale with model size, and model sizes are not shrinking. Electrical copper interconnects hit physical limits at the rack-scale distances that define modern AI clusters. Every major switch ASIC roadmap from Broadcom, Marvell, and NVIDIA includes CPO integration as the target architecture for 2027–2030. PLC star couplers are not replaceable by an alternative photonic architecture within the 5–10 year horizon.

LiDAR for autonomous vehicles and robotics is a second structural driver. The FMCW LiDAR market — where Enablence's PLC chips offer specific advantages in coherent detection — is growing at 30–40% annually as the automotive industry moves from legacy ToF systems to FMCW for better performance in adverse conditions.

**Cyclical:** The CPO deployment cycle is in its earliest innings as of May 2026. Hyperscaler AI capex — collectively exceeding $400 billion annually across the top five US hyperscalers — is being committed through 2027 at minimum. CPO module qualifications are occurring now; volume orders follow 12–18 months after qualification. Enablence is positioned at the qualification stage of a cyclical upswing with multiple years of upside.

Both secular and cyclical drivers are present and compounding. The framework awards the point.

**Evidence quality: Strong on sector tailwinds. Moderate on Enablence's specific participation.**

---

## SECTION 11 — UNDER-FOLLOWED AND UNDER-RESEARCHED

**Score: 1/1**

Approximately 3 analysts cover ENA on SEDAR+. None actively update consensus estimates per public record. Morningstar uses quantitative modelling in lieu of analyst coverage. The stock is "Unsolicited-Only" on OTC Markets (ENAFF), meaning US brokers will not solicit trades in it. It is a Canadian TSX-V listed micro-cap optical chip company — structurally excluded from most US institutional mandates.

Top 7 shareholders own over 80% of the company. Insiders hold ~37% and private companies ~28%. The remaining float is thin. This is not institutional-dominated — it is a founder/insider/private-credit-controlled capital structure.

Information asymmetry exists on both the upside (the CPO ELS partnership is undercovered relative to its strategic relevance) and the downside (the going concern and capital structure complexity are opaque to casual investors chasing the AI photonics narrative).

**Evidence quality: Strong.**

---

## SECTION 12 — MANAGEMENT INTEGRITY AND EXECUTION

**Score: 0/1**

**Component A — Integrity audit:** Clean on fraud, regulatory investigation, or prior misconduct. Todd Haugen's Microsoft background is legitimate. No short reports, no SEC action, no class action.

However: Stan Besko resigned as CFO effective 1 January 2026. An *interim* CFO (Brian Siegel, appointed 18 February 2026) is not a permanent replacement. The framework flags CFO departures for explicit investigation. In the context of an active going concern disclosure and an ongoing debt restructuring, a CFO resignation is not noise. No stated reason beyond "to pursue other opportunities" is on public record.

This is not an automatic disqualifier for Section 12 on its own, but it prevents a clean integrity audit result.

**Component B — Execution track record:**

Management guided CA$12 million for FY2026. Actual revised guidance is CA$8 million — a 33% cut. The rationale (tooling delays, one-time inventory adjustment) is plausible, but this is a broken promise. The framework requires three consecutive earnings beats with at least one guidance raise. Enablence has a guidance cut on record, no guidance raise, and no history of beating consensus (the stock lacks sufficient analyst coverage for consensus to be meaningful).

**Score 0.** CFO departure context plus guidance cut preclude the 1 point. The integrity audit is not clean enough in context, and the execution record does not meet the threshold.

---

## SECTION 13 — ADVERSARIAL TESTING: STEEL-MAN THE BEAR CASE

**No active short report. The bear case is structural, not speculative.**

1. **Thesis killer:** Enablence runs out of cash before CPO volume orders arrive. The company burns cash every quarter. The Pinnacle Island II LP facility is at CA$25 million maximum. If O-Net's ELS module qualifications extend by 6–12 months — which is normal in semiconductor qualification cycles — Enablence may need an equity raise at unfavourable terms, severely diluting existing shareholders. At CA$6.50/share today, the convertible debentures at CA$2.25/share conversion price are already creating a massive overhang. A distressed equity raise at CA$3–4/share while existing converts exercise would be portfolio-killing.

2. **Short report reconciliation:** No active short report. N/A.

3. **Substitute threat:** Any Asian PLC foundry with spare capacity and willingness to invest in CPO-specific star coupler qualification could enter this market within 18–24 months. O-Net itself manufactures passive optical components. If the CPO ELS module proves commercially important, O-Net has the in-house capability to vertically integrate the star coupler. The North American reshoring moat provides some insulation, but hyperscalers do not pay a geopolitical premium if cost differences are material.

4. **Concentration stress test:** Without disclosed customer concentration data, this cannot be modelled precisely. Given CA$8 million annual revenue and the explicit description of "strong demand" from AI infrastructure, it is reasonable to assume 2–3 customers account for 70–80% of revenue. Loss of the largest single customer could cut revenue by 30–50%, taking the company below its path to profitability and triggering covenant defaults on the Pinnacle Island II facility.

5. **Technology skip risk:** CPO itself is not the skip risk — it is the direction of industry travel. The skip risk is that hyperscalers standardise on an integrated laser approach (e.g., directly bonded III-V lasers on silicon photonic chips) that eliminates the need for a discrete external star coupler. Timeline for that architecture to reach volume production: 2029–2031 at earliest. Not a 24-month risk.

6. **Balance sheet risk:** Net loss of CA$18.15 million in FY2025. Going concern disclosure. CA$25 million term loan facility. Convertible debentures with CA$2.25/share conversion (deeply in the money at CA$6.50/share, so conversion is likely, diluting current holders). Cash on hand not publicly disclosed in available data but inferred to be limited given the ongoing financing discussions. Quarterly burn estimated at CA$3–4 million. Runway: likely 6–9 months at current burn absent the new financing. Dilution probability: High.

7. **Structural vs temporary:** The CPO photonics opportunity is structural. Enablence's ability to capture it is the question — and that is a function of its balance sheet, which is a temporary weakness if financing is secured at reasonable terms, but a permanent impairment if it is not.

8. **Capex cut scenario:** If hyperscaler AI capex is cut 40%, CPO qualification timelines extend, ELS module orders are deferred, and Enablence's revenue progression stalls at CA$6–7 million. At that revenue level with a CA$3–4 million quarterly burn, the company requires external capital to survive. The stock would likely fall 60–70% from current levels as the going concern risk becomes existential.

**Bear case rating: STRONG.**

The bull case for the technology is real. The bull case for the equity at current valuation and capital structure requires a sequence of things to go right: the financing is secured at non-dilutive terms, CPO qualifications close on schedule, revenue reaches CA$15+ million in FY2027, gross margins expand to 35–40%, and the CFO vacancy is filled by a credible permanent appointment. That is a crowded if-and list for a company with CA$8 million in revenue and an active going concern disclosure.

---

## SECTION 14 — GEOPOLITICAL DIMENSION

**Verdict: GEOPOLITICAL TAILWIND**

Enablence is the only non-captive PLC wafer fabrication facility in North America. That is a strategic asset in an environment where:

- US export controls on Chinese semiconductor equipment are tightening
- CHIPS Act programmes explicitly cover photonic component manufacturers
- Hyperscalers are mandating North American supply chain audits for critical optical components
- The US Department of Commerce has flagged optical interconnects as strategically sensitive in AI infrastructure supply chain reviews

The company's Fremont, California fab has no exposure to Chinese input restrictions on gallium, germanium, or antimony because silicon-on-silica PLC chemistry does not require those materials. This is a meaningful differentiation from InP or GaAs photonic platforms.

Supply chain: Does not pass through China at the fabrication layer. Assembly operations were moved to Vietnam in FY2026. Vietnam carries lower geopolitical risk than China for current US policy frameworks.

CHIPS Act eligibility: Management has cited CHIPS Act support publicly. Formalised CHIPS Act funding has not been announced. If secured, this would be a material catalyst and partially alleviate the balance sheet risk.

---

## SECTION 15 — INSTITUTIONAL ROTATION TIMING

Enablence maps to Phase 3 of the rotation sequence: external light sources and silicon photonics, 2025–2026, early innings.

The problem is that Phase 3 rotation is beginning to attract institutional attention to the broader CPO space (POET Technologies, Ayar Labs, etc.), and Enablence is not yet on institutional radars because of its TSX-V listing, its Unsolicited-Only OTC status, and its active going concern disclosure. Most institutional mandates prohibit buying a company with a going concern note.

The discovery catalyst would be: a named hyperscaler CPO design-win, resolution of the going concern note through a clean balance sheet restructuring, and a permanent CFO appointment. In that sequence, the stock becomes investable for small-cap institutional funds. That sequence could take 12–18 months and is contingent on financing closing.

Risk that the rotation has already occurred: No. ENA has moved significantly in May 2026 (prompting the CIRO halt), but that was retail-driven momentum, not institutional rotation. There is no evidence of bulge-bracket initiation or meaningful institutional accumulation.

---

## FINAL SCORECARD

| Section | Criterion | Max | Score | Evidence Quality |
|---|---|---|---|---|
| 01 | AI infra bottleneck | 1 | 1 | Moderate |
| 02 | Hyperscaler linkage | 1 | 0 | Weak |
| 03 | Demand > supply | 2 | 1 | Moderate |
| 04 | Revenue inflection after trough | 1 | 1 | Strong (trailing) |
| 05 | Small cap / asymmetric upside | 1 | 0 | Strong |
| 06 | R&D to scaling transition | 1 | 1 | Strong |
| 07 | Customer concentration with hyperscalers | 1 | 0 | Weak |
| 08 | Technology leadership / first-mover | 1 | 1 | Moderate |
| 09 | Recent capital raise | 1 | 0 | Strong |
| 10 | Secular + cyclical tailwinds | 1 | 1 | Strong |
| 11 | Under-followed / under-researched | 1 | 1 | Strong |
| 12 | Management integrity and execution | 1 | 0 | Moderate |
| | **TOTAL** | **13** | **7** | |

**Scorecard tier: Tier 3 — Watchlist only** (5–7 range)

**BUT:** Automatic disqualifiers override the score entirely. Going concern + CFO departure = do not invest at this stage, regardless of framework tier.

---

## SYNTHESIS: THE ONE-PARAGRAPH PITCH

Not applicable in standard form. The automatic disqualifiers preclude a position.

The correct Serenity-style framing for this stock is as follows:

Enablence owns the only non-captive PLC wafer fab in North America and holds a confirmed design-win position in the Sivers/O-Net ELS module stack targeting CPO-enabled AI data centre switches — a market that does not exist at volume today but will. Revenue grew 271% in FY2025 and another 80% YoY in Q3 FY2026 to CA$8 million run-rate. The company just printed its first positive gross margin quarter (13%). North American reshoring and CHIPS Act tailwinds are real. The technology moat is genuine. The CPO opportunity is structural. On pure technology and sector positioning, this scores 7/13 on the Chokepoint Framework — watchlist quality.

Here is why you cannot buy it today: the company carries an active going concern disclosure in its financial filings, its CFO resigned on 1 January 2026 with only an interim replacement appointed, and the April 2025 CA$51 million recapitalisation was a distressed restructuring — convertible debentures at CA$2.25/share are 189% in the money at the current CA$6.50/share price, representing a meaningful future dilution event. The company is in non-binding discussions for additional capital as of May 2026 with no deal announced. If the balance sheet is cleaned up — clean financing secured at non-distressed terms, permanent CFO appointed, going concern note removed — Enablence becomes a genuine investigation candidate in Phase 3 of the institutional rotation. Watch the financing announcement. Do not buy the going concern.

---

## WATCH LIST CONDITIONS

Re-evaluate Enablence when **all three** of the following are met:

1. Going concern note removed from financial filings — this requires either a formal financing announcement or evidence of positive operating cash flow sustained over two quarters
2. Permanent CFO appointed and has filed at least one quarterly MD&A
3. A named hyperscaler or Tier 1 module integrator (O-Net, Coherent, Lumentum) confirms a volume purchase order or supply agreement referencing Enablence components

If all three conditions are met and the market cap remains below CA$300 million, re-run the full framework. The technology story may score meaningfully higher with a clean balance sheet.

---

*Framework based on Serenity (@aleabitoreddit) Chokepoint Theory. Research use only — not financial advice. DYOR.*
*Research date: 30 May 2026. All figures in Canadian dollars unless stated otherwise.*
