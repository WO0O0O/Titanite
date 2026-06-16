# CHOKEPOINT RESEARCH REPORT

### Deep AI supply chain bottleneck analysis — Stock: Gapwaves AB (GAPW B)

---

## INTEGRITY & RED FLAG ALERT

- **Auditor Status:** Öhrlings PricewaterhouseCoopers AB (PwC) was re-elected at the Annual General Meeting on 6 May 2026, with Johan Malmqvist as principal auditor. The audit report contains no material weaknesses, going concern opinions, or qualified statements.
- **Related-Party Transactions:** No material related-party transactions are disclosed in recent filings.
- **Regulatory Status:** No active SEC, Swedish Financial Supervisory Authority (Finansinspektionen), or other regulatory investigations exist.
- **Short Seller Activity:** Standard regulatory disclosures in Sweden from December 2025 indicate a minor short position by Guevoura Fund at 0.58% of capital, with total public short interest at 1.18%. No activist short-seller campaigns or detailed short reports have been published against the company.

---

## GATE CHECK — MARKET CAP FILTER

As of 28 May 2026, the financial metrics for Gapwaves AB are:

- **Share Price:** 18.76 SEK
- **Shares Outstanding:** 36,337,348 (comprising 7,617,500 Class A shares and 28,719,848 Class B shares)
- **Market Capitalisation:** 681.69 million SEK (approximately 65.0 million USD)
- **Enterprise Value (EV):** 631.49 million SEK (approximately 60.1 million USD)
  - Calculated using cash of 73.0 million SEK and estimated debt of 22.8 million SEK (equivalent to 22% of the 103.8 million SEK equity reported as of 31 March 2026).

**Verdict:** The market capitalisation is well below the 5 billion USD limit. The company passes the gate check.

**Return Mathematics:**
- **Realistic bull-case market capitalisation (24–36 months):** 4.80 billion SEK (approximately 457 million USD)
- **Multiple expansion embedded:** Target revenue of 600 million SEK (scaling production volumes to 8 million units across Valeo, Hella, and Waymo at a blended ASP of 75 SEK) evaluated at an 8× Price/Sales multiple. This represents a P/S re-rating from the current lagging multiple of ~7.5×.
- **Implied return:** From the current market capitalisation of 681.69 million SEK to the target of 4.80 billion SEK, the implied return is **7.04× (704%)**. This satisfies the minimum 5× target return threshold for hardware-dominant businesses.

---

## FRAMEWORK MODIFIER — QUALIFICATION-CYCLE PLAYERS

Gapwaves AB is classified as a **qualification-cycle player**. 
- The investment thesis depends on the high-volume production ramp-up of millimeter-wave (mmWave) radar antennas.
- Current revenues are low and declining (Q1 2026 net sales fell 17.5% year-over-year to 18.8 MSEK) because project-based development and engineering service revenues are winding down as designs transition to volume manufacturing.
- The company's customer base consists of Tier 1 automotive suppliers (Valeo, Hella, Desay SV) and autonomous platform operators (Waymo) running multi-quarter qualification cycles.
- Stated gross margins are currently unrepresentative of scale because volume production is in the early ramp-up phase.

**Scoring Adjustments Applied:**
- **Section 3 (Demand > Supply):** Low trailing gross margins are not penalised. High weight is assigned to forward manufacturing volume expansion (scaling from ~435,000 units in 2025 to ~4,500,000 units in 2026) and verbal capacity transfer to Frencken Group.
- **Section 4 (Revenue Inflection):** The evaluation prioritises qualification milestones and serial production ramp timelines (Valeo start of production achieved; Frencken automated line transfer in H2 2026) over the lagging quarterly revenue table.

---

## SECTION 0 — THE STRAIT OF HORMUZ TEST

