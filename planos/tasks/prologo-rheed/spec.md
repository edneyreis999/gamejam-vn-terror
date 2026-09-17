---
status: approved
slug: prologo-rheed
---

# Rheed's prologue

## Objective

Deliver a brief opening narrated mainly by older Rheed, introducing Ivaí's search for his family's lost treasure. Credible family records support initial trust; incomplete maps, an unspecified treasure and a final public exchange leave room for unease. The user explicitly accepted revealing Ivaí's disregard for Irati's warning, even though this can weaken initial trust.

The user explicitly approved the consolidated spec set and creation of implementation/verification tasks on 2026-09-16. All three tasks, directed QA and human runtime acceptance are complete within the accepted scope. Portrait fitting and older narrator backdrop refinements are deferred; earlier-save compatibility is excluded. See [verification](verification.md) for evidence and limits.

## Scope and behavior

- **RQ-001 — Narrative:** play the exact ordered copy in [Narrativa](prologo-rheed.narrativa.md). Older Rheed speaks colloquially from his remembered knowledge, without hindsight warnings. Eight mercenaries are present but have no dialogue or reaction shots. No route names, curse explanation, medallion disclosure or specific family tradition is added.
- **RQ-002 — Closing exchange:** young Rheed asks publicly, “Você não está esquecendo de nenhuma informação, mestre?” Ivaí answers, “Os detalhes serão adicionados ao longo do caminho.” End immediately after the player finishes this answer; no narrator coda or reactions.
- **RQ-003 — Presentation:** one speaking character at a time, lower message window, black background for older Rheed (N01–N03), existing Dryland_Taverna background for Ivaí/young Rheed (N04–N06), no new illustrated scene or document images. N01–N03 show older Rheed alone; N04–N06 show young Rheed left and Ivaí right together, with the speaking portrait 10% larger. Use the imported `Reed-novo` portrait for the young character.
- **RQ-004 — Silence:** no BGM, BGS, ME or authored SE during the prologue. Retire inherited title audio on entry and do not invoke tavern ambience while the prologue runs. Preserve settings and restore the existing tavern audio behavior on transfer; do not globally mute the game.
- **RQ-005 — Campaign continuity:** New Game enters the exclusive prologue map, advances only by player reading, and transfers once to preparation. Keep native controls, reading completion, checkpoints and save-file ownership. Returning from expeditions must not replay this opening. Rheed is not a selectable hero, competency provider or sacrifice candidate.
- **RQ-006 — Scope and assets:** reuse the existing older-Rheed art after identifying its actual file. No invented filename, replacement character or generated art. Young art is now supplied as `Reed-novo.png`; preserve its bytes. Other scenes retain their current narration, images and audio.

## Exclusions

Full-campaign narration conversion; young-Rheed art production; specific tradition wording; new hero mechanics; new routes; retrospective explanations; illustration production; voice acting; changes to vendor source; network services; deployment and publication. No timed auto-advance or hard two-minute limit was approved: “brief” is an editorial goal.

## Authority map

