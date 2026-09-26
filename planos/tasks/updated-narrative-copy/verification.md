---
status: approved
approved_on: 2026-09-25
implemented: true
static_verified: true
runtime_verified: true
human_accepted: true
release_ready: true
---

# Verification — Updated narrative copy

Product/source selection and exact exceptions were approved in D-001–004. The complete technical spec and this verification design were approved on 2026-09-25 under D-006 (“aprovo”). Read-only intake and document validation are not implementation evidence. No game/test run was performed to author this spec. The previous prose increment's D-005 waiver is local to that increment and is not inherited here.

## Sensor matrix

| ID | Requirements | Sensor and execution method | Setup / expected observable | Evidence / freshness owner | Status |
| --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001–007, RQ-009 | Static source-to-event comparison | Pinned 17 input files + narrative exceptions; all mapped source bodies agree, 6 failures replaced/42 preserved, 2 causes replaced/14 preserved, 16 old preamble messages absent | Comparison report; source hashes, narrative contract, target native lists; Programação/Narrativa | PASS — source/preservation verifier |
| V-002 | RQ-001, RQ-003–006, RQ-008 | Static native grammar and preservation diff | Correct 102/402/picture labels, IDs/branches/speakers, balanced observation units, retained domain commands, guards, completion/checkpoints and transfer ownership | Structured before/after report; maps/CEs/helper references; Programação | PASS — native grammar + frozen JS |
| V-003 | RQ-004–006, RQ-008 | Existing Node tests / isolated native integration | Update affected obsolete profile expectations, then execute owning cases; preserve editable authorship, FAST, controls and native save semantics | Canonical case output + hashes; tests, engine/providers and event lists; Programação | PASS — 10 owning cases; execution below |
| V-004 | RQ-004–005, RQ-008 | Playtest + visual; directed-browser | New candidate game; all 8 hero presentations/addition/full-party replies, no preamble, correct speaker and unchanged party during conversation | S-01/02 receipts and viewed captures; hero maps/providers/assets; QA | PASS — P, R; pixel review below |
| V-005 | RQ-001–002, RQ-008 | Playtest + visual; directed-browser | All 16 encounters/48 labels in a completed campaign; representative successes, full source introduction/reread, longest message formats fit | S-03 record and viewed samples; trap maps, fonts/window params/assets; QA | PASS — P, F; all 16 choice screens |
| V-006 | RQ-003, RQ-006, RQ-008 | Playtest + visual; directed-browser | Actual failed approach, explicit victim, updated Gorvak farewell, death-context order, completion exactly once | S-04/06; maps, CE282/266–281, native campaign/checkpoints; QA | PASS — P, F; A5-3/H1 and A1-2/H3 |
| V-007 | RQ-006–008 | Playtest + visual; directed-browser | Council's two-paragraph opinions with eligible roster; actual A1/A5 memorial causes and saved public locations | S-05; Map023, CE125/161, Council/memorial helper composition; QA | PASS — F, W; two actual memorial causes |
| V-008 | RQ-008 | Playtest + visual; directed-browser | Candidate-earned approach and sacrifice Continue, same committed facts; targeted larger-area/reduced-motion fit | S-02/06/07; native lists, saves, controls/providers/geometry; QA | PASS — P/R/F/W; own Continue and viewport samples |
| V-009 | RQ-009 | Document audit + human acceptance | Correct source precedence, current authoring docs, no false PASS/waivers, reviewed captures, real human comfort decision and teardown record | Local report + user decision; spec/contracts, final candidate/source/evidence hashes | PASS — final audit and user acceptance, 2026-09-26 |

Narrative copy comparison covers every block even when unchanged. Strip only editorial headings, speaker prefixes, numbering, decorative outer quotation marks and layout whitespace/`<br>` for comparison; retain words, accents, punctuation, ordering and speaker attribution. Never normalize away missing paragraphs. The expected oracle comes from the pinned documents and approved exceptions; preservation comes from the recorded pre-edit game, not the candidate itself.