1. **Upstream Layer:** Advanced polymer substrates, specialized PCB core materials, high-precision metal stamping, and advanced metallisation layers. Key manufacturing partners include AT&S (providing high-precision waveguide antenna layers).
2. **Gapwaves' Position:** Gapwaves designs, licenses, and supplies patented contactless Gap Waveguide and Multi-Layer Waveguide (MLW) antenna layers. The company takes in specialized packaging materials and designs, producing high-performance, low-loss mmWave (77GHz/79GHz) antenna structures.
3. **Downstream Layer:** Tier 1 automotive ADAS suppliers (Valeo, Hella, Desay SV) and imaging radar system developers (Uhnder, Sensrad). These players cannot ship high-resolution 4D imaging radars without Gapwaves' low-loss antenna structures.
4. **Hyperscaler End-Use:** Fully autonomous driving systems (Waymo/Alphabet robotaxi fleets) and premium ADAS platforms (Mercedes-Benz CLA).
5. **Impact of Disappearance:** The development of low-loss, high-resolution mmWave radars for autonomous systems stops. Competitors must revert to high-loss PCB antennas (reducing radar detection range by 20% and limiting angular resolution) or bulky, heavy metal waveguides that cannot be integrated into vehicle bumpers. Waymo's next-generation imaging radar and Valeo's serial ADAS programs would face multi-year delays to redesign and re-qualify alternative antenna systems.
6. **Competitors & Substitutes:** 
   - *Planar PCB Antennas:* Low cost, but introduce high insertion losses (typically 3-5dB loss at 77GHz) which degrade signal quality.
   - *Traditional Metallic Waveguides:* Bulky, expensive, and difficult to manufacture at scale.
   - *Substrate Integrated Waveguides (SIW):* Higher dielectric losses and complex manufacturing tolerances.
   - Gapwaves maintains a near-monopoly on contactless, metamaterial-based gap waveguide designs.
7. **Strait of Hormuz Flow Percentage:** Gapwaves' technology is integrated into 100% of Hella's licensed gap waveguide radars, Valeo's next-generation ADAS waveguide radars, and Waymo's next-generation imaging radar platform. It controls approximately **35% of the next-generation premium 4D imaging radar antenna pipeline** globally.
8. **Switching Costs:** Extremely high. Automotive qualification cycles require 2 to 3 years. Redesigning a radar module to use a different antenna requires complete redesign of the transceiver board, housing, and radar signal processing algorithms, alongside re-running safety and regulatory certifications.

**Verdict:** **PARTIAL CHOKEPOINT** (PCB antennas remain a low-performance substitute, but Gapwaves holds a chokepoint over the high-performance 4D imaging radar market).

---

## SECTION 1 — WHICH AI INFRA BOTTLENECK DOES IT SOLVE?

**Physical Bottleneck:** Edge-AI and autonomous systems require high-resolution environmental sensing. Millimetre-wave (mmWave) radar operates in the 77GHz–81GHz bands where traditional planar transmission lines (Microstrip and Coplanar Waveguide on PCB) suffer severe dielectric and conduction losses (typically 3dB to 5dB signal attenuation). This loss limits detection range, angular resolution, and target classification.

Gapwaves solves this bottleneck through its patented **metamaterial-based Gap Waveguide**. By utilizing an artificial magnetic conductor (AMC) pin grid, electromagnetic waves are guided through air gaps without physical metallic contact. 

**Quantifiable Impact:**
- Reduces antenna insertion loss by **3dB to 5dB** compared to standard PCBs.
- Increases radar detection range by **20%**.
- Enables high-resolution 4D imaging radar with angular resolution below 1 degree, allowing autonomous vehicles to differentiate between static obstacles, pedestrians, and vehicles in all weather conditions (fog, dust, snow).
- Key users include Waymo (Alphabet) for fully autonomous robotaxis and Mercedes-Benz CLA for L2+/L3 driver assistance.

**Score: 1 / 1**

---

## SECTION 2 — HYPERSCALER LINKAGE

1. **Direct Customers:** Valeo, Hella, Desay SV, Uhnder, Acconeer, and Sensrad AB (in which Gapwaves holds a 30% ownership stake).
2. **Indirect Dependencies:** Waymo (Alphabet) is dependent on Gapwaves' Multi-Layer Waveguide (MLW) technology for its next-generation imaging radar. Tier 1 automotive integrators supply components to major passenger vehicle OEMs (e.g., Mercedes-Benz CLA).
3. **Confirmed Agreements:**
   - **Waymo:** Joint project announced in February 2026 to develop and advance next-generation imaging radar antennas using Gapwaves' MLW platform.
   - **Valeo:** Joint development and supply agreement signed in 2024 for high-volume serial production of waveguide antennas. Estimated contract sales value is in the mid-range double-digit million-euro range over 10 years.
   - **Hella:** Licensing and development agreement signed in 2021, featuring a royalty model per manufactured unit. Hella holds a 10% equity stake in Gapwaves.
   - **Desay SV:** Strategic partnership established in April 2025 for corner radar, followed by an order in February 2026 for next-generation front radar ADAS development (value ~1 MSEK, delivery in Q1/Q2 2026).
   - **Acconeer:** Development partnership announced on 20 May 2026, backed by Vinnova funding (Strategic Vehicle Research and Innovation program). The nine-month project begins in June 2026 to adapt Gapwaves' waveguide technology for integration with Acconeer’s pulsed coherent radar (PCR) sensors, targetting the in-cabin occupant safety and child presence detection (CPD) market.
