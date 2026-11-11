import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  FileText,
  ExternalLink,
  ShieldCheck,
  Bell,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const notice = store.notices.find((n) => n.slug === slug);

  if (!notice) {
    return constructMetadata({
      title: 'Notice Not Found',
      description: 'The requested notice could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${notice.title} | Notices`,
    description: notice.summary || notice.content.slice(0, 160),
    canonicalPath: `/notices/${notice.slug}`,
  });
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const notice = store.notices.find((n) => n.slug === slug);

  if (!notice) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Notices', path: '/notices' },
    { name: notice.title, path: `/notices/${notice.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/notices"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Noticeboard
        </Link>

        {/* Notice Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e100e] border border-white/10 shadow-2xl relative">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-deep/50 text-emerald-300 border border-brand-green/30 uppercase tracking-wider">
              {notice.category}
            </span>
            {notice.isPinned && (
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 uppercase tracking-wider">
                Pinned Notice
              </span>
            )}
            <span className="text-xs font-mono text-zinc-400 ml-auto flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-green" /> Published: {notice.publishDate}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
            {notice.title}
          </h1>

          {notice.deadline && (
            <div className="mt-6 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs sm:text-sm font-mono">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Application / Action Deadline:</strong> {notice.deadline}
              </span>
            </div>
          )}

          {/* Notice Body */}
          <div className="mt-8 pt-8 border-t border-white/10 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-medium text-emerald-300 text-base leading-relaxed">
              {notice.summary}
            </p>
            <div className="whitespace-pre-line text-zinc-300">{notice.content}</div>
          </div>

          {/* Action CTAs */}
          {(notice.registrationUrl || notice.attachmentUrl) && (
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              {notice.registrationUrl && (
                <Link
                  href={notice.registrationUrl}
                  className="px-6 py-3 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-brand-green/20 transition-all"
                >
                  Proceed to Registration / Portal <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
              {notice.attachmentUrl && (
                <a
                  href={notice.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  Download Official Circular (PDF)
                </a>
              )}
            </div>
          )}

          {/* Official Signoff */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Issued by: {notice.author}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Official ASFC Publication
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

