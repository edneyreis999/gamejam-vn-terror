---
status: completed
approval_status: approved
slug: retire-html-prototype
---

# Tasks — One RPG Maker MZ game project

The spec and amended verification are approved. This task graph was authored and explicitly approved by the user on 2026-09-10 ("Aprovo"); execution is complete; the user accepted the final documentation on 2026-09-10 ("está aprovado"). The user authorized execution on 2026-09-10 ("Pode iniciar a execução"). Work stays local, with no Trello publication or scheduling change. Engineering responsibility follows the approved Programação contract; no creative work is assigned to other disciplines.

## Graph

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Capture protected baselines and a safe verification workspace](task-01.md) | — | — (readiness/planning only) | completed |
| 02 | [Make verification and tools independent and remove the retired tree](task-02.md) | 01 | V-001, V-003 | completed |
| 03 | [Clean native annotations while proving game data preservation](task-03.md) | 02 | V-004, V-005 | completed |
| 04 | [Make all documentation point to the current MZ project](task-04.md) | 03 | V-002 | completed |
| 05 | [Plan the remaining static and unit evidence closure](task-05.md) | 04 | — (readiness/planning only) | completed |
| 06 | [Close the approved evidence scope and obtain final document acceptance](task-06.md) | 05 | V-006 | completed |

Execute in order: 01 → 02 → 03 → 04 → 05 → 06. The serial graph avoids competing changes to shared provenance, test inputs, native metadata and final documentation. Task 04 is the only implementation leaf. Task 05 is QA planning; task 06 is QA execution/final verification, both restricted to the approved non-browser scope. These local closure tasks are not separate QA backlog cards.

## Coverage

| Verification ID | Primary owner task | Supporting readiness / final reuse |
| --- | --- | --- |
| V-001 | 02 | Task 01 baselines; task 06 freshness audit |
| V-002 | 04 | Task 01 inventory/archive; task 06 final generated-document recheck |
| V-003 | 02 | Task 01 isolated workspace; U-001/U-002 and negative fixtures owned by 02 |
| V-004 | 03 | Task 01 all-assets/all-data baseline; task 06 freshness audit |
| V-005 | 03 | U-003 and existing pure persistence fixtures; no browser/save replay |
| V-006 | 06 | Task 04 concrete documentation diff; user decision only after machine checks |

Each V ID has exactly one primary owner. Tasks 01 and 05 have independently checkable preparation/planning outcomes but do not duplicate acceptance ownership. Task 06 can coordinate necessary reruns without acquiring other tasks' criteria.

## Cross-task constraints

- Preserve every pre-existing MZ asset: img, audio, movies, icon, fonts, effects and any other discovered asset location. No move, rename, deletion, optimization, generation or byte change, including unused assets.
- Capture all native data JSON before implementation. Only individually identified explanatory annotation values may change; preserve every other value and array position. A regenerated manifest is not proof of unchanged data.
- Only browser-free unit tests and static/document checks. Re-audit selected test bodies/imports; exclude UT-059 and every browser IT. Never run the unfiltered aggregate or startup command that opens Chrome.
- Resolve IT-047's import-time dependency even though its browser execution is excluded. Keep useful browser assertions; place required structural proof in existing unit/content tests with independent expected results.
- Preserve historical raw evidence. The canonical unit helper writes historical-shaped output paths, so run it in a disposable repository view with isolated writable evidence, then retain this increment's output separately.
- Candidate matches in docs, hidden/ignored plans, generators and this task set need explicit disposition. Historical mention is allowed; instructions to inspect the retired directory are not.
- Evidence directories are proposed outputs under docs/qa/evidence/retire-html-prototype/<task>/<run-id>; durable plan/report paths are created by 05/06. Record actual paths without pretending artifacts already exist.
- Record only executed verification. Runtime remains unverified by explicit scope; final implemented-document acceptance remains separate from spec approval. No automatic commits or publication.

## Task authoring validation

Passed on 2026-09-10: six task files match graph IDs/dependencies/status; graph is acyclic; all six verification IDs have exactly one primary owner; the ordered QA tail, relative links, table columns and whitespace are valid. All execution checkboxes remain unchecked. No implementation tests, validator, browser or cleanup were run during authoring.

## Next Ready Task

None. Tasks 01–06 are complete; final document acceptance was received on 2026-09-10 ("está aprovado").

## Current handoff

Tasks 01–06 completed. V-001–V-006 passed within the approved static/unit/document scope; runtime verification remains excluded. Post-acceptance organization is recorded in verification.md and the delivery material. The user’s unrelated QA-skill/postmortem changes remain separate. No commit or publication.
