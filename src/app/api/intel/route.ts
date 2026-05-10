/**
 * GET /api/intel
 *
 * Returns market news from Finnhub.
 * Respects NEXT_PUBLIC_USE_MOCK_DATA master switch.
 */

import { NextResponse } from 'next/server';
import { fetchIntelFeed } from '@/lib/services/finnhub.service';
import { MOCK_INTEL_ITEMS } from '@/lib/mock/intelFeed.mock';

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return NextResponse.json(MOCK_INTEL_ITEMS);
  }

  const items = await fetchIntelFeed();
  return NextResponse.json(items);
}
