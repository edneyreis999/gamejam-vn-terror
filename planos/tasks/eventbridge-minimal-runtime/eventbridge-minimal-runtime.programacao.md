---
status: approved
owner: Programação
---

# Programming contract

[Spec](spec.md) owns behavior. This contract makes its implementation boundary reviewable; it is not a task graph. Engine and VisuStella source files remain unchanged.

## Layer ownership

| Layer | Owns | Must not own |
| --- | --- | --- |
| Dryland_CampaignRules | Campaign facts, existing mechanical constants, eligibility, random draws and transitions | Pictures, buttons, vendor state, editorial status, file selection |
| Dryland_EventBridge | Reading functional editor configuration, rules initialization, scalar event queries, contextual action mapping, explicit campaign reading completion, checkpoint request/wait | Content dispatch/Common Event resolution, scene rendering, conversation image lifetime, input/audio/loading overrides, QA APIs, editorial/asset audits, file policy |
| Native maps/Common Events | Narrative and presentation execution, scene composition, provider command calls, branch routing, visual bookkeeping | A duplicate campaign, seed controls or manual assignments to campaign internals |
| Installed VisuStella plugins | Busts, image choices, message controls, hide UI, save files and native options | New project-specific rules injected into vendor files |
| Approved Dryland_Presentation | Narrow integration for retained input, visibility, reading-mode permission, motion preference, map controls, native credit cancellation and live ME-volume behavior | Campaign/content dispatch, image waits/loading hooks, narrative strings, fixed hero positions, validation policy, asset lists, custom skip/AUTO/FAST engines or bust restoration |

Register the new local adapter after its provider plugins, without changing their relative order. Keep Bridge after CampaignRules. Presentation receives scalar values from events and never calls Bridge or reads _dryland.campaign. Bridge never imports Presentation. Prefer a provider's existing command over an adapter feature.

## Editor configuration and command surface

The following are proposed command contracts. Display names and help are PT-BR; native common_event, variable, switch, file and select fields must be used where applicable. Native MZ serialization is acceptable; authors never hand-write JSON or code.

| Bridge command | Editor inputs | Result |
| --- | --- | --- |
| ConfigureHero | Fixed hero selector; public identity fields | One source of public hero data; no content-event association |
| ConfigureRoute | Fixed route selector; public name | One source of public route identity; counts/unlocks remain mechanical |
| ConfigureEncounter | Fixed encounter selector; public name | One source of public encounter identity; existing approach identities retain their domain mapping |
| Query | Query-kind selector; optional hero/route/encounter/entry selector; output variable or switch | One scalar value, or one indexed entry, with no rendering/mutation |
| Action | Existing domain action selector and typed identity/value source | Context-bound action; result code projected to an event variable |
| ReadingComplete | Current reading context, obtained by query or explicit reading-entry binding | Completes the expected current passage once through CampaignRules |
| Checkpoint | Existing checkpoint-reason selector | Requests current-file autosave and waits for its actual result |

The configuration Common Event is selected once in Bridge parameters and reachable through the Configuração do jogo map entry. It supplies functional public data only, not narrative call targets or visual routing. Reading these declaration payloads at database readiness does not execute arbitrary event commands. Only designated configuration commands contribute data; other native commands retain ordinary event meaning. Configuration declaration commands must not mutate a running campaign when the startup Common Event executes. Do not scan scene events to reconstruct or validate a content-dispatch registry.

Keep existing semantic scene/passage identities internally where they carry domain meaning: council.01 currently commits medalhão completion; memorial and epilogue plans also use explicit role identities. Existing domain reading plans retain semantic identities/order only, without Common Event addresses or command ranges. Native conditions use query outputs to choose the applicable calls. Explicit completion binds the expected campaign passage; it does not infer it from prose, a special comment or a configured content target. Changing a conversation's text or native call target does not require a matching domain dispatch entry. Mechanical competency pairs, approach requirements, pools and route lengths have one source in CampaignRules; this migration does not expose rebalance controls.

Use ordinary native Call Common Event branches for execution. Gorvak's event exposes the Conversar choice and directly calls the selected conversation Common Event. Shared native interaction events are allowed, provided the map entry exposes the actual authored path used by gameplay. The native command117 selector is the content association; do not mirror it in ConfigureHero/Encounter, restore ConfigureScene or introduce Executar conteúdo configurado. Bridge may supply the hero identity or campaign facts needed by a branch, but does not resolve or execute its content. Standalone role units replace the profile/speech/selection/etc. ranges currently mixed in CEs 5–12. Never execute the old whole Common Event and hope its unrelated sections do not run.

