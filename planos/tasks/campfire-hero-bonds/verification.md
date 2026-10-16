---
status: in_progress
implemented: true
static_verified: true
runtime_verified: true
human_accepted: false
release_ready: false
---

# Verification — Campfire hero bonds

Current result: implementation, static checks and machine-observed runtime behavior pass. Human editorial/visual/audio acceptance is pending. Documentation checks at spec authorship remain historical. Apply G003–G006: no zoom/gamepad suite; group equivalent heavy cases without omitting distinct phase, death, input or save risks.

## Sensor matrix

| ID | Requirement | Sensor | Setup/inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001/002 | Existing pure campaign suite | Reach positions 2/4 through valid actions, all three routes, 1–3 living participants | One camp between completed consequence and next reveal; unrestricted camp retreat; no trap retreat | fast05 UT-006/007/029–031; IT-013; directed731125e8/5fba5a64 | Rules, roster/route data | pass |
| V-002 | RQ-001/002/011 | Existing retreat/encounter/persistence suites | Continue, retreat, renewed attempt, loss of last member; reject stale actions | Correct position and unchanged assignments/deaths; no duplicate reward/ending | fast05 encounter/retreat/endings/persistence; native01; directed731125e8/5fba5a64; automatic d2487bd3 post-collection receipt | Rules/Bridge/checkpoint ownership | pass |
| V-003 | RQ-003–008 | Existing formation/content/retreat coverage | Every canonical pair, presence/death permutations by representative state, all topic IDs | Only eligible speakers; correct tone; once-per-direction grief; available unread units | UT-076/077; one-time404-row inventory; directedcc2f8d1f and731125e8 | Pair metadata, rules, event branches | pass |
| V-004 | RQ-007/008/011 | Existing persistence/native-checkpoint suites | Save/load around start/completion, composed topic gains interjection, language change | Incomplete remains unread; committed units survive; no double completion; candidate native cursor | UT-078; expanded IT-014 checkpoints02; cc2f8d1f interrupted topic/per-grief Continue;22bbee0c completed-topic Continue | Native lists, rules, save hooks | pass; F-001 waived |
| V-005 | RQ-004–007/012 | Static + editorial | Enumerate authored topics and both locales; inspect branch participants and reveal constraints | 48 bases, 3 arrivals, 8 interjections, 16 camp grief, 16 tavern subjects; all referenced keys/speakers exist | 881 keys;48/8/3/16/16 inventory; editorial handoff below | Native data/Languages.tsv after integration | static pass; editorial pending |
| V-006 | RQ-001/002/004–006/011 | Playtest | Directed new campaign, camp arrival, loss, retreat, replacement party, Continue | Integrated progression and loss behavior through actual inputs | five directed cases, current reports and native storage; details in QA report | Candidate game revision and native lists | pass |
| V-007 | RQ-003/005/007–009/011 | Playtest + visual | Optional/repeated conversation, unread interjection, tavern About, HIDE/Options/load | Reachable correct topics and truthful indicators; distinct camp/tavern effects | cc2f8d1f normal temporal fade;5fba5a64 reduced1920;731125e8 PT/Options/HIDE/mouse; inspected PNGs | Events, indicator extension, plugins/assets | technical pass; human pending |
| V-008 | RQ-010 | Audio + playtest | Entry, hero-map visit, mute, reload, continue and retreat | Fire alone at camp; native context restored, no duplicate loops | 731125e8 WebAudio recording + native Fire1/mute/restoration/start-time observations | CE067/camp audio events/assets | runtime capture pass; human listening pending |
| V-009 | RQ-009/010/012 | Human | Read bilingual proposal; view/hear representative candidate scenes | Character voices, natural translation, no spoilers, readable labels and comfortable pacing | Named owners and concrete review material below | Reviewed text/art/audio revision | pending human |

## Commands and canonical ownership

Run from the repository root. Actual execution receipts are recorded below; the command templates were unexecuted at specification time.