Static grammar review must isolate the permitted text/formatting edits and the explicitly removed preamble/associated envelope. Necessary portrait preparation moves need individual justification; “text-only” is not permission to ignore those commands. Keep unchanged engine/plugin/registry hashes and unrelated event bodies.

## Commands

Run from the repository root with its documented Node 22+/Python/Chrome environment. No commands below ran during spec authoring.

| Scope | Command / method | Last result |
| --- | --- | --- |
| Game entry | `npm start` (or documented `npm start -- --no-open` for an owned QA browser), following `docs/_memory/local-game-run.md` | not run; isolated native fixtures and directed adapter own their local servers |
| Focused native regression | `node --test --test-name-pattern='IT-(006|007|038|047|065|067|069|071|080|081)' rpg-maker/tests/campaign.test.mjs` | 8 PASS + 2 obsolete-fixture failures; corrected rerun IT-006/067/069: 3 PASS, 0 failures |
| Affected canonical aggregate when helper edits or failures require it | `node --test rpg-maker/tests/*.test.mjs` | not run; no helper/provider/domain change required broadening |
| Static prose/preservation | `python3 planos/tasks/updated-narrative-copy/integrate-copy.py` | PASS; 17 pinned sources, all 26 target JSON files, frozen engine/plugins/registry |
| Directed execution / visual evidence | Existing project QA facilities via the [Coreto QA guide](../../../coreto/docs/qa.md) and `rpg-maker/qa/`; public player inputs, read-only observations | PASS within S-01–07; run inventory below |

The project uses `node:test`; do not install Jest or a new runner. The focused command selects existing cases by registered ID. Reconcile any further affected case before execution; an omitted unrelated test is not an executed pass. Existing isolated integration fixtures are not directed campaign evidence, and do not permit live state/seed/save mutation in S-01–07.

## Runtime scenarios

| Scenario | Starting state / player steps | Expected result and authority | Mode / required variants | Evidence and reuse | Invalidation dependencies |
| --- | --- | --- | --- | --- | --- |
| S-01 — Eight hero interactions | New game, unused QA slot; enter tavern, Conversar with each hero, add/remove through menus; form three and attempt each remaining hero, rearranging to cover all eight full replies | RQ-004/005: first line is Ivaí, six source utterances, correct addition/full response; converse/cancel leaves party intact; removing gives no addition reply | directed-browser; all H1–H8, all three speech contexts; primary 1280×720 | V-004; one initial-tavern session can cover all eight without deaths; no older save dependency | Hero lists, observation IDs, focus/input/provider changes |
| S-02 — Reading boundaries | In S-01, use keyboard through Gorvak/Ivaí; HIDE/restore and Options/return while reading; finish, reopen and use FAST only after completion; repeat one opening in reduced motion | RQ-008: no profile pause, correct first speaker, no premature seen mark or leaked selection, stable listener/hero-menu presence | directed-browser; keyboard plus mouse in S-01, normal and one reduced-motion representative | V-004/008; reuse S-01 campaign; capture first/last box and focus | Removed setup commands, controls/providers, observation envelope |
| S-03 — Encounter catalogue | Continue a fresh candidate campaign through both initial routes and final route to Council; inspect all 16 descriptions and choice screens; select successful approaches as needed to finish; reread one A and one B | RQ-001/002: exact source labels/questions, correct selected success, no bust or hidden competency, complete readable text | directed-browser; all 48 labels; representative success in each shared format, with widest/tallest new prose selected by actual rendering | V-005; one complete 5+5+6 journey covers all encounter IDs; view and record every choice screen, record actual success sample IDs | Trap lists, expected prose, picture labels, font/window/renderer |
| S-04 — Sacrifice | In own candidate campaigns/checkpoint branches, form a party lacking a chosen competency, fail an approach and choose an eligible hero. Include Gorvak for his changed farewell and one of the six changed failure messages | RQ-003/006: causal failure precedes choice; irreversible warning and explicit input; source farewell then source fatal paragraph; no duplicate death | directed-browser; at least one complete sequence with changed failure and updated H1 farewell (may be separate encounters if necessary) | V-006; use own genuine pre-approach checkpoints where available, retain read-only action/death observations | Failure/farewell/death lists, CE291, campaign/SaveCore lifecycle |
| S-05 — Council and memorial | Complete at least one campaign with surviving Council participants; read each present hero's two paragraphs and finish an ending. Produce A1 and A5 deaths through normal play, then reach memorial in the same or additional own campaign branches | RQ-006/007: stable eligible opinion order, correct listening/speaking portraits, no premature final choice; both exact inscriptions with recorded route/encounter and readable bounds | directed-browser; one Council with listeners, all eight opinion mappings statically; both A1/A5 causes visually on real memorials | V-007; share S-03/04 routes/checkpoints when possible; document actual witnesses and deaths, never infer unvisited opinion branches ran | Map023/opinion bodies, CE125/161, death locations and memorial/focus consumers |
| S-06 — Continue | Reopen via native Continue from own saved approach and sacrifice checkpoints before concluding their pending text | RQ-008: same committed approach/victim/death location; pending candidate text resumes, no repeated death/progress/save action due to rereading | directed-browser; one approach and one sacrifice checkpoint | V-006/008; reuse S-04 campaign files with hashes/provenance, same origin/profile; may replay text after last checkpoint | Authored lists, save schema/interpreter stack, checkpoint/reading changes |
| S-07 — Larger desktop | Use 1920×1080 effective area on own campaign for direct opening/long paragraph, three-choice screen, Council opinion and memorial | RQ-008: preserved focus, complete text, no overlap/clipping; no full catalogue rerun | directed-browser visual; selected formats only, standard zoom | V-008; reuse own compatible checkpoints and rendering-class evidence from primary pass | Geometry, font/provider settings, image composition, prose length |

