# Case Study Mobile Snapshots Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Sanity CMS field for up to 3 mobile screenshots of the new site on each case study, and render them as a fanned/stacked composition in the case study detail page hero.

**Architecture:** One new Sanity array field (`mobileSnapshots`) under the existing Visuals group. One new self-contained React component (`MobileSnapshotsStack.tsx`) that handles the CSS phone frame, fan math, and responsive scaling. `CaseStudyContent.tsx` conditionally renders the new component in the hero's existing right-side visual slot; falls back to the existing featured image when no snapshots are set.

**Tech Stack:** Next.js, React, TypeScript, Mantine, framer-motion, Sanity (schema + GROQ), `@sanity/image-url`, `next/image`.

**Spec reference:** `docs/superpowers/specs/2026-04-11-case-study-mobile-snapshots-design.md`

**Testing note:** This project has no existing automated tests for case study rendering. Verification is done via TypeScript compilation (`npm run build`), linting (`npm run lint`), and manual checks in the local dev server. Each task includes explicit verification steps.

---

## File Structure

| File | Purpose | Task |
|------|---------|------|
| `sanity/schemas/caseStudy.ts` | Add new `mobileSnapshots` array field in the Visuals group | 1 |
| `src/lib/sanity.ts` | Add `CaseStudyMobileSnapshot` interface, extend `SanityCaseStudy`, update `caseStudyBySlugQuery` | 2 |
| `src/app/case-studies/[slug]/MobileSnapshotsStack.tsx` | **New file.** Self-contained fanned phone composition component. | 3 |
| `src/app/case-studies/[slug]/CaseStudyContent.tsx` | Derive `mobileSnapshotUrls`, conditionally render `<MobileSnapshotsStack />` in place of the hero featured image when snapshots exist | 4 |

---

## Task 1: Add `mobileSnapshots` field to Sanity schema

**Files:**
- Modify: `sanity/schemas/caseStudy.ts` (insert after the existing `oldWebsiteScreenshot` field, before `newSiteUrl`)

- [ ] **Step 1: Locate the insertion point**

Open `sanity/schemas/caseStudy.ts` and find the `oldWebsiteScreenshot` field (around line 396). The new field goes immediately after that field's closing `}),` and before the `newSiteUrl` field.

- [ ] **Step 2: Add the `mobileSnapshots` field**

Insert this block after the `oldWebsiteScreenshot` field and before `newSiteUrl`:

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
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the screen for accessibility',
            },
            {
              name: 'label',
              title: 'Screen Label',
              type: 'string',
              description: 'Optional — e.g., "Home", "Checkout"',
            },
          ],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
```

- [ ] **Step 3: Verify TypeScript compiles**

Run:
```bash
npm run build
```
Expected: build succeeds with no TypeScript errors. The Sanity schema is compiled as part of the Next.js build (Sanity Studio is embedded in this project).

- [ ] **Step 4: Manually verify the field appears in Sanity Studio**

Start the dev server:
```bash
npm run dev
```
Open Sanity Studio at `http://localhost:3000/studio`, open any existing case study, click the **Visuals** tab, and confirm:
- A new "Mobile Snapshots (New Site)" field is visible below "Old Website Screenshot".
- Clicking "Add item" opens an image upload with "Alt Text" and "Screen Label" fields.
- Trying to add a 4th image shows a validation error.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add sanity/schemas/caseStudy.ts
git commit -m "feat(cms): add mobileSnapshots field to caseStudy schema"
```

---

## Task 2: Add TypeScript types and GROQ query field

**Files:**
- Modify: `src/lib/sanity.ts`

- [ ] **Step 1: Add the `CaseStudyMobileSnapshot` interface**

Open `src/lib/sanity.ts`. Find the existing `CaseStudyCTA` interface (around line 44). Insert the new interface immediately after it, before `SanityCaseStudy`:

```ts
export interface CaseStudyMobileSnapshot {
  asset: {
    _ref: string;
  };
  alt?: string;
  label?: string;
}
```

- [ ] **Step 2: Extend `SanityCaseStudy` with the new field**

In the same file, find the `SanityCaseStudy` interface. Locate the `oldWebsiteScreenshot` property (around line 87). Immediately after that property's closing `};`, add:

```ts
  // Mobile snapshots of the new site — rendered as a fanned hero composition
  mobileSnapshots?: CaseStudyMobileSnapshot[];
