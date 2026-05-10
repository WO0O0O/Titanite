/**
 * ProgressMeter — horizontal fill bar showing MS completion percentage.
 *
 * Colour logic mirrors risk escalation:
 *   0%         → grey  (no conditions met)
 *   1–99%, unTriggered → amber (building toward alert)
 *   triggered  → red   (all AND conditions met, or any OR condition met)
 */

interface ProgressMeterProps {
  percentage: number;       // 0–100
  isTriggered: boolean;
  /** Optional label shown to the right of the bar (e.g. "2/4") */
  label?: string;
}

export default function ProgressMeter({ percentage, isTriggered, label }: ProgressMeterProps) {
  const clampedPct = Math.min(100, Math.max(0, percentage));

  // Colour escalates with risk state
  const barColor = isTriggered
    ? 'var(--color-signal-alert)'
    : clampedPct > 0
      ? 'var(--color-signal-warning)'
      : 'var(--color-signal-neutral)';

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Track */}
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-terminal-600)' }}
      >
        {/* Fill — width animated via inline style for precision */}
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clampedPct}%`, backgroundColor: barColor }}
        />
      </div>

      {/* Label */}
      {label && (
        <span
          className="text-[10px] tabular-nums shrink-0 w-8 text-right"
          style={{ color: barColor }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
