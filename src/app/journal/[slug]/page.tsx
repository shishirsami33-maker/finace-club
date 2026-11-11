import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  ArrowRight,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata, generateBreadcrumbSchema, generateArticleSchema } from '@/lib/seo';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const article = store.journal.find((a) => a.slug === slug);

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found',
      description: 'The requested journal article could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${article.title} | Finance Journal`,
    description: article.excerpt,
    canonicalPath: `/journal/${article.slug}`,
    ogType: 'article',
    ogImage: article.coverImage,
    publishedTime: article.publishDate,
    authors: [article.author],
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const article = store.journal.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = store.journal
    .filter((a) => a.slug !== slug && article.relatedSlugs?.includes(a.slug))
    .slice(0, 2);

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Finance Journal', path: '/journal' },
    { name: article.title, path: `/journal/${article.slug}` },
  ]);

  const articleSchema = generateArticleSchema({
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publishDate: article.publishDate,
    author: article.author,
    coverImage: article.coverImage,
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal Index
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-deep/50 text-emerald-300 border border-brand-green/30 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-green" /> {article.publishDate}
            </span>
            <span>•</span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-green" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="w-10 h-10 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-white">{article.author}</p>
              <p className="text-xs font-mono text-zinc-400">{article.authorRole}</p>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative h-72 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-10">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="p-6 rounded-2xl bg-brand-deep/20 border border-brand-green/30 mb-10 text-emerald-300/95 font-editorial text-base sm:text-lg italic leading-relaxed">
          {article.excerpt}
        </div>

        {/* Main Article Body */}
        <div className="text-zinc-300 font-sans text-base sm:text-lg leading-relaxed space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="font-heading font-bold text-xl sm:text-2xl text-white uppercase tracking-wide pt-4"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ')) {
              const bullets = paragraph.split('\n');
              return (
                <ul key={idx} className="space-y-2 pl-4">
                  {bullets.map((b, bIdx) => (
                    <li key={bIdx} className="list-disc list-inside text-zinc-300 text-sm sm:text-base">
                      {b.replace('- ', '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-zinc-300">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* References Section */}
        {article.references && article.references.length > 0 && (
          <section className="mt-12 p-6 rounded-2xl bg-[#0e100e] border border-white/10 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
              References &amp; Empirical Sources
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              {article.references.map((ref, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">[{i + 1}]</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Social Share & Official Signoff */}
        <footer className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-400">
            Published in AIUB Students Finance Club Official Monthly Journal
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase mr-1">Share:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://aiubfinanceclub.org/journal/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white text-zinc-300 transition-colors text-xs font-medium"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aiubfinanceclub.org/journal/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white text-zinc-300 transition-colors text-xs font-medium"
            >
              LinkedIn
            </a>
          </div>
        </footer>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-white/10">
            <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-white mb-6">
              Related Financial Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      {rel.category}
                    </span>
                    <h4 className="font-heading font-bold text-base text-white mt-1 hover:text-emerald-300 transition-colors">
                      <Link href={`/journal/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/journal/${rel.slug}`}
                    className="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 mt-4"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

