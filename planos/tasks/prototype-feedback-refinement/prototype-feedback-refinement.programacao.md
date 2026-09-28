---
status: approved
stage: approved
technical_approved_under: D-025
technical_approved_on: 2026-09-24
owner: Programação
product_approved_under: D-016
technical_approved: true
---

# Native integration and state lifecycle

Owns runtime integration for the outcomes in [spec.md](spec.md). D-025 approves this technical design and authorizes task decomposition; execution and verification remain pending. Keep content and presentation sequences in native events, deterministic campaign rules in `Dryland_CampaignRules`, bridge/query/save lifecycle in `Dryland_EventBridge`, and transient reading/input/picture behavior in `Dryland_Presentation`.

## Runtime and provider boundary

Only `rpg-maker/The Dryland Drowned/` is deployed; no build or parallel game implementation is introduced. Existing active order is `VisuMZ_0_CoreEngine`, `VisuMZ_1_MessageCore`, `VisuMZ_1_OptionsCore`, `VisuMZ_1_SaveCore`, `VisuMZ_2_ExtMessageFunc`, `VisuMZ_2_PictureChoices`, `VisuMZ_2_VNPictureBusts`, `VisuMZ_3_ChoiceCmnEvts`, `VisuMZ_4_AttachedPictures`, `VisuMZ_4_EventTitleScene`, `VisuMZ_4_MessageVisibility`, then the three Dryland owners. Preserve exact IDs and order. No new plugin, dependency, engine edit, Coreto edit/migration, battle system or remote service is proposed.

Use native Show Text, Show Choices, picture show/move/erase, branches, waits and transfers, with registered provider commands. `PictureTextChange`, `<Bind Picture: id>` and `ChangePictureChoiceSettingsOne` already provide text and choice state. Local AttachedPictures documentation states that attached images do not receive clicks: bind the one visible base container, encompassing portrait/name, rather than expecting each decorative child to forward clicks. Extend the existing own presentation plugin only for behavior absent from those authoring controls, not by modifying vendor methods or adding a second input framework.

## State ownership

| Information | Kind / owner | Storage and lifetime |
| --- | --- | --- |
| Deaths, actual victim, draft party, route selection, progress, ending and climax roster | Source facts, CampaignRules | Existing campaign in `Game_System._dryland.campaign`; permanent decisions remain saved through existing checkpoints. |
| Living heroes, eligible sacrifice targets, valid formation, route availability, deceased name list | Derived | Compute from campaign/catalog; do not store duplicate eligibility/roster flags. |
| Preparation introduction completed | One new campaign source fact: `preparationIntroductionCompleted` | Boolean, false on new campaign and each genuine `formationTransition`; true only after the introduction's last box. Ordinary visits, Options, board/map returns and save/load do not reset it. Reset to false when leaving formation. |
| Global seen-text history | Historical fact, Presentation | Existing `_drylandReadUnits` and campaign passage records. New intro observation uses a distinct owner ID. Global seen text never substitutes for the per-preparation completion fact. |
| Age checkbox and requested entry (`new` / `continue`) | Transient title-flow state | Owned by the active notice invocation; clear on cancellation, accepted handoff and title re-entry. Never write acknowledgement into ConfigManager, campaign or browser storage. |
| Active choice/focus, input-release guard, pictures and animations | Native/transient presentation | Existing interpreter/window/provider owners; clear when leaving their surface. Never persist a second scene or interpreter snapshot. |
| Live expedition-return absence | Transient presentation effect | Arm once from an actual expedition return; consumed by tavern entry. Load clears the transient effect and reconstructs dead places empty. No campaign death or eligibility mutation. |
| Manual-save request/result and notice | Transient bridge/presentation | One request at a time, tied to the actual write promise and requesting interpreter. Load/title/new campaign clear requests and notices; success is never inferred from restored `saved` status. |

The boolean is the minimal extra fact needed to distinguish two otherwise identical preparations whose map introduction has/has not been read. Do not infer it from `selectedDungeonId`, party validity, a once-per-campaign passage ID, or a second copy of transition history.

