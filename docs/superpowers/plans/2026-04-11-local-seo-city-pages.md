# Local SEO City Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a data-driven local SEO page system and ship the first city (Escondido) with a hub page + two service combo pages, structured data, and sitemap integration. Remaining 7 cities are added in a follow-up pass as copy is written.

**Architecture:** One dynamic route `src/app/[locationSlug]/page.tsx` handles all 24 planned URLs (24 = 8 cities × 3 page types). A single `page.tsx` dispatches to `CityHubPage` or `CityServicePage` based on parsed slug shape. Content lives in plain TypeScript files under `src/lib/local-seo/content/`, typed by `CityContent` so missing fields are caught at build time. Metadata comes from a sibling `layout.tsx` via `generateMetadata` to preserve the existing `'use client'` page pattern. Next.js App Router matches static routes before dynamic routes, so the root-level `[locationSlug]` segment does not interfere with existing pages like `/about`, `/contact`, `/services`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Mantine v8, framer-motion, `MetadataRoute.Sitemap`.

**Spec reference:** `docs/superpowers/specs/2026-04-11-local-seo-city-pages-design.md`

**Testing note:** This project has no automated test framework. Verification per task is `npm run build`, `npm run lint`, and manual checks in `npm run dev`. Each task includes explicit verification steps.

**Copy note:** This plan ships Escondido with genuine city-specific starter copy (real neighborhoods, real industries). Copy is short enough to review in under 10 minutes and long enough to rank. Before final merge, a human should read the copy for voice/accuracy. Remaining 7 cities are added in a follow-up pass — this plan does not block on content for those cities.

---

## File Structure

| File | Purpose | Task |
|---|---|---|
| `src/lib/local-seo/types.ts` | **New.** TypeScript interfaces: `FAQ`, `HubPageContent`, `ServicePageContent`, `CityContent`, `ParsedLocationSlug` | 1 |
| `src/lib/local-seo/cities.ts` | **New.** Registry of all 8 cities' static metadata (slug, displayName, neighborhoods, population) | 2 |
| `src/lib/local-seo/index.ts` | **New.** Helpers: `parseLocationSlug`, `getAllLocationSlugs`, `getCityContent` | 3 |
| `src/lib/local-seo/content/escondido.ts` | **New.** Full Escondido content (hub, webDesign, seoServices) with real local copy | 4 |
| `src/components/local-seo/LocalBusinessSchema.tsx` | **New.** `LocalBusiness` JSON-LD `<script>` emitter | 5 |
| `src/components/local-seo/ServiceSchema.tsx` | **New.** `Service` JSON-LD emitter | 5 |
| `src/components/local-seo/BreadcrumbSchema.tsx` | **New.** `BreadcrumbList` JSON-LD emitter | 5 |
| `src/components/local-seo/index.ts` | **New.** Barrel export | 5 |
| `src/components/local-seo/CityHubPage.tsx` | **New.** Client component rendering a hub page from `HubPageContent` + `CityContent` | 6 |
| `src/components/local-seo/CityServicePage.tsx` | **New.** Client component rendering a service combo page from `ServicePageContent` + `CityContent` | 7 |
| `src/app/[locationSlug]/page.tsx` | **New.** Dynamic route dispatcher. `generateStaticParams` + `dynamicParams = false` | 8 |
| `src/app/[locationSlug]/layout.tsx` | **New.** Per-slug `generateMetadata` (title, description, OG, canonical) | 8 |
| `src/app/[locationSlug]/not-found.tsx` | **New.** 404 page for the route group | 8 |
| `src/app/sitemap.ts` | **Modify.** Import `getAllLocationSlugs`/`parseLocationSlug`, append city pages | 9 |
| `src/app/service-areas/page.tsx` | **Modify.** Add a new "Dedicated City Pages" section with 8 cards | 10 |

---

## Task 1: Create types file

**Files:**
- Create: `src/lib/local-seo/types.ts`

- [ ] **Step 1: Create the types file**

Create `src/lib/local-seo/types.ts` with:

```ts
export type FAQ = {
  question: string;
  answer: string;
};

export type Industry = {
  name: string;
  description: string;
};

export type LocalCaseStudy = {
  title: string;
  summary: string;
  href?: string;
};

export type HubPageContent = {
  title: string;
  metaDescription: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  localIntro: string[];
  localAngle: {
    kind: 'case-study' | 'industry-spotlight' | 'why-local';
    heading: string;
    body: string;
  };
};

export type ServicePageContent = {
  title: string;
  metaDescription: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  localIntro: string[];
  industries: Industry[];
  caseStudy?: LocalCaseStudy;
  faq: FAQ[];
};

export type CityContent = {
  slug: string;
  displayName: string;
  county: 'North County San Diego';
  population: number;
  neighborhoods: string[];
  hub: HubPageContent;
  webDesign: ServicePageContent;
  seoServices: ServicePageContent;
};

export type ParsedLocationSlug =
  | { kind: 'hub'; citySlug: string }
  | { kind: 'web-design'; citySlug: string }
  | { kind: 'seo-services'; citySlug: string };
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors from the new file. (Existing pre-existing errors, if any, are out of scope.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/local-seo/types.ts
git commit -m "feat(local-seo): add types for city content"
```

---

## Task 2: Create city registry

**Files:**
- Create: `src/lib/local-seo/cities.ts`

- [ ] **Step 1: Create the registry**

Create `src/lib/local-seo/cities.ts` with:

```ts
// City metadata registry. Used by helpers and components that don't need full page content.
// Full per-city content lives in src/lib/local-seo/content/{citySlug}.ts.

export type CityRegistryEntry = {
  slug: string;            // URL slug, e.g. 'escondido'
  displayName: string;     // 'Escondido'
  population: number;
  isHQ: boolean;
  shortDescription: string; // one-line used on /service-areas cards
};

export const NORTH_COUNTY_CITIES: readonly CityRegistryEntry[] = [
  {
    slug: 'escondido',
    displayName: 'Escondido',
    population: 151625,
    isHQ: true,
    shortDescription:
      'Our home base. Priority service for Escondido businesses from Grand Avenue to the wine country.',
  },
  {
    slug: 'carlsbad',
    displayName: 'Carlsbad',
    population: 114935,
    isHQ: false,
    shortDescription:
      'Modern websites for Carlsbad\u2019s thriving business community \u2014 from Village boutiques to Palomar Airport Road tech firms.',
  },
  {
    slug: 'oceanside',
    displayName: 'Oceanside',
    population: 174068,
    isHQ: false,
    shortDescription:
      'Coastal North County\u2019s largest city. Websites built for tourism, restaurants, and service businesses.',
  },
  {
    slug: 'san-marcos',
    displayName: 'San Marcos',
    population: 94833,
    isHQ: false,
    shortDescription:
      'Serving San Marcos businesses from restaurants on Grand Avenue to tech startups near Cal State San Marcos.',
  },
  {
    slug: 'vista',
    displayName: 'Vista',
    population: 98381,
    isHQ: false,
    shortDescription:
      'Websites and local SEO for Vista\u2019s small business community \u2014 restaurants, home services, and retail.',
  },
  {
    slug: 'encinitas',
    displayName: 'Encinitas',
    population: 61588,
    isHQ: false,
    shortDescription:
      'Premium web design for Encinitas boutiques, wellness studios, and surf-inspired brands along the 101.',
  },
  {
    slug: 'poway',
    displayName: 'Poway',
    population: 48841,
    isHQ: false,
    shortDescription:
      'Professional websites and local SEO for Poway service businesses, from home services to medical practices.',
  },
  {
    slug: 'rancho-bernardo',
    displayName: 'Rancho Bernardo',
    population: 46563,
    isHQ: false,
    shortDescription:
      'Enterprise-quality websites for Rancho Bernardo corporate, tech, and professional service firms.',
  },
];

export function getCityRegistryEntry(slug: string): CityRegistryEntry | undefined {
  return NORTH_COUNTY_CITIES.find((c) => c.slug === slug);
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/local-seo/cities.ts
git commit -m "feat(local-seo): add North County city registry"
```

