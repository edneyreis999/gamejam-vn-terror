---
id: "09"
status: in_progress
depends_on: ["08"]
verification_ids: ["V-005","V-006","V-007","V-008","V-009"]
---

# Task 09 — Execute directed QA, collect human decisions and verify delivery

## Outcome

The integrated candidate has truthful directed, visual, audio and human evidence, with all obligations accounted for and an explicit final readiness verdict.

## Authority

verification.md V-005–009/S-01–06/human acceptance and release verdict; task 08 guide/charter; all discipline contracts; ADR-G003–006; SD-015 and F-001 waiver.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: V-005, V-006, V-007, V-008, V-009.

Proposed owner/support: Edney (QA/final verification); João/Maria may execute manual inputs; Pati/UI, Lucas/art and user/audio retain acceptance. Estimated effort: 0.5–2 days per resumable lot; human availability not estimated, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Activate rpg-maker-mz-qa-execution, then rpg-maker-mz-final-verify. Execute the planned candidate through existing native QA owners/registered recipes or supported directed inputs. Write docs/qa/reports/<actual-date>-campfire-hero-bonds.md, update scenario verdicts, verification.md/tasks, and preserve selected accepted captures under docs/qa/deliveries/campfire-hero-bonds/. In-scope defects return to their implementation owners for repair and fresh evidence.
- Tests: Reuse tasks 01–07 canonical receipts if fresh; run only the affected selection after a fix or newly identified risk. No duplicated heavy grid, appearance assertions, legacy Talk waiver test, new runner or manufactured human PASS.
- Fixture and readiness owner: Begin with a new campaign on this candidate or resume only this run's own proven-compatible saves. Public player inputs mutate the campaign; inspect runtime/storage read-only. Record exact origin/profile, candidate/native-list revision and parent-save provenance. A blocked lot does not erase evidence or prevent independent lots.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. The durable QA destinations above are owned by this task.
- Delete targets: None.

## Checklist

- [x] Inventory preexisting apps/servers, identify the candidate and chosen test path, and open only owned resources following local-game-run.md. Preserve the user's sessions and saves.
- [x] Lot A — S-01/S-03, V-006: walk Church and Park native entries plus final 2/2/2 through Council; skip optional reading at least once; observe no next trap at camp. Cover one/two living totals, reserves present/absent, renewed attempt, last-member automatic retreat/bad ending and surviving terminal completion.
- [x] Lot B — S-02/S-04, V-006/007: recent/prior losses, all-dead repeated camp fade versus independent tavern first-return fade, replacement survivor who stayed in town, multiple pending directional reactions, read base without partner then new suffix, and About before/after camp grief with witness/away openings. Cheap enumeration covers other equivalent pair identities.
- [x] Lot C — S-05, V-006/007 with V-002/004 receipts: observe actual input-driven Continue at camp entry, after one grief with more pending, after completed topic, and after continue/retreat; include interruption of an unfinished topic. Reuse fresh harness save-failure evidence as harness evidence, not directed gameplay. F-001 stays waived.
- [ ] Lot D — S-06, V-007/008: mouse/keyboard, input release, HIDE, Options language/mute, normal/reduced motion, PT/EN 1280×720 and one 1920×1080 representative, long labels and 3-living/5-dead plus 1-living/7-dead framing. Observe entry, hero-map conversation, reload and both exits with actual audible fire-only/restored context.
- [ ] Close V-005 with the final loaded/pruned corpus inventory from task 07 and Edney's editorial record from V-009: all 48/8/3/16/16, keys/speakers, contextual alternatives and reveal constraints. Evidence applies to the reviewed text revision, not an old draft oracle.
- [ ] Collect V-009's named human decisions: Edney for complete PT/EN voices/reveals and emotional interest/fatigue; Pati/user for discovery/readability; Lucas/user for composition; user for fire mix/transitions. Pending decisions keep human_accepted/release_ready false.
- [x] Repair in-scope failures at their owners, rerun only invalidated proof, and retain first-failure history. Record covered-risk omissions separately from waivers and blocked/pending checks; no unexecuted pass.
- [ ] Run final verification, reconcile every V-ID and its contributions, preserve the accepted-risk decision and new-campaign limitation, and prepare the devlog moment: camp absence/reaction followed by a tavern About subject with its separate NEW label.
- [x] Close only browsers/tabs/servers/processes opened by this work, including on failure or pause; report confirmed closure or the exact remaining resource. Leave commit, PR, Trello and publication manual and outside this task.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-005 (primary) | Final native inventory + named editorial decision, reusing task 07 | Complete keyed bilingual content, exact participants/branches and no premature revelations; technical and human evidence remain distinguishable. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-006 (primary) | Directed lots A/B/C, S-01–05 | Integrated camp rhythm, retreat, deaths, replacement, ending order and native continuation occur through real inputs. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-007 (primary) | Directed lots B/C/D, captures + input observations | Truthful available-topic indicators, independent camp/tavern effects, safe controls and native resume; accepted legacy Talk exception retained. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-008 (primary) | Lot D listening + runtime audio observations | Fire alone at camp through conversation/Options/reload; route/tavern audio restored on exit without overlapping loops. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-009 (primary) | Named human decisions/date/revision | Editorial, emotional, UI, art and audio acceptance recorded honestly; unavailable humans stay pending. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Use task 08's explicit equivalence/freshness map. Any changed runtime, native-list indices, localized content, plugin/assets or audio parameters reopen the evidence they affect. This task cannot close on stale receipts or unresolved required human acceptance.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Directed 22bbee0c confirms milestones, optional topic/interjection, completed-topic Continue and retreat. Directed d24d71bc confirms recent/prior losses, two ordered reactions with Continue between, incomplete-topic reload, witness/away About and renewed bridge. Captures inspected separately; first fixture failures preserved. All-route/audio and large reduced-roster lots are running. Human editorial/emotional/UI/art/audio decisions remain pending. No commit, stage, PR, Trello or publication.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.

### Final technical handoff

All directed lots now have their technical result: FIRST22bbee0c, LOSSEScc2f8d1f (normal fade61 samples/60 frames at three genuine arrivals), ROUTES731125e8 (all routes through Council, new suffix, PT/Options/mute/HIDE/mouse), LOW-ROSTER5fba5a64 (one/two total living, reduced1920, eighth death), AUTOMATIC-RETURNd2487bd3 (last present death with reserves). The last run's missing result `limits` field was repaired and its already-collected evidence reverified without relabeling the original failed report. See the report and verification receipts.

Code review SHIP; deslop removed an unused test import and retained local style. Final plugin syntax, data/key inventory, whitespace and candidate-source checks pass. All owned resources are closed. G006 equivalence/omissions are explicit in verification.md; no human sensor is silently passed.

**Next action is human review only:** Edney editorial/emotional; Pati/user UI; Lucas/user composition; user actual audio listening/mix. Task09 remains in_progress and release_ready=false until those decisions. Post-acceptance archive/devlog material organization remains pending per final-verify. No staging/commit/publication.

## Presentation follow-up — 2026-10-16

User-approved refinement implemented on the same branch: nameplates/icons in both stages, three-second native absences with matching cleanup, Talk-specific bust framing and continuous interlocutors across reading units. [Verification](verification.md#presentation-refinement) owns fresh evidence and pending human acceptance. Prior captures remain historical.

Refinement checks complete: 61 fast + IT-009/010/011 pass; directed FIRST85fcd9fe, LOSSES9ec06f29, PT/reducedf3ecd89d pass with agent inspection. See verification for failure history, exact scope and human-acceptance limits.
