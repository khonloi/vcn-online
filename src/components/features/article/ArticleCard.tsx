import React from 'react';
import Link from 'next/link';
import { ArticleImage } from './ArticleImage';
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

  // Render Minimal variant (Numbered trending rankings)
  if (variant === 'minimal') {
    return (
      <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
        {ranking && <span className={styles.rankingNumber}>{ranking}</span>}
        <div className={styles.minimalContent}>
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

  // Render Featured or Vertical Grid Card
  return (
    <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
      {image && (
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <ArticleImage
            src={image.src}
            alt={image.alt || title}
            aspectRatio="16/9"
            priority={priority}
            sizes={
              variant === 'featured'
                ? '(max-width: 1024px) 100vw, 66vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
          />
        </Link>
      )}
      <div className={variant === 'featured' ? styles.featuredContent : styles.verticalContent}>
        {category && <span className={kickerClass}>{category}</span>}
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>
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
