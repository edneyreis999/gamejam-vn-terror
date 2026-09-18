---
status: approved
slug: approved-narrative-dialogue-staging
stage: execution
product_confirmed: true
approved_on: 2026-09-18
---

# Approved narrative integration and dialogue staging

## Objective

Integrate the approved narrative from PRs #15 and #16, the trap-success prose supplied by PR #18, and the native Rheed prologue and portraits from PR #19 into the RPG Maker MZ campaign. Extend the main Gorvak conversation's visual standard from PR #17 to conversations throughout the game, including alternate interaction paths. Rheed is the narrator identified by the user; his older and younger portrayals come from PR #19.

This incremental spec was authored through `rpg-maker-mz-issue-to-spec`, `rpg-maker-mz-spec-preflight`, `rpg-maker-mz-create-spec`, and a one-question-at-a-time `grill-me` interview. The user approved the complete spec set after validation on 2026-09-18. All ten tasks have completed technical execution under the explicit user decisions below. The current delivery verdict belongs to [verification.md](verification.md).

## Stage approval

The user explicitly confirmed Stage 1 with “sim, confirmo” in response to the consolidated PRs #15–19 scope question. RQ-001–012 and the recorded exclusions are the confirmed product boundary. D-018 subsequently resolved epilogue fitting in Stage 2. On 2026-09-18, the user replied “aprovado” after the requested [validation](validation-01.md), approving the complete spec set and its recommended F-01 clarification. That clarification is now applied: living unselected heroes remain available for tavern visits, conversation and selection under existing formation rules. At that approval, the five discipline contracts and verification contract were approved as design, with implementation and game acceptance still pending; current execution and acceptance states are maintained in verification.md. Deferred editorial/art refinements remain outside this increment.

## Confirmed user decisions

