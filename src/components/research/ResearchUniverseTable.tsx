/**
 * ResearchUniverseTable — Bloomberg-terminal-style table of all scored companies.
 *
 * Pure display component. Data is passed as props from the /research page Server Component.
 * Columns: TICKER | COMPANY | SCORE | TIER | SECTOR | SUMMARY
 */

'use client';

import { useState, useEffect } from 'react';
import type { ResearchedCompany, ResearchTier } from '@/types/research';
import { TIER_COLOURS } from '@/types/research';
import MarkdownRenderer from './MarkdownRenderer';

interface ResearchUniverseTableProps {
  companies: ResearchedCompany[];
}

type SortKey = 'score' | 'tier' | 'ticker';

const TIER_ORDER: Record<ResearchTier, number> = {
  'Tier 1': 0,
  'Tier 2': 1,
  'Tier 3': 2,
  'Pass': 3,
  'Disqualified': 4,
};

export default function ResearchUniverseTable({ companies }: ResearchUniverseTableProps) {
  const [filter, setFilter] = useState<ResearchTier | 'ALL'>('ALL');
  const [sort, setSort] = useState<SortKey>('score');
  const [search, setSearch] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTicker) {
      setReportContent(null);
      setReportError(null);
      setIsFullScreen(false);
      return;
    }

    setLoadingReport(true);
    setReportError(null);
    setReportContent(null);

    fetch(`/api/research/report?ticker=${selectedTicker}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load report (Status ${res.status})`);
        return res.json();
      })
      .then((data) => {
        setReportContent(data.content);
      })
      .catch((err) => {
        setReportError(err.message);
      })
      .finally(() => {
        setLoadingReport(false);
      });
  }, [selectedTicker]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTicker(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = companies
    .filter((c) => filter === 'ALL' || c.tier === filter)
    .filter(
      (c) =>
        search === '' ||
        c.ticker.toLowerCase().includes(search.toLowerCase()) ||
        c.companyName.toLowerCase().includes(search.toLowerCase()) ||
        c.industryFolder.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'score') return b.score - a.score;
      if (sort === 'tier') return TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || b.score - a.score;
      return a.ticker.localeCompare(b.ticker);
    });

  const tierCounts = {
    ALL: companies.length,
    'Tier 1': companies.filter((c) => c.tier === 'Tier 1').length,
    'Tier 2': companies.filter((c) => c.tier === 'Tier 2').length,
    'Tier 3': companies.filter((c) => c.tier === 'Tier 3').length,
  };

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Controls bar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Filter ticker, name, sector…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: 'var(--color-terminal-800)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.72rem',
            padding: '4px 8px',
            outline: 'none',
            width: '200px',
          }}
        />

        {/* Tier filter buttons */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['ALL', 'Tier 1', 'Tier 2', 'Tier 3'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setFilter(tier)}
              style={{
                background: filter === tier ? 'var(--color-border)' : 'transparent',
                border: '1px solid var(--color-border)',
                color: tier === 'ALL' ? 'var(--color-text)' : filter === tier ? TIER_COLOURS[tier] : 'var(--color-muted)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                padding: '3px 8px',
                cursor: 'pointer',
                fontWeight: filter === tier ? 700 : 400,
              }}
            >
              {tier === 'ALL' ? `ALL (${tierCounts.ALL})` : `${tier} (${tierCounts[tier]})`}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.65rem', alignSelf: 'center' }}>SORT:</span>
          {(['score', 'tier', 'ticker'] as SortKey[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                background: sort === s ? 'var(--color-border)' : 'transparent',
                border: '1px solid var(--color-border)',
                color: sort === s ? 'var(--color-accent)' : 'var(--color-muted)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                padding: '3px 8px',
                cursor: 'pointer',
              }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '80px' }} />
            <col style={{ width: '220px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '140px' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              {['TICKER', 'COMPANY', 'SCORE', 'TIER', 'SECTOR', 'SUMMARY'].map((h) => (
                <th key={h} style={thStyles}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((company) => (
              <tr
                key={company.ticker}
                className="research-table-row"
                onClick={() => setSelectedTicker(company.ticker)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedTicker === company.ticker ? 'var(--color-terminal-800)' : undefined,
                }}
              >
                <td style={{ ...tdStyles, fontWeight: 700, color: 'var(--color-accent)' }}>
                  {company.ticker}
                </td>
                <td style={{ ...tdStyles, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {company.companyName}
                </td>
                <td style={{ ...tdStyles, textAlign: 'right' }}>
                  <span style={{ color: company.score >= 12 ? 'var(--color-positive)' : company.score >= 10 ? 'var(--color-warning)' : 'var(--color-muted)' }}>
                    {company.score.toFixed(1)}
                  </span>
                  <span style={{ color: 'var(--color-muted)' }}>/13</span>
                </td>
                <td style={tdStyles}>
                  <TierBadge tier={company.tier} />
                </td>
                <td style={{ ...tdStyles, color: 'var(--color-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {company.industryFolder}
                </td>
                <td style={{ ...tdStyles, color: 'var(--color-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {company.keySummary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-geist-mono)' }}>
            NO RESULTS MATCHING FILTER
          </div>
        )}
      </div>

      <div style={{ color: 'var(--color-muted)', fontSize: '0.62rem', fontFamily: 'var(--font-geist-mono)' }}>
        SHOWING {filtered.length} / {companies.length} COMPANIES · SC-AI-INFRA FRAMEWORK v2.0.0
      </div>

      {/* Sliding side drawer for Research Reports */}
      {selectedTicker && (
        <div
          style={{
            position: 'fixed',
            top: isFullScreen ? 0 : 'var(--spacing-header)',
            right: 0,
            bottom: 0,
            width: isFullScreen ? '100%' : '600px',
            maxWidth: '100%',
            background: 'var(--color-terminal-black)',
            borderLeft: isFullScreen ? 'none' : '1px solid var(--color-border)',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: 'var(--color-terminal-800)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.75rem' }}>
                ◈ RESEARCH REPORT: {selectedTicker}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                  cursor: 'pointer',
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-geist-mono)',
                  fontWeight: 700,
                  marginRight: '12px',
                  padding: '3px 8px',
                  outline: 'none',
                }}
              >
                {isFullScreen ? 'COLLAPSE' : 'EXPAND'}
              </button>
              <button
                onClick={() => setSelectedTicker(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-muted)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  outline: 'none',
                  padding: '4px 8px',
                }}
                title="Close Report (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

             {/* Report Content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
            }}
          >
            {loadingReport && (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.72rem' }}>
                LOADING REPORT DATA...
              </div>
            )}
            {reportError && (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-negative)', fontSize: '0.72rem' }}>
                {reportError.toUpperCase()}
              </div>
            )}
            {reportContent && (
              <div
                style={{
                  maxWidth: '800px',
                  margin: '0 auto',
                  padding: '0 16px 40px 16px',
                }}
              >
                <MarkdownRenderer content={reportContent} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** Reusable tier badge — used in both this table and HoldingsTable enrichment. */
export function TierBadge({ tier }: { tier: ResearchTier }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '1px 6px',
        fontSize: '0.62rem',
        fontFamily: 'var(--font-geist-mono)',
        fontWeight: 700,
        letterSpacing: '0.05em',
        border: `1px solid ${TIER_COLOURS[tier]}`,
        color: TIER_COLOURS[tier],
        whiteSpace: 'nowrap',
      }}
    >
      {tier.toUpperCase()}
    </span>
  );
}
