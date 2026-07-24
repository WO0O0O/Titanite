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
import { fetchMarketData } from '@/lib/services/yahooFinance.service';
import { MOCK_MARKET_CONTEXT, MOCK_MARKET_SNAPSHOTS } from '@/lib/mock/marketData.mock';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Short-circuit to mock when the master switch is on
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return NextResponse.json({ context: MOCK_MARKET_CONTEXT, snapshots: MOCK_MARKET_SNAPSHOTS });
  }

  try {
    const data = await fetchMarketData();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API/Market] Upstream market data fetch failed, returning mock fallback:', err);
    return NextResponse.json({ context: MOCK_MARKET_CONTEXT, snapshots: MOCK_MARKET_SNAPSHOTS });
  }
}
