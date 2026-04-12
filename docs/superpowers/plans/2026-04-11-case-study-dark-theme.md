# Case Study Dark Theme + Visual Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the case study detail page to dark theme and fill visual gaps with a new `newWebsiteScreenshot` Sanity field plus image fallback chains.

**Architecture:** Mechanical token swap across `CaseStudyContent.tsx` (6 sections + 2 sub-components), a new Sanity image field with corresponding TypeScript type and GROQ projection, and image fallback chains in the Challenge and Solution sections.

**Tech Stack:** Next.js, Mantine UI, Sanity CMS, TypeScript

**Spec:** `docs/superpowers/specs/2026-04-11-case-study-dark-theme-design.md`

---

### Task 1: Add `newWebsiteScreenshot` Sanity Schema Field

**Files:**
- Modify: `sanity/schemas/caseStudy.ts:413` (insert after `oldWebsiteScreenshot` field block)

- [ ] **Step 1: Add the field definition**

Insert after the closing `})` of `oldWebsiteScreenshot` (line 413), before the `mobileSnapshots` field:

```typescript
    defineField({
      name: 'newWebsiteScreenshot',
      title: 'New Website Screenshot (Desktop)',
      type: 'image',
      description: 'Desktop screenshot of the finished site — shown in the Solution section',
      group: 'visuals',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
```

- [ ] **Step 2: Verify Sanity schema compiles**

Run: `cd /Users/esmith/CursorProjects/lucid && npx sanity schema extract 2>&1 | tail -5`

If `sanity` CLI isn't available, verify with: `npx tsc --noEmit --pretty 2>&1 | grep -i "caseStudy\|error" | head -10`

Expected: no errors related to caseStudy schema.

- [ ] **Step 3: Commit**

```bash
git add sanity/schemas/caseStudy.ts
git commit -m "feat(cms): add newWebsiteScreenshot field to caseStudy schema"
```

---

### Task 2: Add TypeScript Type + GROQ Projection

**Files:**
- Modify: `src/lib/sanity.ts:101` (insert type after `oldWebsiteScreenshot`)
- Modify: `src/lib/sanity.ts:194` (add field to `caseStudyBySlugQuery`)

- [ ] **Step 1: Add type to `SanityCaseStudy` interface**

In `src/lib/sanity.ts`, after line 101 (closing `}` of `oldWebsiteScreenshot`), insert:

```typescript
  newWebsiteScreenshot?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
```

- [ ] **Step 2: Add field to `caseStudyBySlugQuery` GROQ**

In `src/lib/sanity.ts`, in the `caseStudyBySlugQuery` projection, after `oldWebsiteScreenshot,` (line 194), add:

```
  newWebsiteScreenshot,
```

- [ ] **Step 3: Verify types compile**

Run: `cd /Users/esmith/CursorProjects/lucid && npx tsc --noEmit --pretty 2>&1 | head -20`

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/sanity.ts
git commit -m "feat(types): add newWebsiteScreenshot type and GROQ field"
```

---

### Task 3: Dark Theme — MetricCard Component

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:69-95` (MetricCard)

- [ ] **Step 1: Update MetricCard styles**

Replace the MetricCard `<Box>` style block (lines 71-78):

Old:
```typescript
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid rgba(10, 26, 63, 0.06)',
          boxShadow: '0 4px 20px rgba(10, 26, 63, 0.06)',
          textAlign: 'center',
          height: '100%',
        }}
```

New:
```typescript
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          height: '100%',
        }}
```

- [ ] **Step 2: Update metric label color**

Replace line 92:

Old:
```typescript
        <Text size="sm" fw={500} style={{ color: '#5A7099' }}>
```

New:
```typescript
        <Text size="sm" fw={500} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for MetricCard component"
```

---

### Task 4: Dark Theme — ProcessPhase Component

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:100-171` (ProcessPhase)

- [ ] **Step 1: Update phase badge style**

Replace the Badge style (lines 153-156):

Old:
```typescript
              background: 'rgba(31, 79, 216, 0.08)',
              color: '#1F4FD8',
```

New:
```typescript
              background: 'rgba(77, 163, 255, 0.12)',
              color: '#4DA3FF',
```

- [ ] **Step 2: Update phase title color**

Replace line 159:

Old:
```typescript
          <Title order={4} mb="xs" style={{ color: '#0A1A3F' }}>
```

New:
```typescript
          <Title order={4} mb="xs" style={{ color: '#FFFFFF' }}>
```

- [ ] **Step 3: Update phase description color**

Replace line 163:

Old:
```typescript
            <Text size="sm" lh={1.7} style={{ color: '#5A7099' }}>
