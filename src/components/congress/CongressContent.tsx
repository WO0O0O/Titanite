'use client';

/**
 * CongressContent — client component for the /congress page.
 *
 * All filtering is client-side for the prototype (useState).
 * In Phase 5 this is replaced by filtered server fetches.
 *
 * Layout:
 *   Top: Filter bar (politician name, ticker, chamber, trade type)
 *   Below: Trades table
 */

import { useState, useMemo } from 'react';
import { MOCK_CONGRESS_TRADES } from '@/lib/mock/congress.mock';
import TerminalWindow from '@/components/layout/TerminalWindow';
import type { CongressTrade } from '@/types/congress';

// Table headers with alignment hints
const HEADERS: Array<{ label: string; align?: 'right' }> = [
  { label: 'DISC DATE' },
  { label: 'POLITICIAN' },
  { label: 'CHMBR' },
  { label: 'PTY' },
  { label: 'TICKER' },
  { label: 'TYPE' },
  { label: 'AMOUNT' },
  { label: 'SOURCE' },
];

const PARTY_COLOR: Record<string, string> = {
  D: 'var(--color-accent)',
  R: 'var(--color-signal-alert)',
  I: 'var(--color-signal-warning)',
};

export default function CongressContent() {
  const [politicianFilter, setPoliticianFilter] = useState('');
  const [tickerFilter, setTickerFilter] = useState('');
  const [chamberFilter, setChamberFilter] = useState<'ALL' | 'SENATE' | 'HOUSE'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');

  // Client-side filtering — pure derived state from filters
  const filtered = useMemo(() => {
    return MOCK_CONGRESS_TRADES.filter((t: CongressTrade) => {
      if (politicianFilter && !t.politician.toLowerCase().includes(politicianFilter.toLowerCase())) return false;
      if (tickerFilter && !t.ticker.toLowerCase().includes(tickerFilter.toLowerCase())) return false;
      if (chamberFilter !== 'ALL' && t.chamber !== chamberFilter) return false;
      if (typeFilter !== 'ALL' && t.tradeType !== typeFilter) return false;
      return true;
    });
  }, [politicianFilter, tickerFilter, chamberFilter, typeFilter]);

  const inputStyle = {
    backgroundColor: 'var(--color-terminal-800)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
    fontFamily: 'var(--font-mono)',
  };

  return (
    <div
      className="flex flex-col gap-3"
      style={{ height: 'calc(100vh - var(--spacing-header) - 2rem)' }}
    >
      {/* Filter bar */}
      <div
        className="flex items-center gap-3 px-3 py-2 shrink-0 rounded-sm flex-wrap"
        style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-terminal-900)' }}
      >
        <span className="text-[9px] tracking-widest shrink-0" style={{ color: 'var(--color-text-muted)' }}>
          FILTER:
        </span>

        <input
          type="text"
          placeholder="Politician name..."
          value={politicianFilter}
          onChange={(e) => setPoliticianFilter(e.target.value)}
          className="text-[11px] px-2 py-1 rounded-sm outline-none w-44"
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Ticker..."
          value={tickerFilter}
          onChange={(e) => setTickerFilter(e.target.value)}
          className="text-[11px] px-2 py-1 rounded-sm outline-none w-24"
          style={inputStyle}
        />

        {/* Chamber toggle */}
        <div className="flex gap-1">
          {(['ALL', 'SENATE', 'HOUSE'] as const).map((c) => (
            <button key={c} type="button" onClick={() => setChamberFilter(c)}
              className="text-[10px] px-2 py-0.5 rounded-sm transition-colors"
              style={{
                color: chamberFilter === c ? 'var(--color-terminal-black)' : 'var(--color-text-secondary)',
                backgroundColor: chamberFilter === c ? 'var(--color-accent)' : 'transparent',
                border: '1px solid var(--color-accent)',
              }}>{c}</button>
          ))}
        </div>

        {/* Trade type toggle */}
        <div className="flex gap-1">
          {(['ALL', 'BUY', 'SELL'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTypeFilter(t)}
              className="text-[10px] px-2 py-0.5 rounded-sm transition-colors"
              style={{
                color: typeFilter === t ? 'var(--color-terminal-black)' : 'var(--color-text-secondary)',
                backgroundColor: typeFilter === t
                  ? t === 'BUY' ? 'var(--color-signal-ok)' : t === 'SELL' ? 'var(--color-signal-alert)' : 'var(--color-text-secondary)'
                  : 'transparent',
                border: `1px solid ${t === 'BUY' ? 'var(--color-signal-ok)' : t === 'SELL' ? 'var(--color-signal-alert)' : 'var(--color-text-secondary)'}`,
              }}>{t}</button>
          ))}
        </div>

        <span className="ml-auto text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Trades table */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TerminalWindow title="Congressional Stock Disclosures" code="CGS-1" rightSlot="MOCK DATA — SENATE + HOUSE WATCHER">
          <div className="-m-4 overflow-auto h-full">
            <table className="w-full text-[11px] border-collapse">
              <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-terminal-800)' }}>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {HEADERS.map((h) => (
                    <th key={h.label}
                      className="px-3 py-2 text-left font-normal tracking-wider text-[9px]"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-4 text-center text-[11px]"
                      style={{ color: 'var(--color-text-muted)' }}>
                      No trades match current filters.
                    </td>
                  </tr>
                )}
                {filtered.map((trade, i) => (
                  <tr key={trade.id}
                    style={{
                      borderBottom: '1px solid var(--color-border-subtle)',
                      backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    }}>
                    <td className="px-3 py-1.5 tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                      {trade.disclosureDate}
                    </td>
                    <td className="px-3 py-1.5" style={{ color: 'var(--color-text-primary)' }}>
                      {trade.politician}
                    </td>
                    <td className="px-3 py-1.5 text-[9px]" style={{ color: 'var(--color-text-secondary)' }}>
                      {trade.chamber}
                    </td>
                    <td className="px-3 py-1.5 font-bold text-[10px]"
                      style={{ color: PARTY_COLOR[trade.party] ?? 'var(--color-text-muted)' }}>
                      {trade.party}
                    </td>
                    <td className="px-3 py-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                      {trade.ticker}
                    </td>
                    <td className="px-3 py-1.5 font-semibold"
                      style={{ color: trade.tradeType === 'BUY' ? 'var(--color-signal-ok)' : 'var(--color-signal-alert)' }}>
                      {trade.tradeType}
                    </td>
                    <td className="px-3 py-1.5 text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                      {trade.amountRange}
                    </td>
                    <td className="px-3 py-1.5 text-[9px]" style={{ color: 'var(--color-text-muted)' }}>
                      {trade.source.replace('_WATCHER', '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
