---
status: approved
approved_on: 2026-09-18
implemented: true
static_verified: true
runtime_verified: true
human_accepted: true
release_ready: true
---

# Verification — approved narrative integration and dialogue staging

This is the verification contract for [RQ-001–012](spec.md), not an execution report. Source inspection and documentation checks do not set any implementation/runtime flag. The pinned PRs, accepted decisions and discipline contracts define expected results; tests must not derive their expected prose or sequence solely from the candidate data being tested.

## Sensor matrix

| ID | Requirements | Sensor | Setup / inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001/002/004/005/006/007/012 | Static structured source comparison | Pinned PRs, native text/branches, eight source illustrations and runtime imports | All approved content present once and associated correctly; source headings not choices; all 30 trap successes match; untouched prose retained; no source-art substitution except the explicitly authorized confinement portraits D-019 | Source-to-native correspondence and focused diff report | Source heads, native events, asset bytes, narrative contract | PASS |
| V-002 | RQ-002/004/005/006/007/010/012 | Pure domain tests using existing rules | Both route orders; collective/mixed/solo Council; both choices and total loss; all success approaches | Correct reading plan, one reward, Irati last, correct result/progression and stable eligibility; stale/duplicate actions rejected without mutation | Canonical suite outputs and independent sequence assertions | CampaignRules, configuration, fixtures, expected rules | PASS |
| V-003 | RQ-002/004/005/006/007/010/012 | Real native engine/provider integration | Multi-box prose, source Maps002/007–016/023/025–027/029–036, discovery CEs | Correct local interpreter, passage completion only after last box, one transfer/commit, no inherited attachments or duplicated branch | Interpreter/sequence/seen-state observations with inputs and rendered text | Events, Bridge, Presentation, plugin settings, fixtures | PASS |
| V-004 | RQ-003/006/007/008 | Rendered visual inspection plus deterministic geometry | Two viewport references, normal/reduced motion, all changed art/portraits/branches | Older Rheed alone and colored over black; source past palette; correct speaker/listeners; prisons/reflection; epilogue whole-image fit and no busts; readable text | Named native screenshots and transition recordings, with independent agent inspection notes | Images, maps/CEs, provider settings, layout/viewport/motion, source art | PASS — D-019, retomada de confinamento |
| V-005 | RQ-008/010/012 | Native controls integration and directed gameplay | Keyboard/mouse, HIDE/Settings, held confirmation, unread/partial/seen text and choices | No hidden choice activation or double gesture; reading only completes at true end; FAST stops at unread content/choice; settings preserve current composition | Input transcript, control state observations and screenshots | Presentation, events, provider settings, input helpers | PASS |
| V-006 | RQ-009/010 | Native audio buffer integration and actual listening | Present/past prologue, route/Council cuts, outcomes, four sliders/mute/restore | Distinct context files, no wrong-context overlap/repeated applause, ending precedence, live volumes and an audible usable mix | Buffer/descriptor observations, recorded audio, listener/date and heard result | Audio files, event cues, Options/Presentation and capture method | ACCEPTED — audição dispensada por D-020 |
| V-007 | RQ-002/004/005/006/010/012 | Native save integration and directed Continue | Two selected campaign files; genuine integrated-version reward/result/Council/ending checkpoints | Last successful checkpoint resumes; no committed action/reward/death/ending repeated; no cross-file reading/progress leak | Saved payload/index provenance, before/after hashes and Continue transcript | Rules, event lists, Bridge/SaveCore settings, save producer and source revision | PASS |
| V-008 | RQ-001/008/011/012 | Static integration and authoring-surface inspection | Combined plugin entries, live scene consumers, source docs and native assets | Engine/vendor bytes and order retained; no runtime HTML, duplicate prose authority, new dependency or hidden QA mutation; complete dialogue inventory; source statuses preserved | Scoped diff/consumer audit and one representative native editability observation if metadata changes | Whole integration diff, source hashes, native command metadata/docs | PASS |

## Canonical ownership and commands

Extend existing owners in `rpg-maker/tests/suites/`; all are registered through the existing `campaign.test.mjs` and `test-manifest.json`. Do not create a parallel spec test runner, a new content-validation command or a second engine mock.

