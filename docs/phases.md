# Market Sentinel — Development Phases

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

## Phase 5.5: Housekeeping & Stability 🔧 UP NEXT
- [ ] Fix Intel page crash — `MOCK_FED_WATCH_ITEMS is not defined`.
- [ ] Fix `yahoo-finance2` deprecation — migrate `historical()` → `chart()`.
- [ ] Congress tab — replace broken data with a "Coming Soon" stub (code preserved, just gated).

---

## Phase 6: Web Intelligence Layer (News Signal Inputs) 🌐
See `docs/roadmap.md` for full detail.
- [ ] Enhanced news monitoring (Finnhub + Google News RSS) for signal-relevant tickers.
- [ ] Keyword matching engine for 4 macro signals (POWER_WALL, HYPERSCALER_CAPEX, LEAD_TIME_TRAP, DEFERRED_DELIVERY).
- [ ] SEC EDGAR integration — search earnings transcripts for key phrases.
- [ ] Signal Evidence Panel in Intel Hub.

## Phase 7: Discord Notifications 🔔
See `docs/roadmap.md` for full detail.
- [ ] Discord webhook integration (zero-cost, no OAuth).
- [ ] Rich embeds for triggered Master Signals.
- [ ] `/api/evaluate` cron endpoint (callable by free cron service).

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
