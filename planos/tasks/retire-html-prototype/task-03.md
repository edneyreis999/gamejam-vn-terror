---
id: "03"
status: completed
depends_on: ["02"]
verification_ids: [V-004, V-005]
---

# Task 03 — Clean native annotations while proving game data preservation

## Outcome

Native provenance no longer directs readers to the retired directory, while all other authored data and all assets remain unchanged and the layout manifest is consistent.

## Authority

- [spec.md](spec.md), requirement IDs named below.
- [verification.md](verification.md), selected sensors, variants and exclusions.
- [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md).

## Shared execution boundaries

The approved [spec](spec.md), [verification](verification.md), [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md) govern this task. Preserve every existing MZ asset at its current path with identical bytes. No Chrome, browser driver, unfiltered test aggregate, directed gameplay, asset generator, publication or commit. Preserve unrelated work. Read applicable implementation skills when executing, not during this task-authoring delivery.

Evidence outputs below are proposed paths, not existing or completed evidence. Use a fresh run ID beneath `docs/qa/evidence/retire-html-prototype/`; do not overwrite prior results. Keep durable conclusions in the task notes, verification and the existing QA tree. Do not create a second memory tree.

## Scope

- Requirements: RQ-001, RQ-005, RQ-006 and approved peer-review F-001. Primary criteria V-004/V-005; pure unit scenario U-003.
- Existing native candidate: `rpg-maker/The Dryland Drowned/data/CommonEvents.json`, event 39 command 0, an explanatory source comment. Refresh inventory and expected original value before editing; do not assume a stale numeric location still owns it.
- Permitted change: individually identified explanatory source-annotation string values only. Protect functional comments, IDs, speakers, statuses, displayed text, all arrays and command fields.
- Existing tooling/tests: `rpg-maker/tools/revise-layout.mjs`, `native-layout.mjs`, `validate-content.mjs`, `tests/suites/persistence.mjs` UT-044/045/058, game package/start tool.
- Delete targets: none. No save mutation, migration, runtime/plugin change or MZ asset change.

## Checklist

- [x] Validate task 01's protected baseline and task 02's intervening changes. Record exact JSON locations and original/target values for permitted annotation edits before applying them.
- [x] Sanitize only those annotation values; keep semantic source identity and provisional status without dead-path navigation.
- [x] Compare the complete native data inventory and parsed JSON against the original baseline. Allow only the listed exact value changes; every other value and array position must match. Do not ignore all comments.
- [x] Recompare all MZ asset paths and hashes; record launch/package source equality.
- [x] When native file hashes change, assign one new unused revision through the existing revise-layout tool; record the manifest change separately. Do not bypass hashes or reuse a revision.
- [x] Run the content validator and inspect manifest consistency. No browser startup command is executed.
- [x] Refresh task 01's disposable workspace to the final native revision and execute existing pure persistence unit cases, or reuse equivalent selected-unit evidence only when unchanged inputs are demonstrated. Verify valid round trip, invalid/incompatible envelope rejection and terminal-state preservation.
- [x] Record V-004/V-005 results. Report native browser save handling, real storage and Continuar as not exercised; the user accepted their exclusion.

## Validation

Execution mode: one-time static semantic comparison, asset hashes, CLI validation and pure Node unit tests. Required variants: valid envelope, incompatible version, invalid envelope and preserved terminal state, as U-003 defines. Fixture/readiness owner: this task refreshes the isolated workspace and uses existing pure persistence fixtures; no game save or Chrome profile.

| Verification | Command/sensor | Expected result | Proposed evidence |
| --- | --- | --- | --- |
| V-004 | Complete parsed-data comparison with exact permitted edit list | Only named annotation values differ; same data files/order/content elsewhere | task-03/<run-id>/native-data-diff.json and allowed-edits.json |
| V-004 | All-asset paths/hashes and launch source comparison | No asset move/rename/byte change; launch configuration preserved | task-03/<run-id>/preservation.json |
| V-004/V-005 | `node rpg-maker/tools/validate-content.mjs --json` and manifest review | Exit 0 with ok true; new revision, if needed, consistently records current native files | task-03/<run-id>/validator.json and manifest-review.json |
| V-005 | Approved filtered unit command from verification.md; assess UT-044/045/058 | Pure envelope cases pass, without browser or native storage claim | task-03/<run-id>/unit-output.txt and selected-case results |

Any data/asset change after comparison invalidates the corresponding result. A refreshed manifest alone never proves preservation. Reuse prior unit evidence only for demonstrably equivalent dependencies; source-comment changes require explicit applicability analysis.

## Execution Notes

Completed on 2026-09-10. Evidence: `docs/qa/evidence/retire-html-prototype/task-03/20260910-01/`. All 50 native JSON files match the baseline except the exact event 39 annotation. All 1,326 assets match; only CommonEvents and the layout manifest changed within the game. Revision `mz-20260910-retirement-01` retains prior revision hashes. Validator passed; all 65 selected unit cases passed again, including UT-044/045/058. No browser, real storage, or Continuar replay was exercised.
