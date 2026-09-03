---
name: rpg-maker-mz-black-box-playtest
description: Runs coached RPG Maker MZ browser playtests through an invoker, black-box player, white-box specialist, and clean replayer. Use when a map, quest, scene, ending, or visual-novel flow must be discovered, checkpointed, optimized, and reproduced through player-visible controls. Don’t use for QA planning, unit or harness tests, internal-only diagnosis, or visual-only capture.
---

# RPG Maker MZ Assisted Black-Box Playtest

Run one assisted workflow. `Black-box` names the player and replayer boundary; the specialist may inspect the workspace and must translate findings through the invoker into player-facing guidance.

## 1. Freeze the local experiment

1. Read scoped `AGENTS.md` files and the project-owned documents named by the task.
2. Resolve the target map, quest, scene, ending, or VN flow; public entry; build identity; start and finish signals; completion and abort resets; browser geometry; allowed sensors; durable paths; and teardown ownership.
3. Freeze one total experiment budget with explicit learning, validation, and reporting reserves. Define finite stop conditions and any evidence-based extension before the first player action.
4. Set a scenario-local replay SLA and `pass^k` gate. Use a human-supplied SLA when present; otherwise have the invoker infer a provisional SLA from the specialist’s private feasibility model and public calibration. Record the rationale. Never reuse a number from another quest by default.
5. Derive cumulative checkpoint targets and last-safe limits for the current scenario. Treat targets as optimization guidance; only the full objective receives the official SLA verdict.
6. When launched by `rpg-maker-mz-black-box-playtest-audit`, enable audit instrumentation and record every role handoff, hash gate, deadline decision, correction, and evidence claim without changing the gameplay workflow.

*Done when:* the contract names every required field, both clocks, task-local timing rationale, reserves, stop conditions, browser lease, `pass^k`, and audit status, or records the exact blocker.

## 2. Isolate the roles

1. Assign one **invoker** to own the contract, clocks, browser lease, public hint channel, hash approvals, causal verdicts, and final report. Keep it out of direct gameplay and card authorship.
2. Assign one clean **player-author** to own the only browser and the route card. Give it the public contract, player guide, its own artifacts, and narrative hints relayed by the invoker. Keep source, private analysis, historical routes, and prior answers outside its context.
3. Assign one **white-box specialist** without browser control. Give it the target contract and workspace read access. It may model the whole scenario privately for feasibility, but reviews public card fragments by exact revision/hash and reports only to the invoker.
4. After the full card is approved, close the player-author’s browser and context. Assign a fresh **clean replayer** to the same exclusive browser slot; give it only this skill, the player guide, contract, frozen card, and approval manifest.
5. Keep one browser owner at a time. Run useful concurrency between public exploration and static specialist review, not between agents competing for focus, storage, or rendering.

*Done when:* role inputs, writers, communication edges, browser ownership, forbidden sources, and the player-to-replayer handoff are explicit and non-overlapping.

## 3. Author by checkpoint

1. Read `references/assisted-checkpoint-protocol.md` in full before dispatching the roles. Require the player-author and clean replayer to read `references/rpg-maker-mz-agent-playtest.md` in full before browser input.
2. Start the player-author from a clean public state. After every material checkpoint, have it immediately append the observed fragment and actual input ledger to the card using `precondition → dispatched action → visible reaction → completion guard → resume guard → safe recovery`, plus dependencies when present.
3. Have the specialist lint the exact fragment/hash against the smallest relevant source slice. Require `ACK`, `REJECT`, or `UNCERTAIN`, an explicit split between source proof and browser proof, and any permitted correction as a linear player-facing sequence.
4. Relay specialist guidance only through the invoker. Restrict it to already traversed fragments; allow a next-segment hint only after a public divergence. Record the hint and mark assisted provenance.
5. Permit the player to explore provisionally from a stable resume guard while the previous fragment is audited. Give that segment a separate learning clock and discard it if its base checkpoint is rejected.
6. Start no partial or official replay until the specialist and invoker approve the exact revision/hash. Replay the cumulative prefix from public reset after material checkpoints; batch adjacent low-risk checkpoints only when the invoker records why separate replays would consume the validation reserve.
7. Apply card or deadline corrections only between closed attempts. A timing revision requires evidence and resets any official streak.

*Done when:* the full route is checkpointed, every fragment is provenance-marked and hash-audited, every material checkpoint has been traversed from public reset, and the card has a feasible full preflight.

## 4. Validate the frozen card

1. Freeze the card and create a separate approval manifest containing its exact hash, build, SLA, `pass^k`, and authorized evidence procedure. Do not edit the card after approval.
2. Have the clean replayer confirm the hash, reset publicly, prove the initial state outside the SLA when contracted, and execute only the frozen card. Send no route hint or corrective input during or between qualifying replays.
3. Measure each replay with one monotonic clock between the contracted public start and finish events. Preserve raw duration; never subtract sensor or orchestration cost retroactively.
4. Record actual dispatched inputs and passive checkpoint timestamps. Keep synchronous inspection outside the measured path unless the contract includes it.
5. After the finish timestamp, persist and reopen the required evidence. Treat a black, corrupt, or mismatched artifact as a sensor failure: preserve it, wait passively without gameplay input, and recapture. Do not count the replay as fully evidenced until the artifact proves the claimed state.
6. Have the invoker independently reopen the initial and final artifacts before counting the replay. Any gameplay divergence, card edit, SLA revision, live hint, or missing required oracle breaks the streak and requires a fresh public reset.

*Done when:* one unchanged hash earns the configured consecutive `pass^k`, every replay is within its scenario-local SLA, trajectory and visible outcome agree, and both executor and invoker verify the required artifacts.

## 5. Judge and close

1. Keep separate verdicts for game, contract, card, workflow guide, invoker, player-author, specialist, replayer, and sensor. Do not turn an instruction, timing, or capture failure into a game bug.
2. In audit mode, preserve the frozen skill snapshot and produce only evidence-backed, minimal, quest-agnostic repair proposals classified by role. Leave skill mutation to a later explicit human request.
3. Persist the card, approval manifest, role logs, evidence, report, unverified claims, and audit artifacts under project conventions.
4. Leave repository changes uncommitted. Close only browser contexts and processes created by the run and verify teardown.

*Done when:* outcome and trajectory oracles support the verdicts, every role has an audit result, generic repair proposals avoid route/SLA leakage, and created runtime resources are closed.

## Companions

- Human-only empirical skill audit: `rpg-maker-mz-black-box-playtest-audit`.
- Route planning and durable QA design: `rpg-maker-mz-qa-report`.
- General QA or harness execution: `rpg-maker-mz-qa-execution`.
- Specialized visual capture: `rpg-maker-mz-visual-evidence`.
- Completion and release gates: `rpg-maker-mz-final-verify`.
