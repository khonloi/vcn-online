import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

import { SITE_CONFIG } from '@/lib/constants';

const siteTitle = `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: siteTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    SITE_CONFIG.name,
    'business news',
    'market intelligence',
    'technology news',
    'finance',
    'stock market',
    'cryptocurrency',
    'global economy',
    'artificial intelligence',
    'executive strategy',
  ],
  authors: [{ name: SITE_CONFIG.editor, url: '/' }],
  creator: SITE_CONFIG.publisher,
  publisher: SITE_CONFIG.publisher,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_CONFIG.name,
    title: siteTitle,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 675,
        alt: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: siteTitle,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