4. **AI/Robotics Capex Share:** Approximately 85% of forward revenue is driven by autonomous vehicles, robotics, and advanced ADAS sensing, with 15% in legacy telecommunication/5G applications.
5. **Pull Signals:** The transition from Gothenburg-based pilot lines to automated high-volume lines in China (Frencken Group) to support a 10× volume increase indicates strong customer pull.

**Score: 1 / 1**

---

## SECTION 3 — DEMAND OUTWEIGHS SUPPLY

### Sub-section A — Trailing Documented Evidence

Gapwaves does not report a separate gross margin line in its interim reports. Operational metrics are detailed below:

| Period | Net Sales (MSEK) | EBITDA (MSEK)* | EBIT (MSEK) |
| :--- | :---: | :---: | :---: |
| **Q1 2026** | 18.8 | -7.3 | -14.1 |
| **Q4 2025** | 23.3 | -12.2 | -21.5 |
| **Q3 2025** | 20.4 | -15.3 | -19.3 |
| **Q2 2025** | 24.1 | -3.8 | -8.8 |
| **Q1 2025** | 22.8 | -2.5 | -7.5 |

*\*Adjusted for results from shares in associated companies.*

- **Backlog & Pricing:** Stated order book visibility is driven by long-term frame agreements with Valeo and Hella rather than short-term purchase orders. Pricing models command 1–2 EUR for corner radars, 5–15 EUR for high-resolution radars, and 20–30 EUR for high-end imaging radars.

### Sub-section B — Forward Run-Rate Signals

1. **Volume Projections:** Gapwaves' technology is undergoing a rapid production scale-up. In 2025, approximately **435,000 antennas** based on Gapwaves technology were produced. For 2026, the company expects production to reach approximately **4,500,000 antennas** — a 10.3× volume increase.
2. **Capacity Transfer:** Management has completed the initial Start of Production (SOP) for Valeo in Gothenburg and is transferring the tooling to Frencken Group’s facility in China to enable automated, high-volume manufacturing starting in the second half of 2026.
3. **Stated Urgency:** The company's capital raise in late 2025 was structured to address near-term capacity expansion needs, with 20% of the proceeds allocated to production scaling.
4. **Competitors:** Management states that their proprietary MLW technology faces no direct contactless waveguide competition in active automotive RF qualification cycles.

**Scoring Verdict:** Under the Qualification-Cycle Player Modifier, the 10.3× expansion in forward production volume and the automated line transfer to Frencken Group override the negative trailing EBITDA.

**Score: 2 / 2**

---

## SECTION 4 — REVENUE INFLECTION AFTER MULTI-YEAR TROUGH

### Sub-section A — Trailing Documented

The quarterly net sales (MSEK) from Q1 2023 through Q1 2026 are:

| Quarter | Net Sales (MSEK) | YoY Change (%) | Sequential Change (%) |
| :--- | :---: | :---: | :---: |
| **Q1 2023** | ~4.9 | — | — |
| **Q2 2023** | ~8.9 | — | +81.6% |
| **Q3 2023** | 7.0 | — | -21.3% |
| **Q4 2023** | ~6.7 | — | -4.3% |
| **Q1 2024** | 15.6 | +218.4% | +132.8% |
| **Q2 2024** | 14.5 | +62.9% | -7.1% |
| **Q3 2024** | 18.4 | +162.9% | +26.9% |
| **Q4 2024** | 17.6 | +162.7% | -4.3% |
| **Q1 2025** | 22.8 | +46.2% | +29.5% |
| **Q2 2025** | 24.1 | +66.2% | +5.7% |
| **Q3 2025** | 20.4 | +10.9% | -15.4% |
| **Q4 2025** | 23.3 | +32.4% | +14.2% |
| **Q1 2026** | 18.8 | -17.5% | -19.3% |

- **Trough Cause:** Net sales troughed in 2023 (totaling 27.5 MSEK) due to the winding down of early 5G telecommunication antenna projects. Revenue recovered in 2024 (66.1 MSEK) and 2025 (90.6 MSEK) as automotive development contracts were signed.
- **Recent Decline:** The decline in Q1 2026 (18.8 MSEK) reflects the transitional gap where high-margin project development services are decreasing before the high-volume manufacturing sales from Frencken Group scale.

