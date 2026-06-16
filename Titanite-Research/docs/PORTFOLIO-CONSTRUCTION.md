# PORTFOLIO CONSTRUCTION META-FRAMEWORK

## Portfolio-Level Risk Management Overlay

This framework operates **above** individual company analysis to prevent concentration risk from compounding beyond acceptable levels. Individual companies may score Tier 1 (13/13) but position sizing must still comply with portfolio-level constraints.

---

## CORE POSITION SIZING RULES

### Rule 1: Single-Name Concentration Limit
**Maximum 20% allocation to any single ticker**

**Rationale:** Micro-cap volatility can produce 50-80% drawdowns even in high-conviction names. A 20% position declining 70% causes a 14% portfolio-level loss—painful but survivable. A 40% position declining 70% causes a 28% loss that may trigger forced liquidations.

**Rebalancing Trigger:** If any position grows beyond 22% due to price appreciation, rebalance within 30 days by:
- Trimming position to 20%
- Reallocating proceeds to underweight positions or cash

**Exception:** Positions may temporarily exceed 20% during acquisition events or low-liquidity periods, but must be rebalanced within 90 days.

---

### Rule 2: Subsector Concentration Limit
**Maximum 40% allocation to any single subsector**

**Subsector Definitions:**
- **Photonics:** Optical transceivers, silicon photonics, InP/GaAs epi-wafers, laser components (e.g., SIVE, IQE, AAOI, FOCI, SHUNSIN, AXTI)
- **Energy/Power:** Nuclear, SMRs, fuel cells, grid infrastructure, compression (e.g., TLN, BE, VST, CEG, OKLO, ASPI, USAC)
- **AI Cloud Infrastructure:** Data centre operators, GPU-as-a-service, colocation (e.g., NBIS, BRUN, DGXX, SKM, PENG, KEEL)
- **Semiconductors/Materials:** Foundries, specialty materials, packaging equipment (e.g., SHT, ALBKK, TRT, XFAB, SOITEC)
- **Robotics/Vision:** Lidar, radar, DMS, autonomous systems (e.g., ACCON, GAPW, SEYE, SEE, OUST)
- **Quantum Computing:** Hardware, software, critical components (e.g., INFQ, XNDU, AMPG)
- **Defense/Space:** Direct defense contractors, space infrastructure (e.g., ONDS, EOS, RKLB, LUNR, ASTS)
- **Server Systems/Networking:** Server manufacturers, cooling, network infrastructure (e.g., AL2SI, SILC)

**Rationale:** Subsector risk is highly correlated. A single technological obsolescence event (e.g., CPO displacing pluggable optics) or demand shock (e.g., hyperscaler capex cuts) can simultaneously crater all names in a subsector. 40% limit ensures survival even if an entire subsector enters a multi-year bear market.

**Current Portfolio Assessment (as of June 2026):**
- **Photonics:** SIVE (20%) + IQE + AAOI = **~45% — EXCEEDS LIMIT**
- **Action Required:** Reduce photonics allocation to 40% by trimming SIVE to 15% or diversifying into other subsectors

**Rebalancing Trigger:** If subsector allocation exceeds 42% due to price appreciation, rebalance within 60 days.

---

### Rule 3: Geographic Jurisdiction Limit
**Maximum 30% allocation to any single country/jurisdiction**

**Jurisdiction Definitions:**
- **United Kingdom:** IQE, SIVE, EOS, LPK (Germany but LSE-traded), etc.
- **United States:** AAOI, ASPI, TRT, AL2SI (France but US operations), NBIS, BRUN, etc.
- **Taiwan:** FOCI, SHUNSIN, (any .TW tickers)
- **Eurozone (ex-UK):** XFAB, ALBKK, ACCON, SHT, GAPW, SEYE, etc.
- **Nordic Region:** May classify separately or combine with Eurozone depending on FX risk appetite

