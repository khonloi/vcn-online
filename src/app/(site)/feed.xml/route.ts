import { NextResponse } from 'next/server';
import { getLatestArticles } from '@/services/articles';
import { generateRssFeed } from '@/lib/rss';

export const revalidate = 900; // 15-minute ISR cache

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vcn-online.vercel.app';

  try {
    const articles = await getLatestArticles({ revalidate: 900 });
    const xml = generateRssFeed(articles, siteUrl);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=3600',
      },
    });
  } catch (err) {
    console.error('Failed to generate RSS feed:', err);
    // Return empty but valid RSS channel on fallback so syndicators do not hard error
    const fallbackXml = generateRssFeed([], siteUrl);
    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }
}
