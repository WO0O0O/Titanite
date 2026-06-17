# Titanite Research Pipeline Workflow

Follow these steps to research a company and publish the report to the live web dashboard.

---

## Step 0: Pre-requisites (Mapping Setup)

If the company is new, map the ticker to its industry folder (e.g., `"NRGV": "ENERGY"`) in:

1. Python Backend: [config.py](file:///Users/danwooster/1.%20DEV/signals/research/titanite-app/src/titanite/config.py)
2. Next.js API Route: [route.ts](file:///Users/danwooster/1.%20DEV/signals/src/app/api/research/report/route.ts)

---

## Step 1: Data Ingestion & Extraction (Turn 1)

### For Small-Cap AI Infra (SC):

Run the automated extractor in the Python environment:

```bash
cd Titanite-Research/titanite-app
source .venv/bin/activate
titanite extract --ticker [TICKER]
```

- **Target File:**

  > _Prompt:_
  > Read @SC-AI-INFRA and [extraction buffer]. Complete the research for the company in 2 phases - complete the buffer first and then write the research report.

---

## Step 2: Valuation & Scoring (Turn 2)

Depending on the research framework of the target company, execute the following scoring and file generation guidelines:

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
./Titanite-Research/titanite-app/.venv/bin/titanite export

.venv/bin/titanite export
```

audit portfolio concentration limits:

- TODO: to add later

```bash
./Titanite-Research/titanite-app/.venv/bin/titanite portfolio audit

./.venv/bin/titanite portfolio audit

```

This compiles the master markdown indices into JSON structures inside Next.js's `public/research-data/`, automatically updating the web dashboard in real-time.
