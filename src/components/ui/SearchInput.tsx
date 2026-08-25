'use client';

import React from 'react';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Tìm kiếm...',
  className = '',
  onSearch,
  onKeyDown,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.currentTarget.value);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className={`${styles.searchWrapper} ${className}`.trim()}>
      <span className={styles.searchIcon} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input
        type="search"
        placeholder={placeholder}
        className={styles.searchInput}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