```

New:
```typescript
            <Text size="sm" lh={1.7} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
```

- [ ] **Step 4: Update timeline connector color**

Replace the timeline line gradient (line 142):

Old:
```typescript
                background: 'linear-gradient(180deg, #1F4FD8 0%, rgba(31, 79, 216, 0.1) 100%)',
```

New:
```typescript
                background: 'linear-gradient(180deg, #4DA3FF 0%, rgba(77, 163, 255, 0.1) 100%)',
```

- [ ] **Step 5: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for ProcessPhase component"
```

---

### Task 5: Dark Theme — Results / Metrics Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:485-542`

- [ ] **Step 1: Update section background**

Replace line 490:

Old:
```typescript
            style={{ background: '#F8F9FB' }}
```

New:
```typescript
            style={{ background: '#0A1A3F' }}
```

- [ ] **Step 2: Update badge style**

Replace lines 506-509:

Old:
```typescript
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                      background: 'rgba(77, 163, 255, 0.12)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 3: Update title color**

Replace line 522:

Old:
```typescript
                      color: '#0A1A3F',
```

New:
```typescript
                      color: '#FFFFFF',
```

- [ ] **Step 4: Update results summary text color**

Replace line 529:

Old:
```typescript
                    <Text size="lg" ta="center" maw={700} style={{ color: '#5A7099' }}>
```

New:
```typescript
                    <Text size="lg" ta="center" maw={700} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
```

- [ ] **Step 5: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for Results section"
```

---

### Task 6: Dark Theme — Project Goals Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:544-629`

- [ ] **Step 1: Update section background**

Replace line 549:

Old:
```typescript
            style={{ background: '#FFFFFF' }}
```

New:
```typescript
            style={{ background: '#0D1F4A' }}
```

- [ ] **Step 2: Update badge style**

Replace lines 565-567:

Old:
```typescript
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                      background: 'rgba(77, 163, 255, 0.12)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 3: Update title color**

Replace line 582:

Old:
```typescript
                      color: '#0A1A3F',
```

New:
```typescript
                      color: '#FFFFFF',
```

- [ ] **Step 4: Update non-primary goal icon style**

Replace line 606:

Old:
```typescript
                            : 'rgba(31, 79, 216, 0.08)',
```

New:
```typescript
                            : 'rgba(77, 163, 255, 0.12)',
```

And replace line 607:

Old:
```typescript
                          color: goal.isPrimary ? '#FFFFFF' : '#1F4FD8',
```

New:
```typescript
                          color: goal.isPrimary ? '#FFFFFF' : '#4DA3FF',
```

- [ ] **Step 5: Update goal text color**

Replace line 619:

Old:
```typescript
                        <Text size="md" lh={1.6} style={{ color: '#0A1A3F' }}>
```

New:
```typescript
                        <Text size="md" lh={1.6} style={{ color: '#FFFFFF' }}>
```

- [ ] **Step 6: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for Project Goals section"
```

---

### Task 7: Dark Theme + Image Fallback — Challenge Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:631-763`

- [ ] **Step 1: Update section background**

Replace line 636:

Old:
```typescript
            style={{ background: '#F8F9FB' }}
```

New:
```typescript
            style={{ background: '#0A1A3F' }}
```

- [ ] **Step 2: Update badge style**

Replace lines 653-655:

Old:
```typescript
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                      background: 'rgba(77, 163, 255, 0.12)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 3: Update title color**

Replace line 670:

Old:
```typescript
                      color: '#0A1A3F',
```

New:
```typescript
                      color: '#FFFFFF',
```

- [ ] **Step 4: Update challenge text color**

Replace line 676:

Old:
```typescript
                  <Text size="lg" lh={1.9} style={{ color: '#5A7099' }}>
```

New:
```typescript
                  <Text size="lg" lh={1.9} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
```

- [ ] **Step 5: Update "Old Website" label color**

Replace line 704:

Old:
```typescript
                        style={{ color: '#5A7099', letterSpacing: '1px' }}
```

New:
```typescript
                        style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1px' }}
```

- [ ] **Step 6: Update image card border and shadow for dark**

Replace lines 712-713:

Old:
```typescript
                          boxShadow: '0 10px 40px rgba(10, 26, 63, 0.15)',
                          border: '1px solid rgba(10, 26, 63, 0.1)',
```

New:
```typescript
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
```

- [ ] **Step 7: Add `imageUrl` fallback before icon placeholder**

Replace the icon placeholder block (lines 730-758). The current code is:

```typescript
                  ) : (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 400,
                        aspectRatio: '1',
                        background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.1) 100%)',
                        borderRadius: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ThemeIcon
                          size={120}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            boxShadow: '0 20px 40px rgba(31, 79, 216, 0.3)',
                          }}
                        >
                          <IconBriefcase size={60} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                    </Box>
                  )}
