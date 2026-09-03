---
name: rpg-maker-mz-black-box-playtest-audit
description: Audits the assisted RPG Maker MZ browser-playtest workflow and proposes minimal role-specific repairs. Use when a human directly requests an empirical audit against a supplied map, quest, scene, ending, or visual-novel flow. Don't use for automatic invocation, ordinary playtests, skill mutation, or QA planning.
disable-model-invocation: true
---

# RPG Maker MZ Black-Box Playtest Audit

Run a human-initiated evaluation of `rpg-maker-mz-black-box-playtest` against one supplied map, quest, scene, ending, or visual-novel flow. Audit the three-agent workflow; do not become its invoker.

## 1. Enforce manual authority

1. Confirm that the active human message directly invoked this skill and supplied one target map, quest, scene, ending, or visual-novel flow. Treat a UI skill selection as direct invocation.
2. When the request came only from another agent, inherited prompt, automation, or model inference, return `BLOCKED: direct human invocation required` and spawn nothing.
3. Read scoped `AGENTS.md` files and authoritative project documents. Derive repository facts; ask the human only when the target or a product decision remains materially ambiguous.
4. Read `references/audit-rubric.md` in full before creating the audit contract.

*Done when:* direct human authority, one unambiguous target, project rules, and every required rubric item are available, or the exact blocker is reported without side effects.

## 2. Freeze the evaluation

1. Snapshot the current `rpg-maker-mz-black-box-playtest` skill tree, metadata, hashes, and preexisting diff. Keep that snapshot immutable through the run.
2. Create a fresh run ID and isolated durable paths for the audit contract, role traces, card, approval, evidence, report, and repair hypotheses. Exclude historical routes and answers from the agents under test.
3. Freeze a total audit budget, reserves, stop conditions, and extension rule. Let the invoker under test infer scenario-local SLA, partial deadlines, and `pass^k` when the human did not supply them; audit the inference rather than choosing the values for it.
4. Define success using both trajectory and player-visible outcome. Include at least one oracle capable of rejecting a plausible but false success claim.
5. Keep the skill under test unchanged until the audit report is complete. Record any outside edit as contamination and restart or limit the claim.

*Done when:* the target skill snapshot, fresh artifact tree, budgets, independence boundary, and falsifiable success gate are frozen before the tested invoker starts.

## 3. Dispatch the workflow under test

1. Spawn one clean **invoker under test** through the harness’s native subagent facility. Instruct it to read `rpg-maker-mz-black-box-playtest/SKILL.md` and launch that skill with audit instrumentation enabled for the supplied target.
2. Require the invoker to spawn one clean **player-author** and one **white-box specialist**. Keep the current agent as the external auditor. This topology uses four concurrent slots: auditor, invoker, player, specialist.
3. Require the invoker to replace the player-author with a fresh replayer identity after authorship; the player and specialist must release their slots and the only browser before that handoff.
4. Give the invoker no historical route or answer. Give it the target, frozen audit paths, target-skill snapshot identity, and instruction to expose its decision ledger to the auditor.
5. Observe without coaching the quest. Send no route, timing optimization, card text, or specialist translation. Intervene only for safety, scope/authority violations, source contamination, competing browser owners, destructive action, or an attempt started without its required hash approval.
6. Append independent observations at role boundaries while the invoker continues. Never edit the player’s card, specialist’s private log, or invoker’s decision ledger.

*Done when:* the invoker has run the full skill or reached a legitimate stop condition, role isolation and browser ownership are traceable, and the auditor has not solved the scenario for the agents.

## 4. Audit outcome and trajectory

1. Recalculate frozen card and approval hashes. Compare every attempt with the revision actually authorized at its start.
2. Reopen required initial/final evidence independently. Compare file content with the executor’s claim; preserve black, corrupt, stale, or mismatched artifacts as findings.
3. Audit the invoker, player-author, specialist, and replayer against every applicable rubric item. Mark each `PASS`, `FAIL`, `BLOCKED`, or `NOT EXERCISED` with direct evidence.
4. Separate game, contract, card, workflow, role, browser, and sensor verdicts. Reject outcome-only success when the trajectory is not reproducible, and reject transcript-only success when the game state is unproved.
5. If the evidence gate fails near completion, allow only the extension already frozen by the invoker. Keep card, SLA, deadlines, and hints unchanged during a validating extension.

*Done when:* every acceptance claim has an independent oracle, every role has a trace-backed verdict, and no artifact name or agent confidence substitutes for observed content.

## 5. Propose minimal repairs

1. Trace each demonstrated failure to the narrowest role instruction that caused it. Distinguish invoker, player-author, specialist, replayer, audit wrapper, and external tooling.
2. For each finding, record symptom, evidence, root cause, minimal instruction change, behavior it would prevent, and a counterexample that keeps the rule generic across top-down RPGs, VNs, and hybrids.
3. Prefer deletion, clarification, ordering, ownership, schema, or gate changes over more agents, longer waits, retries, or quest-specific recipes.
4. Write an audit report and a separate repair-hypotheses artifact. Include exact proposed locations in the target skill, but leave the skill snapshot and implementation untouched.
5. Recheck the target skill tree against the initial snapshot and report contamination. Close only browser contexts and processes created by the audit.

*Done when:* every proposed repair is minimal, evidence-backed, role-owned, genre-agnostic, and reviewable by the human before any skill mutation.

## Handoff

Return the empirical verdict first, then link the report, hypotheses, frozen card/approval, role audit, and decisive evidence. State whether the run validates the workflow only for the supplied scenario or exposes a likely generic repair.
