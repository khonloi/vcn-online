'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input, type InputProps } from '@/components/ui';
import { clsx } from 'clsx';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends Omit<InputProps, 'leftElement'> {
  onSearch?: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search articles...',
  className,
  wrapperClassName,
  onSearch,
  onKeyDown,
  size = 'md',
  type = 'search',
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
    <Input
      type={type}
      placeholder={placeholder}
      size={size}
      wrapperClassName={clsx(styles.searchWrapper, wrapperClassName)}
      className={className}
      leftElement={
        <span className={styles.searchIcon} aria-hidden="true">
          <Search size={15} />
        </span>
      }
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default SearchInput;
