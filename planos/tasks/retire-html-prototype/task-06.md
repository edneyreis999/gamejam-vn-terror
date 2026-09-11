---
id: "06"
status: completed
depends_on: ["05"]
verification_ids: [V-006]
---

# Task 06 — Close the approved evidence scope and obtain final document acceptance

## Outcome

The final report states precisely which static/unit criteria passed and records final document acceptance, while runtime verification stays explicitly unperformed.

## Authority

- [spec.md](spec.md), requirement IDs named below.
- [verification.md](verification.md), selected sensors, variants and exclusions.
- [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md).

## Shared execution boundaries

The approved [spec](spec.md), [verification](verification.md), [Programação contract](retire-html-prototype.programacao.md) and [ADR-001](adrs/adr-001.md) govern this task. Preserve every existing MZ asset at its current path with identical bytes. No Chrome, browser driver, unfiltered test aggregate, directed gameplay, asset generator, publication or commit. Preserve unrelated work. Read applicable implementation skills when executing, not during this task-authoring delivery.

Evidence outputs below are proposed paths, not existing or completed evidence. Use a fresh run ID beneath `docs/qa/evidence/retire-html-prototype/`; do not overwrite prior results. Keep durable conclusions in the task notes, verification and the existing QA tree. Do not create a second memory tree.

## Scope

- Activate `rpg-maker-mz-qa-execution` for its non-browser sensor path, followed by `rpg-maker-mz-final-verify`. Do not load or launch browser execution machinery.
- Authority: verification.md and the plan from task 05. Primary criterion V-006. V-001/V-003 remain owned by task 02, V-004/V-005 by task 03, V-002 by task 04.
- Proposed durable output: `docs/qa/reports/<execution-date>-retire-html-prototype.md`, using the actual execution date and existing report schema adapted to the approved static/unit scope.
- Sources: all original baselines, comparisons, selected test outputs, fingerprints, excluded IDs and final documentation diff.
- Delete targets/game changes: none in this closure task; route actual implementation fixes to their existing owner and rerun only invalidated sensors.

## Checklist

- [x] Read the task 05 plan and activate QA execution's non-browser path; verify required sensor inputs and selected modes before any command.
- [x] Lot A: audit completeness and hashes for V-001–V-005 against final working files. Preserve original evidence and mark changed inputs stale instead of relabeling old results.
- [x] Lot B: request/execute only necessary owner-attributed refreshes for stale static or selected-unit evidence, in the isolated workspace. Never run IT-047, UT-059, the unfiltered aggregate, Chrome or directed gameplay.
- [x] Finalize reports/task notes and refresh the reference/link review after generated documentation, so closure itself leaves no stale navigation.
- [x] Lot C: present the completed documentation diff to the user for V-006. Record their explicit final decision/date; previous spec approval is not acceptance of implemented documentation. Complete all machine-verifiable work before this final human step.
- [x] Invoke final verification against the amended scope. Update implemented/static_verified/human_accepted/release_ready only when their required evidence exists; keep runtime_verified false and report its user-approved exclusion.
- [x] Record actual commands, versions, selected IDs, exit status, evidence paths, hash-equivalence reasoning, remaining failures and unverified runtime surfaces. No creative reapproval or browser screenshots.
- [x] Preserve this increment's fresh outputs and original archive; clean up only disposable resources created for unit/static checks. Update tasks.md and verification.md honestly. No commit, push, Trello publication or automatic history reorganization.

## Validation

Execution mode/reference: task 05 closure lots; verification.md V-006 and approved non-browser boundary. Required unit variants remain U-001/U-002/U-003; no S-001/S-002/S-003 or browser equivalents. Fixtures: reuse task 01's isolated unit workspace only for necessary rechecks, with final source hashes. No game/profile/save setup.

| Verification | Sensor | Expected result | Proposed evidence |
| --- | --- | --- | --- |
| V-006 | User review of final entry-point docs and diff | User confirms MZ location and truthful historical scope | Final report decision/date and verification.md |
| Existing owners V-001–V-005 | Evidence freshness audit; only necessary selected-unit/static refresh | Required results remain applicable to final files; no missing owner or false pass | task-06/<run-id>/freshness-review.json and owner-linked rerun records |
| Final verdict | rpg-maker-mz-final-verify under approved scope | PASS only for required static/unit/document criteria; runtime remains not performed | verification.md and final QA report |

Do not stop at a request for human acceptance while machine-verifiable work remains. If the user has not accepted V-006, leave that criterion pending and report exactly that remaining gate. Excluded Chrome evidence alone is never a blocker.

## Execution Notes before final acceptance

Machine verification completed on 2026-09-10. Final preservation checks and unit dependency equivalence are in task-06/20260910-01. All 65 selected unit outputs were retained from the final native revision. No browser was launched. Independent implementation and documentation reviews closed their findings; see implementation-review.md. Final report: docs/qa/reports/2026-09-10-retire-html-prototype.md. V-006 remains pending until the user accepts the implemented documentation. No commit or publication occurred.

Owned unit workspace removed after retaining all 65 case records and input-equivalence evidence. External originals retained. Final verification verdict: BLOCKED only on V-006 human document acceptance; all machine-verifiable work is complete. Runtime remains explicitly excluded.

Follow-up review on 2026-09-10 corrected stale progress text in tasks.md and the Programação contract. Run `task-06/20260910-02/freshness-review.json` confirms all 42 recorded unit inputs still match, all 1,326 asset hashes match, and all 50 native JSON files preserve every value except the authorized source annotation at `CommonEvents.json/39/list/0/parameters/0`. The other files in the previous 326-path review scope remain equivalent, including recorded deletions. The content validator passed again with Node v26.7.0, exit 0; output is `task-06/20260910-02/validator.json`. The 65 unit passes remain the earlier Node v22.23.2 execution, not a new run. The user's instruction to follow the recommendations authorizes this review; V-006 still requires acceptance of the final documents. No browser, staging, commit or publication was performed.

## Final acceptance and organization — 2026-09-10

The user accepted the presented final documentation with "está aprovado". V-006 passed; the final verdict is PASS for the approved static/unit/document scope. Runtime remains unverified by explicit exclusion. The accepted document hashes are in `docs/qa/deliveries/retire-html-prototype/human-acceptance.json`. Post-acceptance organization preserved and hash-verified 2,128 archive files (58,876,755 bytes), retaining raw evidence outside the candidate versioned set. The archive, dispositions and final checks are recorded in verification.md and the delivery organization record. No commit or publication was performed.
