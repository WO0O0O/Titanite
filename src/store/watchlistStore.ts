import { create } from 'zustand';

interface WatchlistState {
  tickers: string[];
  addTicker: (ticker: string) => void;
  removeTicker: (ticker: string) => void;
  initWatchlist: () => void;
}

const DEFAULT_TICKERS = ['SIVE', 'IQE', 'MU', 'POET', 'AXTI', 'NVDA'];
const STORAGE_KEY = 'titanite_watchlist_tickers';

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  tickers: DEFAULT_TICKERS,

  initWatchlist: () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ tickers: JSON.parse(stored) });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TICKERS));
      }
    } catch (e) {
      console.error('Failed to load watchlist from localStorage', e);
    }
  },

  addTicker: (ticker: string) => {
    const cleanTicker = ticker.trim().toUpperCase();
    if (!cleanTicker) return;
    const current = get().tickers;
    if (current.includes(cleanTicker)) return;

    const next = [...current, cleanTicker];
    set({ tickers: next });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  },

  removeTicker: (ticker: string) => {
    const cleanTicker = ticker.trim().toUpperCase();
    const current = get().tickers;
    const next = current.filter(t => t !== cleanTicker);
    set({ tickers: next });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  },
}));
