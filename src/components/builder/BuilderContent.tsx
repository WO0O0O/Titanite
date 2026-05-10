'use client';

/**
 * BuilderContent — the interactive content of the /builder page.
 *
 * Kept separate from page.tsx so the page can remain a Server Component
 * while all the interactivity (Zustand, useState) lives here.
 *
 * Layout: two TerminalWindows side by side in a flex row.
 *   Left  (280px): MasterSignalList
 *   Right (flex-1): SignalEditor
 */

import { useState } from 'react';
import TerminalWindow from '@/components/layout/TerminalWindow';
import MasterSignalList from './MasterSignalList';
import SignalEditor from './SignalEditor';

export default function BuilderContent() {
  // Controls whether the editor is in "create new" mode
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex gap-3 h-[calc(100vh-var(--spacing-header)-2rem)]">
      {/* Left panel — signal list */}
      <div className="w-72 shrink-0 overflow-hidden rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
        <TerminalWindow title="Master Signals" code="BLD-1">
          <div className="-m-4 h-full"> {/* Negate TerminalWindow padding so list has full control */}
            <MasterSignalList onNew={() => setIsCreating(true)} />
          </div>
        </TerminalWindow>
      </div>

      {/* Right panel — editor */}
      <div className="flex-1 overflow-hidden rounded-sm" style={{ border: '1px solid var(--color-border)' }}>
        <TerminalWindow title="Signal Editor" code="BLD-2">
          <div className="-m-4 h-full">
            <SignalEditor
              isCreating={isCreating}
              onCreatingDone={() => setIsCreating(false)}
            />
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
