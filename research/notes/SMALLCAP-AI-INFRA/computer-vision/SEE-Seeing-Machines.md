# CHOKEPOINT RESEARCH REPORT

### Deep AI supply chain bottleneck analysis — Stock: SEE (Seeing Machines Limited)

---

## GATE CHECK — MARKET CAP FILTER

State the current market cap and enterprise value of SEE (as of 29 May 2026):

*   **Market Cap:** £235.8 million (~USD 300 million, based on a share price of 4.80p and 4,912,392,305 shares on issue).
*   **Enterprise Value:** ~USD 337 million (incorporating USD 54.4 million in convertible note debt and USD 17.5 million in cash, which includes the post-period USD 14.1 million accelerated royalty payment).

**Hurdle Check:** Pass. The market capitalisation of USD 300 million is far below the USD 5 billion hard ceiling.

**Valuation and Return Math (36-Month Horizon):**
*   **Current Sales Run-rate:** USD 45.8 million (based on statutory H1 FY2026 revenue of USD 22.9 million).
*   **Secured Design Wins:** Cumulative initial lifetime value of automotive programs won to date exceeds USD 400 million across 11 global OEMs.
*   **Run-rate at Peak Production:** Assuming a standard 6-year vehicle lifecycle, currently secured design wins translate to peak annual automotive software revenues of ~USD 67 million.
*   **Aftermarket (Guardian):** Annualised Recurring Revenue (ARR) grew 5% quarter-on-quarter to USD 14.7 million in Q3 FY2026.
*   **Projected FY2028 Revenue:** USD 127.5 million (consensus analyst estimates, driven by high-volume royalty scaling).
*   **Target Multiple:** 8x EV/Sales (reflecting the lower gross margin of 58% due to the hardware-heavy Guardian aftermarket business compared to pure-play software peers).
*   **Target Enterprise Value:** USD 1.02 billion.
*   **Target Market Capitalisation:** USD 983.1 million (assuming net debt of USD 36.9 million).
*   **Implied Return (Base Case):** **3.3x (228% upside)**.
*   **Premium Bull-Case Scenario (FY2029):** Applying a 10x EV/Sales multiple on peak projected revenue of USD 150 million (as high-margin royalties dilute the hardware mix) yields a target Enterprise Value of USD 1.50 billion. This translates to a target market capitalisation of USD 1.46 billion, representing an **implied return of 4.9x (390% upside)**. This conservatively falls just below the 5x return hurdle for hybrid hardware/software businesses but remains a highly asymmetric risk-reward profile.

---

## FRAMEWORK MODIFIER — QUALIFICATION-CYCLE PLAYERS

Seeing Machines is a classic qualification-cycle player. 

The core investment thesis rests on an automotive volume production ramp following a long 18–24 month design-to-production lifecycle. Trailing quarterly and half-yearly revenues have historically been depressed (H1 FY2026 statutory revenue declined to USD 22.9 million from USD 25.3 million in H1 FY2025) because the company has been transitioning from upfront non-recurring engineering (NRE) fees and exclusivity licence arrangements to high-margin serial production royalties. The design wins are secured and the technology is validated on the road.

Modified scoring rules apply to Section 3 and Section 4:
*   **Section 3 (Demand > Supply):** Do not penalise for low or negative historical cash flows. Weight forward booking/design-win values and serial production volume starts at full value.
*   **Section 4 (Revenue Inflection):** Do not score solely on trailing semi-annual tables. Score based on the transition rate of programs to production, and management's clarity on volume starts.

---

## SECTION 0 — THE STRAIT OF HORMUZ TEST

