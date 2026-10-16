---
status: in_progress
slug: campfire-hero-bonds
graph_approval: approved
approved_by: Edney
approved_on: 2026-10-16
---

# Tasks — Campfire hero bonds

The specification and technical design were approved by Edney on 2026-10-16. This graph decomposes that baseline and the later accepted-risk disposition; it does not approve the bilingual proposal or the implemented presentation. Implementation tasks01–08 are complete; final directed coverage and human acceptance remain with task09. The draft status in discipline/verification artifacts is not a new product decision: use the explicit approval in [spec.md](spec.md), while preserving pending editorial and human acceptance.

## Graph

Edney approved this task graph on 2026-10-16 ("esta aprovada as tasks"). Approval covers the decomposition, dependencies and verification ownership; execution is recorded below; required human acceptance remains pending.

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Reach camp at route milestones and choose the next move](task-01.md) | — | V-001 | completed |
| 02 | [Remember losses and complete each camp grief reaction once](task-02.md) | 01 | — (contribution only) | completed |
| 03 | [Offer all camp conversations for Gorvak, Elowen, Griznik and Seraphina](task-03.md) | 02 | — (contribution only) | completed |
| 04 | [Complete camp conversations for Bimbren, Liora, Vaelith and Draska](task-04.md) | 03 | — (contribution only) | completed |
| 05 | [Offer contextual tavern subjects about every dead companion](task-05.md) | 04 | V-003 | completed |
| 06 | [Show available unread conversations without disturbing native controls](task-06.md) | 05 | — (contribution only) | completed |
| 07 | [Resume the integrated camp candidate without repeating decisions](task-07.md) | 06 | V-002, V-004 | completed |
| 08 | [Plan the final directed QA cycle](task-08.md) | 07 | — (contribution only) | completed |
| 09 | [Execute directed QA, collect human decisions and verify delivery](task-09.md) | 08 | V-005, V-006, V-007, V-008, V-009 | in_progress |

The implementation chain is deliberately sequential: Rules/Bridge, native hero events, shared Common Events and Languages.tsv have the same integration owner. Tasks 03/04 divide the complete authored corpus into reviewable four-hero batches; neither reduces the required content. Task 07 is the only implementation leaf. The single QA pair is 08 → 09, after that leaf.

## Coverage

| Verification ID | Primary owner task | Supporting tasks |
| --- | --- | --- |
| V-001 | 01 | 07, 09 |
| V-002 | 07 | 01, 09 |
| V-003 | 05 | 02, 03, 04, 06 |
| V-004 | 07 | 02, 03, 04, 05, 06, 09 |
| V-005 | 09 | 02, 03, 04, 05, 07 |
| V-006 | 09 | 01, 02, 07, 08 |
| V-007 | 09 | 02, 03, 04, 05, 06, 07, 08 |
| V-008 | 09 | 01, 02, 08 |
| V-009 | 09 | 03, 04, 05, 06, 08 |

A contribution is evidence for the primary owner, not another closure. Task 08 owns QA readiness and no V-ID. Human acceptance is never inferred from technical receipts.

| Requirement | Implementing tasks | Integration/acceptance |
| --- | --- | --- |
| RQ-001 Milestones | 01 | 07, 09 |
| RQ-002 Camp-only retreat | 01 | 07, 09 |
| RQ-003 Optional conversations | 03, 04 | 05, 07, 09 |
| RQ-004 Arrival narration | 01, 02 | 09 |
| RQ-005 All-dead camp absence | 02 | 09 |
| RQ-006 Directional grief | 02 | 05, 07, 09 |
| RQ-007 Tavern subjects | 05 | 07, 09 |
| RQ-008 Unread signals | 02, 03, 04, 05, 06 | 07, 09 |
| RQ-009 Reading/presentation | 01–06 | 09 |
| RQ-010 Camp audio | 01, 02, 03, 04 | 09 |
| RQ-011 Candidate saves | 01–05 | 07, 09 |
| RQ-012 Complete bilingual content | 01–05 | 07, 09 |

