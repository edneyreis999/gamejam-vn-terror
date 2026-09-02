---
name: rpg-maker-mz-deep-review
description: Reviews RPG Maker MZ Git diffs and working trees for defects, contract drift, and game-runtime risks. Use when plugins, data, events, saves, tooling, or a completed spec need deep review. Don't use as a substitute for playtest evidence or to publish findings remotely.
---

# RPG Maker MZ Deep Review

Review the frozen diff completely. Prefer an independent native reviewer when available; otherwise perform the same bounded review inline.

## 1. Freeze scope and authority

Record the base and head revisions or working-tree fingerprint. Read `AGENTS.md`, the relevant spec directory, affected discipline contracts, QA scenarios, and every changed file.

Done when: the review scope cannot drift unnoticed and every changed path has an owner.

## 2. Build review lenses

Cover only applicable lenses:

- `PluginManager` metadata, parameters, commands, aliases, load order, and caller context;
- MZ globals, event-page priority, interpreter waits, refreshes, transfers, scenes, battles, and party changes;
- data JSON authority, IDs, references, serialization, and save compatibility;
- PixiJS/window/sprite lifecycle, disposal, input, resolution, timing, camera, audio, and assets;
- Jest/harness fidelity, QA evidence, task/spec parity, and stale or missing verification.

Done when: every changed path is assigned to at least one lens.

## 3. Review and challenge

Trace behavior across files rather than reviewing hunks in isolation. Reproduce suspicious paths with the narrowest safe command. Classify findings by severity, confidence, affected player or author behavior, exact evidence, and required correction. Keep preferences out unless a repository rule owns them.

Done when: every changed path and every applicable lens has a recorded verdict.

## 4. Consolidate

Deduplicate findings by root cause. Reject unsupported findings. Render one local review with `SHIP`, `FIX_BEFORE_SHIP`, or `REWORK`, plus coverage and residual risks. A later round reviews the new diff and confirms prior fixes.

Done when: the verdict is evidence-backed and no remote publication or commit occurred.
