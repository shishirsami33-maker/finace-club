'use client';

import React, { useState, useEffect } from 'react';
import {
  Award,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { MemberAchievement, AchievementCategory, ContentStatus } from '@/types';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<MemberAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAch, setEditingAch] = useState<MemberAchievement | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data.achievements || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch) return;

    let updatedList: MemberAchievement[];
    if (isNew) {
      updatedList = [editingAch, ...achievements];
    } else {
      updatedList = achievements.map((a) => (a.id === editingAch.id ? editingAch : a));
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'achievements',
          data: updatedList,
          details: `${isNew ? 'Added' : 'Updated'} Wall of Excellence honor: ${editingAch.memberName} (${editingAch.achievementTitle})`,
        }),
      });

      if (res.ok) {
        setAchievements(updatedList);
        setEditingAch(null);
        setIsNew(false);
        setStatusMessage('Member honor saved to The Wall of Excellence!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this achievement honor?')) return;
    const updatedList = achievements.filter((a) => a.id !== id);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'achievements',
          data: updatedList,
          details: `Removed achievement honor ${id}`,
        }),
      });

      if (res.ok) {
        setAchievements(updatedList);
        setStatusMessage('Honor removed.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewAch = () => {
    const fresh: MemberAchievement = {
      id: `ach-${Date.now()}`,
      slug: `achievement-${Date.now()}`,
      memberName: '',
      photoUrl: '/images/club-logo-512.png',
      achievementTitle: '',
      category: 'Competition Winners',
      organizationOrCompetition: '',
      date: new Date().toISOString().split('T')[0],
      year: '2026',
      congratulatoryMessage: '',
      status: 'published',
    };
    setEditingAch(fresh);
    setIsNew(true);
  };

  if (loading) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Wall of Excellence...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-brand-green" /> THE WALL OF EXCELLENCE (RECOGNITIONS)
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Celebrate ambition and record official student distinctions, internships, and national awards.
          </p>
        </div>

        <button
          onClick={openNewAch}
          className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-brand-green/20"
        >
          <Plus className="w-4 h-4" /> ADD RECOGNITION
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-6 rounded-2xl bg-[#0e100e] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-deep text-emerald-300 uppercase font-semibold">
                  {ach.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">{ach.year}</span>
              </div>

              <h3 className="font-heading font-bold text-base text-white">{ach.memberName}</h3>
              <p className="text-xs font-mono text-emerald-400 mt-0.5">{ach.achievementTitle}</p>
              <p className="mt-2 text-xs text-zinc-400 italic line-clamp-3">
                "{ach.congratulatoryMessage}"
              </p>
              <p className="mt-3 text-[11px] font-mono text-zinc-500">
                At: {ach.organizationOrCompetition}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-500">
                {ach.status}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingAch(ach);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ach.id)}
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
      {editingAch && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e100e] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {isNew ? 'Record Member Recognition' : 'Edit Achievement Entry'}
              </h3>
              <button
                onClick={() => setEditingAch(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAch.memberName}
                    onChange={(e) =>
                      setEditingAch({
                        ...editingAch,
                        memberName: e.target.value,
                        slug: isNew
                          ? e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '')
                          : editingAch.slug,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingAch.category}
                    onChange={(e) =>
                      setEditingAch({
                        ...editingAch,
                        category: e.target.value as AchievementCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  >
                    <option value="Internship Achievements">Internship Achievements</option>
                    <option value="Job Placements">Job Placements</option>
                    <option value="Competition Winners">Competition Winners</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Academic Excellence">Academic Excellence</option>
                    <option value="Professional Certifications">Professional Certifications</option>
                    <option value="Research Publications">Research Publications</option>
                    <option value="Leadership Appointments">Leadership Appointments</option>
                    <option value="Other Notable Achievements">Other Notable Achievements</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingAch.achievementTitle}
                  onChange={(e) =>
                    setEditingAch({ ...editingAch, achievementTitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Organization / Competition *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAch.organizationOrCompetition}
                    onChange={(e) =>
                      setEditingAch({
                        ...editingAch,
                        organizationOrCompetition: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Year Conferred
                  </label>
                  <input
                    type="text"
                    value={editingAch.year}
                    onChange={(e) =>
                      setEditingAch({ ...editingAch, year: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Congratulatory Citation Note *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingAch.congratulatoryMessage}
                  onChange={(e) =>
                    setEditingAch({
                      ...editingAch,
                      congratulatoryMessage: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingAch(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider"
                >
                  Save to Wall of Excellence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

