'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { CollaborationItem, PartnerCategory, ContentStatus } from '@/types';

export default function AdminCollaborationsPage() {
  const [collaborations, setCollaborations] = useState<CollaborationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<CollaborationItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setCollaborations(data.collaborations || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner) return;

    let updatedList: CollaborationItem[];
    if (isNew) {
      updatedList = [...collaborations, editingPartner];
    } else {
      updatedList = collaborations.map((c) => (c.id === editingPartner.id ? editingPartner : c));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'collaborations',
          data: updatedList,
          details: `${isNew ? 'Added' : 'Updated'} partner: ${editingPartner.name}`,
        }),
      });

      if (res.ok) {
        setCollaborations(updatedList);
        setEditingPartner(null);
        setIsNew(false);
        setStatusMessage('Partnership record updated successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner record?')) return;
    const updatedList = collaborations.filter((c) => c.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'collaborations',
          data: updatedList,
          details: `Removed partner ${id}`,
        }),
      });

      if (res.ok) {
        setCollaborations(updatedList);
        setStatusMessage('Partner removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewPartner = () => {
    const fresh: CollaborationItem = {
      id: `collab-${Date.now()}`,
      name: '',
      category: 'Corporate',
      logoUrl: '/images/club-logo-128.png',
      description: '',
      collaborationScope: '',
      website: '',
      featured: true,
      year: '2026',
      status: 'published',
    };
    setEditingPartner(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Collaborations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-green" /> MANAGE COLLABORATIONS &amp; PARTNERS
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Administer corporate alliances, banking partners, and academic societies.
          </p>
        </div>

        <button
          onClick={openNewPartner}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> ADD PARTNER
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborations.map((collab) => (
          <div
            key={collab.id}
            className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-deep text-emerald-300 uppercase font-semibold">
                  {collab.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">Since {collab.year}</span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white">{collab.name}</h3>
              <p className="mt-2 text-xs text-zinc-400 line-clamp-2">{collab.description}</p>
              <p className="mt-2 text-[11px] text-zinc-300 font-sans line-clamp-2">
                <strong className="text-emerald-400">Scope:</strong> {collab.collaborationScope}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-500">
                {collab.status}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingPartner(collab);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(collab.id)}
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
      {editingPartner && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Add Partner' : 'Edit Partner'}
              </h3>
              <button
                onClick={() => setEditingPartner(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Partner Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingPartner.name}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingPartner.category}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        category: e.target.value as PartnerCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Academic">Academic</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Event">Event</option>
                    <option value="Media">Media</option>
                    <option value="University Club">University Club</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Year Established
                  </label>
                  <input
                    type="text"
                    value={editingPartner.year}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, year: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Partner Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingPartner.description}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Scope of Collaboration *
                </label>
                <input
                  type="text"
                  required
                  value={editingPartner.collaborationScope}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      collaborationScope: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Official Website URL
                </label>
                <input
                  type="url"
                  value={editingPartner.website || ''}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, website: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

