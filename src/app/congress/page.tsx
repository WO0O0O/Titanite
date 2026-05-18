/**
 * Congress Tracker page — temporarily stubbed out.
 *
 * The Senate/House Stock Watcher S3 feeds are rate-limiting our server-side requests (403).
 * All data-fetching code is preserved in congress.service.ts and CongressContent.tsx.
 * This stub will be removed when a reliable data source is confirmed.
 *
 * See docs/roadmap.md — Stretch Goal S3.
 */

import TerminalWindow from '@/components/layout/TerminalWindow';
import { LandmarkIcon } from 'lucide-react';

export default function CongressPage() {
  return (
    <TerminalWindow title="Congressional Stock Tracker" code="CGS-1">
      <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-sm flex items-center justify-center opacity-30"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <LandmarkIcon size={22} style={{ color: 'var(--color-text-muted)' }} />
        </div>

        {/* Status label */}
        <span
          className="text-[9px] tracking-widest px-2 py-0.5 rounded"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
        >
          FEATURE PAUSED
        </span>

        {/* Heading */}
        <h2
          className="text-[13px] font-semibold tracking-wide"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Congress Tracker — Coming Soon
        </h2>

        {/* Explanation */}
        <p
          className="text-[11px] max-w-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Senate and House Stock Watcher data feeds are currently rate-limiting
          server-side requests. All code is preserved and ready to restore.
          This feature will return in a future update once a reliable data source is confirmed.
        </p>

        {/* What it will show */}
        <div
          className="mt-2 text-[10px] text-left w-full max-w-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <div
            className="px-3 py-2 mb-1"
            style={{ borderLeft: '2px solid var(--color-border)' }}
          >
            Planned: congressional stock disclosures, filterable by politician and ticker
          </div>
          <div
            className="px-3 py-2"
            style={{ borderLeft: '2px solid var(--color-border)' }}
          >
            See <code className="text-[9px]">docs/roadmap.md</code> → Stretch Goal S3
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
}
