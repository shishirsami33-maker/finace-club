'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  Trophy,
  Filter,
  Calendar,
  Building2,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { initialStore } from '@/lib/data';
import { AchievementCategory, MemberAchievement } from '@/types';

const categories: ('All' | AchievementCategory)[] = [
  'All',
  'Internship Achievements',
  'Job Placements',
  'Competition Winners',
  'Scholarships',
  'Academic Excellence',
  'Professional Certifications',
  'Research Publications',
  'Leadership Appointments',
  'Other Notable Achievements',
];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | AchievementCategory>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const achievements = initialStore.achievements.filter((a) => a.status === 'published');

  const filtered = achievements.filter((ach) => {
    const matchesCat = selectedCategory === 'All' || ach.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || ach.year === selectedYear;
    return matchesCat && matchesYear;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#0a120a] to-[#050505] border-b border-white/5 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-deep/50 border border-brand-green/30 text-emerald-300 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Trophy className="w-3.5 h-3.5" /> Prestige Gallery
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
            THE WALL OF EXCELLENCE
          </h1>
          <p className="mt-4 text-base sm:text-xl text-emerald-300/90 font-editorial italic">
            "Celebrating ambition. Recognizing achievement."
          </p>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Honoring the students and alumni of AIUB Students Finance Club who distinguish themselves across multinational banking programs, national case championships, scholarships, and investment research.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-brand-green/10 blur-[150px] pointer-events-none" />
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e100e] border border-white/10">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
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

          {/* Year Filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono text-zinc-500 uppercase">Year:</span>
            {['All', '2026', '2025'].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedYear === y
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Prestigious Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#0e100e] border border-white/10">
            <Award className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-white">No entries match filters</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Select another category or view all years.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filtered.map((ach) => (
              <div
                key={ach.id}
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#111611] to-[#0c0e0c] border-2 border-brand-green/30 hover:border-brand-green transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative border-2 border-brand-green/50 flex-shrink-0 shadow-md">
                        <Image
                          src={ach.photoUrl}
                          alt={ach.memberName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-deep/50 text-emerald-300 font-bold uppercase tracking-wider border border-brand-green/30">
                          {ach.category}
                        </span>
                        <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white mt-1.5">
                          {ach.memberName}
                        </h2>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">
                          {ach.organizationOrCompetition}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 font-bold">{ach.year}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-emerald-300">
                    <Link href={`/achievements/${ach.slug}`}>{ach.achievementTitle}</Link>
                  </h3>

                  <blockquote className="mt-4 text-xs sm:text-sm text-zinc-300 font-editorial italic leading-relaxed border-l-2 border-brand-green pl-4">
                    "{ach.congratulatoryMessage}"
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Conferred: {ach.date}</span>
                  <Link
                    href={`/achievements/${ach.slug}`}
                    className="font-heading font-bold text-emerald-400 hover:text-white uppercase inline-flex items-center gap-1"
                  >
                    Honorary Page <ArrowRight className="w-3.5 h-3.5" />
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

