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

  const categoryArticles = sanityArticles.length > 0 ? sanityArticles.map((s: any) => ({
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
  })) : [
    {
      id: 1,
      title: `${categoryTitle} Mega-Trends: The 5 forces disrupting global markets in 2026`,
      href: `/article/${category}-mega-trends-2026`,
      image: { src: `https://picsum.photos/seed/${category}1/600/340`, alt: 'Industry Analysis' },
      category: categoryTitle.toUpperCase(),
      summary: `An in-depth investigation into how capital allocators and technology leaders are navigating systemic shifts across the ${categoryTitle} ecosystem.`,
      author: 'Alistair Barr',
      publishedAt: '30m ago',
    },
    {
      id: 2,
      title: `Executive Briefing: Why top funds are rebalancing their exposure to ${categoryTitle}`,
      href: `/article/${category}-executive-briefing`,
      image: { src: `https://picsum.photos/seed/${category}2/600/340`, alt: 'Financial Charts' },
      category: 'INSIGHT',
      summary: `Interviews with leading chief investment officers reveal shifting risk-reward profiles in high-growth ${categoryTitle} assets.`,
      author: 'Jennifer Sor',
      publishedAt: '2h ago',
    },
    {
      id: 3,
      title: `Leaked slide deck reveals how industry titans are revamping their ${categoryTitle} roadmap`,
      href: `/article/${category}-leaked-roadmap-slide-deck`,
      image: { src: `https://picsum.photos/seed/${category}3/600/340`, alt: 'Presentation Slide' },
      category: 'EXCLUSIVE',
      isBreaking: true,
      summary: `Internal presentations outline aggressive restructuring, specialized hiring quotas, and capital reallocation priorities for Q3 and Q4.`,
      author: 'Kali Hays',
      publishedAt: '4h ago',
    },
    {
      id: 4,
      title: `The 10 most influential innovators redefining the future of ${categoryTitle}`,
      href: `/article/${category}-top-innovators-list`,
      image: { src: `https://picsum.photos/seed/${category}4/600/340`, alt: 'Innovators' },
      category: 'SPECIAL REPORT',
      summary: `From visionary founders to research fellows, meet the people building the next generation of solutions in ${categoryTitle}.`,
      author: 'Ben Bergman',
      publishedAt: '1d ago',
    },
  ];

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

      <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
        <Button variant="outline" size="md">
          Load More Stories &darr;
        </Button>
      </div>
    </div>
  );
}
