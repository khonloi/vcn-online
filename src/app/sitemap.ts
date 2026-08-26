import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_ARTICLES_QUERY } from "@/sanity/lib/queries";

const CATEGORIES = [
  "tech",
  "markets",
  "finance",
  "economy",
  "business",
  "politics",
  "world",
  "real-estate",
  "energy",
  "science",
  "lifestyle",
  "opinion",
  "sports",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    ...CATEGORIES.map((category): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}/${category}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    })),
  ];

  // Dynamic article routes from Sanity
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await client.fetch(ALL_ARTICLES_QUERY).catch(() => []);
    articleRoutes = articles
      .filter((a: any) => a.slug)
      .map((article: any): MetadataRoute.Sitemap[number] => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: article._updatedAt || article.publishedAt || new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      }));
  } catch (error) {
    console.error("Error generating dynamic sitemap articles:", error);
  }

  return [...staticRoutes, ...articleRoutes];
}
