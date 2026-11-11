'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Filter,
  Maximize2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { initialStore } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';

const categories = [
  'All',
  'Competitions',
  'Seminars',
  'Workshops',
  'Collaborations',
  'Guest Sessions',
  'Club Activities',
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = initialStore.gallery.filter((g) => g.status === 'published');

  const filtered = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const lightboxImages = filtered.map((item) => ({
    url: item.imageUrl,
    title: item.title,
    caption: `${item.eventName} (${item.date}) — ${item.caption}`,
  }));

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Visual Archives
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              MEDIA GALLERY
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Curated photographic documentation of national financial competitions, guest lectures, valuation masterclasses, and executive ceremonies.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-green text-white font-bold shadow-lg shadow-brand-green/20'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Editorial Mosaic Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#0e100e] border border-white/10">
            <ImageIcon className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-white">No images in category</h3>
            <p className="text-sm text-zinc-400 mt-1">Select another album category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-80 rounded-3xl overflow-hidden bg-[#101210] border border-white/10 cursor-pointer shadow-xl"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 font-bold uppercase border border-brand-green/30">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full bg-black/75 text-white backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[11px] font-mono text-zinc-400 mb-1">
                    {item.eventName} • {item.date}
                  </p>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex || 0}
        images={lightboxImages}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : lightboxImages.length - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev! < lightboxImages.length - 1 ? prev! + 1 : 0))
        }
      />
    </div>
  );
}

