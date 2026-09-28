---
status: approved
stage: approved
technical_approved_under: D-025
technical_approved_on: 2026-09-24
owner: UI/UX
product_approved_under: D-016
surface_approved: true
technical_approved: true
title_background_approved_under: D-017
destination_composition_approved_under: D-018
noticeboard_layout_approved_under: D-020
final_choice_composition_approved_under: D-021
age_notice_return_approved_under: D-022
manual_save_success_approved_under: D-023
title_age_mark_approved_under: D-024
---

# Changed surfaces and reader interaction

This contract develops the approved outcomes in [spec.md](spec.md). D-016 already approves the product behavior and presented prose; the surface proposals below do not reopen that approval. The interviewed directions are resolved. D-025 approves the complete calibration and interaction design below. Task execution and evidence remain separate; the reported defects are not thereby reproduced.

## Baseline and measurement

The current game uses a logical screen and UI area of 1280×720, with a configured base font size of 26. Native picture, message and choice settings can override that font. Inspect the rendered result at the supported minimum effective game area of 1280×720 and at the 1920×1080 reference viewport; a larger browser viewport does not change the authored logical coordinate system.

Preserve the [native interaction contract](../eventbridge-minimal-runtime/eventbridge-minimal-runtime.uiux.md) where this increment does not replace it: keyboard and mouse, visible focus, HIDE restoration without advancement, Options, player-controlled reading and seen-text-only FAST. Gamepad and native browser zoom remain excluded. The [hero-visit increment](../hero-bust-staging/spec.md) is a scoped visual reference, not acceptance of every Rheed/Ivaí composition.

## Surface inventory

IDs below identify surfaces, not new campaign states or map allocations. Native owners describe the inspected baseline; their eventual changes belong to the programming contract after the visible surface is resolved.

| Surface | Requirements | Inspected native owner | Approved outcome and remaining surface work |
| --- | --- | --- | --- |
| UI-01 Title and notice | RQ-001 | Map001 → CE002; EventTitleScene and SaveCore entry commands | D-017/024: existing darkened empty tavern behind title/menu with a discreet 16+ mark, then the approved black notice. D-022: visible Voltar ao título button plus Escape. Both entry paths require a fresh unchecked acknowledgement. Calibrate placement and contrast. |
| UI-02 Tavern preparation | RQ-002/005/006/013/016 | Map003 → CE003/038; CE045/348–351 | Party first; coherent hero targets; in-world noticeboard; visible Settings/save; Seguir after valid formation. D-023: discreet Campanha salva feedback after successful manual saving, without acknowledgement. Resolve the spatial arrangement without covering the eight established hero places. |
| UI-03 Destination map | RQ-002 | CE039 | D-018: a single illustrated map with selectable locations and a side panel for the selected destination. Preserve complete targets, the approved Ivaí introduction, selection then Partir, and return preserving valid choices. Specify geometry and final art while retaining route visibility/unlock rules. |
| UI-04 Hero visits | RQ-004/007/009 | Maps037–044/event001 | Approved source dialogue; successful addition returns to the tavern after the acknowledgement. Conversation, removal and full-party rejection retain their loops. Resolve choice styling while preserving accepted bust staging. |
| UI-05 Sacrifice | RQ-008/009/012 | Encounter maps and shared campaign/sacrifice events | Picture, name and container activate the same eligible candidate. Preserve the immediate irreversible action and danger → selection → farewell → named consequence sequence. Resolve nonoverlapping target geometry and warning placement. |
| UI-06 Narration and route return | RQ-003/004/010/011 | Map002; CE352/353; Map023; epilogue Maps029–036 | Older Rheed over black, lower native dialogue, proportional busts; complete route closure before the visual return. Resolve representative framing and route-transition timing. |
| UI-07 Final decision | RQ-009/014 | Map023/event001 | D-021: two centered, ornamented panels side by side for Reunir/Destruir, with equal prominence and the existing consequence information. Preserve deliberate single activation; measure final dimensions and readability. |
| UI-08 Tavern noticeboard | RQ-005 | Replaces CE117's all-roster presentation | D-020: a plain list containing only deceased heroes' names, without additional descriptive text or images. Preserve the approved empty message and ordinary return to preparation. Measure readable spacing and fit. |
| UI-09 Final memorial | RQ-015 | Map028; CE058–060/338–345 | Complete inscriptions, names and context without clipping. Preserve final progression; this is a different surface from UI-08. Measure the longest content and maximum occupation before choosing reflow or navigation. |

