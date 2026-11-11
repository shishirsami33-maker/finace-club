import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const opp = store.opportunities.find((o) => o.slug === slug);

  if (!opp) {
    return constructMetadata({
      title: 'Opportunity Not Found',
      description: 'The requested opportunity could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${opp.title} | ${opp.organization}`,
    description: opp.description.slice(0, 160),
    canonicalPath: `/opportunities/${opp.slug}`,
  });
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const opp = store.opportunities.find((o) => o.slug === slug);

  if (!opp) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Opportunities', path: '/opportunities' },
    { name: opp.title, path: `/opportunities/${opp.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Opportunities Portal
        </Link>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e100e] border border-white/10 shadow-2xl relative">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-deep/50 text-emerald-300 border border-brand-green/30 uppercase tracking-wider">
              {opp.category}
            </span>
            <span
              className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                opp.status === 'OPEN'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : opp.status === 'CLOSING SOON'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              Status: {opp.status}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
            {opp.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-emerald-400 font-bold text-sm">{opp.organization}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-green" /> {opp.location}
            </span>
            {opp.compensation && (
              <>
                <span>•</span>
                <span className="text-white">{opp.compensation}</span>
              </>
            )}
          </div>

          {/* Details & Description */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
            <div>
              <h3 className="font-heading font-bold text-lg uppercase text-white mb-2">
                Opportunity Description
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed whitespace-pre-line">
                {opp.description}
              </p>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg uppercase text-white mb-2">
                Eligibility &amp; Prerequisites
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {opp.eligibility}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between text-xs sm:text-sm font-mono text-amber-300">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Application Deadline:
              </span>
              <strong className="text-white">{opp.deadline}</strong>
            </div>
          </div>

          {/* Apply CTA */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <a
              href={opp.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-brand-green/20 transition-all"
            >
              SUBMIT APPLICATION / PROCEED TO PORTAL <ExternalLink className="w-4 h-4" />
            </a>

            <span className="text-xs font-mono text-zinc-500">
              Published: {opp.publishDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