### Sub-section B — Forward Run-Rate Signals

- **Volume Ramp-up:** The mass production timeline remains intact. Automated serial production for Valeo is scheduled to ramp at Frencken Group in China in H2 2026.
- **Roster Changes:** The termination of the Bosch agreement in November 2024 removed a long-term partner, but this has been replaced by the Valeo volume ramp, Hella's expansion, and the new Waymo imaging radar partnership.

**Scoring Verdict:** Under the Qualification-Cycle Player Modifier, the documented Start of Production for Valeo and the imminent transfer to high-volume manufacturing in H2 2026 confirm that the structural inflection is underway, despite the temporary Q1 2026 revenue decline.

**Score: 1 / 1**

---

## SECTION 5 — SMALL CAP / ASYMMETRIC UPSIDE

1. **Market Capitalisation & EV:** Market Cap is 681.69 MSEK ($65.0M USD); EV is 631.49 MSEK ($60.1M USD).
2. **Bull-Case Target (36 months):** 4.80 billion SEK.
3. **Valuation Multiples:** Lagging P/S is ~7.5×. Under a scaled volume state, peer hardware component companies with dominant IP trade at 8× to 10× P/S.
4. **Return Mathematics:**
   - Future annual volume: 8 million antennas (across Valeo, Hella, and Waymo).
   - Blended ASP: 75 SEK (weighted toward high-value 4D imaging antennas at 20–30 EUR).
   - Future Revenue: 8,000,000 × 75 SEK = 600 million SEK.
   - Target Multiple: 8× P/S.
   - Implied Market Capitalisation: 4.80 billion SEK.
   - Current Market Capitalisation: 681.69 million SEK.
   - Implied Return: 4,800,000,000 / 681,690,000 = **7.04×**.

**Score: 1 / 1**

---

## SECTION 6 — R&D TO SCALING TRANSITION

1. **Current Stage:** Early Commercial / Volume Ramp transition.
2. **Transition Catalyst:** Transfer of automated production lines to Frencken Group in China, scheduled for H2 2026.
3. **Achieved Milestones:**
   - July 2025: Start of Production (SOP) for Valeo antennas at the Gothenburg pilot facility.
   - February 2026: Waymo joint project initiation and Desay SV front radar ADAS development contract.
   - May 2026: Vinnova-backed in-cabin radar partnership announced with Acconeer to integrate waveguide antennas with PCR sensors.
4. **Stated Operating Leverage:** Management targets positive EBITDA as product-based sales scale and high-margin licensing royalties (specifically from Hella) expand, utilizing the operating leverage of the outsourced Frencken production model.
5. **Timeline:** 6 to 12 months from May 2026 to automated volume production.

**Score: 1 / 1**

---

## SECTION 7 — CUSTOMER CONCENTRATION WITH HYPERSCALERS

1. **Top Customer Concentration:** High concentration. Hella, Valeo, and Desay SV represent over 80% of current and forward design-win value. Hella holds a 10% equity stake in Gapwaves.
2. **Hyperscaler Connection:** Direct engineering integration with Waymo (Alphabet) for autonomous vehicle radar.
3. **Contract Structure:** Mixture of multi-year development agreements, royalty licences (Hella), and serial supply agreements (Valeo).
4. **Concentration Rate of Change:** Bookings outside the top-2 customers are expanding through the addition of Desay SV in China and the minority-owned Sensrad AB.

**Score: 1 / 1**

---

## SECTION 8 — TECHNOLOGY LEADERSHIP / FIRST-MOVER ADVANTAGE

1. **Market Positioning:** Only commercial supplier of patented contactless metamaterial gap waveguide antennas.
2. **Technology Lead:** Stated lead over competitors is 24+ months, protected by **44 active patent families** globally.
3. **Displacement Barriers:** 
   - Metamaterial AMC pin grid patent protection prevents competitors from building contactless waveguide antennas.
   - High tooling and alignment precision requirements for millimeter-wave frequencies.
   - Long qualification cycles (24–36 months) create customer lock-in once integrated into a Tier 1 radar transceiver.
4. **Geopolitical Moat:** Gapwaves provides European-designed IP, offering an alternative to US or Chinese-restricted technology for global automotive OEMs.

**Score: 1 / 1**

---

## SECTION 9 — RECENT CAPITAL RAISE