## Title direction — D-017 approved

**Manual correction approved by user, 2026-09-25:** initial title commands reuse the existing Options selectable-window system: current windowskin, item gradient/border, font, cursor, disabled opacity and keyboard/pointer handling. This supersedes the picture-button treatment of CE002 only. The native menu sits below the title, centered at logical y=360, with a 352px choice-content width and the existing 44px item height. Normal items retain the shared background; keyboard focus and hover use the native selection cursor; pressing uses the provider's existing input feedback, without a new pressed asset. Continue remains disabled without a save. Age acknowledgement and NewGame/LoadScreen/Options destinations are unchanged. No global skin or provider implementation is changed.

**Confirmado — D-017, 2026-09-24:** the user answered “1”, selecting the existing empty tavern, darkened, as the title background. Reuse `img/pictures/Dryland_Taverna.png` behind “Afogados em Terra Seca” and the entry menu. The image was opened and inspected as a static asset; it is 1267×713. No new exclusive title illustration is required by this decision, and no raster asset was modified during authoring.

This settles the title background direction. Proposed placement appears below; contrast still requires rendered validation. The subsequent notice retains the independently approved black background and exact copy in RQ-001. D-022 separately resolves notice cancellation; D-024 includes the discreet 16+ title mark.

The other title-background alternatives are closed. D-017 does not approve the entire surface contract, the technical design or the implemented appearance.

## Destination composition — D-018 approved

**Confirmado — D-018, 2026-09-24:** the user answered “2”, selecting a single illustrated map with clickable locations and a side information panel for the selected destination. This replaces the proposed card composition. Preserve the destination name, rumor, exploration/status information, approved Ivaí introduction, separate Voltar and Partir actions, and still-valid selections when returning to formation.

Each location's illustration/marker, name and visible container form one coherent target with keyboard focus. Selecting a location updates the selection and side panel; only Partir deliberately departs when party and destination are valid. Preserve the baseline with neither initial route selected by default; a sole remaining available route may be preselected. Composition approval does not authorize selecting unavailable routes or treating focus as departure.

**Preserved baseline, not a new interview decision:** GDD §5.2 keeps the Vilarejo Partido visible but locked until both map pieces are obtained and overlaid. Both initial routes begin available; completed routes cannot be repeated. Source inspection confirms that route status is derived from completion and piece ownership. Do not reinterpret “preserve discovery” as hiding the final destination or changing its name. The pieces' narrative revelation under §5.3 remains in its earned sequence.

Read-only inspection found CE039 drawing three destination illustrations with separate text/status pictures; its choices currently bind to the illustrations. `Dryland_MapComplete.png` and `Dryland_Destination_physical.png` were opened as static assets. The completed-map artwork contains the village and connecting paths. The art contract proposes it as a navigation overview without implying that narrative pieces have already been obtained. D-018 approves composition; this specific asset reuse and the geometry below were subsequently approved under D-025. No image was generated or modified during authoring.

## Noticeboard reading layout — D-020 approved

**Confirmado — D-020, 2026-09-24:** the user refined the noticeboard to a composition containing only the names of dead heroes, with no additional text or images. This supersedes D-019's newspaper-entry composition. The populated list contains complete public hero names only: no portraits, illustrations, biographies, inscriptions, cause/location of death or other descriptive fields. Do not commission obituary copy or illustrations for this list.

Preserve the existing hero order, readable typography and complete names without omissions or duplicates. Show the names together when they fit; the earlier allowance for pagination remains only if measured legibility requires it, not as a mandatory newspaper feature or a one-hero-at-a-time view. Keep keyboard/mouse navigation and a clear return control. No living hero appears and no name acts as a formation or sacrifice choice.