| ID | Decision | Authority |
| --- | --- | --- |
| D-001 | Texts in PRs #15 and #16 and the illustrations supplied in PR #15 are approved content to integrate. Do not reopen editorial or artistic approval of those contributions. | User directive, 2026-09-17 |
| D-002 | PR #16's described illustrations have not been produced. Reuse the existing in-game ending images; producing new ending artwork is outside this increment. | User clarification, 2026-09-17 |
| D-003 | Each eligible epilogue uses its approved illustration as the full-screen scene, native narration at the bottom, and the game's reading controls, without a separate bust overlay. This replaces the current epilogue bust presentation. | Explicit user approval of recommendation, 2026-09-17 |
| D-004 | The main Gorvak conversation in PR #17 is the staging reference for conversations throughout the game. Include edge cases such as the full-party response; Lucas reported that those paths were not tested. | User directive, 2026-09-17 |
| D-005 | Preserve the reference's entrance, speaker emphasis, listener dimming, and exit style, while adjusting portrait size and position per character and participant count. Do not copy identical framing values to every scene; avoid cropped characters and overlapping faces, including in the Council. | Explicit user approval of recommendation, 2026-09-17 |
| D-006 | Present the first- and second-route completion texts after the corresponding conversations with Pérola or Floraí and before returning to the tavern. Preserve map-piece delivery and character-specific lines. First and second refer to completion order, whether Church or Park is completed first. | Explicit user approval of recommendation on interview resumption, 2026-09-17 |
| D-007 | Replace the existing Council opening, from the coffer discovery through Ivaí's confession, with the approved third-route text. Follow it with Andirá's appearance, eligible heroes' opinions, the final Irati excerpt, and the final choice. Do not repeat the superseded revelation. Solo wording is governed by D-008. | Explicit user approval of recommendation, 2026-09-17 |
| D-008 | Keep this increment simple: integrate the approved route prose without creating solo wording variants. The user will handle this narrative refinement later. Preserve existing solo eligibility and actual scene participants; prose that assumes companions are present is an accepted limitation for this increment, not a delivery blocker or authorization to add absent heroes. | User explicitly deferred the proposed refinement, 2026-09-17 |
| D-009 | Add PR #19 to this same incremental spec, including its native prologue and supplied Rheed portraits. Preserve the completed `prologo-rheed` workstream as source history; do not create a second integration spec or rewrite its completed tasks. | Explicit user scope expansion, 2026-09-17 |
| D-010 | The source label “Narrador” refers to Rheed. Use PR #19's distinction between older Rheed as retrospective narrator and young Rheed as the in-story helper. The earlier suggestion of anonymous narration without a narrator bust was not approved and is superseded by this clarification; D-013 governs the temporal presentation. | Explicit user identity clarification, 2026-09-17, with PR #19's character contract |
| D-011 | **Partially superseded by D-013.** The earlier approval of older Rheed over the current scene's dimmed background is historical and must not be implemented. Retain older Rheed alone in the foreground, returning to the direct-dialogue composition when a character speaks, and D-003's illustrated epilogues without bust overlays. | Original approval and subsequent explicit user correction, 2026-09-17 |
| D-012 | Apply PR #17's Gorvak conversation style to young Rheed and Ivaí in the prologue: entrance, speaker emphasis, listener dimming and exit, with adaptive framing under D-005. Preserve their approved lines, sides and tavern background. This replaces PR #19's source-specific instant 10% emphasis as the integration's target style. The initially preserved silence is subsequently superseded by D-014. | Explicit user approval of recommendation, 2026-09-17 |
| D-013 | Older Rheed tells the game's story in the narrative present and appears in full color, alone, always against black. Young Rheed and all narrated events belong to the past and use pastel tones. Black applies to every older-Rheed appearance, including route narration and the prologue. D-015 subsequently identifies the storytelling context; its undrawn environment remains outside this increment. | Explicit user temporal/art-direction clarification correcting D-011, 2026-09-17 |
| D-014 | Use distinct music and narrative sound effects/ambience for the past and the present. The user delegates cue selection to the agent. Replace the suggested silent present and the source prologue's silence with this temporal audio direction, including both time frames in the prologue. Use existing local game audio and preserve player volume controls. Cue selection is a prototype baseline, not a claim of completed listening validation. | Explicit user audio direction and delegation, 2026-09-17 |
| D-015 | In the present, older Rheed has become the best storyteller of Daratrine. He tells this story to hundreds of creatures, including the player, in a city during the “Noite da História” event. The user has not named the city or defined what kind of place Daratrine is. Keep those details unspecified, retain the black background and do not invent an audience illustration or a new audience interaction mechanic. | Explicit user narrative framing, 2026-09-17 |
| D-016 | Add PR #18's trap-text rework to this same spec before product-stage confirmation. The inspected source supplies 30 success paragraphs for A1–A8 and B1–B2; B3–B8 are empty source files. D-017 resolves the integration boundary. | Explicit user scope expansion, 2026-09-17 |
| D-017 | Integrate only PR #18's 30 supplied success paragraphs and retain the current player-facing approach labels and all other trap prose. Do not rewrite for consistency, fill B3–B8 or require additional editorial refinement. The user accepts current narrative inconsistencies for this increment and will refine these texts later; source fidelity and correct outcome routing remain required. | Explicit acceptance of the recommendation and deferred-refinement directive, 2026-09-17 |
| D-018 | Show each epilogue illustration whole, centered and proportionally scaled, with black margins where its aspect ratio differs from the game area. Keep the native lower text and HIDE; do not crop edges, stretch the art or add bust overlays. | User accepted the whole-image recommendation, 2026-09-18 |