```

Replace with:

```typescript
                  ) : imageUrl ? (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 480,
                      }}
                    >
                      <Box
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={caseStudy.image?.alt || `${caseStudy.client} project`}
                          width={960}
                          height={600}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 400,
                        aspectRatio: '1',
                        background: 'rgba(77, 163, 255, 0.1)',
                        borderRadius: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ThemeIcon
                          size={120}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            boxShadow: '0 20px 40px rgba(31, 79, 216, 0.3)',
                          }}
                        >
                          <IconBriefcase size={60} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                    </Box>
                  )}
```

- [ ] **Step 8: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme + image fallback for Challenge section"
```

---

### Task 8: Dark Theme + Image Fallback — Solution Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:766-861`

This task requires the `newWebsiteScreenshotUrl` variable to be computed. First add it near the other URL computations (around line 210), then update the section.

- [ ] **Step 1: Add `newWebsiteScreenshotUrl` variable**

After the `mobileSnapshotUrls` block (after line 216), insert:

```typescript
  const newWebsiteScreenshotUrl = caseStudy.newWebsiteScreenshot?.asset?._ref
    ? urlFor(caseStudy.newWebsiteScreenshot).width(960).height(600).quality(85).url()
    : null;
```

- [ ] **Step 2: Update section background**

Replace line 771:

Old:
```typescript
            style={{ background: '#FFFFFF' }}
```

New:
```typescript
            style={{ background: '#0D1F4A' }}
```

- [ ] **Step 3: Replace icon placeholder with image fallback chain**

Replace the entire icon placeholder block (lines 788-816):

Old:
```typescript
                  <Box
                    style={{
                      width: '100%',
                      maxWidth: 400,
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, rgba(31, 79, 216, 0.05) 0%, rgba(77, 163, 255, 0.1) 100%)',
                      borderRadius: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ThemeIcon
                        size={120}
                        radius="xl"
                        style={{
                          background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                          boxShadow: '0 20px 40px rgba(31, 79, 216, 0.3)',
                        }}
                      >
                        <IconBulb size={60} color="#FFFFFF" stroke={1.5} />
                      </ThemeIcon>
                    </motion.div>
                  </Box>
```

New:
```typescript
                  {newWebsiteScreenshotUrl ? (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 480,
                      }}
                    >
                      <Text
                        size="xs"
                        fw={600}
                        tt="uppercase"
                        mb="sm"
                        ta="center"
                        style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1px' }}
                      >
                        New Website
                      </Text>
                      <Box
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <Image
                          src={newWebsiteScreenshotUrl}
                          alt={caseStudy.newWebsiteScreenshot?.alt || `${caseStudy.client} new website`}
                          width={960}
                          height={600}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </Box>
                    </Box>
                  ) : imageUrl ? (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 480,
                      }}
                    >
                      <Box
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={caseStudy.image?.alt || `${caseStudy.client} project`}
                          width={960}
                          height={600}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      style={{
                        width: '100%',
                        maxWidth: 400,
                        aspectRatio: '1',
                        background: 'rgba(77, 163, 255, 0.1)',
                        borderRadius: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ThemeIcon
                          size={120}
                          radius="xl"
                          style={{
                            background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
                            boxShadow: '0 20px 40px rgba(31, 79, 216, 0.3)',
                          }}
                        >
                          <IconBulb size={60} color="#FFFFFF" stroke={1.5} />
                        </ThemeIcon>
                      </motion.div>
                    </Box>
                  )}
```

- [ ] **Step 4: Update badge style**

Replace lines 831-833:

Old:
```typescript
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                      background: 'rgba(77, 163, 255, 0.12)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 5: Update title color**

Replace line 849:

Old:
```typescript
                      color: '#0A1A3F',
```

New:
```typescript
                      color: '#FFFFFF',
```

- [ ] **Step 6: Update solution text color**

Replace line 854:

Old:
```typescript
                  <Text size="lg" lh={1.9} style={{ color: '#5A7099' }}>
```

New:
```typescript
                  <Text size="lg" lh={1.9} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
```

- [ ] **Step 7: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme + newWebsiteScreenshot for Solution section"
```

---

### Task 9: Dark Theme — Process Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:863-922`

- [ ] **Step 1: Update section background**

Replace line 868:

Old:
```typescript
            style={{ background: '#F8F9FB' }}
```

New:
```typescript
            style={{ background: '#0A1A3F' }}
```

- [ ] **Step 2: Update badge style**

