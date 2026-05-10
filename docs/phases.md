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

## Phase 4: Dashboard, Intel Hub & Congress Tracker UI
- [ ] Build the `/dashboard` grid displaying active Master Signals (progress meters) and current T212 holdings.
- [ ] Build the `/intel` feed UI, styled as a raw terminal log that filters news by active holdings/signals.
- [ ] Build the `/congress` tracker table with politician and ticker filters.

## Phase 5: API Integration & Real Data Layer
- [ ] Integrate `yahoo-finance2` for live Market Pillars (TNX, VIX, S&P 500, Gold, EMAs 9/21/50/200).
- [ ] Integrate Trading 212 Official API for live portfolio holdings.
- [ ] Connect SenateStockWatcher + HouseStockWatcher + Finnhub for the Congress Tracker.
- [ ] Connect filtered news/RSS feed for the Intel Hub.
- [ ] Remove `NEXT_PUBLIC_USE_MOCK_DATA=true` flag.

## Phase 6: Backend & User Authentication (Future)
- [ ] Set up Supabase PostgreSQL database.
- [ ] Migrate Zustand state over to Supabase schema.
- [ ] Implement User Authentication for scalable deployment.
