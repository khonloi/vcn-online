import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb, Button } from '@/components/ui';
import { ArticleImage, CustomPortableText, ArticleActions } from '@/components/features';
import { getArticleBySlug } from '@/services/articles';
import { urlFor } from '@/sanity/lib/image';
import styles from './article.module.css';

import { SITE_CONFIG } from '@/lib/constants';
import { formatArticleDate } from '@/lib/formatters';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 120; // Revalidate article page every 2 minutes (ISR)

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be located.',
    };
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(675).url()
    : SITE_CONFIG.defaultOgImage;
  const url = `/article/${slug}`;
  const description =
    article.summary ||
    `Read full reporting and market intelligence on "${article.title}" on ${SITE_CONFIG.name}.`;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: `${article.title} | ${SITE_CONFIG.name}`,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt || article.publishedAt,
      authors: [article.author || SITE_CONFIG.editor],
      section: article.category || 'News',
      siteName: SITE_CONFIG.name,
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
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${article.title} | ${SITE_CONFIG.name}`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Fetch article from Data Access Layer (memoized via React cache())
  const article = await getArticleBySlug(slug);

  // If article does not exist in Sanity, trigger 404
  if (!article) {
    notFound();
  }

  const rawImageUrl = article.mainImage
    ? urlFor(article.mainImage).url()
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`;
  const absoluteImageUrl = rawImageUrl.startsWith('http')
    ? rawImageUrl
    : `${SITE_CONFIG.url}${rawImageUrl.startsWith('/') ? '' : '/'}${rawImageUrl}`;

  const publishedDate = article.publishedAt || article._createdAt || new Date().toISOString();
  const modifiedDate =
    article._updatedAt || article.publishedAt || article._createdAt || publishedDate;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary || article.title,
    image: [absoluteImageUrl],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: [
      {
        '@type': 'Person',
        name: article.author || SITE_CONFIG.editor,
        url: SITE_CONFIG.url,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
      },
    },
    articleSection: article.category || 'News',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/article/${slug}`,
    },
  };

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
        name: article.category || 'News',
        item: `${SITE_CONFIG.url}/${(article.category || 'news').toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_CONFIG.url}/article/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(/</g, '\\u003c'),
        }}
      />
      <article className={`container ${styles.articleContainer}`}>
        {/* Semantic Accessible Breadcrumb */}
        <Breadcrumb
          items={[
            { name: 'Home', href: '/' },
            {
              name: article.category || 'News',
              href: `/${(article.category || 'news').toLowerCase().replace(/\s+/g, '-')}`,
            },
            { name: article.title },
          ]}
        />

        {/* Article Header */}
        <header className={styles.articleHeader}>
          {article.isBreaking && <span className={styles.kickerBreaking}>BREAKING NEWS</span>}
          {!article.isBreaking && article.category && (
            <span className={styles.kickerCategory}>{article.category}</span>
          )}
          <h1 className={styles.headline}>{article.title}</h1>

          {/* Byline & Timestamp */}
          <div className={styles.bylineRow}>
            <div>
              By{' '}
              <strong className={styles.authorName}>{article.author || SITE_CONFIG.editor}</strong>
            </div>
            <div>
              <time dateTime={article.publishedAt}>{formatArticleDate(publishedDate, 'full')}</time>
            </div>
          </div>
        </header>

        {/* Key Takeaways Box */}
        {article.takeaways && article.takeaways.length > 0 && (
          <aside className={styles.takeawaysBox} aria-label="Key Takeaways">
            <h3 className={styles.takeawaysTitle}>Key Takeaways</h3>
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
              article.mainImage ? urlFor(article.mainImage).url() : SITE_CONFIG.fallbackArticleImage
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
          <ArticleActions title={article.title} url={`${SITE_CONFIG.url}/article/${slug}`} />
        </div>
      </article>
    </>
  );
}
