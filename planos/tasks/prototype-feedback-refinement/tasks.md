---
status: in_progress
slug: prototype-feedback-refinement
spec_approved_under: D-025
graph_approved: true
graph_approved_on: 2026-09-24
graph_approved_by: user
execution_started: true
---

# Tasks — Prototype feedback refinement

D-025 approves the full spec/verification/five-discipline set. Execution is active under the user's authorization. Tasks 01–11 have completed their technical scopes; task 13 is in progress. Live and human delivery acceptance remain pending.

## Execution approval

On 2026-09-24, after the [task audit](review-tasks.md), the user explicitly authorized: “pode aprovar o grafo para execução”. This approves all thirteen tasks, their dependencies and verification ownership for execution. No further initial graph approval is required. Product and technical decisions remain governed by D-016/D-025; implementation, test results and human delivery acceptance retain their separate pending states. The audit preserves the earlier, pre-approval snapshot.

## Graph

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Separate title and fresh age acknowledgement](task-01.md) | — | V-001/TECH, T-004/GATE | completed |
| 02 | [Integrate the welcoming prologue and proportional narrator framing](task-02.md) | — | V-003/TECH | completed |
| 03 | [Unify hero interactions, approved speech and narrative choices](task-03.md) | 02 | V-007/TECH, T-004/HERO_CHOICE | completed |
| 04 | [Make expedition preparation lead to the illustrated destination map](task-04.md) | 03 | V-002/TECH, T-002, T-004/DESTINATION | completed |
| 05 | [Replace the tavern roster with the deceased names board](task-05.md) | 03 | T-004/BOARD | completed |
| 06 | [Make sacrifice targets commit the chosen victim and name the consequence](task-06.md) | 03 | V-008/TECH, V-012/TECH, T-004/SACRIFICE, T-005 | completed |
| 07 | [Stage completed-route returns and all deceased absences](task-07.md) | 04, 06 | T-006/RETURN | completed |
| 08 | [Expose tavern settings and a safe current-campaign save](task-08.md) | 04, 05, 07 | V-016/TECH, T-003, T-004/SAVE | completed |
| 09 | [Present the final decision as two deliberate equal panels](task-09.md) | 03 | T-004/FINAL | completed |
| 10 | [Keep the complete final cemetery text readable](task-10.md) | — | V-015/TECH | completed |
| 11 | [Narrate eligible epilogues with continuous present-day audio](task-11.md) | 07, 09, 10 | V-010/TECH, T-006/AUDIO | completed |
| 12 | [Plan the durable QA cycle](task-12.md) | 01, 08, 11 | QA-PLAN | completed |
| 13 | [Execute QA, repair and verify delivery](task-13.md) | 12 | V-001/LIVE–V-016/LIVE; T-001; T-007 | in_progress |

Implementation leaves are 01, 08 and 11. Task 12 depends on every leaf; task 13 depends on task 12. There is one ordered QA pair. Tasks 01, 02 and 10 have no functional dependencies; a safe serial order is 01→02→03→04→05→06→07→08→09→10→11→12→13. Shared-file writes must remain serialized even where the functional graph permits independent work. Task 08 integrates the board layout from 05, map/reading state from 04 and stable return boundary from 07; task 11 follows the revised ending/return/memorial consumers.

## Coverage

The parent V IDs remain the approved requirement/sensor aggregates in verification.md. For ownership only, `/TECH` identifies their selected static/source/domain/integration portion and `/LIVE` identifies their directed, rendered, audio-state and human portion. Rows without a TECH portion retain their selected live-only closure; this does not add a new mandatory sensor. An aggregate passes only after all its applicable portions pass or receive an explicit authorized disposition.

