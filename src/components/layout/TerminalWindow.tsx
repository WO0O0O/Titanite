/**
 * TerminalWindow is the reusable content wrapper that gives each page
 * the "pane inside a terminal" feel. It provides the section label
 * (top-left) and a consistent inner padding and border.
 *
 * Usage:
 *   <TerminalWindow title="DASHBOARD" code="DSH">
 *     ...page content
 *   </TerminalWindow>
 */

interface TerminalWindowProps {
  /** Large section title shown in the top-left chrome bar */
  title: string;
  /** Short terminal code shown next to the title */
  code: string;
  children: React.ReactNode;
  /** Optional right-side content for the chrome bar (e.g. a timestamp) */
  rightSlot?: React.ReactNode;
}

export default function TerminalWindow({
  title,
  code,
  children,
  rightSlot,
}: TerminalWindowProps) {
  return (
    <div
      className="flex flex-col h-full rounded-sm overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
    >
      {/* Chrome bar — mimics the top bar of a Bloomberg window pane */}
      <div
        className="flex items-center justify-between px-3 py-1.5 shrink-0"
        style={{
          backgroundColor: 'var(--color-terminal-800)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center gap-2">
          {/* Short code — the Bloomberg-style window identifier */}
          <span
            className="text-[10px] tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {code}
          </span>
          <span
            className="text-[11px] tracking-wider uppercase font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </span>
        </div>

        {rightSlot && (
          <div
            className="text-[10px]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {rightSlot}
          </div>
        )}
      </div>

      {/* Content area */}
      <div
        className="flex-1 overflow-auto p-4"
        style={{ backgroundColor: 'var(--color-terminal-black)' }}
      >
        {children}
      </div>
    </div>
  );
}
