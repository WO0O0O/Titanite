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
      const res = await fetch('/api/congress');
      if (!res.ok) throw new Error(`Congress fetch failed: ${res.status}`);
      return res.json() as Promise<CongressTrade[]>;
    },
    refetchInterval: 60000, // Background poll every 60s
  });
}