| Verification ID | Primary implementation owner | Primary live/acceptance owner |
| --- | --- | --- |
| V-001 | [01](task-01.md): V-001/TECH | [13](task-13.md): V-001/LIVE |
| V-002 | [04](task-04.md): V-002/TECH | [13](task-13.md): V-002/LIVE |
| V-003 | [02](task-02.md): V-003/TECH | [13](task-13.md): V-003/LIVE |
| V-004 | —; technical setup remains with the behavior task | [13](task-13.md): V-004/LIVE |
| V-005 | —; technical setup remains with the behavior task | [13](task-13.md): V-005/LIVE |
| V-006 | —; technical setup remains with the behavior task | [13](task-13.md): V-006/LIVE |
| V-007 | [03](task-03.md): V-007/TECH | [13](task-13.md): V-007/LIVE |
| V-008 | [06](task-06.md): V-008/TECH | [13](task-13.md): V-008/LIVE |
| V-009 | —; technical setup remains with the behavior task | [13](task-13.md): V-009/LIVE |
| V-010 | [11](task-11.md): V-010/TECH | [13](task-13.md): V-010/LIVE |
| V-011 | —; technical setup remains with the behavior task | [13](task-13.md): V-011/LIVE |
| V-012 | [06](task-06.md): V-012/TECH | [13](task-13.md): V-012/LIVE |
| V-013 | —; technical setup remains with the behavior task | [13](task-13.md): V-013/LIVE |
| V-014 | —; technical setup remains with the behavior task | [13](task-13.md): V-014/LIVE |
| V-015 | [10](task-10.md): V-015/TECH | [13](task-13.md): V-015/LIVE |
| V-016 | [08](task-08.md): V-016/TECH | [13](task-13.md): V-016/LIVE |

| Technical scenario / scope | Primary owner | Scope boundary |
| --- | --- | --- |
| T-001 | 13 | Consolidate source/native inventory receipts from behavior tasks; complete changed-command Editor authoring/save/reopen evidence. Do not rerun valid source comparisons solely to duplicate their receipt. |
| T-002 | 04 | Per-preparation completion, guards, schema normalization and saved/unsaved restoration. |
| T-003 | 08 | Actual current-file write, pending/success/failure, safe saved cursor and late-result cleanup. |
| T-004/GATE | 01 | Title/notice entry, cancel, fresh acknowledgement and gesture release. |
| T-004/HERO_CHOICE | 03 | Hero targets and shared narrative-choice focus/input/cleanup behavior. |
| T-004/DESTINATION | 04 | Map targets, selection versus departure, back/locked route controls. |
| T-004/BOARD | 05 | Observational board target, return focus and cleanup. |
| T-004/SACRIFICE | 06 | Eligible victim targets and immediate irreversible-action input boundaries. |
| T-004/SAVE | 08 | Settings/save controls and pending/success notice focus/lifecycle. |
| T-004/FINAL | 09 | Two final targets and single deliberate ending action. |
| T-005 | 06 | Saved actual victim, single permanent consequence and resumption. |
| T-006/RETURN | 07 | Genuine return arming, simultaneous motion, one barrier and restoration. |
| T-006/AUDIO | 11 | Epilogue context entry, continuity, preferences, no applause and final exit. |
| T-007 | 13 | Final rendered bounds at both supported sizes, all distinct portrait families and longest/maximal content. |
| QA-PLAN | 12 | Durable journey/scenario/charter/run-plan handoff without executing or closing gameplay criteria. |

T-001–007 and S-001–004 are scenario descriptions, not additional copies of V expectations. Reuse an evidence artifact across matching rows rather than performing a duplicate test. T-004 and T-006 are split only by owned behavior; the complete parent scenarios require every listed portion. Every primary ID appears in exactly one task's frontmatter.

Cross-slice proofs remain explicit: V-002/TECH in task 04 covers the persisted introduction fact and restoration; task 08's V-016/TECH/T-003 proves the actual manual write that records it. V-009/LIVE in task 13 combines task 03's shared narrative-choice style with task 09's final variant. V-016/LIVE combines task 01's gated Continue entry with task 08's current-file semantics. These are reused complementary receipts, not two primary owners for the same criterion.

## Shared execution contract

