# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.5.0] — Phase 5: API Integration & Real Data Layer — 2026-05-10
### Added
- `src/lib/utils/ema.ts` — Pure EMA calculation (periods 9/21/50/200), seeded with SMA.
- `src/lib/services/yahooFinance.service.ts` — Parallel symbol fetches, EMA computation, graceful mock fallback.
- `src/lib/services/trading212.service.ts` — T212 REST API client with ticker normalisation.
- `src/lib/services/congress.service.ts` — Senate + House Watcher normaliser (most recent 100 each).
- `src/lib/services/finnhub.service.ts` — Finnhub news with keyword-based sentiment heuristic.
- `src/app/api/` — Route handlers for `/api/market`, `/api/portfolio`, `/api/congress`, `/api/intel`.
- `src/hooks/` — TanStack Query hooks: `useMarketData`, `useHoldings`, `useCongressTrades`, `useIntelFeed`.
### Changed
- `DashboardContent`, `IntelContent`, `CongressContent` — replaced direct mock imports with data hooks.
- `DashboardContent` — `evaluateAll()` fires automatically when live market data resolves.

## [0.4.0] — Phase 4: Dashboard, Intel Hub & Congress Tracker UI — 2026-05-10
### Added
- `src/lib/mock/intelFeed.mock.ts` — 8 intel items (Fed/Warsh, holdings-specific, macro).
- `src/lib/mock/congress.mock.ts` — 8 congressional trades including LUNR, RKLB, ASTS, PLTR, NVDA.
- `src/components/dashboard/MacroPillarsBar.tsx` — 4-pillar strip with interactive Warsh toggle.
- `src/components/dashboard/MasterSignalCard.tsx` — Signal card with live progress meter and condition list.
- `src/components/dashboard/HoldingsTable.tsx` — Dense portfolio table with colour-coded P&L.
- `src/components/dashboard/DashboardContent.tsx` — Full dashboard: pillars + 2-col signal grid + portfolio.
- `src/components/intel/IntelItemRow.tsx` — Terminal-style log row with sentiment and ticker tags.
- `src/components/intel/IntelContent.tsx` — Filterable feed + FedWatch panel with Warsh cycle.
- `src/components/congress/CongressContent.tsx` — Client-filtered congressional disclosures table.
- All 4 pages updated from stubs to full implementations.

## [0.3.0] — Phase 3: State Management & Mock Prototype Logic — 2026-05-10
### Added
- `src/types/` — All TypeScript interfaces: `signals`, `holdings`, `market`, `intel`, `congress`.
- `src/lib/metrics/registry.ts` — `METRIC_REGISTRY` with 8 metrics across 6 categories. Fully extensible.
- `src/lib/mock/` — Mock data for market context, holdings (LUNR/RKLB/ASTS/PLTR/NVDA), Master Signals, intel feed, congress trades.
- `src/lib/evaluator/signalEvaluator.ts` — Pure evaluator: static thresholds, static crossovers, metric-vs-metric crossovers.
- `src/store/signalStore.ts` — Zustand: CRUD for Master Signals, `evaluateAll`, derived selectors.
- `src/store/uiStore.ts` — Zustand: selected signal ID, Warsh Sentiment toggle.
- `src/components/ui/Badge.tsx`, `ProgressMeter.tsx`, `StatusDot.tsx` — Shared UI primitives.
- `src/components/builder/` — Full Signal Builder: `MetricSelector`, `ConditionRow`, `SignalEditor`, `MasterSignalList`, `BuilderContent`.
- `/builder` page rebuilt as a proper Server Component shell with a `BuilderContent` client boundary.

## [0.2.0] — Phase 2: Core UI Scaffold & Theming — 2026-05-10
### Added
- `src/app/globals.css` — Full Bloomberg terminal design system via Tailwind v4 `@theme` block (colour tokens, typography, custom scrollbars).
- `src/lib/utils/cn.ts` — `clsx` + `tailwind-merge` utility.
- `src/app/providers.tsx` — Client-side `QueryClientProvider` wrapper, keeping root layout a Server Component.
- `src/components/layout/Header.tsx` — Fixed top bar with app identity, system status pills, and live clock.
- `src/components/layout/HeaderClock.tsx` — Isolated client component for the live ticking clock (smallest client boundary pattern).
- `src/components/layout/Sidebar.tsx` — Fixed left navigation with active route highlighting via `usePathname`.
- `src/components/layout/TerminalWindow.tsx` — Reusable Bloomberg-style content pane wrapper with chrome bar.
- `src/app/page.tsx` — Root redirect to `/dashboard`.
- Stub pages for all 4 routes: `/dashboard`, `/builder`, `/intel`, `/congress`.

## [0.1.0] — Phase 1: Planning & Setup — 2026-05-10
### Added
- Initial project documentation (`overview.md`, `changelog.md`, `testplan.md`, `prompt.md`, `phases.md`, `architecture.md`, `data_models.md`, `file_structure.md`, `api_contracts.md`, `AI_CONTEXT.md`).
- Next.js 16 (App Router) project initialised with Tailwind CSS v4, TypeScript.
- Dependencies installed: `zustand`, `@tanstack/react-query`, `lucide-react`, `recharts`, `clsx`, `tailwind-merge`, `yahoo-finance2`.

### Changed
- Updated documentation with Master Signals (MS) capabilities (scalable builder for hundreds of signals including EMA, volatility, gold).
- Refined UI/UX requirements: Bloomberg terminal look but simplified and not overly complicated.
- Finalised API stack: `yahoo-finance2`, Trading 212 Official API, SenateStockWatcher, HouseStockWatcher, Finnhub.
