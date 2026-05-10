'use client';

/**
 * MacroPillarsBar — the top strip on the dashboard showing the 4 Macro Pillars.
 *
 * Must be 'use client' because Pillar 4 (Warsh Sentiment) is an interactive
 * toggle that writes to uiStore and triggers signal re-evaluation.
 *
 * Each pillar section shows: value, 24h change, threshold status, and alert level.
 */

import { useUIStore } from '@/store/uiStore';
import { useSignalStore } from '@/store/signalStore';
import { MOCK_MARKET_CONTEXT } from '@/lib/mock/marketData.mock';
import StatusDot from '@/components/ui/StatusDot';

// Warsh toggle cycles through these in order
const WARSH_CYCLE: Array<1 | 0 | -1> = [1, 0, -1];
const WARSH_LABELS: Record<number, string> = { 1: 'HAWKISH', 0: 'NEUTRAL', '-1': 'DOVISH' };
const WARSH_STATUS: Record<number, 'alert' | 'neutral' | 'ok'> = { 1: 'alert', 0: 'neutral', '-1': 'ok' };

export default function MacroPillarsBar() {
  const { warshSentiment, setWarshSentiment } = useUIStore();
  const { evaluateAll } = useSignalStore();

  const ctx = MOCK_MARKET_CONTEXT.values;

  const handleWarshToggle = () => {
    const currentIndex = WARSH_CYCLE.indexOf(warshSentiment);
    const next = WARSH_CYCLE[(currentIndex + 1) % WARSH_CYCLE.length];
    setWarshSentiment(next);
    // Re-evaluate all signals with the new Warsh sentiment injected into context
    evaluateAll({
      ...MOCK_MARKET_CONTEXT,
      values: { ...MOCK_MARKET_CONTEXT.values, WARSH_SENTIMENT: { metricId: 'WARSH_SENTIMENT', current: next, previous: warshSentiment } },
    });
  };

  // Pillar 3: S&P is BELOW the 200-day MA (6550) — this is an alert condition
  const spxBelowMA = ctx.SP500.current < ctx.SP500_EMA_200.current;
  const tnxNearLimit = ctx.TNX.current >= 4.3;
  const tnxCritical = ctx.TNX.current >= 4.5;
  const vixElevated = ctx.VIX.current >= 20;
  const vixPanic = ctx.VIX.current >= 25;

  return (
    <div
      className="grid grid-cols-4 shrink-0"
      style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-terminal-900)' }}
    >
      {/* Pillar 1: TNX */}
      <PillarPanel
        code="P1 TNX"
        label="10Y Treasury Yield"
        value={`${ctx.TNX.current.toFixed(2)}%`}
        change={`+${(ctx.TNX.current - ctx.TNX.previous).toFixed(2)}%`}
        changePositive={false} // Rising yield = bearish for growth
        threshold="CRITICAL > 4.50%"
        status={tnxCritical ? 'alert' : tnxNearLimit ? 'warning' : 'ok'}
        statusLabel={tnxCritical ? 'CRITICAL' : tnxNearLimit ? 'NEAR LIMIT' : 'CLEAR'}
      />

      {/* Pillar 2: VIX */}
      <PillarPanel
        code="P2 VIX"
        label="Volatility Index"
        value={ctx.VIX.current.toFixed(1)}
        change={`+${(ctx.VIX.current - ctx.VIX.previous).toFixed(1)}`}
        changePositive={false}
        threshold="ELEVATED > 20 / PANIC > 25"
        status={vixPanic ? 'alert' : vixElevated ? 'warning' : 'ok'}
        statusLabel={vixPanic ? 'PANIC' : vixElevated ? 'ELEVATED' : 'NEUTRAL'}
        hasBorderLeft
      />

      {/* Pillar 3: S&P 500 vs 200-Day MA */}
      <PillarPanel
        code="P3 SPX"
        label="S&P 500 vs 200-Day MA"
        value={ctx.SP500.current.toLocaleString()}
        change={`MA: ${ctx.SP500_EMA_200.current.toLocaleString()}`}
        changePositive={!spxBelowMA}
        threshold="ALERT if PRICE < 200-Day MA"
        status={spxBelowMA ? 'alert' : 'ok'}
        statusLabel={spxBelowMA ? 'PRICE < MA' : 'PRICE > MA'}
        hasBorderLeft
      />

      {/* Pillar 4: Warsh Sentiment (interactive toggle) */}
      <button
        type="button"
        onClick={handleWarshToggle}
        className="text-left p-3 transition-colors hover:opacity-80"
        style={{
          borderLeft: '1px solid var(--color-border)',
          backgroundColor: warshSentiment === 1 ? 'rgba(255,77,77,0.05)' : 'transparent',
        }}
        title="Click to cycle: HAWKISH → NEUTRAL → DOVISH"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] tracking-widest" style={{ color: 'var(--color-text-muted)' }}>P4 WARSH</span>
          <StatusDot status={WARSH_STATUS[warshSentiment]} size="md" />
        </div>
        <div className="text-[13px] font-bold tabular-nums mb-0.5"
          style={{ color: warshSentiment === 1 ? 'var(--color-signal-alert)' : warshSentiment === -1 ? 'var(--color-signal-ok)' : 'var(--color-text-primary)' }}>
          {WARSH_LABELS[warshSentiment]}
        </div>
        <div className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Fed Sentiment Toggle</div>
        <div className="text-[9px] mt-0.5" style={{ color: 'var(--color-accent)' }}>CLICK TO CYCLE ▶</div>
      </button>
    </div>
  );
}

// ── Sub-component: a single non-interactive pillar panel ──────────────────────

interface PillarPanelProps {
  code: string;
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  threshold: string;
  status: 'ok' | 'warning' | 'alert';
  statusLabel: string;
  hasBorderLeft?: boolean;
}

function PillarPanel({ code, label, value, change, changePositive, threshold, status, statusLabel, hasBorderLeft }: PillarPanelProps) {
  const statusColor = {
    ok:      'var(--color-signal-ok)',
    warning: 'var(--color-signal-warning)',
    alert:   'var(--color-signal-alert)',
  }[status];

  return (
    <div
      className="p-3"
      style={{ borderLeft: hasBorderLeft ? '1px solid var(--color-border)' : undefined }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{code}</span>
        <StatusDot status={status} size="md" />
      </div>
      <div className="text-[18px] font-bold tabular-nums mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
        {value}
      </div>
      <div className="text-[10px] mb-1" style={{ color: changePositive ? 'var(--color-signal-ok)' : 'var(--color-signal-alert)' }}>
        {change}
      </div>
      <div className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>{threshold}</div>
      <div className="text-[9px] mt-0.5 font-semibold" style={{ color: statusColor }}>{statusLabel}</div>
    </div>
  );
}
