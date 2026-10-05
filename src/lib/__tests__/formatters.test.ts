import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatArticleDate, isBreakingActive, mapSanityToCard } from '../formatters';
import { KNOWN_CATEGORY_SLUGS, CONTENT_CATEGORIES } from '../constants';

describe('formatArticleDate', () => {
  it('returns "Just now" when date is undefined or empty', () => {
    assert.equal(formatArticleDate(undefined), 'Just now');
    assert.equal(formatArticleDate(''), 'Just now');
  });

  it('formats a valid ISO date string to US format', () => {
    const formatted = formatArticleDate('2026-03-15T12:00:00Z');
    assert.match(formatted, /Mar 15, 2026/);
  });

  it('handles invalid date strings gracefully', () => {
    assert.equal(formatArticleDate('not-a-valid-date'), 'Recently');
  });
});

describe('isBreakingActive & Decay', () => {
  it('returns false when isBreaking is falsy', () => {
    assert.equal(isBreakingActive(false), false);
    assert.equal(isBreakingActive(undefined), false);
  });

  it('returns true when isBreaking is true and breakingUntil is not set', () => {
    assert.equal(isBreakingActive(true), true);
  });

  it('returns true when breakingUntil is in the future', () => {
    const futureDate = new Date(Date.now() + 3600 * 1000).toISOString();
    assert.equal(isBreakingActive(true, futureDate), true);
  });

  it('returns false when breakingUntil is in the past (decayed)', () => {
    const pastDate = new Date(Date.now() - 3600 * 1000).toISOString();
    assert.equal(isBreakingActive(true, pastDate), false);
  });
});

describe('mapSanityToCard', () => {
  it('maps raw article data and prefers explicit image alt over headline', () => {
    const card = mapSanityToCard({
      _id: 'test-123',
      title: 'Global Markets Rally',
      slug: 'global-markets-rally',
      mainImage: {
        asset: {
          _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        },
        alt: 'Traders on the floor of the NYSE',
      },
    });

    assert.equal(card.id, 'test-123');
    assert.equal(card.title, 'Global Markets Rally');
    assert.equal(card.href, '/article/global-markets-rally');
    assert.equal(card.image.alt, 'Traders on the floor of the NYSE');
  });

  it('falls back to local branded image when mainImage is missing', () => {
    const card = mapSanityToCard({
      _id: 'test-456',
      title: 'Tech Earnings Beat',
      slug: 'tech-earnings-beat',
    });

    assert.equal(card.image.src, '/images/fallback-article.webp');
    assert.equal(card.image.alt, 'Tech Earnings Beat');
  });
});

describe('Taxonomy & Categories', () => {
  it('has essential core business and tech categories', () => {
    assert.ok(KNOWN_CATEGORY_SLUGS.has('tech'));
    assert.ok(KNOWN_CATEGORY_SLUGS.has('markets'));
    assert.ok(KNOWN_CATEGORY_SLUGS.has('finance'));
    assert.ok(KNOWN_CATEGORY_SLUGS.has('economy'));
    assert.ok(KNOWN_CATEGORY_SLUGS.has('business'));
  });

  it('every content category has a non-empty name, slug, and href', () => {
    for (const cat of CONTENT_CATEGORIES) {
      assert.ok(cat.name.length > 0);
      assert.ok(cat.slug.length > 0);
      assert.ok(cat.href.startsWith('/'));
    }
  });
});

describe('Security Link Protocol Validation', () => {
  const isSafeHref = (rawHref: string): boolean => {
    const trimmed = rawHref.trim();
    const isInternal = trimmed.startsWith('/');
    const isExternal = trimmed.startsWith('https://') || trimmed.startsWith('http://');
    const isContact = trimmed.startsWith('mailto:') || trimmed.startsWith('tel:');
    return Boolean(trimmed && (isInternal || isExternal || isContact));
  };

  it('permits safe internal and external URLs', () => {
    assert.equal(isSafeHref('/article/test-story'), true);
    assert.equal(isSafeHref('https://example.com/report'), true);
    assert.equal(isSafeHref('http://example.com/report'), true);
    assert.equal(isSafeHref('mailto:editor@vcnews.online'), true);
    assert.equal(isSafeHref('tel:+15551234567'), true);
  });

  it('rejects javascript: and other dangerous pseudo-protocols', () => {
    assert.equal(isSafeHref('javascript:alert(1)'), false);
    assert.equal(isSafeHref('data:text/html,<script>alert(1)</script>'), false);
    assert.equal(isSafeHref('vbscript:msgbox'), false);
    assert.equal(isSafeHref(''), false);
    assert.equal(isSafeHref('   '), false);
  });
});