Add a guarded `COMPLETE_PREPARATION_INTRODUCTION` action and matching bridge query. Require phase `formation`, incomplete introduction and the captured current sequence; call it only after the owned observation completes. No new campaign phase is needed. Reject stale/wrong-phase completion without changing state; repeated native entry observes the already completed flag and skips the line. Add no `nextCheckpoint` reason for this action.

Save compatibility: retain the existing campaign version for this additive field. Normalize an absent field to false at the existing load boundary before validation/freezing; reject a present nonboolean value as invalid instead of coercing corrupt state. New saves contain the field. This supports missing-field data without claiming compatibility for old serialized authored-event lists: do not splice/rewrite saved interpreters, gate all Continue behind an invented content revision, or migrate personal saves as part of QA. Candidate QA uses newly produced saves.

## Native event ownership

| Surface | Proposed changes to existing owners |
| --- | --- |
| Title/gate | Map001/CE002 keep the EventTitleScene flow. Show title/menu first; store the requested entry transiently; run the separate notice; invoke `NewGame` or `LoadScreen` only after checked Jogar. Cancel returns to the title loop and clears input/acknowledgement. Continue availability keeps the provider's current file policy. Provider-internal title initialization is not a committed campaign start. |
| Preparation | Map003, CE003/038 stage only formation and its controls. Enable Seguir only for a valid party, then call CE039. Preserve valid draft/route selection when backing out. Remove the obsolete destination-not-chosen label and direct tavern departure path. Keep Settings and current-file save accessible at a stable formation boundary, including an incomplete draft. |
| Destination | CE039 shows one navigation map, derived route states and selected side panel. The new introduction helper runs once before choices. Bind location/name to their base containers; selection updates only destination; Partir validates party and route again then uses the existing DEPART/checkpoint/transfer path. Locked/completed destinations cannot depart. |
| Hero visits | Maps037–044 keep native ownership and stable observation IDs. Update the approved source categories; successful TOGGLE_HERO addition followed by the final acknowledgement returns to Map003. Removal/full-party rejection/conversation retain their existing paths. |
| Tavern list | Replace CE117's all-roster display with derived dead names/approved empty state. Read-only entry/exit, no memorial campaign action. Replace Elenco's control with the in-world board access. |
| Sacrifice and named text | Existing encounter/sacrifice owners, Map015/021 and CE266–289. Keep immediate SELECT_VICTIM/checkpoint; Query resolves the pending victim's public name into the existing native text flow. Clear old generic victim substitutions only in the scoped sixteen death contexts/two failures. |
| Return and absence | Native return orchestration in CE040/046 and discovery/retreat callers; revise CE348's arming so it represents an expedition return, not a broad formation-phase check. CE045 starts all dead-picture fades without per-hero waiting; the preparation owner uses the presentation barrier below until those 180-frame moves finish. CE349 final cleanup; retire CE350's obsolete 60-frame parallel release from active callers. |
| Final decision | Map023: two equal panels bound to the two existing ending choices. Preserve CHOOSE_ENDING/checkpoint and consequence information. No confirmation scene or default automatic activation. |
| Cemetery | Map028, CE058–060/338–345 and existing context labels. Reflow full content; completion only after a semantic inscription's last box. Keep final memorial progression separate from CE117. |
| Epilogues/audio exit | Maps029–036 reuse CE337 cleanup and show older Rheed on black. CE067 recognizes epilogue readings as present context. CE040's campaign-complete handoff calls CE061; at CE061 entry, before credits, clear the outgoing epilogue BGM/BGS. Do not stop between hero maps; preserve ending ME and unaffected credits behavior. |

Allocate any necessary helper Common Event from a verified free ID in the implementation candidate, record it in the native inventory and use that one owner consistently. Do not reserve guessed IDs in this draft or create map events that merely forward to a common event contrary to ADR-G002. Update command metadata, option lists, validation and inventory together when adding the introduction query/action or manual-save command.

## Save current campaign: request and continuation

