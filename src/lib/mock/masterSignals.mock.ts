/**
 * Pre-built Master Signal examples for the prototype.
 * These demonstrate the full range of the completion meter UI:
 *
 *   Signal 1 — "Macro Tech Crash Warning" : 0% complete (AND, nothing triggered)
 *   Signal 2 — "Elevated Risk Watch"      : 50% / triggered (OR, 1/2 met)
 *   Signal 3 — "Gold Uptrend Confirmed"   : 100% / triggered (AND, 2/2 met)
 *
 * isMet values here are initial defaults — the evaluator recalculates
 * them on first run against MOCK_MARKET_CONTEXT.
 */

import type { MasterSignal } from '@/types/signals';

export const MOCK_MASTER_SIGNALS: MasterSignal[] = [
  {
    id: 'ms-001',
    name: 'Macro Tech Crash Warning',
    logicMode: 'AND',
    alertEnabled: true,
    createdAt: '2025-05-01T09:00:00Z',
    conditions: [
      {
        id: 'c-001-1',
        name: 'TNX above critical',
        metric: 'TNX',
        operator: '>',
        targetValue: 4.5,
        isMet: false,
        alertEnabled: true,
      },
      {
        id: 'c-001-2',
        name: 'VIX panic level',
        metric: 'VIX',
        operator: '>',
        targetValue: 25,
        isMet: false,
        alertEnabled: true,
      },
      {
        id: 'c-001-3',
        name: 'S&P 500 below 200-day MA',
        metric: 'SP500',
        operator: '<',
        targetValue: 6550,
        isMet: false,
        alertEnabled: true,
      },
      {
        id: 'c-001-4',
        name: 'Warsh is Hawkish',
        metric: 'WARSH_SENTIMENT',
        operator: 'EQUALS',
        targetValue: 1,
        isMet: false,
        alertEnabled: false,
      },
    ],
    totalConditions: 4,
    metConditions: 0,
    completionPercentage: 0,
    isTriggered: false,
  },
  {
    id: 'ms-002',
    name: 'Elevated Risk Watch',
    logicMode: 'OR',
    alertEnabled: true,
    createdAt: '2025-05-03T14:30:00Z',
    conditions: [
      {
        id: 'c-002-1',
        name: 'VIX elevated',
        metric: 'VIX',
        operator: '>',
        targetValue: 20,
        isMet: false,
        alertEnabled: true,
      },
      {
        id: 'c-002-2',
        name: 'TNX above warning',
        metric: 'TNX',
        operator: '>',
        targetValue: 4.3,
        // TNX is 4.48 in mock data — this will evaluate to true
        isMet: false,
        alertEnabled: true,
      },
    ],
    totalConditions: 2,
    metConditions: 0,
    completionPercentage: 0,
    isTriggered: false,
  },
  {
    id: 'ms-003',
    name: 'Gold Uptrend Confirmed',
    logicMode: 'AND',
    alertEnabled: true,
    createdAt: '2025-05-05T11:15:00Z',
    conditions: [
      {
        id: 'c-003-1',
        name: 'Gold above $2,300',
        metric: 'GOLD_PRICE',
        operator: '>',
        targetValue: 2300,
        // Gold is $2,310 in mock — this will evaluate to true
        isMet: false,
        alertEnabled: true,
      },
      {
        id: 'c-003-2',
        name: 'Gold above EMA 50',
        metric: 'GOLD_PRICE',
        operator: '>',
        targetValue: 2260,
        // Gold EMA50 is $2,260 in mock — this will evaluate to true
        isMet: false,
        alertEnabled: true,
      },
    ],
    totalConditions: 2,
    metConditions: 0,
    completionPercentage: 0,
    isTriggered: false,
  },
];
