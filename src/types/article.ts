import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';

export interface SanityImageWithMeta {
  alt?: string;
  caption?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
}

export interface RawSanityArticle {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  author?: string;
  isBreaking?: boolean;
  breakingUntil?: string;
  summary?: string;
  publishedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
  mainImage?: SanityImageSource & SanityImageWithMeta;
  body?: PortableTextBlock[];
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

export interface RssArticleItem {
  title: string;
  slug: string;
  summary?: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  _createdAt?: string;
}

export interface ArticleCardProps {
  title: string;
  href: string;
  image?: {
    src: string;
    alt?: string;
  };
  summary?: string;
  category?: string;
  isBreaking?: boolean;
  author?: string;
  publishedAt?: string;
  ranking?: number | string;
  variant?: 'featured' | 'horizontal' | 'vertical' | 'minimal';
  priority?: boolean;
  className?: string;
}

export interface ArticleDetail extends RawSanityArticle {
  takeaways?: string[];
}

export interface NewsSitemapArticleItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  _createdAt?: string;
}

export interface SitemapArticleItem {
  slug?: string;
  publishedAt?: string;
  _updatedAt?: string;
}