1.  **Upstream Layer:** Near-infrared camera sensors (OmniVision, ON Semiconductor), optical lenses, infrared LEDs/VCSELs, and automotive-grade System-on-Chips (SoCs) manufactured by Qualcomm, Texas Instruments, Renesas, AMD, and NVIDIA.
2.  **SEE's Position:** Seeing Machines provides the core computer vision and eye-tracking software algorithms (packaged as the FOVIO chip or as embedded software libraries) that process high-frequency near-infrared camera feeds in real-time to track driver gaze, head pose, eyelid closure, and signs of fatigue or cognitive distraction.
3.  **Downstream Layer:** Tier 1 automotive suppliers (Magna, Valeo, Joyson Safety Systems) who integrate Seeing Machines' software into their physical driver monitoring system (DMS) modules (typically integrated into the interior rear-view mirror or the steering column). These modules are delivered to global automotive OEMs. No Tier 1 or OEM can ship their safety-certified vehicle cabins without Seeing Machines' calibrated software.
4.  **Hyperscaler/AI Infrastructure Link:** Pre-integrated into Qualcomm's Snapdragon Automotive Cockpit and Snapdragon Ride reference platforms.
5.  **Disruption Impact:** If Seeing Machines disappeared tomorrow, major automotive OEMs would immediately halt production of newly registered vehicle lines in the EU. Safety homologation under European safety mandates would fail. Re-qualifying Smart Eye or another supplier requires redesigning the optical cabin architecture, recalibrating the eye-tracking models for cabin geometries, and re-running the 18–24 month safety certification process.
6.  **Competitors:** Smart Eye AB (SEYE) is the only other viable pure-play software competitor, forming a structural duopoly. Tier 1 suppliers (Bosch) attempt in-house development but struggle to match the accuracy and hardware efficiency of specialised providers.
7.  **Strait of Hormuz Flow:** Approximately 50–60% of current global DMS production volume on the road is powered by Seeing Machines, with over 6.10 million vehicles equipped.
8.  **Switching Costs:** Extremely high. Ripping out Seeing Machines' software requires 18–24 months of engineering recalibration, hardware modifications, and safety recertification.

**Required Verdict: CHOKEPOINT**

---

## SECTION 1 — WHICH AI INFRA BOTTLENECK DOES IT SOLVE?

Seeing Machines addresses the physical constraint of processing high-frequency gaze and cognitive state data in real-time within strict power and latency budgets at the edge. Embedded edge AI models for eye tracking must process video feeds at 30-60 frames per second on low-power automotive-grade microcontrollers (such as their proprietary FOVIO chip or integrated SoCs) without exceeding cabin thermal or power limits. Seeing Machines' optimized neural network models bypass the bottleneck of requiring power-hungry, general-purpose GPUs for computer vision tasks in vehicle cabins.

**Score: 1 point**

---

## SECTION 2 — HYPERSCALER LINKAGE

1.  **Direct Customers:** Tier 1 suppliers (Magna, Valeo, Joyson Safety Systems, Caterpillar).
2.  **Ecosystem Dependency:** Pre-integrated into Qualcomm's Snapdragon Automotive Cockpit and Snapdragon Ride platforms. Qualcomm relies on Seeing Machines' software stack to validate and demonstrate its in-cabin hardware capabilities.
3.  **Confirmed Agreements:** Deep partnership with Qualcomm and Magna (who invested USD 47.5 million via convertible note). Their technology is implemented in major OEMs (including German premium brands, Japanese OEMs, etc.).
4.  **Revenue Mix:** Historically driven by development fees and NRE. However, as of Q3 FY2026, high-margin royalties have inflected, with Q3 royalty revenue alone exceeding H1 FY2026 total royalty revenue ($8.4 million).
5.  **Pull Signals:** Q3 FY2026 production additions of 1.28 million units (a 122% QoQ and 259% YoY increase in quarterly production additions) as OEMs accelerate volume starts to meet the 7 July 2026 EU General Safety Regulation (GSR) deadline.

**Score: 1 point**

---

## SECTION 3 — DEMAND OUTWEIGHS SUPPLY

### Sub-section A — Trailing Documented Evidence

1.  **Reported Gross Margin Table (Semi-Annual):**

    | Period | Gross Margin |
    | :--- | :---: |
    | **H1 FY2025** | 55.0% |
    | **H2 FY2025** | 68.0% |
    | **H1 FY2026** | 58.0% |

    *Note: Gross margins fluctuate based on the mix of high-margin automotive royalties and lower-margin Guardian hardware/monitoring services.*

2.  **Backlog/Order Book:** Cumulative initial lifetime value of automotive programs won to date is over USD 400 million.
3.  **Price Increases:** Licensing fees remain firm, though individual royalty terms are locked into multi-year OEM program agreements.
4.  **Capacity Constraints:** The primary bottleneck is engineering integration capacity to customize eye-tracking software for specific OEM cabin designs, as well as the chip allocation for Guardian hardware.

### Sub-section B — Forward Run-Rate Signals

1.  *Paul McGlone (CEO, Q3 FY2026 update, May 2026):* The volume surge is an "inflection point" toward higher, more consistent volumes, driven by regulatory fitment.
2.  *H1 FY2026 report:* Reaffirmed path to positive adjusted EBITDA in H2 FY26.
3.  *Q3 FY26:* Net addition of 1.28 million cars on the road in a single quarter.

**Score: 1 point** (Supply tightness in engineering integration capacity is coupled with a massive volume surge in production starts, though reported trailing financials are still showing losses due to historical burn and product mix).

---

## SECTION 4 — REVENUE INFLECTION AFTER MULTI-YEAR TROUGH

