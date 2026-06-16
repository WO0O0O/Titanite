/**
 * Trading 212 service — SERVER ONLY. Never import from client components.
 *
 * Reads from the official T212 REST API using the key stored in T212_API_KEY.
 * Access scope: portfolio (positions), account cash — no trade execution.
 *
 * T212 tickers use an internal format (e.g. "NVDA_US_EQ") so we strip
 * the suffix to get the canonical exchange ticker for display.
 *
 * Falls back to mock data if the key is missing or the request fails.
 */

import type { Holding, PortfolioSummary } from '@/types/holdings';
import { MOCK_HOLDINGS, MOCK_PORTFOLIO_SUMMARY } from '@/lib/mock/holdings.mock';
// FX conversion: fetch live GBPUSD rate so per-position VALUE is shown in £
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

const T212_BASE = 'https://live.trading212.com/api/v0';

interface T212Position {
  ticker: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  ppl: number;
  fxPpl: number;
}

interface T212Cash {
  free: number;
  total: number;
  ppl: number;
  result: number;
  invested: number;
  cash: number;
  blockedForStocks: number;
  pieCash: number;
}

interface T212PieConstituent {
  ticker: string;
  expectedShare: number;
  resultShare: number;
}

interface T212Pie {
  id: number;
  name: string;
  status: string;
  accounts: T212PieConstituent[];
}

/**
 * T212 keeps legacy internal instrument identifiers even after companies rebrand or
 * complete SPAC mergers. This map corrects the display ticker to its current market symbol.
 * Add entries here as needed — the key is what T212 returns, the value is what to show.
 */
const TICKER_DISPLAY_OVERRIDES: Record<string, string> = {
  YNDX: 'NBIS',  // Yandex NV → Nebius Group NV (rebranded Aug 2024)
  VACQ: 'RKLB',  // Vector Acquisition Corp (SPAC) → Rocket Lab USA (merged Aug 2021)
  SGH:  'PENG',  // SMART Global Holdings → Penguin Solutions (rebranded Oct 2024)
  IPAX: 'LUNR',  // Inflection Point Acquisition Corp → Intuitive Machines (merged Feb 2023)
  NPA:  'ASTS',  // New Providence Acquisition Corp → AST SpaceMobile (merged Apr 2021)
  ACIC: 'ACHR',  // Atlas Crest Investment Corp (SPAC) → Archer Aviation (merged Sep 2021)
  // European / UK stock exchange ticker overrides
  '2DG':  'SIVE',  // Sivers Semiconductors AB (traded as 2DG on Gettex)
  LPKG:  'LPK',   // LPKF Laser & Electronics SE (traded as LPKG on Gettex/Frankfurt)
  S9E:   'SEYE',  // Smart Eye AB (traded as S9E on Gettex)
  '4AC':  'ACCON', // Acconeer AB (traded as 4AC on Gettex)
  '2CRSI': 'AL2SI', // 2CRSi S.A. (alternative Euronext symbol representation)
  IQEL:  'IQE',   // IQE plc (alternative London Stock Exchange symbol representation)
};

/** Strip T212's internal suffix (e.g. "NVDA_US_EQ" → "NVDA") and apply display overrides. */
function normaliseTicker(t212Ticker: string): string {
  let base = t212Ticker.split('_')[0];

  // Strip trailing lowercase exchange-identifying suffixes (e.g., '2DGd' -> '2DG', 'IQEl' -> 'IQE', 'AL2SIp' -> 'AL2SI')
  if (base.length > 1 && /[a-z]/.test(base[base.length - 1])) {
    base = base.slice(0, -1);
  }

  return TICKER_DISPLAY_OVERRIDES[base] ?? base;
}

/**
 * Fetch the live GBP/USD exchange rate so we can convert USD-denominated
 * position values to GBP. Falls back to 0.79 (approximate) on error.
 * One call per portfolio request — rate applied to all positions.
 */
