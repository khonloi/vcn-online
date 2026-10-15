import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getLatestArticles,
  getArticlesByCategory,
  getArticleBySlug,
  getAllArticlesForSitemap,
  getNewsSitemapArticles,
} from '../articles';

describe('Articles Data Access Layer (DAL)', () => {
  test('getLatestArticles returns an array without crashing', async () => {
    const articles = await getLatestArticles({ revalidate: 0 });
    assert.ok(Array.isArray(articles), 'getLatestArticles must always return an array');
  });

  test('getArticlesByCategory returns an array for a valid category query', async () => {
    const articles = await getArticlesByCategory('tech', { revalidate: 0 });
    assert.ok(Array.isArray(articles), 'getArticlesByCategory must always return an array');
  });

  test('getArticleBySlug returns null or article detail without uncaught exception', async () => {
    const article = await getArticleBySlug('non-existent-article-slug-xyz');
    assert.ok(
      article === null || typeof article === 'object',
      'getArticleBySlug must resolve to null or article object'
    );
  });

  test('getAllArticlesForSitemap returns an array of sitemap items', async () => {
    const sitemapItems = await getAllArticlesForSitemap();
    assert.ok(Array.isArray(sitemapItems), 'getAllArticlesForSitemap must return an array');
  });

  test('getNewsSitemapArticles returns an array of news items', async () => {
    const newsItems = await getNewsSitemapArticles({ revalidate: 0 });
    assert.ok(Array.isArray(newsItems), 'getNewsSitemapArticles must return an array');
  });
});
