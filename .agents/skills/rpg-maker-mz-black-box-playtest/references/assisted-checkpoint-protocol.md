# Completion-first assisted checkpoint protocol

Use this protocol to coordinate a black-box browser player with a white-box specialist. The specialist knows how the scenario works; the player proves that the route works through public controls and visible outcomes. Completion is the governing invariant.

## Contract

Materialize these fields before the first gameplay input:

| Field | Required content |
|---|---|
| Target | One map, quest, scene, ending, or VN flow in player language |
| Build | Revision or fingerprint and invalidation conditions |
| Public entry | URL, file, or authorized launch command |
| Start | Public reset and stable initial signal |
| Finish | Public completion signal plus an oracle that rejects plausible false success |
| Resets | Public recovery after divergence and after completion, or a proved limitation |
| Browser | One owner, context or profile, geometry, locale, and storage policy |
| Sensors | Live visual sensor, trace, screenshots, and known limits |
| Artifacts | Run root, contract, role traces, card, approval, evidence, clock, and report |
| Performance | Measurement boundaries and any supplied goal; no universal SLA |
| Safety | Destructive actions, external-state boundaries, and teardown ownership |

Resolve repository facts without asking the user. The ordinary playtest never asks the user a question, including during preflight. Preserve the project's distinction between confirmed requirements, prototype baselines, pending decisions, and out-of-scope ideas.

## Role contracts

### Invoker

The current agent is the invoker. It owns orchestration, exact public relay, browser lease, artifact repair, role replacement, hash matching, validation handoff, causal reporting, and teardown.

It forwards guidance rather than interpreting it. It does not operate the browser, author card steps, decide route semantics, declare scenario impossibility, or turn a repairable process defect into a terminal result.

### Player-author

The player-author owns the only browser and the only writes to the route card during authorship. It reads the public contract, player guide, current card, its own traces and screenshots, and `PUBLIC GUIDANCE` relayed by the invoker. It reads no source or private specialist analysis.

One turn covers a genuine attempt at the next checkpoint. Within that turn the player may execute multiple public actions while observing between causal groups. It releases held controls, records every dispatched input, and returns control at a checkpoint, contradiction, need for more guidance, technical limitation, or safety boundary.

### White-box specialist

The specialist reads the workspace and may inspect current-run public screenshots and input traces. It never controls the browser or writes the player's card. It owns:

- whole-scenario feasibility and dependency analysis;
- the complete public route and material checkpoint graph;
- increasingly precise checkpoint guidance without a relay limit;
- diagnosis of public divergence against source behavior;
- route optimization;
- semantic approval of the complete card hash;
- declarations of impossibility.

Keep private source facts in specialist-owned artifacts. Put only player-usable public information in `PUBLIC GUIDANCE`.

### Clean replayer

After approval, a fresh replayer receives only the skill, player guide, contract, frozen card, approval manifest, performance-clock instructions, and its own artifacts. It reads no learning trace or private specialist output, edits no card, explores nothing, and receives no gameplay help.

The same replayer executes performance then evidence for one unchanged hash. Any card edit retires that identity.

## Specialist package and public guidance

Before play, the specialist materializes the full route and checkpoint graph. Route steps may contain exact public keys, clicks, counts, bounded holds, menu choices, visible landmarks, text, and stop guards. Internal coordinates, event IDs, switches, variables, saves, engine objects, DOM manipulation, and source-only facts remain private.

For the active checkpoint, return:

```text
CHECKPOINT: <ID and public objective>
PRECONDITION: <stable public state>
PUBLIC GUIDANCE:
  1. <public action or action sequence>
  2. <visible reaction after each causal group>
  3. <completion and resume guards>
  4. <safe recovery>
FINISH RELATION: <why this checkpoint is necessary>
PRIVATE SOURCE BASIS: <specialist-only artifact reference>
```

When the player cannot follow the route, use its latest screenshot and exact input trace to produce a more specific replacement guidance block for the same checkpoint. Correct wrong guidance immediately. Specificity has no fixed tier or attempt cap. Keep guiding while a public route remains possible.

## Material checkpoints and card fragments

A material checkpoint is a stable, player-visible state proving necessary trajectory progress or safe reproduction. Examples include a required handoff, area transfer, acquired public state, committed choice, or finish signal. A dialogue page, ordinary movement, or hidden variable is not independently material.

