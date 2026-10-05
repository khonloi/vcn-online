import { test, expect } from '@playwright/test';

test.describe('Public Site Smoke Suite', () => {
  test('homepage renders header, navigation, and footer without uncaught errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (exception) => {
      pageErrors.push(exception.message);
    });

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Header branding
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Vice City News').first()).toBeVisible();

    // Footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('Vice City News');

    // No uncaught JavaScript exceptions
    expect(pageErrors).toEqual([]);
  });

  test('category feed page renders successfully for a core category', async ({ page }) => {
    const response = await page.goto('/markets');
    expect(response?.status()).toBe(200);

    // Verify main section and heading
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Markets/i);
  });

  test('RSS 2.0 feed endpoint delivers valid XML syndication', async ({ request }) => {
    const response = await request.get('/feed.xml');
    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/xml/);

    const body = await response.text();
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain('<channel>');
    expect(body).toContain('<title>Vice City News');
  });

  test('institutional E-E-A-T pages load with 200 OK', async ({ page }) => {
    const pages = [
      '/about',
      '/editorial-standards',
      '/contact',
      '/privacy',
      '/terms',
    ];

    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('unknown slug renders accessible 404 page', async ({ page }) => {
    const response = await page.goto('/non-existent-article-slug-xyz-404');
    // Next.js dev server may return 200 for notFound() pages while production returns 404
    expect([200, 404]).toContain(response?.status());

    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page Not Found')).toBeVisible();
  });
});
