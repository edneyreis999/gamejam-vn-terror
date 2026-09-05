---
name: rpg-maker-mz-black-box-playtest
description: Completion-first RPG Maker MZ playtesting. Use when an agent must complete and reproduce one player-visible map, quest, scene, ending, or visual-novel flow through the browser. Don't use for QA planning, unit tests, internal-only diagnosis, or visual-only capture.
---

# RPG Maker MZ Completion-First Black-Box Playtest

Complete one supplied player-visible flow. The current agent is the **invoker**. It coordinates one black-box player-author and one white-box specialist until the target completes or the specialist proves impossibility. Repair process defects in place; keep gameplay completion, reproducibility, performance, evidence, and workflow as separate verdicts.

## 1. Freeze an executable contract

1. Read scoped `AGENTS.md` files and the authoritative project documents named by the task.
2. Read `.agents/skills/rpg-maker-mz-black-box-playtest/references/assisted-checkpoint-protocol.md` and `.agents/skills/rpg-maker-mz-black-box-playtest/references/controller-and-route-card.md` in full.
3. Resolve build, public entry, stable start and finish guards, rejecting oracle, public resets, browser geometry, visual sensor, any human performance goal, canonical output path, safety boundaries, and teardown ownership from the request and repository. Never ask the user a question, including during preflight.
4. Locate an existing approved route card for the same target and build. Reuse it when its manifest and entry conditions match; otherwise start guided authorship. Treat a divergent reused card as `VENCIDO` and repair it through authorship.
5. Create `.artifacts/rpg-maker-mz-playtest/<run-id>/` as the ignored scratch root. Put every draft, diagnostic image, trace, receipt, runner, ledger, and transient Markdown file there. Stage nothing directly in the canonical output path.

*Done when:* the target is falsifiable, all run paths are isolated, the performance-goal scope is explicit or marked ambiguous, and reuse or authorship has been selected.

## 2. Establish the roles

1. Act as the **invoker**. Own the contract, browser lease, exact structured relay, artifact repair, controller preflight, role lifecycle, hash matching, report, promotion, and teardown. Do not control gameplay, write the card, or make semantic route decisions.
2. Assign one **player-author** as the only browser owner and only card writer during authorship. Give it the public contract, player guide, current card, its own public artifacts, and specialist guidance relayed by the invoker. Keep source and private specialist analysis outside its context.
3. Assign one **white-box specialist** with source access and no browser control. Make it responsible for feasibility, the complete candidate transaction route, material checkpoints, frozen recovery, diagnosis, optimization, full-card semantic approval, and any impossibility verdict.
4. Allow the specialist to inspect current-run public images and controller results. Require it to keep private source facts separate from the `PUBLIC GUIDANCE` relayed to the player.
5. Keep one browser owner, one card writer, and one public relay channel at a time. When a role must be replaced, transfer its durable, role-permitted current-run artifacts and continue from the latest trustworthy public checkpoint.

*Done when:* role inputs, private boundaries, artifact ownership, browser ownership, and the single relay channel are explicit and usable.

## 3. Reach the finish through checkpoint coaching

1. Require the player-author to read `.agents/skills/rpg-maker-mz-black-box-playtest/references/rpg-maker-mz-agent-playtest.md` and the controller contract in full before its first gameplay input.
2. Have the specialist derive the complete public route and material checkpoint graph before play. It returns each checkpoint instruction as one structured object containing precondition, one closed-vocabulary transaction, postcondition, optional checkpoint, frozen recovery, and private source-basis reference. The invoker validates its shape and relays it unchanged without creating one Markdown file per instruction.
3. Preflight the installed controller in the exact Playwright context without gameplay input. The player then attempts the next checkpoint through controller-generated runner files only. It observes before and after each transaction, not after every pulse, dialogue page, menu input, or turn inside a composite movement.
4. Batch dialogue pages within a proven safe mode and compose directional runs between public checkpoints. End a transaction before an unobserved choice or irreversible input. Execute recovery only after the player confirms its exact frozen guard.
5. On divergence, relay the player's current public image and controller result to the specialist. The specialist corrects the transaction or recovery; the player proves every executable change in the browser before writing it to the card. Guidance has no attempt, relay, or active-time cap.
6. Continue the player-observation-specialist loop while the specialist considers the target reachable. Run no discovery clock, parcel gate, envelope, or `PRESO` budget.
7. Return incomplete artifacts to their owner. A measurement defect invalidates only its metric. Uncertain input delivery requires public observation and frozen recovery or renewed authorship, but never becomes a terminal process result.
8. Accept impossibility only from the specialist with every protocol field materialized.