| Invariant | Canonical owner / current relevant cases | Required adjustment |
| --- | --- | --- |
| Source transcription and prologue reading | `content.mjs`: IT-004/035/071; UT-057 retains semantic reading identity | Carry PR #19 changes, check six prologue units/nine source boxes and no premature completion. Use pinned source as prose oracle. |
| Trap result association and same-art presentation | `encounters.mjs`, existing result cases including IT-051 | Cover all 30 replacements and unchanged B3–B8/choice labels. Complete multi-box success once; competence/progression stays unchanged. |
| Route pieces and closures | `discovery.mjs`: UT-032, IT-052/053 | Both legal route orders; each piece once, new closure after its receipt, old Irati/map continuation retained; no extra reward. |
| Council/ending/epilogue rules and native execution | `endings.mjs`: UT-033–036, IT-048/054/061/073 | New order and prose; solo shares accepted wording but no fictitious participants; all eight epilogue text/art associations, outcomes and native completion. |
| Last-survivor and total-loss precedence | Existing retreat/sacrifice/endings owners: UT-026/027/028 | Retain legal solo completion and total-loss priority; no rule added for Rheed. |
| Hero conversations, farewell/prison/reflection framing | `formation.mjs`, `sacrifice.mjs`, `discovery.mjs`, `endings.mjs` | Every actual changed consumer and alternate response, with per-art targets and reduced motion. Geometry is support for visual inspection, not its replacement. |
| Reading controls | `shared-ui.mjs`, `native-controls.mjs`, `content.mjs` | HIDE/Settings/FAST, held input and partial completion across new long units and temporal cuts. |
| Audio | `native-audio.mjs`: IT-028/029 | Temporal cue replacement, current buffer volumes, mute and one-shot ownership; real listening remains separate. |
| Native Continue and save ownership | `persistence.mjs`, `native-checkpoints.mjs` | Earned current-version checkpoints at changed boundaries, two files and native failure behavior. No old-save migration test promise. |
| Native parameters / source integration | `native-inventory.mjs` and closest existing content/provider cases | Both plugin entry deltas, explicit attachment ownership, required files and unchanged unrelated providers. |

Read each current case before extending it; the identifiers above name existing owners, not a claim that their old assertions already cover this increment. Allocate genuinely necessary new IDs only during implementation and register them canonically. Do not duplicate an existing behavior under another file solely to give this spec its own test names.

| Scope | Command from repository contract | Last result | Revision / tool version |
| --- | --- | --- | --- |
| Canonical automated suite | `node --test rpg-maker/tests/*.test.mjs` | Original aggregate FAIL; 134/134 canonical composite after affected retests | Local candidate; final-composite ledger and QA report |
| Focused canonical selection | `node --test --test-name-pattern='<owned case IDs>' rpg-maker/tests/campaign.test.mjs` | 12/13 PASS then isolated IT-058 PASS216.002s; all13 now valid | Exact filters/logs in task08 |
| Directed game | `npm start` after reading `docs/_memory/local-game-run.md` | Eleven final directed lots completed; seven Continue PASS | Input-only campaigns; report records versions and hashes |

Use the existing Node 22+/Python 3/Chrome environment and temporary-profile isolation. Run the affected focused cases during implementation, then the canonical aggregate once for the integrated candidate. Do not broaden/repeat checks after PASS without a relevant new delta or unresolved concern. Recorded logs must include the exact filter, revision/source hashes and tools; no command above is evidence of execution.

## Runtime scenarios

Here, “earned save” means a checkpoint produced through legal player inputs, captured only after its file and index write complete. Synthetic state in an isolated integration fixture is permitted as a technical sensor, but never counted as a directed campaign. During directed gameplay, native inspection is read-only and all campaign changes use keyboard/mouse. Reuse an immutable saved payload only when its provenance and dependencies match the candidate; do not edit roster, seed, route assignment or read history in storage.

