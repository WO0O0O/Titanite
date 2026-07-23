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

// Fallback mock data — used when API is unavailable or mock mode is on.
// Prices are approximate and denominated in the stock's native currency.
const MOCK_COMPANY_DETAILS: Record<string, { name: string; price: number; marketCap: number; currency: string }> = {
  SIVE:   { name: 'Sivers Semiconductors AB',  price: 32.50,         marketCap: 1_157_000_000,     currency: 'SEK' },
  IQE:    { name: 'IQE plc',                   price: 52.0,          marketCap: 450_000_000,       currency: 'GBp' },
  MU:     { name: 'Micron Technology Inc.',     price: 138.50,        marketCap: 153_000_000_000,   currency: 'USD' },
  POET:   { name: 'POET Technologies Inc.',     price: 2.10,          marketCap: 95_000_000,        currency: 'USD' },
  AXTI:   { name: 'AXT Inc.',                  price: 3.45,          marketCap: 150_000_000,       currency: 'USD' },
  NVDA:   { name: 'NVIDIA Corporation',         price: 875.00,        marketCap: 2_180_000_000_000, currency: 'USD' },
  LPK:    { name: 'LPKF Laser & Electronics',  price: 14.50,         marketCap: 355_000_000,       currency: 'EUR' },
  LPKF:   { name: 'LPKF Laser & Electronics',  price: 14.50,         marketCap: 355_000_000,       currency: 'EUR' },
  LUNR:   { name: 'Intuitive Machines',         price: 7.95,          marketCap: 592_500_000,       currency: 'USD' },
  RKLB:   { name: 'Rocket Lab USA',             price: 9.20,          marketCap: 3_560_000_000,     currency: 'USD' },
  ASTS:   { name: 'AST SpaceMobile',            price: 14.50,         marketCap: 2_780_000_000,     currency: 'USD' },
  PLTR:   { name: 'Palantir Technologies',      price: 24.50,         marketCap: 39_500_000_000,    currency: 'USD' },
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
          const detail = MOCK_COMPANY_DETAILS[t] ?? { name: t, price: 0, marketCap: 0, currency: 'USD' };
          return { ticker: t, ...detail };
        });
        return { quotes };
      }

      try {
        const res = await fetch(`/api/watchlist?tickers=${encodeURIComponent(tickersString)}`);
        if (res.status === 429) {
          console.warn('Watchlist API rate limit exceeded (429) — falling back to mock data');
          const quotes = tickers.map((t) => {
            const detail = MOCK_COMPANY_DETAILS[t] ?? { name: t, price: 0, marketCap: 0, currency: 'USD' };
            return { ticker: t, ...detail };
          });
          return { quotes };
        }
        if (!res.ok) throw new Error(`Watchlist fetch failed: ${res.status}`);
        return await res.json() as WatchlistResult;
      } catch (err) {
        console.warn('Watchlist API /api/watchlist is unavailable (e.g. GitHub Pages), falling back to mock data:', err);
        const quotes = tickers.map((t) => {
          const detail = MOCK_COMPANY_DETAILS[t] ?? { name: t, price: 0, marketCap: 0, currency: 'USD' };
          return { ticker: t, ...detail };
        });
        return { quotes };
      }
    },
    refetchInterval: 900_000, // Poll every 15 minutes — matches server-side revalidate window
  });
}
