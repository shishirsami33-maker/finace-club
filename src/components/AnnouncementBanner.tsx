'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Sparkles } from 'lucide-react';

interface Props {
  enabled: boolean;
  text: string;
  link: string;
}

export function AnnouncementBanner({ enabled, text, link }: Props) {
  const [closed, setClosed] = useState(false);

  if (!enabled || closed || !text) return null;

  return (
    <div className="bg-gradient-to-r from-brand-deep via-brand-green to-brand-deep text-white text-xs md:text-sm py-2 px-4 relative z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-200 animate-pulse" /> Official
          </span>
          <span className="font-medium text-white/95">{text}</span>
          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:text-emerald-200 transition-colors ml-1 whitespace-nowrap"
            >
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setClosed(true)}
          className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

