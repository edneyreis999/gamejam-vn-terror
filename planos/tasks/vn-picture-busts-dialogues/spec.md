---
status: approved
slug: vn-picture-busts-dialogues
---

# Native VNPictureBusts authorship and ensemble dialogue

> **Closure update — 2026-09-11:** the user accepted the consolidated development delivered by [vn-focus-parameters](../vn-focus-parameters/spec.md#accepted-consolidated-delivery--2026-09-11). This document preserves the historical contract, status flags and execution results of this increment; they do not describe a pending task in the current accepted scope. The [current acceptance record](../vn-focus-parameters/verification.md#human-acceptance-and-closure--2026-09-11) owns the final state. Final PNG framing and the historical unavailable-editor sensor remain explicitly deferred; no historical FAIL/BLOCKED result is relabeled as a successful test.


## Objective

Let the author select and position busts directly in RPG Maker MZ events, using the installed VNPictureBusts plugin. Keep conversational participants visible together, identify the current speaker through scale, a small movement and soft dimming of listeners, and end the composition deliberately.

This spec consolidates the interview held on 2026-09-11. [ADR-002](adrs/adr-002.md) records the product decisions; [ADR-003](adrs/adr-003.md) records the subsequent authorization to execute the complete scope without approval pauses. Numerical tuning is a delegated prototype baseline to calibrate against the stated constraints, not final artistic acceptance. The withdrawn pre-interview approval remains historical; current authorization comes from ADR-003. The authorized [task graph](tasks.md) is materialized; implementation has not started.

## Scope

- Migrate the existing 63 sections / 103 Show Text commands in [inventory.md](inventory.md) from automatic JavaScript bust inference to native event authorship.
- Cover every tavern character line for all eight heroes: Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith and Draska. This includes profile.H1–H8, speech.H1–H8, selection.H1–H8 and party_full.H1–H8: 32 sections / 72 Show Text commands within the original 63/103 sites.
- Treat each hero's profile.Hn and speech.Hn as one tavern visual conversation. Selection and full-party feedback keep their one-person composition. Gorvak/Ivaí is only a possible demonstration, never a separately approved pilot or the delivery boundary.
- Introduce ensemble staging at council.challenge, preserve it across Council passages and temporarily replace the hero presentation during Andirá's intervention. This changes an existing narrated box, beyond the 103 previously bust-bearing boxes.
- Support one-person, 1x1 and up-to-3x1 campaign compositions. Demonstrate the reusable 2x2 recipe in an isolated authoring/integration fixture without adding story content.
- Update native helpers, restricted validation, presentation ownership, same-revision reconstruction, native revision and authoring documentation.
- Include Programação, UI/UX and Technical Art contracts. Text and eligibility remain unchanged.

## Exclusions

- Commits, tracker updates and publication. Task decomposition and local implementation are authorized by ADR-003.
- New dialogue, choices, characters, expressions, final artwork, audio, breathing, fidgeting, camera effects, automatic text advancement or a general VN framework.
- Importing ProjectX content, assets, routing, picture IDs or global focus switches. Its [reference analysis](reference-map020-analysis.md) supplies a recipe, not production dependencies.
- Changing vendor/engine files, plugin activation/order/global parameters, campaign rules, save migration or public dialogue history.
- Busts in the six named inventory exclusions, illustrated endings, encounter narration/results, contextual death, map receipt/assembly and credits. Council challenge staging is the explicit narrated-box exception.
- Changing formation portraits, sacrifice candidate images, absence effects or the collective memorial.

## Behavior

### RQ-001 — Native, inspectable authorship

An author can locate every covered Show Text and the native VNPictureBusts commands controlling its composition, either adjacent or through a clearly named, directly called native presentation helper. Editing a supported asset, position, scale, tone or duration there changes the game after revision and reload. No independently editable JavaScript speaker/layout catalog overrides it. Migration output becomes the editable source; future tooling must not silently overwrite manual event edits.

### RQ-002 — Ensemble composition and speaker focus

Heroes occupy the left; Ivaí and other non-hero speakers use the right, except Andirá on the left during his intervention, confined to the reflection. Preserve artwork orientation and the native bottom message window. Preserve the lovers' prisons when calibrating their right-side framing; no new art is approved.

Ordinary participants enter on their first speaking participation and remain until the visual conversation ends. Council heroes enter together at the narrated demand for explanations. One-person content remains one-person; empty slots gain no invented participants. Same-speaker boxes retain the composition and do not restart focus. A speaker has normal tone and calibrated active size; listeners are slightly smaller and softly dimmed. A small authored movement reinforces focus without changing sides or requiring draw-order swaps.

### RQ-003 — Narrative and campaign invariants

Preserve all 258 passage identities, metadata/statuses, all 282 indexed Show Text commands, displayed text, speaker labels, choice branches and story order. The 103 originally bust-bearing boxes remain individually covered. Talking never changes formation; selection feedback follows successful addition; full-party feedback never replaces someone. Sacrifice is committed before farewell. Council/epilogues include only eligible survivors. Hiding hero busts is not a narrative departure. Presentation never advances RNG, rewards, death, checkpoints or a second story cursor.

### RQ-004 — Restricted, actionable authoring contract

Validate every reachable presentation command and helper at boot/content validation, including inactive branches. Accept only the finite literal VNPictureBusts interface and native helper/branch grammar below. Reject unknown plugins/commands, malformed annotations, wrong slots, missing assets, expressions, unregistered helpers and cycles before presentation. Preserve native loading Retry; do not fall back to automatic busts or silently continue without a required image.

### RQ-005 — Conversation lifetime and controls

The tavern profile and subsequent dialogue share one composition: the hero survives the passage boundary, Ivaí enters on his first line and both exit after the final dialogue box. Council staging follows RQ-008 across separate passages. End-of-passage bookkeeping must not dispose an ongoing conversation.

HIDE preserves artwork; restoring consumes input without advancing or choosing. Skip, cancellation, scene/map transfer, formation, invalid campaign and title/new game leave no obsolete bust, animation or delayed callback. Cleanup affects owned dialogue pictures only. Proposed scene boundaries and reduced-motion behavior are explicit in the UI/UX contract.

### RQ-006 — Save and interpreter compatibility

Continue on the new native revision restores the correct presentation for the saved native stack, including Council, pending farewell and terminal replay. Never replay committed decisions or text merely to reconstruct pictures. Refresh derived projections before use. No new persistent campaign field, save slot or migration is introduced. Event/System edits require a new manifest revision; incompatible older saves remain on disk and retain the existing refusal/New Game flow.

### RQ-007 — Maintainable delivery and honest evidence

The README explains recipes, helper navigation, ownership, tuning and revision. Extend canonical suites and directed QA scenario owners. Static coverage, integration fixtures, directed Chrome journeys and human acceptance remain separate. Preserve historical verdicts and record actual coverage. Under [ADR-004](adrs/adr-004.md), native-editor QA is one short check that a representative plugin command and a position/scale parameter are editable; no per-hero/per-scene editor matrix, save/reopen/export cycle or editor-launched gameplay is required. Verify authored changes and all gameplay in Chrome. The brief editor check and separate game captures may illustrate the devlog. Human review is a non-blocking follow-up; required technical and visual checks must still run and pass before their tasks are completed.

### RQ-008 — Council intervention and return

At council.challenge, show every eligible hero together on the left, in stable H1–H8 order compacted into occupied slots. Ivaí enters on his first speaking box and remains on the right. With no eligible heroes, the group demand is absent and no hero is introduced.

Before Andirá's line, hide hero busts; show Andirá on the left within the reflection, opposite Ivaí. After the intervention, remove Andirá and restore eligible heroes to the same slots for their opinions. Ivaí remains on the right. Never show all five together. Preserve the order: introductory narration, challenge/solo, confession, Andirá, opinions, final choice.

## Authority Map

| Source | Owner | Status | Governs | Change |
| --- | --- | --- | --- | --- |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), §§1.1, 15, 19 and MZ closing additions | User/design | Confirmed rules and labeled prototype content | Narrative, composition, input/save | Accepted interview decisions only |
| [ADR-002](adrs/adr-002.md) | User | Accepted interview decisions | Ensemble, sides, Council, focus, tavern continuity | Consolidated |
| [ADR-003](adrs/adr-003.md) | User | Approved execution direction | All tavern dialogue; uninterrupted task loop; delegated prototype calibration | Added |
| [ADR-004](adrs/adr-004.md) | User | Accepted scope refinement | One brief native-editor editability check; behavior verified in Chrome | Added |
| [ADR-005](adrs/adr-005.md) | User | Authorized QA save copies | Genuine checkpoint archives and isolated Continue reuse | Added |
| [ADR-001](adrs/adr-001.md) | History | Superseded proposal | Investigation and withdrawn approval | Preserve provenance |
| [Inventory](inventory.md), [source fingerprint](source-evidence.json) | Programação | Pre-change observation | 63/103 sites, exclusions, assets | Preserve dated baseline |
| [Reference analysis](reference-map020-analysis.md) | Programação | Static research | ProjectX pattern | Reference only |
| [Programação](vn-picture-busts-dialogues.programacao.md) | Edney | Approved for execution | Validation, projection, lifecycle | Updated |
| [UI/UX](vn-picture-busts-dialogues.uiux.md) | Pati | Approved prototype baseline | Boundaries, focus, controls | New |
| [Technical Art](vn-picture-busts-dialogues.technical-art.md) | Lucas | Approved framing work; final art not accepted | Framing, overlap, reflection | New |
| [Verification](verification.md) | Programação / human reviewers | Approved execution contract | Sensors and readiness | Updated |

