---
status: approved
approved_on: 2026-09-22
slug: revised-trap-prose-integration
stage: surface-and-technical-design
product_approved_on: 2026-09-22
---

# Integrate the revised trap catalogue into the playable encounters

## Objective

Players encounter the revised descriptions, choices and consequences of A1–A8 and B1–B8 in the game, with clear correspondence between the selected action and its result. Preserve the existing expedition, sacrifice and reading rules.

The user requested this incremental spec on 2026-09-22 after consolidating PRs #18/#21/#25. The original request authorized specification. D-004 subsequently approves the complete design and authorizes task generation; that authoring approval did not itself execute the runtime or grant final editorial acceptance. The completed `approved-narrative-dialogue-staging` delivery remains a historical baseline. D-005 subsequently narrows verification to static content/structure checks and visual fit at 1280×720; D-006 requires self-produced test saves. [ADR-003](adrs/adr-003-proportionate-prose-verification.md) records this approved revision without changing the product scope.

## Scope — approved product contract

- Integrate the sixteen revised encounter descriptions and forty-eight approach labels from the locally [frozen catalogue](source-catalogue.md).
- Use its forty-eight success paragraphs in the corresponding approaches. Twenty differ from the current game: A1-1/A1-2 and all eighteen B3–B8 successes. Preserve the twenty-eight already matching results.
- Integrate the sixteen general fatal consequences at the existing post-selection death narration, after the chosen hero's farewell. For B1, use the approved correction in the narrative contract instead of the frozen source paragraph (D-001).
- Retain the existing forty-eight approach-specific failure explanations before victim selection. The catalogue supplies one general fatal consequence per encounter, not three new causal failures.
- Preserve PT-BR wording, allow only presentation line/box splitting, and record any approved editorial exception explicitly. Material source differences reopen the affected acceptance.

The user confirmed the full-catalogue boundary with “confirmo” on 2026-09-22 (D-002), after selecting B1's correction. The reviewed catalogue plus that exception is the prototype source for this increment (D-003). The old PR #20 restriction to thirty successes applied to that completed increment; [ADR-002](adrs/adr-002-full-catalogue-boundary.md) records this later expansion without rewriting its history.

## Exclusions

New traps, choices, competencies, randomization, rewards, escape options, timing mechanics or automatic victims; new art/audio/busts; a new text-loading system; broad editorial rewriting; rewriting completed spec results; implementation, commits, merges, remote publication or Trello synchronization during task authoring. Task generation is authorized by D-004.

Gamepad and native browser zoom tests are out of scope under ADR-G005/G003. No browser/platform expansion, old-save migration or new save policy is proposed. Existing pending creative decisions outside this catalogue remain pending.

## Part I — Player behavior

### RQ-001 — Revised descriptions and choices

On reaching each encounter, the player reads its revised presentation and can choose the same three distinct approaches in their established order. The revised text must preserve the clues and action associated with each choice. Internal identifiers and competency labels remain hidden. “Rever descrição” and “Recuar” retain their availability and behavior; rereading shows the same revised description without changing the encounter or progress.

### RQ-002 — Correct success for the chosen approach

A successful action presents exactly its accepted success paragraph, over the current encounter background, without a hero or narrator bust. No result from another action appears. Extra message boxes serve the player's reading pace; the consequence completes once after the final acknowledgement, with no premature progress or repeated action.

### RQ-003 — Failure, choice and death remain distinct

An unsuccessful approach first presents its existing causal failure explanation. The player then chooses one eligible living hero under the existing irreversible sacrifice rule. The selected hero's existing farewell precedes the revised general death narration. The catalogue's complete fatal consequence must not be inserted before the victim choice or repeated as both failure and death. Ivaí, Rheed, reserves and dead heroes remain ineligible; the player retains the full existing victim choice.

### RQ-004 — Resolve Matinta without changing sacrifice rules

**Confirmed product decision — 2026-09-22:** voices are being extinguished, and the selected hero says their name before losing their own voice. Any eligible present hero can still be chosen. The urgency is narrative; there is no timer, automatic selection or “last speaking hero” restriction.