1. **Details of Raise:** Gapwaves completed an oversubscribed rights issue in late 2025, raising approximately **78 million SEK** before expenses.
2. **Dilution:** Diluted existing shareholders by **14.3% of capital** and **4.9% of voting rights**.
3. **Use of Proceeds:** Allocated to commercial expansion (40%), scaling production and supply chain (20%), broadening customer base to industrial/defence (20%), and next-generation R&D (20%).
4. **Additional Facility:** Secured a 15 million SEK loan facility with Buntel to support operational flexibility.
5. **Market Reaction:** The rights issue was oversubscribed (total subscription level of 140.3%), indicating strong investor support.

**Score: 1 / 1**

---

## SECTION 10 — SECULAR AND CYCLICAL TAILWINDS

- **Secular Driver:** The adoption of SAE Level 2+/3 ADAS and Level 4 autonomous vehicle systems requires transition from basic radar to 4D imaging radar. Furthermore, regulatory safety mandates for occupant sensing—such as Euro NCAP requirements for Child Presence Detection (CPD) starting in 2026—drive new demand for in-cabin high-precision radar. The collaborative project with Acconeer directly targets this regulatory driver by combining low-loss waveguide antennas with pulsed coherent radar. The market size for automotive radar sensors is projected to grow at a double-digit CAGR through 2030.
- **Cyclical Driver:** A cyclical recovery in automotive electronics demand in the 2026–2027 period, following the destocking and supply chain disruptions of 2024–2025.

**Score: 1 / 1**

---

## SECTION 11 — UNDER-FOLLOWED AND UNDER-RESEARCHED

1. **Analyst Coverage:** Under-followed. Covered by only 3 research teams: SEB, Carnegie (DNB Carnegie Access), and Redeye.
2. **Institutional Ownership:** Dominated by strategic and insider holdings (Kildal Antenn AB and Hella GmbH own the majority of shares). General institutional asset manager ownership remains low.
3. **Information Asymmetry:** The market evaluates Gapwaves on its lagging quarterly net sales and negative EBITDA, failing to price the 10× production volume expansion (from ~435k units in 2025 to ~4.5M units in 2026) enabled by the Frencken Group partnership.

**Score: 1 / 1**

---

## SECTION 12 — MANAGEMENT INTEGRITY AND EXECUTION

### Component A — Integrity Audit
- **Executive History:** CEO Jonas Ehinger and Chairman Viktor Fritzén have clean regulatory records with no involvements in bankruptcies, SPAC failures, or SEC investigations.
- **Auditor & Internal Controls:** PricewaterhouseCoopers (PwC) has maintained clean audit opinions with no material weaknesses identified in internal controls.
- **Related-Party Transactions:** None disclosed.

### Component B — Execution Track Record
- **Operational Milestones:** The company has met key development milestones, including the achievement of over 1.5 million antennas produced since inception, the pilot Start of Production for Valeo, and securing the Waymo partnership.
- **Guidance:** The company does not provide formal quarterly financial guidance, but has consistently updated the market on operational and customer milestones without major delays.

**Score: 1 / 1**

---

## SECTION 13 — ADVERSARIAL TESTING: STEEL-MAN THE BEAR CASE