Historical completed deliveries remain unchanged. Current repository evidence and the inventory make ignored Compozy history unnecessary for execution.

## Technical Design

### Native authorship and reuse

Use VNPictureBusts commands adjacent to text and named Common Events for repeated blocks. Helpers use trigger None and direct native calls, never Parallel focus switches. The bridge supplies infrastructure and validated eligibility projections; pictures, framing, focus and entry/exit recipes remain native data.

Propose derived numeric projection variables 144–146, named for Council left slots 1–3. Current System variables end at 143. Each holds 0 for empty or 1–8 for H1–H8, derived from the ordered eligible climax roster. They are recomputed before composition/reconstruction, not new campaign facts. No focus switch, persistent active-speaker flag or duplicated eligibility authority is introduced.

Native helper branches select each slot's character using these projections, with literal asset and scale arguments inside each branch. A native all-listeners block applies per-art listening scales; the opinion focuses its own occupied slot. The one-time migration may materialize repeated commands. Do not read variables through vendor eval arguments or reset arbitrary portraits to the global 100% scale.

Propose dialogue picture slots 60–65: 60/61/62 left, 63/64 right, 65 Andirá's reflection. A structured scan found no native map/Common Event picture command using them; recheck dynamic/plugin consumers before implementation. Each scene owns only its subset. Background 1, map pieces 2–4, formation, sacrifice, memorial and overlays keep their owners. Slot 64 supports the 2x2 fixture and adds no NPC to the campaign. Remove old dialogue picture 18 at the migration boundary while retaining unrelated explicit cleanup sites.

