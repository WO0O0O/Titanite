# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

---

## [0.7.5] — Phase 7.5: Titanite Research Pipeline Integration — 2026-06-16

### Added
- `research/` subdirectory containing `titanite-app` (Python validation/extraction CLI) and `notes/` (structured markdown research).
- `src/hooks/useResearchCompanies.ts` client hook for loading the company universe.
- `src/components/dashboard/HoldingsTable` now displays Titanite Tier badge and score.

### Fixed
- Standardized Sakai ticker to `4078.T` in `TABLE.md` to pass validation.
- Patched path mappings in `config.py` and test suites to look in `research/notes`.
- Fixed parser bug in `catalyst_parser.py` handling emoji-prefixed statuses (e.g. `🟡 Active`, `✅ Hit`).
- Excluded watchlist / pending purchase items from active holdings list in `holdings_parser.py`.
- Connected lookup map in `DashboardContent.tsx` to enrich holdings rows.

## [0.7.0] — Phase 7: Discord Notifications — 2026-05-18

### Added
- `src/lib/services/discord.service.ts` — Pure server-side Discord webhook service. Builds rich embeds with per-condition status rows, completion summary, and London timezone timestamp. Batches up to 10 embeds per POST.
- `src/app/api/evaluate/route.ts` — Cron-callable `GET` route. Fetches live market data (or mock fallback), evaluates all Master Signals via `evaluateAllMasterSignals`, fires Discord notifications for triggered signals. Returns JSON summary: `{ evaluatedAt, dataSource, totalSignals, triggeredSignals[], notifiedSignals }`.
- `DISCORD_WEBHOOK_URL` env variable documented in `AI_CONTEXT.md`.

### Alert Gating (both must be true)
- `MasterSignal.alertEnabled === true` — user opts the whole signal in.
- At least one `SubSignal.alertEnabled === true` in the triggered signal — at least one condition must be opted in for the notification to fire.

---

## [0.6.0] — Phase 6a: Web Intelligence Layer — 2026-05-18

### Added
- `src/lib/services/rss.service.ts` — 6 targeted Google News RSS feeds fetched in parallel, no external dependencies. Inline XML parser handles CDATA, `<title>`, `<link>`, `<pubDate>`, `<source>`. Feeds:
  - `short-research` — Wolfpack, Hindenburg, Citron, Muddy Waters coverage
  - `ft-tech` — Financial Times semiconductor/AI/data centre articles
  - `power-wall` — Grid delay, transformer lead time, power allocation blocking DC builds (`POWER_WALL`)
  - `capex-watch` — MSFT/META/AMZN/GOOGL CapEx vs cloud/AI revenue language (`HYPERSCALER_CAPEX`)
  - `lead-time` — NVDA/TSMC GPU delivery window normalisation language (`LEAD_TIME_TRAP`)
  - `deferred-delivery` — Corning/AAOI/Lumentum site-readiness/pushout language (`DEFERRED_DELIVERY`)
- Company→ticker auto-tagging in `rss.service.ts` — scans headlines for company name substrings and attaches relevant tickers.
- Signal filter row in `IntelContent` — amber buttons above sentiment row: `ALL SIGNALS | POWER WALL | CAPEX | LEAD TIME | DEFERRED`. Composes with sentiment filter.
- Signal tag badges in `IntelItemRow` — signal-tagged articles show macro signal name in amber below ticker badges.

### Changed
- `src/app/api/intel/route.ts` — merges Finnhub + RSS in parallel, deduplicates by normalised headline, sorts newest-first.
- `src/lib/services/finnhub.service.ts` — improved `deriveSentiment` keywords (consistent with RSS service); item limit 20→15.
- `IntelItemRow` timestamp — always `DD Mon HH:MM` format (e.g. `17 May 05:01`). Seconds removed.

---

## [0.5.5] — Phase 5.5: Housekeeping & Stability — 2026-05-18

### Fixed
- **Yahoo Finance `historical()` deprecated** — migrated to `chart()` in `yahooFinance.service.ts`. `chart()` returns `{ quotes: [...] }` not a raw array. Added `suppressNotices: ['yahooSurvey', 'ripHistorical']` to silence log spam on dev server start.
- **Intel page crash** — `MOCK_FED_WATCH_ITEMS is not defined` was a stale `.next/` cache from a prior refactor. Cleared on rebuild.
- **Congress tab** — replaced broken `CongressContent` with a Coming Soon stub. All code preserved. Sidebar nav item rendered as non-clickable greyed div with `SOON` badge (`disabled: true` in `NAV_ITEMS`).

---

## [0.5.1] — Phase 5 Bug Fixes & Data Accuracy — 2026-05-10

