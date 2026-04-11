# Local SEO City Pages — Design Spec

**Status:** Draft · **Date:** 2026-04-11 · **Author:** Brainstorm session with Claude

## 1. Goal

Capture high-intent local search traffic across North County San Diego by publishing a focused set of hand-written city + service pages that genuinely rank (not doorway pages).

## 2. Why / Value

Google's 2024+ helpful-content updates aggressively suppress programmatic doorway pages. At the same time, "{city} web design" and "{city} seo services" queries continue to carry strong commercial intent for local service businesses. A small, high-quality set of hand-written city pages is one of the few local SEO plays that still reliably moves the needle.

Lucid is headquartered in Escondido, already positions around local credibility on `/service-areas`, and has the brand + stack (Next.js 16, structured data, fast pages) to support this well. The opportunity is to convert existing local positioning into page-level ranking assets.

## 3. Scope

### In scope (v1)

- **8 North County cities:** Escondido, Carlsbad, Oceanside, San Marcos, Vista, Encinitas, Poway, Rancho Bernardo
- **Three page types per city:**
  - City hub page (`/{city}`) — 1 per city = 8 pages
  - Web design combo page (`/{city}-web-design`) — 1 per city = 8 pages
  - SEO services combo page (`/{city}-seo-services`) — 1 per city = 8 pages
- **24 pages total**
- Every page ships with genuinely unique hand-written content (no templated substitution)
- `LocalBusiness`, `Service`, and `BreadcrumbList` schema.org JSON-LD
- Sitemap registration for all 24 URLs
- Per-page metadata (title, description, OG, canonical)
- Internal linking: `/service-areas` → 8 city hubs; each hub → its 2 combo pages; combo pages → sibling combo + hub
- Light update to `/service-areas` to surface the new city hub pages

### Out of scope (v1, YAGNI)

- Per-city OG image generation (reuse existing brand OG image for now)
- Sanity CMS migration for local content — static TypeScript files are simpler, content is stable, and compile-time type checking catches missing fields
- Web development + SEO as *separate* pages from web design (web design was chosen as the single design/dev page to avoid cannibalization)
- E-commerce, mobile apps, or conversion-optimization city pages (can be added in phase 2 once v1 validates)
- More than 8 cities (Del Mar, Solana Beach, Fallbrook, etc. deferred)
- A `/locations` index page (would cannibalize `/service-areas`)
- A/B testing or experimentation infrastructure
- Any new analytics beyond existing Vercel Analytics

## 4. URL Structure

Flat compound URLs, all at the root of the domain:

| City | Hub | Web Design | SEO Services |
|---|---|---|---|
| Escondido | `/escondido` | `/escondido-web-design` | `/escondido-seo-services` |
| Carlsbad | `/carlsbad` | `/carlsbad-web-design` | `/carlsbad-seo-services` |
| Oceanside | `/oceanside` | `/oceanside-web-design` | `/oceanside-seo-services` |
| San Marcos | `/san-marcos` | `/san-marcos-web-design` | `/san-marcos-seo-services` |
| Vista | `/vista` | `/vista-web-design` | `/vista-seo-services` |
| Encinitas | `/encinitas` | `/encinitas-web-design` | `/encinitas-seo-services` |
| Poway | `/poway` | `/poway-web-design` | `/poway-seo-services` |
| Rancho Bernardo | `/rancho-bernardo` | `/rancho-bernardo-web-design` | `/rancho-bernardo-seo-services` |

**Why flat compound:**
- The full keyword phrase ("escondido web design") appears as a single unit in the URL, which is the form users type
- Simpler than a nested `/{city}/{service}` hierarchy
- Consistent with common local SEO page patterns

**Next.js routing note:** Next.js App Router matches static routes before dynamic routes, so a root-level `[locationSlug]` dynamic segment does not interfere with existing routes like `/about`, `/contact`, `/services`, etc.

## 5. Page Anatomy

### 5.1 City Hub page (`/{city}`)

Length: ~400 words of unique content.

Sections:
1. **Hero** — "Web Design & SEO in {City}" headline, sub-headline, primary CTA to `/contact`
2. **Local intro** — 2–3 paragraphs, named neighborhoods and local landmarks, HQ note for Escondido (our home base), genuine specific content per city
3. **Two service cards** — linking to `/{city}-web-design` and `/{city}-seo-services`
4. **Local angle** — either a case study callout, an industry spotlight, or a "why local matters" mini-section (varies by city depending on what content exists)
5. **Contact CTA**
6. **Structured data** — `LocalBusiness` + `BreadcrumbList` JSON-LD

### 5.2 Web Design combo page (`/{city}-web-design`)

Length: ~800 words of unique content.

