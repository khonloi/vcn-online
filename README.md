# Vice City News (`vcn-online`)

A high-performance, modern digital news and market intelligence publishing platform built with **Next.js 15 (App Router)**, **React 19**, and **Sanity Studio v5**.

Designed and engineered to tier-1 digital news publishing standards for performance, security, SEO, and WCAG 2.2 AA accessibility.

---

## Key Architectural Highlights

- **Route Group Architecture (`src/app/(site)` & `src/app/studio`)**: Public reader-facing pages and editorial studio are cleanly isolated into distinct route groups. Public layouts, headers, and footers never mount inside the editorial studio.
- **Server Components & Client Islands**: Header and Footer are zero-runtime Server Components; interactive behaviors (search expander, navigation active state, newsletter submission) are isolated into lightweight client islands.
- **Request Memoization & High-Speed ISR**: Repeated Sanity queries within single rendering passes (such as metadata generation and article page rendering) are memoized with React `cache()`. Incremental Static Regeneration is configured with 60s homepage/category revalidation, 120s article revalidation, and 900s sitemap/RSS syndication.
- **Automated Breaking News Decay**: Breaking news stories automatically revert to chronological order once their configured `breakingUntil` timestamp expires, preventing stale breaking banners without editorial intervention.
- **Syndication & SEO**: Full support for Google News XML Sitemaps (`/news-sitemap.xml`), standard XML Sitemaps (`/sitemap.xml`), RSS 2.0 Syndication (`/feed.xml`), and schema.org JSON-LD (`NewsArticle`, `Organization`, `WebSite`).
- **WCAG 2.2 AA Accessibility**: Skip links, landmark navigation, accessible form controls, semantic `<figure>` and `<figcaption>` imagery, and automated CI scans via `@axe-core/playwright`.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Runtime / UI | [React 19](https://react.dev/) |
| CMS | [Sanity v5](https://www.sanity.io/) (`next-sanity`, embedded studio) |
| Styling | Modern CSS Modules, CSS Custom Properties (`src/styles/tokens.css`) |
| Fonts | `next/font` (Inter for UI, Merriweather for editorial copy) |
| Testing | Node.js Native Test Runner (`tsx --test`), [Playwright](https://playwright.dev/) E2E, [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) |
| Code Hygiene | ESLint 9, Prettier 3 |

---

## Getting Started

### Prerequisites

- **Node.js**: `>=20.9.0` (managed via `.nvmrc`)
- **npm**: `>=10.0.0`

### 1. Clone & Install

```bash
git clone https://github.com/khonloi/vcn-online.git
cd vcn-online
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Public domain URL (used for canonical links, sitemaps, and RSS)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity Studio & API Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=42t78ag6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-13

# Optional: Sanity Read/Preview Token for draft mode
# SANITY_API_READ_TOKEN=
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the publication.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server with hot reload |
| `npm run build` | Builds the optimized production application with Turbopack |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint 9 across all codebase files |
| `npm run typecheck` | Validates TypeScript types across the project (`tsc --noEmit`) |
| `npm test` | Runs fast unit test suite with Node's native test runner via `tsx` |
| `npm run test:e2e` | Runs Playwright browser smoke and axe-core accessibility tests |
| `npm run format` | Automatically formats all TypeScript and CSS files via Prettier |
| `npm run format:check` | Verifies code formatting conforms to `.prettierrc` |

---

## Project Structure

```
vcn-online/
├── .github/
│   ├── dependabot.yml              # Weekly automated dependency audits
│   └── workflows/ci.yml            # CI: audit, format, typecheck, lint, unit, build, e2e
├── e2e/
│   ├── smoke.spec.ts               # Playwright browser smoke tests
│   └── a11y.spec.ts                # Axe-core WCAG 2.2 AA automated scans
├── public/
│   ├── images/fallback-article.webp# Optimized zero-external fallback asset (12 KB)
│   └── og-image.jpg                # Compressed social card image (112 KB)
├── src/
│   ├── app/
│   │   ├── (site)/                 # Public reader-facing route group
│   │   │   ├── [category]/         # Category feed with pagination
│   │   │   ├── about/              # Institutional About Us page
│   │   │   ├── article/[slug]/     # NewsArticle page with JSON-LD & memoized cache
│   │   │   ├── contact/            # Newsroom contact & tips
│   │   │   ├── editorial-standards/# E-E-A-T editorial policies & corrections
│   │   │   ├── feed.xml/           # RSS 2.0 Syndication route handler
│   │   │   ├── privacy/            # Privacy Policy
│   │   │   ├── terms/              # Terms of Service
│   │   │   └── layout.tsx          # Public SiteLayout (Header, Footer, WebVitals)
│   │   ├── actions/                # Server Actions (newsletter subscription)
│   │   ├── news-sitemap.xml/       # Google News XML sitemap route handler
│   │   ├── studio/                 # Isolated Sanity Studio administration
│   │   ├── layout.tsx              # Root HTML wrapper with fonts & metadata
│   │   ├── not-found.tsx           # Global 404 page
│   │   ├── robots.ts               # Robots.txt handler
│   │   └── sitemap.ts              # Standard XML sitemap generator
│   ├── components/
│   │   ├── analytics/WebVitals.tsx # Real user Core Web Vitals telemetry island
│   │   ├── layout/                 # Header, Footer, NavLinks, HeaderSearch
│   │   └── ui/                     # ArticleCard, PortableText, Button, Grid
│   ├── instrumentation.ts          # Server error logging hook (onRequestError)
│   ├── lib/                        # Formatters, taxonomy constants, RSS generator
│   ├── sanity/                     # Schemas, client, image builder, queries
│   └── styles/                     # CSS design tokens & global stylesheets
├── next.config.ts                  # CSP headers, image remote patterns, webpack config
├── playwright.config.ts            # Playwright E2E configuration
└── tsconfig.json
```

---

## Editorial Workflow & Schema Rules

The Sanity schema in `src/sanity/schemaTypes/article.ts` enforces newsroom data integrity:
- **Mandatory Fields**: Title, slug, author, category, publication date, and main image.
- **Accessibility Guarantee**: Main images and inline body images require non-empty descriptive `alt` text before publication.
- **Breaking News Expiration**: The optional `breakingUntil` datetime field sets an automatic expiration on breaking news priority flags.
- **Summary Length Guard**: The summary field warns editors if copy exceeds 250 characters to ensure consistent card heights and meta descriptions.

---

## Security Architecture

- **Content Security Policy (CSP)**: Configured in `next.config.ts` without breaking static ISR pages.
- **Origin Isolation**: Sanity Studio runs under `/studio` outside the public reader site layout.
- **Vulnerability Audits**: Automated `npm audit --audit-level=critical` runs on every pull request and push to `master`.

---

## License

Copyright © 2026 Vice City News Media Inc. All rights reserved.
