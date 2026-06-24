# TITANITE RESEARCH FRAMEWORK CHANGELOG

## Version Control & Framework Evolution Log

This document tracks all modifications to the research frameworks to prevent scoring calibration drift and ensure consistency across historical analyses.

## [v2.0.8] - 24 June 2026

### POET TECHNOLOGIES INC. (POET) RESEARCH NOTES RESTRUCTURING & OSINT UPDATE
**Rationale:** Decoupled the consolidated POET research notes into a Turn 1 Extraction Buffer and Turn 2 Research Report following the modular two-turn pipeline guidelines of SC-AI-INFRA. Integrated new OSINT information from Lumilens CEO Ankur Singla's LinkedIn post confirming a CPO/NPO deployment with a Top-3 hyperscaler, using Sivers Semiconductors' CW DFB laser light sources.

- **Data Ingestion Buffer:** Created [POET-EXTRACTION-BUFFER.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/SMALLCAP-AI-INFRA/photonics/POET-EXTRACTION-BUFFER.md) populated with search execution logs, transcripts, and financial/working capital variables under the qualification-cycle player rules.
- **Scorer Implementation:** Created [POET-RESEARCH-REPORT.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/SMALLCAP-AI-INFRA/photonics/POET-RESEARCH-REPORT.md) following the analytical chokepoint scoring criteria (9/13 pre-penalty, 8.5/13 net total). Re-calibrated Section 2 (Hyperscaler Linkage) and Section 7 (Customer Concentration) with the Top-3 hyperscaler CPO link. Formulated Section 5 return multiple using the Cluster Scaling Return Matrix, resulting in a 4.25x return (failing the 5.0x hardware hurdle). Section 12 remains at 0 due to going concern and CFO confidentiality breach.
- **Legacy File Retirement:** Retired legacy consolidated research notes `POET-POET-Technologies.md`.

## [v2.0.7] - 19 June 2026

### AIRJOULE TECHNOLOGIES CORPORATION (AIRJ) RESEARCH REPORT RE-CALIBRATION
**Rationale:** Refined the research report to incorporate the closing of the $15.00 million registered direct offering on 1 June 2026 and updated stock price metrics to $4.92 (as of market close 18 June 2026). Corrected spelling tokens (centre, defence) in both extraction buffer and scoring report to enforce absolute compliance with British English framework standards.

- **Data Ingestion Buffer Update:** Corrected Americanised spellings (`data center` -> `data centre` and `defense` -> `defence` in search audit log) in [AIRJ-EXTRACTION-BUFFER.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/SMALLCAP-AI-INFRA/ENERGY/AIRJ-EXTRACTION-BUFFER.md).
- **Scorer Report Refinement:** Updated stock price to $4.92, Market Capitalisation to $356.21 million, and EV to $325.11 million in the Gate Check and Section 5 matrix of [AIRJ-RESEARCH-REPORT.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/SMALLCAP-AI-INFRA/ENERGY/AIRJ-RESEARCH-REPORT.md). Added closed transaction details for the June 1 offering in Section 9 and re-calibrated the asymmetric return multiple to 5.6x. Corrected target spellings to `centre`.

## [v2.0.6] - 19 June 2026

### AIRJOULE TECHNOLOGIES CORPORATION (AIRJ) INITIAL AUDIT AND SCORING
**Rationale:** AirJoule Technologies Corporation was identified as an energy and cooling infrastructure target in the small-cap watchlist. An initial research audit was executed under the modular two-turn pipeline rules of SC-AI-INFRA.

