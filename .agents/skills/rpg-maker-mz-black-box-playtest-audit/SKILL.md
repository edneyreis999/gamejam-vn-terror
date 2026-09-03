---
name: rpg-maker-mz-black-box-playtest-audit
description: Audits the assisted RPG Maker MZ browser-playtest workflow and proposes minimal role-specific repairs. Use when a human directly requests an empirical audit against a supplied map, quest, scene, ending, or visual-novel flow. Don't use for automatic invocation, ordinary playtests, skill mutation, or QA planning.
disable-model-invocation: true
---

# RPG Maker MZ Black-Box Playtest Audit

Run a human-initiated evaluation of `rpg-maker-mz-black-box-playtest` against one supplied scenario. Audit the workflow; do not become its invoker.

## 1. Enforce manual authority

1. Confirm that the active human directly invoked this skill and supplied one target map, quest, scene, ending, or VN flow. Treat a UI selection as direct invocation.
2. When the request came only from another agent, inherited prompt, automation, or inference, return `BLOCKED: direct human invocation required` and spawn nothing.
3. Read scoped `AGENTS.md` files and authoritative project documents. Derive repository facts; ask the human only when the target or a product decision remains materially ambiguous.
4. Read `.agents/skills/rpg-maker-mz-black-box-playtest-audit/references/audit-rubric.md` in full before creating the audit contract.

*Done when:* authority, one target, project rules, and every rubric item are available, or the exact blocker is reported without side effects.

## 2. Freeze the evaluation boundary

1. Snapshot the current `rpg-maker-mz-black-box-playtest` tree, metadata, hashes, and preexisting diff. Keep it immutable through the report.
2. Create a fresh run ID and isolated durable paths for contract, traces, card, approval, evidence, report, and repair hypotheses. Exclude historical routes and answers from tested roles.
3. Freeze the human constraints, SLA type, public start/finish oracles, safety stops, role boundaries, and two-pass evidence contract. Require discovery to continue while checkpoints progress and to bound only current-checkpoint active time.
4. Require the invoker under test to obtain specialist estimates for each active-player checkpoint budget and to expose every clock transition, renewal, structural revision, guidance level, and `PRESO` decision.
5. Define success through trajectory plus player-visible outcome. Include an oracle capable of rejecting plausible false success and accept `PASS com evidência visual parcial` only when gameplay passes but a contracted screenshot sensor fails.
6. Keep the target skill unchanged until the audit report is complete. Record outside edits as contamination and restart or limit the claim.

*Done when:* snapshot, fresh paths, local-budget policy, two-pass gate, independence boundary, and falsifiable success oracle are frozen before the tested invoker starts.

## 3. Dispatch the workflow under test

1. Spawn one clean **invoker under test** through the native subagent facility. Instruct it to read `rpg-maker-mz-black-box-playtest/SKILL.md` and launch that skill with audit instrumentation.
2. Require the invoker to spawn one clean **player-author** and one **white-box specialist**. Keep the current agent as external auditor; this uses four concurrent slots.
3. Give the invoker no historical route or answer. Give it the target, frozen paths, snapshot identity, human constraints, and instruction to expose its decision ledger.
4. Observe without coaching. Intervene only for safety, authority/scope violation, competing browser owners, destructive action, target-skill contamination, or replay without full exact-hash approval.
5. Require the invoker to replace the player-author with one fresh replayer after full-card approval. The player releases the browser and both authoring roles release any slot the target workflow needs before handoff.
6. If validation returns to authorship, verify that the replayer releases the browser first and that the next validation revision receives a fresh replayer identity.
7. Append independent observations at role boundaries. Never edit the card, specialist log, invoker ledger, or evidence under test.

*Done when:* the workflow reaches its success gate or a legitimate safety/`PRESO` stop, role isolation and browser ownership are traceable, and the auditor never solved the scenario.

## 4. Audit outcome and trajectory

1. Recalculate every frozen card and approval hash. Compare attempts with the revision authorized at their start.
2. Reopen canonical evidence independently. Compare content with claims; preserve failed-run artifacts and verify success-path cleanup removes only run-owned temporaries.
3. Audit invoker, player-author, specialist, and replayer against every rubric item. Mark each `PASS`, `FAIL`, `BLOCKED`, or `NOT EXERCISED` with direct evidence.
4. Verify that the performance replay used no screenshots and alone received the SLA verdict. Verify that the evidence replay used the same hash, followed every material checkpoint without help, and captured/reopened one canonical screenshot per evidenced checkpoint.
5. Accept missing pass-2 screenshots as a sensor limitation only after up to three passive attempts and continued gameplay. Report gameplay and visual-evidence verdicts separately.
6. Reject outcome-only success when the trajectory is irreproducible and transcript-only success when no permitted public oracle proves the result.
7. Separate game, contract, card, workflow, role, browser, sensor, and cleanup verdicts.

*Done when:* every acceptance claim has an independent oracle, both passes and every role have trace-backed verdicts, and no filename or confidence substitutes for observed content.

## 5. Propose minimal repairs

1. Trace each demonstrated failure to the narrowest instruction owned by invoker, player-author, specialist, replayer, audit wrapper, or external tooling.
2. For each finding, record symptom, evidence, root cause, minimal instruction change, prevented behavior, and top-down/VN/hybrid counterexamples.
3. Prefer deletion, clarification, ordering, ownership, schema, or gate changes over more agents, waits, retries, or scenario recipes.
4. Write a report and separate hypotheses file naming exact target sections. Leave the target skill unchanged.
5. Recheck target hashes and contamination. Close only runtime resources created by the audit.

*Done when:* every repair is minimal, evidence-backed, role-owned, genre-agnostic, and reviewable before mutation.

## Handoff

Return the empirical verdict first, then link the report, hypotheses, frozen card/approval, role audit, and decisive evidence. State whether the run validates the workflow only for the supplied scenario or exposes a likely generic repair.
