---
id: "01"
status: completed
depends_on: []
verification_ids: []
supporting_verification_ids: [V-001, V-002, V-003, V-004, V-011, V-013]
---

# Task 01 — Initialize campaigns from editor configuration and expose data-only operations

## Outcome

New Game reaches initialized campaign queries using functional editor fields, without depending on editorial metadata or a content revision. Events have typed query, action and explicit reading-completion operations.

## Authority

- [Spec](spec.md): RQ-001, RQ-003–RQ-005, RQ-013–RQ-014, RQ-018.
- [Verification](verification.md): V-001, V-002, V-003, V-004, V-011, V-013.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [audio contract](eventbridge-minimal-runtime.audio.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F01–F07, F12, F19; bootstrap portion of F34–F37/F39.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `Dryland_EventBridge.js`, `Dryland_CampaignRules.js`, `js/plugins.js`; `data/CommonEvents.json` (CE4 configuration, CE67 phase queries), `data/System.json`, a new named `Configuração do jogo` entry in `data/Map003.json` with a direct native call to the selected configuration CE.
- Tests: `native-boot.mjs`, `content.mjs`, `formation.mjs`, `persistence.mjs`, `native-checkpoints.mjs`; adapt `helpers/formation.mjs`, `helpers/campaign.mjs`, `helpers/native-shared.mjs` and `helpers/canonical-cases.mjs` where their setup assumes the old catalog/QA API.
- Fixture and readiness owner: task 01. Own an isolated clean boot and independently specified public configuration, scalar query and stale-action fixtures. Observe native campaign state read-only; retain pure-rule deterministic setup only in integration/domain tests.
- Data/assets: Preserve existing public identities, competencies, pools, route lengths and semantic passage order. Inspect variable/switch allocation before adding IDs beyond the current variables through 146; name every addition. Configuration commands use native editor fields and one configuration Common Event parameter.
- QA/docs: Update plugin help for the new commands and record the selected configuration CE/variables in Execution Notes. Full maintained-guide consolidation belongs to task 14.
- Delete targets: Remove boot editorial/asset enforcement and revision dependencies in database readiness/New Game/load handling together, including revision-only rejection and duplicate envelope audit. Do not delete shared tools or the manifest while pending consumers still need migration; task 14 owns their final removal.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Capture the current CE67-before-stage missing-campaign path as source evidence; reproduce it in the isolated runtime before claiming a runtime defect. Initialize campaign state once before CE queries, never by silently repairing a failed Continue.
- [x] Implement ConfigureHero/Route/Encounter, Query, contextual Action, ReadingComplete and the functional checkpoint interface from the programming contract. Declarations load functional data at database readiness without executing scene commands or mutating an existing campaign. CE4 is not currently called by any map/CE: create the named map entry and its actual native call explicitly, rather than assuming an existing authoring path.
- [x] Put mechanical constants and semantic reading plans in CampaignRules; keep Common Event addresses, picture paths, map transfers and prose in native commands. Queries return scalars/indexed facts without drawing, random draws or campaign mutation.
- [x] Bind stale actions and actual reading completion to their expected context. Remove duplicate Bridge whole-state validation/global-freeze dependencies from these paths; return gameplay rejections to event variables and propagate real failures.
- [x] Remove the boot/revision barriers that would reject later event edits, adapting the affected native load/setup consumers in the same change. Do not regenerate a layout revision to get the new authoring workflow past its old gate.
- [x] Adapt test readiness to native scene/message state rather than waiting for expeditionQA. Keep existing not-yet-migrated content execution functional until its owning task replaces it; add no new legacy registry or dispatch command.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S01 (startup portion), S02 (query/action portion), S03 (configuration), S09E (revision-only loading portion). Remaining journey and human proof belongs to task 16.

Required variants: Clean New Game; repeated configuration execution; missing campaign on load; public label change; living/selected/candidate/route/result/death queries; stale choice and repeated/wrong-context ReadingComplete; same-structure content-revision difference.

Invalidates/reuses: Boot, rules, configuration, query bindings or save-object setup invalidate these outputs. Pure mechanical evidence may be retained only when rules/configuration inputs are unchanged. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-002, V-003, V-004, V-011, V-013 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Initialization precedes CE67; queries leave campaign bytes/facts unchanged; accepted actions/completion occur once; invalid context cannot change a newer phase; native load is not rejected solely for revision. | `docs/qa/evidence/eventbridge-minimal-runtime/task-01/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Execution started 2026-09-12. Baseline IT-001 PASS (Chrome native prologue → tavern); CE67 missing-campaign defect did not reproduce in clean New Game. CE4 now owns editor public names; Map003 event 2 calls it. Variables 147–149 reserved for sequence/reading context. Domain owns mechanical constants and semantic plans. Native migration and focused evidence in progress; no game-readiness claim.


Technical outcome: PASS for task 01. UT-001/002/008–015/017/075 and IT-001/070 passed, including real load of a text-revision-only save and rejection of a missing campaign without repair. First UT-017 failure was its removed editorial competency source; the independent GDD fixture now supplies the same secrecy oracle. Legacy Present/Conversation/choice/save presentation consumers remain assigned to tasks 02–14. No mixed V-ID or human criterion is closed. Evidence: `docs/qa/evidence/eventbridge-minimal-runtime/task-01/20260912/`.

Review correction (2026-09-12): ReadingComplete now uses the context and passage captured on its own Game_Interpreter, so unrelated variable writes cannot replace them. Missing encounter names are rejected during configuration; missing query identities produce descriptive errors. UT-075, IT-070 and IT-001 pass after this change. Explicit native Erase Picture commands complete zero-duration bust exits (shared correction from task04); affected discovery tests are rerun there.
