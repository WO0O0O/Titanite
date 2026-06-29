'use client';

/**
 * useWatchlist — client-side hook to fetch custom watchlist details.
 *
 * In prototype/mock mode or on serverless GitHub Pages:
 * - Falls back to client-side calculated quotes for the active watchlist tickers.
 * In development:
 * - Fetches live quotes from /api/watchlist?tickers=...
 */

import { useQuery } from '@tanstack/react-query';
import type { WatchlistItem } from '@/types/watchlist';

// Basic mock data resolver for default/fallback tickers
const MOCK_COMPANY_DETAILS: Record<string, { name: string; price: number; marketCap: number }> = {
  SIVE: { name: 'Sivers Semiconductors AB', price: 63.35, marketCap: 2027000000 },
  IQE:  { name: 'IQE plc', price: 0.65, marketCap: 450000000 },
  MU:   { name: 'Micron Technology Inc.', price: 138.50, marketCap: 153000000000 },
  POET: { name: 'POET Technologies Inc.', price: 2.10, marketCap: 95000000 },
  AXTI: { name: 'AXT Inc.', price: 3.45, marketCap: 150000000 },
  NVDA: { name: 'NVIDIA Corporation', price: 875.00, marketCap: 2180000000000 },
  LUNR: { name: 'Intuitive Machines', price: 7.95, marketCap: 592500000 },
  RKLB: { name: 'Rocket Lab USA', price: 9.20, marketCap: 3560000000 },
  ASTS: { name: 'AST SpaceMobile', price: 14.50, marketCap: 2780000000 },
  PLTR: { name: 'Palantir Technologies', price: 24.50, marketCap: 39500000000 },
};

export interface WatchlistResult {
  quotes: WatchlistItem[];
}

export function useWatchlist(tickers: string[]) {
  const tickersString = tickers.slice().sort().join(',');

  return useQuery<WatchlistResult>({
    queryKey: ['watchlist-quotes', tickersString],
    queryFn: async () => {
      if (!tickersString) {
        return { quotes: [] };
      }

      // Mock switch — avoids network call
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const quotes = tickers.map((t) => {
          const detail = MOCK_COMPANY_DETAILS[t] ?? { name: t, price: 100.0, marketCap: 1000000000 };
          return { ticker: t, ...detail };
        });
        return { quotes };
      }

      try {
        const res = await fetch(`/api/watchlist?tickers=${encodeURIComponent(tickersString)}`);
        if (!res.ok) throw new Error(`Watchlist fetch failed: ${res.status}`);
        return await res.json() as WatchlistResult;
      } catch (err) {
        console.warn('Watchlist API /api/watchlist is unavailable (e.g. GitHub Pages), falling back to mock data:', err);
        const quotes = tickers.map((t) => {
          const detail = MOCK_COMPANY_DETAILS[t] ?? { name: t, price: 100.0, marketCap: 1000000000 };
          return { ticker: t, ...detail };
        });
        return { quotes };
      }
    },
    refetchInterval: 60000, // Background poll every 60s
  });
}
