---
status: draft
owner: UI/UX
---

# UI/UX contract

Owns RQ-003/007/008/009. The player pauses with a reduced party in a horror scene, often immediately after choosing a death; the interface helps discover optional company without turning grief into a task list. Product register; visual variance 2, motion intensity 1, information density 3. Use existing game fonts, panels, focus and typography; no separate design system or global recalibration.

## Camp and hero navigation

At the camp, clickable living party portraits plus Continue / Continuar and Return to tavern / Voltar à taverna. Normal progression is available after the short arrival sequence; do not require optional conversations. Stable hero order H1–H8, skipping ineligible heroes; keyboard/mouse access uses existing PictureChoices. Return from a hero restores that hero's eligible focus, not the arrival sequence.

The camp hero menu contains Talk / Conversar for this pause and Back / Voltar. The tavern hero menu preserves Talk, Select/Remove and Back, inserting up to two About <name> / Sobre <nome> subjects between Talk and formation action, in canonical companion order. Keep repeatable subjects after reading. Dead companions are subject names, not selectable actors.

## Novelty

Owner-approved refinement (2026-10-16): show a native nameplate above each participating hero in both tavern and camp. Latest approved follow-up: use IconSet index 04 (white ellipsis balloon) at native 32×32, centered 4 px above the plate while unread content is available. Restore centered names at their original 18 px, preserving the selection check. This supersedes the earlier inside-plate outline; the lower New conversation help remains removed. No new character art, counter, pulse or tooltip-only discovery; the icon shape distinguishes novelty from selection without requiring color or mouse hover.

Inside the visible hero choice window, draw localized NEW! / NOVO! as a separate static label in reserved space at the right of the option. Use the existing UI font and semantic highlight color from the active windowskin, with adequate contrast and outline. Reserve enough width for the label in both languages instead of shrinking all text. The base option string remains its localization key and is not concatenated with the badge. The label is not an independent click target.

A new eligible interjection or tavern contextual bridge also makes a topic unread. A menu-open action does not clear labels. Update on completed-topic return, language changes and scene refresh. HIDE hides indicators and labels with the interface; restore without consuming text or clicking through.

## Presentation states

| State | Expected |
| --- | --- |
| Available/unread | Nameplate icon and relevant topic label |
| Available/read | Repeatable topic without NEW; nameplate icon only for another unread topic |
| Unavailable | No topic or nameplate novelty for it |
| Focused/selected for expedition | Preserve separate focus/selection feedback alongside novelty |
| Reading | Native message flow; no accidental following choice |
| New game | Fresh read history for that campaign |
| Candidate Continue | Restored completed units and appropriate markers |
| No optional unread content | Continue/retreat remain normal; no completion checklist |

Keep existing text controls and FAST permission; a composed topic containing a new segment is not wholly FAST-eligible. Use segment boundaries to allow only previously completed content, without exposing internal IDs. No new UI for unsupported old saves; document new-campaign requirement in release notes.

Visual review: 1280×720 in PT/EN, one 1920×1080 representative, keyboard and mouse, Options/HIDE, long About names, both a three-living/five-dead composition and a one-living/seven-dead composition during the brief entry. No pixel/layout assertions in the persistent test suite. Pati/user decides visual fit; no approval claimed here.
