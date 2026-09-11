---
id: "05"
status: completed
depends_on: ["04"]
verification_ids: [V-006]
---

# Task 05 — Restore native conversation stages through Continue

## Outcome

Continue reconstructs the correct conversation composition from existing saved reading/native interpreter state, without repeating committed decisions, text or animation. Incompatible older saves remain intact and New Game remains usable.

## Authority

- [Spec](spec.md): RQ-005, RQ-006, RQ-008 and reconstruction/ownership design.
- [Verification](verification.md): V-006, D-07 and the saved variants of D-02/D-04/D-05.
- [Programação](vn-picture-busts-dialogues.programacao.md), [UI/UX](vn-picture-busts-dialogues.uiux.md), [ADR-003](adrs/adr-003.md).
- [ADR-005](adrs/adr-005.md) and [QA save reuse study](qa-save-reuse-analysis.md): genuine native save copies for isolated repeated checks.
- `rpg-maker/README.md` save/revision contract, `docs/qa/guides/native-mz-cycle.md`, [shared execution contract](tasks.md).

## Scope

- Implementation: EventBridge native-stack/presentation-owner reconstruction and existing save integration boundaries. Read CampaignRules/native checkpoint owners as preservation authority; no new campaign schema, checkpoint or save migration.
- Data: presentation-only reconstruction recipes in the same native helpers/callers; refresh the manifest for any event changes. Derived System slot variables are recomputed, never trusted as saved authority.
- Tests: `rpg-maker/tests/suites/persistence.mjs`, `native-checkpoints.mjs`, `memorial.mjs`, canonical closing helpers and manifest for distinct cases.
- Fixture/readiness owner: native saved helper ancestry, stale derived-variable snapshots, missing transient pictures/owner, incompatible revision, pending farewell and terminal Continue. Tavern mid-observation stacks are isolated integration fixtures, not a new player save feature.
- Directed QA support: extend existing `rpg-maker/qa/native-journeys.test.mjs`, `native-surfaces.test.mjs` and player helpers only through legal actions/allowed isolated I/O setup.
- QA save reuse: `rpg-maker/qa/directed-adapter.mjs` and narrowly scoped project save-fixture helpers own native payload/index selection and provenance. If needed, extend the installed `.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs` storage-fixture lifecycle and its focused lifecycle tests; do not fork the runner or change game save behavior.
- Delete targets: none. Never delete or overwrite user saves to make compatibility pass.

## Checklist

- [x] Capture current nested checkpoint replay and incompatible-layout behavior before changing reconstruction. Identify which states are actually persisted by native autosave and label synthetic stack fixtures separately.
- [x] Derive conversation/stage from validated campaign reading and native saved ancestry; reconstruct only final presentation effects from the native authored source. No second persistent speaker cursor or JavaScript framing catalog.
- [x] Restore/recompute slot projections and transient ownership before branching. Preserve coherent saved visuals or rebuild missing ones after real bitmap readiness, without replaying entrance/focus animation or displayed text.
- [x] Keep root COMPLETE_PASSAGE/checkpoint consequences exactly once. A helper finishing after load cannot commit a second death, choice, checkpoint or story advance.
- [x] Cover profile/speech fixture stacks, Council challenge/confession/intervention/opinions, pending farewell and terminal replay; test interrupted reconstruction readiness and hand cancellation coverage to 06.
- [x] Verify compatible Continue by actually closing/reopening the isolated tab/profile where required. Verify old revision refusal before state installation, unchanged incompatible save bytes and a usable native New Game path.
- [x] Run canonical save/native integration and the focused legal D-07 continuation cases through the installed directed executor. Do not claim a fixture as legal campaign coverage.
- [x] Verify capture of a real native checkpoint's unchanged payload and consistent save index, with hashes and producer provenance. Restore only before gameplay in a fresh QA context and activate native Continue; compare stage/roster/save integrity. Do not fabricate campaign state, add checkpoints or bypass revision checks. An early legal checkpoint suffices to verify the archive lifecycle here; actual reusable Council banks are produced in 09 after final native edits stabilize.
- [x] Record the explicit executor preparation/capture contract, source invalidation and isolated branch-copy behavior. Protect archived masters from later autosaves; never write to a live campaign through observation helpers. Keep generic executor-lifecycle tests beside the executor and domain/save invariants in canonical game suites.
- [x] Record V-006 evidence, revised source fingerprints and fresh native revision where needed; continue without user approval.

## Validation

Execution modes: Node unit/native integration and directed-browser Continue. Initial filters: `node --test --test-name-pattern='UT-(042|044|045|058|063)|IT-(015|016|021|022|023|024|039|044|059)' rpg-maker/tests/campaign.test.mjs`; append new reconstruction cases. Content CLI must pass after any native recipe edit.

| Verification ID | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-006 | Native saved-stack fixtures and legal Continue journeys | Correct stage/roster; no repeated text or committed effects; incompatible saves retained; New Game works | task-05/<run-id>/continue/ and save-byte-comparison.json |
| D-07 classification | Fixture versus actual checkpoint provenance | No invented autosave capability or unlabeled direct-state journey | task-05/<run-id>/saved-stage-matrix.json |
| QA archive lifecycle | Real checkpoint capture, pre-boot restore and native Continue | Consistent payload/index; unchanged archived master and restored bytes; expected stage/roster; later autosaves affect only the branch copy | task-05/<run-id>/save-archive-lifecycle/ |

