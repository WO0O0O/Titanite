/**
 * IntelItemRow — a single row in the terminal-style intel feed log.
 *
 * Format (Bloomberg/terminal style):
 *   [HH:MM:SS] [SENTIMENT] [SOURCE]  Title text...  [TICKER TICKER]
 */

import type { IntelItem } from '@/types/intel';

interface IntelItemRowProps {
  item: IntelItem;
  index: number;
}

const SENTIMENT_COLOR = {
  BULLISH: 'var(--color-signal-ok)',
  BEARISH: 'var(--color-signal-alert)',
  NEUTRAL: 'var(--color-signal-warning)',
} as const;

export default function IntelItemRow({ item, index }: IntelItemRowProps) {
  const time = new Date(item.publishedAt).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const sentimentColor = SENTIMENT_COLOR[item.sentiment];

  return (
    <div
      className="flex items-start gap-3 px-3 py-2 hover:opacity-90 transition-opacity cursor-pointer"
      style={{
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
      }}
      onClick={() => item.url !== '#' && window.open(item.url, '_blank')}
    >
      {/* Timestamp */}
      <span className="text-[10px] tabular-nums shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
        {time}
      </span>

      {/* Sentiment badge */}
      <span
        className="text-[9px] shrink-0 mt-0.5 w-8 text-center"
        style={{ color: sentimentColor }}
      >
        {item.sentiment.slice(0, 4)}
      </span>

      {/* Source */}
      <span className="text-[9px] shrink-0 mt-0.5 w-10" style={{ color: 'var(--color-accent)' }}>
        {item.source}
      </span>

      {/* Title */}
      <span className="flex-1 text-[11px] leading-snug" style={{ color: 'var(--color-text-primary)' }}>
        {item.title}
      </span>

      {/* Related tickers */}
      {item.relatedTickers.length > 0 && (
        <div className="flex gap-1 shrink-0 mt-0.5">
          {item.relatedTickers.map((ticker) => (
            <span
              key={ticker}
              className="text-[9px] px-1 rounded-sm"
              style={{ color: 'var(--color-accent)', border: '1px solid var(--color-accent)30' }}
            >
              {ticker}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
