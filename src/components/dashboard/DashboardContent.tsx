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
import { useMarketData } from '@/hooks/useMarketData';
import { useHoldings } from '@/hooks/useHoldings';
import MacroPillarsBar from './MacroPillarsBar';
import MasterSignalCard from './MasterSignalCard';
import HoldingsTable from './HoldingsTable';
import TerminalWindow from '@/components/layout/TerminalWindow';

const fmt = {
  value: (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  pct: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`,
};

export default function DashboardContent() {
  const masterSignals = useSignalStore((s) => s.masterSignals);
  const { evaluateAll } = useSignalStore();
  const triggeredCount = masterSignals.filter((ms) => ms.isTriggered).length;

  const { data: marketData } = useMarketData();
  const { data: portfolioData } = useHoldings();

  // When real market data loads, re-evaluate all signals against live context
  useEffect(() => {
    if (marketData?.context) {
      evaluateAll(marketData.context);
    }
  }, [marketData, evaluateAll]);

  const holdings  = portfolioData?.holdings  ?? [];
  const portfolio = portfolioData?.summary   ?? { totalInvested: 0, totalValue: 0, totalPnlValue: 0, totalPnlPercent: 0, cashBalance: 0 };

  return (
    <div
      className="flex flex-col gap-0"
      style={{ height: 'calc(100vh - var(--spacing-header) - 2rem)' }}
    >
      {/* ── Macro Pillars strip ─────────────────────────────────────────────── */}
      <MacroPillarsBar />

      {/* ── Main body ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex gap-3 min-h-0 mt-3">

        {/* Left: Active Signals */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <TerminalWindow
            title="Active Master Signals"
            code="DSH-1"
            rightSlot={triggeredCount > 0 ? `${triggeredCount} TRIGGERED` : 'ALL CLEAR'}
          >
            {masterSignals.length === 0 ? (
              <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                No signals created. Go to Builder to create your first Master Signal.
              </p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {masterSignals.map((ms) => (
                  <MasterSignalCard key={ms.id} signalId={ms.id} />
                ))}
              </div>
            )}
          </TerminalWindow>
        </div>

        {/* Right: Holdings */}
        <div className="w-[520px] shrink-0 flex flex-col gap-3 min-h-0">
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
            <TerminalWindow title="Holdings" code="DSH-2" rightSlot={process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ? 'T212 — MOCK DATA' : 'T212 — LIVE'}>
              <div className="-m-4">
                <HoldingsTable holdings={holdings} />
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </div>
  );
}
