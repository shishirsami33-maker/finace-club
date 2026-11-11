'use client';

import React, { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollCompletion, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand-deep via-brand-green to-emerald-400 transition-all duration-75 shadow-[0_0_12px_#078B25]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}

