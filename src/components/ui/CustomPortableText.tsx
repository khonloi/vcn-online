import { PortableText, PortableTextComponents } from '@portabletext/react';
import React from 'react';
import { ArticleImage } from '@/components/ui';
import { urlFor } from '@/sanity/lib/image';

interface CustomPortableTextProps {
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
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '4px solid var(--color-primary)',
          paddingLeft: 'var(--space-4)',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          margin: 'var(--space-6) 0',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          marginBottom: 'var(--space-5)',
          paddingLeft: 'var(--space-6)',
          listStyleType: 'disc',
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          marginBottom: 'var(--space-5)',
          paddingLeft: 'var(--space-6)',
          listStyleType: 'decimal',
        }}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rawHref = typeof value?.href === 'string' ? value.href.trim() : '';
      const isInternal = rawHref.startsWith('/');
      const isExternal = rawHref.startsWith('https://') || rawHref.startsWith('http://');
      const isContact = rawHref.startsWith('mailto:') || rawHref.startsWith('tel:');

      if (!rawHref || (!isInternal && !isExternal && !isContact)) {
        return <span>{children}</span>;
      }

      const rel = isExternal ? 'noreferrer noopener' : undefined;
      const target = isExternal ? '_blank' : undefined;
      return (
        <a
          href={rawHref}
          rel={rel}
          target={target}
          style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
        >
          {children}
        </a>
      );
    },
  },
};

export const CustomPortableText: React.FC<CustomPortableTextProps> = ({ value }) => {
  return (
    <div
      style={{
        fontFamily: 'var(--font-family-serif)',
        fontSize: '1.125rem',
        lineHeight: '1.75',
        color: 'var(--color-text-primary)',
      }}
    >
      <PortableText value={value} components={components} />
    </div>
  );
};
