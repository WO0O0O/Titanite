# Market Sentinel - Architecture

## Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS configured for a strict, high-density "Bloomberg Terminal" aesthetic.
- **Charts/Tables**: Standard HTML/Tailwind for dense data tables, `recharts` for minimal sparklines/trendlines.

## State Management & Data Fetching
- **Client State**: `zustand` to hold ephemeral application state (e.g., active Master Signals during the session, UI toggles).
- **Data Caching**: `@tanstack/react-query` to manage API polling and caching.

## External APIs & Integrations
1. **Market Data (Yahoo Finance)**: 
   - Used for broad market data: TNX (Yield), VIX (Volatility), S&P 500, Gold, and calculated comparative data (EMA crosses). Free and highly accurate.
2. **Portfolio Data (Trading 212)**: 
   - Uses the official T212 API. We will build an integration layer that securely fetches your ISA holdings and integrates them into the dashboard.
3. **Intel Hub (Custom Feed)**: 
   - Rather than a generic news feed, we will pull from free Financial News APIs or RSS feeds and **strictly filter** them based on your current holdings and active Master Signals. This guarantees high relevance.

## Backend Strategy (Future Phase)
- **Platform**: Supabase
- **Reasoning**: Provides an excellent free tier, PostgreSQL for storing complex Master Signal configurations, and built-in authentication for when you eventually scale the tool beyond a single-tenant local application.
