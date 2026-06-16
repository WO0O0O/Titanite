# Titanite

Titanite is a single-tenant, Bloomberg-terminal-style Next.js dashboard designed to track high-volatility tech stocks and macro risk signals. The application features a custom **Signal Builder** allowing the user to construct composable Boolean logic rules (Master Signals) from financial metrics (EMA crosses, VIX, TNX, Gold, etc.). When macro conditions are met, alert integrations are triggered.

The UI is built to replicate a **simplified Bloomberg terminal** with dense data tables, monospaced font rendering, a true-black dark theme, and neon green/amber/red indicator lights.

Integrated directly into the dashboard is the **Titanite Research** framework, a proprietary research pipeline tracking physical chokepoints of advanced AI scaling (energy, TGVs, lasers, metrology, advanced packaging, and launch capacity).

- Steps on how this works is in [workflow.md](Titanite-Research/docs/workflow.md)

---

## Core Features

1. **Macro Dashboard (`/dashboard`)**:
   - **Active Signals**: Real-time status grid of Master Signals (Green/Neutral/Alert).
   - **4 Macro Pillars**: Quick view of key macro triggers: TNX Yield, VIX Index, S&P 500 vs. 200-Day MA, and Warsh Sentiment.
   - **Trading 212 Holdings Table**: Dense, live-calculated holdings table displaying current share price, FX-converted values, conviction tiers, and conviction scoring from Titanite Research.
2. **Signal Builder (`/builder`)**:
   - Composes multi-condition Boolean logic rules using static thresholds or comparative EMA metrics.
3. **Intel Hub (`/intel`)**:
   - Aggregated news feed merging Finnhub and Google News RSS queries, auto-tagging mentioned tickers with macroeconomic signal badges.
   - **Fed Transition Watch** monitoring central bank policy shifts.
4. **Congress Tracker (`/congress`)**:
   - Standardised feed of US Senate and House stock disclosures, filterable by politician or ticker.

---

## Titanite Research: Mapping the Decade of the OOMs

The scaling laws of AGI are no longer confined to software. As model training and deployment scale by orders of magnitude (OOMs), the primary constraints have shifted from algorithmic design to the physical world: energy, TGVs, lasers, metrology, advanced packaging, and launch capacity.

Titanite Research tracks the critical nodes, materials, and equipment manufacturers that underpin this transition. Heavily inspired by the macro-industrial and national security outlook of Leopold Aschenbrenner's _Situational Awareness_ thesis, it focuses on mispriced companies that will capture the economics of this capex before the market prices them in.

### Research Pillars

1. **Compute & Semiconductor Scaling**: Hardware chokepoints in the advanced packaging, optical interconnect, and substrate layers (e.g. Glass Substrates, high-frequency Metrology, and micro-materials).
2. **Energy & Power Infrastructure**: The physical bottlenecks of the gigawatt-scale data centre. This encompasses power transmission, high-voltage transformers, grid connection hardware, and next-generation liquid cooling systems.
3. **Geopolitical Realignment & Sovereignty**: The decoupling of Western supply chains from Chinese manufacturing, the impact of export controls, and the national security mandates driving domestic capacity expansion.
4. **Orbital Infrastructure & Space Tech**: The physical and regulatory constraints of the emerging space economy - specifically launch capacity, spectrum allocations, and sovereign military constellations.

### The Human-Machine Loop

Titanite operates a hybrid intelligence pipeline combining agentic LLM extraction with rigorous manual stress-testing:

```
┌────────────────────────────┐
│ SEC Filings / Transcripts  │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Fine-Tuned Prompt Engines  │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Agentic Analysis Loops     │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Manual Audit               │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Conviction Score & Tier    │
└────────────────────────────┘
```

- **Phase 1: Agentic Sweeps**: Specialised agent modules parse SEC filings and earnings transcripts for capacity limits, backlogs, and inventory indicators.
  - **Small-Cap AI Chokepoints** (defined in [SC-AI-INFRA.md](Titanite-Research/notes/prompts/SC/SC-AI-INFRA.md))
  - **Trillion-Dollar Scale-Up Beneficiaries** (defined in [leopold.md](Titanite-Research/notes/prompts/leopold.md))
  - **Space-Infrastructure & Orbital Chokepoints** (defined in [SPACE-INFRA.md](Titanite-Research/notes/prompts/SPACE-INFRA.md))
- **Phase 2: Human Reconciliation**: In-depth forensic auditing, competitor validation, and validation of upside multiple math. Completed conviction sheets and research portfolios are tracked in [TITANITE-HOLDINGS.md](Titanite-Research/docs/TITANITE-HOLDINGS.md).

---

## Setup & Installation

### Web Dashboard (Next.js)

1. **Install Frontend Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:

   ```env
   T212_API_KEY=your_trading_212_api_key
   T212_API_SECRET=your_trading_212_api_secret
   FINNHUB_API_KEY=your_finnhub_api_key
   DISCORD_WEBHOOK_URL=your_discord_webhook_url
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the terminal dashboard.

### Titanite Python App (Research CLI)

1. **Setup Environment**:

   ```bash
   cd Titanite-Research/titanite-app
   # Using uv (recommended):
   uv sync
   # Or using standard pip:
   pip install -e ".[dev]"
   ```

2. **Run Pipeline Commands**:

   ```bash
   # Extract SEC data for a ticker under the SC framework:
   titanite extract --ticker MRLN --framework sc

   # Show current extraction buffers:
   titanite show --ticker MRLN

   # Export research findings to compile/update the web dashboard database:
   titanite export
   ```

---

_Disclaimer: Research use only. Not financial advice. Perform your own due diligence._
