import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '@/styles/static-page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | Vice City News',
  description:
    'Review the Vice City News Terms of Service, content licensing, intellectual property rules, and financial market data disclaimers.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Terms of Service</span>
        </nav>

        <header className={styles.header}>
          <span className={styles.kicker}>Legal Agreement</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Rules and legal conditions governing your access to Vice City News articles, multimedia, and digital intelligence services.
          </p>
          <div className={styles.meta}>
            <span>Effective Date: January 1, 2025</span>
            <span>&bull;</span>
            <span>Vice City News Media Inc.</span>
          </div>
        </header>

        <div className={styles.content}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or reading Vice City News (vcn-online.com), you agree to be bound by these Terms of Service and our <Link href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Privacy Policy</Link>. If you do not agree to these terms, please discontinue use of this site immediately.
          </p>

          <h2>2. Intellectual Property &amp; Copyright</h2>
          <p>
            All original text, headlines, analysis, graphic assets, layout designs, and code published on Vice City News are the proprietary property of Vice City News Media Inc. and are protected by United States and international copyright laws.
          </p>
          <p>
            You may quote brief excerpts (up to 75 words) for academic or editorial commentary, provided conspicuous attribution and a direct hyperlink to the original article URL are provided. Bulk scraping, automated scraping, or unauthorized redistribution for commercial training of AI models without a written commercial license is strictly prohibited.
          </p>

          <h2>3. Financial Market Data Disclaimer (Not Financial Advice)</h2>
          <div className={styles.callout}>
            <div className={styles.calloutTitle}>Editorial Information Only</div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              Vice City News is a journalistic publication, not a registered investment advisor, broker-dealer, or financial intermediary. All market dispatches, ticker data, and economic commentary are provided exclusively for informational, educational, and journalistic purposes.
            </p>
          </div>
          <p>
            Ticker quotes displayed on our platform are indicative snapshots delayed by at least 15 minutes. Nothing published on this site constitutes a personalized recommendation, endorsement, or solicitation to purchase, hold, or liquidate any security, digital asset, commodity, or derivative. Consult a licensed financial professional before making investment decisions.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            Users are strictly prohibited from attempting to bypass technical protections, transmitting malicious scripts, or interfering with server operations through denial-of-service attempts.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted under applicable law, Vice City News Media Inc. and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your reliance on content, market prices, or technical interruptions on our platform.
          </p>

          <h2>6. Governing Law &amp; Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the State of Florida and the federal laws of the United States, without regard to conflict of law principles.
          </p>
        </div>
      </div>
    </div>
  );
}
