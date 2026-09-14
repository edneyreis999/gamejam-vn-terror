---
id: "14"
status: completed
depends_on: ["08", "11", "12", "13"]
verification_ids: [V-004, V-013]
supporting_verification_ids: [V-003, V-008]
---

# Task 14 — Remove obsolete policies and complete live consumer/documentation migration

## Outcome

The current game, test harness, QA tooling and author guide have no live dependency on removed Bridge policy/QA/revision/rendering contracts, and the complete canonical regression runs against the migrated candidate.

## Authority

- [Spec](spec.md): RQ-004, RQ-014, RQ-018.
- [Verification](verification.md): V-004, V-013, V-003, V-008.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F07, F35–F39; final audit of F01–F43.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: Remaining obsolete code in `Dryland_EventBridge.js`/`Dryland_CampaignRules.js`, `js/plugins.js`, all live event callers including CE66; `rpg-maker/tools/`, `rpg-maker/qa/`, canonical test helpers/suites and `rpg-maker/tests/test-manifest.json`.
- Tests: `content.mjs`, `native-inventory.mjs`, `native-diagnostics.mjs`, `diagnostics.mjs` and every affected owning suite via `campaign.test.mjs`; audit `native-content.mjs`, `native-bust-fixture.mjs`, `canonical-cases.mjs`, campaign/native helpers and fixtures.
- Fixture and readiness owner: task 14. Own disposable supported-native-command/editorial-metadata-free inputs for V-004 and complete consumer/import/packaged-file audits for V-013. Tool archive provenance remains test-only, never runtime campaign validation.
- Data/assets: Audit all map/CE/plugin calls, serialized parameters and dynamic files, including task 08's reconciled tavern list and task 06's derivatives. Preserve engine/vendor/source-art bytes; no boot asset registry.
- QA/docs: Update `rpg-maker/README.md`, plugin help, relevant `docs/_memory/` baseline guidance and current QA entry instructions; reconcile the implementation status in the GDD/spec's current status-bearing passages without rewriting approved decisions or frozen reviews. Task 15 owns detailed QA journey/scenario/charter updates.
- Delete targets: `rpg-maker/The Dryland Drowned/native-layout-manifest.json`, `rpg-maker/tools/revise-layout.mjs`, `rpg-maker/tools/validate-content.mjs`; remove policy-only parts of `native-layout.mjs` and dependent fixtures/tests after auditing imports. Remove Present/Conversation/Observe drawing aliases, expeditionQA/createQa/preset seed, Window_DrylandNotice, _drylandInvalid and CE66 blockade calls. Keep useful pure-rule tests and functional RNG facts.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Audit the programming contract's entire deletion inventory and F01–F43 destinations. Remove dependencies and obsolete APIs, including exported parser/restoration/audit helpers, not just their messages or activation flags.
- [x] Adapt `rpg-maker/qa/directed-adapter.mjs`, `native-player.mjs`, `native-save-archive.mjs` and live legacy QA drivers/imports away from expeditionQA, manifest revision and file0 assumptions. Preserve genuine save provenance/read-only observation; do not ship another QA API.
- [x] Preserve and adapt the existing capture/pre-boot restore path for the [reusable native checkpoint protocol](verification.md#reusable-native-checkpoints-for-decision-testing). Capture the actual selected file, matching global index, native storage and producer/source hashes after confirmed save completion. Restore an unchanged copy in each fresh same-origin context and require native Continue; preserve file/campaign identity, immutable masters and branch ancestry. Keep archive compatibility checks in QA preparation, without a runtime revision gate. Extend existing canonical persistence/native-checkpoint coverage for relevant adapter defects; reuse the skill's storage transport rather than creating another exporter or production test hook.
- [x] Remove the mandatory validate-content/revise-layout workflow. Extract reusable path/hash/file helpers from native-layout.mjs only if surviving consumers need them; otherwise delete the unused module after its last import.
- [x] Retire tests/fixtures whose sole oracle is removed metadata, ownership, QA snapshot or layout revision. Keep mechanical legality/randomness and meaningful native behavior in the canonical suites and synchronize test-manifest registrations.
- [x] Run isolated edits using native-supported commands/text without former metadata/allowlists and verify real execution without a manifest or QA API. A missing actual file/reference must remain a real native failure, not successful fallback or a global campaign blockade.
- [x] Inspect the local package for every dynamic asset and surviving import. Use file/package inspection as specified; no build, service or remote publication.
- [x] Rewrite current editor/save/reading/QA instructions around the actual native paths and commands. Mark historical procedures as history with supersession links; do not revive the local-only .compozy archive as a required source.
- [x] Run the complete canonical regression and syntax/whitespace checks after cleanup. Freeze evidence dependencies for QA; implementation tests do not pass editor, visual, audio or human acceptance.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: V-004 isolated native integration/static; V-013 static/canonical regression/packaging. S03's human/editor runtime trail and S06/S06T live presentation remain owned by task 16.

Required variants: Metadata omitted; arbitrary supported native command/helper; valid authored text change; missing real asset/reference; no shipped QA methods or seed control; clean package including all dynamic images; all live imports after deletion; capture/restore of a selected nonzero file with its index, unchanged parent archive after a child autosave, and an explicitly incompatible/tampered archive rejected by test setup. Only the isolated negative fixture may alter archive bytes; it cannot supply gameplay branch evidence.

Invalidates/reuses: Any runtime/tool/test/fixture/doc consumer, native file reference or packaged asset change invalidates the corresponding audit. Retain unaffected focused evidence by explicit dependency equivalence only. Historical PASS results are context only; a changed dependency requires fresh evidence.

Primary verification ownership: V-004, V-013. Task 16 may retain these results only while their inputs remain applicable.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-004, V-013, V-003, V-008 | Owning canonical suites (command below); native/static/asset inspection as assigned above | V-004: authored supported content executes without enforcement/QA replacement. V-013: no live consumer references removed contracts, canonical registrations/tests pass and dynamic assets ship. | `docs/qa/evidence/eventbridge-minimal-runtime/task-14/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

In progress on 2026-09-12. Runtime cleanup removed the editorial parser, duplicate envelope/revision checks, Observe/credit aliases, QA factory/global/seed preset, audit snapshot, obsolete presentation-active checkpoint guard, and CE66 blockade content. Removed layout manifest and both policy CLIs. `native-files.mjs` retains only used filesystem hashing/asset listing; old fixture manifest generation is gone. Native caller migration replaces all remaining Action `\V[...]` values with the approved `valueVariable` field; exact edits are in task-14-callers.json.

Canonical registrations now include IT-079 for actual selected-file archive transport. The removed metadata/QA/restoration-only cases are listed in retired-tests.json; mechanical history, state validity and projection tests remain. Native tests use actual file IDs and file selectors. Read-only QA tools now capture the selected file, global index, source hashes and immutable identity; storage uses the installed skill's pre-boot transport. The current directed drivers use public inputs and raw native observations, with no production QA replacement.

Focused migration smoke passed 14 test/subtest results (IT-001/004/031/047/071/077/078 and relevant units). IT-079 passed: actual file7 producer, separate same-origin pre-boot copies, Continue into distinct A/B party+route branches, original payload/index/master unchanged. First archive run failed only because the verifier's `limits` field was a string; corrected to the executor's array contract and rerun successfully. This is technical archive integration, not a completed directed campaign.

The first full regression was interrupted after it exposed unconverted native variable callers: removing the parser correctly rejected their old strings, preventing hero/approach selection. Migrated these callers at source. Additional failures were stale file0 expectations/selectors in tests. Targeted IT-002/010/013/025/067/069 passed after correction; IT-005/049 reached the correct behavior but still expected file0 in their write log, now corrected to selected file1. A new complete canonical run is active in `/tmp/eventbridge-task14-full-current.log`; do not treat it as passed until completion.

README/plugin help/current QA entry/playbook/GDD/spec status passages are updated; old QA guides are explicitly historical. Task15 still owns the current detailed journey/scenario/charter plan. Tasks01–13 evidence remains supporting material only, subject to the current regression. Next: finish regression and fixes, source/package/import audit, record V-004/V-013, then task15/task16. No commits, staging or remote operations.

Interim independent review (`encounter_inventory`, 2026-09-12) found no actionable defect in Bridge save/load argument/result preservation, selected-file wait, typed native Action callers, reading wrappers, Presentation's campaign-independent boundary or plugin order. This bounded review does not replace the final whole-diff deep review. The 43 destination rows are recorded in [responsibility audit](audit-task14-responsibilities.md).

The current full run also exposed four stale fixture oracles: IT041 read a raw variable-bearing caption; IT060/066 inspected the title's next free file instead of the file saved before returning to title; IT070 still loaded makeSavename(0). Their source corrections preserve current-file semantics and require a fresh focused rerun. Archive metadata now records the actual saved map, interpreter stack, UI read units and consumed absence flags for the checkpoint bank; the native payload remains unchanged. IT079 will reverify this capture addition.

Full-run IT030 failed because its old oracle required immediate active-scene Retry after Bitmap._onError, which depended on the explicitly removed global readiness poll (ADR002/task08). Consolidated this obsolete duplicate into existing IT075: real local404, default late-error timing, native scene-start LoadError, actual Retry and campaign preservation. The first failure remains in full-current.log. Canonical manifest now has129 active IDs; IT075 must pass in the current full/focused evidence before closing this disposition. No runtime hook or artificial image barrier was restored.

The independent package audit is complete in [audit-task14-package.md](audit-task14-package.md): 746 CE calls, 34 transfers, 33 active plugin-command pairs/2468 calls, 66 recognizable picture stems and10 audio files resolve. Engine/libs/VisuMZ diff is empty. Confirmed unused imports and the live playbook revision sentence were corrected. Agent-inspected current native memorial and credit captures are copied with hashes into task14/20260912/{memorial-visual,credits-visual}; they remain isolated integration/visual observations, not directed gameplay or human acceptance.

Evidence bookkeeping correction: canonical-cases previously hashed files only after each case, which could mislabel loaded test source if a fixture oracle was edited during a long run. Future runs freeze source hashes at module initialization and mark/reject evidence if any input changes during the run. The current full run loaded the previous helper; game data/plugins remained unchanged throughout, while test-only oracle/import changes and QA-driver/archive metadata edits were made explicitly. Its native-game results can be retained by that limited dependency equivalence; corrected cases and the archive addition require fresh frozen-input evidence.

QA preparation status: MZ opened through CUA bundlejp.co.kadokawa.rpgmz (first attempt timed out; second returned its normal window). It currently shows an unrelated previously opened project; no edits made. Task16 must open only a disposable game copy. Directed journey driver now supports native credit natural/accelerated/early/late mouse/keyboard endings and actual close/reopen terminal Continue; these driver variants have not yet been executed and make no gameplay PASS.

Final full-run outcomes:130 registered cases/134 total including subtests,127pass/7fail, exit1,2207126ms. IT057 also lacked the native New Game file selector; corrected to explicit new file2. IT079 producer and A passed, but branchB's first capture returned2560×1440 while the declared document was1280×720/DPR1. The previous same-input archive run passed all three branches. The browser setup now requests `--force-device-scale-factor=1` for both browser UI and content, aligning native window raster scale with the explicit QA DPR before startup. Chromium's [switch definition](https://chromium.googlesource.com/chromium/src/+/master/ui/display/display_switches.cc) documents this scope. This is a refutable environment correction: the frozen focused run must still satisfy the executor's original exact PNG geometry check; no resizing, retry loop or relaxed assertion was added.

Completed technical scope on2026-09-12. Frozen focused rerun:9/9pass, exit0,148241ms (UT069; IT036/041/057/060/066/070/075/079). Current manifest:129IDs, each with applicable passing evidence from the full run plus corrected cases; the retired IT030 remains explicitly recorded. Full command exit1 is preserved, not relabeled as an all-green command. The current game inputs are unchanged across those contributing runs; changed test/QA inputs are covered by the focused correction or documented import-only equivalence.42 project/test/QA/tool JavaScript modules pass syntax; git diff --check passes. Owned server/profile teardown completed and port18726 is free.

Evidence consolidation: docs/qa/evidence/eventbridge-minimal-runtime/task-14/20260912/candidate.json includes every current case/result-log, full game hashes, active provider versions, Node/Chrome/origin and dirty inventory. Logs and independent audits retain failures and their dispositions. V004/V013 pass their assigned static/native/consumer/package sensors. Task15 owns the new living plan; task16 still owns directed/editor/audio/human completion.

Final-review correction2026-09-13: independent review found IT047's package loop covered CE lists but omitted map pages, and native-content.mjs had no consumers. IT047 now inspects every native map page using the same reference checks; the dead helper is removed. Focused `node --test --test-name-pattern='IT-047|IT-079' rpg-maker/tests/campaign.test.mjs` passed2/2, exit0,39007.7ms. Log: `docs/qa/evidence/eventbridge-minimal-runtime/task-14/20260913-final-review/inventory-archive.log`. All game/provider/data/asset inputs remain identical to task14's prior candidate; all other canonical results retain only their unchanged dependency scope. No need for another full campaign regression was introduced by this sensor/unused-helper correction. Review disposition is in review-final-tests-tools.md.


Final QA-review correction2026-09-13: UT069 now rejects coordinated metadata/identity edits by comparing decoded native payload/index facts; IT029 adds isolated native BGM equivalence and SE new-cue volume, preserving campaign facts. UT069/IT029/IT079 passed3/3 with unchanged frozen inputs, exit0,61037ms. Evidence: `task-14/20260913-final-review/archive-audio.log`, copied executions, `audio-buffers.json` and `archive-audio-results.json`. BGM is absent from the authored campaign; its System reference remains an explicitly isolated native audio input. No musical direction, engine/provider change or new canonical ID was added. All other canonical owners retain only their unchanged dependency scope.
