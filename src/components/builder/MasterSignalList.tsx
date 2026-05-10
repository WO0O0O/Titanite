'use client';

/**
 * MasterSignalList — left panel of the Signal Builder.
 *
 * Shows all saved Master Signals as compact terminal rows.
 * Selecting a row loads it into the SignalEditor on the right.
 * The [+ NEW] button clears the editor for a new signal.
 */

import { useSignalStore } from '@/store/signalStore';
import { useUIStore } from '@/store/uiStore';
import StatusDot from '@/components/ui/StatusDot';
import ProgressMeter from '@/components/ui/ProgressMeter';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MasterSignalListProps {
  /** Called when the user wants to create a new signal */
  onNew: () => void;
}

export default function MasterSignalList({ onNew }: MasterSignalListProps) {
  const masterSignals = useSignalStore((s) => s.masterSignals);
  const { selectedMasterSignalId, setSelectedMasterSignalId } = useUIStore();

  // Derive dot status from signal evaluation state
  const getDotStatus = (isTriggered: boolean, metConditions: number) => {
    if (isTriggered) return 'alert' as const;
    if (metConditions > 0) return 'warning' as const;
    return 'neutral' as const;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-3 py-2 shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <span className="text-[11px] tracking-wider uppercase" style={{ color: 'var(--color-text-secondary)' }}>
          Master Signals
          <span className="ml-2 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
            ({masterSignals.length})
          </span>
        </span>

        {/* New signal button */}
        <button
          type="button"
          onClick={() => { setSelectedMasterSignalId(null); onNew(); }}
          className="flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] transition-colors"
          style={{
            color: 'var(--color-signal-ok)',
            border: '1px solid var(--color-signal-ok)',
            backgroundColor: 'rgba(0,212,170,0.08)',
          }}
        >
          <Plus size={10} /> NEW
        </button>
      </div>

      {/* Signal rows */}
      <div className="flex-1 overflow-y-auto">
        {masterSignals.length === 0 && (
          <div className="px-3 py-4 text-center text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            No signals yet. Click NEW to create one.
          </div>
        )}

        {masterSignals.map((ms) => {
          const isSelected = ms.id === selectedMasterSignalId;

          return (
            <button
              key={ms.id}
              type="button"
              onClick={() => { setSelectedMasterSignalId(ms.id); }}
              className={cn(
                'w-full text-left px-3 py-2.5 flex flex-col gap-1.5 transition-colors',
                isSelected ? '' : 'hover:opacity-80'
              )}
              style={{
                backgroundColor: isSelected ? 'var(--color-terminal-700)' : 'transparent',
                borderBottom: '1px solid var(--color-border-subtle)',
                borderLeft: isSelected ? '2px solid var(--color-accent)' : '2px solid transparent',
              }}
            >
              {/* Row top: dot, name, logic mode badge */}
              <div className="flex items-center gap-2">
                <StatusDot status={getDotStatus(ms.isTriggered, ms.metConditions)} />
                <span
                  className="flex-1 text-[11px] truncate"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {ms.name}
                </span>
                <span
                  className="text-[9px] px-1 rounded-sm shrink-0"
                  style={{
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {ms.logicMode}
                </span>
              </div>

              {/* Row bottom: progress meter + condition count */}
              <ProgressMeter
                percentage={ms.completionPercentage}
                isTriggered={ms.isTriggered}
                label={`${ms.metConditions}/${ms.totalConditions}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
