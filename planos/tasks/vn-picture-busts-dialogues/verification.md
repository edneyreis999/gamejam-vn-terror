---
status: approved
implemented: false
static_verified: true
runtime_verified: false
human_accepted: false
release_ready: false
---

# Verification — Native ensemble dialogue

> **Closure update — 2026-09-11:** the user accepted the consolidated development delivered by [vn-focus-parameters](../vn-focus-parameters/spec.md#accepted-consolidated-delivery--2026-09-11). This document preserves the historical contract, status flags and execution results of this increment; they do not describe a pending task in the current accepted scope. The [current acceptance record](../vn-focus-parameters/verification.md#human-acceptance-and-closure--2026-09-11) owns the final state. Final PNG framing and the historical unavailable-editor sensor remain explicitly deferred; no historical FAIL/BLOCKED result is relabeled as a successful test.


The [spec](spec.md) and all three discipline contracts are authorized for execution under [ADR-003](adrs/adr-003.md), following the product decisions in [ADR-002](adrs/adr-002.md). No additional user approval is required to create or progress through the complete task graph. None of the implementation/evidence states above is satisfied by that authorization.

## Existing investigation evidence

The original source investigation identified 63 sections / 103 bust-bearing boxes within 258 sections / 282 indexed Show Text commands. Its content validator passed on native revision mz-20260910-retirement-01 with Node v22.23.2. [Inventory](inventory.md) and [source-evidence.json](source-evidence.json) preserve that pre-interview baseline.

The later read-only ProjectX investigation traced Map020's 12 events / 15 pages and the four switch-triggered focus Common Events. The installed plugin files match byte for byte. [Reference analysis](reference-map020-analysis.md) records locators, settings, differences and limits. This is source analysis, not a playtest or a new runtime verdict.

GDD updates during consolidation record accepted interview decisions. The original GDD fingerprint in source-evidence.json remains historical; it must not be overwritten to pretend the pre-interview inventory was produced against the new design. Runtime-source equivalence is checked separately from this intended design change.

## Sensor Matrix

| ID | Requirement | Sensor | Setup/inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001/003 | Static structured comparison | Frozen source, current native sections/helper graph | Preserve 258 identities, 282 text boxes and exact text/status/order; migrate all original 63/103 sites; record Council challenge as additional staging; remove automatic speakerBust construction | Task09 preservation-post-review-20260911.json: 258 sections, 282 boxes, 63 original targets and 1,234 protected files unchanged | CommonEvents, System, EventBridge, inventory | pass (current source 7b161464) |
| V-002 | RQ-001/004 | Node unit tests and content CLI | Literal commands, helper graph, branches, malicious/malformed mutations | Supported graph accepted; unknown namespaces/args, script/eval, invalid arrays/slots/assets, forbidden variable writes, recursion and untaken unsafe branches rejected; no evaluation | [Task 01 focused run](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-01/2026-09-11T07-30-41-150Z/tests.log), 12/12 + CLI; current post-RD1 full138/138 and CLI0 | Parser, vendor metadata, fixtures, projections | pass |
| V-003 | RQ-002/004/005 | Chrome integration and directed playtest | Cold/warm images; one-person, same speaker, alternating speakers; controlled missing-asset fixture | Correct configured image before readable text; intentional interpolation only; Retry on missing image; no stale animation/load after cancel or exit | Task02 final 5/5 + CLI; repaired all-eight normal/reduced directed ledgers and scoped visual reviews (see task02) | Vendor, EventBridge, images, native recipes | pass (current full138 and T×2; retained pixel matrix qualified) |
| V-004 | RQ-002/003/008 | Native integration and directed journeys | All hero families, Council 0–3 eligible heroes, both discovery orders | Only eligible participants; exact accepted Council order; hero hide/return without campaign changes; correct asset/focus per box | Task09 campaign-variant-ledger-20260911.json and council-bank-ledger-20260911.json: 24 legal directed lots, 63 targets in both modes, 21 eligible hero-slot pairs; guard-only impact audit accepted; current full138 plus C1/R1/T×2 confirmations | CampaignRules, events, projection, GDD | pass (current + scoped retained evidence) |
| V-005 | RQ-003/005 | Integration, directed input and visual | HIDE, restore, skip, scene boundaries, independent picture owners | Restore consumes input; no extra advancement; conversation survives intended passage boundaries, ends at contracted scene boundaries; no damage to unrelated pictures | Task06 directed tavern/Council normal+large-reduced; IT060/064/065/066 cancellation; controls-review.json inspected stills | Input, observers, helpers, cleanup, scenes | pass (current suite + retained directed controls; impact audit09) |
| V-006 | RQ-005/006/008 | Save unit/integration and directed Continue | New revision, saved helper stack, pending farewell, Council stages, terminal replay; incompatible old save | Correct reconstructed composition; refreshed derived slots; no repeated text/death/choice/checkpoint; old save refused without deletion; New Game works | Task05:18/18+CLI, real checkpoint archive/reopen/branch, genuine old-revision refusal, legal pending-farewell/terminal journey and inspected Continue stills | Manifest, System, recipes, save/owner lifecycle | pass (current suite + new C1/R1 archive; prior boundaries retained) |
| V-007 | RQ-002/007/008 | Agent visual inspection of stills and temporal evidence | All 12 assets, 1280×720 and larger area, maximal ensemble, normal/reduced motion | Recognizable faces, readable names/text, original art orientation, correct sides, constrained reflection/prisons, stable scale/tone/movement and no intrusive flash | Task09 parent scoped visual records plus tavern-visual-review-20260911.json (254 PNGs); known lover-prison failure in both areas/orders | Assets, framing, UI/UX, executing agent | fail: visible prisons absent; other inspected framing/text/focus passes |
| V-008 | RQ-001/007 | Brief editor editability check; separate native-data runtime fixture and documentation review | One representative VNPictureBusts command/position-or-scale field in a disposable MZ project; all-eight recipe inventory and authored-change fixture checked outside the editor | Plugin command is available and its parameter can be edited/accepted; native-data change affects Chrome runtime; README supports a fresh clone. No per-hero editor matrix, save/reopen/export cycle or editor playtest | IT067 native authored change PASS;32/72 inventory and README delivered; CUA cannot obtain installed running MZ window | Native data, command metadata, parser, README, manifest | blocked: editor command-dialog evidence |
| V-009 | RQ-002 | Native integration and authoring-fixture visual | Isolated 2x2 with existing assets and a preserved test transcript | Two occupied slots per side, one active focus, group exit and repeat without residual state; no new production story | IT06809-17-04 + inspected visual-review.json,20boxes,4focus targets,cold/warm,normal/reduced,temporal entry/focus/exit; current post-RD1 IT068 full-suite PASS | Same production command grammar/owner, fixture | pass |

Parser coverage stays in rpg-maker/tests/suites/content.mjs. Formation, sacrifice, discovery, endings, memorial, shared-ui and persistence own their respective invariants. Register justified new cases in the existing test manifest; do not create duplicate regression files. Expectations must come from the reviewed content/composition contract, not a second output generated by the migration being tested.

## Task ownership

The user requested creation of the [task graph](tasks.md) on 2026-09-11. Tasks01–06 are completed, including RD0001 repair and the post-fix full suite; task07 implementation is delivered with an editor evidence blocker; task08 planning is completed and task09 finished independent QA/review/final verification and remains blocked by V007 and inherited V008 under ADR-003. Each sensor has one primary owner; the QA tail consolidates freshness and sends required repairs/reruns to that owner instead of duplicating acceptance.

| Verification ID | Primary task | Supporting/final work |
| --- | --- | --- |
| V-001 | [04](task-04.md) | 01 baseline; 02/03 family migrations; 09 final freshness |
| V-002 | [01](task-01.md) | 02–07 grammar consumers; 09 final freshness |
| V-003 | [02](task-02.md) | 03–07 shared readiness use; 09 current-source consolidation |
| V-004 | [09](task-09.md) | 02–04 implementations and legal variant preparation |
| V-005 | [06](task-06.md) | 02–05 owner/stage support; 09 retained/rerun evidence |
| V-006 | [05](task-05.md) | 01–04 native data; 06 reconstruction interruption; 09 freshness |
| V-007 | [09](task-09.md) | 02/03/04/07 framing/capture inputs |
| V-008 | [07](task-07.md) | One brief editor check under ADR-004; all-eight recipe inventory and runtime fixture outside the editor |
| V-009 | [07](task-07.md) | Production-path isolated 2x2 recipe and D-09 variants |

Task 08 owns QA planning and the mapping of D-01–D-10 to living scenario documents; it cannot claim runtime PASS. Task 09 owns final D-01–D-08 campaign variant consolidation, retaining current D-07 save evidence from 05, D-09 fixture evidence from 07 and D-10 interruption evidence from 06. Required focused directed checks in implementation tasks remain assigned there. No task depends on human approval, including final review and verification.

## Runtime Scenarios

| Scenario | Starting state | Steps | Expected result | Evidence | Execution mode | Reason/requirement | Required variants | Evidence to reuse | Invalidation dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D-01 Tavern continuity | Legal playable tavern | For each hero, read profile and full conversation, return, select and attempt selection with a full group across legal runs | Hero persists profile→speech; Ivaí enters once; focus follows every box; group exits at conversation end; selection/full-party feedback remains one-person | PASS scoped: T normal/large-reduced, 32 sections/72 boxes each; 144 retained pixels plus final representative review; current post-RD1 T×2 PASS and112 equal stable render states | directed-browser | RQ-001/002/003/005 | All H1–H8 × profile/speech/selection/party_full; 32 sections / 72 boxes; mouse/keyboard; cold/warm; consecutive same speaker | Owning-task evidence consolidated in task09 report | CE3/5–12, projection, owner, data |
| D-02 Farewell | Legal failed approach and selected victim | Read farewell then contextual narration; repeat through permitted Continue | Only committed victim speaks; bust gone before death narration; no repeated death | PASS: L normal/large-reduced, H1–H8; native pending-farewell Continue and campaign invariants; parent still/exit review | directed-browser | RQ-003/005/006 | H1–H8 across runs; 1/2/3 candidates; pending farewell save | Owning-task evidence consolidated in task09 report | Sacrifice/domain, CE40–44, saves |
| D-03 Discovery | Completed initial route | Read lover, then receipt/assembly | Correct lover framing/prison; exit at boundary; native pieces and assembly preserved | FAIL visible prisons; PASS both legal discovery orders, identity/right placement, text, exit and map-piece invariants | directed-browser | RQ-002/003/005 | Both route orders; normal/reduced motion | Owning-task evidence consolidated in task09 report | CE46–52, assets, owner |
| D-04 Council ensemble | Final route completed legally | Narration, demand/solo, confession, Andirá, opinions, choice | Heroes enter together at demand; Ivaí right; reflected Andirá left with heroes hidden; after exit, heroes return to same slots; focus follows eligible opinions | PASS scoped: 8 C/R pairs, 21 eligible hero-slot pairs, Z zero-hero Council; raw bank has exact pre-RD1 provenance | directed-browser | RQ-002/003/008 | 0/1/2/3 eligible heroes; every hero opinion across runs; both choices | Owning-task evidence consolidated in task09 report | CE40/41/53/54, map23, GDD, projections |
| D-05 Closing | Saved terminal outcome | Memorial, epilogues, credits, Continue replay | Memorial independent; one eligible hero per epilogue; no stale bust in credits/title; saved outcome unchanged | PASS scoped: H1–H8 epilogues, zero-hero/8-death branches and terminal Continue; known inherited pause-indicator UI refinement | directed-browser | RQ-003/005/006 | H1–H8 epilogues across runs; no epilogues; 0/1/8 deaths; all endings | Owning-task evidence consolidated in task09 report | CE59–63, maps27–36, save lifecycle |
| D-06 Reading controls | Active dialogue and legally revisited read passage | HIDE/restore, valid rapid advancement, skip seen, next scene | No carried input or repeated focus; valid composition after partial/full skip; cleanup on exit | PASS scoped: task06 directed U plus current post-RD1 IT025/026/027/050/064/065; no synthetic journey claim | directed-browser | RQ-005 | 1x1 and 3x1; mouse/keyboard; normal/reduced motion; cold/warm | Owning-task evidence consolidated in task09 report | Input, owner, interpolation, data |
| D-07 Continue and revision | Isolated profiles with compatible/incompatible saves | Continue during pending native stages, inspect refusal and New Game | Correct stage, derived roster and helper ancestry; no repeated committed effect; incompatible bytes preserved | PASS scoped: task05 legal checkpoint/refusal, task09 R/L; current IT021/023/024/059/062/063/066; new exact-source master pending | directed-browser | RQ-006/008 | Tavern observational-stack fixture separately labeled; Council confession/intervention/opinions, pending farewell, terminal replay | Owning-task evidence consolidated in task09 report | Save envelope/stack, projections, manifest |
| D-08 Excluded scenes | Normal campaign | Prologue, thresholds, map reveal, illustrated ending, candidate UI, memorial | Six named exclusions unchanged; no accidental dialogue picture on other owners | PASS: native preservation, directed composition assertions and parent stills of six excluded systems in both areas | directed-browser | RQ-003/005 | All six named passages and separate image systems | Owning-task evidence consolidated in task09 report | Data, cleanup, picture allocation |
| D-09 Reusable 2x2 recipe | Disposable fixture using production command path | Enter four, alternate speakers, same-speaker box, exit/repeat | Stable two-per-side composition, correct focus and cleanup | PASS: IT068 current post-RD1 regression and four-focus fixture; task07 inspected normal/reduced/cold/warm pixels | integration-fixture | RQ-001/002; authoring capability only | All four focus targets; HIDE; normal/reduced motion; cold/warm | Owning-task evidence consolidated in task09 report | Production parser/helper/owner and fixture |
| D-10 Interrupted owner | Controlled native integration fixture | Cancel during bitmap preparation, focus, collective exit and reconstruction; unload scene | Pending callbacks/children cannot recreate disposed pictures; other pictures preserved | PASS: current IT064/066 and inherited scoped task06 controls; labeled integration evidence | integration-fixture | RQ-004/005/006 | Every owner state; nested helpers; stale saved projection values | Owning-task evidence consolidated in task09 report | Native lifecycle, owner, loader, helpers |

Use docs/qa/guides/native-mz-cycle.md and legal action recipes. Campaign variants for directed acceptance come from player actions and permitted pre-start seeds. Direct state fixtures remain labeled integration evidence. Observe through the read-only QA API; do not mutate a running campaign in DevTools.

Under [ADR-005](adrs/adr-005.md), genuine native checkpoint copies may supply repeated QA suffixes after pre-boot restoration into isolated contexts. [The study](qa-save-reuse-analysis.md) records native boundaries and tooling gaps. Task 05 verifies unchanged payload plus index capture/restore; task 08 maps bank entries to the required variants; task 09 produces Council/pre-ending masters during legal campaigns on the stable native revision. Preserve producer transcripts, hashes, roster/history, actual saved cursor and source equivalence. Report reused navigation as linked producer evidence, not a new full run. No bypass of revision validation or mutation of saved facts is permitted. At authoring, no archive existed. Execution captured eight legal Council masters and eight isolated Continue consumers. The [bank ledger](../../../docs/qa/deliveries/vn-picture-busts-dialogues/council-bank-ledger.json) preserves their exact pre-RD1 source and byte provenance; strict source checks prohibit importing them into a later source revision.

All eight tavern heroes are required delivery coverage. Maintain a ledger for H1–H8 across profile, speech, selection and party_full, totaling 32 sections / 72 boxes. An authoring demonstration may use any one conversation, but cannot replace that ledger or create a pause for sample approval. Execute variants in any useful order and continue through the entire set.

| Tavern family | Required heroes | Sections | Show Text commands | Composition |
| --- | --- | ---: | ---: | --- |
| profile | H1–H8 | 8 | 16 | Hero enters; persists into speech |
| speech | H1–H8 | 8 | 40 | Same hero; Ivaí enters on his first line; exit together |
| selection | H1–H8 | 8 | 8 | Selected hero only |
| party_full | H1–H8 | 8 | 8 | Rejected hero only; formation unchanged |

## Commands and execution status

Run from repository root. The commands below preserve the original proposed filters; actual execution results are recorded in task notes and the current report. Since 2026-09-11, use `npm start` from the repository root in place of the historical launch command below; see the [current launch instructions](../../../rpg-maker/README.md#jogar-localmente).

~~~sh
node rpg-maker/tools/validate-content.mjs --json
node --test --test-name-pattern='UT-0(47|48|49|50|51|52|53|54|57|60)' rpg-maker/tests/campaign.test.mjs
node --test --test-name-pattern='IT-(004|006|007|012|015|016|021|022|023|024|025|026|027|052|053|054|058|059)' rpg-maker/tests/campaign.test.mjs
npm --prefix "rpg-maker/The Dryland Drowned" start
~~~

Update filtered IDs for added canonical cases. Full registered suite, when required by implementation scope: node --test rpg-maker/tests/*.test.mjs. Native data revision uses node rpg-maker/tools/revise-layout.mjs --revision followed by a new unused ID; it is an authoring mutation, not executed during consolidation.

The project uses the Node test runner and real Chrome harness, not Jest. Confirm stable-port ownership before native integration; never stop unknown processes. Implementation/runtime checks and directed captures are recorded in the task notes and [current report](../../../docs/qa/reports/2026-09-11-vn-picture-busts-dialogues.md). No human review of the new composition has occurred.

## Execution authorization and optional human refinement

No row below is a dependency of task execution, QA completion or the local prototype verdict. The executing agent owns the required objective checks in V-001–V-009, including visual inspection and input behavior; tests alone do not prove those visual results. Human feedback remains distinct and must not be fabricated. The absence of human feedback alone does not prevent the loop from reaching its final task.

| Criterion | Owner | Decision | Evidence/date |
| --- | --- | --- | --- |
| Product direction: native authorship, ensemble, sides, soft dimming, tavern continuity, Council sequence | User | accepted direction | Interview and ADR-002, 2026-09-11 |
| Complete scope and uninterrupted task loop; prototype calibration delegated | User | authorized | ADR-003, 2026-09-11; no renewed approval needed |
| Framing, identity, reflection, prisons and overlap | Lucas | optional follow-up; not reviewed | Required agent evidence remains in V-007; no final-art approval inferred |
| Readability, timing, focus, HIDE and input feel | Pati / user | optional follow-up; not reviewed | Required runtime/temporal evidence remains in V-003/005/007 |
| Preserved text and speaker sequence | João/Maria with narrative owner | optional follow-up; not reviewed | Required structured comparison remains in V-001; provisional text stays provisional |

## Historical authoring candidate audit

Claim under evaluation: the documents coherently consolidate the interview, complete tavern scope and uninterrupted execution authorization. This is not implementation or release readiness.

| Candidate group | Disposition | Maintained purpose |
| --- | --- | --- |
| spec.md | keep | Changed behavior, authority and technical contract |
| verification.md | keep | Single owner of current evidence/readiness |
| Programação, UI/UX, Technical Art contracts | keep | Independent changed-discipline obligations |
| ADR-001 through ADR-005 | keep | Proposal history, accepted design, execution authorization, limited editor QA and native QA save-copy authorization |
| inventory.md and source-evidence.json | keep | Exact pre-change sites and dated implementation fingerprint |
| reference-map020-analysis.md | keep | Transcribed external recipe, evidence and adaptation rationale |
| qa-save-reuse-analysis.md | keep | Native checkpoint reuse, storage requirements, executor gap and assigned capture/restore verification |
| Canonical GDD update | keep | Accepted game-design decisions, excluding unapproved numeric tuning |
| tasks.md and task-01.md through task-09.md | keep | Authorized dependency graph, verification ownership and executable task contracts |
| Runtime data, code, generated migration and new QA reports | next execution work | Authorized by ADR-003; none produced during authoring |

The ProjectX absolute links are local research provenance; required findings are transcribed in the report. Current execution relies only on this repository and its installed assets/plugins. Historical ignored Compozy references are not execution dependencies. No archiving or deletion is required. Git staging, commit, PR and tracker publication remain untouched.

Earlier authoring checks executed on 2026-09-11, before ADR-003, with Node v22.23.2: nine Markdown documents, 47 local links resolved, all eight requirement IDs covered by the nine planned sensors, and no trailing whitespace in the spec documents. Git diff --check passed for the tracked GDD change. An initial ad-hoc coverage checker did not expand compact labels such as RQ-001/007; after correcting that checker, all requirements resolved without changing the requirements to satisfy the check. Those counts describe the earlier candidate, not the later scope/authorization amendment.

The current native content CLI was also executed during consolidation: node rpg-maker/tools/validate-content.mjs --json returned exit 0 and {"ok":true,"errors":[]}. This verifies the unchanged implementation baseline only. Of the 68 original source fingerprints, 67 remain identical; the sole difference is the intentionally updated canonical GDD. Runtime data/plugins/assets remain unchanged.

Earlier candidate disposition: ten new-to-Git spec files and one modified canonical GDD, no deletions or staged changes. The initial six-file draft was already untracked when this interview began; that candidate included retained research and consolidated additions. Its temporary fingerprint audit predates ADR-003 and is not evidence for the amended candidate.

Earlier authoring verdict: PASS for source-grounded consolidation, link/requirement consistency and candidate accounting. ADR-003 subsequently supplied execution authorization; implementation, runtime and visual evidence remain pending. Historical checks are not relabeled as evidence of the new behavior.

Scope/authorization amendment checks on 2026-09-11: all 10 Markdown documents and 57 local links checked successfully; all eight requirements retain coverage in nine planned sensors; the five active contracts consistently have approved execution status; no trailing whitespace and git diff --check passed. A fresh structured read of CommonEvents confirmed the four tavern families for all H1–H8: 8/16 profile, 8/40 speech, 8/8 selection and 8/8 party_full, totaling 32 sections / 72 boxes within the unchanged 258/282 catalog. Source comparison again found 67 of 68 historical fingerprints unchanged, with only the intended GDD design amendment differing. The amended candidate contains 11 untracked spec files plus the modified GDD, without deletions or staged changes. Amendment authoring verdict: PASS; no new gameplay or visual result is claimed.

## Task-authoring delivery

The user-requested graph was materialized on 2026-09-11 as tasks.md and task-01.md through task-09.md. At that authoring checkpoint all tasks were pending, with approval inherited from ADR-003. Seven implementation tasks precede the ordered QA planning/execution pair. All nine verification IDs have one primary task, recorded above; no task introduces a human approval gate.

Authoring validation passed: nine task/frontmatter/graph entries agree, eight edges are acyclic, all primary owners match this contract, the QA pair covers the implementation leaf, 20 Markdown documents / 148 local links resolve, six initial test filters match registered cases, and no execution checkbox is checked. Whitespace and git diff --check passed. The independent read-only survey was reconciled against current native source. This is a task-authoring PASS only; game data, plugins, assets, browser execution and implementation tests were not changed or run during task creation. The new graph/document edits supersede earlier candidate fingerprints; previous authoring counts remain historical.

## QA planning refinements

Editor-QA refinement on 2026-09-11: ADR-004 narrows V-008's editor work to one representative command/parameter editability check. Native-data/runtime proof stays in Chrome; 2x2, all-eight coverage and final QA do not add editor sessions. Amendment checks passed for 21 Markdown documents / 152 local links, unchanged nine-task dependencies and unique sensor ownership, whitespace and git diff --check. The same 67 runtime/source fingerprints remain unchanged; no editor, game or implementation test was run. Earlier candidate fingerprints/counts predate this amendment.

Save-reuse refinement on 2026-09-11: ADR-005 and the feasibility study are incorporated into tasks 05/08/09, the shared graph and affected contracts. Checks passed for 23 Markdown documents / 171 local links, nine pending tasks, eight serial dependency edges, nine unique primary sensors, unchecked execution boxes, whitespace and git diff --check. The link checker was corrected to decode URL-escaped spaces; the existing valid links were preserved. Of the 68 baseline fingerprints, the same 67 remain unchanged and only the accepted GDD amendment differs. This is planning validation only: capture/restore support and an actual native Council save archive remain pending execution; no game/editor or implementation tests were run for this amendment.

## Devlog moment

Capture the brief editor editability check and separate Chrome footage of a continuous hero→Ivaí exchange. Gorvak is an optional illustration; the delivery and coverage ledger still include all eight heroes and all four tavern families. Pair it with Council demand, Andirá's reflected intervention and restored 3x1 opinions. Include a separately labeled 2x2 fixture running in Chrome. The [selected captures](../../../docs/qa/deliveries/vn-picture-busts-dialogues/README.md) now preserve the Chrome exchange, Council and labeled 2x2. The editor capture remains unavailable. No publication or human acceptance is claimed.

## Release Verdict

NOT_READY — V-007 fails visible confinement for Pérola and Floraí, and V-008 lacks the required MZ command-dialog edit evidence because window access failed. The post-RD1 suite passed138/138 with CLI exit0; four additional directed confirmation lots passed and final evidence consolidation is complete. No user approval is missing; optional human refinement is not a blocker. Publication remains outside this increment.

## Current QA plan — 2026-09-11

Task08 [guide](../../../docs/qa/guides/vn-picture-busts-dialogues.md) and [charter](../../../docs/qa/charters/CH-vn-picture-busts-dialogues.md) bind all D01–D10 variants to existing scenario owners. Eight current-rules recipes cover21eligible occupied slots; planning-only audit is task-08/coverage-readiness-20260911. Task09 executes the remaining lots on mz-20260911-busts-native-01. Required editor V008 remains technically blocked; no runtime or human PASS is inferred from the plan.

## Final execution reconciliation — 2026-09-11

Seven tasks completed;07 and09 blocked only by the two required technical gaps above. [Dated report](../../../docs/qa/reports/2026-09-11-vn-picture-busts-dialogues.md) and [versionable verification summary](../../../docs/qa/deliveries/vn-picture-busts-dialogues/verification-summary.json) are the current outcome. Historical planning/authoring counts remain historical.

The final full-suite fixture matches all current game files and canonical tests/helpers/manifest:138/138 PASS, no failures/skips, CLI0. Only README and the directed-only nine-line read-only temporal capture delta differ; the delta was independently reviewed and exercised by two new T lots. RD1 changes owner-entry rejection guards only;1,186 manifest/native/asset fingerprints and every authored helper remain equivalent to the24 prior lots for visual/content reuse. The [four current lots](../../../docs/qa/deliveries/vn-picture-busts-dialogues/post-review-lot-ledger.json) confirm current legal T/C/R lifecycle paths and a new strict-compatible master. The other seven rosters and I/Z/L retain explicitly qualified prior-source evidence; no current replay is claimed for them.

All112 stable profile/speech render states match the retained complete tavern matrix. Independent inspection covers254 tavern PNGs; parent records cover212 unique PNGs across41 scoped reviews. These sets may overlap and must not be added as a unique total. Current temporal samples cover21normal and12large/reduced H1 frames; source/native tests supply exact timing assertions. V007 remains FAIL despite the other visual checks passing. V008 remains BLOCKED despite IT067 passing in Chrome. Review SHIP refers only to code; no new human acceptance or release readiness is inferred.
