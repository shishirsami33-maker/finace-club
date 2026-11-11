'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileCheck,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialStore } from '@/lib/data';

export default function RecruitmentPage() {
  const { recruitment } = initialStore;

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    department: 'BBA (Finance Major)',
    completedCredits: '30+',
    cgpa: '3.50',
    preferredWing: 'Operations & Events',
    whyJoin: '',
    previousExperience: '',
    linkedinUrl: '',
    portfolioUrl: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmitted(true);
      // Trigger festive celebration confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#078B25', '#10B981', '#FFFFFF', '#064D20'],
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-[#0a120a] to-[#050505] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-brand-deep/50 border border-brand-green/30 text-emerald-300 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> {recruitment.cycleName}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white max-w-4xl mx-auto">
            RECRUITMENT &amp; INDUCTION
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Join the flagship financial society of American International University-Bangladesh. Build analytical dominance, lead national initiatives, and accelerate your career.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="px-4 py-2 rounded-xl bg-black/60 border border-brand-green/40 text-emerald-300 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-green" /> Deadline: {recruitment.deadline}
            </span>

            {/* AIUB & OSA Sanction */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
              <Image src="/images/aiub-logo.png" alt="AIUB" width={20} height={20} className="object-contain" />
              <span>AIUB</span>
              <span className="text-white/20">•</span>
              <Image src="/images/osa-logo.png" alt="OSA" width={20} height={20} className="object-contain" />
              <span>OSA Sanctioned</span>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Why Join & Membership Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Value Proposition
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-2">
            WHY JOIN AIUB FINANCE CLUB?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Corporate Internship Pipeline',
              desc: 'Direct priority screening and alumni endorsements for credit analysis, corporate treasury, and equity research roles across top banks in Dhaka.',
              icon: TrendingUp,
            },
            {
              title: 'Practical Valuation Mastery',
              desc: 'Hands-on training in Discounted Cash Flow (DCF), LBO, and capital asset pricing models using professional spreadsheet frameworks.',
              icon: FileCheck,
            },
            {
              title: 'Executive Project Leadership',
              desc: 'Orchestrate nationwide competitions engaging 40+ university delegations, corporate CEOs, and media networks.',
              icon: Award,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-deep/50 border border-brand-green/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-300 transition-colors uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Selection Stages & Eligibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Selection Stages */}
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Four-Stage Process
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-2 mb-8">
              SELECTION TIMELINE
            </h2>

            <div className="space-y-6">
              {recruitment.stages.map((stg) => (
                <div
                  key={stg.step}
                  className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-green text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    0{stg.step}
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading font-bold text-base text-white">{stg.title}</h3>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        {stg.timeline}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 font-sans leading-relaxed">
                      {stg.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & Expectations */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0f120f] border border-white/10 space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Prerequisites &amp; Expectations
            </span>
            <h3 className="font-heading font-bold text-2xl text-white uppercase tracking-tight">
              ELIGIBILITY CRITERIA
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-sans text-zinc-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Eligible Departments:</strong> {recruitment.eligibleDepartments.join(', ')}.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Academic Baseline:</strong> {recruitment.minimumCredits}.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Time Commitment:</strong> Dedicated engagement of 4-6 hours per week for project wings, committee deliberations, and event execution.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Professional Conduct:</strong> Adherence to university code of conduct, intellectual integrity, and collaborative team spirit.
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href="#apply"
                className="w-full py-3.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-green/20"
              >
                JUMP TO APPLICATION FORM <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Recruitment Application Form */}
      <section id="apply" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e100e] border-2 border-brand-green/40 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Digital Submission
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
              OFFICIAL MEMBERSHIP APPLICATION
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans">
              Please provide verified academic and contact credentials. Inaccurate or fabricated information will result in immediate disqualification.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-green text-white flex items-center justify-center mx-auto shadow-2xl shadow-brand-green/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white uppercase">
                APPLICATION SUBMITTED SUCCESSFULLY!
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed font-sans">
                Thank you for applying to AIUB Students Finance Club. Our Recruitment Wing has logged your submission. You will receive an email confirmation and notification regarding Stage 2 aptitude evaluation.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-heading font-bold uppercase text-white transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    AIUB Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g. 23-51234-1"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Official Student Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. 23-51234-1@student.aiub.edu"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +880 1712 345678"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Department / Faculty *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="BBA (Finance Major)">BBA (Finance Major)</option>
                    <option value="BBA (Marketing / HRM / General)">BBA (Other Majors)</option>
                    <option value="Department of Economics">Department of Economics</option>
                    <option value="FST (CSE / CS / SE)">FST (Computer Science)</option>
                    <option value="FASS (Media & Mass Comm)">FASS (Media / English)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Completed Credits
                  </label>
                  <input
                    type="text"
                    value={formData.completedCredits}
                    onChange={(e) => setFormData({ ...formData, completedCredits: e.target.value })}
                    placeholder="e.g. 45"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Cumulative CGPA
                  </label>
                  <input
                    type="text"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    placeholder="e.g. 3.65"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                  Preferred Wing Preference *
                </label>
                <select
                  value={formData.preferredWing}
                  onChange={(e) => setFormData({ ...formData, preferredWing: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                >
                  <option value="Operations & Events">Operations &amp; Event Management</option>
                  <option value="Academic & Investment Research">Academic &amp; Investment Research</option>
                  <option value="Marketing & Brand Strategy">Marketing &amp; Brand Strategy</option>
                  <option value="Creative Design & Media Production">Creative Design &amp; Media Production</option>
                  <option value="Talent Acquisition & Welfare">Talent Acquisition &amp; Club Welfare</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                  Why do you wish to join AIUB Students Finance Club? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.whyJoin}
                  onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                  placeholder="Elaborate on your career aspirations, interest in financial markets, and how you aim to contribute to club initiatives..."
                  className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    LinkedIn Profile URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Resume / Portfolio Link (Drive / Dropbox)
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-green/20 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? 'RECORDING APPLICATION...' : 'SUBMIT OFFICIAL APPLICATION'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase">
            Everything you need to know about the induction cycle
          </p>
        </div>

        <div className="space-y-4">
          {recruitment.faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm text-white hover:text-emerald-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

