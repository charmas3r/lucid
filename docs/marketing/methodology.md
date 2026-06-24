# Methodology — Generator/Evaluator Loop

Deterministic control flow wraps two stochastic agents. This file is the contract; the
[`pipeline-log.md`](./pipeline-log.md) is the execution record.

## Loop control (deterministic)

```python
brief = load_foundation()

for stage in PIPELINE:                       # S1 .. S7
    best, history = None, []
    for i in range(1, 10):                   # MAX 9 iterations per stage
        artifact = generator(stage, brief, history)        # stochastic (temp ~0.7 iter1, ~0.4 refine)
        verdict  = evaluator(stage, artifact, brief)       # stochastic -> structured JSON (temp ~0.2)
        history.append((artifact, verdict))

        if best is None or verdict.weighted > best.verdict.weighted:
            best = Record(artifact, verdict)               # keep best-so-far, never regress

        if verdict.passed:                   # rubric threshold + floor met
            break
        if plateaued(history):               # diminishing returns -> stop early
            break

    brief.freeze(stage, best.artifact)       # carry BEST forward even if not passed
    if not best.verdict.passed:
        brief.flag_for_human(stage, best.verdict)   # surface to Evan, don't block pipeline


def plateaued(history):
    if len(history) < 3: return False
    w = [h[1].weighted for h in history]
    return (w[-1] - max(w[:-1]) < 1.0) and (w[-2] - max(w[:-2]) < 1.0)
```

The branch (`passed` / `plateaued` / advance) is fully deterministic given the structured
verdict. Passed artifacts freeze and feed forward as immutable context.

## Rubric

Each criterion scored **0–4**. Weighted sum normalized to 100.

```
passed = (weighted_normalized >= 85) AND (min(all_criterion_scores) >= 2)
```

The floor (≥2 on every criterion) is the anti-gaming guard: a 95 with a single 1 still
fails.

### Universal criteria (every stage)

| ID | Criterion | Weight |
|----|-----------|--------|
| U1 | Specificity — concrete, named, numeric; zero generic filler | ×2 |
| U2 | Local grounding — real NC cities/channels/businesses, not generic "local" | ×2 |
| U3 | Upstream consistency — coherent with frozen brief & prior artifacts | ×2 |
| U4 | Executable now — Evan could act this week, solo, with current resources | ×3 |
| U5 | Constraint fit — minimal-budget / grassroots / no-ads feasible | ×2 |

### Stage-specific criteria (each ×2 unless noted)

```
S1  S1a Niche sharpness   S1b ICP precision        S1c Differentiation
S2  S2a Tier logic        S2b Price realism (×3)   S2c Recurring revenue
S3  S3a Source concreteness  S3b Qualification rule  S3c Throughput
S4  S4a Value-first       S4b Cadence              S4c Wedge tailoring
S5  S5a Proof mechanism   S5b Review system        S5c Own-site-as-proof
S6  S6a Partner fit       S6b Incentive structure  S6c Presence plan
S7  S7a Leading indicators   S7b Pipeline definition  S7c Cadence
```

### Normalization

`weighted = round( 100 * sum(score_i * weight_i) / (4 * sum(weight_i)), 1 )`.
Universal weights sum to 11; stage weights sum to 6 (S2 = 7 because S2b is ×3). So a
stage's denominator is `4 * (11 + 6) = 68`, or `4 * (11 + 7) = 72` for S2.

## Agent contracts

**Generator** — produce/refine the artifact to satisfy the rubric. Sees the frozen
brief, stage spec, rubric, and the prior verdict's feedback. Outputs *only* the artifact
in the stage schema. Must address every prior-feedback item explicitly and never re-open
the wedge choice.

**Evaluator** — independent, harsh grader with no incentive to pass. Sees only the
artifact, brief, and rubric — never the generator's reasoning. Emits strict JSON:
`scores`, `weighted`, `floor_violations`, `passed`, `feedback[]`. Every feedback item
names the exact criterion, states the issue, proposes a concrete fix. No praise padding.
Floor violations are listed even when `weighted >= 85`.

## Finishing criteria

- **Per stage:** `passed` OR 9 iterations OR plateau (no >1.0 gain over 2 iterations).
- **Pipeline:** all 7 artifacts frozen. Any stage that hit cap/plateau without passing is
  surfaced to Evan with its lowest-scoring criteria and the evaluator's last feedback.
