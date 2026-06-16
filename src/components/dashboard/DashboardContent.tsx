'use client';

/**
 * DashboardContent — the interactive content of the /dashboard page.
 *
 * Now wired to real data via TanStack Query hooks:
 *   useMarketData() → feeds MacroPillarsBar + triggers evaluateAll()
 *   useHoldings()   → feeds HoldingsTable + PortfolioSummary
 *
 * When NEXT_PUBLIC_USE_MOCK_DATA=true, hooks return mock data instantly.
 * When false, they fetch from /api/market and /api/portfolio.
 */

import { useEffect } from 'react';
import { useSignalStore } from '@/store/signalStore';
import { useUIStore } from '@/store/uiStore';
import { useMarketData } from '@/hooks/useMarketData';
import { useHoldings } from '@/hooks/useHoldings';
import { useResearchCompanies } from '@/hooks/useResearchCompanies';
import MacroPillarsBar from './MacroPillarsBar';
import MasterSignalCard from './MasterSignalCard';
import HoldingsTable from './HoldingsTable';
import TerminalWindow from '@/components/layout/TerminalWindow';
import { ArrowLeftRight } from 'lucide-react';

const fmt = {
  // GBP — user is UK-based; T212 account is denominated in £
  value: (v: number) => `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  pct: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`,
};

export default function DashboardContent() {
  const masterSignals = useSignalStore((s) => s.masterSignals);
  const { evaluateAll } = useSignalStore();
  const { dashboardLayout, setDashboardLayout } = useUIStore();
  const triggeredCount = masterSignals.filter((ms) => ms.isTriggered).length;

  const { data: marketData } = useMarketData();
  const { data: portfolioData } = useHoldings();
  const { data: researchPayload } = useResearchCompanies();

  const researchLookup = researchPayload
    ? new Map(researchPayload.companies.map((c) => [c.ticker.toUpperCase(), c]))
    : undefined;

  // When real market data loads, re-evaluate all signals against live context
  useEffect(() => {
    if (marketData?.context) {
      evaluateAll(marketData.context);
    }
  }, [marketData, evaluateAll]);

  const holdings  = portfolioData?.holdings  ?? [];
  const portfolio = portfolioData?.summary   ?? { totalInvested: 0, totalValue: 0, totalPnlValue: 0, totalPnlPercent: 0, cashBalance: 0 };

  const LayoutToggleButton = () => (
    <button
      onClick={() => setDashboardLayout(dashboardLayout === 'SIGNALS_PRIMARY' ? 'HOLDINGS_PRIMARY' : 'SIGNALS_PRIMARY')}
      className="flex items-center gap-1.5 px-2 py-0.5 rounded opacity-60 hover:opacity-100 hover:bg-neutral-800 transition-all ml-4"
      title="Toggle Dashboard Layout Focus"
    >
      <ArrowLeftRight size={12} />
      <span>SWAP VIEW</span>
    </button>
  );

  const signalsContent = (
    <div className={dashboardLayout === 'SIGNALS_PRIMARY' ? "flex-1 min-w-0 overflow-hidden" : "w-[420px] shrink-0 overflow-hidden"}>
      <TerminalWindow
        title="Active Master Signals"
        code="DSH-1"
        rightSlot={
          <div className="flex items-center">
            {triggeredCount > 0 ? <span className="text-[var(--color-signal-alert)]">{triggeredCount} TRIGGERED</span> : <span>ALL CLEAR</span>}
            {dashboardLayout === 'HOLDINGS_PRIMARY' && <LayoutToggleButton />}
          </div>
        }
      >
        {masterSignals.length === 0 ? (
          <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            No signals created. Go to Builder to create your first Master Signal.
          </p>
        ) : (
          <div className={`grid gap-3 ${dashboardLayout === 'SIGNALS_PRIMARY' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
            {masterSignals.map((ms) => (
              <MasterSignalCard key={ms.id} signalId={ms.id} />
            ))}
          </div>
        )}
      </TerminalWindow>
    </div>
  );

  const holdingsContent = (
    <div className={`${dashboardLayout === 'SIGNALS_PRIMARY' ? "w-[520px] shrink-0" : "flex-1 min-w-0"} flex flex-col gap-3 min-h-0`}>
      {/* Portfolio summary strip */}
      <div
        className="shrink-0 grid grid-cols-4 text-center"
        style={{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-terminal-900)',
          borderRadius: '2px',
        }}
      >
        {[
          { label: 'INVESTED', value: fmt.value(portfolio.totalInvested) },
          { label: 'VALUE', value: fmt.value(portfolio.totalValue) },
          {
            label: 'P&L',
            value: fmt.value(portfolio.totalPnlValue),
            color: portfolio.totalPnlValue >= 0 ? 'var(--color-signal-ok)' : 'var(--color-signal-alert)',
          },
          {
            label: 'RETURN',
            value: fmt.pct(portfolio.totalPnlPercent),
            color: portfolio.totalPnlPercent >= 0 ? 'var(--color-signal-ok)' : 'var(--color-signal-alert)',
          },
        ].map(({ label, value, color }, i) => (
          <div key={label} className="py-2 px-2"
            style={{ borderLeft: i > 0 ? '1px solid var(--color-border)' : undefined }}>
            <div className="text-[9px] tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
            <div className="text-[11px] tabular-nums font-semibold" style={{ color: color ?? 'var(--color-text-primary)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Holdings table */}
      <div className="flex-1 overflow-hidden">
        <TerminalWindow title="Holdings" code="DSH-2" rightSlot={
          <div className="flex items-center">
            <span style={{ color: 'var(--color-accent)' }}>
              {process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ? 'T212 — MOCK DATA' : 'T212 — LIVE'}
            </span>
            {dashboardLayout === 'SIGNALS_PRIMARY' && <LayoutToggleButton />}
          </div>
        }>
          <div className="-m-4 overflow-y-auto h-full">
            <HoldingsTable holdings={holdings} researchLookup={researchLookup} />
          </div>
        </TerminalWindow>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col gap-0"
      style={{ height: 'calc(100vh - var(--spacing-header) - 2rem)' }}
    >
      {/* ── Macro Pillars strip ─────────────────────────────────────────────── */}
      <MacroPillarsBar />

      {/* ── Main body ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex gap-3 min-h-0 mt-3">
        {dashboardLayout === 'SIGNALS_PRIMARY' ? (
          <>
            {signalsContent}
            {holdingsContent}
          </>
        ) : (
          <>
            {holdingsContent}
            {signalsContent}
          </>
        )}
      </div>
    </div>
  );
}
