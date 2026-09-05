---
name: rpg-maker-mz-final-verify
description: Verifies RPG Maker MZ completion claims against fresh static, test, runtime, human, and release evidence. Use when a task, spec, fix, QA cycle, or release is about to be reported ready. Don't use to create missing implementation or to treat a weaker sensor as equivalent evidence.
---

# RPG Maker MZ Final Verify

Evidence precedes the claim. Run the checks that own the claimed behavior and report only what they prove.

## 1. Define the claim

Read `AGENTS.md`, the task, `planos/tasks/<slug>/spec.md`, `verification.md`, affected discipline contracts, and changed files. List the exact criteria being claimed and their assigned sensors.

Done when: every claim has an authority source and an expected observable.

## 2. Prove each required state

Use the project's declared commands and evidence formats.

- `implemented`: required files and tracking changes exist.
- `static_verified`: lint, schema, data, asset, and build checks pass when applicable.
- `runtime_verified`: Jest/harness or live runtime proves behavioral criteria.
- `human_accepted`: an explicit human approval exists for criteria assigned to judgment.
- `release_ready`: all states required by `verification.md` are satisfied; contract location is not a gate.

Bind evidence to the current revision, relevant input hashes, command, exit status, tool version, and artifact paths. Evidence becomes stale when its revision or owned inputs change.

Done when: every required state is supported by fresh evidence or remains explicitly unsatisfied.

## 3. Check MZ parity

Inspect affected plugin load order and parameters, plugin-command caller semantics, event-page eligibility, interpreter lifecycle, save/load behavior, map/scene/battle boundaries, assets, input, rendering, audio, and deployment only where the spec assigns responsibility.

Done when: every affected MZ surface is either verified by its sensor or named as an open gap.

## 4. Report truthfully

On failure, diagnose, repair through the owning workflow, rerun the stale checks, and preserve the last failing evidence when useful. Never reuse success from an older tree. Record the final state in `verification.md` and report commands, evidence, unverified claims, and verdict.

Done when: the verdict is `PASS`, `FAIL`, or `BLOCKED` and cannot be read as stronger than its evidence.
