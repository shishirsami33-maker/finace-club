import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, Sora, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { getStore } from '@/lib/storage';
import { generateOrganizationSchema, SITE_URL } from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#078B25',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const store = getStore();
  const settings = store.settings;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${settings.siteName} | Excellence in Finance & Leadership`,
      template: `%s | ${settings.siteName}`,
    },
    description:
      'Official website of AIUB Students Finance Club at American International University-Bangladesh. Fostering financial leaders through knowledge, competition, collaboration and professional development.',
    keywords: [
      'AIUB Students Finance Club',
      'AIUB Finance Club',
      'American International University-Bangladesh',
      'Finance Competitions Dhaka',
      'National Financial Olympiad',
      'Student Financial Leadership',
      'Capital Markets Bangladesh',
      'Fintech Bangladesh',
    ],
    authors: [{ name: 'AIUB Students Finance Club' }],
    creator: 'Shahriar Shishir Sami',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: settings.siteName,
      title: `${settings.siteName} | Excellence in Finance & Leadership`,
      description:
        'Discover AIUB Students Finance Club, a student-driven platform at American International University-Bangladesh focused on finance, business competitions, professional development, leadership and opportunities.',
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AIUB Students Finance Club Official Banner',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.siteName} | Excellence in Finance & Leadership`,
      description:
        'Building the next generation of financial leaders through knowledge, competition, collaboration and professional development.',
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
    verification: {
      google: settings.googleSiteVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      other: {
        ...(settings.bingSiteVerification
          ? { 'msvalidate.01': settings.bingSiteVerification }
          : {}),
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = getStore();
  const settings = store.settings;
  const orgSchema = generateOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${sora.variable} ${ibmPlexMono.variable} scroll-smooth dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#050505] text-[#F7F8F5] antialiased selection:bg-brand-green selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-green focus:text-white focus:font-bold focus:rounded-lg focus:shadow-xl"
        >
          Skip to main content
        </a>
        <AnnouncementBanner
          enabled={settings.announcementBannerEnabled}
          text={settings.announcementBannerText}
          link={settings.announcementBannerLink}
        />
        <Navbar />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

