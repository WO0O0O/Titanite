'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InstrumentChartProps {
  symbol: string;
}

export default function InstrumentChart({ symbol }: InstrumentChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is loaded and the container ref is available
    if (typeof window !== 'undefined' && (window as any).TradingView && containerRef.current && isOpen) {
      // Clear the container to avoid duplicates
      containerRef.current.innerHTML = '';
      
      try {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: 'D',
          timezone: 'exchange',
          theme: 'dark',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          hide_side_toolbar: true,
          allow_symbol_change: false,
          container_id: containerRef.current.id,
          // Load default technical studies requested by user
          studies: [
            'RSI@tv-basicstudies',
            'MACD@tv-basicstudies',
            'BB@tv-basicstudies',
          ],
        });
      } catch (err) {
        console.error('Failed to initialize TradingView widget:', err);
      }
    }
  }, [symbol, isOpen, scriptLoaded]);

  // Clean element ID for DOM compatibility
  const containerId = `tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <div className="flex flex-col shrink-0" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 text-[10px] tracking-widest transition-colors hover:opacity-100 opacity-70"
        style={{
          backgroundColor: 'var(--color-terminal-900)',
          color: 'var(--color-text-muted)',
          borderBottom: isOpen ? '1px solid var(--color-border-subtle)' : 'none',
        }}
      >
        <span>LIVE CHART: {symbol} (RSI, MACD, Bollinger Bands)</span>
        {isOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>

      {isOpen && (
        <div className="relative w-full h-[260px] bg-black">
          <Script
            src="https://s3.tradingview.com/tv.js"
            strategy="afterInteractive"
            onLoad={() => setScriptLoaded(true)}
          />
          <div
            id={containerId}
            ref={containerRef}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
