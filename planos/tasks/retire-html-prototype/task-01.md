---
id: "01"
status: completed
depends_on: []
verification_ids: []
---

# Task 01 — Capture protected baselines and a safe verification workspace

## Outcome

A complete pre-edit baseline and isolated unit-test workspace make later preservation checks possible without overwriting historical evidence.

## Authority

- [spec.md](spec.md), requirement IDs named below.
- [verification.md](verification.md), selected sensors, variants and exclusions.
- [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md).

## Shared execution boundaries

The approved [spec](spec.md), [verification](verification.md), [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md) govern this task. Preserve every existing MZ asset at its current path with identical bytes. No Chrome, browser driver, unfiltered test aggregate, directed gameplay, asset generator, publication or commit. Preserve unrelated work. Read applicable implementation skills when executing, not during this task-authoring delivery.

Evidence outputs below are proposed paths, not existing or completed evidence. Use a fresh run ID beneath `docs/qa/evidence/retire-html-prototype/`; do not overwrite prior results. Keep durable conclusions in the task notes, verification and the existing QA tree. Do not create a second memory tree.

## Scope

- Requirements: RQ-003, RQ-004, RQ-005, RQ-006; preparation supporting V-001–V-005, without claiming those final criteria.
- Read `AGENTS.md`, the canonical GDD authority/MZ sections and `docs/_memory/` directives; preserve the user-approved exceptions.
- Existing sources: all `rpg-maker/The Dryland Drowned/data/` JSON and asset directories; `native-layout-manifest.json`; `rpg-maker/tests/helpers/canonical-cases.mjs`; current working-tree status and ignored historical docs.
- Asset directories observed: `img/`, `audio/`, `movies/`, `icon/`, `fonts/`, `effects/`. Discover any additional asset locations; no unused-asset pruning.
- Delete targets: none. No native/game/test implementation change in this task.

## Checklist

- [x] Record the dirty-file inventory, repository revision and hashes; separate existing user changes from this increment.
- [x] Capture the complete native data file list, original bytes/parsed JSON and hashes before any edits. Preserve all JSON, not only the subset returned by `nativeFiles()`.
- [x] Capture paths and SHA-256 for all pre-existing assets. `localAssets()` lists only img/audio and does not hash bytes; it is not sufficient for this acceptance baseline.
- [x] Capture the layout manifest and current revision, launch source/package configuration, and the provenance needed to retain attribution when the retired tree is removed.
- [x] Inventory live consumers, documentation and ignored migration scripts; classify them without running old generators. Preserve ignored documents outside the repository before later sanitation, recording the archive location and hashes; retain that archive after teardown and honor filesystem permissions.
- [x] Prepare a disposable workspace reflecting the current working files, including uncommitted test changes when refreshed. Keep its rpg-maker tree readable and its evidence output local to the disposable workspace; never include the retired runtime as an input.
- [x] Verify the helper's historical output paths resolve inside this isolated workspace. The existing helper writes to docs/qa/evidence/init-rpg-maker-mz; copy new outputs to this increment's unique run directory with truthful paths/hashes, without touching original historical evidence.
- [x] Record baseline completeness and restoration/readability checks. Do not execute tests yet if the old module-load dependency remains unresolved.

## Validation

Execution mode: filesystem/source inspection only. Fixture/readiness owner: this task prepares the immutable baseline and disposable unit workspace for tasks 02/03; refresh the workspace from changed working files before later runs. Never refresh the pre-edit baseline after an implementation edit.

| Check | Expected result | Proposed evidence |
| --- | --- | --- |
| Baseline inventory and readback | All native data and assets captured; original hashes verified | task-01/<run-id>/baseline-manifest.json and native-data/ |
| Consumer/source inspection | Every discovered live dependency has a destination task; no old generator executed | task-01/<run-id>/consumer-inventory.json |
| Isolated evidence path inspection | Canonical helper cannot overwrite the repository's historical outputs | task-01/<run-id>/workspace-readiness.json |

If any protected file changes outside this work after capture, stop and reconcile its provenance before using the baseline; never overwrite someone else's changes to make a comparison pass.

## Execution Notes

Completed 2026-09-10. Baseline/readback: 50 native JSON files, 1326 assets in ['css', 'img', 'audio', 'movies', 'icon', 'fonts', 'effects']; 955 original text/provenance files archived and hash-checked. Evidence: `docs/qa/evidence/retire-html-prototype/task-01/20260910-01/baseline-manifest.json`, `consumer-inventory.json`, `workspace-readiness.json`. Archive retained outside repository: `/private/tmp/coreto-retirement-originals-9oigrt75`. Disposable copied unit workspace: `/private/tmp/coreto-retirement-unit-8ia0m0mr`; retired runtime absent and historical-shaped evidence paths isolated. No tests, native edits or browser execution. Initial unrelated Git changes recorded in initial-git-status.txt; preserve them. Task 02 resolves import-time dependency before first unit run.
