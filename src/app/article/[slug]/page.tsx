import React from 'react';
import Link from 'next/link';
import { SectionTitle, ArticleImage, Button } from '@/components/ui';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <article className="container" style={{ maxWidth: '820px', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-16)' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-bold)' }}>
        <Link href="/" style={{ color: 'var(--color-text-muted)' }}>
          Home
        </Link>
        <span style={{ color: 'var(--color-border)' }}>/</span>
        <Link href="/tech" style={{ color: 'var(--color-primary)' }}>
          Tech
        </Link>
        <span style={{ color: 'var(--color-border)' }}>/</span>
        <span style={{ color: 'var(--color-text-muted)' }}>Analysis</span>
      </div>

      {/* Article Header */}
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <span style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wide)' }}>
          EXCLUSIVE REPORT
        </span>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-black)', lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tighter)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          {formattedTitle || 'Inside the $100 Billion AI Infrastructure Race: Tech Giants Secure Sovereign Energy Corridors'}
        </h1>

        {/* Byline & Timestamp */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'var(--space-3) 0', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
          <div>
            By <strong style={{ color: 'var(--color-text-primary)' }}>Alistair Barr</strong> and <strong style={{ color: 'var(--color-text-primary)' }}>Kali Hays</strong>
          </div>
          <div>
            <time dateTime="2026-08-25">Aug 25, 2026, 9:45 AM GMT+7</time>
          </div>
        </div>
      </header>

      {/* Key Takeaways Box (Signature BI element) */}
      <div style={{ backgroundColor: 'var(--color-surface-subtle)', borderLeft: '4px solid var(--color-primary)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontFamily: 'var(--font-family-headline)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-black)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wide)', marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)' }}>
          Key Takeaways
        </h3>
        <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', listStyleType: 'disc' }}>
          <li>Hyperscale AI clusters are requiring unprecedented power capacities, leading to direct long-term partnerships with utility and nuclear operators.</li>
          <li>Capital expenditures for data center infrastructure are projected to exceed traditional silicon compute by 2027.</li>
          <li>Sovereign wealth funds in Europe, the Middle East, and Asia are bidding aggressively for regional AI hubs.</li>
        </ul>
      </div>

      {/* Main Image */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <ArticleImage
          src="https://picsum.photos/seed/articlemain/900/506"
          alt={formattedTitle}
          aspectRatio="16/9"
        />
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)', fontStyle: 'italic' }}>
          Advanced AI server racks and specialized liquid cooling manifolds in a next-generation compute facility. (Photo: Getty Images / Vice City News)
        </p>
      </div>

      {/* Article Body (Serif Editorial Typography) */}
      <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--color-text-primary)' }}>
        <p style={{ marginBottom: 'var(--space-5)' }}>
          The race for artificial intelligence supremacy is no longer strictly bound by GPU wafer allocations or mathematical algorithm optimization. Today, the frontier has pivoted toward gigawatts, cooling infrastructure, and geopolitical energy security.
        </p>
        <p style={{ marginBottom: 'var(--space-5)' }}>
          Over the past six months, leadership at major cloud operators and venture-backed AI labs have engaged in high-stakes negotiations across North America, Europe, and Asia. The goal: lock down dedicated power generation assets before global utility bottlenecks stall their deployment schedules.
        </p>
        <p style={{ marginBottom: 'var(--space-5)' }}>
          &ldquo;Compute without power is just expensive metal in a warehouse,&rdquo; said one senior infrastructure executive who spoke on the condition of anonymity. &ldquo;The companies that control the energy corridors will dictate the pace of frontier model training for the rest of the decade.&rdquo;
        </p>
      </div>

      {/* Footer / Share Actions */}
      <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: '2px solid var(--color-border-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <Button variant="outline" size="sm" href="/">
          &larr; Back to Top Stories
        </Button>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="ghost" size="sm">Share</Button>
          <Button variant="secondary" size="sm">Save Article</Button>
        </div>
      </div>
    </article>
  );
}
