---
status: completed
slug: approved-narrative-dialogue-staging
graph_approval: approved
created_on: 2026-09-18
---

# Tasks — Approved narrative integration and dialogue staging

The user-authorized execution of all ten tasks is complete. D-019 added the rustic confinement assets; D-020/021 explicitly waive the remaining audio audition and editor capture. Technical delivery is verified; the user accepted the delivered artwork with “Perfeito” on 2026-09-18. [verification.md](verification.md) records all five delivery flags true for this spec. Existing user changes remain preserved.

## Graph

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Rheed prologue and temporal presentation foundation](task-01.md) | — | —; scoped evidence below | completed |
| 02 | [Hero visits, thresholds and farewells](task-02.md) | 01 | —; scoped evidence below | completed |
| 03 | [Thirty native trap-success replacements](task-03.md) | 01 | —; scoped evidence below | completed |
| 04 | [Both route closures after their earned pieces](task-04.md) | 01 | —; scoped evidence below | completed |
| 05 | [Council revelation and actual witness ensemble](task-05.md) | 04 | —; scoped evidence below | completed |
| 06 | [Three approved endings and terminal routing](task-06.md) | 05 | —; scoped evidence below | completed |
| 07 | [Eight whole-image illustrated epilogues](task-07.md) | 06 | —; scoped evidence below | completed |
| 08 | [Integrated reading and checkpoint continuity](task-08.md) | 02, 03, 07 | V-001, V-002, V-003, V-008 | completed |
| 09 | [Plan the integrated QA cycle](task-09.md) | 08 | —; QA plan readiness | completed |
| 10 | [Execute QA and verify the delivery](task-10.md) | 09 | V-004, V-005, V-006, V-007 | completed |

Recommended execution order is 01–10. Dependency-ready tasks are not permission for concurrent writes: 01/02/04/05/06 share CommonEvents and presentation consumers; 01/04/05 share Rules and fixtures. Serialize edits to those owners and allocate Common Event IDs from the final checkout. Task 03 can be developed independently after 01 when map/test ownership is isolated. No delegation, Trello assignment, dates or remote publication is initiated by this graph.

Task 08 is a behavior slice for safe reading/Continue across integrated scene boundaries, as well as the technical evidence consolidator. Tasks 01–07 must deliver their own source comparisons, fixtures and focused tests; task 08 does not postpone that work or recreate their tests. An implementation task may complete its scoped checklist while an aggregate sensor remains pending.

## Coverage

The eight approved V-IDs are aggregate sensors. Each has exactly one owner for its final verdict; contributions are evidence, not additional primary ownership. QA does not rewrite already passing tests merely to own the final experiential verdict.

| Verification ID | Primary owner task | Required contributions |
| --- | --- | --- |
| V-001 | 08 | 01 prologue/source and art; 03 trap correspondence and untouched text; 04 route closures; 05 Council blocks; 06 endings; 07 eight epilogues, 17 source pages and images |
| V-002 | 08 | 01 six identities; 03 approach/result invariants; 04 order/reward/solo transitions; 05 shared Council plan; 06 outcomes/total loss; 07 eligibility/order |
| V-003 | 08 | 01–07 native interpreter, rendering readiness and final-box completion evidence; 08 integrated boundaries |
| V-004 | 10 | 01/02/04/05/06/07 renders and geometry; source art as oracle; QA actual still/transition inspection |
| V-005 | 10 | 01–07 local control checks; 08 canonical cross-scene controls; QA keyboard/mouse/HIDE/Settings/FAST observations |
| V-006 | 10 | 01 temporal baseline, 04/05 narrator cuts, 06 ending precedence, 08 buffer/restore tests; QA actual listening |
| V-007 | 10 | 01/03/04/05/06 scene/checkpoint entry recipes, 08 two-file save fixtures and integration; QA earned-save provenance and directed Continue |
| V-008 | 08 | 01 combined plugin entries/vendor baseline; 02/04/05 complete consumer inventory; 03 preserved traps; 07 source docs/assets; whole-diff inspection |

| Requirement | Implementation owner(s), each with a distinct slice | Final sensor owner(s) |
| --- | --- | --- |
| RQ-001 | 01/03/04/05/06/07 respective sources; 08 combined fidelity | 08 |
| RQ-002 | 01 prologue; 08 saved opening | 08/10 |
| RQ-003 | 01 prologue temporal composition; 04 route cuts; 05 Council cuts | 10 |
| RQ-004 | 04 route closure flow; 08 reward Continue | 08/10 |
| RQ-005 | 05 Council sequence/cast; 08 saved Council | 08/10 |
| RQ-006 | 06 outcomes; 08 ending Continue | 08/10 |
| RQ-007 | 07 epilogue art/text/eligibility | 08/10 |
| RQ-008 | 01 prologue; 02 hero/threshold/farewell; 04 lover/revelation; 05 Council | 08/10 |
| RQ-009 | 01 temporal baseline; 04/05 new cuts; 06 ending precedence; 08 restore | 10 |
| RQ-010 | Each scene's local completion; 08 cross-scene controls/save continuity | 08/10 |
| RQ-011 | All tasks preserve exclusions; 08 audits integrated scope | 08 |
| RQ-012 | 03 thirty successes and preserved encounters; 08 result Continue | 08/10 |

## Scenario and fixture ownership

