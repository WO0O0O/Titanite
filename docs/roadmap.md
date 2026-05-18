# Market Sentinel — Future Roadmap

> This document outlines all planned and stretch-goal phases beyond Phase 5.1.
> Phases are ordered by priority and dependency. Read alongside `phases.md`.

---

## Phase 5.5 — Housekeeping & Stability (Do First) 🔧

Small but blocking issues before starting Phase 6.

- [ ] **Intel page crash** — `MOCK_FED_WATCH_ITEMS is not defined`. Quick fix: check IntelContent mock import.
- [ ] **Yahoo Finance deprecation** — `historical()` has been removed upstream. Must migrate to `chart()` in `yahooFinance.service.ts` before Yahoo kill it server-side.
- [ ] **Congress tab** — Stop showing broken data. Replace `CongressContent` with a clean "Coming Soon" stub explaining the feature is paused (S3 rate limiting). Keep all existing code — just gate the UI.

**Estimated effort:** 1 short session.

---

## Phase 6 — Web Intelligence Layer (News Signal Inputs) 🌐

**Goal:** Give users live evidence for the 4 macro/supply chain signals. No LLM needed — keyword matching + RSS is sufficient for a first pass.

### The 4 Target Signals

| Signal ID | Name | What to Watch |
|---|---|---|
| `POWER_WALL` | Infrastructure Chokepoint | Transformer/switchgear lead times, grid allocation freezes |
| `HYPERSCALER_CAPEX` | CapEx Indigestion | MSFT/META/AMZN/GOOGL CapEx vs cloud revenue divergence |
| `LEAD_TIME_TRAP` | Lead-Time Trap | NVDA GPU delivery windows normalising (40wk → 12wk) |
| `DEFERRED_DELIVERY` | Deferred Delivery | GLW/LPKF/AAOI earnings transcripts for pushout language |

### Step 6a — Enhanced News Monitoring

Extend the existing Finnhub service to pull company-specific news for signal-relevant tickers:
- **Tickers to monitor:** `NVDA, MSFT, META, AMZN, GOOGL, GLW, AAOI, LPKF, EATON, ABB`
- Add an RSS fallback: Google News RSS feeds are free, no key, no rate limit
- Each news item gets auto-tagged with which of the 4 signals it's relevant to (keyword matching)

**Keyword rules (examples):**
```
POWER_WALL:       "transformer", "grid delay", "power allocation", "interconnect"
HYPERSCALER_CAPEX: "capex", "infrastructure spend", "cloud revenue", "AI monetization"
LEAD_TIME_TRAP:   "lead time", "delivery window", "backlog", "double-order", "inventory"
DEFERRED_DELIVERY: "site readiness", "pushout", "deferred", "customer delay", "revenue recognition"
```

### Step 6b — SEC EDGAR Integration (Earnings Transcripts)

SEC EDGAR is free, no API key, officially supported REST API.
- Fetch 10-Q/10-K/8-K filings for target companies
- Search filing text for keyword phrases (same rules as 6a)
- Surface matches in Intel Hub with filing date, company, quote snippet

> This is the key differentiator — catching "site readiness delays" in earnings transcripts before it hits mainstream news.

### Step 6c — Signal Evidence Panel in Intel Hub

Each of the 4 signals gets a panel in the Intel Hub showing:
- Evidence count this week (news articles + filing mentions)
- Top 3 most relevant snippets
- A manual "TRIGGER" button the user can fire if they judge the evidence sufficient (fires the Master Signal)
- Evidence trend (is the signal heating up or cooling?)

**Estimated effort:** 2-3 sessions. No LLM, no paid APIs, no new infrastructure.

---

## Phase 7 — Discord Notifications 🔔

**Why Discord:** Webhook URL only (paste into `.env.local`), free forever, rich embeds with colour/fields, works server-side with no OAuth setup. Most reliable free option.

### How It Works

1. User adds `DISCORD_WEBHOOK_URL` to `.env.local`
2. When any Master Signal triggers (via `evaluateAll()`), the server sends a POST to the webhook
3. Discord renders a rich embed: signal name, triggered conditions, current values, timestamp

### What Gets Sent

```
🔴 SIGNAL TRIGGERED — "AI Bubble Deflation Watch"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VIX > 25           ✅  Current: 27.4
SPX < EMA-200      ✅  Current: 5,180 | EMA-200: 5,390
TNX > 4.5%         ✅  Current: 4.67%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3/3 conditions met (AND logic)
Triggered at: 14:32 BST — Market Sentinel
```

