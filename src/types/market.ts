/**
 * A single metric data point used by the signal evaluator.
 * Includes both current and previous values to support crossover detection.
 */
export interface MarketDataPoint {
  metricId: string;
  current: number;
  /** Previous period value — required for CROSS_ABOVE / CROSS_BELOW operators */
  previous: number;
}

/**
 * The full market context passed to the evaluator on every evaluation run.
 * In prototype phase this is populated from mock data.
 * In Phase 5 this is populated from Yahoo Finance / T212 API responses.
 */
export interface MarketContext {
  /** Key is metricId from METRIC_REGISTRY */
  values: Record<string, MarketDataPoint>;
  asOf: string; // ISO 8601 timestamp — displayed in UI to show data freshness
}

/** Rich snapshot for display purposes (dashboard Macro Pillars bar). */
export interface MarketSnapshot {
  symbol: string;
  label: string;
  shortLabel: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  asOf: string;
  ema: { 9: number; 21: number; 50: number; 200: number };
}
