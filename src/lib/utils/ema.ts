/**
 * Pure EMA (Exponential Moving Average) calculation.
 * Seeded with the SMA of the first `period` values — the standard approach
 * used by Bloomberg, TradingView, and most financial platforms.
 *
 * Returns both `current` (latest) and `previous` (day before) so the
 * signal evaluator can detect CROSS_ABOVE / CROSS_BELOW events.
 */

export interface EMAResult {
  current: number;
  previous: number;
}

export function computeEMA(closes: number[], period: number): EMAResult {
  // Not enough data — return the last close as a fallback
  if (closes.length < period + 1) {
    const last = closes.at(-1) ?? 0;
    return { current: last, previous: last };
  }

  const k = 2 / (period + 1); // smoothing multiplier

  // Seed: SMA of the first `period` candles
  let ema = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let prev = ema;

  for (let i = period; i < closes.length; i++) {
    prev = ema;
    ema = closes[i] * k + ema * (1 - k);
  }

  return { current: ema, previous: prev };
}
