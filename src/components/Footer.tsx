'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050605] border-t border-white/10 text-zinc-300 relative z-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-green/10 blur-[100px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/images/club-logo.png"
                  alt="AIUB Students Finance Club Logo"
                  width={48}
                  height={48}
                  className="object-contain filter drop-shadow-[0_2px_10px_rgba(7,139,37,0.4)]"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white tracking-wider uppercase">
                  AIUB STUDENTS FINANCE CLUB
                </h3>
                <p className="font-sans text-xs text-brand-grey uppercase tracking-widest">
                  American International University-Bangladesh
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-md">
              Building the next generation of financial leaders through rigorous analytical knowledge, national competitions, corporate collaborations, and professional development.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-deep/30 border border-brand-green/20 text-xs text-emerald-300">
              <span className="font-semibold uppercase tracking-wider">Motto:</span>
              <span>"Excellence in Finance. Leadership in Action."</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                Official Connect
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/aiubfinanceclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white border border-white/10 transition-all duration-200 flex items-center gap-2 text-xs font-medium text-zinc-200"
                  aria-label="Facebook Page of AIUB Students Finance Club"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/aiubfinanceclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white border border-white/10 transition-all duration-200 flex items-center gap-2 text-xs font-medium text-zinc-200"
                  aria-label="LinkedIn Organization Page of AIUB Students Finance Club"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Our Organization
                </Link>
              </li>
              <li>
                <Link href="/executive-committee" className="hover:text-emerald-400 transition-colors">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link href="/collaborations" className="hover:text-emerald-400 transition-colors">
                  Corporate Collaborations
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="hover:text-emerald-400 transition-colors">
                  Membership Recruitment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Activities & Opportunities */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Programs & Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Events & Competitions
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-emerald-400 transition-colors">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-emerald-400 transition-colors">
                  The Wall of Excellence
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-emerald-400 transition-colors">
                  Finance Journal
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-emerald-400 transition-colors">
                  Reports & Publications
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Media Photo Archive
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-emerald-400 transition-colors">
                  Notices & Circulars
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Institutional Secretariat */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Institutional Office
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  408/1, Kuratoli, Khilkhet,
                  <br />
                  Dhaka, Bangladesh, 1213.
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a
                  href="mailto:aiubfinanceclub@gmail.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  aiubfinanceclub@gmail.com
                </a>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <p className="text-[11px] text-zinc-400">
                  <span className="text-zinc-300 font-semibold">Club Advisor:</span> Bohi Shajahan
                </p>
                <p className="text-[11px] text-zinc-400">
                  <span className="text-zinc-300 font-semibold">Affiliation:</span> American International University-Bangladesh
                </p>

                {/* AIUB & OSA Institutional Endorsement Badges */}
                <div className="pt-2">
                  <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Under the Governance of
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors" title="American International University-Bangladesh">
                      <Image
                        src="/images/aiub-logo.png"
                        alt="American International University-Bangladesh (AIUB) Crest"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                      <span className="text-[11px] font-medium text-zinc-300">AIUB</span>
                    </div>

                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors" title="Office of Student Affairs (OSA) - AIUB">
                      <Image
                        src="/images/osa-logo.png"
                        alt="Office of Student Affairs (OSA) Crest"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                      <span className="text-[11px] font-medium text-zinc-300">OSA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Developer Attribution & Legal Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            <p>© {new Date().getFullYear()} AIUB Students Finance Club. All Rights Reserved.</p>
          </div>

          {/* MANDATORY DEVELOPER ATTRIBUTION (PART 6) */}
          <div className="flex items-center gap-1.5 font-medium">
            <span>Designed &amp; Built by</span>
            <a
              href="https://www.shishirsami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-green font-semibold underline underline-offset-4 decoration-brand-green/60 hover:decoration-brand-green transition-colors inline-flex items-center gap-1"
            >
              Shahriar Shishir Sami
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-green" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

