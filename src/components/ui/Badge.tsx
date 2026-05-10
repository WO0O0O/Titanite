/**
 * Badge — terminal-style status label.
 * Keeps status-to-colour logic in one place so components
 * never hard-code colours directly.
 */

import { cn } from '@/lib/utils/cn';

type BadgeStatus = 'triggered' | 'partial' | 'inactive' | 'ok' | 'warning';

const STATUS_MAP: Record<BadgeStatus, { label: string; color: string; bg: string }> = {
  triggered: { label: 'ALERT',    color: 'var(--color-signal-alert)',   bg: 'rgba(255,77,77,0.12)'   },
  partial:   { label: 'ACTIVE',   color: 'var(--color-signal-warning)', bg: 'rgba(245,166,35,0.12)'  },
  inactive:  { label: 'INACTIVE', color: 'var(--color-signal-neutral)', bg: 'rgba(122,138,160,0.10)' },
  ok:        { label: 'OK',       color: 'var(--color-signal-ok)',      bg: 'rgba(0,212,170,0.12)'   },
  warning:   { label: 'WARN',     color: 'var(--color-signal-warning)', bg: 'rgba(245,166,35,0.12)'  },
};

interface BadgeProps {
  status: BadgeStatus;
  /** Override the default label derived from status */
  label?: string;
  className?: string;
}

export default function Badge({ status, label, className }: BadgeProps) {
  const { label: defaultLabel, color, bg } = STATUS_MAP[status];

  return (
    <span
      className={cn('inline-flex items-center px-1.5 py-0.5 text-[10px] tracking-wider rounded-sm', className)}
      style={{ color, backgroundColor: bg, border: `1px solid ${color}30` }}
    >
      {label ?? defaultLabel}
    </span>
  );
}
