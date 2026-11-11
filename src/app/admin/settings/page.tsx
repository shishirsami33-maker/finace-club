'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  Search,
  Bell,
  BarChart3,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { WebsiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings || null);
        setLoading(false);
      });
  }, []);

  const handleExportBackup = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `asfc-complete-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMessage('Complete system backup exported successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Backup export failed:', err);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        // Save each major key
        for (const key of Object.keys(parsed)) {
          await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key,
              data: parsed[key],
              details: `Restored ${key} from system backup`,
            }),
          });
        }
        setStatusMessage('System database restored successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'settings',
          data: settings,
          details: `Updated Website SEO, Google/Bing verification, and institutional settings`,
        }),
      });

      if (res.ok) {
        setStatusMessage('Website & SEO settings updated successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !settings) {
    return <div className="text-xs font-mono text-emerald-400 p-8">Loading Website Settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-green" /> WEBSITE SETTINGS &amp; SEARCH ENGINE READINESS
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-0.5">
          Configure search engine verification tags (Google Search Console &amp; Bing Webmaster Tools), announcement banner, and statistics.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Search Engine Verification Meta Tags (PART 10) */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Search className="w-5 h-5 text-emerald-400" />
            <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider">
              Search Console &amp; Bing Webmaster Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                Google Search Console Verification Tag
              </label>
              <input
                type="text"
                placeholder="e.g. google-site-verification token or meta code"
                value={settings.googleSiteVerification || ''}
                onChange={(e) =>
                  setSettings({ ...settings, googleSiteVerification: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
              />
              <p className="text-[11px] text-zinc-500 font-mono mt-1">
                Renders directly into <code>&lt;meta name="google-site-verification" content="..."&gt;</code> in the document head.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                Bing Webmaster Tools Verification Tag
              </label>
              <input
                type="text"
                placeholder="e.g. msvalidate.01 token"
                value={settings.bingSiteVerification || ''}
                onChange={(e) =>
                  setSettings({ ...settings, bingSiteVerification: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
              />
              <p className="text-[11px] text-zinc-500 font-mono mt-1">
                Renders into <code>&lt;meta name="msvalidate.01" content="..."&gt;</code> for Bing verification.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Top Announcement Banner Control */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider">
              Announcement Banner (Top Bar)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bannerActive"
              checked={settings.announcementBannerEnabled}
              onChange={(e) =>
                setSettings({ ...settings, announcementBannerEnabled: e.target.checked })
              }
              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green bg-black"
            />
            <label htmlFor="bannerActive" className="text-xs text-white font-heading font-bold uppercase cursor-pointer">
              Enable Announcement Banner on Top of Site
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Banner Message Text
              </label>
              <input
                type="text"
                value={settings.announcementBannerText}
                onChange={(e) =>
                  setSettings({ ...settings, announcementBannerText: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Banner Destination Link
              </label>
              <input
                type="text"
                value={settings.announcementBannerLink}
                onChange={(e) =>
                  setSettings({ ...settings, announcementBannerLink: e.target.value })
                }
                placeholder="/recruitment"
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>
        </div>

        {/* 3. Dynamic Homepage Numerical Statistics */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider">
              Homepage Statistics (Editable Totals)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Founded Year
              </label>
              <input
                type="text"
                value={settings.statEstablished}
                onChange={(e) =>
                  setSettings({ ...settings, statEstablished: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Executive Body
              </label>
              <input
                type="number"
                value={settings.statExecutiveMembers}
                onChange={(e) =>
                  setSettings({ ...settings, statExecutiveMembers: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Competitions
              </label>
              <input
                type="number"
                value={settings.statCompetitions}
                onChange={(e) =>
                  setSettings({ ...settings, statCompetitions: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Seminars &amp; Labs
              </label>
              <input
                type="number"
                value={settings.statSeminars}
                onChange={(e) =>
                  setSettings({ ...settings, statSeminars: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Collaborations
              </label>
              <input
                type="number"
                value={settings.statCollaborations}
                onChange={(e) =>
                  setSettings({ ...settings, statCollaborations: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Member Honors
              </label>
              <input
                type="number"
                value={settings.statAchievements}
                onChange={(e) =>
                  setSettings({ ...settings, statAchievements: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono text-center"
              />
            </div>
          </div>
        </div>

        {/* 4. Contact & Social Coordinates */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider">
              Secretariat &amp; Social Links
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Official Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Official Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Official LinkedIn Page URL
              </label>
              <input
                type="url"
                value={settings.linkedinUrl}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              Campus Secretariat Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white font-sans"
            />
          </div>
        </div>

        {/* 5. Database Backup & Data Portability */}
        <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="font-heading font-bold text-lg uppercase text-white tracking-wider">
              Data Portability &amp; System Backups
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Download a complete snapshot of all club records (notices, committee roster, events, journal, applications, settings) as a single JSON file, or restore from a previous backup.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              Export Complete Backup (JSON)
            </button>

            <label className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 transition-colors">
              Import / Restore Backup
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-brand-green/20"
        >
          SAVE ALL SETTINGS &amp; SEO VERIFICATION TAGS
        </button>
      </form>
    </div>
  );
}

