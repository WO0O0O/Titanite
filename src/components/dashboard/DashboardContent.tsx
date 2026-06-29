'use client';

/**
 * DashboardContent — the interactive content of the /dashboard page.
 *
 * Wired to:
 *   useMarketData() → feeds MacroPillarsBar + triggers evaluateAll()
 *   useWatchlist()  → client-side custom watchlist backed by LocalStorage.
 */

import { useEffect, useState } from 'react';
import { useSignalStore } from '@/store/signalStore';
import { useUIStore } from '@/store/uiStore';
import { useMarketData } from '@/hooks/useMarketData';
import { useWatchlist } from '@/hooks/useHoldings';
import { useWatchlistStore } from '@/store/watchlistStore';
import { useResearchCompanies } from '@/hooks/useResearchCompanies';
import MacroPillarsBar from './MacroPillarsBar';
import MasterSignalCard from './MasterSignalCard';
import WatchlistTable from './WatchlistTable';
import TerminalWindow from '@/components/layout/TerminalWindow';
import { ArrowLeftRight } from 'lucide-react';

export default function DashboardContent() {
  const masterSignals = useSignalStore((s) => s.masterSignals);
  const { evaluateAll } = useSignalStore();
  const { dashboardLayout, setDashboardLayout } = useUIStore();
  const triggeredCount = masterSignals.filter((ms) => ms.isTriggered).length;

  const [newTicker, setNewTicker] = useState('');

  const { data: marketData } = useMarketData();
  const { data: researchPayload } = useResearchCompanies();
  
  const tickers = useWatchlistStore((s) => s.tickers);
  const { addTicker, removeTicker, initWatchlist } = useWatchlistStore();

  const { data: watchlistData } = useWatchlist(tickers);

  // Initialize watchlist from LocalStorage on mount
  useEffect(() => {
    initWatchlist();
  }, [initWatchlist]);

  const researchLookup = researchPayload
    ? new Map(researchPayload.companies.map((c) => [c.ticker.toUpperCase(), c]))
    : undefined;

  // When real market data loads, re-evaluate all signals against live context
  useEffect(() => {
    if (marketData?.context) {
      evaluateAll(marketData.context);
    }
  }, [marketData, evaluateAll]);

  // Compute watchlist stats for the summary bar
  const totalWatched = tickers.length;
  let researchedCount = 0;
  let tier1Count = 0;
  let tier2Count = 0;

  tickers.forEach((t) => {
    const research = researchLookup?.get(t.toUpperCase());
    if (research) {
      researchedCount++;
      if (research.tier === 'Tier 1') tier1Count++;
      if (research.tier === 'Tier 2') tier2Count++;
    }
  });

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newTicker.trim().toUpperCase();
    if (clean) {
      addTicker(clean);
      setNewTicker('');
    }
  };

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

  const watchlistContent = (
    <div className={`${dashboardLayout === 'SIGNALS_PRIMARY' ? "w-[520px] shrink-0" : "flex-1 min-w-0"} flex flex-col gap-3 min-h-0`}>
      {/* Watchlist summary strip */}
      <div
        className="shrink-0 grid grid-cols-4 text-center"
        style={{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-terminal-900)',
          borderRadius: '2px',
        }}
      >
        {[
          { label: 'WATCHED STOCKS', value: totalWatched.toString() },
          { label: 'RESEARCHED', value: researchedCount.toString() },
          {
            label: 'TIER 1 COVERAGE',
            value: tier1Count.toString(),
            color: 'var(--color-accent)',
          },
          {
            label: 'TIER 2 COVERAGE',
            value: tier2Count.toString(),
            color: 'var(--color-text-secondary)',
          },
        ].map(({ label, value, color }, i) => (
          <div key={label} className="py-2 px-2"
            style={{ borderLeft: i > 0 ? '1px solid var(--color-border)' : undefined }}>
            <div className="text-[9px] tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
            <div className="text-[11px] tabular-nums font-semibold" style={{ color: color ?? 'var(--color-text-primary)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Watchlist table */}
      <div className="flex-1 overflow-hidden">
        <TerminalWindow title="Custom Watchlist" code="DSH-2" rightSlot={
          <div className="flex items-center gap-4">
            <form onSubmit={handleAddStock} className="flex items-center gap-1">
              <input
                type="text"
                placeholder="ADD TICKER (E.G. PLTR)"
                value={newTicker}
                onChange={(e) => setNewTicker(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-[10px] px-1.5 py-0.5 rounded text-white focus:outline-none focus:border-[var(--color-accent)] placeholder:text-neutral-700 font-mono w-[140px]"
              />
              <button type="submit" className="border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black text-[9px] px-1.5 py-0.5 rounded font-mono transition-all">
                ADD
              </button>
            </form>
            {dashboardLayout === 'SIGNALS_PRIMARY' && <LayoutToggleButton />}
          </div>
        }>
          <div className="-m-4 overflow-y-auto h-full">
            <WatchlistTable 
              watchlist={watchlistData?.quotes ?? []} 
              researchLookup={researchLookup} 
              onRemoveTicker={removeTicker} 
            />
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
            {watchlistContent}
          </>
        ) : (
          <>
            {watchlistContent}
            {signalsContent}
          </>
        )}
      </div>
    </div>
  );
}

