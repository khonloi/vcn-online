export interface RssArticleItem {
  title: string;
  slug: string;
  summary?: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  _createdAt?: string;
}

export function generateRssFeed(
  articles: RssArticleItem[],
  siteUrl: string,
  buildDate = new Date()
): string {
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');

  const itemsXml = articles
    .map((article) => {
      const pubDate = new Date(
        article.publishedAt || article._createdAt || buildDate
      ).toUTCString();
      const articleUrl = `${cleanSiteUrl}/article/${article.slug}`;
      const title = article.title ? article.title.replace(/]]>/g, ']]&gt;') : 'Untitled';
      const summary = article.summary ? article.summary.replace(/]]>/g, ']]&gt;') : title;
      const category = article.category || 'News';
      const author = article.author || 'Vice City News Editorial Board';

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${summary}]]></description>
      <category><![CDATA[${category}]]></category>
      <dc:creator><![CDATA[${author}]]></dc:creator>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Vice City News | Breaking Business, Tech, &amp; Market Intelligence</title>
    <link>${cleanSiteUrl}</link>
    <description>Vice City News delivers breaking business news, financial analysis, executive strategy, and technology intelligence.</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${cleanSiteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;
}