Sections:
1. **Hero** — "{City} Web Design" headline, sub-headline, primary CTA
2. **Local intro** — who in {city} needs a website, named districts, local business density notes (unique)
3. **Industries we serve in this city** — 3–4 industries specific to the city's economy (unique)
4. **Our process** — shared 5-step process copy (same across cities)
5. **Tech stack** — shared Next.js / React / TypeScript positioning (same across cities)
6. **Local case study or portfolio callout** — city-specific where possible, generic fallback where not
7. **Pricing expectations** — shared general guidance (same across cities, links to `/pricing`)
8. **City-specific FAQ** — 4–6 questions. 2–3 are unique per city (e.g. "Do you work with Escondido restaurants?"), the rest are shared
9. **Related links** — `/{city}-seo-services` and `/{city}` hub
10. **Contact CTA**
11. **Structured data** — `Service` + `LocalBusiness` + `BreadcrumbList` JSON-LD

### 5.3 SEO Services combo page (`/{city}-seo-services`)

Length: ~800 words of unique content.

Sections:
1. **Hero** — "{City} SEO Services" headline, sub-headline, primary CTA
2. **Local intro** — local search landscape for {city}, local competition notes (unique)
3. **What local SEO includes** — Google Business Profile, local citations, review management, on-page, technical SEO (shared structure, can have city-specific callouts)
4. **Industries we rank in this city** — 3–4 specific industries (unique)
5. **Our SEO process** — shared process (same across cities)
6. **Local case study or ranking proof** — where available
7. **Pricing expectations** — shared (links to `/pricing`)
8. **City-specific FAQ** — 4–6 questions, 2–3 unique per city
9. **Related links** — `/{city}-web-design` and `/{city}` hub
10. **Contact CTA**
11. **Structured data** — `Service` + `LocalBusiness` + `BreadcrumbList` JSON-LD

### 5.4 Cross-page elements

- **Breadcrumbs** on every page: Home → Service Areas → {City} → (Service)
- **Canonical URL** on every page pointing to itself
- **Metadata** (title, description, OG, twitter) per page via `generateMetadata` in the route's `layout.tsx`
- **OG image** — reuses existing brand OG image for v1

## 6. Technical Architecture

### 6.1 File structure

```
src/app/
  [locationSlug]/
    page.tsx              # Dispatches to hub / web-design / seo template based on slug
    layout.tsx            # generateMetadata + generateStaticParams, per-slug <head>
    not-found.tsx         # Shown when an invalid slug is requested
  service-areas/
    page.tsx              # Updated: new section linking to 8 city hubs
  sitemap.ts              # Updated: imports city slugs and appends 24 URLs

src/lib/local-seo/
  types.ts                # CityContent, HubPageContent, ServicePageContent, FAQ types
  cities.ts               # City registry: slug, displayName, county, neighborhoods, population
  index.ts                # getCityContent(slug), getAllCitySlugs(), parseLocationSlug(slug)
  content/
    escondido.ts          # All Escondido content (hub + webDesign + seoServices)
    carlsbad.ts
    oceanside.ts
    san-marcos.ts
    vista.ts
    encinitas.ts
    poway.ts
    rancho-bernardo.ts

src/components/local-seo/
  CityHubPage.tsx         # Shared layout for hub pages; consumes HubPageContent
  CityServicePage.tsx     # Shared layout for combo pages; consumes ServicePageContent
  LocalBusinessSchema.tsx # Emits LocalBusiness JSON-LD <script>
  ServiceSchema.tsx       # Emits Service JSON-LD <script>
  BreadcrumbSchema.tsx    # Emits BreadcrumbList JSON-LD <script>
```

### 6.2 Routing (single dynamic route)

`src/app/[locationSlug]/page.tsx`:

```ts
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllLocationSlugs(); // 24 slugs: 8 hubs + 16 combos
}

export default function LocationPage({ params }: { params: { locationSlug: string } }) {
  const parsed = parseLocationSlug(params.locationSlug);
  if (!parsed) notFound();

  if (parsed.kind === 'hub') {
    return <CityHubPage content={getCityContent(parsed.citySlug).hub} />;
  }
  if (parsed.kind === 'web-design') {
    return <CityServicePage content={getCityContent(parsed.citySlug).webDesign} />;
  }
  if (parsed.kind === 'seo-services') {
    return <CityServicePage content={getCityContent(parsed.citySlug).seoServices} />;
  }
  notFound();
}
```

`parseLocationSlug` returns `{ kind: 'hub' | 'web-design' | 'seo-services', citySlug }` or null. Because `dynamicParams = false`, only the 24 allowlisted slugs reach this code at runtime; unknown slugs 404 at the framework level.

### 6.3 Metadata (per-page)

`src/app/[locationSlug]/layout.tsx`:

```ts
export async function generateMetadata(
  { params }: { params: { locationSlug: string } }
): Promise<Metadata> {
  const parsed = parseLocationSlug(params.locationSlug);
  if (!parsed) return {};
  const content = getCityContent(parsed.citySlug);
  // Return the matching page's title, description, OG, canonical
}

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

The `'use client'` pages still work because metadata is declared in the sibling server-component `layout.tsx`, matching the existing pattern in `src/app/services/layout.tsx`.

### 6.4 Content data shape

```ts
// src/lib/local-seo/types.ts

type FAQ = { question: string; answer: string };

type HubPageContent = {
  title: string;              // <title>
  metaDescription: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  localIntro: string[];       // paragraphs
  localAngle: {
    kind: 'case-study' | 'industry-spotlight' | 'why-local';
    body: string;
  };
};