| Scope | Project-declared command | Last result | Revision/tool version |
| --- | --- | --- | --- |
| Fast behavior | `node rpg-maker/tools/run-tests.mjs --pruned --scope fast --output .artifacts/campfire-fast-20261016-05` | 61 pass | Source hashes in receipt; Node22.23.2 |
| Focused existing cases | IT-013/014/018/019; expanded IT-014 | pass | Native01/checkpoints02 receipts |
| Directed runtime preparation | request-evidence via installed qa-execution | isolated candidates prepared | Every request records sources/processes |
| Directed recipes | CAMPFIRE-DIR-FIRST/LOSSES/ROUTES/LOW-ROSTER/AUTOMATIC-RETURN; request-evidence | technical results below | Chrome155.0.8059.80 |
| Local player session | `npm start` under `docs/_memory/local-game-run.md` | not used; isolated adapter owns server | no user origin/save used |

Choose existing invariant owners from `rpg-maker/tests/test-manifest.json`, not a duplicate regression suite. Update UT-029's former three-living minimum and related retreat expectations to the accepted new behavior; preserve death/assignment protections. Extend native checkpoint cases for new boundaries. Register actual additions in the manifest at implementation; command placeholders above are selection parameters, not claimed executable case IDs.

Before adding a test, answer the repository's eight questions in the owning change: progression/death/read-history bugs are player-visible and survive refactors; localized copy, layout and color do not justify automated assertions. Use the loaded game keys or table values rather than a fixed prose snapshot. Runtime registry and assets must come from the pruned candidate; the inactive ItemsEquipsCore reference is never a test dependency. Do not add server/browser self-tests.

