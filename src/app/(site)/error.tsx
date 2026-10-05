'use client';

import React, { useEffect } from 'react';
import { Container, Heading, Text, Button, Flex } from '@/components/ui';

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
    <Container
      size="sm"
      style={{
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-20)',
        textAlign: 'center',
      }}
    >
      <Text
        as="span"
        size="xs"
        weight="bold"
        color="error"
        style={{
          display: 'inline-block',
          letterSpacing: 'var(--letter-spacing-widest)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        Service Notice
      </Text>

      <Heading as="h1" size="3xl" weight="black" style={{ marginBottom: 'var(--space-4)' }}>
        Unable to load report
      </Heading>

      <Text
        size="base"
        color="secondary"
        style={{
          lineHeight: 'var(--line-height-relaxed)',
          marginBottom: 'var(--space-6)',
        }}
      >
        An unexpected network or rendering issue occurred while retrieving this news dispatch. Our
        engineering desk has been notified.
      </Text>

      {error.digest && (
        <Text
          size="xs"
          color="muted"
          style={{
            fontFamily: 'monospace',
            marginBottom: 'var(--space-6)',
          }}
        >
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
