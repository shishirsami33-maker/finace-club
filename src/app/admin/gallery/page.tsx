'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
} from 'lucide-react';
import { GalleryItem, ContentStatus } from '@/types';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setGallery(data.gallery || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: GalleryItem[];
    if (isNew) {
      updatedList = [editingItem, ...gallery];
    } else {
      updatedList = gallery.map((g) => (g.id === editingItem.id ? editingItem : g));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'gallery',
          data: updatedList,
          details: `${isNew ? 'Added' : 'Updated'} gallery item: ${editingItem.title}`,
        }),
      });

      if (res.ok) {
        setGallery(updatedList);
        setEditingItem(null);
        setIsNew(false);
        setStatusMessage('Gallery photo entry saved!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this gallery photograph?')) return;
    const updatedList = gallery.filter((g) => g.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'gallery',
          data: updatedList,
          details: `Removed gallery item ${id}`,
        }),
      });

      if (res.ok) {
        setGallery(updatedList);
        setStatusMessage('Gallery item removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewItem = () => {
    const fresh: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: '',
      category: 'Competitions',
      imageUrl: '/images/events/event-1.jpg',
      caption: '',
      eventName: 'AIUB Students Finance Club Event',
      date: new Date().toISOString().split('T')[0],
      featured: true,
      status: 'published',
    };
    setEditingItem(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Media Gallery...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-brand-green" /> MANAGE MEDIA GALLERY
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Administer photography archives, captions, albums, and featured event imagery.
          </p>
        </div>

        <button
          onClick={openNewItem}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> ADD PHOTO
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-black">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-emerald-300 text-[10px] font-mono font-bold uppercase">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                  {item.eventName} ({item.date})
                </span>
                <h3 className="font-heading font-bold text-sm text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{item.caption}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between mt-2 pt-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500">{item.status}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Add Gallery Item' : 'Edit Photo Item'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
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
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Competitions">Competitions</option>
                    <option value="Seminars">Seminars</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Collaborations">Collaborations</option>
                    <option value="Guest Sessions">Guest Sessions</option>
                    <option value="Club Activities">Club Activities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Image Source Path *
                  </label>
                  <select
                    value={editingItem.imageUrl}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, imageUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="/images/events/event-1.jpg">event-1.jpg (Olympiad)</option>
                    <option value="/images/events/event-2.jpg">event-2.jpg (Banking Summit)</option>
                    <option value="/images/events/event-3.jpg">event-3.jpg (Fintech Lab)</option>
                    <option value="/images/events/event-4.jpg">event-4.jpg (Intra Comp)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  value={editingItem.eventName}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, eventName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Caption Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingItem.caption}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, caption: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

