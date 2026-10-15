import React from 'react';
import { Skeleton } from '@/components/ui';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div
      className={`container ${styles.loadingWrapper}`}
      role="status"
      aria-busy="true"
      aria-label="Loading dispatch..."
    >
      {/* Top skeleton indicator */}
      <Skeleton width={180} height={24} className={styles.indicator} />

      {/* Main hero grid skeleton */}
      <div className={styles.heroGrid}>
        <div className={styles.leadColumn}>
          <Skeleton aspectRatio="16/9" width="100%" className={styles.leadImage} />
          <Skeleton width="75%" height={32} className={styles.leadTitle} />
          <Skeleton width="90%" height={20} />
        </div>

        <div className={styles.sideColumn}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.sideItem}>
              <Skeleton width={80} height={80} />
              <div className={styles.sideItemContent}>
                <Skeleton width="90%" height={20} className={styles.sideItemTitle} />
                <Skeleton width="50%" height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
