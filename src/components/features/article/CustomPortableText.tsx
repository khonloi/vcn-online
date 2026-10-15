import { PortableText, PortableTextComponents } from '@portabletext/react';
import React from 'react';
import { clsx } from 'clsx';
import { ArticleImage } from './ArticleImage';
import { urlFor } from '@/sanity/lib/image';
import styles from './CustomPortableText.module.css';

export interface CustomPortableTextProps {
  value: React.ComponentProps<typeof PortableText>['value'];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const altText = typeof value.alt === 'string' ? value.alt.trim() : '';
      return (
        <figure className={styles.figure}>
          <ArticleImage src={urlFor(value).url()} alt={altText} aspectRatio="16/9" />
          {value.caption && <figcaption className={styles.figcaption}>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className={clsx(styles.list, styles.bulletList)}>{children}</ul>,
    number: ({ children }) => <ol className={clsx(styles.list, styles.numberList)}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.listItem}>{children}</li>,
    number: ({ children }) => <li className={styles.listItem}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code className={styles.code}>{children}</code>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noindex nofollow noopener noreferrer' : undefined;
      return (
        <a href={value?.href} target={target} rel={rel} className={styles.link}>
          {children}
        </a>
      );
    },
  },
};

export function CustomPortableText({ value }: CustomPortableTextProps) {
  return <PortableText value={value} components={components} />;
}

export default CustomPortableText;
