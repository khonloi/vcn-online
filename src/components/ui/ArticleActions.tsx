'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

interface ArticleActionsProps {
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
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Button variant="ghost" size="sm" onClick={handleShare} aria-label="Share this article">
        {copied ? '✓ Link Copied!' : 'Share'}
      </Button>
      <Button
        variant={saved ? 'primary' : 'secondary'}
        size="sm"
        onClick={handleSave}
        aria-label={saved ? 'Remove from saved articles' : 'Save article'}
      >
        {saved ? '✓ Saved' : 'Save Article'}
      </Button>
    </div>
  );
};

export default ArticleActions;
