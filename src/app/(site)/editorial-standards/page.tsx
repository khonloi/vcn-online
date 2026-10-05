import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '@/styles/static-page.module.css';

export const metadata: Metadata = {
  title: 'Editorial Standards, Ethics & Corrections Policy | Vice City News',
  description:
    'Read Vice City News policies on journalistic integrity, fact-checking verification, conflicts of interest, anonymous sourcing, and corrections handling.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/editorial-standards`,
  },
};

export default function EditorialStandardsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <Link href="/about" className={styles.breadcrumbLink}>
            About
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Editorial Standards</span>
        </nav>

        <header className={styles.header}>
          <span className={styles.kicker}>Journalistic Ethics &amp; Integrity</span>
          <h1 className={styles.title}>Editorial Standards &amp; Code of Ethics</h1>
          <p className={styles.subtitle}>
            Our commitment to rigorous reporting, verification protocols, conflicts of interest
            management, and swift, transparent corrections.
          </p>
          <div className={styles.meta}>
            <span>Published: January 2025</span>
            <span>&bull;</span>
            <span>Reviewed Annually by the Editorial Board</span>
          </div>
        </header>

        <div className={styles.content}>
          <h2>1. Verification &amp; Fact-Checking Policy</h2>
          <p>
            Every dispatch, data point, and analytical claim published by Vice City News undergoes
            multi-tier verification before publication. Primary sources—such as regulatory filings
            (SEC, FTC, DOJ), official earnings releases, public court documents, and verified
            corporate disclosures—are prioritized over second-hand claims.
          </p>
          <p>
            When relying on leaks, internal documents, or non-public communications, journalists are
            required to corroborate the material with at least two independent, knowledgeable
            sources who possess direct familiarity with the matter.
          </p>

          <h2>2. Conflicts of Interest &amp; Financial Disclosures</h2>
          <p>
            To preserve public trust and absolute impartiality across our markets and technology
            desks, all VCN reporters, columnists, and editors adhere to strict personal trading
            rules:
          </p>
          <ul>
            <li>
              <strong>No Short-Term Trading:</strong> Editorial staff are prohibited from
              day-trading, holding single-stock short positions, or trading derivative instruments
              on companies they cover.
            </li>
            <li>
              <strong>Holding Disclosures:</strong> In the event that a reporter holds a direct
              material equity interest or index exposure in a sector under discussion, an explicit
              editorial disclosure must accompany the piece.
            </li>
            <li>
              <strong>Gifts and Hospitality:</strong> Editorial personnel may not accept gifts, paid
              travel accommodations, or corporate honoraria from subjects or entities covered in our
              reporting.
            </li>
          </ul>

          <h2>3. Anonymous Sources</h2>
          <p>
            We grant anonymity only when sources face plausible risk of retaliation, termination, or
            legal jeopardy, and when the information they provide is of vital public interest and
            unobtainable through other means.
          </p>
          <p>
            The identity of an anonymous source must be vetted and approved by at least one Senior
            Managing Editor prior to publication. VCN never publishes single-source anonymous
            rumors.
          </p>

          <h2>4. Corrections &amp; Retractions Policy</h2>
          <p>
            When factual errors occur, Vice City News is committed to correcting the record
            promptly, conspicuously, and transparently. We do not quietly edit stories without
            noting material modifications.
          </p>
          <div className={styles.callout}>
            <div className={styles.calloutTitle}>Requesting a Correction</div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              Readers, sources, or organizations who believe a story contains a factual inaccuracies
              are urged to email our dedicated desk at{' '}
              <a
                href="mailto:corrections@vcn-online.com"
                style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
              >
                corrections@vcn-online.com
              </a>{' '}
              with the story headline, URL, and verifiable evidence.
            </p>
          </div>
          <p>
            Corrections are appended directly beneath the article headline or at the conclusion of
            the piece, detailing what information was originally published and the accurate
            correction made, complete with a timestamp.
          </p>

          <h2>5. Generative AI Policy</h2>
          <p>
            Vice City News values human intelligence, source cultivation, and verified on-the-ground
            reporting. Artificial intelligence tools are never utilized to fabricate text, simulate
            source interviews, or generate synthetic bylines. All reporting bearing a VCN byline is
            researched, reported, and written by professional journalists.
          </p>
        </div>
      </div>
    </div>
  );
}
