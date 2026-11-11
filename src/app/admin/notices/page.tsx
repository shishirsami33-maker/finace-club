'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Edit3,
  Pin,
  Save,
  X,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { Notice, NoticeCategory, ContentStatus } from '@/types';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setNotices(data.notices || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;

    let updatedList: Notice[];
    if (isNew) {
      updatedList = [editingNotice, ...notices];
    } else {
      updatedList = notices.map((n) => (n.id === editingNotice.id ? editingNotice : n));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'notices',
          data: updatedList,
          details: `${isNew ? 'Created new' : 'Updated'} notice: ${editingNotice.title}`,
        }),
      });

      if (res.ok) {
        setNotices(updatedList);
        setEditingNotice(null);
        setIsNew(false);
        setStatusMessage('Notice updated and published successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice circular?')) return;
    const updatedList = notices.filter((n) => n.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'notices',
          data: updatedList,
          details: `Deleted notice ${id}`,
        }),
      });

      if (res.ok) {
        setNotices(updatedList);
        setStatusMessage('Notice deleted.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewNotice = () => {
    const fresh: Notice = {
      id: `notice-${Date.now()}`,
      slug: `notice-circular-${Date.now()}`,
      title: '',
      category: 'General',
      summary: '',
      content: '',
      isPinned: false,
      publishDate: new Date().toISOString().split('T')[0],
      deadline: '',
      registrationUrl: '',
      status: 'published',
      author: 'Executive Secretariat',
    };
    setEditingNotice(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Notices...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-green" /> MANAGE NOTICES &amp; CIRCULARS
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Create, edit, pin, and govern official student announcements and competition releases.
          </p>
        </div>

        <button
          onClick={openNewNotice}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> CREATE CIRCULAR
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Notices Table */}
      <div className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Title &amp; Summary</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date / Deadline</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 max-w-sm">
                    <div className="flex items-center gap-2">
                      {n.isPinned && (
                        <span className="p-1 rounded bg-yellow-500/20 text-yellow-300" title="Pinned">
                          <Pin className="w-3 h-3" />
                        </span>
                      )}
                      <strong className="text-white font-heading text-sm font-semibold">{n.title}</strong>
                    </div>
                    <p className="text-zinc-400 text-xs line-clamp-1 mt-0.5">{n.summary}</p>
                    <span className="text-[10px] font-mono text-zinc-500">Slug: /notices/{n.slug}</span>
                  </td>
                  <td className="p-4 font-mono">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-emerald-300 border border-white/10">
                      {n.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-zinc-400 text-[11px]">
                    <div>Pub: {n.publishDate}</div>
                    {n.deadline && <div className="text-amber-400">Due: {n.deadline}</div>}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        n.status === 'published'
                          ? 'bg-emerald-950 text-emerald-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingNotice(n);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
                      title="Edit Notice"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/60 text-zinc-400 hover:text-red-400"
                      title="Delete Notice"
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

      {/* Edit / Create Modal */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Create Official Notice' : 'Edit Notice Circular'}
              </h3>
              <button
                onClick={() => setEditingNotice(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Circular Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) =>
                    setEditingNotice({
                      ...editingNotice,
                      title: e.target.value,
                      slug: isNew
                        ? e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '')
                        : editingNotice.slug,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingNotice.slug}
                    onChange={(e) =>
                      setEditingNotice({ ...editingNotice, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingNotice.category}
                    onChange={(e) =>
                      setEditingNotice({
                        ...editingNotice,
                        category: e.target.value as NoticeCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="General">General</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Competition">Competition</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Opportunity">Opportunity</option>
                    <option value="Internal Announcement">Internal Announcement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Executive Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingNotice.summary}
                  onChange={(e) =>
                    setEditingNotice({ ...editingNotice, summary: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Detailed Circular Content *
                </label>
                <textarea
                  required
                  rows={6}
                  value={editingNotice.content}
                  onChange={(e) =>
                    setEditingNotice({ ...editingNotice, content: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={editingNotice.publishDate}
                    onChange={(e) =>
                      setEditingNotice({ ...editingNotice, publishDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    value={editingNotice.deadline || ''}
                    onChange={(e) =>
                      setEditingNotice({ ...editingNotice, deadline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Workflow Status
                  </label>
                  <select
                    value={editingNotice.status}
                    onChange={(e) =>
                      setEditingNotice({
                        ...editingNotice,
                        status: e.target.value as ContentStatus,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pin"
                  checked={editingNotice.isPinned}
                  onChange={(e) =>
                    setEditingNotice({ ...editingNotice, isPinned: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-green focus:ring-brand-green bg-black"
                />
                <label htmlFor="pin" className="text-xs text-zinc-300 font-mono cursor-pointer">
                  Pin this circular to the top of the Noticeboard
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-green/20"
                >
                  Save &amp; Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

