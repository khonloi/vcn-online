import { groq } from 'next-sanity';

export const ALL_ARTICLES_QUERY = groq`*[_type == "article"] | order(isBreaking desc, coalesce(publishedAt, _updatedAt, _createdAt) desc) {
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
  _createdAt,
  _updatedAt,
  mainImage
}`;

export const LATEST_ARTICLES_QUERY = groq`*[_type == "article"] | order(isBreaking desc, coalesce(publishedAt, _updatedAt, _createdAt) desc)[0...20] {
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
  _createdAt,
  _updatedAt,
  mainImage
}`;

export const SPOTLIGHT_ARTICLES_QUERY = groq`*[_type == "article" && (lower(category->title) == "spotlight" || lower(category->title) == "tech")] | order(coalesce(publishedAt, _createdAt) desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  summary,
  publishedAt,
  _createdAt,
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
  _createdAt,
  mainImage
}`;

export const ARTICLES_BY_CATEGORY_QUERY = groq`*[_type == "article" && lower(category->slug.current) == lower($category)] | order(isBreaking desc, coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "author": author->name,
  isBreaking,
  summary,
  publishedAt,
  _createdAt,
  mainImage
}`;
