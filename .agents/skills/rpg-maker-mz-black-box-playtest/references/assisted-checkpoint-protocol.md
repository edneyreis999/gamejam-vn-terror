# Assisted checkpoint protocol

Use this protocol to coordinate an RPG Maker MZ playtest in which a black-box player executes public browser actions while a white-box specialist supplies progressively specific public guidance and approves the written route. The specialist coaches; it never replaces browser proof.

The protocol applies to top-down RPGs, visual novels, and hybrids. A material checkpoint is a stable, player-visible state transition that proves trajectory progress or provides safe reproduction. Route details, timing values, and finish signals remain local to the current contract.

## Contract

Record before browser input:

| Field | Required content |
|---|---|
| Target | Map, quest, scene, ending, or VN flow in player language |
| Build | Revision/fingerprint and invalidation conditions |
| Public entry | URL, file, or authorized command |
| Start | Public reset and stable initial signal |
| Finish | Scenario-specific public completion signal and rejecting oracle |
| Abort reset | Public recovery from an incomplete attempt, or `unavailable` |
| Completion reset | Public recovery after the objective, or `unavailable` |
| Browser lease | One owner, context/profile, geometry, locale, and storage policy |
| Sensors | Trace, screenshots, video, audio, console, and their limits |
| Checkpoint budget | Active-player clock IDs, run-owned ledger path, estimation method, renewal rule, and `PRESO` condition |
| Replay gate | SLA value/type, continuous clock ID, boundaries, tolerance, and fixed two-pass procedure |
| Durable paths | Contract, card, approval, role logs, evidence, report, and audit |
| Safety stops | Reset loss, unsafe action, contamination, mutation, external impossibility, and hash violation |
| Audit | `off` or external auditor identity and exact trace requirements |

Classify the SLA:

- **rigid:** a human requirement; change it only with new human authority;
- **provisional:** a human-labeled estimate or agent inference; revise it only from specialist evidence of structural cost and before validation.

A change to a provisional SLA during validation closes the attempt, supersedes the manifest, and restarts both passes under a new contract. Infer no universal numeric defaults for SLA, checkpoint budgets, guidance parcels, waits, or retries.

## Role contracts

### Invoker

Own:

- contract, clock policy and ledger gate, browser lease, attempt lifecycle, and safety stops;
- exact public relay from specialist to player;
- mechanical confirmation that specialist verdict, scope, and hash match the current candidate;
- validation handoffs, cleanup gate, causal verdicts, and report.

The invoker does not play, write clock events, write the card, or semantically approve it. It validates the browser owner's clock ledger and applies budgets mechanically. In audit mode, record the exact player-facing relay or `NO PUBLIC RELAY`, source role, recipient, timestamp, assisted-provenance tag, candidate hash, clock transition, and outcome.

### Player-author

Own:

- the only browser during authorship;
- public execution, divergence reports, and actual input ledger;
- checkpoint-clock transitions in the run-owned active-clock ledger;
- the only writes to the route card;
- temporary discovery evidence inside the run-owned path.

Read only the public contract, player guide, active-clock reference and helper, current card, player-created artifacts, and invoker relays. Mark the route as assisted after the first specialist orientation. Challenge a relay whose action/reaction order contradicts the browser trace.

Before hashing a checkpoint candidate, verify:

1. every dispatched input since the last approved guard is materialized;
2. every held input has a release;
3. the visible reaction follows its causal action;
4. the claimed completion guard is stable and post-event;
5. the resume guard and recovery are explicit;
6. the text alone is sufficient to execute the route.

### White-box specialist

Own:

- private whole-scenario feasibility and checkpoint graph;
- next-checkpoint definition and active-player budget estimate;
- minimal orientation and up to three progressive operational orientations;
- smallest-source-slice review of exact candidate hashes;
- sole semantic checkpoint and full-card verdict.

Use no browser, edit no card, and report only to the invoker. Return:

```text
VERDICT: APROVADO | REJEITADO | INCONCLUSIVO
SCOPE: <checkpoint fragment or full card>
CARD SHA-256: <exact hash>
SOURCE PROVES: <private facts>
BROWSER MUST PROVE: <public guards>
PUBLIC ORIENTATION LEVEL: MINIMAL | OPERATIONAL-1 | OPERATIONAL-2 | OPERATIONAL-3 | NONE
PUBLIC GUIDANCE:
  1. precondition/anchor
  2. public action
  3. visible reaction
  4. completion/resume guard
  5. recovery
ACTIVE BUDGET EFFECT: <scenario-local estimate or justified revision>
DEPENDENCIES INVALIDATED: <IDs or none>
```

