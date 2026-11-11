'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Users,
  ShieldCheck,
  Briefcase,
  Award,
  BookOpen,
  FileText,
  Image as ImageIcon,
  UserCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
  Plus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { AppStore } from '@/types';

export default function AdminOverviewPage() {
  const [store, setStore] = useState<AppStore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setStore(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching CMS store:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !store) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xs font-mono text-emerald-400 animate-pulse">
          Loading ASFC CMS Dashboard Data...
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Published Notices', count: store.notices.length, href: '/admin/notices', icon: Bell, color: 'text-emerald-400' },
    { label: 'Events & Comps', count: store.events.length, href: '/admin/events', icon: Calendar, color: 'text-blue-400' },
    { label: 'Executive Officers', count: store.executives.length, href: '/admin/executive', icon: Users, color: 'text-purple-400' },
    { label: 'Corporate Partners', count: store.collaborations.length, href: '/admin/collaborations', icon: ShieldCheck, color: 'text-amber-400' },
    { label: 'Active Opportunities', count: store.opportunities.length, href: '/admin/opportunities', icon: Briefcase, color: 'text-emerald-400' },
    { label: 'Wall of Excellence', count: store.achievements.length, href: '/admin/achievements', icon: Award, color: 'text-yellow-400' },
    { label: 'Journal Articles', count: store.journal.length, href: '/admin/journal', icon: BookOpen, color: 'text-cyan-400' },
    { label: 'Reports & Pubs', count: store.reports.length, href: '/admin/reports', icon: FileText, color: 'text-rose-400' },
    { label: 'Media Items', count: store.gallery.length, href: '/admin/gallery', icon: ImageIcon, color: 'text-indigo-400' },
    { label: 'Recruitment Apps', count: store.recruitmentApplications?.length || 0, href: '/admin/recruitment', icon: UserCheck, color: 'text-emerald-300' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0c140c] via-[#091009] to-[#060806] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Institutional Management System
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
            EXECUTIVE CMS OVERVIEW
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
            AIUB Students Finance Club • Control deck for content workflows, circulars, and recruitment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/notices"
            className="px-4 py-2 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
          >
            <Plus className="w-3.5 h-3.5" /> New Circular
          </Link>
          <Link
            href="/admin/events"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Post Event
          </Link>
        </div>
      </div>

      {/* Module Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="p-5 rounded-2xl bg-[#0e100e] border border-white/10 hover:border-brand-green/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  {c.label}
                </span>
                <Icon className={`w-4 h-4 ${c.color}`} />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {c.count}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-0.5">
                  Manage <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Workflow Pipeline & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Content Approval Workflow Pipeline */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-heading font-bold text-base uppercase tracking-wider text-white">
              Publication Governance
            </h2>
            <span className="text-xs font-mono text-emerald-400 font-bold">5 Stages</span>
          </div>

          <div className="space-y-4">
            {[
              { stage: 'Draft', desc: 'Content compiled by Student Associate / Contributor', active: true },
              { stage: 'Review', desc: 'Editorial & factual verification by Wing In Charge', active: true },
              { stage: 'Approval', desc: 'Sanctioned by General Secretary / Treasurer', active: true },
              { stage: 'Published', desc: 'Publicly live with indexable URL, metadata & sitemap', active: true },
              { stage: 'Archived', desc: 'Stored in historical annals after deadline expires', active: true },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-deep text-emerald-300 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-green/40">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-white">{step.stage}</h4>
                  <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-brand-deep/20 border border-brand-green/20 text-xs text-zinc-300 font-sans leading-relaxed">
            All CMS modifications immediately persist to the server data store and reflect instantly on public pages.
          </div>
        </div>

        {/* Real-time Audit Logs */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0e100e] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-heading font-bold text-base uppercase tracking-wider text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Recent Activity &amp; Audit Trail
            </h2>
            <span className="text-xs font-mono text-zinc-500">Live Logging</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {(!store.auditLogs || store.auditLogs.length === 0) ? (
              <p className="text-xs text-zinc-500 font-mono">No recent activity logged.</p>
            ) : (
              store.auditLogs.slice(0, 8).map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-emerald-400 font-bold">{log.action}</span>
                    <span className="text-zinc-500 text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-zinc-300 font-sans text-[11px]">{log.details}</p>
                  <p className="text-[10px] font-mono text-zinc-500">Officer: {log.user}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

