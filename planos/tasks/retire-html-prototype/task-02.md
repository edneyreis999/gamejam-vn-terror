---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: [V-001, V-003]
---

# Task 02 — Make verification and tools independent and remove the retired tree

## Outcome

The retired root is absent and the selected unit tests and surviving tools no longer depend on or recreate it.

## Authority

- [spec.md](spec.md), requirement IDs named below.
- [verification.md](verification.md), selected sensors, variants and exclusions.
- [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md).

## Shared execution boundaries

The approved [spec](spec.md), [verification](verification.md), [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md) govern this task. Preserve every existing MZ asset at its current path with identical bytes. No Chrome, browser driver, unfiltered test aggregate, directed gameplay, asset generator, publication or commit. Preserve unrelated work. Read applicable implementation skills when executing, not during this task-authoring delivery.

Evidence outputs below are proposed paths, not existing or completed evidence. Use a fresh run ID beneath `docs/qa/evidence/retire-html-prototype/`; do not overwrite prior results. Keep durable conclusions in the task notes, verification and the existing QA tree. Do not create a second memory tree.

## Scope

- Requirements: RQ-001, RQ-004, RQ-005. Primary criteria: V-001 and V-003; unit scenarios U-001/U-002.
- Existing canonical tests: `rpg-maker/tests/suites/native-inventory.mjs`, `suites/content.mjs`, `tests/fixtures/boundary-recipes.json`, `tests/test-manifest.json`, `tests/campaign.test.mjs` and shared helpers.
- Existing tool consumers: `docs/design/opendesign/prototype-v2-gdd-layouts/` artboards and prepare/verify/capture tools; ignored one-off migration scripts beneath `.compozy/tasks/init-rpg-maker-mz/analysis/`; refresh the full inventory from task 01.
- Delete targets: complete root `retired HTML artifact`, plus individually inventoried obsolete migration/recreation tools and obsolete example consumers. No MZ asset file is a delete target.
- Provenance/docs: retain truthful source facts before deleting their sole source; task 04 owns final prose sanitation. If an example survives, resolve an equivalent existing local asset without changing its bytes or path.

## Checklist

- [x] Record IT-047's actual import-time file reads and map each historical assertion to an existing current MZ/GDD obligation or an explicitly superseded migration-only assertion.
- [x] Remove historical runtime execution from module initialization. Preserve useful IT-047 browser assertions, while leaving browser execution outside this increment.
- [x] Put required structural checks into the existing content/parser unit suite, reusing current cases such as UT-047/048/052/054/057/060 where applicable. Use finite reviewed independent oracles; do not compute expectations from actual native prose at test time or duplicate an editable runtime catalog.
- [x] Map passage identities/content, scene sequence, hero material, 16 three-approach passages and both lover orders. Do not replace them with count-only assertions or copy the old runtime under a new name.
- [x] Prepare disposable negative inputs for missing required passage, wrong required order and missing branch; demonstrate each fails at its intended assertion, then restore the valid inputs.
- [x] Retire or adapt all inventoried read/recreation tools; never rerun migration generation over current native authoring. Preserve example assets in MZ untouched.
- [x] Resolve uniqueness/unrelated-file concerns from task 01, then remove the retired root completely. No symlink, renamed fallback, served alternative or recreated tree.
- [x] Re-audit selected unit bodies and imports, explicitly excluding every IT and UT-059. Execute the approved filtered unit command in the refreshed disposable workspace with the retired tree absent.
- [x] Compare MZ asset paths/hashes against task 01. Record V-001/V-003 evidence and remaining documentary matches for task 04. Do not run the unfiltered suite.

## Validation

Execution mode: browser-free Node units and static inspection, per V-001/V-003 and U-001/U-002. Fixture owner: this task owns oracle review, assertion mapping and negative inputs; reuse task 01's isolated workspace, refreshing test files from the current working tree.

| Verification | Command/sensor | Expected result | Proposed evidence |
| --- | --- | --- | --- |
| V-001 | Filesystem existence/symlink check, consumer inspection, asset hash comparison | Retired root absent, no live read/recreator/fallback, existing assets unchanged | task-02/<run-id>/retirement-check.json |
| V-003 | `node --test --test-name-pattern='^UT-(?!059)[0-9]{3}' rpg-maker/tests/campaign.test.mjs` | Selected units pass without retired inputs or a browser process | task-02/<run-id>/unit-output.txt and selected-case results |
| V-003 | Negative unit fixtures and oracle review | Three specified faults fail for their intended reasons; reviewed content obligations preserved | task-02/<run-id>/oracle-mapping.md and negative-results/ |

The command runs from the disposable repository view's root. Excluded cases are not passes. Record actual Node version, selected IDs, command/exit, source hashes and fixture hashes. Later test/oracle/native-data changes invalidate affected assertions; task 06 requests scoped refresh from this owner rather than claiming old evidence is fresh.

## Execution Notes

At task authoring, implementation had not started and no test results were claimed. The completed execution follows.

Completed 2026-09-10: removed 65 retired root files and 28 obsolete executable tools; retained 35 image references using 19 byte-identical assets and 16 historically converted PNG counterparts. All 1,326 MZ assets unchanged. Native content assertions moved to shared test helper and existing unit cases; selected 65 units pass in the isolated workspace without Chrome. Evidence: docs/qa/evidence/retire-html-prototype/task-02/20260910-01/ (retirement-check.json, unit-output.txt, unit-run.json, oracle-mapping.md, negative logs). Documentary references remain assigned to task 04.

Correction: initial text matching incorrectly included 19 historical MZ plugin snapshots because of JavaScript prototype property names. Their exact archived bytes were restored; task-02/20260910-02/tool-disposition-correction.json supersedes the initial tool count. Independent review confirmed restoration and absence of the 28 actual obsolete tools.
