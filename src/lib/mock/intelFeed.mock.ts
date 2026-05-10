/**
 * Mock intel feed items for the prototype.
 * Covers Fed/Warsh news, holdings-specific news, and macro moves.
 * Items are intentionally varied in sentiment to demonstrate the feed UI.
 */

import type { IntelItem } from '@/types/intel';

export const MOCK_INTEL_ITEMS: IntelItem[] = [
  {
    id: 'intel-001',
    source: 'Reuters',
    title: "Warsh signals support for faster balance-sheet runoff — sources say Fed transition 'imminent'",
    url: '#',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    relatedTickers: [],
    relatedSignals: ['ms-001'],
    sentiment: 'BEARISH',
  },
  {
    id: 'intel-002',
    source: 'Bloomberg',
    title: 'ASTS SpaceMobile secures AT&T commercial broadband deal — stock up 8% pre-market',
    url: '#',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    relatedTickers: ['ASTS'],
    relatedSignals: [],
    sentiment: 'BULLISH',
  },
  {
    id: 'intel-003',
    source: 'FT',
    title: '10-Year Treasury yield approaches 4.5% threshold amid strong jobs data',
    url: '#',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    relatedTickers: [],
    relatedSignals: ['ms-001', 'ms-002'],
    sentiment: 'BEARISH',
  },
  {
    id: 'intel-004',
    source: 'CNBC',
    title: 'Rocket Lab wins NASA contract for lunar payload delivery — RKLB surges 12%',
    url: '#',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    relatedTickers: ['RKLB'],
    relatedSignals: [],
    sentiment: 'BULLISH',
  },
  {
    id: 'intel-005',
    source: 'WSJ',
    title: 'Gold hits new 2025 high as dollar weakens on Fed uncertainty',
    url: '#',
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    relatedTickers: [],
    relatedSignals: ['ms-003'],
    sentiment: 'BULLISH',
  },
  {
    id: 'intel-006',
    source: 'Reuters',
    title: 'VIX rises to 18.5 — equity volatility picks up ahead of Fed minutes release',
    url: '#',
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    relatedTickers: [],
    relatedSignals: ['ms-001', 'ms-002'],
    sentiment: 'NEUTRAL',
  },
  {
    id: 'intel-007',
    source: 'Space News',
    title: 'Intuitive Machines LUNR awarded $116M NASA CLPS contract extension',
    url: '#',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    relatedTickers: ['LUNR'],
    relatedSignals: [],
    sentiment: 'BULLISH',
  },
  {
    id: 'intel-008',
    source: 'FT',
    title: "Warsh op-ed: 'The Fed must restore credibility through action, not words'",
    url: '#',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    relatedTickers: [],
    relatedSignals: ['ms-001'],
    sentiment: 'BEARISH',
  },
];

/** Fed/Warsh-specific items — filtered subset for the Fed Watch panel */
export const MOCK_FED_WATCH_ITEMS = MOCK_INTEL_ITEMS.filter(
  (item) => item.relatedSignals.includes('ms-001') || item.source === 'FT'
);
