"use client";

import React, { useActionState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { subscribeToNewsletter, NewsletterState } from '@/app/actions/newsletter';
import styles from './Footer.module.css';

const initialNewsletterState: NewsletterState = {
  status: 'idle',
  message: '',
};

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialNewsletterState);

  // Hide the footer completely when inside Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <footer className={styles.footerWrapper}>
      <div className="container">
        {/* Top bar with Logo & Newsletter */}
        <div className={styles.footerTop} id="newsletter">
          <Link href="/" className={styles.footerLogo}>
            VICE CITY <span>NEWS</span>
          </Link>
          <div className={styles.newsletterForm}>
            {state.status === 'success' ? (
              <span style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                {state.message}
              </span>
            ) : (
              <form action={formAction} aria-label="Newsletter Subscription">
                <div className={styles.newsletterInputs}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email for daily morning briefing..."
                    className={styles.newsletterInput}
                    aria-label="Email address for newsletter"
                    required
                    disabled={isPending}
                  />
                  <Button variant="secondary" size="md" type="submit" disabled={isPending}>
                    {isPending ? 'Subscribing...' : 'Sign Up'}
                  </Button>
                </div>
                {state.status === 'error' && (
                  <p style={{ color: 'var(--color-breaking)', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                    {state.message}
                  </p>
                )}
                <p className={styles.newsletterConsent}>
                  By subscribing, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Multi-column editorial taxonomy covering every news sector */}
        <div className={styles.footerGrid}>
          <div>
            <h3 className={styles.footerColumnTitle}>Tech &amp; Innovation</h3>
            <div className={styles.footerLinks}>
              <Link href="/tech" className={styles.footerLink}>Technology Hub</Link>
              <Link href="/science" className={styles.footerLink}>Science &amp; Biotech</Link>
              <Link href="/energy" className={styles.footerLink}>Energy &amp; CleanTech</Link>
              <Link href="/tech" className={styles.footerLink}>Artificial Intelligence</Link>
              <Link href="/tech" className={styles.footerLink}>Silicon Valley &amp; Startups</Link>
            </div>
          </div>

          <div>
            <h3 className={styles.footerColumnTitle}>Markets &amp; Finance</h3>
            <div className={styles.footerLinks}>
              <Link href="/markets" className={styles.footerLink}>Financial Markets</Link>
              <Link href="/finance" className={styles.footerLink}>Banking &amp; Wall St</Link>
              <Link href="/economy" className={styles.footerLink}>Global Economy</Link>
              <Link href="/real-estate" className={styles.footerLink}>Real Estate &amp; Housing</Link>
              <Link href="/business" className={styles.footerLink}>Corporate Business</Link>
            </div>
          </div>

          <div>
            <h3 className={styles.footerColumnTitle}>Global &amp; Society</h3>
            <div className={styles.footerLinks}>
              <Link href="/politics" className={styles.footerLink}>Politics &amp; Policy</Link>
              <Link href="/world" className={styles.footerLink}>World News</Link>
              <Link href="/lifestyle" className={styles.footerLink}>Executive Lifestyle</Link>
              <Link href="/opinion" className={styles.footerLink}>Opinion &amp; Essays</Link>
              <Link href="/sports" className={styles.footerLink}>Sports &amp; Culture</Link>
            </div>
          </div>

          <div>
            <h3 className={styles.footerColumnTitle}>Company &amp; Trust</h3>
            <div className={styles.footerLinks}>
              <Link href="/about" className={styles.footerLink}>About Us &amp; Masthead</Link>
              <Link href="/editorial-standards" className={styles.footerLink}>Editorial Standards &amp; Ethics</Link>
              <Link href="/contact" className={styles.footerLink}>Contact &amp; News Tips</Link>
              <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
              <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.disclaimer}>
            * Copyright &copy; {new Date().getFullYear()} Vice City News Media Inc. All rights reserved. Registration on or use of this site constitutes acceptance of our <Link href="/terms" style={{ textDecoration: 'underline' }}>Terms of Service</Link> and <Link href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>. Indicative market data is delayed by 15 minutes.
          </p>
          <div>
            <span>Editions: <strong>Vice City</strong> / <strong>US</strong> / <strong>International</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