### Fixed
- **Congress API 403** — Switched Senate/House Watcher URLs to correct S3 endpoints. Added `User-Agent` header. Replaced `{ next: { revalidate: 3600 } }` with `{ cache: 'no-store' }` to eliminate Next.js 2MB fetch-cache overflow.
- **Yahoo Finance 500** — `yahoo-finance2` v3 breaking change: default export is now the class. Fixed: `import YahooFinance from 'yahoo-finance2'; const yahooFinance = new YahooFinance();`.
- **VALUE column showing USD** — Per-position value now fetches live `USDGBP=X` FX rate via yahoo-finance2 in parallel with T212 calls. Falls back to `0.79`.
- **FX direction bug** — `GBPUSD=X` (~1.27) was used as multiplier, inflating values. Corrected to `USDGBP=X` (~0.79).
- **P&L% mixed currencies** — Was `ppl (GBP) / (avgPrice x qty) (USD)`. Fixed to `(currentPrice - avgPrice) / avgPrice x 100`.
- **24H% showing all-time gain** — T212 `/equity/portfolio` has no `previousClose`. Set to `0`; UI shows `N/A`.
- **Currency symbols** — `$`/`en-US` → `£`/`en-GB` throughout. Column headers: `AVG $`, `LAST $`, `P&L (£)`, `VALUE (£)`.

### Added
- **`TICKER_DISPLAY_OVERRIDES`** in `trading212.service.ts` — corrects T212 legacy tickers: `YNDX→NBIS`, `VACQ→RKLB`, `SGH→PENG`, `IPAX→LUNR`, `NPA→ASTS`, `ACIC→ACHR`.

---

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

---

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

---

## [0.3.0] — Phase 3: State Management & Mock Prototype Logic — 2026-05-10

### Added
- `src/types/` — All TypeScript interfaces: `signals`, `holdings`, `market`, `intel`, `congress`.
- `src/lib/metrics/registry.ts` — `METRIC_REGISTRY` with 8 metrics across 6 categories. Fully extensible.
- `src/lib/mock/` — Mock data for market context, holdings, Master Signals, intel feed, congress trades.
- `src/lib/evaluator/signalEvaluator.ts` — Pure evaluator: static thresholds, static crossovers, metric-vs-metric crossovers.
- `src/store/signalStore.ts` — Zustand: CRUD for Master Signals, `evaluateAll`, derived selectors.
- `src/store/uiStore.ts` — Zustand: selected signal ID, Warsh Sentiment toggle.
- `src/components/ui/Badge.tsx`, `ProgressMeter.tsx`, `StatusDot.tsx` — Shared UI primitives.
- `src/components/builder/` — Full Signal Builder: `MetricSelector`, `ConditionRow`, `SignalEditor`, `MasterSignalList`, `BuilderContent`.
- `/builder` page rebuilt as a proper Server Component shell with a `BuilderContent` client boundary.

---

## [0.2.0] — Phase 2: Core UI Scaffold & Theming — 2026-05-10

### Added
- `src/app/globals.css` — Full Bloomberg terminal design system via Tailwind v4 `@theme` block.
- `src/lib/utils/cn.ts` — `clsx` + `tailwind-merge` utility.
- `src/app/providers.tsx` — Client-side `QueryClientProvider` wrapper.
- `src/components/layout/Header.tsx` — Fixed top bar with app identity, system status pills, and live clock.
- `src/components/layout/HeaderClock.tsx` — Isolated client component for the live ticking clock.
- `src/components/layout/Sidebar.tsx` — Fixed left navigation with active route highlighting.
- `src/components/layout/TerminalWindow.tsx` — Reusable Bloomberg-style content pane wrapper.
- `src/app/page.tsx` — Root redirect to `/dashboard`.
- Stub pages for all 4 routes: `/dashboard`, `/builder`, `/intel`, `/congress`.

---

## [0.1.0] — Phase 1: Planning & Setup — 2026-05-10

### Added
- Initial project documentation (`overview.md`, `changelog.md`, `testplan.md`, `prompt.md`, `phases.md`, `architecture.md`, `data_models.md`, `file_structure.md`, `api_contracts.md`, `AI_CONTEXT.md`).
- Next.js 16 (App Router) project initialised with Tailwind CSS v4, TypeScript.
- Dependencies installed: `zustand`, `@tanstack/react-query`, `lucide-react`, `recharts`, `clsx`, `tailwind-merge`, `yahoo-finance2`.

### Changed
- Updated documentation with Master Signals (MS) capabilities.
- Refined UI/UX requirements: Bloomberg terminal look, simplified.
- Finalised API stack: `yahoo-finance2`, Trading 212 Official API, SenateStockWatcher, HouseStockWatcher, Finnhub.
