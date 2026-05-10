import TerminalWindow from '@/components/layout/TerminalWindow';

/**
 * Signal Builder page — stub for Phase 2.
 * Will be populated in Phase 3 with SignalEditor and MasterSignalList.
 */
export default function BuilderPage() {
  return (
    <TerminalWindow title="Signal Builder" code="BLD" rightSlot="PROTOTYPE MODE">
      <p style={{ color: 'var(--color-text-muted)' }}>
        Signal Builder content coming in Phase 3.
      </p>
    </TerminalWindow>
  );
}
