import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '@/styles/static-page.module.css';

export const metadata: Metadata = {
  title: 'About Vice City News | Editorial Mission & Leadership',
  description:
    'Learn about Vice City News, our independent newsroom, investigative reporting on technology and financial markets, and our editorial masthead.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>About</span>
        </nav>

        <header className={styles.header}>
          <span className={styles.kicker}>Company &amp; Newsroom</span>
          <h1 className={styles.title}>About Vice City News</h1>
          <p className={styles.subtitle}>
            Independent journalism delivering actionable intelligence on corporate power, financial markets, emerging technology, and global economic shifts.
          </p>
          <div className={styles.meta}>
            <span>Established 2024</span>
            <span>&bull;</span>
            <span>Vice City News Media Inc.</span>
          </div>
        </header>

        <div className={styles.content}>
          <h2>Our Mission</h2>
          <p>
            Vice City News (VCN) is a non-partisan financial and technology news organization founded on the principle that accurate, uncompromising reporting is the bedrock of transparent capital markets and democratic accountability.
          </p>
          <p>
            From the bustling venture hubs of Silicon Valley and the trading desks of Wall Street to global regulatory capitols, our correspondents break stories that inform executives, institutional investors, founders, and discerning readers worldwide.
          </p>

          <div className={styles.callout}>
            <div className={styles.calloutTitle}>The VCN Editorial Charter</div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              We do not accept paid sponsored articles, editorial placement fees, or outside interference in our reporting. Our journalists operate under strict independence policies outlined in our <Link href="/editorial-standards" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Editorial Standards &amp; Ethics Charter</Link>.
            </p>
          </div>

          <h2>Key Coverage Pillars</h2>
          <ul>
            <li><strong>Financial Markets &amp; Banking:</strong> Real-time macro analysis, central bank decisions, fixed income, equity markets, and fintech disruption.</li>
            <li><strong>Technology &amp; Artificial Intelligence:</strong> Silicon Valley reporting on frontier AI models, cloud infrastructure, chip manufacturing, and startup venture capital.</li>
            <li><strong>Global Economy &amp; Trade:</strong> Supply chain resilience, trade corridors, commodities, and industrial policy across North America, Europe, and Asia.</li>
            <li><strong>Corporate Governance &amp; Power:</strong> Executive leadership scrutiny, merger &amp; acquisition mechanics, and shareholder activism.</li>
          </ul>

          <h2>Editorial Masthead</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h3>Elena Vance</h3>
              <p>Editor-in-Chief</p>
              <a href="mailto:editor@vcn-online.com">editor@vcn-online.com</a>
            </div>
            <div className={styles.contactCard}>
              <h3>Marcus Thorne</h3>
              <p>Managing Editor, Markets &amp; Economy</p>
              <a href="mailto:markets@vcn-online.com">markets@vcn-online.com</a>
            </div>
            <div className={styles.contactCard}>
              <h3>Aria Sterling</h3>
              <p>Chief Technology Correspondent</p>
              <a href="mailto:tech@vcn-online.com">tech@vcn-online.com</a>
            </div>
            <div className={styles.contactCard}>
              <h3>Newsroom Inquiries</h3>
              <p>General tips &amp; editorial desk</p>
              <Link href="/contact">Contact the Newsroom &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
