# Vice City News (`vcn-online`)

[![Next.js](https://img.shields.io/badge/next.js-v16.3-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-v19.2-blue.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.x-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Sanity CMS](https://img.shields.io/badge/cms-sanity%20v5-f03e2f.svg?style=flat-square&logo=sanity)](https://www.sanity.io/)
[![Styling: CSS Modules](https://img.shields.io/badge/styling-CSS%20Modules-4B32C3.svg?style=flat-square&logo=css3)](https://github.com/css-modules/css-modules)
[![Testing: Native & Playwright](https://img.shields.io/badge/testing-playwright%20%26%20node%20test-2EAD33.svg?style=flat-square&logo=playwright)](https://playwright.dev/)
[![Accessibility: WCAG 2.2 AA](https://img.shields.io/badge/a11y-axe--core%20WCAG%202.2%20AA-blueviolet.svg?style=flat-square)](https://www.deque.com/axe/)
[![Linter: ESLint](https://img.shields.io/badge/linter-eslint%209-4B32C3.svg?style=flat-square&logo=eslint)](https://eslint.org/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier)](https://prettier.io)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.x-brightgreen.svg?style=flat-square&logo=node.js)](https://nodejs.org/)

An enterprise-grade, high-performance, production-ready digital news and market intelligence publishing platform delivering breaking business, executive strategy, financial analysis, and technology coverage. Engineered with **Next.js 16 (App Router)**, **React 19**, **Sanity Studio v5**, **TypeScript** in strict mode, **Playwright**, **@axe-core/playwright**, and scoped **CSS Modules**.

---

## Table of Contents

- [Architectural Highlights](#architectural-highlights)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Prerequisites](#prerequisites)
- [Installation & Getting Started](#installation--getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Security & Networking Architecture](#security--networking-architecture)
  - [Content Security Policy & Edge Headers](#content-security-policy--edge-headers)
  - [Route Group Studio Origin Isolation](#route-group-studio-origin-isolation)
  - [Protocol Sanitization & Link Integrity](#protocol-sanitization--link-integrity)
  - [Fail-Fast Environment Validation](#fail-fast-environment-validation)
- [Performance & Data Architecture](#performance--data-architecture)
  - [Server Components & Lean Client Islands](#server-components--lean-client-islands)
  - [Request Memoization Pipeline (`cache()`)](#request-memoization-pipeline-cache)
  - [Incremental Static Regeneration (ISR) Lifecycle](#incremental-static-regeneration-isr-lifecycle)
  - [Local WebP Fallback Engine](#local-webp-fallback-engine)
- [Component & Design System Architecture](#component--design-system-architecture)
  - [Global Design Tokens & CSS Variables](#global-design-tokens--css-variables)
  - [Layout Component Hierarchy](#layout-component-hierarchy)
  - [Reusable UI Component Modules](#reusable-ui-component-modules)
  - [Editorial Pages & Dynamic Routes](#editorial-pages--dynamic-routes)
- [Editorial Workflow & CMS Integration](#editorial-workflow--cms-integration)
  - [Sanity Studio v5 Embedded Workspace](#sanity-studio-v5-embedded-workspace)
  - [Schema Validation & Guardrails](#schema-validation--guardrails)
  - [Automated Breaking News Decay Algorithm](#automated-breaking-news-decay-algorithm)
  - [GROQ Query Layer](#groq-query-layer)
- [Syndication, SEO & Accessibility](#syndication-seo--accessibility)
  - [Google News & Standard XML Sitemaps](#google-news--standard-xml-sitemaps)
  - [RSS 2.0 Syndication Feed (`/feed.xml`)](#rss-20-syndication-feed-feedxml)
  - [Structured Data & JSON-LD (NewsArticle, BreadcrumbList)](#structured-data--json-ld-newsarticle-breadcrumblist)
  - [WCAG 2.2 AA Accessibility Compliance](#wcag-22-aa-accessibility-compliance)
- [Enterprise UI Framework & Storybook Design System](#enterprise-ui-framework--storybook-design-system)
  - [Design Token Architecture](#design-token-architecture-srcstylestokenscss)
  - [Component Taxonomy](#component-taxonomy-srccomponentsui)
  - [Storybook Component Workshop](#storybook-component-workshop)
- [Testing & Quality Assurance](#testing--quality-assurance)
  - [Test Suite Highlights](#test-suite-highlights)
  - [Running Unit & E2E Tests](#running-unit--e2e-tests)
- [Observability, Telemetry & CI/CD](#observability-telemetry--cicd)
  - [Next.js Server Runtime Instrumentation](#nextjs-server-runtime-instrumentation)
  - [Real-User Core Web Vitals Beacon](#real-user-core-web-vitals-beacon)
  - [Continuous Integration Workflow (GitHub Actions)](#continuous-integration-workflow-github-actions)
- [Production Deployment & Process Management](#production-deployment--process-management)
  - [Optimized Production Build](#optimized-production-build)
  - [Vercel Deployment (Serverless / Edge)](#vercel-deployment-serverless--edge)
  - [Self-Hosted Standalone Runtime & PM2](#self-hosted-standalone-runtime--pm2)
- [License](#license)

---

## Architectural Highlights

- **Next.js 16 App Router & React 19 Foundation**:
  - Employs zero-runtime React Server Components (RSC) for maximum initial load performance, streaming HTML delivery, and instantaneous first-page paints.
  - Isolates client interactivity into small, focused Client Islands (`HeaderSearch`, `NavLinks`, `NewsletterForm`, `WebVitals`).
- **Route Group Architecture (`src/app/(site)` vs `src/app/studio`)**:
  - Reader-facing publication pages and administrative Sanity Studio live in completely isolated route groups.
  - Eliminates runtime overhead, layout hacks, and unnecessary DOM injection from the public reader experience.
- **Request Memoization & High-Speed ISR**:
  - Uses React 19 `cache()` memoization layer to deduplicate queries between page component rendering and `generateMetadata` lifecycle hooks.
  - Fine-grained Incremental Static Regeneration: 60-second revalidation for homepage/category indexes, 120 seconds for individual articles, and 900 seconds for sitemaps and RSS syndication.
- **Automated Breaking News Decay Algorithm**:
  - Eliminates stale breaking story alerts without requiring manual editorial intervention.
  - Query-level GROQ decay logic automatically demotes breaking articles back to standard chronological sorting once their `breakingUntil` threshold expires.
- **Strict Content-Security-Policy & Zero-Dependency Security**:
  - Custom Content Security Policy (CSP) defined in `next.config.ts` protecting against XSS and injection attacks without disabling static ISR caching.
  - Studio route exception allows necessary Sanity Studio CDN and worker domains without compromising the public publication perimeter.
- **Automated Multi-Channel Syndication**:
  - Full RSS 2.0 XML syndication feed at `/feed.xml` with Dublin Core metadata and 15-minute ISR.
  - Google News XML Sitemap at `/news-sitemap.xml` strictly conforming to Google News publishing specifications.
  - Standard multi-route XML Sitemap at `/sitemap.xml` indexing all categories, static institutional pages, and published articles.
- **Institutional E-E-A-T Compliance**:
  - Dedicated institutional pages establishing newsroom ownership, ethics, corrections, leadership, and legal privacy standards (`/about`, `/editorial-standards`, `/contact`, `/privacy`, `/terms`).
- **WCAG 2.2 AA Accessibility & Playwright Suite**:
  - Semantic HTML5 landmarks, visible skip-to-content focus links, accessible `<figure>` and `<figcaption>` imagery, and automated CI scans via `@axe-core/playwright`.

---

## Tech Stack

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (16.3+) | App Router, Server Components, Route Groups & Static Generation |
| **Runtime & UI** | [React 19](https://react.dev/) / React DOM | Server Components, Hooks, and React 19 `cache()` memoization |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (5.x) | Strict type safety, IntelliSense, and contract enforcement |
| **CMS Platform** | [Sanity v5](https://www.sanity.io/) (`next-sanity`) | Headless CMS, content lake, and embedded visual studio |
| **Rich Text Engine** | [@portabletext/react](https://github.com/portabletext/react-portabletext) | Accessible, structured Portable Text block rendering |
| **Styling & Tokens** | Vanilla CSS & Scoped CSS Modules | Zero-runtime CSS isolation with centralized design tokens (`tokens.css`) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (`@radix-ui/react-*`) | Unstyled, WCAG-compliant accessible headless primitives (`Dialog`, `DropdownMenu`, `Tabs`, `Slot`) |
| **Component Workshop** | [Storybook 10](https://storybook.js.org/) (`@storybook/nextjs-vite`) | Isolated component design system, documentation, and a11y testing |
| **Icons** | [Lucide Icons](https://lucide.dev/) (`lucide-react`) | Accessible, scalable SVG icon system |
| **Typography** | Inter & Merriweather (`next/font`) | Optimized zero-layout-shift local font rendering |
| **Unit Testing** | Node.js Native Test Runner via `tsx` | Ultra-fast TypeScript unit and link integrity test execution |
| **E2E Testing** | [Playwright](https://playwright.dev/) (1.63+) | Browser smoke tests across home, category, RSS, and 404 routes |
| **Accessibility** | [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm) | Automated WCAG 2.2 AA accessibility validation in CI |
| **Tooling & Linter** | [ESLint 9](https://eslint.org/) & [Prettier](https://prettier.io/) | Automated code standard enforcement and formatting |

---

## Project Directory Structure

```text
vcn-online/
├── .github/
│   ├── dependabot.yml              # Automated weekly security updates
│   └── workflows/ci.yml            # GitHub Actions CI matrix (audit, lint, test, build, e2e)
├── e2e/                            # End-to-end browser & accessibility test suites
│   ├── a11y.spec.ts                # Axe-core WCAG 2.2 AA automated scans
│   └── smoke.spec.ts               # Playwright browser smoke tests across public routes
├── public/                         # Static public assets
│   ├── images/
│   │   └── fallback-article.webp   # Optimized local branded fallback asset (12 KB)
│   �├── public/                         # Static public assets
│   ├── images/
│   │   └── fallback-article.webp   # Optimized local branded fallback asset (12 KB)
│   └── og-image.jpg                # Compressed social card image (112 KB)
├── src/
│   ├── actions/                    # Pure Next.js Server Actions (decoupled from routing)
│   │   ├── newsletter.ts           # Newsletter subscription server action with email validation
│   │   └── index.ts                # Actions barrel export
│   ├── app/                        # Next.js App Router (PAGES & ROUTES ONLY)
│   │   ├── (site)/                 # Public reader-facing route group
│   │   │   ├── [category]/         # Dynamic category article feeds
│   │   │   │   ├── category.module.css # Scoped category layout styling
│   │   │   │   └── page.tsx        # Server Component category feed with pagination
│   │   │   ├── about/              # Institutional About Us & newsroom mission
│   │   │   │   └── page.tsx
│   │   │   ├── article/[slug]/     # NewsArticle detail page with JSON-LD
│   │   │   │   ├── article.module.css  # Editorial article typography & layout
│   │   │   │   └── page.tsx        # Memoized article reader with JSON-LD schema
│   │   │   ├── contact/            # Newsroom contact, press inquiries, and news tips
│   │   │   │   └── page.tsx
│   │   │   ├── editorial-standards/# E-E-A-T editorial policies, ethics & corrections
│   │   │   │   └── page.tsx
│   │   │   ├── feed.xml/           # RSS 2.0 XML syndication feed
│   │   │   │   └── route.ts        # 15-minute ISR syndication route handler
│   │   │   ├── privacy/            # Reader Privacy Policy
│   │   │   │   └── page.tsx
│   │   │   ├── terms/              # Terms of Service
│   │   │   │   └── page.tsx
│   │   │   ├── error.tsx           # Reader route error boundary
│   │   │   ├── layout.tsx          # Public SiteLayout (Header, Footer, WebVitals)
│   │   │   ├── loading.tsx         # Route transition skeleton loader
│   │   │   ├── not-found.tsx       # Public 404 page with search redirection
│   │   │   ├── page.module.css     # Homepage editorial grid styling
│   │   │   └── page.tsx            # Main publication homepage
│   │   ├── news-sitemap.xml/       # Google News XML sitemap endpoint
│   │   │   └── route.ts
│   │   ├── studio/[[...tool]]/     # Isolated Sanity Studio workspace
│   │   │   └── page.tsx
│   │   ├── layout.tsx              # Root HTML wrapper with fonts & meta
│   │   ├── not-found.tsx           # Global fallback 404 page
│   │   ├── robots.ts               # Automated robots.txt generator
│   │   └── sitemap.ts              # Native multi-route dynamic XML sitemap
│   ├── components/
│   │   ├── analytics/              # Telemetry & performance observers
│   │   │   └── WebVitals.tsx       # Core Web Vitals beacon reporter island
│   │   ├── features/               # High-cohesion domain feature modules
│   │   │   ├── article/            # Newsroom article rendering & interaction
│   │   │   │   ├── ArticleActions.tsx     # Web Share API & clipboard trigger
│   │   │   │   ├── ArticleCard.tsx        # Multi-variant editorial article card
│   │   │   │   ├── ArticleCard.module.css # Card variant styles
│   │   │   │   ├── ArticleImage.tsx       # Next/Image aspect-ratio wrapper
│   │   │   │   ├── ArticleImage.module.css# Image container styles
│   │   │   │   ├── CustomPortableText.tsx # Rich text serializer with <figure>
│   │   │   │   └── index.ts
│   │   │   ├── editorial/          # Newsroom editorial branding
│   │   │   │   ├── SectionTitle.tsx       # Section headline with kicker & action link
│   │   │   │   ├── SectionTitle.module.css# Heading styles
│   │   │   │   └── index.ts
│   │   │   ├── newsletter/         # Circulation & subscriber acquisition
│   │   │   │   ├── NewsletterForm.tsx     # Action-driven subscription island
│   │   │   │   ├── NewsletterForm.module.css# Scoped newsletter styles
│   │   │   │   └── index.ts
│   │   │   ├── search/             # Editorial search & topic discovery
│   │   │   │   ├── HeaderSearch.tsx       # Search client island for masthead
│   │   │   │   ├── SearchInput.tsx        # Accessible search input field
│   │   │   │   ├── SearchInput.module.css # Search field styles
│   │   │   │   └── index.ts
│   │   │   └── index.ts            # Features barrel export
│   │   ├── layout/                 # Layout structural components
│   │   │   ├── CurrentDateTime.tsx # Hydration-safe live date island
│   │   │   ├── Footer.tsx          # Server Component publication footer
│   │   │   ├── Footer.module.css   # Footer styling
│   │   │   ├── Header.tsx          # Server Component masthead & navigation
│   │   │   ├── Header.module.css   # Masthead styling
│   │   │   └── NavLinks.tsx        # Active category indicator client island
│   │   └── ui/                     # Pure Design System Primitives (Domain-agnostic)
│   │       ├── Button/             # Co-located: Button.tsx, Button.module.css, Button.stories.tsx, index.ts
│   │       ├── Checkbox/           # Co-located: Checkbox.tsx, Checkbox.module.css, Checkbox.stories.tsx, index.ts
│   │       ├── Container/          # Co-located: Container.tsx, Container.module.css, Container.stories.tsx, index.ts
│   │       ├── Dialog/             # Co-located: Dialog.tsx, Dialog.module.css, Dialog.stories.tsx, index.ts
│   │       ├── DropdownMenu/       # Co-located: DropdownMenu.tsx, DropdownMenu.module.css, DropdownMenu.stories.tsx, index.ts
│   │       ├── Flex/               # Co-located: Flex.tsx, Flex.module.css, Flex.stories.tsx, index.ts
│   │       ├── Grid/               # Co-located: Grid.tsx, Grid.module.css, Grid.stories.tsx, index.ts
│   │       ├── Heading/            # Co-located: Heading.tsx, Heading.module.css, Heading.stories.tsx, index.ts
│   │       ├── Input/              # Co-located: Input.tsx, Input.module.css, Input.stories.tsx, index.ts
│   │       ├── Label/              # Co-located: Label.tsx, Label.module.css, Label.stories.tsx, index.ts
│   │       ├── Tabs/               # Co-located: Tabs.tsx, Tabs.module.css, Tabs.stories.tsx, index.ts
│   │       ├── Text/               # Co-located: Text.tsx, Text.module.css, Text.stories.tsx, index.ts
│   │       └── index.ts            # Design System primitives barrel export
│   ├── instrumentation.ts          # Server error logging hook (onRequestError)
│   ├── lib/                        # Shared utilities and pure helpers
│   │   ├── __tests__/              # High-speed unit tests (Node.js test runner)
│   │   │   ├── formatters.test.ts  # Date, breaking decay, and image alt tests
│   │   │   ├── links.test.ts       # Link integrity and newsletter action tests
│   │   │   └── rss.test.ts         # RSS 2.0 XML compliance unit tests
│   │   ├── constants.ts            # Category taxonomies and navigation structures
│   │   ├── formatters.ts           # Date formatting and card schema mapping
│   │   └── rss.ts                  # Pure RSS 2.0 XML feed generator
│   ├── sanity/                     # Headless CMS integration layer
│   │   ├── lib/
│   │   │   ├── client.ts           # Sanity CDN client configuration
│   │   │   ├── image.ts            # Dynamic image asset builder
│   │   │   └── queries.ts          # High-performance GROQ query definitions
│   │   ├── schemaTypes/            # Sanity Studio document schemas
│   │   │   ├── article.ts          # Article schema with strict field validation
│   │   │   ├── author.ts           # Author / journalist biography schema
│   │   │   ├── category.ts         # Content taxonomy category schema
│   │   │   └── index.ts            # Combined schema array
│   │   ├── env.ts                  # Fail-fast Sanity environment configuration
│   │   └── structure.ts            # Custom Studio desk structure
│   ├── services/                   # Data Access Layer (DAL) / Domain Services
│   │   ├── __tests__/              # Service unit tests
│   │   │   └── categories.test.ts  # Category service validation tests
│   │   ├── articles.ts             # Cached article queries (React cache() + ISR)
│   │   ├── categories.ts           # Category taxonomy and title helpers
│   │   └── index.ts                # Services barrel export
│   ├── stories/                    # Storybook 10 visual component stories
│   │   ├── ArticleCard.stories.tsx # Storybook story for article cards
│   │   ├── Button.stories.tsx      # Button variants and states
│   │   ├── Dialog.stories.tsx      # Modal dialog interactions
│   │   ├── DropdownMenu.stories.tsx# Menu keyboard navigation
│   │   ├── Forms.stories.tsx       # Inputs, labels, and checkboxes
│   │   ├── Heading.stories.tsx     # Typography scales
│   │   ├── Layout.stories.tsx      # Flex, Grid, and Container utilities
│   │   ├── SearchInput.stories.tsx # Search input states
│   │   ├── SectionTitle.stories.tsx# Editorial section dividers
│   │   ├── Tabs.stories.tsx        # Radix tabs interaction
│   │   └── Text.stories.tsx        # Body text styling
│   ├── styles/                     # Design tokens and global CSS
│   │   ├── globals.css             # Base resets, typography, and utility classes
│   │   ├── static-page.module.css  # Shared styling for institutional E-E-A-T pages
│   │   └── tokens.css              # Centralized CSS Custom Properties design system
│   └── types/                      # Centralized TypeScript domain contracts
│       ├── article.ts              # RawSanityArticle, ArticleDetail, Card & Sitemap types
│       ├── category.ts             # CategoryConfig, MarketIndex
│       ├── navigation.ts           # StaticPageConfig, TrendingTopicConfig, BreadcrumbItem
│       ├── newsletter.ts           # NewsletterState
│       └── index.ts                # Types barrel export��── queries.ts          # High-performance GROQ query definitions
│   │   ├── schemaTypes/            # Sanity Studio document schemas
│   │   │   ├── article.ts          # Article schema with strict field validation
│   │   │   ├── author.ts           # Author / journalist biography schema
│   │   │   ├── category.ts         # Content taxonomy category schema
│   │   │   └── index.ts            # Combined schema array
│   │   ├── env.ts                  # Fail-fast Sanity environment configuration
│   │   └── structure.ts            # Custom Studio desk structure
│   └── styles/                     # Design tokens and global CSS
│       ├── globals.css             # Base resets, typography, and utility classes
│       ├── static-page.module.css  # Shared styling for institutional E-E-A-T pages
│       └── tokens.css              # Centralized CSS Custom Properties design system
├── .nvmrc                          # Node.js version declaration (`20`)
├── .prettierignore                 # Prettier exclusion patterns
├── .prettierrc                     # Prettier formatting rules
├── next.config.ts                  # Next.js compiler, CSP headers, and image origins
├── package.json                    # Manifest, dependencies, and execution scripts
├── playwright.config.ts            # Playwright E2E configuration
├── sanity.config.ts                # Sanity Studio runtime configuration
└── tsconfig.json                   # Strict TypeScript compiler configuration
```

---

## Prerequisites

Ensure your local development environment meets the following specifications:

- **Node.js**: `v20.9.0` or higher (`v20.x` LTS recommended, configured via `.nvmrc`)
- **Package Manager**: [npm](https://www.npmjs.com/) (`v10.x` or higher)
- **Sanity Lake**: Connected Sanity project dataset (fallback IDs provided for preview/dev mode).

---

## Installation & Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/khonloi/vcn-online.git
cd vcn-online
```

### 2. Install Dependencies

Using `npm`:

```bash
npm install
```

### 3. Setup Environment Variables

Create your local `.env.local` configuration file:

```bash
# Canonical site URL (used for canonical tags, sitemaps, and RSS generation)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity Studio & API Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=42t78ag6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-13

# Optional: Telemetry & Monitoring Endpoints
# NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://telemetry.yourdomain.com/vitals
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be accessible at:
[http://localhost:3000](http://localhost:3000)

The administrative Sanity Studio is accessible at:
[http://localhost:3000/studio](http://localhost:3000/studio)

---

## Environment Configuration

| Variable | Required | Default | Description | Example |
| :--- | :---: | :---: | :--- | :--- |
| `NODE_ENV` | No | `development` | Runtime environment (`development`, `production`, `test`) | `production` |
| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` | Canonical site origin for metadata, OpenGraph, sitemaps, and RSS | `https://vcnews.online` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | `42t78ag6` | Sanity Cloud project identifier | `42t78ag6` |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | `production` | Sanity target dataset name | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | `2024-02-13` | Sanity Content Lake API version | `2024-02-13` |
| `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | No | *undefined* | Remote beacon URL for Core Web Vitals telemetry | `https://telemetry.vcnews.online/vitals` |

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **dev** | `npm run dev` | Launches the Next.js App Router development server with Turbopack. |
| **build** | `npm run build` | Compiles and optimizes the full publication application for production. |
| **start** | `npm run start` | Boots the compiled production server locally on port 3000. |
| **lint** | `npm run lint` | Runs ESLint 9 to detect syntax, type, and code-style irregularities. |
| **typecheck** | `npm run typecheck` | Validates TypeScript types across the entire project (`tsc --noEmit`). |
| **test** | `npm test` | Runs the high-speed unit test suite via Node's native test runner. |
| **test:e2e** | `npm run test:e2e` | Runs Playwright browser smoke and axe-core accessibility tests. |
| **format** | `npm run format` | Automatically formats all TypeScript and CSS files via Prettier. |
| **format:check** | `npm run format:check` | Verifies codebase formatting conforms to `.prettierrc`. |

---

## Security & Networking Architecture

### Content Security Policy & Edge Headers

Security headers are enforced at the HTTP response edge via `next.config.ts`:

```
+--------------------------------------------------------------+
| HTTP Response Edge (next.config.ts)                          |
+--------------------------------------------------------------+
| - Content-Security-Policy (Strict CSP with Studio exception) |
| - Strict-Transport-Security (max-age=63072000; preload)      |
| - X-Content-Type-Options: nosniff                            |
| - X-Frame-Options: SAMEORIGIN                                |
| - Referrer-Policy: strict-origin-when-cross-origin           |
| - Permissions-Policy: camera=(), microphone=(), geo=()       |
+--------------------------------------------------------------+
```

- **Content-Security-Policy**: Enforces strict origin control over scripts, styles, connections, and images without disabling static ISR page caching.
- **Studio Origin Exception**: `/studio/:path*` permits Sanity API lakes (`*.sanity.io`), CDNs (`cdn.sanity.io`), and inline web workers required by the CMS studio.

---

### Route Group Studio Origin Isolation

Administrative and reader-facing routes are split at the directory level using Next.js App Router route groups:

```
src/app/
├── (site)/                  <-- Public reader perimeter
│   ├── layout.tsx           <-- Injects Masthead Header, Navigation, Footer, WebVitals
│   ├── [category]/
│   └── article/[slug]/
└── studio/                  <-- Isolated CMS Perimeter
    └── [[...tool]]/page.tsx <-- Clean mount, no reader Header/Footer DOM interference
```

This prevents any leaking of editorial administrative code, cookies, or UI layouts into public search engine indexing passes.

---

### Protocol Sanitization & Link Integrity

All external and internal URLs pass through protocol verification in `src/lib/constants.ts` and automated unit tests in `src/lib/__tests__/links.test.ts`:
- Rejects dangerous pseudo-protocols (`javascript:`, `vbscript:`, `data:`).
- Confirms zero public links reference administrative `/studio` routes or deprecated placeholders.

---

### Fail-Fast Environment Validation

`src/sanity/env.ts` enforces non-blocking development defaults (`production`, `42t78ag6`) while triggering early build warnings if critical variables are omitted in CI or production pipelines, preventing silent runtime failures.

---

## Performance & Data Architecture

```
                                  +------------------------------+
                                  |     VCN Rendering Pipeline   |
                                  +------------------------------+
                                                 |
                   +-----------------------------+-----------------------------+
                   |                                                           |
                   v                                                           v
       +-----------------------+                                   +-----------------------+
       | React Server Component|                                   |  Client Island (SSR)  |
       |  (Zero Runtime JS)    |                                   |  (Hydrated on Demand) |
       +-----------------------+                                   +-----------------------+
       | - Header (Masthead)   |                                   | - HeaderSearch (DOM)  |
       | - Footer (Directory)  |                                   | - NavLinks (Active)   |
       | - Article Page Body   |                                   | - NewsletterForm      |
       | - Category Feeds      |                                   | - WebVitals (Beacon)  |
       +-----------------------+                                   +-----------------------+
                   |
                   v
       +-----------------------+
       |  Request Memoization  |
       |     React cache()     |
       +-----------------------+
       | Deduplicates:         |
       | 1. generateMetadata() |
       | 2. Page Component     |
       +-----------------------+
```

### Server Components & Lean Client Islands

The site architecture aggressively minimizes client bundle weight:
- **`Header.tsx`** and **`Footer.tsx`** are 100% Server Components.
- Only interactive DOM controls are hydrated as Client Islands (`HeaderSearch.tsx`, `NavLinks.tsx`, `NewsletterForm.tsx`).
- Overall client-side JavaScript is reduced to industry-leading lightweight footprints.

---

### Request Memoization Pipeline (`cache()`)

Article fetching in `src/app/(site)/article/[slug]/page.tsx` is wrapped in React 19's `cache()`:

```typescript
// Memoized query eliminates duplicate roundtrips
const getArticle = cache(async (slug: string) => {
  return client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
});
```

When Next.js executes `generateMetadata({ params })` and subsequently renders `ArticlePage({ params })`, only **one** roundtrip query is dispatched to the Sanity API lake.

---

### Incremental Static Regeneration (ISR) Lifecycle

| Route Pattern | Revalidation Interval | Purpose |
| :--- | :---: | :--- |
| `/` (Homepage) | `60s` | Ensures breaking news and top stories update within 1 minute |
| `/[category]` | `60s` | Keeps category feeds fresh and aligned with editorial changes |
| `/article/[slug]` | `120s` | High-cache ratio for published stories with fast update propagation |
| `/feed.xml` | `900s` (15m) | Lowers CDN costs while providing rapid syndication to RSS aggregators |
| `/news-sitemap.xml` | `900s` (15m) | Fresh indexing window for Google News crawlers |
| `/sitemap.xml` | `900s` (15m) | Efficient indexing of entire publication corpus |

---

### Local WebP Fallback Engine

Third-party placeholder services (`picsum.photos`) have been entirely eliminated:
- Local branded, compressed asset: `public/images/fallback-article.webp` (**12 KB**).
- Social share card: `public/og-image.jpg` compressed from 776 KB to **112 KB**.
- Zero external image request dependencies for missing article imagery.

---

## Component & Design System Architecture

### Global Design Tokens & CSS Variables

Tokens are declared in `src/styles/tokens.css` and imported globally:

| Category | CSS Variable | Value / Description |
| :--- | :--- | :--- |
| **Typography** | `--font-serif` | Merriweather (editorial headline and article body typeface) |
| **Typography** | `--font-sans` | Inter (modern, legible UI interface typography) |
| **Brand Colors** | `--color-primary` | Deep Corporate Navy `#0a192f` |
| **Accents** | `--color-accent` | Vivid Financial Blue `#1d4ed8` |
| **Alerts** | `--color-breaking` | Urgent Crimson `#dc2626` (breaking news banner) |
| **Neutrals** | `--color-bg-subtle` | Soft Newsprint `#f8fafc` |
| **Borders** | `--color-border` | Subtle Divider Line `#e2e8f0` |
| **Transitions**| `--transition-fast` | `0.15s ease-in-out` |

---

### Layout Component Hierarchy

- **Root Layout (`src/app/layout.tsx`)**: Declares HTML lang, fonts, global metadata, OpenGraph, Twitter cards, and RSS alternate links.
- **Site Layout (`src/app/(site)/layout.tsx`)**:
  - `Header`: Masthead banner, current live date/time, category navigation, and search toggle.
  - `<main id="main">`: Semantic landmark containing reader page views.
  - `Footer`: Multi-column directory, newsletter form, institutional links, and copyright.
  - `WebVitals`: Non-visual client island capturing Core Web Vitals telemetry.

---

### Reusable UI Component Modules

| Component | Path | Description |
| :--- | :--- | :--- |
| `ArticleCard` | `src/components/ui/ArticleCard` | Editorial card supporting featured, compact, and horizontal variants. |
| `ArticleImage` | `src/components/ui/ArticleImage` | Next/Image wrapper handling Sanity CDN URLs and WebP fallbacks. |
| `CustomPortableText` | `src/components/ui/CustomPortableText` | Rich text serializer mapping blocks to semantic `<figure>`, `<blockquote>`, etc. |
| `Button` | `src/components/ui/Button` | Accessible button supporting primary, secondary, and outline variants. |
| `Grid` | `src/components/ui/Grid` | Responsive CSS Grid container with fluid column configuration. |
| `SectionTitle` | `src/components/ui/SectionTitle` | Section divider with styled border and uppercase label. |
| `SearchInput` | `src/components/ui/SearchInput` | Search input field with keyboard shortcuts and clear action. |

---

### Editorial Pages & Dynamic Routes

| Route | Render Mode | Description |
| :--- | :---: | :--- |
| `/` | Static (ISR 60s) | Main publication front page with breaking news and editorial sections. |
| `/[category]` | Dynamic (ISR 60s) | Category feed page (Markets, Tech, Finance, Crypto) with `[0...24]` pagination. |
| `/article/[slug]` | Dynamic (ISR 120s) | Full news story with JSON-LD schema, author bio, and portable text body. |
| `/about` | Prerendered Static | Newsroom background, editorial mission, and leadership information. |
| `/editorial-standards`| Prerendered Static | E-E-A-T editorial standards, ethics guidelines, and correction policy. |
| `/contact` | Prerendered Static | Press inquiries, newsroom contacts, and confidential tip instructions. |
| `/privacy` | Prerendered Static | Reader Privacy Policy compliant with modern privacy frameworks. |
| `/terms` | Prerendered Static | Reader Terms of Service and content copyright guidelines. |
| `/feed.xml` | Route Handler (ISR 900s) | RSS 2.0 Syndication XML feed. |
| `/news-sitemap.xml` | Route Handler (ISR 900s) | Compliant Google News XML sitemap. |
| `/sitemap.xml` | Dynamic Sitemaps | Native Next.js dynamic XML sitemap indexing the site corpus. |

---

## Editorial Workflow & CMS Integration

### Sanity Studio v5 Embedded Workspace

Sanity Studio is embedded directly at `/studio`:
- Fully customizable desk structure in `src/sanity/structure.ts`.
- Content Lake real-time preview and document authoring.

---

### Schema Validation & Guardrails

The schema definition in `src/sanity/schemaTypes/article.ts` enforces high editorial standards:

```typescript
// Strict validation prevents publishing incomplete news stories
defineField({
  name: 'title',
  title: 'Headline',
  type: 'string',
  validation: (Rule) => Rule.required().min(10).max(120),
}),
defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: { source: 'title' },
  validation: (Rule) => Rule.required(),
}),
defineField({
  name: 'summary',
  title: 'Summary',
  type: 'text',
  validation: (Rule) =>
    Rule.max(250).warning('Summaries longer than 250 characters may truncate on mobile cards.'),
}),
defineField({
  name: 'breakingUntil',
  title: 'Breaking Status Expiration',
  type: 'datetime',
  description: 'Optional timestamp after which the story automatically reverts to standard chronological sorting.',
})
```

---

### Automated Breaking News Decay Algorithm

In `src/sanity/lib/queries.ts`, all article queries implement real-time decaying:

```groq
order(
  select(isBreaking && (!defined(breakingUntil) || dateTime(breakingUntil) > dateTime(now())) => 1, 0) desc,
  coalesce(publishedAt, _updatedAt, _createdAt) desc
)
```

1. If `isBreaking == true` and `breakingUntil` is in the future, the article receives priority ranking `1`.
2. As soon as `dateTime(breakingUntil) <= dateTime(now())`, the ranking drops to `0`.
3. The article immediately flows into natural chronological publication order without editors having to uncheck flags.

---

### GROQ Query Layer

| Query | Path | Description |
| :--- | :--- | :--- |
| `HOME_ARTICLES_QUERY` | `src/sanity/lib/queries.ts` | Fetches prioritized articles with image alt, author, and category fields. |
| `ARTICLES_BY_CATEGORY_QUERY` | `src/sanity/lib/queries.ts` | Bounded `[0...24]` paginated feed for category archives. |
| `ARTICLE_BY_SLUG_QUERY` | `src/sanity/lib/queries.ts` | Fetches full article record, body portable text, author, and image captions. |
| `LATEST_ARTICLES_QUERY` | `src/sanity/lib/queries.ts` | Top 20 latest articles powering the RSS syndication feed. |

---

## Syndication, SEO & Accessibility

### Google News & Standard XML Sitemaps

- **`/news-sitemap.xml`**: Filtered strictly to articles published within the last 48 hours per Google News indexing rules, including `<news:publication>` and `<news:publication_date>`.
- **`/sitemap.xml`**: Indexes all core categories, institutional static pages, and published article URLs with `lastModified` timestamps.

---

### RSS 2.0 Syndication Feed (`/feed.xml`)

Syndicates content to RSS aggregators (Feedly, Flipboard, Apple News):
- Uses pure generator `generateRssFeed()` in `src/lib/rss.ts`.
- Encapsulates content in `<![CDATA[ ... ]]>` blocks with `xmlns:dc="http://purl.org/dc/elements/1.1/"` Dublin Core tags.
- Cached at the edge with `s-maxage=900, stale-while-revalidate=3600`.

---

### Structured Data & JSON-LD (NewsArticle, BreadcrumbList)

Every article page (`/article/[slug]`) injects valid schema.org JSON-LD:
- **`NewsArticle`**: Declares `headline`, `image`, `datePublished`, `dateModified`, `author` (`Person`), and `publisher` (`NewsMediaOrganization`).
- **`BreadcrumbList`**: Declares hierarchical breadcrumb trail (`Home > Category > Article Headline`).

---

### WCAG 2.2 AA Accessibility Compliance

- **Landmarks & Skip Link**: `#main` target container with visible keyboard skip-to-content focus action.
- **Accessible Figures**: Portable text images output semantic `<figure>` elements with descriptive `<figcaption>` captions and non-empty `alt` text.
- **Automated CI Enforcement**: Verified against `@axe-core/playwright` across home, category, institutional, and 404 routes.

---

## Enterprise UI Framework & Storybook Design System

The VCN UI Framework implements a **Headless + Scoped CSS Modules** architecture designed for maximum runtime speed, strict WCAG 2.2 AA accessibility, and developer productivity.

### Design Token Architecture (`src/styles/tokens.css`)

All colors, typography, elevations, and layout constraints are driven by centralized CSS custom properties:
- **Calibrated Contrast**: `--color-primary` (`#d60060`) and `--color-text-muted` (`#555e66`) calibrated to exceed the 4.5:1 WCAG AA contrast ratio threshold across both light and dark themes.
- **Semantic Feedback System**: Full status token sets for success, warning, error, and info states.
- **Z-Index Hierarchy**: Predictable layering tokens (`--z-dropdown: 1000`, `--z-modal-backdrop: 1300`, `--z-modal: 1400`, etc.).
- **Accessible Focus Tokens**: Standardized `--color-focus-ring`, `--focus-ring-offset`, and `--focus-ring-width`.

### Component Taxonomy (`src/components/ui/`)

| Classification | Components | Capabilities |
| :--- | :--- | :--- |
| **Actions** | `Button` | Polymorphic `asChild` (Radix `Slot`), variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`), sizes (`sm`, `md`, `lg`), `href` fallback |
| **Typography** | `Heading`, `Text` | Polymorphic elements (`h1`-`h6`, `p`, `span`, `time`), modular scale sizes, weights, semantic color mapping |
| **Layout** | `Container`, `Flex`, `Stack`, `Grid` | Responsive max-widths (`sm`, `md`, `lg`, `fluid`), directional alignment, gap scales (`gap={1}` through `gap={16}`) |
| **Form Controls** | `Input`, `Label`, `Checkbox` | Accessible keyboard navigation, error states (`aria-invalid`), adornments, custom check indicators |
| **Interactive Overlays** | `Dialog`, `DropdownMenu`, `Tabs` | Built on unstyled Radix UI primitives (`@radix-ui/react-*`) with full WAI-ARIA compliance, focus trapping, and animations |

### Storybook Component Workshop

Storybook 10 provides isolated component development and automated visual verification:

```bash
# Launch interactive Storybook workshop on http://localhost:6006
npm run storybook

# Build static Storybook production bundle (storybook-static)
npm run build-storybook
```

---

## Testing & Quality Assurance

### Test Suite Highlights

| Test Suite | File | Tests | Coverage Scope |
| :--- | :--- | :---: | :--- |
| **Formatters & Date** | `src/lib/__tests__/formatters.test.ts` | 3 | Date formatting, "Just now" fallback, invalid input resilience |
| **Breaking News Decay**| `src/lib/__tests__/formatters.test.ts` | 4 | Real-time decay threshold calculation, future/past time boundaries |
| **Sanity Card Mapping**| `src/lib/__tests__/formatters.test.ts` | 2 | Card model normalization, image alt priority, local WebP fallback |
| **Taxonomy Integrity** | `src/lib/__tests__/links.test.ts` | 2 | Valid category names, paths, and core market coverage |
| **Protocol Security**  | `src/lib/__tests__/links.test.ts` | 2 | Permits safe URLs; blocks `javascript:` pseudo-protocols |
| **Navigation & Links** | `src/lib/__tests__/links.test.ts` | 4 | No dead links; zero public `/studio` references; trending mapping |
| **Newsletter Action**  | `src/lib/__tests__/links.test.ts` | 3 | Server action validation, email format regex, success states |
| **RSS 2.0 Generation** | `src/lib/__tests__/rss.test.ts` | 3 | XML root format, Dublin Core tags, CDATA protection, item mapping |
| **Playwright Smoke**   | `e2e/smoke.spec.ts` | 5 | Home, category feeds, RSS XML, static pages, and 404 page |
| **Axe Accessibility**  | `e2e/a11y.spec.ts` | 3 | Automated WCAG 2.2 AA scan on home, editorial standards, and 404 |

### Running Unit & E2E Tests

```bash
# Execute unit test suite (23 tests across 8 suites)
npm test

# Run Playwright browser smoke and axe-core accessibility tests
npm run test:e2e
```

---

## Observability, Telemetry & CI/CD

### Next.js Server Runtime Instrumentation

`src/instrumentation.ts` implements Next.js 16's `onRequestError` hook:
- Captures uncaught server exceptions, route context, HTTP methods, and request paths.
- Emits structured JSON logs in production ready for ingest by Sentry, Datadog, or AWS CloudWatch.

---

### Real-User Core Web Vitals Beacon

`src/components/analytics/WebVitals.tsx` monitors real-user metrics:
- Captures **LCP** (Largest Contentful Paint), **FID** (First Input Delay), **CLS** (Cumulative Layout Shift), **INP** (Interaction to Next Paint), and **TTFB** (Time to First Byte).
- Non-blocking transmission via `navigator.sendBeacon()` when `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is configured.

---

### Continuous Integration Workflow (GitHub Actions)

`.github/workflows/ci.yml` runs on every pull request and push to `master`:

```
[Push / Pull Request]
          |
          v
   +--------------+
   |   Validate   |
   +--------------+
   | 1. npm ci
   | 2. npm audit (--audit-level=critical)
   | 3. npm run format:check (Prettier)
   | 4. npx tsc --noEmit (Typecheck)
   | 5. npm run lint (ESLint 9)
   | 6. npm test (Unit Tests)
   | 7. npm run build (Next.js Turbopack)
   +--------------+
          |
          v (needs: validate)
   +--------------+
   |     E2E      |
   +--------------+
   | 1. npx playwright install chromium
   | 2. npm run build
   | 3. npm run test:e2e (Playwright + Axe WCAG 2.2 AA)
   | 4. Upload Playwright Report artifact
   +--------------+
```

---

## Production Deployment & Process Management

### Optimized Production Build

To compile and optimize the publication for production:

```bash
npm run build
```

Build verification produces an optimized `.next` bundle with 14 statically prerendered routes:

```text
Route (app)               Revalidate  Expire
┌ ○ /                             1m      1y
├ ○ /_not-found
├ ƒ /[category]
├ ○ /about
├ ƒ /article/[slug]
├ ○ /contact
├ ○ /editorial-standards
├ ○ /feed.xml                    15m      1y
├ ○ /news-sitemap.xml            15m      1y
├ ○ /privacy
├ ○ /robots.txt
├ ○ /sitemap.xml
├ ○ /studio/[[...tool]]
└ ○ /terms

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

To run the compiled bundle locally:

```bash
npm run start
```

---

### Vercel Deployment (Serverless / Edge)

This project is tailored for instant deployment on [Vercel](https://vercel.com):

1. Import repository into Vercel.
2. Configure Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: Production publication domain (e.g. `https://vcnews.online`).
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity Project ID (`42t78ag6`).
   - `NEXT_PUBLIC_SANITY_DATASET`: Target dataset (`production`).
3. Deploy. Incremental Static Regeneration, edge caching, and security headers are automatically provisioned.

---

### Self-Hosted Standalone Runtime & PM2

For deployment to private cloud instances (AWS EC2, DigitalOcean, Hetzner):

```bash
# 1. Build production release
npm run build

# 2. Launch with PM2 cluster mode
pm2 start npm --name "vcn-online" -- start

# 3. Save process state
pm2 save
```

---

## License

Copyright © 2026 Vice City News Media Inc. All rights reserved.