*Done when:* the finish oracle has appeared and every retained transaction and recovery has browser proof in the structured card, or the specialist has proved permitted impossibility.

## 4. Optimize and approve the complete card

1. After first completion, have the specialist identify redundant transactions, counts, and recoveries using source plus the public trace.
2. Have the player-author test every executable optimization from the nearest trustworthy public reset or checkpoint. Keep only changes that are publicly reproduced.
3. Freeze the final material checkpoint list for evidence. The list may have evolved during authorship but cannot change inside validation.
4. Have the player finalize one self-contained JSON card matching the controller contract. Validate it with the bundled read-only helper and use its canonical hash.
5. Have the specialist return `APROVADO`, `REJEITADO`, or `INCONCLUSIVO` for the complete canonical hash and attest that no shorter public route is known. Have the invoker mechanically match verdict, scope, build, controller identity, and hash in a separate approval manifest.

*Done when:* every executable optimization has browser proof and the complete immutable card has exact-hash specialist approval as the best known public route.

## 5. Validate the frozen card once

1. Close the player-author browser and prove its exact lease released. Assign one fresh **clean replayer** to the exclusive browser slot. Give it only this skill, player guide, contract, frozen card, approval manifest, controller contract, clock reference, and its scratch paths.
2. Require the replayer to read the player guide, controller contract, and `.agents/skills/rpg-maker-mz-black-box-playtest/references/active-clock.md` in full before input. Recalculate card and controller identity, regenerate preflight, and match both to approval.
3. Bind one receipt ledger to the run, approved card, controller, and browser identity. Immediately after preflight and every main or recovery runner, export the current console to a unique scratch snapshot and persist the exact expected receipt before any next input.
4. Execute the frozen `setup` transactions through the controller to reset publicly, then prove the initial guard, start one continuous operational clock, and execute only the frozen `route` transactions without live help, exploration, or edits. The controller requires complete setup coverage but excludes it from active route time.
5. Use one live image after each persisted transaction. When it is a frozen material checkpoint, persist that same capture under its card filename; otherwise overwrite one scratch-only live image. Do not reread checkpoints during replay. Missing evidence remains distinct from gameplay completion.
6. At the finish guard, stop the operational clock and summarize the bound ledger against the complete approved card. Receipt persistence or validation failure invalidates active time but gameplay continues; the bounded final console is diagnostic only. Reopen and hash every canonical candidate image after the replay.
7. A frozen recovery that succeeds under its guard remains a valid replay action. Any other gameplay divergence retires the replayer and returns the affected transaction to authorship and specialist approval; a changed hash requires a new clean replay.

*Done when:* one unchanged approved hash completes one clean replay without help, both metrics are classified, and visual evidence is complete or partial.

## 6. Judge and close

1. Keep separate verdicts for gameplay, contract, card, workflow, invoker, player-author, specialist, replayer, browser, sensor, and cleanup.
2. End only after completed deliverables, explicit user cancellation, a destructive or safety boundary, a specialist-proved impossibility, or an external impossibility that prevents even the specialist from continuing.
3. For specialist impossibility, require the checkpoint and current public state, attempted public actions and recoveries, decisive screenshot or trace, source proof, reason further guidance cannot work, causal subsystem, and the condition needed to unblock.
4. Consolidate causal diagnostics before promotion. On success, promote only final contract, JSON card, approval, report, consolidated performance ledger, and one valid image per frozen material checkpoint. On impossibility, external block, or cancellation, promote only the final report, applicable verdict, and decisive minimum evidence. Keep every other current-run artifact in scratch.
5. Reopen promoted artifacts and verify their hashes, then remove the exact current-run scratch root. Close only run-owned runtime resources. Verify zero run-owned pages and the harness-specific release oracle; when a holder is exposed, act only on its positively recorded identity.

*Done when:* every verdict is causal, promoted artifacts reopen correctly, current-run transients do not appear in repository changes, the browser lease is released, and unverified claims remain explicit.

## Companions

- Human-only empirical audit: `rpg-maker-mz-black-box-playtest-audit`. Never invoke it from this skill.
- Route and QA planning: `rpg-maker-mz-qa-report`.
- General harness execution: `rpg-maker-mz-qa-execution`.
- Specialized visual capture: `rpg-maker-mz-visual-evidence`.
- Release evidence: `rpg-maker-mz-final-verify`.