- **Data Ingestion Buffer:** Populated search execution log and compiled pre-revenue balance sheet parameters (cash of $31.1M, zero debt, $38,570 property and equipment net) in [AIRJ-EXTRACTION-BUFFER.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/SMALLCAP-AI-INFRA/ENERGY/AIRJ-EXTRACTION-BUFFER.md).
- **Scorer Implementation:** Completed [AIRJ-RESEARCH-REPORT.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/SMALLCAP-AI-INFRA/ENERGY/AIRJ-RESEARCH-REPORT.md) following the analytical chokepoint scoring criteria, assigning a final score of 12/13 (Tier 1 conviction candidate) with the Qualification-Cycle Modifier active.
- **Central Index and Watchlist Integration:** Registered AIRJ in [TABLE.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/docs/TABLE.md), added active UL/NSF certification catalyst (targeted Q4 2026) to [CATALYST-TRACKER.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/docs/CATALYST-TRACKER.md), mapped the ticker to the ENERGY directory in the CLI [config.py](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/titanite-app/src/titanite/config.py) industry map, and updated [TITANITE-HOLDINGS.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/docs/TITANITE-HOLDINGS.md) watchlist.

## [v2.0.5] - 18 June 2026

### AL2SI THESIS RE-AUDIT AND POST-MORTEM (THESIS FAILURE)
**Rationale:** Grizzly Research published a short report on June 18, 2026, revealing fabricated revenues and backlog via undisclosed related parties (NewYork GreenCloud / Joseph Church). The stock crashed 40.8% to €26.40, triggering the mandatory Post-Mortem Protocol under the SC-AI-INFRA v2.0.0 rules.

