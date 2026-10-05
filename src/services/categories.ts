import { CATEGORIES, CONTENT_CATEGORIES, KNOWN_CATEGORY_SLUGS } from '@/lib/constants';
import type { CategoryConfig } from '@/types';

/**
 * Returns all configured site categories including Home.
 */
export function getAllCategories(): CategoryConfig[] {
  return CATEGORIES;
}

/**
 * Returns content-specific categories (excluding Home).
 */
export function getContentCategories(): CategoryConfig[] {
  return CONTENT_CATEGORIES;
}

/**
 * Validates whether a category slug corresponds to a known site category.
 */
export function isKnownCategorySlug(slug: string): boolean {
  return KNOWN_CATEGORY_SLUGS.has(slug);
}

/**
 * Formats a category slug into a human-readable title (e.g. 'real-estate' -> 'Real Estate').
 */
export function formatCategoryTitle(slug: string): string {
  const found = CONTENT_CATEGORIES.find((c) => c.slug === slug);
  if (found) return found.name;

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