```

- [ ] **Step 3: Update `caseStudyBySlugQuery` to fetch the new field**

In the same file, find `caseStudyBySlugQuery` (around line 160). Inside the projection block, find the line `oldWebsiteScreenshot,` and add `mobileSnapshots,` on the next line:

```ts
export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  clientIndustry,
  clientLocation,
  industry,
  category,
  description,
  projectGoals,
  timeline,
  challenge,
  solution,
  processApproach,
  techStack,
  services,
  metrics,
  resultsSummary,
  testimonial,
  callToAction,
  featured,
  image,
  oldWebsiteScreenshot,
  mobileSnapshots,
  newSiteUrl,
  gradient,
  publishedAt
}`;
```

- [ ] **Step 4: Verify TypeScript compiles**

Run:
```bash
npm run build
```
Expected: build succeeds. No TS errors about the new interface or the extended `SanityCaseStudy`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/sanity.ts
git commit -m "feat(types): add CaseStudyMobileSnapshot type and GROQ field"
```

---

## Task 3: Create `MobileSnapshotsStack` component

**Files:**
- Create: `src/app/case-studies/[slug]/MobileSnapshotsStack.tsx`

This task creates a standalone component that is not yet wired into `CaseStudyContent.tsx`. Wiring happens in Task 4. Keeping these separate ensures each commit is self-contained and reviewable.

- [ ] **Step 1: Create the component file**

Create `src/app/case-studies/[slug]/MobileSnapshotsStack.tsx` with this exact content:

```tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Box } from '@mantine/core';

export interface MobileSnapshot {
  url: string;
  alt: string;
}

interface MobileSnapshotsStackProps {
  snapshots: MobileSnapshot[];
  inView: boolean;
}

// Phone dimensions (displayed size, not source image size)
const PHONE_WIDTH = 280;
const PHONE_HEIGHT = 600;
const PHONE_RADIUS = 40;

// Fan layout: per-index rotation (deg) and offset (px) for counts 1, 2, 3
// Later indices render on top (higher z-index).
const FAN_LAYOUTS: Record<number, Array<{ rotate: number; x: number; y: number }>> = {
  1: [
    { rotate: 0, x: 0, y: 0 },
  ],
  2: [
    { rotate: -6, x: -60, y: 0 },
    { rotate: 4, x: 60, y: 0 },
  ],
  3: [
    { rotate: -10, x: -50, y: -20 },
    { rotate: 0, x: 0, y: 0 },
    { rotate: 8, x: 50, y: -20 },
  ],
};

function PhoneFrame({
  url,
  alt,
  width = PHONE_WIDTH,
  height = PHONE_HEIGHT,
}: {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <Box
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: PHONE_RADIUS,
        padding: 6,
        background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.6) 0%, rgba(31, 79, 216, 0.6) 100%)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 10px 30px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Inner screen */}
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: PHONE_RADIUS - 6,
          overflow: 'hidden',
          background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        <Image
          src={url}
          alt={alt}
          fill
          sizes={`${width}px`}
          style={{ objectFit: 'cover' }}
        />
        {/* Notch bar */}
        <Box
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 22,
            borderRadius: 12,
            background: '#000',
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  );
}

