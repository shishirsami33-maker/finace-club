import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Reports & Publications | AIUB Students Finance Club',
  description:
    'Download official annual activity reports, national finance Olympiad whitepapers, and student empirical research publications.',
  canonicalPath: '/reports',
});

export default function ReportsPage() {
  const store = getStore();
  const reports = store.reports.filter((r) => r.status === 'published');

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Institutional Archives
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              REPORTS &amp; PUBLICATIONS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Access official annual audit reports, post-event competition whitepapers, empirical youth financial research, and strategic club publications.
            </p>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-black border border-white/10">
                  <Image
                    src={rep.coverImage}
                    alt={rep.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-emerald-300 text-[10px] font-mono font-bold uppercase border border-brand-green/30">
                      {rep.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-2">
                  <span>Year: {rep.year}</span>
                  <span>•</span>
                  <span>{rep.pageCount} Pages</span>
                  <span>•</span>
                  <span>{rep.fileSize}</span>
                </div>

                <h2 className="font-heading font-bold text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {rep.title}
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {rep.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between gap-3">
                <a
                  href={rep.fileUrl}
                  download
                  className="flex-1 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-green/20"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
                <a
                  href={rep.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="Preview in Browser"
                >
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

