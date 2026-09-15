---
status: approved
slug: eventbridge-minimal-runtime
---

# Minimal EventBridge and native editor authorship

## Objective

**Current increment — 2026-09-14:** the user requested the [map-authorship expansion](#map-authorship-expansion--2026-09-14), including removal of displaced Common Events, then authorized execution. Tasks19–29 completed the scene migrations, retirement and canonical join; [verification.md](verification.md) owns the evidence. Task15 completed the current QA plan and task16 completed the available directed, visual, audio and native-editor execution and is blocked-verify on the remaining visual/human gaps recorded in verification.md. Human acceptance remains separate. [ADR-006](adrs/adr-006.md) records scope and lifecycle constraints; earlier delivery statements below describe their own baselines.

Let the team edit scenes, conversations, presentation and game configuration in RPG Maker MZ without editing JavaScript or running a content-revision command. Keep Dryland_EventBridge as the connection between native events, campaign rules and autosave. Remove its editorial enforcement and QA features from the game.

The user completed the functional interview on 2026-09-12. The user approved the complete spec set on 2026-09-12 with “Aprovo”, explicitly including the separate local presentation adapter and the editable initial capacity of 20 SaveCore files. The approved design is now being executed through [tasks.md](tasks.md); [verification.md](verification.md) records actual evidence and pending product/human sensors.

The user's subsequent review direction on the same date is incorporated in [ADR-002](adrs/adr-002.md): native events call their Common Events directly, and image loading retains the engine/provider default after investigation found no ready per-image wait command for the existing editor-only scope. The internal Script API and CoreEngine preload are documented there. No Bridge content-dispatch command or project image-wait command is added.

The user's later request adds CoreEngine System: Load Images for every tavern image, as recorded in [ADR-003](adrs/adr-003.md). This narrows the earlier preload exclusion to the rest of the game.

The subsequent 2026-09-14 adoption of [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md) promotes the implemented Gorvak map and shortcut removal. The incremental EX requirements below override earlier conflicting H1 routing and editorial-entry assumptions. The later MA increment below records the completed applicability analysis and pending migration of the other heroes.

## Scope

- Retain campaign initialization, functional data queries, choice/action mapping, reading completion and checkpoint autosave integration.
- Move narrative execution, presentation and editable associations into native events reachable from the relevant maps.
- Use installed VisuStella features for reading controls, visibility, pictures and save files. A small project presentation adapter may supply the explicitly retained interface functions that the installed providers do not cover; its boundary is defined below.
- Preload every image used in the tavern through the installed CoreEngine System: Load Images command, with one editor-authored file list and native event calls.
- Remove runtime/editorial audits, manual content revision, the QA console, custom campaign-blocking UI, automatic bust reconstruction and the custom instant text-skip mechanism.
- Preserve the existing campaign mechanics, narrative content and authored visuals except for the expressly approved changes to memorial assets, reading controls, credits and save-file selection.

## Exclusions

No combat, free exploration, RPG inventory/status menu, new story content, rebalance, new routes/heroes, public dialogue log, cloud saves, manual rewind saves, new services or build step. No blanket migration promise for saves created before structural event changes. No rewrite of engine or vendor plugin files.

General game-wide image preload remains a separate [known issue](../../../docs/known-issues/KI-20260912-precarregamento-de-imagens.md), outside this spec. The explicitly requested tavern preload is included under RQ-009/ADR-003. Existing provisional writing/art is not promoted to final creative approval by this migration. New memorial derivatives must be usable production assets, not placeholder crops.

## Behavior

### RQ-001 — A playable campaign with a minimal Bridge

New Game creates campaign state before any event queries it. The prologue reaches the tavern; selection, destinations, approaches, sacrifice, retreat, rewards and endings retain their current rules. CampaignRules remains the authority for eligibility, randomization and transitions. Bridge translates event inputs and returns results; it does not repeat domain validation or render the scene.

### RQ-002 — Conversations and scenes reachable from maps

An author starts at Taverna → Gorvak → Conversar branch → Chamar evento comum → Conversa — Gorvak and edits native dialogue/bust commands. The native call directly selects and executes the conversation; Bridge does not dispatch it. Apply the same discoverable pattern to all eight heroes, the prologue, sixteen encounter maps, Council, endings, memorial and epilogues. Shared Common Events may contain interaction branches; the named map entry exposes the actual path used in play. Text need not be inline in a map event. Split currently multiplexed Common Events into independently callable units. Native event execution replaces Present's slicing of marked command ranges.

### RQ-003 — Configuration through editor fields

Public names and functional configuration data formerly authored as JSON inside special comments become editor fields reachable from a clearly named Configuração do jogo event. Content references belong to native Call Common Event selectors; image and map references belong to their native/provider presentation and transfer commands. Do not duplicate those associations in Bridge configuration. Preserve existing mechanical values and one editable source for each association. The author does not write JavaScript, manually serialize an array or follow a special comment/section naming convention to change them.

### RQ-004 — Native authoring without Bridge enforcement

Remove mandatory status/source/speaker metadata, text formatting filters, command allowlists, auxiliary-event ownership restrictions, required section conventions and asset-inventory membership checks. Saving an edit and starting the game is sufficient. Native MZ/plugins interpret their supported commands and report real loading/execution errors. Do not recreate these policies in another plugin, startup script or mandatory author tool.

### RQ-005 — Data-only queries and observational reading

Events can query current phase, passage, whether it was read, living/selected heroes, candidates, available routes, results and death records without direct campaign-object scripts. Queries neither draw nor advance the campaign. Conversar/Rever descrição execute native content without replaying a selection or completing an unrelated campaign passage. A separate explicit completion command advances the current campaign passage once.

### RQ-006 — Event-owned interface

Move tavern labels, party count, selected destination, button text, focus/disabled appearance, destination panels/backgrounds, encounter title/progress/actions, sacrifice layouts, roster and memorial layouts to native events. Relevant maps expose named entry events; helpers remain discoverable through explicit Common Event calls. The domain supplies availability and facts, while events own text, images, positions and timings. Keep current desktop layout and mouse/keyboard usability as the migration baseline.

### RQ-007 — Explicit bust lifecycle and native recovery

Authors choose entry, focus and exit through VNPictureBusts/native event commands. Remove Bridge's automatic conversation-picture erasure, command ownership guards, visual-prefix extraction and replay/reconstruction on Options/Continue. Preserve native Game_Screen and event state. If a saved scene requires explicit composition, its event owns that composition and cannot repeat dialogue or campaign decisions. No claim of exact interrupted animation-frame restoration is added.

### RQ-008 — Death presentation and prepared memorial assets

Keep the first-return disappearance of dead heroes in tavern events, preserving simultaneous one-second fades, continued preparation, immediate absence with reduced motion and no repeat after leaving. Bridge supplies death facts only. Memorial reads the dead heroes and their locations from campaign queries; events own the arrangement, captions and native animation. Prepare framed portrait assets instead of runtime cropping. Remove Bridge's crop, expanded crop and ghost/crossfade renderer; preserve source artwork and the current identity of each portrait.

### RQ-009 — Native image loading

Remove Bridge's global image-ready pause and bust-command loading interception. Use default MZ and installed-provider loading, including their ordinary delays and error-detection lifecycle. The native investigation in ADR-002 found CoreEngine preload and an internal whole-cache wait accessible through Script, but no ready editor command for the former per-image readiness/Retry guarantee. Preserve editor-only authorship and the user's default-behavior fallback instead of adding a loading script recipe. No custom image wait, polling, interception or immediate-Retry guarantee is required or permitted in Bridge or Presentation. Use native Retry where supplied. Required assets must still exist; do not add guessed frame delays to mask loading or a mandatory asset registry.

Add CoreEngine System: Load Images for all tavern images: backdrop, every stage portrait and conversation bust, interface/panel/button assets, destination previews, roster and the map-piece overlay used there. Keep its file selectors in one native Common Event reachable from the tavern map, called before presentation on entry/return and covered by the Continue interaction paths. Load the complete set regardless of current party or route state. The command starts requests and retains normal provider cache/error behavior; it does not add a readiness barrier. Programming owns the current asset baseline and call contract. General game-wide preload remains excluded.

### RQ-010 — FAST replaces custom text skip

Offer only the installed Extended Message FAST reading control for passages already read in the current campaign. FAST uses the provider's accelerated execution and requires player selection. Remove the AUTO button, per the user's 2026-09-14 decision in [ADR-004](adrs/adr-004.md); keep Configurações and HIDE. Ineligible/new passages and decisions must not inherit active AUTO/FAST from the preceding passage or another campaign. Preserve manual reading and explicit player choices.

Remove Window_DrylandSkip, the hardcoded S shortcut and Bridge's instant SKIP_SEEN_TEXT execution. Do not hide the old jump behind FAST. Bridge only reports reading facts and receives normal completion. The user's later decision supersedes the earlier interview proposal to retain an instant-skip action. AUTO for unread content and automatic activation of either mode are not approved.

### RQ-011 — Interface controls outside Bridge

Keep HIDE, the reduced-motion preference, keyboard navigation/focus and prevention of a single gesture confirming consecutive interactions. Use MessageVisibility, PictureChoices, other installed presentation plugins and authored events. Any missing technical support belongs to the project presentation adapter, not Bridge. HIDE restores without selecting an invisible choice or advancing text. Reduced motion changes presentation, never campaign rules.

### RQ-012 — SaveCore owns campaign files

New Game selects a dedicated file for that campaign. Autosave updates that file; Continue lets the player select a campaign to load. SaveCore owns file selection, number of files and association with the current campaign. Remove Bridge's slot-zero overrides and single-campaign policy. Approved editable initial configuration: SaveStyle = locked, AutosaveType = current, MaxSaveFiles = 20, the installed vendor's default capacity. The capacity is an approved editable default, not a new fixed game rule. No manual save button is added.

### RQ-013 — Checkpoints and ordinary save loading

Preserve automatic saves at the existing semantic decision boundaries, after the domain commits a choice and before the next authored reading/choice. Bridge requests and awaits the SaveCore operation without selecting its destination. Continue must not repeat a committed decision. Remove native-layout revision matching and extra Bridge envelope/state audits. Retain files on load failure; use native MZ/SaveCore failure handling. A text/art edit is not rejected merely for changing content revision. Structural event incompatibilities remain possible without a migration promise.

### RQ-014 — Remove runtime QA and the global blockade

Remove expeditionQA snapshot, validate and preset-seed functions, custom technical notices and the _drylandInvalid campaign freeze. Do not relocate them. Keep ordinary campaign randomness and domain action legality. User-facing gameplay feedback such as grupo cheio belongs to events. Real failures are not converted into successful actions or silent New Game resets.

### RQ-015 — Audio settings remain effective

Preserve the current native audio cues and routing while moving the live ME-volume integration out of Bridge. Changing Temas during playback, including zero volume, affects the currently playing cue. Track/file selection and volumes remain editor-accessible. No new audio assets, themes or music direction are introduced.

### RQ-016 — Native rolling credits

Use Mostrar texto rolante at speed 2, with native acceleration allowed. Text and speed are authored in the ending event/Common Event. The credits progress automatically, can accelerate through native held confirmation/Shift/touch and retain Pular créditos with keyboard/mouse access. Completion or skip returns to title once without changing the saved ending. End naturally when the roll finishes, not after the old 600-frame timer. Extended Message's AUTO/FAST console is not required for the scrolling-text window.

### RQ-017 — Visual novel map behavior

Keep the game without free avatar movement or the standard RPG menu. These controls are outside Bridge. Use the native menu-access command in the configuration Common Event, with CoreEngine's all-sessions NewGame Common Event entry. Ordinary held input must not accelerate unread campaign events; authorized FAST and native credit acceleration follow RQ-010/RQ-016. Keyboard navigation of interface choices remains available.

### RQ-018 — Complete consumer and documentation migration

Update all live event calls, plugin metadata/configuration, tool imports, canonical tests and current editing/QA instructions affected by the removed contracts. Remove the manual revision and validation ritual rather than silently retaining it as a startup prerequisite. Preserve historical specs/reports as history. A non-JavaScript author can demonstrate the map-to-content workflow without the terminal.

## Authority Map

| Source | Owner | Status | Governs | Change |
| --- | --- | --- | --- | --- |
| [Interview](../../../docs/design/2026-09-12-eventbridge-runtime-e-entrevista.md) | User | Functional decisions accepted | Final responsibility destinations; later decisions supersede early suggestions | Link consolidated spec |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) | Game design | Confirmed, with provisional content explicitly marked | Mechanics and approved incremental replacements | Record the accepted product decisions |
| [ADR-001](adrs/adr-001.md) | User / specification | Product and technical design accepted | Replaced baselines and deliberate tradeoffs | New |
| [ADR-002](adrs/adr-002.md) | User / specification | Review amendments accepted | Direct Common Event calls; default native/provider image loading | Supersedes the two reviewed contract gaps |
| [ADR-003](adrs/adr-003.md) | User / specification | Tavern preload requested and accepted | CoreEngine Load Images for all tavern images | Narrows the preload exclusion |
| [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md) | User | Architecture and organization accepted, 2026-09-14 | Hero map authorship and removal of editorial-only shortcuts | Supersede ADR-005 in full and the explicit portions of earlier ADRs |
| [ADR-006](adrs/adr-006.md) | User | Expansion requested for spec/tasks, then task19 execution authorized, 2026-09-14 | Seven heroes, selected campaign maps, native handoff and displaced-CE retirement | Supersedes the pilot-only deferral; task19 implemented, remaining expansion pending |
| [Native bust baseline](../vn-native-bust-authorship/spec.md) | Programming / Technical Art | Historical approved increment | Current restoration and authorship behavior | Superseded only where specified; leave history |
| [Current native project guide](../../../rpg-maker/README.md) and maintained game sources | Programming | Current implementation baseline | Existing native entry, checkpoints, editor workflow and event maps | Migrate current instructions; preserve historical evidence |
| [Programming](eventbridge-minimal-runtime.programacao.md) | Programação | Approved | Layer boundaries, command/data lifecycle and deletion inventory | New |
| [Narrative](eventbridge-minimal-runtime.narrativa.md) | Narrativa | Approved | Content organization and editorial continuity | New |
| [UI/UX](eventbridge-minimal-runtime.uiux.md) | UI/UX | Approved | Presentation controls and reader behavior | New |
| [Technical Art](eventbridge-minimal-runtime.technical-art.md) | Technical Art | Approved | Event composition and prepared assets | New |
| [Audio](eventbridge-minimal-runtime.audio.md) | Áudio / Programação | Approved | Cue preservation and live volume | New |
| [Verification](verification.md) | Verification | Approved plan; not executed | Sensors, scenarios and evidence | New |