| Scenario | Starting state | Steps | Expected result / authority | Evidence | Execution mode | Required variants | Evidence to reuse | Invalidation dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-01 Opening | Fresh New Game, selected empty file, normal volume | Read six prologue units; HIDE/restore and Settings in each era; acknowledge final response; enter hero interaction and return | RQ-002/003/008/009/010: correct old/young compositions, text and audio, one entry to preparation, no prologue on tavern return | Pending transcript, stills, transition/audio capture | directed-browser | 1280×720 normal + 1920×1080 reduced; mouse and keyboard across the two runs; muted check | Source PR #19 art/screenshots for reference only, no integrated verdict reuse | Map002, tavern/portraits, reading plan, both plugin entries, controls/audio |
| S-02 Hero visits | Integrated formation with selectable heroes; legal party of three for rejection | Visit each hero; converse; select/remove where legal; exercise full-party response; return/cancel | RQ-008/010: all eight remain correctly framed; listeners/focus work; each alternate response restores the menu and preserves legal formation | Pending branch ledger and visual/input evidence | directed-browser | Eight heroes; main/selection/full-party; paired viewport/motion profiles; HIDE/Settings representative long dialogue | Earned compatible formation save within this candidate | Hero maps, portraits/default anchors, formation and controls |
| S-03 New trap results | Isolated real-engine fixture for each legal encounter/approach | Resolve each of the 30 successful approaches through native choices; read every box | RQ-012/010: chosen text only, same art, no bust, unchanged label; no completion before last box; progress/action once | Pending source/result ledger, state trace and representative renders | native-engine integration | All 30; each first/middle/final message layout represented; B3–B8 and failures preserved | Existing canonical fixtures after dependency review, not directed proof | Maps007–022, Rules, source catalogue, text/layout helpers |
| S-04 Expedition reading | Fresh campaign or earned reveal checkpoint | Traverse actual encounters, reread description, choose success and at least one failure/sacrifice path; use controls during a long new result | RQ-008/010/012: native result readable, farewell staged, no double choice/commit, no speculative actor added | Pending player transcript, results and captures | directed-browser | Both initial route families across the campaign runs; normal/reduced motion; keyboard/mouse | Candidate earned reveal saves only | Result/farewell events, rules, controls, save payload |
| S-05 Initial closures | Campaign reaches each initial route's last encounter through player actions | Finish lover sequence and piece; read Rheed closure; continue Irati or complete-map revelation; return to preparation | RQ-004/009/010: correct first/second text in both orders, piece exactly once, present over black then correct past continuation/audio | Pending transcript, reward/seen trace and visual/audio captures | directed-browser | Church→Park and Park→Church; solo closure additionally through S-06 integration | Candidate legal route checkpoints may shorten repeated prefix | Discovery flow, closure plans, lover/piece and audio helpers |
| S-06 Eligibility edges | Canonical legal-domain fixtures | Complete initial route with last party member lost and living reserves; reach Council with 0/1/2/3 witnesses; kill final living hero | RQ-004/005/006/007: accepted prose remains, only actual cast/opinions/epilogues, eighth death wins over route completion | Pending rule assertions and real-engine eligible-render evidence | pure-domain + native-engine integration, labeled separately | Both route identities for solo closure; Council all eligible slot/hero recipes; total loss at terminal boundary | Existing legal fixture builders after new reading-plan update | Rules, fixtures, Council/staging and ending selectors |
| S-07 Council | Earned integrated Council checkpoint | Read revelation through confession; observe repeated temporal cuts; read Andirá/opinions/Irati; reach choice | RQ-003/005/008/009/010: no old revelation repetition, narrator black alone, restored actual cast, reflected Andirá, Irati after opinions | Pending ordered transcript, cast trace, stills and transition/audio capture | directed-browser | Group Council in both motion profiles; solo mechanics/render covered by S-06, not falsely claimed as played | Candidate earned Council save; branch children remain separate | Council plan, Map023, ensemble helpers, audio, saved interpreter |
| S-08 Outcomes | Separate immutable copies of the same earned final-choice parent; separate earned total-loss trajectory | Choose each medallion outcome in its own child; finish text, memorial and eligible epilogues; reach credits/title; run loss trajectory | RQ-006/007/010: own ending/art/text only, right dead/eligible participants, no route to the unchosen ending in Continue, clean credits | Pending branch provenance, outcome transcript and images | directed-browser | Reunite, destroy, total loss; skip and finish credits on separate valid runs | Candidate final-choice parent plus independent loss campaign | Ending/epilogue/memorial events, rules, source art and save payload |
| S-09 Eight illustrated epilogues | Canonical valid ending fixtures covering every eligible hero | Read all source pages with native controls; HIDE art; advance through last page and next eligible hero | RQ-007: correct art/text association, whole image, black margins, no bust, one completed passage per hero | Pending eight-hero visual ledger and native completion trace | native-engine integration + visual inspection | Eight heroes, both viewport references, no/mixed deaths, solo and total-loss exclusions | Existing fixture authority; PR #15 original assets as visual oracle | Epilogue maps/art/import names, fitting, controls and eligibility |
| S-10 Saved boundaries | Two files earned on this version, including reward/result/Council/ending parents | Capture confirmed writes; close/reopen; Continue; perform next legitimate input; compare progress, reading and file ownership | RQ-010: actual saved boundary restored, no committed action twice, no cross-file leakage; unsaved text may restart from last checkpoint | Pending payload/index hashes and before/after traces | directed-browser + native save integration, labeled separately | Two campaign files; prologue/new-campaign boundary, reward before closure, result, Council reward, ending | Only fresh candidate earned saves with provenance | Full saved interpreter/data/reading plan, persistence settings/coordinator |
| S-11 Audio control | Scenes reached by S-01/05/07/08 | Hear contexts and transitions; change Music/Ambience/Themes/Effects including zero; return from Settings/HIDE and Continue | RQ-009: correct audible palette, no unintended overlap or repeated welcome, ending theme precedence, preserved settings | Pending audio recording plus listener/date; buffer state alone insufficient | directed-browser for control, native-audio integration for buffer, listening for heard result | Present/past tavern/expedition/Council/endings; FAST at seen boundary; mute and nonzero | Current-run recordings may serve multiple matching scenario claims | Exact audio files, event levels/order, settings and capture routing |