const TICKER_YAHOO_MAP: Record<string, string> = {
  SIVE: 'SIVE.ST',
  LPK: 'LPK.DE',
  AL2SI: 'AL2SI.PA',
  IQE: 'IQE.L',
  SEYE: 'SEYE.ST',
  ACCON: 'ACCON.ST',
};

function getYahooSymbol(ticker: string): string {
  return TICKER_YAHOO_MAP[ticker.toUpperCase()] ?? ticker.toUpperCase();
}

function convertToUsd(value: number, currency: string, gbpUsdRate: number): number {
  if (currency === 'USD') return value;
  if (currency === 'GBp' || currency === 'GBX') {
    const gbpValue = value / 100;
    return gbpUsdRate > 0 ? gbpValue / gbpUsdRate : gbpValue / 0.79;
  }
  if (currency === 'GBP') {
    return gbpUsdRate > 0 ? value / gbpUsdRate : value / 0.79;
  }
  const cur = currency.toUpperCase();
  if (cur === 'EUR') return value * 1.08; // approximate EUR/USD rate
  if (cur === 'SEK') return value * 0.095; // approximate SEK/USD rate
  return value; // fallback
}

/**
 * Fetch the live GBP/USD exchange rate so we can convert USD-denominated
 * position values to GBP. Falls back to 0.79 (approximate) on error.
 * One call per portfolio request — rate applied to all positions.
 */
async function fetchGbpUsdRate(): Promise<number> {
  try {
    // USDGBP=X = GBP per 1 USD (e.g. 0.79 means $1 = £0.79).
    // This is the correct multiplier: USD_value × USDGBP = GBP_value.
    // GBPUSD=X would give ~1.27 (USD per GBP) — wrong direction.
    const quote = await (yahooFinance as any).quote('USDGBP=X');
    return (quote?.regularMarketPrice as number) ?? 0.79;
  } catch {
    console.warn('[T212] Could not fetch USDGBP rate — using fallback 0.79');
    return 0.79;
  }
}

function mapPosition(pos: T212Position, gbpUsdRate: number, quote?: any): Holding {
  const ticker = normaliseTicker(pos.ticker);

  const currency = quote?.currency || 'USD';
  const averagePrice = convertToUsd(pos.averagePrice, currency, gbpUsdRate);
  const currentPrice = convertToUsd(pos.currentPrice, currency, gbpUsdRate);

  // ppl (T212's profit/loss) is in account currency (GBP) after FX conversion.
  // averagePrice and currentPrice are in the instrument's native currency (e.g. USD for US stocks).

  // P&L value: use ppl directly — it's the true GBP gain/loss T212 calculated with their FX rates.
  const pnlValue = pos.ppl;

  // P&L %: currency-neutral ratio using native prices only. Avoids GBP/USD mismatch.
  const pnlPercent = pos.averagePrice > 0
    ? ((pos.currentPrice - pos.averagePrice) / pos.averagePrice) * 100
    : 0;

  // VALUE in GBP: convert native-currency value using live GBPUSD rate.
  // gbpUsdRate = how many GBP per 1 USD (e.g. 0.79). Multiply USD value by this rate.
  const totalValueUsd = pos.currentPrice * pos.quantity;
  const totalValue = totalValueUsd * gbpUsdRate;

  // avgPrice and currentPrice displayed in native currency (USD) — these are raw market prices.
  // We keep them as-is; the VALUE column is what matters in GBP.

  // T212 /equity/portfolio has no previousClose or dailyOpen field, so a true 24h%
  // cannot be computed here. We set it to 0 and the UI renders "N/A" for this column.
  const percentageChange24h = 0;

  // Market Cap (in USD)
  let marketCap: number | undefined = undefined;
  if (quote && typeof quote.marketCap === 'number') {
    const rawCurrency = quote.currency || 'USD';
    // Yahoo Finance returns market cap in major currency (GBP) even if price is in pence (GBp/GBX)
    const mcapCurrency = (rawCurrency === 'GBp' || rawCurrency === 'GBX') ? 'GBP' : rawCurrency;
    marketCap = convertToUsd(quote.marketCap, mcapCurrency, gbpUsdRate);
  }

  return {
    ticker,
    name: ticker,
    quantity: pos.quantity,
    averagePrice,
    currentPrice,
    percentageChange24h,
    pnlValue,
    pnlPercent,
    totalValue,
    marketCap,
  };
}

