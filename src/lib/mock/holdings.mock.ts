/**
 * Mock holdings — mirrors the real Trading 212 Holding type exactly.
 * In Phase 5, this file is replaced by a live T212 API fetch.
 */

import type { Holding, PortfolioSummary } from '@/types/holdings';

export const MOCK_HOLDINGS: Holding[] = [
  {
    ticker: 'LUNR',
    name: 'Intuitive Machines',
    quantity: 150,
    averagePrice: 6.8,
    currentPrice: 7.95,
    percentageChange24h: 3.2,
    pnlValue: 172.5,
    pnlPercent: 16.91,
    totalValue: 1192.5,
  },
  {
    ticker: 'RKLB',
    name: 'Rocket Lab USA',
    quantity: 200,
    averagePrice: 8.5,
    currentPrice: 9.2,
    percentageChange24h: 2.1,
    pnlValue: 140.0,
    pnlPercent: 8.24,
    totalValue: 1840.0,
  },
  {
    ticker: 'ASTS',
    name: 'AST SpaceMobile',
    quantity: 100,
    averagePrice: 12.0,
    currentPrice: 14.5,
    percentageChange24h: 6.8,
    pnlValue: 250.0,
    pnlPercent: 20.83,
    totalValue: 1450.0,
  },
  {
    ticker: 'PLTR',
    name: 'Palantir Technologies',
    quantity: 50,
    averagePrice: 22.0,
    currentPrice: 24.5,
    percentageChange24h: 4.5,
    pnlValue: 125.0,
    pnlPercent: 11.36,
    totalValue: 1225.0,
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 10,
    averagePrice: 450.0,
    currentPrice: 875.0,
    percentageChange24h: 5.2,
    pnlValue: 4250.0,
    pnlPercent: 94.44,
    totalValue: 8750.0,
  },
];

export const MOCK_PORTFOLIO_SUMMARY: PortfolioSummary = {
  totalInvested: 9357.5,
  totalValue: 14457.5,
  totalPnlValue: 4937.5,
  totalPnlPercent: 52.76,
  cashBalance: 1250.5,
};
