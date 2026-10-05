import { urlFor } from '@/sanity/lib/image';
import type { SanityImageWithMeta, RawSanityArticle, FormattedArticleCardData } from '@/types';

export type { SanityImageWithMeta, RawSanityArticle, FormattedArticleCardData };

/**
 * Formats an ISO date string cleanly with standard locale and options.
 */
export function formatArticleDate(
  dateString?: string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  if (!dateString) return 'Just now';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString('en-US', options);
  } catch {
    return 'Recently';
  }
}

/**
 * Checks whether breaking status is currently active (respecting breakingUntil decay).
 */
export function isBreakingActive(isBreaking?: boolean, breakingUntil?: string): boolean {
  if (!isBreaking) return false;
  if (!breakingUntil) return true;
  try {
    const expiry = new Date(breakingUntil).getTime();
    return !isNaN(expiry) && expiry > Date.now();
  } catch {
    return true;
  }
}

/**
 * Formats a raw Sanity article document into clean props for ArticleCard.
 */
export function mapSanityToCard(art: RawSanityArticle): FormattedArticleCardData {
  const dateSource = art.publishedAt || art._createdAt;
  let imageSource = '/images/fallback-article.webp';
  if (art.mainImage) {
    try {
      imageSource = urlFor(art.mainImage).url();
    } catch {
      imageSource = '/images/fallback-article.webp';
    }
  }

  const imageAlt =
    typeof art.mainImage?.alt === 'string' && art.mainImage.alt.trim()
      ? art.mainImage.alt.trim()
      : art.title;

  return {
    id: art._id,
    title: art.title,
    href: `/article/${art.slug}`,
    image: {
      src: imageSource,
      alt: imageAlt,
    },
    category: art.category || 'NEWS',
    isBreaking: isBreakingActive(art.isBreaking, art.breakingUntil),
    author: art.author || 'Vice City Staff',
    publishedAt: formatArticleDate(dateSource, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    summary: art.summary,
  };
}
