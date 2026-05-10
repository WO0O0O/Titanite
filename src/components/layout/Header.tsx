/**
 * Header is a Server Component — it has no interactivity.
 * Renders the top bar: app name, system status, and a live clock stub.
 * The clock itself is rendered by HeaderClock (client component) to
 * avoid making the whole header a client component unnecessarily.
 */

import HeaderClock from './HeaderClock';

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-4"
      style={{
        height: 'var(--spacing-header)',
        backgroundColor: 'var(--color-terminal-900)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Left: App identity — Bloomberg-style product name */}
      <div className="flex items-center gap-3 w-[var(--spacing-sidebar)] shrink-0">
        {/* Neon accent bar mimicking Bloomberg's orange bar */}
        <span
          className="w-1 h-5 rounded-sm"
          style={{ backgroundColor: 'var(--color-signal-ok)' }}
        />
        <span
          className="text-[12px] font-bold tracking-widest uppercase"
          style={{ color: 'var(--color-text-primary)' }}
        >
          MKT SENTINEL
        </span>
      </div>

      {/* Centre: System status indicators */}
      <div className="flex-1 flex items-center gap-6 px-4">
        <StatusPill label="FEED" status="ok" value="MOCK" />
        <StatusPill label="T212" status="warning" value="NO KEY" />
        <StatusPill label="YF" status="ok" value="LIVE" />
        <StatusPill label="DATA" status="warning" value="15M DLY" />
      </div>

      {/* Right: Live clock */}
      <div
        className="text-[11px] tabular-nums"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <HeaderClock />
      </div>
    </header>
  );
}

/**
 * StatusPill displays a small terminal-style status indicator.
 * Keeps status logic co-located with the header since it has no
 * business logic — purely presentational.
 */
function StatusPill({
  label,
  status,
  value,
}: {
  label: string;
  status: 'ok' | 'warning' | 'alert' | 'neutral';
  value: string;
}) {
  const colourMap = {
    ok: 'var(--color-signal-ok)',
    warning: 'var(--color-signal-warning)',
    alert: 'var(--color-signal-alert)',
    neutral: 'var(--color-signal-neutral)',
  };

  return (
    <div className="flex items-center gap-1.5">
      {/* Status dot */}
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colourMap[status] }}
      />
      <span
        className="text-[10px] tracking-wider"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </span>
      <span
        className="text-[10px]"
        style={{ color: colourMap[status] }}
      >
        {value}
      </span>
    </div>
  );
}
