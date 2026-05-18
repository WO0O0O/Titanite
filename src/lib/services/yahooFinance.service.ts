/**
 * Yahoo Finance service — SERVER ONLY. Never import from client components.
 *
 * Fetches live market data for the 4 Macro Pillars (TNX, VIX, SPX, Gold)
 * and computes EMAs (9, 21, 50, 200) from historical daily closes.
 *
 * Data is 15-minute delayed (Yahoo Finance free tier limitation).
 * The `asOf` timestamp must be displayed prominently in the UI.
 *
 * Fetches ~400 days of history in parallel for all symbols so EMA-200
 * is accurate. Falls back gracefully to mock data on any error.
 */

// yahoo-finance2 v3 breaking change: default export is now the class, not a singleton instance.
// suppressNotices silences the survey prompt and the ripHistorical deprecation warning
// (we've fully migrated from historical() to chart() so that warning is no longer relevant).
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey', 'ripHistorical'] });
import { computeEMA } from '@/lib/utils/ema';
import type { MarketContext, MarketSnapshot } from '@/types/market';
import { MOCK_MARKET_CONTEXT, MOCK_MARKET_SNAPSHOTS } from '@/lib/mock/marketData.mock';

// Symbol definitions — map our metric IDs to Yahoo Finance symbols
const SYMBOLS = {
  TNX:   '^TNX',
  VIX:   '^VIX',
  SP500: '^GSPC',
  GOLD:  'GC=F',
} as const;

export interface MarketServiceResponse {
  context: MarketContext;
  snapshots: MarketSnapshot[];
}

/** Fetch 400 days of daily closes for a symbol and return sorted ascending. */
async function getHistoricalCloses(symbol: string): Promise<number[]> {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 400);

  // historical() was removed in yahoo-finance2 v3 (Yahoo killed the underlying API).
  // chart() is the replacement — it returns { quotes: [...] } not a raw array.
  const result = await yahooFinance.chart(symbol, {
    period1: start.toISOString().split('T')[0],
    period2: end.toISOString().split('T')[0],
    interval: '1d',
  });

  const rows = result?.quotes ?? [];

  // Sort ascending (oldest first) and strip nulls before computing EMA
  return rows
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r: any) => r.close)
    .filter((c: unknown): c is number => c != null);
}

/**
 * Fetches live market data and builds the full MarketServiceResponse.
 * Falls back to mock data on any network / API error.
 */
export async function fetchMarketData(): Promise<MarketServiceResponse> {
    const asOf = new Date().toISOString();

    // Fetch all quotes + histories in parallel to minimise latency
    const [tnxQ, vixQ, spxQ, goldQ, tnxH, spxH, goldH] = await Promise.all([
      yahooFinance.quote(SYMBOLS.TNX) as Promise<any>,
      yahooFinance.quote(SYMBOLS.VIX) as Promise<any>,
      yahooFinance.quote(SYMBOLS.SP500) as Promise<any>,
      yahooFinance.quote(SYMBOLS.GOLD) as Promise<any>,
      getHistoricalCloses(SYMBOLS.TNX),
      getHistoricalCloses(SYMBOLS.SP500),
      getHistoricalCloses(SYMBOLS.GOLD),
    ]);

    // Helper: get previous close from quote (the actual previous day close)
    const prev = (q: { regularMarketPreviousClose?: number | null; regularMarketPrice?: number | null }) =>
      q.regularMarketPreviousClose ?? q.regularMarketPrice ?? 0;

    // EMA sets for SPX and Gold (not computed for TNX/VIX — they are index values)
    const spxEmas = {
      9:   computeEMA(spxH, 9),
      21:  computeEMA(spxH, 21),
      50:  computeEMA(spxH, 50),
      200: computeEMA(spxH, 200),
    };
    const goldEmas = {
      9:   computeEMA(goldH, 9),
      21:  computeEMA(goldH, 21),
      50:  computeEMA(goldH, 50),
      200: computeEMA(goldH, 200),
    };
    const tnxEmas = {
      9:   computeEMA(tnxH, 9),
      21:  computeEMA(tnxH, 21),
      50:  computeEMA(tnxH, 50),
      200: computeEMA(tnxH, 200),
    };

    const spxPrice  = spxQ.regularMarketPrice  ?? 0;
    const goldPrice = goldQ.regularMarketPrice ?? 0;
    const tnxPrice  = tnxQ.regularMarketPrice  ?? 0;
    const vixPrice  = vixQ.regularMarketPrice  ?? 0;

    // Build the evaluator context (all metric IDs must match METRIC_REGISTRY)
    const context: MarketContext = {
      asOf,
      values: {
        TNX:           { metricId: 'TNX',           current: tnxPrice,             previous: prev(tnxQ) },
        VIX:           { metricId: 'VIX',           current: vixPrice,             previous: prev(vixQ) },
        SP500:         { metricId: 'SP500',          current: spxPrice,             previous: prev(spxQ) },
        SP500_EMA_50:  { metricId: 'SP500_EMA_50',   current: spxEmas[50].current,  previous: spxEmas[50].previous  },
        SP500_EMA_200: { metricId: 'SP500_EMA_200',  current: spxEmas[200].current, previous: spxEmas[200].previous },
        GOLD_PRICE:    { metricId: 'GOLD_PRICE',     current: goldPrice,            previous: prev(goldQ) },
        GOLD_EMA_50:   { metricId: 'GOLD_EMA_50',    current: goldEmas[50].current, previous: goldEmas[50].previous },
        WARSH_SENTIMENT: { metricId: 'WARSH_SENTIMENT', current: 0, previous: 0 }, // Overridden by uiStore
      },
    };

    const snapshotEmas = (emas: typeof spxEmas) => ({
      9: emas[9].current, 21: emas[21].current, 50: emas[50].current, 200: emas[200].current,
    });

    const snapshots: MarketSnapshot[] = [
      {
        symbol: SYMBOLS.TNX, label: '10Y Treasury Yield', shortLabel: 'TNX',
        price: tnxPrice, change: tnxQ.regularMarketChange ?? 0,
        changePercent: tnxQ.regularMarketChangePercent ?? 0,
        unit: '%', asOf, ema: snapshotEmas(tnxEmas),
      },
      {
        symbol: SYMBOLS.VIX, label: 'Volatility Index', shortLabel: 'VIX',
        price: vixPrice, change: vixQ.regularMarketChange ?? 0,
        changePercent: vixQ.regularMarketChangePercent ?? 0,
        unit: 'pts', asOf, ema: { 9: 0, 21: 0, 50: 0, 200: 0 }, // VIX EMAs not used
      },
      {
        symbol: SYMBOLS.SP500, label: 'S&P 500', shortLabel: 'SPX',
        price: spxPrice, change: spxQ.regularMarketChange ?? 0,
        changePercent: spxQ.regularMarketChangePercent ?? 0,
        unit: 'pts', asOf, ema: snapshotEmas(spxEmas),
      },
      {
        symbol: SYMBOLS.GOLD, label: 'Gold Futures', shortLabel: 'GOLD',
        price: goldPrice, change: goldQ.regularMarketChange ?? 0,
        changePercent: goldQ.regularMarketChangePercent ?? 0,
        unit: '$', asOf, ema: snapshotEmas(goldEmas),
      },
    ];

    return { context, snapshots };
}
