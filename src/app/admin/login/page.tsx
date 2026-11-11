'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('president@aiubfinanceclub.org');
  const [password, setPassword] = useState('asfc2026');
  const [role, setRole] = useState('Super Administrator');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userProfile = {
      name:
        role === 'Super Administrator'
          ? 'Syed Atif Ryhan (President)'
          : role === 'Administrator'
          ? 'Fardin Azad (General Secretary)'
          : role === 'Editor'
          ? 'Muntasir Mamun Mahin (Creative In Charge)'
          : 'Junior Associate (Contributor)',
      email,
      role,
    };

    localStorage.setItem('asfc_admin_auth', JSON.stringify(userProfile));

    setTimeout(() => {
      router.push('/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0e100e] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-16 h-16 relative mx-auto mb-4">
            <Image
              src="/images/club-logo.png"
              alt="AIUB Students Finance Club Emblem"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            Official Administration
          </span>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white">
            CMS CONTROL DECK
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            AIUB Students Finance Club Governance Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
              Role Access Level
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-green"
            >
              <option value="Super Administrator">Super Administrator (Full System)</option>
              <option value="Administrator">Administrator (Content &amp; Publishing)</option>
              <option value="Editor">Editor (Draft &amp; Review)</option>
              <option value="Contributor">Contributor (Draft Submissions)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
              Officer Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-green/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'AUTHENTICATING...' : 'ENTER CMS DECK'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-zinc-500 font-mono">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

