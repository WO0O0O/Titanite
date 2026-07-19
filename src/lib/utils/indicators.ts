/**
 * Technical Indicator Calculations — pure functions, no side effects, no UI deps.
 *
 * All public functions return MarketDataPoint-compatible { current, previous }
 * shapes so they slot directly into the signal evaluator's MarketContext.
 *
 * Implementations follow the standard financial formulas used by Bloomberg,
 * TradingView, and most trading platforms:
 *   RSI  — Wilder's smoothing method (not simple moving average)
 *   MACD — standard 12/26/9 EMA-based implementation
 *   BB   — 20-period SMA with 2 standard deviation bands
 */

import { computeEMA, type EMAResult } from './ema';

// ─── Internal helper ─────────────────────────────────────────────────────────

/**
 * Computes a full EMA series (one value per candle) rather than just the
 * last two. Required by MACD to build the signal line from the MACD series.
 * Mirrors the logic in computeEMA — seeds with SMA of first `period` bars.
 */
function computeEMASeries(closes: number[], period: number): number[] {
  if (closes.length < period) return Array(closes.length).fill(0);

  const k = 2 / (period + 1);
  const series: number[] = Array(period - 1).fill(0); // pad so index aligns with closes

  // Seed: SMA of first `period` values
  let ema = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
  series.push(ema);

  for (let i = period; i < closes.length; i++) {
    ema = closes[i] * k + ema * (1 - k);
    series.push(ema);
  }

  return series;
}

// ─── RSI ─────────────────────────────────────────────────────────────────────

export interface RSIResult {
  current: number;
  previous: number;
}

/**
 * Computes RSI using Wilder's smoothing method.
 *
 * Wilder uses a modified EMA (aka RMA/SMMA) where the multiplier is 1/period
 * rather than the standard 2/(period+1). This is what TradingView and Bloomberg
 * use — do not substitute a plain EMA here or the values will drift.
 *
 * Requires at least `period + 2` closes to produce two valid output values.
 * Falls back to 50 (neutral) if insufficient data is provided.
 */
export function computeRSI(closes: number[], period = 14): RSIResult {
  if (closes.length < period + 2) {
    return { current: 50, previous: 50 };
  }

  // Price changes (positive = gain, negative = loss)
  const changes = closes.slice(1).map((c, i) => c - closes[i]);

  // Seed: simple average of first `period` gains and losses
  const seedChanges = changes.slice(0, period);
  let avgGain = seedChanges.filter(c => c > 0).reduce((a, b) => a + b, 0) / period;
  let avgLoss = Math.abs(seedChanges.filter(c => c < 0).reduce((a, b) => a + b, 0)) / period;

  let prevRSI = 50;
  let currRSI = 50;

  // Wilder smoothing: weight = 1/period (not 2/(period+1))
  for (let i = period; i < changes.length; i++) {
    const gain = Math.max(changes[i], 0);
    const loss = Math.abs(Math.min(changes[i], 0));

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    prevRSI = currRSI;
    currRSI = 100 - (100 / (1 + rs));
  }

  return { current: currRSI, previous: prevRSI };
}

// ─── MACD ────────────────────────────────────────────────────────────────────

export interface MACDResult {
  /** MACD Line = EMA(fast) - EMA(slow) */
  line: EMAResult;
  /** Signal Line = EMA(signalPeriod) of MACD Line */
  signal: EMAResult;
  /** Histogram = MACD Line - Signal Line. Positive = bullish momentum. */
  histogram: EMAResult;
}

const MACD_NEUTRAL: MACDResult = {
  line:      { current: 0, previous: 0 },
  signal:    { current: 0, previous: 0 },
  histogram: { current: 0, previous: 0 },
};

/**
 * Computes MACD with standard parameters (12/26/9).
 *
 * The signal line is computed as an EMA of the MACD line series —
 * this requires computing the full MACD line series first, which is why
 * this function uses computeEMASeries internally rather than computeEMA.
 *
 * Requires at least `slow + signalPeriod` closes (35 for standard params).
 */
export function computeMACD(
  closes: number[],
  fast         = 12,
  slow         = 26,
  signalPeriod = 9,
): MACDResult {
  if (closes.length < slow + signalPeriod) return MACD_NEUTRAL;

  const fastSeries = computeEMASeries(closes, fast);
  const slowSeries = computeEMASeries(closes, slow);

  // MACD series starts once the slow EMA is valid (index = slow - 1)
  const macdSeries = fastSeries
    .slice(slow - 1)
    .map((f, i) => f - slowSeries[slow - 1 + i])
    .filter(v => v !== 0 || true); // keep all values including zeros

  if (macdSeries.length < signalPeriod + 1) return MACD_NEUTRAL;

  // Signal = EMA of the MACD series
  const signalSeries = computeEMASeries(macdSeries, signalPeriod);

  const lastMacd   = macdSeries.at(-1) ?? 0;
  const prevMacd   = macdSeries.at(-2) ?? 0;
  const lastSignal = signalSeries.at(-1) ?? 0;
  const prevSignal = signalSeries.at(-2) ?? 0;

  return {
    line:      { current: lastMacd,               previous: prevMacd },
    signal:    { current: lastSignal,              previous: prevSignal },
    histogram: { current: lastMacd - lastSignal,   previous: prevMacd - prevSignal },
  };
}

// ─── Bollinger Bands ─────────────────────────────────────────────────────────

export interface BollingerResult {
  upper:  EMAResult;
  middle: EMAResult;
  lower:  EMAResult;
  /**
   * %B — position of price within the bands.
   * 0 = at lower band, 0.5 = middle, 1 = at upper band.
   * >1 means price is above upper band (extreme overbought).
   * <0 means price is below lower band (extreme oversold).
   */
  pctB: EMAResult;
}

const BB_NEUTRAL: BollingerResult = {
  upper:  { current: 0, previous: 0 },
  middle: { current: 0, previous: 0 },
  lower:  { current: 0, previous: 0 },
  pctB:   { current: 0.5, previous: 0.5 },
};

/**
 * Computes Bollinger Bands with standard parameters (20-period SMA, 2σ).
 *
 * Uses a simple moving average for the middle band (not EMA) — this is
 * the John Bollinger original specification and what all major platforms use.
 *
 * Requires at least `period + 1` closes to produce two valid output values.
 */
export function computeBollingerBands(
  closes: number[],
  period     = 20,
  stdDevMult = 2,
): BollingerResult {
  if (closes.length < period + 1) return BB_NEUTRAL;

  /** Compute bands for a fixed-length window ending at the last element. */
  function getBand(window: number[]) {
    const sma = window.reduce((a, b) => a + b, 0) / period;
    const variance = window.reduce((a, b) => a + (b - sma) ** 2, 0) / period;
    const stdDev = Math.sqrt(variance);
    const upper = sma + stdDevMult * stdDev;
    const lower = sma - stdDevMult * stdDev;
    const price = window.at(-1)!;
    const pctB  = upper === lower ? 0.5 : (price - lower) / (upper - lower);
    return { upper, middle: sma, lower, pctB };
  }

  const curr = getBand(closes.slice(-period));
  const prev = getBand(closes.slice(-(period + 1), -1));

  return {
    upper:  { current: curr.upper,  previous: prev.upper  },
    middle: { current: curr.middle, previous: prev.middle },
    lower:  { current: curr.lower,  previous: prev.lower  },
    pctB:   { current: curr.pctB,   previous: prev.pctB   },
  };
}
