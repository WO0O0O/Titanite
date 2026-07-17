# Titanite — Development Phases

## Phase 1: Planning and Setup ✅ COMPLETE

- [x] Create project documentation (`docs/` folder).
- [x] Initialize Next.js (App Router) project with Tailwind CSS.
- [x] Install core dependencies (Zustand, TanStack Query, Lucide Icons, Recharts).
- [x] Finalize architecture, API strategy, and data models.
- [x] Install `yahoo-finance2` package.
- [x] Create `.env.local` with T212 and Finnhub key placeholders.

## Phase 2: Core UI Scaffold & Theming ✅ COMPLETE

- [x] Define the strict "Bloomberg Terminal" dark theme via Tailwind v4 `@theme` in `globals.css`.
- [x] Create base layout: fixed `Header`, fixed `Sidebar`, `TerminalWindow` content wrapper.
- [x] `providers.tsx` — client-side `QueryClientProvider` keeping root layout a Server Component.
- [x] `HeaderClock.tsx` — isolated client component (smallest client boundary pattern).
- [x] Stub pages for all 4 routes: `/dashboard`, `/builder`, `/intel`, `/congress`.

## Phase 3: State Management & Mock Prototype Logic ✅ COMPLETE

- [x] All TypeScript types created in `src/types/` (signals, holdings, market, intel, congress).
- [x] `METRIC_REGISTRY` created in `src/lib/metrics/registry.ts` — scalable, 8 initial metrics.
- [x] Mock data created for market, holdings, Master Signals, intel, congress.
- [x] `signalEvaluator.ts` — pure evaluator with static, crossover, and metric-vs-metric logic.
- [x] `signalStore.ts` — Zustand store with CRUD, evaluateAll, and derived selectors.
- [x] `uiStore.ts` — Zustand store for UI state (selected signal, Warsh toggle).
- [x] UI primitives: `Badge`, `ProgressMeter`, `StatusDot`.
- [x] Signal Builder fully built: `MetricSelector`, `ConditionRow`, `SignalEditor`, `MasterSignalList`, `BuilderContent`.
- [x] `/builder` page updated — Server Component shell wrapping client `BuilderContent`.

## Phase 4: Dashboard, Intel Hub & Congress Tracker UI ✅ COMPLETE

- [x] `MacroPillarsBar.tsx` — 4-pillar strip (TNX, VIX, SPX vs 200MA, Warsh toggle).
- [x] `MasterSignalCard.tsx` — Signal card with progress meter, condition list, edit link.
- [x] `HoldingsTable.tsx` — Dense portfolio table with colour-coded P&L.
- [x] `DashboardContent.tsx` — Full dashboard layout: pillars + signal grid + holdings.
- [x] `IntelItemRow.tsx`, `IntelContent.tsx` — Filterable terminal news feed + FedWatch panel.
- [x] `CongressContent.tsx` — Client-side filtered congressional disclosures table.
- [x] Mock data: `intelFeed.mock.ts`, `congress.mock.ts`.
- [x] All 4 pages (`/dashboard`, `/intel`, `/congress`, `/builder`) fully functional with mock data.

## Phase 5: API Integration & Real Data Layer ✅ COMPLETE

- [x] `src/lib/utils/ema.ts` — Pure EMA calculator (periods 9/21/50/200), seeded with SMA.
- [x] `src/lib/services/yahooFinance.service.ts` — Parallel fetches + EMA computation, mock fallback.
- [x] `src/lib/services/trading212.service.ts` — T212 REST API client, ticker normalisation, mock fallback.
- [x] `src/lib/services/congress.service.ts` — Senate + House Watcher feeds, normalised to `CongressTrade`.
- [x] `src/lib/services/finnhub.service.ts` — Finnhub general news, keyword sentiment heuristic.
- [x] Route Handlers: `/api/market`, `/api/portfolio`, `/api/congress`, `/api/intel`.
- [x] TanStack Query hooks: `useMarketData`, `useHoldings`, `useCongressTrades`, `useIntelFeed`.
- [x] `DashboardContent`, `IntelContent`, `CongressContent` updated to use hooks.
- [x] `evaluateAll()` called automatically when live market data loads.

### Phase 5.1: Bug Fixes & Data Accuracy ✅ COMPLETE

- [x] Congress service: corrected S3 URLs + `User-Agent` header + `cache: 'no-store'`.
- [x] `yahoo-finance2` v3: fixed class instantiation breaking change.
- [x] Holdings VALUE column: live `USDGBP=X` FX conversion (GBP per position).
- [x] P&L% column: fixed cross-currency bug → `(currentPrice - avgPrice) / avgPrice`.
- [x] 24H% column: removed misleading all-time-gain proxy → shows `N/A`.
- [x] Currency: all `$` → `£`, `en-US` → `en-GB`.
- [x] `TICKER_DISPLAY_OVERRIDES`: 6 T212 legacy tickers corrected (`YNDX→NBIS`, `VACQ→RKLB`, `SGH→PENG`, `IPAX→LUNR`, `NPA→ASTS`, `ACIC→ACHR`).

