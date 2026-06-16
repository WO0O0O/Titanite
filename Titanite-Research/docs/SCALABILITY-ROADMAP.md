# TITANITE RESEARCH SCALABILITY ROADMAP

## Executive Summary

This document outlines the strategic plan for scaling Titanite's research operation from individual contributor analysis to a systematic, scalable intelligence engine capable of covering 100+ companies annually whilst maintaining analytical rigour.

**Current State:** Manual research execution using Leopold and SC-AI-SCORER frameworks
**Target State:** Semi-automated research pipeline with quality gates and systematic coverage expansion
**Timeline:** 18-month phased rollout

---

## PHASE 1: FOUNDATION HARDENING (Months 1-3)

**Objective:** Standardise current manual processes and establish quality baselines

### 1.1 Template Standardisation
- [x] Implement CHANGELOG.md for framework version control
- [x] Create PORTFOLIO-CONSTRUCTION.md for position sizing rules
- [x] Deploy CATALYST-TRACKER.md for event monitoring
- [x] Harden Leopold.md with Working Capital Override Log
- [x] Harden SC-AI-SCORER.md with Geopolitical Risk Penalty

### 1.2 Research Quality Baseline
- [ ] Execute 10 reference analyses (5 Leopold, 5 SC-AI-SCORER) under new hardened frameworks
- [ ] Document time-per-section benchmarks for each framework
- [ ] Identify sections with highest research friction
- [ ] Create "golden examples" library for each Tier classification

### 1.3 Data Source Inventory
- [ ] Audit all data sources currently used (SEC EDGAR, earnings transcripts, investor presentations)
- [ ] Document access methods (manual download, web scraping, API)
- [ ] Calculate cost-per-company for premium data sources
- [ ] Identify gaps in data coverage (foreign filings, supply chain intelligence)

**Success Metrics:**
- 10 completed reference analyses with <20% framework modification rate
- Documented baseline: X hours per Leopold analysis, Y hours per SC-AI-SCORER analysis
- Complete data source inventory with access costs

---

## PHASE 2: EXTRACTION AUTOMATION (Months 4-6)

**Objective:** Automate the Raw Data Extraction Buffer creation to reduce research time by 40%

### 2.1 Financial Data Pipeline
**Tool:** Python scripts + SEC EDGAR API + OpenBB Terminal

**Implementation:**
1. Build automated 10-Q/10-K parser
   - Extract quarterly revenue, AR, contract assets, inventory, backlog
   - Calculate DSO, receivables growth, contract assets ratio
   - Output JSON buffer in standardised schema
2. Integrate earnings transcript scraping
   - Keyword sweep automation (Pass 1: scale signals, Pass 2: red flags)
   - Speaker attribution and quarter tagging
   - Verbatim quote extraction with context
3. Short report aggregator
   - Monitor Twitter/X for short report announcements
   - Scrape Seeking Alpha, Hindenburg, Muddy Waters, Grizzly Research
   - Flag new short reports for manual review

**Deliverables:**
- `titanite-extractor` CLI tool: `python extractor.py --ticker AAOI --framework SC`
- JSON output conforming to existing buffer schemas
- 50% reduction in data gathering time (target: Leopold 8hrs → 4hrs, SC-AI-SCORER 6hrs → 3hrs)

### 2.2 Competitive Intelligence Automation
**Tool:** Web scraping + competitor tracking database

**Implementation:**
1. Automated competitor identification
   - Parse industry segment disclosures from filings
   - Cross-reference SIC codes and NAICS classifications
   - Build competitive landscape matrix per layer (Layer P, F, N, C, O, S, G)
2. Market share estimation engine
   - Aggregate disclosed revenues by layer category
   - Calculate [TICKER]'s % of total layer TAM
   - Flag market share gains/losses quarter-over-quarter

**Deliverables:**
- Automated competitive landscape tables
- Market share tracking for chokepoint validation

### 2.3 Geopolitical Risk Mapping
**Tool:** Supply chain database + customs data integration