**Rationale:** Country-specific risks (regulatory changes, tax policy shifts, geopolitical events) are non-diversifiable within a jurisdiction. Taiwan specifically carries semiconductor supply chain concentration risk despite being allied. 30% cap ensures portfolio survives jurisdiction-specific shocks.

**Current Portfolio Assessment:** Needs audit—significant UK exposure (IQE, SIVE) and potential Taiwan concentration (FOCI, SHUNSIN pending purchases).

**Rebalancing Trigger:** If jurisdiction allocation exceeds 32%, rebalance within 60 days.

---

### Rule 4: Minimum Position Count
**Maintain at least 8 distinct positions in active portfolio**

**Rationale:** Below 8 positions, idiosyncratic risk (company-specific execution failures, fraud, technical obsolescence) dominates. Portfolio becomes a high-volatility lottery. 8-12 positions provides adequate diversification while maintaining conviction weighting.

**Current Status:** ~9-10 positions ✓ (borderline acceptable)

**Action Required if Breached:** If active positions fall below 8 due to sells/closures, must deploy capital into new Tier 1/Tier 2 names within 90 days or move excess cash to "safe/high return" allocation (MRVL, SKM, NBIS).

---

### Rule 5: Market Cap Diversification
**Maximum 60% in micro-caps (<$500M market cap)**

**Rationale:** Micro-caps offer highest asymmetric returns (5x+ potential) but also highest drawdown risk, liquidity constraints, and regulatory/fraud risk. 60% cap ensures portfolio maintains access to liquidity during market stress.

**Market Cap Tiers:**
- **Mega-cap (>$150B):** MRVL only (intelligence/tracking position)
- **Large-cap ($75-150B):** CEG (intelligence/tracking position)
- **Mid-cap ($5-75B):** SKM, NBIS, BE, VST, TLN (safe/high return tier)
- **Small-cap ($500M-$5B):** AAOI, XFAB, AL2SI, etc.
- **Micro-cap (<$500M):** SIVE, IQE, TRT, SHT, ACCON, SEYE, ASPI, BRUN, etc.

**Current Status:** Likely >60% in micro-caps—needs formal audit.

**Rebalancing Trigger:** If micro-cap allocation exceeds 65%, trim or add mid-cap positions within 90 days.

---

## PORTFOLIO REBALANCING PROTOCOL

### Quarterly Review (Mandatory)
**Dates:** 31 March, 30 June, 30 September, 31 December

**Checklist:**
- [ ] Calculate current position weights (% of total portfolio value)
- [ ] Calculate subsector allocations
- [ ] Calculate jurisdiction allocations
- [ ] Calculate market cap tier allocation
- [ ] Identify any rules breached
- [ ] If breaches detected, create rebalancing plan within 7 days

### Rebalancing Execution Principles

1. **Trim from strength, not weakness:** If rebalancing is required due to concentration, sell portions of best-performing positions (typically those that have appreciated 2-3x) rather than cutting losers.

2. **Tax efficiency:** For ISA/SIPP accounts (UK), rebalancing is tax-free. For taxable accounts, consider:
   - Deferring sales of positions held <12 months to achieve long-term capital gains treatment
   - Harvesting losses against gains where possible
   - Splitting large rebalances across multiple tax years if near year-end

3. **Liquidity management:** When trimming micro-cap positions:
   - Never sell >10% of average daily volume in a single day
   - Use limit orders, not market orders
   - Split large sells across 5-10 trading days to minimize slippage

4. **Opportunity cost vs. risk reduction:** Rebalancing mechanically may force selling high-conviction compounders during their growth phase. Apply judgment:
   - If a 22% position is a Tier 1 name entering its revenue inflection phase, consider allowing it to run to 25% temporarily (90-day extension) if no other concentration limits are breached
   - Document all rebalancing deferrals in writing with specific conditions for forced rebalancing

---

## CASH MANAGEMENT

### Target Cash Allocation: 5-15%

**Purpose:**
- Dry powder for opportunistic entries when high-conviction names pull back 20-30%
- Liquidity buffer to avoid forced selling during market dislocations
- Deployment capital for new Tier 1 theses as they emerge

