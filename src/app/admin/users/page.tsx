'use client';

import React, { useState } from 'react';
import {
  UserCog,
  Shield,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Mail,
  User,
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Administrator' | 'Administrator' | 'Editor' | 'Contributor';
  lastActive: string;
  status: 'Active' | 'Suspended';
}

const initialUsers: AdminUser[] = [
  {
    id: 'u-1',
    name: 'Syed Atif Ryhan',
    email: 'president@aiubfinanceclub.org',
    role: 'Super Administrator',
    lastActive: 'Just now',
    status: 'Active',
  },
  {
    id: 'u-2',
    name: 'Fardin Azad',
    email: 'gs@aiubfinanceclub.org',
    role: 'Administrator',
    lastActive: '2 hours ago',
    status: 'Active',
  },
  {
    id: 'u-3',
    name: 'Muntasir Mamun Mahin',
    email: 'creative@aiubfinanceclub.org',
    role: 'Editor',
    lastActive: '1 day ago',
    status: 'Active',
  },
  {
    id: 'u-4',
    name: 'Siam Shahriar',
    email: 'talent@aiubfinanceclub.org',
    role: 'Contributor',
    lastActive: '3 days ago',
    status: 'Active',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [statusMessage, setStatusMessage] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
          <UserCog className="w-6 h-6 text-brand-green" /> USER MANAGEMENT &amp; ROLE-BASED ACCESS (RBAC)
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-0.5">
          Govern officer permissions across Super Administrator, Administrator, Editor, and Contributor tiers.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-brand-deep/30 border border-brand-green/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Role Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            role: 'Super Administrator',
            scope: 'Full system control, settings, user governance, audit logs.',
            badge: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
          },
          {
            role: 'Administrator',
            scope: 'Publish notices, approve articles, update events & rosters.',
            badge: 'bg-blue-950 text-blue-300 border-blue-500/40',
          },
          {
            role: 'Editor',
            scope: 'Create and edit articles, review drafts, stage events.',
            badge: 'bg-purple-950 text-purple-300 border-purple-500/40',
          },
          {
            role: 'Contributor',
            scope: 'Submit initial drafts, upload gallery photos for review.',
            badge: 'bg-amber-950 text-amber-300 border-amber-500/40',
          },
        ].map((r, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#0e100e] border border-white/10 space-y-2">
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${r.badge}`}
            >
              {r.role}
            </span>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">{r.scope}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#0e100e] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Officer Name &amp; Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <strong className="text-white font-heading text-sm block">{u.name}</strong>
                    <span className="text-[11px] font-mono text-zinc-400">{u.email}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-400">
                    {u.role}
                  </td>
                  <td className="p-4 font-mono text-zinc-500 text-[11px]">
                    {u.lastActive}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-[11px] font-mono text-zinc-500">
                      Protected Officer
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

