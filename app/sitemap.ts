import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karimelhoumaini.dev';

const baseRoutes = ['/', '/about', '/experience', '/projects', '/skills', '/achievements', '/resume', '/contact', '/playground'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    baseRoutes.forEach((route) => {
      const href = route === '/' ? `/${locale}` : `/${locale}${route}`;
      entries.push({ url: `${siteUrl}${href}`, lastModified: new Date() });
    });
  });

  entries.push({ url: `${siteUrl}/offline`, lastModified: new Date() });

  return entries;
}
