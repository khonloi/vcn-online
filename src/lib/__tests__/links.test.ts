import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES, STATIC_PAGES, TRENDING_TOPICS } from '../constants';

describe('Navigation & Link Integrity', () => {
  test('all category links start with / and have valid names', () => {
    for (const cat of CATEGORIES) {
      assert.ok(cat.href.startsWith('/'), `Category ${cat.name} href must start with /`);
      assert.ok(cat.name.trim().length > 0, 'Category name must not be empty');
    }
  });

  test('all static pages have designated routes and are non-empty', () => {
    const expectedSlugs = new Set(['about', 'editorial-standards', 'contact', 'privacy', 'terms']);
    for (const page of STATIC_PAGES) {
      assert.ok(expectedSlugs.has(page.slug), `Unexpected static page slug: ${page.slug}`);
      assert.equal(page.href, `/${page.slug}`);
    }
    assert.equal(STATIC_PAGES.length, 5);
  });

  test('all trending topics point to active category feeds', () => {
    const validHrefs = new Set(CATEGORIES.map((c) => c.href));
    for (const topic of TRENDING_TOPICS) {
      assert.ok(
        validHrefs.has(topic.href),
        `Trending topic "${topic.name}" points to invalid route: ${topic.href}`
      );
    }
  });

  test('no public links target unauthenticated /studio or deprecated /careers or /subscribe', () => {
    const allHrefs = [
      ...CATEGORIES.map((c) => c.href),
      ...STATIC_PAGES.map((p) => p.href),
      ...TRENDING_TOPICS.map((t) => t.href),
    ];

    for (const href of allHrefs) {
      assert.notEqual(href, '/studio', 'Public navigation must not expose /studio');
      assert.notEqual(href, '/careers', 'Careers must not be exposed without a page');
      assert.notEqual(href, '/subscribe', 'Subscribe must not point to dead route');
    }
  });
});