---

## Phase 5.5: Housekeeping & Stability ✅ COMPLETE

- [x] Fix Intel page crash — `MOCK_FED_WATCH_ITEMS is not defined` (stale `.next/` cache, cleared on rebuild).
- [x] Fix `yahoo-finance2` deprecation — migrated `historical()` → `chart()`. Added `suppressNotices`.
- [x] Congress tab — Coming Soon stub with greyed-out sidebar nav item (`SOON` badge).

---

## Phase 6: Web Intelligence Layer ✅ COMPLETE (Phase 6a)

- [x] `rss.service.ts` — 6 targeted Google News RSS feeds (no extra dependencies).
- [x] Feeds: `short-research` (Wolfpack/Hindenburg/Citron), `ft-tech` (Financial Times), `power-wall`, `capex-watch`, `lead-time`, `deferred-delivery`.
- [x] Company→ticker auto-tagging from headline text.
- [x] Improved `deriveSentiment` — consistent across Finnhub and RSS, extended bearish phrases for supply-chain signals.
- [x] Intel API route — merges Finnhub + RSS in parallel, deduplicates, sorts newest-first.
- [x] Signal filter row in `IntelContent` — `ALL SIGNALS | POWER WALL | CAPEX | LEAD TIME | DEFERRED`.
- [x] Signal tag badges in `IntelItemRow` — amber tags showing which macro signal an article is evidence for.
- [x] Uniform timestamp format — `17 May 05:01` for all items.

## Phase 7: Discord Notifications ✅ COMPLETE

- [x] `discord.service.ts` — Pure server-side service. Builds rich Discord embeds and POSTs to webhook URL from env.
- [x] Alert gating: `signal.alertEnabled` AND at least one `condition.alertEnabled` must both be true before a notification fires.
- [x] Embed includes: signal name, logic mode, per-condition status (✅/⬜), completion summary, London timestamp.
- [x] Batching: up to 10 embeds per Discord message; multiple batches if needed.
- [x] `/api/evaluate` route — cron-callable `GET` handler. Fetches live market data, evaluates all signals, fires Discord for triggered+alertEnabled signals. Falls back to mock context if Yahoo Finance fails.
- [x] `DISCORD_WEBHOOK_URL` added to `.env.local` and documented in `AI_CONTEXT.md`.
- [x] `export const dynamic = 'force-dynamic'` ensures the evaluate route is never cached.