The user selected the recommended correction with “adotar a correçao” (D-001). The exact paragraph in the [narrative contract](revised-trap-prose-integration.narrativa.md#approved-b1-wording) is accepted as **Prototype baseline** for this increment. The [canonical GDD §12.3/B1](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#b1-o-assobio-da-matinta) now reflects that sequence; [ADR-001](adrs/adr-001-matinta-voice-sequence.md) records the scoped supersession. The frozen catalogue and PR #20 evidence retain the earlier wording; the current native integration uses the approved correction. Execution results are recorded in verification.md.

### RQ-005 — Preserve reading, presentation and campaign continuity

Text remains readable through native mouse/keyboard controls. HIDE, Options, completed-text acceleration and the existing motion preference continue to work without carrying an acknowledgement into the next decision. Preserve backgrounds, music, effects, hero farewells, death selection, route progress, exploration records, memorials and ending eligibility. The revised prose must also work with a reduced expedition.

### RQ-006 — Resume without replaying a committed consequence

New campaigns and saves earned by the integrated version retain the revised text and the existing checkpoint semantics. Continue may replay reading after the last checkpoint, but cannot repeat a committed approach, death or reward. Existing saves are preserved and native loading is not blocked; compatibility with older serialized conversations is not promised by a text-only change. The detailed save surface belongs to Stage 2, subject to the current GDD policy.

### RQ-007 — Traceable editorial status and delivery

The integration uses a fixed, locally inspectable source and approved exceptions. Source completeness, authored associations and visual readability require the reduced evidence assigned under D-005; importing text does not itself establish cultural/editorial approval. The documentation must distinguish prototype acceptance from final canon and new verification from historical results.

## Authority map

| Source | Owner | State/version | Governs | Planned change |
| --- | --- | --- | --- | --- |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), §§1, 10, 12–14, 26 | Product | Confirmed; specific prototype exceptions explicit | Encounter identities, choices, competencies, consequences, reading/save policy | B1 correction and full incremental boundary recorded |
| [ADR-001](adrs/adr-001-matinta-voice-sequence.md) | Product / Narrativa | Accepted on 2026-09-22 | Progressive loss of voices and B1 prototype wording; unchanged sacrifice eligibility | Implement only after full spec approval |
| [ADR-002](adrs/adr-002-full-catalogue-boundary.md) | Product / Narrativa | Accepted on 2026-09-22 | Full-catalogue integration and prototype source boundary | Implement only after full spec approval |
| [PR #20 integration ADR](../approved-narrative-dialogue-staging/adrs/adr-002-trap-prose-integration-boundary.md) and [verification](../approved-narrative-dialogue-staging/verification.md) | Historical integration | Completed | Thirty accepted prototype successes and previous exclusions | No historical rewrite; supersession documented in ADR-002 |
| [Frozen catalogue](source-catalogue.md) | Narrativa | PR #25, `280b92a489959728cb63cd57625d8621cb495cca`; prototype source with approved B1 exception | PT-BR descriptions, choices, successes and fatal consequences | Snapshot immutable; exceptions in narrative contract |
| [Source analysis](source-analysis.md) | Spec preflight | Read-only inspection, main `04d5253` | Current correspondence, consumers and gaps | Update only on relevant source changes |
| [General ADRs](../../../docs/adrs/README.md), G004–G006 | Execution/verification | Accepted | Reorganization, test exclusions, risk-based sensor selection and teardown | Preserved |
| [Narrative contract](revised-trap-prose-integration.narrativa.md) | Narrativa | Approved on 2026-09-22; prototype copy | Copy selection, reading order and approved exceptions | Preserve prototype status |
| [UI/UX contract](revised-trap-prose-integration.uiux.md) | UI/UX | Approved on 2026-09-22 | Text fit, choice labels and controls | Execute through task graph |
| [Programming contract](revised-trap-prose-integration.programacao.md) | Programação | Approved on 2026-09-22 | Native owners, lifecycle and persistence | Execute through task graph |
| [Verification](verification.md), [ADR-003](adrs/adr-003-proportionate-prose-verification.md) | QA/acceptance | Revised under D-005/D-006 on 2026-09-22 | Static checks, 1280×720 visual sample, explicit waivers and self-produced test saves | Tasks own execution; no runtime proof |

## Affected disciplines

Narrativa owns the copy and failure/death sequence. UI/UX owns changed text fit, approach-label readability and preserved reading controls. Programação owns native integration and saved-event implications. Stage 2 adds only those two affected discipline contracts. Technical Art and Audio have no changed authored behavior and receive no new contracts.

## Part II — Technical design

**Approved on 2026-09-22 under D-004; verification revised under D-005/D-006.** The resulting [task graph](tasks.md) has three active tasks (01, 02, 05); 03/04 are superseded. Current execution/evidence state is in verification.md.

### Native integration

Keep executable prose in `rpg-maker/The Dryland Drowned/data/`. Event 001/page 1 of Map007–022 owns descriptions, approach presentation and outcomes; CE266–281 in `CommonEvents.json` owns the sixteen death bodies. The full mapping is in [source analysis](source-analysis.md#native-ownership-and-actual-differences). No new maps, Common Event IDs, plugins, runtime text catalogue or dependency are needed.

Each revised label has three native representations that must agree: Show Choices (`102`), its branch label (`402`) and MessageCore `PictureTextChange` on pictures 50–52. Preserve binding/control tags, ordered branch indices and the approach IDs assigned by those branches. Changing only the hidden choice string would leave the visible picture text stale.

Use native Show Text (`101`/`401`) with presentation-only line/box splitting. The two opening source paragraphs and its approach question form the description reading unit; reread uses that same body. Preserve all 48 success identities, replace the 20 differing bodies, and retain the 28 matching ones unless presentation-only splitting is necessary. Preserve all 48 causal failures. Death bodies use the source's general fatal paragraph, with the approved B1 exception.

### Lifecycle and state

Preserve the existing autorun page, scene/description labels, queries, branches, phase guards, transfers and end commands. A longer reading has one existing semantic identity, not one identity per box. Keep its ReadingPermission before the body, ReadingEnd after its final box, and ReadingComplete on its current owning interpreter after acknowledgement. Description reread returns to choices without a second domain completion. CE291 remains the caller that captures and completes farewell/death readings; CE266–281 must not acquire an extra completion or campaign action.

No new switches, variables, campaign fields, phases, competencies, RNG behavior, party logic or save schema. CampaignRules remains the authority for approach results, selected victims, route progress, death locations and ending eligibility. Existing native pictures/interpreters retain presentation state; there is no second persistent reading cursor.

### Saves, recovery and cleanup

Preserve semantic checkpoints and current-file SaveCore ownership. Extra boxes, reread, HIDE and Options do not save or repeat a domain action. Continue from candidate-earned approach, sacrifice and consequence checkpoints must resume pending reading without another committed approach, victim or reward. Old saves remain available through native loading, without content gates, conversion or deletion; serialized older conversations may retain their old prose or be structurally incompatible.

RQ-006 remains a preservation requirement, not a dedicated Continue/file-isolation test gate for this increment under D-005. Saves used for visual navigation must be produced through normal player inputs during this spec's own tests on the candidate (D-006); no external or preexisting save is an entry dependency.

Keep native save/asset failure behavior. Missing or misrouted source text is an integration defect, not a reason to insert a placeholder, skip a branch or fall back to old prose. The integration preserves existing cleanup of choices and busts; it adds no listener, animation service, background process or lifecycle resource. Test sessions follow ADR-G006 teardown.

### Presentation and affected surfaces

Retain the existing encounter background, lower message window, PictureChoices controls, font settings, keyboard/mouse navigation and motion preference. [UI/UX](revised-trap-prose-integration.uiux.md) defines multi-box and label-fit constraints. No art, audio cues, camera, battle, plugin metadata/order or build/package changes are proposed. If full approved labels cannot fit through native authored line breaks, surface design must be revised before implementation broadens its scope.

### Validation and implementation handoff

[Programação](revised-trap-prose-integration.programacao.md) defines native edit boundaries and static correspondence/structure checks. [Verification](verification.md) assigns full catalogue comparison, all 48 choice labels visually and risk-selected narrative boxes at 1280×720. Expected words come from the frozen source plus B1, independently of candidate maps. Controls, engine integration, E2E, Continue and a second resolution are waived under D-005.

The [task graph](tasks.md) carries three active tasks: encounter integration/static checks, death integration/static checks, and visual inspection/final reconciliation. Existing tests stay in place; obsolete copy/box assumptions may be maintained narrowly without expanding suites or weakening assertions. No separate QA guide/charter/report is required. Implementation and visual results are recorded in verification.md.

## Acceptance summary

| ID | Expected observable / preservation requirement | Current verification |
| --- | --- | --- |
| RQ-001 | Revised description and correctly associated labels; preserve reread path | V-001/ENC; V-003 visual fit; runtime reread requalification waived |
| RQ-002 | Correct complete success, same art/no bust; preserve completion boundary | V-001/ENC; V-003 sampled fit; lifecycle execution waived |
| RQ-003 | Preserve failure → victim selection → farewell → mapped death | V-001/ENC and DEATH; V-003 sampled death fit; sacrifice execution waived |
| RQ-004 | Approved B1 wording; no eligibility/timing change | V-001/DEATH; V-004 |
| RQ-005 | Readable revised text; preserve controls and campaign rules | V-001 preservation; V-003; controls/motion matrix waived |
| RQ-006 | Preserve Continue/checkpoint/file behavior | V-001 command/implementation preservation; historical baseline by reference; S-04 waived |
| RQ-007 | Fixed source, accepted exceptions and honest delivery status | V-001; V-004 |

Static preservation is not proof of runtime behavior. Historical passes and current waivers do not imply new execution. The visual sample does not certify every unviewed narrative box.

## Open decisions and approval

1. D-001 — **Accepted on 2026-09-22:** adopt the recommended B1 correction. In response to the choice between correcting B1 and retaining its current wording as prototype prose, the user replied “adotar a correçao”. Progressive voice loss and the selected hero speaking before losing their voice are confirmed; the narrative contract's paragraph is the accepted prototype wording. See ADR-001. This decision does not approve the full catalogue, technical design or implementation.
2. D-002 — **Accepted on 2026-09-22:** the user replied “confirmo” to the explicit full-catalogue scope: descriptions, choices, successes and death narration for all sixteen encounters, preserving the 48 pre-selection failures, applying B1's correction and retaining campaign rules. See ADR-002.
3. D-003 — **Resolved as prototype source acceptance in D-002's context:** the user had reviewed the spec, selected B1's correction, and confirmed integrating the revised texts while preserving existing failures. Use that reviewed frozen source with B1 as its only approved prose exception. This records the accepted integration material, not a separate quotation or final creative approval. The inherited B6-3 ambiguity remains known and unrepaired within the expressly preserved failures.

4. D-004 — **Accepted on 2026-09-22:** after presentation of the complete technical spec, the user stated “está aprovado, pode gerar as tarefas”. This approves Part II, the three discipline contracts, and the verification contract and authorizes task generation. It does not claim implementation, runtime verification or final creative acceptance.

5. D-005 — **Accepted on 2026-09-22:** after requesting tests proportional to a simple prose edit, the user approved updating the tasks and writing the rationale ADR. Retain full static content/structure comparison, all 48 choice labels visually and risk-selected prose at 1280×720; waive engine integration, E2E, controls/Continue reruns, 1920×1080 and separate QA planning. [ADR-003](adrs/adr-003-proportionate-prose-verification.md) records the scoped supersession of the original test plan and ADR-G006's E2E requirement. Product behavior and prior approvals remain unchanged.
6. D-006 — **Confirmed on 2026-09-22:** “durante os testes você vai criar os seus próprios saves e usa-los”; “uma spec nunca deve depender de saves externos”. Tests start independently, produce needed saves through normal candidate play and reuse only their own compatible saves for navigation. This is not a request to reintroduce persistence testing. See ADR-003 and SD-015.

Product and complete spec: **approved**. Task graph: revised to three active tasks under D-005; execution state is recorded in tasks.md. No unresolved design decision blocks decomposition. Newly demonstrated product/surface trade-offs require a scoped decision; routine task reorganization follows ADR-G004/G006 without renewed approval.

## Devlog moment

Demonstrate an encounter's revised description, its three choices and the matching consequence. Suggested capture: A1's corrected bottle sequence or B7's future-date reasoning, with a separate failure → sacrifice → death sequence once integrated. Use captures obtained during the visual pass when available; do not add a campaign solely to stage this suggestion. Authoring produced no gameplay evidence; the subsequent task-05 execution preserves selected real captures.

## Execution closure — 2026-09-22

The user requested `loop-tasks` execution through completion. Tasks 01/02/05 are completed; 03/04 remain superseded under D-005. Native copy/structure, all 48 rendered labels and five risk-selected prose boxes pass; [review 02](review-02.md) is SHIP. [Verification](verification.md) records the scoped release-ready verdict, own-save provenance, waived sensors and unchanged prototype/editorial limits. No engine/plugin/rule/asset/save implementation, staging, commit or remote publication was added.
