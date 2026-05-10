# Market Sentinel - Development Phases

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
- [ ] *(Deferred to Phase 3/4)* Foundational UI primitives: `Badge`, `ProgressMeter`, `DataTable`, `StatusDot`, `Sparkline`.

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
- [x] Route Handlers: `/api/market`, `/api/portfolio`, `/api/congress`, `/api/intel` — all respect `NEXT_PUBLIC_USE_MOCK_DATA`.
- [x] TanStack Query hooks: `useMarketData`, `useHoldings`, `useCongressTrades`, `useIntelFeed`.
- [x] `DashboardContent`, `IntelContent`, `CongressContent` updated to use hooks; mock imports removed.
- [x] `evaluateAll()` called automatically when live market data loads (signals auto-update).

## Phase 6: Backend & User Authentication (Future)
- [ ] Set up Supabase PostgreSQL database.
- [ ] Migrate Zustand state over to Supabase schema.
- [ ] Implement User Authentication for scalable deployment.
