/**
 * GET /api/market
 *
 * Returns live MarketContext + MarketSnapshot[] from Yahoo Finance.
 * Respects NEXT_PUBLIC_USE_MOCK_DATA — if true, returns mock data
 * without making any external API calls.
 *
 * Cached for 15 minutes on Vercel's edge so all concurrent users
 * share a single upstream call rather than each triggering their own.
 */

import { NextResponse } from 'next/server';

/** 15-minute Vercel edge cache — matches Yahoo Finance's 15-min data delay. */
export const revalidate = 900;
import { fetchMarketData } from '@/lib/services/yahooFinance.service';
import { MOCK_MARKET_CONTEXT, MOCK_MARKET_SNAPSHOTS } from '@/lib/mock/marketData.mock';

export async function GET() {
  // Short-circuit to mock when the master switch is on
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return NextResponse.json({ context: MOCK_MARKET_CONTEXT, snapshots: MOCK_MARKET_SNAPSHOTS });
  }

  const data = await fetchMarketData();
  return NextResponse.json(data);
}