| D-019 | Authorize generation of the two lover confinement portraits, matching the current heroes and tavern. Pérola is incorporated into stone; Floraí into fig-tree roots. Preserve original source files; use sibling native PNGs. The user subsequently specified rustic, eroded material forms: a stone suggesting any dwarf woman and an old fig tree suggesting any elf, without detailed faces, clothing or living bodies, conveying decades of confinement. This supersedes the prohibition on producing these two assets only. | Explicit user delegation, 2026-09-18 |
| D-020 | Accept audio as ready for this delivery without the pending audition. The user will adjust any audio issues later. Preserve existing technical audio evidence; do not claim listening occurred. | “Pode considerar pronto. Se tiver alguma coisa errada com o áudio eu ajusto depois”, 2026-09-18 |
| D-021 | Accept the editor/devlog capture criterion as ready for this delivery; the user will produce the capture manually later. Do not claim the capture exists. | “Pode considerar pronto também. Depois eu faço isso manualmente”, 2026-09-18 |

The [temporal-presentation ADR](adrs/adr-001-rheed-temporal-presentation.md) records D-010 through D-015 and their supersession boundaries. Individual decisions, the consolidated product stage and the complete spec set are approved.

## Source evidence

The following heads were inspected in this session; recheck freshness before implementation.

| Source | Inspected revision | Observed contribution |
| --- | --- | --- |
| [PR #15](https://github.com/edneyreis999/gamejam-vn-terror/pull/15) | `537b7e825d695799033223810c7429d190f30172` | Eight epilogue illustrations, source prose, and a standalone HTML reading preview with 17 passages. No MZ runtime changes. |
| [PR #16](https://github.com/edneyreis999/gamejam-vn-terror/pull/16) | `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c` | `feedbacks/fim-do-jogo` and `feedbacks/fim-das-trilhas`; no illustration files. |
| [PR #17](https://github.com/edneyreis999/gamejam-vn-terror/pull/17) | `85fc7b03f932337d2daaa100dc830c9b6e0c307d` | Gorvak event staging in Map037, tavern background replacement, and global VNPictureBusts anchor/scale parameters. Dialogue prose is unchanged. |
| [PR #18](https://github.com/edneyreis999/gamejam-vn-terror/pull/18) | `2f91f94610ea27671d2bfeb9b5e4bf16abe718de` | Documentation-only trap catalogue: 30 success paragraphs under simplified approach headings for A1–A8/B1–B2, plus empty B3–B8 files. No runtime, description, failure, death or artwork changes. |
| [PR #19](https://github.com/edneyreis999/gamejam-vn-terror/pull/19) | `daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8` | Native Map002 prologue with six reading passages/nine message boxes, older and younger Rheed portraits, explicit AttachedPictures activation, GDD §27, completed source contracts and selected QA evidence. |
| Current local baseline | `3b5730495302e8676785e994421b3adfb4b82078` | Existing native game implementation and canonical GDD inspected during intake. |

Static comparison of PR #17 found removal of five `MotionPreference` queries and eight reduced-motion branches in Map037, with animated commands using 20 frames. These removals are an integration concern, not an accessibility design approval. No runtime or visual validation of the PR has been performed in this intake.

On interview resumption, all three PRs were rechecked: they remain open at the revisions above, with no comments, reviews, or checks reported. Read-only inspection of Map023 confirms that it contains the coffer discovery, Palotina's two outcomes, a group challenge or solo passage, Ivaí's confession, Andirá, eligible opinions, the final Irati excerpt, and the choice. The approved third-route source overlaps this opening; D-007 confirms replacement, and D-008 defers solo wording refinement.

Execution-order correction: Map023's command layout alone does not establish narrative order. `Dryland_CampaignRules.js` builds the existing Council reading plan with `irati.03` before the challenge/solo passage and confession. D-007's approved sequence places that excerpt after eligible opinions; technical design must account for this change explicitly rather than describe it as unchanged behavior.

Existing route-completion rules allow Ivaí to finish an initial route or reach the Council alone when the final present hero dies at the last encounter and living reserves remain in town. The inspected canonical cases UT-026 and UT-027 cover these paths; UT-028 covers total-loss precedence. These test definitions were read, not executed. The new route texts assume companions are present. D-008 accepts that wording limitation for this increment across initial routes and the Council; it does not bring reserves into the scene.

PR #19 was inspected after the scope expansion and was open with no comments, reviews or checks reported. Its base is the same local baseline above. [Source analysis](source-analysis-pr19.md) records native behavior, presentation overlap, exact plugin deltas, source evidence and limits. Its two inspected delivery screenshots match their versioned SHA-256 provenance. No runtime or tests were executed in this integration analysis.

PR #18 was then added before product confirmation. It was open at the revision above, based on the same baseline, with no comments, reviews or checks reported. [Source analysis](source-analysis-pr18.md) records all ten populated files, native result owners and the approach-label decision. Native Maps007–016 already contain the corresponding 30 success passages; empty source markers do not mean B3–B8 lack playable content. The source PR explicitly leaves runtime integration, final editorial review and playtest outside its own delivery; do not report those checks as executed here.

## Scope

- Integrate all eight approved epilogue texts and illustrations into native epilogue maps.
- Integrate approved ending and route-completion prose from both files in PR #16.
- Integrate only the 30 supplied trap-success paragraphs from PR #18 into their existing native outcome passages. Preserve current approach labels, B3–B8 content, descriptions, failure/death passages, rule mappings and artwork. Editorial consistency refinement is deferred by D-017.
- Stage older Rheed's new route narration in the narrative present, in full color and alone over black. Return to the pastel past and its direct-dialogue participants at their lines. Preserve illustrated epilogues without bust overlays.
- Integrate PR #19's native prologue, approved source script and supplied `Reed final.png` / `Reed-novo.png` assets, preserving its reading lifecycle, transfer and non-selectable Rheed framing, with presentation/audio replacements governed by D-012/D-014.
- Give the present-day storytelling event and the past expedition distinct local music and narrative sound palettes. The [approved audio contract](approved-narrative-dialogue-staging.audio.md) records the delegated initial selections.
- Reuse `Dryland_EndingReunite.png`, `Dryland_EndingDestroy.png`, and `Dryland_EndingTotalLoss.png` for the corresponding endings.
- Integrate the tavern artwork and apply the reference conversation staging across the game's dialogue scenes, with explicit coverage of alternate interaction paths.
- Preserve native authoring and approved campaign rules, eligibility, and reading controls unless the interview explicitly replaces a particular contract.

## Confirmed product behavior

This section contains the confirmed observable product requirements. [User stories](_user_stories.md) provide the corresponding player outcomes. Stage 2 records presentation and implementation detail in the affected discipline contracts without expanding these outcomes.

### RQ-001 — Approved content integration

Integrate PRs #15, #16, #17, #18 and #19 as one native-game increment. Preserve approved prose and supplied artwork; readable message splitting does not authorize rewriting. The standalone epilogue HTML and trap catalogue are source material, not new runtimes. Do not repeat superseded passages or reopen content approvals already recorded for their respective sources.

### RQ-002 — Prologue and present-day audience

Use the approved Rheed prologue and end after Ivaí's final response, entering preparation once. Older Rheed tells the story in the present at Noite da História in a city, as Daratrine's best storyteller, to hundreds of creatures including the player. This framing does not add an audience avatar, choices, an extra opening line or a closing speech. Young Rheed remains a helper/witness outside the selectable party.

### RQ-003 — Temporal visual distinction

Every visible appearance of older Rheed is in full color, alone over black. Young Rheed and the narrated events are in the pastel past. A direct line in the past returns to that scene and its actual participants. The storytelling venue's artwork is deferred; do not substitute a dimmed past scene or invent its appearance.

### RQ-004 — Initial route completion

Play the first/second completion texts after the corresponding Pérola/Floraí sequence and before returning to preparation. First and second follow completion order. Preserve map-piece delivery, character-specific lines and the subsequent complete-map revelation.

### RQ-005 — Council revelation

The third-route text replaces the existing coffer discovery through Ivaí's confession. Continue with Andirá, eligible opinions, the final Irati excerpt and the ending choice. Narrator passages use older Rheed's present-day presentation; direct dialogue returns to the past. Preserve Council-solo gameplay and actual participant eligibility without requiring solo prose variants.

### RQ-006 — Endings

Use the approved three ending texts with the existing corresponding full-screen ending illustrations. Preserve the choice consequences, total-loss precedence and subsequent memorial/epilogue/credits flow. Do not produce the additional artwork described but not supplied in PR #16.

### RQ-007 — Illustrated epilogues

Each eligible hero receives the approved epilogue prose and illustration in full screen, native lower text and existing reading controls, without overlaid busts. Preserve stable hero order and eligibility: living climax participants only; dead heroes belong to the memorial and reserves do not gain epilogues.

The illustration occupies the scene as a proportionally fitted whole image. Center it over black, retaining margins where needed rather than cropping or distorting it (D-018).

### RQ-008 — Conversation presentation

Use Gorvak's PR #17 style across conversations, including young Rheed/Ivaí in the prologue, all hero interaction paths and multi-participant Council dialogue. Preserve entrance, speaker emphasis, listener dimming and exit, with individual framing and visible faces. Preserve special fiction constraints, including the lovers' prisons and Andirá's reflection.

### RQ-009 — Temporal audio

The present event and the past use different music and narrative sounds. The present suggests a public storytelling gathering; the past follows the expedition's locations and tension. Temporal cuts change audio context together with the scene, including the prologue. Preserve distinct volume controls, mute settings and existing ending cues; neither audio nor crowd reactions supply indispensable information.

### RQ-010 — Reading, continuity and accessibility

Keep player-controlled reading, HIDE, Settings, keyboard/mouse use, reduced motion and FAST restricted to seen text. Scene changes do not repeat decisions, deaths or rewards; normal tavern returns do not replay the prologue. Preserve native save-file ownership and existing campaign checkpoints. Continue resumes the last successful checkpoint, so unsaved reading may repeat. The technical design below defines structural compatibility without promising a migration or deleting saves.

### RQ-011 — Scope discipline

Defer solo wording refinement and the illustration of the present-day venue. Do not add party mechanics for Rheed, interactive audience systems, wholesale prose rewriting, new dependencies, remote services, or new ending artwork. Existing provisional assets retain their acceptance status; this increment does not declare every game asset final.

### RQ-012 — Trap-success rework

For A1–A8 and B1–B2, present the supplied success paragraph corresponding to the approach actually chosen. Each encounter retains three approaches and the existing guaranteed-success/lethal-failure rule. Do not expose competency labels, invent an acting hero, change pools or alter sacrifice/progression behavior.

Preserve current approach labels, B3–B8 content, all trap descriptions, failure/death passages and existing encounter illustrations. The PR's simplified headings remain editorial source identifiers; they do not replace the choices. Native success presentation remains lower text over the same encounter artwork, without adding an older-Rheed interlude or a new illustration. Split longer paragraphs for readability without rewriting or replaying the approach or reward.

Accept the supplied text as the prototype integration baseline even where its narrative consistency needs later work. Do not add a rewrite, completion task or editorial approval gate to repair that accepted limitation. Faithful text integration, association with the chosen approach, readable presentation and preserved mechanics remain acceptance requirements. The [trap-integration ADR](adrs/adr-002-trap-prose-integration-boundary.md) records this boundary.

## Deferred refinement

Solo-specific route prose is outside this increment under D-008. Do not add adaptation tasks or require revised solo text for acceptance. Existing solo progression, ending choices, participant visibility, and epilogue eligibility remain required behavior. The user's later narrative refinement has no assigned delivery date in this spec.

PR #18's trap prose receives no additional consistency rewrite or completion beyond the supplied 30 success paragraphs. Future text refinement belongs to the user under D-017; it is not required to make this increment acceptable. Preserve untouched trap text even if its phrasing differs from the new results.

The present-day setting is a city hosting Noite da História, with hundreds of listeners. The city's name, venue design and artwork are unspecified; do not invent, generate or commission that environment in this increment. Use the approved black background. The temporal palette is confirmed, while asset treatment details belong to the affected Technical Art contract and must respect the approved supplied artwork.

## Authority map

| Source | Governs | Planned treatment |
| --- | --- | --- |
| User decisions above | Approved content and this increment's presentation changes | Carry into requirements and applicable ADRs. |
| [Temporal-presentation ADR](adrs/adr-001-rheed-temporal-presentation.md) | Confirmed time, palette, backdrop, event context, dialogue style and audio direction | D-013 replaces the dimmed backdrop; D-014 replaces silence; D-015 defines the event/audience while venue artwork remains deferred. |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) | Campaign, eligibility, presentation, and native authoring | Updated for the accepted narrator, source replacements, route/Council sequence, epilogue fit and audio; unrelated rules remain. |
| [PR #19 canonical GDD §27](https://github.com/edneyreis999/gamejam-vn-terror/blob/daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8/docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#27-prólogo-de-rheed--gdd-50) and completed prologue spec | Rheed's identity, supplied portraits, delivered prologue, accepted ambiguities and deferred refinements | Prologue framing and accepted limits incorporated into local §27, with this increment's explicit presentation/audio overrides. Numbered v5.0 and completed source spec remain historical; source QA does not prove integration. |
| [Hero sheets](../../../docs/narrativa/herois/) and [ADR-003](adrs/adr-003-approved-prose-and-illustrated-epilogues.md) | Character facts and approved epilogue replacements | GDD now gives PR #15 precedence for epilogues; synchronize only those sheet sections during implementation. |
| [PR #18 trap catalogue](https://github.com/edneyreis999/gamejam-vn-terror/tree/2f91f94610ea27671d2bfeb9b5e4bf16abe718de/docs/narrativa/armadilhas), [trap-integration ADR](adrs/adr-002-trap-prose-integration-boundary.md) and canonical GDD §§10/12/14 | Supplied success prose; confirmed integration limit and competency matrix | Integrate supplied results only; retain current labels, stable mappings and untouched content. Editorial consistency refinement is deferred. |
| [Current authoring baseline](../eventbridge-minimal-runtime/spec.md) | Native map/event ownership and campaign integration | Preserve historical decisions and implementation status; describe later changes here. |
| [Native bust authorship baseline](../vn-native-bust-authorship/spec.md) | Native visual authoring | Consult alongside the superseding GDD section 26. |

## Relevant native surfaces

- Epilogues: Maps029–036; retain H1–H8 eligibility and sequence.
- Ending scenes: Maps025–027.
- Council: Map023, including the solo case and surviving participants.
- Trap results: Maps007–014 for A1–A8 and Maps015–016 for B1–B2; three existing success passages per map. Maps017–022 retain B3–B8 content. Shared encounter consumers and reading/test fixtures must remain aligned.
- Tavern: Map003 and interaction Maps037–044.
- Prologue: Map002; six `prologue.rheed.*` reading identities in CampaignRules; pictures 60/61 and explicit AttachedPictures commands; supplied old/young Rheed portraits.
- Shared presentation configuration: compose PR #17's VNPictureBusts changes with PR #19's AttachedPictures activation and empty default picture list; preserve vendor files and plugin order.
- Additional dialogue consumers: CE263–265 thresholds; CE282–289 farewells; CE292–299 lover/receipt scenes; CE302 Ivaí's map-revelation line; Council CE068–079. Native discovery routing uses Map004, CE040/046/049–052/303, with CE300–302 for preserved Irati/map prose.
- Runtime: `rpg-maker/The Dryland Drowned/`; tests: `rpg-maker/tests/`.

## Discipline contracts

| Contract | Owns | Status |
| --- | --- | --- |
| [Narrativa](approved-narrative-dialogue-staging.narrativa.md) | Pinned prose sources, source-to-scene association, segmentation and Council order | approved; source approvals retained |
| [UI/UX](approved-narrative-dialogue-staging.uiux.md) | Reading surface, temporal cuts, controls and whole-image epilogue fit | approved; F-01 clarified |
| [Technical Art](approved-narrative-dialogue-staging.technical-art.md) | Approved imports, native picture targets, source palette and per-art framing | approved design; integrated rendering pending |
| [Áudio](approved-narrative-dialogue-staging.audio.md) | Delegated local cues, event levels, temporal replacement and one-shot ownership | approved design; selection/tuning delegated |
| [Programação](approved-narrative-dialogue-staging.programacao.md) | Exact native owners, state/reading transitions, plugin integration and save lifecycle | approved design; implementation pending |
| [Verification](verification.md) | Requirement sensors, canonical test owners, scenario variants, provenance and acceptance states | approved contract; all candidate checks pending |

Use this current MZ naming scheme; do not create parallel `_spec.md`, `_dx.md`, `_uiux.md` or `_tests.md` authorities solely to mirror legacy playbook filenames.

## Technical design

### Native layers and changed surfaces

Keep prose, bust composition, picture fitting, audio commands and branches in native maps/Common Events. CampaignRules owns facts and ordered reading; Bridge remains the existing scalar/query/action/checkpoint integration, and Presentation retains its narrow controls/motion/audio-volume responsibilities. The programming contract's owner table is the complete changed-scene inventory. No new runtime, custom rendering engine, provider source change, service, package or build is needed.

Compose the two distinct `plugins.js` edits rather than taking one source file wholesale: PR #17 VNPictureBusts defaults and PR #19 AttachedPictures activation/explicit-only list. Preserve plugin order. Inspect consumers of the changed defaults, including heroes, thresholds, farewells, lovers and Council; explicit per-art targets keep framing correct. Preserve normal/reduced-motion alternatives even though PR #17 removed them in its reference event.

Import the eight epilogue images and supplied Rheed portraits plus PR #17 tavern art. Preserve originals; Liora's BMP needs a lossless native PNG derivative. Fit epilogues whole over black using proportional native targets; do not add a filter, crop, blur extension or replacement illustration. Keep source status/provenance and inspect actual rendering at the two desktop references. No battle, actor-party, inventory, destination/pool or packaging-architecture change is introduced.

### Reading and state transitions

Import PR #19's six prologue identities. Preserve existing semantic IDs for revised trap/ending/epilogue prose and hero observation units; native box splitting does not create extra domain completions. Add only `closure.first` and `closure.second` reading scenes, each with one passage. After the existing lover sequence grants its map piece, select the appropriate closure from committed completion order, then retain the old Irati/complete-map continuation. No extra campaign phase or stored route counter is necessary.

Reorder the Council plan to its first three discovery passages, existing collective/solo challenge identity, confession, Andirá, eligible opinions and `irati.03` last. Both challenge branches use the accepted source paragraph while their actual cast remains different. Preserve the medallion grant at `council.01`. Update plan construction and validation together; stale/repeated action rejection stays in the rules. Native script ownership and the exact source blocks are defined by the narrative contract.

### Event, save and audio lifecycle

Capture and complete each passage on its owning interpreter once, after its final box. Native helpers may stage a scene but do not replay actions or complete the parent. Refresh queries after completion; source interpreters finish before destination autoruns take over. Explicit cleanup removes outgoing pictures and attachments; temporal cuts restore only presentation. Consecutive same-speaker boxes keep their composition.

Preserve existing semantic checkpoints and current-file autosave. A map piece is committed and saved before its new closure; a narrator appearance or extra text box adds no checkpoint. New Game/current-version earned saves are the verification scope inherited from PR #19. Old saves remain untouched, with no migration, revision gate or compatibility promise. Continue can replay unsaved reading from its last successful checkpoint; it must not repeat committed choices, rewards or deaths. No second save/state envelope is introduced.

Native scene branches select music/ambience together with the temporal composition. Applause belongs only to the original opening path, never recurring narrator/restore helpers. Settings, HIDE and current-checkpoint restoration preserve native volumes and consumed commands. Stop generic past music before the retained ending ME. No temporal campaign flag or custom audio scheduler is required.

### Failure and cleanup

Keep native missing-asset/Retry and save-failure treatment; do not silently omit content, invent state or delete files. Retire only replaced executable prose, superseded epilogue bust presentation and helpers proved to have no remaining consumers. Keep native empty Common Event records and stable IDs; no unrelated cleanup. Source-import and structural edits must have preconditions and focused diffs. Check the five source heads again before implementation and review any changes against accepted scope.

## Acceptance summary

| ID | Expected observable | Verification |
| --- | --- | --- |
| RQ-001 | All five sources integrated faithfully into native ownership | V-001/008 |
| RQ-002 | Source Rheed prologue and one normal transfer, correct time/party frame | V-001/002/003/007 |
| RQ-003 | Colored older Rheed alone over black; source past palette and restored past cast | V-004 |
| RQ-004 | Both order-dependent route closures after one piece grant | V-001/002/003/007 |
| RQ-005 | Replacement Council revelation, actual witnesses, Irati after opinions | V-001/002/003/004 |
| RQ-006 | Correct text/art/outcome and unchanged terminal routing | V-001/002/003/004/007 |
| RQ-007 | Eight source epilogues, whole-image fit and living-climax eligibility | V-001/002/003/004 |
| RQ-008 | Reference staging applied to every inventoried dialogue branch and constrained character | V-004/005/008 |
| RQ-009 | Distinct audible temporal contexts, preserved volumes and ending precedence | V-006 |
| RQ-010 | Safe reading controls and actual checkpoint continuity without repeated committed actions | V-002/003/005/006/007 |
| RQ-011 | Deferred creative work and architecture exclusions preserved | V-008 |
| RQ-012 | Only 30 success paragraphs replaced; labels, other prose, mechanics and background preserved | V-001/002/003/005 |

## Open decisions and next gate

No unresolved product or surface question remains. The complete technical design, local cue baseline and verification contract were approved on 2026-09-18, and validation finding F-01 is resolved. Per-art target calibration and audio-level tuning occur during implementation within the already chosen styles, with actual visual/listening checks; they are not requests for new artwork or prose.

Do not request product or full-spec approval again for this unchanged scope. The [ten-task graph](tasks.md) was authored on 2026-09-18 after preflight and is pending graph approval. It ends with one QA planning/execution pair. The spec approval remains valid; task-graph review does not reopen the design. No implementation has started. An optional spec peer review remains applicable without becoming a mandatory gate.

## Devlog moment

Capture the integrated prologue's colored older Rheed over black, its cut to young Rheed/Ivaí in the tavern, then a new route closing and a whole-image epilogue revealed with HIDE. Include a short recording that makes the temporal music change audible. Show the corresponding native event in the editor to demonstrate where the text and framing are authored. Use only actual candidate output, not source screenshots presented as the integration.

## Verification status

Intake includes remote PR metadata/diffs, structured comparison of Map037/Map002 and plugin configuration, source documentation/data inspection, and inspection/hash verification of two PR #19 delivery screenshots. PR #19 reports completed source QA; those results do not prove the combined integration. Implementation, automated runtime checks, directed gameplay, fresh visual evidence, and delivery acceptance remain unperformed for this increment.

## Loop execution — 2026-09-18

The user explicitly requested `rpg-maker-mz-loop-tasks` execution for this spec, authorizing the graph. Current implementation and evidence status is maintained in [tasks.md](tasks.md) and [verification.md](verification.md). Earlier review/handoff statements above are historical.
