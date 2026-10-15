'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchInput } from './SearchInput';
import { isKnownCategorySlug } from '@/services/categories';

export function HeaderSearch() {
  const router = useRouter();

  return (
    <SearchInput
      placeholder="Search stocks, topics, people..."
      onSearch={(q) => {
        const term = q.trim();
        if (!term) return;

        const slug = term.toLowerCase().replace(/\s+/g, '-');
        if (isKnownCategorySlug(slug)) {
          router.push(`/${encodeURIComponent(slug)}`);
        } else {
          router.push(`/markets?q=${encodeURIComponent(term)}`);
        }
      }}
    />
  );
}

export default HeaderSearch;
