'use client';

/**
 * MasterSignalCard — displays one Master Signal with its full evaluation state.
 *
 * Shows: name, logic mode, triggered badge, progress meter, and each condition
 * row with its individual met/unmet state.
 *
 * Uses Zustand to access the live evaluated signal rather than accepting it as
 * a prop — this means the card auto-updates when evaluateAll() runs.
 */

import { useSignalStore } from '@/store/signalStore';
import { useUIStore } from '@/store/uiStore';
import ProgressMeter from '@/components/ui/ProgressMeter';
import Badge from '@/components/ui/Badge';
import StatusDot from '@/components/ui/StatusDot';
import { getMetric } from '@/lib/metrics/registry';
import { useRouter } from 'next/navigation';

interface MasterSignalCardProps {
  signalId: string;
}

export default function MasterSignalCard({ signalId }: MasterSignalCardProps) {
  const ms = useSignalStore((s) => s.masterSignals.find((m) => m.id === signalId));
  const { setSelectedMasterSignalId } = useUIStore();
  const router = useRouter();

  if (!ms) return null;

  const handleEdit = () => {
    setSelectedMasterSignalId(ms.id);
    router.push('/builder');
  };

  return (
    <div
      className="flex flex-col rounded-sm overflow-hidden"
      style={{
        border: `1px solid ${ms.isTriggered ? 'var(--color-signal-alert)' : 'var(--color-border)'}`,
        backgroundColor: ms.isTriggered ? 'rgba(255,77,77,0.04)' : 'var(--color-terminal-900)',
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-[11px] font-semibold truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {ms.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[9px] px-1 py-0.5 rounded-sm"
            style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
            {ms.logicMode}
          </span>
          {ms.isTriggered
            ? <Badge status="triggered" />
            : ms.metConditions > 0
              ? <Badge status="partial" />
              : <Badge status="inactive" />
          }
        </div>
      </div>

      {/* Progress meter */}
      <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            COMPLETION
          </span>
          <span className="text-[10px] tabular-nums"
            style={{ color: ms.isTriggered ? 'var(--color-signal-alert)' : 'var(--color-text-secondary)' }}>
            {ms.completionPercentage}%
          </span>
        </div>
        <ProgressMeter
          percentage={ms.completionPercentage}
          isTriggered={ms.isTriggered}
          label={`${ms.metConditions}/${ms.totalConditions}`}
        />
      </div>

      {/* Conditions list */}
      <div className="flex-1 px-3 py-2 flex flex-col gap-1">
        {ms.conditions.map((condition) => {
          const metric = getMetric(condition.metric);
          return (
            <div key={condition.id} className="flex items-center gap-2">
              <StatusDot status={condition.isMet ? 'ok' : 'neutral'} />
              <span className="text-[10px] truncate flex-1" style={{ color: condition.isMet ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                {metric?.shortLabel ?? condition.metric}{' '}
                {condition.operator}{' '}
                {condition.targetValue !== undefined ? condition.targetValue : condition.targetMetric}
                {metric?.unit ? ` ${metric.unit}` : ''}
              </span>
              {!condition.alertEnabled && (
                <span className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>SILENT</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer: edit link */}
      <button
        type="button"
        onClick={handleEdit}
        className="px-3 py-1.5 text-left text-[9px] tracking-wider transition-opacity opacity-40 hover:opacity-100"
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          color: 'var(--color-accent)',
        }}
      >
        EDIT IN BUILDER →
      </button>
    </div>
  );
}
