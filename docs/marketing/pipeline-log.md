# Pipeline Run Log

Execution record of the generator/evaluator loop defined in [`methodology.md`](./methodology.md).
For each stage: the per-iteration trajectory (generator temp, evaluator `weighted`, floor
violations, deterministic branch), the **final frozen verdict** as strict evaluator JSON,
and residual sub-85 criteria worth a future pass.

Normalization recap: `weighted = round(100 * Σ(score·weight) / (4·Σweight), 1)`.
Σweight = 17 (denominator 68) for every stage except **S2**, where S2b is ×3 so Σweight = 18
(denominator 72). `passed = weighted ≥ 85 AND min(scores) ≥ 2`.

Branch legend: `refine` = not passed, not plateaued → next iteration · `pass` = threshold +
floor met → freeze · `cap`/`plateau` = stop early, carry best.

---

## §S1 — Wedge Positioning & ICP  →  PASSED @ 91.2 (3 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 69.1 | `["S1b"]` (ICP "contractors" too broad to qualify) | refine |
| 2 | 0.40 | 83.8 | — | refine (≥floor but <85) |
| 3 | 0.40 | **91.2** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 4, "U2": 3, "U3": 4, "U4": 4, "U5": 4, "S1a": 4, "S1b": 2, "S1c": 4 },
  "weighted": 91.2,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "S1b", "issue": "ICP is precise but the W2 vertical list is broad; qualifying signals carry the weight.",
      "fix": "Acceptable to pass. For a future pass, rank the W2 verticals by close-rate once real data exists." },
    { "criterion": "U2", "issue": "Strong city naming; W1 leans on Escondido/San Marcos/Vista — Oceanside/Carlsbad slightly under-named.",
      "fix": "Minor. Add one coastal-trade example (e.g., Carlsbad pool service) when sourcing confirms demand." }
  ]
}
```
Iter-1 fix applied: replaced "contractors" with named trades (HVAC, plumbing, roofing, pool,
hardscape…) + explicit buying signals, which cleared the S1b floor.
**Residual <85 to revisit:** S1b (ICP precision) = 2.

---

## §S2 — Offer Architecture & Pricing  →  PASSED @ 88.9 (4 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 70.8 | `["S2b"]` (invented flat SEO price, contradicting the live custom-quote) | refine |
| 2 | 0.40 | 81.9 | — | refine |
| 3 | 0.40 | 84.7 | — | refine (gain >1.0, not plateaued) |
| 4 | 0.40 | **88.9** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 4, "U2": 4, "U3": 4, "U4": 4, "U5": 4, "S2a": 3, "S2b": 4, "S2c": 2 },
  "weighted": 88.9,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "S2c", "issue": "W2 recurring SKU (Care Lite $99) is real but its value anchor is thinner than the W1 retainer's lead-value ROI.",
      "fix": "Acceptable to pass. Strengthen with a concrete retention stat once 3–4 care-plan clients exist." },
    { "criterion": "S2a", "issue": "Ladder is clean; the W2→W1 graduation point (Care+ → Grow) could be a hair more explicit on the trigger.",
      "fix": "Name the revenue/traffic threshold that triggers the upsell when real data exists." }
  ]
}
```
Iter-1 fix applied: reverted to the live **custom-quote** Foundation Fix and assembled the
W2 Launch flat price from existing site SKUs, clearing the S2b (price realism) floor and
restoring U3 consistency with `src/lib/seo-pricing.ts`.
**Residual <85 to revisit:** S2c (recurring-revenue anchor, W2) = 2.

---

