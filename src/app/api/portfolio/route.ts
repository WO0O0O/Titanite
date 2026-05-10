/**
 * GET /api/portfolio
 *
 * Returns live holdings + portfolio summary from Trading 212.
 * Respects NEXT_PUBLIC_USE_MOCK_DATA master switch.
 */

import { NextResponse } from 'next/server';
import { fetchPortfolio } from '@/lib/services/trading212.service';
import { MOCK_HOLDINGS, MOCK_PORTFOLIO_SUMMARY } from '@/lib/mock/holdings.mock';

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return NextResponse.json({ holdings: MOCK_HOLDINGS, summary: MOCK_PORTFOLIO_SUMMARY });
  }

  const data = await fetchPortfolio();
  return NextResponse.json(data);
}
