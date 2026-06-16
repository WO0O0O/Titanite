/**
 * RSS Intelligence Service — SERVER ONLY.
 *
 * Fetches targeted Google News RSS feeds for specific signal themes
 * and preferred news sources (Financial Times, short-seller coverage).
 *
 * No API key required. All feeds cached 15 minutes (matching Yahoo Finance delay).
 * All feeds are fetched in parallel; individual failures are silently dropped
 * so one bad feed never breaks the whole Intel Hub.
 *
 * XML is parsed with a lightweight inline parser — no external dependencies.
 */

import type { IntelItem } from '@/types/intel';

interface RssFeedConfig {
  id: string;
  /** Google News RSS search query — supports site:, OR, phrase matching */
  query: string;
  /** Which signal IDs (from roadmap) this feed provides evidence for */
  signalTags: string[];
  /** Fallback source label if the article source can't be extracted */
  label: string;
}

/**
 * Curated RSS feeds. Each targets either a preferred source or one of the
 * 4 macro signals defined in docs/roadmap.md.
 *
 * Google News RSS format:
 *   https://news.google.com/rss/search?q=QUERY&hl=en-GB&gl=GB&ceid=GB:en
 */
const RSS_FEEDS: RssFeedConfig[] = [
  // Short-seller research — Wolfpack, Hindenburg, Citron, Muddy Waters coverage
  {
    id: 'short-research',
    query: '"Wolfpack Research" OR "Hindenburg Research" OR "Citron Research" OR "Muddy Waters Research" OR "short seller report" OR "short position"',
    signalTags: [],
    label: 'Short Research',
  },
  // Financial Times — tech/AI/semiconductor articles (user has FT subscription)
  {
    id: 'ft-tech',
    query: 'site:ft.com (semiconductor OR nvidia OR "data centre" OR "AI infrastructure" OR "chip" OR "hyperscaler")',
    signalTags: [],
    label: 'Financial Times',
  },
  // POWER_WALL — grid/transformer/power allocation delays blocking data centre builds
  {
    id: 'power-wall',
    query: '("transformer lead time" OR "grid delay" OR "power allocation" OR "grid interconnect" OR "utility freeze" OR "electrical grid") ("data centre" OR "data center" OR hyperscaler OR "AI facility")',
    signalTags: ['POWER_WALL'],
    label: 'Infrastructure',
  },
  // HYPERSCALER_CAPEX — Big Tech CapEx diverging from cloud/AI revenue
  {
    id: 'capex-watch',
    query: '(Microsoft OR Meta OR Amazon OR Alphabet OR Google) ("capital expenditure" OR capex OR "AI spending" OR "infrastructure spend") ("cloud revenue" OR "AI revenue" OR "unmonetised" OR "unmonetized")',
    signalTags: ['HYPERSCALER_CAPEX'],
    label: 'CapEx Watch',
  },
  // LEAD_TIME_TRAP — GPU/packaging delivery windows normalising (end of panic-buying)
  {
    id: 'lead-time',
    query: '(nvidia OR GPU OR "advanced packaging" OR TSMC OR "CoWoS") ("lead time" OR "delivery window" OR "double order" OR "inventory correction" OR "normalising" OR "normalizing")',
    signalTags: ['LEAD_TIME_TRAP'],
    label: 'Supply Chain',
  },
  // DEFERRED_DELIVERY — pushout language from optical/fibre/substrate suppliers
  {
    id: 'deferred-delivery',
    query: '(Corning OR AAOI OR Lumentum OR "optical fibre" OR "optical fiber" OR transceiver OR "glass substrate" OR LPKF) ("site readiness" OR "customer pushout" OR "delivery delay" OR "revenue recognition" OR "deferred" OR "pushed out")',
    signalTags: ['DEFERRED_DELIVERY'],
    label: 'Delivery Watch',
  },
];

/**
 * Maps company name substrings (lowercase) to their ticker symbols.
 * Used to auto-tag headlines with related tickers without an NLP call.
 */
const COMPANY_TICKER_MAP: Record<string, string> = {
  nvidia:              'NVDA',
  microsoft:           'MSFT',
  meta:                'META',
  amazon:              'AMZN',
  alphabet:            'GOOGL',
  google:              'GOOGL',
  apple:               'AAPL',
  amd:                 'AMD',
  corning:             'GLW',
  lumentum:            'LITE',
  'rocket lab':        'RKLB',
  palantir:            'PLTR',
  tsmc:                'TSM',
  'ast spacemobile':   'ASTS',
  'intuitive machines':'LUNR',
  'penguin solutions': 'PENG',
  'archer aviation':   'ACHR',
  'nebius':            'NBIS',
};

/** Scan a headline for known company names and return matched tickers. */
function extractTickers(headline: string): string[] {
  const lower = headline.toLowerCase();
  const found = new Set<string>();
  for (const [name, ticker] of Object.entries(COMPANY_TICKER_MAP)) {
    if (lower.includes(name)) found.add(ticker);
  }
  return [...found];
}

