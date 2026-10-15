import React from 'react';
import Link from 'next/link';
import { Container, Heading, Text, Button, Flex } from '@/components/ui';
import { CONTENT_CATEGORIES } from '@/lib/constants';
import styles from './not-found.module.css';

export default function NotFound() {
  const quickLinks = CONTENT_CATEGORIES.slice(0, 6);

  return (
    <Container size="sm" className={styles.notFoundContainer}>
      <Text as="span" size="xs" weight="bold" color="accent" className={styles.noticeBadge}>
        404 &bull; Page Not Found
      </Text>

      <Heading as="h1" size="4xl" weight="black" className={styles.heading}>
        The story you are looking for is unavailable.
      </Heading>

      <Text size="lg" color="secondary" className={styles.description}>
        The article may have been archived, moved, or the link may contain a typo. Explore our core
        news desks or return to the front page.
      </Text>

      <Flex gap={2} justify="center" wrap="wrap" className={styles.quickLinksFlex}>
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className={styles.quickLink}>
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
