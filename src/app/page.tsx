import React from 'react';
import { ArticleCard, SectionTitle, Grid, Button } from '@/components/ui';
import styles from './page.module.css';
import { client } from '@/sanity/lib/client';
import { LATEST_ARTICLES_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh data on every load

interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  author?: string;
  isBreaking?: boolean;
  summary?: string;
  publishedAt?: string;
  _createdAt?: string;
  mainImage?: any;
}

interface FormattedArticle {
  id: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
  category: string;
  isBreaking?: boolean;
  author: string;
  publishedAt: string;
  summary?: string;
}

export default async function Home() {
  // Fetch dynamic articles from Sanity with no-store cache
  let articles: SanityArticle[] = [];
  try {
    articles = await client.fetch(
      LATEST_ARTICLES_QUERY,
      {},
      { cache: 'no-store', next: { revalidate: 0 } }
    );
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error);
  }

  // Format helper
  const formatArticle = (art: SanityArticle, fallbackImgSeed: string): FormattedArticle => {
    const dateSource = art.publishedAt || art._createdAt;
    return {
      id: art._id,
      title: art.title,
      href: `/article/${art.slug}`,
      image: {
        src: art.mainImage ? urlFor(art.mainImage).url() : `https://picsum.photos/seed/${art.slug || fallbackImgSeed}/900/506`,
        alt: art.title,
      },
      category: art.category || 'NEWS',
      isBreaking: art.isBreaking || false,
      author: art.author || 'Vice City Staff',
      publishedAt: dateSource
        ? new Date(dateSource).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'Just now',
      summary: art.summary,
    };
  };

  if (articles.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <div style={{ textAlign: 'center', padding: 'var(--space-16) 0', color: 'var(--color-text-muted)' }}>
          <SectionTitle size="lg" as="h1">
            Welcome to Vice City News
          </SectionTitle>
          <p style={{ fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            No published articles found in the database. Open Sanity Studio to create and publish content.
          </p>
          <Button variant="primary" size="md" href="/studio">
            Open Sanity Studio &rarr;
          </Button>
        </div>
      </div>
    );
  }

  // Pick the lead story (Breaking news takes priority, otherwise the latest article)
  const breakingIndex = articles.findIndex((a) => a.isBreaking);
  const leadIndex = breakingIndex !== -1 ? breakingIndex : 0;
  const leadStory: FormattedArticle = formatArticle(articles[leadIndex], 'lead-story');

  // Filter out the lead article from secondary feeds so it doesn't duplicate
  const remainingArticles = articles.filter((_, idx) => idx !== leadIndex);

  const topFeed: FormattedArticle[] = (remainingArticles.length > 0 ? remainingArticles : articles)
    .slice(0, 4)
    .map((a, idx) => formatArticle(a, `top-${idx}`));

  const spotlightFeed: FormattedArticle[] = (remainingArticles.length > 4 ? remainingArticles.slice(4, 8) : articles)
    .slice(0, 4)
    .map((a, idx) => formatArticle(a, `spotlight-${idx}`));

  const analysisFeed: FormattedArticle[] = (remainingArticles.length > 0 ? remainingArticles : articles)
    .map((a, idx) => formatArticle(a, `analysis-${idx}`));

  const trendingRankings = articles.slice(0, 5).map((a, idx) => ({
    id: a._id,
    ranking: idx + 1,
    title: a.title,
    href: `/article/${a.slug}`,
    category: a.category || 'TRENDING',
    isBreaking: a.isBreaking,
    author: a.author || 'Vice City Staff',
    publishedAt: 'Trending now',
  }));

  return (
    <div className={`container ${styles.page}`}>
      {/* 1. HERO LEAD SECTION */}
      <section className={styles.heroSection} aria-label="Lead Story">
        <Grid cols={12} gap="xl">
          {/* Main Lead Story (Left 7 Cols) */}
          <Grid.Col span={12} spanLg={7}>
            <ArticleCard
              variant="featured"
              category={leadStory.category}
              isBreaking={leadStory.isBreaking}
              title={leadStory.title}
              summary={leadStory.summary}
              author={leadStory.author}
              publishedAt={leadStory.publishedAt}
              href={leadStory.href}
              image={leadStory.image}
            />
          </Grid.Col>

          {/* Right Feed (5 Cols) */}
          <Grid.Col span={12} spanLg={5}>
            <SectionTitle size="sm" actionText="More Breaking News" actionHref="/news">
              Top Stories &amp; Breaking
            </SectionTitle>
            <div className={styles.storyList}>
              {topFeed.map((story) => (
                <ArticleCard
                  key={story.id}
                  variant="horizontal"
                  title={story.title}
                  href={story.href}
                  image={story.image}
                  category={story.category}
                  isBreaking={story.isBreaking}
                  author={story.author}
                  publishedAt={story.publishedAt}
                />
              ))}
            </div>
          </Grid.Col>
        </Grid>
      </section>

      {/* 2. SPOTLIGHT 4-COLUMN STRIP */}
      <section className={styles.spotlightSection} aria-label="Market Spotlight">
        <SectionTitle size="md" actionText="Explore Sectors" actionHref="/markets">
          Markets &amp; Tech Spotlight
        </SectionTitle>

        <Grid cols={12} gap="md">
          {spotlightFeed.map((story) => (
            <Grid.Col key={story.id} span={12} spanMd={6} spanLg={3}>
              <ArticleCard
                variant="vertical"
                title={story.title}
                href={story.href}
                image={story.image}
                category={story.category}
                author={story.author}
                publishedAt={story.publishedAt}
              />
            </Grid.Col>
          ))}
        </Grid>
      </section>

      {/* 3. MAIN CONTENT & TRENDING RANKING GRID */}
      <Grid cols={12} gap="xl">
        {/* Main Column: In-Depth Analysis (8 cols) */}
        <Grid.Col span={12} spanLg={8}>
          <SectionTitle size="md" actionText="View All Analysis" actionHref="/analysis">
            In-Depth Analysis &amp; Executive Strategy
          </SectionTitle>

          <Grid cols={12} gap="lg">
            {analysisFeed.map((item) => (
              <Grid.Col key={item.id} span={12} spanMd={6}>
                <ArticleCard
                  variant="vertical"
                  title={item.title}
                  href={item.href}
                  image={item.image}
                  category={item.category}
                  summary={item.summary}
                  author={item.author}
                  publishedAt={item.publishedAt}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>

        {/* Sidebar Column: Numbered Trending Rankings + Newsletter Widget (4 cols) */}
        <Grid.Col span={12} spanLg={4}>
          <aside className={styles.sidebarWidget} aria-label="Trending Now">
            <SectionTitle size="sm" as="h3">
              Most Popular
            </SectionTitle>

            <div className={styles.trendingList}>
              {trendingRankings.map((item) => (
                <ArticleCard
                  key={item.id}
                  variant="minimal"
                  ranking={item.ranking}
                  title={item.title}
                  href={item.href}
                  category={item.category}
                  isBreaking={item.isBreaking}
                  author={item.author}
                  publishedAt={item.publishedAt}
                />
              ))}
            </div>
          </aside>

          {/* Exclusive Newsletter Box */}
          <div className={styles.newsletterWidget}>
            <h4 className={styles.newsletterTitle}>Vice City Today</h4>
            <p className={styles.newsletterText}>
              Get the biggest business stories, market movements, and tech analysis delivered to your inbox every morning.
            </p>
            <Button variant="primary" size="md" style={{ width: '100%' }}>
              Get Free Newsletter
            </Button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