---

## Task 3: Create library helpers

**Files:**
- Create: `src/lib/local-seo/index.ts`

Context: Only cities that have a full content file should be routable. Escondido is the only one in phase 1. The helpers must reject other city slugs cleanly so phase 2 can add them by dropping in a content file and updating a single registry line.

- [ ] **Step 1: Create the index**

Create `src/lib/local-seo/index.ts` with:

```ts
import type { CityContent, ParsedLocationSlug } from './types';
import { NORTH_COUNTY_CITIES, getCityRegistryEntry } from './cities';
import { escondidoContent } from './content/escondido';

export * from './types';
export * from './cities';

// Registry of cities that have a content file and are routable.
// Add a new city here AFTER creating its content file under ./content/.
const CITY_CONTENT_REGISTRY: Record<string, CityContent> = {
  escondido: escondidoContent,
};

export function getCityContent(slug: string): CityContent | undefined {
  return CITY_CONTENT_REGISTRY[slug];
}

export function getRoutableCitySlugs(): string[] {
  return Object.keys(CITY_CONTENT_REGISTRY);
}

/**
 * Returns the full list of routable slugs across all page types:
 * - `{city}` (hub)
 * - `{city}-web-design`
 * - `{city}-seo-services`
 */
export function getAllLocationSlugs(): string[] {
  const slugs: string[] = [];
  for (const citySlug of getRoutableCitySlugs()) {
    slugs.push(citySlug);
    slugs.push(`${citySlug}-web-design`);
    slugs.push(`${citySlug}-seo-services`);
  }
  return slugs;
}

/**
 * Parses a location URL slug into its components. Returns null if the slug
 * is not a recognized city page.
 *
 * Matching is anchored against known city slugs to avoid false positives
 * when a city slug itself contains a hyphen (e.g. 'rancho-bernardo').
 */
export function parseLocationSlug(slug: string): ParsedLocationSlug | null {
  const citySlugs = getRoutableCitySlugs().sort((a, b) => b.length - a.length);

  for (const citySlug of citySlugs) {
    if (slug === citySlug) {
      return { kind: 'hub', citySlug };
    }
    if (slug === `${citySlug}-web-design`) {
      return { kind: 'web-design', citySlug };
    }
    if (slug === `${citySlug}-seo-services`) {
      return { kind: 'seo-services', citySlug };
    }
  }
  return null;
}

export { getCityRegistryEntry, NORTH_COUNTY_CITIES };
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

Expected: Error on import of `./content/escondido` (file doesn't exist yet). This is expected — Task 4 creates that file.

**Do NOT commit yet.** The next task creates the missing file.

---

## Task 4: Create Escondido content file

**Files:**
- Create: `src/lib/local-seo/content/escondido.ts`

This task produces the genuine city-specific copy. It's the biggest task by word count. Review the copy when you're done — it should sound like Lucid, and every neighborhood/landmark reference should be accurate.

- [ ] **Step 1: Create the Escondido content file**

Create `src/lib/local-seo/content/escondido.ts` with:

```ts
import type { CityContent } from '../types';

