/**
 * CatalystRadar — terminal-style table of active Titanite catalysts.
 *
 * Pure display component. Shows all active catalysts sorted by
 * expected date (soonest first), with confidence colour coding.
 */

import type { ResearchCatalyst } from '@/types/research';
import { CONFIDENCE_COLOURS } from '@/types/research';

interface CatalystRadarProps {
  catalysts: ResearchCatalyst[];
}

export default function CatalystRadar({ catalysts }: CatalystRadarProps) {
  const thStyles: React.CSSProperties = {
    color: 'var(--color-muted)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    padding: '6px 10px',
    textAlign: 'left',
    borderBottom: '1px solid var(--color-border)',
    whiteSpace: 'nowrap',
  };

  const tdStyles: React.CSSProperties = {
    padding: '5px 10px',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-geist-mono)',
    verticalAlign: 'middle',
  };

  if (catalysts.length === 0) {
    return (
      <div style={{ padding: '20px', color: 'var(--color-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-geist-mono)' }}>
        NO ACTIVE CATALYSTS — Run `titanite export` to refresh data.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['TICKER', 'CATALYST', 'EXPECTED', 'CONF.', 'THESIS IMPACT'].map((h) => (
              <th key={h} style={thStyles}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {catalysts.map((catalyst, i) => (
            <tr
              key={`${catalyst.ticker}-${i}`}
              className="research-table-row"
            >
              <td style={{ ...tdStyles, fontWeight: 700, color: 'var(--color-accent)' }}>
                {catalyst.ticker}
              </td>
              <td style={{ ...tdStyles, color: 'var(--color-text)', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {catalyst.description}
              </td>
              <td style={{ ...tdStyles, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                {catalyst.expectedDate}
              </td>
              <td style={tdStyles}>
                <span
                  style={{
                    color: CONFIDENCE_COLOURS[catalyst.confidence],
                    fontWeight: 700,
                    fontSize: '0.65rem',
                  }}
                >
                  {catalyst.confidence.toUpperCase()}
                </span>
              </td>
              <td style={{ ...tdStyles, color: 'var(--color-muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {catalyst.thesisImpact || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: '6px 10px', color: 'var(--color-muted)', fontSize: '0.62rem', fontFamily: 'var(--font-geist-mono)' }}>
        {catalysts.length} ACTIVE CATALYSTS · PRE-DRAFT, REQUIRES VERIFICATION
      </div>
    </div>
  );
}
