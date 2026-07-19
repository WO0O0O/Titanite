/**
 * METRIC_REGISTRY — the single source of truth for every signal metric
 * the app supports. Adding a new signal metric means adding one entry here.
 * Nothing else in the codebase needs to change.
 *
 * Scalability design: categories and validOperators are metadata that drive
 * the builder UI automatically — no hardcoded metric lists in components.
 *
 * Technical indicators (RSI, MACD, Bollinger) for ETFs and indices are
 * auto-generated from INSTRUMENT_REGISTRY via generateInstrumentMetrics().
 * To add a new instrument, edit src/lib/metrics/instruments.ts only.
 */

import type { Operator } from '@/types/signals';
import { INSTRUMENT_REGISTRY, type InstrumentConfig, type InstrumentCategory } from './instruments';

export type MetricCategory =
  | 'MACRO'
  | 'VOLATILITY'
  | 'EQUITY'
  | 'TECHNICAL'
  | 'COMMODITY'
  | 'SENTIMENT'
  | 'INDEX'
  | 'ETF';

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

// ── Operator sets (reused across generated metrics) ───────────────────────────

/** Full operator set for numeric metrics — includes crossover detection. */
const NUMERIC_OPS: Operator[] = ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'];

/** Static comparison only — no crossover (used for Bollinger band levels). */
const NUMERIC_OPS_NO_CROSS: Operator[] = ['>', '<', '>=', '<=', 'EQUALS'];

// ── Instrument metric generation ──────────────────────────────────────────────

/** Maps an InstrumentCategory to its MetricCategory for the registry/UI grouping. */
function toMetricCategory(cat: InstrumentCategory): MetricCategory {
  if (cat === 'ETF') return 'ETF';
  return 'INDEX'; // INDEX, BOND, COMMODITY, VOLATILITY all group under INDEX for the builder
}

/**
 * Auto-generates MetricDefinition[] for all indicators configured on an instrument.
 * Called once at module load — results are merged into METRIC_REGISTRY.
 */
function generateInstrumentMetrics(instrument: InstrumentConfig): MetricDefinition[] {
  const metrics: MetricDefinition[] = [];
  const cat = toMetricCategory(instrument.category);
  const { id, label, shortLabel, unit, indicators } = instrument;

  // Price
  if (indicators.price) {
    metrics.push({
      id:             `${id}_PRICE`,
      label:          `${label} — Price`,
      shortLabel:     `${shortLabel} Price`,
      category:       cat,
      unit,
      valueType:      'NUMBER',
      validOperators: NUMERIC_OPS,
      description:    `Current price of ${label}.`,
    });
  }

  // EMA periods
  for (const period of (indicators.ema ?? [])) {
    metrics.push({
      id:             `${id}_EMA_${period}`,
      label:          `${label} — EMA ${period}`,
      shortLabel:     `${shortLabel} EMA${period}`,
      category:       cat,
      unit,
      valueType:      'NUMBER',
      validOperators: NUMERIC_OPS,
      description:    `${period}-day Exponential Moving Average of ${label}.`,
    });
  }

  // RSI periods
  for (const period of (indicators.rsi ?? [])) {
    metrics.push({
      id:             `${id}_RSI_${period}`,
      label:          `${label} — RSI (${period})`,
      shortLabel:     `${shortLabel} RSI${period}`,
      category:       cat,
      unit:           '',
      valueType:      'NUMBER',
      validOperators: NUMERIC_OPS,
      description:    `${period}-period RSI for ${label}. >70 overbought, <30 oversold.`,
    });
  }

  // MACD (standard 12/26/9)
  if (indicators.macd) {
    metrics.push(
      {
        id:             `${id}_MACD_LINE`,
        label:          `${label} — MACD Line`,
        shortLabel:     `${shortLabel} MACD`,
        category:       cat,
        unit,
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS,
        description:    `MACD Line (EMA12 − EMA26) for ${label}. Use CROSS_ABOVE vs MACD Signal for buy signals.`,
      },
      {
        id:             `${id}_MACD_SIGNAL`,
        label:          `${label} — MACD Signal`,
        shortLabel:     `${shortLabel} MACD Sig`,
        category:       cat,
        unit,
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS,
        description:    `MACD Signal Line (EMA9 of MACD Line) for ${label}.`,
      },
      {
        id:             `${id}_MACD_HIST`,
        label:          `${label} — MACD Histogram`,
        shortLabel:     `${shortLabel} MACD Hist`,
        category:       cat,
        unit,
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS,
        description:    `MACD Histogram (MACD Line − Signal) for ${label}. Positive = bullish momentum.`,
      },
    );
  }

  // Bollinger Bands (standard 20/2)
  if (indicators.bollinger) {
    metrics.push(
      {
        id:             `${id}_BB_UPPER`,
        label:          `${label} — Bollinger Upper`,
        shortLabel:     `${shortLabel} BB Upper`,
        category:       cat,
        unit,
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS_NO_CROSS,
        description:    `Upper Bollinger Band (SMA20 + 2σ) for ${label}.`,
      },
      {
        id:             `${id}_BB_MIDDLE`,
        label:          `${label} — Bollinger Middle`,
        shortLabel:     `${shortLabel} BB Mid`,
        category:       cat,
        unit,
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS_NO_CROSS,
        description:    `Middle Bollinger Band (SMA20) for ${label}.`,
      },
      {
        id:             `${id}_BB_LOWER`,
        label:          `${label} — Bollinger Lower`,
        shortLabel:     `${shortLabel} BB Lower`,
        category:       cat,
        unit,
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS_NO_CROSS,
        description:    `Lower Bollinger Band (SMA20 − 2σ) for ${label}.`,
      },
      {
        id:             `${id}_BB_PCT`,
        label:          `${label} — Bollinger %B`,
        shortLabel:     `${shortLabel} BB %B`,
        category:       cat,
        unit:           '',
        valueType:      'NUMBER',
        validOperators: NUMERIC_OPS,
        description:    `Bollinger %B for ${label}. 0=lower band, 0.5=middle, 1=upper. >1 extreme overbought, <0 extreme oversold.`,
      },
    );
  }

  return metrics;
}