Random assignments are not selected by a test menu or seed mutation. Prepare parties and choose routes/approaches through public controls; read-only inspection may identify reached encounter/competency/state for QA. If a needed outcome is unavailable with the current party, use legitimate retreat/reformation or another new campaign, recording it. A missed required target remains pending. No dependency on the user furnishing a save.

## Saves, freshness, grouping and risk

- Follow SD-015: create all campaign files during this increment's own tests on the candidate. Do not use another spec's saved campaign as setup. Any archived branch is an unmodified copy with source/payload/index provenance under the existing QA facilities, loaded through Continue.
- Record candidate revision or working-tree hashes, the 17 source hashes, changed native lists, relevant provider/font configuration, browser viewport/version, save lineage, observed targets and screenshot paths. Source or authored-list drift invalidates dependent text/layout and checkpoints; rerun only the affected sensors after rebuilding saves where necessary.
- Static coverage is exhaustive for words, associations and 48/16/8 matrices. Directed gameplay covers all introductions/labels and all accessible initial hero interactions, plus distinct lifecycle boundaries; it does not execute the product Cartesian set of every success × hero × death × opinion × ending.
- Retain representative full E2E and direct-conversation/native-save checks because removed observation envelopes and longer speech affect real interpreter boundaries. Historical source-only E2E waivers cannot close them.
- Unvisited success/death/opinion variants may be covered by exhaustive static association, shared native rendering/command paths, source-derived rendered-size comparison and viewed representatives only after the executor records the concrete equivalence, residual risk and invalidation trigger. Similar-looking text alone is insufficient. Both longer memorial causes are distinct required visual targets.
- Additional ending/reduced-party/RNG/audio matrices are omitted for unchanged rules/assets when V-002 confirms unchanged consumers and retained canonical evidence supports that equivalence. If any domain command, eligibility predicate, provider or composition changes, reassess and reopen affected checks. An observed failure cannot become a redundancy waiver.
- Gamepad/native zoom are explicit scope exclusions, not passed tests. 1920×1080 is targeted rendering coverage, not a second full campaign. No mobile/NW.js/browser expansion.
- Close owned tabs/browser instances and auxiliary servers on success, failure or cancellation; preserve preexisting user sessions/processes. Record confirmed closure rather than only an attempted cleanup.

