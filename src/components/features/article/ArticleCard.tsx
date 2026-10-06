import React from 'react';
import Link from 'next/link';
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
  const kickerClass = `${styles.kicker} ${isBreaking ? styles.kickerBreaking : ''}`.trim();
  return <span className={kickerClass}>{category}</span>;
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
      {author && <span className={styles.author}>{author}</span>}
      {author && publishedAt && <span>&bull;</span>}
      {publishedAt && <span>{publishedAt}</span>}
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
    <article className={`${styles.card} ${styles.horizontal} ${className}`.trim()}>
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
      <div className={styles.horizontalContent}>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </div>
    </article>
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
    <article className={`${styles.card} ${styles.minimal} ${className}`.trim()}>
      {ranking && <span className={styles.rankingNumber}>{ranking}</span>}
      <div className={styles.minimalContent}>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </div>
    </article>
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
    <article className={`${styles.card} ${styles.featured} ${className}`.trim()}>
      {image && (
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <ArticleImage
            src={image.src}
            alt={image.alt || title}
            aspectRatio="16/9"
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </Link>
      )}
      <div className={styles.featuredContent}>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>
        {summary && <p className={styles.summary}>{summary}</p>}
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </div>
    </article>
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
    <article className={`${styles.card} ${styles.vertical} ${className}`.trim()}>
      {image && (
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <ArticleImage
            src={image.src}
            alt={image.alt || title}
            aspectRatio="16/9"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      )}
      <div className={styles.verticalContent}>
        <ArticleKicker category={category} isBreaking={isBreaking} />
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>
        {summary && <p className={styles.summary}>{summary}</p>}
        <ArticleMeta author={author} publishedAt={publishedAt} />
      </div>
    </article>
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
