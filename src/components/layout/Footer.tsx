import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
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

        {/* Multi-column editorial taxonomy */}
        <div className={styles.footerGrid}>
          <div>
            <h4 className={styles.footerColumnTitle}>Tech</h4>
            <div className={styles.footerLinks}>
              <Link href="/tech/ai" className={styles.footerLink}>Artificial Intelligence</Link>
              <Link href="/tech/big-tech" className={styles.footerLink}>Big Tech</Link>
              <Link href="/tech/startups" className={styles.footerLink}>Startups & VC</Link>
              <Link href="/tech/cybersecurity" className={styles.footerLink}>Cybersecurity</Link>
              <Link href="/tech/enterprise" className={styles.footerLink}>Enterprise</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColumnTitle}>Finance & Markets</h4>
            <div className={styles.footerLinks}>
              <Link href="/markets/stocks" className={styles.footerLink}>Stock Market</Link>
              <Link href="/markets/crypto" className={styles.footerLink}>Cryptocurrency</Link>
              <Link href="/finance/banking" className={styles.footerLink}>Wall Street</Link>
              <Link href="/finance/economy" className={styles.footerLink}>Global Economy</Link>
              <Link href="/finance/real-estate" className={styles.footerLink}>Real Estate</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColumnTitle}>Strategy & Careers</h4>
            <div className={styles.footerLinks}>
              <Link href="/strategy/leadership" className={styles.footerLink}>Leadership</Link>
              <Link href="/strategy/workplace" className={styles.footerLink}>Future of Work</Link>
              <Link href="/strategy/management" className={styles.footerLink}>Executive Insights</Link>
              <Link href="/strategy/careers" className={styles.footerLink}>Career Advice</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColumnTitle}>Company & Legal</h4>
            <div className={styles.footerLinks}>
              <Link href="/about" className={styles.footerLink}>About Us</Link>
              <Link href="/careers" className={styles.footerLink}>Work For Us</Link>
              <Link href="/contact" className={styles.footerLink}>Contact & Tips</Link>
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
