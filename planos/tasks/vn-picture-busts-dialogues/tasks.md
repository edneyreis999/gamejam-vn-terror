---
status: blocked
approval_status: approved
slug: vn-picture-busts-dialogues
---

# Tasks — Native ensemble dialogue

> **Closure update — 2026-09-11:** the user accepted the consolidated development delivered by [vn-focus-parameters](../vn-focus-parameters/spec.md#accepted-consolidated-delivery--2026-09-11). This document preserves the historical contract, status flags and execution results of this increment; they do not describe a pending task in the current accepted scope. The [current acceptance record](../vn-focus-parameters/verification.md#human-acceptance-and-closure--2026-09-11) owns the final state. Final PNG framing and the historical unavailable-editor sensor remain explicitly deferred; no historical FAIL/BLOCKED result is relabeled as a successful test.


The user requested task creation on 2026-09-11. [ADR-003](adrs/adr-003.md) authorizes this graph and its uninterrupted local execution without another approval round. The [spec](spec.md), [verification](verification.md), [Programação](vn-picture-busts-dialogues.programacao.md), [UI/UX](vn-picture-busts-dialogues.uiux.md) and [Technical Art](vn-picture-busts-dialogues.technical-art.md) contracts govern every task. Creation of this graph does not claim implementation.

## Graph

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Validate editable native bust recipes and helper calls](task-01.md) | — | V-002 | completed |
| 02 | [Keep every tavern conversation continuous](task-02.md) | 01 | V-003 | completed |
| 03 | [Stage the Council ensemble and reflected intervention](task-03.md) | 02 | — (Council implementation and fixture readiness) | completed |
| 04 | [Migrate remaining dialogue and retire automatic bust inference](task-04.md) | 03 | V-001 | completed |
| 05 | [Restore native conversation stages through Continue](task-05.md) | 04 | V-006 | completed |
| 06 | [Preserve reading controls and dispose interrupted conversations](task-06.md) | 05 | V-005 | completed |
| 07 | [Deliver editable recipes, calibrated layouts and a reusable 2x2 example](task-07.md) | 06 | V-008, V-009 | blocked (editor evidence only) |
| 08 | [Plan the remaining directed QA and visual coverage](task-08.md) | 07 | — (QA planning) | completed |
| 09 | [Execute QA, repair defects and complete final verification](task-09.md) | 08 | V-004, V-007 | blocked (V-007; V-008 inherited) |

Execute 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09. The serial order avoids concurrent edits to CommonEvents, EventBridge and the native manifest. Task 07 is the implementation leaf. Tasks 08 and 09 are the single ordered QA planning/execution pair; review and final verification are included in 09. These local workflow tasks are not separate QA backlog cards.

## Coverage

| Verification ID | Primary owner task | Supporting work and final reuse |
| --- | --- | --- |
| V-001 | 04 | 01 captures the baseline; 02/03 migrate their families; 09 checks final freshness |
| V-002 | 01 | Later tasks use the same grammar; 09 reopens 01 only if relevant source changes invalidate proof |
| V-003 | 02 | 01 supplies validation; 03–07 exercise the shared readiness path; 09 consolidates fresh evidence |
| V-004 | 09 | 02–04 implement eligible native recipes and prepare legal scenario coverage |
| V-005 | 06 | 02 establishes ownership; 03–05 supply all stages; 09 consolidates directed evidence |
| V-006 | 05 | 01–04 establish native helper stacks and full composition; 06 checks cancellation during reconstruction |
| V-007 | 09 | 02/03/04/07 calibrate and capture; 09 inspects all required stills and temporal variants |
| V-008 | 07 | One brief editor editability check; all-eight inventory, runtime edit effect and docs outside the editor |
| V-009 | 07 | Shared production grammar/owner, isolated 2x2 fixture and its four focus targets |

Each V ID has exactly one primary owner. Supporting evidence does not duplicate ownership or authorize a task to mark another task's sensor passed. Task 03 has independently verifiable Council checks; its complete campaign/visual acceptance is consolidated under V-004/V-007. QA coordinates reruns through the original owners when evidence becomes stale.

## Cross-task execution contract

