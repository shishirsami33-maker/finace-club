'use client';

import React from 'react';

export function MarketLineConnector({ label }: { label?: string }) {
  return (
    <div className="relative py-4 overflow-hidden bg-transparent select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-green/40 to-brand-green" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-deep/30 border border-brand-green/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              {label || 'MARKET VECTOR CONTINUUM'}
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-green via-brand-green/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

