import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Tv,
  ArrowRight,
  Handshake,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Corporate & Institutional Collaborations | AIUB Finance Club',
  description:
    'Discover strategic partnerships with commercial banks, asset management firms, media organizations, and collegiate bodies collaborating with AIUB Students Finance Club.',
  canonicalPath: '/collaborations',
});

export default function CollaborationsPage() {
  const store = getStore();
  const { collaborations } = store;

  const categories = [
    { key: 'Corporate', label: 'Corporate & Banking Partners', icon: Building2 },
    { key: 'Academic', label: 'Academic & Professional Societies', icon: GraduationCap },
    { key: 'Institutional', label: 'Institutional & Market Operators', icon: ShieldCheck },
    { key: 'Media', label: 'Media & Publication Partners', icon: Tv },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Partnership Portfolio
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              STRATEGIC COLLABORATIONS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Fostering high-impact alliances with leading financial institutions, equity analysts, regulatory bodies, and media outlets to enrich student opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Patronage & Oversight (AIUB & OSA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-2">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 p-1 border border-white/10 flex items-center justify-center">
                <Image src="/images/aiub-logo.png" alt="AIUB" width={32} height={32} className="object-contain" />
              </div>
              <div className="w-[1px] h-6 bg-white/15" />
              <div className="w-10 h-10 rounded-xl bg-white/5 p-1 border border-white/10 flex items-center justify-center">
                <Image src="/images/osa-logo.png" alt="OSA" width={32} height={32} className="object-contain" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white uppercase">
                Institutional Academic &amp; Regulatory Patronage
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Governed under Office of Student Affairs (OSA), American International University-Bangladesh
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-400 bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
            Official University Charter
          </span>
        </div>
      </section>

      {/* Main Partnerships Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {categories.map((catGroup) => {
          const items = collaborations.filter((c) => c.category === catGroup.key);
          if (items.length === 0) return null;
          const Icon = catGroup.icon;

          return (
            <div key={catGroup.key} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2 rounded-lg bg-brand-deep/50 text-emerald-400 border border-brand-green/30">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-white uppercase tracking-wide">
                    {catGroup.label}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] p-2 flex items-center justify-center border border-white/10 group-hover:border-brand-green/30 transition-colors">
                          <Image
                            src={partner.logoUrl}
                            alt={partner.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs font-mono text-zinc-500 font-medium">
                          Since {partner.year}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                        {partner.name}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        {partner.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/5">
                        <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase block mb-1">
                          Scope of Collaboration:
                        </span>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {partner.collaborationScope}
                        </p>
                      </div>
                    </div>

                    {partner.website && (
                      <div className="mt-6 pt-4 border-t border-white/5">
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-emerald-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                        >
                          Visit Organization Website <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Partnership Inquiry CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0c140c] via-[#091009] to-[#060a06] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
            <Handshake className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white">
            EXPLORE PARTNERSHIP OPPORTUNITIES
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl mx-auto">
            We collaborate with commercial banks, fintech disruptors, equity research houses, and corporate organizations for campus recruiting, national event sponsorships, and research initiatives.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?type=partnership"
              className="px-8 py-3.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-green/20 transition-all inline-flex items-center gap-2"
            >
              INITIATE COLLABORATION DIALOGUE <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:aiubfinanceclub@gmail.com"
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-heading font-bold text-xs uppercase tracking-wider transition-all"
            >
              EMAIL SECRETARIAT DIRECTLY
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

