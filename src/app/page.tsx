import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Briefcase,
  Bell,
  Calendar,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  ChevronRight,
  Quote,
  Sparkles,
  ExternalLink,
  Target,
  Compass,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { FinancialHeroVisual } from '@/components/FinancialHeroVisual';
import { MarketTicker } from '@/components/MarketTicker';
import { MarketLineConnector } from '@/components/MarketLineConnector';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { InteractiveFinanceLab } from '@/components/InteractiveFinanceLab';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'AIUB Students Finance Club | Excellence in Finance & Leadership',
  description:
    'Discover AIUB Students Finance Club, a student-driven platform at American International University-Bangladesh focused on finance, business competitions, professional development, leadership and opportunities.',
  canonicalPath: '/',
});

export default function HomePage() {
  const store = getStore();
  const {
    settings,
    presidentMessage,
    mentorMessage,
    executives,
    notices,
    events,
    collaborations,
    opportunities,
    achievements,
    journal,
    reports,
    gallery,
  } = store;

  const publishedNotices = notices.filter((n) => n.status === 'published').slice(0, 3);
  const publishedEvents = events.filter((e) => e.status === 'published').slice(0, 3);
  const featuredCollaborations = collaborations.filter((c) => c.status === 'published').slice(0, 4);
  const openOpportunities = opportunities.filter((o) => o.workflowStatus === 'published').slice(0, 3);
  const topAchievements = achievements.filter((a) => a.status === 'published').slice(0, 3);
  const topArticles = journal.filter((j) => j.status === 'published').slice(0, 3);
  const latestReports = reports.filter((r) => r.status === 'published').slice(0, 2);
  const previewGallery = gallery.filter((g) => g.status === 'published').slice(0, 4);

  // Top 3 leadership
  const leadershipPreview = executives.filter((e) => e.isLeadership).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      {/* 1. Cinematic Financial Hero Visual */}
      <FinancialHeroVisual />

      {/* 2. Illustrative Market Ticker */}
      <MarketTicker />

      {/* 3. Club Introduction: "MORE THAN A FINANCE CLUB" */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-[#0a0c0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Institutional Foundation
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              MORE THAN A FINANCE CLUB
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
              Founded on the belief that financial acumen is the highest leverage skill in modern commerce, AIUB Students Finance Club bridges theoretical academic excellence with competitive corporate immersion.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                Financial Excellence
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-sans">
                Mastering discounted cash flow (DCF), LBO mechanics, equity valuation, and portfolio risk management through hands-on bootcamps and terminal simulation workshops.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                Professional Development
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-sans">
                Fast-track corporate internship pipelines with premier private commercial banks, non-banking financial institutions, stock brokerages, and multinational FMCGs.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                Leadership &amp; Collaboration
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-sans">
                Hosting national collegiate Olympiads, fostering bilateral university alliances, and orchestrating high-stakes inter-university case competitions across Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Club Statistics (Dynamic & Live Counter Animation) */}
      <section className="py-14 bg-[#060806] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/40 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                <AnimatedCounter target={parseInt(settings.statEstablished) || 2026} duration={1500} />
              </span>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                Founded
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/40 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
                <AnimatedCounter target={settings.statExecutiveMembers} duration={1500} />
              </span>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                Executive Body
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/40 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                <AnimatedCounter target={settings.statCompetitions} suffix="+" duration={1600} />
              </span>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                Competitions
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/40 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
                <AnimatedCounter target={settings.statSeminars} suffix="+" duration={1700} />
              </span>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                Seminars &amp; Labs
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/40 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                <AnimatedCounter target={settings.statCollaborations} suffix="+" duration={1800} />
              </span>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                Collaborations
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/40 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
                <AnimatedCounter target={settings.statAchievements} suffix="+" duration={1900} />
              </span>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                Member Honors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Financial Lab & Scenario Simulator */}
      <InteractiveFinanceLab />

      {/* 5. Latest Announcements & Notices */}
      <section className="py-20 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                <Bell className="w-3.5 h-3.5" /> Official Circulars
              </div>
              <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                NOTICES &amp; ANNOUNCEMENTS
              </h2>
            </div>
            <Link
              href="/notices"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              View All Notices <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-deep/40 text-emerald-300 font-semibold uppercase tracking-wider border border-brand-green/20">
                      {notice.category}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{notice.publishDate}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white hover:text-emerald-300 transition-colors line-clamp-2">
                    <Link href={`/notices/${notice.slug}`}>{notice.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {notice.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  {notice.deadline && (
                    <span className="text-[11px] font-mono text-zinc-400">
                      Deadline: <span className="text-white font-medium">{notice.deadline}</span>
                    </span>
                  )}
                  <Link
                    href={`/notices/${notice.slug}`}
                    className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1 ml-auto"
                  >
                    Read Circular <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming & Flagship Events */}
      <section className="py-20 bg-[#090b09] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" /> High-Stakes Engagements
              </div>
              <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                EVENTS &amp; COMPETITIONS
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              Browse Event Calendar <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {publishedEvents.map((ev) => (
              <div
                key={ev.id}
                className="group rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/50 overflow-hidden transition-all duration-300 flex flex-col"
              >
                <div className="relative h-52 w-full overflow-hidden bg-black">
                  <Image
                    src={ev.coverImage}
                    alt={ev.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-emerald-300 text-[10px] font-mono font-bold tracking-wider uppercase border border-brand-green/30">
                      {ev.category}
                    </span>
                  </div>
                  {ev.isPast && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-400 text-[10px] font-mono">
                        Concluded
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mb-2">
                      <span>{ev.date}</span>
                      <span>•</span>
                      <span>{ev.time}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      <Link href={`/events/${ev.slug}`}>{ev.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 line-clamp-1 max-w-[170px]">
                      {ev.venue}
                    </span>
                    <Link
                      href={`/events/${ev.slug}`}
                      className="text-xs font-bold text-emerald-400 hover:text-white inline-flex items-center gap-1"
                    >
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Leadership Messages: President & Mentor */}
      <section className="py-20 lg:py-28 bg-[#050505] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* President's Message */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0f110f] border border-white/10 relative">
              <Quote className="w-12 h-12 text-brand-green/20 absolute top-6 right-6 pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-brand-green/40 flex-shrink-0">
                  <Image
                    src={presidentMessage.photoUrl}
                    alt={presidentMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    PRESIDENT'S ADDRESS
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white">
                    {presidentMessage.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{presidentMessage.title}, {presidentMessage.role}</p>
                </div>
              </div>
              <blockquote className="text-emerald-300/90 text-sm italic font-editorial leading-relaxed border-l-2 border-brand-green pl-4 mb-4">
                "{presidentMessage.quote}"
              </blockquote>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {presidentMessage.content[0]}
              </p>
              <div className="mt-6 pt-4 border-t border-white/5">
                <Link
                  href="/about#president"
                  className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white inline-flex items-center gap-1.5"
                >
                  Read Full Presidential Message <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Club Mentor / Advisor's Message */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0f110f] border border-white/10 relative">
              <Quote className="w-12 h-12 text-brand-green/20 absolute top-6 right-6 pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-brand-green/40 flex-shrink-0">
                  <Image
                    src={mentorMessage.photoUrl}
                    alt={mentorMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    FACULTY ADVISOR MESSAGE
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white">
                    {mentorMessage.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{mentorMessage.title}, {mentorMessage.role}</p>
                </div>
              </div>
              <blockquote className="text-emerald-300/90 text-sm italic font-editorial leading-relaxed border-l-2 border-brand-green pl-4 mb-4">
                "{mentorMessage.quote}"
              </blockquote>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {mentorMessage.content[0]}
              </p>
              <div className="mt-6 pt-4 border-t border-white/5">
                <Link
                  href="/about#advisor"
                  className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white inline-flex items-center gap-1.5"
                >
                  Read Faculty Advisor Note <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Executive Committee Preview (All 15 members directory access) */}
      <section className="py-20 bg-[#090b09] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" /> Organizational Leadership
              </div>
              <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                EXECUTIVE COMMITTEE (2026)
              </h2>
            </div>
            <Link
              href="/executive-committee"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              Meet Full 15-Member Directory <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {leadershipPreview.map((exec) => (
              <div
                key={exec.id}
                className="p-6 rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/40 transition-all text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden relative border-2 border-brand-green/30 mb-4">
                  <Image
                    src={exec.photoUrl}
                    alt={exec.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {exec.name}
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase mt-0.5">
                  {exec.designation}
                </span>
                <p className="mt-3 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {exec.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. The Wall of Excellence Preview (Member Achievements) */}
      <section className="py-20 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" /> Celebrating Ambition. Recognizing Achievement.
              </div>
              <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                THE WALL OF EXCELLENCE
              </h2>
            </div>
            <Link
              href="/achievements"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              Explore All Honors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topAchievements.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 hover:border-brand-green/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-brand-green/30 uppercase tracking-wider font-semibold">
                      {ach.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{ach.year}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white hover:text-emerald-300 transition-colors">
                    <Link href={`/achievements/${ach.slug}`}>{ach.achievementTitle}</Link>
                  </h3>
                  <p className="mt-1 text-xs font-mono text-emerald-400 font-semibold">
                    {ach.memberName}
                  </p>
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed italic line-clamp-3">
                    "{ach.congratulatoryMessage}"
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                  Organization: {ach.organizationOrCompetition}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Finance Journal Preview */}
      <section className="py-20 bg-[#090b09] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" /> Monthly Financial Publications
              </div>
              <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                FINANCE JOURNAL
              </h2>
            </div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              Read Full Journal <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topArticles.map((art) => (
              <article
                key={art.id}
                className="group rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/40 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-black">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 font-bold uppercase">
                        {art.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-2">
                      <span>{art.publishDate}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      <Link href={`/journal/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                  <span className="text-[11px] font-mono text-zinc-400">By {art.author}</span>
                  <Link
                    href={`/journal/${art.slug}`}
                    className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Latest Opportunities Preview */}
      <section className="py-20 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                <Briefcase className="w-3.5 h-3.5" /> Corporate Pipelines
              </div>
              <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white">
                LATEST OPPORTUNITIES
              </h2>
            </div>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              Browse All Opportunities <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-deep/50 text-emerald-300 font-semibold uppercase">
                      {opp.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        opp.status === 'OPEN'
                          ? 'bg-emerald-900/60 text-emerald-300'
                          : opp.status === 'CLOSING SOON'
                          ? 'bg-amber-900/60 text-amber-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {opp.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white hover:text-emerald-300 transition-colors">
                    <Link href={`/opportunities/${opp.slug}`}>{opp.title}</Link>
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">{opp.organization}</p>
                  <p className="mt-3 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">
                    Deadline: {opp.deadline}
                  </span>
                  <Link
                    href={`/opportunities/${opp.slug}`}
                    className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Corporate Collaborations Preview */}
      <section className="py-16 bg-[#090b09] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            STRATEGIC COLLABORATIONS &amp; PARTNERS
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {featuredCollaborations.map((collab) => (
              <div
                key={collab.id}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-green/30 transition-all flex flex-col items-center justify-center text-center"
              >
                <div className="w-12 h-12 relative mb-2">
                  <Image
                    src={collab.logoUrl}
                    alt={collab.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
                <h4 className="font-heading font-bold text-sm text-white">{collab.name}</h4>
                <span className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">
                  {collab.category} Partner
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/collaborations"
              className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1"
            >
              Explore Full Institutional Portfolio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Recruitment Call-To-Action Banner */}
      <section className="py-20 bg-gradient-to-br from-[#064D20] via-[#078B25] to-[#043314] relative overflow-hidden text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Spring 2026 Induction
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight">
            BE PART OF SOMETHING EXTRAORDINARY
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-sans">
            Whether you aspire to work in investment banking, financial analysis, corporate treasury, or fintech innovation, your journey begins with AIUB Students Finance Club.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/recruitment"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider bg-white text-black hover:bg-zinc-100 shadow-2xl transition-all"
            >
              APPLY FOR MEMBERSHIP
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider bg-black/40 hover:bg-black/60 border border-white/20 text-white transition-all backdrop-blur-md"
            >
              PARTNERSHIP INQUIRIES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

