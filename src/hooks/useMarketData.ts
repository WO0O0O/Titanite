'use client';

/**
 * useMarketData — TanStack Query hook for live market data.
 *
 * When NEXT_PUBLIC_USE_MOCK_DATA=true: resolves instantly with mock data.
 * When NEXT_PUBLIC_USE_MOCK_DATA=false: fetches from /api/market (Yahoo Finance).
 *
 * staleTime=Infinity (set in providers.tsx) means data is fetched once per
 * session — no background polling. This matches the user's stated preference.
 */

import { useQuery } from '@tanstack/react-query';
import type { MarketContext, MarketSnapshot } from '@/types/market';
import { MOCK_MARKET_CONTEXT, MOCK_MARKET_SNAPSHOTS } from '@/lib/mock/marketData.mock';

export interface MarketDataResult {
  context: MarketContext;
  snapshots: MarketSnapshot[];
}

export function useMarketData() {
  return useQuery<MarketDataResult>({
    queryKey: ['market'],
    queryFn: async () => {
      // Mock switch — avoids any network call in prototype mode
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return { context: MOCK_MARKET_CONTEXT, snapshots: MOCK_MARKET_SNAPSHOTS };
      }
      const res = await fetch('/api/market');
      if (!res.ok) throw new Error(`Market data fetch failed: ${res.status}`);
      return res.json() as Promise<MarketDataResult>;
    },
    refetchInterval: 60000, // Background poll every 60s
  });
}