## Technical Design

### Game surfaces

The game root is rpg-maker/The Dryland Drowned/. Preserve engine files, installed vendor bytes and the build-free npm start workflow. Refactor Dryland_EventBridge.js and its callers; keep Dryland_CampaignRules.js as domain owner. The approved local Dryland_Presentation.js contains only retained provider integration that cannot be expressed through the installed commands. Its commands expose editor fields, not scene-specific layouts, prose or a second campaign store. Approval of this spec approves that technical boundary; it is not permission to move the old Bridge wholesale.

Data surfaces include plugins.js, System.json, CommonEvents.json, the named entry events in Maps 002–036, and title/load entry behavior in Map001/CE2. Preserve MapInfos hierarchy and existing stable identities where possible. Append new Common Events without renumbering unrelated authored work. Convert references to removed commands in the same implementation as their removal; do not ship a half-migrated disabled Bridge.

Game_System continues storing the campaign and native screen/map/variable state. SaveCore owns file identity. Derived campaign projections remain reconstructible; presentation bookkeeping such as which death fade has been shown belongs to event/UI state, separate from the death fact. The native actor party, HP, encounters and battles do not become campaign truth.

### Event and save lifecycle

1. Load editor-authored configuration data and create the rules instance without executing scene content. Start a campaign once through the normal New Game lifecycle; native startup events configure menu and presentation.
2. Map events query campaign facts where needed, select the applicable native branch and call Common Events directly. A Conversar branch needs no Bridge dispatcher. Each callable narrative unit has one completion point. Observational wrappers omit campaign completion. No terminate-interpreter hook completes every arbitrary helper automatically.
3. Before a reading unit, query its prior-read status and configure provider controls. Before choices, a new unit or transfer, revoke the preceding unit's AUTO/FAST permission. On completed reading, apply the normal completion action once.
4. Player decisions call the domain action through Bridge. Events display the returned gameplay result, request the appropriate checkpoint, then continue. Saving remains asynchronous; scene changes cannot erase an in-flight decision or force another campaign file.
5. Options preserves native pictures. Continue restores the stored native checkpoint, refreshes derived projections and UI permission state, and resumes the native event boundary. It does not run startup-only campaign mutations or replay a visual-prefix interpreter.
6. Terminal presentation follows the saved ending and eligible memorial/epilogues. Credits run outside campaign mutation and clean up their own UI before returning to title.