## Human acceptance

| Criterion | Owner | Decision | Evidence |
| --- | --- | --- | --- |
| Source/placement, direct conversation opening, six failure edits and two inscriptions | User | accepted for this increment | D-001–004, conversation on 2026-09-25 |
| Complete technical spec and verification design | User | accepted | D-006: explicit “aprovo”, 2026-09-25 |
| Integrated reading comfort, natural first-line entry and longer opinion/memorial presentation | User / UI/UX reviewer | accepted, 2026-09-26 | Explicit “a implementacao está aprovada”, followed by final verify, commit and PR authorization; candidate unchanged from the reviewed evidence |
| Whole-game final cultural/editorial/art/audio acceptance | Existing discipline owners | not decided by this increment | Preserve existing independent acceptance states |

## Execution and release verdict

**Technical scope: PASS. Contracted release readiness: PASS.** Final implementation and integrated reading comfort accepted by the user on 2026-09-26. This closes this increment only; whole-game creative acceptance retains its independent scope. Native implementation, static checks, owning integration tests and required directed/visual sensors are complete. No implementation tasks or loop-tasks were used. Execution is recorded here and in the existing [FOR](../../../docs/qa/scenarios/FOR-mz-formation-roster.md), [ENC](../../../docs/qa/scenarios/ENC-mz-encounter-sacrifice-retreat.md) and [CAM](../../../docs/qa/scenarios/CAM-mz-discovery-closing.md) owners. Historical results retain their scope.

### Implementation and corrections — 2026-09-25

The 26 native JSON files contain the approved prose. Maps 037–044 now begin Conversar with Ivaí's first question, retain the existing conversation/addition/full identities, and omit profile units 82/86/90/94/98/102/106/110. The profile-only focus/preload and its CE44 are removed; the retained conversation already prepares Ivaí and speaker focus. The sixth utterance stays inside the same observation and does not repeat focus or completion. Domain commands, eligibility, checkpoints, save format, plugin registry and all JavaScript remain unchanged against intake `114d7aa6e7401c8b1f19d6bf5cfd7870ca805590`.

Actual 26 px native-font measurement found five-row successes at B4-1 and B6-1. Each now uses two consecutive native messages split before its last complete sentence; no wording changed. Pixel inspection rejected manual `<br>` wrapping in CE125/161 because it pushed the saved location out of the memorial panel. Both approved strings now use the existing WordWrap, and fresh actual A1/A5 memorials fit at both viewports. These are authored layout changes, with no global font/window/provider change.

### Executed evidence

All paths below are project-local ignored evidence, **not available from a fresh clone**. Full hashes, public input history, source snapshots, save lineage, errors and resource closure are in each `report.json` under `docs/qa/evidence/updated-narrative-copy/runs/<run>/`. The evidence service collected fresh runs because reusable dependency metadata was incomplete; it did not issue a visual-inspection receipt. Its immutable `executed-awaiting-review` status is collection status. The agent's actual pixel review and scoped verdict are recorded here, separately from human acceptance.

| Alias | Run | Observed scope and retained result |
| --- | --- | --- |
| P | `7be07497-2383-4370-b468-8d89ad00cf04` | 1280×720: all 8 heroes × presentation/addition/full, exact source utterances/speakers, all 16 encounters/48 labels, A/B reread, both Continue boundaries, A5-3 failure/H1 farewell, A1-2/H3 death, Council H2/H5/H8, reunite ending. Memorial and B4-1 layout superseded by F. |
| R | `f9526011-03a4-4efd-9656-d985aabd5286` | 1920×1080 reduced motion: direct H1 opening, HIDE/restore, Options/return, unread FAST gate, completed FAST stops at menu, addition/removal; campaign preserved. |
| L | `3ef99229-d146-4772-b814-47f030c60c23` | Own P death checkpoint: retained full 1920×1080 A4 choices and A5 death narration. Later Council PNGs are only 1728×910 and cropped, so rejected as viewport evidence; W replaces that coverage. Old memorial layout also superseded. |
| F | `15a732fa-7379-4e63-9dd6-8ad89bfc08d5` | Final candidate, new 1280×720 campaign: all 16 encounters, both split B4-1/B6-1 successes, approach/death Continue, A5-3/H1 and A1-2/H3, Council H4/H8, both corrected memorials, reunite ending. |
| W | `1e7c4e3a-1e65-4303-b8ec-17a3305e2faf` | 1920×1080: native Continue from F's unchanged own Council checkpoint, H4/H8 opinions and both corrected memorials, ending. Final opinion/memorial PNG dimensions and pixels checked. |

