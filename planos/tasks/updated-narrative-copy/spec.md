---
status: approved
approved_on: 2026-09-25
slug: updated-narrative-copy
stage: surface-and-technical-design
product_approved_on: 2026-09-25
technical_approval: approved
---

# Integrate the updated trap and hero dialogue

## Objective

Present the user's updated Brazilian Portuguese trap and hero texts at their correct player moments. Hero conversations start with Ivaí's opening question, without a recited identification or third-person profile. Failed approaches retain their causal explanation before victim selection; farewell and contextual death follow the committed choice.

This is a new local increment over the completed prose and reading deliveries. The original authoring request authorized specification only. The subsequent user instruction authorizes direct implementation of this spec without task decomposition or loop-tasks; commits and publication were outside that initial authorization. On 2026-09-26 the user approved the implementation and authorized final verify, commit and a PR to main; this supersedes the earlier merge request. Product decisions were resolved and accepted in the preceding interview. The user approved the complete technical spec, discipline contracts and verification design on 2026-09-25 with “aprovo” (D-006). Current implementation and evidence are tracked in [verification.md](verification.md); no task graph is created.

## Input and authority

The user explicitly designated `docs/narrativa/armadilhas/` and `docs/narrativa/herois/# Falas de cada herói.md` as the updated player copy. The similarly named `Falas-de-cada-herói.md` is not an additional input. [Source analysis](source-analysis.md) identifies the inspected revision, source hashes, native owners and differences.

| Decision | Evidence from this conversation | State |
| --- | --- | --- |
| D-001 | User supplied the 16 trap files and the exact hero file, requested mapping before implementation | Confirmed input and integration scope |
| D-002 | User said identification makes no sense at the start of a conversation; the agreed summary removes both identification and old explanatory profile | Confirmed: start Conversar with Ivaí's source question; characterization through dialogue/context |
| D-003 | User accepted both proposed A1/A5 memorial inscriptions with “estão” | Confirmed exact incremental copy |
| D-004 | After the comparison table and clarification that the pattern applies to all 16 traps, user answered “entendi. concordo com sua recomendação.” | Confirmed: six proposed pre-selection failure replacements, preserve the other 42, source general death after farewell |
| D-005 | User invoked issue-to-spec for this implementation | Specification authorized; technical approval was pending at that stage |
| D-006 | In response to the complete technical/verification approval question, user answered “aprovo” on 2026-09-25 | Complete spec set approved; implementation, verification execution and task generation remain pending |
| D-007 | On 2026-09-26, user said “a implementacao está aprovada” and requested final verify, commit and PR to main | Implementation/comfort accepted; commit and PR authorized; no merge |

[ADR-001](adrs/adr-001-approved-copy-and-dialogue-boundary.md) records the product supersessions. These decisions close Stage 1; do not repeat the product interview. No unresolved product choice is delegated implicitly to implementation. Source copy is accepted for this increment; this does not approve unseen runtime fit, art, audio or the game's overall final creative delivery.

## Scope

- All 16 descriptions and questions, 48 ordered approach labels, 48 success bodies and 16 contextual death bodies, including entries already matching the source.
- All eight heroes' presentations, successful-selection replies, full-party replies, farewells and Council opinions from the supplied hero document.
- Removal of the eight identification messages and eight third-person profile summaries before the new conversations.
- Exactly six approved approach-failure replacements and two approved memorial inscriptions, reproduced in the [narrative contract](updated-narrative-copy.narrativa.md).
- Native event integration, affected existing test assumptions, traceable source comparison, readable presentation and representative lifecycle verification.

## Exclusions

New mechanics, approaches, competencies, randomization, victims, route/ending rules, epilogues, prologue or route-discovery rewrites; new art/audio; global font/window/focus calibration; engine or plugin source changes; plugin registry changes; dependencies, build, remote services, save conversion or content-version gates. No task graph or tracker synchronization is part of this implementation. Commit and PR preparation were subsequently authorized on 2026-09-26; merging is not requested.

Gamepad and native zoom testing are out of scope under G005/G003. Historical creative gaps remain separate; this increment adds no placeholder asset and does not certify existing assets as final. Broad rewriting of hero sheets or other narrative files is excluded; record the new source precedence in the GDD instead of silently mixing versions.

## Part I — Player behavior

