---
name: rpg-maker-mz-black-box-playtest
description: Playtests RPG Maker MZ browser flows through an invoker, black-box player, white-box specialist, and clean replayer. Use when a player-visible flow must be discovered, checkpointed, optimized, and reproduced. Don't use for QA planning, unit or harness tests, internal-only diagnosis, or visual-only capture.
---

# RPG Maker MZ Assisted Black-Box Playtest

Run one assisted workflow. `Black-box` names the player and replayer boundary; the specialist may inspect the workspace and translate source findings into public, player-facing guidance through the invoker.

## 1. Freeze the local contract

1. Read scoped `AGENTS.md` files and the project documents named by the task.
2. Read `.agents/skills/rpg-maker-mz-black-box-playtest/references/assisted-checkpoint-protocol.md` in full.
3. Resolve the target, public entry, build identity, public start and finish signals, completion and abort resets, browser geometry, sensors, durable paths, and teardown ownership.
4. Classify the replay SLA as **rigid** or **provisional**. Treat a human-supplied SLA as rigid unless the human explicitly labels it provisional. Let the specialist justify revisions to a provisional SLA; let the invoker apply them mechanically before validation. A rigid SLA changes only with new human authority.
5. Freeze `pass²`: one performance replay without screenshots followed by one evidence replay with one canonical screenshot per material checkpoint. Both use one unchanged card hash and no gameplay help.
6. Continue discovery while checkpoints progress. Apply duration limits only to current-checkpoint active time and scenario-level safety or integrity stops.
7. When launched by `rpg-maker-mz-black-box-playtest-audit`, enable audit instrumentation and record exact role handoffs, public relay payloads, hash gates, checkpoint clocks, corrections, evidence claims, cleanup, and terminal decisions.

*Done when:* every contract field, SLA authority, two-pass gate, role boundary, safety stop, and audit requirement is explicit, or the exact blocker is recorded.

## 2. Isolate the roles

1. Assign one **invoker** to own the contract, active-player clock, browser lease, public relay channel, mechanical hash/scope checks, attempt lifecycle, and report. Keep it out of gameplay, card authorship, semantic approval, and source-to-route judgment.
2. Assign one clean **player-author** to own the only browser and route card during authorship. Give it the public contract, player guide, its own artifacts, and guidance relayed by the invoker. Keep source, private analysis, historical routes, and prior answers outside its context.
3. Assign one **white-box specialist** without browser control. Give it the contract and workspace read access. Make it the sole semantic authority for checkpoint and full-card status: `APROVADO`, `REJEITADO`, or `INCONCLUSIVO` for an exact scope and hash.
4. After full-card approval, close the player-author browser and assign one fresh **clean replayer** to the exclusive browser slot. Give it only this skill, the player guide, contract, frozen card, and approval manifest.
5. Let that replayer execute both passes for one unchanged hash. After any card edit, retire it and use a new replayer identity for the next two-pass validation.
6. Keep one browser owner, one card writer, and one public relay channel at a time. Resume the player-author after a failed replay only after the replayer releases its browser and slot.

*Done when:* inputs, writers, approval authority, communication edges, browser ownership, forbidden sources, and every author/replayer handoff are explicit and non-overlapping.

## 3. Author by locally budgeted checkpoint