### Failure and cleanup

Programming's deletion table is part of this spec. Remove dependencies, not just validator error messages. Keep native missing asset/save failures observable according to the engine/provider lifecycle, without custom global invalid state or an extra immediate image-error guarantee. A missing functional reference remains an execution defect; arbitrary omitted editorial metadata does not. No new recovery policy may silently erase a save, invent a campaign, validate every scene or block unrelated content globally.

## Acceptance Summary

| Requirements | Expected observable | Verification |
| --- | --- | --- |
| RQ-001, RQ-005 | Campaign transitions work; queries and rereading are observational | V-001, V-002 |
| RQ-002, RQ-003, RQ-004, RQ-018 | Map-to-event editing works without JS, metadata or revision ritual | V-003, V-004, V-013 |
| RQ-006, RQ-008 | Event-owned UI and prepared memorial/death presentation | V-005, V-007 |
| RQ-007, RQ-009 | Native continuity and loader behavior without Bridge replay/global wait | V-006, V-008 |
| RQ-010, RQ-011, RQ-017 | FAST-only reading console, HIDE, keyboard and VN behavior match the accepted scope | V-009, V-010 |
| RQ-012, RQ-013 | Separate campaign files, correct autosave and native loading | V-011 |
| RQ-014, RQ-018 | Removed QA/enforcement has no live consumer or substitute | V-004, V-013 |
| RQ-015 | Current cue responds to live volume changes | V-012 |
| RQ-016 | Native rolling credits finish or skip cleanly | V-014 |

