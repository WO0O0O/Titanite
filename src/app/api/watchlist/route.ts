import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey', 'ripHistorical'] });

/**
 * Cache this route for 15 minutes on Vercel's edge.
 * All concurrent users share a single upstream Yahoo Finance call per window,
 * rather than each user independently hammering the external API.
 */
export const revalidate = 900;

/**
 * Maps display tickers (as stored in watchlist) to their Yahoo Finance
 * query symbol and the native price currency.
 *
 * Without this, European stocks either fail (Yahoo can't find "LPK") or
 * return a price in SEK/EUR/GBp that gets displayed as if it were USD.
 */
const TICKER_YAHOO_MAP: Record<string, { symbol: string; currency: string }> = {
  // Swedish (Nasdaq Stockholm) — price in SEK
  SIVE:   { symbol: 'SIVE.ST',  currency: 'SEK' },
  SHT:    { symbol: 'SHT.ST',   currency: 'SEK' },
  GAPW:   { symbol: '6GW.F',    currency: 'EUR' },
  ACCON:  { symbol: '4AC.F',    currency: 'EUR' },
  SEYE:   { symbol: 'S9E.F',    currency: 'EUR' },
  // German/Frankfurt — price in EUR
  LPK:    { symbol: 'LPK.F',    currency: 'EUR' },
  LPKF:   { symbol: 'LPK.F',    currency: 'EUR' },
  TPEG:   { symbol: 'TPE.F',    currency: 'EUR' },
  XFAB:   { symbol: 'XFAB.PA',  currency: 'EUR' },
  SOITEC: { symbol: 'SOI.PA',   currency: 'EUR' },
  P4O:    { symbol: 'P4O.F',    currency: 'EUR' },
  SHMD:   { symbol: '4GH.F',    currency: 'EUR' },
  // London Stock Exchange — price in GBp (pence, divide by 100 for £)
  IQE:    { symbol: 'IQE.L',    currency: 'GBp' },
  EOS:    { symbol: 'EOS.AX',   currency: 'AUD' },
  SEE:    { symbol: 'SEE.AX',   currency: 'AUD' },
  // Taiwan Stock Exchange
  KAORI:  { symbol: '8996.TW',  currency: 'TWD' },
  NCI:    { symbol: '4092.T',   currency: 'JPY' },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tickersParam = searchParams.get('tickers');
  if (!tickersParam) {
    return NextResponse.json({ quotes: [] });
  }

  const tickers = tickersParam
    .split(',')
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);

  try {
    const quotes = await Promise.all(
      tickers.map(async (ticker) => {
        try {
          // Resolve to the correct Yahoo symbol and native currency
          const mapping = TICKER_YAHOO_MAP[ticker];
          const querySymbol = mapping?.symbol ?? ticker;
          const currency    = mapping?.currency ?? 'USD';

          const quote = await yahooFinance.quote(querySymbol) as any;
          return {
            ticker,
            name:      quote.longName ?? quote.shortName ?? ticker,
            price:     quote.regularMarketPrice ?? 0,
            marketCap: quote.marketCap ?? 0,
            currency,
          };
        } catch (e) {
          console.error(`Failed to fetch quote for ${ticker} from Yahoo Finance:`, e);
          // Return zero-price placeholder — the table shows '—' for missing data
          return {
            ticker,
            name:      ticker,
            price:     0,
            marketCap: 0,
            currency:  'USD',
          };
        }
      })
    );
    return NextResponse.json({ quotes });
  } catch (err) {
    console.error('Watchlist quotes fetch failed:', err);
    return NextResponse.json({ error: 'Failed to retrieve watchlist quotes' }, { status: 500 });
  }
}