Retain existing variable/switch IDs where practical and give new ones human-readable names in System.json. Reserve additions only after inspecting the implementation checkout; there are already variables through 146 and picture IDs in overlapping scene-specific ranges. Reuse of numeric resources is local to documented scene lifetimes, not a runtime enforced global convention. Convert CE67 and every direct campaign-object condition to query outputs. Reading completion must be explicitly separate from observational conversations.

## Presentation adapter boundaries

Expose commands with numeric/selector fields for these concrete needs only where native/provider commands cannot meet them:

- Reading mode availability: events provide the prior-read Boolean. Use ExtMessageFunc's ExtFastFwdDisallow for FAST; provider settings must enable the feature and its fastFwd button. Under [ADR-004](adrs/adr-004.md), remove auto from Buttons → List while retaining AutoKey=none, options and hide. Reset active modes before unread text/choices. Keep the provider's timing and execution implementation.
- HIDE: MessageVisibility owns its key/button and calls CEs 64/65. Events specify the UI elements to hide/restore. Any adapter bookkeeping preserves authored opacity/visibility without hardcoded picture ranges or making hidden options clickable. Preserve HIDE's return gesture and provider Options button.
- Motion preference: read the existing system reduced-motion preference into an event switch/variable. Native events branch to final positions/short paths. Remove the Bridge's interception of all duration-bearing commands. No duplicate campaign flag.
- Keyboard and confirmation: retain eligible focus identity and one physical gesture per confirmation in the UI layer. Native/PictureChoices navigation is the starting point. Actual entry/exit and held-input behavior must be checked against the installed plugin. Do not add confirmation dialogs to sacrifice.
- Map controls: an explicit startup/map configuration sets movement and ordinary event fast-forward policy. Do not disable authorized provider FAST or native rolling-credit acceleration while suppressing unrelated held-input acceleration. The native menu command remains in the event, not an always-false override.
- Credits: use native command 105 with speed 2 and no-fast = false, followed by native return-to-title after completion. A separate explicitly authored skip input can cancel this scrolling message and finish the credit event once. If technical support is needed to end Window_ScrollText, expose a narrow cancellation command; do not replace its renderer, timer or speed. Do not queue Show Choices behind the busy scrolling message and call that a working skip button. Cancelled and natural completion share cleanup; no orphan parallel event or transfer survives.
- Live ME volume: retain the currently playing ME descriptor around the native playMe/stopMe lifecycle so the native meVolume setter affects its buffer. It must not restart a cue, redirect BGM or add an audio state machine. This does not belong to the campaign Bridge.

Fields that determine art/layout remain in each map's native events. This adapter is not an alternate place for labels, hero arrays, fixed coordinates, crop rectangles, editorial rules, logs, seeded QA or automatic visual replay.

### Image loading after native investigation

Use the installed MZ/provider loading lifecycle, as accepted in [ADR-002](adrs/adr-002.md), with the tavern-only preload subsequently requested in [ADR-003](adrs/adr-003.md). CoreEngine 1.90's SystemLoadImages command issues ImageManager.loadBitmap requests without an interpreter readiness wait; its Image Loading parameters preload at boot. Native picture movement/animation waits are not bitmap-ready waits. MZ's internal setWaitMode("image") is available via Script and checks the whole cache; it neither selects nor starts a particular file request. Preserve editor-only authorship and default engine/provider recovery. Remove Bridge's existing hooks without transferring them into Presentation or event scripts. Do not add Aguardar imagem, polling, guessed delays or a Script readiness barrier. Required assets still belong in the package.

Create one native Common Event named Taverna — Carregar imagens containing VisuMZ_0_CoreEngine → SystemLoadImages → pictures:arraystr, edited through its img/pictures file selectors. Expose it from the tavern map. Call it from native entry/return flow before the tavern stage and cover Continue paths before the next tavern presentation/interaction; do not depend solely on New Game startup, replay campaign decisions or add a Bridge load hook. Repeated native entry points reuse this one list and the provider's cache. Other asset-directory fields remain unused unless the migrated tavern actually references an additional image in that directory.

Current source baseline: 29 distinct img/pictures PNGs. The ranges below mean selecting every named file, not passing a wildcard to the provider.

