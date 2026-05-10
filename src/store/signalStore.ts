'use client';

/**
 * signalStore — Zustand store for all Master Signal state.
 *
 * Ephemeral for the prototype (lives in memory, resets on page refresh).
 * In Phase 6, this will be replaced by Supabase persistence with the
 * same interface — components will not need to change.
 *
 * The store is initialised with mock Master Signals pre-evaluated against
 * mock market data so the UI has meaningful content from the first render.
 */

import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { MasterSignal, SubSignal } from '@/types/signals';
import type { MarketContext } from '@/types/market';
import { evaluateAllMasterSignals, evaluateMasterSignal } from '@/lib/evaluator/signalEvaluator';
import { MOCK_MASTER_SIGNALS } from '@/lib/mock/masterSignals.mock';
import { MOCK_MARKET_CONTEXT } from '@/lib/mock/marketData.mock';

interface SignalStore {
  masterSignals: MasterSignal[];
  /** The market context used for the last evaluation run */
  lastContext: MarketContext | null;

  // ── CRUD ──────────────────────────────────────────────────────────────────
  addMasterSignal: (
    draft: Omit<MasterSignal, 'id' | 'createdAt' | 'totalConditions' | 'metConditions' | 'completionPercentage' | 'isTriggered'>
  ) => void;
  updateMasterSignal: (id: string, updates: Partial<Omit<MasterSignal, 'id'>>) => void;
  removeMasterSignal: (id: string) => void;

  // ── Evaluation ────────────────────────────────────────────────────────────
  /** Re-evaluates all signals against a new market context */
  evaluateAll: (context: MarketContext) => void;
}

export const useSignalStore = create<SignalStore>((set, get) => ({
  // Initialise with mock signals already evaluated so the UI isn't empty
  masterSignals: evaluateAllMasterSignals(MOCK_MASTER_SIGNALS, MOCK_MARKET_CONTEXT),
  lastContext: MOCK_MARKET_CONTEXT,

  addMasterSignal: (draft) => {
    const context = get().lastContext ?? MOCK_MARKET_CONTEXT;

    // Build the full MasterSignal and immediately evaluate it
    const newSignal: MasterSignal = {
      ...draft,
      id: uuid(),
      createdAt: new Date().toISOString(),
      totalConditions: draft.conditions.length,
      metConditions: 0,
      completionPercentage: 0,
      isTriggered: false,
    };

    const evaluated = evaluateMasterSignal(newSignal, context);
    set((state) => ({ masterSignals: [...state.masterSignals, evaluated] }));
  },

  updateMasterSignal: (id, updates) => {
    const context = get().lastContext ?? MOCK_MARKET_CONTEXT;
    set((state) => ({
      masterSignals: state.masterSignals.map((ms) => {
        if (ms.id !== id) return ms;
        const updated = { ...ms, ...updates };
        // Re-evaluate immediately after any update so computed fields stay in sync
        return evaluateMasterSignal(updated, context);
      }),
    }));
  },

  removeMasterSignal: (id) =>
    set((state) => ({
      masterSignals: state.masterSignals.filter((ms) => ms.id !== id),
    })),

  evaluateAll: (context) =>
    set((state) => ({
      masterSignals: evaluateAllMasterSignals(state.masterSignals, context),
      lastContext: context,
    })),
}));

// ── Derived selectors (keeps components lean) ─────────────────────────────────

/** Returns only triggered Master Signals — used for alert badge counts */
export const selectTriggeredSignals = (state: SignalStore) =>
  state.masterSignals.filter((ms) => ms.isTriggered);

/** Returns a specific signal by ID */
export const selectSignalById = (id: string) => (state: SignalStore) =>
  state.masterSignals.find((ms) => ms.id === id);