### RQ-001 — Correct encounter introduction and choices

Every encounter shows its complete source description and question, followed by the same three source approaches in order. Reread repeats that description without changing progress or the encounter. Titles identify encounters as before; editorial numbering, headings and competency names do not become player text.

### RQ-002 — Corresponding success

Each successful approach presents its matching complete source paragraph, with the existing encounter background and no hero/narrator bust. Text is acknowledged before the result finishes, without premature progress or duplicated actions.

### RQ-003 — Uniform failure and sacrifice sequence

For every trap: approach-specific failure → explicit eligible-victim choice → chosen hero's source farewell → source general “Falha” narration. Only the six specified pre-choice messages change; the other 42 are preserved. Do not split, duplicate or move the general death paragraph before the victim choice. Keep irreversible commitment, warning, eligibility and reduced-party behavior unchanged.

### RQ-004 — Natural hero conversations

Choosing Conversar starts directly with Ivaí's first question from the approved presentation. No identification list or third-person profile precedes it, is moved elsewhere in the conversation, or is added as a replacement overlay. Preserve all six source utterances per hero and correct speakers. Speaker names in the normal name window and the existing party-count/action menu remain; the decision removes the recited profile, not ordinary interface identity or feedback. Conversation does not change formation.

### RQ-005 — Selection and full-party feedback

After a successful addition, the selected hero gives their source reply with formation already updated. Attempting a fourth member gives that hero's source full-party reply without changing members. Removal, cancellation, automatic formation and return to the tavern retain their existing behavior; removal does not play the addition reply.

### RQ-006 — Farewells and Council opinions

Use the eight source farewells at sacrifice; only Gorvak's words differ from the inspected baseline, apart from decorative quotation marks. Each eligible Council hero speaks both source opinion paragraphs, in stable H1–H8 order, before the existing Irati excerpt and final choice. Only living climax participants speak; absent/dead heroes do not. Retain fixed advice and ending eligibility, including a solo Council with no invented speaker.

### RQ-007 — Coherent memorial

For deaths at A1 and A5, show the two exact approved inscriptions alongside the existing public death location. Preserve the other 14 causes, identity/location records, animation and memorial eligibility. Longer approved text must remain complete and readable.

### RQ-008 — Reading, staging and continuity

Keep player-paced native reading, word wrap, current typography and controls. Correct speaker focus and listening busts persist across the longer conversations/opinions; farewell exits before anonymous death narration. Unread text must not become FAST-eligible before completion, and closing a text box must not commit the following choice. Candidate-earned saves retain committed decisions and resume pending reading without applying approach/death again.

### RQ-009 — Traceable delivery and honest evidence

Every source block has one owned destination; every preserved block has a baseline comparison. Keep product approval, technical approval, implementation, static checks, runtime evidence and human comfort acceptance distinct. Provide the demonstrable moment and capture selection below without claiming any unexecuted evidence.

## Authority map

