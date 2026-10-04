import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionTitle, Grid, ArticleCard, Button } from '@/components/ui';
import { client } from '@/sanity/lib/client';
import { ARTICLES_BY_CATEGORY_QUERY } from '@/sanity/lib/queries';
import { KNOWN_CATEGORY_SLUGS, CONTENT_CATEGORIES, SITE_CONFIG } from '@/lib/constants';
import { mapSanityToCard } from '@/lib/formatters';
import type { RawSanityArticle } from '@/lib/formatters';
import styles from './category.module.css';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 60; // Revalidate category pages every 60s (ISR)

function formatCategoryTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const isKnown = KNOWN_CATEGORY_SLUGS.has(category.toLowerCase());
  const categoryTitle = formatCategoryTitle(category);

  if (!isKnown) {
    return {
      title: 'Category Not Found | Vice City News',
      description: 'The requested news sector could not be located.',
    };
  }

  const title = `${categoryTitle} News & Market Intelligence`;
  const description = `Read the latest ${categoryTitle} news, analysis, in-depth reports, and executive market intelligence on Vice City News.`;
  const url = `/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: `${title} | Vice City News`,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 675,
          alt: `${categoryTitle} News - Vice City News`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${title} | Vice City News`,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const isKnown = KNOWN_CATEGORY_SLUGS.has(category.toLowerCase());
  const categoryTitle = formatCategoryTitle(category);

  // Fetch articles from Sanity with ISR cache
  const sanityArticles: RawSanityArticle[] = await client
    .fetch(ARTICLES_BY_CATEGORY_QUERY, { category }, { next: { revalidate: 60 } })
    .catch(() => []);

  // Prevent soft-404: if unknown category and has no articles, trigger 404
  if (!isKnown && sanityArticles.length === 0) {
    notFound();
  }

  const categoryArticles = sanityArticles.map((s, idx) =>
    mapSanityToCard(s, `${category}-${idx}`)
  );

  const quickSectors = CONTENT_CATEGORIES.slice(0, 8);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryTitle,
        item: `${SITE_CONFIG.url}/${category}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className={`container ${styles.categoryPage}`}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>
            {categoryTitle}
          </span>
        </nav>

        <SectionTitle size="lg" as="h1">
          {categoryTitle} News &amp; Analysis
        </SectionTitle>

        {categoryArticles.length > 0 ? (
          <Grid cols={12} gap="lg">
            {categoryArticles.map((article) => (
              <Grid.Col key={article.id} span={12} spanMd={6}>
                <ArticleCard
                  variant="vertical"
                  title={article.title}
                  href={article.href}
                  image={article.image}
                  category={article.category}
                  isBreaking={article.isBreaking}
                  summary={article.summary}
                  author={article.author}
                  publishedAt={article.publishedAt}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateMessage}>
              No published dispatches found under <strong>{categoryTitle}</strong> currently.
            </p>
            <div className={styles.sectorsList}>
              {quickSectors.map((sec) => (
                <Link key={sec.href} href={sec.href} className={styles.sectorTag}>
                  {sec.name}
                </Link>
              ))}
            </div>
            <div className={styles.emptyActions}>
              <Button variant="outline" size="sm" href="/">
                &larr; Return to Homepage
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

