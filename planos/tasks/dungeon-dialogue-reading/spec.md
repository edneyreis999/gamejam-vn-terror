# Continuous dungeon dialogue reading

## Authority and scope

The user played and accepted the two-page A description layout, then requested the same technique for all dialogue within the three dungeons. The conditional grill-me request was honored by inspecting code before asking one scope question. The recommended interpretation includes entrances, all encounter prose, sacrifice/farewell/death, route conclusions, Council and final consequences; excludes prologue, tavern conversations and epilogues. No response was required for this optional boundary clarification; implementation proceeds with that stated interpretation. A later user correction overrides it.

This increment extends [the accepted A layout](../trap-a-description-reading/spec.md) without rewriting its historical tests. Text remains PT-BR and unchanged. MessageCore's existing word wrap, four-row window, font, player-controlled advancement and native event ownership remain unchanged. No plugin-source, engine, dependency, save-schema, art or audio changes. The user subsequently approved changing only MessageCore’s Word Wrap → End Padding parameter from 0 to 32 px globally to reserve space for the inline advance indicator; line wrapping outside the dungeon prose can consequently change.

## Presentation

Descriptions: setting paragraph, then threat plus question on a new line (two pages). Successes and death contexts: one complete paragraph. Other spoken/narrated passages: remove manual width-based line breaks and merge adjacent message boxes of the same speaker within the same uninterrupted reading block when they fit. Never cross a speaker/header change, action, animation, reading identity, choice or checkpoint. Preserve short lines, warnings, farewell/victim-selection ordering and scene transitions. Source words, punctuation, control-flow commands and IDs are exact invariants.

Native targets: Map007–022 descriptions/results; Common Events 263–290,292–302,352–353; Council Map023 and final consequences Map025–027. Targets already in the desired form receive no edit. Sacrifice warning CE42 remains separate and unchanged. Map004/005/006 are dispatch surfaces without prose. All other native data are out of scope.

## Verification selection

Static: reproduce the immediately preceding integrated baseline, transform only approved message runs, compare entire parsed objects, and verify normalized wording per run. Save a baseline-relative report with counts/hashes. Layout changes use actual browser screenshots, not source length as proof.

Directed Chrome 1280×720 journey, fresh own campaign: all 16 descriptions, one success per encounter including longest B3-3 when successful, one representative failure→victim→farewell→death sequence, both route closures, Council and a final consequence. Reread and reopen/Continue a self-produced checkpoint. Observe page content, absence of overflow, choice boundary and speaker/scene separation. Public keyboard input only; no injected campaign/seed. Inspect all captured changed passages.

G006 grouping: one complete campaign exercises the shared renderer and changed native owners. Static equality protects choice and outcome rules. Remaining success/death variants share the same four-row, font-26, no-bust paragraph format; inspect the longest success and a death representative, with shorter variants covered by independent font-width measurements and static exact-content checks. Unvisited final outcomes use the same no-bust window and shorter text; retain their unchanged reading/event boundaries and verify all authored text statically. Extra resolutions, input-device matrices, audio and reduced-motion repeats are omitted for unchanged corresponding code/assets/geometry; any fit, progression or save defect reopens affected cases. Gamepad/native zoom excluded by G005/G003. No new unit tests that mirror the transformation.

Human acceptance of A pacing is retained; the user also tested and accepted the expanded material on 2026-09-23 (recorded in verification.md). Record exactly which branches were viewed; do not label unvisited variants executed. Close owned isolated QA; preserve the user's browser/manual server. No automatic commit or publication.

## Demonstrable moment

A complete success/death paragraph and a compact route-closing monologue, in the existing message window. Keep selected real captures for review; final delivery-media organization follows acceptance.
