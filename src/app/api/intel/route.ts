/**
 * GET /api/intel
 *
 * Merges two intel sources:
 *   1. Finnhub — general market news (Reuters, Bloomberg, CNBC)
 *   2. RSS     — targeted Google News feeds (FT, short-sellers, 4 macro signals)
 *
 * Both are fetched in parallel. Results are deduplicated by normalised headline
 * (catches the same story from different sources) and sorted newest-first.
 *
 * Respects NEXT_PUBLIC_USE_MOCK_DATA master switch.
 * Cached for 15 minutes on Vercel's edge so all concurrent users share one
 * batch of Finnhub + RSS calls rather than each triggering their own.
 */

import { NextResponse } from 'next/server';
import { fetchIntelFeed } from '@/lib/services/finnhub.service';
import { fetchRssIntel } from '@/lib/services/rss.service';
import { MOCK_INTEL_ITEMS } from '@/lib/mock/intelFeed.mock';
import type { IntelItem } from '@/types/intel';

/** 15-minute Vercel edge cache — aligns with the RSS/Finnhub refresh cadence. */
export const revalidate = 900;

/** Normalise a headline for deduplication — lowercase, strip punctuation, collapse spaces. */
function normaliseTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return NextResponse.json(MOCK_INTEL_ITEMS);
  }

  // Fetch both sources in parallel — neither blocks the other
  const [finnhubResult, rssResult] = await Promise.allSettled([
    fetchIntelFeed(),
    fetchRssIntel(),
  ]);

  const finnhubItems: IntelItem[] = finnhubResult.status === 'fulfilled' ? finnhubResult.value : [];
  const rssItems:     IntelItem[] = rssResult.status    === 'fulfilled' ? rssResult.value    : [];

  if (finnhubResult.status === 'rejected') {
    console.error('[Intel] Finnhub source failed:', finnhubResult.reason);
  }
  if (rssResult.status === 'rejected') {
    console.error('[Intel] RSS source failed:', rssResult.reason);
  }

  // Merge and deduplicate by normalised headline
  // Finnhub items come first; RSS items with duplicate titles are dropped
  const seen = new Set<string>();
  const merged: IntelItem[] = [];

  for (const item of [...finnhubItems, ...rssItems]) {
    const key = normaliseTitle(item.title);
    if (key && !seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }

  // Sort newest-first
  merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return NextResponse.json(merged);
}
