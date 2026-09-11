---
name: rpg-maker-mz-final-verify
description: Verifies RPG Maker MZ delivery and candidate versioning readiness. Use before reporting a task, spec, fix, QA cycle or release ready, when assessing what deserves inclusion in a commit, or when organizing an accepted delivery. Don't use to create missing implementation or replace required runtime evidence with weaker checks.
---

# RPG Maker MZ Final Verify

Evidence precedes the claim. Challenge both the delivered behavior and the value of the proposed versioned set before declaring either ready.

## 1. Define the claim

Read `AGENTS.md`, the task, `planos/tasks/<slug>/spec.md`, `verification.md`, affected discipline contracts, and changed files. List the exact criteria being claimed and their assigned sensors.

Inspect the working-tree and index inventory to distinguish this delivery from other pending work. Freeze the actual candidate set using its base/head and file hashes, including new files and deletions; identify relevant ignored inputs separately. Attribute every candidate to its owning scope. Additional changes require their own review and evidence or explicit exclusion from the ready set; preserve unrelated work.

Done when: every claim has an authority and expected observable, and every candidate has an owner and an explicit inclusion or exclusion. No file inherits acceptance from another scope.

## 2. Prove each required state

Use the project's declared commands and evidence formats.

- `implemented`: required files and tracking changes exist.
- `static_verified`: lint, schema, data, asset, and build checks pass when applicable.
- `runtime_verified`: Jest/harness or live runtime proves behavioral criteria.
- `human_accepted`: an explicit human approval exists for criteria assigned to judgment.
- `release_ready`: all states required by `verification.md` are satisfied and blocking findings within that declared delivery are resolved. This does not certify a broader candidate set.

Bind evidence to the current revision, relevant input hashes, command, exit status, tool version, and artifact paths. A revision change triggers impact analysis. Rerun only when relevant code, fixture, expected result or sensor changed, or equivalence cannot be established. Keep historical hashes truthful and record the retained scope and dependencies in the current verification owner.

Done when: every required state is supported by fresh evidence or remains explicitly unsatisfied.

## 3. Challenge the evidence and affected behavior

For each material behavioral change, ask which relevant defects could survive all reported checks. Trace uncovered failure paths at the owning boundary, including resource release and recovery where applicable. Check that the evidence exercises the claimed capability, not only an adjacent helper or successful setup. Source-hash equivalence preserves the applicability of an earlier result; it does not expand that result's coverage.

Inspect affected plugin load order and parameters, plugin-command callers, event/interpreter lifecycle, save/load, scene boundaries, assets, input, rendering, audio and deployment against each included scope's contract. Respect authorized sensor exclusions; an exclusion for one delivery does not verify another scope's behavior.

Route material uncertainty or a credible defect to `rpg-maker-mz-deep-review` or the owning verification workflow. Use independent review when the risk warrants it; do not require delegation for every change. Confirm findings with a concrete source trace or the narrowest authorized reproduction. Keep unsupported suspicions distinct from findings.

Done when: relevant risks have been examined or remain explicit gaps, and no candidate is declared ready with unresolved blocking findings or missing required evidence.

## 4. Audit the candidate set before acceptance

When a delivery changes maintained files or proposes a versioned set, read [candidate review and post-acceptance organization](references/post-acceptance-organization.md) in full and execute its pre-acceptance phase. This read-only audit and the proposed dispositions precede the readiness verdict and any request for final acceptance. A verification-only run with no changed candidate set may reuse an equivalent prior audit or record why this step does not apply.

Done when: the candidate audit accounts for every proposed path, justifies what stays, and identifies required corrections, consolidation or deferral without deleting useful knowledge.

## 5. Report truthfully

On failure, diagnose, repair through the owning workflow, rerun stale checks, and preserve failing evidence when useful. Never label historical execution as new. Record the verdict and short rationale in the existing verification owner; keep detailed working inventories in local evidence rather than creating competing status documents.

Distinguish the contracted delivery verdict, candidate-set readiness and actual Git state: prepared selections/messages, staged files, created commits and publication. Report excluded groups and their remaining work. Each readiness verdict is `PASS`, `FAIL` or `BLOCKED`, with its precise scope, evidence and limits; a technical failure is not a request for human acceptance.

Done when: the report cannot imply that a broader package is ready, a missing sensor passed, or a Git action occurred merely because the delivery was accepted or its files were grouped.

## 6. Organize after final human acceptance

After completing the audit and machine-verifiable corrections, present the concrete delivery for any required final human judgment. Reuse an existing compatible final acceptance instead of requesting it again. Then execute the post-acceptance phase of the loaded organization reference for that scope. Archiving, removal and delivery-material preparation follow acceptance; technical inspection and selection proposals do not wait for it.

Done when: organization has its own evidence-backed result in the existing verification owner, or remains pending for lack of compatible final acceptance.
