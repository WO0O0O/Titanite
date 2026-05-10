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

/** Strip T212's internal suffix (e.g. "NVDA_US_EQ" → "NVDA") */
function normaliseTicker(t212Ticker: string): string {
  return t212Ticker.split('_')[0];
}

function mapPosition(pos: T212Position): Holding {
  const ticker = normaliseTicker(pos.ticker);
  const totalValue = pos.currentPrice * pos.quantity;
  const totalInvested = pos.averagePrice * pos.quantity;
  const pnlValue = pos.ppl;
  const pnlPercent = totalInvested > 0 ? (pnlValue / totalInvested) * 100 : 0;
  const change24h = pos.currentPrice > 0
    ? ((pos.currentPrice - pos.averagePrice) / pos.averagePrice) * 100
    : 0;

  return {
    ticker,
    name: ticker, // T212 position endpoint doesn't return company name — enriched later if needed
    quantity: pos.quantity,
    averagePrice: pos.averagePrice,
    currentPrice: pos.currentPrice,
    percentageChange24h: change24h,
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
    const [positionsRes, cashRes] = await Promise.all([
      fetch(`${baseUrl}/equity/portfolio`, { headers }),
      fetch(`${baseUrl}/equity/account/cash`, { headers }),
    ]);

      if (!positionsRes.ok || !cashRes.ok) {
        throw new Error(`T212 API error: ${positionsRes.status} / ${cashRes.status}`);
      }

      const positions: T212Position[] = await positionsRes.json();
      const cash: T212Cash = await cashRes.json();

      const holdings = positions.map(mapPosition);

      // We use the official T212 Cash endpoint payload for portfolio totals as it is the exact truth
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
