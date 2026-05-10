/**
 * Finnhub service — SERVER ONLY.
 *
 * Used to fetch general market news for the Intel Hub.
 * Free tier key stored in FINNHUB_API_KEY env var.
 *
 * Sentiment is derived from headline keywords (simple heuristic)
 * since the free tier doesn't include NLP sentiment scores.
 *
 * Falls back to mock data when no key is present or on error.
 */

import type { IntelItem } from '@/types/intel';
import { MOCK_INTEL_ITEMS } from '@/lib/mock/intelFeed.mock';

const FINNHUB_BASE = 'https://finnhub.io/api/v1';

interface FinnhubNewsItem {
  id: number;
  category: string;
  datetime: number; // Unix timestamp
  headline: string;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

/** Simple keyword-based sentiment heuristic — good enough for a prototype. */
function deriveSentiment(headline: string): IntelItem['sentiment'] {
  const lower = headline.toLowerCase();
  const bearish = ['fall', 'drop', 'decline', 'crash', 'slump', 'plunge', 'hawkish', 'warn', 'risk', 'fear'];
  const bullish = ['surge', 'rise', 'gain', 'rally', 'soar', 'jump', 'beat', 'win', 'strong', 'bull', 'dovish'];
  if (bullish.some((w) => lower.includes(w))) return 'BULLISH';
  if (bearish.some((w) => lower.includes(w))) return 'BEARISH';
  return 'NEUTRAL';
}

function mapFinnhubItem(item: FinnhubNewsItem, index: number): IntelItem {
  // `related` is a comma-separated string of tickers
  const relatedTickers = item.related
    ? item.related.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return {
    id: `finnhub-${item.id ?? index}`,
    source: item.source,
    title: item.headline,
    url: item.url,
    publishedAt: new Date(item.datetime * 1000).toISOString(),
    relatedTickers,
    relatedSignals: [], // Enrichment from evaluator happens client-side
    sentiment: deriveSentiment(item.headline),
  };
}

export async function fetchIntelFeed(): Promise<IntelItem[]> {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    console.warn('[Finnhub] FINNHUB_API_KEY not set — returning mock intel data.');
    return MOCK_INTEL_ITEMS;
  }

  try {
    const res = await fetch(
      `${FINNHUB_BASE}/news?category=general&token=${apiKey}`,
      { next: { revalidate: 900 } } // 15-minute cache — matches Yahoo Finance data delay
    );

    if (!res.ok) {
      throw new Error(`Finnhub error: ${res.status}`);
    }

    const items: FinnhubNewsItem[] = await res.json();

    // Limit to 20 most recent items to keep the feed scannable
    return items.slice(0, 20).map(mapFinnhubItem);
  } catch (error) {
    console.error('[Finnhub] Fetch intel feed failed, falling back to mock data.', error);
    return MOCK_INTEL_ITEMS;
  }
}