| Source | Owner/status | Governs | Change |
| --- | --- | --- | --- |
| [Canonical GDD §27](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#27-prólogo-de-rheed--gdd-50) | Approved user design, v5.0 | Fiction, scope, prototype exceptions | Updated with accepted decisions |
| [ADR-001](adrs/adr-001.md) | Accepted decisions | Replacements and deliberate trade-offs | New |
| [Narrativa](prologo-rheed.narrativa.md) | Approved contract; user-accepted copy | Sole script authority for this increment | New |
| [UI/UX](prologo-rheed.uiux.md) | Approved | Visible composition and silence | New |
| [Technical Art](prologo-rheed.technical-art.md) | Approved | Assets and deferred art | New |
| [Programação](prologo-rheed.programacao.md) | Approved | Native lifecycle and integration | New |
| [EventBridge baseline](../eventbridge-minimal-runtime/spec.md) | Existing approved baseline | Map authorship, native saves and reading | Preserved except prologue content |
| [Verification](verification.md) | Approved | Sensors and acceptance | New |

## Technical design and inspected baseline

The project is `rpg-maker/The Dryland Drowned/`, confirmed by `game.rmmzproject`. Current Map002 event 1 owns the three old text passages directly; Common Event 001 is not the current editing target. Map002 calls CE351 preload and CE067 audio and transfers to Map003. CampaignRules' prologue plan currently contains `prologue.01`, `prologue.02`, `irati.01`.

VNPictureBusts is installed and active. AttachedPictures is installed but inactive in `js/plugins.js`; enable/configure the installed plugin for the requested native presentation, preserving its Tier 4 position after MessageCore and the other lower tiers. Its help supports picture attachment to the message window. Exact attachment, picture IDs and placement belong to native authored commands, not a new renderer or Bridge speaker registry. Audit plugin-wide effects before accepting the change.

See [Programação](prologo-rheed.programacao.md) for reading and save lifecycle. Preserve the current no-content-revision-gate policy. Structural old-save compatibility is not promised; never delete saves or add a revision gate for this increment.

## Acceptance summary

| Requirement | Observable | Verification |
| --- | --- | --- |
| RQ-001 | Ordered approved narration, no extra lore | V-001, V-002, V-006 |
| RQ-002 | Exact public exchange; immediate ending | V-001, V-002, V-003 |
| RQ-003 | Black/tavern, paired busts and active-speaker size | V-002, V-003, V-004 |
| RQ-004 | Silent prologue; tavern ambience resumes normally | V-005 |
| RQ-005 | Reading, resume, preparation and party unchanged | V-001, V-003 |
| RQ-006 | Existing older art; only prologue changed | V-001, V-004 |

## Open dependency and deferred work

- **Asset binding resolved:** the user imported `rpg-maker/The Dryland Drowned/img/pictures/Reed final.png`. Use native name `Reed final`, preserving the supplied spelling and bytes. This does not authorize replacement art.
- **Young asset resolved:** user supplied `Reed-novo.png` and authorized paired busts with active-speaker emphasis.
- **Out of scope:** the specific tradition remains unwritten; the playable script mentions it without a placeholder line.

## Delivery and devlog

The [task graph](tasks.md) records the implementation and QA handoff. The older-Rheed asset import is resolved by the user-supplied `Reed final.png`. Demonstrable devlog moment: older Rheed introduces the expedition, the scene switches to young Rheed and Ivaí facing the conversation from opposite sides, emphasis follows their lines, and preparation opens. Suggested capture: the question and final answer, followed by the existing tavern. Recording silence requires an audio-capable capture, not a screenshot.


## Approved refinement — tavern background

After testing in both RPG Maker MZ and Chrome, the user reported that the prologue appears to match the request and asked for the tavern behind Ivaí and young Rheed. This authorizes the existing `Dryland_Taverna` image in N04–N06, with black retained for N01–N03. Only the native background command changes; text, busts, silence, checkpoints and transfer stay intact. This is a refinement of the active task-03 delivery; the numbered GDD v5.0 remains historical. Previous human feedback covers the prior presentation, not this new background.


## Approved refinement — paired busts

User supplied `Reed-novo.png` and requested both young Rheed and Ivaí on opposite sides, slightly enlarging whoever speaks. N04–N06 use young Rheed left / Ivaí right, with a 1.1 speaking/listening scale ratio and instant updates (no animation). Existing text, tavern backdrop, silence and transfer remain intact. Both pictures and attachments are removed before preparation. This supersedes the text-only fallback and single-visible-bust restriction for the direct dialogue.


## Scope boundary after paired-bust review

The user explicitly deferred bust fitting against the dialogue box and the background image for older Rheed’s lines. Both are known future refinements, outside this update. Preserve the current composition; no final fit or replacement background has been selected. The canonical GDD section 27.4 owns this product decision. This does not mark the refinements as implemented.


## Final supported-save scope

The user explicitly selected new games and saves produced by this version for this update. Compatibility with earlier saves is outside scope and remains unverified; no migration, deletion or new checkpoint is introduced. Final execution and acceptance are recorded in verification.md.
