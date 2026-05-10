export interface CongressTrade {
  id: string;
  politician: string;
  chamber: 'SENATE' | 'HOUSE';
  party: 'D' | 'R' | 'I' | 'UNKNOWN';
  ticker: string;
  assetDescription: string;
  tradeType: 'BUY' | 'SELL';
  amountRange: string;
  transactionDate: string;
  disclosureDate: string;
  source: 'SENATE_WATCHER' | 'HOUSE_WATCHER' | 'FINNHUB';
  sourceUrl?: string;
}