## Open Decisions

No open approval decision remains. The user approved the complete spec, verification plan and discipline contracts, including the local presentation-adapter boundary and vendor-default file capacity, on 2026-09-12, then directed the narrower native authorship/loading corrections in ADR-002. Implementation and task decomposition have not started. Provider integration and native recovery need the implementation evidence listed in verification.md; they are not represented as already proven. Image loading follows the explicitly accepted engine/provider default. If other constraints cannot be met without a different product behavior or vendor change, bring that concrete conflict back rather than silently weakening the accepted scope.

Devlog: start at the Gorvak event on the Taverna map, change native text or a visual value, save in MZ and show the result. Pair it with the event-authored memorial and speed-2 credits; capture only the implemented candidate and retain the distinction between functional delivery and final creative approval.

## Experimental branch increment — Gorvak map and authoring shortcuts

**Current status: architecture and organization accepted on 2026-09-14.** After reviewing the implementation, the user requested promotion of the two decisions to [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md). [ADR-005](adrs/adr-005.md) is now the fully superseded historical experiment record. This section retains the implemented incremental requirements and supersedes their conflicting baseline routing. The original pilot covered Gorvak and the42 shortcuts; the subsequent MA increment below owns the later expansion. Earlier technical evidence retains its original scope, and other human judgments remain separate.