### Finite command grammar

Preserve the existing 101/401, choice, comment and picture grammar. Add only:

- Native 117 calls to helpers declared by a unique dedicated comment marker, @dryland-presentation-helper followed by a stable identifier, with trigger None. Validate the full transitive graph, including untaken branches; reject cycles and calls outside it.
- Native 111/411/412 branches limited to equality of variables 144–146 and literal integers 0–8. No switch mutation, variable assignment, script condition, loop, save, transfer or domain action inside the graph.
- Native 230 waits bounded to 0–60 frames and explicitly tied to an authored transition. Never use waits as image-readiness or cancellation guarantees.
- Plugin 357 under exact namespace VisuMZ_2_VNPictureBusts: Basic_EnterBust, Basic_ExitBusts, Scale_ScaleTo, Move_MoveToCoordinates, Tone_NormalBust and Tone_CustomToneBust. Immediately associated 657 records are inert editor annotations.

Validate the native envelope, exact command-specific keys and literal serialization. Scalar IDs and nonempty duplicate-free target arrays are scene-valid members of 60–65. Asset names are the 12 inventoried Dryland character PNGs without extension. Origin is Bust; mirror/flip None; entrance position a literal integer 0–10. Scale axes are positive finite literals up to 200%; coordinates/offsets are finite literals within two game widths/heights of the origin. Duration is an integer 0–60 frames. Easing is Linear, OutSine, InSine or InOutSine. Exit autoerase is explicit true. Custom tone is four literal integers: RGB -255–255, gray 0–255.

Transcribe exact vendor keys from the installed public header into validation/tests; reject unexpected/missing arguments. No Scale_ScaleReset, additive scaling, auto mirror, draw-order swapping, battle animation or continuous motion is included. New commands require an explicit contract extension.

### State and ownership

| Value | Authority / writer | Reader | Lifetime |
| --- | --- | --- | --- |
| Eligibility, death, reading cursor, committed choice | Existing CampaignRules | Events/projection | Existing persistent campaign |
| Asset, slot, framing, focus targets, duration | Native events/helpers | Validated interpreter | Authored source, no JS duplicate |
| Council slot variables | Bridge projection | Restricted native branches | Derived engine snapshot, refreshed before use |
| Conversation identity | Explicit orchestration boundary | Execution/cleanup | Transient presentation owner |
| Pictures, interpolation, listeners | Engine/vendor under owner | Renderer | Visual state; not narrative truth |
| Helper execution | Native child interpreter | Root presentation | Native stack; no passage-completion authority |