export interface PortfolioServiceResponse {
  holdings: Holding[];
  summary: PortfolioSummary;
}

/** Cache for AMD pie tickers — refreshed every 5 minutes. */
interface PieCache {
  tickers: string[];
  expiresAt: number;
}
let pieCache: PieCache | null = null;
const PIE_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/** Cache for the full portfolio response — refreshed every 60 seconds. */
interface PortfolioCache {
  data: PortfolioServiceResponse;
  expiresAt: number;
}
let portfolioCache: PortfolioCache | null = null;
const PORTFOLIO_CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Fetch and cache the list of tickers that belong to the "AMD" pie.
 * Key rule: only update the cache when we actually retrieved pie details
 * successfully — never overwrite a good cache with [] due to a 429 on
 * the detail endpoint.
 */
async function fetchAmdPieTickers(
  baseUrl: string,
  headers: Record<string, string>
): Promise<string[]> {
  // Return cached result if still fresh
  if (pieCache && pieCache.expiresAt > Date.now()) {
    console.log('[T212] Using cached AMD pie tickers:', pieCache.tickers);
    return pieCache.tickers;
  }

  try {
    const piesRes = await fetch(`${baseUrl}/equity/pies`, { headers });
    if (!piesRes.ok) {
      // Rate-limited or error — keep stale cache rather than serving []
      console.warn(`[T212] Pies list failed (${piesRes.status}), using stale cache`);
      return pieCache?.tickers ?? [];
    }

    const basicPies: Array<{ id: number }> = await piesRes.json();

    // Fetch all pie details in parallel; individual failures return null
    const detailedPies = (await Promise.all(
      basicPies.map(bp =>
        fetch(`${baseUrl}/equity/pies/${bp.id}`, { headers })
          .then(res => (res.ok ? res.json() : null))
          .catch(err => {
            console.warn(`[T212] Failed to fetch pie ${bp.id} detail:`, err);
            return null;
          })
      )
    )).filter(Boolean);

    // If ALL detail calls failed (e.g. 429), don't poison the cache with [].
    // Return stale cache so AMD filtering keeps working.
    if (detailedPies.length === 0) {
      console.warn('[T212] All pie detail calls failed — keeping stale cache:', pieCache?.tickers ?? []);
      return pieCache?.tickers ?? [];
    }

    // The detailed pie response shape:
    // { settings: { id, name, ... }, instruments: [{ ticker, ... }] }
    const amdPie = detailedPies.find(
      (p: any) => (p?.settings?.name ?? '').trim().toUpperCase() === 'AMD'
    );

    const tickers: string[] = amdPie
      ? (amdPie.instruments ?? []).map((inst: any) => normaliseTicker(inst.ticker))
      : [];

    console.log('[T212] AMD pie tickers to exclude (refreshed):', tickers);

    // Only update cache if we got a positive result — never cache []
    // if we expected to find AMD but didn't (guards against transient API gaps)
    if (tickers.length > 0 || pieCache === null) {
      pieCache = { tickers, expiresAt: Date.now() + PIE_CACHE_TTL_MS };
    }
    return pieCache?.tickers ?? tickers;
  } catch (err) {
    console.warn('[T212] Error fetching AMD pie tickers:', err);
    return pieCache?.tickers ?? [];
  }
}

