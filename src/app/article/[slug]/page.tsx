import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArticleImage,
  Button,
  CustomPortableText,
  ArticleActions,
} from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import styles from "./article.module.css";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const revalidate = 120; // Revalidate article page every 2 minutes (ISR)

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  let article = null;
  try {
    article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug }, { next: { revalidate: 120 } });
  } catch {
    article = null;
  }

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be located.",
    };
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(675).url()
    : "/og-image.jpg";
  const url = `/article/${slug}`;
  const description =
    article.summary ||
    `Read full reporting and market intelligence on "${article.title}" on Vice City News.`;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${article.title} | Vice City News`,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt || article.publishedAt,
      authors: [article.author || "Vice City Staff"],
      section: article.category || "News",
      siteName: "Vice City News",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@VCNews",
      creator: "@VCNews",
      title: `${article.title} | Vice City News`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Fetch article from Sanity with ISR cache
  const article = await client.fetch(
    ARTICLE_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 120 } }
  );

  // If article does not exist in Sanity, trigger 404
  if (!article) {
    notFound();
  }

  const rawImageUrl = article.mainImage
    ? urlFor(article.mainImage).url()
    : `${siteUrl}/og-image.jpg`;
  const absoluteImageUrl = rawImageUrl.startsWith("http")
    ? rawImageUrl
    : `${siteUrl}${rawImageUrl.startsWith("/") ? "" : "/"}${rawImageUrl}`;

  const publishedDate = article.publishedAt || article._createdAt || new Date().toISOString();
  const modifiedDate = article._updatedAt || article.publishedAt || article._createdAt || publishedDate;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary || article.title,
    image: [absoluteImageUrl],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: [
      {
        "@type": "Person",
        name: article.author || "Vice City Staff",
        url: siteUrl,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Vice City News",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.jpg`,
      },
    },
    articleSection: article.category || "News",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/article/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category || "News",
        item: `${siteUrl}/${(article.category || "news").toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${siteUrl}/article/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(/</g, "\\u003c"),
        }}
      />
      <article className={`container ${styles.articleContainer}`}>
        {/* Semantic Accessible Breadcrumb */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link
            href={`/${(article.category || "news").toLowerCase().replace(/\s+/g, "-")}`}
            className={styles.breadcrumbActive}
          >
            {article.category || "News"}
          </Link>
        </nav>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          {article.isBreaking && (
            <span className={styles.kickerBreaking}>
              BREAKING NEWS
            </span>
          )}
          {!article.isBreaking && article.category && (
            <span className={styles.kickerCategory}>
              {article.category}
            </span>
          )}
          <h1 className={styles.headline}>
            {article.title}
          </h1>

          {/* Byline & Timestamp */}
          <div className={styles.bylineRow}>
            <div>
              By{" "}
              <strong className={styles.authorName}>
                {article.author || "Vice City Staff"}
              </strong>
            </div>
            <div>
              <time dateTime={article.publishedAt}>
                {new Date(publishedDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Key Takeaways Box */}
        {article.takeaways && article.takeaways.length > 0 && (
          <aside className={styles.takeawaysBox} aria-label="Key Takeaways">
            <h3 className={styles.takeawaysTitle}>
              Key Takeaways
            </h3>
            <ul className={styles.takeawaysList}>
              {article.takeaways.map((takeaway: string, idx: number) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Image */}
        <div className={styles.imageWrapper}>
          <ArticleImage
            src={
              article.mainImage
                ? urlFor(article.mainImage).url()
                : `https://picsum.photos/seed/${article.slug || "article-hero"}/900/506`
            }
            alt={article.title}
            aspectRatio="16/9"
            priority={true}
            sizes="(max-width: 820px) 100vw, 820px"
          />
        </div>

        {/* Article Body (Portable Text) */}
        {article.body && <CustomPortableText value={article.body} />}

        {/* Footer / Share Actions */}
        <div className={styles.actionsBar}>
          <Button variant="outline" size="sm" href="/">
            &larr; Back to Top Stories
          </Button>
          <ArticleActions title={article.title} url={`${siteUrl}/article/${slug}`} />
        </div>
      </article>
    </>
  );
}
