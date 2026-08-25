import React from 'react';
import styles from './Grid.module.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  children: React.ReactNode;
}

export const Col: React.FC<ColProps> = ({
  span = 12,
  spanMd,
  spanLg,
  className = '',
  children,
  ...props
}) => {
  const spanClass = styles[`colSpan${span}`] || styles.colSpan12;
  const spanMdClass = spanMd ? styles[`colSpanMd${spanMd}`] : '';
  const spanLgClass = spanLg ? styles[`colSpanLg${spanLg}`] : '';

  const classes = [spanClass, spanMdClass, spanLgClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const GridComponent: React.FC<GridProps> = ({
  cols = 12,
  gap = 'md',
  className = '',
  children,
  ...props
}) => {
  const gridClass = styles[`grid${cols}`] || styles.grid12;
  const gapClass = {
    none: styles.gapNone,
    sm: styles.gapSm,
    md: styles.gapMd,
    lg: styles.gapLg,
    xl: styles.gapXl,
  }[gap];

  const classes = [styles.grid, gridClass, gapClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const Grid = Object.assign(GridComponent, {
  Col,
});

export default Grid;
