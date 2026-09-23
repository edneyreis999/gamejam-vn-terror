---
status: approved
approved_on: 2026-09-22
verification_revised_on: 2026-09-22
stage: surface-and-technical-design
product_approved_on: 2026-09-22
implemented: true
static_verified: true
runtime_verified: true
human_accepted: true
release_ready: true
---

# Verification — Revised trap prose integration

D-005 replaces the original verification scope with static content/structure checks and visual inspection at 1280×720. D-006 requires saves produced during this spec's own tests. [ADR-003](adrs/adr-003-proportionate-prose-verification.md) records the original rationale, explicit waivers, residual risks and authority. D-001–004 product/source/design approvals remain valid. Native integration and V-001 static checks passed on 2026-09-22; the task-05 visual inspection also passed; independent review 02 is SHIP and final verification is complete.

## Sensor matrix

| ID | Requirements | Current sensor and expected result | Status |
| --- | --- | --- | --- |
| V-001 | RQ-001–007 | Static source correspondence and before/after event structure: complete approved copy in its mapped role; unchanged rules, calls, boundaries, controls/save implementation and unrelated material | PASS; tasks 01/02 |
| V-002 | RQ-001–006 | Original engine integration, controls and checkpoint tests | WAIVED by D-005; not executed, not PASS |
| V-003 | RQ-001–005 | Rendered fit at 1280×720: all 48 choice labels and risk-selected description/success/death boxes, no clipping or overlap | PASS: all 48 labels and five sampled boxes; former gameplay/Continue portions waived |
| V-004 | RQ-004/007 | Source/B1 approval applicability and honest prototype/delivery status | PASS: D-001–006 apply; prototype status preserved |

V-001 demonstrates preservation in authored data, not runtime behavior. Historical controls/Continue evidence supports the omission decision; it is not new verification of the candidate.

## Task ownership

| Active partition | Exact scope | Owner | Status |
| --- | --- | --- | --- |
| V-001/ENC | Sixteen descriptions/questions; 48 labels in `102`/`402`/picture text; 48 successes; preservation of 48 failures and map command structure | [01](task-01.md) | PASS |
| V-001/DEATH | Sixteen death paragraphs, B1 exception, mapped CE266–281 and unchanged helper/caller structure; integrated changed-file preservation | [02](task-02.md) | PASS |
| V-003/FIT-CHOICES | Sixteen choice screens / 48 labels, 1280×720 only | [05](task-05.md) | PASS |
| V-003/FIT-PROSE | Risk-selected narrative boxes in each description/success/death format, 1280×720 only | [05](task-05.md) | PASS |
| V-004 | D-001–006 applicability to delivered copy, verification and save provenance | [05](task-05.md) | PASS |

Former V-001/PRESERVE is absorbed by 01/02, not waived. Former V-003/FIT-ENC and FIT-DEATH are replaced by the two rows above; exhaustive prose-box viewing and 1920×1080 are waived. All V-002 partitions and V-003/PLAY/CONTINUE are waived. Tasks 03/04 are superseded records, not execution dependencies. Task 05 reconciles results without taking duplicate ownership of static checks.

## Scenario disposition

| Scenario | Current requirement | Removed requirement |
| --- | --- | --- |
| S-01 — Source and structure | Exhaustive static copy/association check plus scoped event diff | No loss of catalogue correspondence coverage |
| S-02 — Native lifecycle | None: WAIVED | Engine matrix, branch execution, multibox lifecycle/reread assertions, sixteen death dispatches and victim variants |
| S-03 — Directed expedition | None: WAIVED | Both route families, success/failure/sacrifice journeys, reduced party, controls, keyboard/mouse and normal/reduced motion matrix |
| S-04 — Continue/file isolation | None: WAIVED | Technical and directed checkpoint tests, close/reopen and two-file comparison |
| S-05 — Text fit | All choice labels and risk-selected narrative boxes in actual rendering at 1280×720 | 1920×1080, every prose box and repeated controls/motion captures |

Using player inputs or loading a self-produced save to reach a visual sample does not reinstate S-03/S-04. Missing required visual observations stay pending; exclusions are not observed passes.

