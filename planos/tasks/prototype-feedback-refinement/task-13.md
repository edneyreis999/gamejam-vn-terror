---
id: "13"
status: in_progress
depends_on: ["12"]
verification_ids: ["V-001/LIVE", "V-002/LIVE", "V-003/LIVE", "V-004/LIVE", "V-005/LIVE", "V-006/LIVE", "V-007/LIVE", "V-008/LIVE", "V-009/LIVE", "V-010/LIVE", "V-011/LIVE", "V-012/LIVE", "V-013/LIVE", "V-014/LIVE", "V-015/LIVE", "V-016/LIVE", "T-001", "T-007"]
---

# Task 13 — Execute QA, repair and verify delivery

## Outcome

Close the remaining selected live/native-editor/rendered/audio/human evidence for the integrated candidate, repair in-scope defects and run final verification. Aggregate V requirements close only after their technical and live portions are reconciled. No automatic commit or publication.

## Authority

Read [tasks.md](tasks.md#shared-execution-contract), [spec.md](spec.md), [verification.md](verification.md), all five approved discipline contracts, task 12's guide/charter and existing bug/evidence history. Activate `rpg-maker-mz-qa-execution`, followed by `rpg-maker-mz-final-verify`. Preserve native campaign QA, SD-015 own saves and ADR-G004–G006.

## Scope

- Game surfaces: the complete approved increment, using the single native implementation and final assets.
- Canonical tests: reuse fresh results from tasks 01–11; run the integrated canonical entry and targeted reruns when changes, failures or unresolved cross-surface risks justify them. Inspect exact selected cases, no zero-test pass.
- Fixtures/readiness: task 12 gathers behavior-owned recipes. This task owns actual new candidate campaigns, compatible own saved branches and recorded provenance for directed execution. Technical fixture installs are never played-campaign evidence.
- Evidence: `docs/qa/evidence/prototype-feedback-refinement/<run>/`; durable dated report `docs/qa/reports/<date>-prototype-feedback-refinement.md`; scenario/bug status updates; accepted devlog artifacts in `docs/qa/deliveries/prototype-feedback-refinement/`.
- Delete targets: none. Close only resources opened by this execution; preserve personal saves and preexisting sessions.
- Repairs: route failures to the actual native/domain owner, retain evidence of the original defect, rerun the failed/distinctly affected sensors and reconcile invalidation. Do not weaken expected results, skip failed cases as redundant or modify engine/vendor/Coreto.

## Resumable lots

| Lot | Entry and coverage | Required variants and observation | Completion checkpoint |
| --- | --- | --- | --- |
| A — Opening and preparation | New candidate campaign through public title; S-001 | Both gated entry paths/cancellation and fresh checkbox; exact complete prologue; hero visit/selection/removal/rejection, picture/name/container and keyboard; map selection versus Partir; empty/deceased board and Options/save where reached | Title-to-first-expedition journey observed; source receipts linked; own campaign/save provenance and pending later-state variants recorded |
| B — Sacrifice and returns | Own naturally reached failed encounter; S-002 | Non-first selected victim, farewell then named consequence, one saved death; old/new/multiple deaths; a return with older deaths and no new death; voluntary/automatic retreat; consultation returns without replay; normal/reduced motion | Actual sacrifice-to-tavern journey and timing evidence; distinct return risks resolved or explicitly carried to C |
| C — Route closure and recovery | Own campaigns at first/second completed initial routes; S-003 | Full closing sequence before black pause/fade, then separate absence; no duplicated reward; introduction saved-before/saved-after and read-without-save; actual same-file manual write/Continue, pending/success focus and incomplete formation; last-success semantics supported by T-003 failure receipt | Both distinct route-closing sequences and real persistence boundary observed; current compatible own saves indexed |
| D — Final decision and closing | Own campaign/unaltered compatible branch reaching Council; S-004 | Deliberate Reunir and Destruir; no input carryover; complete cemetery including longest/maximal contents; eligible/excluded epilogues and no-epilogue branch; present audio without applause, uninterrupted hero succession, mute/settings, available Continue and credits cleanup | Both voluntary outcomes and applicable total-loss/no-epilogue risks covered; artifact/source/save dependencies pinned |
| E — Authoring, fit and acceptance | Integrated candidate plus retained A–D evidence; T-001/T-007 | Changed plugin-command fields authored/saved/reopened in native Editor on isolated copy; 1280×720 and 1920×1080; distinct portrait speaker/listener families; final text bounds; human UI/art/narrative-transcription/pacing and audio listening judgments selected by verification.md | Fresh technical receipts and all live/acceptance portions reconciled, known bugs retested, delivery/devlog archive and teardown recorded |

The lot order may be reorganized under ADR-G004 when it preserves actual dependencies and evidence. Do not force unrelated setup repetition. Each omitted heavy repeat needs the ADR-G006 rationale and a real representative; insufficient evidence or a failed case stays pending/failed.

## Checklist

- [ ] Inventory candidate revision, relevant hashes, existing apps/processes, origin/profile and prior resources before any launch; read local-game-run.
- [ ] Check all implementation receipts and planned entries; execute selected integrated/targeted cases without treating fixture results as gameplay.
- [ ] Complete lots A–D using validated player inputs and read-only native/storage observations, preserving own-save provenance and recording actual expected/observed outcomes.
- [ ] Complete T-001's native authoring/save/reopen gap and T-007's final measurements/screenshots; static metadata or geometry alone cannot replace these selected live sensors.
- [ ] Obtain and record the required human judgments against concrete frames/clips/listening samples; prior product/design approval is not this delivery acceptance.
- [ ] Reproduce/retest the three reported bugs; for in-scope failures, repair the root cause and rerun affected proof before closing. Keep unrelated findings separate without scope expansion.
- [ ] Reconcile every V/TECH and V/LIVE portion, T sub-scope, omitted repeat, waiver and remaining risk in verification.md and durable QA. No criterion may disappear between tasks.
- [ ] Preserve final assets and selected devlog material outside raw evidence; record provenance and make delivery links usable without the ignored evidence tree.
- [ ] Run final verification, record only supported readiness states, and confirm cleanup of owned tabs/apps/servers even if execution blocks. Commits and PRs remain manual.

## Validation

| Primary verification IDs | Sensor / execution mode | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001/LIVE–V-016/LIVE | S-001–004 directed-browser; screenshots/video; read-only audio/state measurements; explicit selected human judgments | All approved player outcomes in verification.md at the supported sizes, without replacing state/input/audio claims by weaker sensors | Dated report, scenario/bug links and raw run/manifest |
| T-001 | Consolidated source receipts plus native Editor authoring/edit/save/reopen on isolated candidate copy | Correct source/IDs/command metadata reaches native authoring; no changed vendor/engine source or obsolete active consumer | Report and scoped Editor/source receipt |
| T-007 | Actual native text/bounds observations, screenshots and visual review | Complete gate/names/rumors/consequences, unclipped portraits and full cemetery text, both supported sizes | Report and captures with dimensions/content hashes |

Freshness: changed content, event lists, field/schema/commands, save cursor, UI/provider configuration, assets/fonts, return timing, audio or outgoing scenes reopen their dependent evidence. Reuse only evidence whose candidate/runtime/inputs still support the exact claim. Raw logs, screenshots, recordings and human statements remain distinct.

## Completion boundary

Completion requires the selected technical/live/human criteria or a specifically authorized disposition, no unresolved in-scope failure and a supported final-verification verdict. If a required tool or human judgment is unavailable, record the exact remaining criterion and retained evidence; do not declare delivery ready. Task graph or D-025 approval does not waive it.

## Execution notes

Manual-feedback exception, 2026-09-25: the user requested title controls matching Options. The bounded correction and fresh title-only QA are recorded in [task 01](task-01.md#manual-title-correction--2026-09-25). Broader campaign execution remains paused. CE002 changed, so earlier title captures are historical and exact-source archive reuse requires a new compatibility assessment; this correction does not accept the full spec or close remaining LIVE/human criteria.

User steering, 2026-09-25: automated continuation paused to receive and critically evaluate manual feedback before further corrections. Preserve the current implementation and evidence; do not launch remaining campaign variants until that feedback is handled or the user resumes the loop. Physical-first run `a1afddb0-7ca9-410a-b6c5-98052ddb9825` and normal-motion loss run `9d5bb1f4-1524-4e19-b4f8-1efc46db7687` both finished with exit 0 / executed-awaiting-review. Collection is not delivery acceptance. The loss run completed before the pause; no listener remained on 18726. Remaining review, variants, Editor and human criteria stay pending.

Active 2026-09-25. Tasks 01–11 technical receipts and task 12 planning are ready. The current guide/charter owns selected A–E journeys. Candidate freeze, integrated selection, public-input campaigns and native Editor round-trip are next; no directed or human PASS is claimed yet.

Integrated preparation, 2026-09-25: initial IT-045/059/022/079 run `2026-09-25T18-02-49-084Z` preserved failures in the test/environment layer: a bare boot-time global, Windows symlink privileges, a deadline while replaying expanded inscriptions, and the installed runner incorrectly treating Windows sibling paths as inside its fixture. The runner's containment check now uses the platform separator (authorized protected-path edit through repair-directed-windows.mjs); its two existing WebM/WAV/storage/video tests passed, 2/2, exit 0, after installing the declared Playwright FFmpeg/Winldd cache prerequisites. Game dependencies and vendor sources are unchanged. The follow-up integrated run is in progress; IT-045 passed, while IT-059 exposed another bare boot-time global at a later reopen boundary. No evidence was discarded or reclassified as a gameplay pass.

T-001 Editor sensor: the installed `RPGMZ.exe` was opened and its unique returned window selected. Native Computer Use capture failed with `encode latest capture frame failed: window crop is outside captured monitor`; refreshed window selection/activation and the one permitted capture retry failed identically. No authoring mutation was attempted. Native authoring/save/reopen remains blocked on that sensor; source metadata alone will not close it. Other QA lots continue. The window opened by this execution must be closed during final teardown.

The [candidate audit](candidate-audit.md) is a pre-acceptance read-only proposal, including exact local hashes and explicit keep/archive/defer groups. Historical one-shot mutation scripts are not advertised as reusable final-tree commands. No archive move, deletion, staging or commit has occurred.

Focused integration `2026-09-25T18-21-16-183Z`: IT-059/079/UT-073 passed (3/3, exit 0, 145.4s). The broader `UT-` run `2026-09-25T18-15-06-511Z` selected 62; 61 passed and UT-073 failed in fixture preparation before the Windows junction correction. Retain those 61 rule scopes plus the corrected UT-073 receipt, not a fictional new 62/62 invocation. IT-045's current scope is retained from `18-11-20-482Z`. IT-022 now has a prepared per-passage elapsed/stage observer and a 720-second bounded replay: its nine closing traversals are materially larger than the four-outcome IT-048 run measured at 279.9s. The diagnostic rerun remains pending; prior timeouts are unresolved until it completes or yields a specific stall.

Directed request `refinement-physical-first-20260925-01` is collecting in run `e55d4926-4c51-41d7-95bc-7539a019cec7`. The optional reuse entry reported no verified Windows browser probe and correctly used ordinary preparation/execution. The initial title/gate/prologue prefix and hero visits are being captured; no complete campaign verdict yet. Runtime observations and actions are recorded separately. The current return observer also samples ordinary hero-map conversations while phase is already formation; those rows must not be credited as expedition-return evidence. A narrower phase-transition predicate is prepared for subsequent runs, preserving this first causal prefix.

Editor teardown: the owned PID 41968 was verified as started at 15:07:47, then closed after normal UI closure failed to release it. Protected process termination was authorized; subsequent process inventory found no RPGMZ process. No Editor mutation or personal campaign write occurred.

Review repair F-001: the independent runtime review found six title/notice plates omitted from CE351, violating the asset contract. The strengthened IT-074 failed for exactly those six names (`2026-09-25T18-34-52-573Z`), then `fix-review-preload.mjs runtime` added only their preload entries. Final `2026-09-25T18-56-40-949Z` selected IT-022/085/074: 3/3 PASS, exit 0, 377.5s. IT-022 completed all repeated endings in 293.5s and its current-root progress.json identifies each native paused box by stage, semantic identity and actual message text. The independent runtime review's round 2 is SHIP for its static scope; all other 39 recorded runtime hashes remain unchanged. No render, listening or Editor acceptance is inherited from this verdict.

The first directed run e55 was interrupted by a recorder transport defect: WAV stop returned an unbounded numerical sample array, causing Playwright/Node `ERR_STRING_TOO_LONG` before report.json could be persisted. Its browser.log, screenshots, opening archive and partial video remain preserved, with no complete collection or cleanup claim. No listener remained on 18726 afterward. The recorder now keeps compact PCM blocks and transfers at most 16,384 frames per message; the regression first failed on the old payload, then all eight recorder/runtime tests passed. The correction is in the installed skill, authorized through repair-pcm-transfer.mjs, not in game audio. A new request `refinement-physical-first-20260925-02`, run `7261ce4b-ac35-434f-9d52-d2f1a005f111`, starts fresh on the final preload candidate.

Directed run 7261 FAIL: the eight conversations, incomplete save, selection/removal/full-party rejection and first departure were collected. After DEPART the campaign was dungeon_intro on Map004, but CE3 resumed formation: CE39's Exit Event Processing terminates only the child. Board access then triggered the preserved map-owner assertion. This is not Lot A PASS. Task 04 reopens for this gameplay defect. Strengthened IT-087 first hit an asset load error (19-13-47-757Z; file confirmed present), then the unchanged retry 2026-09-25T19-14-46-826Z reproduced the formation assertion. fix-departure-owner.mjs adds a parent exit after CE39 transfers, preserving local Voltar. IT-008/041/087 rerun pending.

Recorder follow-up: 7261 preserved its report but audio cleanup exceeded 15 seconds. The 16,384-frame numerical transfer above is historical. The current repair transfers 262,144 frames as bounded binary/base64 chunks, avoiding numerical JSON serialization. Its regression uses 600,001 varied stereo samples, compares the complete WAV byte-for-byte with the reference encoder, checks original-sample RMS and resource cleanup. Eight audio/runtime support tests passed, exit 0, 7.6s. Installed skill changes are materialized in repair-pcm-transfer.mjs; game audio is unchanged. Actual long-capture cleanup remains to be proven. Other 7261 resources closed: touch, input log, capture session, context, browser, video and service. No listener remained on 18726.

Verification peer review withdrew F-007: candidate-audit.md is written before file hashes are read. F-006's bounded binary transport test is resolved; its technical scope is SHIP, separate from the directed failure, Editor and human gaps.

Departure repair technical closure: `2026-09-25T19-16-26-435Z`, IT-008/041/087 selected 3, PASS 3, exit 0, 158.5s. The next native surface is the expedition introduction, while local cancellation and route progress remain correct. Only CE3 changed; CE39 already ended its child. CommonEvents SHA256 `408979e6d1c444ff8334bdcacab9fa97e567e5ec3e5ae0e5705b9f6e90ca6541`. Task 04 technical scope is complete again; no LIVE inheritance. Fresh request physical-first-03 is collecting in run `a1afddb0-7ca9-410a-b6c5-98052ddb9825`.

Manual feedback increment, 2026-09-26/27: the hero composition and dialogue corrections are owned by [task 03](task-03.md#manual-composition-and-dialogue-correction--2026-09-26). Its narrow technical/directed/agent-visual receipts supersede the old hero-plate appearance only. Full-loop execution and human acceptance remain pending; do not reuse historical plate screenshots as current evidence.
