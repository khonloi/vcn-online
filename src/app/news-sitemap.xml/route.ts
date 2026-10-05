import { NextResponse } from 'next/server';
import { getNewsSitemapArticles } from '@/services/articles';
import { SITE_CONFIG } from '@/lib/constants';

export const revalidate = 900; // Revalidate news sitemap every 15 minutes

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const articles = await getNewsSitemapArticles({ revalidate: 900 });

  // Google News guidelines recommend inclusion of stories from past 48 hours
  const now = new Date().getTime();
  const twoDaysAgo = now - 48 * 60 * 60 * 1000;

  const recentArticles = articles.filter((art) => {
    const time = new Date(art.publishedAt || art._createdAt || 0).getTime();
    return time >= twoDaysAgo || articles.length <= 5; // keep at least latest if sparse
  });

  const xmlUrls = recentArticles
    .map((art) => {
      const pubDate = new Date(art.publishedAt || art._createdAt || now).toISOString();
      return `  <url>
    <loc>${baseUrl}/article/${escapeXml(art.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_CONFIG.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(art.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlUrls}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    },
  });
}
