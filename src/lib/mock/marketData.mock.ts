/**
 * Mock market data for the prototype phase.
 *
 * Values are chosen deliberately to create an interesting prototype state:
 * - TNX at 4.48% — just BELOW the 4.5% critical alert (tension)
 * - VIX at 18.5 — elevated but not yet at the 20 threshold
 * - S&P 500 below EMA 200 — Pillar 4 would be in alert state
 * - Gold in a confirmed uptrend
 *
 * Swap this out entirely in Phase 5 when real API data is connected.
 * The shape must always match MarketContext and MarketSnapshot from src/types/market.ts.
 */

import type { MarketContext, MarketSnapshot } from '@/types/market';

/** Full evaluator context — what the signalEvaluator reads */
export const MOCK_MARKET_CONTEXT: MarketContext = {
  asOf: new Date().toISOString(),
  values: {
    TNX:          { metricId: 'TNX',          current: 4.48,  previous: 4.35  },
    VIX:          { metricId: 'VIX',          current: 18.5,  previous: 17.2  },
    SP500:        { metricId: 'SP500',         current: 5210,  previous: 5180  },
    SP500_EMA_50: { metricId: 'SP500_EMA_50',  current: 5150,  previous: 5120  },
    SP500_EMA_200:{ metricId: 'SP500_EMA_200', current: 6550,  previous: 6540  },
    GOLD_PRICE:   { metricId: 'GOLD_PRICE',    current: 2310,  previous: 2280  },
    GOLD_EMA_50:  { metricId: 'GOLD_EMA_50',   current: 2260,  previous: 2240  },
    // WARSH_SENTIMENT: 1=HAWKISH, 0=NEUTRAL, -1=DOVISH
    WARSH_SENTIMENT: { metricId: 'WARSH_SENTIMENT', current: 0, previous: 0   },
  },
};

/** Rich display snapshots for the Dashboard Macro Pillars bar */
export const MOCK_MARKET_SNAPSHOTS: MarketSnapshot[] = [
  {
    symbol: '^TNX',
    label: '10Y Treasury Yield',
    shortLabel: 'TNX',
    price: 4.48,
    change: 0.13,
    changePercent: 2.99,
    unit: '%',
    asOf: new Date().toISOString(),
    ema: { 9: 4.42, 21: 4.38, 50: 4.25, 200: 3.95 },
  },
  {
    symbol: '^VIX',
    label: 'Volatility Index',
    shortLabel: 'VIX',
    price: 18.5,
    change: 1.3,
    changePercent: 7.56,
    unit: 'pts',
    asOf: new Date().toISOString(),
    ema: { 9: 17.8, 21: 18.1, 50: 19.2, 200: 21.4 },
  },
  {
    symbol: '^GSPC',
    label: 'S&P 500',
    shortLabel: 'SPX',
    price: 5210,
    change: 30,
    changePercent: 0.58,
    unit: 'pts',
    asOf: new Date().toISOString(),
    ema: { 9: 5195, 21: 5175, 50: 5150, 200: 6550 },
  },
  {
    symbol: 'GC=F',
    label: 'Gold Futures',
    shortLabel: 'GOLD',
    price: 2310,
    change: 30,
    changePercent: 1.32,
    unit: '$',
    asOf: new Date().toISOString(),
    ema: { 9: 2295, 21: 2280, 50: 2260, 200: 2150 },
  },
];
