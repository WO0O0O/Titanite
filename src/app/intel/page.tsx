import TerminalWindow from '@/components/layout/TerminalWindow';

/**
 * Intel Hub page — stub for Phase 2.
 * Will be populated in Phase 4 with IntelFeed and FedWatchPanel.
 */
export default function IntelPage() {
  return (
    <TerminalWindow title="Intel Hub" code="INT" rightSlot="PROTOTYPE MODE">
      <p style={{ color: 'var(--color-text-muted)' }}>
        Intel Hub content coming in Phase 4.
      </p>
    </TerminalWindow>
  );
}
