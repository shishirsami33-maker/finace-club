import { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiubfinanceclub.org';
export const SITE_NAME = 'AIUB Students Finance Club';

export interface PageSeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  canonicalPath = '',
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  publishedTime,
  authors,
  noIndex = false,
}: PageSeoProps): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@aiubfinanceclub',
    },
    metadataBase: new URL(SITE_URL),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'AIUB Students Finance Club',
    alternateName: ['AIUB Finance Club', 'ASFC'],
    url: SITE_URL,
    logo: `${SITE_URL}/images/club-logo.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      'Official student finance organization of American International University-Bangladesh. Fostering financial leadership, academic competitions, and career excellence.',
    email: 'aiubfinanceclub@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '408/1, Kuratoli, Khilkhet',
      addressLocality: 'Dhaka',
      postalCode: '1213',
      addressCountry: 'BD',
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'American International University-Bangladesh',
      alternateName: 'AIUB',
      url: 'https://www.aiub.edu',
    },
    sameAs: [
      'https://www.facebook.com/aiubfinanceclub',
      'https://www.linkedin.com/company/aiubfinanceclub',
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  author: string;
  coverImage: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${article.slug}`,
    },
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIUB Students Finance Club',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/club-logo.png`,
      },
    },
    image: article.coverImage.startsWith('http')
      ? article.coverImage
      : `${SITE_URL}${article.coverImage}`,
  };
}

export function generateEventSchema(event: {
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  coverImage: string;
  organizers: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BusinessEvent',
    name: event.title,
    description: event.description,
    startDate: `${event.date}T09:30:00+06:00`,
    endDate: `${event.date}T18:00:00+06:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '408/1, Kuratoli, Khilkhet',
        addressLocality: 'Dhaka',
        postalCode: '1213',
        addressCountry: 'BD',
      },
    },
    image: [
      event.coverImage.startsWith('http')
        ? event.coverImage
        : `${SITE_URL}${event.coverImage}`,
    ],
    organizer: {
      '@type': 'Organization',
      name: event.organizers || 'AIUB Students Finance Club',
      url: SITE_URL,
    },
  };
}

