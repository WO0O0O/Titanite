/**
 * GET /api/congress
 *
 * Returns congressional trade disclosures from Senate + House Stock Watcher.
 * Respects NEXT_PUBLIC_USE_MOCK_DATA master switch.
 */

import { NextResponse } from 'next/server';
import { fetchCongressTrades } from '@/lib/services/congress.service';
import { MOCK_CONGRESS_TRADES } from '@/lib/mock/congress.mock';

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return NextResponse.json(MOCK_CONGRESS_TRADES);
  }

  const trades = await fetchCongressTrades();
  return NextResponse.json(trades);
}
