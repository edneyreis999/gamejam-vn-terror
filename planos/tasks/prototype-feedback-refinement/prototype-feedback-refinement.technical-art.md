---
status: approved
stage: approved
technical_approved_under: D-025
technical_approved_on: 2026-09-24
owner: Technical Art / Cutscene staging
product_approved_under: D-016
technical_approved: true
---

# Assets, framing and transitions

Owns art preparation, portrait composition, readable asset bounds and cutscene timing for [spec.md](spec.md). The UI contract owns interaction and layout regions; this file also owns the affected cutscene staging, so no separate cutscene document is needed. D-025 approves the calibration below as technical design, not as acceptance of rendered frames.

## Asset contract

Paths are relative to `rpg-maker/The Dryland Drowned/`. Preserve filename case and register any added final picture in the existing scoped preload owner CE351. No engine, vendor, windowskin or young-Rheed replacement is commissioned.

| Surface | Reuse or required final treatment | Constraints |
| --- | --- | --- |
| Title | `img/pictures/Dryland_Taverna.png`, 1267×713 | Scale uniformly to cover 1280×720; darken with presentation tint/overlay. Preserve the empty room. Title, menu and discreet 16+ remain readable; do not bake interactive text into the background. |
| Destination map | `img/pictures/Dryland_MapComplete.png`, 1254×1254, as the proposed navigation background | Uniform fit within the UI map region. This is a navigation overview, not an early delivery/overlay of the narrative map pieces. Show final location locked until the existing rule unlocks it; do not play the discovery animation or claim that the pieces are owned. Keep partial-piece/revelation art in its earned story sequence. |
| Tavern noticeboard access | A small final wall-board treatment integrated with the existing tavern | The access belongs to the setting and has visible focus. Its opened populated reader contains names only: no decorative illustration, portraits or extra headings. A plain backing and native navigation are sufficient. |
| Hero/sacrifice/location targets | Reuse existing portraits/markers and native text; add final container treatment using the current trap-choice palette/border | The visibly filled base container is the selectable picture. Decorations may attach to it but must stay inside its active bounds. No transparent oversized catchment, overlapping targets or invisible clickable margins. |
| Final choice | Two equal ornamented panels, using the existing choice palette and native text | The ornament frames rather than obscures the two actions and complete consequence information. Both use identical dimensions and state treatment. |
| Narrator | `img/pictures/Reed final.png`, 408×560 | Older Rheed over black, no obsolete epilogue illustrations or unrelated overlays. Preserve aspect ratio. |
| Young Rheed and Ivaí | `img/pictures/Reed-novo.png` and `img/pictures/Dryland_ivai.png`, each 1024×1536 | Reuse current artwork; proportional per-scene calibration, original orientation and no art regeneration. |
| Final cemetery | Existing memorial, grave and hero artwork | Preserve complete authored names, routes, encounters and inscriptions. Increase/reflow text areas without stretching character art or silently abbreviating content. |

New containers or the small board access must be delivered as final assets or final native drawing treatment. Do not leave temporary rectangles labelled as placeholder art. Do not delete the old epilogue PNGs merely because this presentation stops showing them: perform a consumer/reference audit before proposing any removal.

## Portrait inventory and measurable framing

| Scene family | Inspected owners | Required composition |
| --- | --- | --- |
| Prologue: present narrator and direct past | Map002/event001 | Older Rheed alone on black for the narrated blocks; young Rheed/Ivaí in their established past staging for the final exchange. No added ominous reaction. |
| Hero visits | Maps037–044 | Preserve the accepted hero coordinates and speaking/listening treatment in the [hero staging contract](../hero-bust-staging/hero-bust-staging.technical-art.md). Inspect Ivaí's face, including the listener state; a fix for one family must not shift all accepted hero artwork. |
| Route threshold and discovery | CE263–265 and CE302 | Ivaí keeps a clear face above the lower box; revelation pictures retain their narrative ownership and cleanup. |
| Route closure | CE352/353 | Older Rheed on black, followed by the remaining authored closing passages, before the tavern transition. |
| Council | Map023 and its narration/opinion helpers | Preserve established hero opinion staging; calibrate only affected Rheed/Ivaí compositions. Clear these busts before the final two-panel choice if they compete with the controls. |
| Epilogues | Maps029–036, entry cleanup CE337 | Same older-Rheed frame throughout the eligible sequence; lower four-row native dialogue on black. No hero epilogue illustration behind him. |

Use literal native coordinates/scales per asset and scene family. For an initial older-Rheed frame, uniformly fit the visible portrait in x=440–840, y=40–500, above the actual message-window top. For Ivaí and young Rheed, preserve the established side assignments and fit faces within y=40–480, leaving at least 16 logical pixels between the visible face and the measured message box. These are face/portrait bounds, not permission to compress an image independently in X and Y. Transparent PNG margins and props mean raw bitmap dimensions alone cannot prove the face fits.

The accepted hero-visit Ivaí reference is X=960/Y=725, scale 50/45 for speaker/listener, with the original orientation and entry from the right. Use it as a starting reference only where that scene geometry applies. Capture at least present Rheed, direct-past exchange, hero-visit Ivaí, threshold/revelation Ivaí and Council; do not extrapolate one screenshot to all families. Check speaker and listener states wherever both exist.

## Timing proposal

| Transition | Normal motion | Reduced motion | Owner/ordering |
| --- | --- | --- | --- |
| Completed initial route → tavern | Fade to black over 30 frames, hold black 24 frames (0.4 s at 60 fps), draw tavern while black, fade in over 30 frames | Immediate scene change, no fade or added hold | Native route-return owner, after all piece/lover/Rheed/Irati/map-revelation readings. |
| Expedition-return absences | All dead heroes fade together over 180 frames (3 s at 60 fps); enable preparation only after the final frame | Dead places already empty; no animation wait | Tavern entry, after the route fade if present; voluntary/automatic retreat use the same absence owner without inventing the route-completion scene. |
| No deceased heroes / ordinary consultation return | No absence interval | Same | Do not introduce a blanket three-second tavern-entry delay. |
| Bust entrance/focus | Preserve existing 20-frame native treatment unless the scene already specifies otherwise | Immediate placement | Existing provider command expressions; no new movement framework. |
| Manual-save notice | Visible for 120 frames after success, without an acknowledgement | Same readable duration, no movement | UI-only feedback; never stalls preparation. |

Frames are authoring values. Verify perceived timing in the real game and record capture frame rate; lag is not an acceptable substitute for the specified pacing. The 3-second approved absence does not include the separate route fade/black pause. All eight-dead scenarios end the campaign rather than creating a tavern return.

## Final memorial fit

Keep the existing cemetery composition and narrative order. Measure all generated labels and full inscriptions using the active native font at logical 1280×720, with the maximum eight deceased in the final cemetery. Use additional native message boxes for a full inscription when needed, keeping its single semantic completion after the last box. For simultaneous grave labels, wrap within nonoverlapping cells; retain the full route and encounter identifiers. Do not solve overflow by making text smaller than the UI contract's floor or by hiding a field. Runtime captures must include the longest combinations, the bottom row and the existing reduced-motion layout.

## Evidence

V-001/004/005/006/009/010/011/012/013/014/015 assign visual, timing and human evidence. Static asset inspection has occurred; no current-candidate frame, animation recording or visual acceptance exists. Preserve the devlog sequence and capture suggestions in the spec, with final assets and without QA overlays.