## §S3 — Target Acquisition Spec  →  PASSED @ 88.2 (3 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 72.1 | `["S3b"]` (no explicit "qualifies if…" rule) | refine |
| 2 | 0.40 | 83.8 | — | refine |
| 3 | 0.40 | **88.2** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 3, "U2": 4, "U3": 4, "U4": 4, "U5": 4, "S3a": 4, "S3b": 3, "S3c": 2 },
  "weighted": 88.2,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "S3c", "issue": "15 audits/week is sustainable in a light delivery week; heavy delivery weeks will float it down.",
      "fix": "Acceptable to pass. S7 already makes 'audits sent' the floating throttle — track the realized average over 4 weeks." },
    { "criterion": "U1", "issue": "Sources are concrete; a couple (permit feeds, LoopNet) are directional rather than step-by-step.",
      "fix": "Document the exact CSLB + county DBA lookup URLs in a runbook before relying on them." }
  ]
}
```
Iter-1 fix applied: added explicit `QUALIFIES_W1 / QUALIFIES_W2 if ALL … AND ≥1 signal`
boolean rules matching the S1 ICP signals verbatim, clearing the S3b floor.
**Residual <85 to revisit:** S3c (throughput realism under load) = 2.

---

## §S4 — Outreach Sequences  →  PASSED @ 89.7 (3 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 75.0 | `["S4c"]` (W1 and W2 audit scripts nearly identical) | refine |
| 2 | 0.40 | 83.8 | — | refine |
| 3 | 0.40 | **89.7** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 4, "U2": 4, "U3": 4, "U4": 3, "U5": 4, "S4a": 4, "S4b": 3, "S4c": 3 },
  "weighted": 89.7,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "U4", "issue": "15 personalized video audits/week is doable but is the tightest solo time commitment in the system.",
      "fix": "Acceptable. Batch-record on Tue/Wed; keep each audit to ~10 min using the S4 token sheet." },
    { "criterion": "S4b", "issue": "5-touch cadence with a hard stop is clean; the 90-day re-entry trigger could be automated.",
      "fix": "Add a CRM reminder rule so seasonal (W1) / grand-opening (W2) re-entry fires automatically." }
  ]
}
```
Iter-1 fix applied: differentiated the audit checkpoints — W1 critiques rankings/GBP/
lead-broker spend; W2 critiques legitimacy/findability/conversion (no rankings to critique
yet) — clearing the S4c (wedge tailoring) floor.
**Residual <85 to revisit:** none below floor; U4 and S4b = 3 are the soft spots.

---

## §S5 — Proof & Reputation Assets  →  PASSED @ 86.8 (3 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 73.5 | `["S5b"]` (review "ask" had no timing/cadence — not a system) | refine |
| 2 | 0.40 | 82.4 | — | refine |
| 3 | 0.40 | **86.8** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 4, "U2": 4, "U3": 3, "U4": 3, "U5": 4, "S5a": 4, "S5b": 2, "S5c": 4 },
  "weighted": 86.8,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "S5b", "issue": "Review ritual now has timing (Day 7 / 14 / 60) but still leans on manual sends.",
      "fix": "Acceptable to pass. Templatize the asks in the CRM and trigger Day-7 automatically on 'site live'." },
    { "criterion": "U4", "issue": "Capturing baseline metrics at every kickoff is a discipline that's easy to skip under delivery pressure.",
      "fix": "Add baseline capture as a hard checklist item in the kickoff stage (S7 pipeline stage 5)." },
    { "criterion": "U3", "issue": "Relies on Sanity case-study + mobile-snapshot machinery; correct, but assumes Evan keeps publishing.",
      "fix": "Enforce the '1 case study per closed project' rule in the Friday loop." }
  ]
}
```
Iter-1 fix applied: turned the bare ask into a calendar-driven ritual (Day 7 / 14 / 60 +
quarterly) with explicit targets (≥1 review/30d, ≥1 testimonial/90d), clearing S5b's floor.
**Residual <85 to revisit:** S5b (review-system automation) = 2 — lowest final score in the
pipeline; first candidate for a future refinement pass.

---

## §S6 — Referral & Network Engine  →  PASSED @ 88.2 (3 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 76.5 | `["S6b"]` ("offer a referral fee" — no actual terms) | refine |
| 2 | 0.40 | 83.8 | — | refine |
| 3 | 0.40 | **88.2** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 4, "U2": 4, "U3": 4, "U4": 4, "U5": 4, "S6a": 3, "S6b": 3, "S6c": 2 },
  "weighted": 88.2,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "S6c", "issue": "Presence plan names real rooms (Escondido Chamber, a BNI/LeTip chapter, Nextdoor) but the full cadence is ambitious for a solo operator's weekly hours.",
      "fix": "Acceptable to pass. Start with 2 rooms (Escondido Chamber + 1 BNI/LeTip seat); add others only once delivery load allows." },
    { "criterion": "S6a", "issue": "Partner archetypes are well-chosen and non-competing; the GC/supplier channel is the least proven.",
      "fix": "Pilot one print shop and one designer relationship before scaling the partner sheet." }
  ]
}
```
Iter-1 fix applied: replaced vague incentives with concrete terms ($150/W2 close, $250/W1
close, 10%×6mo recurring share, client referral = 1 free month), clearing the S6b floor.
**Residual <85 to revisit:** S6c (presence cadence vs. solo time) = 2.

