# Market Sentinel - Development Phases

## Phase 1: Planning and Setup
- [x] Create project documentation (`docs/` folder).
- [x] Initialize Next.js (App Router) project with Tailwind CSS.
- [x] Install core dependencies (Zustand, TanStack Query, Lucide Icons, Recharts).
- [x] Finalize architecture, API strategy, and data models.
- [ ] Install `yahoo-finance2` package.
- [ ] Create `.env.local` with T212 and Finnhub key placeholders.

## Phase 2: Core UI Scaffold & Theming (High-Fidelity Prototype)
- [ ] Define the strict "Bloomberg Terminal" dark theme in Tailwind config (true blacks, neon accents, monospaced fonts).
- [ ] Create base layout: Sidebar navigation, Header, and Main terminal-style window.
- [ ] Implement foundational UI elements (Dense Data Tables, Progress Meters, Status Badges).

## Phase 3: State Management & Mock Prototype Logic
- [ ] Configure Zustand for ephemeral state (storing the prototype Master Signals and Holdings without a database).
- [ ] Implement the logic evaluator: Sub-Signals feeding into a Master Signal "completion meter".
- [ ] Build the Signal Builder UI (`/builder`) allowing combination of metrics and comparative logic (e.g., EMA crosses).

## Phase 4: Dashboard, Intel Hub & Congress Tracker UI
- [ ] Build the `/dashboard` grid displaying active Master Signals (progress meters) and current T212 holdings.
- [ ] Build the `/intel` feed UI, styled as a raw terminal log that filters news by active holdings/signals.
- [ ] Build the `/congress` tracker table with politician and ticker filters.

## Phase 5: API Integration & Real Data Layer
- [ ] Integrate `yahoo-finance2` for live Market Pillars (TNX, VIX, S&P 500, Gold, EMAs 9/21/50/200).
- [ ] Integrate Trading 212 Official API for live portfolio holdings.
- [ ] Connect SenateStockWatcher + HouseStockWatcher + Finnhub for the Congress Tracker.
- [ ] Connect filtered news/RSS feed for the Intel Hub.
- [ ] Remove `NEXT_PUBLIC_USE_MOCK_DATA=true` flag.

## Phase 6: Backend & User Authentication (Future)
- [ ] Set up Supabase PostgreSQL database.
- [ ] Migrate Zustand state over to Supabase schema.
- [ ] Implement User Authentication for scalable deployment.