- **EX-001 — Real map-owned Gorvak interaction:** clicking/confirming Gorvak in the tavern transfers to Conversa — Gorvak, a child map whose automatic event contains the actual native menu, dialogue and responses. Other heroes stay in the baseline model.
- **EX-002 — Formation and navigation:** Conversar preserves campaign facts; selecting/removing H1 uses existing rules and responses. Full-party and automatic-formation restrictions remain intact. Conversation/selection returns to this menu; Voltar à taverna or cancel returns to the formation surface with current facts and focus. Ivaí remains outside party slots.
- **EX-003 — Presentation and reading:** explicit outgoing-picture cleanup; existing assets/text, native H1/Ivaí framing, HIDE/Options and FAST-only seen-text controls. Map-owned units preserve reading identities82–85 through an optional ObservationBegin unit argument. No transferred interpreter may continue the outgoing choice loop.
- **EX-004 — Remove authoring-only map entries:** reconcile and remove the 42 candidates inventoried in task16, preserving null slots, automatic entries, Common Event consumers and stable IDs. H1's retired Common Events are a separate consequence of EX-001; unrelated content and configuration/preload remain.
- **EX-005 — Continuity:** native transfer adds no autosave, formation reset, new campaign phase or new persistence layer. Preserve earned-checkpoint Continue; assess structural save compatibility honestly.
- **EX-006 — Human evaluation:** prove actual editor-to-runtime authorship and evaluate hero-menu/return cost. The user has accepted the architecture and organization under [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md); remaining framing/control judgments stay in verification.md. That pilot scope excluded the other seven heroes; the subsequent MA increment below records their analysis and planned migration.

Tasks17/18 implement the vertical slices; the existing task15/16 QA pair is extended for this branch. The experiment changes programming, UI/UX and native presentation placement; narrative text and audio content retain their previous approvals and pending creative statuses. It adds no dependency, service, asset placeholder or build step.


## Map authorship expansion — 2026-09-14

**Status: execution authorized; implementation and verification follow the task graph.** The user requested applying the recommended expansion and explicitly removing Common Events that cease to be used, then authorized the next step. Tasks19–28 record the implemented scene slices; task29 joins their verification before the directed/human tail. This increment follows [ADR-006](adrs/adr-006.md), [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md). The earlier pilot-only deferral is superseded for the scope below; prior implementation/QA and human decisions retain their dated scope.

### Scope and order

Implement H2–H8 using Gorvak's actual map-owned interaction model. Then move the prologue, eight epilogues, three endings, Council and sixteen encounters into their existing scene maps. Establish and verify the CE040 handoff through Gorvak's epilogue before extending campaign-map ownership; use A1 as the representative encounter before the other fifteen. Retire displaced Common Events within each slice, followed by one complete consumer/orphan reconciliation. Reuse the existing task15/16 QA pair after all implementation leaves.