---

## §S7 — Measurement & Operating Cadence  →  PASSED @ 91.2 (2 iters)

| Iter | Gen temp | weighted | floor_violations | branch |
|-----:|---------:|---------:|------------------|--------|
| 1 | 0.70 | 82.4 | — (S7a leading-indicators weak but ≥2) | refine (<85) |
| 2 | 0.40 | **91.2** | — | **pass** |

**Final verdict (frozen):**
```json
{
  "scores": { "U1": 4, "U2": 3, "U3": 4, "U4": 4, "U5": 4, "S7a": 4, "S7b": 3, "S7c": 4 },
  "weighted": 91.2,
  "floor_violations": [],
  "passed": true,
  "feedback": [
    { "criterion": "S7b", "issue": "Cold→closed stages and conversion checkpoints are defined; the conversion-rate targets are estimates until real funnel data lands.",
      "fix": "Acceptable to pass. Replace estimated conversion % with measured rates after the first ~30 audits." },
    { "criterion": "U2", "issue": "Operating loop is location-agnostic by nature; lightly grounded vs. earlier stages.",
      "fix": "Minor — the system inherits local grounding from S3/S4/S6 inputs." }
  ]
}
```
Iter-1 fix applied: elevated **audits-sent/week** to the keystone leading indicator (was
buried under revenue), raising S7a from 2→4 and clearing the <85 gap.
**Residual <85 to revisit:** none below floor; S7b and U2 = 3.

---

## Pipeline summary

| Stage | Iters | Final weighted | Min criterion | Passed | In review queue |
|-------|------:|---------------:|--------------:|:------:|:---------------:|
| S1 | 3 | 91.2 | 2 (S1b) | ✅ | no |
| S2 | 4 | 88.9 | 2 (S2c) | ✅ | no |
| S3 | 3 | 88.2 | 2 (S3c) | ✅ | no |
| S4 | 3 | 89.7 | 3 | ✅ | no |
| S5 | 3 | 86.8 | 2 (S5b) | ✅ | no |
| S6 | 3 | 88.2 | 2 (S6c) | ✅ | no |
| S7 | 2 | 91.2 | 3 | ✅ | no |

- **All 7 artifacts frozen; review queue empty** (every stage hit ≥85 AND floor ≥2).
- **Generate+evaluate pairs spent: 21** of a 63 worst-case budget — plateau/pass early-stop
  cut it by ~67%. No stage hit the 9-iteration cap or plateaued without passing.
- **Lowest final criteria across the system** (priority order for a future refinement pass):
  S5b (review-system automation) · S2c (W2 recurring anchor) · S3c (throughput under load) ·
  S6c (presence cadence) · S1b (ICP precision).
