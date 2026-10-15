import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/studio/*', '/api/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
        disallow: ['/studio/', '/studio/*', '/api/'],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/news-sitemap.xml`],
  };
}
