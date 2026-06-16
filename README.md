# TITANITE

Automated AI Infrastructure Research Pipeline & Portfolio Web Dashboard.

## The Thesis: Mapping the Decade of the OOMs

The scaling laws of AGI are no longer confined to software. As model training and deployment scale by orders of magnitude (OOMs), the primary constraints have shifted from algorithmic design to the physical world: energy, TGVs, lasers, metrology, advanced packaging and more

Titanite is my personal research project to identify, analyse, and track the critical nodes, materials, and equipment manufacturers that underpin this transition. Heavily inspired by the macro-industrial and national security outlook of Leopold Aschenbrenner's _Situational Awareness_ thesis, I focus on the mispriced companies that will capture the economics of this capex before the market prices them in.

This is a solo project. I am not a financial advisor and this is not investment advice.

---

## Repository Architecture

This repository is split into three core layers:

```
├── research/
│   ├── docs/          # Research frameworks, checklists, and manual portfolios
│   ├── notes/         # Automated extraction buffers and completed company research reports
│   └── titanite-app/  # Python CLI tools for automated SEC filing extraction & scoring
│
└── [Next.js App]      # Bloomberg-style Terminal Web Dashboard (root directory)
```

---

## Portfolio & Active Holdings

My current research conviction scores and active portfolio allocations are tracked in [TITANITE-HOLDINGS.md](file:///Users/danwooster/1.%20DEV/signals/research/docs/TITANITE-HOLDINGS.md).

My research is organised around four interlocking structural pillars:

1. **Compute & Semiconductor Scaling**: Hardware chokepoints in the advanced packaging, optical interconnect, and substrate layers (e.g. Glass Substrates, high-frequency Metrology, and micro-materials).
2. **Energy & Power Infrastructure**: The physical bottlenecks of the gigawatt-scale data centre. This encompasses power transmission, high-voltage transformers, grid connection hardware, and next-generation liquid cooling systems.
3. **Geopolitical Realignment & Sovereignty**: The decoupling of Western supply chains from Chinese manufacturing, the impact of export controls, and the national security mandates driving domestic capacity expansion.
4. **Orbital Infrastructure & Space Tech**: The physical and regulatory constraints of the emerging space economy - specifically launch capacity, spectrum allocations, and sovereign military constellations.

---

## Methodology: The Human-Machine Loop

I run a hybrid intelligence pipeline: I leverage fine-tuned prompt architectures and agentic workflows to ingest and filter massive amounts of unstructured financial and technical data, then manually stress-test the high-conviction outputs to build my final investment theses.

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
│ Conviction Score           │
└────────────────────────────┘
```

### Phase 1: Modular Agentic Sweeps

I build and deploy specialised, prompt-engineered AI agents to run initial company and sector assessments. Currently, this repository utilises three framework modules:

- **Small-Cap AI Infrastructure Chokepoints** (defined in [SC-AI-INFRA.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/SMALLCAP-AI-INFRA/SC-AI-INFRA.md)). Targets micro-to-small cap companies (<$5B market cap) in the hardware supply chain, auditing earnings transcripts and regulatory filings for capacity constraints, lead time extensions, and backlog changes.
- **Trillion-Dollar Scale-Up Beneficiaries** (defined in [leopold.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/SITUATIONAL-AWARENESS/leopold.md)). Targets mid-to-large-cap companies that are primary enablers or operators of the AI infrastructure buildout, focusing on power and scale.
- **Space-Infrastructure & Orbital Chokepoint Framework** (defined in [SPACE-INFRA.md](file:///Users/danwooster/1.%20DEV/signals/research/notes/SPACE/SPACE-INFRA.md)). Targets Space Tech companies, focusing on launch capacity bottlenecks, spectrum/regulatory moats, and constellation capital runways.

### Phase 2: Human Reconciliation

The agentic output is a starting filter, not the final investment decision. I manually stress-test and rebuild the analysis where automated tools fall short:

- **Forensic Accounting**: Checking auditor credibility, internal controls, related-party transactions, and capital allocation discipline (e.g. share buybacks vs. dilutive raises).
- **Competitive Roadmap Verification**: Scrutinising emerging technology threats, Chinese competitor progress, and customer qualification cycle times.
- **Upside Arithmetic**: Auditing valuation models and peer-group multiple comparisons to ensure candidate companies present genuine asymmetric risk-reward profiles.

---

## Next.js Web Dashboard

The frontend is a dense, high-performance web terminal built to resemble a Bloomberg/Reuters terminal. It visualises active Trading 212 holdings, conviction scores, catalyst radars, and real-time market data.

### Setup & Dev Server

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:

   ```env
   T212_API_KEY=your_trading_212_api_key
   T212_API_SECRET=your_trading_212_api_secret
   # Optional: Finnhub API Key for news sentiment tracking
   NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_key
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the terminal.

---

## Titanite Python Application

The automated pipeline backend resides in the `research/titanite-app` directory. It manages the CLI tools to parse, ingest, score, and compile corporate disclosures.

### Setup & Usage

1. **Setup Environment**:

   ```bash
   cd research/titanite-app
   # Using uv (recommended):
   uv sync
   # Or using standard pip:
   pip install -e ".[dev]"
   ```

2. **Run Commands**:

   ```bash
   # Extract financial data for a ticker under the SC framework:
   titanite extract --ticker MRLN --framework sc

   # Export research findings to regenerate the frontend database:
   titanite export
   ```

---

_Disclaimer: Research use only. Not financial advice. Perform your own due diligence._