| Tavern use | File stems |
| --- | --- |
| Backdrop | Dryland_Taverna |
| Eight stage portraits | Dryland_Tavern_H1 through Dryland_Tavern_H8 |
| Conversation busts | Dryland_H1 through Dryland_H8; Dryland_ivai |
| UI, labels, panels and roster | Dryland_Button; Dryland_Tag; Dryland_Panel; Dryland_DestinationCard; Dryland_DestinationLabel |
| Destination previews | Dryland_Destination_physical; Dryland_Destination_supernatural; Dryland_Destination_final |
| Map overlay in the tavern | Dryland_MapDwarven; Dryland_MapElven; Dryland_MapComplete |

This coverage comes from CEs 5–12, 38–39 and 48, plus Bridge's current showFormation/showPanel consumers. Reconcile the list with final migrated references, including additional or replacement tavern assets; preserve current art identities/statuses. Select the full set regardless of living heroes, party or unlocked destinations. Keep this as normal vendor-command authoring, without a generated manifest or startup asset validator. SystemLoadImages starts asynchronous requests; a cold request may still finish after the following command. Verify request coverage and native presentation, without promising a blocking preload or pinning bitmaps permanently in memory.

## State, saves and native lifecycle

Keep _dryland.campaign in Game_System; public names are rebuilt from current configuration, not copied into every save. Content references and image paths remain in native event/provider data; there is no Bridge content-address registry to rebuild. Native Game_Screen, Game_Map, variables and switches remain in native save contents. File identity belongs to SaveCore/Game_System. No standalone save schema or content fingerprint gates loading.

Retain contextual action protection at the domain boundary: an action raised from an obsolete choice must not mutate a newer phase. This is campaign legality, not permission to revalidate the entire state on every query. Rejected gameplay actions return a result to the authored event. Throw/propagate an actual unrecoverable missing-data error rather than fabricating success or enabling _drylandInvalid.

Use completed native reading units as the prior-read granularity. Campaign passages derive their status from the existing domain reading facts. For observational conversation units, completion may record native UI reading history separately in Game_System, keyed by the actual callable native unit's identity and reset with New Game; it must not invoke COMPLETE_PASSAGE or alter party/progression. Replacing a native call with a different standalone Common Event selects that new unit's reading identity, without a Bridge mapping. Do not mark a cancelled or partly displayed unit as read. Do not duplicate the same campaign-unit read fact in this UI store. This makes reread controls usable for observational dialogue without turning conversation into a campaign decision. The UI store is saved per campaign file, not a cross-campaign log or QA surface.

Remove presenter's command slicing and automatic terminate callbacks. At every real passage end, the authored wrapper invokes ReadingComplete for its captured passage/context. Provider FAST completes the same native event path; it does not invoke SKIP_SEEN_TEXT. On Options/Continue, preserve the actual native interpreter and pictures. Rebuild only derived query and permission state; no visual-prefix extraction/reexecution. An explicit event composition on a checkpoint is allowed, but must neither repeat a committed action nor mark unseen text as seen.

Deaths remain domain facts with location metadata. Move the consumed visual-fade bookkeeping to native event/UI state, saved alongside the game where needed; new campaign resets it. Entry marks applicable death fades as presented before the animation can be interrupted, and events handle the actual fade/erase. Removing visual bookkeeping from the rules object must not remove death history or change eligibility.

Checkpoint coordination retains one in-flight write and waits on the write requested through SaveCore. A promise observer, if required by SaveCore's command API, must preserve all original arguments and results, including file IDs, and only attach checkpoint completion. No override may force slot 0 or reject other file IDs. Release the wait on success or failure; native failure treatment keeps the last successful save. Resuming a saved checkpoint must not perform the decision twice or immediately write it again solely because the event resumes.

Use Save:struct SaveStyle:str = locked, MaxSaveFiles:num = 20; Autosave:struct AutosaveType:str = current. Leave incidental transfer/menu/battle autosave disabled unless already part of a semantic checkpoint. CoreEngine QoL:struct NewGameCommonEventAll:num selects the native initialization Common Event; do not use the similarly named playtest-only field. It calls Alterar acesso ao menu → Desativar. SaveCore owns selection/cancellation/occupied-file confirmation. Cancelling file selection must not overwrite a campaign.

Keep prior save files untouched. Attempt loads through MZ/SaveCore without a revision or duplicate envelope audit. This structural migration cannot certify old interpreter command indices; no automatic conversion is promised. Do not silently start New Game on a failed load or fill a missing campaign with an invented ready state. Continue on saves created by the new implementation must work for both campaign files and terminal saves.

## Final destination of all 43 responsibilities

