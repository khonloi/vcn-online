import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

export interface RawSanityArticle {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  author?: string;
  isBreaking?: boolean;
  summary?: string;
  publishedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
  mainImage?: SanityImageSource;
}

export interface FormattedArticleCardData {
  id: string;
  title: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
  category: string;
  isBreaking?: boolean;
  author: string;
  publishedAt: string;
  summary?: string;
}

/**
 * Formats an ISO date string cleanly with standard locale and options.
 */
export function formatArticleDate(
  dateString?: string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  if (!dateString) return "Just now";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Recently";
    return d.toLocaleDateString("en-US", options);
  } catch {
    return "Recently";
  }
}

/**
 * Formats a raw Sanity article document into clean props for ArticleCard.
 */
export function mapSanityToCard(
  art: RawSanityArticle,
  fallbackSeed: string = "news-hero"
): FormattedArticleCardData {
  const dateSource = art.publishedAt || art._createdAt;
  const imageSource = art.mainImage
    ? urlFor(art.mainImage).url()
    : `https://picsum.photos/seed/${art.slug || fallbackSeed}/900/506`;

  return {
    id: art._id,
    title: art.title,
    href: `/article/${art.slug}`,
    image: {
      src: imageSource,
      alt: art.title,
    },
    category: art.category || "NEWS",
    isBreaking: Boolean(art.isBreaking),
    author: art.author || "Vice City Staff",
    publishedAt: formatArticleDate(dateSource, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    summary: art.summary,
  };
}