F death provenance: H1/A5-3 at physical position 4; H3/A1-2 at final position 1. The memorial correctly displays Caminho da Igreja / A Cavalariça da Mula-sem-Cabeça and Vilarejo Partido / O Redemoinho do Saci Engarrafado. P independently reached A5 at physical position 2 and A1 at physical position 5. No seed, campaign fact or save payload was edited; retreats, formation, approaches and victims used public player actions. Candidate-owned save archives were accepted by the existing source/payload validator.

Reproduce with the existing runner, from the repository root (no new dependency):

```sh
DRYLAND_QA_PORT=18733 node .agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs --project . --request planos/tasks/updated-narrative-copy/qa-request.json
DRYLAND_QA_PORT=18734 DRYLAND_COPY_WIDTH=1920 DRYLAND_COPY_MODE=reduced node .agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs --project . --request planos/tasks/updated-narrative-copy/qa-request-reduced.json
DRYLAND_QA_PORT=18735 DRYLAND_COPY_MODE=memorial node .agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs --project . --request planos/tasks/updated-narrative-copy/qa-request-memorial.json
```

For a new larger-area continuation, set `DRYLAND_COPY_WIDTH=1920`, `DRYLAND_COPY_MODE=memorial-resume`, `DRYLAND_QA_PORT` to the producing run's port, and `DRYLAND_QA_SAVE_ARCHIVE` to that new run's `own-council-complete.archive.json`; use `qa-request-memorial-wide.json`. The `wide` mode / `qa-request-wide.json` instead starts from its own newly produced death checkpoint to sample a choice and subsequent campaign. Archives must pass native source/origin validation; never rewrite an old archive to fit. A new invocation produces a new run ID. Inspect its actual pixels and errors before assigning a verdict.

Environment: macOS Darwin 25.5.0 arm64, Node v22.23.2, Chrome 154.0.8037.57, pt-BR, DPR 1, normal zoom. P/L used port 18733, R 18734, F/W 18735. Every retained report has zero runtime errors and confirms browser/context/service closure; a final listener check found none on the owned ports. Existing user sessions were preserved.

Canonical test logs in `.artifacts/updated-narrative-copy/`: `focused-02.log` has 8 passing cases (IT-038/080/065/047/006/007/081/071) and two failed fixture expectations. IT-067 expected the wrong Elowen listener scale after retargeting the profile; the fixture now uses her authored 36→39.6 scale. IT-069 advanced one box too far after Continue; its count now follows the six-utterance conversation. `node --test --test-name-pattern='IT-(006|067|069)' rpg-maker/tests/campaign.test.mjs` exited 0, 3/3 PASS (`focused-03.log`). Thus all ten selected owning cases passed; no aggregate-suite pass is claimed. IT-081 includes all eight heroes in normal and reduced motion. The final memorial strings and B4/B6 paragraph boundaries do not occur in these formation/authoring cases; their changed behavior is freshly covered by F/W and the final static verifier.

