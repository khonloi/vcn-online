import React from 'react';
import Link from 'next/link';
import { Button, MarketTicker } from '@/components/ui';
import { CurrentDateTime } from './CurrentDateTime';
import { NavLinks } from './NavLinks';
import { HeaderSearch } from '@/components/features/search';
import { MARKET_INDICES, TRENDING_TOPICS } from '@/lib/constants';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>

      {/* 1 & 2: Markets & Brand Header (scrolls naturally with page) */}
      <header className={styles.headerWrapper}>
        {/* 1. Markets & Editions Top Strip */}
        <div className={styles.topBar}>
          <div className={`container ${styles.topBarContent}`}>
            <MarketTicker indices={MARKET_INDICES} />

            <div className={styles.topBarRight}>
              <CurrentDateTime className={styles.dateTime} />
              <div className={styles.editionSelector}>
                <span className={styles.editionLabel}>Edition:</span>
                <span className={styles.editionCurrent}>US (Global)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Brand / Logo Header */}
        <div className={styles.mainHeader}>
          <div className={`container ${styles.mainHeaderContent}`}>
            <div className={styles.logoSection}>
              <Link href="/" className={styles.logoLink} aria-label="Vice City News Homepage">
                <span className={styles.logoVCN}>VICE CITY</span>{' '}
                <span className={styles.logoNews}>NEWS</span>
              </Link>
              <p className={styles.tagline}>Breaking Business, Tech, &amp; Market Intelligence</p>
            </div>

            <div className={styles.headerActions}>
              <HeaderSearch />
              <Button variant="primary" size="md" href="#newsletter">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 3 & 4: Sticky Navbar & Trending Bar */}
      <div className={styles.stickyNavGroup}>
        {/* 3. Category Navigation Bar (Client Island for Active Route State) */}
        <nav className={styles.navBar} aria-label="Main Navigation">
          <NavLinks />
        </nav>

        {/* 4. Trending Topics Sub-bar */}
        <div className={styles.trendingBar}>
          <div className={`container ${styles.trendingContent}`}>
            <span className={styles.trendingLabel}>Trending:</span>
            <div className={styles.trendingItems}>
              {TRENDING_TOPICS.map((topic, index) => (
                <React.Fragment key={topic.name}>
                  <Link href={topic.href} className={styles.trendingItem}>
                    {topic.name}
                  </Link>
                  {index < TRENDING_TOPICS.length - 1 && (
                    <span className={styles.bulletDivider}>&bull;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
