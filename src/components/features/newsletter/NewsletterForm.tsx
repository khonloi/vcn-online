'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { Button, Input, Text } from '@/components/ui';
import { subscribeToNewsletter } from '@/actions/newsletter';
import type { NewsletterState } from '@/types';
import styles from './NewsletterForm.module.css';

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
        <Text color="accent" weight="semibold" size="sm">
          {state.message}
        </Text>
      ) : (
        <form action={formAction} aria-label="Newsletter Subscription">
          <div className={styles.newsletterInputs}>
            <Input
              type="email"
              name="email"
              placeholder="Enter email for daily morning briefing..."
              aria-label="Email address for newsletter"
              required
              disabled={isPending}
              size="md"
              wrapperClassName={styles.newsletterInputWrapper}
            />
            <Button variant="secondary" size="md" type="submit" disabled={isPending}>
              {isPending ? 'Subscribing...' : 'Sign Up'}
            </Button>
          </div>
          {state.status === 'error' && (
            <Text color="error" size="xs" style={{ marginTop: '4px' }}>
              {state.message}
            </Text>
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