export const escondidoContent: CityContent = {
  slug: 'escondido',
  displayName: 'Escondido',
  county: 'North County San Diego',
  population: 151625,
  neighborhoods: [
    'Grand Avenue',
    'Old Escondido Historic District',
    'Felicita',
    'Del Dios',
    'Kit Carson Park area',
    'South Centre City',
    'North Broadway',
  ],

  hub: {
    title: 'Web Design & SEO in Escondido | Lucid Web Studios',
    metaDescription:
      'Local Escondido web design and SEO agency. Based on Grand Avenue, serving restaurants, breweries, and service businesses across Escondido with modern Next.js sites and local search optimization.',
    ogTitle: 'Lucid Web Studios \u2014 Escondido Web Design & SEO',
    heroHeadline: 'Web Design & SEO in Escondido',
    heroSubheadline:
      'Modern, fast websites and local search optimization for Escondido businesses. Headquartered right here on Grand Avenue.',
    localIntro: [
      'Lucid Web Studios is headquartered in Escondido. We build websites and run local SEO for the restaurants, breweries, wineries, auto shops, and service businesses that actually live and work in the 760. If you can drop by Grand Avenue for a coffee and a whiteboard, we can probably get your new site launched before you finish your second one.',
      'Unlike out-of-town agencies that treat Escondido as a footnote, we know the difference between a customer driving in from Rancho Bernardo versus a tourist heading up to Stone Brewing or the wineries out in Valley Center. That local context shapes how we design your site and how we target your search traffic \u2014 right down to which neighborhoods we build content around.',
      'From the Old Escondido historic district to the wine country east of town, we work with Escondido businesses that want a website they\u2019re proud to hand out on a business card.',
    ],
    localAngle: {
      kind: 'why-local',
      heading: 'Why working with a local Escondido studio matters',
      body: 'Local means in-person kickoffs at a Grand Avenue cafe. It means we\u2019ve actually eaten at the restaurants we\u2019re designing sites for. It means faster turnaround, because we\u2019re in the same time zone and usually within a 10-minute drive. And it means your Google Business Profile and local citations are managed by somebody who knows the difference between 92025 and 92029.',
    },
  },

  webDesign: {
    title: 'Escondido Web Design | Modern Websites That Rank | Lucid',
    metaDescription:
      'Escondido web design built on Next.js and React. Local web designer serving Grand Avenue businesses, breweries, restaurants, auto shops, and service companies across Escondido and North County San Diego.',
    ogTitle: 'Escondido Web Design \u2014 Lucid Web Studios',
    heroHeadline: 'Escondido Web Design',
    heroSubheadline:
      'Fast, modern websites for Escondido businesses. Built on Next.js. Owned by you.',
    localIntro: [
      'Most Escondido businesses are stuck on a WordPress site somebody\u2019s cousin built in 2016 or a Wix template that looks exactly like three other restaurants on Grand Avenue. We build something different: a custom website on Next.js and React, the same stack Netflix and Notion use, tuned for the specific way your Escondido customers actually search and scroll.',
      'Our Escondido clients come from all over the city \u2014 downtown Grand Avenue shops, industrial services off Auto Park Way, breweries and wineries on the east side, and healthcare practices near Palomar Medical Center. Every project starts with a free in-person discovery meeting (we\u2019ll come to you) and ends with a site you own outright, source code and all.',
    ],
    industries: [
      {
        name: 'Restaurants, Breweries & Wineries',
        description:
          'Menu-driven sites with online ordering, reservation integration, and photography that makes people drive over from Rancho Bernardo on a Friday night.',
      },
      {
        name: 'Auto & Home Services',
        description:
          'Lead-focused sites for Escondido auto shops, HVAC, plumbing, landscaping, and contractors \u2014 with Google-ready schema and quote forms that actually convert.',
      },
      {
        name: 'Healthcare & Professional Services',
        description:
          'HIPAA-aware sites for Escondido medical practices, dental offices, law firms, and financial advisors, with secure forms and appointment booking.',
      },
      {
        name: 'Retail & Grand Avenue Shops',
        description:
          'Storefront sites and Shopify builds for Grand Avenue boutiques, galleries, and specialty retailers.',
      },
    ],
    caseStudy: {
      title: 'From template to custom',
      summary:
        'We regularly replace slow, dated WordPress and Wix sites for Escondido businesses with custom Next.js builds. Typical wins: 4\u20138x faster load times, full Lighthouse scores, and meaningful lifts in local search rankings within the first 90 days.',
      href: '/case-studies',
    },
    faq: [
      {
        question: 'Do you actually work out of Escondido?',
        answer:
          'Yes. We\u2019re headquartered here, not a fly-by-night contractor with a 760 number. We can meet in person on Grand Avenue, at your office, or anywhere in North County.',
      },
      {
        question: 'How long does an Escondido web design project take?',
        answer:
          'Most small-business sites launch in 4\u20138 weeks from kickoff. Larger e-commerce and custom builds run 8\u201312 weeks. We\u2019ll give you a concrete timeline at the free discovery meeting.',
      },
      {
        question: 'Will my Escondido site rank in local search?',
        answer:
          'Every site we build ships with clean semantic HTML, fast load times, structured data, and optimized metadata \u2014 the technical foundation of local SEO. If you also want active Google Business Profile management and local citation work, see our Escondido SEO services page.',
      },
      {
        question: 'How much does web design cost in Escondido?',
        answer:
          'Most of our Escondido small-business projects land in the mid four figures to low five figures depending on scope. We quote fixed pricing upfront. Check the pricing page for ballpark numbers, or book a free consultation for a concrete quote.',
      },
      {
        question: 'Do I own my website when it\u2019s done?',
        answer:
          'Yes. You get full source code ownership, a GitHub repo, and a Vercel deployment you control. No proprietary lock-in. If you ever want to leave us, you can walk away with everything.',
      },
    ],
  },

  seoServices: {
    title: 'Escondido SEO Services | Local Search Optimization | Lucid',
    metaDescription:
      'Escondido SEO services for restaurants, breweries, home services, and local businesses. Google Business Profile management, local citations, and technical SEO from a local Escondido studio.',
    ogTitle: 'Escondido SEO Services \u2014 Lucid Web Studios',
    heroHeadline: 'Escondido SEO Services',
    heroSubheadline:
      'Rank in Escondido search results. Local SEO, Google Business Profile management, and technical SEO from a studio based on Grand Avenue.',
    localIntro: [
      'If you own an Escondido business, most of your new customers are typing "pizza near me", "mechanic in Escondido", or "wedding venue 92025" into Google on their phone. The businesses that show up in the top three map results and the organic listings below them are capturing that traffic. Everybody else is invisible.',
      'Our Escondido SEO services are built around how local search actually works in 2026: Google Business Profile optimization, consistent local citations, schema.org structured data, review generation, and content that targets the specific queries Escondido customers are running. We\u2019re a local studio, so we know which neighborhoods to build content around and which nearby cities (Rancho Bernardo, Valley Center, San Marcos) your customers are driving in from.',
    ],
    industries: [
      {
        name: 'Restaurants & Breweries',
        description:
          'Menu schema, local pack rankings, review management, and content that helps Escondido food and drink spots capture "near me" searches.',
      },
      {
        name: 'Home & Auto Services',
        description:
          'Lead-generation SEO for Escondido contractors, HVAC, plumbing, auto repair, and mobile service businesses \u2014 including call tracking and quote-form optimization.',
      },
      {
        name: 'Healthcare & Professional Services',
        description:
          'Trust-building SEO for Escondido medical practices, dentists, law firms, and financial advisors, with privacy-aware analytics.',
      },
      {
        name: 'Retail & Grand Avenue Boutiques',
        description:
          'Local product SEO for Escondido retail, including Grand Avenue shops and specialty stores competing against big-box and Amazon.',
      },
    ],
    faq: [
      {
        question: 'How long until I see Escondido SEO results?',
        answer:
          'Local pack (map) rankings can move within 4\u20138 weeks for businesses with a clean Google Business Profile. Organic rankings for competitive Escondido keywords typically take 3\u20136 months of consistent work. We share weekly progress and monthly ranking reports.',
      },
      {
        question: 'Do you manage my Google Business Profile?',
        answer:
          'Yes. GBP management is the highest-leverage local SEO activity for most Escondido businesses. We handle optimization, posts, Q&A, review responses, and photo uploads as part of our local SEO retainers.',
      },
      {
        question: 'What\u2019s the difference between Escondido SEO and general SEO?',
        answer:
          'Local SEO focuses on "near me" and city-qualified searches, map pack rankings, and conversion from local searchers. It prioritizes Google Business Profile, reviews, citations, and location-specific content. General SEO is broader and more content-heavy. For Escondido service businesses, local SEO is almost always the better investment.',
      },
      {
        question: 'Do I need a new website for Escondido SEO to work?',
        answer:
          'Not always. If your current site is fast, has clean HTML, and isn\u2019t built on a platform we can\u2019t touch, we can work with it. If your site is slow or built on a problematic platform, we\u2019ll recommend rebuilding \u2014 but that\u2019s a conversation, not a bait-and-switch.',
      },
      {
        question: 'How much does Escondido SEO cost?',
        answer:
          'Our local SEO retainers start in the low four figures per month, scaling with the competitiveness of your industry and the scope of work. We quote fixed pricing and won\u2019t lock you into a long-term contract.',
      },
    ],
  },
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors from the library. If `tsc` errors reference something outside `src/lib/local-seo/` that's pre-existing, leave it alone.

- [ ] **Step 3: Commit**

```bash
git add src/lib/local-seo/
git commit -m "feat(local-seo): scaffold library with types, registry, helpers, and Escondido content"
```

---

## Task 5: Create JSON-LD schema components

**Files:**
- Create: `src/components/local-seo/LocalBusinessSchema.tsx`
- Create: `src/components/local-seo/ServiceSchema.tsx`
- Create: `src/components/local-seo/BreadcrumbSchema.tsx`
- Create: `src/components/local-seo/index.ts`

These components render `<script type="application/ld+json">` tags. They're server-renderable, but since the consuming pages are `'use client'`, we render them as simple React elements (no use-specific API).

- [ ] **Step 1: Create `LocalBusinessSchema.tsx`**

Create `src/components/local-seo/LocalBusinessSchema.tsx` with:

```tsx
import React from 'react';

type LocalBusinessSchemaProps = {
  /** City name for `areaServed` (e.g. 'Escondido'). */
  areaServed: string;
  /** Absolute URL of the current page for `@id`/`url`. */
  pageUrl: string;
};

export function LocalBusinessSchema({ areaServed, pageUrl }: LocalBusinessSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': pageUrl,
    name: 'Lucid Web Studios',
    url: pageUrl,
    description:
      'Modern web design and local SEO studio based in Escondido, California, serving North County San Diego.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Escondido',
      addressRegion: 'CA',
      postalCode: '92025',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: areaServed },
      { '@type': 'AdministrativeArea', name: 'North County San Diego' },
    ],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
```

- [ ] **Step 2: Create `ServiceSchema.tsx`**

Create `src/components/local-seo/ServiceSchema.tsx` with:

```tsx
import React from 'react';

type ServiceSchemaProps = {
  serviceType: 'Web Design' | 'Local SEO Services';
  areaServed: string;
  pageUrl: string;
};

export function ServiceSchema({ serviceType, areaServed, pageUrl }: ServiceSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Lucid Web Studios',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Escondido',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
    url: pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
```

- [ ] **Step 3: Create `BreadcrumbSchema.tsx`**

Create `src/components/local-seo/BreadcrumbSchema.tsx` with:

```tsx
import React from 'react';

type Breadcrumb = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  items: Breadcrumb[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
```

- [ ] **Step 4: Create the barrel export**

Create `src/components/local-seo/index.ts` with:

```ts
export { LocalBusinessSchema } from './LocalBusinessSchema';
export { ServiceSchema } from './ServiceSchema';
export { BreadcrumbSchema } from './BreadcrumbSchema';
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/local-seo/
git commit -m "feat(local-seo): add LocalBusiness, Service, and BreadcrumbList JSON-LD components"
```

---

## Task 6: Create `CityHubPage` component

**Files:**
- Create: `src/components/local-seo/CityHubPage.tsx`
- Modify: `src/components/local-seo/index.ts` (add export)

Design notes: use the same visual language as existing service pages (`/services/web-development`). Gradient hero, Mantine `Container`/`Title`/`Text`, framer-motion entrance animations, `Navigation`/`Footer` wrappers. Keep it shorter than a full service page — hub pages are a router, not a sales pitch.

- [ ] **Step 1: Create `CityHubPage.tsx`**

Create `src/components/local-seo/CityHubPage.tsx` with:

```tsx
'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Stack,
  SimpleGrid,
  Group,
  Paper,
  Badge,
} from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowRight,
  IconCode,
  IconSearch,
  IconMapPin,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import type { CityContent } from '@/lib/local-seo';
import { LocalBusinessSchema } from './LocalBusinessSchema';
import { BreadcrumbSchema } from './BreadcrumbSchema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidweb.studio';

type CityHubPageProps = {
  city: CityContent;
};

export function CityHubPage({ city }: CityHubPageProps) {
  const pageUrl = `${BASE_URL}/${city.slug}`;
  const webDesignUrl = `/${city.slug}-web-design`;
  const seoUrl = `/${city.slug}-seo-services`;
  const hub = city.hub;

  return (
    <>
      <LocalBusinessSchema areaServed={city.displayName} pageUrl={pageUrl} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Service Areas', url: `${BASE_URL}/service-areas` },
          { name: city.displayName, url: pageUrl },
        ]}
      />
      <Navigation />
      <main>
        {/* Hero */}
        <Box
          component="section"
          pt={160}
          pb={80}
          style={{
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                size="lg"
                variant="outline"
                leftSection={<IconMapPin size={16} />}
                style={{
                  color: '#4DA3FF',
                  borderColor: 'rgba(77, 163, 255, 0.4)',
                  marginBottom: 24,
                }}
              >
                {city.county}
              </Badge>
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: '#FFFFFF',
                  marginBottom: 24,
                  lineHeight: 1.1,
                }}
              >
                {hub.heroHeadline}
              </Title>
              <Text size="xl" style={{ color: '#A5B4CF', maxWidth: 720 }}>
                {hub.heroSubheadline}
              </Text>
              <Group mt={40}>
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  rightSection={<IconArrowRight size={18} />}
                  style={{ background: '#4DA3FF' }}
                >
                  Start a Project
                </Button>
                <Button
                  component={Link}
                  href="/service-areas"
                  size="lg"
                  variant="outline"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  All Service Areas
                </Button>
              </Group>
            </motion.div>
          </Container>
        </Box>

        {/* Local intro */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Stack gap="lg">
              {hub.localIntro.map((paragraph, idx) => (
                <Text key={idx} size="lg" style={{ color: '#D1DAEE', lineHeight: 1.7 }}>
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Service cards */}
        <Box component="section" py={80} style={{ background: '#081430' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 48 }}>
              {city.displayName} Services
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              <Paper
                component={Link}
                href={webDesignUrl}
                p="xl"
                radius="lg"
                style={{
                  background: 'rgba(77, 163, 255, 0.08)',
                  border: '1px solid rgba(77, 163, 255, 0.2)',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <IconCode size={40} color="#4DA3FF" style={{ marginBottom: 16 }} />
                <Title order={3} style={{ color: '#FFFFFF', marginBottom: 12 }}>
                  {city.displayName} Web Design
                </Title>
                <Text style={{ color: '#A5B4CF', marginBottom: 16 }}>
                  Custom websites built on Next.js for {city.displayName} businesses. Fast,
                  modern, and owned by you.
                </Text>
                <Group gap={6} style={{ color: '#4DA3FF' }}>
                  <Text size="sm" fw={600}>
                    Learn more
                  </Text>
                  <IconArrowRight size={16} />
                </Group>
              </Paper>

              <Paper
                component={Link}
                href={seoUrl}
                p="xl"
                radius="lg"
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <IconSearch size={40} color="#10B981" style={{ marginBottom: 16 }} />
                <Title order={3} style={{ color: '#FFFFFF', marginBottom: 12 }}>
                  {city.displayName} SEO Services
                </Title>
                <Text style={{ color: '#A5B4CF', marginBottom: 16 }}>
                  Local SEO, Google Business Profile management, and technical optimization
                  for {city.displayName} businesses.
                </Text>
                <Group gap={6} style={{ color: '#10B981' }}>
                  <Text size="sm" fw={600}>
                    Learn more
                  </Text>
                  <IconArrowRight size={16} />
                </Group>
              </Paper>
            </SimpleGrid>
          </Container>
        </Box>

        {/* Local angle */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Title order={2} style={{ color: '#FFFFFF', marginBottom: 24 }}>
              {hub.localAngle.heading}
            </Title>
            <Text size="lg" style={{ color: '#D1DAEE', lineHeight: 1.7 }}>
              {hub.localAngle.body}
            </Text>
          </Container>
        </Box>

        {/* CTA */}
        <Box component="section" py={100} style={{ background: '#081430' }}>
          <Container size="md" ta="center">
            <Title order={2} style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Ready to start your {city.displayName} project?
            </Title>
            <Text size="lg" style={{ color: '#A5B4CF', marginBottom: 32 }}>
              Free in-person discovery meeting. No obligation.
            </Text>
            <Button
              component={Link}
              href="/contact"
              size="xl"
              rightSection={<IconArrowRight size={20} />}
              style={{ background: '#4DA3FF' }}
            >
              Get in Touch
            </Button>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add export to barrel**

Open `src/components/local-seo/index.ts` and add:

```ts
export { CityHubPage } from './CityHubPage';
```

so the file reads:

```ts
export { LocalBusinessSchema } from './LocalBusinessSchema';
export { ServiceSchema } from './ServiceSchema';
export { BreadcrumbSchema } from './BreadcrumbSchema';
export { CityHubPage } from './CityHubPage';
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/local-seo/
git commit -m "feat(local-seo): add CityHubPage component"
```

---

## Task 7: Create `CityServicePage` component

**Files:**
- Create: `src/components/local-seo/CityServicePage.tsx`
- Modify: `src/components/local-seo/index.ts` (add export)

Context: one component renders both web-design and seo-services combo pages. Kind is passed in so we can select the right headline color, icon, and `serviceType` for schema.

- [ ] **Step 1: Create `CityServicePage.tsx`**

Create `src/components/local-seo/CityServicePage.tsx` with:

```tsx
'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Stack,
  SimpleGrid,
  Group,
  Paper,
  Badge,
  Accordion,
} from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowRight,
  IconCode,
  IconSearch,
  IconMapPin,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandGoogle,
  IconStar,
  IconBuildingStore,
  IconCoin,
} from '@tabler/icons-react';
import { Navigation, Footer } from '@/components';
import type { CityContent, ServicePageContent } from '@/lib/local-seo';
import { LocalBusinessSchema } from './LocalBusinessSchema';
import { ServiceSchema } from './ServiceSchema';
import { BreadcrumbSchema } from './BreadcrumbSchema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidweb.studio';