The specialist proposes the initial graph and may revise it when browser evidence exposes a better public boundary. Freeze the final list before validation.

After reaching a checkpoint, the player appends:

```text
precondition -> dispatched inputs -> visible reactions -> completion guard -> resume guard -> recovery -> dependencies
```

Write the fragment from observed execution, not from specialist prediction. Make the text sufficient without screenshots. Mark specialist-derived guidance as assisted provenance. The specialist may confirm checkpoint meaning informally; only the complete card receives a formal hash verdict.

## Continuity and artifact repair

Return every incomplete or inconsistent artifact to its owner with an explicit list of defects. Examples include missing hash, wrong scope, absent field, invalid manifest, incomplete trace, or mismatched path. The owner repairs it; if that role cannot continue, replace it and provide the replacement every current-run artifact allowed by its role.

Continue from the latest trustworthy public checkpoint. Reset farther back only when browser state, a dependency, or the card's precondition is no longer trustworthy. Preserve corrected and rejected revisions in the trace without treating them as executable.

Discovery has no active-time budget, parcel, envelope, guidance tier, or `PRESO` state. Long duration and repeated specialist correction are reportable workflow signals, not stop conditions.

## Impossibility contract

Only the specialist may declare that the target cannot be reached. It must materialize:

```text
VERDICT: IMPOSSIBLE
CHECKPOINT AND PUBLIC STATE:
PUBLIC ACTIONS AND RECOVERIES ATTEMPTED:
DECISIVE SCREENSHOT OR TRACE:
SOURCE PROVES:
WHY MORE PUBLIC GUIDANCE CANNOT WORK:
CAUSE: game | contract | browser | sensor | harness | external
UNBLOCK CONDITION:
```

A duration, attempt count, missing process field, role failure, or unsupported assertion is not impossibility. Return an incomplete verdict to the specialist and continue. An external failure may terminate only when it prevents even the specialist from investigating or guiding further.

## Optimization and approval

After the first public finish, the specialist compares source and trace to remove unnecessary navigation, interactions, dialogue operations, waits, and recovery from the successful route. The player retests every executable change. The resulting claim is the fastest known public route for that build, not a mathematical proof of a global optimum.

The final card contains build and entry validity, public start and finish signals, controls, assisted provenance, exact ordered steps, guards, recovery, checkpoint list, and revision history. Hash only this complete candidate.

The specialist's formal verdict is:

```text
VERDICT: APROVADO | REJEITADO | INCONCLUSIVO
SCOPE: FULL CARD
CARD SHA-256:
BUILD:
PUBLIC ROUTE FEASIBLE:
KNOWN REDUNDANT STEPS: <none or list>
BROWSER EVIDENCE REQUIRED:
```

The invoker checks only scope, build, and hash identity. A rejection returns to guided authorship; it does not terminate the workflow.

## Two-pass validation

### Performance replay

Reset publicly, prove the initial state, start one continuous monotonic helper clock at the contracted start signal, and execute only the card. Use no screenshots, exploration, corrections, or help. Stop the clock at the public finish signal. Report raw duration and any supplied performance goal separately. Completion does not fail because of elapsed time.

### Evidence replay

After performance completes, reset publicly and execute the same card and hash with the same replayer. Use no help or edits. At each frozen checkpoint, attempt and reopen one screenshot before the next gameplay action. Retry a bad capture passively up to three times; then record `CAPTURA AUSENTE` and continue. Visual evidence may be partial while gameplay succeeds.

A gameplay divergence in either pass returns the affected section to player authorship and specialist review. Approve a new full hash and run both passes again with a new replayer.

## Terminal outcomes and reporting

The workflow ends only for:

- complete card approval plus both completed gameplay replays;
- explicit user cancellation received during the run;
- a destructive or safety boundary;
- a complete specialist impossibility verdict;
- an external impossibility preventing specialist continuation.

Report gameplay, contract, card, workflow, each role, browser, sensor, visual evidence, and cleanup independently. Keep available screenshots supplemental. Preserve failure diagnostics; after successful validation, remove only run-owned temporary resources and retain the contract, card, approval, traces, performance ledger, report, and valid canonical screenshots.
