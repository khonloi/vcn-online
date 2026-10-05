import React from 'react';
import { ArticleCard, SectionTitle, Grid, Button } from '@/components/ui';
import styles from './page.module.css';
import { client } from '@/sanity/lib/client';
import { LATEST_ARTICLES_QUERY } from '@/sanity/lib/queries';
import { mapSanityToCard } from '@/lib/formatters';
import type { RawSanityArticle, FormattedArticleCardData } from '@/lib/formatters';

export const revalidate = 60; // Revalidate at most once every 60s (ISR)

export default async function Home() {
  // Fetch dynamic articles from Sanity with ISR cache
  let articles: RawSanityArticle[] = [];
  try {
    articles = await client.fetch(LATEST_ARTICLES_QUERY, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error);
  }

  if (articles.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-16) 0',
            color: 'var(--color-text-muted)',
          }}
        >
          <SectionTitle size="lg" as="h1">
            Vice City News
          </SectionTitle>
          <p
            style={{
              fontSize: 'var(--font-size-lg)',
              marginTop: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}
          >
            No published dispatches are currently available. Check back shortly for breaking market
            dispatches and investigative reports.
          </p>
          <Button variant="outline" size="md" href="/markets">
            Explore Market Dispatches &rarr;
          </Button>
        </div>
      </div>
    );
  }

  // Pick the lead story (Breaking news takes priority, otherwise the latest article)
  const breakingIndex = articles.findIndex((a) => a.isBreaking);
  const leadIndex = breakingIndex !== -1 ? breakingIndex : 0;
  const leadStory: FormattedArticleCardData = mapSanityToCard(articles[leadIndex]);

  // Filter out the lead article from secondary feeds so it doesn't duplicate
  const remainingArticles = articles.filter((_, idx) => idx !== leadIndex);

  const topFeed: FormattedArticleCardData[] = (
    remainingArticles.length > 0 ? remainingArticles : articles
  )
    .slice(0, 4)
    .map((a) => mapSanityToCard(a));

  const spotlightFeed: FormattedArticleCardData[] = (
    remainingArticles.length > 4 ? remainingArticles.slice(4, 8) : remainingArticles
  )
    .slice(0, 4)
    .map((a) => mapSanityToCard(a));

  const analysisFeed: FormattedArticleCardData[] = (
    remainingArticles.length > 8 ? remainingArticles.slice(8) : remainingArticles
  ).map((a) => mapSanityToCard(a));

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
            <h3 className={styles.newsletterTitle}>Vice City Today</h3>
            <p className={styles.newsletterText}>
              Get the biggest business stories, market movements, and tech analysis delivered to
              your inbox every morning.
            </p>
            <Button variant="primary" size="md" href="#newsletter" style={{ width: '100%' }}>
              Get Free Newsletter
            </Button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
