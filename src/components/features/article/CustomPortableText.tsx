import { PortableText, PortableTextComponents } from '@portabletext/react';
import React from 'react';
import { ArticleImage } from './ArticleImage';
import { urlFor } from '@/sanity/lib/image';

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
        <figure style={{ margin: 'var(--space-6) 0' }}>
          <ArticleImage src={urlFor(value).url()} alt={altText} aspectRatio="16/9" />
          {value.caption && (
            <figcaption
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                marginTop: 'var(--space-2)',
                fontStyle: 'italic',
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => <p style={{ marginBottom: 'var(--space-5)' }}>{children}</p>,
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: 'var(--font-family-headline)',
          fontSize: 'var(--font-size-2xl)',
          marginTop: 'var(--space-8)',
          marginBottom: 'var(--space-4)',
          fontWeight: 'var(--font-weight-black)',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: 'var(--font-family-headline)',
          fontSize: 'var(--font-size-xl)',
          marginTop: 'var(--space-6)',
          marginBottom: 'var(--space-3)',
          fontWeight: 'var(--font-weight-bold)',
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontFamily: 'var(--font-family-headline)',
          fontSize: 'var(--font-size-lg)',
          marginTop: 'var(--space-5)',
          marginBottom: 'var(--space-2)',
          fontWeight: 'var(--font-weight-bold)',
        }}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '4px solid var(--color-primary)',
          paddingLeft: 'var(--space-4)',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          margin: 'var(--space-6) 0',
          fontSize: 'var(--font-size-lg)',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: 'var(--space-2)' }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: 'var(--space-2)' }}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 'var(--font-weight-bold)' }}>{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code
        style={{
          backgroundColor: 'var(--color-surface-subtle)',
          padding: '2px 4px',
          borderRadius: '2px',
          fontFamily: 'var(--font-family-mono)',
          fontSize: '0.9em',
        }}
      >
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noindex nofollow noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          style={{
            color: 'var(--color-primary)',
            textDecoration: 'underline',
          }}
        >
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