**Implementation:**
1. Country-of-origin mapper
   - Parse 10-K "Item 2: Properties" for manufacturing locations
   - Cross-reference customs import data (ImportGenius, Panjiva)
   - Flag China exposure automatically
2. Critical input tracker
   - Database of materials subject to export controls (gallium, germanium, rare earths)
   - Flag companies using China-sourced critical inputs
   - Assign automatic geopolitical risk penalty (-2, -1, -0.5, 0)

**Deliverables:**
- Automated Geopolitical Exposure Map
- Supply chain vulnerability scores

**Phase 2 Success Metrics:**
- Data extraction time reduced by 40%
- 90% automation rate for Raw Data Extraction Buffer creation
- Zero manual JSON formatting errors

---

## PHASE 3: ANALYTICAL AUGMENTATION (Months 7-10)

**Objective:** Deploy AI-assisted analytical tools whilst maintaining human oversight for scoring decisions

### 3.1 LLM-Assisted Section Pre-Drafting
**Tool:** Claude/GPT-4 with custom prompts per framework section

**Implementation:**
1. Section-by-section prompt engineering
   - Create specialised prompts for each Leopold/SC-AI-SCORER section
   - Input: JSON buffer + framework section rules
   - Output: Pre-drafted analysis with evidence citations
2. Human review gates
   - Analyst reviews AI-drafted section
   - Corrects errors, adds proprietary intelligence
   - Final score assigned by human, not AI
3. Quality feedback loop
   - Track which sections require most human correction
   - Iteratively improve prompts based on correction patterns

**Constraints:**
- AI never assigns final scores (human-only)
- AI cannot override automatic disqualifiers
- AI output flagged as "Pre-draft – requires verification"

### 3.2 Consensus Model Asymmetry Calculator
**Tool:** Automated cluster-scaling math engine

**Implementation:**
1. Build deterministic calculator for Section 5 (Leopold) and Section 5 (SC-AI-SCORER)
   - Input: Current market cap, layer classification, market share estimate
   - Compute: Implied revenue at 2026/2028/2030 cluster scales
   - Output: Consensus gap multiple, bull-case market cap, implied return
2. Integrate with sell-side consensus data
   - Pull analyst estimates from Bloomberg/FactSet (if available) or manual input
   - Calculate gap automatically
   - Flag when consensus gap exceeds 2.0× threshold

**Deliverables:**
- Web-based calculator UI for cluster-scaling math
- Automated consensus gap reports

### 3.3 Working Capital Divergence Alerting System
**Tool:** Automated monitor flag engine

**Implementation:**
1. Real-time DSO tracking
   - Parse quarterly filings automatically
   - Calculate DSO trend (Q/Q and Y/Y)
   - Trigger alert when DSO expansion >15% Q/Q for 2 consecutive quarters
2. Contract assets ratio monitor
   - Flag when contract assets >30% of total receivables
   - Differentiate pre-revenue vs. post-revenue companies
   - Apply exemptions for Qualification-Cycle players automatically
3. Dashboard for active monitor flags
   - Central view of all holdings with active Working Capital Divergence flags
   - Quarterly review checklist generation

**Deliverables:**
- Automated Working Capital Monitor dashboard
- Email/Slack alerts for divergence triggers

**Phase 3 Success Metrics:**
- 30% reduction in total analysis time via LLM pre-drafting
- Zero arithmetic errors in cluster-scaling math
- 100% detection rate for Working Capital Divergence triggers

---

## PHASE 4: COVERAGE EXPANSION (Months 11-14)

**Objective:** Scale from 20-30 companies per year to 80-100 companies per year

### 4.1 Universe Screening Engine
**Tool:** Quantitative pre-filter for framework candidates

**Implementation:**
1. Build initial screening criteria
   - Market cap <$5B (for SC-AI-SCORER)
   - Market cap <$150B (for Leopold)
   - AI infrastructure revenue exposure >10%
   - Layer classification (P, F, N, C, O, S, G)
