import React from 'react';
import Link from 'next/link';
import ArticleImage from './ArticleImage';
import styles from './ArticleCard.module.css';

import type { ArticleCardProps } from '@/types';

export type { ArticleCardProps };

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  href,
  image,
  summary,
  category,
  isBreaking = false,
  author,
  publishedAt,
  ranking,
  variant = 'vertical',
  priority = false,
  className = '',
}) => {
  const variantClass = {
    featured: styles.featured,
    horizontal: styles.horizontal,
    vertical: styles.vertical,
    minimal: styles.minimal,
  }[variant];

  const kickerClass = `${styles.kicker} ${isBreaking ? styles.kickerBreaking : ''}`.trim();

  // Render Horizontal variant (Sidebar / Top Stories Strip)
  if (variant === 'horizontal') {
    return (
      <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
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
          {category && <span className={kickerClass}>{category}</span>}
          <h3 className={styles.title}>
            <Link href={href}>{title}</Link>
          </h3>
          {(author || publishedAt) && (
            <div className={styles.meta}>
              {author && <span className={styles.author}>{author}</span>}
              {author && publishedAt && <span>&bull;</span>}
              {publishedAt && <span>{publishedAt}</span>}
            </div>
          )}
        </div>
      </article>
    );
  }

  // Render Minimal / Ranking variant (Trending list)
  if (variant === 'minimal') {
    return (
      <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
        {ranking !== undefined && (
          <span className={styles.rankingNumber}>
            {typeof ranking === 'number' ? String(ranking).padStart(2, '0') : ranking}
          </span>
        )}
        <div className={styles.minimalContent}>
          {category && <span className={kickerClass}>{category}</span>}
          <h4 className={styles.title}>
            <Link href={href}>{title}</Link>
          </h4>
          {(author || publishedAt) && (
            <div className={styles.meta}>
              {author && <span className={styles.author}>{author}</span>}
              {author && publishedAt && <span>&bull;</span>}
              {publishedAt && <span>{publishedAt}</span>}
            </div>
          )}
        </div>
      </article>
    );
  }

  // Render Featured or Vertical variant
  const HeadingTag = variant === 'featured' ? 'h1' : 'h3';

  return (
    <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
      {image && (
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <ArticleImage
            src={image.src}
            alt={image.alt || title}
            aspectRatio={variant === 'featured' ? '16/9' : '16/9'}
            priority={priority || variant === 'featured'}
            sizes={
              variant === 'featured'
                ? '(max-width: 1024px) 100vw, 60vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
          />
        </Link>
      )}
      <div className={variant === 'vertical' ? styles.verticalContent : styles.featuredContent}>
        {category && <span className={kickerClass}>{category}</span>}
        <HeadingTag className={styles.title}>
          <Link href={href}>{title}</Link>
        </HeadingTag>
        {summary && <p className={styles.summary}>{summary}</p>}
        {(author || publishedAt) && (
          <div className={styles.meta}>
            {author && <span className={styles.author}>{author}</span>}
            {author && publishedAt && <span>&bull;</span>}
            {publishedAt && <span>{publishedAt}</span>}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
