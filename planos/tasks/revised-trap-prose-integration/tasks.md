---
status: completed
slug: revised-trap-prose-integration
spec_approved_on: 2026-09-22
verification_revised_on: 2026-09-22
---

# Tasks — Revised trap prose integration

The user approved the design under D-004 and the reduced verification under D-005/D-006. [ADR-003](adrs/adr-003-proportionate-prose-verification.md) replaces the original test plan. Implementation, static checks, scoped visual inspection, independent review and final verification are complete on 2026-09-22. [Verification](verification.md) owns the required evidence and delivery flags.

## Active graph

| ID | Task | Depends on | Verification ownership | Status |
| --- | --- | --- | --- | --- |
| 01 | [Integrate encounter prose and check the authored data](task-01.md) | — | V-001/ENC | completed |
| 02 | [Integrate death prose and check the authored data](task-02.md) | 01 | V-001/DEATH | completed |
| 05 | [Inspect text fit at 1280×720 and close verification](task-05.md) | 01, 02 | V-003/FIT-CHOICES, V-003/FIT-PROSE, V-004 | completed |

Task 02 reuses the source-comparison groundwork from 01. Task 05 checks the integrated candidate visually once, retaining valid static results. There is no separate QA planning task or engine/E2E test gate.

## Superseded tasks

| ID | Disposition under D-005 | Retained responsibility |
| --- | --- | --- |
| [03](task-03.md) | Controls/Continue testing removed | Static preservation moved to 01 for maps and 02 for Common Events; 05 consolidates results |
| [04](task-04.md) | Separate QA planning removed | Visual checklist and save preparation included in 05; no guide/charter/campaign report required |

These files preserve the transfer record, not completed execution. Active dependencies do not pass through them. The original five-task graph is historical under ADR-003.

## Execution rules

- Preserve native content ownership, engine/plugins, rules, assets and save policy. The frozen source plus B1's approved exception remains the independent text oracle.
- Check correspondence and event structure without launching the engine. Inspect rendered appearance only at 1280×720: all 48 choice labels and risk-selected narrative boxes.
- No mandatory unit/domain rerun, engine integration, E2E campaign, controls/Continue matrix, second resolution, new fixture suite or full-suite run. Existing tests remain; update an obsolete copy expectation or box-count assumption narrowly if exposed, without removing assertions, adding skips or expanding coverage.
- Produce saves needed for visual navigation during this spec's own tests, through normal player inputs on the candidate. No external/preexisting saves, edited saves or injected state. Reuse only this run's compatible saves; loading is navigation, not persistence verification.
- Record concise results in the owning tasks and verification matrix; selected captures go under `docs/qa/evidence/revised-trap-prose-integration/task-05/`. The scoped visual PASS and sampling limits are recorded in task 05.
- Read [local-game-run.md](../../../docs/_memory/local-game-run.md) before launching/reusing the server. Inventory and close only agent-started resources, including on failure.
- Record scope-changing code/layout defects and select only affected proof; do not silently broaden this prose-only delivery. No commits, publishing or Trello operations are part of this graph. Preserve the devlog moment when real captures are available.

## Next Ready Task

None. Tasks 01/02/05 completed; 03/04 remain superseded (not executed). Independent review: [SHIP](review-02.md). Final verdict: [PASS, scoped release ready](verification.md#release-verdict). No staging, commit or publication.
