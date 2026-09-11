---
id: "09"
status: blocked
depends_on: ["08"]
verification_ids: [V-004, V-007]
---

# Task 09 — Execute QA, repair defects and complete final verification

## Outcome

The entire approved increment has fresh technical, directed gameplay and inspected visual evidence. In-scope defects are repaired, the current candidate receives deep review and final verification, and all tasks close without a human approval gate. Missing required evidence remains an honest technical gap.

## Authority

- [Spec](spec.md), [verification](verification.md), [Programação](vn-picture-busts-dialogues.programacao.md), [UI/UX](vn-picture-busts-dialogues.uiux.md), [Technical Art](vn-picture-busts-dialogues.technical-art.md) and [ADR-003](adrs/adr-003.md).
- Task 08's incremental guide/charter and existing QA scenario owners; [shared execution contract](tasks.md).
- Activate `rpg-maker-mz-qa-execution` for directed work, `rpg-maker-mz-deep-review` for the full current diff, then `deslop` and `rpg-maker-mz-final-verify`. Follow installed skill procedures with ADR-003's no-approval policy.

## Scope

- Primary acceptance: V-004 eligible participants/story invariants and V-007 complete visual inspection. Consolidate freshness of V-001/002/003/005/006/008/009 through their original primary owners; do not duplicate ownership.
- Runtime scenarios: execute all remaining lots from task 08, covering D-01–D-10. Reuse only evidence whose relevant inputs and required observables match the current source.
- QA reports: create a dated report under `docs/qa/reports/` for this increment, update current scenario outcomes/bugs and verification.md. Use a unique run directory under `docs/qa/evidence/vn-picture-busts-dialogues/task-09/`.
- Delivery/review: record frozen candidate accounting and deep-review findings in this spec's execution notes/verification, with detailed evidence in the run directory. Preserve selected editor/game/Council/2x2 captures under `docs/qa/deliveries/vn-picture-busts-dialogues/` when actually produced; no public release or final-art promotion.
- Fixture/readiness owner: prepare fresh isolated directed copies using the existing adapter; record exact hashes, legal initial state, modes and each retained run. Return missing behavior/fixture preparation to its original implementation owner.
- Delete targets: only temporary copies/profiles/processes created by this execution, after required evidence preservation. No user saves, historical evidence, source assets or unrelated work removed.

## Checklist

- [x] Freeze the actual working-tree candidate, including untracked implementation/spec files, native revision, plugins/asset hashes and relevant QA inputs. Separate unrelated changes; do not infer a clean candidate from Git HEAD alone.
- [x] Execute dependency-ready QA lots using the installed directed executor and legal input. Preserve first failures and every raw run; an executor exit 0 or executed-awaiting-review is not a final visual PASS.
- [x] During the first legal producer campaigns, capture the native Council/pre-ending save and matching persisted index before choosing a final outcome, under ADR-005. Keep immutable masters with hashes/provenance outside disposable browser profiles; use task 05's verified pre-boot restore to run isolated branches through Continue. Reuse terminal saves where appropriate. Do not invent an arbitrary final-choice checkpoint or edit saved facts. Link each resumed run to its producer and measure prefix/restore/suffix wall time separately.
- [x] Complete V-004's variants: all eight tavern heroes/four families, all eligible farewell/opinion/epilogue heroes, both discovery orders and final choices, Council 0/1/2/3 heroes, Andirá hide/return, solo/terminal/excluded-scene boundaries. Prove campaign facts remain unchanged by presentation.
- [x] Inspect V-007's complete still/temporal matrix at minimum and larger game areas, normal/reduced motion and maximal layouts. Verify identity, text/name legibility, orientation, fixed slots, reflection/prisons, focus and no intrusive flash. Record actual observations and visual-review artifacts. Inspection completed; V-007 visibly fails the prison subcriterion, so this checked action is not sensor acceptance.
- [ ] **V-008 remains BLOCKED:** Reuse current 2x2/interruption evidence for its assigned claims and task 07's brief editor editability check under ADR-004. Do not open the editor for each QA lot, save/reopen/export cycle or 2x2 playtest. Label integration fixture versus legal campaign proof; no sample conversation replaces complete coverage.
- [x] For each confirmed defect, update its existing local bug identity or create one in the owning discipline, reopen the responsible implementation task, fix in scope and rerun affected tests/lots. Continue independent lots; missing approval never blocks progress.
- [x] Run the final content CLI and registered suite in the isolated current-tree test copy: `node --test rpg-maker/tests/*.test.mjs`. Retain exact commands/versions/exits; analyze changed dependencies before repeating other checks.
- [x] Deep-review every changed candidate surface against the current contracts: native grammar/vendor caller context, interpreter/root-helper lifecycle, saved projections, picture disposal, input, assets and truthful tests/evidence. Resolve confirmed findings and repeat affected review until SHIP or a concrete technical blocker is recorded.
- [x] Apply deslop, rerun checks invalidated by any cleanup, and perform final candidate/evidence verification. Record implemented/static_verified/runtime_verified/release_ready only when their contracted conditions pass; human_accepted stays false without a real review and does not block local prototype readiness.
- [x] Preserve selected devlog artifacts and their provenance so the delivery does not depend on ignored scratch runs. Reuse the brief editor check; retain separate Chrome captures, the full tavern coverage summary, Council intervention/return and the labeled 2x2 fixture. Do not add editor sessions for the devlog. No archiving/deletion that needs a new scope decision.
- [x] Stop owned servers/Chrome profiles/fixtures, preserve actual evidence and saves required by the run, update all task statuses/verification, and report the final result without asking for approval. Leave commits and publication untouched.

