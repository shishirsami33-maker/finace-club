'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Users,
  ShieldCheck,
  Briefcase,
  Award,
  BookOpen,
  FileText,
  Image as ImageIcon,
  UserCheck,
  MessageSquare,
  Settings,
  UserCog,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Shield,
  Activity,
} from 'lucide-react';

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Notices', href: '/admin/notices', icon: Bell },
  { label: 'Events & Comps', href: '/admin/events', icon: Calendar },
  { label: 'Executive Team', href: '/admin/executive', icon: Users },
  { label: 'Collaborations', href: '/admin/collaborations', icon: ShieldCheck },
  { label: 'Opportunities', href: '/admin/opportunities', icon: Briefcase },
  { label: 'Wall of Excellence', href: '/admin/achievements', icon: Award },
  { label: 'Finance Journal', href: '/admin/journal', icon: BookOpen },
  { label: 'Reports & Pubs', href: '/admin/reports', icon: FileText },
  { label: 'Media Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Recruitment Apps', href: '/admin/recruitment', icon: UserCheck },
  { label: 'Leadership Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Website & SEO Settings', href: '/admin/settings', icon: Settings },
  { label: 'User Roles & Access', href: '/admin/users', icon: UserCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const auth = localStorage.getItem('asfc_admin_auth');
    if (!auth) {
      // Default to authenticated Super Admin session for effortless demo/testing
      const defaultUser = {
        name: 'Syed Atif Ryhan',
        role: 'Super Administrator',
        email: 'president@aiubfinanceclub.org',
      };
      localStorage.setItem('asfc_admin_auth', JSON.stringify(defaultUser));
      setCurrentUser(defaultUser);
    } else {
      try {
        setCurrentUser(JSON.parse(auth));
      } catch {
        setCurrentUser({
          name: 'Administrator',
          role: 'Super Administrator',
          email: 'admin@aiubfinanceclub.org',
        });
      }
    }
    setCheckingAuth(false);
  }, [isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('asfc_admin_auth');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#080908] text-white flex flex-col">
      {/* Top Admin Bar */}
      <header className="h-16 bg-[#0e100e] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 relative flex-shrink-0">
              <Image
                src="/images/club-logo.png"
                alt="AIUB Finance Club"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-extrabold text-sm tracking-wider uppercase text-white">
                ASFC CMS 2.0
              </span>
              <span className="text-[10px] font-mono text-emerald-400 block -mt-0.5">
                Admin Control Deck
              </span>
            </div>
          </Link>
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-300 hover:text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>Live Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {currentUser && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-brand-green/30 border border-brand-green flex items-center justify-center text-emerald-300 font-mono font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left text-xs">
                <span className="font-heading font-bold text-white block">{currentUser.name}</span>
                <span className="text-[10px] font-mono text-emerald-400 block -mt-0.5">
                  {currentUser.role}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-950/60 hover:text-red-300 text-zinc-400 transition-colors"
            title="Log out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 bottom-0 z-30 w-64 bg-[#0a0c0a] border-r border-white/10 flex flex-col justify-between overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold px-3 py-1 block">
              Core Modules
            </span>

            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-heading font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-brand-green text-white font-bold shadow-lg shadow-brand-green/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Workflow Status Info */}
          <div className="p-4 border-t border-white/5 bg-black/40 text-[11px] font-mono text-zinc-500 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Persistence Engine</span>
              <span className="text-emerald-400">Active</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-tight">
              Changes sync automatically to persistent local storage &amp; Supabase database.
            </p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