Invalidated by save validation, manifest/native recipe changes, helper ancestry, projection/reconstruction code or owner disposal. Source-equivalent historical domain checks may be retained, but new native visual recovery requires current proof. Preserve original and result save hashes.

## Execution Notes

In progress 2026-09-11. Baseline `2026-09-11T08-04-56-272Z` passed UT063 and IT015/016/039; new IT062 failed with missing Gorvak after native Continue advanced to the next profile box. This explicitly synthetic active-text save used actual MZ serialization/storage/Continue, not a new public checkpoint.

Recovery adds104 pure native helpers112–215, one per supported original box plus challenge, named restore.<section>.<box>. They call the same editable entry/focus helpers, so no duplicated runtime layout table exists. Revision mz-20260911-busts-recovery-01. Map start validates the saved root presentation against campaign/inspection authority, derives the box from native index/message wait, refreshes Council projections and reconstructs final effects through a private pure interpreter. Saved helper descendants are replaced by those final effects; root completion authority stays only on the original presentation. During recovery, native campaign interpreter/message start waits for actual images and settled transforms; recovery uses zero-duration effects and never runs text/domain actions. Owned pictures remain hidden during uncalibrated preparation; no fixed recovery sleep is added.

IT062 first repaired run `08-08-15-697Z` passed profile/speech. Expanded `08-11-02-012Z` passed IT062/063: saved in a live helper before text, profile/speech, Council challenge/confession/intervention/two opinion boundaries/solo; missing images/projections rebuilt, following displayed text not replayed, exact expected native completion and saved bytes preserved. A subsequent immediate-command grouping adjustment requires focused freshness validation.

QA archive support uses existing Playwright1.63 storageState IndexedDB capture and newContext startup import, not writes hidden in gameplay reads. The installed runner gained only immutable startup fixture import and read-only capture; no live restore API. Project adapter/helper validates full runtime source hashes, origin/revision, compressed file0/global hashes, persisted index consistency and producer actions. Each consumer receives a fresh copy with omitted-navigation provenance. Three generic storage lifecycle tests passed (capture/immutable load, scope/hash rejection, changed document/collision). Existing unrelated skill input changes were preserved.

The first legal producer captured a valid checkpoint but its assertion incorrectly called the native intro phase prologue; raw failed run08-16-55-475Z is retained and the oracle was corrected to the actual CampaignRules phase. Repaired producer08-18-08-131Z passed; source was then changed for immediate grouping, so a fresh producer08-19-33-322Z supplies the consumer. Normal archive source checks are exact and reject the earlier changed-source copy. Current consumer and remaining persistence/compatibility checks are ongoing.

Current-source run08-21-53-071Z passed18/18 (UT042/044/045/058/063/069; IT014/015/016/021/022/023/024/039/044/059/062/063) and CLI. This includes all nine actual semantic checkpoint stacks, pending sacrifice, terminal replay, native old-layout rejection/New Game, cold-cache saved helper and Council reconstruction. Consumer08-20-01-622Z passed legal capture/import/Continue/reopen/branch isolation; archive-lifecycle-review.json records inspected intro/departure stills. A genuine baseline-revision producer and legal full farewell/terminal journey remain the focused directed checks before closing05.

Baseline producer08-30-21-304Z ran an isolated copy with the immutable original four runtime/layout files and produced an actual mz-20260910-retirement-01 checkpoint. Explicit refusal consumer08-35-29-292Z imported that unchanged native payload/index into the current game: Continue returned to the native title with ready campaign/unchanged bytes; Novo jogo reached intro. Both resulting stills were inspected: usable title and readable new intro, no stale bust. Normal consumers still require exact current runtime fingerprints. The explicitly named incompatibility scenario accepts an older source only to exercise native refusal; it never edits or relabels save contents.

Earlier refusal runs08-31-07,08-32-12,08-33-10,08-33-57 are retained failed harness attempts. Wrong oracles waited for Game_Message or Scene_Load instead of the vendor's evented-title load flow; one wait called isBusy before native windows existed. The final case observes the returned actionable title, exact ready campaign and unchanged native bytes, with pre-install call counts/refusal text independently proven by IT021/059. No runtime save behavior was changed to satisfy this scenario.

Completed05 on2026-09-11. Directed final-sixth-total-loss08-36-01-719Z passed392 legal inputs, actual tab reopen/Continue at H1 pending farewell and terminal eight-death ending; continue-review.json records inspected stills. Full final Council banks/variant acceptance remain09 as assigned, observational/Council mid-box saves are explicitly IT062/063 fixtures. Preservation report records258 sections/282 boxes/63 migrated targets and1234 unchanged files. Task06 owns cancellation during reconstruction and will rerun affected05 cases after lifecycle edits. No save migration, campaign schema/public checkpoint, commits or human acceptance were introduced.
