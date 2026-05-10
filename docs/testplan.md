# Market Sentinel - Test Plan

## Philosophy
Testing is deferred to a dedicated sprint after the core feature set is complete.
We prioritise shipping features in the prototype and real-data phases first.
However, **the signal evaluator logic is the heart of this application** and must
be unit tested as it is written — this is non-negotiable.

**Framework:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
Vitest is chosen over Jest for its native TypeScript support, significantly faster
execution, and first-class compatibility with Next.js and Vite-based tooling.

---

## Priority Tiers

| Tier | What | When |
|------|------|------|
| **P0 — Write Now** | Signal evaluator pure logic | During Phase 3 |
| **P1 — Testing Sprint** | Zustand store operations, service transformers | After Phase 4 |
| **P2 — Testing Sprint** | UI component rendering | After Phase 4 |
| **P3 — Future** | E2E user journeys | After Phase 5 |

---

## P0: Signal Evaluator Unit Tests (`signalEvaluator.test.ts`)

These tests validate the core business logic. They are pure functions — no UI, no
mocks, no network. They must pass before any dashboard or builder UI is built.

### Test Suite: Static Threshold Operators

```
GIVEN a SubSignal with metric "VIX", operator ">", targetValue 25
WHEN current VIX = 27
THEN isMet = true

GIVEN a SubSignal with metric "VIX", operator ">", targetValue 25
WHEN current VIX = 24
THEN isMet = false

GIVEN a SubSignal with metric "TNX", operator ">=", targetValue 4.5
WHEN current TNX = 4.5
THEN isMet = true
```

### Test Suite: Comparative / Crossover Operators

```
GIVEN a SubSignal with metric "EMA_50", operator "CROSS_BELOW", targetMetric "EMA_200"
WHEN previous EMA_50 = 201, current EMA_50 = 199, EMA_200 = 200
THEN isMet = true (a crossover event occurred)

GIVEN the same signal
WHEN previous EMA_50 = 195 (already below), current EMA_50 = 198, EMA_200 = 200
THEN isMet = false (cross already happened, not a new event)
```

### Test Suite: Master Signal AND Mode

```
GIVEN a MasterSignal with logicMode "AND" and 3 SubSignals
WHEN 2/3 SubSignals are met
THEN isTriggered = false
THEN completionPercentage = 66.67
THEN metConditions = 2

WHEN all 3/3 SubSignals are met
THEN isTriggered = true
THEN completionPercentage = 100
```

### Test Suite: Master Signal OR Mode

```
GIVEN a MasterSignal with logicMode "OR" and 3 SubSignals
WHEN 1/3 SubSignals is met
THEN isTriggered = true
THEN completionPercentage = 33.33

WHEN 0/3 SubSignals are met
THEN isTriggered = false
THEN completionPercentage = 0
```

### Test Suite: Edge Cases

```
GIVEN a MasterSignal with 0 SubSignals
THEN completionPercentage = 0
THEN isTriggered = false (should not throw)

GIVEN a SubSignal with targetValue = 0
WHEN current value = 0, operator "EQUALS"
THEN isMet = true

GIVEN a SubSignal where alertEnabled = false
THEN the SubSignal evaluates normally but does not flag for notification
```

---

## P1: Zustand Store Unit Tests (`signalStore.test.ts`)

```
WHEN addMasterSignal is called with a valid MasterSignal
THEN the store contains the new signal
THEN the store length increases by 1

WHEN removeMasterSignal is called with a valid id
THEN the signal is removed from the store

WHEN updateMasterSignal is called
THEN only the targeted signal is modified
THEN other signals are unchanged

WHEN toggleAlertEnabled is called on a SubSignal
THEN only that SubSignal's alertEnabled is flipped
```

---

## P1: API Service Transformer Unit Tests

These tests validate that raw API responses are correctly normalised into our
internal types. They do NOT make real network calls (responses are fixtures).

### `trading212.test.ts`
```
GIVEN raw T212 portfolio response
WHEN normalisePortfolio() is called
THEN ticker suffix "_US_EQ" is stripped → "LUNR"
THEN pnlPercent is correctly calculated
THEN all required Holding fields are present and typed correctly
```

### `congress.test.ts`
```
GIVEN raw SenateStockWatcher response
WHEN normaliseCongressTrades() is called
THEN type "Purchase" is mapped to tradeType "BUY"
THEN type "Sale" is mapped to tradeType "SELL"
THEN disclosure_date is converted to ISO 8601
THEN source is set to "SENATE_WATCHER"
```

---

## P2: Component Tests (React Testing Library)

### `MasterSignalCard.test.tsx`
```
GIVEN a MasterSignal with completionPercentage = 50
THEN the ProgressMeter renders at 50% width

GIVEN a MasterSignal with isTriggered = true
THEN the status badge renders as "ALERT"
THEN the badge has the correct red colour class
```

### `ConditionRow.test.tsx`
```
GIVEN a ConditionRow rendered in the Signal Builder
WHEN the metric selector changes
THEN the operator dropdown updates to only show valid operators for that metric type

WHEN the form is submitted with an empty targetValue
THEN a validation error is displayed
```

---

## P3: End-to-End Tests (Playwright — future)

```
SCENARIO: User creates a Master Signal
  GIVEN the user is on /builder
  WHEN they add two conditions and press "Save Master Signal"
  THEN the new MS appears in the saved signals list
  AND navigating to /dashboard shows the new MS card

SCENARIO: MS triggers an alert
  GIVEN a Master Signal with all conditions met
  WHEN the user views /dashboard
  THEN the MS card shows status "ALERT" with red badge
  AND completionPercentage = 100%
```

---

## Running Tests

```bash
# Run all tests
npx vitest

# Run tests in watch mode (during development)
npx vitest --watch

# Run only the signal evaluator tests
npx vitest signalEvaluator
```