The in-world tavern access, approved empty message “Ninguém ficou pelo caminho”, and observational return to preparation remain. The no-extra-text rule governs populated entries; this correction does not explicitly replace the existing empty state or navigation controls. It does not change the final cemetery's inscriptions, pictures or progression under RQ-015. D-021 separately resolves the final-decision composition below.

The current CE117 is an all-roster text panel. Replace its displayed content with the dead-only name list, sourced from existing public identities. Validate the largest deceased roster reachable while preparation remains available; do not fabricate a tavern return after total loss. Exact spacing and rendered readability remain to be verified.

## Final-decision composition — D-021 approved

**Confirmado — D-021, 2026-09-24:** the user answered “1”, selecting two equally prominent ornamented panels side by side in the center: Reunir and Destruir, each with its existing consequence text below the action. The vertically stacked alternative is closed. Preserve the approved larger scale, ornament, deliberate input and single activation without an additional confirmation.

Map023/event001 currently carries “Reunir o medalhão — libertar os amantes e morrer” and “Destruir o medalhão — sobreviver e entregá-los a Andirá”. Preserve that information, with the consequence below each action. Do not change outcomes, imply a recommended ending through visual emphasis, or let the preceding dialogue advance activate a newly shown option. Proposed dimensions and spacing appear below; final ornament and rendered fit must be checked at the supported minimum. The composition decision is not a rendered-acceptance result.

## Leaving the age notice — D-022 approved

**Confirmado — D-022, 2026-09-24:** the user answered “1”, selecting a visible “Voltar ao título” button and the Escape key. Both return to the title without starting or loading a campaign. This applies to the notice reached from Novo jogo and Continuar, whether the checkbox is checked or unchecked. The Escape-only alternative is closed.

Keep the black notice, exact approved warning and disabled Jogar until checked. Returning does not grant acknowledgement, retain a checked state for a later entry or write a campaign. Each new entry starts unchecked under D-003. The return control remains keyboard/mouse accessible; its activation cannot also activate the restored title command. This specifies player behavior, not a change to the provider's internal title-scene initialization.

## Manual-save success feedback — D-023 approved

**Confirmado — D-023, 2026-09-24:** the user answered “1”, selecting a discreet “Campanha salva” notice within the tavern, without another click or dialogue acknowledgement. Show it only after the requested manual save completes successfully. Its display must not interrupt preparation, steal choice focus, cover the active controls or become a campaign reading passage. The acknowledgement-dialogue alternative is closed.

This settles successful-save feedback, not a new autosave announcement policy. Pending storage is not success; a failed attempt cannot display or leave a success notice suggesting that attempt completed. Preserve the native failure treatment under GDD §3.7: Continue uses the last successful save, without a new custom blocking/retry flow. The save command can be used again normally. The sections below and programming contract specify pending/failure presentation, notice calibration and the resumable boundary; implementation evidence remains pending.

Read-only inspection found that Dryland_EventBridge tracks saving/saved/failed around the actual save promise. Its current autosave Checkpoint can skip a write when the campaign sequence already matches the last successful sequence. The programming contract must account for this when designing deliberate saving of the current preparation and reading completion; a remembered success or skipped checkpoint alone cannot prove a new manual write succeeded. No save implementation was changed during this decision.

## Title age mark — D-024 approved

**Confirmado — D-024, 2026-09-24:** the user answered “2”, selecting a discreet 16+ mark on the title in addition to the separate age notice. Keep it legible and subordinate to the title/menu, without covering controls. It is an informational mark, not an actionable control or a claim of official certification. The complete warning, checkbox, entry gating and return controls remain on the next screen as approved. The notice-only alternative is closed; final placement and contrast are surface calibration.

## Choice families and input contract

RQ-009 uses the current trap-choice presentation as its reference. The proposed family inventory is:

