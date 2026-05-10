# Market Sentinel - Project Overview

## Objective

Market Sentinel is a Next.js application designed to track high-volatility tech stocks with a specific focus on "Macro-Triggers" (e.g., Fed Chair Transition risks). The app provides a Signal Builder and a Dashboard to alert the user when specific macro conditions threaten their portfolio.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide Icons
- **State Management**: TanStack Query (data fetching), Zustand (signal state)
- **Charts**: Recharts (minimal sparklines only — primary display is dense data tables)
- **Market Data**: `yahoo-finance2` npm package (TNX, VIX, S&P 500, Gold, EMAs — free, 15-min delayed equity quotes)
- **Portfolio Data**: Trading 212 Official API (full read access, no trade execution)
- **Congress Data**: SenateStockWatcher + HouseStockWatcher (free, no key) + Finnhub (enrichment)
- **Future Backend**: Supabase (PostgreSQL + Auth)

## Core Features

1. **Dashboard (`/dashboard`)**:
   - Grid of "Active Signals" (Green/Neutral/Alert).
   - Quick view of 4 "Macro Pillars": TNX Yield, VIX Index, S&P 500 vs. 200-Day MA, Warsh Sentiment.
   - List of tech holdings (LUNR, RKLB, ASTS, etc.) with real-time price changes.
2. **Signal Builder (`/builder`)**:
   - Interface to create unlimited "Master Signals" (MS) combining any financial signals (EMA, volatility, gold price, etc.).
   - Built to be highly scalable to eventually support hundreds of different signals across countries, politics, companies, and stocks.
3. **Intel Hub (`/intel`)**:
   - Feed for geopolitical news and Fed-specific updates.
   - "Fed Transition Watch" focusing on Kevin Warsh's speeches.
4. **Congress Tracker (`/congress`)**:
   - US Congressional stock disclosure feed (Senate + House).
   - Filter by politician (e.g. Pelosi) or ticker (e.g. LUNR, RKLB, ASTS).
   - Data from SenateStockWatcher, HouseStockWatcher, and Finnhub.

## Initial Logic Setup (The 4 Pillars)

- **Pillar 1 (TNX)**: Critical Alert at 4.5%.
- **Pillar 2 (VIX)**: Elevated Risk at 20, Panic Alert at 25+.
- **Pillar 3 (Warsh Sentiment)**: Manual Hawkish/Dovish toggle.
- **Pillar 4 (S&P 500 MA)**: Real-time tracking of ~6550 level (200-Day MA). Alert if price < MA.

## UI/UX Requirements

- **Design Style**: Look and feel of a Bloomberg terminal, using a clean, dark-themed UI.
- **Complexity**: Must _not_ be overly complicated; prioritize an accessible, simplified user experience over a messy cluttered interface.
