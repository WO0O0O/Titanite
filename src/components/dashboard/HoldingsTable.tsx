/**
 * HoldingsTable — dense terminal-style portfolio table.
 *
 * Columns: TICKER | NAME | QTY | AVG | LAST | P&L | P&L% | VALUE | 24H% | TIER
 *
 * Positive values are coloured neon green, negative red — matching Bloomberg
 * convention. No row hover effects other than a subtle background shift.
 *
 * Pure display component — accepts holdings as props so it can be used
 * with both mock data and future T212 API data without changes.
 *
 * The optional `researchLookup` prop enriches rows with Titanite conviction scores.
 * Pass the Map from buildResearchLookup() in research.service.ts.
 */

import type { Holding } from '@/types/holdings';
import type { ResearchedCompany } from '@/types/research';
import { TIER_COLOURS } from '@/types/research';
import { TierBadge } from '@/components/research/ResearchUniverseTable';

interface HoldingsTableProps {
  holdings: Holding[];
  /** Optional: enriches rows with Titanite research scores. Map<ticker, ResearchedCompany> */
  researchLookup?: Map<string, ResearchedCompany>;
}

// P&L (£) → from T212 ppl field (FX-adjusted by T212, already in GBP)
// P&L%     → pure price ratio (currency-neutral)
// VALUE    → GBP (server-side FX conversion via live GBPUSD=X rate)
// AVG/LAST → native instrument currency (USD for US stocks)
const COL_HEADERS = ['TICKER', 'MKT CAP $', 'QTY', 'AVG $', 'LAST $', 'P&L (£)', 'P&L%', 'VALUE (£)', '24H%', 'TIER'];

export default function HoldingsTable({ holdings, researchLookup }: HoldingsTableProps) {
  const fmt = {
    price: (v: number) => `$${v.toFixed(2)}`,
    pct: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`,
    qty: (v: number) => v.toLocaleString(),
    value: (v: number) => `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    mcap: (v?: number) => {
      if (v === undefined || v === null) return '—';
      if (v >= 1_000_000_000_000) return `$${(v / 1_000_000_000_000).toFixed(2)}T`;
      if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`;
      if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
      return `$${v.toLocaleString()}`;
    }
  };

  const pnlColor = (v: number) =>
    v >= 0 ? 'var(--color-signal-ok)' : 'var(--color-signal-alert)';

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
          {holdings.map((h, i) => {
            const research = researchLookup?.get(h.ticker.toUpperCase());
            return (
              <tr
                key={h.ticker}
                style={{
                  borderBottom: '1px solid var(--color-border-subtle)',
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                <td className="px-2 py-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                  {h.ticker}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {fmt.mcap(h.marketCap)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: 'var(--color-text-primary)' }}>
                  {fmt.qty(h.quantity)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: 'var(--color-text-secondary)' }}>
                  {fmt.price(h.averagePrice)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {fmt.price(h.currentPrice)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: pnlColor(h.pnlValue) }}>
                  {h.pnlValue >= 0 ? '+' : ''}{fmt.value(h.pnlValue)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: pnlColor(h.pnlPercent) }}>
                  {fmt.pct(h.pnlPercent)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: 'var(--color-text-primary)' }}>
                  {fmt.value(h.totalValue)}
                </td>
                <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: h.percentageChange24h === 0 ? 'var(--color-text-muted)' : pnlColor(h.percentageChange24h) }}>
                  {h.percentageChange24h === 0 ? 'N/A' : fmt.pct(h.percentageChange24h)}
                </td>
                {/* Research enrichment column — shows Titanite tier if this ticker is covered */}
                <td className="px-2 py-1.5">
                  {research ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
                      <TierBadge tier={research.tier} />
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.58rem', fontFamily: 'var(--font-geist-mono)' }}>
                        {research.score.toFixed(1)}/13
                      </span>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--color-muted)', fontSize: '0.65rem', fontFamily: 'var(--font-geist-mono)' }}>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
