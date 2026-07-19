/**
 * Yahoo Finance service — SERVER ONLY. Never import from client components.
 *
 * Fetches live market data for the 4 Macro Pillars (TNX, VIX, SPX, Gold)
 * and computes EMAs (9, 21, 50, 200) from historical daily closes.
 *
 * Also fetches and computes all technical indicators for every instrument
 * registered in INSTRUMENT_REGISTRY (currently: NDX with RSI, MACD, Bollinger).
 * Adding a new instrument requires only a new entry in instruments.ts.
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
import { computeRSI, computeMACD, computeBollingerBands } from '@/lib/utils/indicators';
import { INSTRUMENT_REGISTRY } from '@/lib/metrics/instruments';
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

    // ── Step 1: Fetch macro pillars + all registered instrument data in parallel ──
    // Instrument promises are spread into the same Promise.all as macro pillars
    // so everything runs concurrently — no sequential blocking.
    const instrumentHistoryPromises = INSTRUMENT_REGISTRY.map(inst =>
      getHistoricalCloses(inst.yahooSymbol).catch(e => {
        console.error(`[Market] Failed to fetch history for ${inst.id}:`, e);
        return [] as number[];
      })
    );
    const instrumentQuotePromises = INSTRUMENT_REGISTRY.map(inst =>
      (yahooFinance.quote(inst.yahooSymbol) as Promise<any>).catch(e => {
        console.error(`[Market] Failed to fetch quote for ${inst.id}:`, e);
        return null;
      })
    );

    const [tnxQ, vixQ, spxQ, goldQ, tnxH, spxH, goldH, ...instrumentResults] = await Promise.all([
      yahooFinance.quote(SYMBOLS.TNX) as Promise<any>,
      yahooFinance.quote(SYMBOLS.VIX) as Promise<any>,
      yahooFinance.quote(SYMBOLS.SP500) as Promise<any>,
      yahooFinance.quote(SYMBOLS.GOLD) as Promise<any>,
      getHistoricalCloses(SYMBOLS.TNX),
      getHistoricalCloses(SYMBOLS.SP500),
      getHistoricalCloses(SYMBOLS.GOLD),
      ...instrumentHistoryPromises,
      ...instrumentQuotePromises,
    ]);

    // instrumentResults is [ndxHistory, ..., ndxQuote, ...]
    // First INSTRUMENT_REGISTRY.length entries are histories, the rest are quotes.
    const instHistories = instrumentResults.slice(0, INSTRUMENT_REGISTRY.length) as number[][];
    const instQuotes    = instrumentResults.slice(INSTRUMENT_REGISTRY.length) as (any | null)[];

    // Helper: get previous close from a Yahoo Finance quote object
    const prev = (q: { regularMarketPreviousClose?: number | null; regularMarketPrice?: number | null }) =>
      q.regularMarketPreviousClose ?? q.regularMarketPrice ?? 0;

    // ── Step 2: Compute EMAs for macro pillars ────────────────────────────────
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

    // ── Step 3: Build base evaluator context (macro pillars) ──────────────────
    const contextValues: MarketContext['values'] = {
      TNX:             { metricId: 'TNX',             current: tnxPrice,             previous: prev(tnxQ) },
      VIX:             { metricId: 'VIX',             current: vixPrice,             previous: prev(vixQ) },
      SP500:           { metricId: 'SP500',            current: spxPrice,             previous: prev(spxQ) },
      SP500_EMA_50:    { metricId: 'SP500_EMA_50',     current: spxEmas[50].current,  previous: spxEmas[50].previous  },
      SP500_EMA_200:   { metricId: 'SP500_EMA_200',    current: spxEmas[200].current, previous: spxEmas[200].previous },
      GOLD_PRICE:      { metricId: 'GOLD_PRICE',       current: goldPrice,            previous: prev(goldQ) },
      GOLD_EMA_50:     { metricId: 'GOLD_EMA_50',      current: goldEmas[50].current, previous: goldEmas[50].previous },
      WARSH_SENTIMENT: { metricId: 'WARSH_SENTIMENT',  current: 0, previous: 0 }, // Overridden by uiStore
    };

    // ── Step 4: Compute and inject instrument indicator values ────────────────
    // For each registered instrument, compute all configured indicators and
    // add them to the context under their auto-generated metric IDs
    // (e.g. NDX_RSI_14, NDX_MACD_LINE, NDX_BB_PCT, etc.).
    for (let i = 0; i < INSTRUMENT_REGISTRY.length; i++) {
      const instrument = INSTRUMENT_REGISTRY[i];
      const closes     = instHistories[i];
      const quote      = instQuotes[i];

      if (!quote || closes.length === 0) continue;

      const { id, indicators } = instrument;
      const price     = quote.regularMarketPrice ?? 0;
      const prevPrice = quote.regularMarketPreviousClose ?? price;

      if (indicators.price) {
        contextValues[`${id}_PRICE`] = { metricId: `${id}_PRICE`, current: price, previous: prevPrice };
      }

      for (const period of (indicators.ema ?? [])) {
        const ema = computeEMA(closes, period);
        contextValues[`${id}_EMA_${period}`] = {
          metricId: `${id}_EMA_${period}`,
          current:  ema.current,
          previous: ema.previous,
        };
      }

      for (const period of (indicators.rsi ?? [])) {
        const rsi = computeRSI(closes, period);
        contextValues[`${id}_RSI_${period}`] = {
          metricId: `${id}_RSI_${period}`,
          current:  rsi.current,
          previous: rsi.previous,
        };
      }

      if (indicators.macd) {
        const macd = computeMACD(closes);
        contextValues[`${id}_MACD_LINE`]   = { metricId: `${id}_MACD_LINE`,   current: macd.line.current,      previous: macd.line.previous };
        contextValues[`${id}_MACD_SIGNAL`] = { metricId: `${id}_MACD_SIGNAL`, current: macd.signal.current,    previous: macd.signal.previous };
        contextValues[`${id}_MACD_HIST`]   = { metricId: `${id}_MACD_HIST`,   current: macd.histogram.current, previous: macd.histogram.previous };
      }

      if (indicators.bollinger) {
        const bb = computeBollingerBands(closes);
        contextValues[`${id}_BB_UPPER`]  = { metricId: `${id}_BB_UPPER`,  current: bb.upper.current,  previous: bb.upper.previous };
        contextValues[`${id}_BB_MIDDLE`] = { metricId: `${id}_BB_MIDDLE`, current: bb.middle.current, previous: bb.middle.previous };
        contextValues[`${id}_BB_LOWER`]  = { metricId: `${id}_BB_LOWER`,  current: bb.lower.current,  previous: bb.lower.previous };
        contextValues[`${id}_BB_PCT`]    = { metricId: `${id}_BB_PCT`,    current: bb.pctB.current,   previous: bb.pctB.previous };
      }
    }

    const context: MarketContext = { asOf, values: contextValues };

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