2. Automated daily screening
   - Run against Russell 2000, S&P 400, FTSE Small Cap, DAX, Euronext
   - Flag new IPOs, SPACs, spin-offs in target layers
   - Generate weekly "New Candidates" report
3. Prioritisation scoring
   - Chokepoint probability score (monopoly/duopoly indicators)
   - Analyst coverage count (prefer <15 analysts)
   - Recent institutional ownership changes
   - Output: ranked candidate list for deep-dive research

**Deliverables:**
- Automated weekly candidate screening
- Prioritised research queue

### 4.2 International Coverage Expansion
**Tool:** Multi-jurisdiction filing parser

**Implementation:**
1. European small-cap coverage
   - Parse filings from First North, Spotlight Stock Market, AIM, Euronext Growth
   - Adapt SC-AI-SCORER for European accounting standards (IFRS)
   - Create language translation pipeline for German/French/Swedish filings
2. Asian supply chain coverage
   - Integrate Japanese securities filings (EDINET)
   - Parse Korean DART filings for semiconductor supply chain
   - Taiwan Stock Exchange coverage for advanced packaging ecosystem

**Deliverables:**
- 20 European small-cap analyses per year
- 10 Asian supply chain analyses per year

### 4.3 Team Scaling Blueprint
**Personnel:** Expand from solo research to 3-person research team

**Roles:**
1. **Lead Analyst (existing):** Framework development, Tier 1 thesis origination, final scoring authority
2. **Associate Analyst (new hire):** Data extraction, section pre-drafting, competitive intelligence
3. **Research Engineer (new hire):** Automation pipeline maintenance, data pipeline development, tool integration

**Onboarding Process:**
- 2-week framework immersion (read Leopold/SC-AI-SCORER, golden examples library)
- Shadow 5 complete analyses (Lead Analyst execution)
- Execute 3 supervised analyses with section-by-section review
- Independent execution with final review by Lead Analyst

**Phase 4 Success Metrics:**
- 80-100 companies analysed annually (up from 20-30 current baseline)
- <5% error rate in delegated section analyses
- 30-day onboarding cycle for new analysts

---

## PHASE 5: SYSTEMATIC INTELLIGENCE (Months 15-18)

**Objective:** Transform from company-by-company research to systematic supply chain intelligence engine

### 5.1 Layer-Level TAM Tracking
**Tool:** Aggregate market intelligence dashboard

**Implementation:**
1. Build TAM database by layer
   - Layer P (Power): Total MW committed, utilisation rates, queue times
   - Layer N (Networking): Total transceiver shipments, ASP trends, bandwidth requirements
   - Layer C (Compute): GPU shipments, HBM attach rates, advanced packaging capacity
2. Real-time TAM growth tracking
   - Monitor hyperscaler capex announcements
   - Parse data centre construction permits
   - Track power contract signings
3. Chokepoint validation engine
   - Cross-reference [TICKER]'s revenue against layer TAM growth
   - Flag when company is gaining/losing share
   - Validate "% of global flow" claims in Section 0

**Deliverables:**
- Live TAM dashboard for all 7 layers
- Automated chokepoint validation reports

### 5.2 Catalyst Calendar Automation
**Tool:** Event scraping + CATALYST-TRACKER.md integration

**Implementation:**
1. Automated event ingestion
   - Parse earnings dates from company IR pages
   - Monitor SEC filings for 8-K "Material Definitive Agreement" disclosures
   - Track government contract award announcements (DoD, DARPA)
2. Catalyst impact scoring
   - Classify catalyst type (earnings beat, design-win, power contract, M&A)
   - Estimate magnitude (>20% revenue impact vs. <5%)
   - Prioritise high-impact near-term catalysts
3. Portfolio-wide catalyst view
   - 30/60/90-day catalyst calendar
   - Automated reminders 7 days before key events
   - Post-catalyst debrief template (did thesis play out?)

**Deliverables:**
- Automated CATALYST-TRACKER.md population
- Real-time catalyst alert system

