import React from "react";
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

  return (
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
  );
}
