'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity, Info } from 'lucide-react';

const tickerItems = [
  { label: 'ASFC INDEX', value: '2,842.10', change: '+2.4%', isPositive: true },
  { label: 'DSE BENCHMARK (ILLUSTRATIVE)', value: '5,310.45', change: '+1.1%', isPositive: true },
  { label: 'BDT/USD (REF)', value: '121.50', change: '-0.15', isPositive: false },
  { label: 'TREASURY BILL 364D', value: '11.85%', change: '+0.05%', isPositive: true },
  { label: 'MFS TRANSACTION VELOCITY', value: '4.8M/HR', change: '+4.2%', isPositive: true },
  { label: 'PRIVATE SECTOR CREDIT', value: '9.82%', change: '+0.3%', isPositive: true },
  { label: 'STUDENT FINANCIAL LITERACY', value: '88.4%', change: '+12.6%', isPositive: true },
  { label: 'NATIONAL OLYMPIAD TEAMS', value: '40+', change: '+15%', isPositive: true },
];

export function MarketTicker() {
  return (
    <div className="bg-[#090b09] border-y border-white/10 py-2.5 overflow-hidden select-none relative z-20">
      <div className="flex items-center">
        {/* Fixed Title Tag */}
        <div className="hidden md:flex items-center gap-1.5 px-4 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-r border-white/10 flex-shrink-0 bg-[#090b09] z-10">
          <Activity className="w-3.5 h-3.5 animate-pulse text-brand-green" />
          <span>MARKET VECTORS</span>
          <span className="text-[10px] text-zinc-500 font-normal lowercase">(illustrative)</span>
        </div>

        {/* Ticker Stream */}
        <div className="flex whitespace-nowrap overflow-hidden flex-1">
          <div className="inline-flex animate-ticker gap-8 px-4">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-tight"
              >
                <span className="text-zinc-400 uppercase">{item.label}</span>
                <span className="text-white font-semibold">{item.value}</span>
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                    item.isPositive ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

