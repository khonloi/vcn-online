'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { subscribeToNewsletter, NewsletterState } from '@/app/actions/newsletter';
import styles from './Footer.module.css';

const initialNewsletterState: NewsletterState = {
  status: 'idle',
  message: '',
};

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialNewsletterState
  );

  return (
    <div className={styles.newsletterForm}>
      {state.status === 'success' ? (
        <span
          style={{
            color: 'var(--color-primary)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
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
            <p
              style={{
                color: 'var(--color-breaking)',
                fontSize: 'var(--font-size-xs)',
                marginTop: '4px',
              }}
            >
              {state.message}
            </p>
          )}
          <p className={styles.newsletterConsent}>
            By subscribing, you agree to our <Link href="/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}
