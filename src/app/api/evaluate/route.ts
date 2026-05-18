/**
 * GET /api/evaluate
 *
 * Cron-callable endpoint that:
 *   1. Fetches the latest market data (via Yahoo Finance / mock).
 *   2. Evaluates all Master Signals against it.
 *   3. Sends Discord notifications for any triggered signals that have alerts enabled.
 *   4. Returns a JSON summary for logging/debugging.
 *
 * Designed to be hit by a free cron service (e.g. cron-job.org) every 15 minutes
 * during market hours. No auth required for now (single-tenant, no sensitive writes).
 *
 * ── Why signals are seeded from mock here ──────────────────────────────────
 * Master Signals live in the Zustand store (client-side memory). This route
 * is server-side and has no access to that store. For Phase 7, we seed from
 * the same MOCK_MASTER_SIGNALS the store uses. In Phase 9 (Supabase), this
 * line swaps to a DB query — nothing else changes.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server';
import { fetchMarketData } from '@/lib/services/yahooFinance.service';
import { evaluateAllMasterSignals } from '@/lib/evaluator/signalEvaluator';
import { sendDiscordAlerts } from '@/lib/services/discord.service';
import { MOCK_MASTER_SIGNALS } from '@/lib/mock/masterSignals.mock';
import { MOCK_MARKET_CONTEXT } from '@/lib/mock/marketData.mock';

export const dynamic = 'force-dynamic'; // Never cache this route — always re-evaluate fresh

interface EvaluateResponse {
  evaluatedAt: string;
  dataSource: 'live' | 'mock';
  totalSignals: number;
  triggeredSignals: { id: string; name: string; completionPercentage: number }[];
  notifiedSignals: number;
}

export async function GET() {
  let marketContext = MOCK_MARKET_CONTEXT;
  let dataSource: EvaluateResponse['dataSource'] = 'mock';

  // Fetch live market data unless the master mock switch is on
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'true') {
    try {
      const liveData = await fetchMarketData();
      marketContext = liveData.context;
      dataSource = 'live';
    } catch (err) {
      // If Yahoo Finance fails, fall back to mock context so the route doesn't 500.
      // Notifications will still fire if mock signals happen to be in a triggered state.
      console.error('[Evaluate] Market data fetch failed, falling back to mock context.', err);
    }
  }

  // Evaluate all signals against the resolved context.
  // Phase 9: replace MOCK_MASTER_SIGNALS with a Supabase query.
  const evaluatedSignals = evaluateAllMasterSignals(MOCK_MASTER_SIGNALS, marketContext);

  // Only pass triggered signals to the Discord service — it will apply
  // its own alert-gating (signal.alertEnabled + condition.alertEnabled).
  const triggeredSignals = evaluatedSignals.filter((ms) => ms.isTriggered);

  const notifiedSignals = await sendDiscordAlerts(triggeredSignals);

  const response: EvaluateResponse = {
    evaluatedAt: new Date().toISOString(),
    dataSource,
    totalSignals: evaluatedSignals.length,
    triggeredSignals: triggeredSignals.map((ms) => ({
      id: ms.id,
      name: ms.name,
      completionPercentage: ms.completionPercentage,
    })),
    notifiedSignals,
  };

  return NextResponse.json(response);
}
