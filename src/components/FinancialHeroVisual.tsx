'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    image: '/images/events/event-1.jpg',
    caption: 'AIUB National Financial Olympiad & Case Challenge',
    tag: 'Flagship Competition',
  },
  {
    image: '/images/events/event-2.jpg',
    caption: 'Corporate Finance Leadership Conclave & Banking Summit',
    tag: 'Corporate Immersion',
  },
  {
    image: '/images/events/event-3.jpg',
    caption: 'FinTech & Capital Markets Workshop: Equity Valuation in Bangladesh',
    tag: 'Practical Analytics',
  },
  {
    image: '/images/events/event-4.jpg',
    caption: 'Intra-AIUB Financial Modeling & Valuation Championship',
    tag: 'Student Excellence',
  },
];

export function FinancialHeroVisual() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Automatic slideshow cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Financial Chart Animation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial illustrative candlestick and line data
    const pointsCount = 45;
    const candles: { x: number; open: number; close: number; high: number; low: number }[] = [];
    let currentVal = height * 0.55;

    for (let i = 0; i < pointsCount; i++) {
      const step = width / pointsCount;
      const x = i * step + step / 2;
      const change = (Math.sin(i * 0.4) + (Math.random() - 0.48)) * 14;
      const open = currentVal;
      const close = Math.max(height * 0.15, Math.min(height * 0.85, currentVal - change));
      const high = Math.min(open, close) - Math.random() * 8;
      const low = Math.max(open, close) + Math.random() * 8;
      candles.push({ x, open, close, high, low });
      currentVal = close;
    }

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Candlesticks
      candles.forEach((c) => {
        const isUp = c.close <= c.open;
        ctx.strokeStyle = isUp ? 'rgba(7, 139, 37, 0.45)' : 'rgba(239, 68, 68, 0.35)';
        ctx.fillStyle = isUp ? 'rgba(7, 139, 37, 0.25)' : 'rgba(239, 68, 68, 0.2)';
        ctx.lineWidth = 1.2;

        // Wick
        ctx.beginPath();
        ctx.moveTo(c.x, c.high);
        ctx.lineTo(c.x, c.low);
        ctx.stroke();

        // Body
        const top = Math.min(c.open, c.close);
        const bodyH = Math.max(3, Math.abs(c.close - c.open));
        ctx.fillRect(c.x - 3, top, 6, bodyH);
        ctx.strokeRect(c.x - 3, top, 6, bodyH);
      });

      // Animated glowing trendline
      offset += 0.025;
      ctx.beginPath();
      candles.forEach((c, idx) => {
        const wave = Math.sin(offset + idx * 0.3) * 4;
        const targetY = c.close + wave;
        if (idx === 0) {
          ctx.moveTo(c.x, targetY);
        } else {
          ctx.lineTo(c.x, targetY);
        }
      });

      // Gradient under curve
      const lastPoint = candles[candles.length - 1];
      const firstPoint = candles[0];
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(7, 139, 37, 0.22)');
      grad.addColorStop(1, 'rgba(7, 139, 37, 0.0)');

      ctx.lineTo(lastPoint.x, height);
      ctx.lineTo(firstPoint.x, height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Glowing stroke
      ctx.beginPath();
      candles.forEach((c, idx) => {
        const wave = Math.sin(offset + idx * 0.3) * 4;
        const targetY = c.close + wave;
        if (idx === 0) ctx.moveTo(c.x, targetY);
        else ctx.lineTo(c.x, targetY);
      });
      ctx.strokeStyle = '#078B25';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#078B25';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Pulse dot at current tip
      const tipX = lastPoint.x;
      const tipY = lastPoint.close + Math.sin(offset + (candles.length - 1) * 0.3) * 4;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#050505] pt-24 pb-16">
      {/* 1. Cinematic Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-30 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.caption}
              fill
              priority={index === 0}
              className="object-cover filter contrast-110 brightness-90 transition-transform duration-7000 ease-linear"
            />
          </div>
        ))}

        {/* Cinematic dark & green vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 financial-grid z-10 opacity-30" />
      </div>

      {/* 2. Interactive / Visual Financial Chart Canvas Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Floating Telemetry Widgets (Desktop Energy Accents) */}
      <div className="hidden xl:block absolute top-32 left-8 z-20 animate-float pointer-events-none">
        <div className="p-4 rounded-2xl bg-black/60 border border-brand-green/40 backdrop-blur-xl shadow-2xl space-y-2 max-w-[220px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE MOMENTUM
            </span>
            <span className="text-[10px] font-mono text-zinc-500">DSE-30</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-white tracking-tight flex items-baseline gap-1">
            <span>+14.82%</span>
            <span className="text-xs text-emerald-400 font-normal">Q4 Flow</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-sans leading-tight">
            Institutional portfolio inflow benchmark across Bangladesh banking desks.
          </p>
        </div>
      </div>

      <div className="hidden xl:block absolute top-48 right-8 z-20 animate-float [animation-delay:2s] pointer-events-none">
        <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 backdrop-blur-xl shadow-2xl space-y-2 max-w-[230px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[10px] font-mono text-yellow-300 font-bold uppercase">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              CHAMPIONSHIP
            </span>
            <span className="text-[10px] font-mono text-zinc-400">2026</span>
          </div>
          <div className="text-sm font-heading font-extrabold text-white leading-snug">
            National Financial Olympiad
          </div>
          <div className="inline-block px-2 py-0.5 rounded bg-brand-deep/80 text-emerald-300 text-[10px] font-mono font-bold">
            BDT 150,000 Grand Prize
          </div>
          <p className="text-[10px] text-zinc-400 font-sans leading-tight">
            40+ university delegations competing live at AIUB.
          </p>
        </div>
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-brand-green/30 backdrop-blur-md mb-6 hover:border-brand-green transition-colors">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
          <span className="text-xs font-mono font-medium tracking-wider text-emerald-300 uppercase">
            Official Organization • AIUB
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-sans text-zinc-300">Est. 2026</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.08] max-w-5xl">
          BUILDING THE NEXT GENERATION OF{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-green to-emerald-300">
            FINANCIAL LEADERS
          </span>
        </h1>

        {/* Brand Supporting Message */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 font-sans font-normal max-w-3xl leading-relaxed">
          A student-driven platform at American International University-Bangladesh dedicated to financial excellence, competitive portfolio modeling, leadership, and institutional corporate opportunities.
        </p>

        {/* Illustrative Financial Metric Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-md bg-black/60 border border-white/10 backdrop-blur-sm flex items-center gap-2">
            <span className="text-zinc-400">FINANCIAL MOTTO:</span>
            <span className="text-white font-bold tracking-wider">
              "EXCELLENCE IN FINANCE. LEADERSHIP IN ACTION."
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-black/60 border border-brand-green/30 backdrop-blur-sm flex items-center gap-2 text-emerald-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL BENCHMARK</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-brand-green hover:bg-emerald-500 shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            EXPLORE ACTIVITIES
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/recruitment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-green transition-all duration-300 backdrop-blur-md"
          >
            JOIN THE CLUB
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        {/* Slide Indicator Bar */}
        <div className="mt-14 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase text-zinc-400 mr-1">
            Featured Scene:
          </span>
          <span className="text-[11px] font-sans text-emerald-300 font-medium max-w-[260px] truncate sm:max-w-none">
            {heroSlides[currentSlide].caption}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-6 bg-brand-green' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