## Validation

Execution modes: directed-browser for campaign journeys, native integration for labeled fixtures, agent visual inspection for V-007, static/unit/full registered verification and frozen-diff review. Reference task 08's exact incremental plan and the installed qa-execution directed reference; legacy direct execution of `rpg-maker/qa/*.test.mjs` cannot settle campaign acceptance.

| Verification ID / closure | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-004 | Directed legal variant ledger and state observations | Correct eligible participants/sequence/focus with campaign invariants preserved | task-09/<run-id>/campaign-lots/ |
| V-007 | Inspected stills and temporal records | Complete readable/framed/focused composition across required assets/variants | task-09/<run-id>/visual-review.json and captures |
| Other V IDs | Dependency/fingerprint audit and owning-task reruns if stale | All nine sensors refer to matching current source and assigned proof | task-09/<run-id>/evidence-freshness.json |
| Final closure | Full registered suite, content CLI, deep review and candidate audit | Required tasks/sensors pass; current diff SHIP; no unsupported readiness or Git claims | Dated report, verification.md and task-09/<run-id>/review/ |

Changes after evidence capture reopen affected owners/sensors, not arbitrary approvals. A real missing capability or unresolved defect is reported with its failing observable and next refutable step; do not silently skip it to mark all tasks complete. Optional human feedback is refinement, not a required sensor.

## Execution Notes

Final local audit on 2026-09-11: **blocked by two concrete required sensors**, with all independent work executed. Tasks01–06 and08 completed;07 lacks editor evidence. No human approval gate, staging, commit, PR or publication was introduced.

The implementation migrates all63 original sections/103 boxes, preserves258 identities/282 indexed boxes and1,234 protected files, and keeps native revision `mz-20260911-busts-native-01`. Current EventBridge SHA-256 is `7b161464b1ccb489a01502ce8bae57fa4ba2c13fc46ea8ad30c953d984736e55`. Final working-tree accounting, including untracked files and prior unrelated edits, is `task-09/final-candidate.json`; source changes after this record require a new impact audit.

The pre-review suite passed138/138 at `2026-09-11T09-22-24-373Z`. Review RD0001 then exposed an ownerless helper after an invalid conversation begin. Native IT-068 failed at `10-33-49-447Z`, passed after repair at `10-35-04-415Z`, and task02 closed again after the complete post-fix suite: `2026-09-11T10-36-54-403Z`,138/138 PASS, zero failures/skips, content CLI exit0,1900715ms, Node22.23.2. First failures remain preserved. RD0002 was suppressed because its harmful checkpoint was outside approved authored boundaries.

Twenty-four directed lots on the pre-RD1 snapshot cover the63 target sections in both modes, all eight Council rosters/21 eligible opinion slots, both discovery orders/final choices, all farewell/epilogue heroes and excluded scenes. Their unaffected visual/content evidence is retained through the documented guard-only impact audit; they are not relabeled as fresh runtime replays. Four additional post-RD1 lots passed: fresh C1 normal, its R1 Continue at larger/reduced area, and all-eight T in both modes. Current game files and canonical test inputs match the final full-suite fixture. The nine-line read-only temporal observer delta was independently reviewed and exercised by both new T lots.

Eight historical Council masters remain immutable but intentionally fail strict source compatibility with current EventBridge. A ninth, fresh H1/H2/H3 master matches1,419 current source files and remained intact after its consumer. Producer prefix74796ms, Council/archive10189ms, suffix8163ms; consumer restore2808ms, Council14014ms, suffix9599ms. Payload/index provenance and links are in the [current lot ledger](../../../docs/qa/deliveries/vn-picture-busts-dialogues/post-review-lot-ledger.json). No saved campaign fact was edited.

Visual evidence: independent tavern review inspected254 PNGs, including all144 four-family images; current T reports match all56 retained profile/speech render states per mode. Parent records cover212 unique PNGs across41 scoped inspections, including all21 Council opinion pairs in both areas, all farewells/epilogues, both lover orders, excluded scenes, and current H1 temporal samples (21normal +12large/reduced). Sampled stills do not assert continuous frame cadence or human acceptance. Full settled text is readable; the known inherited pause diamond clipping remains a UI refinement.

Deep review round2: SHIP for reviewed code only, no confirmed open findings; final temporal observer delta clear. Deslop found no further justified cleanup. Selected11 captures and provenance remain in the versionable delivery directory; raw runs and native save masters remain local and ignored. The dated report and verification summary preserve the result without depending on screenshots in disposable profiles.

V-007 fails because actual Pérola/Church and Floraí/Figtree PNGs show no visible confinement. The twelve assets and six-command grammar are locked, so inventing prison art/masks would change the approved scope. The Technical Art bug names Lucas and the next verifiable art criterion. V-008 remains blocked: MZ is installed/running, but CUA returned `cgWindowNotFound`; no representative command field was edited/accepted. IT067 proves native-data edits affect Chrome, not editor editability. The single brief attempt under ADR-004 is retained; no extra editor cycles were introduced.

[Final QA report](../../../docs/qa/reports/2026-09-11-vn-picture-busts-dialogues.md) · [verification summary](../../../docs/qa/deliveries/vn-picture-busts-dialogues/verification-summary.json). `implemented`, `runtime_verified`, `human_accepted` and `release_ready` remain false for the complete contract; `static_verified` is true. Cleanup and final document/hash checks are recorded separately in `task-09/final-checks.json`.
