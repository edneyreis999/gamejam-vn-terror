---
id: "05"
status: completed
depends_on: ["04"]
verification_ids: []
supporting_verification_ids: [V-001, V-002, V-003, V-006, V-011]
---

# Task 05 — Run Council, endings and eligible epilogues natively

## Outcome

Council, both medallion endings, total loss and eligible epilogues execute direct native calls on their named maps while retaining the saved final decision.

## Authority

- [Spec](spec.md): RQ-001–RQ-003, RQ-005–RQ-007, RQ-013.
- [Verification](verification.md): V-001, V-002, V-003, V-006, V-011.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [audio contract](eventbridge-minimal-runtime.audio.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F08, F25 (Council/ending/epilogue consumers).

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/CommonEvents.json` CE40 Council/ending/epilogue branches, CE41 opinion/epilogue/irati.03 units, CE44 Council/ending checkpoints, CE53–57, CE68–75/79 and shared CE76/77; `data/Map023.json` through `data/Map036.json` for closing routing, leaving memorial bodies to task 06 and credits to task 13.
- Tests: `endings.mjs`, `discovery.mjs`, `native-checkpoints.mjs`, `native-controls.mjs`, `native-inventory.mjs`; `helpers/closing.mjs`, `helpers/closing-presentation.mjs`.
- Fixture and readiness owner: task 05. Own isolated 0/1/2/3 witness and survivor-participation fixtures, both endings/total-loss boundaries and explicit council.01 completion observability.
- Data/assets: Preserve map hierarchy, texts, backgrounds, current bust composition and cue selection. Closing uses semantic queries for eligibility and direct native calls for actual content.
- QA/docs: Record map entries for Council/endings/each epilogue, closing routing and shared cleanup/checkpoint boundaries.
- Delete targets: Remove Present/Conversation slicing at these consumers and direct campaign-object conditions; do not keep visual-prefix replay as a hidden ending helper.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Expose the actual Council and ending/epilogue call paths from their maps. Their map E1 events currently call shared CE40: replace its corresponding phase branches too, so a newly named entry cannot leave live gameplay on the old dispatcher. Split CE41 opinion/epilogue/irati.03 bodies into their directly called units. Preserve council.01's medallion-completion meaning and explicit passage completion at each actual end.
- [x] Keep only living climax participants eligible for opinions and epilogues; a solo Council does not introduce reserves, and total loss bypasses the medallion choice.
- [x] Preserve native hero/Ivaí/Andirá composition and explicit temporary hide/return/exit commands, including the reflected identity of Andirá. CE68–75/79 belong to this slice; retain the established CE76 shared exit contract and leave CE78 discovery/CE80–81 tavern helpers with tasks 04/02.
- [x] Commit and checkpoint Reunir/Destruir before terminal presentation; native continuation must reopen only that ending without offering the final decision again.
- [x] Route zero deaths past memorial, other deaths through task 06's native memorial, then only eligible epilogues and task 13's credits. Do not infer new creative approvals or repair unrelated provisional art by changing this scope.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S03, S04 Council/epilogue, S09 terminal files and S10 complete outcomes.

Required variants: 0/1/2/3 Council witnesses; solo with living reserves; Reunir/Destruir/bad; both route orders; terminal Continue; no memorial and no epilogue; normal/reduced motion.

Invalidates/reuses: Council semantic completion, witness/epilogue eligibility, event indices, terminal routing, native pictures and audio invalidate related closing/Continue proof. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-002, V-003, V-006, V-011 | Owning canonical suites (command below); native/static/asset inspection as assigned above | The native closing sequence matches committed campaign facts, completes each passage once and presents only eligible participants/content. | `docs/qa/evidence/eventbridge-minimal-runtime/task-05/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed 2026-09-12. CE305–334 are the30 isolated Council/opinion/ending/epilogue units (task-05-native-units.json). CE335 queries the three eligible climax identities into native variables144–146 and calls CE54/41; CE336 calls the selected ending; CE337 supplies native closing stage cleanup. CE53 exits through CE77 and presents its two native choices with unchanged Action → ending checkpoint order. Map023 and025–036 expose the migrated closing paths; Map024 has no live autorun, so its choice entry is on the actual Council map023. No private content dispatcher remains on these phases.

PASS: UT033–036, IT054, IT061, IT073. The native sensors cover0/1/2/3 witnesses, living reserves excluded from solo, all8 hero recipes, native Andirá reflection, both choices/checkpoints, and all8 eligible epilogues with exact one-passage completion and authored exit. A one-time HEAD comparison preserves all30 text bodies. First failures are retained: reduced-motion exits needed explicit native erasure, and the new epilogue fixture needed to await its actual epilogue map rather than Council. Both were corrected and affected cases passed fresh. Semantic zero-death/total-loss routing is covered by pure rules; complete native closing across memorial/credits and terminal file policy remains with06/11/13/16. No mixed-sensor V-ID is closed. Evidence: docs/qa/evidence/eventbridge-minimal-runtime/task-05/20260912/. Syntax and diff whitespace checks pass; no commit.
