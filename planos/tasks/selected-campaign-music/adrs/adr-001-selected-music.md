# ADR-001 — User-selected music and opening continuity

Accepted 2026-09-29 through the user's explicit request to implement the discussed choices and then update all changes.

The GDD section 19.4 and the completed `approved-narrative-dialogue-staging/adrs/adr-001-rheed-temporal-presentation.md` previously required distinct music for the opening's present and past. Replace that requirement only for the prologue/tavern transition: use Man Made Wings continuously. Existing distinct ambience and later narration remain unchanged. Replace generic expedition music with the Church/Park/final-village selections in the incremental spec and add The Well to entry warnings.

Use native event commands and locally converted Ogg/Vorbis assets. Do not introduce a new audio manager, campaign state, plugin dependency, or service. The final village uses the user's selected preview mix; repeat-boundary smoothness and final balance are pending human evaluation.

## Follow-up accepted on 2026-09-29

The user confirmed retaining route music and ambience while Rheed narrates after traps, changing to tavern audio only on return. This supersedes the earlier exception preserving later present-day narration cues, including Council narration. Prologue audience and one-time opening applause are unchanged. Native CE067 selects by scene/route without new state or plugin code.

## Council reading mix

User-approved refinement: retain the same village music with reduced event levels during the Council/revelation/final choice; add one local revelation cue and a half-second silence after committing the final decision. This qualifies route-audio continuity by allowing level changes and the explicit post-choice stop. No text, timing limit, new plugin, campaign field or player preference reset. Native gain updates are used; smooth automation is not introduced. Exact mix values are prototype baseline in the spec.

## Lower mix throughout dialogue

User requests quieter music and effects in ALL dialogue. Apply a 0.6 multiplier to authored campaign descriptors and used interface SE volumes, retaining proportions and native settings. Constant reduced mix also covers the intervals/choices; no new plugin or automatic volume envelope is introduced. Exact calibration is provisional.

Final-choice refinement: user requested more tension after the global reduction. Override only choice BGM 11→18; preserve ambient/effect reduction, continuous track, reading time and existing commitment pause.
