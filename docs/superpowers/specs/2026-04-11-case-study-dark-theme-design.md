# Case Study Detail Page: Dark Theme + Visual Coverage

## Problem

The case study detail page (`CaseStudyContent.tsx`) uses light backgrounds (`#FFFFFF`, `#F8F9FB`) for 6 of its 9 sections, breaking the site-wide dark aesthetic already applied to the index page, services pages, contact, and pricing. Additionally, the Solution section has no image field in Sanity — it renders a placeholder icon — and the Challenge section falls back to the same placeholder when `oldWebsiteScreenshot` is missing.

## Decisions

- **Dark theme token map**: reuse the exact conversion applied in commit `754efc1` (services dark theme fix).
- **New Sanity field**: `newWebsiteScreenshot` (desktop image of the finished site) for the Solution section.
- **Fallback chains**: Solution falls back to `image` then icon; Challenge falls back to `image` then icon.
- **No new visuals** for Process, Tech Stack, Results, or CTA sections — they read as intentional text/iconography.
- **MetricCard style**: translucent glass cards (`rgba(255,255,255,0.04)` bg, subtle white border).

## 1. Dark Theme Conversion

### Section Background Map

| Section | Current | New |
|---|---|---|
| Hero | gradient | no change |
| Results / Metrics | `#F8F9FB` | `#0A1A3F` |
| Project Goals | `#FFFFFF` | `#0D1F4A` |
| Challenge | `#F8F9FB` | `#0A1A3F` |
| Solution | `#FFFFFF` | `#0D1F4A` |
| Process | `#F8F9FB` | `#0A1A3F` |
| Tech Stack | `#FFFFFF` | `#0D1F4A` |
| Testimonial | gradient | no change |
| CTA | `#F8F9FB` | `#0A1A3F` |

### Global Token Conversions

| Element | Light value | Dark value |
|---|---|---|
| Title text | `#0A1A3F` | `#FFFFFF` |
| Body text | `#5A7099` | `rgba(255,255,255,0.7)` |
| Badge bg | `rgba(31,79,216,0.08)` | `rgba(77,163,255,0.12)` |
| Badge text | `#1F4FD8` | `#4DA3FF` |
| Badge border | `rgba(31,79,216,0.15)` | `rgba(77,163,255,0.25)` |
| Card bg | `#FFFFFF` / `#F8F9FB` | `rgba(255,255,255,0.04)` |
| Card border | `rgba(10,26,63,0.06)` | `rgba(255,255,255,0.08)` |
| Card shadow | `rgba(10,26,63,0.06)` | `rgba(0,0,0,0.3)` |
| Dividers | `rgba(10,26,63,0.08)` | `rgba(255,255,255,0.1)` |
| Outline btn border | `rgba(31,79,216,0.3)` | `rgba(255,255,255,0.25)` |
| Outline btn text | `#1F4FD8` | `#FFFFFF` |
| Outline btn hover | `rgba(31,79,216,0.05)` | `rgba(255,255,255,0.05)` |
| Process timeline | `#1F4FD8` to `rgba(31,79,216,0.1)` | `#4DA3FF` to `rgba(77,163,255,0.1)` |
| Tech stack badge bg | `#F8F9FB` | `rgba(255,255,255,0.06)` |
| Tech stack badge text | `#0A1A3F` | `#FFFFFF` |
| Tech stack badge border | `rgba(10,26,63,0.1)` | `rgba(255,255,255,0.1)` |

## 2. New Sanity Field: `newWebsiteScreenshot`

### Schema (`sanity/schemas/caseStudy.ts`)

Add after `oldWebsiteScreenshot` in the visuals group:

- Name: `newWebsiteScreenshot`
- Title: "New Website Screenshot (Desktop)"
- Type: `image` with hotspot
- Description: "Desktop screenshot of the finished site — shown in the Solution section"
- Sub-field: `alt` (string)

### TypeScript (`src/lib/sanity.ts`)

Add to `SanityCaseStudy` interface:

```typescript
newWebsiteScreenshot?: {
  asset: { _ref: string };
  alt?: string;
};
```

Add `newWebsiteScreenshot` to `caseStudyBySlugQuery` GROQ projection.

## 3. Solution Section Visual

Render priority (right column):

1. `newWebsiteScreenshot` — labeled "New Website" above the image card
2. `image` (featured image) — no label
3. Animated icon placeholder (restyled for dark: bg `rgba(77,163,255,0.1)`)

Image card treatment matches Challenge section: `borderRadius: 16`, overflow hidden, shadow, subtle border.

## 4. Challenge Section Fallback

Render priority (right column):

1. `oldWebsiteScreenshot` — labeled "Old Website" (existing behavior)
2. `image` (featured image) — no label
3. Animated icon placeholder (restyled for dark: bg `rgba(77,163,255,0.1)`)

## 5. Icon Placeholder Dark Restyle

Both Challenge and Solution fallback icons:

- Container bg: `rgba(31,79,216,0.05)` → `rgba(77,163,255,0.1)`
- Icon gradient and shadow: unchanged (already blue gradient, reads fine on dark)

## 6. Files Changed

| File | Change |
|---|---|
| `sanity/schemas/caseStudy.ts` | Add `newWebsiteScreenshot` field |
| `src/lib/sanity.ts` | Add type + GROQ field |
| `src/app/case-studies/[slug]/CaseStudyContent.tsx` | Dark theme tokens + image fallback chains |

## 7. Out of Scope

- Case studies index page (already dark)
- Adding images to Process, Tech Stack, Results, or CTA sections
- Populating `newWebsiteScreenshot` in Sanity for existing case studies (fallback chain handles this)
- MobileSnapshotsStack component (already renders on dark hero)
