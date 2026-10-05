import { cache } from 'react';
import { client } from '@/sanity/lib/client';
import {
  ALL_ARTICLES_QUERY,
  LATEST_ARTICLES_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLES_BY_CATEGORY_QUERY,
  NEWS_SITEMAP_QUERY,
} from '@/sanity/lib/queries';
import type {
  RawSanityArticle,
  ArticleDetail,
  NewsSitemapArticleItem,
  SitemapArticleItem,
} from '@/types';

export interface FetchOptions {
  revalidate?: number;
}

/**
 * Fetches the latest published articles for the homepage with breaking news sorting.
 */
export async function getLatestArticles(options: FetchOptions = {}): Promise<RawSanityArticle[]> {
  const revalidate = options.revalidate ?? 60;
  try {
    const articles = await client.fetch<RawSanityArticle[]>(
      LATEST_ARTICLES_QUERY,
      {},
      { next: { revalidate } }
    );
    return articles || [];
  } catch (error) {
    console.error('[Articles Service] Failed to fetch latest articles:', error);
    return [];
  }
}

/**
 * Fetches articles matching a given category slug or name.
 */
export async function getArticlesByCategory(
  category: string,
  options: FetchOptions = {}
): Promise<RawSanityArticle[]> {
  const revalidate = options.revalidate ?? 60;
  try {
    const articles = await client.fetch<RawSanityArticle[]>(
      ARTICLES_BY_CATEGORY_QUERY,
      { category },
      { next: { revalidate } }
    );
    return articles || [];
  } catch (error) {
    console.error(`[Articles Service] Failed to fetch articles for category "${category}":`, error);
    return [];
  }
}

/**
 * Fetches a single article by its slug.
 * Wrapped in React 19 `cache()` to deduplicate identical calls within the same request lifecycle (e.g. metadata + page).
 */
export const getArticleBySlug = cache(async (slug: string): Promise<ArticleDetail | null> => {
  try {
    const article = await client.fetch<ArticleDetail | null>(
      ARTICLE_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 120 } }
    );
    return article || null;
  } catch (error) {
    console.error(`[Articles Service] Failed to fetch article with slug "${slug}":`, error);
    return null;
  }
});

/**
 * Fetches all article slugs and timestamps for dynamic sitemap generation.
 */
export async function getAllArticlesForSitemap(): Promise<SitemapArticleItem[]> {
  try {
    const articles = await client.fetch<SitemapArticleItem[]>(ALL_ARTICLES_QUERY);
    return articles || [];
  } catch (error) {
    console.error('[Articles Service] Failed to fetch all articles for sitemap:', error);
    return [];
  }
}

/**
 * Fetches recent articles for Google News sitemap (last 100 articles).
 */
export async function getNewsSitemapArticles(
  options: FetchOptions = {}
): Promise<NewsSitemapArticleItem[]> {
  const revalidate = options.revalidate ?? 900;
  try {
    const articles = await client.fetch<NewsSitemapArticleItem[]>(
      NEWS_SITEMAP_QUERY,
      {},
      { next: { revalidate } }
    );
    return articles || [];
  } catch (error) {
    console.error('[Articles Service] Failed to fetch news sitemap articles:', error);
    return [];
  }
}