// ── Hardcoded base metrics (macro pillars + sentiment) ───────────────────────

const BASE_METRICS: MetricDefinition[] = [
  // ── MACRO ──────────────────────────────────────────────────────────────────
  {
    id:             'TNX',
    label:          '10Y Treasury Yield (TNX)',
    shortLabel:     'TNX',
    category:       'MACRO',
    unit:           '%',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description:    'US 10-Year Treasury yield. Critical alert threshold: 4.5% (Small-Cap Killer level).',
  },

  // ── VOLATILITY ─────────────────────────────────────────────────────────────
  {
    id:             'VIX',
    label:          'Volatility Index (VIX)',
    shortLabel:     'VIX',
    category:       'VOLATILITY',
    unit:           'pts',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description:    'CBOE Volatility Index. Elevated risk at 20, Panic at 25+.',
  },

  // ── EQUITY ─────────────────────────────────────────────────────────────────
  {
    id:             'SP500',
    label:          'S&P 500 Index',
    shortLabel:     'SPX',
    category:       'EQUITY',
    unit:           'pts',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description:    'S&P 500 Index price level.',
  },

  // ── TECHNICAL ──────────────────────────────────────────────────────────────
  {
    id:             'SP500_EMA_50',
    label:          'S&P 500 — EMA 50',
    shortLabel:     'SPX EMA50',
    category:       'TECHNICAL',
    unit:           'pts',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description:    '50-day EMA of the S&P 500.',
  },
  {
    id:             'SP500_EMA_200',
    label:          'S&P 500 — EMA 200',
    shortLabel:     'SPX EMA200',
    category:       'TECHNICAL',
    unit:           'pts',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS'],
    description:    '200-day EMA of the S&P 500. ~6550 is the current critical support level.',
  },
  {
    id:             'GOLD_EMA_50',
    label:          'Gold — EMA 50',
    shortLabel:     'GOLD EMA50',
    category:       'TECHNICAL',
    unit:           '$',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS'],
    description:    '50-day EMA of gold spot price.',
  },

  // ── COMMODITY ──────────────────────────────────────────────────────────────
  {
    id:             'GOLD_PRICE',
    label:          'Gold Price (XAU/USD)',
    shortLabel:     'GOLD',
    category:       'COMMODITY',
    unit:           '$',
    valueType:      'NUMBER',
    validOperators: ['>', '<', '>=', '<=', 'EQUALS', 'CROSS_ABOVE', 'CROSS_BELOW'],
    description:    'Gold spot price in USD per troy ounce.',
  },

  // ── SENTIMENT ──────────────────────────────────────────────────────────────
  {
    id:             'WARSH_SENTIMENT',
    label:          'Warsh Sentiment',
    shortLabel:     'WARSH',
    category:       'SENTIMENT',
    unit:           '',
    valueType:      'CATEGORICAL',
    validOperators: ['EQUALS'],
    description:    'Manual Hawkish / Dovish / Neutral toggle for Kevin Warsh Fed transition risk.',
    categoricalValues: [
      { value: 1,  label: 'HAWKISH' },
      { value: 0,  label: 'NEUTRAL' },
      { value: -1, label: 'DOVISH'  },
    ],
  },
];

// ── Final registry — base metrics + auto-generated instrument metrics ─────────

/** Auto-generated metrics from INSTRUMENT_REGISTRY (NDX, and any future ETFs). */
const INSTRUMENT_METRICS: MetricDefinition[] = INSTRUMENT_REGISTRY.flatMap(generateInstrumentMetrics);

export const METRIC_REGISTRY: MetricDefinition[] = [
  ...BASE_METRICS,
  ...INSTRUMENT_METRICS,
];

// ── Utility helpers ───────────────────────────────────────────────────────────

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
    {},
  );
}
