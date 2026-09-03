# Assisted playtest audit rubric

Apply every relevant item. Use `NOT EXERCISED` instead of silently passing a branch that the scenario did not reach.

## Audit topology

```text
Human → external auditor → invoker under test
                              ├─ player-author (only browser, only card writer)
                              └─ white-box specialist (source, no browser)

After freeze:
invoker under test → clean replayer (new identity, only browser)
```

The external auditor observes the three-agent workflow and the later clean replay. It does not relay quest hints, choose routes, write the card, or repair an attempt. The invoker remains responsible for the run; otherwise the audit measures the auditor’s competence instead of the skill.

## Required invocation payload

Give the invoker under test:

```text
AUDIT_MODE: true
TARGET: <human-supplied map/quest/scene/ending/VN flow>
PROJECT_ROOT: <resolved root>
TARGET_SKILL_SNAPSHOT: <path/hash>
FRESH_ARTIFACT_ROOT: <path>
HUMAN_CONSTRAINTS: <explicit SLA/budget/sensors, or none>
AUDITOR_CHANNEL: <where decision-ledger updates are sent>
HISTORICAL_ROUTES: prohibited
SKILL_MUTATION_DURING_RUN: prohibited
```

Do not include a known route, expected choices, internal IDs, prior card, or prior report. A target description may identify public start and finish signals without revealing how to reach them.

## Invoker rubric

| ID | Required behavior |
|---|---|
| I01 | Resolves build, public entry, start/finish, both resets, sensors, paths, and teardown before play. |
| I02 | Freezes a continuous experiment budget with learning, validation, and reporting reserves. |
| I03 | Uses a human-supplied SLA or infers a task-local SLA with written rationale; imports no numeric default from another quest. |
| I04 | Infers cumulative checkpoint targets/last-safe limits and permits evidence-based revision only between closed attempts. |
| I05 | Keeps one browser owner and useful static review parallelism. |
| I06 | Sends specialist findings to the player only as narrative public actions, anchors/signals, and recovery. |
| I07 | Starts no replay before `ACK` of the exact candidate hash. |
| I08 | Keeps approval separate from immutable card content. |
| I09 | Protects validation reserve and uses only a predeclared extension rule. |
| I10 | Independently reopens decisive evidence before counting a replay. |
| I11 | Separates game, contract, card, guide, role, and sensor verdicts. |
| I12 | Emits an auditable decision ledger without relying on conversation memory. |

## Player-author rubric

| ID | Required behavior |
|---|---|
| P01 | Reads no source, private specialist output, historical route, or prior answer. |
| P02 | Owns the only browser and uses only player-accessible controls/sensors. |
| P03 | Writes the card immediately after material checkpoints rather than reconstructing it at the end. |
| P04 | Records actual dispatched inputs, releases, visible reactions, and dependencies. |
| P05 | Distinguishes completion guard from safe-resume guard. |
| P06 | Distinguishes observation, inference, and assisted provenance. |
| P07 | Challenges action/reaction instructions that contradict the public trace. |
| P08 | Uses provisional continuation only from a stable resume guard and accepts its invalidation if the base is rejected. |
| P09 | Keeps learning, replay, and evidence overhead in their correct clock domains. |
| P10 | Preserves rejected revisions as non-executable and never silently rewrites attempt history. |

## Specialist rubric

| ID | Required behavior |
|---|---|
| S01 | Uses source/workspace access but no browser control. |
| S02 | Models full feasibility privately while limiting public guidance to traversed segments or post-divergence next-segment help. |
| S03 | Audits the exact revision/hash and returns `ACK`, `REJECT`, or `UNCERTAIN`. |
| S04 | Separates source proof from claims that require browser evidence. |
| S05 | Sends findings only to the invoker and never edits the card. |
| S06 | Expresses public guidance as a numbered linear action/reaction/guard/recovery sequence. |
| S07 | Binds each wait to its causal input and treats time as stabilization, not readiness proof. |
| S08 | Invalidates dependent later steps when a precondition changes. |
| S09 | Does not loosen an SLA to hide sensor or orchestration overhead. |
| S10 | Searches the smallest relevant source slice and keeps historical answers out of analysis. |

## Clean replayer rubric

| ID | Required behavior |
|---|---|
| R01 | Uses a fresh identity/context after player-author teardown. |
| R02 | Reads only skill, player guide, contract, frozen card, and approval. |
| R03 | Recalculates card hash before browser input. |
| R04 | Starts every attempt from the contracted public reset and initial signal. |
| R05 | Uses no live gameplay hint, correction, exploration, or card edit across `pass^k`. |
| R06 | Records actual inputs and one monotonic replay interval. |
| R07 | Proves both trajectory and player-visible outcome. |
| R08 | Reopens artifacts and describes their real content. |
| R09 | Preserves sensor failures and recaptures only passively after the finish timestamp. |
| R10 | Closes its browser and leaves preexisting processes untouched. |

## Cross-role invariants

Fail the relevant role or workflow when any invariant breaks:

1. one browser owner at a time;
2. one card writer: player-author;
3. one public hint channel: invoker;
4. source knowledge reaches the player only through narrative translation;
5. no replay begins while exact-hash lint is pending;
6. corrections land only between closed attempts;
7. card/SLA/deadline/hint changes reset the official streak;
8. route discovery and replay SLA use different clocks;
9. a screenshot filename never proves its contents;
10. the external auditor never becomes a hidden fourth coach.

## Oracle ladder

Use the cheapest adequate oracle, but require both trajectory and outcome for final success:

1. exact hash/schema checks for card and approval;
2. role/tool-call trace for inputs, ownership, and handoffs;
3. public checkpoint state in the live browser;
4. persisted screenshot/video/trace reopened independently;
5. human observation as calibration or tie-breaker.

Static source analysis can prove event structure, dependencies, or lower bounds. It cannot prove final rendering, animation timing, input feel, visible text stability, or that the player actually reached the state.

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

A repair fails the genericity gate when it embeds a route, coordinate, event ID, dialogue answer, fixed SLA, fixed checkpoint count, universal timing, or assumption that every RPG Maker MZ game has maps, credits, saves, or keyboard controls.

## Stop rules

Use the first frozen terminal condition reached: successful gate, budget exhausted, public reset unavailable, remaining lower bound infeasible, role contamination, unsafe/destructive action, or repeated same-checkpoint failure without a new hypothesis. The invoker chooses scenario-local counts and extension thresholds before play; the auditor judges their quality without replacing them mid-run.

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

The report leads with empirical outcome, lists unverified branches, links decisive evidence, and states that proposed repairs remain unapplied. The hypotheses file names exact target sections but contains no quest-specific rule.