> **Cron setup:** Hit `GET /api/evaluate` on a schedule using [cron-job.org](https://cron-job.org) (free). Recommended: every 15 minutes, Mon–Fri, 08:00–17:00 London time.
> **Phase 9 upgrade path:** Replace `MOCK_MASTER_SIGNALS` seed in `evaluate/route.ts` with a Supabase query — nothing else changes.

## Phase 7.5: Titanite Research Pipeline Integration ✅ COMPLETE

- [x] Copy and integrate Titanite research app + notes directories.
- [x] Configure paths (`config.py`, `test_extraction_buffer.py`) pointing to `research/notes`.
- [x] Resolve `TABLE.md` parsing errors by standardizing Sakai ticker format to `4078.T`.
- [x] Fix status parsing bug in `catalyst_parser.py` supporting emoji prefixes (e.g. `🟡 Active`, `✅ Hit`).
- [x] Add watchlist / pending purchase exclusion in `holdings_parser.py`.
- [x] Build `useResearchCompanies` client hook and wire lookup map to `<HoldingsTable>` on the dashboard.
- [x] Run automated data extraction and scorer pipeline for NRGV to verify end-to-end integration.
- [x] Fix research report 404 routing error by adding multi-framework search fallback (SPACE, SMALLCAP-AI-INFRA, and SITUATIONAL-AWARENESS) in Next.js `route.ts`.
- [x] Update research `workflow.md` documentation covering all three active frameworks (sc, leopold, and space).
- [x] Fix Trading 212 ticker normalisation for European/UK stocks by automatically stripping lowercase exchange-identifying suffixes (`d`, `p`, `l`) to resolve dashboard holdings tier/score matching.
- [x] Regenerate research database (`companies.json`) with corrected British English spellings.

## Phase 7.6: Currency Display Calibration ✅ COMPLETE

- [x] Correct return mapping in `trading212.service.ts` to output converted USD share prices.
- [x] Resolve the London Stock Exchange (LSE) market cap division-by-100 bug by mapping `GBp`/`GBX` to `GBP` for market cap conversion logic.
- [x] Change the price formatter in `HoldingsTable.tsx` to format `AVG $` and `LAST $` columns in USD ($) while keeping `VALUE (£)` and `P&L (£)` in GBP (£).

## Phase 7.7: Portfolio Filtering (AMD Pie Exclusion) ✅ COMPLETE

- [x] Update `trading212.service.ts` to fetch `/equity/pies` in parallel with positions and cash.
- [x] Parse pies, locate the pie named `"AMD"`, and extract its constituent tickers.
- [x] Filter the returned portfolio holdings list to exclude those matching tickers.

## Phase 7.8: Research Framework Calibration ✅ COMPLETE

- [x] Calibrate AL2SI research report to comply with the Turn 2 Data Validation Rule of SC-AI-INFRA v2.0.0 (addressed inventory-to-binding backlog ratio of 0.03 and facility qualification milestones bottleneck in Sections 3, 4, and 6).
- [x] Execute mandatory post-mortem protocol and re-auditing of AL2SI (2CRSi) under the v2.0.0 rules following the June 18, 2026 short-seller report and 40.8% stock crash (Thesis Failure re-scored to 1/13).
- [x] Fortify SC-AI-INFRA, SC-AI-EXTRACTOR, and SC-AI-SCORER prompts with Counterparty Inception, Utility Interconnection Queue, and PUE Feasibility validation gates.

## Phase 7.9: AirJoule Technologies (AIRJ) Research & Audit ✅ COMPLETE

- [x] Gather and ingest financial data and transcripts for Q3 2025, Q4 2025, and Q1 2026.
- [x] Populate the data extraction buffer `AIRJ-EXTRACTION-BUFFER.md` under `SMALLCAP-AI-INFRA/ENERGY/`.
- [x] Perform analytical scoring and research report generation `AIRJ-RESEARCH-REPORT.md` (12/13 Tier 1 verdict).
- [x] Update global framework tracking including `CATALYST-TRACKER.md` (active catalyst) and `TABLE.md` (ranking index).
- [x] Map `AIRJ` in CLI config and add it to `TITANITE-HOLDINGS.md` watchlist.
- [x] Recalibrate research report and extraction buffer to reflect the June 2026 capital raise completion ($15.00M), update stock price to $4.92, and enforce British English spelling compliance.

## Phase 7.10: POET Technologies (POET) Research Restructuring & Hyperscaler Integration ✅ COMPLETE

- [x] Extract and populate data extraction buffer `POET-EXTRACTION-BUFFER.md` under `SMALLCAP-AI-INFRA/photonics/`.
- [x] Perform analytical scoring and research report generation `POET-RESEARCH-REPORT.md` (8.5/13 disqualified verdict).
- [x] Integrate OSINT details linking Lumilens and Sivers to a Top-3 hyperscaler CPO deployment.
- [x] Retire legacy consolidated notes `POET-POET-Technologies.md`.

## Phase 7.11: Micron Technology (MU) Research & Audit ✅ COMPLETE

- [x] Ingest and populate data extraction buffer `MU-EXTRACTION-BUFFER.md` under `SITUATIONAL-AWARENESS/Semis/`.
- [x] Perform analytical scoring and research report generation `MU-RESEARCH-REPORT.md` (13/13 Tier 1 Pass / Intelligence-only verdict).
- [x] Integrate Q3 FY26 earnings results and $100B Strategic Customer Agreements (SCAs) contract backlog.
- [x] Register MU in consolidated index `TABLE.md`.

## Phase 7.12: Sivers Semiconductors (SIVE) OSINT & Price Update ✅ COMPLETE

- [x] Recalibrate data extraction buffer `SIVE-EXTRACTION-BUFFER.md` to update Jabil integration flag and audit timestamps.
- [x] Recalibrate research report `SIVE-RESEARCH-REPORT.md` Gate Check (SEK 63.35 share price, 9.73 exchange rate, recalculated market cap/EV/sales multiples).
- [x] Integrate supply chain findings linking Sivers' lasers to Jabil's 1.6T LRO transceiver modules and NVIDIA's TFLN evaluation in Sections 2, 8, and 15 of `SIVE-RESEARCH-REPORT.md`.
- [x] Recalibrate Asymmetric Return Multiple in Section 5 cluster matrix to 7.10x return.
- [x] Update Sivers' entry in `TABLE.md` and document in `CHANGELOG.md` and `docs/phases.md`.

## Phase 7.13: Custom Watchlist (T212 Deprecation) & GitHub Pages Readiness 📦 ✅ COMPLETE

- [x] Deprecate and remove Trading 212 API services (`trading212.service.ts`) and `/api/portfolio` route handler.
- [x] Remove all personal portfolio references from UI (buy price, quantity, total value, cash balance, P&L value/percent).
- [x] Create a client-side Watchlist store using LocalStorage (Zustand or local hook) to manage watched tickers without a database.
- [x] Redesign `<HoldingsTable>` into a `<WatchlistTable>` showing clean stock info: TICKER | COMPANY NAME | MARKET CAP | CURRENT PRICE | CONVICTION TIER.
- [x] Create UI controls to add and remove tickers from the watchlist directly on the dashboard.
- [x] Add static export configuration (`output: 'export'`) to `next.config.ts` for direct hosting on GitHub Pages.
- [x] Refactor live data hooks to query external APIs (Yahoo Finance client-side or static mock fallbacks) to support static serverless environment.

## Phase 7.14: Security Hardening & Crawler Mitigation COMPLETE

- [x] Implement `robots.txt` blocking AI scrapers (GPTBot, ClaudeBot, Google-Extended, CCBot) and indexing crawlers.
- [x] Configure standard Next.js security headers in `next.config.ts` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- [x] Set up a serverless rate-limiter middleware (Next.js middleware) for all `/api/` endpoints to prevent API key exhaustion.
- [x] Configure CORS restrictions to ensure `/api/` routes only respond to requests originating from `titanite.wo0.dev` and local development.
- [x] Add rate-limit failure fallbacks to hooks to cleanly display throttling errors instead of crashing pages.

## phase 7.15: lil tweaks

- news feed for all companies that I have done research on - scan through TABLE.md [Titanite-Research/docs/TABLE.md] so the intel feed pulls news coverage from the companies we have researched as well as overall news stories.

## Phase 7.16: Sivers Semiconductors (SIVE) Capital Restructure & Price Update ✅ COMPLETE

- [x] Recalibrate Sivers' share price to SEK 40.00 and shares outstanding to 346,414,274.
- [x] Integrate SEK 700 million directed share issue and $12 million loan conversion into research report and extraction buffer.
- [x] Recalibrate return multiple to 10.11x to reflect the improved risk-reward entry price.
- [x] Update Central Index summary in `TABLE.md` and database scores in `companies.json`.
- [x] Log updates in `CHANGELOG.md` and `docs/phases.md`.

## Phase 7.17: SharonAI (SHAZ) Research & Audit ✅ COMPLETE

- [x] Gather and ingest financial data and transcripts for Q3 2025, Q4 2025, and Q1 2026.
- [x] Populate the data extraction buffer `SHAZ-EXTRACTION-BUFFER.md` under `SMALLCAP-AI-INFRA/AI-CLOUD-INFRA/`.
- [x] Perform analytical scoring and research report generation `SHAZ-RESEARCH-REPORT.md` (5/13 disqualified verdict).
- [x] Integrate ESDS Software Solutions contract details, Bleecker Street short report, and CEO history.
- [x] Update Central Index summary in `TABLE.md` and database scores in `companies.json`.
- [x] Log updates in `CHANGELOG.md` and `docs/phases.md`.

## Phase 7.18: Sivers Semiconductors (SIVE) Price Update & Recalibration ✅ COMPLETE

- [x] Recalibrate research report `SIVE-RESEARCH-REPORT.md` Gate Check (SEK 32.50 share price, 9.73 exchange rate, recalculated market cap/EV/sales multiples).
- [x] Recalibrate return multiple to 12.45x to reflect the gettex correction (just under 3 EUR).
- [x] Update central index entry in `TABLE.md` and mock price details in `useHoldings.ts`.
- [x] Regenerate research database scores via `titanite export` CLI tool.
- [x] Log updates in `CHANGELOG.md` and `docs/phases.md`.

## Phase 8: Signal Builder v2 📊

See `docs/roadmap.md` for full detail.

- [ ] New metrics: RSI, MACD, Bollinger Bands, DXY, yield curve spread.
- [ ] Intelligence scores as metrics (from Phase 6 output).
- [ ] Builder UX: metric preview values, signal templates library, category grouping.

## Phase 9: Supabase Database & Auth 🗄️

See `docs/roadmap.md` for full detail.

- [ ] Supabase PostgreSQL schema for signals, conditions, event log, alert history.
- [ ] Replace Zustand signal store with Supabase queries.
- [ ] Magic link or Google OAuth for single-user login.

---

## Stretch Goals (No Timeline)

See `docs/roadmap.md` for full detail.

- **S1** — Backtesting engine (requires Phase 9 for historical snapshots).
- **S2** — Per-holding signals based on T212 portfolio.
- **S3** — Congress tracker (resume when reliable data source found).
- **S4** — LLM earnings analysis (GPT-4o / Gemini / local Ollama).
