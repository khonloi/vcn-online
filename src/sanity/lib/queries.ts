import { groq } from 'next-sanity';

// Breaking news decays automatically if breakingUntil is past, otherwise falls back to publication timestamp
const ORDER_BY_BREAKING_THEN_RECENCY = groq`order(
  select(isBreaking && (!defined(breakingUntil) || dateTime(breakingUntil) > dateTime(now())) => 1, 0) desc,
  coalesce(publishedAt, _updatedAt, _createdAt) desc
)`;

export const ALL_ARTICLES_QUERY = groq`*[_type == "article"] | ${ORDER_BY_BREAKING_THEN_RECENCY} {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "categorySlug": category->slug.current,
  "author": author->name,
  isBreaking,
  breakingUntil,
  summary,
  publishedAt,
  _createdAt,
  _updatedAt,
  mainImage {
    ...,
    alt,
    caption
  }
}`;

export const LATEST_ARTICLES_QUERY = groq`*[_type == "article"] | ${ORDER_BY_BREAKING_THEN_RECENCY}[0...20] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "categorySlug": category->slug.current,
  "author": author->name,
  isBreaking,
  breakingUntil,
  summary,
  publishedAt,
  _createdAt,
  _updatedAt,
  mainImage {
    ...,
    alt,
    caption
  }
}`;

export const ARTICLE_BY_SLUG_QUERY = groq`*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  isBreaking,
  breakingUntil,
  summary,
  takeaways,
  body[] {
    ...,
    _type == "image" => {
      ...,
      alt,
      caption
    }
  },
  publishedAt,
  _createdAt,
  _updatedAt,
  mainImage {
    ...,
    alt,
    caption
  }
}`;

export const ARTICLES_BY_CATEGORY_QUERY = groq`*[_type == "article" && (lower(category->slug.current) == lower($category) || lower(category->title) == lower($category))] | ${ORDER_BY_BREAKING_THEN_RECENCY}[0...24] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  isBreaking,
  breakingUntil,
  summary,
  publishedAt,
  _createdAt,
  mainImage {
    ...,
    alt,
    caption
  }
}`;

export const NEWS_SITEMAP_QUERY = groq`*[_type == "article" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...100] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _createdAt
}`;
