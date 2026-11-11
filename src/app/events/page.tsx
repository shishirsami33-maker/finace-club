'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  Users,
  Trophy,
  CheckCircle,
} from 'lucide-react';
import { initialStore } from '@/lib/data';
import { EventItem, EventCategory } from '@/types';

const categories: ('All' | EventCategory)[] = [
  'All',
  'Intra-university',
  'Inter-university',
  'Finance Competition',
  'Case Competition',
  'Seminar',
  'Workshop',
  'Guest Session',
  'Networking',
];

export default function EventsPage() {
  const [tab, setTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'All' | EventCategory>('All');

  const events = initialStore.events.filter((e) => e.status === 'published');

  const filtered = events.filter((ev) => {
    if (tab === 'upcoming' && ev.isPast) return false;
    if (tab === 'past' && !ev.isPast) return false;
    if (selectedCategory !== 'All' && ev.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Championships &amp; Sessions
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              EVENTS &amp; COMPETITIONS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Explore national financial Olympiads, valuation bootcamps, corporate conclaves, and intra-university case championships.
            </p>
          </div>
        </div>
      </section>

      {/* Tab & Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e100e] border border-white/10">
          {/* Main Status Tabs */}
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setTab('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                tab === 'all'
                  ? 'bg-brand-green text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Events
            </button>
            <button
              type="button"
              onClick={() => setTab('upcoming')}
              className={`px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                tab === 'upcoming'
                  ? 'bg-brand-green text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setTab('past')}
              className={`px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                tab === 'past'
                  ? 'bg-brand-green text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Concluded
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#0e100e] border border-white/10">
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-white">No events found</h3>
            <p className="text-sm text-zinc-400 mt-1">
              No events match the selected status or category criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ev) => (
              <div
                key={ev.id}
                className="group rounded-3xl bg-[#121412] border border-white/10 hover:border-brand-green/50 overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-black overflow-hidden">
                    <Image
                      src={ev.coverImage}
                      alt={ev.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase border border-brand-green/30">
                        {ev.category}
                      </span>
                    </div>
                    {ev.isPast ? (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md bg-zinc-900/90 text-zinc-400 text-xs font-mono">
                          Concluded
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 text-emerald-300 text-xs font-mono font-bold animate-pulse">
                          Open
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-green" /> {ev.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-green" /> {ev.time}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      <Link href={`/events/${ev.slug}`}>{ev.title}</Link>
                    </h2>

                    <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed font-sans">
                      {ev.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4">
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[170px]">
                      {ev.organizers}
                    </span>
                    <Link
                      href={`/events/${ev.slug}`}
                      className="px-4 py-2 rounded-lg bg-brand-green/20 hover:bg-brand-green text-emerald-300 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

