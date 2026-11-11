'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Mail,
  Linkedin,
} from 'lucide-react';
import { ExecutiveMember } from '@/types';

export default function AdminExecutivePage() {
  const [executives, setExecutives] = useState<ExecutiveMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExec, setEditingExec] = useState<ExecutiveMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setExecutives(data.executives || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExec) return;

    let updatedList: ExecutiveMember[];
    if (isNew) {
      updatedList = [...executives, editingExec];
    } else {
      updatedList = executives.map((x) => (x.id === editingExec.id ? editingExec : x));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'executives',
          data: updatedList,
          details: `${isNew ? 'Added' : 'Updated'} executive officer: ${editingExec.name} (${editingExec.designation})`,
        }),
      });

      if (res.ok) {
        setExecutives(updatedList);
        setEditingExec(null);
        setIsNew(false);
        setStatusMessage('Executive roster saved successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this officer from the roster?')) return;
    const updatedList = executives.filter((x) => x.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'executives',
          data: updatedList,
          details: `Removed executive ${id}`,
        }),
      });

      if (res.ok) {
        setExecutives(updatedList);
        setStatusMessage('Officer entry removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewExec = () => {
    const fresh: ExecutiveMember = {
      id: `exec-${Date.now()}`,
      name: '',
      designation: '',
      wing: 'Operations',
      order: executives.length + 1,
      photoUrl: '/images/club-logo-512.png',
      bio: '',
      email: 'aiubfinanceclub@gmail.com',
      linkedin: 'https://www.linkedin.com/company/aiubfinanceclub',
      term: '2026',
      isLeadership: false,
      status: 'active',
    };
    setEditingExec(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Executive Directory...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-green" /> EXECUTIVE ROSTER &amp; GOVERNANCE
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Administer the 15-member executive committee, wings, bios, designations, and contact links.
          </p>
        </div>

        <button
          onClick={openNewExec}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> ADD OFFICER
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Roster Table */}
      <div className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Officer &amp; Photo</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Wing</th>
                <th className="p-4">Term</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {executives.map((ex) => (
                <tr key={ex.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10 flex-shrink-0">
                        <Image
                          src={ex.photoUrl}
                          alt={ex.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <strong className="text-white font-heading text-sm">{ex.name}</strong>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 max-w-xs">{ex.bio}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-400">
                    {ex.designation}
                  </td>
                  <td className="p-4 font-mono text-zinc-400">
                    {ex.wing}
                  </td>
                  <td className="p-4 font-mono text-zinc-400">
                    {ex.term}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingExec(ex);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
                      title="Edit Officer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ex.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/60 text-zinc-400 hover:text-red-400"
                      title="Delete Officer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingExec && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Add Executive Officer' : 'Edit Executive Record'}
              </h3>
              <button
                onClick={() => setEditingExec(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExec.name}
                    onChange={(e) =>
                      setEditingExec({ ...editingExec, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Official Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExec.designation}
                    onChange={(e) =>
                      setEditingExec({ ...editingExec, designation: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Functional Wing *
                  </label>
                  <select
                    value={editingExec.wing}
                    onChange={(e) =>
                      setEditingExec({ ...editingExec, wing: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing & Communications">Marketing &amp; Communications</option>
                    <option value="Talent & Welfare">Talent &amp; Welfare</option>
                    <option value="Events & Engagement">Events &amp; Engagement</option>
                    <option value="Advisory">Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Academic Term
                  </label>
                  <input
                    type="text"
                    value={editingExec.term}
                    onChange={(e) =>
                      setEditingExec({ ...editingExec, term: e.target.value })
                    }
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Professional Biography &amp; Responsibilities *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingExec.bio}
                  onChange={(e) =>
                    setEditingExec({ ...editingExec, bio: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={editingExec.email || ''}
                    onChange={(e) =>
                      setEditingExec({ ...editingExec, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={editingExec.linkedin || ''}
                    onChange={(e) =>
                      setEditingExec({ ...editingExec, linkedin: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingExec(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-green/20"
                >
                  Save Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

