# Market Sentinel — AI Session Context

> Share this file at the start of every new AI session. It contains everything needed to write correct code immediately.
> For full detail, reference the other docs in `/docs/` only when needed for a specific task.

---

## What This App Is

A single-tenant, Bloomberg-terminal-style Next.js dashboard for tracking high-volatility tech stocks and macro risk signals. The user creates **Master Signals (MS)** — composable Boolean logic rules built from financial metrics (EMA crosses, VIX, TNX, Gold price, etc.). When MS conditions are met, the user is alerted. The UI is a **simplified Bloomberg terminal**: dense data tables, monospaced fonts, true-black dark theme, neon accents. No modern widget cards.

---

## Current Phase

Phase 7 complete (Discord Notifications). Next: Phase 8 (Signal Builder v2)

---

## Tech Stack (Decisions are Final)

- **Framework**: Next.js (App Router), TypeScript
- **Styling**: Tailwind CSS — Bloomberg terminal aesthetic (true blacks, neon green/amber/red accents, `font-mono` for all numbers)
- **State**: Zustand (ephemeral — no DB yet), TanStack Query (data fetching/caching)
- **Charts**: Recharts — minimal sparklines only. Primary display is dense HTML tables.
- **Market Data**: `yahoo-finance2` npm package. No API key. ⚠️ 15-min delayed equity quotes — must show "as of" timestamp in UI.
- **Portfolio**: Trading 212 Official API (read-only: portfolio, account, history, pies. No trade execution.)
- **Intelligence**: Google News RSS (targeted queries) + Finnhub (general news). Completely stateless/ephemeral — fetched server-side, deduplicated, and cached for 15 mins. No DB storage.
- **Congress Data**: SenateStockWatcher + HouseStockWatcher — data hosted on **S3** (not raw GitHub). No API key. `User-Agent` header required. `cache: 'no-store'` required (files are ~4MB, exceed Next.js fetch-cache limit). ⚠️ T212 retains legacy internal tickers for rebranded stocks — use `TICKER_DISPLAY_OVERRIDES` in `trading212.service.ts` to correct.
- **Future**: Supabase (PostgreSQL + Auth) — not in scope yet

---

## Pages & Routes

| Route        | Purpose                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| `/`          | Redirects to `/dashboard`                                                |
| `/dashboard` | Active MS grid (progress meters), Macro Pillars bar, T212 holdings table |
| `/builder`   | Create/edit Master Signals from composable Sub-Signal conditions         |
| `/intel`     | Filtered news feed + Fed Transition Watch panel                          |
| `/congress`  | Congressional stock disclosure table (filter by politician or ticker)    |

---

## TypeScript Types (Source of Truth — never inline, always import from `src/types/`)

```typescript
// src/types/signals.ts
type Operator =
  | ">"
  | "<"
  | ">="
  | "<="
  | "CROSS_ABOVE"
  | "CROSS_BELOW"
  | "EQUALS";

interface SubSignal {
  id: string;
  name: string;
  metric: string; // e.g. "TNX", "EMA_50", "GOLD_PRICE"
  operator: Operator;
  targetValue?: number; // static threshold e.g. 4.5
  targetMetric?: string; // comparative e.g. "EMA_200"
  isMet: boolean;
  alertEnabled: boolean;
}

interface MasterSignal {
  id: string;
  name: string;
  conditions: SubSignal[];
  logicMode: "AND" | "OR";
  totalConditions: number;
  metConditions: number;
  completionPercentage: number; // 0-100
  isTriggered: boolean;
  alertEnabled: boolean;
}
```

```typescript
// src/types/holdings.ts
interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  percentageChange24h: number;
  pnlValue: number;
  pnlPercent: number;
  totalValue: number;
}
```

```typescript
// src/types/market.ts
interface MarketSnapshot {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePercent: number;
  asOf: string; // always display in UI (data is delayed)
  ema: { 9: number; 21: number; 50: number; 200: number };
}
```

