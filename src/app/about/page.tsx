import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  Target,
  Shield,
  Award,
  Users,
  CheckCircle2,
  Quote,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'About AIUB Students Finance Club | Our Mission & Vision',
  description:
    'Explore the mission, official objectives, leadership, advisory body, and institutional heritage of AIUB Students Finance Club at American International University-Bangladesh.',
  canonicalPath: '/about',
});

export default function AboutPage() {
  const store = getStore();
  const { presidentMessage, mentorMessage, settings } = store;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Page Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Institutional Profile
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              ABOUT AIUB STUDENTS FINANCE CLUB
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              American International University-Bangladesh’s premier student organization dedicated to financial intelligence, institutional leadership, and competitive corporate excellence.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 blur-[120px] pointer-events-none" />
      </section>

      {/* 1. Introduction & Background */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
              BRIDGING THEORY AND FINANCIAL LEADERSHIP
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              <p>
                Established under the guidance of the Faculty of Business Administration at American International University-Bangladesh (AIUB), the AIUB Students Finance Club serves as the vital conduit between classroom corporate finance principles and real-world capital market mechanics.
              </p>
              <p>
                We believe that modern finance is no longer confined to static bookkeeping. It is an evolving nexus of data analytics, quantitative valuation, macro policy, and ethical capital stewardship. Our platform equips undergraduate scholars with the practical modeling skillsets and strategic acumen required to thrive in multinational corporations, commercial banks, investment consultancies, and emerging fintech ventures.
              </p>
              <p>
                Through nationwide Olympiads, corporate conclaves, research whitepapers, and rigorous valuation bootcamps, we cultivate a community characterized by ambition, analytical discipline, and collaborative leadership.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/events/event-2.jpg"
                alt="AIUB Finance Club Corporate Conclave"
                fill
                className="object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Leadership in Action
                </span>
                <p className="text-sm font-heading font-bold text-white mt-1">
                  Engaging senior corporate executives, alumni leaders, and distinguished faculty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="py-20 bg-[#080a08] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#121412] border border-white/10 relative">
              <div className="w-12 h-12 rounded-xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white">
                OUR VISION
              </h3>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                To stand as the vanguard student financial organization in Bangladesh, recognized nationally and internationally for cultivating visionary, analytically adept, and ethically grounded financial leaders who drive sustainable economic advancement.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#121412] border border-white/10 relative">
              <div className="w-12 h-12 rounded-xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white">
                OUR MISSION
              </h3>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                To empower university students through practical valuation bootcamps, high-stakes financial competitions, research publications, and corporate partnerships—fostering analytical excellence, professional readiness, and lifelong leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Club Objectives */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            Organizational Mandate
          </span>
          <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white">
            OFFICIAL OBJECTIVES
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
            Guiding our annual calendar, strategic engagements, and member activities:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Promote Advanced Financial Literacy',
              desc: 'Demystify capital market structures, equity valuation, monetary policies, and personal portfolio management across the student community.',
            },
            {
              title: 'Organize Prestigious Competitions',
              desc: 'Host intra and inter-university financial Olympiads, modeling challenges, and case battles that test real-time analytical precision under competitive pressure.',
            },
            {
              title: 'Bridge Academia and Industry',
              desc: 'Facilitate guest lectures, corporate symposiums, and industrial liaisons with premier commercial banks, NBFI institutions, and asset management firms.',
            },
            {
              title: 'Cultivate Career Pipelines',
              desc: 'Provide verified internship channels, priority screening for management trainee tracks, and career acceleration for active club associates.',
            },
            {
              title: 'Publish Empirical Research & Insights',
              desc: 'Author monthly editorial articles, whitepapers, and national student financial literacy indexes in our official Finance Journal.',
            },
            {
              title: 'Nurture Student Leadership & Ethics',
              desc: 'Instill high ethical standards, intellectual honesty in financial reporting, team leadership, and cross-functional project management.',
            },
          ].map((obj, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#0e100e] border border-white/10 flex items-start gap-4 hover:border-brand-green/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-brand-deep/40 text-emerald-400 mt-1 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-white">{obj.title}</h4>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20 bg-[#080a08] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl uppercase tracking-tight text-white">
              OUR CORE VALUES
            </h2>
            <p className="mt-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Foundations of our organizational culture
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Analytical Rigor',
                desc: 'Grounding every thesis, model, and decision in empirical evidence, critical thinking, and disciplined inquiry.',
              },
              {
                title: 'Ethical Integrity',
                desc: 'Upholding uncompromising governance, fiscal transparency, and academic honesty in all organizational pursuits.',
              },
              {
                title: 'Collaborative Ambition',
                desc: 'Believing that true leadership multiplies individual strength into collective triumph across departmental boundaries.',
              },
              {
                title: 'Continuous Innovation',
                desc: 'Embracing fintech breakthroughs, quantitative methodologies, and progressive pedagogical approaches.',
              },
            ].map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121412] border border-white/10 hover:border-brand-green/40 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-brand-green/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                  0{idx + 1}
                </div>
                <h4 className="font-heading font-bold text-lg text-white">{v.title}</h4>
                <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Governance: AIUB & Office of Student Affairs (OSA) */}
      <section className="py-20 bg-[#070907] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Institutional Framework
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              GOVERNANCE &amp; CHARTER
            </h2>
            <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
              Officially recognized and operating under the regulatory supervision and administrative patronage of AIUB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AIUB University Card */}
            <div className="p-8 rounded-3xl bg-[#0f120f] border border-white/10 hover:border-brand-green/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 p-2 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src="/images/aiub-logo.png"
                      alt="American International University-Bangladesh Logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      Parent Institution
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white">
                      American International University-Bangladesh
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans">Estd. 1994 • Kuratoli, Dhaka</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  AIUB is committed to fostering academic rigor, technological advancement, and globally recognized business pedagogy. The university provides state-of-the-art campus infrastructure and institutional accreditation for all club symposiums and summits.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Chartered University</span>
                <span className="text-emerald-400 font-mono font-semibold">Institutional Patron</span>
              </div>
            </div>

            {/* OSA Card */}
            <div className="p-8 rounded-3xl bg-[#0f120f] border border-white/10 hover:border-brand-green/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 p-2 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src="/images/osa-logo.png"
                      alt="Office of Student Affairs (OSA) Logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      Governing Directorate
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white">
                      Office of Student Affairs (OSA)
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans">Central Directorate • Student Leadership</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  The Office of Student Affairs (OSA) orchestrates and regulates co-curricular excellence across AIUB. OSA oversees club constitution compliance, executive electoral transitions, official permissions, and inter-university delegate protocols.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Regulatory Supervision</span>
                <span className="text-emerald-400 font-mono font-semibold">Club Governance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Advisor & Mentor Profiles (Dedicated Anchors) */}
      <section id="advisor" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Advisor Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0e100e] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-brand-green flex-shrink-0">
                  <Image
                    src={mentorMessage.photoUrl}
                    alt={mentorMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    FACULTY ADVISOR
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {mentorMessage.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{mentorMessage.role}</p>
                </div>
              </div>
              <blockquote className="text-emerald-300 text-sm italic font-editorial leading-relaxed border-l-2 border-brand-green pl-4 mb-4">
                "{mentorMessage.quote}"
              </blockquote>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {mentorMessage.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-xs text-zinc-500 font-mono">
              Faculty of Business Administration • American International University-Bangladesh
            </div>
          </div>

          {/* President Card */}
          <div id="president" className="p-8 sm:p-10 rounded-3xl bg-[#0e100e] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-brand-green flex-shrink-0">
                  <Image
                    src={presidentMessage.photoUrl}
                    alt={presidentMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    PRESIDENT
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {presidentMessage.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{presidentMessage.title}, {presidentMessage.role}</p>
                </div>
              </div>
              <blockquote className="text-emerald-300 text-sm italic font-editorial leading-relaxed border-l-2 border-brand-green pl-4 mb-4">
                "{presidentMessage.quote}"
              </blockquote>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {presidentMessage.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">Executive Committee 2026</span>
              <Link
                href="/executive-committee"
                className="text-xs font-heading font-bold text-emerald-400 hover:text-white uppercase inline-flex items-center gap-1"
              >
                View Full Committee <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Membership Overview CTA */}
      <section className="py-16 bg-[#080a08] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
            JOIN OUR PROFESSIONAL COMMUNITY
          </h2>
          <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
            Gain priority access to corporate internships, investment research masterclasses, national competition mentorship, and an esteemed network of alumni.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/recruitment"
              className="px-6 py-3 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-brand-green/20"
            >
              MEMBERSHIP DETAILS &amp; APPLY
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-white/10"
            >
              CONTACT SECRETARIAT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