| Item | Final destination |
| --- | --- |
| F01 | Bridge campaign initialization |
| F02 | Bridge reads functional configuration; native calls own content references |
| F03 | Public data in configuration fields; content/image/map associations in native commands |
| F04 | Bridge maps event action to CampaignRules |
| F05 | Bridge data-only projection |
| F06 | Context binding plus domain legality |
| F07 | Remove duplicate Bridge validation |
| F08 | Native scene execution; Bridge explicit reading completion |
| F09 | Observational native conversation/re-read with data queries |
| F10 | Remove custom instant skip; provider FAST only |
| F11 | Provider buttons/settings and event permissions |
| F12 | Data/identity-to-native-branch adaptation only in Bridge |
| F13 | Tavern UI events |
| F14 | Authored focus/disabled style in tavern events |
| F15 | Destination and arrival events |
| F16 | Encounter UI events |
| F17 | Sacrifice UI events |
| F18 | Tavern-accessible roster event |
| F19 | Bridge death/location data queries |
| F20 | Memorial composition events |
| F21 | Prepared assets and native animation; remove runtime cropping |
| F22 | Tavern death-fade events and presentation bookkeeping |
| F23 | Native credits event |
| F24 | Native credits completion/skip coordination outside Bridge |
| F25 | Manual event-authored bust exits |
| F26 | Native preservation/checkpoint composition; remove Bridge reconstruction |
| F27 | CoreEngine Load Images for every tavern image; default loading elsewhere; no project wait/polling/global pause |
| F28 | Preference and animation branches in presentation/events |
| F29 | MessageVisibility and UI events |
| F30 | Retained confirmation behavior in UI layer |
| F31 | Provider/UI keyboard and focus behavior |
| F32 | Bridge checkpoint request/wait |
| F33 | SaveCore dedicated file selection/current-file autosave |
| F34 | Native load; remove Bridge revision/envelope/state gates |
| F35 | Remove manifest requirement and manual revision ritual |
| F36 | Remove editorial/source/status/format/convention enforcement |
| F37 | Remove event-command allowlists and helper ownership restrictions |
| F38 | Remove expeditionQA and fixed-seed console controls |
| F39 | Remove custom technical notice/global invalid-campaign barrier |
| F40 | Native audio integration in presentation adapter, outside Bridge |
| F41 | VN movement control in presentation/events |
| F42 | Native menu-access command via initialization event |
| F43 | Provider/event reading acceleration policy outside Bridge; native credit speed |

## Delete and update consumers

Remove Present, Conversation and their obsolete metadata/calls after migrating every consumer. Narrow Observe to data queries or replace it with Query; no legacy drawing target remains hidden behind an alias. CaptureContext may remain as a functional context operation if callers need it, without editorial checks. Remove Window_DrylandSkip, Window_DrylandNotice, expeditionQA, _drylandInvalid, native-layout loading, restorationCommands, visualSources, conversation ownership, crop/ghost hooks and Bridge input/audio/Scene_Map presentation overrides.

Remove the live native-layout-manifest.json and revise-layout.mjs workflow. Retire validate-content.mjs as the editorial gate; remove its policy-dependent CLI and startup/test consumers instead of moving the same mandatory checks to a differently named command. Split any genuinely reusable local path/file helpers out of native-layout.mjs only if still used. Tests may inspect actual files or catalog semantics for implementation verification; editing the game must not require a revision tool.

Audit rpg-maker/tests/helpers/native-content.mjs, native-bust-fixture.mjs, canonical-cases.mjs, campaign/native-shared helpers and tools imports. Rewrite tests whose only oracle is removed metadata/revision/QA output. Keep meaningful mechanical tests in their owning canonical suites. Remove SKIP_SEEN_TEXT from runtime commands and domain dispatch/history production where no longer consumed; any legacy save handling must not resurrect it as an available action. Delete audit-only invariant snapshots, retaining seed/rng facts actually required by campaign randomness.

Update rpg-maker/README.md, current plugin help, the GDD amendment, relevant docs/_memory baseline guidance and current docs/qa recipes when implementation lands. Historical reports and completed specs retain their original facts with clear supersession links where needed. Read-only test inspection must use native state or test harness fixtures, never a replacement shipped QA console or seeded browser command.

The implementation evidence must cover the source and event changes together. The statically identified tavern failure is a missing campaign accessed by CE67 before the stage; it is not proof of a missing background asset or preload failure. Initialize/query state correctly and verify the real game path.
