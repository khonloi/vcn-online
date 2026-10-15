import { Button, Grid, Surface, Heading, Text } from '@/components/ui';
import { ArticleCard, SectionTitle } from '@/components/features';
import styles from './page.module.css';
import { getLatestArticles } from '@/services/articles';
import { partitionHomeFeeds } from '@/lib/formatters';

export const revalidate = 60; // Revalidate at most once every 60s (ISR)

export default async function Home() {
  // Fetch dynamic articles via cached Data Access Layer
  const articles = await getLatestArticles();

  if (articles.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <div className={styles.emptyState}>
          <SectionTitle size="lg" as="h1">
            Vice City News
          </SectionTitle>
          <p className={styles.emptyStateText}>
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

  const { leadStory, topFeed, spotlightFeed, analysisFeed, trendingRankings } =
    partitionHomeFeeds(articles);

  return (
    <div className={`container ${styles.page}`}>
      {/* 1. HERO LEAD SECTION */}
      {leadStory && (
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
      )}

      {/* 2. SPOTLIGHT 4-COLUMN STRIP */}
      {spotlightFeed.length > 0 && (
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
      )}

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
          <Surface
            as="aside"
            variant="card"
            border="default"
            padding="md"
            aria-label="Trending Now"
            className={styles.sidebarSurface}
          >
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
          </Surface>

          {/* Exclusive Newsletter Box */}
          <Surface variant="subtle" border="default" padding="lg">
            <Heading
              as="h3"
              size="lg"
              font="headline"
              weight="black"
              className={styles.newsletterHeading}
            >
              Vice City Today
            </Heading>
            <Text size="xs" color="secondary" className={styles.newsletterDescription}>
              Get the biggest business stories, market movements, and tech analysis delivered to
              your inbox every morning.
            </Text>
            <Button
              variant="primary"
              size="md"
              href="#newsletter"
              className={styles.newsletterButton}
            >
              Get Free Newsletter
            </Button>
          </Surface>
        </Grid.Col>
      </Grid>
    </div>
  );
}