- No task, demonstration, scope checkpoint, review or QA step waits for user/discipline approval. Continue to the next dependency-ready task after its required checks. Repair in-scope failures; record genuine technical blockers and continue independent work. Never convert unavailable evidence into PASS.
- All eight tavern heroes and all four families are one required delivery: 32 sections / 72 boxes. No Gorvak-only pilot or later phase for the other heroes. Overall migration remains 63 sections / 103 original boxes, plus staging on the existing Council challenge; preserve all 258 identities / 282 indexed boxes.
- Edney owns programming; the executing agent performs the authorized work and prototype calibration. Pati and Lucas retain UI/UX and art stewardship; their later refinement is non-blocking. Human acceptance stays unclaimed until a real review. No automatic commit, PR, publication or tracker update.
- Use only the current game in `rpg-maker/The Dryland Drowned/`. Preserve vendor/engine bytes, activation/order/global plugin settings, assets, campaign rules, narrative statuses and unrelated pictures. No new campaign facts, project dependency or generic VN framework.
- Capture immutable pre-edit data/plugin/asset fingerprints in 01. The historical GDD hash in source-evidence.json is not rewritten. Materialize the guarded migration beside this spec during implementation; each phase checks prior allocations/content before editing, preserves native IDs and refreshes the manifest with a fresh unused revision.
- The temporary automatic path may service only not-yet-migrated families while 02/03 run. Migrated content must never get both native and automatic busts. Task 04 removes the old path completely; it is not a delivered fallback.
- Canonical tests use Node, real MZ and the Chrome harness. New cases belong to existing suites and `rpg-maker/tests/test-manifest.json`; no duplicate regression suite. Register new IDs only after inspecting current allocation. Run through `rpg-maker/tests/campaign.test.mjs`, preserving serial browser execution.
- Canonical test helpers currently write historical evidence paths. Run them from a disposable copy reflecting the current working tree, including untracked changes, with isolated evidence output. Retain new outputs under `docs/qa/evidence/vn-picture-busts-dialogues/task-NN/<run-id>/`; never overwrite past runs. Fixture manifests must identify actual source hashes. Future output paths named here are not existing evidence.
- For directed gameplay, activate the installed qa-execution skill and follow `docs/qa/guides/native-mz-cycle.md` and the current spec's scenario rows. Use legal player actions, pre-start seeds, one isolated browser context and read-only inspection. Direct state fixtures remain explicitly labeled integration evidence. [ADR-004](adrs/adr-004.md) limits editor use to one brief representative command/parameter editability check. All-eight coverage, authored-change effects, 2x2 and gameplay are checked outside the editor; no repeated editor, save/reopen/export or editor-playtest matrix. Do not import unrelated audio/final-art gates.
- Record the source/revision, Node/Chrome, effective game area, input method, motion mode, variant and actual evidence for each run. Stop only owned servers/profiles/fixtures; preserve user saves and raw evidence. Reuse an existing service only after verifying its owner and served content; the directed runner requires its configured port available.
- [ADR-005](adrs/adr-005.md) authorizes native QA save copies. Task 05 verifies capture/pre-boot restore support, 08 plans the bank, and 09 captures genuine Council/pre-ending saves on the stable native revision. Reuse isolated copies through Continue for repeated suffixes; keep payload/index/provenance intact and producer navigation evidence linked. Different rosters/history or incompatible source revisions need their own valid checkpoint. The initial plan had no archived native save. Task09 now records eight exact-source Council masters and their isolated consumers; see the delivery bank ledger.

## Commands and evidence ownership

Run the content CLI after each native change and revision: `node rpg-maker/tools/validate-content.mjs --json`. Task files give focused existing test filters; append newly registered IDs to those filters. Full final registered verification is `node --test rpg-maker/tests/*.test.mjs` in the isolated test copy. Revision updates use `node rpg-maker/tools/revise-layout.mjs --revision <fresh-unused-id>`; the placeholder is resolved during execution, never reused literally.

`npm --prefix "rpg-maker/The Dryland Drowned" start` launches the local game in Chrome, separately from the brief editor editability check. Directed acceptance uses the installed qa-execution runner, `rpg-maker/qa/directed-adapter.mjs`, and the extended existing journey/surface cases; legacy direct `node --test rpg-maker/qa/*.test.mjs` is not acceptance evidence. Do not run browser suites alongside another task's server on the fixed origin.

Task notes and verification.md are the durable execution record. Task 08 creates the incremental guide/charter and maps current scenario owners; task 09 writes the dated report and selected delivery evidence. Raw logs, fixtures and screenshots remain in unique evidence directories until selectively preserved for the devlog.

## Task authoring validation

Passed on 2026-09-11: nine task files match graph IDs, titles, dependencies, primary verification IDs and pending status; eight dependency edges are acyclic; all nine sensors have exactly one primary owner matching verification.md; task 07 is the sole implementation leaf and 08/09 form the ordered QA pair. All 20 Markdown documents and 148 local links in the spec directory resolve, six initial test filters match existing canonical registrations, execution checkboxes remain unchecked, and whitespace/git diff --check pass.

A read-only independent source survey confirmed native parser/helper lifecycle, all-eight tavern coverage, current save/manifest boundaries and obsolete picture-18 expectations in the existing tests. The task owners explicitly handle those updates. The parent verified that HIDE must preserve dialogue art and kept the new dialogue slots outside interface-only hiding. Temporary migrated/unmigrated coexistence ends in 04; final visual acceptance remains in 09. No browser or implementation test was run to create this plan.

## Next Ready Task

The later ADR-004 editor-QA refinement keeps this graph and ownership unchanged. Editor work is a single brief editability check in 07, with no extra editor cycles in the QA tail. Updated document/link checks are recorded in verification.md; the original authoring counts above remain historical.

No dependency-ready work remains. Tasks01–06 and08 are completed. Task07 is blocked only by the unavailable editor sensor; task09 completed independent QA/review/final checks but remains blocked by V-007 visible prisons and inherited V-008. See [final QA report](../../../docs/qa/reports/2026-09-11-vn-picture-busts-dialogues.md). Resume07 when the representative MZ command field can be inspected; resume09 after a scoped resolution of the locked-art prison requirement. No approval is missing for already authorized work.
