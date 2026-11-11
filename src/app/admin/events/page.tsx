'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle2,
  MapPin,
  Clock,
} from 'lucide-react';
import { EventItem, EventCategory, ContentStatus } from '@/types';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    let updatedList: EventItem[];
    if (isNew) {
      updatedList = [editingEvent, ...events];
    } else {
      updatedList = events.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'events',
          data: updatedList,
          details: `${isNew ? 'Added new' : 'Updated'} event: ${editingEvent.title}`,
        }),
      });

      if (res.ok) {
        setEvents(updatedList);
        setEditingEvent(null);
        setIsNew(false);
        setStatusMessage('Event record saved successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this event entry?')) return;
    const updatedList = events.filter((ev) => ev.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'events',
          data: updatedList,
          details: `Removed event ${id}`,
        }),
      });

      if (res.ok) {
        setEvents(updatedList);
        setStatusMessage('Event removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewEvent = () => {
    const fresh: EventItem = {
      id: `ev-${Date.now()}`,
      slug: `event-${Date.now()}`,
      title: '',
      category: 'Finance Competition',
      coverImage: '/images/events/event-1.jpg',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM - 04:00 PM',
      venue: 'AIUB Main Campus, Kuratoli, Dhaka',
      description: '',
      organizers: 'AIUB Students Finance Club',
      highlights: ['Executive panel with banking leaders', 'Interactive case competition'],
      isPast: false,
      status: 'published',
    };
    setEditingEvent(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-brand-green" /> MANAGE EVENTS &amp; COMPETITIONS
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Administer Olympiads, valuation bootcamps, guest lectures, and student case championships.
          </p>
        </div>

        <button
          onClick={openNewEvent}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> ADD EVENT
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full bg-black">
                <Image
                  src={ev.coverImage}
                  alt={ev.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-emerald-300 text-[10px] font-mono font-bold uppercase">
                    {ev.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-[11px] font-mono text-zinc-500 mb-1">
                  {ev.date} • {ev.time}
                </div>
                <h3 className="font-heading font-bold text-base text-white line-clamp-2">
                  {ev.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 line-clamp-2 font-sans">
                  {ev.description}
                </p>
                <p className="mt-2 text-[11px] text-zinc-500 font-mono truncate">
                  Venue: {ev.venue}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-3 pt-3">
              <span
                className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  ev.isPast ? 'bg-zinc-800 text-zinc-400' : 'bg-emerald-950 text-emerald-300'
                }`}
              >
                {ev.isPast ? 'Concluded' : 'Upcoming'}
              </span>

              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingEvent(ev);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/60 text-zinc-400 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Create New Event' : 'Edit Event Record'}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      title: e.target.value,
                      slug: isNew
                        ? e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '')
                        : editingEvent.slug,
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
                    value={editingEvent.slug}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        category: e.target.value as EventCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Inter-university">Inter-university</option>
                    <option value="Intra-university">Intra-university</option>
                    <option value="Finance Competition">Finance Competition</option>
                    <option value="Case Competition">Case Competition</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Guest Session">Guest Session</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Cover Image Path *
                  </label>
                  <select
                    value={editingEvent.coverImage}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, coverImage: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="/images/events/event-1.jpg">Event 1 (National Olympiad)</option>
                    <option value="/images/events/event-2.jpg">Event 2 (Banking Summit)</option>
                    <option value="/images/events/event-3.jpg">Event 3 (FinTech Workshop)</option>
                    <option value="/images/events/event-4.jpg">Event 4 (Intra Championship)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={editingEvent.time}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, time: e.target.value })
                    }
                    placeholder="10:00 AM - 04:00 PM"
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={editingEvent.venue}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, venue: e.target.value })
                    }
                    placeholder="Auditorium, AIUB Campus"
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="past"
                  checked={editingEvent.isPast}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, isPast: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-green focus:ring-brand-green bg-black"
                />
                <label htmlFor="past" className="text-xs text-zinc-300 font-mono cursor-pointer">
                  Mark as Concluded / Past Event
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-green/20"
                >
                  Save Event Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

