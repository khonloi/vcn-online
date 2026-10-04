import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  const quickLinks = [
    { name: 'Tech', href: '/tech' },
    { name: 'Markets', href: '/markets' },
    { name: 'Finance', href: '/finance' },
    { name: 'Economy', href: '/economy' },
    { name: 'Business', href: '/business' },
    { name: 'Politics', href: '/politics' },
  ];

  return (
    <div
      className="container"
      style={{
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-20)',
        textAlign: 'center',
        maxWidth: '720px',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          color: 'var(--color-primary)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-bold)',
          letterSpacing: 'var(--letter-spacing-widest)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        404 &bull; Page Not Found
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-family-headline)',
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-black)',
          lineHeight: 'var(--line-height-tight)',
          marginBottom: 'var(--space-4)',
        }}
      >
        The story you are looking for is unavailable.
      </h1>

      <p
        style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-height-relaxed)',
          marginBottom: 'var(--space-8)',
        }}
      >
        The article may have been archived, moved, or the link may contain a typo. Explore our core news desks or return to the front page.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
        }}
      >
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: 'var(--space-1) var(--space-3)',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <Button variant="primary" size="md" href="/">
          &larr; Front Page
        </Button>
      </div>
    </div>
  );
}
