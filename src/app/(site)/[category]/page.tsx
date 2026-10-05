import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Grid } from '@/components/ui';
import { SectionTitle, ArticleCard } from '@/components/features';
import { getArticlesByCategory } from '@/services/articles';
import {
  isKnownCategorySlug,
  formatCategoryTitle,
  getContentCategories,
} from '@/services/categories';
import { SITE_CONFIG } from '@/lib/constants';
import { mapSanityToCard } from '@/lib/formatters';
import styles from './category.module.css';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 60; // Revalidate category pages every 60s (ISR)

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const isKnown = isKnownCategorySlug(category.toLowerCase());
  const categoryTitle = formatCategoryTitle(category);

  if (!isKnown) {
    notFound();
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
      type: 'website',
      url,
      title: `${title} | Vice City News`,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 675,
          alt: `${categoryTitle} News - Vice City News`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${title} | Vice City News`,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const isKnown = isKnownCategorySlug(category.toLowerCase());
  const categoryTitle = formatCategoryTitle(category);

  // If not a recognized news category slug, trigger 404 immediately
  if (!isKnown) {
    notFound();
  }

  // Fetch articles from Data Access Layer with ISR cache
  const sanityArticles = await getArticlesByCategory(category);
  const categoryArticles = sanityArticles.map((s) => mapSanityToCard(s));

  const quickSectors = getContentCategories().slice(0, 8);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url,
      },
      {
        '@type': 'ListItem',
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
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className={`container ${styles.categoryPage}`}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>{categoryTitle}</span>
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
