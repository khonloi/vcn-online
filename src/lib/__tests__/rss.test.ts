import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateRssFeed } from '../rss';

describe('RSS Feed Generation', () => {
  const dummyArticles = [
    {
      title: 'Global Tech Giants Announce AI Consortium',
      slug: 'global-tech-giants-announce-ai-consortium',
      summary: 'Tech leaders unite to establish open AI standards.',
      category: 'Technology',
      author: 'Jane Doe',
      publishedAt: '2026-03-15T12:00:00.000Z',
    },
    {
      title: 'Market Rally Follows Fed Decision',
      slug: 'market-rally-follows-fed-decision',
      summary: 'Markets surged 300 points after interest rate pause.',
      category: 'Markets',
      author: 'John Smith',
      publishedAt: '2026-03-14T10:30:00.000Z',
    },
  ];

  it('generates valid RSS 2.0 XML with required channel nodes', () => {
    const xml = generateRssFeed(
      dummyArticles,
      'https://vcn-online.vercel.app',
      new Date('2026-03-16T00:00:00Z')
    );

    assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
    assert.ok(xml.includes('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"'));
    assert.ok(
      xml.includes(
        '<title>Vice City News | Breaking Business, Tech, &amp; Market Intelligence</title>'
      )
    );
    assert.ok(xml.includes('<link>https://vcn-online.vercel.app</link>'));
    assert.ok(
      xml.includes(
        '<atom:link href="https://vcn-online.vercel.app/feed.xml" rel="self" type="application/rss+xml"/>'
      )
    );
    assert.ok(xml.includes('<lastBuildDate>Mon, 16 Mar 2026 00:00:00 GMT</lastBuildDate>'));
  });

  it('renders individual items with full metadata and permalinks', () => {
    const xml = generateRssFeed(dummyArticles, 'https://vcn-online.vercel.app');

    assert.ok(xml.includes('<title><![CDATA[Global Tech Giants Announce AI Consortium]]></title>'));
    assert.ok(
      xml.includes(
        '<link>https://vcn-online.vercel.app/article/global-tech-giants-announce-ai-consortium</link>'
      )
    );
    assert.ok(
      xml.includes(
        '<guid isPermaLink="true">https://vcn-online.vercel.app/article/global-tech-giants-announce-ai-consortium</guid>'
      )
    );
    assert.ok(xml.includes('<category><![CDATA[Technology]]></category>'));
    assert.ok(xml.includes('<dc:creator><![CDATA[Jane Doe]]></dc:creator>'));
    assert.ok(xml.includes('<pubDate>Sun, 15 Mar 2026 12:00:00 GMT</pubDate>'));
  });

  it('safely handles missing optional fields', () => {
    const sparseArticle = [
      {
        title: 'Minimal Story',
        slug: 'minimal-story',
      },
    ];

    const xml = generateRssFeed(sparseArticle, 'https://vcn-online.vercel.app');
    assert.ok(xml.includes('<title><![CDATA[Minimal Story]]></title>'));
    assert.ok(xml.includes('<category><![CDATA[News]]></category>'));
    assert.ok(xml.includes('<dc:creator><![CDATA[Vice City News Editorial Board]]></dc:creator>'));
  });
});