**Accepted risk / waived — F-001, 2026-10-16:** the user declined the proposed dedicated test and persistence change for existing tavern Talk followed by reload before another successful save. V-004/S-05 do not require immediate durability of that observational reading; NEW/FAST may revert to the saved state. Do not add the two-consecutive-Talk variant proposed by the review. This is an explicit acceptance of low-impact behavior, not an executed pass or a claim of equivalent coverage. New social-topic/grief checkpoints and death/progression verification remain required. See [the decision](review-01.md#user-disposition--2026-10-16).

## Task ownership

The [task graph](tasks.md) assigns one primary owner per criterion. Supporting tasks provide receipts; they do not independently close the same criterion. Evidence is recorded in the sensor matrix and execution receipts; human decisions remain pending.

| Criterion | Primary owner | Supporting tasks |
| --- | --- | --- |
| V-001 | [01](task-01.md) | 07, 09 |
| V-002 | [07](task-07.md) | 01, 09 |
| V-003 | [05](task-05.md) | 02, 03, 04, 06 |
| V-004 | [07](task-07.md) | 02, 03, 04, 05, 06, 09 |
| V-005 | [09](task-09.md) | 02, 03, 04, 05, 07 |
| V-006 | [09](task-09.md) | 01, 02, 07, 08 |
| V-007 | [09](task-09.md) | 02, 03, 04, 05, 06, 07, 08 |
| V-008 | [09](task-09.md) | 01, 02, 08 |
| V-009 | [09](task-09.md) | 03, 04, 05, 06, 08 |

Task 08 plans the QA cycle after the implementation leaf (07); task 09 executes the remaining directed/visual/audio/editorial work and final verification. The accepted F-001 exception above remains waived in both.

## Runtime scenarios

| Scenario | Starting state | Steps | Expected result | Evidence | Execution mode | Reason/requirement | Required variants | Evidence to reuse | Invalidation dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-01 Milestones | Candidate new campaign | Form trio; pass 2 traps; enter camp; hear one topic; continue through second pause and destination | Exact 2/2/1 rhythm; optional reading; no next trap revealed at camp | 731125e8;22bbee0c | directed-browser | RQ-001/003 | Church and Park native entry; final 2/2/2 through Council | Same run can continue across routes | Route dispatch, entry/checkpoint events |
| S-02 Loss and replacement | Same run's player-earned state | Cause sacrifice; enter camp; retreat; recruit living companion of someone dead; reach camp again | Repeated all-dead camp fade, independent tavern first-return fade; new survivor grief once | cc2f8d1f | directed-browser | RQ-004–007 | Recent and prior loss; companion was in town; multiple eligible reactions | Continue S-01 where feasible | Death witnesses, grief list, camp baseline |
| S-03 Reduced party | Candidate player-earned state | Reach camp with one/two survivors; return; depart; lose final present hero; complete final route in a surviving run | Retreat allowed regardless total roster; automatic return/bad ending preserved; no camp replaces Council | 5fba5a64;d2487bd3 + post-collection receipt | directed-browser | RQ-001/002 | One/two total alive; reserves present/absent | Pure guard cases cover repeated combinations | Rules, total-loss and end-of-route order |
| S-04 Topic novelty | Player-earned camp/tavern | Read base without partner; later return with partner; read new suffix; inspect About before/after camp reaction | New eligible segment renews label; completed body alone does not; read subject stays accessible | 731125e8;cc2f8d1f | directed-browser | RQ-003/007/008 | One canonical interjection; witnessed and away About openings | Pure enumeration covers other eight-pair identities | Topic composition/reading commands |
| S-05 Save boundaries | Own candidate saves | Title/Continue at entry, after one grief reaction, after topic, and after continue/retreat | Exact continuation, no repeated semantic effect, appropriate remaining indicators | expanded IT-014;22bbee0c;cc2f8d1f | directed-browser | RQ-011 | Incomplete topic, completed topic, more pending grief; save failure in existing harness | Native checkpoint infrastructure reused | Event list indices, save hooks, campaign schema |
| S-06 UI/audio | Own run | Navigate mouse/keyboard; HIDE; Options language/mute; normal/reduced motion; inspect exits | Correct marker/label, dead noninteractive, fire-only camp and restored route/tavern audio | 731125e8;5fba5a64;cc2f8d1f; human listening/acceptance pending | directed-browser | RQ-005/008–010 | PT/EN at 1280×720; one 1920×1080; low/high death count | Captures from S-01–05 | UI extension, event layout, files, audio commands |

All campaign mutation in directed QA is through validated player actions; inspect objects/storage read-only. Create saves within this candidate/run, not from a user, earlier spec or injected fixture. Pure transition tests may construct bounded domain inputs; they are not gameplay evidence. Achieving a state is a run-plan responsibility, not permission to set switches, party, death or seeds in the browser. No guaranteed route seed is claimed here.

Each scenario can group related observations. A full deterministic grid belongs to cheap state tests; heavy variants may be omitted only with recorded equivalent-path evidence under G006. Screenshots do not prove hidden state, input, audio or durable save facts. Existing evidence is context until candidate freshness is checked. Recreate own saves after affected native event-list edits.

Identify preexisting browser/server resources before execution. Close only resources created by the run, including on failure, and report cleanup. Keep failure, pending, explicit waiver and evidence-backed omission separate; no unexecuted pass.

## Human acceptance

| Criterion | Owner | Decision | Evidence/date |
| --- | --- | --- | --- |
| Complete PT/EN copy, voices, reveals and grief continuity | Edney | pending | pending |
| Emotional interest beyond trap utility; fatigue/repetition | Edney / playtest participants | pending | pending |
| Conversation discovery, labels, keyboard and readability | Pati / user | pending | pending |
| Camp composition, portraits and absence framing | Lucas / user | pending | pending |
| Fire mix and transitions | User | pending | pending |

## Release verdict

`BLOCKED` for final delivery solely on the contracted human judgments. Implementation/static/runtime machine states are true; `human_accepted` and `release_ready` remain false. Code review: **SHIP**, [review02](review-02.md). Git: branch `feat/campfire-hero-bonds`, base/head `e920095`, working-tree changes only; no staging/commit/publication.

### Executed evidence and freshness

- `node rpg-maker/tools/run-tests.mjs --pruned --scope fast --output .artifacts/campfire-fast-20261016-05`:61 pass, exit0, browserPeak0.
- `--pruned --ids IT-013,IT-014,IT-018,IT-019 --output .artifacts/campfire-native-20261016-01`:4 pass, exit0. Expanded `--ids IT-014 --output .artifacts/campfire-checkpoints-20261016-02`:pass, exit0, four new camp reasons plus prior boundaries.
- Coreto language validate:881 English/Portuguese keys; `.artifacts/campfire-language-final.json`. One-time `.artifacts/campfire-content-inventory.json`:404 authored rows,91 scenes, all native references and required assets retained by pruning.
- Directed public-input cases: FIRST22bbee0c, LOSSEScc2f8d1f (supersedes d24d71bc for temporal capture), LOW-ROSTER5fba5a64, ROUTES731125e8, AUTOMATIC-RETURNd2487bd3. Full IDs, failures, inspection and resource closure: [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Run outputs are local ignored evidence.
- The automatic-return gameplay assertions and storage capture completed; its report serializer rejected a missing required `limits` array. After adding the array, `.artifacts/campfire-auto-postcollection.json` validates the same collected evidence and binds the original report hash. No gameplay result was fabricated or rerun under a falsely new label; the original failed report remains intact.
- Final runtime delta after fast/native receipts: only Map045's Options command changed from351 to a native Scene_Options call, preserving list indices and every other command. 731125e8 and cc2f8d1f exercise the current map. Earlier checkpoint/rule evidence is retained for unchanged paths; old isolated saves are not reused for final Options evidence. Import-only test cleanup does not alter test behavior.
- Chrome155.0.8059.80 / Node22.23.2 / macOS arm64. Reports record candidate files, native cursor/storage and actual environment. Cleanup confirms closure of every owned browser/service/capture context. No provider, engine or inactive ItemsEquipsCore dependency changed.

### Risk grouping and remaining scope

Under G006, pure enumeration owns all pair identities and route/roster guards; directed cases cover distinct progression, loss, composition, recovery and controls. Fixed slot composition is observed with three present, multiple dead, two total living and one total living/seven dead. The exact three-living/five-dead permutation is omitted as equivalent per-hero slots/visibility (no cardinality-specific layout branch), not claimed as played. Both normal simultaneous fade and reduced-motion absence were separately observed. Both destination entries and final Council were played; automatic return with reserves and total loss without reserves were separate public paths.

The audio graph recording covers fire, mute/restoration and normal exit contexts. Native retreat uses the same CE067 formation audio branch already exercised on return to tavern; subjective transitions/mix remain in the human review. The material does not claim physical speaker output or listening comfort. F-001 stays waived; gamepad/zoom/mobile excluded.

### Concrete human review

The [QA report's review material](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md#material-para-revisão) links candidate images and the actual audio recording. Complete player copy is [Languages.tsv](../../../rpg-maker/The%20Dryland%20Drowned/Languages.tsv); the [bilingual narrative proposal](campfire-hero-bonds.narrativa.md) supplies the organized review view. Approvals must identify the reviewed candidate and the named human; technical passes do not fill those cells.

### Candidate organization

[Pre-acceptance audit](review-02.md#candidate-audit-before-acceptance) accounts for maintained sources, tests, QA, historical one-time scripts, local evidence and unrelated/preexisting files. Detailed final file hashes: `.artifacts/campfire-candidate-inventory.json`. Required source links/case files are present; historical raw evidence is local-only. No proposed archive/removal or final devlog promotion was performed before compatible acceptance.

## Presentation refinement

Owner-approved 2026-10-16 follow-up: tavern and camp use nameplates above heroes with a conversation icon inside the plate; remove the lower unread help and external duplicate bubbles. Preserve NEW on topic choices. Death fades last 180 native frames (three seconds), including cleanup waits, with reduced-motion removal unchanged. Social scenes use the authored Talk framing, keep participants stable across reading units, and show the interlocutor from the first line. Guest interventions add the guest without removing continuing participants. Text, read units, actions and save semantics remain unchanged.

Current refinement verification: implemented=true, static_verified=true, runtime_verified=true for the approved delta; agent visual inspection complete. Earlier affected screenshots and 60-frame temporal evidence are historical, not evidence for this refinement. Human presentation acceptance remains pending. Capture the new nameplates, continuous Bimbren About exchange, three-participant intervention, and three-second fades for the devlog.

Technical results for this refinement (local ignored receipts):

- `.artifacts/campfire-refinement-fast-01`: 61 fast cases pass; rules/read/save behavior unchanged.
- `.artifacts/campfire-refinement-absence-02`: IT-009/010/011 pass. The existing suite now observes the actual art as well as separate interaction hitboxes, waits for 180 frames, and checks no duplicate death/absence after interruption and reload. Removed coordinate assertions fail the project’s appearance-test question 3; no new layout tests. The owner remains `retreat.mjs`; steady behavioral contract, not monthly art calibration.
- `.artifacts/campfire-refinement-language.json`: localization validation; no prose changed. Structured transformation retained all text, read boundaries, domain actions and choice order. Changed Common Events: 38/45/350/360–375 only; all changed map branches balanced.
- `85fcd9fe-dd93-4957-b34a-4df0d1ec31dc`: 1280 EN normal, native camp progression/Continue/save, nameplates/HIDE and three-person intervention. Agent inspected formation-nameplates, camp-nameplates and social-composition-6: names/icons fit; continuing participants remain visible.
- `9ec06f29-e4ff-406b-b08a-01c160ca7455`: 1920 EN normal (browser locale pt-BR does not select game language). About opening/bridge/body, grief, incomplete-topic reload and both stage contexts pass. Three camp fades each have 181 observations spanning 180 frames. Bimbren remains mirrored at authored scale54, with Rheed visible from the opening. Agent inspected social-composition-5/7 and the continuity observations.

Preserved failed attempts: `4a02c6af` exhausted the old 300-rAF observation bound after the fade duration increased; switching the observer to an explicit 20-second deadline and waiting for actual disappearance produced the 180-frame evidence above. `0fd610d3` assumed the tavern menu opened Options directly; the final video shows the ordinary Menu with Options selected. The PT observer now traverses Menu → Options → Menu → tavern by public input. These failures are sensor/navigation defects, not discarded product failures. Optional evidence reuse reports incomplete dependencies and falls back to ordinary collection; agent inspections are recorded here rather than inventing receipt reuse or human acceptance.

- `f3ecd89d-7c54-4910-9fce-bba4d6314a04`: PT1280 reduced motion, Portuguese selected through the native Menu/Options, nameplates/HIDE, camp+guest and Continue pass. Agent inspected formation-nameplates, camp-nameplates and social-composition-6: readable names/icons, no lower help, interlocutors retained. All three successful directed runs report no browser errors and closed owned resources.

Scoped refinement verdict: **PASS** for implementation/static/runtime and agent visual inspection; **human_accepted=false**, **release_ready=false** for the wider spec’s outstanding editorial/art/audio judgment. No commit/staging/publication. Code and data review plus deslop recorded in [review03](review-03.md); the test-evidence finding was corrected and the affected cases rerun.

G006 scope: unchanged route rules, complete corpus count, save schema, audio, total-living/terminal logic and historical low-roster coverage retain their earlier evidence. New runs exercise changed plates, dialogue lists, resumed topics and both absence paths; no product-cartesian repetition is claimed. Worst-case human composition remains pending. The public observer’s optional Portuguese setup does not affect the already-collected default EN path. New screenshots supersede only affected visual claims, not historical narrative/domain results.

## Native icon above nameplates

Follow-up approved by the user on 2026-10-16, superseding the inside-plate marker: use installed IconSet index 04 (white ellipsis balloon) as a static native 32×32 sprite, horizontally centered 4 px above the plate. Restore centered names at the original 18 px, including selection ✓. Availability, presence and HIDE retain their existing behavior. Use ImageManager's shared bitmap without destroying it; no battler or state is introduced.

Verification plan: fresh public-input campaigns in PT/EN at 1280×720; inspect tavern top-row plates, selected names, read/unread Gorvak and other unread heroes, camp presence and read/unread return, HIDE/restore in both scenes, and return to tavern after scene destruction. No automated appearance test. Capture-only case: `directed-native-icon.mjs`; retained domain/save evidence is unchanged under G006. New screenshots supersede prior inside-plate screenshots only. Current follow-up status: **PASS** for implementation, static checks, public-input runtime and agent visual inspection. Devlog target: selected tavern party with top-row markers, followed by camp before/after a completed conversation.


### Native icon results and selected captures

Fresh isolated campaigns, 1280×720/DPR1, Chrome 155.0.8059.80, Node 22.23.2/macOS arm64:

| Locale | Run | Observed result |
| --- | --- | --- |
| EN | `dfae3929-3aab-4d8a-bf9f-d3c6cbf61343` | Tavern top-row icons complete, centered names/✓; Gorvak read marker clears; camp contains only H1/H5/H8 with their markers; completed H1 camp marker clears; HIDE/restore and return to tavern correct |
| PT | `4c44521c-0afd-4aab-b253-c3ee02d9ef15` | Same states passed with Portuguese selected through title Options; localized controls fit |

Agent `/root` inspected both runs’ `tavern-selected`, `tavern-gorvak-read`, `tavern-unread-hide/restored`, `camp-unread`, `camp-gorvak-read`, `camp-unread-hide/restored` and `returned-tavern` PNGs. The EN initial unread capture was inspected too. The full 32px tile remains above the topmost plate (Elowen, about 4px clear of the viewport). Native frame observations confirm (128,0,32,32), scale1, 4px plate gap and a ready/valid shared IconSet after scene transitions. No battle actor/state is created. Source review confirms ordinary Sprite destruction releases its texture/children without destroying ImageManager’s bitmap/baseTexture; the old explicit bitmap destruction was removed.

Selected original PNGs for the plan/devlog (unaltered bytes, 1280×720):

- Tavern with selection ✓: [PT](captures/native-icon/pt-tavern-selected.png), [EN](captures/native-icon/en-tavern-selected.png).
- Camp with unread topics: [PT](captures/native-icon/pt-camp-unread.png), [EN](captures/native-icon/en-camp-unread.png).
- [Camp after Gorvak’s conversation](captures/native-icon/pt-camp-gorvak-read.png); [camp under HIDE](captures/native-icon/pt-camp-unread-hide.png).

Static verification: `node --check` for the extension and capture case, `git diff --check`, and structured comparison against the pre-follow-up files pass. Only the left/center fields of 16 CE038 and 16 Map045 text commands changed; command counts/order, read units, prose and campaign actions remain identical. Map045 has two authored sets of eight labels (arrival and return); the transformation’s initial eight-label precondition correctly stopped before writing that map, then was corrected after inventory. No appearance test was added; the capture case remains outside the automated test suite. Existing domain/persistence evidence is retained for unchanged rules and save boundaries under G006, without claiming a fresh suite run.

Both directed reports have no browser errors and confirm all owned contexts, browsers, capture sessions and services closed. No preexisting server was listening on 18726. The optional evidence optimization reported incomplete dependencies and performed ordinary fresh collection; reports intentionally remain `executed-awaiting-review`, with the actual agent inspection recorded here. Raw reports and input/hash logs remain local ignored evidence under `docs/qa/runs/campfire-hero-bonds/runs/<run>/`; selected images above are candidate versioned material. No human acceptance is inferred; the wider spec’s editorial/art/audio status stays pending.

Candidate audit for this follow-up: **keep** the specialist plugin plus CE038/Map045 label edits (runtime), the GDD/spec/UI/technical-art/task/verification/QA-report updates (current decision and result), the capture case and two requests (reproducible public-input path), the focused transformation (authorship provenance), and the six selected PNGs (requested plan/devlog material). Raw logs, fixtures, backups and the detailed hash inventory stay ignored/local. Prior branch edits outside this delta are preserved and excluded from this readiness claim. Deslop review found no added framework, unnecessary fallback, defensive wrapper or copied engine subsystem. No archive/removal, staging, commit or publication was performed. Branch: `feat/campfire-hero-bonds`; source hashes and selected-image provenance: `.artifacts/native-icon-candidate.json` and `.artifacts/native-icon-capture-manifest.json`.


## Pre-commit corrections — 2026-10-16

The user approved correcting all three pre-commit findings and confirmed that human text, presentation and audio acceptance remains pending. The scoped correction is **PASS**: implemented, static-verified and runtime-verified. It does not change the wider spec's human-acceptance or release verdict.

Map037–044 now cancel the tavern hero menu through its existing Back branch (index4). The original insertion added two About choices but left cancellation at index2, which opened the second About even when hidden. Only one numeric value changed in each map; command counts/order, branch bodies, text and save schema are unchanged. `fix-tavern-cancel.py` applies this bounded, idempotent correction to the current candidate; `author-campfire.py` now preserves Back when inserting choices but remains a historical baseline transformation and was not rerun.

The GDD now records the technical approval, implementation and verification separately from pending human judgments, uses three seconds consistently and describes independent tavern/camp absence acknowledgments. Removed unused `councilMap` loading and corrected indentation in the existing encounter/closing tests. F-001 remains accepted risk.

### Fresh evidence

All runs used isolated, freshly pruned candidates; raw receipts below are local ignored artifacts.

- `.artifacts/precommit-fix-red-01`: IT-007 stopped before cancellation because the old helper did not advance the authored `$[conv.party_count]` message. Source inspection confirmed that Query/Menu commands separate that message from the choice command. The helper now advances this exact message by public Enter; no arbitrary dialogue is skipped.
- `.artifacts/precommit-fix-red-02`: IT-007 reproduced the product regression before the map correction: cancellation remained on map37 instead of returning to map3.
- `.artifacts/precommit-fix-native-01`: the initial cancel checks passed after correction; the older return helper stopped on the same count message after full-party feedback. It now handles that message and selects Back by raw localization key. Membership selection in IT-007 resolves the authored variable label instead of assuming its visible index.
- `.artifacts/precommit-fix-native-02`: IT-007 passed. Escape and right-click return with both About choices hidden and with both available, preserving campaign state and Talk read history; existing membership/full-party/automatic-roster checks also pass.
- `.artifacts/precommit-fix-helper-01`: IT-006 passed, covering the shared helper through a complete existing Talk, read completion and return.
- `.artifacts/precommit-fix-fast-01`: all61 fast cases passed, browserPeak0. Subsequent helper edits affect browser navigation only; these pure/static results remain applicable.
- JSON semantic comparison found exactly eight changes, each `parameters[1]: 2 → 4`; script idempotence, Python AST, modified JavaScript syntax and `git diff --check` passed. Browser runs report zero live browsers after cleanup and closed owned process groups.

IT-007 remains the canonical owner: the invariant is cancellation without starting/consuming a conversation or changing the roster, not appearance or button wording. The defect is visible to players, involves conditional branches and read state, and is stable across prose/layout changes. No duplicate test ID, framework or browser session per hero was added; it reuses the existing formation session and roster fixtures. Programming owns maintenance alongside menu changes. The fixture-based loss cases are integration evidence, not a claim of a new player-earned death journey. Under G006, the eight equivalent native cancel fields receive complete static inspection and one real native-menu representative; no fresh eight-hero visual acceptance is claimed.

### Candidate review and demonstration

Keep the eight runtime field corrections, the bounded correction script and corrected historical authoring step, the existing-suite regression/helper changes, the cleanup, GDD reconciliation and this verification record. Each has a runtime, maintenance or evidence consumer. Before/after copies, hashes and raw failures/results remain ignored under `.artifacts/precommit-fix-*`; unrelated branch edits are preserved and excluded from this fix's readiness claim. Source inventory and scoped diffs are recorded in `.artifacts/precommit-fix-final/`. Deslop found no new runtime framework, defensive fallback, dependency or engine/provider changes. No archival, staging, commit or publication occurred.

Devlog demonstration for this fix: open a survivor's menu with About topics, press Escape or right-click and return directly to the tavern with the same roster and unread indicators. Suggested capture: a short before/after recording of that interaction; this is a proposed capture, not newly collected visual evidence. Existing camp/absence captures retain their earlier scope. Human editorial, visual and audio judgments remain pending by explicit user confirmation.
