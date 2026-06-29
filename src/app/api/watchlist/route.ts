import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey', 'ripHistorical'] });

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
          // Normalize SIVE -> SIVE.ST since Sivers is traded on Nasdaq Stockholm
          const querySymbol = ticker === 'SIVE' ? 'SIVE.ST' : ticker;
          const quote = await yahooFinance.quote(querySymbol) as any;
          return {
            ticker,
            name: quote.longName ?? quote.shortName ?? ticker,
            price: quote.regularMarketPrice ?? 100.0,
            marketCap: quote.marketCap ?? 0,
          };
        } catch (e) {
          console.error(`Failed to fetch quote for ${ticker} from Yahoo Finance:`, e);
          // Return placeholder values so that failures do not break the whole request
          return {
            ticker,
            name: ticker,
            price: 100.0,
            marketCap: 1000000000,
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
