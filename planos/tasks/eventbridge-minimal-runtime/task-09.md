---
id: "09"
status: completed
depends_on: ["07"]
verification_ids: []
supporting_verification_ids: [V-002, V-009, V-010, V-011]
---

# Task 09 — Gate provider AUTO and FAST to completed reading units

## Outcome

Players can choose installed AUTO/FAST for previously completed units in the current campaign; unseen text and decisions revoke both permission and active modes.

## Authority

- [Spec](spec.md): RQ-005, RQ-010–RQ-011, RQ-017.
- [Verification](verification.md): V-002, V-009, V-010, V-011.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F10–F11; reading portion of F43.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `Dryland_Presentation.js`, `Dryland_EventBridge.js`, `Dryland_CampaignRules.js`, `js/plugins.js`; native reading wrappers and choice/transfer boundaries in `data/CommonEvents.json`.
- Tests: `native-controls.mjs`, `shared-ui.mjs`, `persistence.mjs`; adapt canonical instant-skip tests including IT-065 and observational-unit fixtures.
- Fixture and readiness owner: task 09. Own seen/unseen/choice and cancelled/replaced-unit fixtures plus per-file UI history serialization. Prove actual provider timing/execution and explicit completion, not a stub named FAST.
- Data/assets: Enable installed ExtMessageFunc settings/buttons and ExtFastFwdDisallow; expose scalar permission fields only. History for observational CEs is separate from campaign reading facts and reset at New Game.
- QA/docs: Document new controls and the lifecycle entry/exit contract for future authors; no new player log.
- Delete targets: Remove Window_DrylandSkip, S shortcut, instant SKIP_SEEN_TEXT runtime/domain dispatch/history production and old skip-only tests after updating all consumers.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Inspect the installed provider console lifecycle; there is no assumed public AUTO allow command. Use its actual AUTO delay/FAST engine and only the narrow adapter support needed to gate/reset them.
- [x] At each native reading entry supply prior-read status; before new/unread units, decisions, transfers and campaign loads revoke old permission and active modes.
- [x] Keep AUTO/FAST player-selected, never automatically enabled. Preserve HIDE/Options when reading automation is unavailable.
- [x] Use actual completed native-unit identity for observational history; partial/cancelled text stays unread, replaced CEs start distinct, and campaign reading has only the domain-owned fact.
- [x] Make ordinary manual and provider-driven completion run the same authored end command once. Remove all instant jump consumers without implementing the old shortcut behind FAST.
- [x] Register Presentation after its providers, preserving vendor order/bytes and Bridge after CampaignRules. Presentation receives event scalars and never reads _dryland.campaign or calls Bridge.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S07; S02 observational history; S09 per-campaign state contributions. Task 16 owns all directed mode/control judgments.

Required variants: AUTO and FAST separately; seen→unseen; seen→choice; reopen seen unit; replacement CE; partial/cancel; Options/Continue; different campaign files; held input.

Invalidates/reuses: Read facts/history identity, wrappers, provider console configuration, adapter lifecycle and save state invalidate reading-mode proof. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-002, V-009, V-010, V-011 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Only completed eligible units can automate; unseen text and decisions remain manual; no cross-campaign mode leakage or instant skip. | `docs/qa/evidence/eventbridge-minimal-runtime/task-09/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. Installed ExtMessageFunc remains byte-identical and in its existing order. Enabled its FAST (factor 8) and console AUTO/FAST/Options/HIDE. AUTO retains 6 frames per character and a 300-frame minimum. Presentation is after its providers. Its permission adapter invokes the actual ExtFastFwdDisallow command with `Allow:eval` serialized as `true`/`false`; the provider evaluates that field itself. No alternate Boolean workaround or assumed AUTO command was added.

Provider `_disallowFastForward` is the single permission fact. Native campaign wrappers query passageRead into switch 48 and supply ReadingPermission; their ends invoke ReadingEnd before normal semantic completion. Only observational CEs 82–113 retain ObservationBegin/Complete. Actual CE identity is bound at interpreter setup and serialized with that native interpreter, so copied save lists do not lose identity. Completed UI CE IDs remain in Game_System._drylandReadUnits, separate from campaign seenPassageIds. Partial cancellation revokes permission without completion; replacing a CE creates a distinct identity. Choices/transfers revoke permission, Options resets active modes, load revokes the preceding session and restores the saved permission without active modes. New Game has empty UI history.

Removed runtime/domain SKIP_SEEN_TEXT, Window_DrylandSkip and S binding. Retired canonical UT-037/038 instant-jump expectations; actual provider boundary/execution coverage now belongs to IT-065/077. Adapted IT-050 to its retained utility invariant and the diagnostics action matrix. Native console clicks use observed provider button bounds instead of obsolete fixed coordinates.

PASS: UT-041/055/061; IT-001/025/038/050/062/065/071/077. Actual AUTO waits, native Wait/Control Variable execution under FAST, seen→unseen and seen→choice, per-unit player selection, partial cancellation, replaced CE, Options, native save/load and New Game history are observed. Isolated save serialization currently uses the pre-task-11 current file; two actual selectable campaign files and their earned journeys remain explicitly owned by tasks 11/16. Task 10 carries held-input integration with the final adapter.

First failures retained: IT-065 fixture needed a clone of the deliberately frozen domain state. The real disabled-console click also fell through as manual message advance; a narrow Message trigger guard now consumes clicks inside disabled automation controls. The corrected Council test passed. IT-077's New Game sensor initially compared native undefined mode flags to false; it now observes their effective Boolean value without changing the provider initialization. Final serialization passed.

Evidence: docs/qa/evidence/eventbridge-minimal-runtime/task-09/20260912/ contains logs including failures, provider inspection, case fingerprints, screenshots and candidate metadata/hashes. Native integration fixtures are not directed player QA. No mixed-sensor V-ID is closed, no engine/vendor file changed, and no commit occurred.


## Subsequent user amendment — 2026-09-14

[ADR-004](adrs/adr-004.md) removes AUTO from the visible console and retains FAST, Configurações and HIDE. The AUTO implementation and test results above describe the 2026-09-12 baseline; the current reading requirement and focused verification are owned by spec.md/verification.md.
