'use client';

/**
 * Sidebar provides app-wide navigation.
 * Must be 'use client' to use usePathname() for active link highlighting.
 *
 * Layout: fixed left panel, full height, sits below the header.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sliders,
  Newspaper,
  LandmarkIcon,
  FlaskConical,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** Short terminal-style code shown next to the label */
  code: string;
  /** If true, renders as a non-clickable greyed item with a SOON badge */
  disabled?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    code: 'DSH',
    icon: <LayoutDashboard size={14} />,
  },
  {
    href: '/builder',
    label: 'Signal Builder',
    code: 'BLD',
    icon: <Sliders size={14} />,
  },
  {
    href: '/intel',
    label: 'Intel Hub',
    code: 'INT',
    icon: <Newspaper size={14} />,
  },
  {
    href: '/research',
    label: 'Research',
    code: 'RSH',
    icon: <FlaskConical size={14} />,
  },
  {
    href: '/congress',
    label: 'Congress',
    code: 'CGS',
    icon: <LandmarkIcon size={14} />,
    // Paused: Senate/House Watcher S3 feeds are rate-limiting. Restored in a future phase.
    disabled: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-[var(--spacing-header)] bottom-0 w-[var(--spacing-sidebar)] flex flex-col"
      style={{
        backgroundColor: 'var(--color-terminal-900)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Navigation section label — Bloomberg-style section header */}
      <div
        className="px-3 py-2 text-[10px] tracking-widest uppercase"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Navigation
      </div>

      <nav className="flex-1 flex flex-col gap-px px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = !item.disabled && pathname.startsWith(item.href);

          // Disabled items render as a non-interactive div to avoid routing to a broken page
          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-2 px-2 py-2 rounded-sm text-[12px] cursor-not-allowed opacity-40"
                style={{ color: 'var(--color-text-muted)' }}
                title="Coming soon — feature paused"
              >
                <span className="text-[10px] w-7 shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                  {item.code}
                </span>
                <span className="flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </span>
                <span
                  className="ml-auto text-[8px] px-1 py-0.5 rounded tracking-widest"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  SOON
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-2 py-2 rounded-sm text-[12px] transition-colors duration-100',
                isActive
                  ? 'text-[var(--color-signal-ok)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-terminal-800)]'
              )}
              style={
                isActive
                  ? { backgroundColor: 'var(--color-terminal-800)' }
                  : undefined
              }
            >
              {/* Terminal-style code prefix */}
              <span
                className="text-[10px] w-7 shrink-0"
                style={{
                  color: isActive
                    ? 'var(--color-signal-ok)'
                    : 'var(--color-text-muted)',
                }}
              >
                {item.code}
              </span>

              <span className="flex items-center gap-1.5">
                {item.icon}
                {item.label}
              </span>

              {/* Active indicator bar on the right */}
              {isActive && (
                <span
                  className="ml-auto w-0.5 h-4 rounded-full"
                  style={{ backgroundColor: 'var(--color-signal-ok)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer — version info, mimics Bloomberg terminal bottom bar */}
      <div
        className="px-3 py-3 text-[10px]"
        style={{
          color: 'var(--color-text-muted)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div>TITANITE RESEARCH TERMINAL</div>
        <div>v0.2.0 — RESEARCH INTEGRATED</div>
      </div>
    </aside>
  );
}
