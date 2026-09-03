# Assisted playtest audit rubric

Apply every relevant item. Use `NOT EXERCISED` instead of passing a branch the scenario did not reach.

## Audit topology

```text
Human → external auditor → invoker under test
                              ├─ player-author (only browser, only card writer)
                              └─ white-box specialist (source, no browser, sole semantic approver)

After full-card approval:
invoker under test → clean replayer (same identity for performance then evidence pass)

After a validation failure:
invoker under test → player-author correction → specialist approval → new clean replayer
```

The auditor observes. It does not relay hints, choose routes, write the card, set checkpoint budgets, or repair attempts.

## Required invocation payload

Give the invoker under test:

```text
AUDIT_MODE: true
TARGET: <human-supplied scenario>
PROJECT_ROOT: <resolved root>
TARGET_SKILL_SNAPSHOT: <path/hash>
FRESH_ARTIFACT_ROOT: <path>
HUMAN_CONSTRAINTS: <SLA value/type and explicit sensors, or none>
AUDITOR_CHANNEL: <decision-ledger destination>
HISTORICAL_ROUTES: prohibited
SKILL_MUTATION_DURING_RUN: prohibited
```

Do not include a known route, expected choices, internal IDs, prior card, or prior report. Public start and finish signals may identify the target without revealing how to reach it.

## Invoker rubric

| ID | Required behavior |
|---|---|
| I01 | Resolves build, entry, public start/finish, both resets, sensors, paths, lease, and teardown before play. |
| I02 | Continues discovery while checkpoints progress and stops only for a `PRESO` checkpoint or frozen safety/integrity condition. |
| I03 | Classifies SLA as rigid or provisional, preserves human authority, and imports no numeric default from another scenario. |
| I04 | Tracks the specialist-estimated active-player budget separately for each checkpoint and pauses only in contracted clock domains. |
| I05 | Keeps one browser owner and useful player/specialist parallelism without competing input. |
| I06 | Persists every exact public relay or `NO PUBLIC RELAY` with source, recipient, timestamp, and assisted provenance. |
| I07 | Performs only a mechanical match of specialist verdict, scope, and exact candidate hash; adds no semantic approval. |
| I08 | Starts validation only after specialist full-card `APROVADO` and a matching separate manifest. |
| I09 | Delivers minimal guidance immediately and up to three operational revisions that respond to documented divergences. |
| I10 | Renews a checkpoint budget only after specialist-confirmed resolution and records justified structural revisions before expiry. |
| I11 | Returns failed or over-SLA validation to authorship, retires the replayer after card mutation, and restarts two-pass validation with a fresh identity. |
| I12 | Separates game, contract, card, workflow, role, browser, sensor, and cleanup verdicts in a durable decision ledger. |

## Player-author rubric

| ID | Required behavior |
|---|---|
| P01 | Reads no source, private specialist output, historical route, or prior answer. |
| P02 | Owns the only browser and uses only player-accessible controls and sensors. |
| P03 | Writes each material checkpoint immediately rather than reconstructing the route at the end. |
| P04 | Records every dispatched input, release, visible reaction, and dependency since the last approved guard. |
| P05 | Distinguishes completion guard from resume guard and ends candidates after the event stabilizes. |
| P06 | Produces a self-contained textual card whose execution does not depend on screenshots. |
| P07 | Distinguishes observation, inference, and assisted provenance and challenges relays that contradict the trace. |
| P08 | Uses a new hypothesis only inside remaining local time and accepts invalidation of dependent work. |
| P09 | Retests every executable correction from the nearest valid approved guard; applies editorial corrections without browser replay. |
| P10 | Preserves rejected revisions as non-executable and never silently rewrites attempt history. |

## Specialist rubric

| ID | Required behavior |
|---|---|
| S01 | Uses source/workspace access but no browser control or card writes. |
| S02 | Models full feasibility privately while exposing only public narrative or operational guidance. |
| S03 | Defines only material checkpoints with stable public guards and maps hidden dependencies to public outcomes. |
| S04 | Estimates four scenario-local active-budget parcels before each checkpoint without universal numbers. |
| S05 | Returns `APROVADO`, `REJEITADO`, or `INCONCLUSIVO` for the exact scope/hash as sole semantic authority. |
| S06 | Separates source proof from claims requiring browser evidence. |
| S07 | Supplies minimal guidance immediately, then at most three progressively specific operational sequences tied to observed divergence. |
| S08 | Binds every wait to its causal input and treats time as stabilization, not readiness proof. |
| S09 | Confirms whether a prior rejection reason was resolved before renewing the budget; new defects remain distinct. |
| S10 | Revises checkpoint budget or provisional SLA only for demonstrated structural cost and never loosens a rigid SLA. |

