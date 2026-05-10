'use client';

/**
 * useHoldings — TanStack Query hook for portfolio data.
 *
 * When NEXT_PUBLIC_USE_MOCK_DATA=true: resolves with mock portfolio.
 * When false: fetches from /api/portfolio (Trading 212 API).
 */

import { useQuery } from '@tanstack/react-query';
import type { Holding, PortfolioSummary } from '@/types/holdings';
import { MOCK_HOLDINGS, MOCK_PORTFOLIO_SUMMARY } from '@/lib/mock/holdings.mock';

export interface HoldingsResult {
  holdings: Holding[];
  summary: PortfolioSummary;
}

export function useHoldings() {
  return useQuery<HoldingsResult>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return { holdings: MOCK_HOLDINGS, summary: MOCK_PORTFOLIO_SUMMARY };
      }
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error(`Portfolio fetch failed: ${res.status}`);
      return res.json() as Promise<HoldingsResult>;
    },
    refetchInterval: 60000, // Background poll every 60s
  });
}
