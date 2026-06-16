/** A single user holding from the Trading 212 portfolio. */
export interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  percentageChange24h: number;
  pnlValue: number;
  pnlPercent: number;
  totalValue: number;
  marketCap?: number;
}

/** Aggregate totals shown above the holdings table. */
export interface PortfolioSummary {
  totalInvested: number;
  totalValue: number;
  totalPnlValue: number;
  totalPnlPercent: number;
  cashBalance: number;
}
