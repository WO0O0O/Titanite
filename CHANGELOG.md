# TITANITE RESEARCH FRAMEWORK CHANGELOG

## Version Control & Framework Evolution Log

This document tracks all modifications to the research frameworks to prevent scoring calibration drift and ensure consistency across historical analyses.

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
