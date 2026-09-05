# Completion-first assisted checkpoint protocol

Use this protocol to coordinate a black-box browser player with a white-box specialist. The specialist derives public transactions; the player proves them through the controller and visible outcomes. Completion remains the governing invariant.

## Contract

Materialize these fields before the first gameplay input:

| Field | Required content |
|---|---|
| Target | One map, quest, scene, ending, or VN flow in player language |
| Build | Revision or fingerprint and invalidation conditions |
| Public entry | URL, file, or authorized launch command |
| Start | Public reset and stable initial guard |
| Finish | Public completion guard plus an oracle that rejects plausible false success |
| Resets | Public recovery after divergence and completion, or a proved limitation |
| Browser | One owner, lease or profile identity, geometry, locale, storage, and release oracle |
| Sensors | Live public-pixel sensor, canonical capture mechanism, and known limits |
| Controller | Installed identity, Playwright adapter, closed vocabulary, and preflight |
| Artifacts | Ignored scratch root, canonical output root, promotion set, and cleanup oracle |
| Performance | Active-route and total-operational boundaries plus any supplied goal |
| Safety | Destructive actions, external-state boundaries, and teardown ownership |

Resolve repository facts without asking the user. The ordinary playtest never asks the user a question, including during preflight. Preserve the project's distinction between confirmed requirements, prototype baselines, pending decisions, and out-of-scope ideas.

## Role contracts

### Invoker

The current agent is the invoker. It owns orchestration, exact structured relay, browser lease, controller preflight, artifact repair, role replacement, hash matching, validation handoff, causal reporting, promotion, and teardown.

It forwards guidance rather than interpreting it. It does not operate gameplay, author card transactions, decide route semantics, declare scenario impossibility, or turn a repairable process defect into a terminal result.

### Player-author

The player-author owns the only browser and the only card writes during authorship. It reads the public contract, player guide, controller contract, current card, its own scratch artifacts, and `PUBLIC GUIDANCE` relayed by the invoker. It reads no source or private specialist analysis.

One turn attempts the next checkpoint as a whole. The player invokes only controller-generated runner files and observes at transaction boundaries. It records the controller result and returns control at a checkpoint, contradiction, need for guidance, technical limitation, or safety boundary.

### White-box specialist

The specialist reads the workspace and may inspect current-run public images and controller results. It never controls the browser or writes the player's card. It owns:

- whole-scenario feasibility and dependency analysis;
- the complete public transaction route and material checkpoint graph;
- checkpoint guidance and frozen recovery without a relay limit;
- diagnosis of public divergence against source behavior;
- route optimization;
- semantic approval of the complete canonical card hash;
- declarations of impossibility.

Keep private source facts in specialist-owned scratch artifacts. Put only player-usable public information in guidance.

### Clean replayer

After approval, a fresh replayer receives only the skill, player guide, controller contract, public contract, frozen card, approval, clock instructions, and its scratch paths. It reads no learning trace or private specialist output, edits no card, explores nothing, and receives no gameplay help.

The replayer executes one timed replay with checkpoint evidence for one unchanged hash. Any card edit retires that identity.

## Atomic public guidance

Before play, the specialist materializes the full route and checkpoint graph. Route steps use only controller actions, logical directions, counts, menu inputs, visible landmarks, text, and guards. Internal coordinates, event IDs, switches, variables, saves, engine objects, physical-key timing, DOM manipulation, and source-only facts remain private.

For the active checkpoint, return one object:

```json
{
  "checkpoint": "<ID and public objective>",
  "precondition": "<stable public state>",
  "action": { "type": "<closed controller action>" },
  "postcondition": "<visible result>",
  "recovery": {
    "guard": "<visible state where correction remains safe>",
    "action": { "type": "<closed controller action>" }
  },
  "finishRelation": "<why this checkpoint is necessary>",
  "privateSourceBasis": "<specialist-only scratch reference>"
}
```

The invoker verifies that every required field appears exactly once and relays the same object without reconstruction or a Markdown intermediary. Invalid guidance returns to the specialist. On divergence, the specialist uses the latest public image and controller result to produce one complete replacement object. Specificity has no tier, retry, or time cap.

## Transactions and material checkpoints

A material checkpoint is a stable, player-visible state proving necessary trajectory progress or safe reproduction. Examples include a required handoff, area transfer, publicly visible acquired state, committed choice, or finish signal. An ordinary dialogue page, movement turn, or hidden variable is not independently material.

The specialist proposes the graph and may revise it when browser evidence exposes a better boundary. Freeze the smallest sufficient final list before validation. Each frozen checkpoint owns exactly one canonical PNG basename.

