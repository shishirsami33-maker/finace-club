'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  MessageSquare,
  Building2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { initialStore } from '@/lib/data';

export default function ContactPage() {
  const { settings } = initialStore;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    isPartnershipInquiry: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch message.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      {/* Header */}
      <section className="py-16 bg-[#080a08] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              Official Correspondence
            </span>
            <h1 className="mt-4 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              CONTACT US
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Connect with the Executive Secretariat for competition registrations, corporate sponsorships, guest lecture invitations, and general inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Interactive Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-6">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-white">
                  Secretariat Coordinates
                </h2>
                <div className="flex items-center gap-2">
                  <Image src="/images/aiub-logo.png" alt="AIUB Logo" width={26} height={26} className="object-contain" />
                  <Image src="/images/osa-logo.png" alt="OSA Logo" width={26} height={26} className="object-contain" />
                </div>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-deep/50 text-emerald-400 border border-brand-green/30 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-0.5">
                      Campus Headquarters
                    </span>
                    <address className="not-italic text-zinc-300 leading-relaxed">
                      AIUB Students Finance Club
                      <br />
                      American International University-Bangladesh
                      <br />
                      408/1, Kuratoli, Khilkhet, Dhaka, Bangladesh, 1213.
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-deep/50 text-emerald-400 border border-brand-green/30 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-0.5">
                      Electronic Mail
                    </span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-emerald-400 font-semibold hover:underline"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-deep/50 text-emerald-400 border border-brand-green/30 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-0.5">
                      Phone / Telephone
                    </span>
                    <span className="text-zinc-300 font-mono">{settings.phone}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-3">
                  Verified Social Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-brand-green hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                  >
                    <span>Facebook Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-brand-green hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                  >
                    <span>LinkedIn Company</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Map */}
            <div className="rounded-3xl overflow-hidden border border-white/10 h-64 relative bg-[#0e100e]">
              <iframe
                title="AIUB Campus Location"
                src="https://maps.google.com/maps?q=American+International+University-Bangladesh+Kuratoli+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right: Interactive Contact & Partnership Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0e100e] border border-white/10 shadow-2xl relative">
              <h2 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white mb-2">
                SEND A FORMAL TRANSMISSION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mb-8">
                Messages are routed directly to the Communication In Charge and Executive Secretariat.
              </p>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white uppercase">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                    Thank you for contacting AIUB Students Finance Club. Our team will review your message and reply via official email.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Bohi Shajahan"
                        className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. user@domain.com"
                        className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Phone Contact
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1..."
                        className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Subject Line *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Corporate Collaboration / Event Registration"
                        className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  {/* Partnership toggle checkbox */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-deep/20 border border-brand-green/20">
                    <input
                      type="checkbox"
                      id="partnership"
                      checked={formData.isPartnershipInquiry}
                      onChange={(e) =>
                        setFormData({ ...formData, isPartnershipInquiry: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-white/20 bg-black/50"
                    />
                    <label htmlFor="partnership" className="text-xs text-zinc-300 cursor-pointer font-sans">
                      This inquiry represents a corporate, banking, or institutional partnership proposal.
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Inquiry Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please elaborate on your purpose, requirements, or agenda..."
                      className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-green/20 transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? 'DISPATCHING MESSAGE...' : 'DISPATCH TRANSMISSION'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

