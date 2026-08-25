import React from 'react';
import Link from 'next/link';
import { SectionTitle, Grid, ArticleCard, Button } from '@/components/ui';
import { client } from '@/sanity/lib/client';
import { ARTICLES_BY_CATEGORY_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  // Fetch articles from Sanity
  const sanityArticles = await client.fetch(ARTICLES_BY_CATEGORY_QUERY, { category }).catch(() => []);

  const categoryArticles = sanityArticles.map((s: any) => ({
    id: s._id,
    title: s.title,
    href: `/article/${s.slug}`,
    image: {
      src: s.mainImage ? urlFor(s.mainImage).url() : `https://picsum.photos/seed/${s.slug || 'category-hero'}/600/340`,
      alt: s.title,
    },
    category: s.category || categoryTitle.toUpperCase(),
    summary: s.summary,
    isBreaking: s.isBreaking,
    author: s.author,
    publishedAt: s.publishedAt ? new Date(s.publishedAt).toLocaleDateString() : 'Just now',
  }));

  return (
    <div className="container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-16)' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-bold)' }}>
        <Link href="/" style={{ color: 'var(--color-text-muted)' }}>
          Home
        </Link>
        <span style={{ color: 'var(--color-border-strong)' }}>/</span>
        <span style={{ color: 'var(--color-primary)' }}>
          {categoryTitle}
        </span>
      </div>

      <SectionTitle size="lg" as="h1">
        {categoryTitle} News &amp; Analysis
      </SectionTitle>

      {categoryArticles.length > 0 ? (
        <Grid cols={12} gap="lg">
          {categoryArticles.map((article: any) => (
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
        <div style={{ padding: 'var(--space-12) 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' }}>
            No published articles found under <strong>{categoryTitle}</strong>.
          </p>
          <Button variant="outline" size="sm" href="/">
            &larr; Return to Homepage
          </Button>
        </div>
      )}
    </div>
  );
}
