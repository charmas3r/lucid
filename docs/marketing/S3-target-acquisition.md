# S3 — Target Acquisition Spec  ·  FROZEN

> Final verdict: **weighted 88.2 · passed ✅** (3 iterations). See `pipeline-log.md` §S3.

Where Evan finds prospects, the explicit rule that qualifies one, and throughput numbers a
solo operator can actually sustain. Every source is free or near-free (U5). Qualification
rules match the S1 ICP signals verbatim (U3).

---

## W1 sources — established trades

| # | Source | How to work it (free/low-cost) | Yield/effort |
|---|--------|--------------------------------|--------------|
| 1 | **Google Maps "[trade] [city]" sweep** | Search "hvac escondido", "roofing vista", "pool repair san marcos" etc. Record businesses ranking **4–15** (not the top 3 — they don't need you). Capture name, site, review count, rating. | High — the core list |
| 2 | **Google Business Profiles with weak/no website** | In the same sweep, flag GBPs with no website link or a Facebook/Wix URL. | High |
| 3 | **Lead-app refugees** | Businesses advertising on Yelp / showing in Angi/Thumbtack but ranking poorly organically — they're already paying for leads and will understand ROI instantly. | High intent |
| 4 | **Nextdoor "recommendations" threads** (NC neighborhoods) | Trades repeatedly recommended by neighbors but with a bad/no site — demand exists, presence doesn't. | Medium, warm |
| 5 | **Drive-by / yard signs & truck wraps** | Escondido/San Marcos/Vista neighborhoods: photograph trade trucks & yard signs, look them up that night. Hyper-local, zero cost. | Medium, very local |
| 6 | **Permit & contractor data** | CSLB license lookup + city permit feeds to confirm "established 2+ yrs, licensed" and get owner names. | Medium, qualifying |

### W1 qualification rule (explicit)
```
QUALIFIES_W1 if ALL:
  - vertical ∈ {HVAC, plumbing, electrical, roofing, pool, hardscape/landscape,
                garage door, pest, painting, tree}
  - city ∈ NC service area
  - established ≥ 2 years (CSLB / GBP age / reviews over time)
  - ranks BELOW map-pack top-3 for "[trade] [city]"
  AND at least ONE pain signal:
  - slow/absent/Facebook-only website
  - <40 Google reviews OR rating < 4.6
  - currently advertising on a shared-lead app (Angi/HomeAdvisor/Thumbtack/Yelp)
DISQUALIFY if: national franchise · already ranks #1–3 with 100+ reviews ·
               new-construction sub with no consumer search demand
```

---

## W2 sources — new service businesses

| # | Source | How to work it | Yield/effort |
|---|--------|----------------|--------------|
| 1 | **New GBPs with no website** | Google Maps for target verticals filtered to recently-opened listings lacking a website link. | High |
| 2 | **CA SOS / county fictitious-business-name (DBA) filings** | NC County DBA filings (published in local legal notices) = brand-new businesses, owner names, addresses. Free public record. | High, fresh |
| 3 | **Instagram local-business discovery** | Geo/hashtag search (#encinitasmedspa, #carlsbadtrainer, #vistacleaning) for active accounts with a Linktree but no real site. | High, contactable |
| 4 | **Chamber "new member" announcements** | Escondido, San Marcos, Vista, Carlsbad, Oceanside, Encinitas chambers publish new members — many brand-new. | Medium, warm |
| 5 | **Commercial lease / "coming soon" signals** | New "coming soon" storefront signage and new commercial leases (CoStar-lite via LoopNet, drive-bys). | Medium |
| 6 | **`/free` inbound** | The live free-site/audit funnel — inbound W2 leads who self-identify. Work these first; they raised a hand. | Highest intent |

### W2 qualification rule (explicit)
```
QUALIFIES_W2 if ALL:
  - vertical ∈ {med-spa/wellness, therapy/counseling, trainer/fitness, home-service
                startup, salon/barber, realtor, consultant/coach, pet groomer, photographer}
  - city ∈ NC service area
  - business age 0–18 months (DBA date / GBP age / "est. 2025/2026")
  AND at least ONE signal:
  - no website OR Linktree/IG/FB-only
  - "coming soon"/parked domain
  - new GBP with no site link
  - recently signed lease / chamber new-member
DISQUALIFY if: pre-revenue idea stage · product/ecommerce-first · needs custom app
```

---

## Throughput targets (solo-sustainable)

Built around a realistic solo week (Evan also delivers client work). Activity, not hope.

| Activity | Daily | Weekly | Notes |
|----------|------:|-------:|-------|
| New prospects sourced & qualified | 6 | **30** | ~45 min/day list-building from the sources above |
| Personalized **video audits** recorded & sent | 3 | **15** | the core top-of-funnel act (S4); ~10–12 min each |
| Follow-ups sent (per cadence) | 5–8 | **25–40** | mostly templated; tracked in CRM |
| Discovery calls booked | — | **3–5** | expected from 15 audits/wk |
| New clients closed | — | **1–2 / week** | mix of W1 retainers + W2 launches |

**Funnel math (steady state):** 30 qualified → 15 audits → ~4 replies → ~3 calls → ~1–2
closes per week. ≈ **4–6 new clients/month**, which comfortably funds the S2 ladder and
builds MRR. If a week only allows 8 audits (heavy delivery week), the cap floats down — the
rule is "audits sent" is the throttle, and it's the S7 leading indicator.

**Daily time budget:** ~2 hrs of business development (45 min sourcing + ~60–75 min audits +
follow-ups), defended as the first block of the morning before delivery work.

---

### Frozen note for downstream stages
- S4 consumes the **15 video audits/week** number — the script must be repeatable in ~10 min.
- S7's top leading indicator is **audits sent/week** (target 15), with sourcing (30) and
  follow-ups as supporting activity metrics.