### 5.3 Post-Mortem Learning Loop
**Tool:** Systematic thesis failure analysis

**Implementation:**
1. Automated thesis failure detection
   - Monitor portfolio positions daily
   - Trigger Post-Mortem Protocol when stock declines >50%
   - Flag when company hits automatic disqualifier post-scoring
2. Framework modification tracking
   - Parse Post-Mortem reports for proposed framework changes
   - Batch framework modifications quarterly (avoid framework drift)
   - Require CHANGELOG.md update for every modification
3. Re-audit automation
   - When framework criterion changes, flag all Tier 1/Tier 2 holdings for re-score
   - Generate re-audit reports automatically
   - Track tier migrations (Tier 1 → Tier 2 or vice versa)

**Deliverables:**
- Automated thesis failure detection
- Quarterly framework review process
- Historical re-scoring engine

### 5.4 Proprietary Intelligence Layer
**Tool:** Private supply chain network + industry contact CRM

**Implementation:**
1. Build contact database
   - Catalogue industry contacts by layer (foundry engineers, photonics researchers, data centre operators)
   - Track conversation history and intelligence shared
   - Tag contacts by information quality tier
2. Intelligence ingestion workflow
   - Structured templates for contact intelligence notes
   - Tag which framework sections intelligence informs
   - Cross-reference proprietary intelligence against public filings
3. Asymmetry scoring
   - Quantify information asymmetry: public data only vs. public + proprietary
   - Flag companies where proprietary intelligence materially changes thesis
   - Prioritise building contacts in high-asymmetry layers

**Deliverables:**
- Contact CRM with 50+ active industry contacts
- Proprietary intelligence notes integrated into reports

**Phase 5 Success Metrics:**
- Real-time TAM tracking for all 7 layers
- 90-day forward catalyst visibility for all Tier 1/2 holdings
- <7-day lag from thesis failure to Post-Mortem completion
- 20% of analyses materially informed by proprietary intelligence

---

## INFRASTRUCTURE REQUIREMENTS

### Technology Stack
**Data Pipeline:**
- Python 3.11+ for automation scripts
- PostgreSQL for research database
- Redis for caching (earnings transcripts, filings)
- Dagster for pipeline orchestration

**Front-End Tools:**
- Jupyter notebooks for exploratory analysis
- Streamlit for internal dashboards (TAM tracking, catalyst calendar)
- Obsidian or Notion for collaborative note-taking

**AI/LLM Integration:**
- Claude API for section pre-drafting
- OpenAI GPT-4 for transcript summarisation
- LangChain for prompt management

**Data Sources:**
- SEC EDGAR (free)
- Earnings call transcripts: Motley Fool, Seeking Alpha (free tier + manual)
- Analyst estimates: Bloomberg/FactSet (premium) or manual aggregation
- Supply chain data: ImportGenius, Panjiva (premium, optional)
- Short reports: Twitter/X monitoring, Seeking Alpha (free)

### Budget Estimates (Annual)
**Phase 2 (Automation):**
- Development time: 200 hours @ $100/hr = $20,000
- Data sources (premium): $5,000/year
- **Total Phase 2: $25,000**

**Phase 3 (AI Augmentation):**
- LLM API costs: $2,000/year (estimated 100 analyses @ $20 each)
- Tool development: 100 hours @ $100/hr = $10,000
- **Total Phase 3: $12,000**

**Phase 4 (Team Scaling):**
- Associate Analyst: $80,000/year salary + benefits
- Research Engineer: $100,000/year salary + benefits
- **Total Phase 4: $180,000/year**

**Phase 5 (Intelligence Layer):**
- CRM tool: $1,200/year (HubSpot or similar)
- Conference attendance: $10,000/year (photonics, semiconductors, data centre summits)
- Expert network access: $15,000/year (GLG, AlphaSights)
- **Total Phase 5: $26,200/year**

**Cumulative 18-Month Budget: $268,200** (includes 6 months of team salaries)

---

