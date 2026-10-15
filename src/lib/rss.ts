import { SITE_CONFIG } from '@/lib/constants';
import { wrapCdata, escapeXml } from '@/lib/xml';
import type { RssArticleItem } from '@/types';

export type { RssArticleItem };

export function generateRssFeed(
  articles: RssArticleItem[],
  siteUrl: string = SITE_CONFIG.url,
  buildDate = new Date()
): string {
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');

  const itemsXml = articles
    .map((article) => {
      const pubDate = new Date(
        article.publishedAt || article._createdAt || buildDate
      ).toUTCString();
      const articleUrl = `${cleanSiteUrl}/article/${article.slug}`;
      const title = article.title || 'Untitled';
      const summary = article.summary || title;
      const category = article.category || 'News';
      const author = article.author || SITE_CONFIG.editor;

      return `    <item>
      <title>${wrapCdata(title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${wrapCdata(summary)}</description>
      <category>${wrapCdata(category)}</category>
      <dc:creator>${wrapCdata(author)}</dc:creator>
    </item>`;
    })
    .join('\n');

  const channelTitle = `${SITE_CONFIG.name} | ${escapeXml(SITE_CONFIG.tagline)}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${channelTitle}</title>
    <link>${cleanSiteUrl}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${cleanSiteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;
}