| Source | Owner/status | Governs | Change in this increment |
| --- | --- | --- | --- |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), §§1.1, 12–15, 18, 26 | Product; confirmed, with historical prototype boundaries | Campaign, narrative sequence, source priority, presentation | Record accepted copy/profile/failure/memorial replacements; implementation status in verification.md |
| [This increment's ADR](adrs/adr-001-approved-copy-and-dialogue-boundary.md) | Product; accepted D-001–004 | Scoped supersessions and exact editorial exceptions | New accepted decision record |
| [Source analysis and fingerprints](source-analysis.md) | Spec preflight; read-only facts | 17 source files and current owners | New intake record, not runtime content registry |
| [Prior prose spec](../revised-trap-prose-integration/spec.md) and [continuous reading](../dungeon-dialogue-reading/spec.md) | Historical baselines | Existing split between failure/death and player-paced paragraphs | Preserve historical results; replace only this increment's copy |
| [Hero map ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and current native maps | Accepted baseline | Real event ownership, menu and portrait lifecycle | Preserve dedicated-map/formation behavior; remove profile preamble |
| [General ADR index](../../../docs/adrs/README.md), G003–G006; [standing directives](../../../docs/_memory/standing_directives.md) | Accepted | Scope, risk grouping, evidence, teardown, own saves | Preserve; no inherited prose-only E2E waiver |
| [Narrativa](updated-narrative-copy.narrativa.md), [UI/UX](updated-narrative-copy.uiux.md), [Programação](updated-narrative-copy.programacao.md) | Approved under D-006 on 2026-09-25 | Copy mapping; readable staging; native lifecycle | See verification.md |
| [Verification](verification.md) | Design approved under D-006 | Sensors, scenarios, freshness and acceptance | Final verification and human acceptance complete; see verification.md |

## Part II — Technical design

### Game surfaces

The only planned production writes are `data/Map007.json`–`Map023.json`, `data/Map037.json`–`Map044.json`, and `data/CommonEvents.json` inside `rpg-maker/The Dryland Drowned/`. All map changes belong to event 001/page 1. Common Event changes are CE266–281 (deaths), CE282–289 (farewells when different) and CE125/161 (memorial causes). CE004 names already match; CE042, CE291, CE347, CE351 and Council focus helpers remain functional dependencies, not new prose owners.

Use native Show Text and existing plugin commands in events. Update every changed approach's Show Choices string, matching branch caption and PictureTextChange payload on pictures 50–52; preserve binding tags, IDs and choice order. Do not replace complete events or regenerate historical transformations.

Remove the profile-only observation units 82/86/90/94/98/102/106/110, retaining their numbers as retired. Keep presentation units 83/87/91/95/99/103/107/111, selected units 84/88/92/96/100/104/108/112 and full-party units 85/89/93/97/101/105/109/113. No compaction or reuse. Preserve/move necessary native portrait preparation into the retained conversation boundary rather than deleting it with the obsolete text. The [programming contract](updated-narrative-copy.programacao.md) owns exact lifecycle invariants and test consumers.

No new state, map, CE, actor, switch, variable, scene, battle rule, asset, provider or package is required. `coreto/`, engine bytes, all plugin JavaScript and `js/plugins.js` stay unchanged. Existing VN and MessageCore commands remain editable in the native event lists; this does not change their contracts.

### Event and save lifecycle

Keep autorun conditions, scene guards, choices, transfers and validated actions. Longer text remains inside the existing semantic reading unit, with one completion after its final message. First description and reread share the same body; reread does not complete the domain passage again. CE291 continues to own capture/completion around farewell and death helper calls. No second SELECT_VICTIM, new checkpoint or save per box.

The schema and native SaveCore behavior remain unchanged. Existing user saves are neither rewritten nor deleted, and loading is not blocked by revision. Old serialized interpreter lists may contain old text or be structurally incompatible after authored-list changes; this spec promises no migration. Verification starts new candidate campaigns and produces its own saves under SD-015. Retired observation IDs already stored in older saves remain harmless historical entries, not remapped to other content.

### Interfaces, data model and transitions

The following existing command/data shapes are integration boundaries, not new APIs:

| Boundary | Existing shape / owner | Required use |
| --- | --- | --- |
| Native message | `101: [faceName, faceIndex, background, position, speakerName]`, followed by `401: [text]` | Keep native headers/speakers; replace complete approved bodies within the original unit |
| Conversation observation | `Dryland_Presentation.ObservationBegin {unit: "83", switch: "0"}` and `ObservationComplete {}`; explicit ID varies by hero/context | Pair once around the retained presentation; retire only profile IDs |
| Seen observations | `Game_System._drylandReadUnits: number[]` | Existing persisted set-like list; retain old values, add only on completed surviving units |
| Campaign reading | `Game_System._dryland.campaign.reading` exposes `sceneId`, ordered `passageIds`, `index` | Preserve existing CampaignRules ownership, IDs and progression; no prose stored here |
| Approach action | `Dryland_EventBridge.Action {action: "CHOOSE_APPROACH", value: "", valueVariable: "23"}` after the native branch stores its existing approach ID | Preserve captured context, rejection guard and checkpoint; do not infer outcome from text |
| Hero selection | Existing `Action` with `action: "TOGGLE_HERO"` and the hero ID; variable 24 reports `ok` or `invalid_party_size` on these branches | Show source selected/full-party reply only in its existing validated-result branch |
| Contextual death | Native Common Event call through CE291, then caller-owned `ReadingComplete {}` | Helper returns after complete farewell/death text; never commits the victim itself |

| Trigger | Existing transition | Text boundary preserved |
| --- | --- | --- |
| Conversar / return to hero menu | Remain in `formation`; observation lifecycle only | First Ivaí question through final hero utterance, then complete observation |
| First introduction / reread | First completion reaches `encounter_choice`; reread returns there without another domain completion | Source description and question before choices |
| Validated approach | `encounter_choice` → `approach_result` | Selected source success or approved/preserved causal failure |
| Failed-result acknowledgement / chosen victim | `approach_result` → `sacrifice_choice` → `death_result` | Choice commits once; source farewell precedes source context |
| Opinion acknowledgement | Advance the existing `council` reading plan toward `final_choice` | Both paragraphs complete before advancing to next passage |

Data/event associations and command consumers are detailed in [Programação](updated-narrative-copy.programacao.md); exhaustive static checks, focused existing integration tests and directed/visual representatives are assigned in [verification.md](verification.md).

### Failure and cleanup

Missing/ambiguous source or event anchors stop the affected edit; never substitute placeholders or arbitrary old copy. Do not shorten approved paragraphs or add timing waits to hide fit/input defects. Preserve normal native asset/save failures. Remove obsolete profile text and its paired observation envelope only after accounting for required portrait/input preparation. All new or moved dialogue stays within its speaker's native staging. No new runtime resources are created; QA closes only its own browser tabs/processes under G006.

### Documentation and test impact

At implementation, update the current hero-authoring and observational-reading sections of [rpg-maker/README.md](../../../rpg-maker/README.md), which currently describe profiles and four units per hero. Maintain existing owning tests under `rpg-maker/tests/`; do not create a duplicate spec-specific suite. Update durable FOR/ENC/CAM QA records with this increment's actual results at execution, preserving historical verdicts. Do not re-run obsolete whole-map generators.

No new Technical Art or Audio contract is needed: their content and geometry remain unchanged. Narrative and UI/UX own exact copy, natural opening and longer-text fit; Programação owns authored-event and test changes. Scheduling and team assignments are outside this local spec.

## Acceptance summary

| Requirement | Expected observable | Verification |
| --- | --- | --- |
| RQ-001 | 16 introductions/questions and 48 correctly mapped choices, including reread | V-001, V-002, V-005 |
| RQ-002 | All 48 source successes correctly associated and completely readable | V-001, V-005 |
| RQ-003 | 6 approved failures, 42 preserved failures, correct selection/farewell/death order | V-001, V-002, V-006 |
| RQ-004 | 8 conversations start directly with Ivaí, 48 correctly attributed utterances | V-001–004 |
| RQ-005 | 8 additions and 8 full-party replies preserve formation | V-001–004 |
| RQ-006 | 8 farewells and 16 opinion paragraphs; correct eligible speakers | V-001–003, V-006–007 |
| RQ-007 | 2 approved memorial causes with preserved locations | V-001, V-007 |
| RQ-008 | Reading boundaries, focus, controls and candidate Continue preserved | V-002–008 |
| RQ-009 | Traceability, current docs, evidence states, teardown and human review | V-009 |

## Demonstrable moment

Show Conversar opening immediately on Ivaí's question, then the hero's concrete example of how they can help. Complement with one changed trap failure → selected farewell → contextual death and the matching memorial inscription. Suggested reviewed captures: first Ivaí box, a long Seraphina/Vaelith reply, one revised choice panel, Gorvak's farewell, a two-paragraph Council opinion and the A1/A5 memorial. Capture during actual candidate play; no prepared image is gameplay proof.

## Open decisions and approval

No product or technical approval decisions remain open. On 2026-09-25, the user answered “aprovo” to the complete technical and verification approval question (D-006). The spec, stories, three discipline contracts and verification design are approved. This records design approval, not implementation or test execution. The user subsequently requested direct implementation without task decomposition or loop-tasks. No task graph has been created. Execution status and any remaining review are owned by verification.md.

Authoring checks confirm relative links, native owners, source hashes, stable RQ/V coverage and absence of implementation leakage in Part I. The historical `check-spec-part1-leak.py` and `check-spec-markers.py` scripts referenced by the playbook lessons were not found in this repository or the installed local skill roots. Apply their documented checks manually: product-only Part I, then inspectable interfaces, data models, state transitions, integration points, testing strategy and file references in Part II/companions. Do not claim those absent scripts ran.
