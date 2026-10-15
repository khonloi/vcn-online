import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import type { BreadcrumbItem } from '@/types';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
  ...props
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={clsx(styles.breadcrumb, className)} {...props}>
      <ol style={{ display: 'contents', listStyle: 'none' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.name + index} className={styles.item}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
              {isLast || !item.href ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className={styles.link}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
