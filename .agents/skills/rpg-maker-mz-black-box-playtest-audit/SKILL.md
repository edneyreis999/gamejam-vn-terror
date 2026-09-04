---
name: rpg-maker-mz-black-box-playtest-audit
description: Human-only empirical audit of the RPG Maker MZ completion-first browser playtest. Use only when a human directly selects it; don't use from agents, automation, or other skills.
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
2. Create a fresh audit root for contract, tested-role artifacts, evidence, auditor ledger, `virtual-rules.md`, report, and consolidated repair proposal. Keep historical routes outside tested-role contexts unless the audit contract explicitly tests approved-card reuse.
3. Spawn one clean **invoker under test** and instruct it to run `rpg-maker-mz-black-box-playtest` with audit instrumentation. The external auditor remains outside that workflow.
4. Require the invoker to provision a clean player-author and white-box specialist. If its harness cannot provision them and it attempts to terminate, handle that condition through the virtual-repair gate rather than assuming those roles.
5. Observe role boundaries, public relays, browser ownership, card writes, checkpoints, specialist corrections, full-card approval, both replays, screenshots, cleanup, and every attempted terminal decision.

*Done when:* the immutable physical baseline, isolated run paths, tested invoker, role topology, and observation ledger are live without route knowledge leaking from the auditor.

## 4. Observe without correcting nonterminal behavior

1. Record violations, inefficiency, repeated corrections, excessive duration, weak artifacts, role drift, deadlocks, and missed requirements with direct evidence.
2. Create or update one `Proposed` ADR per root cause. Group repeated occurrences under the same ADR rather than creating one decision per symptom.
3. Let the tested workflow continue unchanged while the problem remains nonterminal. Do not improve its route, prompts, artifacts, role behavior, timing, or coordination during the run.
4. Treat wall time, repetition, and lack of elegance as observations only. A deadlock becomes terminal only when the specialist materializes a permitted impossibility or an external failure prevents the specialist itself from continuing.

*Done when:* every observed nonterminal defect has evidence and a root-cause ADR while the auditor has made no behavioral intervention.

## 5. Override only premature bureaucratic termination

When the workflow explicitly attempts to terminate for a repairable process defect:

1. Verify that the attempted terminal cause is bureaucratic rather than gameplay, safety, user cancellation, specialist-proved impossibility, or external impossibility preventing specialist continuation.
2. Write or update one root-cause ADR with status `Accepted for current run`. Record the prior rule, direct evidence, minimal virtual replacement, activation point, affected roles, and permanent-repair hypothesis.
3. Append the minimal replacement rule to the run's versioned `virtual-rules.md`. Keep the target skill unchanged on disk.
4. Deliver only the new rule and necessary current-run artifact references to affected roles. Require acknowledgement before resuming.
5. Continue the same run from the latest trustworthy checkpoint. Preserve identities and artifacts when usable; replace a role only when the repair requires it. Never reinterpret earlier evidence under the new rule.
6. Allow virtual rules to accumulate in the overlay. Apply each only from its recorded activation point.

Typical repairable causes include a missing hash, incomplete schema, invalid manifest, failed handoff, role-provisioning limitation, path mismatch, lifecycle error, clock artifact, or screenshot defect. Prefer returning the artifact to its owner for correction. The auditor does not fill the field, write the card, choose gameplay, control the browser, or declare semantic approval.

*Done when:* the smallest recorded virtual change has removed only the premature stop, the same run is progressing again, and the physical skill snapshot still matches.

## 6. Accept only the closed terminal set

Permit the tested workflow to end only for:

- approved card plus both completed gameplay replays;
- explicit user cancellation received without solicitation;
- a destructive or safety boundary;
- specialist-proved impossibility with the complete evidence contract;
- an external impossibility that prevents even the specialist from continuing.

If the invoker proposes any other terminal result, run the virtual-repair gate. The auditor may issue an immediate safety stop, but otherwise neither replaces the specialist's feasibility authority nor invents a new terminal category.

After verifying complete evidence for one of these conditions, the auditor may end both the observed workflow and the audit.

*Done when:* the terminal cause matches one closed category and its required evidence is durable.

## 7. Audit outcome and deliver repairs

1. Recalculate the final card, approval, skill snapshot, and virtual-overlay hashes. Reopen canonical screenshots independently; filenames do not prove contents.
2. Audit gameplay, contract, card, workflow, invoker, player-author, specialist, replayer, browser, sensor, evidence, and cleanup separately. Completion does not erase workflow failures; workflow failures do not erase observed completion.
3. Mark rubric items `PASS`, `FAIL`, `BLOCKED`, or `NOT EXERCISED` with direct evidence.
4. Preserve every ADR, distinguish `Proposed` from `Accepted for current run`, and list exactly which virtual rules affected the result.
5. Produce a consolidated, reviewable proposal naming the exact sections and files to change in both skills. Do not apply it during the audit.
6. Close only runtime resources created by the audit and verify that the physical target-skill snapshot remains unchanged.

*Done when:* the report leads with the empirical outcome, every independent verdict is supported, all virtual influence is visible, permanent repairs are proposed but unapplied, and teardown is verified.
