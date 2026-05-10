export interface IntelItem {
  id: string;
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  relatedTickers: string[];
  relatedSignals: string[];
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}