Bind waits to causal actions. Treat time as stabilization or calibrated input, never readiness proof. Express guidance through public controls, directions, visible landmarks, character traits, text, reactions, guards, and recovery. Keep internal coordinates, event IDs, variables, hidden values, and source-only timing out of the public relay.

### Clean replayer

After full-card approval, replace the player-author with one fresh identity and browser context. Give it only the skill, player guide, active-clock reference and helper, contract, frozen card, approval manifest, and run-owned clock-ledger path. It reads no learning logs or private analysis, edits no card, explores nothing, and receives no live gameplay help.

The same identity executes both passes for one unchanged hash and is the only writer of its continuous performance clock. A card revision retires it; the next validation uses another fresh replayer.

## Material checkpoints

Create a checkpoint only when a stable public guard proves a necessary state transition or safe reproduction boundary, such as:

- a required handoff completed and control returned;
- a necessary area, transfer, or scene reached;
- a required item or public state acquired;
- a choice committed and its next state stabilized;
- the contracted finish signal materialized.

A dialogue page, room crossing, movement without consequence, hidden variable, or equivalent screenshot does not independently earn checkpoint status. The specialist may use hidden state privately only to map dependencies to public outcomes.

For each fragment, record:

```text
precondition → dispatched action → visible reaction → completion guard → resume guard → recovery → dependencies
```

Preserve rejected revisions as non-executable. A screenshot may corroborate a guard; the card remains executable from its text alone.

## Active checkpoint budget

Continue discovery while material checkpoints progress. Bound duration only for current-checkpoint active work and scenario-level safety or integrity stops.

Read `.agents/skills/rpg-maker-mz-black-box-playtest/references/active-clock.md` in full before the first timed interval. Use its mutating run-artifact helper as the sole timing authority and keep its ledger in the durable run path.

Before each checkpoint, have the specialist estimate four scenario-local parcels:

1. one attempt with immediate minimal orientation;
2. one attempt with operational orientation 1 after the first documented divergence;
3. one attempt with operational orientation 2, revised from the next divergence;
4. one attempt with operational orientation 3, the most explicit public sequence allowed.

The estimate accounts for required navigation, dialogue, choices, transitions, animations, and public calibration. Have the player start or resume its segmented clock when it owns the browser plus an actionable orientation. Keep it running while the player observes, decides, enters controls, explores, or changes executable card content. Have the player pause it before:

- specialist analysis;
- invoker routing and mechanical hash checks;
- passive capture/persistence work;
- controlled reset and return to the starting guard;
- browser or role handoff.

Before the invoker routes, reviews, resets, hands off, or decides budget status, mechanically require an inactive valid ledger and read its `total_active_ns`. Treat invalid or incomplete telemetry as `BLOCKED: clock telemetry`; keep the budget verdict unset and never infer active duration from wall time, message timestamps, tool latency, input-hold totals, or confidence.

Deliver minimal orientation immediately; do not spend a blind exploration phase. After the first failed attempt, deliver operational orientation 1 immediately. Each later operational orientation must respond to the preceding public divergence rather than restate earlier guidance. After operational orientation 3, the player may continue using it while local active time remains.

A new hypothesis authorizes another attempt only inside the remaining budget. A newly visible but unapproved state does not renew time. Renew the entire local budget and all four guidance parcels only when the specialist confirms that a correction resolved the reason for the preceding `REJEITADO` or `INCONCLUSIVO`; preserve the prior history so later guidance cannot repeat it.

Before expiry, revise the budget only for newly demonstrated structural cost, such as additional required navigation, pages, choices, transitions, or animations. Player disorientation, repeated inputs, tool latency, weak guidance, or proximity to expiry do not justify revision. Preserve already consumed guidance levels.

When active time expires without a confirmed resolution, release inputs, stabilize the screen, preserve the artifacts, mark the checkpoint `PRESO`, and stop the workflow. Waiting on a submitted specialist verdict does not consume active time and cannot trigger `PRESO`.

## Checkpoint loop

