import type { MetadataRoute } from 'next';
import { getAllArticlesForSitemap } from '@/services/articles';
import { CONTENT_CATEGORIES, SITE_CONFIG, STATIC_PAGES } from '@/lib/constants';
import type { SitemapArticleItem } from '@/types';

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

  // Dynamic article routes from Data Access Layer
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getAllArticlesForSitemap();
    articleRoutes = articles
      .filter((a): a is SitemapArticleItem & { slug: string } => Boolean(a.slug))
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
