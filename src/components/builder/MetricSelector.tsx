'use client';

/**
 * MetricSelector — a grouped dropdown for selecting a metric from METRIC_REGISTRY.
 *
 * Grouped by category so users can navigate quickly.
 * In a later phase this can be upgraded to a searchable combobox
 * when hundreds of metrics are registered — the METRIC_REGISTRY structure
 * already supports this without any type changes.
 */

import { METRIC_REGISTRY, getMetricsByCategory, type MetricCategory } from '@/lib/metrics/registry';

// Human-readable category labels for the optgroup headers
const CATEGORY_LABELS: Record<MetricCategory, string> = {
  MACRO:      '── MACRO',
  VOLATILITY: '── VOLATILITY',
  EQUITY:     '── EQUITY',
  TECHNICAL:  '── TECHNICAL',
  COMMODITY:  '── COMMODITY',
  SENTIMENT:  '── SENTIMENT',
  INDEX:      '── INDEX',
  ETF:        '── ETF',
};

interface MetricSelectorProps {
  value: string;
  onChange: (metricId: string) => void;
  /** If provided, excludes this metric ID from the list (avoids self-referential conditions) */
  exclude?: string;
}

export default function MetricSelector({ value, onChange, exclude }: MetricSelectorProps) {
  const grouped = getMetricsByCategory();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-[11px] px-2 py-1 rounded-sm outline-none appearance-none cursor-pointer"
      style={{
        backgroundColor: 'var(--color-terminal-700)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <option value="" disabled>— select metric —</option>

      {(Object.entries(grouped) as [MetricCategory, typeof METRIC_REGISTRY][]).map(
        ([category, metrics]) => (
          <optgroup key={category} label={CATEGORY_LABELS[category]}>
            {metrics
              .filter((m) => m.id !== exclude)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.shortLabel} — {m.label}
                </option>
              ))}
          </optgroup>
        )
      )}
    </select>
  );
}
