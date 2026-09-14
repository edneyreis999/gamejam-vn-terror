---
status: approved
owner: UI/UX
---

# UI and reader interaction contract

This contract owns RQ-006, RQ-010–RQ-012 and RQ-016–RQ-017 in the [spec](spec.md). Pati owns visual/interaction direction; user approval of this contract does not substitute for later observation of the implemented controls.

## Author-facing surface

The tavern map exposes hero conversations, Destinos, Elenco and interface configuration. Encounter maps expose their headings, reread/retreat controls, three approaches and sacrifice composition. The memorial map exposes its layout. Events own labels, fonts, positions, images, focus brightness, disabled appearance and timings. Preserve current values as initial migration defaults; no hidden JavaScript constants may remain the only way to edit these choices.

Shared Common Events are acceptable when the relevant map visibly calls them. Avoid a replacement giant plugin-parameter form containing the entire game. Public identity fields live in Configuração do jogo; event, image and map references live in their native call/presentation/transfer selectors, without a second Bridge configuration entry. Choosing Conversar runs a direct native Common Event call in the authored interaction path. Native variable/switch fields carry dynamic data where needed.

## Player interaction

- Preserve hero positions, eligibility, selected-state distinction, visible focus and existing keyboard order. Hover/focus does not select a hero or open a conversation. Closing a menu restores eligible focus.
- Conversar and Rever descrição remain observational. Full-party feedback stays in the hero's native dialogue. No extra sacrifice confirmation is added.
- HIDE continues through MessageVisibility and its native events. Hide additional panels through explicit authored bindings, preserve their prior appearance, and restore without advancing or choosing. No invisible controls remain active. Options remains available.
- Preserve system reduced-motion behavior through presentation/event alternatives. It changes timing and movement, not text, results or available choices.
- One physical gesture belongs to one interaction. Confirming a message cannot also choose an approach or sacrifice. The implementation must coexist with provider FAST without preventing accelerated reading or consuming a later deliberate input.
- Offer FAST for already-read units, selectable by the player. Remove the AUTO button under [ADR-004](adrs/adr-004.md). Disable FAST before unread text/choices and reset eligibility when loading another campaign. Keep HIDE/Options usable when FAST is unavailable. Remove the project's separate Pular texto button and S shortcut.
- Keep no free avatar movement and no RPG inventory/status menu. The native menu flag is configured through the startup Common Event; these restrictions do not disable Options, save-file choice or keyboard navigation of VN choices.

## Campaign files

Use SaveCore's dedicated-file selection for New Game and file list for Continue. Use the approved initial 20 selectable files as the vendor's editable default; do not hardcode that number in Bridge. Cancelling selection returns normally. SaveCore handles selecting an occupied file and any provider confirmation. A current campaign's automatic saves never overwrite another campaign's file. Do not expose a manual-save/rewind control.

## Credits

Show native rolling text at speed 2. Native acceleration is permitted, including held confirmation/Shift and the engine's existing touch behavior. Support for the existing touch path is not a new mobile-platform promise. Preserve Pular créditos for keyboard/mouse and a clean single return to title. Natural completion waits for the final credit line to leave the roll. Do not introduce Extended Message's ordinary-message console as an unverified scrolling-window feature.

Desktop baseline remains an effective game area of at least 1280×720; use 1920×1080 as an additional visual reference. Confirm legibility and focus in the real game. Layout/effect equivalence and authorability require the visual/editor sensors in [verification](verification.md), not only numeric assertions.
