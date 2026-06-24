# S0 — Foundation (seeded, not graded)

Fixed shared input for every agent. **Decided, not up for re-litigation.** The two
wedges are locked; S1 *operationalizes* them, it does not re-pick them. This block is
the root of the append-only `brief`.

```yaml
operator: Evan — solo, LCSW + senior eng/EM, runs Lucid Web Studios (Escondido)
hq: Deer Springs, Escondido, CA
contact: { phone: "+1 858-215-4894", email: "evan@lucidweb.studio", domain: "lucidweb.studio" }
market: North County San Diego — Escondido, San Marcos, Vista, Carlsbad, Oceanside, Encinitas
  (extended service area also covers Poway, Rancho Bernardo, Temecula, greater San Diego)
constraints: [minimal budget, no paid ads, grassroots, solo-operator throughput]
capability: static, SEO, conversion optimization, ecommerce, mobile apps  # back-pocket, not the pitch
wedges:
  W1: Local SEO for home-service & trade businesses (established; "I need more leads")
  W2: Launch packages for new service-based businesses (brand-new; "I need a website")
proof_assets_on_hand:
  - Recovery Labz (prior client work, case study)
  - Coin-Plugz (prior client work, case study)
  - 100/100 Lighthouse performance scores; 3–5x faster load times vs. prior sites
  - 10+ years software engineering / engineering-management background
  - Existing free website + free SEO/site audit funnel live at lucidweb.studio/free
```

## Grounding facts the agents must stay consistent with

These are pulled from the live site and treated as **frozen reality** — artifacts that
contradict them fail criterion **U3 (Upstream consistency)**.

- **Existing SEO pricing ladder** (single source of truth, `src/lib/seo-pricing.ts`):
  - *SEO Foundation Fix* — one-time, **custom quote** (scoped per site). Phase 1; every
    engagement starts here. Deliverables: 2 conditional/local landing pages, deep audit,
    CRO analytics install.
  - *Maintain* — **$500/mo** (1 content deliverable + 1 CRO tweak + monthly report)
  - *Grow* — **$850/mo** (one of each deliverable + 1 CRO tweak + report) — most popular
  - *Dominate* — **$1,200/mo** (two of each + unlimited CRO + A/B testing)
  - *Bundle:* 30% off the one-time Foundation Fix with a 6-month commit to Grow or higher.
- **Managed services** (each $10/mo, or hosting+email+analytics+CMS bundle $50/mo):
  Basic hosting $20/mo, Email Management, Analytics, CMS Management.
- **Build add-ons:** additional pages $20/page, custom design $50/page, CMS integration
  $50/page, page iterations $20/page. Ongoing changes: $150/hr.
- **Free funnel:** a genuinely-free starter website + free audit/report wizard already
  live at `/free` — this is the top-of-funnel hook, not a thing to reinvent.
- **Local-SEO machinery already shipped:** per-city pages for Escondido, Carlsbad,
  Oceanside, San Marcos, Vista, Encinitas, Poway, Rancho Bernardo, San Diego, Temecula,
  with `LocalBusiness` structured data and Escondido HQ. Lucid's own site is the first
  proof asset.

## Foundation invariants (apply to every stage)

1. **No paid ads, ever.** Any tactic requiring an ad budget fails U5 (Constraint fit).
2. **Solo throughput is the binding constraint.** If Evan can't run it alone in the hours
   a one-person shop has, it fails U4 (Executable now).
3. **Wedges are fixed.** Generators may sharpen W1/W2 but may never replace them.
4. **Local means *named*.** "Local businesses" is filler; "Vista HVAC contractors off
   the 78" is grounding. U2 enforces this.