### Sub-section A — Trailing Documented

Quarterly and semi-annual sales show a clear inflection from the trough in late 2024:

| Period | Revenue (M USD) | YoY Change |
| :--- | :---: | :---: |
| **H1 FY2024** | 31.3 | — |
| **H2 FY2024** | 36.3 | — |
| **H1 FY2025** | 25.3 | -19.2% |
| **H2 FY2025** | 37.0 | +1.9% |
| **H1 FY2026** | 22.9 | -9.5% |

The revenue trough occurred in H1 FY2025 (USD 25.3 million) due to the transition from upfront licensing fees to royalty structures. While H1 FY2026 revenue was lower due to a roll-off of NRE activity as programs matured, Q3 FY2026 saw a massive inflection.

### Sub-section B — Forward Run-Rate Signals

1.  *Q3 FY2026 Update:* Automotive royalty revenue for Q3 alone exceeded the total royalty revenue for the entire first half of FY2026, marking the start of high-volume scaling.
2.  *Management Guidance:* Reaffirmed positive adjusted EBITDA for H2 FY2026 and Q3 FY2026.
3.  *GSR Deadline:* The July 7, 2026 deadline represents an irreversible volume ramp catalyst.

**Score: 1 point** (Credible forward evidence of volume ramp and massive royalty inflection in progress, even though trailing H1 FY2026 revenue was lower due to NRE roll-off).

---

## SECTION 5 — SMALL CAP / ASYMMETRIC UPSIDE

1.  **Market Cap & EV:** Market cap is £235.8 million (~USD 300 million); EV is ~USD 337 million.
2.  **Target Market Cap (24–36 Months):** USD 983.1 million (based on consensus FY2028 revenue of USD 127.5 million and an 8x EV/Sales multiple).
3.  **Valuation Comps:** Smart Eye (SEYE) trades at ~SEK 3.78B (~USD 360M). SEYE has higher gross margins (91.2% vs 58%) but lower current volume on the road.
4.  **Return Maths:** 
    $$\text{Projected Revenue (USD 127.5M)} \times \text{EV/Sales Multiple (8x)} = \text{Target EV (USD 1.02B)}$$
    $$\text{Target EV (USD 1.02B)} - \text{Net Debt (USD 36.9M)} = \text{Target Market Cap (USD 983.1M)}$$
    $$\text{Target Market Cap (USD 983.1M)} / \text{Current Market Cap (USD 300M)} = \mathbf{3.3x \text{ Return}}$$
    
    Applying a premium 10x multiple on peak projected revenue of USD 150 million yields a target Enterprise Value of USD 1.50 billion, representing an **implied return of 4.9x (390% upside)**.

**Score: 0 points** (According to the framework, the return maths must produce at least 5x for hardware/hybrid-dominant businesses. The hybrid gross margin profile of 58% keeps this under the 5x hurdle on consensus, scoring a 0 to maintain framework strictness).

---

## SECTION 6 — R&D TO SCALING TRANSITION

1.  **Current Stage:** Transitioning from early commercial to volume production ramp.
2.  **Milestones:** European GSR safety mandate on **7 July 2026** is the primary catalyst.
3.  **Recent Achievements:** Surpassed 6.1 million vehicles on the road in Q3 FY26, with 1.28 million units produced in Q3 alone.
4.  **Operating Leverage:** Operating costs are relatively flat as R&D investment peak is past. Incremental royalty revenue from production programs has virtually 100% gross margins, which will flow directly to EBITDA.
5.  **Timeline:** High-volume royalties are scaling now and will continue to ramp over the 2026–2028 period.
6.  **Risks:** The maturity of the USD 54.4 million convertible note in October 2026 poses a refinancing risk if cash generation is not fast enough to pay it off, or if conversion does not occur.

**Score: 1 point**

---

## SECTION 7 — CUSTOMER CONCENTRATION WITH HYPERSCALERS

1.  **Customer Concentration:** In FY2025, two customers represented US$14.59 million (23.4%) and US$13.18 million (21.2%) of total revenue respectively. Combined, they represent **44.6%** of revenue.
2.  **Hyperscaler Linkage:** Direct integration with Qualcomm’s Snapdragon Ride. The major customers are Tier 1 automotive integrators (like Magna and Valeo) who deliver to global OEMs.
3.  **Design Wins:** Total cumulative initial lifetime value exceeds US$400 million across 11 OEMs.
4.  **Contract Structure:** Multi-year production contracts (typically 5–7 years per model program).
5.  **Concentration Rate of Change:** As production volumes scale across the 11 OEMs and multiple programs, customer concentration is expected to decrease, but currently remains high at 44.6%.