At least one complete fresh campaign must connect opening, both initial closures, Council, chosen ending and credits. Use immutable checkpoints for alternative choices and controls instead of replaying unchanged prefixes unnecessarily. If a required variant has only fixture coverage, label it as such. Missing directed evidence stays pending rather than being inferred from a unit PASS.

## Visual and audio evidence

Capture stable message boundaries and transitions separately: a still does not prove entrance/focus/exit motion or one-shot timing. Record candidate revision and asset hashes, map/event, passage, living/current/climax cast, viewport, MZ logical area, motion preference and input path. Read-only observations may explain a capture; they do not replace viewing it. Inspect original image files when a viewer preview appears clipped or blank, following the lesson from PR #19's source visibility report.

For whole-image fit, compare all source edges at HIDE and verify the proportional native target; do not rely on “a screenshot exists”. For narrator cuts, inspect no past background or listener remaining behind Rheed and the restored past composition after his exit. Audio requires listening to the emitted sound as well as native descriptors, covering whether the mix supports reading; file existence or decoding is not an audition.

Store fresh run evidence beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/`, respecting the existing ignored-raw-evidence convention. Any selected versioned delivery evidence needs a provenance file with source hashes and actual scenario claims. Do not relabel another PR's source captures as this candidate's evidence.

## Human acceptance and accepted limits

| Criterion | Authority / owner | Decision | Evidence / date |
| --- | --- | --- | --- |
| Complete spec set, technical design and verification contract | User | Approved with F-01 wording clarification applied; no runtime acceptance implied | “aprovado” after requested validation, 2026-09-18; [approval record](spec.md#stage-approval) |
| PR #15/#16 source prose and supplied PR #15 art | User, D-001/002 | Accepted; no new editorial/art approval gate | Conversation decisions, 2026-09-17 |
| PR #18 integration boundary and known consistency limits | User, D-017 | Accepted prototype prose; later consistency work excluded | Conversation decision and ADR-002, 2026-09-17 |
| Epilogue whole-image fit; present/past framing; black narrator background | User, D-003/013/018 | Design accepted; actual renders inspected, confinement exception tracked separately | Conversation decisions, 2026-09-17/18; QA report2026-09-18 |
| Fidelity, readability, motion and cut composition of the integrated game | Required visual sensor; UI/UX and Technical Art review of actual output | Agent inspection complete; user accepted delivered rustic confinement with “Perfeito” on 2026-09-18 | QA report and deep-review,2026-09-18 |
| Actual audibility and usable temporal mix | Required listening sensor; record the actual listener and method | Accepted by user under D-020; audition deferred, no listening claim | Actual WAV delivery attempt; QA report2026-09-18 |
| Optional later taste/comfort or prose refinements beyond confirmed requirements | User / discipline owners | Follow-up only; no new blanket editorial acceptance gate | No delivery date assigned |

No mobile, browser matrix, native zoom, screen-reader certification, unrelated new-art production, old-save migration or wholesale text-consistency review is added. D-019 authorizes only the two confinement portraits. Existing unrelated provisional art retains its status. If a required sensor cannot run, document that exact evidence gap; never convert it into an observed PASS.

## Freshness and lifecycle

Recheck all five PR heads before implementing. If a source moved, compare that delta against the accepted scope instead of importing it silently. Evidence from the pinned source deliveries is reusable for source provenance only. Changes to prose invalidate its correspondence and relevant reading/render checks; changes to global bust defaults invalidate their actual consumers; changed rules/save lists invalidate boundary fixtures and earned-checkpoint reuse; audio changes invalidate audio evidence even when screenshots are identical.

`implemented` requires the approved runtime/doc/asset changes. `static_verified` requires V-001/008 and applicable domain/source checks. `runtime_verified` requires native integration, directed scenarios, visual/control/save checks and audio execution/listening. `human_accepted` records completion of applicable acceptance judgments without reopening already accepted or expressly deferred content. `release_ready` cannot become true while a required scenario is failed, stale or unobserved.

## User-authorized acceptance changes — 2026-09-18

D-019 delegates creation and style matching of the two confinement assets to the agent. D-020 accepts audio for this delivery and transfers any later listening/mix adjustment to the user; V-006 retains its technical PASS but its listening component is **WAIVED**, not observed. D-021 likewise removes the actual editor/devlog capture from completion gates, to be done manually by the user. No new audio files, cue changes or editor capture are claimed. These decisions supersede conflicting mandatory listening/editor requirements elsewhere in this planning document and task10. They do not certify unrelated provisional assets or a broader game release.

The two authorized confined portraits are now integrated and validated. No further permission is needed for this scope. Native IT-052/053 own affected route branches and continuity; real render inspection owns the visual judgment. Historical directed gameplay remains applicable to unchanged rules and text, not as an image of the new assets.

## Release verdict

**PASS — spec concluída e aceita, 2026-09-18.** Dez tarefas concluídas. V-001/002/003/004/005/007/008 PASS; V-006 conserva PASS técnico com audição dispensada pelo usuário em D-020. Captura manual do editor dispensada como bloqueio por D-021.

`implemented: true`, `static_verified: true`, `runtime_verified: true`, `human_accepted: true`, `release_ready: true`, exclusivamente para o escopo desta spec. O usuário respondeu “Perfeito” às artes rústicas entregues de Pérola/Floraí, concluindo o aceite visual pendente. Os dois PNGs aceitos têm SHA256 `0e3a5b295222d640f34886fe7161ef8904e0a14a00e6d806fe3f77d53bb5e59d` e `e943de52594d56565a1597353ceae53e267806bf8e979bf7655fcc3cc5bc31fd`, respectivamente. A conferência prévia ao registro confirmou todos os22 caminhos do candidate-audit inalterados e todos os inputs registrados de IT-052/053 equivalentes; nenhum novo teste de jogo foi necessário nem alegado.

Organização pós-aceite: conservar os arquivos mantidos auditados e as quatro capturas selecionadas com proveniência em `docs/qa/deliveries/approved-narrative-dialogue-staging/confinement/`; versões anteriores e evidências brutas permanecem locais/ignoradas, preservadas no diretório de QA indicado em task10. Nenhuma exclusão, reorganização de trabalho alheio ou nova seleção no índice. Commit, push, PR e merge continuam não realizados.

O áudio poderá ser ajustado pelo usuário e a captura do editor será feita manualmente depois, sem impedir esta entrega. Não se declara audição executada, imagem de editor existente ou prontidão de escopos externos. Os registros cronológicos abaixo mantêm os vereditos históricos.

## Revalidação final solicitada — 2026-09-18

**PASS, restrito à entrega desta spec.** O final verify anterior permanece válido. Antes deste registro, os22 arquivos do candidato aceito estavam inalterados, assim como todos os inputs registrados nas execuções finais IT-052/053. Dos76 inputs do composto de134 casos, somente `CommonEvents.json` e `discovery.mjs` diferem da execução anterior, pelo delta de confinamento já coberto pelas duas execuções finais PASS. As duas artes e quatro capturas selecionadas mantêm seus hashes; engine/vendor preservados e dez tarefas concluídas. Não houve nova execução de jogo: evidência retida por equivalência dos inputs conforme ADR-G006, sem ampliar sua cobertura.

Checagens atuais:188 destinos relativos de Markdown existentes, `git diff --check` PASS e índice vazio. HEAD `82aad84dd5df2376e18d53720747fae8d8c0e9ac`; workspace com82 arquivos modificados e103 não rastreados. A auditoria e as disposições anteriores permanecem aplicáveis; esse inventário inclui trabalho externo ao incremento e não recebe aceite global. D-020/D-021 continuam sendo dispensas autorizadas, sem alegação de audição ou captura do editor. Esta revalidação altera somente este registro documental; nenhuma ação de stage, commit, push ou merge foi executada.

## Seleção para publicação — 2026-09-18

O usuário autorizou commit, PR para `main` e fechamento dos PRs15–19. Seleção:181 caminhos (79 modificados e102 adicionados), preservando fora do commit `AGENTS.md`, `docs/_memory/spec-authoring-playbook.md`, `docs/_memory/standing_directives.md` e o diagnóstico temporário `task-05-diagnose.mjs`. Os demais caminhos seguem as auditorias existentes. O GDD e o README de retomada entram pelo aceite posterior; o índice das ADRs G004–G006 foi revisto e acompanha suas decisões já aceitas, necessárias à rastreabilidade da entrega. Nenhuma nova decisão de produto foi tomada.

Revisão `deslop` contra `main` sem correção necessária; o candidato permanece equivalente ao final verify. A única diferença desde a auditoria aceita é este registro de verificação. As cinco fontes remotas conservam seus heads fixados e estavam abertas antes da publicação; `origin/main` não contém commits ausentes da base local. Resultados históricos e evidências brutas locais preservados. Esta seção registra a seleção e a autorização; a PR no GitHub será a fonte do estado de publicação e fechamento, sem alegar merge.

## Authoring audit — 2026-09-18

**Historical claim: PASS for the documentation set's readiness for full-spec review only.** At the time of this audit, the user had confirmed product scope and D-018, while technical proposals remained draft. The subsequent validation and full-spec approval are recorded below; the original audit did not establish implementation/runtime evidence.

The playbook requests a six-marker check but does not enumerate marker names in the consulted instructions. For this review, the six checked dimensions follow the current MZ spec/verification templates: (1) objective and observable product outcomes, (2) scope/exclusions and accepted limits, (3) authority and explicit supersession, (4) native ownership/state/lifecycle, (5) requirement-to-sensor traceability and honest evidence status, and (6) unresolved decisions/approval handoff. All six are covered in this set. Product requirements are kept separate from the technical design; no extra product feature is introduced by an implementation detail.

Actual authoring checks: `git diff --check`; relative Markdown target existence; 12 unique RQ headings and 12 acceptance rows; eight sensor rows and eleven scenario rows; structured confirmation of eight PR #15 heroes and 17 source pages; no modified runtime path and no staged file. These checks validate the authored contract, not native execution. The local-only candidate inventory, hashes and checks are at `docs/qa/evidence/approved-narrative-dialogue-staging/authoring-2026-09-18/candidate.json`; this raw audit is not required by the game or a fresh clone.

| Candidate group | Disposition | Maintained purpose and duplication boundary |
| --- | --- | --- |
| `spec.md`, approved user stories and five discipline contracts | Keep | One integration contract, player outcomes and independent discipline ownership; technical details are referenced rather than redefined in historical specs. |
| `verification.md` | Keep | Sole owner of acceptance sensors and candidate evidence status; no runtime PASS inferred from intake. |
| Three local ADRs | Keep | Preserve supersession of narrator/backdrop/audio, trap editorial boundary and illustrated epilogues. |
| Two source analyses | Keep | Pin PR #18/#19 contributions, integration interactions and historical evidence limits independently of this conversation. |
| Canonical GDD | Keep | Records confirmed design replacements and the subsequently approved technical save scope, without claiming implementation. |
| Existing resumption README | Keep, status synchronized | User-requested resumption pointer; links to the canonical spec and current approval stage without becoming another task graph. |

No candidate deletion, archive move, stage, commit, merge, publication or runtime edit is part of this authoring delivery. Source PR snapshots and completed specs are preserved. Post-approval task creation remains a separate workflow.

## Validation closure and spec approval — 2026-09-18

The user replied “aprovado” after the requested [draft validation](validation-01.md). This approves the complete spec set with its F-01 clarification. The UI/UX hero-visit row now explicitly preserves visits, conversations and selection for living unselected heroes, excludes dead heroes, and states that a visit does not add the hero to the expedition. Council and epilogue eligibility are unchanged. F-01 is resolved; no other open finding was recorded in that validation.

**Claim: PASS for approved-spec handoff to task authoring only.** The spec, five discipline contracts and verification contract are approved; the GDD, ADRs and resumption pointer reflect that status. All game-delivery flags remain false. The review report retains its original inspected hashes and findings, with a dated resolution appended.

Organization disposition: retain the existing 15-file authoring set and `validation-01.md`, whose distinct purpose is the requested review's evidence and F-01 resolution. No archive, deletion or additional status store is needed. The documentation update preserves the earlier source evidence and deferred work; future devlog captures remain assigned in the spec because there is no integrated output yet.

Approval checks cover relative-link availability in tracked/candidate files, approved contract statuses, unchanged RQ/sensor/scenario counts, F-01's corrected wording, false delivery flags, whitespace, and absence of task/runtime/index changes. The updated local-only inventory and file hashes are recorded at `docs/qa/evidence/approved-narrative-dialogue-staging/approval-2026-09-18/candidate.json`. No game test result is inferred from these documentation checks. No task graph, commit or publication was created.

## Task-authoring handoff — 2026-09-18

The user requested task creation for this approved spec. The [graph](tasks.md) and ten pending task files now define seven scene/content slices, an integrated reading/Continue slice, and one QA planning/execution pair. The graph awaits its own review; the spec and discipline approvals remain valid. No runtime work or task execution was performed.

Primary aggregate ownership is unique: task 08 owns V-001/002/003/008, and task 10 owns V-004/005/006/007. Tasks 01–07 own their scoped implementation, fixture readiness, source correspondence and focused-test contributions. Task 09 depends on the sole implementation leaf, 08, which transitively requires all previous implementation tasks. Scenario modes, variants and evidence dependencies remain those in this verification contract.

**Claim: PASS for task documentation's structural and scope readiness for graph review only.** Checks verified ten consecutive IDs, an acyclic graph, matching file/table dependencies and pending statuses, eight uniquely assigned primary sensors, coverage of all twelve requirements and eleven scenarios, the ordered QA tail, required task sections, relative targets in tracked/candidate files, whitespace, retained spec approval, false delivery flags, empty index and unchanged runtime. These are documentary checks; the canonical game suite and live game were not run. A read-only native/test inventory supported the decomposition. A second read-only pass over the materialized graph found no missing native owner or structural defect; its source-acquisition and supporting-evidence inconsistencies were corrected before handoff. Task 07 now explicitly obtains absent source files from the pinned PR commit, task 06 records ending control evidence, and task 03 supplies checkpoint entry recipes while task 08 owns the save fixtures.

Organization disposition: keep the existing 16-file spec/validation set and the eleven new graph/task files. The graph owns scheduling/dependencies and final sensor assignment; individual tasks own executable scope, local evidence and progress. Neither creates a second design or QA authority. Current spec/README pointers now lead to graph review. The GDD introduction's stale “technical design in progress” sentence was corrected to the already recorded 2026-09-18 approval; no design rule changed. Historical authoring/approval inventories above keep their original dates and hashes.

The current 27-file documentation candidate has three tracked modifications and 24 additions, with no deletions. Its local-only hashes, command results and ownership grouping are recorded at `docs/qa/evidence/approved-narrative-dialogue-staging/task-authoring-2026-09-18/candidate.json`. This ignored audit is provenance, not a required input in a fresh clone. No archive move, staging, commit, merge, remote message or tracker change occurred. Game release remains `NOT_READY` with all five flags false; task-graph approval and later execution are separate from this documentation verdict.

## Loop execution — 2026-09-18

Task01 has a scoped implementation/native PASS (7 focused canonical cases), detailed in [its execution notes](task-01.md#scoped-closure--2026-09-18). Runtime/vendor/source evidence does not close the aggregate V-IDs. ADR-G004/G006 consolidates task01's remaining transition, second-profile, directed control/Continue and listening observations into task10's existing S-01/S-11, with expected results unchanged. Task08 still owns the integrated technical verdict. All delivery flags remain false and release remains NOT_READY.


### Execution update — 2026-09-18, closing batch

Tasks 02/03: 5/5 focused native cases passed (656.7 s), including all eight hero visit/farewell owners and all 30 source replacements. Task-local notes identify remaining visual/control/directed sensors at 08/10; no aggregate flag is promoted. Tasks 04–07 are implemented and validating together after serialized writes. Their seven pure-domain/source cases pass; native closure/Council/outcome/epilogue/audio evidence is still being collected.


### Execution update — directed campaigns and corrective review

Campanhas físicas/sobrenaturais completas nos dois perfis, escolhas reunir/destruir a partir de pai comum, e perda total nos dois perfis foram executadas. Continue em sete limites tem prova dirigida, incluindo RNG/progresso do resultado comparados ao percurso pai ininterrupto. Os reports locais registram teclas/mouse, hashes de saves e teardown; não foram usados setters de campanha.

Inspeção efetiva encontrou F-01 HIDE (corrigido), F-03 indicador na descrição de Draska (reparo pendente) e F-05 retrato de Ivaí herdado dos thresholds no movimento reduzido (reparo pendente; tarefa02 reaberta). F-02 é uma lacuna do novo sensor IT-054. O agregado revelou expectativas antigas adicionais em IT-001/058/025/078, que serão corrigidas sem restaurar o comportamento supersedido. Cada resultado retido terá seu escopo de equivalência registrado; o candidato não recebe aceitação por mera existência de capturas.

A inspeção dos epílogos inteiros e de suas caixas corrigidas, imagens de heróis/despedidas e amostras temporais dos vídeos está detalhada no relatório e no deep-review. F-05 invalida a composição reduzida de encontros/despedidas até a recoleta. WAVs demonstram captura e mute técnico, mas não foram ouvidos. A janela nativa do editor não pôde ser obtida pelo sensor CUA. Esses limites não são substituídos por testes estruturais.


### Fechamento do loop — 2026-09-18

Todos os reparos F-01–F-05 foram revalidados. S-01–10 têm execução técnica/dirigida e revisão conforme seus modos; a parcela de confinamento em S-05 continua falha/bloqueada e S-11 tem apenas buffers/controles/gravação, sem audição. As evidências descritas como “Pending” na tabela de planejamento acima são substituídas pelo ledger final do [relatório de QA](../../../docs/qa/reports/2026-09-18-approved-narrative-dialogue-staging.md); não se convertem os limites de áudio/prisão em PASS.

Onze reports finais sem errors e com teardown completo, sete retomadas PASS, duas ordens de rota e três desfechos. V-008 usa IT-067 e o diff: nenhum metadado de comando mudou, portanto a condição de observação no editor não foi acionada. Isso não dispensa a captura de devlog prevista na spec. Fingerprint final76 arquivos `c947986e39abdc80e24a80ec1d8961d283065848768ad9c2f1266f059bd9772a`; auditoria de seleção, links, vendor, deslop e índice concluída sem stage/commit.
