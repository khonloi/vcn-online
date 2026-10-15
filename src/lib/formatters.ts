import { urlFor } from '@/sanity/lib/image';
import { FALLBACK_ARTICLE_IMAGE } from '@/lib/constants';
import type { SanityImageWithMeta, RawSanityArticle, FormattedArticleCardData } from '@/types';

export type { SanityImageWithMeta, RawSanityArticle, FormattedArticleCardData };

export type DateFormatPreset = 'date' | 'short' | 'datetime' | 'full';

const DATE_FORMAT_PRESETS: Record<DateFormatPreset, Intl.DateTimeFormatOptions> = {
  date: {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
  short: {
    month: 'short',
    day: 'numeric',
  },
  datetime: {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
  full: {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
};

/**
 * Formats an ISO date string cleanly with standard locale and options or named presets.
 */
export function formatArticleDate(
  dateString?: string,
  optionsOrPreset: Intl.DateTimeFormatOptions | DateFormatPreset = 'date'
): string {
  if (!dateString) return 'Just now';

  const options: Intl.DateTimeFormatOptions =
    typeof optionsOrPreset === 'string'
      ? DATE_FORMAT_PRESETS[optionsOrPreset] || DATE_FORMAT_PRESETS.date
      : optionsOrPreset;

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
  let imageSource = FALLBACK_ARTICLE_IMAGE;
  if (art.mainImage) {
    try {
      imageSource = urlFor(art.mainImage).url();
    } catch {
      imageSource = FALLBACK_ARTICLE_IMAGE;
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
    publishedAt: formatArticleDate(dateSource, 'datetime'),
    summary: art.summary,
  };
}

export interface TrendingRankingItem {
  id: string;
  ranking: number;
  title: string;
  href: string;
  category: string;
  isBreaking?: boolean;
  author: string;
  publishedAt: string;
}

export interface HomePageFeeds {
  leadStory: FormattedArticleCardData | null;
  topFeed: FormattedArticleCardData[];
  spotlightFeed: FormattedArticleCardData[];
  analysisFeed: FormattedArticleCardData[];
  trendingRankings: TrendingRankingItem[];
}

/**
 * Pure selector partitioning raw Sanity articles into categorized homepage feed sections.
 * Gives priority to active breaking news for the lead story slot and prevents story duplication.
 */
export function partitionHomeFeeds(articles: RawSanityArticle[]): HomePageFeeds {
  if (!articles || articles.length === 0) {
    return {
      leadStory: null,
      topFeed: [],
      spotlightFeed: [],
      analysisFeed: [],
      trendingRankings: [],
    };
  }

  // Active breaking news takes lead priority; falls back to newest publication
  const breakingIndex = articles.findIndex((a) => isBreakingActive(a.isBreaking, a.breakingUntil));
  const leadIndex = breakingIndex !== -1 ? breakingIndex : 0;
  const leadStory = mapSanityToCard(articles[leadIndex]);

  // Exclude lead article from secondary feeds to avoid layout redundancy
  const remainingArticles = articles.filter((_, idx) => idx !== leadIndex);
  const feedPool = remainingArticles.length > 0 ? remainingArticles : articles;

  const topFeed = feedPool.slice(0, 4).map((a) => mapSanityToCard(a));
  const spotlightFeed = (
    remainingArticles.length > 4 ? remainingArticles.slice(4, 8) : remainingArticles
  )
    .slice(0, 4)
    .map((a) => mapSanityToCard(a));
  const analysisFeed = (
    remainingArticles.length > 8 ? remainingArticles.slice(8) : remainingArticles
  ).map((a) => mapSanityToCard(a));

  const trendingRankings: TrendingRankingItem[] = articles.slice(0, 5).map((a, idx) => ({
    id: a._id,
    ranking: idx + 1,
    title: a.title,
    href: `/article/${a.slug}`,
    category: a.category || 'TRENDING',
    isBreaking: isBreakingActive(a.isBreaking, a.breakingUntil),
    author: a.author || 'Vice City Staff',
    publishedAt: 'Trending now',
  }));

  return {
    leadStory,
    topFeed,
    spotlightFeed,
    analysisFeed,
    trendingRankings,
  };
}
