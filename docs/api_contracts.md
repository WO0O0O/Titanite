# Market Sentinel - API Contracts

## Overview
This document is the **single source of truth** for every external API this application
integrates with. It defines: authentication, endpoints used, raw response shape, and
the internal type our service layer transforms the response into.

> **Critical Rule:** No component or hook ever calls `fetch` directly. All API calls
> go through `src/lib/services/`. Swapping from mock to real data means changing
> one line in the service file.

---

## 1. Trading 212 API

**Purpose:** Fetch live portfolio holdings, account summary, and order history from
your personal ISA account.

**Official Docs:** https://t212public-api-docs.redoc.ly/

**Authentication:**
```
Header: Authorization: <YOUR_T212_API_KEY>
```
API key is stored in `.env.local` as `T212_API_KEY`. Never commit this file.

**Access Scope (as configured in T212 settings):**
- ✅ Account Info & Summary
- ✅ Portfolio (current positions)
- ✅ Order History
- ✅ Pies & Metadata
- ❌ Execute Trades (intentionally excluded)

**Base URLs:**
```
Live account:  https://live.trading212.com/api/v0
Demo account:  https://demo.trading212.com/api/v0
```

**Endpoints Used:**

### `GET /equity/account/info`
Returns account metadata (currency, ID).

### `GET /equity/account/summary`
Returns cash balance and total portfolio value.

**Raw Response (partial):**
```json
{
  "cash": 1250.50,
  "ppl": 3402.80,
  "result": 12.5,
  "invested": 28000.00,
  "pieCash": 0.00,
  "blocked": 0.00,
  "free": 1250.50,
  "total": 29250.50
}
```

### `GET /equity/portfolio`
Returns all open positions.

**Raw Response (single item):**
```json
{
  "ticker": "LUNR_US_EQ",
  "quantity": 150.0,
  "averagePrice": 6.80,
  "currentPrice": 8.25,
  "ppl": 217.50,
  "fxPpl": 0.00,
  "initialFillDate": "2024-09-10T14:22:00Z",
  "frontend": "WEB",
  "maxBuy": 50.0,
  "maxSell": 150.0,
  "pieQuantity": 0.0
}
```

**Internal Type (after transformation in `trading212.ts`):**
```typescript
// src/types/holdings.ts → Holding
{
  ticker: "LUNR",
  name: "Intuitive Machines",
  quantity: 150,
  averagePrice: 6.80,
  currentPrice: 8.25,
  percentageChange24h: 0,       // enriched from Yahoo Finance
  pnlValue: 217.50,
  pnlPercent: 21.32,
  totalValue: 1237.50
}
```

### `GET /equity/history/orders?limit=50`
Returns recent order history (for the Intel Hub timeline).

---

## 2. Yahoo Finance (via `yahoo-finance2`)

**Purpose:** Market data for all 4 Macro Pillars, individual stock quotes,
historical OHLCV data for EMA calculations, and Gold price.

**Package:** `yahoo-finance2` (npm)
```bash
npm install yahoo-finance2
```

**No API key required.** Data is free.

> ⚠️ **Important Caveat:** Equity quotes from Yahoo Finance are **15-minute delayed**
> for free users. This must be displayed clearly in the UI. Futures and index data
> (VIX, Gold) may have slightly different delays.

**Symbols Used:**

| Metric | Yahoo Symbol | Notes |
|--------|-------------|-------|
| 10Y Treasury Yield (TNX) | `^TNX` | Pillar 1 — target: 4.5% alert |
| Volatility Index (VIX) | `^VIX` | Pillar 2 — alert at 20, panic at 25 |
| S&P 500 Index | `^GSPC` | Pillar 4 — vs 200-day MA |
| Gold Futures | `GC=F` | Available as a signal metric |
| Individual stocks | `LUNR`, `RKLB`, `ASTS`, etc. | Holdings enrichment |

**Methods Used:**

### `quote(symbol)` — Current price snapshot
```typescript
import yahooFinance from 'yahoo-finance2';
const result = await yahooFinance.quote('^VIX');
// result.regularMarketPrice → current VIX level
```

### `historical(symbol, { period1, period2, interval })` — OHLCV bars
Used to fetch historical daily close prices for EMA calculation.
```typescript
const bars = await yahooFinance.historical('LUNR', {
  period1: '2024-01-01',
  period2: new Date().toISOString().split('T')[0],
  interval: '1d'
});
// bars[n].close → used to calculate EMA in src/lib/utils/ema.ts
```

