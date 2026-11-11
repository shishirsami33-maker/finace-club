'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Save, CheckCircle2 } from 'lucide-react';
import { LeadershipMessage } from '@/types';

export default function AdminMessagesPage() {
  const [presidentMessage, setPresidentMessage] = useState<LeadershipMessage | null>(null);
  const [mentorMessage, setMentorMessage] = useState<LeadershipMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setPresidentMessage(data.presidentMessage || null);
        setMentorMessage(data.mentorMessage || null);
        setLoading(false);
      });
  }, []);

  const handleSavePresident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!presidentMessage) return;

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'presidentMessage',
          data: presidentMessage,
          details: `Updated President Address message`,
        }),
      });

      if (res.ok) {
        setStatusMessage('Presidential Address saved successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorMessage) return;

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'mentorMessage',
          data: mentorMessage,
          details: `Updated Faculty Advisor message`,
        }),
      });

      if (res.ok) {
        setStatusMessage('Faculty Advisor Message saved successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !presidentMessage || !mentorMessage) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Leadership Messages...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-brand-green" /> LEADERSHIP STATEMENTS
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-0.5">
          Edit official addresses from the Club President and Faculty Advisor.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* President's Message Form */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider border-b border-white/10 pb-3">
            President's Address
          </h2>

          <form onSubmit={handleSavePresident} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                President Name
              </label>
              <input
                type="text"
                value={presidentMessage.name}
                onChange={(e) =>
                  setPresidentMessage({ ...presidentMessage, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Featured Key Quote
              </label>
              <textarea
                rows={2}
                value={presidentMessage.quote}
                onChange={(e) =>
                  setPresidentMessage({ ...presidentMessage, quote: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green italic"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Full Presidential Address Text (Joined by paragraphs)
              </label>
              <textarea
                rows={8}
                value={presidentMessage.content.join('\n\n')}
                onChange={(e) =>
                  setPresidentMessage({
                    ...presidentMessage,
                    content: e.target.value.split('\n\n'),
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-brand-green/20"
            >
              Save President Address
            </button>
          </form>
        </div>

        {/* Mentor's Message Form */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider border-b border-white/10 pb-3">
            Faculty Advisor's Statement
          </h2>

          <form onSubmit={handleSaveMentor} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Advisor Name
              </label>
              <input
                type="text"
                value={mentorMessage.name}
                onChange={(e) =>
                  setMentorMessage({ ...mentorMessage, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Featured Key Quote
              </label>
              <textarea
                rows={2}
                value={mentorMessage.quote}
                onChange={(e) =>
                  setMentorMessage({ ...mentorMessage, quote: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green italic"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Full Advisor Address Text (Joined by paragraphs)
              </label>
              <textarea
                rows={8}
                value={mentorMessage.content.join('\n\n')}
                onChange={(e) =>
                  setMentorMessage({
                    ...mentorMessage,
                    content: e.target.value.split('\n\n'),
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-brand-green/20"
            >
              Save Advisor Statement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