## RISK MITIGATION

### Risk 1: Over-Automation Reducing Analytical Rigour
**Mitigation:**
- Maintain human-only scoring authority
- Require manual verification of all AI-generated outputs
- Quarterly manual re-audit of 10% of automated analyses

### Risk 2: Framework Drift Through Rapid Iteration
**Mitigation:**
- Quarterly (not monthly) framework modification batches
- Require Post-Mortem trigger for any framework change
- CHANGELOG.md mandatory for every modification

### Risk 3: Team Scaling Dilutes Quality
**Mitigation:**
- Lead Analyst reviews 100% of Associate outputs for first 6 months
- Graduated delegation: data extraction → section pre-drafting → full analysis
- Maintain golden examples library as quality baseline

### Risk 4: Data Pipeline Failures Create Blind Spots
**Mitigation:**
- Manual verification of automated extraction for first 50 companies
- Alerting system for pipeline failures (Slack/email)
- Quarterly data quality audits

### Risk 5: Proprietary Intelligence Becomes Stale
**Mitigation:**
- Require contact engagement at least quarterly
- Tag intelligence with "last verified" date
- Re-verify any intelligence >6 months old before using in analysis

---

## SUCCESS METRICS DASHBOARD

**Quarterly KPIs:**

| Metric | Current Baseline | Phase 2 Target | Phase 4 Target | Phase 5 Target |
|---|---|---|---|---|
| Companies analysed/year | 20-30 | 40-50 | 80-100 | 100-120 |
| Hours per Leopold analysis | 16-20 hrs | 10-12 hrs | 8-10 hrs | 6-8 hrs |
| Hours per SC-AI-SCORER analysis | 12-16 hrs | 8-10 hrs | 6-8 hrs | 5-6 hrs |
| Framework modification rate | 15-20% | <10% | <5% | <5% |
| Working Capital Divergence detection rate | Manual/sporadic | 80% | 95% | 100% |
| Chokepoint validation accuracy | Qualitative | 70% | 85% | 95% |
| Proprietary intelligence % | 0% | 5% | 10% | 20% |
| Thesis failure Post-Mortem lag | N/A | 30 days | 14 days | 7 days |

---

## PHASE GATE REVIEWS

Each phase requires a formal review before proceeding to next phase:

**Phase Gate Criteria:**
1. All deliverables completed and documented
2. Success metrics achieved (minimum 80% of targets)
3. Budget variance <20%
4. No critical quality issues detected in spot-check audits
5. Lessons learned document published

**Phase Gate Authority:** Lead Analyst + external advisor (if applicable)

**Hold Decision:** If phase gate criteria not met, pause next phase and remediate current phase gaps before proceeding.

---

## APPENDIX: GOLDEN EXAMPLES LIBRARY STRUCTURE

Create reference library with best-in-class examples of each tier classification:

**Leopold Framework:**
- Tier 1 Example: [TICKER] – Score 12/13, full analysis demonstrating consensus gap, execution moat, government positioning
- Tier 2 Example: [TICKER] – Score 9/13, demonstrating partial chokepoint status
- Tier 3 Example: [TICKER] – Score 6/13, watchlist-only with identified missing criteria
- Disqualified Example: [TICKER] – Failed integrity audit, documented red flags

**SC-AI-SCORER Framework:**
- Tier 1 Example: [TICKER] – Score 12/13, full chokepoint validation with hyperscaler linkage
- Tier 2 Example: [TICKER] – Score 9/13, partial chokepoint with qualification-cycle modifier
- Tier 3 Example: [TICKER] – Score 6/13, interesting but incomplete thesis
- Commodity Supplier Example: [TICKER] – Failed Strait of Hormuz test, analysis stopped

These golden examples serve as training materials for new analysts and quality baselines for AI-assisted outputs.

---

**Document Version:** 1.0  
**Last Updated:** [Date]  
**Owner:** Lead Analyst  
**Review Frequency:** Quarterly  
**Next Review:** [Date + 90 days]
