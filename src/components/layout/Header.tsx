"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, SearchInput } from "@/components/ui";
import { CurrentDateTime } from "./CurrentDateTime";
import styles from "./Header.module.css";

const CATEGORIES = [
  { name: "Home", href: "/" },
  { name: "Tech", href: "/tech" },
  { name: "Markets", href: "/markets" },
  { name: "Finance", href: "/finance" },
  { name: "Economy", href: "/economy" },
  { name: "Business", href: "/business" },
  { name: "Politics", href: "/politics" },
  { name: "World", href: "/world" },
  { name: "Real Estate", href: "/real-estate" },
  { name: "Energy", href: "/energy" },
  { name: "Science", href: "/science" },
  { name: "Lifestyle", href: "/lifestyle" },
  { name: "Opinion", href: "/opinion" },
  { name: "Sports", href: "/sports" },
];

const MARKET_INDICES = [
  { name: "S&P 500", value: "5,983.25", change: "+0.42%", positive: true },
  { name: "NASDAQ", value: "18,972.40", change: "+0.88%", positive: true },
  { name: "DOW", value: "43,870.10", change: "-0.15%", positive: false },
  { name: "BTC", value: "$96,450", change: "+2.30%", positive: true },
  { name: "OIL", value: "$72.15", change: "-1.05%", positive: false },
];

const TRENDING_TOPICS = [
  "AI Boom",
  "Tech Stocks",
  "Federal Reserve",
  "Silicon Valley",
  "Electric Vehicles",
  "Real Estate Trends",
  "Energy Transition",
  "Global Trade",
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  // Hide the header completely when inside Sanity Studio
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const isCategoryActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {/* 1 & 2: Markets & Brand Header (scrolls naturally with page) */}
      <header className={styles.headerWrapper}>
        {/* 1. Markets & Editions Top Strip */}
        <div className={styles.topBar}>
          <div className={`container ${styles.topBarContent}`}>
            <div className={styles.marketTicker} aria-label="Market Data">
              {MARKET_INDICES.map((item) => (
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
      </header>

      {/* 3 & 4: Sticky Navbar & Trending Bar (stays along when scrolling down) */}
      <div className={styles.stickyNavGroup}>
        {/* 3. Category Navigation Bar */}
        <nav className={styles.navBar} aria-label="Main Navigation">
          <div className={`container ${styles.navLinks}`}>
            {CATEGORIES.map((cat) => {
              const active = isCategoryActive(cat.href);
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* 4. Trending Topics Sub-bar */}
        <div className={styles.trendingBar}>
          <div className={`container ${styles.trendingContent}`}>
            <span className={styles.trendingLabel}>Trending:</span>
            <div className={styles.trendingItems}>
              {TRENDING_TOPICS.map((topic, index) => (
                <React.Fragment key={topic}>
                  <Link
                    href={`/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                    className={styles.trendingItem}
                  >
                    {topic}
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