type ServiceKind = 'web-design' | 'seo-services';

type CityServicePageProps = {
  city: CityContent;
  kind: ServiceKind;
};

export function CityServicePage({ city, kind }: CityServicePageProps) {
  const content: ServicePageContent =
    kind === 'web-design' ? city.webDesign : city.seoServices;

  const accent = kind === 'web-design' ? '#4DA3FF' : '#10B981';
  const Icon = kind === 'web-design' ? IconCode : IconSearch;
  const serviceLabel = kind === 'web-design' ? 'Web Design' : 'SEO Services';
  const schemaServiceType =
    kind === 'web-design' ? 'Web Design' : 'Local SEO Services';
  const pagePath =
    kind === 'web-design' ? `${city.slug}-web-design` : `${city.slug}-seo-services`;
  const siblingPath =
    kind === 'web-design' ? `${city.slug}-seo-services` : `${city.slug}-web-design`;
  const siblingLabel =
    kind === 'web-design' ? `${city.displayName} SEO Services` : `${city.displayName} Web Design`;
  const pageUrl = `${BASE_URL}/${pagePath}`;

  return (
    <>
      <LocalBusinessSchema areaServed={city.displayName} pageUrl={pageUrl} />
      <ServiceSchema
        serviceType={schemaServiceType}
        areaServed={city.displayName}
        pageUrl={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Service Areas', url: `${BASE_URL}/service-areas` },
          { name: city.displayName, url: `${BASE_URL}/${city.slug}` },
          { name: serviceLabel, url: pageUrl },
        ]}
      />
      <Navigation />
      <main>
        {/* Hero */}
        <Box
          component="section"
          pt={160}
          pb={80}
          style={{
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                size="lg"
                variant="outline"
                leftSection={<IconMapPin size={16} />}
                style={{
                  color: accent,
                  borderColor: `${accent}66`,
                  marginBottom: 24,
                }}
              >
                {city.displayName}, {city.county}
              </Badge>
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: '#FFFFFF',
                  marginBottom: 24,
                  lineHeight: 1.1,
                }}
              >
                {content.heroHeadline}
              </Title>
              <Text size="xl" style={{ color: '#A5B4CF', maxWidth: 720 }}>
                {content.heroSubheadline}
              </Text>
              <Group mt={40}>
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  rightSection={<IconArrowRight size={18} />}
                  style={{ background: accent }}
                >
                  Get a Free Quote
                </Button>
                <Button
                  component={Link}
                  href={`/${city.slug}`}
                  size="lg"
                  variant="outline"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  About {city.displayName}
                </Button>
              </Group>
            </motion.div>
          </Container>
        </Box>

        {/* Local intro */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Stack gap="lg">
              {content.localIntro.map((paragraph, idx) => (
                <Text key={idx} size="lg" style={{ color: '#D1DAEE', lineHeight: 1.7 }}>
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Industries */}
        <Box component="section" py={80} style={{ background: '#081430' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Industries we serve in {city.displayName}
            </Title>
            <Text ta="center" size="lg" style={{ color: '#A5B4CF', marginBottom: 48 }}>
              Specialized experience across {city.displayName}\u2019s core business sectors
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              {content.industries.map((industry) => (
                <Paper
                  key={industry.name}
                  p="xl"
                  radius="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Group gap={12} mb={12}>
                    <Icon size={28} color={accent} />
                    <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
                      {industry.name}
                    </Title>
                  </Group>
                  <Text style={{ color: '#A5B4CF' }}>{industry.description}</Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Our process (shared across all cities) */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Our process
            </Title>
            <Text ta="center" size="lg" style={{ color: '#A5B4CF', marginBottom: 48 }}>
              {kind === 'web-design'
                ? 'How we take a ' + city.displayName + ' web design project from kickoff to launch.'
                : 'How we take a ' + city.displayName + ' SEO engagement from audit to rankings.'}
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="lg">
              {(kind === 'web-design'
                ? [
                    { step: '01', title: 'Discovery', desc: 'Free in-person kickoff. We learn your business and goals.' },
                    { step: '02', title: 'Design', desc: 'Wireframes and visuals, iterated until you approve.' },
                    { step: '03', title: 'Build', desc: 'Custom Next.js build with clean, typed, tested code.' },
                    { step: '04', title: 'Launch', desc: 'Deploy to Vercel with zero-downtime rollout.' },
                    { step: '05', title: 'Support', desc: 'Ongoing tweaks, performance monitoring, and content help.' },
                  ]
                : [
                    { step: '01', title: 'Audit', desc: 'Deep crawl of your site, GBP, and competitor landscape.' },
                    { step: '02', title: 'Strategy', desc: 'Priority-ranked plan tailored to your ' + city.displayName + ' market.' },
                    { step: '03', title: 'On-page', desc: 'Technical fixes, schema, metadata, content optimization.' },
                    { step: '04', title: 'Local signals', desc: 'GBP optimization, citations, reviews, local content.' },
                    { step: '05', title: 'Report', desc: 'Monthly rankings and traffic reports with next-step recommendations.' },
                  ]
              ).map((item) => (
                <Paper
                  key={item.step}
                  p="lg"
                  radius="md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Text size="sm" fw={700} style={{ color: accent, marginBottom: 6 }}>
                    {item.step}
                  </Text>
                  <Title order={4} style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: 6 }}>
                    {item.title}
                  </Title>
                  <Text size="sm" style={{ color: '#A5B4CF' }}>
                    {item.desc}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Tech stack (web-design) OR Local SEO breakdown (seo-services) */}
        <Box component="section" py={80} style={{ background: '#081430' }}>
          <Container size="lg">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 16 }}>
              {kind === 'web-design'
                ? 'The tech stack we build on'
                : 'What local SEO includes'}
            </Title>
            <Text ta="center" size="lg" style={{ color: '#A5B4CF', marginBottom: 48 }}>
              {kind === 'web-design'
                ? 'Enterprise-grade tools, tuned for small business budgets.'
                : 'The same playbook we use for every ' + city.displayName + ' client.'}
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {(kind === 'web-design'
                ? [
                    { icon: IconBrandNextjs, title: 'Next.js', desc: 'Server components, App Router, blazing speed.' },
                    { icon: IconBrandReact, title: 'React 19', desc: 'Modern component architecture.' },
                    { icon: IconBrandTypescript, title: 'TypeScript', desc: 'Type-safe code, fewer bugs.' },
                    { icon: IconBrandVercel, title: 'Vercel', desc: 'Global edge deployment.' },
                  ]
                : [
                    { icon: IconBrandGoogle, title: 'Google Business Profile', desc: 'Full optimization, posts, Q&A, photos.' },
                    { icon: IconStar, title: 'Review management', desc: 'Generation, monitoring, and responses.' },
                    { icon: IconBuildingStore, title: 'Local citations', desc: 'Consistent NAP across 50+ directories.' },
                    { icon: IconSearch, title: 'Technical SEO', desc: 'Schema, metadata, site speed, Core Web Vitals.' },
                  ]
              ).map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Paper
                    key={item.title}
                    p="lg"
                    radius="md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <ItemIcon size={28} color={accent} style={{ marginBottom: 12 }} />
                    <Title order={4} style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: 6 }}>
                      {item.title}
                    </Title>
                    <Text size="sm" style={{ color: '#A5B4CF' }}>
                      {item.desc}
                    </Text>
                  </Paper>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Case study (optional) */}
        {content.caseStudy && (
          <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
            <Container size="md">
              <Paper
                p="xl"
                radius="lg"
                style={{
                  background: `linear-gradient(135deg, ${accent}15 0%, transparent 100%)`,
                  border: `1px solid ${accent}33`,
                }}
              >
                <Badge
                  variant="filled"
                  style={{ background: accent, marginBottom: 16 }}
                >
                  Case Study
                </Badge>
                <Title order={3} style={{ color: '#FFFFFF', marginBottom: 12 }}>
                  {content.caseStudy.title}
                </Title>
                <Text size="lg" style={{ color: '#D1DAEE', marginBottom: 20 }}>
                  {content.caseStudy.summary}
                </Text>
                {content.caseStudy.href && (
                  <Button
                    component={Link}
                    href={content.caseStudy.href}
                    variant="outline"
                    rightSection={<IconArrowRight size={16} />}
                    style={{ color: accent, borderColor: accent }}
                  >
                    See our work
                  </Button>
                )}
              </Paper>
            </Container>
          </Box>
        )}

        {/* Pricing callout (shared across all cities) */}
        <Box component="section" py={60} style={{ background: '#081430' }}>
          <Container size="md">
            <Paper
              p="xl"
              radius="lg"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <Group gap={16} align="flex-start">
                <IconCoin size={32} color={accent} style={{ flexShrink: 0 }} />
                <Box style={{ flex: 1 }}>
                  <Title order={3} style={{ color: '#FFFFFF', marginBottom: 8 }}>
                    Transparent, fixed pricing
                  </Title>
                  <Text style={{ color: '#A5B4CF', marginBottom: 16 }}>
                    {kind === 'web-design'
                      ? 'Most ' + city.displayName + ' small-business websites land in the mid four figures to low five figures. We quote fixed project pricing upfront \u2014 no hourly surprises, no scope creep invoices.'
                      : 'Our ' + city.displayName + ' local SEO retainers start in the low four figures per month, scaling with your industry\u2019s competitiveness. No long-term contracts.'}
                  </Text>
                  <Button
                    component={Link}
                    href="/pricing"
                    variant="outline"
                    size="sm"
                    rightSection={<IconArrowRight size={14} />}
                    style={{ color: accent, borderColor: accent }}
                  >
                    See pricing details
                  </Button>
                </Box>
              </Group>
            </Paper>
          </Container>
        </Box>

        {/* FAQ */}
        <Box component="section" py={80} style={{ background: '#0A1A3F' }}>
          <Container size="md">
            <Title order={2} ta="center" style={{ color: '#FFFFFF', marginBottom: 48 }}>
              Frequently asked questions
            </Title>
            <Accordion
              variant="separated"
              radius="md"
              styles={{
                item: {
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                },
                control: { color: '#FFFFFF' },
                label: { color: '#FFFFFF' },
                panel: { color: '#A5B4CF' },
                chevron: { color: '#4DA3FF' },
              }}
            >
              {content.faq.map((item, idx) => (
                <Accordion.Item key={idx} value={`faq-${idx}`}>
                  <Accordion.Control>{item.question}</Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Container>
        </Box>

        {/* Related / sibling */}
        <Box component="section" py={60} style={{ background: '#0A1A3F' }}>
          <Container size="md" ta="center">
            <Text size="sm" style={{ color: '#7A8AA8', marginBottom: 12 }}>
              Also serving {city.displayName}
            </Text>
            <Button
              component={Link}
              href={`/${siblingPath}`}
              variant="outline"
              rightSection={<IconArrowRight size={16} />}
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {siblingLabel}
            </Button>
          </Container>
        </Box>

        {/* CTA */}
        <Box component="section" py={100} style={{ background: '#081430' }}>
          <Container size="md" ta="center">
            <Title order={2} style={{ color: '#FFFFFF', marginBottom: 16 }}>
              Let\u2019s talk about your {city.displayName} project
            </Title>
            <Text size="lg" style={{ color: '#A5B4CF', marginBottom: 32 }}>
              Free in-person consultation. Fixed pricing. No obligation.
            </Text>
            <Button
              component={Link}
              href="/contact"
              size="xl"
              rightSection={<IconArrowRight size={20} />}
              style={{ background: accent }}
            >
              Start the Conversation
            </Button>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add export to barrel**

Open `src/components/local-seo/index.ts` and add:

```ts
export { CityServicePage } from './CityServicePage';
```

so the file reads:

```ts
export { LocalBusinessSchema } from './LocalBusinessSchema';
export { ServiceSchema } from './ServiceSchema';
export { BreadcrumbSchema } from './BreadcrumbSchema';
export { CityHubPage } from './CityHubPage';
export { CityServicePage } from './CityServicePage';
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/local-seo/
git commit -m "feat(local-seo): add CityServicePage component"
```

---

## Task 8: Create dynamic route (page + layout + not-found)

**Files:**
- Create: `src/app/[locationSlug]/page.tsx`
- Create: `src/app/[locationSlug]/layout.tsx`
- Create: `src/app/[locationSlug]/not-found.tsx`

Design notes: Next.js App Router matches static routes (`/about`, `/services`, etc.) before dynamic ones, so `[locationSlug]` at the root level is safe. `dynamicParams = false` means only the 24 slugs returned from `generateStaticParams` will render; anything else 404s automatically. In Next.js 16 the `params` prop is a `Promise<{ ... }>` and must be awaited in async components and in `generateMetadata`.

- [ ] **Step 1: Create `page.tsx`**

Create `src/app/[locationSlug]/page.tsx` with:

```tsx
import { notFound } from 'next/navigation';
import {
  getAllLocationSlugs,
  getCityContent,
  parseLocationSlug,
} from '@/lib/local-seo';
import { CityHubPage, CityServicePage } from '@/components/local-seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ locationSlug: slug }));
}

type PageProps = {
  params: Promise<{ locationSlug: string }>;
};

export default async function LocationPage({ params }: PageProps) {
  const { locationSlug } = await params;
  const parsed = parseLocationSlug(locationSlug);
  if (!parsed) notFound();

  const city = getCityContent(parsed.citySlug);
  if (!city) notFound();

  if (parsed.kind === 'hub') {
    return <CityHubPage city={city} />;
  }
  if (parsed.kind === 'web-design') {
    return <CityServicePage city={city} kind="web-design" />;
  }
  return <CityServicePage city={city} kind="seo-services" />;
}
```

- [ ] **Step 2: Create `layout.tsx`**

Create `src/app/[locationSlug]/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import { getCityContent, parseLocationSlug } from '@/lib/local-seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lucidweb.studio';

type LayoutProps = {
  params: Promise<{ locationSlug: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locationSlug } = await params;
  const parsed = parseLocationSlug(locationSlug);
  if (!parsed) return {};

  const city = getCityContent(parsed.citySlug);
  if (!city) return {};

  const page =
    parsed.kind === 'hub'
      ? city.hub
      : parsed.kind === 'web-design'
        ? city.webDesign
        : city.seoServices;

  const canonicalUrl = `${BASE_URL}/${locationSlug}`;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.ogTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Lucid Web Studios',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.ogTitle,
      description: page.metaDescription,
    },
  };
}

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 3: Create `not-found.tsx`**

Create `src/app/[locationSlug]/not-found.tsx` with:

```tsx
import Link from 'next/link';
import { Container, Title, Text, Button, Box } from '@mantine/core';
import { Navigation, Footer } from '@/components';

export default function LocationNotFound() {
  return (
    <>
      <Navigation />
      <main>
        <Box
          component="section"
          py={160}
          style={{
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
            minHeight: '60vh',
          }}
        >
          <Container size="md" ta="center">
            <Title order={1} style={{ color: '#FFFFFF', marginBottom: 16 }}>
              City not found
            </Title>
            <Text size="lg" style={{ color: '#A5B4CF', marginBottom: 32 }}>
              We don\u2019t have a dedicated page for that city yet. Check our full
              service area or get in touch.
            </Text>
            <Button component={Link} href="/service-areas" size="lg">
              See Service Areas
            </Button>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: Build succeeds. In the build output, look for these three routes being generated:
- `● /escondido`
- `● /escondido-web-design`
- `● /escondido-seo-services`

If the build fails, diagnose before moving on — do not commit a broken build.

- [ ] **Step 6: Manual browser QA**

Run: `npm run dev`

Open these URLs in the browser:
1. `http://localhost:3000/escondido` — should render the hub page with "Web Design & SEO in Escondido" hero, two service cards linking to web-design and seo-services
2. `http://localhost:3000/escondido-web-design` — should render the web design page with blue accents, industries grid, FAQ accordion
3. `http://localhost:3000/escondido-seo-services` — should render the SEO page with green accents
4. `http://localhost:3000/nonexistent-city` — should render the `not-found.tsx` 404 page
5. `http://localhost:3000/about` — should STILL render the existing about page (confirming `[locationSlug]` doesn't catch static routes)

View source on #1 and confirm:
- `<title>` is "Web Design & SEO in Escondido | Lucid Web Studios"
- `<meta name="description">` has the Escondido hub description
- `<link rel="canonical">` points to `/escondido`
- `<script type="application/ld+json">` appears three times: one `LocalBusiness`, one `BreadcrumbList` (no `Service` on the hub)

View source on #2 and confirm: `<title>` is the web design page title and JSON-LD includes one `Service` schema.

Stop the dev server (`ctrl-c`) when QA is complete.

- [ ] **Step 7: Commit**

```bash
git add src/app/\[locationSlug\]
git commit -m "feat(local-seo): add dynamic [locationSlug] route with hub + service dispatch"
```

---

## Task 9: Update sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update the sitemap**

Open `src/app/sitemap.ts`. Add an import at the top (after the existing `getCaseStudies` import):

```ts
import { getAllLocationSlugs, parseLocationSlug } from '@/lib/local-seo';
```

Then, inside the `sitemap()` function, immediately before the final `return [...staticPages, ...caseStudyPages];` line, add:

```ts
  // Local SEO city pages
  const localSeoPages: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => {
    const parsed = parseLocationSlug(slug)!; // guaranteed by getAllLocationSlugs
    return {
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: parsed.kind === 'hub' ? 0.75 : 0.7,
    };
  });
```

And change the final return to:

```ts
  return [...staticPages, ...localSeoPages, ...caseStudyPages];
```

- [ ] **Step 2: Type-check and build**

Run: `npx tsc --noEmit && npm run build`

Expected: Both succeed.

- [ ] **Step 3: Verify sitemap output**

Run: `npm run dev`

Fetch the sitemap:

```bash
curl -s http://localhost:3000/sitemap.xml | grep -E "escondido"
```

Expected output (the three Escondido URLs):

```
<loc>https://www.lucidweb.studio/escondido</loc>
<loc>https://www.lucidweb.studio/escondido-web-design</loc>
<loc>https://www.lucidweb.studio/escondido-seo-services</loc>
```

(URLs use `BASE_URL` which defaults to the production domain. That's correct behavior — sitemap always emits the absolute production URL.)

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(local-seo): include city pages in sitemap"
```

---

## Task 10: Update `/service-areas` with dedicated city page links

**Files:**
- Modify: `src/app/service-areas/page.tsx`

Context: The existing `/service-areas` page has an `cityContent` array (around lines 217–248) rendering 6 city cards. We are NOT touching that — it stays as-is. We're adding a NEW section *above or near* the existing cities section that specifically surfaces the city pages that have dedicated landing pages. For phase 1 that's only Escondido; as more cities go live, the same section grows automatically.

- [ ] **Step 1: Locate the insertion point**

Open `src/app/service-areas/page.tsx` and locate the existing `citiesRef` / cities section (search for `citiesInView`). The new section should be rendered just before that existing section so it appears higher on the page.

- [ ] **Step 2: Add imports**

In the existing import block at the top, add (next to the other `@/` imports):

```ts
import { NORTH_COUNTY_CITIES, getRoutableCitySlugs } from '@/lib/local-seo';
```

- [ ] **Step 3: Add the new section**

Just before the existing cities section's `<Box component="section">`, add a new section (keep existing code unchanged):

```tsx
{/* Dedicated city pages */}
<Box
  component="section"
  py={80}
  style={{ background: '#0A1A3F' }}
>
  <Container size="lg">
    <Title
      order={2}
      ta="center"
      style={{ color: '#FFFFFF', marginBottom: 16 }}
    >
      Dedicated City Pages
    </Title>
    <Text
      ta="center"
      size="lg"
      style={{ color: '#A5B4CF', marginBottom: 48 }}
    >
      Deep dives on the cities we serve most \u2014 with local web design and SEO services.
    </Text>
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {NORTH_COUNTY_CITIES.filter((c) =>
        getRoutableCitySlugs().includes(c.slug),
      ).map((city) => (
        <Paper
          key={city.slug}
          component={Link}
          href={`/${city.slug}`}
          p="xl"
          radius="lg"
          style={{
            background: 'rgba(77, 163, 255, 0.06)',
            border: '1px solid rgba(77, 163, 255, 0.18)',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          <Group gap={10} mb={12}>
            <IconMapPin size={20} color="#4DA3FF" />
            <Title order={3} style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
              {city.displayName}
              {city.isHQ && (
                <Badge ml={8} variant="light" color="blue" size="sm">
                  HQ
                </Badge>
              )}
            </Title>
          </Group>
          <Text size="sm" style={{ color: '#A5B4CF', marginBottom: 16 }}>
            {city.shortDescription}
          </Text>
          <Group gap={8}>
            <Anchor
              component={Link}
              href={`/${city.slug}-web-design`}
              size="xs"
              style={{ color: '#4DA3FF' }}
            >
              Web Design
            </Anchor>
            <Text size="xs" style={{ color: '#4A5878' }}>
              ·
            </Text>
            <Anchor
              component={Link}
              href={`/${city.slug}-seo-services`}
              size="xs"
              style={{ color: '#10B981' }}
            >
              SEO Services
            </Anchor>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  </Container>
</Box>
```

Note: `Anchor`, `Paper`, `Group`, `SimpleGrid`, `IconMapPin`, `Link`, `Badge` are already imported in this file. If `Anchor` is NOT already imported, add it to the existing `@mantine/core` import block.

- [ ] **Step 4: Type-check and build**

Run: `npx tsc --noEmit && npm run build`

Expected: Both succeed.

- [ ] **Step 5: Manual browser QA**

Run: `npm run dev`

Visit `http://localhost:3000/service-areas` and confirm:
- A new "Dedicated City Pages" section appears above the existing cities section
- The section shows one card for Escondido with an "HQ" badge
- Clicking the card navigates to `/escondido`
- Clicking "Web Design" navigates to `/escondido-web-design`
- Clicking "SEO Services" navigates to `/escondido-seo-services`
- The existing cities section below is unchanged

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/app/service-areas/page.tsx
git commit -m "feat(service-areas): surface dedicated city pages section"
```

---

## Task 11: Final verification

**Files:** none modified

- [ ] **Step 1: Full type check**

Run: `npx tsc --noEmit`

Expected: No errors introduced by this work.

- [ ] **Step 2: Lint**

Run: `npm run lint`

Expected: No new lint errors in files we created or modified. Existing unrelated warnings are out of scope.

- [ ] **Step 3: Production build**

Run: `npm run build`

Expected: Build succeeds. In the build output, confirm all three Escondido routes appear as static (`●`) routes:
- `/escondido`
- `/escondido-web-design`
- `/escondido-seo-services`

Also confirm the existing routes (`/about`, `/contact`, `/services`, `/services/web-development`, etc.) still build as expected.

- [ ] **Step 4: Sitemap verification**

Run: `npm run dev`

```bash
curl -s http://localhost:3000/sitemap.xml > /tmp/sitemap.xml
grep -c "<url>" /tmp/sitemap.xml
grep "escondido" /tmp/sitemap.xml
```

Expected:
- Total `<url>` count = previous count + 3
- Three `escondido` lines (hub, web-design, seo-services)

- [ ] **Step 5: Rich Results validation (manual, one-time)**

Run: `npm run dev`

For each of the three Escondido pages, view source and copy each `<script type="application/ld+json">` block. Paste into Google's Rich Results Test: https://search.google.com/test/rich-results

Expected: all schema blocks validate. `LocalBusiness` valid on all three, `Service` valid on the two combo pages, `BreadcrumbList` valid on all three.

(If Rich Results Test is offline, fall back to https://validator.schema.org/ which accepts raw JSON-LD.)

- [ ] **Step 6: Mobile layout check**

With `npm run dev` running, open Chrome DevTools device mode and check all three Escondido pages at iPhone SE (375px) and iPad (768px) widths. Expected: hero, service cards, industries grid, and FAQ accordion all render without overflow or clipping.

Stop the dev server.

- [ ] **Step 7: Final commit (empty, tag the end of the plan)**

If there are any uncommitted fixes from the verification pass, commit them now with a descriptive message. Otherwise skip this step — there's nothing to commit.

---

## Out of Scope / Follow-up

These are NOT part of phase 1 but should be captured as follow-up work:

1. **Remaining 7 cities:** Carlsbad, Oceanside, San Marcos, Vista, Encinitas, Poway, Rancho Bernardo each need a content file following the Escondido template. Each file adds one line to `CITY_CONTENT_REGISTRY` in `src/lib/local-seo/index.ts` and its three slugs automatically flow into the dynamic route, sitemap, and `/service-areas` section.
2. **Content review:** The Escondido starter copy is specific but should be read by a human (ideally the user) before final deploy to ensure voice and accuracy. Consider upgrading individual sections to 600-800 words per the spec's word count targets.
3. **Per-city OG images:** Reusing the brand OG image is fine for v1 but per-city OG cards would improve social share conversion.
4. **Real case studies:** Replace the generic `caseStudy` objects with specific Escondido client wins once available.