## Static checks

Expected text comes from [source-catalogue.md](source-catalogue.md) plus [approved B1](revised-trap-prose-integration.narrativa.md#approved-b1-wording), independently of the edited native lists. Unchanged failures/commands are compared to the pre-edit native baseline. Record the actual comparison command/script and revision in the owning task; there is no engine test filter to run for this delivery.

- Compare every accepted body and ordered approach association; allow only documented presentation breaks/controls, preserving punctuation, words and paragraph order.
- Check all three label consumers and preserve their branch IDs, indices, picture bindings and control tags.
- Parse changed JSON and compare event structure. Permit only intended text fields and message-box splits; guards, domain calls, IDs, caller/completion ownership and unrelated payloads remain unchanged. Confirm every inserted box precedes the original end/completion boundary. Do not mask entire command types when checking preservation.
- Inspect the integrated diff for unrelated engine/plugin/rule/asset/audio/save changes.

No unit/domain rerun, integration expansion, new death/encounter fixture, whole-suite run or separate spec test framework is required. Existing tests stay in place. If text expectations or fixed box counts become obsolete, maintain them narrowly without skipped/weakened assertions; do not turn that maintenance into an expanded regression project.

## Visual selection and own saves

Inspect all sixteen choice screens/48 labels once at **1280×720**. For prose, select actual candidate boxes by rendered width/line count, unusual controls and split proximity to the window, controls or advance indicator. Include description, success and death, plus any distinct risky format. A1/B3 and corrected B1 are suggested representatives when suitable, not forced random-encounter targets. Record selected passage/box IDs and why they represent the other boxes. Sampling does not prove every unviewed paragraph fits.

[Task 05](task-05.md#preparation-and-saves) owns preparation: start a new candidate campaign, create the needed saves through normal player inputs during these tests and reuse them for visual navigation. A spec must not depend on user-provided, preexisting or another spec's saves. Only saves produced by this run may be reused/resumed with provenance. No seed/state/save editing. Prefer entries before the target reading, and recreate affected saves after event-list edits rather than trusting serialized old text. Save/load is not itself a test target.

Use [local-game-run.md](../../../docs/_memory/local-game-run.md) before `npm start`; no build, new dependency or remote service. Capture and actually view required screens. Store selected images under `docs/qa/evidence/revised-trap-prose-integration/task-05/` and brief results in the task, not a new guide/charter/report tree. Record candidate revision, selected sample, self-produced save identity/entry and omissions. Inventory preexisting resources; close and confirm only those opened by the agent, including on failure.

## Risk, baseline and escalation

| Risk | Retained check | Limit / trigger to reconsider |
| --- | --- | --- |
| Missing, old, duplicated or wrongly associated prose | Full static source comparison and all label consumers | Source/mapping changes invalidate affected rows |
| Accidental branch/completion edit during box splitting | Structured event comparison and command ordering | Does not prove runtime timing; a demonstrated lifecycle defect or a required behavior/helper change needs targeted reassessment |
| Choice label overflow | Every choice screen in actual 1280×720 rendering | Changed label/font/panel requires its observation again |
| Narrative overflow | Risk-selected boxes in each shared format | An unviewed box can still fail; clipping or distinct formatting expands only the affected sample |
| Controls and saves regressions | Preserve implementation and command boundaries; reference historical V-005/V-007 | These systems are not freshly tested. Changed controls, persistence, bindings or checkpoint ownership invalidate the prose-only assumption |

[Previous completed verification](../approved-narrative-dialogue-staging/verification.md) records V-005 controls and V-007 native/directed Continue as PASS. It supports not repeating unchanged systems; its screenshots and saves are not inputs for this run. Explicit D-005 waivers, rather than a claim of complete equivalence, remove integration/E2E gates for this increment. Do not hide any observed defect behind those waivers.

## Acceptance and delivery flags

Product scope, frozen prototype source, B1 correction and complete design remain accepted under D-001–004. D-005 approves this reduced verification; D-006 requires independent save preparation. Final creative judgment beyond the accepted prototype remains separate; no new blanket human gate is introduced.

- `implemented`: required native text edits exist.
- `static_verified`: V-001/ENC and DEATH pass on the current candidate.
- `runtime_verified`: the current V-003 visual contract passes; this flag is scoped to observed text fit, not waived engine/control/save behavior or all unsampled prose.
- `human_accepted`: applicable explicit approvals remain valid under V-004; agent inspection is not a new human judgment.
- `release_ready`: implementation and the five active partitions are complete, no blocking observed defect remains, and exclusions/sample limits are recorded.

At the reduced-plan authoring revision all delivery flags were false; current execution states are the frontmatter above. Do not relabel any waived historical partition PASS.

## Historical authoring record — before D-005

The audits below describe earlier documents and their original five-task/twelve-partition plan. They are retained as history, not current execution instructions. D-005 and ADR-003 supersede their test-selection and task-graph claims; they do not erase prior source/approval checks.

## Authoring audit

Initial Stage 1 draft audit, before D-001 acceptance: product requirements contained player outcomes; native ownership and fixture observations were confined to source analysis. Technical design was deferred explicitly. Local source bodies were preserved by hash and the unresolved B1 conflict remained visible. Actual authoring checks on 2026-09-22: six local Markdown documents; all relative link targets exist; all sixteen embedded source bodies match their original SHA-256; seven unique requirement IDs are covered by the sensor matrix; whitespace checked with `git diff --no-index --check` against each new file. Result: PASS for draft-document structure and source preservation only. No runtime/GDD modification, task file or staged change was created in that initial pass. Those checks did not close product decisions or promote gameplay flags.

Follow-up on 2026-09-22: the user accepted D-001. The spec, narrative contract, stories, source-analysis decision note and this matrix now distinguish that accepted correction from remaining approvals; the canonical GDD's B1 sequence was updated and ADR-001 added. The frozen catalogue and review-01 remain historical. No runtime change or gameplay acceptance is claimed.

Stage 2 follow-up on 2026-09-22: D-002 confirmed the full scope and its reviewed prototype source (D-003). The canonical GDD and ADR-002 record the later boundary. UI/UX and Programação drafts, exact native label consumers, multi-box lifecycle/save contracts, focused test selections and risk-grouped evidence requirements are now proposed for complete-spec approval. No tests, runtime edits, task graph, game, browser, editor or server were started during this authoring step.

## Stage 2 document audit — before D-004

**PASS — documentation prepared for complete-spec review only.** On 2026-09-22, local Python inspection checked all eleven Markdown documents in this spec directory: relative link targets exist and are tracked or included in this candidate; scenario-table rows are contiguous; seven unique requirements have acceptance mappings; the frozen source SHA-256 is unchanged; approved B1 copy matches the canonical GDD. `git diff --check` covers the tracked GDD edit, and `git diff --no-index --check /dev/null <file>` covers each untracked document. Runtime files are unchanged and the index is empty. No gameplay flag is promoted by these checks.

The candidate is the modified canonical GDD plus these eleven new documents, against native baseline `04d5253e81fcd22ec0c120b9e82bd17d2bf541c1`. There are no deletions or proposed runtime files. File hashes were recorded in the authoring tool output; later changes require checking the affected document claims again.

| Candidate group | Disposition and maintained purpose |
| --- | --- |
| Canonical GDD; ADR-001/002 | Keep: authoritative product decisions and scoped historical supersessions, with reciprocal GDD links |
| `spec.md`, `_user_stories.md`, narrative/UI/UX/programming contracts | Keep: product, reader-facing behavior and native integration ownership; technical proposals remain draft |
| `verification.md` | Keep: sole current verification matrix, commands, required evidence, audit and delivery status |
| `source-analysis.md`, `source-catalogue.md` | Keep: locally available source provenance, immutable source bodies and inspected native mapping; the game never loads them |
| `review-01.md` | Keep as frozen history: pre-decision review and its input fingerprint; current decisions are in the spec/ADRs |

No output logs, captures, assets or temporary execution files were produced. No archive, staging, commit or publication was performed. At that audit, the complete design was reviewable from maintained files and final approval was outstanding; D-004 below supersedes that approval status. The existing devlog suggestion remains applicable after implementation, with no fabricated capture.

## Complete-spec approval and task handoff

On 2026-09-22 the user approved the complete design and requested task generation: “está aprovado, pode gerar as tarefas” (D-004). Spec, verification, stories and all three discipline contracts are marked approved; GDD records technical approval. Runtime delivery flags remain false.

[tasks.md](tasks.md) and task-01 through task-05 materialize the approved work: encounters, death sequence, controls/Continue, QA planning, QA execution/final verification. Task 03 joins both content tasks and is the only implementation leaf; 04/05 form the single ordered QA tail. All execution statuses remain pending. No runtime data/code, test implementation, save, browser/server, Trello card, index or commit was changed by task generation.

### Task-generation audit

**PASS — documentary decomposition only, 2026-09-22.** Checked five pending task files against the graph and this ownership table: acyclic dependencies, one primary owner for each of twelve sensor partitions, the sole implementation leaf feeding the ordered QA pair, and task/graph dependency agreement. All seventeen local Markdown documents have valid local link targets and pass whitespace checks; the frozen source hash is unchanged, the runtime diff is empty and nothing is staged. No runtime tests were executed.

A native read-only survey cross-checked the contracts against current suites. The task text explicitly covers all sixteen multibox descriptions/rereads, all sixteen death helpers via CE291, the named independent source fixtures and revised-text reduced-motion coverage. The parent checked suggested gaps against the actual code: initial descriptions already run for every encounter in the current matrix, but only one box is consumed and reread is currently limited to A1. This observation is a reason to extend the tests, not a new gameplay defect claim.

Keep the six added task documents: `tasks.md` is the dependency/coverage tracker and `task-01.md`–`task-05.md` own scoped execution/evidence obligations. Preserve the previously inventoried source and review artifacts. The candidate now contains the GDD modification and seventeen new spec/task documents, with no deletions. Approval-status reconciliation does not change the approved behavior or make any pending task complete. Execution remains unstarted.

## Reduced-plan handoff — D-005/D-006

The user approved applying the reduced proposal and requested its rationale ADR on 2026-09-22. The active graph is 01 → 02 → 05 (05 depends on both content tasks); 03/04 retain supersession records. Verification, spec and discipline contracts now reference the same static-plus-visual scope. The source catalogue, frozen review, prototype wording and runtime are unchanged. No game, save or runtime test was created by this update.

### Documentation audit

**PASS — reduced-plan documentation only, 2026-09-22.** Checked local links/section targets, Markdown whitespace, three pending tasks with valid dependencies, two superseded records and one owner for each of five active partitions. All game-delivery flags remain false. Frozen source, review and approved narrative are unchanged; runtime diff and Git index are empty.

Candidate disposition: keep the revised graph/tasks as execution instructions, verification as the evidence authority, aligned spec/discipline notes as contracts, and ADR-003 plus reciprocal GDD/general-ADR/directive links as decision provenance. Keep 03/04 as concise transfer records; no duplicate QA documents or evidence tree were created. Sixteen existing documents were amended and one ADR added in this revision; no deletion, staging, commit or publication. No game/browser/server resource was opened.

## Release verdict

**PASS — release ready for this approved prototype prose increment, 2026-09-22.** Tasks 01/02/05 and all five active sensor partitions are complete. [Independent review 02](review-02.md) is SHIP with no confirmed open finding. `implemented`, `static_verified`, scoped `runtime_verified`, applicable `human_accepted` and `release_ready` are true. Tasks 03/04 remain superseded; engine/E2E/controls/Continue/second-resolution partitions remain WAIVED, not PASS. Final creative canon and unviewed prose are not certified. No commit or publication occurred.

## Execution evidence — 2026-09-22

Tasks [01](task-01.md), [02](task-02.md) and [05](task-05.md) own the executed results. Native baseline: `04d5253e81fcd22ec0c120b9e82bd17d2bf541c1`. `python3 planos/tasks/revised-trap-prose-integration/integrate-prose.py` exits 0 for exhaustive copy/structure checks. The sixteen frozen source bodies/hashes match PR25 Git objects, and all thirty retained success-fixture expectations match that independent source. `git diff --check` and Node syntax checks for the maintained encounter suite/visual recipe pass. Existing engine tests were maintained narrowly but not run, per D-005.

Final directed collection: `e8a6bfee-ae8b-4299-b739-0347693799fa`, exit 0 with no browser errors; all inventoried game bytes equal the current candidate. Task 05 records the two earlier fixture/navigation failures and their concrete corrections, own-save provenance, sample rationale and separate visual inspection. All sixteen choice images and five narrative samples were actually opened; no clipping/overlap was observed. [Selected images and manifest](../../../docs/qa/deliveries/revised-trap-prose-integration/manifest.json) remain readable from maintained files. Raw reports, all public inputs, source snapshots and unchanged own saves remain local-only under the ignored evidence root named in task 05.

V-004 preserves D-001–006 and the accepted prototype boundary; no new final creative judgment is claimed. Static preservation does not prove waived engine/input/save behavior. The visual sample does not certify unviewed prose. B6-3's known inherited ambiguity remains outside the approved correction boundary.

## Candidate audit and organization — 2026-09-22

| Candidate group | Disposition / consumer |
| --- | --- |
| Map007–022 and CommonEvents.json | Keep: the 17 native runtime content owners; removing them would omit the delivery. Engine/plugins/assets and save implementation have no delta. |
| Existing encounters.mjs and approved-trap-successes.json | Keep: narrow maintenance of authored box count and independent expected copy; no new test family, weakened assertion or executed-engine claim. |
| Existing spec, discipline, source/review and ADR files | Keep: accepted source, authority and traceability. Frozen source-catalogue/review-01/source-analysis preserve history; current task/verification states own execution. |
| integrate-prose.py | Keep: required scoped mutation, baseline preconditions and reproducible static comparison; standard-library only, never a runtime dependency. |
| task-05-visual.mjs and task-05-request.json | Keep: reproducible directed visual recipe; fresh execution needs no external save. Own archive input in task notes is a historical optional resumption. |
| 21 selected delivery PNGs and manifest | Keep: complete contracted visual inspection and devlog material, with hashes/provenance. No extra delivery report. |
| GDD, standing directives, ADR index/G006 changes already present at intake | Preserve: same spec's approved D-001–006 provenance. Completion-only GDD reconciliation does not add product decisions. |
| Raw run output, fixture copies, navigation captures, save archives | Retain locally outside the versioned candidate under the existing ignored evidence/.artifacts conventions; no deletion or new archive tree needed. Fresh execution generates its own inputs. |

No deletion, archive relocation, index change, commit, PR, Trello operation or publication. Selected PNG copies were byte/hash verified; all spec local link targets resolve; required source/metadata are maintained rather than tied to a private save. The accepted prototype/verification approvals cover this organization; no additional human gate is introduced. Resource teardown is confirmed in every run report and by the final process/port check.

### Final verification and reconciled review

Review 02's fingerprint `ef97bfba63d122fc15331f14ad9b73e1b8be6450dfa89311119e92910e26a234` freezes its reviewed inputs. Its sole closure follow-up was tracking state; task checklists, graph and this verdict are now reconciled. Subsequent edits only close/document already demonstrated states; runtime, fixture, transformation and visual recipe bytes remain as reviewed. The incidental Python cache is ignored and excluded from delivery. `deslop` reviewed the scoped implementation/test/tooling diff and found no further correction necessary.

Final candidate: 23 modified tracked files (17 game data, two test-maintenance files, four existing design/directive documents), 44 additions (22 spec/task/tool/review documents and 21 selected PNGs plus one manifest), zero deletions. Eighteen of the spec documents and the four tracked design/directive edits already existed at intake; their authority is preserved, with execution status reconciled in the existing owners. Git index remains empty. All required links resolve, selected-image and runtime hashes match, syntax/JSON/whitespace checks pass, and no owned process remains. The complete verdict is scoped to these prose changes and maintained evidence, not to unrelated historical creative acceptance.
