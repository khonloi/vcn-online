'use client';

import React, { useState } from 'react';
import { Button, Flex } from '@/components/ui';
import { Share2, Bookmark, Check } from 'lucide-react';
import styles from './ArticleActions.module.css';

export interface ArticleActionsProps {
  title: string;
  url?: string;
}

export const ArticleActions: React.FC<ArticleActionsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if share was canceled or unavailable
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <Flex align="center" gap={2}>
      <Button variant="ghost" size="sm" onClick={handleShare} aria-label="Share this article">
        {copied ? (
          <>
            <Check size={14} className={styles.buttonIcon} /> Link Copied
          </>
        ) : (
          <>
            <Share2 size={14} className={styles.buttonIcon} /> Share
          </>
        )}
      </Button>
      <Button
        variant={saved ? 'primary' : 'secondary'}
        size="sm"
        onClick={handleSave}
        aria-label={saved ? 'Remove from saved articles' : 'Save article'}
      >
        <Bookmark size={14} className={styles.buttonIcon} /> {saved ? 'Saved' : 'Save'}
      </Button>
    </Flex>
  );
};

export default ArticleActions;