```typescript
// src/types/congress.ts
interface CongressTrade {
  id: string;
  politician: string;
  chamber: "SENATE" | "HOUSE";
  party: "D" | "R" | "I" | "UNKNOWN";
  ticker: string;
  assetDescription: string;
  tradeType: "BUY" | "SELL";
  amountRange: string;
  transactionDate: string;
  disclosureDate: string;
  source: "SENATE_WATCHER" | "HOUSE_WATCHER" | "FINNHUB";
  sourceUrl?: string;
}
```

```typescript
// src/types/intel.ts
interface IntelItem {
  id: string;
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  relatedTickers: string[];
  relatedSignals: string[];
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
}
```

---

## Key File Locations

```
src/
├── app/                    → Pages (layout.tsx, dashboard/page.tsx, builder/page.tsx, intel/page.tsx, congress/page.tsx)
├── components/
│   ├── layout/             → Sidebar.tsx, Header.tsx, TerminalWindow.tsx
│   ├── dashboard/          → MasterSignalCard.tsx, MacroPillarsBar.tsx, HoldingsTable.tsx
│   ├── builder/            → MasterSignalList.tsx, SignalEditor.tsx, ConditionRow.tsx, MetricSelector.tsx
│   ├── intel/              → IntelFeed.tsx, FedWatchPanel.tsx, IntelItem.tsx
│   ├── congress/           → CongressTradesTable.tsx, PoliticianFilter.tsx, TickerFilter.tsx
│   └── ui/                 → Badge.tsx, ProgressMeter.tsx, DataTable.tsx, Sparkline.tsx, StatusDot.tsx
├── hooks/                  → useMarketData.ts, usePortfolio.ts, useCongressTrades.ts, useSignalEvaluator.ts
├── lib/
│   ├── services/           → trading212.service.ts, yahooFinance.service.ts, congress.service.ts, finnhub.service.ts, rss.service.ts
│   ├── mock/               → holdings.mock.ts, marketData.mock.ts, masterSignals.mock.ts, congress.mock.ts
│   ├── evaluator/          → signalEvaluator.ts
│   └── utils/              → ema.ts, formatters.ts, cn.ts
├── store/                  → signalStore.ts, uiStore.ts
└── types/                  → signals.ts, holdings.ts, market.ts, intel.ts, congress.ts
```

---

## Architectural Rules (Must Follow)

1. **No business logic in components.** Components render. Hooks and `evaluator/` compute.
2. **All types live in `src/types/`.** Never define types inline inside component files.
3. **All API calls go through `src/lib/services/`.** No raw `fetch` in pages or hooks.
4. **Mock data mirrors real types exactly.** `src/lib/mock/` files return the same TypeScript types as real API responses. This is enforced so swapping mock → real = one flag change, nothing else.
5. **`NEXT_PUBLIC_USE_MOCK_DATA=true` is the master switch.** Every service file reads this and returns mock or real data accordingly.

---

## Key Environment Variables (`.env.local` — never commit)

```bash
T212_API_KEY=your_key_here
T212_BASE_URL=https://live.trading212.com/api/v0
FINNHUB_API_KEY=your_key_here
NEXT_PUBLIC_USE_MOCK_DATA=true
DISCORD_WEBHOOK_URL=your_webhook_url_here  # Phase 7 — alerts channel webhook
```

---

## The 4 Macro Pillars (Default Signal Thresholds)

| Pillar | Metric                   | Alert Threshold                 |
| ------ | ------------------------ | ------------------------------- |
| 1      | TNX (10Y Treasury Yield) | Critical at > 4.5%              |
| 2      | VIX (Volatility Index)   | Elevated at > 20, Panic at > 25 |
| 3      | Warsh Sentiment          | Manual toggle: HAWKISH / DOVISH |
| 4      | S&P 500 vs 200-Day MA    | Alert if price < ~6550 MA level |

---

## Reference Docs (Read Only When Needed for a Specific Task)

| File                     | Read When...                                          |
| ------------------------ | ----------------------------------------------------- |
| `docs/api_contracts.md`  | Integrating or debugging T212 / Yahoo / Congress APIs |
| `docs/data_models.md`    | Expanding or changing TypeScript interfaces           |
| `docs/file_structure.md` | Adding a new file and unsure where it goes            |
| `docs/testplan.md`       | Writing tests                                         |
| `docs/phases.md`         | Planning next steps or checking what's done           |
