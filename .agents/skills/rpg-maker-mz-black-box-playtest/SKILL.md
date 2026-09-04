---
name: rpg-maker-mz-black-box-playtest
description: Completion-first playtesting of an RPG Maker MZ map, quest, scene, ending, or visual-novel flow through public browser interaction, white-box guidance, a reusable route card, optimized replay, and checkpoint evidence. Use when a player-visible flow must be completed and made reproducible. Don't use for QA planning, unit tests, internal-only diagnosis, or visual-only capture.
---

# RPG Maker MZ Completion-First Black-Box Playtest

Complete one supplied player-visible flow. The current agent is the **invoker**. It coordinates one black-box player-author and one white-box specialist until the target is complete or the specialist proves that completion is impossible. Process defects are repaired in place; they are not terminal outcomes.

## 1. Freeze an executable contract

1. Read scoped `AGENTS.md` files and the authoritative project documents named by the task.
2. Read `.agents/skills/rpg-maker-mz-black-box-playtest/references/assisted-checkpoint-protocol.md` in full.
3. Use the supplied target and resolve every other contract field from the request and repository: build identity, public entry, stable start and finish signals, rejecting finish oracle, public resets, browser geometry, sensors, durable paths, safety boundaries, and teardown ownership. Never ask the user a question, including during preflight.
4. Locate an existing approved route card for the same target and build. Reuse it when its manifest and entry conditions match; otherwise start guided authorship. Treat a divergent reused card as `VENCIDO` and repair it through authorship.
5. Create a fresh run root for contract, traces, card or card revision, approval, screenshots, performance clock, and report.

*Done when:* the target and public success oracle are falsifiable, the build and reset policy are known, all run paths are isolated, and the workflow has selected reuse or authorship.

## 2. Establish the roles

1. Act as the **invoker**. Own the contract, browser lease, exact public relay, artifact repair loop, role lifecycle, validation handoffs, report, and teardown. Do not control gameplay, write the card, or make semantic route decisions.
2. Assign one **player-author** as the only browser owner and only card writer during authorship. Give it the public contract, player guide, current card, its own public artifacts, and specialist guidance relayed by the invoker. Keep source and private specialist analysis outside its context.
3. Assign one **white-box specialist** with source access and no browser control. Make it responsible for full-route feasibility, checkpoint selection, public guidance, diagnosis, route optimization, full-card semantic approval, and any impossibility verdict.
4. Allow the specialist to inspect current-run public screenshots and exact input traces. Require it to keep private source facts separate from the `PUBLIC GUIDANCE` relayed to the player.
5. Keep one browser owner, one card writer, and one public relay channel at a time. When a role must be replaced, transfer its durable, role-permitted current-run artifacts and continue from the latest trustworthy public checkpoint.

*Done when:* role inputs, private boundaries, artifact ownership, browser ownership, and the single relay channel are explicit and usable.

## 3. Reach the finish through checkpoint coaching

1. Require the player-author to read `.agents/skills/rpg-maker-mz-black-box-playtest/references/rpg-maker-mz-agent-playtest.md` in full before its first gameplay input.
2. Have the specialist derive the complete public route and material checkpoint graph before play. Relay the complete route to the player, while making the next checkpoint the immediate objective.
3. Let one player turn attempt the complete next checkpoint. The player may perform multiple observed public actions, advance dialogues, correct focus, and recover locally. It returns control after reaching the checkpoint, observing a contradiction, needing more precise guidance, or encountering a technical or safety condition.
4. On difficulty or divergence, relay the player's screenshot and exact input trace to the specialist. Have the specialist return immediately more specific checkpoint-local guidance: exact public actions, counts or bounded holds when useful, visible reactions, stop guards, and recovery. Guidance has no attempt, relay, or active-time cap.
5. Continue the player-observation-specialist loop while the specialist considers the target reachable. Do not run a discovery clock, parcel gate, envelope, or `PRESO` budget.
6. After each reached checkpoint, have the player append the actions actually dispatched and the stable public reactions actually observed. The specialist confirms the fragment semantically; checkpoint fragments do not need individual hashes or formal verdict manifests.
7. Return incomplete or inconsistent artifacts to their owner with the missing fields identified. Retry or replace the owner when necessary while preserving trustworthy progress. A repairable hash, schema, manifest, lifecycle, handoff, screenshot, path, or tooling defect never ends the playtest.
8. Accept an impossibility verdict only from the specialist and only when it materializes every field required by the protocol. Otherwise return it for completion and continue.