Replace lines 884-886:

Old:
```typescript
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                      background: 'rgba(77, 163, 255, 0.12)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 3: Update title color**

Replace line 900:

Old:
```typescript
                      color: '#0A1A3F',
```

New:
```typescript
                      color: '#FFFFFF',
```

- [ ] **Step 4: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for Process section"
```

---

### Task 10: Dark Theme — Tech Stack Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:924-998`

- [ ] **Step 1: Update section background**

Replace line 929:

Old:
```typescript
            style={{ background: '#FFFFFF' }}
```

New:
```typescript
            style={{ background: '#0D1F4A' }}
```

- [ ] **Step 2: Update badge style**

Replace lines 945-947:

Old:
```typescript
                      background: 'rgba(31, 79, 216, 0.08)',
                      color: '#1F4FD8',
                      border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                      background: 'rgba(77, 163, 255, 0.12)',
                      color: '#4DA3FF',
                      border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 3: Update title color**

Replace line 962:

Old:
```typescript
                      color: '#0A1A3F',
```

New:
```typescript
                      color: '#FFFFFF',
```

- [ ] **Step 4: Update tech stack badge styles**

Replace lines 984-988:

Old:
```typescript
                        background: '#F8F9FB',
                        color: '#0A1A3F',
                        border: '1px solid rgba(10, 26, 63, 0.1)',
```

New:
```typescript
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
```

- [ ] **Step 5: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for Tech Stack section"
```

---

### Task 11: Dark Theme — CTA Section

**Files:**
- Modify: `src/app/case-studies/[slug]/CaseStudyContent.tsx:1076-1173`

- [ ] **Step 1: Update section background**

Replace line 1080:

Old:
```typescript
          style={{ background: '#F8F9FB' }}
```

New:
```typescript
          style={{ background: '#0A1A3F' }}
```

- [ ] **Step 2: Update badge style**

Replace lines 1096-1098:

Old:
```typescript
                    background: 'rgba(31, 79, 216, 0.08)',
                    color: '#1F4FD8',
                    border: '1px solid rgba(31, 79, 216, 0.15)',
```

New:
```typescript
                    background: 'rgba(77, 163, 255, 0.12)',
                    color: '#4DA3FF',
                    border: '1px solid rgba(77, 163, 255, 0.25)',
```

- [ ] **Step 3: Update title color**

Replace line 1112:

Old:
```typescript
                    color: '#0A1A3F',
```

New:
```typescript
                    color: '#FFFFFF',
```

- [ ] **Step 4: Update body text color**

Replace line 1118:

Old:
```typescript
                <Text size="lg" maw={600} style={{ color: '#5A7099' }} lh={1.8}>
```

New:
```typescript
                <Text size="lg" maw={600} style={{ color: 'rgba(255, 255, 255, 0.7)' }} lh={1.8}>
```

- [ ] **Step 5: Update outline button styles**

Replace lines 1156-1160:

Old:
```typescript
                          borderColor: 'rgba(31, 79, 216, 0.3)',
                          color: '#1F4FD8',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(31, 79, 216, 0.05)',
                            borderColor: '#1F4FD8',
```

New:
```typescript
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                          color: '#FFFFFF',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
```

- [ ] **Step 6: Commit**

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): dark theme for CTA section"
```

---

### Task 12: Visual Verification

- [ ] **Step 1: Start dev server**

Run: `cd /Users/esmith/CursorProjects/lucid && npm run dev`

- [ ] **Step 2: Open a case study in the browser**

Navigate to `http://localhost:3000/case-studies/<any-slug>` and visually verify:

1. No white or light-gray sections remain — all sections are dark navy
2. All text is legible (white/light on dark)
3. Badge accents are light blue (`#4DA3FF`), not dark blue
4. MetricCards are translucent glass on dark background
5. Tech stack badges are visible on dark background
6. Challenge section shows `oldWebsiteScreenshot` or `image` fallback or dark icon — no pastel square
7. Solution section shows `newWebsiteScreenshot` or `image` fallback or dark icon — no pastel square
8. Testimonial section (already dark) still looks correct
9. CTA buttons are both visible and readable
10. Hero mobile snapshots still render correctly

- [ ] **Step 3: Check a case study without images**

Verify the icon fallback placeholders have dark backgrounds (`rgba(77,163,255,0.1)`) not the old pastel look.

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

Expected: no errors.

- [ ] **Step 5: Commit any final adjustments**

If any visual tweaks were needed, commit them:

```bash
git add src/app/case-studies/[slug]/CaseStudyContent.tsx
git commit -m "fix(case-study): polish dark theme visual adjustments"
```
