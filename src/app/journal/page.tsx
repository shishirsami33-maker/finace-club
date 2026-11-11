'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Sparkles,
} from 'lucide-react';
import { initialStore } from '@/lib/data';
import { JournalArticle, JournalCategory } from '@/types';

const categories: ('All' | JournalCategory)[] = [
  'All',
  'Financial Literacy',
  'Investment',
  'Banking',
  'Corporate Finance',
  'Fintech',
  'Economics',
  'Entrepreneurship',
  'Business Strategy',
  'Bangladesh Financial Landscape',
];

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | JournalCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const articles = initialStore.journal.filter((a) => a.status === 'published');

  const filtered = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const featured = filtered[0];
  const regular = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Monthly Editorial Platform
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              FINANCE JOURNAL
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Analytical treatises, macroeconomic commentary, equity valuation breakdowns, and fintech insights authored by club researchers and financial scholars.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e100e] border border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles, authors, capital markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-green text-white font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Stream */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#0e100e] border border-white/10">
            <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-white">No articles found</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Try modifying your search or select a different editorial category.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Lead Article */}
            {featured && (
              <div className="group rounded-3xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 overflow-hidden transition-all grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[300px] bg-black">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase border border-brand-green/30">
                      Featured • {featured.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-3">
                      <span>{featured.publishDate}</span>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </div>

                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-emerald-300 transition-colors leading-tight">
                      <Link href={`/journal/${featured.slug}`}>{featured.title}</Link>
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-4">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold font-heading text-white">{featured.author}</p>
                      <p className="text-[11px] font-mono text-zinc-400">{featured.authorRole}</p>
                    </div>
                    <Link
                      href={`/journal/${featured.slug}`}
                      className="px-5 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                    >
                      Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Grid */}
            {regular.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regular.map((art) => (
                  <article
                    key={art.id}
                    className="group rounded-3xl bg-[#121412] border border-white/10 hover:border-brand-green/40 overflow-hidden flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-black">
                        <Image
                          src={art.coverImage}
                          alt={art.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 font-bold uppercase">
                            {art.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-2">
                          <span>{art.publishDate}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          <Link href={`/journal/${art.slug}`}>{art.title}</Link>
                        </h3>
                        <p className="mt-2 text-xs text-zinc-400 font-sans line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                      <div>
                        <p className="text-[11px] font-bold text-zinc-300">{art.author}</p>
                      </div>
                      <Link
                        href={`/journal/${art.slug}`}
                        className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

