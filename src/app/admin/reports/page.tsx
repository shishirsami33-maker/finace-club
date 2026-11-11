'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { ReportItem, ReportType, ContentStatus } from '@/types';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState<ReportItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport) return;

    let updatedList: ReportItem[];
    if (isNew) {
      updatedList = [editingReport, ...reports];
    } else {
      updatedList = reports.map((r) => (r.id === editingReport.id ? editingReport : r));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'reports',
          data: updatedList,
          details: `${isNew ? 'Added' : 'Updated'} report: ${editingReport.title}`,
        }),
      });

      if (res.ok) {
        setReports(updatedList);
        setEditingReport(null);
        setIsNew(false);
        setStatusMessage('Report publication saved!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this publication?')) return;
    const updatedList = reports.filter((r) => r.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'reports',
          data: updatedList,
          details: `Removed report ${id}`,
        }),
      });

      if (res.ok) {
        setReports(updatedList);
        setStatusMessage('Report removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewReport = () => {
    const fresh: ReportItem = {
      id: `rep-${Date.now()}`,
      title: '',
      type: 'Annual Report',
      year: '2026',
      publishDate: new Date().toISOString().split('T')[0],
      description: '',
      coverImage: '/images/events/event-1.jpg',
      fileUrl: '/documents/ASFC_Annual_Report_2025_2026.pdf',
      fileSize: '3.5 MB',
      pageCount: 32,
      status: 'published',
    };
    setEditingReport(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Publications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-green" /> REPORTS &amp; WHITE PAPERS
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Publish annual audit reports, post-event whitepapers, and youth financial research publications.
          </p>
        </div>

        <button
          onClick={openNewReport}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> UPLOAD REPORT
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-deep text-emerald-300 uppercase font-semibold">
                  {rep.type}
                </span>
                <span className="text-xs font-mono text-zinc-500">{rep.year}</span>
              </div>

              <h3 className="font-heading font-bold text-base text-white">{rep.title}</h3>
              <p className="mt-2 text-xs text-zinc-400 line-clamp-3">{rep.description}</p>
              <p className="mt-3 text-[11px] font-mono text-zinc-500">
                {rep.pageCount} Pages • {rep.fileSize}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-500">{rep.status}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingReport(rep);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(rep.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/60 text-zinc-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Publish New Report' : 'Edit Report'}
              </h3>
              <button
                onClick={() => setEditingReport(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Report Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingReport.title}
                  onChange={(e) =>
                    setEditingReport({ ...editingReport, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Publication Type *
                  </label>
                  <select
                    value={editingReport.type}
                    onChange={(e) =>
                      setEditingReport({
                        ...editingReport,
                        type: e.target.value as ReportType,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Annual Report">Annual Report</option>
                    <option value="Event Report">Event Report</option>
                    <option value="Activity Report">Activity Report</option>
                    <option value="Research Publication">Research Publication</option>
                    <option value="Competition Report">Competition Report</option>
                    <option value="Special Publication">Special Publication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Report Year
                  </label>
                  <input
                    type="text"
                    value={editingReport.year}
                    onChange={(e) =>
                      setEditingReport({ ...editingReport, year: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Executive Abstract &amp; Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingReport.description}
                  onChange={(e) =>
                    setEditingReport({ ...editingReport, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    PDF Document URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingReport.fileUrl}
                    onChange={(e) =>
                      setEditingReport({ ...editingReport, fileUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={editingReport.pageCount}
                    onChange={(e) =>
                      setEditingReport({
                        ...editingReport,
                        pageCount: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingReport(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

