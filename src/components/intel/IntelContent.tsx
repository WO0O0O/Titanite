'use client';

/**
 * IntelContent — client component for the /intel page.
 *
 * Layout:
 *   Left (60%):  IntelFeed — scrollable terminal news log
 *   Right (40%): FedWatchPanel — Warsh-specific feed + sentiment toggle
 */

import { useState, useMemo } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useSignalStore } from '@/store/signalStore';
import { useIntelFeed } from '@/hooks/useIntelFeed';
import { MOCK_MARKET_CONTEXT } from '@/lib/mock/marketData.mock';
import TerminalWindow from '@/components/layout/TerminalWindow';
import IntelItemRow from './IntelItemRow';

const WARSH_LABELS: Record<number, string> = { 1: 'HAWKISH', 0: 'NEUTRAL', '-1': 'DOVISH' };
const WARSH_CYCLE: Array<1 | 0 | -1> = [1, 0, -1];
const WARSH_DESC: Record<number, string> = {
  1: 'Hawkish stance detected. Higher rates expected. Small-cap risk ELEVATED.',
  0: 'Neutral stance. No immediate policy shift expected.',
  '-1': 'Dovish stance. Rate cuts likely. Risk assets supported.',
};

// Sentiment filter options for the feed
type SentimentFilter = 'ALL' | 'BULLISH' | 'BEARISH' | 'NEUTRAL';

export default function IntelContent() {
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('ALL');
  const { warshSentiment, setWarshSentiment } = useUIStore();
  const { evaluateAll } = useSignalStore();
  const { data: allItems = [] } = useIntelFeed();

  // Derive fed-specific items from live data (contains Warsh/Fed keywords)
  const fedWatchItems = useMemo(
    () => allItems.filter((i) => i.sentiment === 'BEARISH' || i.relatedSignals.length > 0).slice(0, 5),
    [allItems]
  );

  const handleWarshToggle = () => {
    const currentIndex = WARSH_CYCLE.indexOf(warshSentiment);
    const next = WARSH_CYCLE[(currentIndex + 1) % WARSH_CYCLE.length];
    setWarshSentiment(next);
    evaluateAll({
      ...MOCK_MARKET_CONTEXT,
      values: {
        ...MOCK_MARKET_CONTEXT.values,
        WARSH_SENTIMENT: { metricId: 'WARSH_SENTIMENT', current: next, previous: warshSentiment },
      },
    });
  };

  const filteredItems = sentimentFilter === 'ALL'
    ? allItems
    : allItems.filter((i) => i.sentiment === sentimentFilter);

  const warshColor = warshSentiment === 1
    ? 'var(--color-signal-alert)'
    : warshSentiment === -1
      ? 'var(--color-signal-ok)'
      : 'var(--color-signal-warning)';

  return (
    <div
      className="flex gap-3"
      style={{ height: 'calc(100vh - var(--spacing-header) - 2rem)' }}
    >
      {/* Left: Main Intel Feed */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <TerminalWindow
          title="Intel Feed"
          code="INT-1"
          rightSlot={
            <div className="flex items-center gap-3">
              {(['ALL', 'BULLISH', 'BEARISH', 'NEUTRAL'] as SentimentFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSentimentFilter(f)}
                  className="text-[9px] tracking-wider transition-opacity"
                  style={{
                    color: sentimentFilter === f ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    opacity: sentimentFilter === f ? 1 : 0.6,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <div className="-m-4">
            {filteredItems.map((item, i) => (
              <IntelItemRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </TerminalWindow>
      </div>

      {/* Right: Fed Watch Panel */}
      <div className="w-80 shrink-0">
        <TerminalWindow title="Fed Transition Watch" code="INT-2">
          {/* Warsh sentiment toggle */}
          <div
            className="mb-4 p-3 rounded-sm"
            style={{ border: `1px solid ${warshColor}40`, backgroundColor: `${warshColor}08` }}
          >
            <div className="text-[9px] tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
              WARSH SENTIMENT — MANUAL OVERRIDE
            </div>
            <button
              type="button"
              onClick={handleWarshToggle}
              className="w-full text-left mb-2"
            >
              <div className="text-[18px] font-bold" style={{ color: warshColor }}>
                {WARSH_LABELS[warshSentiment]}
              </div>
              <div className="text-[9px] mt-0.5" style={{ color: 'var(--color-accent)' }}>
                CLICK TO CYCLE ▶
              </div>
            </button>
            <p className="text-[10px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {WARSH_DESC[warshSentiment]}
            </p>
          </div>

          {/* Warsh-specific intel */}
          <div className="text-[9px] tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
            FED-RELATED ITEMS ({fedWatchItems.length})
          </div>
          <div className="-mx-4">
            {fedWatchItems.map((item, i) => (
              <IntelItemRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
