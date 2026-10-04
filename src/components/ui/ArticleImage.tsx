import React from 'react';
import Image from 'next/image';
import styles from './ArticleImage.module.css';

export interface ArticleImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | 'custom';
  height?: number | string;
  width?: number | string;
  zoomOnHover?: boolean;
  className?: string;
  imageClassName?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  height,
  width,
  zoomOnHover = true,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}) => {
  const ratioClass = {
    '16/9': styles.ratio16x9,
    '4/3': styles.ratio4x3,
    '3/2': styles.ratio3x2,
    '1/1': styles.ratio1x1,
    custom: styles.ratioCustom,
  }[aspectRatio];

  const containerStyle: React.CSSProperties = {};
  if (height) containerStyle.height = typeof height === 'number' ? `${height}px` : height;
  if (width) containerStyle.width = typeof width === 'number' ? `${width}px` : width;

  const isPriority = priority || loading === 'eager';

  return (
    <div
      className={`${styles.imageContainer} ${ratioClass} ${zoomOnHover ? styles.zoomOnHover : ''} ${className}`.trim()}
      style={containerStyle}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={isPriority}
        className={`${styles.image} ${imageClassName}`.trim()}
      />
    </div>
  );
};

export default ArticleImage;