### Cron / Evaluation Schedule

Rather than only triggering on page load, add a Next.js route handler that can be called on a schedule:
- `GET /api/evaluate` — re-fetches market data and runs `evaluateAll()`, sends Discord notification if anything triggered since last check
- Can be called by a free cron service (e.g. cron-job.org, which hits a URL on a schedule)
- No server infrastructure needed — purely serverless

**Estimated effort:** 1 session. Very contained change.

---

## Phase 8 — Signal Builder v2: More Metrics & Sources 📊

**Goal:** Massively expand what metrics can be used in Sub-Signal conditions.

### New Metric Categories

| Category | New Metrics |
|---|---|
| **Technical** | RSI (14/21), MACD line vs signal, Bollinger Band % |
| **Macro** | DXY (Dollar Index), US10Y-US2Y spread (yield curve), Copper/Gold ratio |
| **Sentiment** | News sentiment score (from Phase 6 keyword engine), Fear & Greed index |
| **Custom Intelligence** | `POWER_WALL` evidence score, `HYPERSCALER_CAPEX` score, `LEAD_TIME_TRAP` score, `DEFERRED_DELIVERY` score |
| **Volatility** | VIX term structure (VIX3M/VIX ratio), VVIX |

### Builder UX Improvements

- Group metrics by category in the `MetricSelector` dropdown
- Add a "Preview" mode showing current value of each metric before adding it to a condition
- Allow users to name and save custom Sub-Signal templates
- Signal library: a pre-built set of common conditions users can drag into their Master Signal (e.g. "Golden Cross", "VIX Spike", "Yield Curve Inversion")

**Estimated effort:** 2 sessions. Mostly additive — `METRIC_REGISTRY` is already extensible.

---

## Phase 9 — Database & Persistence (Supabase) 🗄️

**Goal:** Move signals out of ephemeral Zustand state into a real database so they persist across sessions and can scale.

### Migration Plan

1. Set up Supabase project (free tier: 500MB, 2 projects)
2. Schema:
   - `master_signals` table (mirrors `MasterSignal` type)
   - `sub_signals` table (conditions, linked to master_signal_id)
   - `signal_events` table (audit log — when was each signal triggered, what were the values)
   - `alert_deliveries` table (which Discord notifications have been sent, to avoid duplicates)
3. Replace Zustand `signalStore` with Supabase queries
4. Add Supabase Auth (magic link or Google OAuth) for single-user login

> This is also when the signal library (Phase 8) becomes shareable — multiple users can use the same pre-built signals.

**Estimated effort:** 2-3 sessions. Most complex phase — data migration must not break existing signals.

---

## Stretch Goals (No Timeline)

These are captured here so they're not forgotten, but have no planned start date.

### S1 — Backtesting Engine
- Given a Master Signal's conditions, show whether it would have triggered at any point over the last 12 months using historical data
- Requires storing historical metric snapshots (needs Supabase from Phase 9)
- Visualised as a timeline with trigger points marked

### S2 — Per-Holding Signals
- Sub-signals based on specific tickers in the T212 portfolio (e.g. "NVDA drops > 8% in a session")
- Requires cross-referencing yahoo-finance2 daily quotes against T212 holdings

### S3 — Congress Tracker (Resume)
- Resume if Senate/House Stock Watcher S3 access becomes reliable, or find an alternative data source
- All code is preserved and ready — just needs the UI gate removed

### S4 — LLM Earnings Analysis
- Pass earnings transcript text to an LLM (GPT-4o, Gemini, or a free local model via Ollama)
- Extract structured signals: sentiment, specific phrase matches, forward guidance changes
- Would dramatically improve Phase 6's evidence quality
- Blocked on: LLM API cost or local model setup

---

## Recommended Next Session Order

1. **Phase 5.5** — Fix Intel crash + Yahoo deprecation + Congress stub (1 session)
2. **Phase 7** — Discord notifications (1 session, low complexity, high value)
3. **Phase 6** — Web Intelligence Layer (2-3 sessions, the main differentiator)
4. **Phase 8** — More signal metrics (2 sessions, builder improvements)
5. **Phase 9** — Supabase when scale requires it

---

*Last updated: 2026-05-18*
