'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Briefcase,
  Bell,
  Calendar,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description: string;
    icon: React.ElementType;
  }[];
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  {
    label: 'ACTIVITIES',
    children: [
      {
        label: 'Events & Competitions',
        href: '/events',
        description: 'National Olympiads, workshops, and case championships',
        icon: Calendar,
      },
      {
        label: 'Media Gallery',
        href: '/gallery',
        description: 'Curated photo archive of competitions & seminars',
        icon: ImageIcon,
      },
      {
        label: 'Reports & Publications',
        href: '/reports',
        description: 'Annual reports, post-event whitepapers, and research',
        icon: FileText,
      },
    ],
  },
  {
    label: 'PEOPLE',
    children: [
      {
        label: 'Executive Committee',
        href: '/executive-committee',
        description: 'Meet the 15-member executive leadership body & advisors',
        icon: Users,
      },
      {
        label: 'Collaborations',
        href: '/collaborations',
        description: 'Strategic partners, banks, and institutional sponsors',
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: 'INSIGHTS',
    children: [
      {
        label: 'Finance Journal',
        href: '/journal',
        description: 'Monthly editorial analysis, capital markets & fintech',
        icon: BookOpen,
      },
      {
        label: 'Notices & Announcements',
        href: '/notices',
        description: 'Official club circulars, competition deadlines, and results',
        icon: Bell,
      },
    ],
  },
  {
    label: 'OPPORTUNITIES',
    children: [
      {
        label: 'Opportunities Portal',
        href: '/opportunities',
        description: 'Verified corporate internships, jobs, and case challenges',
        icon: Briefcase,
      },
      {
        label: 'The Wall of Excellence',
        href: '/achievements',
        description: 'Celebrating ambition & member achievement honors',
        icon: Award,
      },
    ],
  },
  { label: 'CONTACT', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || !isHomepage
            ? 'bg-[#080908]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-green/50 rounded-lg p-1"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/club-logo.png"
                  alt="AIUB Students Finance Club Emblem"
                  width={44}
                  height={44}
                  priority
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(7,139,37,0.3)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm sm:text-base tracking-wider text-white group-hover:text-emerald-400 transition-colors uppercase">
                  AIUB FINANCE CLUB
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] text-brand-grey uppercase tracking-widest">
                  Students Finance Club • AIUB
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                if (item.children) {
                  const isOpen = openDropdown === item.label;
                  const isActive = item.children.some((child) => pathname.startsWith(child.href));

                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-md ${
                          isActive
                            ? 'text-brand-green font-bold'
                            : 'text-zinc-200 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-brand-green' : 'text-zinc-400'
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="bg-[#121412] border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl">
                            <div className="space-y-1">
                              {item.children.map((child) => {
                                const Icon = child.icon;
                                const isChildActive = pathname === child.href;
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors group/item ${
                                      isChildActive
                                        ? 'bg-brand-green/15 text-emerald-400'
                                        : 'hover:bg-white/5 text-zinc-300 hover:text-white'
                                    }`}
                                  >
                                    <div
                                      className={`p-2 rounded-md mt-0.5 ${
                                        isChildActive
                                          ? 'bg-brand-green text-white'
                                          : 'bg-white/5 text-emerald-400 group-hover/item:bg-brand-green group-hover/item:text-white transition-colors'
                                      }`}
                                    >
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold font-heading flex items-center gap-1">
                                        {child.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity text-emerald-400" />
                                      </div>
                                      <p className="text-[11px] text-zinc-400 font-sans leading-tight mt-0.5 line-clamp-1">
                                        {child.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-md ${
                      isActive
                        ? 'text-brand-green font-bold'
                        : 'text-zinc-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/recruitment"
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-deep via-brand-green to-emerald-500 hover:from-brand-green hover:to-emerald-400 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                JOIN THE CLUB
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/recruitment"
                className="text-[11px] font-bold font-heading uppercase px-3 py-1.5 rounded-md bg-brand-green text-white"
              >
                JOIN
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0e100e] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/club-logo.png"
                    alt="AIUB Finance Club"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <span className="font-heading font-bold text-sm text-white tracking-wide uppercase">
                    AIUB FINANCE CLUB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 space-y-1">
                {navItems.map((item) => {
                  if (item.children) {
                    const isExpanded = mobileExpanded[item.label];
                    return (
                      <div key={item.label} className="border-b border-white/5 pb-1">
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className="w-full flex items-center justify-between py-2.5 text-sm font-heading font-semibold text-zinc-200 hover:text-emerald-400 tracking-wider uppercase text-left"
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-brand-green' : 'text-zinc-500'
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="pl-3 pb-2 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block py-2 text-xs text-zinc-400 hover:text-emerald-300 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className="block py-2.5 text-sm font-heading font-semibold text-zinc-200 hover:text-emerald-400 tracking-wider uppercase border-b border-white/5"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <Link
                href="/recruitment"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-heading font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-deep to-brand-green rounded-lg shadow-lg shadow-emerald-500/20"
              >
                <TrendingUp className="w-4 h-4" />
                JOIN THE CLUB
              </Link>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="text-zinc-500 font-mono">AIUB Students Finance Club</span>
                <span className="text-emerald-400 font-mono font-semibold">Est. 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

