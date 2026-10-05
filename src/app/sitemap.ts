import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { ALL_ARTICLES_QUERY } from '@/sanity/lib/queries';
import { CONTENT_CATEGORIES, SITE_CONFIG, STATIC_PAGES } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    ...CONTENT_CATEGORIES.map((cat): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${cat.href}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    })),
    ...STATIC_PAGES.map((page): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${page.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })),
  ];

  // Dynamic article routes from Sanity
  interface SitemapArticle {
    slug?: string;
    publishedAt?: string;
    _updatedAt?: string;
  }

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles: SitemapArticle[] = await client.fetch(ALL_ARTICLES_QUERY);
    articleRoutes = articles
      .filter((a): a is SitemapArticle & { slug: string } => Boolean(a.slug))
      .map((article): MetadataRoute.Sitemap[number] => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: article._updatedAt || article.publishedAt || new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));
  } catch (error) {
    console.error('Error generating dynamic sitemap articles:', error);
  }

  return [...staticRoutes, ...articleRoutes];
}