/**
 * Improved sentiment heuristic tuned for macro/supply-chain signals.
 *
 * Signal-tagged feeds use an extended bearish phrase list that catches
 * domain-specific language (delay, pushout, normalisation) before falling
 * through to general market words.
 */
function deriveSentiment(headline: string, signalTags: string[]): IntelItem['sentiment'] {
  const lower = headline.toLowerCase();

  // Extended bearish phrases relevant to the 4 macro signals
  const signalBearish = [
    'delay', 'pushout', 'push out', 'defer', 'site readiness', 'slip',
    'miss', 'freeze', 'halt', 'normalis', 'normaliz', 'double order',
    'inventory', 'correction', 'unmonetis', 'unmonetiz', 'rotation out',
    'cut guidance', 'warning', 'concern',
  ];

  const generalBearish = [
    'fall', 'drop', 'decline', 'crash', 'slump', 'plunge', 'warn',
    'risk', 'fear', 'hawkish', 'sell', 'loss', 'layoff', 'below',
    'fraud', 'overvalued', 'bubble', 'short',
  ];

  const generalBullish = [
    'surge', 'rise', 'gain', 'rally', 'soar', 'jump', 'beat', 'strong',
    'bull', 'dovish', 'record', 'upgrade', 'outperform', 'growth', 'profit',
  ];

  // For signal-tagged feeds, check the extended bearish list first
  if (signalTags.length > 0) {
    if (signalBearish.some((w) => lower.includes(w))) return 'BEARISH';
  }
  if (generalBullish.some((w) => lower.includes(w))) return 'BULLISH';
  if (generalBearish.some((w) => lower.includes(w))) return 'BEARISH';
  return 'NEUTRAL';
}

// ─── Minimal inline XML parser (no external dependencies) ────────────────────

/** Extract text content of a tag, handling CDATA wrappers. */
function extractTag(block: string, tag: string): string {
  // CDATA version: <tag><![CDATA[content]]></tag>
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return cdata[1].trim();
  // Plain text version: <tag>content</tag>
  const plain = block.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`));
  return plain ? plain[1].trim() : '';
}

/** Extract URL from the <link> tag (Google News uses standard closed tags). */
function extractLink(block: string): string {
  // Standard: <link>https://...</link>
  const closed = block.match(/<link>(https?:\/\/[^<]+)<\/link>/);
  if (closed) return closed[1].trim();
  // CDATA variant
  const cdata = block.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/);
  if (cdata) return cdata[1].trim();
  // Fallback: use guid if it's a URL
  const guid = block.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/);
  return guid ? guid[1].trim() : '';
}

/** Extract the human-readable source name from <source url="...">Name</source>. */
function extractSourceName(block: string, fallback: string): string {
  const m = block.match(/<source[^>]*>([^<]+)<\/source>/);
  return m ? m[1].trim() : fallback;
}

/** Split RSS XML into individual <item> content blocks. */
function extractItemBlocks(xml: string): string[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
}

// ─────────────────────────────────────────────────────────────────────────────

async function fetchSingleFeed(feed: RssFeedConfig): Promise<IntelItem[]> {
  const encoded = encodeURIComponent(feed.query);
  const url = `https://news.google.com/rss/search?q=${encoded}&hl=en-GB&gl=GB&ceid=GB:en`;

  const res = await fetch(url, {
    // 15-minute server cache — same policy as market data
    next: { revalidate: 900 },
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; TitaniteResearch/1.0)',
      'Accept': 'application/rss+xml, application/xml, text/xml',
    },
  });

  if (!res.ok) throw new Error(`RSS ${feed.id} returned ${res.status}`);

  const xml = await res.text();
  const blocks = extractItemBlocks(xml).slice(0, 8); // max 8 items per feed

  return blocks
    .map((block, i): IntelItem => {
      const title     = extractTag(block, 'title');
      const link      = extractLink(block);
      const pubDate   = extractTag(block, 'pubDate');
      const source    = extractSourceName(block, feed.label);

      return {
        id: `rss-${feed.id}-${i}-${pubDate}`,
        source,
        title,
        url: link,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        relatedTickers: extractTickers(title),
        relatedSignals: feed.signalTags,
        sentiment: deriveSentiment(title, feed.signalTags),
      };
    })
    // Drop any items that are missing title or URL (malformed RSS entries)
    .filter((item) => Boolean(item.title) && Boolean(item.url));
}

/**
 * Fetch all RSS feeds in parallel and merge results sorted newest-first.
 * Individual feed failures are silently dropped — one bad feed never
 * breaks the entire Intel Hub.
 */
export async function fetchRssIntel(): Promise<IntelItem[]> {
  const results = await Promise.allSettled(RSS_FEEDS.map(fetchSingleFeed));

  const items: IntelItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      items.push(...result.value);
    } else {
      // Log the specific feed that failed for easier debugging
      console.warn('[RSS] Feed failed:', (result.reason as Error)?.message ?? result.reason);
    }
  }

  return items.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
