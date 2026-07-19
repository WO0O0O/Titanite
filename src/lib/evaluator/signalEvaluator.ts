/**
 * Signal Evaluator — pure functions, no side effects, no UI dependencies.
 *
 * This is the core business logic of Titanite. It takes a MasterSignal
 * and a MarketContext and returns an updated MasterSignal with all computed
 * fields recalculated (isMet per condition, completionPercentage, isTriggered).
 *
 * Being pure functions makes this trivially testable (see docs/testplan.md P0 tests).
 */

import type { SubSignal, MasterSignal, Operator } from '@/types/signals';
import type { MarketContext } from '@/types/market';

// ─── Static Threshold Evaluation ─────────────────────────────────────────────

/**
 * Compares a current numeric value against a static target using the given operator.
 * Used for conditions like "TNX > 4.5" or "VIX >= 20".
 */
function evaluateStatic(
  current: number,
  operator: Operator,
  target: number
): boolean {
  switch (operator) {
    case '>':      return current > target;
    case '<':      return current < target;
    case '>=':     return current >= target;
    case '<=':     return current <= target;
    case 'EQUALS': return current === target;
    default:       return false;
  }
}

// ─── Crossover Evaluation ────────────────────────────────────────────────────

/**
 * Detects a crossover event against a static threshold.
 * A crossover is an EVENT — it only fires the moment the cross happens,
 * not while the value remains above/below.
 *
 * CROSS_ABOVE: previous was AT or BELOW threshold, current is ABOVE.
 * CROSS_BELOW: previous was AT or ABOVE threshold, current is BELOW.
 */
function evaluateStaticCrossover(
  previous: number,
  current: number,
  operator: 'CROSS_ABOVE' | 'CROSS_BELOW',
  target: number
): boolean {
  if (operator === 'CROSS_ABOVE') return previous <= target && current > target;
  if (operator === 'CROSS_BELOW') return previous >= target && current < target;
  return false;
}

/**
 * Detects a crossover between two dynamic metrics.
 * Used for e.g. "SP500_EMA_50 CROSS_BELOW SP500_EMA_200".
 *
 * CROSS_ABOVE: metricA was below or equal to metricB, now above.
 * CROSS_BELOW: metricA was above or equal to metricB, now below.
 */
function evaluateMetricCrossover(
  prevA: number,
  currA: number,
  operator: 'CROSS_ABOVE' | 'CROSS_BELOW',
  prevB: number,
  currB: number
): boolean {
  if (operator === 'CROSS_ABOVE') return prevA <= prevB && currA > currB;
  if (operator === 'CROSS_BELOW') return prevA >= prevB && currA < currB;
  return false;
}

// ─── SubSignal Evaluation ────────────────────────────────────────────────────

/**
 * Evaluates a single SubSignal against the current market context.
 * Returns true if the condition is currently met, false otherwise.
 *
 * If the required metric data is missing from the context (e.g. Phase 5 API
 * not yet connected), returns false gracefully rather than throwing.
 */
export function evaluateSubSignal(
  signal: SubSignal,
  context: MarketContext
): boolean {
  const dataPoint = context.values[signal.metric];

  // Metric not available — condition cannot be evaluated, treat as unmet
  if (!dataPoint) return false;

  const { current, previous } = dataPoint;

  // ── Crossover operators ──────────────────────────────────────────────────
  if (signal.operator === 'CROSS_ABOVE' || signal.operator === 'CROSS_BELOW') {
    // Metric-vs-metric crossover (e.g., EMA50 crossing EMA200)
    if (signal.targetMetric) {
      const targetPoint = context.values[signal.targetMetric];
      if (!targetPoint) return false;
      return evaluateMetricCrossover(
        previous, current,
        signal.operator,
        targetPoint.previous, targetPoint.current
      );
    }

    // Metric-vs-static crossover (e.g., VIX crossing 25)
    if (signal.targetValue !== undefined) {
      return evaluateStaticCrossover(previous, current, signal.operator, signal.targetValue);
    }

    return false;
  }

  // ── Metric-vs-metric comparison ──────────────────────────────────────────
  if (signal.targetMetric) {
    const targetPoint = context.values[signal.targetMetric];
    if (!targetPoint) return false;
    return evaluateStatic(current, signal.operator, targetPoint.current);
  }

  // ── Static threshold comparison ──────────────────────────────────────────
  if (signal.targetValue !== undefined) {
    return evaluateStatic(current, signal.operator, signal.targetValue);
  }

  return false;
}

// ─── MasterSignal Evaluation ─────────────────────────────────────────────────

/**
 * Evaluates all SubSignals within a MasterSignal and returns a new,
 * updated MasterSignal with all derived fields recalculated.
 *
 * Returns a new object — does not mutate the input.
 * Zustand store calls this and replaces the stored signal with the result.
 */
export function evaluateMasterSignal(
  ms: MasterSignal,
  context: MarketContext
): MasterSignal {
  // Evaluate each condition and produce updated SubSignals
  const updatedConditions = ms.conditions.map((condition) => ({
    ...condition,
    isMet: evaluateSubSignal(condition, context),
  }));

  const total = updatedConditions.length;
  const met = updatedConditions.filter((c) => c.isMet).length;

  // AND: triggered only when ALL conditions are met
  // OR:  triggered when ANY condition is met
  const isTriggered =
    total === 0
      ? false
      : ms.logicMode === 'AND'
        ? met === total
        : met > 0;

  return {
    ...ms,
    conditions: updatedConditions,
    totalConditions: total,
    metConditions: met,
    completionPercentage: total === 0 ? 0 : Math.round((met / total) * 100),
    isTriggered,
  };
}

/**
 * Convenience: evaluates an entire array of MasterSignals in one pass.
 * Used by the Zustand store's evaluateAll action.
 */
export function evaluateAllMasterSignals(
  signals: MasterSignal[],
  context: MarketContext
): MasterSignal[] {
  return signals.map((ms) => evaluateMasterSignal(ms, context));
}
