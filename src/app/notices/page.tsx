'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  Pin,
  ArrowRight,
  ExternalLink,
  FileDown,
} from 'lucide-react';
import { initialStore } from '@/lib/data';
import { Notice, NoticeCategory } from '@/types';

const categories: ('All' | NoticeCategory)[] = [
  'All',
  'General',
  'Recruitment',
  'Competition',
  'Seminar',
  'Workshop',
  'Opportunity',
  'Internal Announcement',
];

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | NoticeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Use notices from store
  const notices = initialStore.notices.filter((n) => n.status === 'published');

  const filteredNotices = notices.filter((n) => {
    const matchesCategory =
      selectedCategory === 'All' || n.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const pinnedNotices = filteredNotices.filter((n) => n.isPinned);
  const regularNotices = filteredNotices.filter((n) => !n.isPinned);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Official Noticeboard
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              NOTICES &amp; ANNOUNCEMENTS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Official circulars, competition registrations, corporate fellowship deadlines, and administrative notifications of AIUB Students Finance Club.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e100e] border border-white/10">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars, deadlines, workshops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-green text-white font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notices Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#0e100e] border border-white/10">
            <Bell className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-white">No notices found</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Try adjusting your search query or selecting a different category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pinned Section */}
            {pinnedNotices.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Pin className="w-3.5 h-3.5" /> Pinned Circulars
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pinnedNotices.map((n) => (
                    <div
                      key={n.id}
                      className="p-6 rounded-2xl bg-gradient-to-br from-[#121812] to-[#0e120e] border-2 border-brand-green/40 shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-green/20 text-emerald-300 border border-brand-green/40 uppercase font-bold tracking-wider">
                            {n.category}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">
                            {n.publishDate}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white hover:text-emerald-300 transition-colors">
                          <Link href={`/notices/${n.slug}`}>{n.title}</Link>
                        </h3>
                        <p className="mt-2 text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3">
                          {n.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                        {n.deadline && (
                          <span className="font-mono text-amber-300 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Deadline: {n.deadline}
                          </span>
                        )}
                        <Link
                          href={`/notices/${n.slug}`}
                          className="font-heading font-bold text-emerald-400 hover:text-white uppercase inline-flex items-center gap-1 ml-auto"
                        >
                          Read Notice <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Notices */}
            {regularNotices.length > 0 && (
              <div className="space-y-4 pt-4">
                {pinnedNotices.length > 0 && (
                  <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    General Notices Archive
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularNotices.map((n) => (
                    <div
                      key={n.id}
                      className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 hover:border-brand-green/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-emerald-300 uppercase font-semibold">
                            {n.category}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            {n.publishDate}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-white hover:text-emerald-300 transition-colors line-clamp-2">
                          <Link href={`/notices/${n.slug}`}>{n.title}</Link>
                        </h3>
                        <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                          {n.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        {n.deadline && (
                          <span className="text-[11px] font-mono text-zinc-500">
                            Due: {n.deadline}
                          </span>
                        )}
                        <Link
                          href={`/notices/${n.slug}`}
                          className="font-heading font-bold text-emerald-400 hover:underline inline-flex items-center gap-1 ml-auto"
                        >
                          Full Details <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

