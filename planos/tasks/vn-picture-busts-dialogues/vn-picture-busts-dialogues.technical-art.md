---
status: approved
owner: Technical Art — Lucas
---

# Technical Art — Ensemble framing with existing portraits

[Spec](spec.md) owns behavior, [UI/UX](vn-picture-busts-dialogues.uiux.md) owns focus timing/controls, and [inventory](inventory.md) identifies the 12 current PNGs. [ADR-003](adrs/adr-003.md) authorizes autonomous framing/calibration and uninterrupted execution. This is a framing contract, not final-art approval.

## Asset and composition constraints

Reuse H1–H8, Ivaí, Pérola, Floraí and Andirá unchanged. Preserve their creative statuses and original orientation. Do not normalize files, create poses, crop destructively or replace assets to simplify scales.

Heroes remain left; Ivaí/non-heroes right. Andirá's left-side intervention remains visibly inside the reflection. Preserve the lovers' prisons. The accepted side does not authorize displaying a detached or unconfined figure.

Measure useful opaque content as well as raw image dimensions. Current PNGs differ substantially; copied ProjectX 100%/90% values are unsuitable as literal scales. Calibrate a base per character and composition, then materialize active/listening targets in native events. Existing single-bust framing is an art reference, not an approved ensemble coordinate table.

## Layout work

Use the supported 1280×720 game area. Prepare occupied-slot layouts for one-person, 1x1, 2x2 fixture and up-to-3x1 Council. The plugin's 0–10 position grid is a starting point; local margins differ from ProjectX. Author final absolute coordinates and scales, preserving the global plugin configuration.

Council left slots use stable eligible H1–H8 order. Keep positions stable after initial assembly, through listening and after Andirá's intervention. Do not fill vacancies with absent/dead/reserve heroes. Evaluate every hero in the supported occupied slots; selection eligibility remains a domain responsibility.

Overlap is allowed, but no face or identity-critical feature may be persistently hidden by a listener. Reserve room for the active scale/movement when validating rest positions. The bottom message window and speaker name must remain readable. Fixed Picture ID order is not an automatic bring-to-front feature.

For Andirá, calibrate the accepted left placement against the Council background and his reflected silhouette. Constrain or omit the small focus displacement rather than moving him outside the reflection. Use the same principle for the lovers' prison boundaries.

## Deliverable during implementation

Record a compact table of the actual authored positions, active/listening scale targets and any constrained-motion exceptions. The values in the events remain the runtime source. Do not add a manually maintained competing layout map in JavaScript.

Capture all 12 assets, tavern continuity across all eight heroes, Council challenge with three heroes, reflected intervention, restored 3x1 opinions and the isolated 2x2 composition. Tavern coverage includes profile, speech, selection and full-party presentations, rather than a Gorvak-only sample. Include normal/reduced motion temporal evidence where a still image cannot demonstrate the claim. Label fixture images separately from directed campaign captures.

The executing agent inspects framing, identity, overlap, reflection and message readability/focus against the contract and records the evidence. Lucas and Pati may provide later refinement; their approval is not a task dependency or a reason to stop the loop. Record missing human review honestly. Completion neither promotes placeholder art to final art nor claims new cultural/editorial approval.

## Actual authored values — 2026-09-11

Native CommonEvents is authoritative. Positions below are final targets with Bust origin; scales are per-art percentages. Entry establishes the active target before readable text. Listener tone is `[-24,-24,-24,0]`; active tone is `[0,0,0,0]`. Normal focus takes20 frames; reduced motion reaches the same final composition immediately. These are prototype values, not final-art approval.

| Asset | Slot | Active position | Base scale | Listening position | Listening scale |
| --- | --- | --- | --- | --- | --- |
| H1 | 60 | (326, 950) | 46% | (310, 950) | 41.4% |
| H2 | 60 | (276, 1230) | 34% | (260, 1230) | 30.6% |
| H3 | 60 | (326, 1090) | 48% | (310, 1090) | 43.2% |
| H4 | 60 | (381, 1140) | 34% | (365, 1140) | 30.6% |
| H5 | 60 | (341, 1155) | 47% | (325, 1155) | 42.3% |
| H6 | 60 | (341, 1180) | 48% | (325, 1180) | 43.2% |
| H7 | 60 | (386, 1260) | 35% | (370, 1260) | 31.5% |
| H8 | 60 | (281, 1075) | 48% | (265, 1075) | 43.2% |
| Ivaí | 63 | (939, 855) | 52% | (955, 855) | 46.8% |
| Pérola | 63 | (955, 855) | 52% | — | — |
| Floraí | 63 | (955, 855) | 52% | — | — |
| Andirá | 65 | (330, 500) | 31.25% | — | — |

H1–H8 values apply to profile, speech, selection, party_full, farewell and epilogue. Only speech introduces Ivaí. Pérola/Floraí use zero entry/focus/exit displacement; they have no authored listening stage in campaign. Andirá also has no authored listening stage: heroes exit, his reflected PNG appears on the left beside listening Ivaí, then he exits before stable hero slots return. Zero displacement alone does not prove a visible prison: V-007 separately inspects the lovers against their scene backgrounds.

### Council occupied slots

The following values are transcribed from CE95/96. X is slot60; add230 for61 and460 for62, exactly as authored. Eligibility and compact stable order come from `climaxPartyIds`, not these numbers. Entry temporarily sets each hero to base; the native focus recipe sets listeners before readable text.

| Hero | Active X | Listening X | Y | Base scale | Listening scale |
| --- | ---: | ---: | ---: | ---: | ---: |
| H1 | 190 | 174 | 634 | 27.6% | 24.84% |
| H2 | 160 | 144 | 802 | 20.4% | 18.36% |
| H3 | 190 | 174 | 718 | 28.8% | 25.92% |
| H4 | 223 | 207 | 748 | 20.4% | 18.36% |
| H5 | 199 | 183 | 757 | 28.2% | 25.38% |
| H6 | 199 | 183 | 772 | 28.8% | 25.92% |
| H7 | 226 | 210 | 820 | 21% | 18.9% |
| H8 | 163 | 147 | 709 | 28.8% | 25.92% |

Ivaí uses the same63 targets as the table above. Andirá uses65 at(330,500),31.25%, preserving the reflected silhouette. No production command occupies64. The six legal consecutive trios plus H7/H8 and H8 cover every eligible occupied slot; the all-zero projection is Council solo with Ivaí.

### Isolated 2x2 authored fixture

`rpg-maker/tests/fixtures/vn-picture-busts-2x2/recipe.json` is a technical transcript on a neutral background, outside canonical narrative. It uses H1 at60 (base32.2%, listening28.98%, X226/210, Y713), H2 at61 (23.8%/21.42%, X486/470, Y909), Ivaí at63 (36.4%/32.76%, X794/810, Y646.5) and Pérola at64 (36.4%/32.76%, X1100, Y646.5, no displacement). This fixture proves reusable ownership/focus and cannot prove Pérola's narrative prison.
