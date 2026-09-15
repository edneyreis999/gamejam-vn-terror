---
status: in_progress
slug: eventbridge-minimal-runtime
---

# Tasks — Minimal EventBridge and native editor authorship

**Atualização — 2026-09-15:** os bustos compartilhados do Conselho e das oito despedidas foram corrigidos e passaram nos testes e na inspeção visual. A [verificação atual](verification.md#correção-dos-bustos-compartilhados--2026-09-15) encerra o bloqueio técnico de enquadramento; task16 permanece blocked-verify somente pelos quatro pareceres humanos. Registros anteriores de defeito/escopo pendente são históricos. Mudanças ainda locais, sem commit ou atualização do PR.


The FAST-only amendment accepted on 2026-09-14 is recorded in [ADR-004](adrs/adr-004.md) and [verification.md](verification.md); prior AUTO execution remains historical.

The approved [spec](spec.md), [verification](verification.md), five discipline contracts and ADR-001–003 remain the behavior authority. [Review 02](review-02.md) permits task decomposition; its SHIP verdict does not certify the game.

This graph was authored on 2026-09-12 against base `5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb` and the existing approved working-tree spec set. Its original baseline contains **14 implementation tasks and one ordered QA planning/execution pair**. Execution started on 2026-09-12 at the user’s request. Tasks 01–14 have their assigned technical evidence. Those baseline technical sensors were verified. The historical ADR-005 extension added two implementation tasks and reopened affected verification. The user subsequently accepted its architecture and organization under [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md); the current status is recorded below.

## Graph

**Current expansion — 2026-09-14:** [ADR-006](adrs/adr-006.md) adds tasks19–29. The user authorized the complete graph. Tasks17–29 have their assigned technical evidence, including MAV-001–012 for the expansion. Task29 completed the consumer/canonical join with preserved full-run and focused-correction evidence; the reused task15/16 QA tail follows it. The original Gorvak organization approval retains its scope.

**Historical experimental extension, 2026-09-14:** [ADR-005](adrs/adr-005.md) added tasks17/18 after baseline14 with explicit user authorization on `experiment/gorvak-interaction-map`, then reused task15/16. Their implementation evidence remains historical; the current expansion reopens the same QA pair after task29.

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Initialize campaigns from editor configuration and expose data-only operations](task-01.md) | — | — (technical contribution) | completed |
| 02 | [Run the prologue and eight hero interactions through native calls](task-02.md) | 01 | — (technical contribution) | completed |
| 03 | [Author tavern formation, destinations and roster in events](task-03.md) | 02 | — (technical contribution) | completed |
| 04 | [Run encounters, sacrifices and route discoveries through native events](task-04.md) | 03 | — (technical contribution) | completed |
| 05 | [Run Council, endings and eligible epilogues natively](task-05.md) | 04 | — (technical contribution) | completed |
| 06 | [Show one-time tavern absences and a prepared-asset memorial](task-06.md) | 05 | — (technical contribution) | completed |
| 07 | [Preserve native picture and event continuity without Bridge reconstruction](task-07.md) | 06 | — (technical contribution) | completed |
| 08 | [Preload every tavern image through CoreEngine and retain default loading](task-08.md) | 07 | — (technical contribution) | completed |
| 09 | [Gate provider AUTO and FAST to completed reading units](task-09.md) | 07 | — (technical contribution) | completed |
| 10 | [Keep HIDE, keyboard control, reduced motion and VN map behavior outside Bridge](task-10.md) | 09 | — (technical contribution) | completed |
| 11 | [Save and continue separate campaigns through SaveCore checkpoints](task-11.md) | 10 | — (technical contribution) | completed |
| 12 | [Apply live ME volume through the presentation layer](task-12.md) | 10 | — (technical contribution) | completed |
| 13 | [Finish or skip native rolling credits exactly once](task-13.md) | 05, 10 | — (technical contribution) | completed |
| 14 | [Remove obsolete policies and complete live consumer/documentation migration](task-14.md) | 08, 11, 12, 13 | V-004, V-013 | completed |
| 17 | [Experimental Gorvak interaction map](task-17.md) | 14 | EXV-001 | completed |
| 18 | [Remove map authoring shortcuts](task-18.md) | 17 | EXV-002 | completed |
| 19 | [Migrate Elowen, Griznik and Seraphina to their own interaction maps](task-19.md) | 18 | MAV-001 | completed |
| 20 | [Migrate Bimbren, Liora, Vaelith and Draska to their own interaction maps](task-20.md) | 19 | MAV-002 | completed |
| 21 | [Author the prologue directly in Map002](task-21.md) | 20 | MAV-003 | completed |
| 22 | [Prove campaign-map handoff through Gorvak's epilogue](task-22.md) | 21 | MAV-004 | completed |
| 23 | [Author the remaining seven epilogues in their existing maps](task-23.md) | 22 | MAV-005 | completed |
| 24 | [Author Reunir, Destruir and Perda total in their existing maps](task-24.md) | 23 | MAV-006 | completed |
| 25 | [Author the Council and medallion choice in Map023](task-25.md) | 24 | MAV-007 | completed |
| 26 | [Prove map-owned encounter execution with A1](task-26.md) | 25 | MAV-008 | completed |
| 27 | [Author A2–A8 in their existing encounter maps](task-27.md) | 26 | MAV-009 | completed |
| 28 | [Author B1–B8 in their existing encounter maps](task-28.md) | 27 | MAV-010 | completed |
| 29 | [Remove remaining displaced Common Events and verify the complete migration](task-29.md) | 28 | MAV-011, MAV-012 | completed |
| 15 | [Plan the current native QA cycle](task-15.md) | 29 | — (planning only) | completed |
| 16 | [Execute resumable QA and verify delivery](task-16.md) | 15 | V-001–V-003, V-005–V-012, V-014, EXV-003/004, MAV-013/014 | blocked-verify |

The native-content sequence is 01 → 02 → 03 → 04 → 05 → 06 → 07. Loading (08) and reader/UI controls (09 → 10) then have separate dependencies. SaveCore (11) follows the migrated UI/native lifecycle; credits (13) follow closing and input. The audio slice (12) follows 10 so the presentation adapter has one ordered creation/integration path; 11/12/13 then have independent behavior scopes but still share some files. Task 14 joins all implementation leaves **08, 11, 12 and 13**. For the historical ADR-005 increment, task17 followed14, task18 followed17 and task15 then depended on18. For the current expansion, the serialized chain is **18 → 19 → 20 → 21 → 22 → 23 → 24 → 25 → 26 → 27 → 28 → 29 → 15 → 16**. Task22 proves the campaign-map handoff; task26 proves the complete A1 encounter lifecycle. Task29 joins all implementation work; task15 now depends on29 as the sole leaf. No new task depends on the earlier pending human judgments in task16.

Logical independence is not permission to overwrite shared files: CommonEvents.json, plugins.js, System.json and the project plugins have multiple contributors. Serialize writes to these files or explicitly reconcile disjoint changes. Reserve appended CE/variable/picture IDs from the current checkout; do not preallocate conflicting IDs in separate tasks. These documents do not assign dates or publish Trello cards. Edney is the default programming contact, Lucas owns memorial framing, Pati owns UI judgment, and João/Maria can support native narrative editing/manual checks under the [team workflow](../../../docs/_memory/trello-workflow.md).

## Coverage

Each V-ID has exactly one primary owner. Supporting tasks prepare fixtures, prove the observable technical behavior and attach evidence; they do not independently close the same V-ID. Mixed-sensor rows remain pending until task 16 consolidates all selected sensors. Task 15 owns no product verification criterion.

| Verification ID | Primary owner task | Technical evidence producers | Remaining sensor/reference |
| --- | --- | --- | --- |
| V-001 | 16 | 01, 03–06, 11 | S01, S02, S10; domain/native integration and directed campaign |
| V-002 | 16 | 01, 02, 04, 09 | S02; query/reread non-mutation and exactly-once completion |
| V-003 | 16 | 01–06, 14 | S03/MAS-07; native map edits, functional shared selectors and non-JavaScript author acceptance |
| V-004 | 14 | 01, 14 | Static and isolated native supported-command/metadata-free execution |
| V-005 | 16 | 02–06, 10 | S02/S03; native editor and actual visual/playtest UI |
| V-006 | 16 | 02, 04, 05, 07, 11 | S04; native continuity, visual participants and playtest |
| V-007 | 16 | 04, 06, 10 | S05/S10; absences, 0/1/3/8-death memorial and framing acceptance |
| V-008 | 16 | 08, 14 | S06/S06T; native loading, editor list and directed tavern presentation |
| V-009 | 16 | 02, 09, 10, 11 | S07/MAS-05; FAST-only controls and per-campaign reading eligibility |
| V-010 | 16 | 03, 06, 09, 10 | S07/S08; HIDE, focus, gesture, VN controls and UI human judgment |
| V-011 | 16 | 01, 04, 05, 07, 09, 11, 13 | S09/S09E plus startup/terminal paths; current-file save and failure handling |
| V-012 | 16 | 12 | S11; native buffer integration, actual audio observation and human judgment |
| V-013 | 14 | 08, 14 | Static/import audit, full canonical tests and local packaging inspection |
| V-014 | 16 | 13 | S12; native roll, actual visual end/skip and saved ending |
| EXV-001 | 17 | 17 | Native H1 map, formation and reading identities |
| EXV-002 | 18 | 18 | Exact shortcut inventory and surviving native consumers |
| EXV-003 | 16 | 17, 18 | Directed interaction, visual inspection, Continue and representative families |
| EXV-004 | 16 | 17, 18 | Human authorship, navigation and framing judgment |
| MAV-001 | 19 | 19 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-002 | 20 | 20 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-003 | 21 | 21 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-004 | 22 | 22 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-005 | 23 | 23 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-006 | 24 | 24 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-007 | 25 | 25 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-008 | 26 | 26 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-009 | 27 | 27 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-010 | 28 | 28 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-011 | 29 | 29 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-012 | 29 | 29 | [Expansion sensor and scenario contract](verification.md#map-authorship-expansion--2026-09-14) |
| MAV-013 | 16 | 19–29 | MAS-01–06: directed player input, visual/audio observations and real Continue |
| MAV-014 | 16 | 19–29 | MAS-07: native editor demonstration and scoped human judgments |

The four pending implementation human judgments in verification.md are owned once by task 16: non-JavaScript authoring (V-003), UI/reading/control feel (V-005/V-009/V-010), prepared memorial framing/composition (V-007), and perceptible audio response (V-012). Prior spec/design approvals remain accepted; they do not pass these later observations.

| Requirement | Implementation tasks | Primary verification IDs |
| --- | --- | --- |
| RQ-001 | 01, 03–06, 11 | V-001 |
| RQ-002 | 02–06 | V-003 |
| RQ-003 | 01–06 | V-003 |
| RQ-004 | 01, 14 | V-004 |
| RQ-005 | 01, 02, 04, 05, 09 | V-002 |
| RQ-006 | 03, 04, 06 | V-005 |
| RQ-007 | 02, 04, 05, 07 | V-006 |
| RQ-008 | 04, 06 | V-007 |
| RQ-009 | 08 | V-008 |
| RQ-010 | 02, 09 | V-009 |
| RQ-011 | 03, 06, 09, 10 | V-010 |
| RQ-012 | 11 | V-011 |
| RQ-013 | 01, 04, 05, 07, 11 | V-011 |
| RQ-014 | 01, 14 | V-004 |
| RQ-015 | 01 (phase queries), 12 | V-012 |
| RQ-016 | 13 | V-014 |
| RQ-017 | 09, 10, 13 | V-010 |
| RQ-018 | 02–06, 14–16 | V-003, V-013 |

The programming contract's F01–F43 responsibility inventory is allocated in the individual tasks. Shared removal is final only after every associated caller has migrated. Task 14 audits the complete list rather than becoming an unbounded implementation catch-all.

## Execution contract

- Use the real game at `rpg-maker/The Dryland Drowned/`, with engine/provider bytes and relative vendor order preserved. Keep Bridge after CampaignRules and the approved local Presentation adapter after its providers; the two project plugins do not call/read one another.
- Use direct native Common Event calls and native/provider selectors for content, maps and images. No Bridge dispatcher, replacement asset manifest, custom image-ready wait, loading interception, seeded runtime QA console or editorial boot gate is authorized.
- Task 01 removes boot/load revision and editorial blockers before structural event migration. Old internal execution code may survive only while an existing caller is still waiting for its owning task; add no alternate legacy registry or new dispatch contract. Each task removes its obsolete call sites with their replacement. Task 14 removes the final shared residue and validates the whole candidate. Do not deliver an intermediate disabled or half-migrated Bridge.
- Historical pre-implementation inventory (2026-09-12) ended at CE081 and Map036. Its allocation counts and instructions to create a configuration-map shortcut described the original baseline before tasks01–14; they are not current execution instructions. The expansion inventory (2026-09-14) has Common Event slots through CE351 and maps through Map037. Configuration remains directly editable in CE004, without restoring its removed editorial shortcut. Reconcile live IDs and consumers against the [expansion inventory](spec.md#map-authorship-expansion--2026-09-14) before allocation or deletion; preserve unrelated IDs, null retired CE slots and retain the MapInfos hierarchy.
- Current tests use `node:test`, the native Chrome harness and the single `rpg-maker/tests/campaign.test.mjs` entry. Canonical suites live in `rpg-maker/tests/suites/`, helpers in `rpg-maker/tests/helpers/`, and registration in `rpg-maker/tests/test-manifest.json`. No Jest/dependency installation or duplicate regression entry is planned.
- Read [local-game-run.md](../../../docs/_memory/local-game-run.md) before `npm start` or server reuse. Use `http://127.0.0.1:18726/` and a dedicated test profile for browser saves. Inspect occupied ports; keep the same origin/profile for Continue and stop only resources created by the current run.
- During development narrow `node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs` to the actual registered IDs of the owning suites. Task 14 runs `node --test rpg-maker/tests/*.test.mjs` once on the integrated candidate. Later reruns require changed dependencies, a failure or a remaining gap.
- Check changed project plugins with `node --check` and run `git diff --check`. Do not run validate-content/revise-layout to legitimize edits; their retirement is part of the approved scope.
- Integration may use clearly labeled isolated rule/native fixtures and controlled loader/I/O failures. Directed browser journeys mutate campaign state only through player actions; observation is read-only, without seed injection, synthetic saves disguised as earned progress or a shipped replacement QA API.
- Prefer [reusable native checkpoints](verification.md#reusable-native-checkpoints-for-decision-testing) for repeated decisions and presentation variants. Play the shared prefix once, preserve its genuine native autosave as an immutable QA archive, then load an unchanged copy in a fresh isolated context for each alternative. Record ancestry/omitted navigation and execute the decision under test through Continue and native player inputs. Multiple slots do not preserve earlier autosaves automatically; task 11 owns usable boundaries, 14 the existing archive-tool migration, 15 the bank/branch plan and 16 actual production/reuse. Keep one fresh complete campaign and the distinct A/B file-isolation checks.
- Store raw outputs under `docs/qa/evidence/eventbridge-minimal-runtime/task-NN/<run>/`. They are future ignored outputs, not required authoring inputs. Record revision/dirty-file inventory, relevant hashes, engine/provider/tool versions, viewport and save origin/profile. Only applicable evidence is reused.
- Keep the task's status/decisions in its existing file and this graph; `verification.md` owns game readiness. Preserve Confirmado/Baseline de protótipo/Pendente/Fora do escopo. Existing portrait/prison defects and provisional prose/art remain explicitly bounded; no silent creative redesign or inherited visual PASS. New memorial derivatives must be usable assets and receive their own framing judgment.
- Preserve the Gorvak map→native edit→game devlog demonstration, paired with the memorial and speed-2 credits. Task 16 selects real captures after applicable acceptance. Commits and publication remain manual and outside this graph's automatic execution.

## Preflight and lifecycle risks

| Surface | Owner/tasks | Sensor |
| --- | --- | --- |
| Functional metadata, initialization, pure rules and state queries | 01 | Native boot and canonical rule/query tests; S01/S02 |
| Native routing, event pages, interpreters, variables and transfers | 02–07 | Content/native inventory, explicit completion/choice tests; S03/S04/S10 |
| Picture layout, death bookkeeping, memorial derivatives and native screen recovery | 03–08 | Native fixtures plus actual visual/editor observation; S04/S05/S06/S06T |
| Reading history, provider modes, HIDE, input, menu and reduced motion | 02, 09–10 | Native controls/shared UI plus directed/human checks; S07/S08 |
| Save file identity, asynchronous checkpoints, ordinary load/failure | 01, 07, 11 | Persistence/native checkpoints, storage observations and isolated I/O; S09/S09E |
| Native audio and live ME volume | 01, 12 | Native audio, actual audible playback and human judgment; S11 |
| Rolling credits and terminal cleanup | 13 | Native integration plus visual/end/skip journey; S12 |
| Plugin metadata/order, tools, current docs and packaged dynamic assets | 01, 08, 14 | Source/import/package audit and full canonical tests; V-004/V-013 |
| Battle, engine/vendor rewrites, remote services and general game preload | Excluded | No additional implementation or sensor inferred |

No design approval gap was found: approved spec/verification and review-02 are present. Older memory/README/QA recipes still describe file0, expeditionQA, revision gates and instant skip; the GDD §26 and ADR-001–003 supersede those procedures. Tasks 14–15 migrate current guidance while retaining historical provenance. The old editor exclusion and prior loading guarantees are likewise superseded by S03/S06/S06T, not carried into this graph.

## Next Ready Task

**Current branch:** tasks01–15 and17–29 are completed. Task16 is executing the expanded QA tail and records the picture-framing repair, current directed results and remaining sensors. The user authorized uninterrupted execution of the plan. No additional implementation task is waiting; human decisions remain scoped in verification.md.

**Historical deferral, superseded by ADR-005:** topic 1 of task16's human review now owns the [42 map-authoring shortcut candidates](task-16.md#follow-up-do-tópico-1--remover-atalhos-de-autoria-nos-mapas). The user chose removal as follow-up but explicitly requested no execution yet. That no-execution instruction was superseded by the explicit request to implement tasks17/18 on this branch; its architecture and organization were subsequently accepted under ADR-G001/G002. Other assigned human judgments remain in verification.md.

**Parent baseline before ADR-005:** no implementation task was ready or incomplete. [task-16.md](task-16.md) retains the four explicit human judgments in the [concrete review packet](verification.md#concrete-human-review-packet). Technical lots, native editor/zoom, source review and checkpoint provenance are complete. Resume by recording reviewer/date/decisions, repairing only any rejected affected criterion, then organizing accepted delivery media. Do not replay completed campaigns or infer human approval from this execution request.

## Authoring checks

PASS — initial task-decomposition consistency, 2026-09-12, before the later save-reuse amendment. Checked 16 task IDs/frontmatter entries against this graph, all 18 requirements, exactly one primary owner for each of the 14 verification IDs, an acyclic dependency graph, the 08/11/12/13 integration join and the ordered 15→16 QA tail. All 224 local Markdown links resolve; table structure and whitespace checks pass, including new untracked files that git diff --check alone does not cover.

Candidate disposition: keep this graph for dependencies/coverage and task-01.md through task-16.md for their distinct implementation/QA outcomes, scopes and evidence ownership. The candidate is 17 new Markdown files, with no runtime, asset, test or save mutation. All 16 fingerprinted pre-existing inputs, including the approved spec set, GDD/interview/known issue and unrelated speaker-scale interview, remained unchanged. The index was untouched; no commit or publication occurred.

The approved spec set is pre-existing untracked input in this checkout and must accompany a later versioned handoff. Required maintained guide/skill links resolve to repository files; future raw-evidence paths are labeled outputs. Statements that no task graph existed in the approved authoring/review snapshots describe their earlier phase; this document records the subsequent decomposition without rewriting those frozen inputs.

Only source inventory and document checks were performed, including a read-only subagent survey of native callers, tests and tools. No game/test run, visual/audio sensor or human implementation judgment is claimed. Task execution remains pending, and verification.md's game-readiness flags are unchanged.

### Historical experimental closeout — 2026-09-14

The 18-task graph is acyclic, and all 18 verification IDs (14 baseline plus four experimental) have one primary owner. Tasks17/18 are implemented and technically verified; task15's extension is complete. The aggregate focused canonical result contains 22 passing IDs, with failed runs and their corrections retained. Directed normal/reduced and actual MZ editing are recorded by task16. At that checkpoint, no full 130-case rerun, human acceptance, commit or publication was claimed, and ADR-005 remained Experimental. The subsequent user acceptance promoted its two decisions to ADR-G001/G002; see the current branch status above and verification.md.


## Map-authorship expansion coverage and ownership — 2026-09-14

| Requirement | Implementation owners | Primary criteria |
| --- | --- | --- |
| MA-001 Seven hero interactions | 19,20 | MAV-001/002 |
| MA-002 Prologue | 21 | MAV-003 |
| MA-003 Campaign-map handoff | 22,26; applied by23–28 | MAV-004/008/012 |
| MA-004 Epilogues | 22,23 | MAV-004/005 |
| MA-005 Three endings | 24 | MAV-006 |
| MA-006 Council including irati.03 | 25 | MAV-007 |
| MA-007 Sixteen encounters | 26–28 | MAV-008/009/010 |
| MA-008 Displaced CE retirement | Every slice19–28; final reconciliation29 | MAV-011 |
| MA-009 Reading/state/checkpoints | Every implementation slice; final join29 | MAV-001–010/012/013 |
| MA-010 Presentation/input/audio | Local owners19–28; shared integration29 | MAV-012/013/014 |
| MA-011 Actual map editing/current package | Local owners19–28 and audit29; QA15/16 | MAV-011/013/014 |

Programming ownership stays with Edney; native narrative review can involve João/Maria, Technical Art framing belongs to Lucas and UI judgment to Pati. These are discipline responsibilities, not remote assignments or calendar commitments. CommonEvents/MapInfos and shared drivers serialize through the chain even when content blocks could otherwise be researched independently.

Each slice is complete only after its migrated body and displaced-CE retirement have their assigned evidence. Task29 resolves transitive candidates such as CE080/081 after all hero conversations move, CE076 only if all actual callers disappear, and CE041/262 after their final narrative consumers/selectors are replaced. Still-used helpers remain with a recorded functional reason. Do not retain dead CEs for editorial convenience or delete them merely because call117 count is zero.

Lower-priority follow-up outside this graph: tavern CE003 orchestration in Map003 and a dedicated credits map. Destination/roster panels, shared sacrifice, memorial animation, configuration, preload and checkpoint/audio helpers keep their functional contracts.

All32 verification criteria (14 V,4 EXV,14 MAV) have one primary owner. The29-task graph has28 completed tasks and task16 blocked-verify. MAV-001–012 have implementation/join evidence; MAV-013/014 belong to the remaining QA tail. The authoring and task19 snapshots below preserve their original dates and scope.


### Expansion authoring audit — 2026-09-14

Historical snapshot before task19 execution; the current graph above supersedes these initial pending counts.

**Historical snapshot — PASS for planning documents only, before task19 execution.** The 29 task frontmatters match the graph, dependency/status rows and coverage; the graph is acyclic, task29 is the sole implementation leaf and15→16 is the only QA tail. All32 V/EXV/MAV criteria have one primary owner; the14 new MAV rows match their owners and remain Pending. All11 MA requirements and seven MAS scenarios have implementation/sensor coverage. New tasks19–29 are pending; no implementation has run.

Keep the11 new task files as execution owners, ADR-006 as rationale/retirement authority, and the amended spec/verification/five discipline contracts as the current plan. Reopened QA15/16 preserve their completed historical notes. GDD/general ADR index/links and the current QA guide distinguish the planned expansion from the implemented Gorvak baseline. New required links resolve within the maintained candidate; ignored run paths are explicitly future evidence outputs. Read-only source/suite survey confirmed retirement boundaries, including the Council's irati.03 and memorial inscription consumers.

Review corrections distinguish the historical CE081 inventory from the current CE351 allocation boundary. Tasks22/25 explicitly own their epilogue/Council branches of persistence case IT-062: serialized map/event identity and continuation replace the obsolete requirement for a child Common Event interpreter, while picture, campaign, audio and saved-byte assertions remain meaningful.

The planning delta contains27 Markdown files:12 new and15 amended, with no runtime/test/tool/asset/save mutation or index change. Source fingerprints were compared against the pre-authoring checkout; pre-existing user and implementation edits were preserved. Local links, headings, ownership and whitespace checks pass. Candidate inventory and detailed validation remain local outputs under `.artifacts/map-authorship-plan-20260914/`. This audit does not pass any pending game or human criterion and performs no commit/publication.


### Task19 execution and handoff — 2026-09-14

Historical task19 snapshot; its next-task statements were superseded by execution of tasks20–29.

[Task19](task-19.md#result--2026-09-14) completed H2–H4 in Maps038–040 and removed CE006–008/086–097. MAV-001 has technical PASS from14 affected canonical cases, with final framing/fixture revalidation and explicit evidence equivalence for unchanged cases. The task owns the exact ledger, calibration, failed signals and local evidence paths; [verification.md](verification.md#task19-technical-verification--2026-09-14) owns readiness. Task20 is next; no later task was executed. Directed/editor/human sensors and the final canonical join remain pending.


### Current execution stop — 2026-09-14

28 tasks completed; task16 blocked-verify after the available QA execution. No implementation task remains ready to start. Resume only the [documented technical/visual/human gaps](task-16.md#final-expansion-handoff--2026-09-14); the implemented migration and CE retirement are complete. The aggregate is not release-ready.


A [ADR-G003](../../../docs/adrs/adr-g003-excluir-testes-de-zoom-nativo.md) exclui o sensor de zoom nativo do trabalho restante da task16. O [final verify do PR13 em 2026-09-15](verification.md#final-verify-do-pr13--2026-09-15) retirou localmente a seleção legada de zoom e verificou seis casos canônicos. Retomada limitada aos defeitos visuais e aceites humanos; não há mudança nos 28 estados completos nem no bloqueio da task16.
