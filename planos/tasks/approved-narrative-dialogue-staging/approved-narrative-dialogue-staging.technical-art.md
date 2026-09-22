---
status: approved
approved_on: 2026-09-18
owner: Technical Art
stage: surface-and-technical-design
---

# Approved artwork and native framing

Owns the image assets and framing for RQ-003/006/007/008 in [spec.md](spec.md). Lucas remains the project art owner. This contract implements already approved content without reopening source art approval or declaring unrelated provisional art final.

## Asset evidence

The following dimensions were read from files at the pinned PR heads in the spec. Source paths are not new runtime directories.

| Source | Image | Size | Treatment |
| --- | --- | --- | --- |
| PR #19, `img/pictures/` | `Reed final.png` | 408×560 | Preserve exact source spelling, portrait and full color. Older Rheed appears alone over black. |
| PR #19, `img/pictures/` | `Reed-novo.png` | 1024×1536 | Preserve supplied art and tones; frame independently of the older portrait. Young Rheed is left in the prologue. |
| PR #15, `docs/narrativa/ilustracao-epilogo/` | `gorvak.png`, `griznik.png`, `seraphina.png`, `bimbren.png`, `vaelith.png`, `draska.png` | 1536×1024 each | Import approved illustrations into native pictures; preserve composition, aspect ratio and pixels. |
| Same source | `liora.bmp` | 1536×1024 | Prepare a lossless native PNG derivative; retain source and source-to-runtime provenance. This is format conversion, not repainting. |
| Same source | `elowen.png` | 1672×941 | Preserve approved illustration and aspect ratio. |
| PR #17 | `Dryland_Taverna.png` | Inspect final source at integration | Use the replacement source asset for every consumer, including the prologue. |
| Existing game | `Dryland_EndingReunite.png`, `Dryland_EndingDestroy.png`, `Dryland_EndingTotalLoss.png` | Existing native source | Reuse for their corresponding outcomes; the extra art described by PR #16 is out of scope. |

Local visual inspection in Stage 2 included both Rheed source portraits, Gorvak's supplied epilogue, the existing Gorvak bust, existing Reunite ending and current tavern. These are source observations, not combined-runtime evidence. The inspected past assets already carry muted beige/brown tones; the old tavern is superseded by PR #17. Preserve the supplied palette as the default approach rather than inventing a global recoloring filter. Check the remaining approved assets before claiming palette coverage; no automatic repaint, new illustration or UI tint follows from this recommendation.

## Native authoring boundaries

- Keep images, positions, scales, tones, duration and explicit cleanup in native map/Common Event commands. Preserve installed engine/vendor code and order. Do not introduce a JavaScript portrait-layout registry or runtime image generator.
- PR #17 changes the VNPictureBusts default anchor Y from 1.0 to .6 and default scales from 100 to 50. Integration must inventory consumers that inherit these defaults and recalibrate them; preserving Gorvak does not prove that another portrait is correctly framed.
- PR #19 uses explicit Upper Left origins for its portraits and explicit AttachedPictures bindings. Its older/younger raw sizes differ substantially. Copying identical scales, anchors or Y coordinates between them is not a valid adaptation.
- Frame occupied participants, taking transparent margins and the lower text window into account. Keep faces and identity-critical features visible at speaker and listener targets. Include one, two and three eligible Council heroes with Ivaí, and the solo case.
- Preserve Pérola/Floraí's prisons and Andirá's water reflection. A focus movement must not detach a character from the setting required by the fiction.
- A present-day narrator composition owns a black background, one older portrait and native reading UI. It must retire any past scene pictures that could remain through a native map transfer or temporal cut. Return to the past uses its own authored composition.
- The [whole-image fit rule](approved-narrative-dialogue-staging.uiux.md#confirmed-surface--epilogue-image-fit) is confirmed by D-018. Use scale = min(game width / source width, game height / source height), preserve aspect ratio and center over black. The 3:2 sources occupy 1080×720 at the 1280×720 logical baseline. Elowen has only a negligible proportional margin. Author native targets in the MZ logical coordinate space; do not recalculate them from CSS viewport pixels.
- Retain the project's default native loading and Retry behavior. No loading delays, custom readiness hooks or broad new preload system are proposed. Required final imports must exist in the local game package.

## Evidence to produce after implementation

Record the source and imported hashes, native asset names, lossless Liora conversion and actual authored picture targets. Compare source artwork and renders at both supported game areas, with and without the lower message window. Validate every epilogue, both Rheed portraits, all changed dialogue participants, normal/reduced motion and Options/Continue boundaries. Source screenshots from PR #19 establish its historical delivery only; they cannot prove the combined art, staging or audio integration.

Final art refinement of the undrawn present venue, new ending art and unrelated provisional assets remains outside this increment. Technical presentation must still be readable and faithful to the supplied assets.

## Authorized confinement artwork — 2026-09-18

D-019 authorizes two production PNGs with transparent backgrounds: `Dryland_perola_confined` (stone) and `Dryland_florai_confined` (fig roots). The user delegates generation and style matching to the current heroes/tavern. Original portraits remain intact. The user refined D-019: the prisoners are themselves ancient material forms. Pérola is a rustic eroded stone relief suggesting a generic dwarf woman; Floraí is an old fig tree whose bark suggests a generic elf. Facial identity, clothing and living-body details are intentionally absent. Weathered contours, fissures and lichen communicate decades of confinement. The material silhouette and faint head shape remain readable above the dialogue window. Only CE293/295/297/299 select these assets; all transforms, prose, rules and cleanup retain their existing contract. This supersedes the earlier preservation-only restriction for these two portraits, without authorizing unrelated art changes. Prompts and provenance are in [the asset record](../../../rpg-maker/asset-provenance/approved-narrative-confinement.json).
