'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui';

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
    <div
      className="container"
      style={{
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-20)',
        textAlign: 'center',
        maxWidth: '680px',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          color: 'var(--color-breaking)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-bold)',
          letterSpacing: 'var(--letter-spacing-widest)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        Service Notice
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-family-headline)',
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'var(--font-weight-black)',
          lineHeight: 'var(--line-height-tight)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Unable to load report
      </h1>

      <p
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-height-relaxed)',
          marginBottom: 'var(--space-6)',
        }}
      >
        An unexpected network or rendering issue occurred while retrieving this news dispatch. Our
        engineering desk has been notified.
      </p>

      {error.digest && (
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            fontFamily: 'monospace',
            marginBottom: 'var(--space-6)',
          }}
        >
          Reference ID: {error.digest}
        </p>
      )}

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <Button variant="primary" size="md" onClick={() => reset()}>
          Try Again
        </Button>
        <Button variant="outline" size="md" href="/">
          Front Page
        </Button>
      </div>
    </div>
  );
}
