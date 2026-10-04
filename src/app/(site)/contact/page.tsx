import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '@/styles/static-page.module.css';

export const metadata: Metadata = {
  title: 'Contact the Newsroom & Editorial Desks | Vice City News',
  description:
    'Contact the Vice City News editorial team, submit confidential news tips, reach our corrections desk, or inquire about syndicate partnerships.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Contact</span>
        </nav>

        <header className={styles.header}>
          <span className={styles.kicker}>Newsroom Inquiries</span>
          <h1 className={styles.title}>Contact Vice City News</h1>
          <p className={styles.subtitle}>
            Connect with our reporting desks, send secure news tips, submit corrections requests, or reach executive leadership.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.callout}>
            <div className={styles.calloutTitle}>Have a Confidential News Tip?</div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              If you have non-public documents, whistleblower disclosures, or sensitive industry information regarding corporate malfeasance or technological breakthroughs, contact our investigations desk securely via encrypted correspondence at <a href="mailto:tips@vcn-online.com" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>tips@vcn-online.com</a>.
            </p>
          </div>

          <h2>Editorial &amp; Reporting Desks</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h3>Technology &amp; AI Desk</h3>
              <p>Frontier models, Silicon Valley startups, enterprise software, and semiconductors.</p>
              <a href="mailto:tech@vcn-online.com">tech@vcn-online.com</a>
            </div>

            <div className={styles.contactCard}>
              <h3>Financial Markets Desk</h3>
              <p>Equities, bond markets, foreign exchange, private equity, and banking regulation.</p>
              <a href="mailto:markets@vcn-online.com">markets@vcn-online.com</a>
            </div>

            <div className={styles.contactCard}>
              <h3>Corrections Desk</h3>
              <p>Submit verifiable factual correction requests for published reporting.</p>
              <a href="mailto:corrections@vcn-online.com">corrections@vcn-online.com</a>
            </div>

            <div className={styles.contactCard}>
              <h3>Syndication &amp; Licensing</h3>
              <p>Republishing rights, institutional feeds, and editorial syndication.</p>
              <a href="mailto:syndication@vcn-online.com">syndication@vcn-online.com</a>
            </div>
          </div>

          <h2>Newsroom Headquarters</h2>
          <p>
            <strong>Vice City News Media Inc.</strong><br />
            Ocean Drive Financial Tower, Suite 4400<br />
            Vice City, FL 33139<br />
            United States
          </p>
          <p>
            Phone (General Editorial): +1 (305) 555-0199<br />
            Press &amp; Media Relations: +1 (305) 555-0182
          </p>
        </div>
      </div>
    </div>
  );
}
