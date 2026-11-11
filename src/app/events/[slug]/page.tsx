import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Award,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { getStore } from '@/lib/storage';
import { constructMetadata, generateBreadcrumbSchema, generateEventSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const event = store.events.find((e) => e.slug === slug);

  if (!event) {
    return constructMetadata({
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${event.title} | Events`,
    description: event.description.slice(0, 160),
    canonicalPath: `/events/${event.slug}`,
    ogImage: event.coverImage,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const store = getStore();
  const event = store.events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: event.title, path: `/events/${event.slug}` },
  ]);

  const eventSchema = generateEventSchema({
    title: event.title,
    slug: event.slug,
    description: event.description,
    date: event.date,
    time: event.time,
    venue: event.venue,
    coverImage: event.coverImage,
    organizers: event.organizers,
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Events
        </Link>

        {/* Hero Cover Card */}
        <div className="relative h-72 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-10">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            priority
            className="object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e100e] via-black/40 to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="px-3.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase border border-brand-green/30">
              {event.category}
            </span>
          </div>
          {event.isPast && (
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-md bg-zinc-900/90 text-zinc-400 text-xs font-mono">
                Concluded Event
              </span>
            </div>
          )}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-green" /> {event.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-green" /> {event.time}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Description & Highlights */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-4">
              <h2 className="font-heading font-bold text-xl uppercase tracking-wide text-white">
                About the Event
              </h2>
              <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-4">
                <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" /> Event Highlights
                </h3>
                <ul className="space-y-3">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Post-Event Report (if any) */}
            {event.postEventReport && (
              <div className="p-8 rounded-3xl bg-[#0e100e] border border-white/10 space-y-4">
                <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" /> Post-Event Report &amp; Outcome
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  {event.postEventReport}
                </p>
              </div>
            )}

            {/* Gallery images */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-white">
                  Event Photography
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                      <Image
                        src={img}
                        alt={`${event.title} photograph ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Logistics & Registration */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#121412] border border-white/10 space-y-5">
              <h3 className="font-heading font-bold text-base uppercase tracking-wider text-white border-b border-white/10 pb-3">
                Logistics Summary
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-500 font-mono uppercase block mb-1">Date &amp; Time</span>
                  <p className="font-medium text-white">{event.date} at {event.time}</p>
                </div>

                <div>
                  <span className="text-zinc-500 font-mono uppercase block mb-1">Venue Location</span>
                  <p className="font-medium text-white flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>{event.venue}</span>
                  </p>
                </div>

                <div>
                  <span className="text-zinc-500 font-mono uppercase block mb-1">Organizers</span>
                  <p className="font-medium text-white">{event.organizers}</p>
                </div>

                {event.partners && event.partners.length > 0 && (
                  <div>
                    <span className="text-zinc-500 font-mono uppercase block mb-1">Partners</span>
                    <p className="font-medium text-emerald-300">{event.partners.join(', ')}</p>
                  </div>
                )}
              </div>

              {!event.isPast && event.registrationUrl && (
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-brand-green hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 transition-all"
                  >
                    REGISTER FOR EVENT <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {event.registrationDeadline && (
                    <p className="text-[11px] font-mono text-zinc-400 text-center mt-2">
                      Deadline: {event.registrationDeadline}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-[#0e100e] border border-white/10 text-center">
              <p className="text-xs text-zinc-400 mb-4 font-sans">
                Have questions regarding team delegations or event sponsorship?
              </p>
              <Link
                href="/contact"
                className="w-full inline-block py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/10 transition-colors"
              >
                CONTACT EVENT COMMITTEE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

