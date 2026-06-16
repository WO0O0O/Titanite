# Titanite Research Pipeline Workflow

Follow these steps to research a company and publish the report to the live web dashboard.

---

## Step 0: Pre-requisites (Mapping Setup)
If the company is new, map the ticker to its industry folder (e.g., `"NRGV": "ENERGY"`) in:
1. Python Backend: [config.py](file:///Users/danwooster/1.%20DEV/signals/research/titanite-app/src/titanite/config.py)
2. Next.js API Route: [route.ts](file:///Users/danwooster/1.%20DEV/signals/src/app/api/research/report/route.ts)

---

## Step 1: Data Ingestion & Extraction (Turn 1)

> [!NOTE]
> The automated Python extractor `titanite extract` only supports the Small-Cap (`sc`) framework. For `leopold` (Situational Awareness) and `space` (Space-Infrastructure) frameworks, you must compile the data extraction buffer manually using the respective templates in [leopold.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/leopold.md) and [SPACE-INFRA.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/SPACE-INFRA.md).

### For Small-Cap AI Infra (SC):
Run the automated extractor in the Python environment:
```bash
cd research/titanite-app
source .venv/bin/activate
titanite extract --ticker [TICKER]
```
*   **Target File:** `research/notes/SMALLCAP-AI-INFRA/[SECTOR]/[TICKER]-EXTRACTION-BUFFER.md`
*   **Action (Automated via AI):** Copy and paste the following prompt to the AI to complete Turn 1:
    > *Prompt:* "Read [SC-AI-INFRA.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/SC/SC-AI-INFRA.md) and the raw buffer [TICKER]-EXTRACTION-BUFFER.md. Run the required web searches in Step B (short seller campaigns, Substacks, innovation checks, and leadership history) to complete the Search Execution Log table. Retrieve backlog numbers from recent earnings transcripts and populate the `stated_backlog_firm_binding_usd` list, verify the operational flags in the JSON block, and overwrite [TICKER]-EXTRACTION-BUFFER.md with the completed content. Do not write a research report yet."

---

## Step 2: Valuation & Scoring (Turn 2)

Depending on the research framework of the target company, execute the following scoring and file generation guidelines:

### A. Small-Cap AI Infra (SC)
* **Scoring Rules:** [SC-AI-SCORER.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/SC/SC-AI-SCORER.md)
* **Prompt:** *"Read [SC-AI-INFRA.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/SC/SC-AI-INFRA.md) and the completed buffer [TICKER]-EXTRACTION-BUFFER.md. Perform the Turn 2 Deep Analytical Valuation & Scoring for [TICKER] and write the final research report to [TICKER]-RESEARCH-REPORT.md."*
* **Target Path:** `research/notes/SMALLCAP-AI-INFRA/[SECTOR]/[TICKER]-RESEARCH-REPORT.md` (or `[TICKER].md`)
* **Action:** Save the AI-generated report directly to this file (using British English spelling, zero emojis, and the raw scorecard).

### B. Situational Awareness (Leopold)
* **Scoring Rules:** [leopold.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/leopold.md)
* **Prompt:** *"Read leopold.md. Perform the Deep Analytical Valuation & Scoring for [TICKER] and write the final research report."*
* **Target Path:** `research/notes/SITUATIONAL-AWARENESS/[SECTOR]/[TICKER].md` (or `[TICKER]-RESEARCH-REPORT.md`)
* **Action:** Write the finished report (incorporating the 15 sections and OOM cluster scaling math) directly to this path.

### C. Space-Infrastructure (Space)
* **Scoring Rules:** [SPACE-INFRA.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/prompts/SPACE-INFRA.md)
* **Prompt:** *"Read SPACE-INFRA.md. Perform the orbital buildout and manifest analysis for [TICKER] and write the final research report."*
* **Target Path:** `research/notes/SPACE/[TICKER].md`
* **Action:** Save the completed orbital buildout scorecard directly to this path.

---

## Step 3: Update Master Indexes
Record the completed research in the documentation files:
1. **Master Index:** Add a row for the company in [TABLE.md](file:///Users/danwooster/1.%20DEV/signals/research/docs/TABLE.md) (sorted by conviction Tier and Score).
2. **Catalysts:** Add any active milestone triggers to [CATALYST-TRACKER.md](file:///Users/danwooster/1.%20DEV/signals/research/docs/CATALYST-TRACKER.md).
3. **Holdings:** Add position details to [TITANITE-HOLDINGS.md](file:///Users/danwooster/1.%20DEV/signals/research/docs/TITANITE-HOLDINGS.md) (if holding a position).

---

## Step 4: Export to Live Site
Generate the frontend database payloads by running:
```bash
titanite export
```
This compiles the master markdown indices into JSON structures inside Next.js's `public/research-data/`, automatically updating the web dashboard in real-time.
