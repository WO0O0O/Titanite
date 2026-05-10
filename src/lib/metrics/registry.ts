/**
 * METRIC_REGISTRY — the single source of truth for every signal metric
 * the app supports. Adding a new signal metric means adding one entry here.
 * Nothing else in the codebase needs to change.
 *
 * Scalability design: categories and validOperators are metadata that drive
 * the builder UI automatically — no hardcoded metric lists in components.
 */

import type { Operator } from '@/types/signals';

export type MetricCategory =
  | 'MACRO'
  | 'VOLATILITY'
  | 'EQUITY'
  | 'TECHNICAL'
  | 'COMMODITY'
  | 'SENTIMENT';

export interface MetricDefinition {
  id: string;
  label: string;
  shortLabel: string;
  category: MetricCategory;
  unit: string;
  /** NUMBER: numeric comparison. CATEGORICAL: fixed value set (e.g. HAWKISH). */
  valueType: 'NUMBER' | 'CATEGORICAL';
  validOperators: Operator[];
  description: string;
  /** Only present for CATEGORICAL metrics — maps numeric value to display label */
  categoricalValues?: Array<{ value: number; label: string }>;
}

export const METRIC_REGISTRY: MetricDefinition[] = [
  // ── MACRO ──────────────────────────────────────────────────────────────────
  {
    id: 'TNX',
    label: '10Y Treasury Yield (TNX)',
    shortLabel: 'TNX',
    category: 'MACRO',
    unit: '%',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description: 'US 10-Year Treasury yield. Critical alert threshold: 4.5% (Small-Cap Killer level).',
  },

  // ── VOLATILITY ─────────────────────────────────────────────────────────────
  {
    id: 'VIX',
    label: 'Volatility Index (VIX)',
    shortLabel: 'VIX',
    category: 'VOLATILITY',
    unit: 'pts',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description: 'CBOE Volatility Index. Elevated risk at 20, Panic at 25+.',
  },

  // ── EQUITY ─────────────────────────────────────────────────────────────────
  {
    id: 'SP500',
    label: 'S&P 500 Index',
    shortLabel: 'SPX',
    category: 'EQUITY',
    unit: 'pts',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description: 'S&P 500 Index price level.',
  },

  // ── TECHNICAL ──────────────────────────────────────────────────────────────
  {
    id: 'SP500_EMA_50',
    label: 'S&P 500 — EMA 50',
    shortLabel: 'SPX EMA50',
    category: 'TECHNICAL',
    unit: 'pts',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description: '50-day EMA of the S&P 500.',
  },
  {
    id: 'SP500_EMA_200',
    label: 'S&P 500 — EMA 200',
    shortLabel: 'SPX EMA200',
    category: 'TECHNICAL',
    unit: 'pts',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS'],
    description: '200-day EMA of the S&P 500. ~6550 is the current critical support level.',
  },
  {
    id: 'GOLD_EMA_50',
    label: 'Gold — EMA 50',
    shortLabel: 'GOLD EMA50',
    category: 'TECHNICAL',
    unit: '$',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS'],
    description: '50-day EMA of gold spot price.',
  },

  // ── COMMODITY ──────────────────────────────────────────────────────────────
  {
    id: 'GOLD_PRICE',
    label: 'Gold Price (XAU/USD)',
    shortLabel: 'GOLD',
    category: 'COMMODITY',
    unit: '$',
    valueType: 'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description: 'Gold spot price in USD per troy ounce.',
  },

  // ── SENTIMENT ──────────────────────────────────────────────────────────────
  {
    id: 'WARSH_SENTIMENT',
    label: 'Warsh Sentiment',
    shortLabel: 'WARSH',
    category: 'SENTIMENT',
    unit: '',
    valueType: 'CATEGORICAL',
    // Only EQUALS makes sense for a categorical toggle
    validOperators: ['EQUALS'],
    description:
      'Manual Hawkish / Dovish / Neutral toggle for Kevin Warsh Fed transition risk. Adds severity multiplier to signals.',
    categoricalValues: [
      { value: 1, label: 'HAWKISH' },
      { value: 0, label: 'NEUTRAL' },
      { value: -1, label: 'DOVISH' },
    ],
  },
];

/** Look up a metric definition by its ID. */
export function getMetric(id: string): MetricDefinition | undefined {
  return METRIC_REGISTRY.find((m) => m.id === id);
}

/** Group all metrics by category — used by the MetricSelector dropdown UI. */
export function getMetricsByCategory(): Partial<Record<MetricCategory, MetricDefinition[]>> {
  return METRIC_REGISTRY.reduce<Partial<Record<MetricCategory, MetricDefinition[]>>>(
    (acc, metric) => {
      if (!acc[metric.category]) acc[metric.category] = [];
      acc[metric.category]!.push(metric);
      return acc;
    },
    {}
  );
}