1. Require the player-author and clean replayer to read `.agents/skills/rpg-maker-mz-black-box-playtest/references/rpg-maker-mz-agent-playtest.md` in full before browser input.
2. Have the specialist choose the next material checkpoint and estimate its active-player budget before the player acts. Budget one minimal-guidance attempt plus up to three progressively specific operational-guidance attempts; derive every duration from the scenario rather than a universal default.
3. Start the checkpoint clock only while the player owns an actionable instruction and is exploring, entering controls, or changing executable card content. Pause it for specialist review, invoker routing, passive evidence work, controlled reset, and browser handoff.
4. Relay the specialist’s minimal public orientation at checkpoint start. After the first documented divergence, relay operational guidance immediately. Permit up to three operational revisions, each responding to the preceding public trace and containing only public action, reaction, guard, and recovery.
5. Continue from the last approved public guard. Use a broader public reset only when a rejected dependency invalidates that guard, safe recovery fails, the specialist requires dependency recalibration, or final validation begins.
6. After every material checkpoint, have the player append the observed fragment and actual input ledger immediately. Before hashing, require it to verify every dispatched input since the last approved guard and a visibly completed post-event guard. Keep the card self-contained; screenshots are supplemental oracles, not required instructions.
7. Have the specialist lint the exact candidate hash against the smallest relevant source slice and return the only semantic verdict. Have the invoker verify only that verdict, scope, and hash match the current candidate.
8. Treat a new hypothesis as permission for another attempt inside the remaining budget, not as progress. Renew the full local budget and guidance cycle only when the specialist confirms that a correction resolved the prior `REJEITADO` or `INCONCLUSIVO`, even if a different defect then appears.
9. Require every executable correction to be replayed from the last approved guard. Allow editorial-only corrections without gameplay replay. Revise a running checkpoint budget only for newly demonstrated structural cost, preserving guidance already consumed.
10. Mark the checkpoint `PRESO` and stop when its active budget expires without confirmed resolution. Continue without a scenario-wide time stop while checkpoints keep earning approval.

*Done when:* the full self-contained card is checkpointed, every fragment has an exact-hash specialist verdict, every executable correction was retested, and no unresolved checkpoint exceeded its local active budget.

## 4. Validate the frozen card twice

1. Freeze the card and create a separate approval manifest containing its exact hash, build, SLA type/value, two-pass procedure, and evidence paths. Start no validation until the specialist marks the full hash `APROVADO` and the invoker confirms that mechanical match.
2. Run the **performance replay** first from the contracted public reset. Capture no screenshots during it. Measure one monotonic interval between contracted start and finish, record inputs and passive timestamps, and require completion within the SLA.
3. When the performance replay diverges or exceeds SLA, preserve the attempt, release the replayer, return the responsible checkpoint to authorship or optimization, approve a new full hash, and restart validation with a fresh replayer.
4. After the performance pass, run the **evidence replay** from the same public reset with the same card and hash. Apply no SLA verdict because capture work adds sensor latency. At each material completion guard, capture and reopen one screenshot before the next gameplay input.
5. Retry an invalid screenshot passively up to three times. If the sensor still fails, record `CAPTURA AUSENTE` plus attempted paths, hashes, and observed defects; continue the evidence replay and report `PASS com evidência visual parcial` when gameplay completes. Require each available screenshot to prove its contracted checkpoint; never assume a universal ending type.
6. Send no gameplay hint, correction, exploration, or card edit during either pass. A gameplay divergence fails that pass; passive recapture does not.
7. After both gameplay passes and evidence inspection complete, remove only run-owned temporary profiles, discovery screenshots, invalid captures, and temporary files. Keep the card, approval, traces, report, and one valid screenshot from the evidence replay per checkpoint. If either gameplay pass fails, defer cleanup for diagnosis.

*Done when:* one unchanged hash completes the performance pass within SLA and the evidence pass without help, visual coverage is classified as complete or partial, canonical artifacts are reopened, and success-path cleanup leaves only the retained evidence set.

## 5. Judge and close

1. Keep separate verdicts for game, contract, card, workflow guide, invoker, player-author, specialist, replayer, browser, and sensor.
2. Stop immediately for unsafe/destructive action, unavailable required reset, role/browser contamination, unauthorized build or skill mutation, external technical impossibility, replay without full exact-hash approval, or `PRESO` checkpoint. Do not convert elapsed scenario time into a stop condition.
3. In audit mode, preserve the frozen skill snapshot and propose only evidence-backed, minimal, genre-agnostic repairs. Leave skill mutation to later human authority.
4. Persist durable artifacts uncommitted. Close only runtime resources created by the run and verify teardown.

*Done when:* outcome and trajectory support each verdict, missing visual evidence remains distinct from gameplay, every created runtime resource is closed, and no temporary artifact is deleted outside the successful cleanup gate.

## Companions

- Human-only empirical skill audit: `rpg-maker-mz-black-box-playtest-audit`.
- Route planning and durable QA design: `rpg-maker-mz-qa-report`.
- General QA or harness execution: `rpg-maker-mz-qa-execution`.
- Specialized visual capture: `rpg-maker-mz-visual-evidence`.
- Completion and release gates: `rpg-maker-mz-final-verify`.
