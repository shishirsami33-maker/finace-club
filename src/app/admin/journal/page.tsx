'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { JournalArticle, JournalCategory, ContentStatus } from '@/types';

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArt, setEditingArt] = useState<JournalArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.journal || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArt) return;

    let updatedList: JournalArticle[];
    if (isNew) {
      updatedList = [editingArt, ...articles];
    } else {
      updatedList = articles.map((a) => (a.id === editingArt.id ? editingArt : a));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'journal',
          data: updatedList,
          details: `${isNew ? 'Authored' : 'Updated'} journal article: ${editingArt.title}`,
        }),
      });

      if (res.ok) {
        setArticles(updatedList);
        setEditingArt(null);
        setIsNew(false);
        setStatusMessage('Journal article saved and published!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this journal article?')) return;
    const updatedList = articles.filter((a) => a.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'journal',
          data: updatedList,
          details: `Removed journal article ${id}`,
        }),
      });

      if (res.ok) {
        setArticles(updatedList);
        setStatusMessage('Article removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewArt = () => {
    const fresh: JournalArticle = {
      id: `art-${Date.now()}`,
      slug: `finance-article-${Date.now()}`,
      title: '',
      author: 'Syed Atif Ryhan',
      authorRole: 'President, AIUB Students Finance Club',
      coverImage: '/images/events/event-1.jpg',
      category: 'Bangladesh Financial Landscape',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '6 min read',
      excerpt: '',
      content: '',
      references: [
        'Dhaka Stock Exchange Statistical Review',
        'Bangladesh Bank Monetary Policy Framework',
      ],
      relatedSlugs: [],
      status: 'published',
    };
    setEditingArt(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Finance Journal...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-green" /> MANAGE FINANCE JOURNAL
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Publish monthly analytical essays, corporate valuation breakdowns, and market commentary.
          </p>
        </div>

        <button
          onClick={openNewArt}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> WRITE ARTICLE
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-deep text-emerald-300 uppercase font-semibold">
                  {art.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">{art.publishDate}</span>
              </div>

              <h3 className="font-heading font-bold text-base text-white line-clamp-2">
                {art.title}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-2">{art.excerpt}</p>
              <p className="mt-3 text-[11px] font-mono text-zinc-500">
                Author: {art.author} • {art.readTime}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-500">{art.status}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingArt(art);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(art.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/60 text-zinc-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingArt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Author Journal Article' : 'Edit Journal Article'}
              </h3>
              <button
                onClick={() => setEditingArt(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingArt.title}
                  onChange={(e) =>
                    setEditingArt({
                      ...editingArt,
                      title: e.target.value,
                      slug: isNew
                        ? e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '')
                        : editingArt.slug,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArt.slug}
                    onChange={(e) =>
                      setEditingArt({ ...editingArt, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingArt.category}
                    onChange={(e) =>
                      setEditingArt({
                        ...editingArt,
                        category: e.target.value as JournalCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Financial Literacy">Financial Literacy</option>
                    <option value="Investment">Investment</option>
                    <option value="Banking">Banking</option>
                    <option value="Corporate Finance">Corporate Finance</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Economics">Economics</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Business Strategy">Business Strategy</option>
                    <option value="Bangladesh Financial Landscape">Bangladesh Financial Landscape</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArt.author}
                    onChange={(e) =>
                      setEditingArt({ ...editingArt, author: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    value={editingArt.readTime}
                    onChange={(e) =>
                      setEditingArt({ ...editingArt, readTime: e.target.value })
                    }
                    placeholder="7 min read"
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Lead Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingArt.excerpt}
                  onChange={(e) =>
                    setEditingArt({ ...editingArt, excerpt: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Article Body Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={editingArt.content}
                  onChange={(e) =>
                    setEditingArt({ ...editingArt, content: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingArt(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
