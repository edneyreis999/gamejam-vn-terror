---
id: "05"
status: completed
depends_on: ["04"]
verification_ids: []
---

# Task 05 — Plan the remaining static and unit evidence closure

## Outcome

A focused QA closure plan maps the approved non-browser sensors and remaining document acceptance, without creating new gameplay tests.

## Authority

- [spec.md](spec.md), requirement IDs named below.
- [verification.md](verification.md), selected sensors, variants and exclusions.
- [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md).

## Shared execution boundaries

The approved [spec](spec.md), [verification](verification.md), [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md) govern this task. Preserve every existing MZ asset at its current path with identical bytes. No Chrome, browser driver, unfiltered test aggregate, directed gameplay, asset generator, publication or commit. Preserve unrelated work. Read applicable implementation skills when executing, not during this task-authoring delivery.

Evidence outputs below are proposed paths, not existing or completed evidence. Use a fresh run ID beneath `docs/qa/evidence/retire-html-prototype/`; do not overwrite prior results. Keep durable conclusions in the task notes, verification and the existing QA tree. Do not create a second memory tree.

## Scope

- Activate `rpg-maker-mz-qa-report` and the canonical QA-tail planning phase. The user's explicit no-browser scope overrides generic playtest examples.
- Read verification.md, all task evidence/status, `docs/qa/README.md`, existing QA templates and current relevant reports/scenarios.
- Proposed durable output: `docs/qa/guides/retire-html-prototype-verification.md`; create/update only this focused plan and necessary index links. Existing browser journeys retain historical/other-increment scope.
- Primary V IDs: none; this task organizes coverage and does not take implementation criteria from tasks 02–04.
- Delete targets and game changes: none. No separate Trello QA card.

## Checklist

- [x] Confirm every implementation leaf is complete; task 04 is the single leaf and transitively includes tasks 01–03.
- [x] Activate the QA planning skill, mapping every requirement to its selected unit/static/document sensor. Mark browser, visual, audio, native saves and gameplay lots excluded by explicit user decision.
- [x] Write a focused plan using the existing QA schema where applicable; use N/A for persona tours, saves, maps and browser setup rather than inventing a playtest.
- [x] Define resumable closure lots: evidence freshness/coverage, required stale-unit or static rechecks, then final documentation acceptance. Each lot names entry inputs, expected results, variants, retained evidence, invalidation dependencies and completion checkpoint.
- [x] Keep U-001/U-002 owned by task 02 and U-003 by task 03. Reuse their results only with dependency equivalence. Do not require new full-suite or Chrome execution.
- [x] Identify remaining actual failures/gaps and their implementation owner. Use existing bug taxonomy for confirmed defects only; do not publish cards or create an unrelated backlog.
- [x] Leave unexecuted/final-human verdicts pending and hand off the plan to task 06. Any new documentation must obey task 04's current-reference policy.

## Validation

Execution mode: QA planning/documentation only. The ordered tail exists for coverage bookkeeping and final verification, not browser execution. Sources: selected sensors V-001–V-006, U-001–U-003 and their approved exclusions.

| Check | Expected result | Proposed evidence |
| --- | --- | --- |
| Coverage/ownership review | Six V IDs each retain one primary owner; no added runtime gate | docs/qa/guides/retire-html-prototype-verification.md |
| Resumable closure plan | Clear freshness, recheck and human-acceptance lots with no missing inputs | Same focused plan |

The plan must not rewrite historical QA outcomes or manufacture PASS for excluded cases. No test or runtime execution occurs in this planning task.

## Execution Notes

Completed 2026-09-10. Created docs/qa/guides/retire-html-prototype-verification.md with owner-attributed preservation, documentation and human-acceptance lots. It assigns U-001/U-002/U-003, isolated output retention, freshness rules and teardown. All browser sensors are explicitly excluded; no runtime planning or execution was added.