Batch pages inside a proven dialogue segment and compose directional runs between public checkpoints. The player observes before and after the transaction, not between its pulses. End the transaction before an unobserved choice or irreversible action. A transaction may enter or leave a mode only when the whole sequence is proven and cannot commit an unseen branch.

After reaching a checkpoint, the player appends the proved precondition, closed-vocabulary action, visible postcondition, checkpoint relation, and any proved recovery to the JSON card. Write from observed execution, not specialist prediction. Only the complete canonical JSON card receives a formal hash verdict.

## Divergence and recovery

When the postcondition does not appear, the player observes the current public state. If the exact frozen recovery guard matches, it executes that recovery through the controller and observes again. Otherwise it returns to the specialist; the replay never receives live specialist help.

Separate controller results:

- uncertain delivery affects gameplay state and requires observation plus recovery or renewed authorship;
- invalid telemetry affects only its metric and never stops the attempt to reach the finish;
- missing or invalid visual capture affects evidence, not an otherwise observed gameplay result.

Return incomplete artifacts to their owner. Continue from the latest trustworthy public checkpoint. Keep corrected and rejected drafts only in ignored scratch and consolidate their causal value in the final report. Discovery has no active-time budget, parcel, envelope, guidance tier, or `PRESO` state.

## Impossibility contract

Only the specialist may declare that the target cannot be reached. It must materialize:

```text
VERDICT: IMPOSSIBLE
CHECKPOINT AND PUBLIC STATE:
PUBLIC ACTIONS AND RECOVERIES ATTEMPTED:
DECISIVE SCREENSHOT OR CONTROLLER RESULT:
CAUSE: game | contract | browser | sensor | harness | external
UNBLOCK CONDITION:
```

A duration, attempt count, missing process field, role failure, or unsupported assertion is not impossibility. Return an incomplete verdict to the specialist. External failure terminates only when it prevents the specialist from investigating or guiding any public route.

## Optimization and approval

After the first public finish, the specialist compares source and public results to remove unnecessary transactions, inputs, and recoveries. The player browser-tests every executable change. The result is the fastest known public route for that build, not a mathematical proof of global optimality.

The final card follows `controller-and-route-card.md`. Validate it with the bundled helper and use the printed canonical JSON hash. The specialist returns:

```text
VERDICT: APROVADO | REJEITADO | INCONCLUSIVO
SCOPE: FULL CARD
CANONICAL CARD SHA-256:
CONTROLLER IDENTITY:
BUILD:
PUBLIC ROUTE FEASIBLE:
KNOWN REDUNDANT TRANSACTIONS: <none or list>
BROWSER EVIDENCE REQUIRED:
```

The invoker checks only scope, build, controller, and hash identity. A rejection returns to guided authorship.

## Single validation replay

Release the player-author browser and prove the exact lease available before creating a clean replayer. Regenerate and run the no-input controller preflight in the new browser identity. Match its identity to the card and approval.

Execute the frozen `setup` transactions through the controller to reset publicly, then prove the initial guard and start one continuous operational helper clock. Execute only the frozen `route` transactions without exploration, edits, or live help. The controller validates setup receipts but excludes them from active route time.

Observe once after each transaction. Overwrite one live image in scratch for nonmaterial boundaries. At a frozen checkpoint, use the same observation as its staged canonical PNG. Do not reopen it during replay. Execute frozen recovery only under its exact visible guard.

After every runner, persist its exact receipt to the run-bound ledger before the next input. Stop the operational clock at the public finish guard, summarize the complete ledger against the card, then reopen every staged canonical image. Measurement failure classifies only its metric and does not revoke observed completion.

Any other gameplay divergence retires the replayer and returns the affected transaction to authorship and specialist approval. A changed card receives a new canonical hash and a new clean replay.

## Terminal outcomes and promotion

The workflow ends only for:

- complete card approval plus one completed clean replay;
- explicit user cancellation received during the run;
- a destructive or safety boundary;
- a complete specialist impossibility verdict;
- an external impossibility preventing specialist continuation.

Report gameplay, contract, card, workflow, every role, browser, sensor, both performance metrics, visual evidence, and cleanup independently.

Keep current-run drafts, diagnostics, receipts, console logs, runners, role traces, and individual guidance artifacts in `.artifacts/rpg-maker-mz-playtest/<run-id>/`.

On success, promote only the final contract, JSON card, approval, report, consolidated performance ledger, and one valid image per frozen material checkpoint. On impossibility, external block, or cancellation, promote only the report, applicable verdict, and decisive minimum evidence. Reopen and hash the promoted set before removing the exact current-run scratch root. This policy applies to the current run; historical artifacts are outside its scope.
