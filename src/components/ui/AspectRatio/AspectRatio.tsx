import * as React from 'react';
import { clsx } from 'clsx';
import styles from './AspectRatio.module.css';

export type AspectRatioPreset = '16/9' | '1/1' | '4/3' | '3/4' | '21/9';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | AspectRatioPreset;
  className?: string;
  children: React.ReactNode;
}

function resolveRatio(ratio: number | AspectRatioPreset): string {
  if (typeof ratio === 'number') {
    return `${ratio}`;
  }
  switch (ratio) {
    case '16/9':
      return '16 / 9';
    case '1/1':
      return '1 / 1';
    case '4/3':
      return '4 / 3';
    case '3/4':
      return '3 / 4';
    case '21/9':
      return '21 / 9';
    default:
      return '16 / 9';
  }
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = '16/9', className, style, children, ...props }, ref) => {
    const resolved = resolveRatio(ratio);

    return (
      <div
        ref={ref}
        className={clsx(styles.wrapper, className)}
        style={{ aspectRatio: resolved, ...style }}
        {...props}
      >
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';
