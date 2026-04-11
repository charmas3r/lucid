# Case Study Mobile Snapshots — Design

**Date:** 2026-04-11
**Status:** Approved
**Scope:** Add a Sanity CMS field for mobile snapshots of the new site on case studies, and render them as a fanned composition in the case study hero.

## Goal

Let editors upload up to 3 mobile screens of the new site per case study, and display them in the hero area of the case study detail page as a stacked/fanned composition. This replaces the current desktop featured image in the hero when mobile snapshots are present.

## Non-Goals

- No changes to case study cards or the `/case-studies` listing page.
- No changes to `oldWebsiteScreenshot` or the "Understanding the Problem" section.
- No device mockup library or third-party dependency.
- No swipe/carousel interaction — composition is static.
- No automated tests (project has no existing tests for case study rendering).

## Approach Chosen

**Replace-in-place in the hero.** If `mobileSnapshots` has items, the hero's right-side visual slot shows the fanned mobile composition instead of the featured `image`. If not set, the existing featured image renders (unchanged). Backward-compatible — old case studies without the new field keep working.

Rejected alternatives:
- *Layered composition* (desktop image + phones overlaid): harder to balance, clutters mobile.
- *Secondary hero band* (new section below hero): not strictly "in the hero," duplicates visuals.

## Schema Changes

File: `sanity/schemas/caseStudy.ts`

Add to the **Visuals** group, positioned after `oldWebsiteScreenshot`:

```ts
defineField({
  name: 'mobileSnapshots',
  title: 'Mobile Snapshots (New Site)',
  type: 'array',
  description: 'Up to 3 mobile screens of the new site — shown as a fanned composition in the hero. Recommended: 9:19.5 aspect ratio (e.g., 1170×2532).',
  group: 'visuals',
  of: [
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'label', title: 'Screen Label', type: 'string', description: 'Optional — e.g., "Home", "Checkout"' },
      ],
    },
  ],
  validation: (rule) => rule.max(3),
}),
```

- Single array field, max 3 items enforced by Sanity.
- Per-image `alt` + optional `label` (label reserved for future use — not rendered in v1).

## Type & Query Changes

File: `src/lib/sanity.ts`

Add interface:

```ts
export interface CaseStudyMobileSnapshot {
  asset: { _ref: string };
  alt?: string;
  label?: string;
}
```

Extend `SanityCaseStudy`:

```ts
mobileSnapshots?: CaseStudyMobileSnapshot[];
```

Update **only** `caseStudyBySlugQuery` — the detail page is the only consumer. Card and listing queries stay as-is.

```groq
*[_type == "caseStudy" && slug.current == $slug][0] {
  // ... existing fields
  oldWebsiteScreenshot,
  mobileSnapshots,
  newSiteUrl,
  // ...
}
```

## Frontend Rendering

### Hero placement logic

File: `src/app/case-studies/[slug]/CaseStudyContent.tsx` (around line 437)

Replace the current `{imageUrl && (...)}` block with:

```
if mobileSnapshotUrls.length > 0 → render <MobileSnapshotsStack snapshots={...} />
else if imageUrl → render existing featured image (unchanged markup)
else → render nothing (hero collapses to single column)
```

### Image URL building

Alongside the existing `imageUrl` / `oldWebsiteScreenshotUrl` derivations (~line 201):

```ts
const mobileSnapshotUrls = (caseStudy.mobileSnapshots ?? [])
  .filter(s => s?.asset?._ref)
  .slice(0, 3)  // safety net against schema validation bypass
  .map((s, index) => ({
    url: urlFor(s).width(600).height(1300).quality(90).url(),
    alt: s.alt || `${caseStudy.client} mobile screen ${index + 1}`,
  }));
```

600×1300 = 2x retina for ~300×650 displayed phones. Matches 9:19.5 phone aspect ratio.

### New component

File: `src/app/case-studies/[slug]/MobileSnapshotsStack.tsx`

- **Props:** `snapshots: { url: string; alt: string }[]`
- **Why a separate file:** `CaseStudyContent.tsx` is already ~900 lines and exceeds single-Read token limits. A new file keeps both focused.
- **Self-contained:** handles fan math, responsive scaling, and entry animations.

### Fan composition

Absolute-positioned phones inside a relative container sized to ~600px height (matching the current hero image slot).

**Phone frame** (CSS-only, no mockup library):
- Rounded container, radius ~40px.
- Thin gradient border (matches site's blue accents).
- Subtle inner shadow.
- Small notch bar at top.
- Outer drop shadow: `0 25px 60px rgba(0,0,0,0.35)` — pops off the dark hero background.

**Fan angles by count:**
| Count | Layout |
|-------|--------|
| 1 | Straight, centered, no rotation |
| 2 | Back: -6° + offset -60px; Front: +4° + offset +60px |
| 3 | Back: -10° + offset -50px, -20y; Middle: 0°, centered; Front: +8° + offset +50px, -20y |

**Z-order:** Later items in the array sit on top. Editors control stacking via Sanity's array reorder.

**Entry animation:** Each phone fades + slides in with staggered delay (100ms apart), using the existing `framer-motion` `fadeInUp` / `heroInView` pattern.

### Responsive behavior

| Breakpoint | Treatment |
|-----------|-----------|
| `lg+` (≥1200px) | Full fan, scale 1.0 |
| `md` (768–1199px) | Fan compressed to 0.75 scale, offsets reduced proportionally |
| `base` (<768px) | Show **only** the front/center phone at full width; hide the others |

Rationale for the base-breakpoint collapse: showing 2–3 tiny phones-of-phones on a 360px viewport looks cramped and defeats the purpose.

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| `mobileSnapshots` undefined or empty | Fall back to featured `image` (existing behavior) |
| All items missing `asset._ref` | Same as empty — fall back to featured image |
| Exactly 1 snapshot | Renders single centered phone, no fan math |
| >3 snapshots (validation bypass) | Frontend `.slice(0, 3)` safety net |
| Broken image load | `next/image` default error state — acceptable |
| Missing `alt` per image | Falls back to `"${client} mobile screen ${index + 1}"` |

## Manual Verification

1. Create a case study in Sanity Studio and save versions with 0, 1, 2, and 3 mobile snapshots. Verify hero rendering for each.
2. Verify existing case studies (no `mobileSnapshots` field) still render the featured image in the hero.
3. Check responsive breakpoints: 360px, 768px, 1200px, 1920px.
4. Verify the GROQ query returns the new field in production (not just dev).
5. Verify Sanity validation blocks publishing >3 items.

## Files Touched

| File | Change |
|------|--------|
| `sanity/schemas/caseStudy.ts` | Add `mobileSnapshots` field in Visuals group |
| `src/lib/sanity.ts` | Add `CaseStudyMobileSnapshot` interface, extend `SanityCaseStudy`, update `caseStudyBySlugQuery` |
| `src/app/case-studies/[slug]/CaseStudyContent.tsx` | Derive `mobileSnapshotUrls`, replace hero visual slot with conditional rendering |
| `src/app/case-studies/[slug]/MobileSnapshotsStack.tsx` | **New file** — fanned composition component |
