import TerminalWindow from '@/components/layout/TerminalWindow';

/**
 * Dashboard page — stub for Phase 2.
 * Will be populated in Phase 4 with MasterSignalCards,
 * MacroPillarsBar, and HoldingsTable.
 */
export default function DashboardPage() {
  return (
    <TerminalWindow title="Dashboard" code="DSH" rightSlot="PROTOTYPE MODE">
      <p style={{ color: 'var(--color-text-muted)' }}>
        Dashboard content coming in Phase 4.
      </p>
    </TerminalWindow>
  );
}
