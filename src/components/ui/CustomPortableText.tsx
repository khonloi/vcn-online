import { PortableText, PortableTextComponents } from '@portabletext/react';
import React from 'react';
import { ArticleImage } from '@/components/ui';
import { urlFor } from '@/sanity/lib/image';

interface CustomPortableTextProps {
  value: any;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div style={{ margin: 'var(--space-6) 0' }}>
          <ArticleImage
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            aspectRatio="16/9"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p style={{ marginBottom: 'var(--space-5)' }}>{children}</p>,
    h2: ({ children }) => <h2 style={{ fontFamily: 'var(--font-family-headline)', fontSize: 'var(--font-size-2xl)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-weight-black)' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontFamily: 'var(--font-family-headline)', fontSize: 'var(--font-size-xl)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-weight-bold)' }}>{children}</h3>,
    blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)', fontStyle: 'italic', color: 'var(--color-text-secondary)', margin: 'var(--space-6) 0' }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul style={{ marginBottom: 'var(--space-5)', paddingLeft: 'var(--space-6)', listStyleType: 'disc' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ marginBottom: 'var(--space-5)', paddingLeft: 'var(--space-6)', listStyleType: 'decimal' }}>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={value.href} rel={rel} target={target} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
          {children}
        </a>
      );
    },
  },
};

export const CustomPortableText: React.FC<CustomPortableTextProps> = ({ value }) => {
  return (
    <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--color-text-primary)' }}>
      <PortableText value={value} components={components} />
    </div>
  );
};