Lower-priority follow-up, not part of these implementation tasks: moving CE003's tavern orchestration into Map003 and creating a dedicated credits map for CE061/063. Retain destination/roster panels, shared sacrifice, configuration, preload, checkpoints, audio and memorial animation. This scope does not introduce a map per line, a different navigation action for campaign scenes, new content, new assets, gameplay changes, vendor changes or general image preload.

### Requirements

- **MA-001 — Complete hero map authorship.** H2–H8 each have a real child map under Taverna. The tavern portrait transfers to that map and ends its source path. The map contains menu, existing profile/conversation, successful-selection/full-party responses, native bust commands and explicit Voltar à taverna/cancel. Talk and selection return to the hero menu, with the hero retained and Ivaí absent outside his participation. Dynamic group status uses the menu. Preserve full/automatic/dead guards and validated TOGGLE_HERO behavior. Gorvak remains a regression reference.
- **MA-002 — Prologue authored in Map002.** Its native event contains the three current passages in order, with BEGIN, the initial checkpoint, audio and transfer to Taverna preserved. New Game runs the prologue once; later tavern returns do not replay it. Continue resumes the actual stored boundary.
- **MA-003 — One execution owner for migrated campaign scenes.** A migrated map owns its local passage/choice flow. CE040 routes between scenes and retains only the unmigrated/shared responsibilities still required. A scene body cannot execute both in CE040 and in its map. Map identity is checked against campaign facts, not used as another source of phase or eligibility. Prove the native handoff in Map029 before the larger migrations.
- **MA-004 — Epilogues authored in Maps029–036.** Each map contains its own existing epilogue and bust presentation. Preserve the eligible climax-party order, omissions, reading completion and continuation to the next epilogue or credits. No repeated menu/return-to-tavern behavior is added to an epilogue.
- **MA-005 — Endings authored in Maps025–027.** Reunir, Destruir and Perda total contain their specific current passages, backgrounds and presentation. Preserve the committed ending and progression to memorial/eligible epilogues/credits, including total loss without the medallion choice.
- **MA-006 — Council authored in Map023.** The map owns Council text including irati.03 (CE321), eligible opinions, Andirá's intervention and the existing medallion choice. Preserve participants, their order, solo behavior, medallion completion and immediate ending checkpoint. No absent hero speaks and no choice is committed twice. Shared presentation helpers may remain functional calls.
- **MA-007 — Encounters authored in Maps007–022.** Each map owns its existing description, three approaches and success/failure presentation, retaining reread, retreat, sacrifice and death/result continuations. A1 proves the complete lifecycle before the other encounters. CampaignRules still determines assignment, legality, outcome, victim/death, route progression and rewards. Shared consequences or memorial inscriptions must not be duplicated merely to empty the Common Event database.
- **MA-008 — Remove displaced Common Events from the game.** After moving all consumers of a displaced body, replace its slot by null without renumbering. Remove obsolete executable selectors/callers in the same slice; keep no dead named wrapper, empty substitute or second editable copy. Each deletion requires evidence of original consumers, their replacement and no remaining functional reference. Audit transitive helpers after all slices. An unresolved functional consumer means migrate that consumer or retain the Common Event with its reason; it is not permission to delete it anyway.

  **Technical correction, 2026-09-15, superseding the slot encoding above:** the user reported the editor regression after the recent PRs. Native MZ inspection reproduced an empty Common Events list with the migrated `null` slots; a disposable copy replacing only these slots with empty native records restored the list and CE004 content. Retired Common Events must retain `{id, name: '', trigger: 0, switchId: 1, list: [{code: 0, indent: 0, parameters: []}]}` at their original indices. Only index zero remains `null`; map-event null slots are unaffected. This corrects the database representation, without restoring retired bodies, executable callers, or changing campaign behavior. Later references to nulling retired Common Events in this historical plan use this corrected representation going forward. IT-047 checks native records, empty retired bodies and absence of calls to retired IDs; the actual editor is the acceptance sensor for list visibility.
- **MA-009 — Preserve reading, state and persistence.** Preserve explicit observation identities 86–113 for H2–H8, separate from H1's 82–85, and all semantic campaign passage IDs. Partial reading remains unread; FAST stays file-local and resets at choices/transfers. Native checkpoints keep their timing/file/await behavior and Continue does not repeat an action, death, reward or ending. No transfer autosave, new campaign phase, duplicate state store, revision gate or legacy-save conversion is introduced.
- **MA-010 — Preserve presentation and input lifetimes.** Explicitly retire outgoing pictures, restore only derived presentation where required, maintain Options/HIDE and one gesture per interaction. Preserve existing native ambience/cues without accidental restart, the two desktop viewports and reduced-motion behavior. Calibrate each hero's art independently through native fields; preserve assets and their current creative status.
- **MA-011 — Authoring and package remain complete.** Editing the played text/menu/bust commands of a migrated scene is possible from its actual map without JavaScript, a content registry or a revision command. Update current guides, canonical tests and directed drivers to the real paths. Required source may not depend on ignored evidence or obsolete CEs. Preserve the map-to-played-edit demonstration for the devlog; human judgment is recorded separately from technical editability.

