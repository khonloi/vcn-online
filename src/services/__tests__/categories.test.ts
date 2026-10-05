import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllCategories,
  getContentCategories,
  isKnownCategorySlug,
  formatCategoryTitle,
} from '../categories';

describe('Categories Service (Taxonomy DAL)', () => {
  test('getAllCategories returns all site categories including Home', () => {
    const categories = getAllCategories();
    assert.ok(categories.length > 0);
    assert.equal(categories[0].slug, '');
    assert.equal(categories[0].name, 'Home');
  });

  test('getContentCategories filters out Home root route', () => {
    const contentCategories = getContentCategories();
    assert.ok(contentCategories.every((c) => c.slug !== ''));
    assert.ok(contentCategories.some((c) => c.slug === 'tech'));
    assert.ok(contentCategories.some((c) => c.slug === 'markets'));
  });

  test('isKnownCategorySlug accurately validates known vs unknown slugs', () => {
    assert.equal(isKnownCategorySlug('tech'), true);
    assert.equal(isKnownCategorySlug('markets'), true);
    assert.equal(isKnownCategorySlug('crypto-scams'), false);
    assert.equal(isKnownCategorySlug(''), false);
  });

  test('formatCategoryTitle formats both hyphenated slugs and known category names', () => {
    assert.equal(formatCategoryTitle('real-estate'), 'Real Estate');
    assert.equal(formatCategoryTitle('tech'), 'Tech');
    assert.equal(formatCategoryTitle('venture-capital-funds'), 'Venture Capital Funds');
  });
});
