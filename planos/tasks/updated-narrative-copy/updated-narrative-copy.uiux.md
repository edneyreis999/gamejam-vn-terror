---
status: approved
approved_on: 2026-09-25
owner: UI/UX
---

# Direct conversations and readable source text

Owns RQ-001–008's visible presentation in [spec.md](spec.md). Preserve current native composition, fonts, four-row message window, MessageCore word wrap and 32 px end padding. The accepted [continuous dungeon reading](../dungeon-dialogue-reading/spec.md) is the baseline, not a mandate to fit a fixed number of pages after new prose.

## Conversation and consequence boundaries

- Conversar opens with Ivaí's source question. Keep the selected hero on the left in their existing dedicated-map/menu composition; introduce Ivaí on the right for his first line. No empty profile pause or obsolete profile-to-dialogue transition.
- Both participants remain during the six source utterances. Follow authored speaker names with the correct focus; consecutive same-speaker paragraphs do not restart entrance or accumulate scaling. On return to the hero menu, Ivaí exits and the hero retains the established menu presence. Full exit occurs on return to the tavern, following ADR-G001.
- Successful-selection and full-party replies remain one-hero feedback after their respective result. No gratuitous second portrait or party mutation.
- Trap descriptions, successes and contextual death remain anonymous, over the current background. Three approach panels and upper reread/retreat controls keep their current layout and behavior.
- Farewell uses the committed victim's portrait and exits before contextual narration. Council opinions keep eligible listeners and Ivaí, with the speaking hero focused through both paragraphs; no extra roster introduction or repeated intervention.
- Memorial causes use current caption surfaces with their public location, not a dialogue window or new tooltip.

## Text fit

Preserve complete source sentences and paragraph order. Use the current word wrap for prose, retain whole paragraphs when they fit, and split only at readable sentence boundaries when actual rendering requires it. Never merge across speaker, reading identity, action, animation, choice or checkpoint. No automatic scroll/advance, silent abbreviation, ellipsis, new global font reduction or window enlargement.

Approach picture labels have their own authored line breaks and `FS[22]` formatting. Keep hidden native choice text and visible picture text equivalent. Inspect all 16 choice screens / 48 labels at 1280×720 effective game area, standard zoom. Text length counts alone do not certify fit.

For narrative layout, inspect all eight presentation/selection/full-party flows, the longest source paragraphs by rendered size (including Seraphina/Vaelith presentation candidates), a long source description/success/death, both opinion paragraphs of a present hero, Gorvak's updated farewell, and both longer memorial inscriptions. The [verification contract](verification.md) states how directed journeys and representative coverage combine. Document every viewed item and every unviewed item covered only statically.

Use 1280×720 as the primary complete pass and 1920×1080 for a focused shared-renderer check: direct opening, long paragraph, three-choice screen, Council opinion and memorial. Do not repeat the entire catalogue at the larger size. Normal motion is the primary pass; reduced motion gets a targeted direct-conversation/focus check because the removed preamble previously contained native preparation commands.

## Controls and acceptance

Verify one representative direct conversation through keyboard, HIDE/restore, Options/return and repeat reading with existing FAST permission. Cover mouse for hero selection/full-party feedback and one approach/victim interaction. No full input-device Cartesian matrix. Message acknowledgement cannot leak into selection; conversing/cancelling does not alter the party.

Human review of reading comfort remains distinct from source acceptance and agent-observed fit. The current artwork/audio is neither replaced nor certified by this increment. Do not promise new screen-reader or platform support. Gamepad/native zoom are excluded by project ADRs.

The [spec's demonstrable moment](spec.md#demonstrable-moment) owns devlog selection; captures must show the real integrated game and reviewed text.
