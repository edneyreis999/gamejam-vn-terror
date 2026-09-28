# Interface G007 refinement

Status: implementation authorized by the user request on 2026-09-28.

This increment preserves the prototype-feedback-refinement baseline and applies ADR-G007 to the age gate and tavern controls. The user explicitly authorizes reorganizing Quadro, Configurações and Salvar campanha atual behind a top-right hamburger. Their original event actions remain authoritative. Hero artwork transforms and Seguir's position must remain byte-equivalent in authored data.

The age gate keeps its original native choice list, now visible and drawing its own acknowledgement state and actions; remove its picture-button bindings and visuals. Hero labels/Seguir remain spatial controls under ADR-G007's exception: MessageCore's existing text window replaces their old plate renderer, with PictureChoices retaining sole input ownership. The hamburger action list uses Window_ChoiceList with one active input owner. Close through Escape or an explicit close action; restore focus to the hamburger. Its narrow right-hand column keeps all hero targets clear.

Reuse the actual dialogue ink configuration for title, name boxes and reading-console text. Remove the message pause ornament centrally without altering message pause/advancement. No engine/vendor/Coreto source changes, new dependency, campaign state migration, or duplicate controls.

Scene: a desktop player reads a quiet horror story and prepares a party on the illustrated tavern; controls must remain legible without displacing the art. Product register, visual variance 2, motion 1, density 5; Window.png and native MZ typography are the visual authority. Existing engine keyboard navigation takes precedence over web-specific widget conventions.

## Expected result

Verify all thirteen user criteria through authored-data comparisons and a fresh Chrome campaign: title → age gate (unchecked/checked/cancel/disabled) → new file → dialogue advancement/Hide/Options → tavern → menu open/close → each original action → hero interaction → eligible Seguir. Inspect actual screenshots, focus, target geometry, absence of duplicate controls and pause ornament, and exact ink equality. Test keyboard and pointer; gamepad/zoom tests are excluded by G005/G003. Use one representative desktop journey under G006 and retain distinct functional risks. Preserve preexisting changes and sessions; close owned test resources.

## Devlog

Demonstrate the original hero composition with the hamburger closed, then open it and access Quadro before returning to the same formation. Suggested captures: age gate checked, dialogue with name/console, tavern closed and open menu.

## Verification

Implemented and technically verified. See [verification.md](verification.md) for the thirteen criteria, inspected real-game captures, test scope, candidate audit and confirmed cleanup. Human artistic acceptance remains separate.
