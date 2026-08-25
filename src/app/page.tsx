import React from 'react';
import { ArticleCard, SectionTitle, Grid, Button } from '@/components/ui';
import styles from './page.module.css';

export default function Home() {
  const topStories = [
    {
      id: 1,
      title: 'Nvidia unveils next-generation Blackwell Ultra chips as AI data center demand hits unprecedented highs',
      href: '/article/nvidia-blackwell-ultra-ai-datacenter',
      image: { src: 'https://picsum.photos/seed/tech1/200/200', alt: 'AI Chips' },
      category: 'TECH',
      author: 'Alistair Barr',
      publishedAt: '15m ago',
    },
    {
      id: 2,
      title: 'Federal Reserve hints at calibrated rate path as inflation data shows persistent services pressure',
      href: '/article/fed-interest-rates-inflation-outlook',
      image: { src: 'https://picsum.photos/seed/fed2/200/200', alt: 'Federal Reserve' },
      category: 'ECONOMY',
      author: 'Jennifer Sor',
      publishedAt: '45m ago',
    },
    {
      id: 3,
      title: 'Inside OpenAI’s internal restructuring as it transitions toward a fully for-profit enterprise model',
      href: '/article/openai-restructuring-enterprise-shift',
      image: { src: 'https://picsum.photos/seed/openai3/200/200', alt: 'AI Architecture' },
      category: 'EXCLUSIVE',
      isBreaking: true,
      author: 'Kali Hays',
      publishedAt: '1h ago',
    },
    {
      id: 4,
      title: 'Wall Street analysts double down on semiconductor stocks despite geopolitical supply chain headwinds',
      href: '/article/wall-street-semiconductors-forecast',
      image: { src: 'https://picsum.photos/seed/stocks4/200/200', alt: 'Wall Street Trading' },
      category: 'MARKETS',
      author: 'Matthew Fox',
      publishedAt: '2h ago',
    },
  ];

  const spotlightStories = [
    {
      id: 1,
      title: 'Why early-stage venture capital is shifting aggressively from SaaS toward physical AI and robotics',
      href: '/article/venture-capital-robotics-physical-ai',
      image: { src: 'https://picsum.photos/seed/spotlight1/400/225', alt: 'Robotics lab' },
      category: 'VENTURE CAPITAL',
      author: 'Ben Bergman',
      publishedAt: '3h ago',
    },
    {
      id: 2,
      title: 'How remote work executives are quietly rethinking return-to-office mandates for senior engineers',
      href: '/article/rto-mandates-engineering-talent',
      image: { src: 'https://picsum.photos/seed/spotlight2/400/225', alt: 'Modern Office' },
      category: 'STRATEGY',
      author: 'Emily Stewart',
      publishedAt: '4h ago',
    },
    {
      id: 3,
      title: 'The commercial real estate reset: Why major European banks are speeding up distress debt sales',
      href: '/article/commercial-real-estate-debt-sales',
      image: { src: 'https://picsum.photos/seed/spotlight3/400/225', alt: 'City Skyline' },
      category: 'FINANCE',
      author: 'Will Daniel',
      publishedAt: '5h ago',
    },
    {
      id: 4,
      title: 'Electric vehicle price wars intensify as legacy automakers ramp up hybrid battery production',
      href: '/article/ev-price-wars-hybrid-production',
      image: { src: 'https://picsum.photos/seed/spotlight4/400/225', alt: 'Electric Vehicle' },
      category: 'AUTOMOTIVE',
      author: 'Nora Naughton',
      publishedAt: '6h ago',
    },
  ];

  const latestAnalysis = [
    {
      id: 1,
      title: 'Big Tech is pouring billions into custom silicon. Here is what that means for traditional chipmakers.',
      href: '/article/big-tech-custom-silicon-race',
      image: { src: 'https://picsum.photos/seed/analysis1/600/340', alt: 'Silicon wafer' },
      category: 'TECH ANALYSIS',
      summary: 'Tech giants like Microsoft, Google, and Amazon are increasingly fabricating their own ASICs to reduce dependence on merchant silicon, reshaping the entire semiconductor ecosystem.',
      author: 'Hasan Chowdhury',
      publishedAt: '2h ago',
    },
    {
      id: 2,
      title: 'Private equity firms are sitting on a record $2.6 trillion in dry powder. The dealmaking dam is about to break.',
      href: '/article/private-equity-dry-powder-dealmaking',
      image: { src: 'https://picsum.photos/seed/analysis2/600/340', alt: 'Dealmaking' },
      category: 'WALL STREET',
      summary: 'With interest rates stabilizing and valuation gaps narrowing, institutional buyout funds are preparing for the biggest merger wave since 2021.',
      author: 'Alex Morrell',
      publishedAt: '3h ago',
    },
    {
      id: 3,
      title: 'The hidden costs of corporate AI adoption: Cloud computing bills, specialized talent, and legal uncertainty.',
      href: '/article/corporate-ai-adoption-hidden-costs',
      image: { src: 'https://picsum.photos/seed/analysis3/600/340', alt: 'Cloud Server Room' },
      category: 'ENTERPRISE',
      summary: 'While generative AI promises rapid productivity gains, CIOs report surprising compute expenses and mounting compliance overhead.',
      author: 'Paayal Zaveri',
      publishedAt: '4h ago',
    },
    {
      id: 4,
      title: 'How top startup founders are restructuring their equity compensation to navigate the secondary market discount.',
      href: '/article/startup-equity-compensation-secondary-markets',
      image: { src: 'https://picsum.photos/seed/analysis4/600/340', alt: 'Startup team' },
      category: 'CAREERS & WEALTH',
      summary: 'With IPO windows remaining selective, startup executives are pioneering new liquidity mechanisms for early employees.',
      author: 'Melia Russell',
      publishedAt: '5h ago',
    },
  ];

  const trendingRankings = [
    {
      id: 1,
      ranking: 1,
      title: '7 high-paying tech skills that are seeing the fastest salary growth this quarter',
      href: '/article/top-paying-tech-skills-growth',
      category: 'CAREERS',
      author: 'Courtney Connley',
      publishedAt: '124k reads',
    },
    {
      id: 2,
      ranking: 2,
      title: 'A leaked internal memo reveals Amazon’s updated performance evaluation metrics for engineers',
      href: '/article/leaked-amazon-evaluation-memo',
      category: 'EXCLUSIVE',
      isBreaking: true,
      author: 'Eugene Kim',
      publishedAt: '98k reads',
    },
    {
      id: 3,
      ranking: 3,
      title: 'The exact prompts a top hedge fund manager uses with Claude and ChatGPT to analyze quarterly earnings',
      href: '/article/hedge-fund-ai-prompts-earnings-analysis',
      category: 'INVESTING',
      author: 'Filip De Mott',
      publishedAt: '85k reads',
    },
    {
      id: 4,
      ranking: 4,
      title: 'Why seasoned real estate investors are pivoting from coastal luxury to Midwest logistics hubs',
      href: '/article/real-estate-midwest-logistics-pivot',
      category: 'REAL ESTATE',
      author: 'Alcynna Lloyd',
      publishedAt: '72k reads',
    },
    {
      id: 5,
      ranking: 5,
      title: 'The 10 fastest-growing AI startups founded by ex-Google and DeepMind researchers',
      href: '/article/top-ai-startups-deepmind-alumni',
      category: 'STARTUPS',
      author: 'Hugh Langley',
      publishedAt: '64k reads',
    },
  ];

  return (
    <div className={`container ${styles.page}`}>
      {/* 1. HERO LEAD SECTION */}
      <section className={styles.heroSection} aria-label="Lead Story">
        <Grid cols={12} gap="xl">
          {/* Main Lead Story (Left 7 Cols) */}
          <Grid.Col span={12} spanLg={7}>
            <ArticleCard
              variant="featured"
              category="EXCLUSIVE REPORT"
              isBreaking={true}
              title="Inside the $100 Billion AI Infrastructure Race: Tech Giants Forge Mega-Alliances to Secure Sovereign Power Grids"
              summary="As hyperscale AI cluster power requirements exceed the capacity of municipal grids, tech conglomerates are directly negotiating with nuclear energy operators and sovereign wealth funds to build private energy corridors."
              bullets={[
                'Hyperscalers are committing billions to long-term power purchase agreements with zero-carbon energy providers.',
                'Sovereign AI initiatives across Europe and Asia are creating intense competition for high-voltage transformers and specialized cooling infrastructure.',
                'Wall Street expects energy capital expenditure to surpass traditional server silicon spend by 2027.',
              ]}
              author="Alistair Barr & Kali Hays"
              publishedAt="35m ago"
              href="/article/100-billion-ai-infrastructure-power-grid-race"
              image={{
                src: 'https://picsum.photos/seed/bifeatured/900/506',
                alt: 'AI Data Center Infrastructure',
              }}
            />
          </Grid.Col>

          {/* Right Feed (5 Cols) */}
          <Grid.Col span={12} spanLg={5}>
            <SectionTitle size="sm" actionText="More Breaking News" actionHref="/news">
              Top Stories & Breaking
            </SectionTitle>
            <div className={styles.storyList}>
              {topStories.map((story) => (
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
          Markets & Tech Spotlight
        </SectionTitle>

        <Grid cols={12} gap="md">
          {spotlightStories.map((story) => (
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
            In-Depth Analysis & Executive Strategy
          </SectionTitle>

          <Grid cols={12} gap="lg">
            {latestAnalysis.map((item) => (
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