### Concrete migration and retirement inventory

This is the starting inventory before tasks19–29, not a current allocation table or an unconditional deletion list. Task19's ledger records its completed removals and Maps038–040. Reconcile IDs and every consumer on each execution checkout; existing IDs and unrelated slots remain stable.

| Slice | Current authored bodies | Destination | Retirement scope after consumers move |
| --- | --- | --- | --- |
| Elowen / Griznik / Seraphina | CE006/007/008 and CE086–097 | Three new Taverna child maps | These 15 bodies; preserve observation IDs86–97 |
| Bimbren / Liora / Vaelith / Draska | CE009–012 and CE098–113 | Four new Taverna child maps | These 20 bodies; preserve observation IDs98–113 |
| Prologue | CE001 and CE114–116 | Map002 | These four bodies after direct native authoring and preserved completion boundaries |
| H1 epilogue pilot | CE306, selected through CE041/040 | Map029 | CE306; remove only its CE041 branch and the displaced CE040 local execution |
| Other epilogues | CE308/310/312/314/316/318/320 | Maps030–036 | Seven bodies and their obsolete selection branches; CE041 may still have opinions/irati.03 consumers |
| Three endings | CE055–057 and CE329–334, selected through CE336 | Maps025–027 | These nine bodies and CE336 after its final consumer is replaced |
| Council | CE053/054/335, CE321–328 and opinion units CE305/307/309/311/313/315/317/319 | Map023 | These scene-specific bodies after all consumers move; retire CE041 after its final epilogue/opinion/irati.03 caller is replaced |
| A1 then A2–A8/B1–B8 | CE013–028; per-encounter description, result and approach units in CE118–261; selection in CE262 | Maps007–022 | Only the migrated units and selectors proven unused; preserve the death-inscription units used by CE347 |
| Final reconciliation | Helpers/selectors made obsolete by the above slices | Existing retained native consumers | Remove every confirmed transitive orphan in scope; retain functional CE040 routing and shared helpers with recorded consumers |

CE125/134/143/152/161/170/179/188/197/206/215/224/233/242/251/260 contain encounter death inscriptions selected by CE347 for the memorial. They are explicitly retained while that consumer remains. Configuration CE004, focus callbacks CE030–037, HIDE callbacks CE064/065, audio CE067, checkpoints CE044, absence bookkeeping CE348–350 and preload CE351 are functional consumers/helpers, not blanket deletion targets. CE350 runs in parallel under its switch even without a direct call117.

### State and native execution contract

| State | Source of truth / lifetime | Native consumer and transition |
| --- | --- | --- |
| Formation, alive/selected heroes, assigned encounter, phase, ending and eligible epilogues | Existing serialized CampaignRules state | Map events query facts and issue existing validated actions; no second map/variable truth |
| Expected campaign passage and committed sequence | Existing campaign reading/context | CaptureContext and exactly one ReadingComplete for the actual semantic passage, then the existing checkpoint boundary where required |
| Observational units already read | Existing per-file Game_System UI reading store | Map-authored ObservationBegin uses the preserved positive unit ID; ObservationComplete only after full reading |
| Map/event/interpreter position, pictures and native variables | MZ/SaveCore native state | One local execution owner; explicit source exit on transfer; Continue resumes the stored boundary |
| Menu focus, read permission, picture bindings and animation progress | Existing presentation/native lifetime | Reset/clean at ownership boundaries; no serialization of transient scene objects as campaign facts |

Task22 must materialize a phase/map/call-return table and demonstrate it using H1's epilogue. Entry guards refresh facts, distinguish already-current map from a required transfer, and prevent an old source chain from continuing. After each local passage, refresh facts and either continue the next local passage or hand off to routing. Reduce only the corresponding CE040 branch at each migration so the rest of the game remains playable between slices. Never copy the entire CE040 state machine into each map or introduce a Bridge text dispatcher. Task26 extends and proves the same contract for encounter phases before the remaining fifteen encounters.

The local map must keep capture/completion on the correct interpreter. Nested Common Events do not implicitly complete their parent passage. Resuming a checkpoint cannot both replay a local body and let CE040 execute it again. Pending asynchronous saves finish through the existing coordinator before ownership changes. Native transfers do not automatically clear Game_Screen pictures; their explicit outgoing cleanup remains required.

### Deletion procedure and evidence

