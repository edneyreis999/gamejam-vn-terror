# Assisted checkpoint protocol

Use this protocol to coordinate an RPG Maker MZ playtest in which a black-box player learns in the browser while a white-box specialist checks the player’s written route. The specialist coaches; it never replaces real-browser proof.

The protocol applies to classic top-down RPGs, visual novels, and hybrids. A checkpoint is an observable state transition, not necessarily a tile. Route details, numeric SLAs, timing ratios, and endings remain local to the current contract.

## Contract

Record before browser input:

| Field | Required content |
|---|---|
| Target | Map, quest, scene, ending, or VN flow in player language |
| Build | Revision/fingerprint and invalidation conditions |
| Public entry | URL, file, or authorized command |
| Start | Public reset procedure and stable initial signal |
| Finish | Public signal that proves the objective |
| Abort reset | Public recovery from an incomplete attempt, or `unavailable` |
| Completion reset | Public recovery after the objective, or `unavailable` |
| Browser lease | One owner, context/profile, geometry, locale, storage policy |
| Sensors | Screenshots, trace, video, audio, console, and their limits |
| Total budget | Learning deadline, validation reserve, reporting reserve, stop rules, extension rule |
| Replay gate | Scenario-local SLA, source/rationale, clock boundaries, tolerance, `pass^k` |
| Durable paths | Contract, card, approval, public log, private specialist log, evidence, report, audit |
| Audit | `off` or external auditor identity and trace requirements |

When the human supplies an SLA, freeze it as a contract constraint. Otherwise the invoker owns an explicit provisional estimate. The specialist may privately estimate a lower bound and nominal route cost; public calibration supplies observed costs. Revise an inferred SLA only between closed attempts, retain the evidence and prior estimate, and reset the official streak. A supplied SLA changes only with new human authority.

Infer no universal numeric default. The same rule applies to partial deadlines, experiment budgets, phase ratios, attempt counts, and extensions.

## Role contracts

### Invoker

Own:

- contract, total clock, local SLA, cumulative checkpoint targets and last-safe limits;
- task IDs, artifact paths, browser lease, attempt lifecycle, stop/extension decisions;
- translation of specialist findings into narrative guidance;
- exact revision/hash gates and the separate approval manifest;
- causal verdicts and independent evidence audit.

The invoker may inspect private specialist output but does not play or write the card. It never authorizes an attempt while lint for that exact hash is pending. In audit mode, it emits a concise decision ledger containing input, decision, rationale, timestamp, affected attempt, and outcome.

### Player-author

Own:

- the only browser during learning;
- public observation, exploration, divergence reports, actual input ledger;
- the only writes to the route card;
- checkpoint evidence produced in its own session.

Read only the public contract, player operating guide, current card, player-created artifacts, and hints relayed by the invoker. A hint may be detailed, but remains expressed as player action, public anchor/signal, and recovery. Mark `Derived only from public observation: no` after the first assisted hint.

At each checkpoint, write before continuing. Challenge any correction whose action/reaction order contradicts the browser trace. Stop browser input while preparing a replay hash or when a public guard is unstable.

### White-box specialist

Own:

- private feasibility model of the whole target;
- smallest-source-slice investigation triggered by player observations;
- exact card-fragment lint and public optimization proposal;
- distinction between what source proves and what only the browser can prove.

Use no browser and never edit the card. Report only to the invoker. Return one verdict for the exact revision/hash:

```text
VERDICT: ACK | REJECT | UNCERTAIN
SCOPE: <checkpoint fragment>
SOURCE PROVES: <private facts>
BROWSER MUST PROVE: <public guards>
PUBLIC GUIDANCE:
  1. precondition/anchor
  2. action
  3. visible reaction
  4. exit/resume guard
  5. recovery
TIMING EFFECT: <task-local projection; no universal number>
DEPENDENCIES INVALIDATED: <IDs or none>
```

Number action sequences linearly. Bind every wait to the action that triggers it. A fixed wait is a stabilization ceiling or calibrated input interval, not proof of readiness.

The specialist may model future route cost privately. Public guidance optimizes only a segment already traversed by the player. Reveal a next-segment hint only after the player reports a public divergence in that segment.

### Clean replayer

After authorship closes, replace the player-author with a fresh identity and browser context. Give it only the skill, player guide, contract, frozen card, and approval manifest. The replayer neither reads learning logs/private analysis nor edits the card. It executes the configured consecutive `pass^k` under one unchanged hash and no live gameplay guidance.

## Checkpoints and card fragments

Choose only checkpoints that prove progress or make recovery/reproduction safer. Use any applicable class:

