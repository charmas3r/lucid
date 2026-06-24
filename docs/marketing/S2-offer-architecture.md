# S2 — Offer Architecture & Pricing  ·  FROZEN

> Final verdict: **weighted 88.9 · passed ✅** (4 iterations). See `pipeline-log.md` §S2.

Productized packages with real dollars, a clean ladder, and ≥1 recurring SKU per wedge.
All prices reconcile with `src/lib/seo-pricing.ts` and `/pricing` (U3). Where this stage
introduces a *new* productized bundle, it is assembled from existing site SKUs so nothing
contradicts live pricing.

---

## The ladder (one shared spine, two entry doors)

```
              ENTRY                 →   RECURRING (the business)        →   EXPANSION
W1 (trades):  SEO Foundation Fix*   →   Maintain $500 / Grow $850 /         Dominate $1,200
              (custom quote)            Dominate $1,200 /mo                  + CRO/A-B
W2 (new biz): Launch Package (flat) →   Care Plan $99–$149 /mo  →           graduate into
              $900 / $1,800             (hosting+managed+content lite)       Grow/Dominate SEO
```
*`SEO Foundation Fix` stays a **custom quote, scoped per site** — do not publish a flat
number; it is deliberately bespoke in the live pricing module.

No tier overlaps: Foundation Fix is one-time technical groundwork; care plans are
light-touch retention; SEO retainers are growth output. A client occupies exactly one
recurring SKU at a time and moves *up* the rungs.

---

## W1 — Established trades (SEO-led)

### Entry · SEO Foundation Fix — *custom quote* (one-time)
Already live. Phase-1 deep technical fix. Deliverables (frozen from site): 2 conditional
landing / local-service pages, comprehensive audit with deeper tooling, CRO analytics
install. **Sales framing:** "We fix the foundation once, then choose how fast you grow."
- **Bundle hook (existing):** 30% off the Foundation Fix with a 6-month commit to Grow or
  higher. Lead with this — it converts the one-timer into recurring on day one.

### Recurring · monthly SEO retainers (the business — frozen pricing)
| Tier | Price | What recurs | Best for |
|------|-------|-------------|----------|
| **Maintain** | **$500/mo** | 1 content deliverable + 1 CRO tweak + monthly report | single-trade, single-city, holding ground |
| **Grow** ⭐ | **$850/mo** | one of each (local page + conditional LP + targeted blog) + 1 CRO tweak + report | the default recommendation; multi-city ambition |
| **Dominate** | **$1,200/mo** | two of each + unlimited CRO + A/B testing + experiment reporting | competitive trade in a contested city |

### Add-on SKUs (attach to any tier)
- Managed **hosting $20/mo**, **Email $10/mo**, **Analytics $10/mo**, **CMS $10/mo** —
  or the **$50/mo all-in** managed bundle.
- Ad-hoc changes **$150/hr**; extra pages **$20**, custom design **$50/page**.

**Recurring-revenue anchor (W1):** the retainer is anchored to *lead value*, not labor —
"one extra HVAC install or roof is $8k–$20k; Grow is $850/mo." A single recovered job pays
for months of retainer, which is the entire ROI argument.

---

## W2 — New service businesses (launch-led)

The launch package is a **new productized bundle** assembled from existing site SKUs
(base build + add-ons + GBP setup), so it introduces no pricing conflict.

### Entry · Launch Package (flat, one-time)
| Package | Price | Includes | Timeline |
|---------|-------|----------|----------|
| **Launch** | **$900** flat | 3-page fast site (home / services / contact), mobile-first, structured data + local-SEO foundation, Google Business Profile claim & setup, contact form + tracking, 1 revision round | ~2 weeks |
| **Launch Pro** | **$1,800** flat | Everything in Launch + up to 6 pages, custom (non-template) design, CMS integration so they edit themselves, 2 revision rounds, review-link + first-reviews setup | ~3 weeks |

Per-page math reconciles with site add-ons (additional pages $20, custom design $50/page,
CMS $50/page, iterations $20) — the flat price packages those so the buyer sees one number.

**The `/free` on-ramp:** start eligible prospects with the existing free starter site to
earn trust, then convert to Launch/Launch Pro for the real, found-on-Google build.

### Recurring · Care Plan (the W2 business — NEW recurring SKU)
| Plan | Price | What recurs | Anchored to |
|------|-------|-------------|-------------|
| **Care Lite** | **$99/mo** | hosting + SSL/uptime/backups + 1 small content/CRO tweak + GBP post + monthly check-in | "stay live, stay fresh, stay found" |
| **Care+** | **$149/mo** | Care Lite + email OR analytics management + monthly performance snapshot + priority changes | early-growth peace of mind |

Care Lite = existing managed bundle ($50/mo) + light monthly content, productized at $99 so
there is a clean recurring SKU *for the W2 wedge* (the floor-fixing requirement). As the
business grows, Care+ graduates into the **Grow $850** SEO retainer — same spine, no rebuild.

**Recurring-revenue anchor (W2):** "Your site is the cheapest employee you have — $99/mo
keeps it working, found, and current. Cancel anytime." Low enough that a 0–18-month
business says yes without a board meeting; sticky because it bundles the things they'd
otherwise forget (backups, GBP, updates).

---

## Ladder economics (why this is solvable solo)

- **Recurring base is the goal**, not project revenue. Target mix in S7: project cash funds
  the month; **MRR** (retainers + care plans) is the compounding asset.
- Worked example: 8 Care Lite ($99) + 4 Maintain ($500) + 3 Grow ($850) + 1 Dominate
  ($1,200) ≈ **$6,342 MRR** — achievable solo because care plans are low-touch and the SEO
  content cadence is fixed-scope per tier.
- Every W2 launch is a **future W1/SEO upsell**; every W1 Foundation Fix is a **future
  retainer** via the 30% bundle. The ladder is designed so each entry sale plants a
  recurring sale.

---

### Frozen note for downstream stages
- S3 throughput targets must fund *this* ladder (e.g., enough audits/week to close ~1–2
  retainers + ~2–3 launches/month).
- S4's asks terminate in one of: **free audit → Foundation Fix/Grow (W1)** or **free
  starter/audit → Launch (W2)**.
- S7's MRR KPI tracks the recurring SKUs named here (Maintain/Grow/Dominate, Care Lite/Care+).
