'use client';

import React, { useEffect } from 'react';
import { Container, Heading, Text, Button, Flex } from '@/components/ui';
import styles from './error.module.css';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('App Router Caught Error:', error);
  }, [error]);

  return (
    <Container size="sm" className={styles.errorContainer}>
      <Text as="span" size="xs" weight="bold" color="error" className={styles.serviceNotice}>
        Service Notice
      </Text>

      <Heading as="h1" size="3xl" weight="black" className={styles.heading}>
        Unable to load report
      </Heading>

      <Text size="base" color="secondary" className={styles.description}>
        An unexpected network or rendering issue occurred while retrieving this news dispatch. Our
        engineering desk has been notified.
      </Text>

      {error.digest && (
        <Text size="xs" color="muted" className={styles.referenceId}>
          Reference ID: {error.digest}
        </Text>
      )}

      <Flex gap={3} justify="center">
        <Button variant="primary" size="md" onClick={() => reset()}>
          Try Again
        </Button>
        <Button variant="outline" size="md" href="/">
          Front Page
        </Button>
      </Flex>
    </Container>
  );
}
