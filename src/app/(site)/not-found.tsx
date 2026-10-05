import React from 'react';
import Link from 'next/link';
import { Container, Heading, Text, Button, Flex } from '@/components/ui';

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
        color="accent"
        style={{
          display: 'inline-block',
          letterSpacing: 'var(--letter-spacing-widest)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        404 &bull; Page Not Found
      </Text>

      <Heading as="h1" size="4xl" weight="black" style={{ marginBottom: 'var(--space-4)' }}>
        The story you are looking for is unavailable.
      </Heading>

      <Text
        size="lg"
        color="secondary"
        style={{
          lineHeight: 'var(--line-height-relaxed)',
          marginBottom: 'var(--space-8)',
        }}
      >
        The article may have been archived, moved, or the link may contain a typo. Explore our core
        news desks or return to the front page.
      </Text>

      <Flex gap={2} justify="center" wrap="wrap" style={{ marginBottom: 'var(--space-8)' }}>
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
      </Flex>

      <Flex gap={3} justify="center">
        <Button variant="primary" size="md" href="/">
          &larr; Front Page
        </Button>
      </Flex>
    </Container>
  );
}
