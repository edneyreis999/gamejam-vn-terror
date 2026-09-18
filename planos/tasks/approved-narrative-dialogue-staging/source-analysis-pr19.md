# PR #19 — Rheed prologue integration analysis

Inspected on 2026-09-17 for the existing `approved-narrative-dialogue-staging` spec. This is source analysis, not a new spec, implementation or independent runtime acceptance.

## Source and scope

[PR #19](https://github.com/edneyreis999/gamejam-vn-terror/pull/19), authored by `eiterer-patricia`, was open at `daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8`, based on `3b5730495302e8676785e994421b3adfb4b82078`. No comments, reviews or checks were reported. Its 57 changed paths include runtime, supplied assets, source contracts, GDD, QA records and test support.

The user explicitly added this PR to the current integration and identified “Narrador” as Rheed. D-009/D-010 own those decisions. The source's completed `prologo-rheed` spec remains historical; integration changes belong here.

## Delivered native behavior

- Map002 event 1 authors nine native message boxes in six semantic passages, `prologue.rheed.01` through `.06`. CampaignRules contains the corresponding reading plan; the runtime prose remains in the native event.
- Older Rheed narrates N01–N03 alone over black. The source identifies the speaker as **Rheed**, with the supplied `Reed final` image.
- N04–N06 use the existing `Dryland_Taverna` picture: young Rheed left, Ivaí right, both visible. The speaker becomes 10% larger through instantaneous scale/position commands. The inspected commands do not implement PR #17's animated entrance/focus/exit and listener-dimming style.
- The final exchange is Rheed's public question followed by Ivaí's answer. Acknowledging the answer clears the prologue pictures and attachments and transfers once to Map003. No narrator coda is added.
- Entry stops inherited audio; the prologue does not invoke shared ambience. Subsequent preparation retains its own audio behavior and preferences.
- Rheed is a narrative helper/witness, outside party slots, competencies and sacrifice. His possible survival does not prevent the total-loss ending. No ninth playable hero is added.

## Exact integration surfaces

| Surface | Source contribution | Integration implication |
| --- | --- | --- |
| `data/Map002.json` | Native prologue, pictures 60/61, explicit message attachment/removal, silence and transfer | Preserve script and reading boundaries; consider the existing D-004/D-005 staging scope without reopening deferred polish implicitly. |
| `img/pictures/Reed final.png` | Older Rheed, 408 × 560 | Preserve supplied bytes and exact native spelling, including the space. |
| `img/pictures/Reed-novo.png` | Young Rheed, 1024 × 1536 | Preserve supplied bytes; do not substitute the older portrait in direct young-Rheed dialogue. |
| `js/plugins.js` | Enables installed `VisuMZ_4_AttachedPictures`; changes `PictureIDs:arraynum` from 61–70 to an empty list | Attach only explicitly authored pictures. Preserve this setting when composing the PRs. |
| Same plugin file, PR #17 | Changes VNPictureBusts anchor Y from 1.0 to .6 and X/Y scales from 100 to 50 | Separate plugin entries must both survive integration. Recheck effective composition; shared filename alone is not proof of an incompatible design. |
| `Dryland_CampaignRules.js` | Replaces the three old prologue IDs with six new IDs | Keep the source plan and its test/fixture consumers aligned; later Council/route changes must not overwrite it. |
| `Dryland_Taverna` reference | PR #19 reuses the existing filename; PR #17 replaces that asset | The direct prologue dialogue will inherit the new tavern artwork. Original PR #19 screenshots do not verify that background combination. |
| Test and QA support | Updated reading counts, traversal fixtures, presentation/audio checks and Windows path/server/junction handling | Carry related consumers when implementing; do not interpret these changes as a new dependency or run obsolete mutation scripts over the combined events. |

Plugin order is unchanged in both source PRs. The only changed path shared by PR #19 and PR #17 is `js/plugins.js`; PR #19 shares no changed paths with #15 or #16. Semantic presentation and narrative interactions still exist across distinct files. No engine/vendor source modification is present in the inspected runtime delta.

## Authority and product boundaries

PR #19's canonical GDD adds §27 and updates the prologue's authoring, records, presentation and audio rules. The supplied v5.0 file is a historical snapshot; later approved refinements live in the unsuffixed canonical GDD and the source spec's final sections.

Older Rheed recalls his service to Ivaí; young Rheed accompanied the expeditions without player-controlled actions. This resolves the narrator identity in PR #16. The older local GDD still contains statements that Ivaí narrates the campaign; source §27 is focused on the prologue and does not remove all those statements. Consolidation must explicitly reconcile them with D-010 while retaining Ivaí's protagonist role and existing campaign rules.

The source deliberately excluded conversion of the rest of the campaign to Rheed narration. This integration now includes the approved new narrated route passages. It does not automatically authorize rewriting every existing narrative line or adding young Rheed to every conversation. Epilogue presentation without overlaid busts remains confirmed by D-003.

Source acceptance retains the introductory Irati wording and its acknowledged ambiguity. Do not reopen that editorial decision. Fine fitting of the prologue portraits and a replacement backdrop for older Rheed were deferred; black remains its delivered baseline. Earlier-save compatibility was excluded for that prologue delivery. Preserve these limits as source evidence; the combined increment's [verification contract](verification.md) now defines its own current-version coverage.

The source's early ADR and technical survey contain historical references to missing young art, inactive AttachedPictures and old reading IDs. Final GDD/spec refinements and actual runtime resolve those dependencies; do not reinstate them as current blockers.

## Evidence inspected and limits

Read the source spec, script, ADR, UI/UX/programming contracts, relevant GDD delta, verification matrix/final closure, selected delivery provenance, and the closed bust-visibility bug. The bug record concludes that the missing-pixel report was an inspection false positive; it does not establish an unresolved runtime defect.

Inspected the versioned `narrador.png` and `rheed-jovem.png`; their SHA-256 values match `selected-provenance.json`. They show older Rheed over black and the younger pair over the source tavern. These are source screenshots, not a fresh playtest or proof of final integrated framing.

Source verification reports completed directed opening/control/recovery coverage and human acceptance within its exclusions, with 58 unit cases passing cumulatively and focused integration checks. It explicitly does not claim a full-suite run or older-save compatibility. Raw reports/fixtures remain local and ignored in that source delivery; only selected evidence is versioned.

This session performed read-only Git/source inspection and screenshot provenance checks. No runtime tests, browser gameplay, merge, commit, remote comment or game mutation occurred. Fresh integrated checks must cover changed backgrounds, combined plugin settings, narrator/direct-dialogue transitions, controls, reduced motion, temporal music/ambience transitions, cleanup, reading completion and saves within the eventual approved scope.

## Product disposition after analysis

The backdrop approved in D-011 was subsequently corrected by the user in D-013. Older Rheed narrates in the present, in full color, alone over black whenever he appears. Young Rheed and the narrated events are in the pastel past. Return to the past scene's direct-dialogue composition when a character speaks; illustrated epilogues retain their no-bust contract. The place where older Rheed tells the story has not been drawn and remains outside this increment. Do not implement the superseded dimmed-scene backdrop.

D-012 confirms PR #17's conversation staging for young Rheed and Ivaí in the prologue, preserving script, sides and tavern background. PR #19's instant 10% emphasis remains source history, not the integrated target. D-014 subsequently replaces its silence with distinct past/present music and narrative sounds, with selection delegated to the agent. D-015 establishes older Rheed as Daratrine's best storyteller, addressing hundreds of creatures including the player at Noite da História in an unnamed city. Venue artwork remains deferred. The [temporal-presentation ADR](adrs/adr-001-rheed-temporal-presentation.md) records these replacement boundaries; source silence recordings cannot validate the new integrated audio.
