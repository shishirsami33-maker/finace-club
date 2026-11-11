import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Calendar,
  Building2,
  ArrowLeft,
  Share2,
  Trophy,
  Quote,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const ach = store.achievements.find((a) => a.slug === slug);

  if (!ach) {
    return constructMetadata({
      title: 'Honor Not Found',
      description: 'The requested achievement honor could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${ach.memberName} — ${ach.achievementTitle} | The Wall of Excellence`,
    description: ach.congratulatoryMessage.slice(0, 160),
    canonicalPath: `/achievements/${ach.slug}`,
  });
}

export default async function AchievementDetailPage({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const ach = store.achievements.find((a) => a.slug === slug);

  if (!ach) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'The Wall of Excellence', path: '/achievements' },
    { name: ach.memberName, path: `/achievements/${ach.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/achievements"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to The Wall of Excellence
        </Link>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#121812] to-[#0a0d0a] border-2 border-brand-green/40 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 pb-8 border-b border-white/10 text-center sm:text-left">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden relative border-4 border-brand-green/50 flex-shrink-0 shadow-2xl">
              <Image
                src={ach.photoUrl}
                alt={ach.memberName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-deep text-emerald-300 border border-brand-green/40 uppercase tracking-wider">
                {ach.category}
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight mt-3">
                {ach.memberName}
              </h1>
              <p className="text-sm font-mono text-emerald-400 mt-1 font-semibold">
                {ach.organizationOrCompetition}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-zinc-400">
                <span>Conferred: {ach.date}</span>
                <span>•</span>
                <span>Academic Year: {ach.year}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
                Distinction Title
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                {ach.achievementTitle}
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-brand-green/20">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5 mb-2">
                <Trophy className="w-4 h-4" /> Official Congratulatory Citation
              </span>
              <blockquote className="text-sm sm:text-base text-zinc-200 font-editorial italic leading-relaxed">
                "{ach.congratulatoryMessage}"
              </blockquote>
            </div>

            <div className="text-xs text-zinc-400 font-sans leading-relaxed pt-4 border-t border-white/5">
              The AIUB Students Finance Club takes immense pride in celebrating the diligence, ambition, and intellectual vigor demonstrated by our distinguished associates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

