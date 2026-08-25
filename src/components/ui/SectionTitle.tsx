import React from 'react';
import Link from 'next/link';
import styles from './SectionTitle.module.css';

export interface SectionTitleProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  actionText?: string;
  actionHref?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  size = 'md',
  href,
  actionText,
  actionHref,
  as: Component = 'h2',
  className = '',
}) => {
  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const content = href ? (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  ) : (
    children
  );

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <Component className={`${styles.heading} ${sizeClass}`}>
        {content}
      </Component>
      {actionText && actionHref && (
        <Link href={actionHref} className={styles.action}>
          {actionText} &rarr;
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
