import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SectionTitle,
  ArticleImage,
  Button,
  CustomPortableText,
} from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await client
    .fetch(ARTICLE_BY_SLUG_QUERY, { slug })
    .catch(() => null);

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

  // Fetch article from Sanity with fresh data
  const article = await client
    .fetch(ARTICLE_BY_SLUG_QUERY, { slug })
    .catch(() => null);

  // If article does not exist in Sanity, trigger 404
  if (!article) {
    notFound();
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).url()
    : `https://picsum.photos/seed/${article.slug || "article-hero"}/900/506`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary || article.title,
    image: [imageUrl],
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article._updatedAt || article.publishedAt || new Date().toISOString(),
    author: [
      {
        "@type": "Person",
        name: article.author || "Vice City Staff",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Vice City News",
      logo: {
        "@type": "ImageObject",
        url: "/og-image.jpg",
      },
    },
    articleSection: article.category || "News",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/article/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className="container"
        style={{
          maxWidth: "820px",
          paddingTop: "var(--space-6)",
          paddingBottom: "var(--space-16)",
        }}
      >
      {/* Breadcrumb */}
      <div
        style={{
          marginBottom: "var(--space-4)",
          display: "flex",
          gap: "var(--space-2)",
          fontSize: "var(--font-size-xs)",
          textTransform: "uppercase",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        <Link href="/" style={{ color: "var(--color-text-muted)" }}>
          Home
        </Link>
        <span style={{ color: "var(--color-border)" }}>/</span>
        <span style={{ color: "var(--color-primary)" }}>
          {article.category || "News"}
        </span>
      </div>

      {/* Article Header */}
      <header style={{ marginBottom: "var(--space-6)" }}>
        {article.isBreaking && (
          <span
            style={{
              color: "var(--color-breaking)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--letter-spacing-wide)",
            }}
          >
            BREAKING NEWS
          </span>
        )}
        {!article.isBreaking && article.category && (
          <span
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--letter-spacing-wide)",
            }}
          >
            {article.category}
          </span>
        )}
        <h1
          style={{
            fontSize: "var(--font-size-4xl)",
            fontWeight: "var(--font-weight-black)",
            lineHeight: "var(--line-height-tight)",
            letterSpacing: "var(--letter-spacing-tighter)",
            marginTop: "var(--space-2)",
            marginBottom: "var(--space-4)",
          }}
        >
          {article.title}
        </h1>

        {/* Byline & Timestamp */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            borderTop: "1px solid var(--color-border)",
            borderBottom: "1px solid var(--color-border)",
            padding: "var(--space-3) 0",
            color: "var(--color-text-muted)",
            fontSize: "var(--font-size-xs)",
          }}
        >
          <div>
            By{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>
              {article.author || "Vice City Staff"}
            </strong>
          </div>
          <div>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleString()}
            </time>
          </div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      {article.takeaways && article.takeaways.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--color-surface-subtle)",
            borderLeft: "4px solid var(--color-primary)",
            padding: "var(--space-5)",
            marginBottom: "var(--space-6)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-family-headline)",
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-black)",
              textTransform: "uppercase",
              letterSpacing: "var(--letter-spacing-wide)",
              marginBottom: "var(--space-3)",
              color: "var(--color-text-primary)",
            }}
          >
            Key Takeaways
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "var(--space-4)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-secondary)",
              listStyleType: "disc",
            }}
          >
            {article.takeaways.map((takeaway: string, idx: number) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Image */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <ArticleImage
          src={
            article.mainImage
              ? urlFor(article.mainImage).url()
              : `https://picsum.photos/seed/${article.slug || "article-hero"}/900/506`
          }
          alt={article.title}
          aspectRatio="16/9"
        />
      </div>

      {/* Article Body (Portable Text) */}
      {article.body && <CustomPortableText value={article.body} />}

      {/* Footer / Share Actions */}
      <div
        style={{
          marginTop: "var(--space-10)",
          paddingTop: "var(--space-6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <Button variant="outline" size="sm" href="/">
          &larr; Back to Top Stories
        </Button>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button variant="ghost" size="sm">
            Share
          </Button>
          <Button variant="secondary" size="sm">
            Save Article
          </Button>
        </div>
      </div>
    </article>
  </>
);
}
