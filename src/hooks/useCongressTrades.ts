'use client';

/**
 * useCongressTrades — TanStack Query hook for congressional disclosures.
 *
 * When NEXT_PUBLIC_USE_MOCK_DATA=true: resolves with mock trades.
 * When false: fetches from /api/congress (Senate + House Watcher).
 */

import { useQuery } from '@tanstack/react-query';
import type { CongressTrade } from '@/types/congress';
import { MOCK_CONGRESS_TRADES } from '@/lib/mock/congress.mock';

export function useCongressTrades() {
  return useQuery<CongressTrade[]>({
    queryKey: ['congress'],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return MOCK_CONGRESS_TRADES;
      }
      try {
        const res = await fetch('/api/congress');
        if (res.status === 429) {
          console.warn('Congress API rate limit exceeded (429) — falling back to mock data');
          return MOCK_CONGRESS_TRADES;
        }
        if (!res.ok) throw new Error(`Congress fetch failed: ${res.status}`);
        return await res.json() as CongressTrade[];
      } catch (err) {
        console.warn('Congress API /api/congress is unavailable, falling back to mock data:', err);
        return MOCK_CONGRESS_TRADES;
      }
    },
    refetchInterval: 60000, // Background poll every 60s
  });
}
