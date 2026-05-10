'use client';

/**
 * ConditionRow — a single condition within the Signal Editor.
 *
 * Renders: [metric selector] [operator dropdown] [value input] [alert toggle] [delete]
 *
 * The operator dropdown is automatically filtered to only show operators
 * that are valid for the selected metric (driven by METRIC_REGISTRY).
 *
 * The value input adapts based on metric type:
 *   NUMBER     → numeric text input
 *   CATEGORICAL → dropdown of categorical values (e.g. HAWKISH/NEUTRAL/DOVISH)
 */

import type { SubSignal, Operator } from '@/types/signals';
import { getMetric } from '@/lib/metrics/registry';
import MetricSelector from './MetricSelector';
import { Trash2 } from 'lucide-react';

// Human-readable operator labels
const OPERATOR_LABELS: Record<Operator, string> = {
  '>':          '> (above)',
  '<':          '< (below)',
  '>=':         '>= (at or above)',
  '<=':         '<= (at or below)',
  'EQUALS':     '= (equals)',
  'CROSS_ABOVE':'CROSS ↑ (crosses above)',
  'CROSS_BELOW':'CROSS ↓ (crosses below)',
};

interface ConditionRowProps {
  condition: SubSignal;
  index: number;
  onChange: (updated: SubSignal) => void;
  onDelete: () => void;
}

export default function ConditionRow({ condition, index, onChange, onDelete }: ConditionRowProps) {
  const metricDef = getMetric(condition.metric);

  // Derive which operators are valid for the currently selected metric
  const validOperators = metricDef?.validOperators ?? (Object.keys(OPERATOR_LABELS) as Operator[]);

  const handleMetricChange = (metricId: string) => {
    const newMetric = getMetric(metricId);
    const firstValidOp = newMetric?.validOperators[0] ?? '>';
    // Reset operator and value when metric changes to avoid invalid combinations
    onChange({ ...condition, metric: metricId, operator: firstValidOp, targetValue: undefined, targetMetric: undefined });
  };

  const handleOperatorChange = (op: Operator) => {
    // Clear targetMetric when switching away from metric-vs-metric operators
    const isComparative = op === 'CROSS_ABOVE' || op === 'CROSS_BELOW';
    onChange({
      ...condition,
      operator: op,
      targetMetric: isComparative ? condition.targetMetric : undefined,
    });
  };

  return (
    <div
      className="flex items-center gap-2 px-2 py-2 rounded-sm"
      style={{ backgroundColor: 'var(--color-terminal-800)', border: '1px solid var(--color-border)' }}
    >
      {/* Row index — Bloomberg-style line number */}
      <span className="text-[10px] w-4 shrink-0 text-right" style={{ color: 'var(--color-text-muted)' }}>
        {index + 1}
      </span>

      {/* Metric selector */}
      <div className="w-44 shrink-0">
        <MetricSelector value={condition.metric} onChange={handleMetricChange} />
      </div>

      {/* Operator dropdown */}
      <select
        value={condition.operator}
        onChange={(e) => handleOperatorChange(e.target.value as Operator)}
        className="text-[11px] px-2 py-1 rounded-sm outline-none appearance-none cursor-pointer w-36 shrink-0"
        style={{
          backgroundColor: 'var(--color-terminal-700)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {validOperators.map((op) => (
          <option key={op} value={op}>{OPERATOR_LABELS[op]}</option>
        ))}
      </select>

      {/* Value input — adapts to metric type */}
      <div className="flex-1">
        {metricDef?.valueType === 'CATEGORICAL' ? (
          // Categorical dropdown (e.g. WARSH_SENTIMENT)
          <select
            value={condition.targetValue ?? ''}
            onChange={(e) => onChange({ ...condition, targetValue: Number(e.target.value) })}
            className="w-full text-[11px] px-2 py-1 rounded-sm outline-none appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--color-terminal-700)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <option value="" disabled>— select value —</option>
            {metricDef.categoricalValues?.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        ) : (
          // Numeric input for all other metrics
          <input
            type="number"
            step="any"
            placeholder="value"
            value={condition.targetValue ?? ''}
            onChange={(e) => onChange({ ...condition, targetValue: e.target.value === '' ? undefined : Number(e.target.value) })}
            className="w-full text-[11px] px-2 py-1 rounded-sm outline-none"
            style={{
              backgroundColor: 'var(--color-terminal-700)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
            }}
          />
        )}
      </div>

      {/* Unit label from registry */}
      {metricDef?.unit && (
        <span className="text-[10px] shrink-0 w-4" style={{ color: 'var(--color-text-muted)' }}>
          {metricDef.unit}
        </span>
      )}

      {/* Alert toggle */}
      <button
        type="button"
        title={condition.alertEnabled ? 'Alert ON — click to silence' : 'Alert OFF — click to enable'}
        onClick={() => onChange({ ...condition, alertEnabled: !condition.alertEnabled })}
        className="text-[10px] px-1.5 py-0.5 rounded-sm shrink-0 transition-colors"
        style={{
          color: condition.alertEnabled ? 'var(--color-signal-ok)' : 'var(--color-text-muted)',
          border: `1px solid ${condition.alertEnabled ? 'var(--color-signal-ok)' : 'var(--color-border)'}`,
          backgroundColor: condition.alertEnabled ? 'rgba(0,212,170,0.08)' : 'transparent',
        }}
      >
        ALRT
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={onDelete}
        className="shrink-0 p-1 rounded-sm transition-colors hover:opacity-100 opacity-50"
        style={{ color: 'var(--color-signal-alert)' }}
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}
