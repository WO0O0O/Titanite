export interface WatchlistItem {
  ticker: string;
  name: string;
  price: number;
  marketCap?: number;
  /** ISO 4217 currency code for the price (e.g. USD, SEK, EUR, GBP, GBp) */
  currency?: string;
}
