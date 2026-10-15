# Dedicated credits map

Confirmed by the user's request on 2026-10-14: credits belong to a separate native MZ map. This increment replaces the terminal routing to Map028 and CE61/63 presentation ownership from the completed `eventbridge-minimal-runtime` baseline.

Map046 (`Créditos`) owns an autorun event with the skip binding, native speed-2 scrolling text, cleanup and single return to title. CE40 routes `campaign_complete` to Map046. CE61 remains a transfer entry; CE63 is reserved without renumbering other Common Events. Preserve existing attribution, localization keys, acceleration, keyboard/mouse skip, campaign facts and terminal autosave.

Confirmed follow-up on 2026-10-14: use the existing Reed parchment artwork and a native transparent scroll clipped inside the paper. The user replaced Map046's list with a CreditsPage menu command between implementation turns; replace that command with the native roll and disable CreditsPage without editing the vendor plugin. `Dryland_2_CreditsScroll` extends the native rectangle only on the tagged credits map, after Coreto MessageCore and Dryland Presentation. The same artwork is copied from titles1 to pictures for native event authorship. No new dependencies or changes to engine/Coreto/vendor sources.

Confirmed presentation refinement on 2026-10-14: fade the scrolling text gradually at the viewport's top and bottom. Apply a smooth alpha gradient over 40 pixels per edge at the baseline resolution, scaling with the viewport. Keep the parchment and transparent background visible; retain the native roll and input behavior.

Devlog demonstration: open Map046, event `Créditos — apresentação`, and show the authored roll followed by the title. Suggested capture: a short clip of text entering and leaving the parchment, with the skip button on Map046.

Verification: inspect structural changes and run available focused validation. Runtime checks must use public player actions; do not inject campaign state or reuse external saves. Natural completion, skipping, and terminal Continue require a new directed journey before claiming runtime verification.
