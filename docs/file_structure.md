# Market Sentinel - File Structure

## Philosophy
Feature-based organisation. All files related to a specific feature live together.
This minimises the distance between related code and makes the codebase easy to
navigate as the number of features grows. Shared primitive UI components and utilities
live in their own `ui/` and `utils/` directories respectively.

## Full Directory Tree

```
/signals
├── docs/                             # All project documentation
│
├── public/                           # Static assets served at root
│   └── favicon.ico
│
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout (sidebar + header shell)
│   │   ├── page.tsx                  # Root redirect → /dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Main dashboard view
│   │   ├── builder/
│   │   │   └── page.tsx             # Signal / Master Signal builder
│   │   ├── intel/
│   │   │   └── page.tsx             # Intel Hub (news + Fed Watch)
│   │   └── congress/
│   │       └── page.tsx             # US Congress stock tracker
│   │
│   ├── components/
│   │   ├── layout/                   # App-wide chrome
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── TerminalWindow.tsx   # Reusable terminal-style content wrapper
│   │   │
│   │   ├── dashboard/               # Components specific to /dashboard
│   │   │   ├── MasterSignalCard.tsx # Displays one MS with progress meter
│   │   │   ├── MacroPillarsBar.tsx  # TNX / VIX / S&P / Warsh row
│   │   │   ├── HoldingsTable.tsx    # T212 portfolio table
│   │   │   └── PortfolioSummary.tsx # Totals row above holdings
│   │   │
│   │   ├── builder/                 # Components specific to /builder
│   │   │   ├── MasterSignalList.tsx # Left panel: saved MS list
│   │   │   ├── SignalEditor.tsx     # Right panel: build / edit an MS
│   │   │   ├── ConditionRow.tsx     # One condition (metric / operator / value)
│   │   │   └── MetricSelector.tsx  # Searchable dropdown of all available metrics
│   │   │
│   │   ├── intel/                   # Components specific to /intel
│   │   │   ├── IntelFeed.tsx        # Scrollable news log
│   │   │   ├── FedWatchPanel.tsx    # Warsh-specific panel
│   │   │   └── IntelItem.tsx        # Single news row
│   │   │
│   │   ├── congress/                # Components specific to /congress
│   │   │   ├── CongressTradesTable.tsx
│   │   │   ├── PoliticianFilter.tsx
│   │   │   └── TickerFilter.tsx
│   │   │
│   │   └── ui/                      # Shared primitive components (no business logic)
│   │       ├── Badge.tsx            # Status badge (ALERT / NEUTRAL / OK)
│   │       ├── ProgressMeter.tsx    # Horizontal fill meter for MS completion %
│   │       ├── DataTable.tsx        # Generic sortable dense data table
│   │       ├── Sparkline.tsx        # Minimal recharts trendline
│   │       ├── SectionHeader.tsx    # Terminal-style section divider
│   │       └── StatusDot.tsx        # Coloured status dot (green/amber/red)
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useMarketData.ts         # Fetches & caches Yahoo Finance data (TanStack Query)
│   │   ├── usePortfolio.ts          # Fetches T212 portfolio (TanStack Query)
│   │   ├── useCongressTrades.ts     # Fetches congress trade data
│   │   └── useSignalEvaluator.ts    # Runs evaluator against live market data
│   │
│   ├── lib/
│   │   ├── services/                # API service layer — swap mock ↔ real here
│   │   │   ├── trading212.ts        # T212 REST client
│   │   │   ├── yahooFinance.ts      # Yahoo Finance / yahoo-finance2 wrapper
│   │   │   ├── congress.ts          # SenateStockWatcher + HouseStockWatcher + Finnhub
│   │   │   └── index.ts             # Re-exports all services (single import point)
│   │   │
│   │   ├── mock/                    # Mock data for high-fidelity prototype
│   │   │   ├── holdings.mock.ts
│   │   │   ├── marketData.mock.ts
│   │   │   ├── masterSignals.mock.ts
│   │   │   ├── intelFeed.mock.ts
│   │   │   └── congress.mock.ts
│   │   │
│   │   ├── evaluator/               # Pure signal evaluation logic (no UI deps)
│   │   │   └── signalEvaluator.ts  # Core: evaluates SubSignals → MasterSignal state
│   │   │
│   │   └── utils/
│   │       ├── ema.ts               # EMA calculation (9, 21, 50, 200 periods)
│   │       ├── formatters.ts        # Currency, %, number formatters
│   │       └── cn.ts                # clsx + tailwind-merge utility
│   │
│   ├── store/                       # Zustand stores
│   │   ├── signalStore.ts           # Master Signals CRUD + evaluation state
│   │   └── uiStore.ts               # UI state (active page, sidebar collapse, etc.)
│   │
│   └── types/                       # All TypeScript interfaces (source of truth)
│       ├── signals.ts               # SubSignal, MasterSignal, Operator
│       ├── holdings.ts              # Holding, PortfolioSummary
│       ├── market.ts                # MarketPillar, Quote, OHLCVBar, EMAResult
│       ├── intel.ts                 # IntelItem, FedSentiment
│       └── congress.ts              # CongressTrade, Politician
│
├── AGENTS.md
├── CLAUDE.md
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

## Key Rules
1. **No business logic in components.** Components render; hooks and the evaluator compute.
2. **All types live in `src/types/`.** Never inline type definitions in component files.
3. **All API calls go through `src/lib/services/`.** Pages and hooks never call `fetch` directly.
4. **Mock data mirrors the exact same TypeScript types as real data.** Swapping real APIs in = changing one import in the service file, nothing else.
