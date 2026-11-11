'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  Search,
  Filter,
  Save,
  Trash2,
} from 'lucide-react';
import { RecruitmentApplication, RecruitmentConfig } from '@/types';

export default function AdminRecruitmentPage() {
  const [applications, setApplications] = useState<RecruitmentApplication[]>([]);
  const [recruitmentConfig, setRecruitmentConfig] = useState<RecruitmentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterWing, setFilterWing] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.recruitmentApplications || []);
        setRecruitmentConfig(data.recruitment || null);
        setLoading(false);
      });
  }, []);

  const updateAppStatus = async (
    id: string,
    newStatus: 'Pending' | 'Interview Shortlisted' | 'Accepted' | 'Declined'
  ) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a));

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'recruitmentApplications',
          data: updated,
          details: `Updated application ${id} status to ${newStatus}`,
        }),
      });

      if (res.ok) {
        setApplications(updated);
        setStatusMessage(`Candidate status marked as ${newStatus}.`);
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruitmentConfig) return;

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'recruitment',
          data: recruitmentConfig,
          details: `Updated recruitment cycle deadline and configuration`,
        }),
      });

      if (res.ok) {
        setStatusMessage('Recruitment cycle settings saved successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApps = applications.filter((app) => {
    if (filterWing !== 'All' && app.preferredWing !== filterWing) return false;
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    return true;
  });

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Recruitment Portal...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-brand-green" /> RECRUITMENT &amp; APPLICANT GOVERNANCE
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-0.5">
          Evaluate incoming student applications, shortlist candidate interviews, and manage cycle deadlines.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Cycle Configuration Panel */}
      {recruitmentConfig && (
        <div className="p-6 rounded-3xl bg-[#0e100e] border border-white/10 space-y-4">
          <h2 className="font-heading font-bold text-base uppercase text-white tracking-wider">
            Active Induction Cycle Parameters
          </h2>
          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Cycle Title
              </label>
              <input
                type="text"
                value={recruitmentConfig.cycleName}
                onChange={(e) =>
                  setRecruitmentConfig({ ...recruitmentConfig, cycleName: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Application Deadline
              </label>
              <input
                type="text"
                value={recruitmentConfig.deadline}
                onChange={(e) =>
                  setRecruitmentConfig({ ...recruitmentConfig, deadline: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Save Cycle Parameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e100e] border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 uppercase">Wing:</span>
          <select
            value={filterWing}
            onChange={(e) => setFilterWing(e.target.value)}
            className="px-3 py-1.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white"
          >
            <option value="All">All Wings</option>
            <option value="Operations & Events">Operations &amp; Events</option>
            <option value="Academic & Investment Research">Academic &amp; Research</option>
            <option value="Marketing & Brand Strategy">Marketing &amp; Strategy</option>
            <option value="Creative Design & Media Production">Creative &amp; Media</option>
            <option value="Talent Acquisition & Welfare">Talent &amp; Welfare</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 uppercase">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Interview Shortlisted">Shortlisted</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Candidate &amp; Student ID</th>
                <th className="p-4">Academic Specs</th>
                <th className="p-4">Wing Choice</th>
                <th className="p-4">Statement</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500 font-mono">
                    No applications match the current filter.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <strong className="text-white font-heading text-sm block">
                        {app.fullName}
                      </strong>
                      <span className="text-[10px] font-mono text-emerald-400">{app.studentId}</span>
                      <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-2">
                        <a href={`mailto:${app.email}`} className="hover:underline text-zinc-300">
                          {app.email}
                        </a>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[11px]">
                      <div className="text-white">{app.department}</div>
                      <div className="text-zinc-500">CGPA: {app.cgpa} • Credits: {app.completedCredits}</div>
                    </td>
                    <td className="p-4 font-mono text-emerald-300">
                      {app.preferredWing}
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-zinc-300 line-clamp-2 text-xs">{app.whyJoin}</p>
                      {app.portfolioUrl && (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-emerald-400 underline block mt-1"
                        >
                          View Resume
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          app.status === 'Accepted'
                            ? 'bg-emerald-950 text-emerald-300'
                            : app.status === 'Interview Shortlisted'
                            ? 'bg-blue-950 text-blue-300'
                            : app.status === 'Declined'
                            ? 'bg-red-950 text-red-300'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => updateAppStatus(app.id, 'Interview Shortlisted')}
                        className="p-1 px-2 rounded-lg bg-blue-900/40 hover:bg-blue-800 text-blue-200 text-[10px] font-mono"
                        title="Shortlist for Interview"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateAppStatus(app.id, 'Accepted')}
                        className="p-1 px-2 rounded-lg bg-emerald-900/40 hover:bg-emerald-800 text-emerald-200 text-[10px] font-mono"
                        title="Accept Candidate"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateAppStatus(app.id, 'Declined')}
                        className="p-1 px-2 rounded-lg bg-red-900/40 hover:bg-red-800 text-red-300 text-[10px] font-mono"
                        title="Decline Candidate"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

