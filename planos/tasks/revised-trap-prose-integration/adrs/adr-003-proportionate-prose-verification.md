# ADR-003 — Verification proportional to the prose integration

- **Status:** accepted on 2026-09-22, by the user's D-005/D-006 instructions.
- **Scope:** verification and task organization for `revised-trap-prose-integration`; no change to gameplay, accepted prose or engine/plugin contracts.
- **Authority:** [spec decisions](../spec.md#open-decisions-and-approval), [current verification](../verification.md), [general ADR-G006](../../../../docs/adrs/adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md).

## Context: why the first plan was broad

The integration changes sixteen descriptions, 48 choice labels, twenty success bodies and sixteen death paragraphs. Longer text needs additional native message boxes; labels exist in three separate consumers (`102`, `402` and picture text). Although rules and plugins remain unchanged, editing event lists can accidentally move a completion command, misassociate an approach, put death narration before selection or leave the visible label stale.

The first plan treated those potential effects as reasons to requalify the surrounding lifecycle. It required static correspondence, an exhaustive native encounter/death matrix, controls and checkpoint tests, all changed text renders at 1280×720 plus selected 1920×1080 repeats, and directed player journeys. Tasks 01/02 combined implementation with native/rendered proof, 03 qualified controls/Continue, 04 planned a QA cycle and 05 executed resumable lots for reading, sacrifice and Continue across two files.

That plan applied the general preference for real integration and representative E2E evidence conservatively. Additional boxes motivated first/middle/final acknowledgement checks; serialized event lists motivated Continue checks; revised labels motivated focus/input checks. The larger viewport was a secondary desktop presentation reference, not a new resolution requirement caused by these text edits.

These were plausible failure paths, but the plan gave too much weight to surrounding systems. It expanded a bounded content edit into repeated qualification of mechanisms whose implementation is preserved. The [completed narrative baseline](../../approved-narrative-dialogue-staging/verification.md) already records controls (V-005) and Continue/file isolation (V-007) as PASS. Repeating them adds navigation, fixture maintenance, browser execution, captures and documentation with limited information about the changed prose itself.

## User decision and revised rationale

The user requested keeping the small set of checks most likely to find implementation errors, explicitly rejecting engine integration, repeated keyboard/mouse and Continue tests, and the second resolution. The proposed static-plus-visual scope was subsequently approved with “pode atualizar as tasks de testes dessa spec”. This is D-005: an explicit scope reduction, not a claim that the original tests passed or that every old sensor has an equivalent replacement.

The likely errors are missing/wrong text, stale labels, incorrect associations, accidental event-command edits and text overflow. Full static comparison is cheap enough to retain across the catalogue. Event structure can be compared directly without replaying every branch. Actual rendering is still needed to detect clipping and overlap; source equality cannot show whether words fit on screen.

The new plan therefore keeps exhaustive checks for content/structure, every choice label visually, and a risk-selected sample of narrative boxes in the unchanged layout. It removes checks of unrelated behavior. This concentrates quality assessment on the actual edit rather than maximizing the number of tests.

## Decision: retained and removed checks

| Area | Current decision | Reason |
| --- | --- | --- |
| S-01 content | Keep all sixteen descriptions, 48 labels, 48 successes, sixteen deaths/B1 exception and preservation of 48 failures | Unique words and associations can be checked exhaustively without runtime navigation |
| S-01 structure | Keep parsed JSON and scoped before/after event comparison, including all label consumers and reading boundaries | Detect accidental command/binding edits where they are authored |
| S-02 engine integration | Waive encounter/death matrices, branch execution and victim variants | No new domain or engine integration behavior is proposed |
| S-03 E2E/controls | Waive journey lots, route-family and reduced-party requirements, HIDE/Options/FAST, keyboard/mouse, focus and motion matrices | The edit preserves these mechanisms; historical validation is not rerun as a content-import gate |
| S-04 Continue | Waive checkpoint, close/reopen and two-file correctness tests | No persistence implementation or save policy changes; save use is navigation only |
| S-05 rendering | Keep all sixteen choice screens / 48 labels and risk-selected description/success/death boxes at 1280×720 | Detect string-specific fit and risky box splits in the actual target presentation |
| S-05 repetitions | Remove 1920×1080, exhaustive narrative-box viewing and repeated controls/motion captures | No responsive layout change; shared narrative format permits explicitly limited sampling |
| Test/document overhead | No required suite expansion, new fixtures, full-suite run, QA guide/charter or separate campaign report | Tasks plus the verification matrix and selected images are enough to execute and review this change |

Existing test code is retained. An obsolete text expectation or fixed box count may be maintained narrowly when exposed; do not suppress assertions or delete useful tests to make the reduced plan look complete. Pure/domain tests are not a required rerun merely because they appeared in the original filters.

Task 01 owns encounter copy/structure. Task 02 owns death copy/structure and the integrated changed-file check. Task 05 owns visual fit and final evidence reconciliation. Tasks 03/04 are superseded records; they are neither pending execution nor completed tests. The active graph is 01 → 02 → 05, with 05 depending on both content tasks.

## Independent save preparation — D-006

The user clarified: “durante os testes você vai criar os seus próprios saves e usa-los” and “uma spec nunca deve depender de saves externos”. A later instruction approved updating the tasks with that correction.

Each spec must be able to begin testing without a user-provided, preexisting or another spec's save. For this visual pass, start a new campaign on the integrated candidate, produce the needed saves through normal player inputs and the existing native save mechanism, then reuse them to revisit text. Resuming the same test run may reuse its own saves with recorded candidate/file/entry provenance. This project directive is also recorded in [SD-015](../../../../docs/_memory/standing_directives.md#sd-015--self-produced-test-saves).

Prefer entries before the reading under inspection. After relevant event-list changes, recreate affected saves rather than trusting old serialized text. No seed/state/save editing, imported campaigns or hidden QA controls. Save/load remains a tool for reaching the visual observation; it does not add a persistence test matrix or require a save per trap.

## Limits, quality and cost

The new plan preserves full content/association checks and observes the primary visual risk. It does not promise identical detection power to the larger suite. Narrative sampling can miss an unviewed overflow; static command preservation cannot prove timing, runtime input behavior or save restoration. Those are explicit accepted limits of this text-only delivery, not PASS results.

Select narrative boxes by actual width, line count, control codes and split placement, including description, success and death plus distinct risky formatting. A clipping defect expands inspection only to affected formats/near-limit siblings. If implementation must alter plugins, layout, bindings, domain calls or checkpoint ownership, or a real lifecycle/save defect appears, reconsider that specific risk and its smallest relevant check. Do not silently broaden implementation or automatically restore the entire original test plan.

Fewer runtime setups, branch walks, duplicate captures and planning documents should reduce execution time and agent token use. No before/after timing or token benchmark has been run; “20%/80%” is a prioritization heuristic, not a measured guarantee. Quality is judged by defects the retained checks can reveal in the proposed implementation, not by a test-count target.

## Supersession and evidence status

D-005 supersedes the original sensor selection in this spec, its verification/discipline contracts and tasks 01–05. It is a **local explicit exception** to ADR-G006's representative E2E requirement; ordinary reorganization authority alone would not waive that gate. ADR-G006's resource teardown, truthful evidence and risk reassessment still apply. Other specs do not inherit this E2E waiver; the user separately stated D-006's no-external-save rule for specs generally.

The [canonical GDD](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#121-estados-de-conteúdo), ADR-G006 and its index link back to this scoped decision. Completed specs, their approvals and historical reports remain intact. Current waived partitions are recorded as WAIVED; active implementation/static/visual results remain pending. This ADR records an approved plan change, not executed tests, measured savings or runtime readiness.
