'use client';

/**
 * WatchlistTable — dense terminal-style watchlist table.
 *
 * Columns: TICKER | COMPANY NAME | MKT CAP | PRICE | TIER | SCORE | ACTIONS
 *
 * Designed to fit the strict "Bloomberg Terminal" theme.
 */

import type { WatchlistItem } from '@/types/watchlist';
import type { ResearchedCompany } from '@/types/research';
import { TierBadge } from '@/components/research/ResearchUniverseTable';

interface WatchlistTableProps {
  watchlist: WatchlistItem[];
  /** Optional: enriches rows with Titanite research scores. Map<ticker, ResearchedCompany> */
  researchLookup?: Map<string, ResearchedCompany>;
  onRemoveTicker: (ticker: string) => void;
}

const COL_HEADERS = ['TICKER', 'COMPANY NAME', 'MKT CAP (USD)', 'PRICE (NATIVE)', 'TIER', 'SCORE', 'ACTIONS'];

export default function WatchlistTable({ watchlist, researchLookup, onRemoveTicker }: WatchlistTableProps) {
  const fmt = {
    /**
     * Format a price in its native currency.
     * GBp (pence) is divided by 100 and shown as GBP for readability.
     * Zero price means the fetch failed — show a dash instead of a misleading 0.00.
     */
    price: (price: number, currency?: string) => {
      if (!price || price === 0) return '\u2014';
      // London Stock Exchange returns pence (GBp) — convert to pounds for display
      if (currency === 'GBp') return `GBP ${(price / 100).toFixed(2)}`;
      const label = currency ?? 'USD';
      return `${label} ${price.toFixed(2)}`;
    },
    mcap: (v?: number) => {
      if (v === undefined || v === null || v === 0) return '\u2014';
      if (v >= 1_000_000_000_000) return `$${(v / 1_000_000_000_000).toFixed(2)}T`;
      if (v >= 1_000_000_000)     return `$${(v / 1_000_000_000).toFixed(2)}B`;
      if (v >= 1_000_000)          return `$${(v / 1_000_000).toFixed(1)}M`;
      return `$${v.toLocaleString()}`;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
            {COL_HEADERS.map((h) => (
              <th
                key={h}
                className="px-2 py-1.5 text-left font-normal tracking-wider text-[9px]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {watchlist.length === 0 ? (
            <tr>
              <td colSpan={COL_HEADERS.length} className="px-2 py-8 text-center text-neutral-500 font-mono text-[10px]">
                NO STOCKS IN WATCHLIST. ADD TICKERS ABOVE to BEGIN MONITORING.
              </td>
            </tr>
          ) : (
            watchlist.map((item, i) => {
              const research = researchLookup?.get(item.ticker.toUpperCase());
              const companyName = research?.companyName ?? item.name ?? 'Unknown Company';
              
              return (
                <tr
                  key={item.ticker}
                  style={{
                    borderBottom: '1px solid var(--color-border-subtle)',
                    backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  }}
                >
                  {/* Ticker */}
                  <td className="px-2 py-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                    {item.ticker}
                  </td>
                  
                  {/* Company Name */}
                  <td className="px-2 py-1.5 font-mono text-left max-w-[180px] truncate" style={{ color: 'var(--color-text-secondary)' }}>
                    {companyName}
                  </td>
                  
                  {/* Market Cap */}
                  <td className="px-2 py-1.5 tabular-nums text-left font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                    {fmt.mcap(item.marketCap)}
                  </td>
                  
                  {/* Current Price — shown in native currency (SEK, EUR, GBP, USD) */}
                  <td className="px-2 py-1.5 tabular-nums text-left font-semibold text-white min-w-[110px]">
                    {fmt.price(item.price, item.currency)}
                  </td>
                  
                  {/* Tier Badge */}
                  <td className="px-2 py-1.5">
                    {research ? (
                      <TierBadge tier={research.tier} />
                    ) : (
                      <span className="px-1 py-0.2 text-[8px] bg-neutral-900 border border-neutral-700 text-neutral-500 rounded font-mono">
                        UNCOVERED
                      </span>
                    )}
                  </td>
                  
                  {/* Score */}
                  <td className="px-2 py-1.5">
                    {research ? (
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.68rem', fontFamily: 'var(--font-geist-mono)' }}>
                        {research.score.toFixed(1)}/13
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.65rem', fontFamily: 'var(--font-geist-mono)' }}>—</span>
                    )}
                  </td>
                  
                  {/* Actions */}
                  <td className="px-2 py-1.5">
                    <button
                      onClick={() => onRemoveTicker(item.ticker)}
                      className="px-1.5 py-0.2 text-[8px] bg-red-950/20 border border-red-800 text-red-400 hover:bg-red-900 hover:text-white rounded font-mono transition-all duration-150"
                    >
                      [DEL]
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
