/**
 * HoldingsTable — dense terminal-style portfolio table.
 *
 * Columns: TICKER | NAME | QTY | AVG | LAST | P&L | P&L% | VALUE | 24H%
 *
 * Positive values are coloured neon green, negative red — matching Bloomberg
 * convention. No row hover effects other than a subtle background shift.
 *
 * Pure display component — accepts holdings as props so it can be used
 * with both mock data and future T212 API data without changes.
 */

import type { Holding } from '@/types/holdings';

interface HoldingsTableProps {
  holdings: Holding[];
}

const COL_HEADERS = ['TICKER', 'COMPANY', 'QTY', 'AVG', 'LAST', 'P&L', 'P&L%', 'VALUE', '24H%'];

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  const fmt = {
    price: (v: number) => `$${v.toFixed(2)}`,
    pct: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`,
    qty: (v: number) => v.toLocaleString(),
    value: (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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
          {holdings.map((h, i) => (
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
              <td className="px-2 py-1.5 truncate max-w-[120px]" style={{ color: 'var(--color-text-secondary)' }}>
                {h.name}
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
              <td className="px-2 py-1.5 tabular-nums text-right" style={{ color: pnlColor(h.percentageChange24h) }}>
                {fmt.pct(h.percentageChange24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