type ServicePageContent = {
  title: string;
  metaDescription: string;
  ogTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  localIntro: string[];
  industries: { name: string; description: string }[];
  caseStudy?: { title: string; summary: string; href?: string };
  faq: FAQ[];                 // mix of unique + shared
};

type CityContent = {
  slug: string;
  displayName: string;        // 'Escondido'
  county: 'North County San Diego';
  population: number;
  neighborhoods: string[];
  hub: HubPageContent;
  webDesign: ServicePageContent;
  seoServices: ServicePageContent;
};
```

TypeScript enforces that every city has all three pages filled in — compile-time protection against shipping a city with missing content.

### 6.5 Schema.org JSON-LD

- **`LocalBusiness`** on all 24 pages: name "Lucid Web Studios", Escondido HQ address, geo coordinates, telephone, URL, areaServed listing all 8 cities
- **`Service`** on the 16 combo pages: serviceType ("Web Design" / "SEO Services"), provider (LocalBusiness), areaServed (the city)
- **`BreadcrumbList`** on all 24 pages: Home → Service Areas → City → (Service)

### 6.6 Sitemap

Update `src/app/sitemap.ts`:

```ts
import { getAllLocationSlugs, parseLocationSlug } from '@/lib/local-seo';

const localSeoPages: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => {
  const parsed = parseLocationSlug(slug)!; // guaranteed by getAllLocationSlugs
  return {
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: parsed.kind === 'hub' ? 0.75 : 0.7,
  };
});

return [...staticPages, ...localSeoPages, ...caseStudyPages];
```

Uses `parseLocationSlug` rather than substring matching so there's a single source of truth for how slugs decompose.

### 6.7 `/service-areas` update

In `src/app/service-areas/page.tsx`, add a new "Dedicated City Pages" section below the existing cities-and-industries section. The new section renders 8 cards (one per North County city in scope), each with:
- City name
- 1-line description pulled from the city's hub content (`CityContent.hub.heroSubheadline` or similar)
- Two links: "Web Design" (→ `/{city}-web-design`) and "SEO Services" (→ `/{city}-seo-services`)
- Card itself links to the `/{city}` hub

The existing `cityContent` array in `service-areas/page.tsx` stays as-is — the new section is additive and sources its data from `src/lib/local-seo/cities.ts` to avoid duplication.

## 7. Data Flow

1. Build time: `generateStaticParams` reads `src/lib/local-seo/cities.ts` → returns 24 slugs
2. Build time: Next.js calls `page.tsx` once per slug → statically renders HTML
3. Build time: `generateMetadata` in `layout.tsx` runs per slug → emits per-page `<head>`
4. Build time: `sitemap.ts` reads same 24 slugs → emits `/sitemap.xml`
5. Runtime: all 24 URLs served as static HTML from the edge — no runtime lookups
6. Content update: edit `src/lib/local-seo/content/{city}.ts` → redeploy → static pages regenerate

## 8. Testing Plan

- **Type check:** `tsc --noEmit` catches missing content fields per city
- **Build check:** `next build` must generate all 24 routes without errors or warnings
- **Manual visual QA:** spot-check one hub page + one web design page + one SEO page in the browser for layout, responsiveness, link correctness
- **Metadata verification:** view source on 3 sample pages to confirm unique `<title>`, `<meta description>`, OG tags, and canonical
- **Structured data validation:** run the 3 sample pages through Google's Rich Results Test to confirm JSON-LD parses
- **Sitemap check:** fetch `/sitemap.xml` and confirm all 24 new URLs are present with correct priority
- **Internal linking:** verify each combo page links to its sibling combo + hub, and each hub links to its 2 combos
- **404 check:** hitting `/fake-city-web-design` returns 404 (dynamicParams guard)

## 9. Open Risks

- **Writing burden:** 24 pages × ~500–800 unique words = ~15k–20k words of hand-written copy. This is the single biggest risk to the project. Mitigation: spec does not block on having all content written — the scaffolding can ship with a starter city or two and more cities get added as content is produced. Implementation plan should sequence this.
- **Case studies:** some cities may not have a real local case study on hand. The schema supports `caseStudy?` as optional, and the template degrades gracefully to an industry spotlight instead.
- **Cannibalization with existing `/services/web-development` and `/services/seo-services`:** city pages target different keyword intent (geo-qualified), so Google should treat them as distinct. If rankings later compete, the fix is clearer internal linking and differentiated H1s.

## 10. Phases

- **Phase 1 (this spec):** scaffolding + Escondido (hub + both combos) + sitemap + structured data + `/service-areas` updates. Validates the entire pipeline end-to-end with 1 city and 3 pages.
- **Phase 2:** fill in the remaining 7 cities one at a time as copy is written.
- **Phase 3 (out of scope for now):** add a third service per city (e.g. e-commerce) only if phase 1–2 show measurable ranking gains; consider Del Mar / Solana Beach / Rancho Santa Fe as additional cities.

The implementation plan will own how Phase 1 is sequenced into reviewable steps.
