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
};

/** Strip T212's internal suffix (e.g. "NVDA_US_EQ" → "NVDA") and apply display overrides. */
function normaliseTicker(t212Ticker: string): string {
  const base = t212Ticker.split('_')[0];
  return TICKER_DISPLAY_OVERRIDES[base] ?? base;
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

function mapPosition(pos: T212Position, gbpUsdRate: number): Holding {
  const ticker = normaliseTicker(pos.ticker);

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

  return {
    ticker,
    name: ticker,
    quantity: pos.quantity,
    averagePrice: pos.averagePrice,
    currentPrice: pos.currentPrice,
    percentageChange24h,
    pnlValue,
    pnlPercent,
    totalValue,
  };
}

export interface PortfolioServiceResponse {
  holdings: Holding[];
  summary: PortfolioSummary;
}

export async function fetchPortfolio(): Promise<PortfolioServiceResponse> {
  const apiKey = process.env.T212_API_KEY;
  const apiSecret = process.env.T212_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.warn('[T212] T212_API_KEY or T212_API_SECRET not set — returning mock portfolio data.');
    return { holdings: MOCK_HOLDINGS, summary: MOCK_PORTFOLIO_SUMMARY };
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const headers = { Authorization: `Basic ${credentials}` };
  const baseUrl = process.env.T212_BASE_URL || T212_BASE;

  try {
    // Fetch positions, cash summary, and live FX rate in parallel
    const [positionsRes, cashRes, gbpUsdRate] = await Promise.all([
      fetch(`${baseUrl}/equity/portfolio`, { headers }),
      fetch(`${baseUrl}/equity/account/cash`, { headers }),
      fetchGbpUsdRate(),
    ]);

    if (!positionsRes.ok || !cashRes.ok) {
      throw new Error(`T212 API error: ${positionsRes.status} / ${cashRes.status}`);
    }

    const positions: T212Position[] = await positionsRes.json();
    const cash: T212Cash = await cashRes.json();

    const holdings = positions.map((pos) => mapPosition(pos, gbpUsdRate));

    // We use the official T212 Cash endpoint payload for portfolio totals — these are already in GBP
    const summary: PortfolioSummary = {
      totalInvested: cash.invested ?? 0,
      totalValue: cash.total ?? 0,
      totalPnlValue: cash.ppl ?? 0,
      totalPnlPercent: cash.invested && cash.invested > 0 ? (cash.ppl / cash.invested) * 100 : 0,
      cashBalance: cash.free ?? 0,
    };

    return { holdings, summary };
  } catch (error) {
    console.error('[T212] Fetch portfolio failed, falling back to mock data.', error);
    return { holdings: MOCK_HOLDINGS, summary: MOCK_PORTFOLIO_SUMMARY };
  }
}
