---
id: "04"
status: completed
depends_on: ["03"]
verification_ids: []
supporting_verification_ids: [V-001, V-002, V-003, V-005, V-006, V-007, V-011]
---

# Task 04 — Run encounters, sacrifices and route discoveries through native events

## Outcome

All sixteen encounter maps execute native descriptions, approaches, consequences and sacrifice; route rewards and returns retain domain rules and explicit checkpoints.

## Authority

- [Spec](spec.md): RQ-001–RQ-003, RQ-005–RQ-008, RQ-013.
- [Verification](verification.md): V-001, V-002, V-003, V-005, V-006, V-007, V-011.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [audio contract](eventbridge-minimal-runtime.audio.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F08–F09, F15–F17, F25 (encounter/discovery consumers).

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/CommonEvents.json` CE13–29, the encounter/retreat/death/discovery branches of CE40, CE41 death/farewell/automatic-retreat units, CE42–44, CE46–52 and CE78; `data/Map004.json`, `data/Map007.json` through `data/Map022.json`; affected Bridge rendering/choice consumers.
- Tests: `encounters.mjs`, `sacrifice.mjs`, `retreat.mjs`, `discovery.mjs`, `native-death-context.mjs`, `native-checkpoints.mjs`, `native-inventory.mjs`; existing campaign/discovery helpers and boundary fixtures.
- Fixture and readiness owner: task 04. Own exhaustive pure-rule approach/route variants and labeled native fixtures for sacrifice counts, result routing and death location. Browser states remain earned by player actions.
- Data/assets: Each map exposes description, three approaches, success/failure/death calls and UI. Preserve background-only success, top reread/retreat controls, reward/map overlay art and cue commands.
- QA/docs: Record semantic action → checkpoint → next native reading boundaries, all encounter call targets and routes into discoveries/return.
- Delete targets: Remove migrated Present/Observe drawing and encounter/sacrifice renderer consumers; replace direct campaign-object event conditions with Query outputs. Preserve shared implementations until their last consumer moves.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Split multiplexed encounter/threshold/discovery content and CE41 death/farewell/automatic-retreat units into independently called native units without changing text, approach mapping or random assignments. Preserve CE41 opinion/epilogue/irati.03 bodies for task 05. Record CE76 shared exit usage; CE78 discovery exits belong here.
- [x] Move encounter headings, progress, action labels and sacrifice composition into native events. Reread only the current description, then restore the same choices without changing campaign facts.
- [x] Preserve retreat eligibility/cancel, manual versus automatic return, failed approach consequences and the first-click irreversible sacrifice without an extra confirmation.
- [x] Commit death including route/encounter/position/approach once, save before farewell, and call the correct isolated hero farewell then contextual death prose. Reduced party, reserves and total-loss boundaries retain their priority.
- [x] Preserve both discovery orders, first/second warnings, map-part grants and the tavern map overlay. Explicit reading completion must not grant a reward twice; credits/memorial remain later tasks.
- [x] Give each moved picture/audio effect an authored lifetime and reduced-motion branch. Migrate only these phases of shared CE40 and their CE44 checkpoints; leave Council/ending/epilogue/memorial/credits branches explicitly assigned to tasks 05/06/13. Maintain the per-reason checkpoint contract now; task 11 replaces file ownership and proves asynchronous loading end to end.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S02, S03, S04 farewell, S05 death setup, S09 checkpoints, S10 routes/outcomes. Integration fixtures and directed journeys stay separately labeled.

Required variants: All 16 encounter identities and 48 approaches; success/failure; 1/2/3 sacrifice candidates; reread; retreat/cancel; reserves versus eighth death; both initial route orders; reward/overlay; normal/reduced motion.

Invalidates/reuses: Rules/configuration, result routing, native command indices, checkpoint placement, death facts or discovery picture/audio commands invalidate dependent encounter/save/closing evidence. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-002, V-003, V-005, V-006, V-007, V-011 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Native branches select the correct content and UI; observation preserves state; committed consequences survive without repetition; route and death facts match unchanged mechanics. | `docs/qa/evidence/eventbridge-minimal-runtime/task-04/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. Native units 118–304 and their exact mapping are recorded in task-04-native-units.json; the mapping is a migration artifact, never loaded by the game. CE13–28 call their own description/result/approach units; CE262 selects those native calls. CE29 owns thresholds, CE291 owns farewell/death/automatic-return calls, CE303 owns discovery calls and CE304 queries/stages encounter data. Map007–022 expose the same active native encounter handlers. CE42 keeps first-click Action SELECT_VICTIM → sacrifice checkpoint → native farewell → native context. Observation units never dispatch campaign actions; their callers capture local reading context and explicitly complete once. CE40 preserves action/checkpoint ordering and the unmodified closing phases for tasks05/06/13.

PASS: UT003–007/016/018–020/032/055; IT005/012/013/049/051/052/053. This includes all 48 approaches × 56 three-hero parties against the independent competency matrix, all route pools, candidate counts1/2/3, input boundaries, repeated rereading, retreat/cancel, background-only success, both receipt/order/assembly variants and reduced motion. A one-time comparison against HEAD confirms every migrated text body unchanged. Native zero-duration bust exits now explicitly erase their own slots; no loader delay was added.

First-run failures are retained. IT009/010/011 depend on the absence implementation owned by task06; IT057 passed atomic death, checkpoint/Continue and retreat observations, then failed at its obsolete malformed-save rejection assertion, which task14 must retire under the approved contract. Neither case is counted as a complete PASS. Current-file checkpoint ownership remains task11; closing/memorial and full canonical inventory remain their assigned tasks. Independent directed player/editor/visual/audio acceptance remains task16. Evidence and per-case source fingerprints: docs/qa/evidence/eventbridge-minimal-runtime/task-04/20260912/. Syntax and git diff --check pass. No commit.


Read-only independent review of the migrated encounter/discovery paths found no actionable defect. Historical metadata and malformed-save assertions remain assigned to their migration owners, not restored as runtime gates.
