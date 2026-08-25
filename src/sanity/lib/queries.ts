import { groq } from 'next-sanity';

export const ALL_ARTICLES_QUERY = groq`*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "categorySlug": category->slug.current,
  "author": author->name,
  isBreaking,
  summary,
  takeaways,
  publishedAt,
  mainImage
}`;

export const LATEST_ARTICLES_QUERY = groq`*[_type == "article"] | order(publishedAt desc)[0...12] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "categorySlug": category->slug.current,
  "author": author->name,
  isBreaking,
  summary,
  takeaways,
  publishedAt,
  mainImage
}`;

export const SPOTLIGHT_ARTICLES_QUERY = groq`*[_type == "article" && (lower(category->title) == "spotlight" || lower(category->title) == "tech")] | order(publishedAt desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  summary,
  publishedAt,
  mainImage
}`;

export const ARTICLE_BY_SLUG_QUERY = groq`*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  isBreaking,
  summary,
  takeaways,
  body,
  publishedAt,
  mainImage
}`;

export const ARTICLES_BY_CATEGORY_QUERY = groq`*[_type == "article" && lower(category->slug.current) == lower($category)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  isBreaking,
  summary,
  publishedAt,
  mainImage
}`;
