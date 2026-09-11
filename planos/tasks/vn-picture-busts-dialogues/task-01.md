---
id: "01"
status: completed
depends_on: []
verification_ids: [V-002]
---

# Task 01 — Validate editable native bust recipes and helper calls

## Outcome

An author can supply the approved literal VNPictureBusts commands and pure native helper graph, and receive precise validation before execution. Unsafe or malformed content never reaches vendor evaluation. The pre-migration evidence remains available for later preservation checks.

## Authority

- [Spec](spec.md): RQ-001, RQ-004 and the finite command grammar.
- [Verification](verification.md): V-002; the native graph part of D-10.
- [Programação](vn-picture-busts-dialogues.programacao.md), [inventory](inventory.md) and [ADR-003](adrs/adr-003.md).
- `rpg-maker/README.md`, canonical GDD and repository guidance; [shared execution contract](tasks.md).

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js`; content CLI/native loaders only where needed to keep boot and CLI validation equivalent.
- Read-only vendor authority: `rpg-maker/The Dryland Drowned/js/plugins/VisuMZ_2_VNPictureBusts.js` public header and current `js/plugins.js`.
- Tests: `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/helpers/native-content.mjs` and `rpg-maker/tests/test-manifest.json` for justified new cases. Preserve one serial entry point.
- Fixture/readiness owner: this task captures all current native data, manifest, plugin/config and asset hashes, creates a disposable current-tree test copy, and prepares positive/negative literal helper graphs. Fixtures add no production story.
- Data/assets: inspect CommonEvents, System and picture consumers; no production dialogue migration or asset mutation yet. Baseline capture and schema fixtures are isolated outputs.
- Delete targets: none.

## Checklist

- [x] Capture the dirty-file inventory and immutable pre-change baseline, including 258 passage identities/metadata, 282 text boxes/labels/choices, native IDs and historical source hashes. Verify readback; do not refresh this baseline after migration.
- [x] Inspect every static/dynamic picture consumer before accepting slots 60–65, and the current variable allocation before using 144–146. Record exact allocations and conflicts rather than renumbering existing data.
- [x] Transcribe the six approved vendor command names and exact argument keys/types from the installed header. Implement finite literal validation, scene-valid picture targets, allowed assets/transforms/tone, duration/easing bounds and editor annotations; never evaluate an argument.
- [x] Index uniquely marked trigger-None presentation helpers. Validate transitive native 117 calls, bounded 230 waits, and 111/411/412 equality branches over the three derived Council projections. Validate every branch, reject malformed nesting, unknown helpers, cycles and forbidden mutations.
- [x] Preserve existing text/choice/comment/picture grammar and diagnostic ownership. Pure helpers are effects, not sections containing independently required text or campaign actions.
- [x] Add meaningful positive and negative canonical cases: unknown namespace/command, missing/unexpected args, expressions, malformed arrays/IDs/assets, illegal branches/writes, orphan annotations, recursion and an unsafe untaken branch. Preserve UT-051's rejection of a domain Action inside content; add positive cases for the narrowly allowed VNPictureBusts commands rather than allowing all 357 commands. Prove no sentinel expression executes.
- [x] Verify root versus helper interpreter roles are representable without copying passage completion authority into child helpers; record the contract consumed by 02 and 05.
- [x] Run focused checks in the isolated current-tree copy, retain actual logs/hashes, update V-002 and task tracking, then continue without requesting approval.

## Validation

Execution mode: static structured fixtures and canonical Node unit tests; real native integration only where the helper execution contract needs it. Initial command: `node --test --test-name-pattern='UT-0(47|48|49|50|51|52|53|54|57|60)' rpg-maker/tests/campaign.test.mjs`; add newly registered relevant IDs. Run `node rpg-maker/tools/validate-content.mjs --json` against the unchanged production baseline and controlled fixtures.

| Verification ID | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-002 | Parser/CLI positive and negative fixtures | Exact supported graph accepted; every unsupported path rejected before vendor evaluation | task-01/<run-id>/parser-results.json and test logs |
| Readiness | Baseline readback and fixture inventory | Immutable source available; historical evidence protected; occupied IDs identified | task-01/<run-id>/baseline-manifest.json and fixture-manifest.json |

Invalidated by parser, vendor metadata, command schema, projection IDs or helper graph changes. Preserve baseline bytes permanently for this increment; refresh only executable test copies. V-002 does not prove visible composition or loading timing.

## Execution Notes

Completed 2026-09-11. Baseline readback: 1,238 hashes, 258 sections and 282 boxes; immutable files and full command/metadata ledger are in [baseline](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-01/baseline-20260911/baseline-manifest.json). The native/static consumer inventory uses pictures 1–4, 10–18, 22–44, 50–52 and 71–81; bridge loops additionally own overlays through 89 and reset cleanup. No ordinary owner occupies 60–65. System has 144 entries (0–143), so 144–146 can be appended. Existing CEs end at 67. Engine, vendor, config and asset bytes remain unchanged.

The parser accepts the six exact installed vendor schemas, validates literal bounds and scene slots, and indexes pure helpers separately from passage locations. Branches and transitive calls are validated even when untaken; helpers have no passage entry or completion role. Native command117 creates a fresh child and only Present assigns `_drylandPresentation`; task 02 must preserve that distinction when propagating the transient owner.

[Focused run](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-01/2026-09-11T07-08-48-024Z/tests.log): 12/12 canonical cases passed on Node v22.23.2; [CLI](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-01/2026-09-11T07-08-48-024Z/content-validation.json) passed. UT-067/068 own argument, graph, cycle, annotation, untaken branch and sentinel rejection. The fixture manifest records actual copied source hashes. Syntax and scoped diff inspection passed; no browser claim belongs to V-002. Maintained candidates: parser, canonical fixtures/tests/manifest and baseline/copy scripts; raw outputs remain evidence, separate from unrelated pre-existing GDD/QA changes. No commit.

Independent read-only parser review found and fixed inline conditional terminator handling, orphan code0 acceptance and malformed helper envelopes. UT068 now covers valid inline branches, both orphan zero shapes, malformed list/null/parameters, and chained editor annotations. [Fresh 12/12 + CLI run](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-01/2026-09-11T07-30-41-150Z/tests.log) supersedes the earlier parser source; no native authored data or runtime behavior was changed by these repairs.
