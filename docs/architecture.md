# Market Sentinel - Architecture

## Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS configured for a strict, high-density "Bloomberg Terminal" aesthetic.
- **Charts/Tables**: Standard HTML/Tailwind for dense data tables, `recharts` for minimal sparklines/trendlines.

## State Management & Data Fetching
- **Client State**: `zustand` to hold ephemeral application state (e.g., active Master Signals during the session, UI toggles).
- **Data Caching**: `@tanstack/react-query` to manage API polling and caching.

## External APIs & Integrations
1. **Market Data (`yahoo-finance2` package)**:
   - Covers TNX, VIX, S&P 500, Gold, individual stocks. Free, no API key required.
   - ⚠️ Equity quotes are 15-minute delayed — this will be displayed clearly in the UI.
   - EMA (9, 21, 50, 200) calculated in-house via `src/lib/utils/ema.ts` from historical OHLCV data.
2. **Portfolio Data (Trading 212 Official API)**:
   - Full read access: account info, portfolio positions, order history, pies.
   - Trade execution explicitly excluded from API key scope.
3. **Congress Tracker (3 sources)**:
   - **SenateStockWatcher**: Free, no key, no limits. Primary Senate data source.
   - **HouseStockWatcher**: Free, no key, no limits. Primary House data source.
   - **Finnhub**: Free tier, requires API key. Used as secondary enrichment layer.
4. **Intel Hub**:
   - Filtered RSS/news feed based on active holdings and Master Signals.

## Mock / Real Data Isolation Pattern
A single environment variable (`NEXT_PUBLIC_USE_MOCK_DATA`) acts as the master
switch. Every service in `src/lib/services/` reads this flag and returns either
hardcoded mock fixtures or a real API response. This keeps Phases 2–4 (prototype)
and Phase 5 (real data) completely isolated. Swapping from mock to real = setting
the flag to `false`. No other code changes required.

## Testing
- **Unit/Component Tests:** Vitest + React Testing Library
- **E2E Tests (future):** Playwright

## Backend Strategy (Future Phase)
- **Platform**: Supabase
- **Reasoning**: Provides an excellent free tier, PostgreSQL for storing complex Master Signal configurations, and built-in authentication for when you eventually scale the tool beyond a single-tenant local application.
