import * as React from 'react';
import { clsx } from 'clsx';
import type { MarketIndex } from '@/types';
import styles from './MarketTicker.module.css';

export interface MarketTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  indices: MarketIndex[];
  delayNotice?: string;
  className?: string;
}

export const MarketTicker = React.forwardRef<HTMLDivElement, MarketTickerProps>(
  (
    {
      indices,
      delayNotice = '15M DELAY',
      className,
      'aria-label': ariaLabel = 'Market Data (Indicative snapshot, 15-min delay)',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.ticker, className)}
        aria-label={ariaLabel}
        role="region"
        {...props}
      >
        {delayNotice && (
          <span className={styles.delayBadge} aria-hidden="true">
            {delayNotice}
          </span>
        )}
        <div className={styles.items}>
          {indices.map((idx) => {
            const isPos = idx.positive ?? !idx.change.startsWith('-');
            return (
              <div key={idx.name} className={styles.item}>
                <span className={styles.name}>{idx.name}</span>
                <span className={styles.value}>{idx.value}</span>
                <span
                  className={clsx(styles.change, isPos ? styles.positive : styles.negative)}
                  aria-label={`${idx.name} change: ${idx.change}`}
                >
                  {idx.change}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

MarketTicker.displayName = 'MarketTicker';