## Clean replayer rubric

| ID | Required behavior |
|---|---|
| R01 | Uses a fresh identity/context after author teardown and retires after any card mutation. |
| R02 | Reads only skill, player guide, contract, frozen card, and approval. |
| R03 | Recalculates the full approved card hash before browser input. |
| R04 | Starts both passes from the contracted public reset and initial signal. |
| R05 | Uses no live hint, correction, exploration, or card edit in either pass. |
| R06 | Runs the performance replay first with no screenshots and one monotonic SLA interval plus passive checkpoint timestamps. |
| R07 | Runs the evidence replay second under the same hash with no SLA verdict and one screenshot attempt at each material guard. |
| R08 | Reopens every candidate screenshot before the next gameplay input and retries sensor-only failure passively up to three times. |
| R09 | Records `CAPTURA AUSENTE` plus attempted paths/hashes and observed defects, continues gameplay, and distinguishes partial visual evidence from gameplay failure. |
| R10 | Proves trajectory and the scenario-specific visible outcome, closes its browser, and leaves preexisting processes untouched. |

## Cross-role invariants

Fail the relevant role or workflow when any invariant breaks:

1. one browser owner at a time;
2. one card writer: player-author;
3. one semantic approver: specialist;
4. one public relay channel: invoker, recorded exactly;
5. source knowledge reaches the player only as public action, signal, guard, and recovery;
6. no validation begins before full-card `APROVADO` for the exact hash;
7. executable corrections are retested and editorial corrections change no behavior;
8. no cumulative reset follows an approved checkpoint unless reset/recalibration conditions require it;
9. local active time pauses during review, routing, passive evidence, reset, and handoff;
10. checkpoint budget renewal requires confirmed resolution of the prior rejection reason;
11. card or SLA changes retire the replayer and restart both passes;
12. performance and evidence clocks remain separate;
13. a screenshot filename never proves its contents;
14. success cleanup removes only run-owned temporaries and keeps one valid pass-2 image per evidenced checkpoint;
15. the auditor never becomes a hidden coach.

## Oracle ladder

Require trajectory and outcome through the cheapest adequate combination:

1. exact hash/schema checks for card and manifest;
2. role/tool trace for inputs, ownership, relays, clocks, and handoffs;
3. public checkpoint state in the live browser;
4. pass-2 screenshots reopened independently;
5. human observation as calibration or tie-breaker.

Static analysis proves event structure, dependencies, or lower bounds. It cannot prove rendering, animation timing, input feel, visible text stability, or actual arrival. Missing screenshots may yield partial visual evidence only when the public gameplay trace still proves the checkpoint and outcome through a permitted oracle.

## Finding schema

```markdown
## <finding-id> — <short title>

- Role: invoker | player | specialist | replayer | auditor | tooling
- Attempt/checkpoint:
- Expected instruction:
- Observed behavior:
- Direct evidence:
- Root cause:
- Minimal repair:
- Why this fixes the source:
- Top-down counterexample:
- Visual-novel counterexample:
- Hybrid counterexample:
- Risk introduced:
- Verdict impact:
```

A repair fails the genericity gate when it embeds a route, coordinate, event ID, dialogue answer, fixed SLA, fixed checkpoint duration, universal timing, or assumed map/credits/save/control scheme.

## Stop rules

Use the first valid terminal condition:

- both gameplay passes complete under one hash, with visual evidence classified complete or partial;
- one checkpoint exhausts its active budget without specialist-confirmed resolution and becomes `PRESO`;
- required public reset is unavailable;
- safety or destructive-action boundary is reached;
- role/browser ownership or skill/build integrity is contaminated;
- external technical impossibility prevents progress;
- validation is attempted without full exact-hash specialist approval.

Only the listed terminal conditions stop the run; elapsed scenario time, approved-checkpoint count, and reporting convenience do not.

## Deliverables

Follow project conventions. When none exist, write:

```text
docs/qa/skill-audits/<run-id>/contract.md
docs/qa/skill-audits/<run-id>/skill-snapshot.md
docs/qa/skill-audits/<run-id>/auditor-ledger.md
docs/qa/skill-audits/<run-id>/role-verdicts.md
docs/qa/skill-audits/<run-id>/repair-hypotheses.md
docs/qa/reports/<run-id>.md
docs/qa/evidence/<run-id>/...
```

Lead the report with empirical outcome, list unverified branches, link decisive evidence, record cleanup, and state that repairs remain unapplied.
