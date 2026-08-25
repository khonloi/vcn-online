import React from "react";
import Link from "next/link";
import { Button, SearchInput } from "@/components/ui";
import { CurrentDateTime } from "./CurrentDateTime";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const marketIndices = [
    { name: "S&P 500", value: "5,983.25", change: "+0.42%", positive: true },
    { name: "NASDAQ", value: "18,972.40", change: "+0.88%", positive: true },
    { name: "DOW", value: "43,870.10", change: "-0.15%", positive: false },
    { name: "BTC", value: "$96,450", change: "+2.30%", positive: true },
    { name: "OIL", value: "$72.15", change: "-1.05%", positive: false },
  ];

  const trendingTopics = [
    "AI Boom",
    "Tech Stocks",
    "Federal Reserve",
    "Silicon Valley",
    "Electric Vehicles",
    "Real Estate Trends",
  ];

  return (
    <header className={styles.headerWrapper}>
      {/* 1. Markets & Editions Top Strip */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContent}`}>
          <div className={styles.marketTicker} aria-label="Market Data">
            {marketIndices.map((item) => (
              <div key={item.name} className={styles.marketItem}>
                <span>{item.name}</span>
                <span
                  className={
                    item.positive
                      ? styles.marketPositive
                      : styles.marketNegative
                  }
                >
                  {item.value} ({item.change})
                </span>
              </div>
            ))}
          </div>

          <div className={styles.topBarActions}>
            <CurrentDateTime className={styles.dateTimeText} />
            <div className={styles.editionSelector}>
              <span>US</span> | <span>INTL</span> | <span>VC</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header */}
      <div className={styles.mainHeader}>
        <div className={`container ${styles.mainHeaderContent}`}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Vice City News Homepage"
          >
            VICE CITY <span>NEWS</span>{" "}
            <span className={styles.logoBadge}>ONLINE</span>
          </Link>

          <div className={styles.headerRight}>
            <SearchInput placeholder="Search stocks, topics, people..." />
            <Button variant="primary" size="md" href="/subscribe">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Bar */}
      <nav className={styles.navBar} aria-label="Main Navigation">
        <div className={`container ${styles.navLinks}`}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/tech" className={styles.navLink}>
            Tech
          </Link>
          <Link href="/finance" className={styles.navLink}>
            Finance
          </Link>
          <Link href="/markets" className={styles.navLink}>
            Markets
          </Link>
          <Link href="/economy" className={styles.navLink}>
            Economy
          </Link>
          <Link href="/strategy" className={styles.navLink}>
            Strategy
          </Link>
          <Link href="/lifestyle" className={styles.navLink}>
            Lifestyle
          </Link>
          <Link href="/reviews" className={styles.navLink}>
            Reviews
          </Link>
        </div>
      </nav>

      {/* 4. Trending Topics Sub-bar */}
      <div className={styles.trendingBar}>
        <div className={`container ${styles.trendingContent}`}>
          <span className={styles.trendingLabel}>Trending:</span>
          <div className={styles.trendingItems}>
            {trendingTopics.map((topic, index) => (
              <React.Fragment key={topic}>
                <Link
                  href={`/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                  className={styles.trendingItem}
                >
                  {topic}
                </Link>
                {index < trendingTopics.length - 1 && (
                  <span className={styles.bulletDivider}>&bull;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