- **Ingestion Buffer Update:** Search audit trail updated; toggled `working_capital_divergence_detected` and `potential_channel_stuffing_signals` to true, set `ai_segment_pivot_modifier_applies` to false, and set `inventory_to_binding_backlog_ratio` to null (void).
- **Re-Scoring:** Re-scored all 15 sections of the research report, dropping the final score from 12/13 (Tier 1) to 1/13 (Thesis Failure).
- **Post-Mortem Protocol:** Documented failure triggers, section-by-section errors, and framework modifications (verifying counterparty incorporation dates and checking public utility/CEQA databases for >10MW facilities).
- **Framework Prompts Update:** Updated [SC-AI-INFRA.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/prompts/SC/SC-AI-INFRA.md), [SC-AI-EXTRACTOR.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/prompts/SC/SC-AI-EXTRACTOR.md), and [SC-AI-SCORER.md](file:///Users/danwooster/1.%20DEV/titanite-technologies/Titanite-Research/notes/prompts/SC/SC-AI-SCORER.md) to integrate the **Counterparty Inception Rule** (Sections 2, 7, 12, and automatic disqualifiers), the **Utility Queue Check** (Sections 6, 13, and automatic disqualifiers), and the **PUE Feasibility Limits** (Section 8).

## [v2.0.4] - 17 June 2026

### AL2SI RESEARCH REPORT CALIBRATION (SC-AI-INFRA v2.0.0 COMPLIANCE)
**Rationale:** Under the v2.0.0 framework, if a company's extraction buffer shows an inventory-to-binding backlog ratio near zero, the analysis must explicitly address this operational bottleneck in Sections 3, 4, and 6. AL2SI has a ratio of 0.03 ($23.0M inventory vs $761.2M binding backlog), which was not previously addressed.

- **Section 3 Update:** Added physical capacity expansion and customer facility qualification bottleneck context, noting that physical inventory cannot support the backlog.
- **Section 4 Update:** Added detailed dependency of forward revenue inflection on site qualification milestones.
- **Section 6 Update:** Anchored immediate valuation to facility qualifications rather than inventory accumulation.

## [v2.0.3] - 16 June 2026

### AMD PIE EXCLUSION — ROBUSTNESS & CORRECTNESS FIXES
**Rationale:** The initial pie filtering implementation (v2.0.2) could not identify the AMD pie due to a schema mismatch in the T212 API response, and was also vulnerable to cache poisoning that silently disabled filtering. Additionally, portfolio header totals were still including AMD contributions since they were sourced from account-wide cash endpoint values.

- **API Schema Fix:** Corrected the field mapping in `fetchAmdPieTickers` inside [trading212.service.ts](file:///Users/danwooster/1.%20DEV/signals/src/lib/services/trading212.service.ts). The `GET /equity/pies/{id}` detail response nests the pie name under `settings.name` (not top-level `name`) and constituent tickers under `instruments[].ticker` (not `accounts[].ticker`).
- **Cache Poisoning Fix:** Added a guard in `fetchAmdPieTickers` to prevent caching an empty ticker list when all pie detail calls fail (e.g. due to a 429). Previously, a failed detail fetch would overwrite a valid `['AMD']` cache entry with `[]`, silently disabling exclusion for the next 5 minutes. Now, the stale cache is preserved when no detail responses are available.
- **Portfolio Response Cache (60s TTL):** Added a server-side `portfolioCache` to [trading212.service.ts](file:///Users/danwooster/1.%20DEV/signals/src/lib/services/trading212.service.ts). After a successful portfolio fetch, subsequent calls within 60 seconds are served from cache — preventing cascading 429 errors from rapid page loads or dev-server restarts without impacting the client's 60-second polling cycle.
- **Summary Header Deduction:** Fixed the portfolio summary (Invested / Value / P&L) to subtract the AMD holdings' GBP contribution from the account-wide `cash.*` totals. Each excluded holding's `totalValue` and `pnlValue` (both already in GBP) are summed and deducted so the dashboard header reflects only the Titanite pie.

---

## [v2.0.2] - 16 June 2026

### PORTFOLIO PIE FILTERING (AMD EXCLUSION)
**Rationale:** Exclude assets that belong to the "AMD" investment pie from the dashboard holdings table to isolate high-conviction research targets.

- **Pie Constituents Resolution:** Added a parallel fetch to `GET /equity/pies` inside [trading212.service.ts](file:///Users/danwooster/1.%20DEV/signals/src/lib/services/trading212.service.ts), parsing the results to locate the "AMD" pie and map its constituent tickers.
- **Holdings Exclusion:** Updated the holdings collection logic to filter out any mapped positions that match tickers contained inside the excluded "AMD" pie (with safety try-catch wrappers to fall back gracefully if the endpoint is unavailable).

### PORTFOLIO MARKET CAP INTEGRATION & CLEANUP
**Rationale:** Integrate live market capitalization data from Yahoo Finance and clean up redundant table columns to improve dashboard layout and density.

- **Market Cap Field Addition:** Updated the `Holding` interface in `src/types/holdings.ts` and mock data in `src/lib/mock/holdings.mock.ts` to support the optional `marketCap` field.
- **Parallel Quote Fetching:** Updated [trading212.service.ts](file:///Users/danwooster/1.%20DEV/signals/src/lib/services/trading212.service.ts) to resolve Yahoo Finance ticker mappings and retrieve company quotes in parallel.
- **Redundant Column Removal:** Removed the redundant `COMPANY` name column from [HoldingsTable.tsx](file:///Users/danwooster/1.%20DEV/signals/src/components/dashboard/HoldingsTable.tsx) as the ticker provides sufficient identification.
- **Market Cap Column Display:** Introduced a new `MKT CAP $` column to [HoldingsTable.tsx](file:///Users/danwooster/1.%20DEV/signals/src/components/dashboard/HoldingsTable.tsx) using compact notation (e.g., `$925.1M`, `$3.56B`, `$1.58T`).

### PORTFOLIO CURRENCY FORMAT CALIBRATION
**Rationale:** Align the portfolio dashboard to show individual asset price metrics and market capitalization in USD ($) while retaining total position value and P&L in GBP (£) for a UK-based investor.

- **Price Mapping Fix:** Corrected return mapping in `mapPosition` in [trading212.service.ts](file:///Users/danwooster/1.%20DEV/signals/src/lib/services/trading212.service.ts) to output converted USD prices (`averagePrice`, `currentPrice`) rather than raw values.
- **LSE Market Cap Conversion Bug:** Fixed a division-by-100 error where London Stock Exchange market caps denominated in pence (`GBp`/`GBX`) were incorrectly converted. The conversion logic now correctly maps them to `GBP` beforehand, yielding the correct market cap scale (e.g. ~$925.1M for IQE instead of ~$9.7M).
- **Holdings Table Formatter:** Updated `fmt.price` in [HoldingsTable.tsx](file:///Users/danwooster/1.%20DEV/signals/src/components/dashboard/HoldingsTable.tsx) to prepend `$` instead of `£` for the average price and last price columns.

### PORTFOLIO DASHBOARD TICKER RESOLUTION
**Rationale:** Fix the mismatch between Trading 212 exchange-specific tickers (e.g. `2DGd`, `AL2SIp`, `IQEl`, `LPKd`) and the research database canonical tickers.

- **Trading 212 Normalisation:** Added an automatic stripping rule in [trading212.service.ts](file:///Users/danwooster/1.%20DEV/signals/src/lib/services/trading212.service.ts) to slice off single trailing lowercase exchange characters (like Gettex `d`, Euronext `p`, and LSE `l`) from the base ticker before display mapping.
- **Research Database Export:** Compiled database updates via `titanite export` to regenerate `companies.json` with correct British English spelling ("programme").

## [v2.0.1] - 16 June 2026

### OUST COMPANY RE-AUDIT & RE-CALIBRATION
**Rationale:** Execute the mandatory re-audit of Ouster, Inc. (OUST) under the v2.0.0 framework rules, incorporating Q1 2026 disclosures and physical cluster-scaling TAM models.

- **Data Ingestion Buffer:** Populated manual Step B audit verification trail and updated working capital metrics in [OUST-EXTRACTION-BUFFER.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/SMALLCAP-AI-INFRA/robotics/OUST-EXTRACTION-BUFFER.md).
- **Scorer Implementation:** Generated [OUST-RESEARCH-REPORT.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/SMALLCAP-AI-INFRA/robotics/OUST-RESEARCH-REPORT.md) following the `SC-AI-SCORER.md` analytical scoring standard.
- **Legacy File Retirement:** Marked the older version `OUST-Ouster.md` for deletion.

### BUG FIXES & ROUTING ROBUSTNESS

**Rationale:** Address routing 404 bugs for Situational Awareness (Leopold) companies on the web dashboard, and align the workflow instructions for multi-framework support.

- **Next.js API Route Resolver:** Updated [route.ts](file:///Users/danwooster/1.%20DEV/signals/src/app/api/research/report/route.ts) to search across `SPACE/`, `SMALLCAP-AI-INFRA/`, and `SITUATIONAL-AWARENESS/` directories, making routing resilient to framework-specific file structures and extensions (`.md`, `-Analysis.md`, `-RESEARCH-REPORT.md`).
- **Research Workflow Documentation:** Updated [workflow.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/workflow.md) to document prompt templates, target folders, and CLI extraction constraints for the three active frameworks (`sc`, `leopold`, and `space`).

---

## [v2.0.0] - 14 June 2026

### MAJOR FRAMEWORK OVERHAUL — Vulnerability Remediation

**Rationale:** Strategic assessment identified critical framework drift, ambiguous scoring rules, and underweighted geopolitical risk. This version implements systematic corrections to improve reliability and prevent calibration decay.

---

### 1. SPACE-INFRA.md — Section 6 Tightening

**Changed:**
- **OLD:** "Score 1 point only if the hardware has proven spaceflight heritage (operational in orbit or successful mission landing) that successfully delivered payloads and met key customer milestones, with any anomalies systematically addressed or mitigated in subsequent iterations"
- **NEW:** "Score 1 point only if the hardware has proven spaceflight heritage (operational in orbit or successful mission landing) that successfully delivered payloads and met key customer milestones, with zero mission-critical anomalies in the most recent deployment, OR if prior anomalies were systematically addressed with documentary evidence of successful follow-on missions using the corrected design"

**Impact:** Prevents premature scoring of companies with unresolved technical failures. Requires explicit proof of remediation.

**Companies Requiring Re-Audit:** LUNR (Odysseus tipped landing - needs follow-on mission success before full Section 6 credit)

---

### 2. leopold.md — Section 7 Scoring Clarification

**Changed:**
- **OLD:** Three-tier scoring (1 / 0.5 / 0) with ambiguous "round up to 1 if total ≥10" rule
- **NEW:** Explicit scoring logic with no rounding:
  - **1.0 points:** Current government revenue + active certifications + passes Sovereign Supply Chain Decoupling Test
  - **0.5 points:** Path to government positioning (meets all 5 sub-criteria) + passes Sovereign Supply Chain Decoupling Test
  - **0.0 points:** No government revenue, active disqualifiers, or fails Sovereign Supply Chain Decoupling Test
  
**NEW RULE:** Companies scoring 0.5 in Section 7 remain at 0.5 in final scorecard—no rounding. This prevents path-dependent inflation.

**Impact:** Eliminates scoring ambiguity. A company is either government-positioned (1.0), on a credible path (0.5), or not positioned (0.0).

**Companies Requiring Re-Audit:** Any company previously scored at 0.5 that was rounded to 1.0 in final tier classification.

---

### 3. SC-AI-INFRA.md — Qualification-Cycle Modifier Definition

**Added:** Explicit definition of the Qualification-Cycle modifier (previously referenced but undefined).

**NEW SECTION:**

```markdown
### Qualification-Cycle Modifier

A **Qualification-Cycle Player** is a company whose revenue inflection is gated not by manufacturing capacity or backlog conversion, but by customer qualification timelines and design-in cycles that extend 12-36 months.

**Activation Criteria (ALL must be true):**
1. Company has secured design wins or is in active qualification with Tier 1 customers (hyperscalers, defence primes, OEMs)
2. Customer qualification cycle exceeds 12 months due to technical validation requirements (not commercial negotiation delays)
3. Trailing revenue is <$50M annually OR AI-segment revenue is <20% of total revenue
4. Company has documentary evidence of qualification milestone completion (e.g., customer-validated test reports, publicly disclosed design-in announcements)

**Exemptions When Active:**
- **Section 3:** Gross margin pressure from underutilised facilities is exempt during qualification phase
- **Section 4:** Revenue inflection scoring focuses on qualification pipeline progression rather than quarterly revenue beats
- **Section 12 (Working Capital):** Inventory-to-backlog ratios are exempt if inventory represents qualification samples or pilot production runs

**Disqualifiers (modifier cannot apply if ANY are true):**
- Company has been "in qualification" with the same customer for >36 months with no disclosed progression
- Management has guided commercialisation timelines 3+ times without delivery
- No independent validation of qualification progress (customer statements, industry sources, technical publications)
```

**Impact:** Prevents abuse of "qualification" narrative by companies perpetually promising revenue that never materialises. Provides clear activation/deactivation logic.

---

### 4. leopold.md — Section 12 Working Capital Rules Tightening

**Changed:**
- **OLD:** "DSO expanding by >15% sequentially" (ambiguous timeframe)
- **NEW:** "DSO expanding by >15% on a quarter-over-quarter basis for 2 consecutive quarters, OR Y/Y DSO expansion >25%"

**Changed:**
- **OLD:** "Contract assets comprise >30% of total receivables"
- **NEW:** "Contract assets comprise >30% of total receivables (receivables + contract assets), AND the company is post-revenue with >$50M in trailing twelve-month revenue. Pre-revenue companies in qualification cycles are exempt from this threshold."

**NEW MANDATORY SECTION:** Working Capital Override Log

Every report must now include:

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

**Impact:** Forces systematic documentation of working capital judgment calls. Prevents silent overrides that lead to missed channel-stuffing or aggressive revenue recognition.

**Companies Requiring Re-Audit:** ASPI (override was applied correctly but needs formal documentation in this format)

---

### 5. leopold.md — NEW Section 15: Geopolitical Risk Penalty

**Added:** Mandatory geopolitical risk section with scorecard penalties.

**NEW SECTION 15:**

```markdown
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
```

**Impact:** Systematically penalizes China tail risk. Prevents over-allocation to companies with severe geopolitical exposure regardless of fundamental strength.

**Companies Requiring Re-Audit:** 
- AXTI (Beijing facilities - likely -1 penalty, remains Tier 2)
- Any company with Taiwan manufacturing needs exposure assessment (Taiwan ≠ China for this rule, but semiconductor supply chain concentration creates related risk)

---

### 6. POST-MORTEM PROTOCOL — Added to All Three Frameworks

**Added to SPACE-INFRA.md, leopold.md, and SC-AI-INFRA.md:**

```markdown
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
| ... | ... | ... | ... |

**Root Cause Classification:**
- [ ] Framework structural flaw (scoring criteria too loose)
- [ ] Data availability gap (critical information not accessible during initial research)
- [ ] Management integrity failure (fraud/misrepresentation not detectable via public filings)
- [ ] Exogenous shock (macro event, regulatory change, geopolitical disruption)
- [ ] Execution failure (thesis was correct but company failed to execute)

**Proposed Framework Modification:**
[If framework structural flaw identified, specify exact wording change needed. Reference section and criterion.]

**CHANGELOG Update Required:**
All post-mortems resulting in framework modifications must be logged in CHANGELOG.md with:
- Date of modification
- Company ticker that triggered the lesson
- Before/after wording of changed criterion
- List of other companies requiring re-audit under new rule

**Historical Re-Scoring:**
If framework modification is implemented, re-score all current Tier 1/Tier 2 holdings under the new rules within 60 days.
```

**Impact:** Creates systematic learning feedback loop. Prevents repeat analytical errors. Documents why theses fail for pattern recognition.

---

### 7. PORTFOLIO-CONSTRUCTION.md — NEW Meta-Framework

**Created:** New portfolio-level risk management overlay.

**File:** `/docs/PORTFOLIO-CONSTRUCTION.md` (see separate file)

**Key Rules:**
- Maximum 20% in any single name
- Maximum 40% in any single subsector (photonics, energy, etc.)
- Maximum 30% in any single geographic jurisdiction (Taiwan, UK, US, etc.)
- Minimum 8 positions in active portfolio
- Mandatory rebalancing triggers when limits breached

**Impact:** Prevents concentration risk from compounding beyond acceptable levels. Particularly critical for photonics subsector (currently ~45% via SIVE, IQE, AAOI, SILC).

---

### 8. CATALYST-TRACKER.md — NEW Tracking System

**Created:** Catalyst prediction accuracy monitoring.

**File:** `/docs/CATALYST-TRACKER.md` (see separate file)

**Purpose:** Quantify accuracy of time-sensitive thesis catalysts across portfolio. Identifies systematic over-optimism or under-conservatism in catalyst timing predictions.

**Metrics Tracked:**
- Expected vs. actual catalyst date
- Delta in days (positive = early, negative = late)
- Impact on thesis if catalyst missed
- Rolling 12-month catalyst hit rate

---

## RECALIBRATION REQUIREMENTS

**Companies Requiring Full Re-Audit Under v2.0.0 Rules:**

### SPACE Framework:
- LUNR (Section 6 spaceflight heritage re-assessment)

### Leopold Framework:
- All companies previously scored 0.5 in Section 7 and rounded to 1.0 (identify and re-classify)
- AXTI (Section 15 geopolitical penalty, likely -1 point)
- Any company with >30% China exposure (Section 15 penalty assignment)

### Small-Cap Framework:
- ASPI (add Working Capital Override Log documentation)
- Any company benefiting from unstated Qualification-Cycle modifier (formalize activation)
- **BRUN** (re-audited, split into extraction buffer and analytical scorer, and added to the catalyst tracker on 14 June 2026)

**Deadline for Re-Audit:** 30 July 2026

---

## FRAMEWORK VERSION HISTORY

- **v1.0.0** (April 2024): Initial framework development
- **v1.5.x** (2024-2025): Iterative refinements (no formal tracking)
- **v2.0.0** (14 June 2026): First formalized version control with systematic vulnerability remediation

---

_All future framework modifications must be logged in this CHANGELOG with date, rationale, impact assessment, and list of companies requiring re-audit._
