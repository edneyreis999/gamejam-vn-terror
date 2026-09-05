# Completion-first playtest audit rubric

Apply every relevant item. Mark unvisited branches `NOT EXERCISED`; never infer a pass from absence of evidence.

## Authority and topology

```text
Human -> external auditor -> invoker under test
                                 |-- player-author (only browser and card writer)
                                 `-- white-box specialist (source and feasibility)

After full-card approval:
invoker under test -> clean replayer (one timed replay with evidence)
```

The audit is human-only. No agent, automation, or skill may invoke it. The ordinary playtest remains model-invocable.

The auditor observes outside the tested workflow. It may consult the specialist and user during preflight. The first gameplay input closes user consultation. Afterward, only the invoker relays between tested roles.

## Required audit contract

```text
AUDIT_MODE: true
TARGET: <human-supplied scenario>
PROJECT_ROOT: <resolved root>
BUILD: <revision or fingerprint>
PUBLIC START: <reset and stable signal>
PUBLIC FINISH: <completion signal and rejecting oracle>
TARGET SKILL SNAPSHOT: <tree, paths, hashes>
IGNORED SCRATCH ROOT: <path>
CANONICAL OUTPUT ROOT: <path>
CONTROLLER AND CARD SCHEMA SNAPSHOT: <paths and hashes>
DECISION ROOT: <inside scratch>
VIRTUAL RULES: <fresh versioned overlay path>
HUMAN CONSTRAINTS: <resolved values or none>
USER INPUT CUTOFF: <first gameplay input event>
HISTORICAL ROUTES: allowed for reuse test | prohibited for discovery test
SKILL MUTATION DURING RUN: prohibited
```

Derive repository facts before asking the user. When a fact requires source interpretation, use the specialist during preflight. Ask only about unresolved target meaning, product decisions, or human constraints.

## External auditor rubric

| ID | Required behavior |
|---|---|
| A01 | Verifies direct human invocation before any side effect. |
| A02 | Reads project authority and the full rubric before freezing the contract. |
| A03 | Derives repository facts and uses the specialist before asking the user. |
| A04 | Records the first gameplay input as the permanent user-consultation cutoff. |
| A05 | Freezes the physical target-skill tree and keeps it unchanged through the report. |
| A06 | Gives tested roles no historical route unless approved-card reuse is the contracted branch. |
| A07 | Observes every material role handoff, controller boundary, checkpoint, correction, approval, replay, promotion, and terminal attempt. |
| A08 | Does not operate the browser, write the card, supply route guidance, approve semantics, or perform a tested role's work. |
| A09 | Records nonterminal defects without changing workflow behavior. |
| A10 | Groups repeated symptoms into one cause-root scratch decision. |
| A11 | Treats duration and repeated correction as findings, never intervention triggers by themselves. |
| A12 | Applies a virtual override only after the workflow explicitly attempts repairable bureaucratic termination. |
| A13 | Writes `Accepted for current run` before activating the narrowest sufficient override. |
| A14 | Versions the overlay, records its activation point, and obtains affected-role acknowledgement. |
| A15 | Continues the same run and preserves trustworthy progress after an override. |
| A16 | Applies no virtual rule retroactively and exposes every override in the verdict. |
| A17 | Accepts only the closed terminal set and leaves feasibility to the specialist. |
| A18 | Consolidates scratch decisions into the final proposal without editing the skill during the run. |
| A19 | Separates all outcome, workflow, role, sensor, evidence, and cleanup verdicts. |
| A20 | Rechecks the physical snapshot, promotes only report and proposal, and removes the verified audit scratch root. |

## Invoker-under-test rubric

| ID | Required behavior |
|---|---|
| I01 | Resolves build, entry, guards, resets, sensors, controller, both clocks, scratch, canonical output, lease, and teardown before gameplay. |
| I02 | Chooses exact-build card reuse or fresh guided authorship. |
| I03 | Keeps one browser owner, one card writer, and one recorded public relay channel. |
| I04 | Provisions isolated player and specialist roles without assuming either role's work. |
| I05 | Relays the complete structured public route unchanged while naming one immediate checkpoint. |
| I06 | Returns the player's current public image and controller result to the specialist on divergence. |
| I07 | Relays more specific corrected guidance without attempt, tier, or time caps. |
| I08 | Returns incomplete process artifacts to their owner rather than terminating. |
| I09 | Preserves trustworthy artifacts and the latest valid public checkpoint across role replacement. |
| I10 | Uses no discovery clock, parcel, envelope, `PRESO`, fixed checkpoint budget, or universal SLA. |
| I11 | Performs only mechanical full-card scope, build, controller, and canonical-hash matching. |
| I12 | Replaces the player-author with a clean replayer after approval. |
| I13 | Returns unguarded replay divergence to authorship, retires the replayer after card mutation, and starts one new clean replay. |
| I14 | Attempts no terminal result outside the closed set. |
| I15 | Reports independent causal verdicts, promotes only canonical artifacts, and verifies teardown and lease release. |

## Player-author rubric

| ID | Required behavior |
|---|---|
| P01 | Reads no source, private specialist analysis, or disallowed historical trace. |
| P02 | Owns the only browser and only executable card writes during authorship. |
| P03 | Attempts the next checkpoint as a meaningful whole rather than returning after each input. |
| P04 | Uses only controller runners and observes at transaction boundaries rather than every pulse. |
| P05 | Records every transaction receipt and its stable public reaction. |
| P06 | Stops contradicted guidance and returns screenshot plus trace for diagnosis. |
| P07 | Appends each checkpoint fragment immediately from execution rather than prediction. |
| P08 | Distinguishes completion and resume guards and ends on a stable post-event state. |
| P09 | Produces a self-contained structured JSON card with assisted provenance and controller identity. |
| P10 | Retests every executable specialist correction or optimization. |
| P11 | Continues while the specialist considers the target reachable. |
| P12 | Keeps rejected and diagnostic attempts out of the executable main route. |

## Specialist rubric

| ID | Required behavior |
|---|---|
| S01 | Uses source and current-run public evidence but never browser control or card writes. |
| S02 | Derives the complete feasible route and material checkpoint graph before play. |
| S03 | Translates source knowledge into closed-vocabulary transactions, landmarks, guards, and frozen recovery. |
| S04 | Keeps internal coordinates, IDs, variables, engine state, and private analysis out of public guidance. |
| S05 | Inspects player screenshot and trace when diagnosing divergence. |
| S06 | Corrects guidance immediately and raises specificity without an administrative cap. |
| S07 | Continues guiding while any public route remains possible. |
| S08 | Revises and freezes a material checkpoint list before validation. |
| S09 | Identifies and browser-validates every executable route optimization through the player. |
| S10 | Returns a semantic verdict for the exact complete-card hash and full scope. |
| S11 | Attests that no shorter public route is known for the build. |
| S12 | Uses the complete evidence contract for any impossibility verdict. |

## Clean replayer rubric

| ID | Required behavior |
|---|---|
| R01 | Uses a fresh identity and browser after player-author teardown. |
| R02 | Reads only the approved replay inputs and no learning or private specialist artifacts. |
| R03 | Recalculates build, controller identity, and complete canonical-card hash before browser input. |
| R04 | Runs fresh no-input preflight and starts one replay from the contracted public reset and initial guard. |
| R05 | Uses only the frozen card and guarded recovery, with no live help, exploration, correction, or edit. |
| R06 | Uses only controller-generated runners for gameplay input and records delivery separately from telemetry. |
| R07 | Records active-route and total-operational time separately; a timing failure does not revoke completion. |
| R08 | Uses one post-transaction observation and persists it only at frozen material checkpoints. |
| R09 | Does not reopen evidence during replay; missing capture remains distinct from gameplay completion. |
| R10 | Proves the public finish oracle, closes its browser, verifies lease release, and leaves unrelated processes untouched. |

## Cross-role invariants

Fail the relevant role or workflow when any invariant breaks:

1. one browser owner at a time;
2. one executable card writer during authorship: player-author;
3. one feasibility and semantic authority: specialist;
4. one public relay: invoker;
5. source knowledge reaches the player only as public actions and signals;
6. guided authorship continues without discovery-time terminal budgets;
7. repairable process defects return to their owner;
8. role replacement preserves only role-permitted current-run artifacts;
9. only the complete card receives a formal approval hash;
10. no validation begins before exact full-card approval;
11. executable corrections and optimizations receive browser proof;
12. card mutation retires the replayer and requires one new clean replay;
13. one replay produces checkpoint evidence and two independently sourced timing metrics;
14. missing visual evidence remains distinct from gameplay completion;
15. the auditor never becomes a gameplay or artifact-production role.

## Virtual-repair decision table

| Observation | Auditor action |
|---|---|
| Slow but progressing workflow | Record evidence and `Proposed` ADR; do not intervene |
| Repeated player-card defect corrected by specialist | Aggregate evidence in `Proposed` ADR; do not intervene |
| Deadlock without terminal declaration | Record `Proposed` ADR; do not intervene |
| Specialist classifies deadlock through a permitted terminal verdict | Verify evidence and accept the terminal path |
| Invoker tries to end because a required artifact field is missing | Write accepted current-run ADR, overlay a return-for-repair rule, continue |
| Invoker cannot provision a required role and tries to end | Write accepted current-run ADR, overlay the smallest provisioning repair, continue |
| Screenshot sensor fails | Let gameplay continue when the finish remains publicly observable; record partial visual evidence |
| Gameplay input bypasses the controller | Record execution-integrity `FAIL`; never authorize the bypass through an overlay |
| Safety or destructive boundary | Stop immediately and record direct evidence |
| Gameplay route is difficult | Observe; specialist and player own correction |

An override is valid only when all are true:

1. the tested workflow has explicitly attempted a terminal result;
2. the cause is a repairable rule or process defect;
3. the replacement changes only what is necessary to restore continuity;
4. an ADR exists before activation;
5. the versioned overlay and activation point are durable;
6. affected roles acknowledge it;
7. prior evidence remains interpreted under the prior rule;
8. the physical skill remains unchanged.

## Scratch decision schema

Allocate one scratch file per root cause. Consolidate it into the final proposal; do not promote individual decision files:

```markdown
# ADR-NNN: <decision>

