'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchInput } from '@/components/ui';

export function HeaderSearch() {
  const router = useRouter();

  return (
    <SearchInput
      placeholder="Search stocks, topics, people..."
      onSearch={(q) => {
        const term = q.trim();
        if (term) {
          router.push(`/${encodeURIComponent(term.toLowerCase().replace(/\s+/g, '-'))}`);
        }
      }}
    />
  );
}