**EMA Periods Calculated:** 9, 21, 50, 200 (daily close prices).

**Internal Type (after transformation in `yahooFinance.ts`):**
```typescript
// src/types/market.ts → MarketSnapshot
{
  symbol: "^VIX",
  label: "VIX",
  price: 18.72,
  change: -0.45,
  changePercent: -2.34,
  asOf: "2025-05-10T15:30:00Z",  // always display this timestamp in UI
  ema: {
    9: 17.80,
    21: 18.10,
    50: 19.20,
    200: 21.40
  }
}
```

**Polling Strategy (Prototype Phase):**
- Data fetches **on page load only** (no auto-refresh interval).
- Controlled via TanStack Query `staleTime` and `refetchOnWindowFocus: false`.
- Auto-polling will be introduced in Phase 5 as a configurable setting.

---

## 3. Congress Stock Tracker APIs

**Purpose:** Show US Congressional stock disclosures, filterable by politician
and by ticker, to identify potential insider signals correlated with your holdings.

### 3a. SenateStockWatcher (Primary)

**Free. No API key. No rate limits.**

**Endpoint:**
```
GET https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json
```

**Raw Response (single item):**
```json
{
  "transaction_date": "2025-04-15",
  "owner": "Senator",
  "ticker": "ASTS",
  "asset_description": "AST SpaceMobile Inc.",
  "asset_type": "Stock",
  "type": "Purchase",
  "amount": "$15,001 - $50,000",
  "senator": "John Doe",
  "ptr_link": "https://efts.senate.gov/LATEST/search-index?q=...",
  "disclosure_date": "2025-05-01"
}
```

### 3b. HouseStockWatcher (Primary)

**Free. No API key. No rate limits.**

**Endpoint:**
```
GET https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json
```

**Raw Response (single item):**
```json
{
  "disclosure_year": 2025,
  "disclosure_date": "05/01/2025",
  "transaction_date": "2025-04-14",
  "owner": "Hon. Jane Smith",
  "ticker": "LUNR",
  "asset_description": "Intuitive Machines",
  "type": "purchase",
  "amount": "$1,001 - $15,000",
  "party": "R",
  "state": "TX",
  "industry": "Space & Defense",
  "sector": "Technology"
}
```

### 3c. Finnhub (Secondary Enrichment)

**Free tier. Requires API key.**
Provides a cleaner, structured JSON alternative with additional metadata.

**Auth:**
```
Header: X-Finnhub-Token: <FINNHUB_API_KEY>
```
Stored in `.env.local` as `FINNHUB_API_KEY`.

**Endpoint:**
```
GET https://finnhub.io/api/v1/stock/congressional-trading?from=YYYY-MM-DD&to=YYYY-MM-DD
```

**Internal Type (unified from all 3 sources in `congress.ts`):**
```typescript
// src/types/congress.ts → CongressTrade
{
  id: string;
  politician: string;         // "Nancy Pelosi", "John Doe"
  chamber: 'SENATE' | 'HOUSE';
  party: 'D' | 'R' | 'I' | 'UNKNOWN';
  ticker: string;             // "LUNR"
  assetDescription: string;
  tradeType: 'BUY' | 'SELL';
  amountRange: string;        // "$15,001 - $50,000"
  transactionDate: string;    // ISO 8601
  disclosureDate: string;
  source: 'SENATE_WATCHER' | 'HOUSE_WATCHER' | 'FINNHUB';
  sourceUrl?: string;
}
```

**Recommended Strategy:**
Fetch SenateStockWatcher + HouseStockWatcher on load (no limits). Use Finnhub
optionally to fill gaps or as a future premium upgrade path.

---

## 4. Environment Variables Reference

All API keys and secrets are stored in `.env.local` (never committed to git).

```bash
# .env.local

# Trading 212
T212_API_KEY=your_key_here
T212_BASE_URL=https://live.trading212.com/api/v0   # or demo URL

# Finnhub (Congress enrichment)
FINNHUB_API_KEY=your_key_here

# Feature flags (for toggling mock vs real data)
NEXT_PUBLIC_USE_MOCK_DATA=true    # Set to false when real APIs are integrated
```

> `NEXT_PUBLIC_USE_MOCK_DATA` is the master switch. Every service reads this flag
> and returns either mock data or a real API response. This is how we keep the
> prototype and real data layers completely isolated.