| Family | Treatment for surface review |
| --- | --- |
| Hero-visit dialogue/actions and encounter approach/retreat choices | Use the shared trap-choice typography, border, fill, spacing and focus/disabled language. Preserve labels, meaning and availability. |
| Hero, destination and sacrifice targets | Use the same state language, with a container encompassing all selectable content; their portrait/map layouts remain distinct. |
| Council final decision | An explicit emphasized variant under RQ-014, keeping both options equally actionable and the consequences readable. |
| Title, age checkbox, Settings and campaign-file screens | Define separately. Do not apply a global windowskin or redesign provider screens as an incidental consequence of RQ-009. |
| Reading-only messages, inscriptions and credits | Preserve their own reading presentation; they do not become choice buttons. |

The native coverage is Maps037–044 hero actions, encounter Maps007–022 approach choices, shared retreat confirmation and sacrifice selection, and Map023 Council/final choice. CE002 title/notice, CE003 preparation, CE039 destinations and CE117 board use their dedicated layouts. Inventory their actual Show Choices commands during implementation so no eligible branch retains an accidental old style. Source inspection alone cannot establish that a visible container and its active target coincide.

Each eligible control has one visible and keyboard-reachable target. Picture, label and container produce the same action; focus or hover alone never chooses. Adjacent containers must not overlap or intercept each other's input. Preserve selected and unavailable states as distinct from temporary focus.

One gesture belongs to one interaction: the acknowledgement ending a message, closing HIDE, or opening a choice cannot also choose a destination, sacrifice or ending. Cleanup and focus restoration must leave no invisible active control. Dead heroes stay ineligible throughout an absence animation. These approved outcomes constrain the later implementation; this draft does not prescribe a new input framework.

## Motion, reading and saving

The approved absence interval is simultaneous disappearance over 3 seconds on expedition returns only, before preparation becomes interactive. With no deceased heroes, add no wait. Reduced motion shows empty places and enables preparation immediately. Other tavern round-trips and Continue of an already reached tavern do not replay the effect.

The route-closing pause and tavern fade happen before that absence interval. Proposed normal timing is 30 frames to black, 24 frames holding black, and 30 frames to the tavern; reduced motion changes immediately without the added pause. The approved 3 seconds must not be repurposed as the total duration of both transitions. All route-closing text and rewards finish first, without added return dialogue. The [art/staging contract](prototype-feedback-refinement.technical-art.md) owns these timings and framing.

Narrative copy remains player-paced, including the selection acknowledgement and each expedition's first destination-map introduction. Read completion on Continue follows the last successful save under D-014. HIDE and Options preserve the current reading and do not perform campaign actions.

The tavern's save command targets only the associated campaign file. D-023 specifies the discreet success notice after actual storage completion. While pending, disable repeated saving and campaign-changing controls through the existing save wait; keep the scene visible and use the button's pending label `Salvando…`. On failure, clear stale success and preserve native failure treatment, then allow another deliberate attempt. The [programming contract](prototype-feedback-refinement.programacao.md) defines the resumable boundary. A click, elapsed animation or old saved status is not evidence of successful current storage.

## Proposed measurable layout

**Manual correction, 2026-09-26:** for hero selection, the Git composition at `c47c6fcbc847158d0f96c9ec3eab912f6de127e2` supersedes the visible 168×208 hero plates and their reduced portraits. Containers have no painted pixels, background or border. Each contains the original portrait at 35% scale and its restored name tag, preserving exact portrait world coordinates. Keep native hover/keyboard selection and the selection check mark; dead heroes remain absent/unavailable. The native groups use picture layers 10,12,11,13,14,15,16,17 for H1–H8 so Elowen's name remains above Griznik's silhouette; this changes no portrait position or size. Overlapping hero-group clicks follow the visible top layer, so Elowen's visible name cannot activate Griznik. No extra movement or animation is introduced. Dialogue body ink is `#211c14`, with no dark halo around the glyphs, scoped to Window_Message; its light windowskin, dimensions, font and menu typography remain unchanged. Register: existing game UI; visual variance 1, additional motion 0, existing information density retained. The job is to read dialogue and identify heroes within the authored tavern composition.