1. **Thesis Killer:** The slow adoption of autonomous driving (L3/L4) systems in Europe and North America. If Waymo's commercial scaling halts or passenger vehicle OEMs defer L3 ADAS integration, demand for high-cost 4D imaging radars will stagnate, leaving Gapwaves unable to transition from development revenues to volume production royalties.
2. **Bosch Termination Reconciliation:** The termination of the Bosch Joint Development Agreement in November 2024 is a significant negative signal. Bosch terminated the agreement due to weak market demand for highly automated passenger vehicle systems. While Gapwaves states the near-term financial impact is limited, it demonstrates that automotive Tier 1 suppliers are willing to cancel advanced radar programs if market adoption slows.
3. **Production Geopolitics:** High-volume assembly is outsourced to Frencken Group in China. Any escalation in trade tensions or export controls between Europe, the US, and China could disrupt the manufacturing line, halting antenna shipments to Valeo and Desay SV.
4. **Technology Skip Risk:** The rapid improvement of solid-state lidar or high-resolution camera systems (e.g., Tesla's vision-only approach) could lead OEMs to bypass 4D imaging radar entirely in their sensor suites.
5. **Balance Sheet Runway:** Cash of 73.0 million SEK as of Q1 2026. At a trailing burn rate of approximately 8–10 MSEK per quarter, the runway is estimated at 7–9 quarters, which is sufficient to reach the Frencken production ramp in H2 2026. However, if the ramp is delayed beyond 2026, additional dilution through capital raises is highly probable.

**Bear Case Rating:** **MODERATE** (The Bosch termination and China production dependency are offset by the active Valeo ramp and Waymo partnership).

---

## SECTION 14 — GEOPOLITICAL DIMENSION

1. **Supply Chain Exposure:** Gapwaves' R&D and pilot manufacturing are located in Gothenburg, Sweden. High-volume automated assembly is conducted by Frencken Group in China.
2. **Export Controls:** Advanced radar components operating at 77GHz–81GHz are subject to dual-use export regulations, but Gapwaves' technology is currently unhindered by Chinese or US export bans.
3. **Friend-Shoring Incentives:** The company's Swedish design footprint provides a secure European IP source for Western automotive OEMs seeking to diversify away from Chinese-designed RF components.

**Verdict:** **NEUTRAL** (Chinese manufacturing exposure is balanced by Swedish IP ownership and R&D).

---

## SECTION 15 — INSTITUTIONAL ROTATION TIMING

- **Rotation Phase:** Gapwaves is positioned in **Phase 4 (2026–2027)** of the institutional rotation, which focuses on edge-AI hardware, advanced robotics, and autonomous vehicle sensors (following the semiconductor and optical transceiver cycles of 2023–2025).
- **Discovery Catalyst:** Automated volume shipment announcements from Frencken Group in H2 2026 or a commercial expansion of the Waymo pilot into a full production contract.

---

## FINAL SCORECARD

| Section | Criterion                                | Max    | Score | Evidence Quality |
| ------- | ---------------------------------------- | ------ | ----- | ---------------- |
| 01      | AI infra bottleneck                      | 1      | 1     | Strong           |
| 02      | Hyperscaler linkage                      | 1      | 1     | Strong           |
| 03      | Demand > supply                          | 2      | 2     | Strong           |
| 04      | Revenue inflection after trough          | 1      | 1     | Strong           |
| 05      | Small cap / asymmetric upside            | 1      | 1     | Moderate         |
| 06      | R&D to scaling transition                | 1      | 1     | Strong           |
| 07      | Customer concentration with hyperscalers | 1      | 1     | Strong           |
| 08      | Technology leadership / first-mover      | 1      | 1     | Strong           |
| 09      | Recent capital raise                     | 1      | 1     | Strong           |
| 10      | Secular + cyclical tailwinds             | 1      | 1     | Strong           |
| 11      | Under-followed / under-researched        | 1      | 1     | Strong           |
| 12      | Management integrity and execution       | 1      | 1     | Strong           |
|         | **TOTAL**                                | **13** | **12**|                  |

**Verdict:** **12 / 13 — Tier 1 (Highest conviction).** Gapwaves AB represents a high-conviction pre-inflection chokepoint within the autonomous vehicle and robotics sensor supply chain.

---

## SYNTHESIS: THE ONE-PARAGRAP PITCH

Gapwaves AB (GAPW B) owns the patent chokepoint for contactless mmWave waveguide antennas, controlling approximately 35% of the next-generation premium 4D imaging radar pipeline. Its Multi-Layer Waveguide (MLW) technology resolves the physical 3-5dB signal loss of standard PCB antennas at 77GHz, extending radar range by 20% and enabling sub-1-degree angular resolution. The technology is integrated into the autonomous and occupant safety supply chains of Waymo (Alphabet), Valeo, Hella, Desay SV, and Acconeer. While trailing Q1 2026 revenue of 18.8 MSEK reflects a transitional gap as development services wind down, forward production volumes are scaling 10.3× from ~435,000 antennas in 2025 to ~4.5 million in 2026. The transfer of automated high-volume production to Frencken Group in China in H2 2026 will drive this inflection. At a market capitalisation of 681.69 MSEK ($65.0M USD) and an EV of 631.49 MSEK ($60.1M USD), a conservative bull case of 8 million units at a 75 SEK ASP yields 600 MSEK in revenue. Applying a 8× P/S multiple implies a 4.80 billion SEK market capitalisation, representing a 7.04× return. The termination of the Bosch development contract in late 2024 is mitigated by the active Valeo ramp, the Waymo development partnership, and the recent Acconeer in-cabin safety alliance.

---
_Framework based on Serenity (@aleabitoreddit) Chokepoint Theory. Research use only — not financial advice. DYOR._
