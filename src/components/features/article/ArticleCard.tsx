import React from 'react';
import Link from 'next/link';
import { Card, Badge, Heading, Text } from '@/components/ui';
import { ArticleImage } from './ArticleImage';
import styles from './ArticleCard.module.css';
import type { ArticleCardProps } from '@/types';

export type { ArticleCardProps };

export type ArticleCardSubProps = Omit<ArticleCardProps, 'variant'>;

/**
 * Editorial category/kicker badge
 */
export const ArticleKicker: React.FC<{ category?: string; isBreaking?: boolean }> = ({
  category,
  isBreaking = false,
}) => {
  if (!category) return null;
  return (
    <Badge variant={isBreaking ? 'breaking' : 'default'} size="sm">
      {category}
    </Badge>
  );
};

/**
 * Editorial author and publish timestamp metadata line
 */
export const ArticleMeta: React.FC<{ author?: string; publishedAt?: string }> = ({
  author,
  publishedAt,
}) => {
  if (!author && !publishedAt) return null;
  return (
    <div className={styles.meta}>
      {author && (
        <Text size="xs" weight="semibold" color="primary">
          {author}
        </Text>
      )}
      {author && publishedAt && <span aria-hidden="true">&bull;</span>}
      {publishedAt && (
        <Text size="xs" color="muted">
          {publishedAt}
        </Text>
      )}
    </div>
  );
};

/**
 * Horizontal variant (Used in sidebar top stories & feed strips)
 */
export const ArticleCardHorizontal: React.FC<ArticleCardSubProps> = ({
  title,
  href,
  image,
  category,
  isBreaking = false,
  author,
  publishedAt,
  priority = false,
  className = '',
}) => {
  return (
    <Card
      variant="flat"
      orientation="horizontal"
      className={`${styles.horizontal} ${className}`.trim()}
    >
      {image && (
        <div className={styles.horizontalImageWrapper}>
          <Link href={href} tabIndex={-1} aria-hidden="true">
            <ArticleImage
              src={image.src}
              alt={image.alt || title}
              aspectRatio="1/1"
              sizes="88px"
              priority={priority}
            />
          </Link>
        </div>
      )}
      <Card.Body>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <Heading as="h3" size="sm" font="headline" weight="bold" className={styles.cardHeading}>
          <Link href={href}>{title}</Link>
        </Heading>
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </Card.Body>
    </Card>
  );
};

/**
 * Minimal variant (Used for numbered trending rankings & most popular articles)
 */
export const ArticleCardMinimal: React.FC<ArticleCardSubProps> = ({
  title,
  href,
  category,
  isBreaking = false,
  author,
  publishedAt,
  ranking,
  className = '',
}) => {
  return (
    <Card
      variant="flat"
      orientation="horizontal"
      className={`${styles.minimal} ${className}`.trim()}
    >
      {ranking && <span className={styles.rankingNumber}>{ranking}</span>}
      <Card.Body>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <Heading as="h3" size="sm" font="headline" weight="bold" className={styles.cardHeading}>
          <Link href={href}>{title}</Link>
        </Heading>
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </Card.Body>
    </Card>
  );
};

/**
 * Featured variant (Hero lead story with large format media & full summary)
 */
export const ArticleCardFeatured: React.FC<ArticleCardSubProps> = ({
  title,
  href,
  image,
  summary,
  category,
  isBreaking = false,
  author,
  publishedAt,
  priority = false,
  className = '',
}) => {
  return (
    <Card variant="flat" className={`${styles.featured} ${className}`.trim()}>
      {image && (
        <Card.Media>
          <Link href={href} tabIndex={-1} aria-hidden="true">
            <ArticleImage
              src={image.src}
              alt={image.alt || title}
              aspectRatio="16/9"
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </Link>
        </Card.Media>
      )}
      <Card.Body>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <Heading as="h3" size="3xl" font="headline" weight="black" className={styles.cardHeading}>
          <Link href={href}>{title}</Link>
        </Heading>
        {summary && (
          <Text size="base" font="serif" color="secondary">
            {summary}
          </Text>
        )}
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </Card.Body>
    </Card>
  );
};

/**
 * Vertical variant (Standard multi-column news card)
 */
export const ArticleCardVertical: React.FC<ArticleCardSubProps> = ({
  title,
  href,
  image,
  summary,
  category,
  isBreaking = false,
  author,
  publishedAt,
  priority = false,
  className = '',
}) => {
  return (
    <Card variant="flat" className={`${styles.vertical} ${className}`.trim()}>
      {image && (
        <Card.Media>
          <Link href={href} tabIndex={-1} aria-hidden="true">
            <ArticleImage
              src={image.src}
              alt={image.alt || title}
              aspectRatio="16/9"
              priority={priority}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </Link>
        </Card.Media>
      )}
      <Card.Body>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <Heading as="h3" size="lg" font="headline" weight="bold" className={styles.cardHeading}>
          <Link href={href}>{title}</Link>
        </Heading>
        {summary && (
          <Text size="sm" font="serif" color="secondary">
            {summary}
          </Text>
        )}
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </Card.Body>
    </Card>
  );
};

export interface ArticleCardComponent extends React.FC<ArticleCardProps> {
  Featured: typeof ArticleCardFeatured;
  Horizontal: typeof ArticleCardHorizontal;
  Vertical: typeof ArticleCardVertical;
  Minimal: typeof ArticleCardMinimal;
  Kicker: typeof ArticleKicker;
  Meta: typeof ArticleMeta;
}

/**
 * ArticleCard root component supporting both variant prop and subcomponent composition.
 */
export const ArticleCard: ArticleCardComponent = ((props: ArticleCardProps) => {
  const { variant = 'vertical', ...rest } = props;

  switch (variant) {
    case 'horizontal':
      return <ArticleCardHorizontal {...rest} />;
    case 'minimal':
      return <ArticleCardMinimal {...rest} />;
    case 'featured':
      return <ArticleCardFeatured {...rest} />;
    case 'vertical':
    default:
      return <ArticleCardVertical {...rest} />;
  }
}) as ArticleCardComponent;

ArticleCard.Featured = ArticleCardFeatured;
ArticleCard.Horizontal = ArticleCardHorizontal;
ArticleCard.Vertical = ArticleCardVertical;
ArticleCard.Minimal = ArticleCardMinimal;
ArticleCard.Kicker = ArticleKicker;
ArticleCard.Meta = ArticleMeta;

export default ArticleCard;