- Read root AGENTS.md, the approved spec/verification/contracts, [Trello workflow](../../../docs/_memory/trello-workflow.md), [ADRs](../../../docs/adrs/README.md), and affected code before execution. Apply `rpg-maker-mz-execute-task` for an individual approved task, or `rpg-maker-mz-loop-tasks` for an authorized graph run. No runtime execution or commit is requested by task authoring.
- The only game is `rpg-maker/The Dryland Drowned/`. Paths described as game-relative resolve there. Content belongs to native events; rules to CampaignRules; integration to EventBridge; transient input/presentation to Presentation. Engine, VisuMZ/vendor code, `coreto/` and Coreto plugins stay immutable. No new dependency, build, remote service, provider migration or speculative plugin is added.
- Scope owners are execution responsibilities, not team appointments. Programming coordination follows Edney; final technical art Lucas; UI/UX Pati; narrative/manual-review support João/Maria per project workflow. No person has been assigned, scheduled or messaged, and no Trello card is created by this graph.
- CommonEvents.json, System.json when allocating named switches/variables, shared plugins, manifest and shared scene assets are shared write surfaces. A task must inspect the latest working copy and coordinate serialization; never regenerate whole data files from an old snapshot or revert another contributor's edits. Reinspect references before allocating a helper ID. Use only approved native authoring surfaces, not forwarding-only map events.
- Each behavior task owns its technical fixtures, public entry recipe and proof that the effect can be observed. Isolated harness fixtures may install controlled state; they never certify a played campaign. Directed QA starts a new candidate campaign and uses only validated player input. Reuse only its own compatible saves with recorded provenance; no personal/other-spec saves, event jumps, seed setters or storage rewriting.
- Apply the canonical suite owner in the task. The documented root command is `node --test rpg-maker/tests/*.test.mjs`; focus with `node --test --test-name-pattern '<actual-case-pattern>' rpg-maker/tests/campaign.test.mjs`. Record the actual registered case IDs, count and exit/result, rejecting zero-selected-test runs. Node 22+, Python 3 and installed Chrome are the documented test prerequisites. Do not add Jest or a per-spec regression suite, or revive removed validate-content commands.
- Unit/native harness cases belong to implementation tasks; task 13 reuses valid receipts and closes distinct integration/live/editor/visual/audio/human gaps. Run the aggregate at the integrated candidate boundary when needed; do not repeatedly run unrelated heavy coverage without a new risk. ADR-G006 requires equivalence evidence for omitted repetitions, preserves representative E2E, and excludes gamepad/native-zoom testing under G005/G003.
- Before launching/reusing the game, read [local-game-run](../../../docs/_memory/local-game-run.md). Root `npm start` serves the documented origin `http://127.0.0.1:18726/`; preserve origin/profile for Continue, one active game tab and preexisting resources. Close only owned apps/tabs/servers at session end, including failure/blockage; record actual teardown.
- Raw results go under `docs/qa/evidence/prototype-feedback-refinement/`; durable receipts belong in task notes and dated QA reports. Future evidence paths are destinations, not existing proof. Keep expected, observed, pending, blocked, waived and omitted-for-covered-risk separate. Product/technical approval is not implemented human acceptance.
- Final assets are required before delivery. No filesystem deletion is planned. Removal of obsolete commands/bindings is scoped per task; audit consumers before any later deletion proposal. No mass data rewrite, historical-evidence rewrite or personal-save replacement is included.
- Preserve the devlog sequence: title→notice→formation→Ivaí/map→Partir; named sacrifice→return/absence→names board; final choice→Rheed epilogue with present audio. Task 13 retains accepted frames/clips in `docs/qa/deliveries/prototype-feedback-refinement/` with provenance and without QA overlays.
- ADR-G004 permits organizational reordering and evidence-owner transfer that preserve outcomes and required sensors. Update tasks.md, affected task frontmatter and verification.md together; transferring a criterion does not close it. Store durable execution notes here and in task files, not a separate memory tree. Commits, PRs, remote messaging and Trello operations are outside this authoring action.

## Next Ready Task

[task-13.md](task-13.md) is active, followed by the dependency-safe sequence above. Tasks 01–11 technical receipts and pending live obligations are recorded in their execution notes. Shared data mutations remain serialized.

## Authoring validation

Checked on 2026-09-24: 13 pending tasks, 40 uniquely owned criterion portions including QA-PLAN, an acyclic dependency graph, matching graph/frontmatter dependencies and statuses, and one QA tail covering all implementation leaves (01, 08, 11). All 239 local links/heading anchors across the 26 spec/task documents resolved; canonical suite paths and Markdown table column counts were valid. The scoped diff check found no whitespace errors.

The required read-only inventory subagent checked affected native owners, prior contracts, assets and suites. The graph accounts for shared tavern layout and downstream cleanup through 08 depending on 05 and 11 depending on 07; cemetery task 10 has no artificial prologue dependency. Final checks confirm that spec, verification and all five discipline contracts are approved. No new product decision, implementation test, game launch, screenshot, audio capture or remote operation occurred during task authoring.