export function MobileSnapshotsStack({ snapshots, inView }: MobileSnapshotsStackProps) {
  const items = snapshots.slice(0, 3);
  const count = items.length;
  if (count === 0) return null;

  const layout = FAN_LAYOUTS[count];

  return (
    <Box
      className="mobile-snapshots-stack"
      style={{
        position: 'relative',
        width: '100%',
        height: 640,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.map((snap, index) => {
        const { rotate, x, y } = layout[index];
        const isFrontPhone = index === count - 1;

        return (
          <motion.div
            key={`${snap.url}-${index}`}
            className={isFrontPhone ? 'mobile-snapshot-front' : 'mobile-snapshot-back'}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={inView ? { opacity: 1, y, rotate } : { opacity: 0, y: 40, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -(PHONE_WIDTH / 2) + x,
              marginTop: -(PHONE_HEIGHT / 2),
              zIndex: index + 1,
              transformOrigin: 'center center',
            }}
          >
            <PhoneFrame url={snap.url} alt={snap.alt} />
          </motion.div>
        );
      })}

      {/* Responsive scaling and base-breakpoint collapse */}
      <style jsx>{`
        @media (max-width: 1199px) and (min-width: 768px) {
          .mobile-snapshots-stack :global(.mobile-snapshot-front),
          .mobile-snapshots-stack :global(.mobile-snapshot-back) {
            transform-origin: center center;
            zoom: 0.75;
          }
        }
        @media (max-width: 767px) {
          .mobile-snapshots-stack {
            height: 520px !important;
          }
          .mobile-snapshots-stack :global(.mobile-snapshot-back) {
            display: none;
          }
        }
      `}</style>
    </Box>
  );
}
```

Notes for the implementer:
- The `inView` prop is passed in from `CaseStudyContent.tsx` (which already tracks `heroInView`) so animations fire in sync with the rest of the hero. In Task 4, we'll pass `heroInView`.
- `zoom` is used for the md-breakpoint scale because it cleanly compresses the absolute-positioned phones without re-doing all the offset math. It's supported in all modern browsers (including Firefox as of v126).
- The base-breakpoint rule hides `.mobile-snapshot-back` (all non-front phones) and shows only the front phone, per the spec.
- No `label` rendering in v1 — the field is stored but not displayed.

- [ ] **Step 2: Verify TypeScript compiles**

Run:
```bash
npm run build
```
Expected: build succeeds. The component is not yet imported anywhere, but its own types must be valid.

- [ ] **Step 3: Verify linting passes**

Run:
```bash
npm run lint
```
Expected: no lint errors in the new file. If there are warnings about unused exports (`MobileSnapshot` type), that is acceptable — it will be consumed in Task 4.

- [ ] **Step 4: Commit**

```bash
git add src/app/case-studies/[slug]/MobileSnapshotsStack.tsx
git commit -m "feat(case-study): add MobileSnapshotsStack component"
```

---

## Task 4: Wire `MobileSnapshotsStack` into the hero of `CaseStudyContent.tsx`

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx` (imports, URL derivation, hero visual slot)

- [ ] **Step 1: Add the import**

At the top of `src/app/case-studies/[slug]/CaseStudyContent.tsx`, find the line:

```tsx
import { urlFor, SanityCaseStudy } from '@/lib/sanity';
```

Immediately after it, add:

```tsx
import { MobileSnapshotsStack } from './MobileSnapshotsStack';
```

- [ ] **Step 2: Derive `mobileSnapshotUrls`**

In the same file, find the `oldWebsiteScreenshotUrl` derivation (around line 205):

```tsx
const oldWebsiteScreenshotUrl = caseStudy.oldWebsiteScreenshot?.asset?._ref 
  ? urlFor(caseStudy.oldWebsiteScreenshot).width(960).height(600).quality(85).url()
  : null;
```

Immediately after this block, add:

```tsx
const mobileSnapshotUrls = (caseStudy.mobileSnapshots ?? [])
  .filter((s) => s?.asset?._ref)
  .slice(0, 3)
  .map((s, index) => ({
    url: urlFor(s).width(600).height(1300).quality(90).url(),
    alt: s.alt || `${caseStudy.client} mobile screen ${index + 1}`,
  }));
```

- [ ] **Step 3: Replace the hero right-side visual slot**

In the same file, find the block that currently renders the right-side hero image (around line 437):

```tsx
{/* Right - Image */}
{imageUrl && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    <Box
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Image
        src={imageUrl}
        alt={caseStudy.image?.alt || caseStudy.title}
        width={1200}
        height={600}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
        }}
        priority
      />
    </Box>
  </motion.div>
)}
```

Replace it with this conditional block — **mobile snapshots take priority, featured image is the fallback, both exit paths preserved**:

```tsx
{/* Right - Mobile snapshots (preferred) or featured image (fallback) */}
{mobileSnapshotUrls.length > 0 ? (
  <MobileSnapshotsStack
    snapshots={mobileSnapshotUrls}
    inView={heroInView}
  />
) : imageUrl ? (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    <Box
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Image
        src={imageUrl}
        alt={caseStudy.image?.alt || caseStudy.title}
        width={1200}
        height={600}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
        }}
        priority
      />
    </Box>
  </motion.div>
) : null}
```

- [ ] **Step 4: Verify TypeScript compiles**

Run:
```bash
npm run build
```
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 5: Verify linting passes**

Run:
```bash
npm run lint
```
Expected: no lint errors.

- [ ] **Step 6: Manually verify a case study without mobile snapshots still renders unchanged**

Start the dev server:
```bash
npm run dev
```

Open `http://localhost:3000/case-studies` and click into any existing case study that already has a featured `image` set (but no `mobileSnapshots`). Confirm:
- The hero right-side shows the existing featured image exactly as before.
- No console errors.
- Page metrics, challenge, solution sections all render as before.

- [ ] **Step 7: Manually verify a case study with mobile snapshots renders the fanned composition**

While dev server is still running, open Sanity Studio at `http://localhost:3000/studio`, pick a test case study, go to the **Visuals** tab, and upload 3 portrait images (any tall images will do) under **Mobile Snapshots (New Site)**. Click **Publish**.

Return to that case study's detail page at `http://localhost:3000/case-studies/<slug>` and **hard-refresh** (Cmd+Shift+R). Confirm:
- The hero right-side now shows 3 fanned phones instead of the featured image.
- The front (center) phone is on top, the back phones are rotated slightly left/right.
- Each phone has a rounded-corner frame with a small notch bar and drop shadow.
- Entry animation plays as you scroll the hero into view.
- Resize the browser to ~800px wide: the phones compress but still fan.
- Resize to ~400px wide: only the front (center) phone is visible.
- Remove one image so only 2 remain: the fan uses the 2-image layout (one tilted left, one tilted right).
- Remove another image so only 1 remains: the single phone is centered with no rotation.
- Remove all mobile snapshots: the hero falls back to the featured image.

Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "feat(case-study): render mobile snapshots in hero when present"
```

---

## Self-Review Checklist (already performed by plan author)

**Spec coverage:**
- Schema field (name, type, max 3, group): Task 1 ✓
- Types + GROQ query: Task 2 ✓
- New component with fan math + phone frame + responsive: Task 3 ✓
- Hero replacement logic with fallback to featured image: Task 4 ✓
- Edge cases (0/1/2/3 items, missing alt, broken `asset._ref`): Tasks 3 & 4 ✓
- Manual verification steps (counts 0/1/2/3, breakpoints 360/768/1200): Task 4 Step 7 ✓

**Placeholder scan:** No TBDs, no "add error handling", no "similar to above" — all code is inline.

**Type consistency:** `MobileSnapshot` props type matches the shape produced by `mobileSnapshotUrls.map(...)` in Task 4. `CaseStudyMobileSnapshot` in Task 2 matches the schema shape from Task 1.
