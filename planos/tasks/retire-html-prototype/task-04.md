---
id: "04"
status: completed
depends_on: ["03"]
verification_ids: [V-002]
---

# Task 04 — Make all documentation point to the current MZ project

## Outcome

Current and historical project documents preserve truthful history without directing agents to the retired implementation.

## Authority

- [spec.md](spec.md), requirement IDs named below.
- [verification.md](verification.md), selected sensors, variants and exclusions.
- [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md).

## Shared execution boundaries

The approved [spec](spec.md), [verification](verification.md), [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md) govern this task. Preserve every existing MZ asset at its current path with identical bytes. No Chrome, browser driver, unfiltered test aggregate, directed gameplay, asset generator, publication or commit. Preserve unrelated work. Read applicable implementation skills when executing, not during this task-authoring delivery.

Evidence outputs below are proposed paths, not existing or completed evidence. Use a fresh run ID beneath `docs/qa/evidence/retire-html-prototype/`; do not overwrite prior results. Keep durable conclusions in the task notes, verification and the existing QA tree. Do not create a second memory tree.

## Scope

- Requirements: RQ-002/RQ-003/RQ-005. Primary criterion V-002.
- Entry points: `AGENTS.md`, `CLAUDE.md`, canonical GDD, `docs/_memory/`, `rpg-maker/README.md`, `docs/qa/README.md`.
- Further surfaces: `rpg-maker/asset-provenance/`, `pitch/`, `docs/design/`, QA guides/reports/journeys/scenarios/charters, `planos/`, `.compozy/tasks/`, hidden instructions and all matches from task 01.
- Include this active spec set, review documents and newly created tasks in the final navigation audit. Fingerprints and original verdicts remain truthful; distinguish recorded historical hashes from current documents.
- Delete targets: only inventoried obsolete documentation/example files whose consumers are fixed together. Do not delete raw historical evidence or MZ assets. Native-data changes belong to task 03.

## Checklist

- [x] Confirm ignored document originals are preserved outside the repository before sanitation, with hashes and recorded location.
- [x] Replace stale direct-file/session-only/no-audio guidance with already approved MZ contracts. State the exact game, design-authority, tool and test paths positively.
- [x] Remove links, examples, commands and prose directing agents to inspect or recover the retired implementation. Preserve dates, observed results, accepted/provisional states and non-navigational historical mentions.
- [x] Retain attribution, license and provenance facts without a deleted source-path dependency. Never relabel historical HTML observations as MZ evidence.
- [x] Review all text-bearing formats and hidden/ignored docs, constructed/encoded paths, backslashes and relative links. Use verification.md candidate searches as a starting point, not the whole oracle.
- [x] Sanitize obsolete deletion-path literals in this spec/task/review set into completed-retirement wording after removal; retain IDs, dependencies, acceptance and history. Preserve original input fingerprint records as historical records, not claims of current hashes. Keep technical references needed for remaining work valid.
- [x] Fix introduced broken links and record disposition for each candidate: sanitized, removed consumer, valid historical/non-directory term or immutable raw telemetry. No blanket exception for old documentation.
- [x] Record V-002 result and prepare the concrete final documentation diff for task 06's V-006 user acceptance. Do not mark V-006 accepted yourself.

## Validation

Execution mode: static search plus editorial/link review. Fixtures/saves/maps: not applicable; no runtime input. Reuse task 01's inventory and archive, tasks 02/03's verified current paths and provenance. Refresh matches after all edits.

| Verification | Command/sensor | Expected result | Proposed evidence |
| --- | --- | --- | --- |
| V-002 | Candidate and semantic searches declared in verification.md, followed by manual classification | No unresolved navigational references, including in hidden docs and this spec set | task-04/<run-id>/reference-dispositions.json |
| V-002 | Relative-link and source-truth review | No introduced broken links or false historical attribution | task-04/<run-id>/document-review.md |
| V-002 | `git diff --check` plus explicit checks for new/ignored files | Clean edited document structure and whitespace | task-04/<run-id>/document-checks.txt |

Later QA-report/task-note edits can introduce new references; task 06 must request/perform a final refresh attributed to this V-002 owner. Metadata in raw evidence is not current guidance. Do not change evidence results to make a scan clean.

## Execution Notes

Completed 2026-09-10. Current guidance points exclusively to the MZ project. Historical documents and metadata were sanitized with externally retained originals. Independent review found three residual semantic instructions; all were corrected and independently confirmed closed. Reference dispositions, link review and remaining raw/API classifications are in task-04/20260910-01. V-002 passed; V-006 remains the user decision.
