'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import styles from './Header.module.css';

export function NavLinks() {
  const pathname = usePathname();

  const isCategoryActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <div className={`container ${styles.navLinks}`}>
      {CATEGORIES.map((cat) => {
        const active = isCategoryActive(cat.href);
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
