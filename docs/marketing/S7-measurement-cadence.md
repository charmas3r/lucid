# S7 — Measurement & Operating Cadence  ·  FROZEN

> Final verdict: **weighted 91.2 · passed ✅** (2 iterations). See `pipeline-log.md` §S7.

The instrument panel and the weekly loop that keeps S1–S6 running. Tracks *leading*
activity (audits sent), not just *lagging* revenue. Defines the cold→closed pipeline and a
weekly cadence one person can actually run.

---

## 7a · KPIs — leading indicators first

### Leading (activity — Evan fully controls these)
| KPI | Weekly target | Source |
|-----|--------------:|--------|
| Prospects sourced & qualified | 30 | S3 |
| **Video audits sent** ⭐ (the keystone metric) | **15** | S4 |
| Follow-up touches sent | 25–40 | S4 cadence |
| Discovery calls booked | 3–5 | — |
| Reviews requested (Lucid + clients) | ≥3 | S5 |
| Partner/presence touches (events, partner sheets, Nextdoor posts) | ≥3 | S6 |

> If only one number gets tracked, it's **audits sent/week = 15**. Everything downstream is
> a conversion rate on top of it; revenue follows activity with a lag.

### Lagging (outcomes — review monthly, don't obsess weekly)
| KPI | Target |
|-----|--------|
| New clients closed | 4–6 / month |
| **MRR** (Maintain/Grow/Dominate + Care Lite/Care+) | growing every month; milestone $5k → $10k |
| New case studies published | ≥1 / closed project (S5) |
| Lucid + client Google reviews | +reviews/month, ratings ≥4.7 |
| Audit→call rate / call→close rate | watch the trend, fix the weakest stage |

---

## 7b · Pipeline definition — cold → closed

| Stage | Enters when… | Exit / conversion checkpoint | Target conv. |
|-------|--------------|------------------------------|-------------:|
| **0 · Sourced** | qualified per S3 rule, tokens captured | video audit recorded & sent | — |
| **1 · Audited** | video audit sent (S4 touch 1) | any reply OR reaches touch 5 | ~25% reply |
| **2 · Engaged** | prospect replies / opens dialog | discovery call booked | ~60% |
| **3 · Call booked** | 15-min call scheduled | call held + scope agreed | ~70% held |
| **4 · Proposal** | quote sent (Foundation Fix/Grow **or** Launch) | verbal yes | ~40% |
| **5 · Closed-won** | deposit/first payment received | kickoff + baseline metrics (S5) | — |
| **↺ · Recurring** | on a retainer/care plan | retained ≥6 mo; upsell rung | churn <5%/mo |
| **✕ · Closed-lost / nurture** | explicit no or 5 touches done | re-enter after 90 days / trigger | — |

One CRM (free tier — e.g. a simple Kanban) holds these stages; each prospect carries its
S3 tokens and S4 touch count. The board *is* the dashboard.

---

## 7c · Weekly solo operating loop

A fixed week so business-dev survives heavy delivery weeks. ~8–10 hrs/wk of BizDev,
front-loaded each morning before client work.

| Day | Block (≈90 min) | Focus |
|-----|------------------|-------|
| **Mon** | AM | **Plan & source:** build the week's list to 30 qualified; set audit targets. PM delivery. |
| **Tue** | AM | **Audit day:** record & send 5 video audits (W1+W2). |
| **Wed** | AM | **Audit + follow-up:** 5 audits; run cadence touches 2–4. |
| **Thu** | AM | **Calls & close:** discovery calls, send proposals; 5 audits if time. |
| **Fri** | AM | **Proof & network:** publish/update a case study, request reviews, 1 partner/presence touch, GBP posts. |
| **Daily** | 15 min | CRM hygiene: advance stages, log touches, queue tomorrow's audits. |

### Friday 30-minute review (the control loop)
Run the deterministic check every Friday:
1. **Did audits sent hit 15?** If no → that's the root cause of a slow pipeline; fix next week's Mon sourcing.
2. **Where's the funnel leaking?** Lowest conversion stage in 7b → next week's improvement focus (better audit hook? faster follow-up?).
3. **MRR moved?** Log new recurring SKUs; note churn risk.
4. **Review queue (this system):** clear any human-flagged stage items (none currently).
5. **Re-arm:** reset weekly targets; carry warm prospects forward.

### Monthly (60 min)
Review lagging KPIs, MRR vs. $5k→$10k milestone, publish the month's case studies, refresh
partner relationships (S6), re-audit Lucid's own site/GBP (S5).

---

## The whole system on one page

```
S3 sources 30 ─▶ S4 sends 15 audits ─▶ replies ─▶ calls ─▶ S2 offer closes
     ▲                                                          │
     │                                                          ▼
S6 partners/presence feed sources        S5 turns each job into proof + reviews
     ▲                                                          │
     └───────────────── proof fuels referrals ◀────────────────┘
S7 = the Friday loop that measures audits-sent and fixes the weakest stage each week.
```

---

### Pipeline complete
All 7 artifacts frozen. No stage in the human-review queue — every stage passed
(≥85 weighted AND every criterion ≥2). Residual sub-85 criteria (worth a future pass) are
listed in `pipeline-log.md`.
