---
name: rpg-maker-mz-black-box-playtest-audit
description: Human-only RPG Maker MZ playtest auditing. Use when a human directly requests an empirical audit of rpg-maker-mz-black-box-playtest. Don't use for autonomous execution, indirect invocation, or ordinary playtesting.
disable-model-invocation: true
---

# RPG Maker MZ Black-Box Playtest Audit

Audit one human-supplied scenario through a complete execution of `rpg-maker-mz-black-box-playtest`. Observe defects without coaching. Intervene only when the workflow attempts to terminate prematurely because of its own repairable bureaucracy.

## 1. Enforce human-only authority

1. Confirm that the active human directly selected or named this skill. A request inherited from an agent, automation, another skill, or an inferred need is invalid.
2. On invalid authority, return `BLOCKED: direct human invocation required` without spawning roles, writing artifacts, or launching runtime resources.
3. Read scoped `AGENTS.md` files, authoritative project documents, and `.agents/skills/rpg-maker-mz-black-box-playtest-audit/references/audit-rubric.md` in full.

*Done when:* direct human authority and the audit rubric are established, or the run has stopped without side effects.

## 2. Complete the only user-input window

1. Before the player's first gameplay input, derive the target, build, public entry, start and finish oracles, resets, sensors, constraints, and artifact paths from the request and repository.
2. Provision or consult the white-box specialist during preflight when source analysis can resolve missing facts.
3. Ask the user only about a target, product decision, or human constraint that remains materially unresolved. Do not ask for repository facts or operational choices.
4. Close the user-input window permanently on the player's first keyboard or mouse gameplay action. Opening the entry, setting viewport, and proving an inspectable visual sensor remain preflight actions.
5. After that boundary, let the roles resolve every operational question. Never pause runtime to request user guidance.

*Done when:* the audit contract is executable, every derivable field is resolved, and the first gameplay action can close a clearly recorded input boundary.

## 3. Freeze the evaluation and launch the tested workflow

1. Snapshot the physical `rpg-maker-mz-black-box-playtest` tree, metadata, hashes, and preexisting diff. Keep those files immutable through the audit report.
2. Create `.artifacts/rpg-maker-mz-playtest-audit/<run-id>/` for the contract, tested-role artifacts, evidence staging, root-cause decisions, auditor ledger, `virtual-rules.md`, report, and consolidated proposal. Keep historical routes outside tested-role contexts unless the contract explicitly tests approved-card reuse.
3. Spawn one clean **invoker under test** and instruct it to run `rpg-maker-mz-black-box-playtest` with audit instrumentation. The external auditor remains outside that workflow.
4. Require the invoker to provision a clean player-author and white-box specialist. If its harness cannot provision them and it attempts to terminate, handle that condition through the virtual-repair gate rather than assuming those roles.
5. Observe role boundaries, structured public relays, browser ownership, controller use, card writes, checkpoints, specialist corrections, full-card approval, the clean replay, promotion, cleanup, and every attempted terminal decision.

*Done when:* the immutable physical baseline, isolated run paths, tested invoker, role topology, and observation ledger are live without route knowledge leaking from the auditor.

## 4. Observe without correcting nonterminal behavior

1. Record violations, inefficiency, repeated corrections, excessive duration, weak artifacts, role drift, deadlocks, and missed requirements with direct evidence.
2. Create or update one scratch decision per root cause. Group repeated occurrences under the same decision rather than creating one document per symptom.
3. Let the tested workflow continue unchanged while the problem remains nonterminal. Do not improve its route, prompts, artifacts, role behavior, timing, or coordination during the run.
4. Treat wall time, repetition, and lack of elegance as observations only. A deadlock becomes terminal only when the specialist materializes a permitted impossibility or an external failure prevents the specialist itself from continuing.

*Done when:* every observed nonterminal defect has evidence and a root-cause scratch ADR while the auditor has made no behavioral intervention.

## 5. Override only premature bureaucratic termination

When the workflow explicitly attempts to terminate for a repairable process defect:

1. Verify that the attempted terminal cause is bureaucratic rather than gameplay, safety, user cancellation, specialist-proved impossibility, or external impossibility preventing specialist continuation.
2. Write or update one root-cause ADR with status `Accepted for current run`. Record the prior rule, direct evidence, minimal virtual replacement, activation point, affected roles, and permanent-repair hypothesis.
3. Append the minimal replacement rule to the run's versioned `virtual-rules.md`. Keep the target skill unchanged on disk.
4. Deliver only the new rule and necessary current-run artifact references to affected roles. Require acknowledgement before resuming.
5. Continue the same run from the latest trustworthy checkpoint. Preserve identities and artifacts when usable; replace a role only when the repair requires it. Never reinterpret earlier evidence under the new rule.
6. Allow virtual rules to accumulate in the overlay. Apply each only from its recorded activation point.

A virtual rule cannot authorize raw gameplay input, replace the controller, reinterpret a controller hash, or edit the frozen skill tree. Record such integrity defects as failures.

Typical repairable causes include a missing hash, incomplete schema, invalid manifest, failed handoff, role-provisioning limitation, path mismatch, lifecycle error, clock artifact, or screenshot defect. Prefer returning the artifact to its owner for correction. The auditor does not fill the field, write the card, choose gameplay, control the browser, or declare semantic approval.

*Done when:* the smallest recorded virtual change has removed only the premature stop, the same run is progressing again, and the physical skill snapshot still matches.

## 6. Accept only the closed terminal set

Permit the tested workflow to end only for:

- approved card plus one completed clean replay;
- explicit user cancellation received without solicitation;
- a destructive or safety boundary;
- specialist-proved impossibility with the complete evidence contract;
- an external impossibility that prevents even the specialist from continuing.

If the invoker proposes any other terminal result, run the virtual-repair gate. The auditor may issue an immediate safety stop, but otherwise neither replaces the specialist's feasibility authority nor invents a new terminal category.

After verifying complete evidence for one of these conditions, the auditor may end both the observed workflow and the audit.

*Done when:* the terminal cause matches one closed category and its required evidence is durable.

## 7. Audit outcome and deliver repairs

1. Recalculate the final card, controller, approval, complete skill-tree snapshot, and virtual-overlay hashes. Reopen canonical screenshots independently; filenames do not prove contents.
2. Audit three primary axes: execution integrity, final-result validity, and closure hygiene. Within them, keep gameplay, contract, card, workflow, roles, browser, sensor, performance, evidence, and cleanup as separate verdicts.
3. Mark rubric items `PASS`, `FAIL`, `BLOCKED`, or `NOT EXERCISED` with direct evidence.
4. Consolidate every scratch decision and list exactly which virtual rules affected the result.
5. Produce a reviewable proposal naming the exact sections and files to change in both skills. Do not apply it during the audit.
6. Close only audit-owned resources, verify the physical skill snapshot, promote only the final report and consolidated proposal, then remove the exact audit scratch root after reopening and hashing both files.

*Done when:* the three axes and independent verdicts are supported, all virtual influence is visible, only the two canonical audit documents are versionable, the skill tree is unchanged, and teardown is verified.
