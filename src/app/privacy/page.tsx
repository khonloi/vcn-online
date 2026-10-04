import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '@/styles/static-page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vice City News',
  description:
    'Read the Vice City News Privacy Policy regarding information collection, email newsletter subscriptions, cookie usage, GDPR, CCPA, and reader data privacy.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Privacy Policy</span>
        </nav>

        <header className={styles.header}>
          <span className={styles.kicker}>Legal &amp; Compliance</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            How Vice City News Media Inc. collects, protects, and handles reader data across our online publications and digital services.
          </p>
          <div className={styles.meta}>
            <span>Effective Date: January 1, 2025</span>
            <span>&bull;</span>
            <span>Last Updated: October 2026</span>
          </div>
        </header>

        <div className={styles.content}>
          <h2>1. Information We Collect</h2>
          <p>
            Vice City News is committed to minimizing data collection. We collect only what is strictly necessary to deliver high-quality digital journalism and subscriber dispatches:
          </p>
          <ul>
            <li><strong>Email Subscriptions:</strong> When you subscribe to our daily morning briefings or market dispatches, we store your email address solely to dispatch requested newsletters. You may unsubscribe at any time via the one-click link at the bottom of every dispatch.</li>
            <li><strong>Technical &amp; Telemetry Data:</strong> Standard server logs, IP addresses, browser types, and referring URLs collected to monitor site performance, mitigate denial-of-service attacks, and ensure fast page load speeds.</li>
            <li><strong>Bookmarks &amp; Client Preferences:</strong> Saved reading bookmarks are stored locally on your device in your browser&apos;s local storage and are never transmitted to our remote servers.</li>
          </ul>

          <h2>2. Use of Cookies and Local Storage</h2>
          <p>
            We use essential cookies strictly to maintain user sessions, ensure cybersecurity protections, and monitor site health. We do not sell your personal information or browsing history to third-party data brokers.
          </p>

          <h2>3. Data Sharing &amp; Third-Party Processors</h2>
          <p>
            We share subscriber data only with vetted infrastructure partners who process data on our behalf under strict confidentiality agreements:
          </p>
          <ul>
            <li>Cloud hosting providers and edge content delivery networks (CDNs) for high-availability site distribution.</li>
            <li>Sanity.io for structured editorial content delivery.</li>
            <li>Transactional email dispatch providers for newsletter distribution.</li>
          </ul>

          <h2>4. Your Rights (GDPR, CCPA &amp; Global Privacy)</h2>
          <p>
            Depending on your jurisdiction, you enjoy the right to access, rectify, port, or request permanent deletion of your email address and any associated subscriber data.
          </p>
          <div className={styles.callout}>
            <div className={styles.calloutTitle}>Exercising Privacy Rights</div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              To request a copy of your subscriber records or ask for immediate data erasure, please contact our Data Protection Officer at <a href="mailto:privacy@vcn-online.com" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>privacy@vcn-online.com</a>. We respond to all verified requests within 30 days.
            </p>
          </div>

          <h2>5. Policy Updates</h2>
          <p>
            We may revise this Privacy Policy periodically to reflect evolving regulatory frameworks or platform enhancements. Revisions will be posted here with an updated effective date.
          </p>
        </div>
      </div>
    </div>
  );
}