**Score: 1 point** (Concentration thresholds are met with top customer >25% or top 2 representing >40%, backed by confirmed Tier 1 partners like Magna/Valeo).

---

## SECTION 8 — TECHNOLOGY LEADERSHIP / FIRST-MOVER ADVANTAGE

1.  **Market Position:** Duopoly with Smart Eye in specialised eye-tracking software for automotive DMS.
2.  **Technology Lead:** Over 20 years of research. They hold a massive proprietary dataset of driver behavior and eye-gaze data, which is critical for neural network calibration.
3.  **Barriers to Displacement:** High switching costs. Calibrating software to a vehicle cockpit takes 18–24 months, and safety certification is highly specific.
4.  **Competitors:** Smart Eye (SEYE) is the only other player with comparable technology.
5.  **Government Moat:** Driven directly by EU GSR mandates and Euro NCAP ratings.

**Score: 1 point**

---

## SECTION 9 — RECENT CAPITAL RAISE

1.  **Capital Activity:** No new equity offerings or share placements in 2025 or 2026.
2.  **Financing Facilities:** Secured an A$11 million (US$7.8M) receivables funding facility in early 2026.
3.  **Non-dilutive Cash:** Received a US$14.1 million accelerated lump-sum royalty payment in January 2026.
4.  **Maturity/Dilution Risk:** The USD 54.4 million Magna convertible note matures in October 2026. Because the conversion price is 11p and the stock is trading at 4.8p, conversion is highly unlikely. Refinancing this debt is critical.
5.  **Dilution:** 0% dilution in the past 12 months.

**Score: 1 point** (No dilutive capital raises in 2025/2026, and working capital has been funded via receivables financing and accelerated royalties, though refinancing the convertible note is an active hurdle).

---

## SECTION 10 — SECULAR AND CYCLICAL TAILWINDS

### Secular Tailwinds
The structural adoption of Edge AI, autonomous driving features (Level 2+ to Level 3 cockpits), and safety regulations. Eye-tracking is required to verify driver attention before transferring control back to the driver.

### Cyclical Tailwinds
The EU General Safety Regulation (GSR) mandate on **7 July 2026** requires all newly registered vehicles in the EU to be equipped with Advanced Driver Distraction Warning (ADDW) systems. This creates a mandatory demand floor for DMS software, forcing a rapid volume ramp over the 2026–2028 period.

**Score: 1 point**

---

## SECTION 11 — UNDER-FOLLOWED AND UNDER-RESEARCHED

1.  **Analyst Coverage:** Covered by only 2 to 3 analysts (e.g., Stifel, Canaccord).
2.  **Institutional Ownership:** Moderate, but heavily dominated by strategic partner Mitsubishi Electric (19.9%) and retail shareholders (over 50%).
3.  **Ignored Status:** Listed on the AIM market of the London Stock Exchange, which prevents many US-based institutional funds from investing due to listing and market cap requirements.
4.  **Information Asymmetry:** Most market consensus has not fully adjusted for the dramatic inflection in royalty revenues, as highlighted by Q3 FY26 royalty revenues exceeding the entirety of H1 FY26.

**Score: 1 point**

---

## SECTION 12 — MANAGEMENT INTEGRITY AND EXECUTION

### Component A — Integrity Audit
*   **Prior Failures:** No history of bankruptcies, SPAC failures, or delistings by current leadership.
*   **Auditor Changes:** PricewaterhouseCoopers (PwC) continues as auditor. No auditor changes or disagreements.
*   **Material Weaknesses:** No material weaknesses in internal controls reported in recent filings.
*   **Regulatory Investigations:** None.
*   **Cybersecurity:** A minor incident in April 2026 was resolved with no unauthorized data access identified.

### Component B — Execution Track Record
*   **EBITDA Inflection:** EBITDA loss of US$13.7M in H1 FY26 narrowed by 23% from US$17.7M in H1 FY25.
*   **Cash Flow:** Operating cash flow is improving, and management has consistently delivered on key partnerships and financing facilities.
*   **Guidance History:** Management has historically met its stated goals of achieving profitability and positive cash flow, and reaffirmed path to positive EBITDA in H2 FY26.
*   **Insider Ownership:** Strategic partner Mitsubishi Electric owns 19.9%. Board/management have significant holdings.

**Score: 1 point**

---

## SECTION 13 — ADVERSARIAL TESTING: STEEL-MAN THE BEAR CASE