## Status
Proposed | Accepted for current run

## Context
<observed symptom, occurrences, direct evidence, and attempted terminal decision>

## Decision
<observation-only proposal or exact virtual rule>

## Activation
<overlay version, time or ledger sequence, affected roles, acknowledgement>

## Consequences
<prevented behavior, risks, and verdict impact>

## Permanent repair
<exact skill files and sections proposed; unapplied>
```

## Specialist impossibility gate

Accept only when all fields are materialized:

1. checkpoint and current public state;
2. public actions and recoveries attempted;
3. decisive screenshot or input trace;
4. source proof;
5. reason further public guidance cannot work;
6. causal subsystem;
7. unblock condition.

Attempt count, elapsed time, budget, missing metadata, or unsupported confidence does not satisfy this gate.

## Independent verdicts

Lead with the empirical outcome, then report:

```text
EXECUTION INTEGRITY: PASS | FAIL | BLOCKED
FINAL RESULT: PASS | FAIL | BLOCKED
CLOSURE HYGIENE: PASS | FAIL | BLOCKED
GAMEPLAY: PASS | FAIL | BLOCKED
CONTRACT: PASS | FAIL | BLOCKED
CARD: PASS | FAIL | BLOCKED
WORKFLOW: PASS | FAIL | BLOCKED
INVOKER: PASS | FAIL | BLOCKED
PLAYER-AUTHOR: PASS | FAIL | BLOCKED
SPECIALIST: PASS | FAIL | BLOCKED
REPLAYER: PASS | FAIL | BLOCKED | NOT EXERCISED
BROWSER: PASS | FAIL | BLOCKED
SENSOR: PASS | FAIL | BLOCKED
ACTIVE ROUTE TIME: MEASURED | INVALID | NOT MEASURED
TOTAL OPERATIONAL TIME: MEASURED | INVALID | NOT MEASURED
VISUAL EVIDENCE: COMPLETE | PARTIAL | NOT EXERCISED
CLEANUP: PASS | FAIL | BLOCKED
```

Link the contract, physical snapshot, auditor ledger, route card, approval, canonical evidence, virtual overlay, final report, and consolidated proposal. Role traces and individual decisions remain in scratch. State which conclusions apply only to the scenario and which expose a likely generic instruction defect.
