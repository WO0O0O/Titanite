/**
 * StatusDot — a small coloured indicator dot used in tables and lists.
 * Accepts a semantic status rather than a raw colour, keeping all
 * status-to-colour mapping centralised.
 */

type DotStatus = 'ok' | 'alert' | 'warning' | 'neutral';

const COLOR_MAP: Record<DotStatus, string> = {
  ok:      'var(--color-signal-ok)',
  alert:   'var(--color-signal-alert)',
  warning: 'var(--color-signal-warning)',
  neutral: 'var(--color-signal-neutral)',
};

interface StatusDotProps {
  status: DotStatus;
  /** Slightly larger dot for emphasis */
  size?: 'sm' | 'md';
}

export default function StatusDot({ status, size = 'sm' }: StatusDotProps) {
  const dimension = size === 'md' ? '8px' : '6px';

  return (
    <span
      className="rounded-full shrink-0 inline-block"
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: COLOR_MAP[status],
        // Subtle glow on active statuses — keeps the terminal aesthetic alive
        boxShadow: status !== 'neutral' ? `0 0 4px ${COLOR_MAP[status]}80` : undefined,
      }}
    />
  );
}
