/**
 * Congress data service — SERVER ONLY.
 *
 * Fetches from the community-maintained GitHub raw JSON feeds:
 *   - SenateStockWatcher (senate transactions)
 *   - HouseStockWatcher (house transactions)
 *
 * No API key required — both are publicly accessible.
 * We take the 100 most recent disclosures from each to avoid
 * processing thousands of records on every request.
 *
 * Normalises both feeds into the shared CongressTrade type.
 * Falls back to mock data on any error.
 */

import type { CongressTrade } from '@/types/congress';
import { MOCK_CONGRESS_TRADES } from '@/lib/mock/congress.mock';

// Both feeds are hosted on S3, not raw GitHub — raw GitHub URLs return 404 for large files.
// Senate JSON is ~4MB so we skip the Next.js fetch cache entirely (it rejects items >2MB).
const SENATE_URL =
  'https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json';
const HOUSE_URL =
  'https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json';

// Raw shapes from the two feeds
interface RawSenateTrade {
  transaction_date: string;
  disclosure_date: string;
  senator: string;
  ticker: string;
  asset_description: string;
  type: string; // "Purchase" | "Sale (Full)" | "Sale (Partial)" | "Exchange"
  amount: string;
}

interface RawHouseTrade {
  disclosure_date: string;
  transaction_date: string;
  representative: string;
  ticker: string;
  asset_description: string;
  type: string; // "purchase" | "sale_full" | "sale_partial"
  amount: string;
  party: string;
}

function mapTradeType(raw: string): 'BUY' | 'SELL' {
  const lower = raw?.toLowerCase() || '';
  if (lower.includes('purchase') || lower.includes('buy')) return 'BUY';
  return 'SELL';
}

function normaliseSenate(raw: RawSenateTrade, index: number): CongressTrade {
  return {
    id: `senate-${index}-${raw.transaction_date}`,
    politician: raw.senator,
    chamber: 'SENATE',
    party: 'UNKNOWN', // Senate Watcher doesn't expose party
    ticker: (raw.ticker ?? '').replace('$', '').trim().toUpperCase(),
    assetDescription: raw.asset_description,
    tradeType: mapTradeType(raw.type),
    amountRange: raw.amount,
    transactionDate: raw.transaction_date,
    disclosureDate: raw.disclosure_date,
    source: 'SENATE_WATCHER',
    sourceUrl: SENATE_URL,
  };
}

function normaliseHouse(raw: RawHouseTrade, index: number): CongressTrade {
  return {
    id: `house-${index}-${raw.transaction_date}`,
    politician: raw.representative,
    chamber: 'HOUSE',
    party: raw.party?.toUpperCase() === 'DEMOCRAT' ? 'D'
      : raw.party?.toUpperCase() === 'REPUBLICAN' ? 'R'
      : 'UNKNOWN',
    ticker: (raw.ticker ?? '').replace('$', '').trim().toUpperCase(),
    assetDescription: raw.asset_description,
    tradeType: mapTradeType(raw.type),
    amountRange: raw.amount,
    transactionDate: raw.transaction_date,
    disclosureDate: raw.disclosure_date,
    source: 'HOUSE_WATCHER',
    sourceUrl: HOUSE_URL,
  };
}

export async function fetchCongressTrades(): Promise<CongressTrade[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return MOCK_CONGRESS_TRADES;
  }

  try {
    // Use cache: 'no-store' — both files are >2MB and Next.js silently refuses to cache them,
    // which caused every request to re-fetch anyway. Explicit no-store avoids the error spam.
    // User-Agent is required — S3 returns 403 for requests without one (bot-filtering).
    const congressHeaders = {
      'User-Agent': 'Mozilla/5.0 (compatible; TitaniteResearch/1.0)',
      'Accept': 'application/json',
    };
    const [senateRes, houseRes] = await Promise.all([
      fetch(SENATE_URL, { cache: 'no-store', headers: congressHeaders }),
      fetch(HOUSE_URL,  { cache: 'no-store', headers: congressHeaders }),
    ]);

    if (!senateRes.ok || !houseRes.ok) {
      throw new Error(`Congress feed error: Senate(${senateRes.status}) / House(${houseRes.status})`);
    }

    const senateTrades: RawSenateTrade[] = await senateRes.json();
    const houseTrades:  RawHouseTrade[]  = await houseRes.json();

    const senate = senateTrades
      .slice(-100)
      .map(normaliseSenate)
      .filter((t) => t.ticker && t.ticker !== 'N/A' && t.ticker.length <= 5);

    const house = houseTrades
      .slice(-100)
      .map(normaliseHouse)
      .filter((t) => t.ticker && t.ticker !== 'N/A' && t.ticker.length <= 5);

    return [...senate, ...house].sort(
      (a, b) => new Date(b.disclosureDate).getTime() - new Date(a.disclosureDate).getTime()
    );
  } catch (error) {
    console.error('[Congress] Fetch trades failed, falling back to mock data.', error);
    return MOCK_CONGRESS_TRADES;
  }
}
