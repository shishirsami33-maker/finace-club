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
  Building2,
  GraduationCap,
  Moon,
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
  { label: 'Home', href: '/' },
  {
    label: 'Publications',
    href: '/reports',
    children: [
      {
        label: 'Reports & Publications',
        href: '/reports',
        description: 'Annual reports, post-event whitepapers, and research',
        icon: FileText,
      },
      {
        label: 'Finance Journal',
        href: '/journal',
        description: 'Monthly editorial analysis, capital markets & fintech',
        icon: BookOpen,
      },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Announcements', href: '/notices' },
  {
    label: 'Advisory & Executive Board',
    href: '/executive-committee',
    children: [
      {
        label: 'Executive Committee 2026',
        href: '/executive-committee',
        description: '15-member executive leadership body & portfolios',
        icon: Users,
      },
      {
        label: 'Faculty Advisory Body',
        href: '/executive-committee#advisor',
        description: 'Institutional guidance under Advisor Bohi Shajahan',
        icon: GraduationCap,
      },
      {
        label: 'About the Club',
        href: '/about',
        description: 'Official objectives, organizational charter & heritage',
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "The Members' Panel",
    href: '/achievements',
    children: [
      {
        label: 'The Wall of Excellence',
        href: '/achievements',
        description: 'Celebrating ambition & member achievement honors',
        icon: Award,
      },
      {
        label: 'Recruitment & Membership',
        href: '/recruitment',
        description: 'Join the next generation of financial leaders',
        icon: Briefcase,
      },
    ],
  },
  {
    label: 'Our Collaborators',
    href: '/collaborations',
    children: [
      {
        label: 'Corporate & Banking Partners',
        href: '/collaborations',
        description: 'Commercial banks, asset managers & financial institutions',
        icon: Building2,
      },
      {
        label: 'Institutional & Academic Alliances',
        href: '/collaborations',
        description: 'CFA Society Bangladesh & inter-university networks',
        icon: ShieldCheck,
      },
    ],
  },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Contact us', href: '/contact' },
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
            ? 'bg-[#080908]/92 backdrop-blur-md border-b border-white/10 shadow-xl py-2.5'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-4 flex-nowrap w-full">
            {/* 1. Left Logo (Stand-alone rounded container matching reference inspiration) */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-brand-green/50 rounded-xl"
              aria-label="AIUB Students Finance Club Home"
              title="AIUB Students Finance Club"
            >
              <div className="relative w-10 h-10 p-1 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-green/40 group-hover:bg-white/10 transition-all duration-300 shadow-sm flex items-center justify-center">
                <Image
                  src="/images/club-logo.png"
                  alt="AIUB Finance Club"
                  width={36}
                  height={36}
                  priority
                  className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(7,139,37,0.3)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* 2. Middle Navigation Links (Clean Title Case alignment) */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-2 2xl:space-x-3.5 flex-shrink min-w-0">
              {navItems.map((item) => {
                if (item.children) {
                  const isOpen = openDropdown === item.label;
                  const isActive =
                    item.children.some((child) => pathname.startsWith(child.href)) ||
                    (item.href ? pathname === item.href : false);

                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={item.href || '#'}
                        aria-expanded={isOpen}
                        className={`flex items-center gap-1 px-1.5 xl:px-2 py-1.5 text-[11.5px] xl:text-[13px] 2xl:text-[13.5px] font-medium font-sans tracking-normal transition-colors rounded-md whitespace-nowrap ${
                          isActive
                            ? 'text-brand-green font-semibold'
                            : 'text-zinc-200 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-brand-green' : 'text-zinc-400'
                          }`}
                        />
                      </Link>

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
                    className={`px-1.5 xl:px-2 py-1.5 text-[11.5px] xl:text-[13px] 2xl:text-[13.5px] font-medium font-sans tracking-normal transition-colors rounded-md whitespace-nowrap ${
                      isActive
                        ? 'text-brand-green font-semibold'
                        : 'text-zinc-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right Side: AIUB Crest, OSA Crest, Maroon Moon Toggle & Join Button */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-2.5 flex-shrink-0">
              {/* AIUB Official Crest */}
              <div
                className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 p-1 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
                title="American International University-Bangladesh (AIUB)"
              >
                <Image
                  src="/images/aiub-logo.png"
                  alt="AIUB Crest"
                  width={26}
                  height={26}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* OSA Logo */}
              <div
                className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 p-1 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
                title="Office of Student Affairs (OSA) - AIUB"
              >
                <Image
                  src="/images/osa-logo.png"
                  alt="OSA AIUB Logo"
                  width={24}
                  height={24}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Maroon Moon Circle (Exact match with reference inspiration) */}
              <div
                className="relative w-8 h-8 rounded-full border border-red-900/70 bg-red-950/20 hover:bg-red-950/50 hover:border-red-700 flex items-center justify-center text-red-500 transition-all duration-300 shadow-sm flex-shrink-0 cursor-pointer group"
                title="Theme Mode"
              >
                <Moon className="w-3.5 h-3.5 fill-red-500/20 group-hover:scale-110 transition-transform" />
              </div>

              {/* Join CTA */}
              <Link
                href="/recruitment"
                className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-deep via-brand-green to-emerald-500 hover:from-brand-green hover:to-emerald-400 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                <TrendingUp className="w-3 h-3" />
                JOIN
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
                          className="w-full flex items-center justify-between py-2.5 text-sm font-sans font-medium text-zinc-200 hover:text-emerald-400 tracking-normal text-left"
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
                      className="block py-2.5 text-sm font-sans font-medium text-zinc-200 hover:text-emerald-400 tracking-normal border-b border-white/5"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              {/* Institutional Endorsement */}
              <div className="flex items-center justify-center gap-4 py-2 px-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <Image src="/images/aiub-logo.png" alt="AIUB Logo" width={24} height={24} className="object-contain" />
                  <span className="text-[10px] font-semibold text-zinc-300">AIUB</span>
                </div>
                <div className="w-[1px] h-3.5 bg-white/15" />
                <div className="flex items-center gap-2">
                  <Image src="/images/osa-logo.png" alt="OSA Logo" width={24} height={24} className="object-contain" />
                  <span className="text-[10px] font-semibold text-zinc-300">OSA</span>
                </div>
                <div className="w-[1px] h-3.5 bg-white/15" />
                <div className="w-6 h-6 rounded-full border border-red-900/70 bg-red-950/20 flex items-center justify-center text-red-500">
                  <Moon className="w-3 h-3 fill-red-500/20" />
                </div>
              </div>

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