These logical 1280×720 regions are the initial technical design. Native text measurement may enlarge a region within its reserved area; do not reduce the font or cut content to preserve a coordinate. Use the existing trap-choice palette/border and current font, a 26px body target with a 24px floor, 32px line height, and at least 48px interactive height. Focus must be visible by outline/fill as well as color; unavailable and selected states remain distinct. Keep controls at least 24px from the game boundary and leave 16px between neighboring targets.

| Surface | Proposed layout and fit rule |
| --- | --- |
| Title | Center the title in x=240–1040/y=128–272; vertical menu in x=448–832/y=344–600. Place 16+ at the lower right with 32px outer margin and a legible 26px mark. Uniform background fill and local darkening must keep the menu clear. |
| Age notice | Warning centered in x=192–1088/y=176–352, full text wrapped naturally. Checkbox row x=288–992/y=400–456 is one target; checkbox state is visible. Jogar and Voltar ao título occupy separate centered rows below it, each at least 56px tall. Preserve keyboard order warning → acknowledgement → Jogar → return; disabled Jogar cannot activate. |
| Tavern | Reserve y=16–88 for Settings/save and y=632–704 for Seguir/feedback; preserve the eight established spatial hero places. Integrate a small wall-board access in a free wall region, clear of hero targets. Align each name inside its hero's visible container and adjust local bounds/spacing to prevent overlaps. No departure control remains here. |
| Destination map | Reserve x=48–784/y=88–616 for the map and x=816–1232/y=88–616 for information. Uniformly fit the square overview within its region. Place three nonoverlapping marker/name containers at their illustrated locations; lock/complete status stays visible. Voltar and Partir occupy the bottom strip y=640–696. Side panel wraps the full name, rumor and progress; before selection it gives the ordinary selection instruction, without the removed tavern label. |
| Tavern names | Plain reader x=320–960/y=112–592; seven reachable deceased names fit on separate centered lines of 48px. No populated-list heading, illustration or death detail. Voltar is separate below the names. The empty-state message replaces the names. No pagination is expected at this size; use it only if actual full-name measurement requires it. |
| Sacrifice | Up to three eligible panels across x=80–1200, with 24px gaps and a shared lower name band; retain the existing irreversible warning above them. A visible container includes the portrait and name; the whole container is one action. Do not apply the final-choice ornament to ordinary sacrifice. |
| Final choice | Two 504×304 panels at (112,208) and (664,208), centered with a 48px gap. Action title 36px; existing consequence below at 26px, wrapped within 440px. Equal ornament, focus and disabled treatment. Clear preceding dialogue/busts before presenting the choice; no follow-up confirmation. |
| Manual-save success | A noninteractive, right-aligned Campanha salva notice above the lower toolbar, maximum width 320px and 32px outer margin. Show for 120 frames after this write succeeds; no focus change or preparation wait. Clear on a new save attempt or surface exit. |
| Final cemetery | Preserve the existing scene and grave ordering. Measure every label against its cell and keep the reading box inside the supported area. Full inscriptions may occupy multiple native boxes, with one passage completion after the last; no text truncation or replacement by the tavern names-only design. |

Keyboard navigation follows the visual order: left-to-right for panels/locations, then the footer actions; a visible locked location is informational and cannot be confirmed. Restore focus to the originating control after board/settings/map returns when still valid. When a control becomes ineligible, focus the next valid control predictably; never preserve an invisible selection. Treat pointer activation at the top/bottom/label edges as belonging to the same container only within its visible bounds.

## Review boundary

The interviewed directions are decided: title background and 16+ mark, destination composition, names-only noticeboard, side-by-side final-choice panels, notice return controls and manual-save success feedback. The measurable layout and linked art/programming contracts now form a complete proposal. D-025 approves the full contract, including the pixel/timing calibration. Later rendered acceptance remains separate; these values are not retroactively attributed to an earlier numbered answer.

[Verification](verification.md) remains authoritative for V-001–016 and the grouped journeys. No browser, current-candidate screenshots, hit-area reproduction, timing measurement or human visual acceptance has occurred in this authoring stage. Preserve the devlog moment: form the party → hear Ivaí → choose a destination → deliberately depart; add a separate loss-return capture showing the absence and noticeboard when implemented.