*Done when:* the finish oracle has materialized in the browser and every material checkpoint is represented by an executed, public, self-contained card fragment, or the specialist has proved a permitted terminal impossibility.

## 4. Optimize and approve the complete card

1. After first completion, have the specialist identify redundant navigation, inputs, dialogue operations, waits, and recoveries using source plus the public trace.
2. Have the player-author test every executable optimization from the nearest trustworthy public reset or checkpoint. Keep only changes that are publicly reproduced.
3. Freeze the final material checkpoint list for evidence. The list may have evolved during authorship but cannot change inside validation.
4. Have the player finalize a self-contained card containing exact public preconditions, inputs, reactions, completion guards, resume guards, recovery, build identity, assisted provenance, and validity conditions.
5. Hash the complete card once. Have the specialist return `APROVADO`, `REJEITADO`, or `INCONCLUSIVO` for that exact full-card hash and attest that no shorter public route is known for the build. Have the invoker mechanically match verdict, full scope, build, and hash in a separate approval manifest.

*Done when:* every executable optimization has browser proof and the complete immutable card has exact-hash specialist approval as the best known public route.

## 5. Validate the frozen card twice

1. Close the player-author browser and assign one fresh **clean replayer** to the exclusive browser slot. Give it only this skill, the player guide, contract, frozen card, approval manifest, performance-clock reference and helper, and its own artifacts.
2. Require the replayer to read `.agents/skills/rpg-maker-mz-black-box-playtest/references/rpg-maker-mz-agent-playtest.md` and `.agents/skills/rpg-maker-mz-black-box-playtest/references/active-clock.md` in full before input.
3. Run the **performance replay** first from the contracted public reset. Use no screenshots or live help. Execute only the card and measure one continuous helper-clock interval between the contracted start and finish signals. Report the measured duration and any human-supplied performance goal separately; time never invalidates proof of completion.
4. Run the **evidence replay** from the same reset with the same replayer, card, and hash. Use no live help or card edits. At every frozen checkpoint, attempt one screenshot and reopen it before continuing. Retry an invalid capture passively up to three times, then record `CAPTURA AUSENTE` and continue. Missing screenshots make visual evidence partial, not gameplay unsuccessful.
5. If either replay diverges, preserve the attempt, retire the replayer, return the responsible portion to guided authorship, approve a new full hash, and validate again with a new clean replayer. Continue until both gameplay passes complete or the specialist proves impossibility.

*Done when:* one unchanged approved hash completes both replays without help, the performance duration is recorded, and visual evidence is classified as complete or partial.

## 6. Judge and close

1. Keep separate verdicts for gameplay, contract, card, workflow, invoker, player-author, specialist, replayer, browser, sensor, and cleanup.
2. End only after completed deliverables, explicit user cancellation, a destructive or safety boundary, a specialist-proved impossibility, or an external impossibility that prevents even the specialist from continuing.
3. For specialist impossibility, require the checkpoint and current public state, attempted public actions and recoveries, decisive screenshot or trace, source proof, reason further guidance cannot work, causal subsystem, and the condition needed to unblock.
4. Retain contract, card, approval, traces, report, performance ledger, and every valid canonical screenshot. Remove only run-owned temporary resources after successful validation; preserve failure artifacts for diagnosis. Close only runtime resources created by the run and verify teardown.

*Done when:* every outcome has a causal verdict, the reusable card and available evidence are durable, all created runtime resources are closed, and unverified claims remain explicit.

## Companions

- Human-only empirical audit: `rpg-maker-mz-black-box-playtest-audit`. Never invoke it from this skill.
- Route and QA planning: `rpg-maker-mz-qa-report`.
- General harness execution: `rpg-maker-mz-qa-execution`.
- Specialized visual capture: `rpg-maker-mz-visual-evidence`.
- Release evidence: `rpg-maker-mz-final-verify`.