Every row retains the execution mode, variants, reuse and invalidation dependencies in [verification.md](verification.md#runtime-scenarios). Task 09 turns them into the executable QA plan; it cannot downgrade a directed scenario to a fixture.

| Scenario | Fixture / observability producer | Primary scenario completion owner |
| --- | --- | --- |
| S-01 | 01 opening and current-version checkpoint | 10 directed opening, both profiles and controls |
| S-02 | 02 all eight visit branches | 10 directed hero visits |
| S-03 | 03 all 30 native results and preservation ledger | 03 native-engine run; 10 checks freshness/completeness |
| S-04 | 02 farewell/threshold, 03 result surfaces | 10 directed expedition |
| S-05 | 04 both route orders and piece boundaries | 10 directed closures in both orders |
| S-06 | 04 solo initial closure; 05 Council 0/1/2/3 and hero-slot recipes; 06 total-loss boundary; 07 epilogue exclusions | 08 assembles domain/native edge proof; 10 inspects eligible renders |
| S-07 | 05 Council plan and ensemble | 10 directed group Council |
| S-08 | 06 outcomes; 07 epilogue continuation | 10 directed ending branches and independent loss trajectory |
| S-09 | 07 all eight native epilogues | 07 native completion; 10 final visual verdict at both references |
| S-10 | 08 save boundary/two-file integration, scene fixtures from 01/03/04/05/06 | 10 directed Continue from earned saves |
| S-11 | 01/04/05/06 cue integration; 08 restore/buffer checks | 10 control observations and actual listening |

## Shared execution contract

- Work only in the declared native game, canonical suites and affected docs. Use the pinned PR heads from the spec; 01 rechecks all five sources, and later tasks verify their own source still matches the accepted revision. If a head moved, compare its delta; do not import new scope silently or merge/cherry-pick the entire PR. Source paths belong to those pinned commits and may be absent locally: obtain the required Git objects and materialize source blobs in isolated temporary storage before comparison/import, without assuming the source directories already exist in the working tree.
- Apply approved native architecture from GDD §26 and the programming contract. Text, picture targets and audio stay in maps/Common Events; rules own progression. Preserve engine/vendor bytes, plugin order, native error handling and user saves. No new dependencies, services, runtime catalogue, global palette filter or QA mutation API.
- Materialize any structured data transformation under this spec's task-local scripts only when needed during execution; use preconditions and focused diffs. No script or runtime change is created during task authoring. Keep IDs stable and native empty CE records. No whole-file deletion is preapproved.
- Each scene task owns fixture setup, readiness, independent source/rule oracle, final-box observability and teardown. Reuse canonical helpers with temporary profiles/copies; synthetic fixtures are labeled technical evidence, never played campaigns. Directed state changes use player input only; inspection is read-only.
- Run the task's registered cases with `node --test --test-name-pattern='<actual owned case IDs>' rpg-maker/tests/campaign.test.mjs`. Resolve the real IDs from the manifest; extend existing suites before adding cases. Record exact commands, source/candidate hashes, tools and results. Task 08 runs `node --test rpg-maker/tests/*.test.mjs` once for the integrated candidate. Repeat only affected stale/failing checks.
- For live runs, read [local startup guidance](../../../docs/_memory/local-game-run.md), then use `npm start` at the repository root. Node 22+, Python 3 and desktop Chrome are the existing environment. Check port ownership before reusing 18726; preserve origin/profile for Continue. Shut down only owned processes and close temporary profiles after evidence is safe.
- Store raw evidence under `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-NN/`. Canonical runners may retain their existing evidence paths; record the actual output path and hashes rather than claiming a copied or renamed run. Maintain summaries in the task, graph and verification owner.
- Task 10 owns final visual/listening judgments and game-delivery flags. No source screenshot, domain PASS or successful recording automatically satisfies a played, visual or heard criterion. No new editorial approval of accepted sources, deferred solo/trap rewrite, venue/ending art production, old-save migration, native zoom or browser/mobile matrix.
- Team roles remain those in [trello-workflow.md](../../../docs/_memory/trello-workflow.md): Edney for programming, Lucas for art, Pati for UI/UX, João/Maria for narrative/manual tests. These are consultation roles, not new assignments or deadlines. Source/tuning choices already delegated stay delegated.

## Preflight and known risks

Read-only authoring inspected the current native baseline at `82aad84dd5df2376e18d53720747fae8d8c0e9ac`, the approved contracts, canonical Node test owners, current QA scenario files and bug history. No preflight blocker remains. Source freshness is intentionally rechecked at implementation entry; no new remote status is claimed here.

The old [shared portrait bug](../../../docs/qa/bugs/BUG-20260911-tavern-portraits-offscreen.md) was corrected on 2026-09-15; changed global defaults require fresh consumer checks, not reopening its historic verdict. The [lover prison visibility issue](../../../docs/qa/bugs/BUG-20260911-lovers-prison-not-visible.md) remains a concrete risk for 04/10: inspect the actual composition and do not infer confinement from a zero movement offset. This graph does not authorize new art or treat that criterion as passed. An evidenced conflict requiring a design change must be recorded at that boundary while independent tasks continue. The [pause-indicator issue](../../../docs/qa/bugs/BUG-20260911-pause-indicator-clipped.md) informs 07's new text segmentation; the [accepted memorial wording issue](../../../docs/qa/bugs/BUG-20260909-memorial-survivors-total-loss.md) does not authorize an unrelated rewrite.

## Next Ready Task

None: tasks01–10 have completed execution. The user has accepted the generated rustic stone/tree output; no implementation or acceptance blocker remains under D-019–021. IT-052/053 passed again against the revised artwork;132 unaffected canonical cases retain their evidence. The original aggregate FAIL remains historical, not relabeled.

See [QA report](../../../docs/qa/reports/2026-09-18-approved-narrative-dialogue-staging.md) and [verification](verification.md). Nothing staged, committed or published.
