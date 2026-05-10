# Original Prompt

Role: Act as a Senior Full-Stack Engineer and Fintech Specialist.
Project Name: Market Sentinel (High-Beta Tech Risk Dashboard)

Objective:
Build a Next.js application designed to track high-volatility tech stocks with a specific focus on "Macro-Triggers" (Fed Chair Transition risks). The app will provide a Signal Builder and a Dashboard to alert the user when specific macro conditions threaten their portfolio.

Tech Stack:
Frontend: Next.js (App Router), React, Tailwind CSS, Lucide Icons.
State Management: TanStack Query (for data fetching) and Zustand (for signal state).
Charts: Recharts or Tremor.so for dashboard visuals.
Data Sources: Setup placeholders for Trading 212 API and a market data provider (e.g., Alpha Vantage, Yahoo Finance, or Polygon.io) to fetch TNX, VIX, and S&P 500 levels.

Core Pages & Features:
Dashboard (/dashboard):
A grid of "Active Signals." Each card shows a signal’s status (Green/Neutral/Alert).
Quick view of the 4 "Macro Pillars": TNX Yield, VIX Index, S&P 500 vs. 200-Day MA, and a "Warsh Sentiment" toggle.
A list of the user’s tech holdings (LUNR, RKLB, ASTS, etc.) with real-time price changes.

Signal Builder (/builder):
An interface to create unlimited "Master Signals" (MS) using Boolean logic.
Users can combine any financial signals (e.g., EMA, volatility, price of gold) to create a specific MS.
Must be built highly scalable to eventually support hundreds of different signals from many different countries/politics/companies/stocks etc.

Intel Hub (/intel):
A feed for geopolitical news and Fed-specific updates.
Include a specialized section for "Fed Transition Watch" focusing on Kevin Warsh’s speeches and balance sheet policy.

Initial Logic Setup (The 4 Pillars):
Implement the following default logic thresholds for the Signal Builder:
Pillar 1 (TNX): Critical Alert at 4.5% (The "Small-Cap Killer" level).
Pillar 2 (VIX): Elevated Risk at 20, Panic Alert at 25+.
Pillar 3 (Warsh Sentiment): A manual "Hawkish/Dovish" toggle that adds a multiplier to signal severity.
Pillar 4 (S&P 500 MA): Real-time tracking of the ~6550 level (200-Day Moving Average). Trigger alert if price < MA.

Requirements:
Create a clean, dark-themed UI that has the look and feel of a "Bloomberg terminal", but definitely not as overly complicated.
Structure the code to be modular so I can easily plug in my Trading 212 API keys later.
Ensure the Signal Builder can handle multiple conditions (AND/OR).
First Task:
lets create the docs folder - with an overview doc, changelog, testplan, and prompt - all of these in markdown please
