/**
 * INSTRUMENT_REGISTRY — single source of truth for all instruments the app
 * can fetch technical indicator data for.
 *
 * ── How to add a new ETF or index ──────────────────────────────────────────
 * 1. Add one entry to INSTRUMENT_REGISTRY below (uncomment an example or copy one).
 * 2. Restart the dev server — all metrics auto-generate in the builder UI.
 * 3. No other file changes required.
 *
 * ── How metric IDs are generated ───────────────────────────────────────────
 * Each instrument generates metrics following the pattern:
 *   {id}_PRICE
 *   {id}_EMA_{period}         (for each configured EMA period)
 *   {id}_RSI_{period}         (for each configured RSI period)
 *   {id}_MACD_LINE
 *   {id}_MACD_SIGNAL
 *   {id}_MACD_HIST
 *   {id}_BB_UPPER
 *   {id}_BB_MIDDLE
 *   {id}_BB_LOWER
 *   {id}_BB_PCT
 */

export type InstrumentCategory = 'INDEX' | 'ETF' | 'COMMODITY' | 'BOND' | 'VOLATILITY';

export interface InstrumentConfig {
  /** Short unique ID — used as the metric prefix, e.g. 'NDX' → 'NDX_RSI_14' */
  id: string;
  label: string;
  shortLabel: string;
  yahooSymbol: string;
  tradingViewSymbol: string; // Ticker for TradingView widget, e.g., NASDAQ:NDX
  category: InstrumentCategory;
  unit: string;
  indicators: {
    price: boolean;
    /** EMA periods to compute, e.g. [9, 21, 50, 200] */
    ema?: number[];
    /** RSI periods to compute, e.g. [14] */
    rsi?: number[];
    /** Standard MACD (12/26/9) */
    macd?: boolean;
    /** Standard Bollinger Bands (20-period SMA, 2σ) */
    bollinger?: boolean;
  };
}

export const INSTRUMENT_REGISTRY: InstrumentConfig[] = [
  // ── Active instruments ────────────────────────────────────────────────────
  {
    id:                'NDX',
    label:             'Nasdaq 100 Index',
    shortLabel:        'NDX',
    yahooSymbol:       '^NDX',
    tradingViewSymbol: 'NASDAQ:NDX',
    category:          'INDEX',
    unit:              'pts',
    indicators: {
      price:     true,
      ema:       [9, 21, 50, 200],
      rsi:       [14],
      macd:      true,
      bollinger: true,
    },
  },

  // ── Commented-out instruments — uncomment to activate ────────────────────
  // {
  //   id: 'QQQ', label: 'Invesco QQQ ETF', shortLabel: 'QQQ',
  //   yahooSymbol: 'QQQ', tradingViewSymbol: 'NASDAQ:QQQ', category: 'ETF', unit: '$',
  //   indicators: { price: true, ema: [9, 21, 50, 200], rsi: [14], macd: true, bollinger: true },
  // },
  // {
  //   id: 'DRAM', label: 'DRAM ETF', shortLabel: 'DRAM',
  //   yahooSymbol: 'DRAM', tradingViewSymbol: 'NYSEARCA:DRAM', category: 'ETF', unit: '$',
  //   indicators: { price: true, ema: [9, 21, 50, 200], rsi: [14], macd: true, bollinger: true },
  // },
  // {
  //   id: 'VOO', label: "Vanguard S&P 500 ETF", shortLabel: 'VOO',
  //   yahooSymbol: 'VOO', tradingViewSymbol: 'NYSEARCA:VOO', category: 'ETF', unit: '$',
  //   indicators: { price: true, ema: [9, 21, 50, 200], rsi: [14], macd: true, bollinger: true },
  // },
  // {
  //   id: 'SMH', label: 'VanEck Semiconductor ETF', shortLabel: 'SMH',
  //   yahooSymbol: 'SMH', tradingViewSymbol: 'NASDAQ:SMH', category: 'ETF', unit: '$',
  //   indicators: { price: true, ema: [9, 21, 50, 200], rsi: [14], macd: true, bollinger: true },
  // },
  // {
  //   id: 'SOXX', label: 'iShares Semiconductor ETF', shortLabel: 'SOXX',
  //   yahooSymbol: 'SOXX', tradingViewSymbol: 'NASDAQ:SOXX', category: 'ETF', unit: '$',
  //   indicators: { price: true, ema: [9, 21, 50, 200], rsi: [14], macd: true, bollinger: true },
  // },
];
