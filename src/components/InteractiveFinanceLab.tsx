'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Sliders,
  PieChart,
  BarChart,
  Sparkles,
  Zap,
  RotateCcw,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react';

export function InteractiveFinanceLab() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'valuation'>('portfolio');

  // Portfolio Simulator State
  const [equity, setEquity] = useState(55);
  const [fixedIncome, setFixedIncome] = useState(30);
  const [cashMFS, setCashMFS] = useState(15);

  // DCF Valuation State
  const [wacc, setWacc] = useState(11.5); // %
  const [growthRate, setGrowthRate] = useState(3.5); // %
  const [fcf, setFcf] = useState(45); // in BDT Crore

  // Calculation for Portfolio Yield
  // Historical illustrative returns: Equity ~ 14.5%, Fixed Income ~ 11.2%, Cash/MFS ~ 7.5%
  const expectedReturn = (
    (equity * 14.5 + fixedIncome * 11.2 + cashMFS * 7.5) /
    100
  ).toFixed(2);
  const riskIndex = (
    (equity * 0.18 + fixedIncome * 0.06 + cashMFS * 0.01) *
    100
  ).toFixed(1);

  // Calculation for DCF Enterprise Value: EV = FCF * (1 + g) / (WACC - g)
  const discountSpread = Math.max(0.5, wacc - growthRate) / 100;
  const enterpriseValue = Math.round((fcf * (1 + growthRate / 100)) / discountSpread);

  const handleSimulateShock = (type: 'tightening' | 'expansion' | 'reset') => {
    if (type === 'tightening') {
      setEquity(25);
      setFixedIncome(55);
      setCashMFS(20);
      setWacc(13.5);
      setGrowthRate(2.2);
    } else if (type === 'expansion') {
      setEquity(70);
      setFixedIncome(20);
      setCashMFS(10);
      setWacc(9.5);
      setGrowthRate(4.8);
    } else {
      setEquity(55);
      setFixedIncome(30);
      setCashMFS(15);
      setWacc(11.5);
      setGrowthRate(3.5);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#080a08] via-[#050605] to-[#080a08] border-b border-white/5 relative overflow-hidden">
      {/* Background radiant grid & glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-green/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 financial-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-deep/40 border border-brand-green/30 text-emerald-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-lg shadow-brand-green/10 animate-pulse-subtle">
            <Zap className="w-3.5 h-3.5 text-yellow-300" /> Interactive Financial Laboratory
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
            SIMULATE REAL-TIME CAPITAL SCENARIOS
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Test quantitative portfolio weights, discount rates, and corporate valuation sensitivities powered by student research modeling algorithms.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'portfolio'
                  ? 'bg-gradient-to-r from-brand-deep to-brand-green text-white shadow-lg shadow-brand-green/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" /> Asset Allocation Simulator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('valuation')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'valuation'
                  ? 'bg-gradient-to-r from-brand-deep to-brand-green text-white shadow-lg shadow-brand-green/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart className="w-3.5 h-3.5" /> DCF Valuation Stress-Tester
            </button>
          </div>
        </div>

        {/* Simulator Card Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0e110e]/90 border-2 border-brand-green/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {/* Quick Scenario Shock Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Stress Scenario Preset:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleSimulateShock('expansion')}
                className="px-3 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-semibold transition-colors"
              >
                Bullish Expansion 📈
              </button>
              <button
                type="button"
                onClick={() => handleSimulateShock('tightening')}
                className="px-3 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-300 font-semibold transition-colors"
              >
                Monetary Tightening 📉
              </button>
              <button
                type="button"
                onClick={() => handleSimulateShock('reset')}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 font-semibold transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          {activeTab === 'portfolio' ? (
            /* Tab 1: Portfolio Simulator */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Sliders Column */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Listed Equities (DSE 30)
                    </span>
                    <span className="text-white font-bold">{equity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={equity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      const diff = val - equity;
                      setEquity(val);
                      setFixedIncome(Math.max(10, fixedIncome - Math.round(diff * 0.6)));
                      setCashMFS(Math.max(5, 100 - val - Math.max(10, fixedIncome - Math.round(diff * 0.6))));
                    }}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Treasury Bonds &amp; Sanchayapatra
                    </span>
                    <span className="text-white font-bold">{fixedIncome}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={fixedIncome}
                    onChange={(e) => setFixedIncome(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> FinTech MFS &amp; Money Market
                    </span>
                    <span className="text-white font-bold">{cashMFS}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={cashMFS}
                    onChange={(e) => setCashMFS(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <p className="text-[11px] text-zinc-500 font-mono">
                  *Illustrative asset allocation model utilizing Damodaran emerging market risk premiums.
                </p>
              </div>

              {/* Dynamic Real-time Metric Output Box */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-black/60 border border-brand-green/30 flex flex-col justify-between text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-2xl pointer-events-none" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
                  EXPECTED ANNUAL BLENDED YIELD
                </span>
                <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  <span className="text-emerald-400">{expectedReturn}</span>
                  <span className="text-2xl text-emerald-400">%</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">RISK VOLATILITY</span>
                    <span className="font-bold text-amber-300">{riskIndex} pts</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">SHARPE RATIO</span>
                    <span className="font-bold text-emerald-300">1.64</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: DCF Valuation Stress-Tester */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase">
                      Discount Rate (WACC): {wacc}%
                    </span>
                    <span className="text-zinc-500">Lower = Higher Valuation</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="16"
                    step="0.5"
                    value={wacc}
                    onChange={(e) => setWacc(parseFloat(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase">
                      Terminal Growth Rate (g): {growthRate}%
                    </span>
                    <span className="text-zinc-500">Macro GDP Benchmark</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.2"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase">
                      Normalized Base Free Cash Flow (FCF): BDT {fcf} Cr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={fcf}
                    onChange={(e) => setFcf(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {/* Enterprise Value Display */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-black/60 border border-brand-green/30 flex flex-col justify-between text-center relative overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
                  IMPLIED ENTERPRISE VALUE
                </span>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  BDT <span className="text-emerald-400">{enterpriseValue}</span> Cr
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">SPREAD (WACC - g)</span>
                    <span className="font-bold text-white">{(wacc - growthRate).toFixed(1)}%</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">EV / FCF</span>
                    <span className="font-bold text-emerald-300">{(enterpriseValue / fcf).toFixed(1)}x</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