Each implementation slice records its initial body/consumer inventory, performs a structured JSON transformation with pre/postconditions, updates executable references, then nulls the displaced slots. Inspect native call117 in all relevant maps, Common Events and troops; embedded choice tags; enabled provider/configuration parameters and their real consumers; autorun/parallel switches; and project reserve/call code. Reconcile tests and current guides. A numeric ObservationBegin unit preserving read history is not a reference to an executable Common Event body.

Retain an exact removed-ID/name/destination/consumer record beside the task's implementation evidence, plus any retained candidate and its functional reason. Preserve historical specs/reports as history. This inventory is a development artifact, not a new shipped registry or prerequisite to edit native events. Do not repurpose retired reading IDs for different content, compact arrays, delete assets based on CE retirement, alter personal saves or infer source compatibility from a zero-reference count alone.

### Affected surfaces and verification ownership

The changes affect CommonEvents.json, existing map event lists, MapInfos and the seven appended hero maps. System variables/switches and project Presentation metadata need changes only if the existing contract cannot express the approved behavior; engine/vendor files, plugin order, CampaignRules mechanics, save schema, source assets, deployment and dependencies are preserved. CommonEvents/MapInfos are shared write surfaces and the task chain serializes their mutations.

Canonical tests stay in rpg-maker/tests/suites/, with campaign.test.mjs and test-manifest.json as their existing entry/catalog. Adapt rpg-maker/qa/native-player.mjs and affected directed scenarios to the actual map/menu paths. The five discipline amendments below this increment's authority govern text, visuals, controls, audio and implementation; the new [verification section](verification.md#map-authorship-expansion--2026-09-14) owns sensors, scenarios, freshness and human decisions.

| Requirements | Primary verification |
| --- | --- |
| MA-001 | MAV-001/002; MAV-013/014 for directed/human evidence |
| MA-002 | MAV-003 |
| MA-003 | MAV-004; MAV-012 |
| MA-004 | MAV-004/005 |
| MA-005 | MAV-006 |
| MA-006 | MAV-007 |
| MA-007 | MAV-008/009/010 |
| MA-008 | MAV-011, with deletion evidence contributed by every slice |
| MA-009 | MAV-001–010 and MAV-012/013 |
| MA-010 | MAV-012/013/014 |
| MA-011 | MAV-011/013/014 |

### Authority and completion

The user accepted the recommended scope for spec/task creation on 2026-09-14. ADR-006 and this amendment preserve the established gameplay contracts; they do not infer final creative or implementation acceptance. No additional product choice is needed for the included behavior. The concrete CE040 handoff is an implementation/proof responsibility of task22, not a reason to leave subsequent tasks unspecified. A solution requiring a different gameplay result or vendor contract must be brought back as a concrete design conflict.

Completion requires implemented maps, removal of every confirmed displaced body, passing assigned technical/runtime criteria and the applicable human judgments in verification.md. Tasks15/16 are reused after task29; no duplicate QA pair, automatic commit or publication is added. Demonstrate a non-Gorvak hero and one migrated campaign scene edited in MZ and then reached through actual gameplay. Capture the live map tree, native edited command and played result for the devlog.

### Execution progress

Tasks19/20 have implemented all eight hero interactions in Maps037–044 with technical MAV-001/002 evidence. The prologue, all sixteen encounters, Council, three endings and eight epilogues also use local map ownership; the canonical join and QA retain their graph status in [tasks.md](tasks.md) and sensor status in [verification.md](verification.md). No expanded human acceptance is implied.


### Política de QA — zoom nativo

[ADR-G003](../../../docs/adrs/adr-g003-excluir-testes-de-zoom-nativo.md) retira testes de zoom nativo por decisão aprovada do usuário. O recorte substitui exigências anteriores de QA, preserva resoluções e controles desktop e não aprova os defeitos visuais ou pareceres humanos pendentes.

### Correção dos bustos compartilhados — 2026-09-15

Após o final verify do PR13, o usuário solicitou listar os bustos cortados, corrigi-los e executar testes. A task16 passa a corrigir também o enquadramento compartilhado do Conselho e das despedidas, antes preservado e pendente de autorização. O [contrato de Technical Art](eventbridge-minimal-runtime.technical-art.md#correção-de-enquadramento-compartilhado--2026-09-15) delimita escala/posição por personagem e as invariantes preservadas; a [verificação](verification.md#correção-dos-bustos-compartilhados--2026-09-15) registra as provas antes/depois. Manter eventos nativos, assets existentes, falantes/ouvintes, Andirá no reflexo e regras da campanha. Os julgamentos humanos de autoria, UI, memorial e áudio continuam separados.
