import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Mail,
  Linkedin,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Executive Committee | AIUB Students Finance Club',
  description:
    'Meet the executive committee, leadership team and organizational representatives of AIUB Students Finance Club at American International University-Bangladesh.',
  canonicalPath: '/executive-committee',
});

export default function ExecutiveCommitteePage() {
  const store = getStore();
  const { executives, mentorMessage } = store;

  const president = executives.find((e) => e.designation === 'President');
  const generalSecretary = executives.find((e) => e.designation === 'General Secretary');
  const treasurer = executives.find((e) => e.designation === 'Treasurer');

  const otherExecutives = executives.filter(
    (e) => !['President', 'General Secretary', 'Treasurer'].includes(e.designation)
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Page Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Governance &amp; Leadership
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              EXECUTIVE COMMITTEE (2026)
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              The 15-member executive leadership body steering strategy, operations, competitions, member welfare, and corporate partnerships at AIUB Students Finance Club.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Faculty Advisory Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0c120c] to-[#0a0e0a] border-2 border-brand-green/30 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden relative border-4 border-brand-green/40 flex-shrink-0">
            <Image
              src={mentorMessage.photoUrl}
              alt={mentorMessage.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
              FACULTY ADVISOR
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
              {mentorMessage.name}
            </h2>
            <p className="text-sm font-sans text-zinc-400 mt-1">{mentorMessage.role}</p>
            <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed italic max-w-2xl">
              "{mentorMessage.quote}"
            </p>
          </div>
        </div>
      </section>

      {/* 2. Top Executive Leadership Presentation (President, GS, Treasurer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Executive Apex
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-2">
            PRINCIPAL LEADERSHIP
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[president, generalSecretary, treasurer].filter(Boolean).map((exec) => (
            <div
              key={exec!.id}
              className="p-8 rounded-3xl bg-[#0e100e] border-2 border-brand-green/30 hover:border-brand-green transition-all flex flex-col items-center text-center shadow-xl group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden relative border-4 border-brand-green/40 mb-6 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={exec!.photoUrl}
                  alt={exec!.name}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-deep/60 text-emerald-300 border border-brand-green/40 uppercase tracking-wider mb-2">
                {exec!.designation}
              </span>

              <h3 className="font-heading font-extrabold text-xl text-white">
                {exec!.name}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {exec!.bio}
              </p>

              {exec!.email && (
                <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-3">
                  <a
                    href={`mailto:${exec!.email}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white text-zinc-400 transition-colors"
                    title={`Email ${exec!.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  {exec!.linkedin && (
                    <a
                      href={exec!.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white text-zinc-400 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Complete Executive Directory (Remaining 12 Executives) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Specialized Wings
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-2">
            EXECUTIVE DIRECTORY
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans">
            Operations, Marketing, Talent Acquisition, Welfare, and Communications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherExecutives.map((exec) => (
            <div
              key={exec.id}
              className="p-6 rounded-2xl bg-[#101210] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-brand-green/30 mx-auto mb-4">
                  <Image
                    src={exec.photoUrl}
                    alt={exec.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block mb-1">
                    {exec.wing}
                  </span>
                  <h3 className="font-heading font-bold text-base text-white">
                    {exec.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block mt-0.5 font-medium">
                    {exec.designation}
                  </span>
                </div>

                <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-sans text-center">
                  {exec.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
                <span>Term {exec.term}</span>
                <span>•</span>
                <span className="text-emerald-400">Active</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Archives Note */}
      <section className="py-12 bg-[#080a08] border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs text-zinc-400 font-mono">
            Previous executive committee records and alumni transitions are archived under official club secretariat annals.
          </p>
        </div>
      </section>
    </div>
  );
}