Add one explicit `SaveCurrentCampaign` bridge command for the tavern's stable preparation branch. Preconditions: `Scene_Map`, phase `formation`, valid campaign and associated current file, no busy message/choice, no transfer or absence animation, and no write already in flight. An incomplete draft is allowed; saving it must not turn it into a valid departing party. Preserve current-file association, automatic checkpoints, death permanence and SaveCore's file lifecycle; expose no slot chooser or new rollback file.

The command must schedule the write after the interpreter naturally advances past the request command. Use the existing bridge wait-mode owner: retain the request transiently, let the native command return, and start the provider write at the next owned update after the native cursor has advanced. Save a continuation that returns to the preparation loop, not a cursor that reissues the manual request after load. This is a defined resumable boundary, not an arbitrary timeout or mutation of the interpreter's command index.

Invoke the same current-campaign SaveCore `AutosaveForce` path used by automatic checkpoints, but require an actual write for this deliberate request. Do not reuse Checkpoint's sequence-equality early return: observation progress and options can change without a campaign action. Associate the completion with this request, not a prior write or lastSuccessfulSequence. Repeated activation while pending produces no second concurrent write. While writing, prevent campaign mutations; after settlement, immediately return to normal preparation.

On success, emit the transient Campanha salva notice for this request. On failure, clear any prior success notice, release the wait and preserve the existing native save-failure handling; do not suppress the error as success or introduce a custom mandatory retry flow. Continue retains the last successful file. The normal manual-save command remains available for another deliberate attempt.

On load, no transient request exists: a restored save-wait clears without writing or showing a success notice. The persisted cursor must safely resume the preparation loop. Test that resuming this boundary neither repeats the request nor skips a campaign action. Scene/title/new-game cleanup discards any late notice from an obsolete request; do not let an old promise display feedback on a different campaign.

## Return, input and cleanup invariants

- Arm absence only when an expedition actually returns to formation with survivors, after any route-closing narrative. Gather **all** current dead IDs, including old deaths. Remove the prior once-only switches as eligibility for this effect; preserve their unrelated consumers if an audit finds any. Never resurrect dead members while drawing their temporary fading images.
- Complete the route black pause/fade before the 180-frame absence. Reduced motion/no deaths bypass the absence wait. Ordinary hero/board/destination/settings round-trips and Continue into an already reached tavern rebuild the final empty places without replay. Add a narrowly scoped `WaitForReturnPresentation` command to the existing Presentation owner: its interpreter wait observes the native picture moves belonging to the active transient return and ends when all finish. Do not serialize a separate 180-frame counter. On load, with no active transient return, that wait resolves immediately and CE349 erases dead pictures before enabling preparation; a restored native move must not replay an already reached tavern's absence. Define command metadata and its event caller together.
- Let each native interpreter own its message/choice and continuation. Capture campaign sequence before committed actions, keep stale-context rejection and serialize mutation during saves. Parallel cleanup must not unlock preparation before its owning transition finishes.
- Use existing `ChoiceFocus`/`ConsumeInput` and provider enabled states. Require release of the gesture opening a choice before it can accept that choice; test pointer down/up crossing the boundary as well as held/repeated keyboard OK. Hover and focus never commit.
- Erase/unbind owned picture IDs, child attachments and selection settings on every normal exit, cancel, transfer and title return. HIDE/Options restoration preserves current state without advancing or recreating a stale active target. Reset custom message properties to the standard lower four-row/1280-width/wrap treatment at shared cleanup boundaries.
- Keep obsolete art files until reference audit, but remove active epilogue-illustration commands, old all-roster output, duplicated departure controls and the superseded one-second absence release. Update native inventory/tests against the final owners; do not keep two competing presentation paths as a fallback.

## Verification and deployment impact

[verification.md](verification.md) owns canonical suites, editor/command metadata checks, directed journeys, storage-failure integration, evidence freshness and acceptance. No new test framework is needed. Retain native data authorability and exact plugin IDs; no web build, packaging change, server change or deployment step is required. The design is approved under D-025; implementation and verification claims require the later task evidence.