## Authority and execution boundaries

Read [spec.md](spec.md), [verification.md](verification.md), [stories](_user_stories.md), and every discipline contract: [programming](campfire-hero-bonds.programacao.md), [narrative](campfire-hero-bonds.narrativa.md), [UI/UX](campfire-hero-bonds.uiux.md), [technical art](campfire-hero-bonds.technical-art.md), [audio](campfire-hero-bonds.audio.md). Apply the [canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), [ADRs G004–G006](../../../docs/adrs/README.md), [standing directives](../../../docs/_memory/standing_directives.md) and [tracker workflow](../../../docs/_memory/trello-workflow.md). Earlier completed specs remain historical.

- Game paths below resolve under `rpg-maker/The Dryland Drowned/`; suite basenames resolve under `rpg-maker/tests/` at their existing paths. Inspect exact command IDs, callers and free native IDs at execution, never assume the next number is free.
- Preserve the engine and Coreto sources. Domain changes belong in the existing game-owned CampaignRules/EventBridge; the new indicator extension is `js/plugins/Dryland_2_ConversationIndicators.js`, loaded after its providers. No new dependencies, services, build system or dialogue interpreter.
- Native events own scene structure, `Languages.tsv` owns player PT/EN text, and plugins own domain rules. Do not copy prose into rules/tests or synchronize a second prose registry. Task 02 establishes the shared social protocol; later tasks consume it.
- Task 01 includes the schema and death-witness source facts needed by task 02/05. Native event lists and candidate saves evolve during implementation; recreate saves after incompatible edits. Old saves remain unsupported and untouched. No migration or content-revision gate.
- The complete delivery has 48 base topics, eight mapped suffixes, three arrival narrations, 16 grief directions and 16 contextual tavern subjects. Integrate the approved specification's complete writing proposal, with editorial acceptance still pending; do not invent biographies, pair arcs or new assets.
- **Accepted risk F-001:** legacy tavern Talk may lose observational NEW/FAST read state on reload before another successful save. No Talk-only checkpoint, dirty flag, observation revision, sequence-dedup change or dedicated reload/two-Talk test. New social and grief checkpoints remain required. See [user disposition](review-01.md#user-disposition--2026-10-16).
- Answer the repository's eight test questions before adding coverage. Extend canonical suites for rules, persistence and meaningful controls; no automated appearance or translated-prose assertions. Update `test-manifest.json` and `execution-groups.json` together for actual added IDs.
- Each behavior owner prepares a reachable fixture and records its observables. Browser QA mutates only through validated player inputs; inspection is read-only. Use the run's own candidate saves, never injected campaign state, forced seeds, user saves or historical-spec fixtures.
- Record receipts and invalidation dependencies in each task's Execution Notes; update affected durable contracts without claiming acceptance. At coding completion apply the required deslop/final-verification workflow. Commit, PR, remote tracker changes and publication remain outside this graph's authorization.

## Capacity and ownership

Proposed effort uses the tracker workflow's six-hour working day. These are scope estimates, not deadlines or assignments accepted by other people. Calendar starts/ends remain unassigned: each task starts after its dependencies and available owner capacity, and ends when its assigned evidence is complete. Re-estimate or split a task that grows beyond two working days; task 09 uses separately resumable lots. G004 permits organizational adjustments that preserve the approved product and evidence obligations.

| Task | Proposed owner/support | Estimated effort |
| --- | --- | --- |
| 01 | Edney (Programming); Lucas/user for composition | completed |
| 02 | Edney (Programming/Narrative); Lucas/user for framing | completed |
| 03 | Edney (Programming/editorial); João and Maria may support text review | completed |
| 04 | Edney (Programming/editorial); João and Maria may support text review | completed |
| 05 | Edney (Programming/editorial) | completed |
| 06 | Edney (Programming); Pati/user for UI acceptance | completed |
| 07 | Edney (Programming) | completed |
| 08 | Edney (QA planning); João/Maria may support manual scenario preparation | completed |
| 09 | Edney (QA/final verification); João/Maria may execute manual inputs; Pati/UI, Lucas/art and user/audio retain acceptance | in_progress |

## Commands and evidence

Run from the repository root. These are command templates; actual executions are recorded in verification.md. Replace selection/run placeholders with actual registered IDs and a fresh output directory. A successful harness receipt does not substitute for directed or human evidence.

| Reference | Command / rule |
| --- | --- |
| C-FAST | `node rpg-maker/tools/run-tests.mjs --pruned --scope fast --output .artifacts/campfire-fast-<run>` |
| C-FOCUSED | `node rpg-maker/tools/run-tests.mjs --pruned --ids <actual-manifest-ids> --output .artifacts/campfire-focused-<run>` |
| C-LANGUAGE | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' message language validate --format tsv --json` |
| C-QA-PREPARE | `node rpg-maker/tools/prepare-qa-runtime.mjs` — prepares the declared QA tools, not a game fixture |
| C-RECIPES | `node rpg-maker/tools/run-recipes.mjs --ids <actual-recipe-ids> --output .artifacts/campfire-directed-<run>` |
| C-LOCAL | `npm start`, after reading [local-game-run.md](../../../docs/_memory/local-game-run.md); identify existing listeners and save origin |

Existing recipes are registered in `rpg-maker/qa/recipes.json`; CAMPFIRE-DIR-FIRST/LOSSES/ROUTES/LOW-ROSTER/AUTOMATIC-RETURN are registered with explicit request/case files in this spec. Add needed routes to the established native QA owners when justified, register them, then record their real IDs. Never paste a planned ID as an existing command. Use the existing pruning pipeline through `--pruned` for focused checks; no separate build/export/publication task is implied. Evidence must identify the actual loaded/pruned candidate and tool revision.

Static language/content inventories are one-time receipts, not permanent prose-snapshot tests. Use fresh `.artifacts/campfire-*-<run>/` evidence directories and record exact receipts in the owning task. Preserve accepted final captures under `docs/qa/deliveries/campfire-hero-bonds/` when created by task 09.

## QA tail

Task 08 activates `rpg-maker-mz-qa-report`. Reuse `docs/qa/journeys/J-mz-complete-campaign.md`, `J-mz-recovery-export.md`, `J-mz-qa-accessibility.md` and `J-mz-creative-review.md`. Reconcile the existing formation, encounter/retreat, closing, recovery/export, visual/audio, human and HIDE/keyboard scenario owners; create the focused guide/charter and dated report destinations only when executing the QA tasks.

Task 09 activates `rpg-maker-mz-qa-execution`, then `rpg-maker-mz-final-verify`. Its resumable lots cover A: progression/low roster, B: losses/social novelty, C: native recovery, D: UI/audio plus the complete editorial handoff. Each lot records entry, actual inputs, required variants, observable, retained evidence and stop/resume point. Required human judgments remain pending until the named person responds. F-001 stays waived; gamepad, zoom and mobile are excluded, not silently passed.

Keep the demonstrable devlog moment: camp absence/reaction followed by a tavern About subject with its separate NEW label. Capture selection follows the reviewed candidate. Identify and close only resources created by this work, including on failure/pause.

## Next Ready Task

[Task 09](task-09.md). Implementation and QA planning are complete on `feat/campfire-hero-bonds`; technical directed lots are complete; only final human judgments and post-acceptance organization remain.


## Current presentation refinement

The user approved the expanded presentation plan on 2026-10-16. Tasks02/04/05/06 supply the authored delta; task09 owns fresh runtime/visual verification. Implemented: nameplates and icons in both scenes, 180-frame absences, Talk framing and stable conversation participants. Fresh checks and agent visual inspection passed: 61 fast cases, IT-009/010/011 and three directed presentation lots. Human acceptance remains pending. See [verification](verification.md#presentation-refinement).
