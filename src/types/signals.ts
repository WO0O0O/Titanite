/**
 * Core signal types. These are the central data structures of the entire app.
 * All components, stores, and the evaluator reference these — never define
 * signal types inline elsewhere.
 */

/** All comparison operators supported by the signal evaluator. */
export type Operator =
  | '>'
  | '<'
  | '>='
  | '<='
  | 'EQUALS'
  | 'CROSS_ABOVE'   // Metric crosses above a value/metric (event-based)
  | 'CROSS_BELOW';  // Metric crosses below a value/metric (event-based)

/**
 * A single condition within a Master Signal.
 * Evaluates to true/false against the current MarketContext.
 */
export interface SubSignal {
  id: string;
  name: string;
  /** References a MetricDefinition.id from METRIC_REGISTRY */
  metric: string;
  operator: Operator;
  /** For static threshold comparisons (e.g., TNX > 4.5) */
  targetValue?: number;
  /** For metric-vs-metric comparisons (e.g., EMA_50 CROSS_BELOW EMA_200) */
  targetMetric?: string;
  /** Evaluated state — always set by signalEvaluator, never manually */
  isMet: boolean;
  /** If false, this condition is silent even when met */
  alertEnabled: boolean;
}

/**
 * A saved composite signal made of multiple SubSignals.
 * The completion meter (0–100%) tracks how many conditions are met.
 */
export interface MasterSignal {
  id: string;
  name: string;
  conditions: SubSignal[];
  /** AND: all conditions must be met. OR: any one condition triggers. */
  logicMode: 'AND' | 'OR';
  // --- Computed by evaluator — do not set manually ---
  totalConditions: number;
  metConditions: number;
  /** 0–100 — used to drive the visual progress meter */
  completionPercentage: number;
  isTriggered: boolean;
  // ---
  /** If false, the MS completion alert is suppressed even when triggered */
  alertEnabled: boolean;
  createdAt: string; // ISO 8601
}