Extend the existing bridge with a finite presentation-boundary interface for native orchestration: begin an allowed conversation, reconcile its composition, end it. Tavern identity is the inspected hero; Council identity is the current climax conversation, validated against campaign/context. Repeated begin of the same conversation is idempotent. Boundary operations never choose assets/framing, complete passages or create checkpoints.

The owner follows closed → preparing → active → exiting → closed. Cancellation moves any live state directly to closed. Image failure uses native Retry. Reject delayed work from disposed owners. Await bitmap readiness before applying anchor/base transforms and presenting readable text; an intentional focus/entrance animation may run alongside reading.

Root termination keeps COMPLETE_PASSAGE exactly once. Helpers never inherit that completion role. Ordinary passage boundaries retain an active conversation. Native recipes explicitly hide/restore participants. Conversation completion runs collective plugin exit and releases owned pictures; skip/abort cleans directly, independent of final commands.

### Reconstruction and orchestration

CE 3 owns the profile + speech conversation. Update CE 40/44 and Council helpers so Observe refreshes do not erase dialogue pictures between passages. Keep unrelated cleanup. Explicitly end at the boundaries defined in UI/UX.

Each supported stage has a native declarative reconstruction recipe using the same authored framing/focus sources. Reconciliation derives stage from campaign reading and the saved interpreter path and executes presentation-only final states, without text, domain actions, animation replay or extra completion. Coherent native saved visuals may remain; missing transient ownership/composition must be recoverable. Asset readiness uses native loading.

Cover the middle of profile/speech, Council challenge/confession/intervention/opinions, pending farewell and terminal replay. Do not replay earlier passages to rebuild pictures. Projection variables are not trusted after load. Idempotency, helper ancestry and cancellation during reconstruction need integration coverage.

For QA efficiency, ADR-005 permits preserving genuine native checkpoint payloads plus their matching index and replaying isolated copies through Continue. Capture producer provenance and source/revision hashes; restore only before gameplay, never by mutating a live campaign or inventing a saved cursor. This changes QA preparation, not public autosave or irreversible decisions. The [save reuse study](qa-save-reuse-analysis.md) identifies the native boundaries and missing executor preparation support; actual Council copies are captured after implementation stabilizes.

### Affected surfaces and removals

- Data: CommonEvents, System projection names and manifest; inspect map 23/callers without changing routing or renumbering existing IDs. Append necessary helpers and record allocations.
- Plugins: EventBridge parser, boundaries, projections and cleanup. Vendor metadata/order/config stay unchanged. CampaignRules needs no rule change.
- Presentation: existing 12 PNGs with new ensemble framing/focus. Preserve text, HIDE, input consumption, Retry and reduced-motion behavior. No audio, battle, party mechanics, camera or deployment change.
- Delete targets: speakerBust, bustToken, bust-specific command101 alias and documentation assigning layout to JavaScript. Preserve independent input aliases and unrelated picture systems.
- Tooling: canonical suites, README and existing QA owners. Materialize the migration beside this spec during implementation, with baseline preconditions and preservation checks. Assign a fresh revision through the existing tool.

## Acceptance Summary

| ID | Observable | Verification |
| --- | --- | --- |
| RQ-001 | Native edits drive covered presentation | V-001, V-002, V-008 |
| RQ-002 | Correct assets/sides and readable stable focus | V-003, V-004, V-007, V-009 |
| RQ-003 | Content, choices, eligibility and state preserved | V-001, V-004, V-005 |
| RQ-004 | Valid graph accepted; invalid content rejected | V-002, V-003 |
| RQ-005 | Continuity, controls and cleanup | V-003, V-005, V-006 |
| RQ-006 | Continue correct; incompatible saves retained | V-006 |
| RQ-007 | Maintained recipes, coverage and evidence | V-007, V-008 |
| RQ-008 | Council intervention, return and eligibility | V-004, V-006, V-007 |

## Execution policy

ADR-003 authorizes task decomposition and the complete local execution loop. No task, sample conversation, scope checkpoint, visual demonstration, QA task or final verification step may require another user approval before the next task begins. Carry this policy into tasks.md and every task contract; do not create approval tasks or dependencies on a human reply.

Use the UI/UX prototype settings as the starting point for numerical tuning, reduced motion, narration focus and exit before the final-choice menu. Calibrate autonomously within the accepted product direction and preserve evidence of the final authored values. This authorization does not replace missing visual evidence or authorize new assets, changed sides or unrelated design changes.

Required automated, integration, directed gameplay and agent visual checks remain completion conditions. Repair in-scope failures and rerun affected checks; continue independent work if one sensor has a real technical blocker. Record unresolved blockers honestly. Reviews by the user, Pati, Lucas and narrative reviewers remain optional follow-up refinements and do not stop the loop or imply approval when absent.
