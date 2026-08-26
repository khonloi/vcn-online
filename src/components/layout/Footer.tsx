"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide the footer completely when inside Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <footer className={styles.footerWrapper}>
      <div className="container">
        {/* Top bar with Logo & Newsletter */}
        <div className={styles.footerTop}>
          <Link href="/" className={styles.footerLogo}>
            VICE CITY <span>NEWS</span>
          </Link>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Get the daily newsletter..."
              className={styles.newsletterInput}
              aria-label="Email address for newsletter"
            />
            <Button variant="secondary" size="md">
              Sign Up
            </Button>
          </div>
        </div>

        {/* Multi-column editorial taxonomy covering every news sector */}
        <div className={styles.footerGrid}>
          <div>
            <h4 className={styles.footerColumnTitle}>Tech &amp; Innovation</h4>
            <div className={styles.footerLinks}>
              <Link href="/tech" className={styles.footerLink}>Technology Hub</Link>
              <Link href="/science" className={styles.footerLink}>Science &amp; Biotech</Link>
              <Link href="/energy" className={styles.footerLink}>Energy &amp; CleanTech</Link>
              <Link href="/topic/ai-boom" className={styles.footerLink}>Artificial Intelligence</Link>
              <Link href="/topic/silicon-valley" className={styles.footerLink}>Silicon Valley</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColumnTitle}>Markets &amp; Finance</h4>
            <div className={styles.footerLinks}>
              <Link href="/markets" className={styles.footerLink}>Financial Markets</Link>
              <Link href="/finance" className={styles.footerLink}>Banking &amp; Wall St</Link>
              <Link href="/economy" className={styles.footerLink}>Global Economy</Link>
              <Link href="/real-estate" className={styles.footerLink}>Real Estate &amp; Housing</Link>
              <Link href="/business" className={styles.footerLink}>Corporate Business</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColumnTitle}>Global &amp; Society</h4>
            <div className={styles.footerLinks}>
              <Link href="/politics" className={styles.footerLink}>Politics &amp; Policy</Link>
              <Link href="/world" className={styles.footerLink}>World News</Link>
              <Link href="/lifestyle" className={styles.footerLink}>Executive Lifestyle</Link>
              <Link href="/opinion" className={styles.footerLink}>Opinion &amp; Essays</Link>
              <Link href="/sports" className={styles.footerLink}>Sports &amp; Culture</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColumnTitle}>Company &amp; Studio</h4>
            <div className={styles.footerLinks}>
              <Link href="/about" className={styles.footerLink}>About Us</Link>
              <Link href="/studio" className={styles.footerLink}>Editorial Studio (CMS)</Link>
              <Link href="/careers" className={styles.footerLink}>Work For Us</Link>
              <Link href="/contact" className={styles.footerLink}>Contact &amp; Tips</Link>
              <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
              <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.disclaimer}>
            * Copyright &copy; {new Date().getFullYear()} Vice City News Media Inc. All rights reserved. Registration on or use of this site constitutes acceptance of our Terms of Service and Privacy Policy.
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