export async function fetchPortfolio(): Promise<PortfolioServiceResponse> {
  const apiKey = process.env.T212_API_KEY;
  const apiSecret = process.env.T212_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.warn('[T212] T212_API_KEY or T212_API_SECRET not set — returning mock portfolio data.');
    return { holdings: MOCK_HOLDINGS, summary: MOCK_PORTFOLIO_SUMMARY };
  }

  // Return cached portfolio if still fresh — prevents 429 from rapid polls / restarts
  if (portfolioCache && portfolioCache.expiresAt > Date.now()) {
    console.log('[T212] Serving cached portfolio response');
    return portfolioCache.data;
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const headers = { Authorization: `Basic ${credentials}` };
  const baseUrl = process.env.T212_BASE_URL || T212_BASE;

  try {
    // Fetch positions, cash summary, and live FX rate in parallel.
    // Pie fetching is handled separately with its own cache to avoid rate-limiting
    // the critical path — a pie failure should never block the portfolio load.
    const [positionsRes, cashRes, amdTickers, gbpUsdRate] = await Promise.all([
      fetch(`${baseUrl}/equity/portfolio`, { headers }),
      fetch(`${baseUrl}/equity/account/cash`, { headers }),
      fetchAmdPieTickers(baseUrl, headers),
      fetchGbpUsdRate(),
    ]);

    if (!positionsRes.ok || !cashRes.ok) {
      throw new Error(`T212 API error: ${positionsRes.status} / ${cashRes.status}`);
    }

    const positions: T212Position[] = await positionsRes.json();
    const cash: T212Cash = await cashRes.json();

    // Fetch quotes for all tickers in parallel
    const yahooSymbols = positions.map(p => getYahooSymbol(normaliseTicker(p.ticker)));
    const quotes = await Promise.all(
      yahooSymbols.map(sym => 
        (yahooFinance.quote(sym) as Promise<any>)
          .catch(err => {
            console.warn(`[YahooFinance] Failed to fetch quote for ${sym}:`, err);
            return null;
          })
      )
    );

    // Build quote mapping
    const quoteMap = new Map<string, any>();
    positions.forEach((pos, idx) => {
      const normalised = normaliseTicker(pos.ticker);
      const quote = quotes[idx];
      if (quote) {
        quoteMap.set(normalised, quote);
      }
    });

    // Separate all mapped holdings before filtering so we can compute AMD's aggregate contribution
    const allHoldings = positions.map((pos) => {
      const normalised = normaliseTicker(pos.ticker);
      return mapPosition(pos, gbpUsdRate, quoteMap.get(normalised));
    });

    // Compute how much the excluded AMD holdings contribute to account-wide totals.
    // totalValue and pnlValue are already in GBP (set by mapPosition).
    // investedValue = current value − P&L = cost basis in GBP.
    const amdHoldings = amdTickers.length > 0
      ? allHoldings.filter(h => amdTickers.includes(h.ticker))
      : [];

    const amdValue    = amdHoldings.reduce((s, h) => s + h.totalValue,  0);
    const amdPnl      = amdHoldings.reduce((s, h) => s + h.pnlValue,    0);
    const amdInvested = amdHoldings.reduce((s, h) => s + (h.totalValue - h.pnlValue), 0);

    // Keep only non-AMD holdings for the table
    const holdings = amdTickers.length > 0
      ? allHoldings.filter(h => !amdTickers.includes(h.ticker))
      : allHoldings;

    // Deduct AMD contributions from the account-wide cash totals so the header
    // reflects the Titanite pie only. cash.* values are all in GBP.
    const adjInvested = (cash.invested ?? 0) - amdInvested;
    const adjValue    = (cash.total    ?? 0) - amdValue;
    const adjPnl      = (cash.ppl      ?? 0) - amdPnl;

    const summary: PortfolioSummary = {
      totalInvested:  adjInvested,
      totalValue:     adjValue,
      totalPnlValue:  adjPnl,
      totalPnlPercent: adjInvested > 0 ? (adjPnl / adjInvested) * 100 : 0,
      cashBalance:    cash.free ?? 0,
    };

    // Store result in cache before returning
    const result = { holdings, summary };
    portfolioCache = { data: result, expiresAt: Date.now() + PORTFOLIO_CACHE_TTL_MS };
    return result;
  } catch (error) {
    console.error('[T212] Fetch portfolio failed, falling back to mock data.', error);
    return { holdings: MOCK_HOLDINGS, summary: MOCK_PORTFOLIO_SUMMARY };
  }
}
