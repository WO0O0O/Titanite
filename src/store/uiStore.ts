'use client';

/**
 * uiStore — Zustand store for ephemeral UI state.
 *
 * Keeps UI concerns (which signal is selected, Warsh sentiment toggle)
 * cleanly separated from data concerns in signalStore.
 */

import { create } from 'zustand';

interface UIStore {
  /** Which MS is currently selected/being edited in the Signal Builder */
  selectedMasterSignalId: string | null;
  setSelectedMasterSignalId: (id: string | null) => void;

  /**
   * Warsh Sentiment manual toggle — encoded as number to match the
   * WARSH_SENTIMENT metric in METRIC_REGISTRY (1=HAWKISH, 0=NEUTRAL, -1=DOVISH).
   * When this changes, the signalStore.evaluateAll() should be re-run.
   */
  warshSentiment: 1 | 0 | -1;
  setWarshSentiment: (value: 1 | 0 | -1) => void;

  /** Dashboard layout toggle */
  dashboardLayout: 'SIGNALS_PRIMARY' | 'HOLDINGS_PRIMARY';
  setDashboardLayout: (layout: 'SIGNALS_PRIMARY' | 'HOLDINGS_PRIMARY') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedMasterSignalId: null,
  setSelectedMasterSignalId: (id) => set({ selectedMasterSignalId: id }),

  warshSentiment: 0, // Default: NEUTRAL
  setWarshSentiment: (value) => set({ warshSentiment: value }),

  dashboardLayout: 'SIGNALS_PRIMARY',
  setDashboardLayout: (layout) => set({ dashboardLayout: layout }),
}));