1. Start from the last approved public guard.
2. Have the specialist define the next material checkpoint, budget, and minimal public orientation.
3. Relay the exact orientation through the invoker and have the player start its segmented clock after the public start guard.
4. Let the player attempt the checkpoint. After a divergence, have it pause the clock before specialist analysis, verify the inactive ledger, then resume with the next operational orientation.
5. Have the player append the complete fragment and input ledger immediately after reaching the claimed guard.
6. Run the player self-check, freeze a candidate hash, and pause browser input.
7. Have the specialist return the exact-hash semantic verdict. Have the invoker confirm only verdict/scope/hash identity.
8. On `APROVADO`, continue from the stable approved guard without a cumulative reset.
9. On `REJEITADO` or `INCONCLUSIVO`, invalidate dependent work. Replay every executable correction from the nearest valid approved guard; apply editorial-only corrections without gameplay replay.
10. Use the broader public reset only when the current guard is invalid, recovery fails, dependency recalibration requires it, or full validation begins.
11. Repeat until the specialist marks the full self-contained card `APROVADO` for its exact hash.

## Approval manifest

Keep approval separate from immutable content:

```markdown
# Playtest approval

- Card path:
- Card SHA-256:
- Build/fingerprint:
- Specialist full-card verdict: APROVADO | REJEITADO | INCONCLUSIVO
- Invoker hash/scope match: YES | NO
- SLA: <value, rigid | provisional, origin, clock boundaries>
- Performance replay: required, screenshot-free, SLA-governed
- Evidence replay: required, checkpoint screenshots, no SLA verdict
- Required trajectory evidence:
- Required outcome evidence:
- Canonical evidence paths:
- Status: APROVADO | REJEITADO | SUBSTITUÍDO
```

Start validation only when the specialist marked the complete card `APROVADO` and the invoker mechanically matched the exact current hash and full scope.

## Two-pass validation

### Performance replay — pass 1

1. Recalculate the approved card hash.
2. Reset publicly and prove the contracted initial signal before the replay clock starts.
3. Capture no screenshots during the measured path.
4. Execute only the card and record actual inputs plus passive checkpoint timestamps.
5. Have the replayer measure one `continuous` active-clock interval from contracted start to contracted finish; continuous clocks reject pause or resume.
6. Require the rigid or current provisional SLA.

If gameplay diverges or the finish exceeds SLA, close the pass and preserve the trace. Release the replayer, return the responsible checkpoint to player authorship or optimization, retest every executable change, obtain a new full-card approval, and validate again with a fresh replayer. Keep a rigid SLA unchanged; revise a provisional SLA only through its authority rule.

### Evidence replay — pass 2

Run only after pass 1 succeeds. Use the same card, hash, public reset, and replayer. Apply no SLA verdict because capture latency belongs to the sensor.

At every material completion guard:

1. stabilize the public state;
2. capture one candidate screenshot;
3. reopen it before the next gameplay input;
4. retry passively up to three times when black, corrupt, stale, or mismatched;
5. after three sensor failures, record `CAPTURA AUSENTE`, attempted paths/hashes, and observed defects, then continue to later checkpoints.

The final checkpoint proves the scenario-specific finish signal; no universal ending, credits, title, map, or control scheme is assumed. Both passes must complete gameplay without hints, corrections, exploration, or card edits. Missing screenshots yield `PASS com evidência visual parcial`, never a gameplay failure by themselves.

## Cleanup and verdict

Clean only after both gameplay passes complete and every captured canonical screenshot is reopened:

- delete only run-owned temporary profiles, discovery screenshots, invalid captures, and temporary files;
- retain the contract, active-clock ledger, self-contained card, approval, traces, report, and one valid pass-2 screenshot per evidenced checkpoint;
- record `CAPTURA AUSENTE` for checkpoints lacking a valid image;
- defer cleanup after any gameplay failure so diagnosis remains possible.

Keep separate verdicts for game, contract, card, workflow, invoker, player-author, specialist, replayer, browser, and sensor. Stop outside `PRESO` only for an unsafe/destructive action, unavailable required reset, role/browser contamination, unauthorized build or skill mutation, external technical impossibility, or replay without full exact-hash approval. Elapsed scenario time is not a terminal condition.

In audit mode, preserve the frozen skill snapshot and exact role traces. Propose only the smallest evidence-backed, genre-agnostic instruction repair for a demonstrated failure; scenario routes, timings, and finish types remain evidence rather than skill rules.