- **spatial:** stable public relation to an NPC, object, door, landmark, or region;
- **dialogue:** identifiable page fully revealed, next page present, or window closed;
- **choice:** all visible options captured and selected outcome materialized;
- **public state:** menu, inventory, party, quest log, HUD, or other player-visible change;
- **scene:** transfer, cutscene, battle boundary, ending, credits, title, or restored start;
- **hybrid:** a transition whose input can affect both movement and dialogue.

Use the route-card schema in section 6 of `rpg-maker-mz-agent-playtest.md`. Treat its input ledger as factual: reconcile it with tool calls or trace before hashing. Reaching the correct screen does not repair an omitted or extra input. Preserve rejected revisions; mark them non-executable.

## Checkpoint loop

1. Start from the last publicly proven state.
2. Let the player explore until one material checkpoint or divergence.
3. Have the player append the fragment immediately and freeze a candidate revision/hash.
4. Start specialist lint of that exact hash.
5. While lint runs, allow provisional discovery only when the current screen satisfies a separate resume guard. Label its clock and artifacts non-official.
6. If the base fragment is rejected, discard dependent provisional discoveries and close the attempt.
7. If accepted, relay the public guidance and apply it only to a new revision between closed attempts.
8. Replay the cumulative prefix from public reset under frozen partial deadlines. Default to one material checkpoint per prefix; batch adjacent low-risk checkpoints only to protect a recorded validation reserve.
9. Promote the fragment only after its public guards survive cumulative replay or the final clean replay explicitly covers it.
10. Repeat until the full route has a feasible preflight.

Discovery time never counts as replay SLA. Partial targets guide diagnosis and optimization; only a complete replay receives the official scenario verdict.

## Timing and budget control

Keep two domains separate:

- **experiment clock:** continuous across learning, writing, review, reset, validation, and reporting;
- **replay clock:** one monotonic interval between contracted public start and finish events.

For each checkpoint, the invoker may freeze:

- a cumulative target for expected efficient progress;
- a cumulative last-safe limit after which the remaining demonstrated lower bound cannot fit the full SLA.

A missed target requests diagnosis; it does not automatically fail the game. A last-safe breach closes the attempt only when the contract’s feasibility arithmetic justifies it. Sensor, screenshot, authoring, and orchestration overhead stays attributed to its real clock domain; never loosen a game SLA to hide instrumentation cost.

Before a full official replay, record lower bound, nominal sum, variability margin, and predicted total. Start only when the predicted total is below the local SLA with defensible margin. Freeze card, deadlines, SLA, and `pass^k` before the streak.

## Approval and validation

Keep approval separate from immutable content:

```markdown
# Playtest approval

- Card path:
- Card SHA-256:
- Build/fingerprint:
- Approved by specialist:
- Approved by invoker:
- Scenario-local SLA and clock boundaries:
- Required consecutive passes (`k`):
- Required trajectory evidence:
- Required outcome evidence:
- Status: APPROVED | REJECTED | SUPERSEDED
```

The clean replayer recalculates the card hash before opening the browser. Each qualifying replay starts from public reset and uses the same approval. A card edit, deadline/SLA change, gameplay hint, corrective input, wrong start, or missing required oracle breaks the streak.

Record both oracles:

- **trajectory:** actual public inputs, attempt IDs, passive timestamps, resets, and divergences;
- **outcome:** player-visible state proving the objective.

After the finish timestamp, reopen every required artifact. If a screenshot is black, corrupt, or shows another state, preserve it as sensor evidence and recapture passively while the correct live state remains. When the live state cannot be recovered without gameplay input, that replay lacks required durable evidence and cannot count toward `pass^k`.

The invoker independently reopens the initial and final artifacts. Filename, executor confidence, absence of console errors, or eventual arrival never substitutes for content.

## Stop and verdict

Stop on the first contracted terminal condition: success, exhausted total budget, infeasible remaining lower bound, unavailable public reset, safety boundary, or repeated failure limit without a new hypothesis. Define counts and extensions locally before play; never import them from another run.

Report separate verdicts for:

- game behavior;
- local contract and inferred timing quality;
- card and approval manifest;
- player operating guide/workflow;
- invoker, player-author, specialist, clean replayer;
- browser/sensor/tooling.

Classify a defect at the narrowest causal owner supported by evidence. A specialist correction error, player log omission, premature invoker ACK, black screenshot, and game-state failure are different defects even when they occur in the same attempt.

In audit mode, preserve the target skill snapshot, role traces, rejected revisions, and independent artifact checks. Propose the smallest generic instruction change that would have prevented each demonstrated failure. Route-specific steps and scenario-local numbers remain evidence, never skill rules.
