# ADR-001 — Rheed's narrative present and the pastel past

Status: accepted product decisions on 2026-09-17; complete integration spec approved on 2026-09-18. Task authoring follows the approved spec; implementation has not started.

## Context

The user added PR #19 to the integration of PRs #15–17 and identified the “Narrador” in the new prose as Rheed. PR #19 supplies older and younger portraits and a completed native prologue. The local GDD still described Ivaí as the narrator.

An earlier interview recommendation, D-011, placed older Rheed over a dimmed image of the past scene outside the prologue. The user subsequently corrected it: older Rheed tells the story in the present and is colored; young Rheed and the rest of the story take place in the pastel past. Older Rheed must always have a black background because his storytelling setting has not been drawn.

## Accepted decisions

1. **Confirmed — narrative time:** older Rheed narrates in the story's present. Young Rheed and the events being recounted belong to its past. This distinguishes the storytelling frame from the expedition without changing the player's campaign decisions or Ivaí's protagonist role.
2. **Confirmed — visual distinction:** older Rheed uses the supplied full-color portrait. The past uses pastel tones, including young Rheed and the other narrated events. Technical treatment must respect approved supplied artwork; this decision does not select a new filter or authorize replacement illustrations.
3. **Confirmed for this increment — backdrop:** whenever older Rheed appears, he appears alone over black. Do not retain the past scene behind him, even dimmed. Return to the past scene and its eligible participants for direct dialogue.
4. **Confirmed context / deferred artwork — present setting:** older Rheed has become Daratrine's best storyteller and tells this story to hundreds of creatures, including the player, in a city during Noite da História. The city is not named, and Daratrine's geographical category is not specified. Venue design and artwork remain outside this increment; retain black without inventing an environment.
5. **Confirmed — prologue dialogue:** apply the Gorvak reference from PR #17 to young Rheed and Ivaí's direct exchange: entrances, speaker emphasis, listener dimming and exits, with per-portrait framing. Preserve approved prose, young Rheed on the left, Ivaí on the right and the tavern backdrop. The initially preserved silence is superseded by the subsequent audio decision.
6. **Confirmed direction / delegated prototype cue selection — temporal audio:** use different music and narrative effects/ambience for past and present, including the prologue. The agent selects from existing local assets. The present suggests the public storytelling gathering; the past follows the expedition's locations and tension. The [approved audio contract](../approved-narrative-dialogue-staging.audio.md) records initial files and unperformed listening validation.

## Supersession and preserved boundaries

- D-013 supersedes only D-011's dimmed-scene backdrop. Older Rheed's solo foreground, the return to direct dialogue and the no-bust illustrated epilogue contract remain.
- D-012 supersedes PR #19's instant 10% emphasis as the target style for the integrated prologue dialogue. Preserve the source's completed spec and evidence as history; do not rewrite its delivered result.
- Canonical GDD §§3.1–3.2 and 6 no longer identify Ivaí as the narrator. He still leads the expedition, withholds information and is the character through whom the player makes campaign decisions.
- Canonical GDD §19.2 gains this temporal visual rule. Existing low-saturation direction continues for the past; older Rheed's full-color present is explicitly distinguished.
- Do not add Rheed to party slots, competencies or sacrifice candidates; do not add his bust to the approved illustrated epilogues. No campaign-wide prose rewrite or new present-day scene is implied.
- D-014 supersedes the suggested silent present and PR #19/D-012's prologue-silence rule. No audio distinction remains undecided at the product level; cue selection is delegated, while implementation and listening evidence remain pending.
- D-015 resolves the broad event/audience context previously left unspecified in D-013. It does not add a drawn environment, an audience avatar, new dialogue or interactive audience mechanics.

## Authority and verification implications

Authority: explicit user approvals and corrections in this interview, recorded as D-010–D-015 in [spec.md](../spec.md). The confirmed design is reflected in the [canonical GDD](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#192-direção-artística). PR #19's [source analysis](../source-analysis-pr19.md) records its delivered baseline separately.

Future visual checks must distinguish full-color older Rheed over black from the pastel past, including transitions into and out of the Council narration. Reading controls, reduced motion, participant eligibility and existing illustrated endings remain part of the affected verification contract. This ADR records no runtime or artistic validation result.
