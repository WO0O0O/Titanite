'use client';

/**
 * useIntelFeed — TanStack Query hook for market news.
 *
 * When NEXT_PUBLIC_USE_MOCK_DATA=true: resolves with mock intel items.
 * When false: fetches from /api/intel (Finnhub).
 */

import { useQuery } from '@tanstack/react-query';
import type { IntelItem } from '@/types/intel';
import { MOCK_INTEL_ITEMS } from '@/lib/mock/intelFeed.mock';

export function useIntelFeed() {
  return useQuery<IntelItem[]>({
    queryKey: ['intel'],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return MOCK_INTEL_ITEMS;
      }
      try {
        const res = await fetch('/api/intel');
        if (!res.ok) throw new Error(`Intel feed fetch failed: ${res.status}`);
        return await res.json() as IntelItem[];
      } catch (err) {
        console.warn('Intel API /api/intel is unavailable, falling back to mock data:', err);
        return MOCK_INTEL_ITEMS;
      }
    },
    refetchInterval: 60000, // Background poll every 60s
  });
}
