# Market Sentinel - Data Models

## 1. Sub-Signal (Signal Condition)
A specific individual condition that evaluates to true/false.

```typescript
type Operator = '>' | '<' | '>=' | '<=' | 'CROSS_ABOVE' | 'CROSS_BELOW' | 'EQUALS';

interface SubSignal {
  id: string;
  name: string; // e.g., "TNX > 4.5%" or "EMA50 < EMA200"
  metric: string; // e.g., "TNX", "EMA_50", "GOLD_PRICE"
  operator: Operator;
  targetValue?: number; // Static threshold (e.g., 4.5)
  targetMetric?: string; // Comparative threshold (e.g., "EMA_200")
  isMet: boolean; // Current evaluation state
  alertEnabled: boolean; // Does this individual condition trigger a notification?
}
```

## 2. Master Signal (MS)
A composed logic block containing multiple Sub-Signals. Acts as a "meter" until fully triggered.

```typescript
interface MasterSignal {
  id: string;
  name: string; // e.g., "Macro Tech Crash Warning"
  conditions: SubSignal[]; // The sub-signals inside this MS
  logicMode: 'AND' | 'OR'; 
  
  // Metering Logic
  totalConditions: number;
  metConditions: number;
  completionPercentage: number; // For the visual meter (e.g., 2/4 conditions = 50%)
  
  isTriggered: boolean; // True when the MS conditions are fully met based on logicMode
  alertEnabled: boolean; // Does the overall MS trigger a notification?
}
```

## 3. Holding (Trading 212 Asset)
Representation of a user's stock holding.

```typescript
interface Holding {
  ticker: string; // e.g., "LUNR"
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  percentageChange24h: number;
  totalValue: number;
}
```

## 4. Intel Feed Item
A highly targeted news or sentiment update.

```typescript
interface IntelItem {
  id: string;
  source: string; // e.g., "Yahoo Finance", "Warsh Tracker"
  title: string;
  url: string;
  publishedAt: string;
  relatedTickers: string[]; // Tickers this relates to (e.g., ["LUNR", "RKLB"])
  relatedSignals: string[]; // IDs of signals this news might impact
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}
```