Earlier attempts are preserved, not passes: `focused-01.log` was invalidated by source-format drift during the run; `21d7aca8-a868-4ea9-b0fc-bd505994ef18` failed a QA probe that assumed `_textState` survives the final pause; `4bc69281-05e9-4182-9716-3f93aa6b4155` clicked before native pointer hover selected the target. The probe now checks the visible advance indicator; the driver waits for the actual native hover index. `a9443963-895c-4cc4-aba5-c72f32caadd9` is the intermediate memorial retest before B4/B6 pagination, superseded by F. None required changing game rules or input providers.

### Viewed captures and equivalence

Viewed P captures: all `choices-A1.png`–`choices-A8.png` and `choices-B1.png`–`choices-B8.png`; direct opening `reading-10-37.png`; long presentation representatives for all eight heroes (including Seraphina `reading-35-40.png` and Vaelith `reading-55-43.png`); addition reads 16/23/30/37/44/51/58/65 on maps 37–44; full-party reads 69/71/73/75/76/77/78/79; H1 farewell 93 and A5 death 94; A1 death 131; B5-1 success 190; H2 opinion 200/201. P memorial 210/211 and B4 success 149/150 revealed the corrected layout issues and are not final evidence.

Viewed final F captures: B6 success 75/76, B4 success 122/123, H4 opinions 130/131, H8 opinion 133, memorials 138/139. All complete source paragraphs, correct speakers, controls, advance indicators and recorded memorial locations fit. Viewed R `opening-after-options.png`, L `choices-A4.png` and `reading-2-death-A5-context.png`, W opinions 6/7/8/9 and memorial 14. W supplies complete 1920×1080 Council/memorial pixels; L's cropped Council files are excluded.

Exhaustive static comparison covers all 48 successes, 16 deaths, 8 two-paragraph opinions and all retained branch/state commands. Runtime prose measurements used the actual loaded `rmmz-mainfont` at 26 px and the native message width; after the two sentence-boundary splits, every checked authored body fits at most four estimated rows (`rendered-widths.json`, `measure-prose.log`: empty overflow set, exit 0). These measurements supplement, rather than replace, the viewed four-row Seraphina/B5/B6/death/Draska representatives. Unvisited result/death/opinion variants remain **statically verified plus shared-renderer evidence**, not individually played or visually accepted. P/F cover different successful approaches but do not exhaust the Cartesian matrix.

Retained P/R coverage has unchanged hero maps, renderer, fonts, controls and assets. F supersedes the changed CE125/161 and Map018/020 message boundaries. W uses F's own source-matched save. No previous-increment E2E waiver or external save was used. Further prose, font/window, focus/provider, eligibility or command-lifecycle changes reopen their dependent sensors. Old user saves may contain old interpreter lists; this increment does not convert them or promise refreshed copy.

### Candidate audit before human acceptance

Audit against HEAD/intake and branch diff against main completed; no engine/plugin/coreto/registry changes, duplicated runtime catalogues, dependencies or blanket exception handling were introduced. `git diff --check` and the materialized static comparison pass. Existing test ownership is retained; no duplicate regression suite was added.

| Candidate group | Disposition and consumer |
| --- | --- |
| 26 native JSON files | Keep: executable approved content and direct conversation entry. |
| 3 canonical test suites | Keep: update retired-profile assumptions while retaining lifecycle/authoring/save assertions. |
| `rpg-maker/README.md`, current GDD clarification, FOR/ENC/CAM appendices | Keep: current authorship and scoped results; this document alone owns acceptance status. |
| Existing approved spec/stories/contracts/source-analysis/ADR | Keep: product authority, 17 source hashes, exceptions and verification rationale. Preserve preexisting user edits to the four historical ADRs and GDD. |
| `integrate-copy.py` | Keep: offline, pinned-increment transformation and exhaustive verifier; not a reusable whole-game generator. Its original Git commit is an explicit input. |
| `verify-playthrough.mjs`, five `qa-request*.json` recipes | Keep: public-input reproduction of distinct complete/reduced/wide/final-memorial variants; request descriptions identify required environment and own saves. Historical run IDs are provenance, not fresh-clone prerequisites. |
| Raw runs, archives, logs, font probe and hash inventories | Preserve locally under existing ignored evidence/artifact paths; exclude from versioned candidate. |
| Selected real review images for devlog | Keep: nine exact captures plus README/provenance under `docs/qa/deliveries/updated-narrative-copy/`; independently usable from a clone. |

