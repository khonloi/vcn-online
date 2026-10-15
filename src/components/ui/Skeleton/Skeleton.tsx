import React from 'react';
import { clsx } from 'clsx';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  aspectRatio,
  variant = 'rectangular',
  className,
  style,
  ...props
}) => {
  const dynamicStyle: React.CSSProperties = { ...style };

  if (width !== undefined) {
    dynamicStyle.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    dynamicStyle.height = typeof height === 'number' ? `${height}px` : height;
  }
  if (aspectRatio) {
    dynamicStyle.aspectRatio = aspectRatio;
  }

  return (
    <div
      className={clsx(styles.skeleton, styles[variant], className)}
      style={dynamicStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

export default Skeleton;
