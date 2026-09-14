---
status: approved
slug: eventbridge-minimal-runtime
---

# Minimal EventBridge and native editor authorship

## Objective

Let the team edit scenes, conversations, presentation and game configuration in RPG Maker MZ without editing JavaScript or running a content-revision command. Keep Dryland_EventBridge as the connection between native events, campaign rules and autosave. Remove its editorial enforcement and QA features from the game.

The user completed the functional interview on 2026-09-12. The user approved the complete spec set on 2026-09-12 with “Aprovo”, explicitly including the separate local presentation adapter and the editable initial capacity of 20 SaveCore files. The approved design is now being executed through [tasks.md](tasks.md); [verification.md](verification.md) records actual evidence and pending product/human sensors.

The user's subsequent review direction on the same date is incorporated in [ADR-002](adrs/adr-002.md): native events call their Common Events directly, and image loading retains the engine/provider default after investigation found no ready per-image wait command for the existing editor-only scope. The internal Script API and CoreEngine preload are documented there. No Bridge content-dispatch command or project image-wait command is added.

The user's later request adds CoreEngine System: Load Images for every tavern image, as recorded in [ADR-003](adrs/adr-003.md). This narrows the earlier preload exclusion to the rest of the game.

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
