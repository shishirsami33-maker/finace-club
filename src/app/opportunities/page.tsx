'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Filter,
  Clock,
  MapPin,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { initialStore } from '@/lib/data';
import { OpportunityCategory, OpportunityItem } from '@/types';

const categories: ('All' | OpportunityCategory)[] = [
  'All',
  'Internships',
  'Jobs',
  'Competitions',
  'Case competitions',
  'Scholarships',
  'Certifications',
  'Training programs',
  'Professional development',
];

export default function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | OpportunityCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const opportunities = initialStore.opportunities.filter((o) => o.workflowStatus === 'published');

  const filtered = opportunities.filter((opp) => {
    const matchesCat = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Career Pipeline
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              OPPORTUNITIES DISCOVERY PORTAL
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Verified corporate internships, commercial banking tracks, national case competitions, CFI/FMVA certification scholarships, and executive fellowships.
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
              placeholder="Search internships, banks, scholarships..."
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

      {/* Opportunities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#0e100e] border border-white/10">
            <Briefcase className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-white">No opportunities found</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Check back soon or broaden your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((opp) => (
              <div
                key={opp.id}
                className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-brand-deep/50 text-emerald-300 font-bold uppercase tracking-wider border border-brand-green/30">
                      {opp.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        opp.status === 'OPEN'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : opp.status === 'CLOSING SOON'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {opp.status}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-xl text-white hover:text-emerald-300 transition-colors">
                    <Link href={`/opportunities/${opp.slug}`}>{opp.title}</Link>
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-emerald-400 font-mono">
                    {opp.organization}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans line-clamp-3">
                    {opp.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-zinc-400">
                      <span className="font-mono text-zinc-500 uppercase flex-shrink-0">Eligibility:</span>
                      <span className="text-zinc-300">{opp.eligibility}</span>
                    </div>

                    <div className="flex items-center gap-4 text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-green" /> {opp.location}
                      </span>
                      {opp.compensation && (
                        <span>• {opp.compensation}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Deadline: {opp.deadline}
                  </span>
                  <Link
                    href={`/opportunities/${opp.slug}`}
                    className="px-4 py-2 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                  >
                    View &amp; Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