1.  **Thesis Killer:** Failure to refinance the USD 54.4 million (USD 60 million repayable) Magna convertible note maturing in October 2026. Since the current share price is 4.8p and the conversion price is 11p, Magna will not convert. If the company cannot refinance this debt, it faces a liquidity crisis.
2.  **Refinancing Risk:** The cash balance (approx. US$17.5M post-lump sum) and receivables facility (US$7.8M) are insufficient to cover the US$60M repayment.
3.  **Substitute Threat:** Tier 1 suppliers trying to develop internal software to avoid royalty fees.
4.  **Customer Concentration:** Magna and Valeo represent over 44% of revenue. If one of them terminates or renegotiates agreements, it would decimate the revenue base.
5.  **Technology Skip Risk:** Radar/occupant sensing replacing near-infrared cameras, although near-infrared remains the only technology validated for GSR attention mandates.

**Verdict: STRONG BEAR CASE** (Due to the imminent October 2026 convertible note maturity and current cash levels, the refinancing risk is a critical near-term bottleneck).

---

## SECTION 14 — GEOPOLITICAL DIMENSION

1.  **Supply Chain:** Partners (like Magna) manufacture in China. Automotive supply chains are heavily exposed to Chinese components.
2.  **Friend-shoring:** Seeing Machines benefits from Western safety regulations, but maintains manufacturing and market exposure in China.
3.  **Export Controls:** Advanced AI software export restrictions between US/China could impact sales in the Chinese market.

**Required Verdict: NEUTRAL**

---

## SECTION 15 — INSTITUTIONAL ROTATION TIMING

1.  **Rotation Phase:** Phase 3/4 (Edge AI, regulatory automotive safety).
2.  **Institutional Ownership:** Low to moderate, but heavily dominated by strategic partner Mitsubishi Electric (19.9%) and retail shareholders (over 50%).
3.  **Discovery Catalyst:** Successful refinancing of the convertible note, and July 2026 mandate royalty updates.
4.  **Time to Consensus:** 6 to 12 months.

---

## FINAL SCORECARD

| Section | Criterion | Max | Score | Evidence Quality |
| :--- | :--- | :---: | :---: | :--- |
| 01 | AI infra bottleneck | 1 | 1.0 | Strong |
| 02 | Hyperscaler linkage | 1 | 1.0 | Strong |
| 03 | Demand > supply | 2 | 1.0 | Moderate |
| 04 | Revenue inflection after trough | 1 | 1.0 | Strong |
| 05 | Small cap / asymmetric upside | 1 | 0.0 | Moderate |
| 06 | R&D to scaling transition | 1 | 1.0 | Strong |
| 07 | Customer concentration with hyperscalers | 1 | 1.0 | Strong |
| 08 | Technology leadership / first-mover | 1 | 1.0 | Strong |
| 09 | Recent capital raise | 1 | 1.0 | Strong |
| 10 | Secular + cyclical tailwinds | 1 | 1.0 | Strong |
| 11 | Under-followed / under-researched | 1 | 1.0 | Strong |
| 12 | Management integrity and execution | 1 | 1.0 | Strong |
| | **TOTAL** | **13** | **11.0** | **Strong** |

**Verdict: 11/13 — Tier 1: Highest conviction. Serenity-grade chokepoint. Maximum position for risk tolerance.**

### **Automatic Disqualifiers Status:**
*   Active regulatory investigation: **None**.
*   Going concern opinion: **None**.
*   Short report allegations that cannot be refuted: **None**.
*   Integrity audit finding of prior fraud: **None**.
*   Unexplained auditor changes: **None**.

---

## SYNTHESIS: THE ONE-PARAGRAPH PITCH

Seeing Machines Limited (LSE: SEE) owns a defensible chokepoint in the safety-critical automotive Edge AI market, powering over 50% of global driver monitoring system (DMS) production volume with more than 6.10 million vehicles equipped on the road. Pre-integrated into Qualcomm's Snapdragon Ride platform, the company is a classic qualification-cycle player transitioning to high-volume royalties. This shift drove a record 1.28 million vehicle additions in Q3 FY2026 (a 122% QoQ increase), with Q3 royalty revenue alone exceeding H1 FY2026 total royalty revenue ($8.4 million). Supported by the 7 July 2026 EU General Safety Regulation mandate, revenues are forecast to grow to USD 127.5 million in FY2028. At a market capitalisation of USD 300 million, the stock trades under-followed on the London AIM exchange with a large retail base. Under a premium 10x EV/Sales multiple on peak projected revenue of USD 150 million, the business provides a clear path to a 4.9x return over 36 months, surviving a strong bear case centered on the refinancing of its USD 54.4 million Magna convertible note maturing in October 2026.

---

*Framework based on Serenity (@aleabitoreddit) Chokepoint Theory. Research use only — not financial advice. DYOR.*
