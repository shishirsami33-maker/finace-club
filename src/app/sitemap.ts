import { MetadataRoute } from 'next';
import { getStore } from '@/lib/storage';
import { SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const store = getStore();

  // Static core pages
  const staticRoutes: { path: string; changeFrequency?: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '', changeFrequency: 'daily' },
    { path: '/about', changeFrequency: 'monthly' },
    { path: '/notices', changeFrequency: 'daily' },
    { path: '/events', changeFrequency: 'weekly' },
    { path: '/executive-committee', changeFrequency: 'monthly' },
    { path: '/collaborations', changeFrequency: 'monthly' },
    { path: '/opportunities', changeFrequency: 'daily' },
    { path: '/achievements', changeFrequency: 'weekly' },
    { path: '/journal', changeFrequency: 'weekly' },
    { path: '/reports', changeFrequency: 'monthly' },
    { path: '/gallery', changeFrequency: 'weekly' },
    { path: '/recruitment', changeFrequency: 'weekly' },
    { path: '/contact', changeFrequency: 'monthly' },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.path === '' ? 1.0 : 0.8,
  }));

  // Dynamic published Notices
  store.notices
    ?.filter((n) => n.status === 'published')
    .forEach((notice) => {
      sitemapEntries.push({
        url: `${SITE_URL}/notices/${notice.slug}`,
        lastModified: new Date(notice.publishDate || Date.now()),
        priority: 0.7,
      });
    });

  // Dynamic published Events
  store.events
    ?.filter((e) => e.status === 'published')
    .forEach((event) => {
      sitemapEntries.push({
        url: `${SITE_URL}/events/${event.slug}`,
        lastModified: new Date(event.date || Date.now()),
        priority: 0.8,
      });
    });

  // Dynamic published Journal Articles
  store.journal
    ?.filter((a) => a.status === 'published')
    .forEach((art) => {
      sitemapEntries.push({
        url: `${SITE_URL}/journal/${art.slug}`,
        lastModified: new Date(art.publishDate || Date.now()),
        priority: 0.7,
      });
    });

  // Dynamic published Member Achievements
  store.achievements
    ?.filter((ach) => ach.status === 'published')
    .forEach((ach) => {
      sitemapEntries.push({
        url: `${SITE_URL}/achievements/${ach.slug}`,
        lastModified: new Date(ach.date || Date.now()),
        priority: 0.6,
      });
    });

  // Dynamic published Opportunities
  store.opportunities
    ?.filter((opp) => opp.workflowStatus === 'published')
    .forEach((opp) => {
      sitemapEntries.push({
        url: `${SITE_URL}/opportunities/${opp.slug}`,
        lastModified: new Date(opp.publishDate || Date.now()),
        priority: 0.7,
      });
    });

  return sitemapEntries;
}