The branch's already committed narrative sources/prompts are inputs outside this implementation's new changes. At the 2026-09-25 audit, no staging, commit, push, tracker action or publication had occurred. The inspected inventory contains 38 modified and 15 new maintained files (including preexisting planning changes), no deletions; 26 of these are game JSON files. Candidate/source/file hashes are recorded locally in `.artifacts/updated-narrative-copy/candidate-final.json`; exact run source hashes remain immutable in their reports. New docs and recipes resolve maintained inputs from repository-relative paths. Post-acceptance organization is recorded below; no raw evidence was deleted.

### Concrete comfort review and suggested devlog captures

Open these actual candidate captures (selected versioned copies). The demonstrable moment is Conversar opening directly with Ivaí, then a longer hero response, the revised approach labels, a two-paragraph Council opinion and the two cause/location memorial panels. No devlog has been published.

- [Direct first line after Options, 1920×1080](../../../docs/qa/deliveries/updated-narrative-copy/opening.png).
- [Long Seraphina response, 1280×720](../../../docs/qa/deliveries/updated-narrative-copy/seraphina.png).
- [A5 approaches](../../../docs/qa/deliveries/updated-narrative-copy/approaches-a5.png).
- [Council opinion, 1920×1080](../../../docs/qa/deliveries/updated-narrative-copy/council-second.png).
- [Both corrected memorial inscriptions, 1280×720](../../../docs/qa/deliveries/updated-narrative-copy/memorial-720.png).
- [Both corrected memorial inscriptions, 1920×1080](../../../docs/qa/deliveries/updated-narrative-copy/memorial-1080.png).

### Final verification and accepted organization — 2026-09-26

**PASS** for the accepted implementation and candidate organization. The user explicitly approved the implementation, requested final verify and commit, then corrected the requested remote action to **PR targeting main**, superseding the earlier merge request. No renewed acceptance is required for the unchanged runtime or these organization-only updates.

The 53-file pre-acceptance candidate matched every recorded hash. All 1,474 runtime files in final run F also match the current game, including engine, providers, fonts, assets and authored data. The source/native preservation command ran again with exit 0 (`.artifacts/updated-narrative-copy/static-accepted.log`). Retained P/R/F/W reports have no runtime errors and confirm resource closure; the ten owning-case successes and their documented retests remain applicable. Under G006, repeating those heavy runs is omitted as redundant: only acceptance records and exact copied delivery images changed after the verified runtime. Any runtime/input dependency change reopens the relevant checks. No new playtest is claimed on 2026-09-26.

Post-acceptance organization keeps source/test ownership and approved historical decisions. Nine real screenshots, their SHA-256 provenance and a factual devlog outline are available in the [delivery material](../../../docs/qa/deliveries/updated-narrative-copy/README.md). Raw runs, save archives, logs, measurements and prior candidate inventory were copied to `.artifacts/archives/updated-narrative-copy-accepted-20260926/`; its `manifest.json` records all 1,523 original/destination paths, sizes and verified hashes (1,744,491,500 bytes). Originals remain intact. This archive is local only and is not a remote backup or fresh-clone dependency. Git ignore checks exclude raw/archive output and retain selected delivery images. No new ignore rules were necessary.

The pre-commit review includes the branch's four existing source-edit commits as approved narrative inputs and historical review prompts, plus the implementation and delivery material. The prompts' example paths/placeholders are authoring templates, not game assets or runtime prerequisites. The existing GDD/historical-ADR changes are retained as scoped source-precedence decisions; new links point to this current acceptance owner without changing historical results. Deslop review found no additional code cleanup necessary. Staged-content checks, local-link validation and syntax checks are performed before the requested commit; the commit/PR operation does not certify unrelated game-wide acceptance.
