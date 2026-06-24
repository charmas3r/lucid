# Lucid Web Studios — Grassroots Marketing System

A staged marketing build produced through a **generator → evaluator → refine** loop.
Each stage emits one frozen artifact that feeds forward as immutable context. The loop
control is deterministic (sequencing, scoring math, branch logic, caps); only generation
and grading are stochastic.

> **Operator:** Evan — solo, LCSW + senior eng/EM, runs Lucid Web Studios (Escondido, CA)
> **Market:** North County San Diego
> **Constraints:** minimal budget · no paid ads · grassroots · solo-operator throughput

## How this was built

See [`pipeline-log.md`](./pipeline-log.md) for the full run record: every stage's
iterations, the evaluator's structured JSON verdict per iteration, and the
deterministic branch decision (`passed` / `plateaued` / cap). The loop control,
rubric, and agent contracts are documented in [`methodology.md`](./methodology.md).

## Artifacts (frozen)

| # | Stage | Artifact | Status |
|---|-------|----------|--------|
| S0 | Foundation | [`00-foundation.md`](./00-foundation.md) | seeded (not graded) |
| S1 | Wedge Positioning & ICP | [`S1-positioning-icp.md`](./S1-positioning-icp.md) | ✅ passed |
| S2 | Offer Architecture & Pricing | [`S2-offer-architecture.md`](./S2-offer-architecture.md) | ✅ passed |
| S3 | Target Acquisition Spec | [`S3-target-acquisition.md`](./S3-target-acquisition.md) | ✅ passed |
| S4 | Outreach Sequences | [`S4-outreach-sequences.md`](./S4-outreach-sequences.md) | ✅ passed |
| S5 | Proof & Reputation Assets | [`S5-proof-reputation.md`](./S5-proof-reputation.md) | ✅ passed |
| S6 | Referral & Network Engine | [`S6-referral-network.md`](./S6-referral-network.md) | ✅ passed |
| S7 | Measurement & Operating Cadence | [`S7-measurement-cadence.md`](./S7-measurement-cadence.md) | ✅ passed |

## Review queue (human-flagged stages)

Stages that hit the iteration cap or plateaued **without passing** carry their best
artifact forward anyway (the pipeline never hard-blocks) and land here for Evan to
clear, with their lowest-scoring criteria attached.

**Current queue: empty.** All 7 stages passed (≥85 weighted AND every criterion ≥2).
See `pipeline-log.md` for the residual sub-85 criteria worth a second pass anyway.

## Start-here for Evan

If you read nothing else, read in this order:
1. `S1` — who you are to the market and how you'll be referred.
2. `S2` — the exact packages and prices to quote.
3. `S3` + `S4` — where to find prospects this week and what to send them.
4. `S7` — the weekly loop that keeps all of the above running.
