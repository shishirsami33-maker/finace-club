'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; title?: string; caption?: string }[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image and Caption */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
        <div className="relative w-full h-[65vh] max-w-4xl">
          <Image
            src={current.url}
            alt={current.title || 'Gallery photograph'}
            fill
            className="object-contain"
          />
        </div>
        {(current.title || current.caption) && (
          <div className="mt-4 text-center max-w-2xl px-4">
            {current.title && (
              <h4 className="text-white font-heading font-bold text-base sm:text-lg">
                {current.title}
              </h4>
            )}
            {current.caption && (
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">{current.caption}</p>
            )}
            <p className="text-zinc-600 text-xs font-mono mt-2">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

