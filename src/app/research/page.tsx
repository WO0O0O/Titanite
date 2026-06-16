/**
 * /research — Titanite Research Terminal page.
 *
 * Server Component: fetches data server-side, passes to client components.
 *
 * Panels:
 *   1. Research Universe Table — all scored companies (SC-AI-INFRA framework)
 *   2. Catalyst Radar — active catalysts sorted by expected date
 *   3. Framework Status — version, last export timestamp
 */

import type { Metadata } from 'next';
import {
  getResearchedCompanies,
  getActiveCatalysts,
  getResearchExportedAt,
} from '@/lib/services/research.service';
import ResearchUniverseTable from '@/components/research/ResearchUniverseTable';
import CatalystRadar from '@/components/research/CatalystRadar';

export const metadata: Metadata = {
  title: 'Research | Titanite Research Terminal',
  description: 'Titanite SC-AI-INFRA research universe — scored company list, catalyst radar, and framework status.',
};

// Revalidate at most every 5 minutes (matches research.service.ts ISR setting)
export const revalidate = 300;

const panelStyle: React.CSSProperties = {
  background: 'var(--color-terminal-900)',
  border: '1px solid var(--color-border)',
};

const panelHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  borderBottom: '1px solid var(--color-border)',
  background: 'var(--color-terminal-800)',
};

const panelTitleStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.65rem',
  fontFamily: 'var(--font-geist-mono)',
  fontWeight: 600,
  letterSpacing: '0.1em',
};

const accentDotStyle: React.CSSProperties = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: 'var(--color-accent)',
  display: 'inline-block',
};

export default async function ResearchPage() {
  const [companies, catalysts, exportedAt] = await Promise.all([
    getResearchedCompanies(),
    getActiveCatalysts(),
    getResearchExportedAt(),
  ]);

  const exportedAtFormatted = exportedAt
    ? new Date(exportedAt).toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Europe/London',
      })
    : 'UNKNOWN';

  return (
    <main
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '1600px',
      }}
    >
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div>
          <h1
            style={{
              color: 'var(--color-text)',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              margin: 0,
            }}
          >
            ◈ TITANITE RESEARCH UNIVERSE
          </h1>
          <p
            style={{
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.62rem',
              margin: '4px 0 0 0',
            }}
          >
            SC-AI-INFRA FRAMEWORK v2.0.0 · AI NEVER ASSIGNS FINAL SCORES · PRE-DRAFT REQUIRES VERIFICATION
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.62rem' }}>
            LAST EXPORT
          </div>
          <div style={{ color: 'var(--color-text)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem' }}>
            {exportedAtFormatted}
          </div>
          <div style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.58rem', marginTop: '2px' }}>
            Run `titanite export` to refresh
          </div>
        </div>
      </div>

      {/* Panel 1: Research Universe */}
      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span style={accentDotStyle} />
          <span style={panelTitleStyle}>RESEARCH UNIVERSE — {companies.length} COMPANIES</span>
        </div>
        <div style={{ padding: '8px 0' }}>
          <ResearchUniverseTable companies={companies} />
        </div>
      </div>

      {/* Panel 2: Catalyst Radar */}
      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span style={{ ...accentDotStyle, background: 'var(--color-warning)' }} />
          <span style={panelTitleStyle}>CATALYST RADAR — {catalysts.length} ACTIVE</span>
        </div>
        <div style={{ padding: '8px 0' }}>
          <CatalystRadar catalysts={catalysts} />
        </div>
      </div>

      {/* Panel 3: Framework Status */}
      <div style={panelStyle}>
        <div style={panelHeaderStyle}>
          <span style={{ ...accentDotStyle, background: 'var(--color-muted)' }} />
          <span style={panelTitleStyle}>FRAMEWORK STATUS</span>
        </div>
        <div
          style={{
            padding: '12px 16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { label: 'FRAMEWORK VERSION', value: 'v2.0.0' },
            { label: 'PRIMARY FRAMEWORK', value: 'SC-AI-INFRA (Small-Cap)' },
            { label: 'SCORING AUTHORITY', value: 'HUMAN ONLY — AI pre-drafts' },
            { label: 'AUTO DISQUALIFIERS', value: 'AI cannot override' },
            { label: 'GEOPOLITICAL PENALTY', value: 'Section 15 — Mandatory' },
            { label: 'WORKING CAPITAL OVERRIDE', value: 'Section 12 — Logged' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.58rem', letterSpacing: '0.08em' }}>
                {label}
              </div>
              <div style={{ color: 'var(--color-text)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', marginTop: '2px' }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