**Rebalancing:**
- If cash falls below 5%, consider trimming positions to rebuild buffer (especially if no compelling new opportunities exist)
- If cash exceeds 20%, deploy into existing Tier 1 watchlist names or "safe/high return" tier

---

## SPECIAL SITUATIONS: POSITION SIZING OVERRIDES

### 1. Takeover/Acquisition Events
When a position receives a takeover bid:
- If bid is cash: Position automatically becomes "cash equivalent" and does not count toward concentration limits
- If bid is stock: Assess acquirer quality. If acquirer is outside research universe, trim position to 10% maximum pending full analysis

### 2. SEC Investigations / Automatic Disqualifiers
When a held position triggers an automatic disqualifier (going concern, SEC investigation, material weakness):
- Immediately reduce position to 5% maximum ("monitor-only" sizing)
- Conduct emergency re-analysis within 7 days
- If disqualifier confirmed, exit position entirely within 30 days (market conditions permitting)

### 3. Thesis Failure / Revenue Miss
When a Tier 1 thesis suffers a major catalyst miss (e.g., expected revenue inflection delayed by 6+ months):
- Reduce position by 50% within 30 days
- Reclassify to "watchlist" and conduct post-mortem analysis
- May rebuild position if post-mortem identifies fixable execution issue vs. fundamental thesis failure

---

## PERFORMANCE ATTRIBUTION TRACKING

### Monthly Performance Review

Track portfolio returns decomposed by:
- **Alpha from security selection:** Excess return vs. benchmark (e.g., MSCI World Small Cap or custom AI/Space index)
- **Alpha from subsector allocation:** Did overweight in Energy vs. Photonics add or subtract value?
- **Geographic allocation impact:** Did UK overweight vs. US help or hurt?

**Purpose:** Identify if returns are driven by:
- Stock-picking skill (framework quality)
- Subsector timing luck (being overweight photonics during CPO hype cycle)
- Concentration risk taking (high returns from 20% SIVE position, but was it sustainable?)

This informs whether portfolio construction rules are too conservative (leaving money on table) or too aggressive (masking poor stock selection with lucky concentration).

---

## PORTFOLIO COMPOSITION TARGETS (ASPIRATIONAL)

Based on current Titanite research coverage and risk tolerance:

### Ideal Portfolio (10-12 positions):

**Core Holdings (50-60% of portfolio):**
- 3-4 **Photonics/Optical** names (30-40%): Diversify across silicon photonics, InP lasers, and alignment/packaging layers
- 2-3 **Energy/Power** names (20-30%): Mix of nuclear, fuel cells, and grid infrastructure
- 1-2 **Safe/High Return** mid/large-caps (10-15%): NBIS, SKM, or MRVL for liquidity and downside protection

**Satellite Holdings (30-40% of portfolio):**
- 2-3 **Semiconductors/Materials** (15-20%): Specialty materials, packaging, metrology
- 1-2 **Robotics/Vision** (5-10%): DMS, lidar, radar—exposure to autonomous systems theme
- 1-2 **AI Cloud/Defense/Quantum** (10-15%): Opportunistic exposure to emerging themes

**Cash/Dry Powder (10%):**
- Opportunistic deployment capital

---

## FORCED REBALANCING SCENARIOS (AUTOMATIC TRIGGERS)

The following scenarios require **mandatory immediate rebalancing** regardless of conviction:

1. **Any single position >25% of portfolio:** Emergency trim to 20% within 14 days
2. **Any subsector >50% of portfolio:** Emergency trim to 40% within 30 days
3. **Total micro-cap allocation >70%:** Emergency trim to 60% within 30 days
4. **Cash <2% and no margin facility:** Trim best-performing position to rebuild 5% cash buffer

---

_Portfolio construction rules are living guidelines, not rigid mandates. Apply judgment, but document all deviations in writing with specific rationale. Review and update these rules annually based on performance attribution analysis._
