'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';
import { OpportunityItem, OpportunityCategory, OpportunityStatus, ContentStatus } from '@/types';

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOpp, setEditingOpp] = useState<OpportunityItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setOpportunities(data.opportunities || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOpp) return;

    let updatedList: OpportunityItem[];
    if (isNew) {
      updatedList = [editingOpp, ...opportunities];
    } else {
      updatedList = opportunities.map((o) => (o.id === editingOpp.id ? editingOpp : o));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'opportunities',
          data: updatedList,
          details: `${isNew ? 'Added' : 'Updated'} opportunity: ${editingOpp.title} (${editingOpp.organization})`,
        }),
      });

      if (res.ok) {
        setOpportunities(updatedList);
        setEditingOpp(null);
        setIsNew(false);
        setStatusMessage('Opportunity saved successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this opportunity?')) return;
    const updatedList = opportunities.filter((o) => o.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'opportunities',
          data: updatedList,
          details: `Removed opportunity ${id}`,
        }),
      });

      if (res.ok) {
        setOpportunities(updatedList);
        setStatusMessage('Opportunity removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewOpp = () => {
    const fresh: OpportunityItem = {
      id: `opp-${Date.now()}`,
      slug: `opp-${Date.now()}`,
      title: '',
      organization: '',
      category: 'Internships',
      description: '',
      eligibility: 'Undergraduate business/finance students.',
      location: 'Dhaka, Bangladesh',
      deadline: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
      publishDate: new Date().toISOString().split('T')[0],
      applicationUrl: '',
      status: 'OPEN',
      compensation: 'Competitive Allowance',
      workflowStatus: 'published',
    };
    setEditingOpp(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Opportunities...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-brand-green" /> MANAGE CAREER OPPORTUNITIES
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Administer corporate internships, banking fellowships, and case competitions.
          </p>
        </div>

        <button
          onClick={openNewOpp}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> ADD OPPORTUNITY
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-deep text-emerald-300 uppercase font-semibold">
                  {opp.category}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    opp.status === 'OPEN'
                      ? 'bg-emerald-950 text-emerald-300'
                      : opp.status === 'CLOSING SOON'
                      ? 'bg-amber-950 text-amber-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {opp.status}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-white">{opp.title}</h3>
              <p className="text-xs font-mono text-emerald-400 mt-0.5">{opp.organization}</p>
              <p className="mt-2 text-xs text-zinc-400 line-clamp-2">{opp.description}</p>
              <div className="mt-3 text-[11px] font-mono text-zinc-500">
                Deadline: <strong className="text-white">{opp.deadline}</strong>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500">
                Pub: {opp.publishDate}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingOpp(opp);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(opp.id)}
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
      {editingOpp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Create Opportunity' : 'Edit Opportunity'}
              </h3>
              <button
                onClick={() => setEditingOpp(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingOpp.title}
                    onChange={(e) =>
                      setEditingOpp({
                        ...editingOpp,
                        title: e.target.value,
                        slug: isNew
                          ? e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '')
                          : editingOpp.slug,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Organization / Bank *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingOpp.organization}
                    onChange={(e) =>
                      setEditingOpp({ ...editingOpp, organization: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingOpp.category}
                    onChange={(e) =>
                      setEditingOpp({
                        ...editingOpp,
                        category: e.target.value as OpportunityCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Internships">Internships</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Case competitions">Case competitions</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Certifications">Certifications</option>
                    <option value="Training programs">Training programs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Application Status *
                  </label>
                  <select
                    value={editingOpp.status}
                    onChange={(e) =>
                      setEditingOpp({
                        ...editingOpp,
                        status: e.target.value as OpportunityStatus,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSING SOON">CLOSING SOON</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    required
                    value={editingOpp.deadline}
                    onChange={(e) =>
                      setEditingOpp({ ...editingOpp, deadline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingOpp.description}
                  onChange={(e) =>
                    setEditingOpp({ ...editingOpp, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Eligibility
                  </label>
                  <input
                    type="text"
                    value={editingOpp.eligibility}
                    onChange={(e) =>
                      setEditingOpp({ ...editingOpp, eligibility: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Application URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingOpp.applicationUrl}
                    onChange={(e) =>
                      setEditingOpp({ ...editingOpp, applicationUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingOpp(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

