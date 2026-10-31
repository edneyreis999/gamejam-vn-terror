# UI/UX: QA Debug Tools

Surfaces this increment touches. All of them exist only while the plugin is enabled; with the plugin disabled, every surface is exactly as in the default game (US-001.AC-2). Companions: `_spec.md` Part I, `_user_stories.md`.

## Surface Map

| #  | Surface                     | Kind   | Change                                                | Stories |
| -- | --------------------------- | ------ | ----------------------------------------------------- | ------- |
| S1 | In-game menu                | modify | Adds a Debug command while the plugin is enabled      | US-001  |
| S2 | Debug screen                | new    | State panel, Go to trap, Scenarios, hint toggle       | US-002, US-003, US-004, US-005 |
| S3 | Replacement confirmation    | new    | Confirms that a jump replaces the current campaign    | US-002, US-003 |
| S4 | Approach choice (encounter) | modify | Winning-approach mark while the hint is on            | US-004  |

### S1. In-game menu

- **Today**: the native menu opens from the tavern's ☰ choice (Common Event 3, called by Map003). According to the user (2026-10-31), a Coreto plugin also opens Settings during conversations. That second route is not verified here (see `_spec.md` Known Risks).
- **Change**: a Debug command appears in the command list while the plugin is enabled.
- **States**: plugin enabled → Debug visible (US-001.AC-1); plugin disabled → absent (US-001.AC-2).
- **Controls**: the menu's existing controls.

### S2. Debug screen

- **Change**: a new screen with four parts, in this order:
  1. **State panel** (US-005): seed, phase, route and position, party, dead heroes, completed routes, hint on/off. Without a campaign it shows "no campaign started" (US-005.AC-2).
  2. **Go to trap** (US-002): A1–A8 and B1–B8, each with its localized trap name and its ID (for example "A1 — The Bottled Saci's Cyclone").
  3. **Scenarios** (US-003): Final route unlocked, Council, Ending: Reunite, Ending: Destroy, Ending: Total loss.
  4. **Winning-approach hint** (US-004): on/off.
- **States**: the panel with a campaign and without one; the list focused; a jump in progress (input blocked until it lands); the hint on and off.
- **Controls**: the game's existing menu controls (arrows/confirm/cancel, mouse). Cancel returns to the menu.
- **Text**: every label comes from `Languages.tsv` under `debug.*` keys, PT and EN (user decision, 2026-10-31). Internal IDs appear only on this screen.
- **Visual reference**: none. It reuses the game's existing window style.

### S3. Replacement confirmation

- **Change**: before any jump or scenario: "This replaces the current campaign. Continue?" with Confirm and Cancel.
- **States**: Confirm → jump runs and lands (US-002.AC-2, US-003.AC-1–3); Cancel → back to the Debug screen with nothing changed (US-002.EC-1).

### S4. Approach choice in an encounter

- **Today**: approach cards (`Dryland_ApproachPaper`) with native choices. Unread conversation choices carry the NEW label (`ui.social.new`, drawn by `Dryland_2_ConversationIndicators.js`).
- **Change**: with the hint on, each approach that succeeds with the current party carries a label in the same style as NEW (user decision, 2026-10-31), with its own localized text. If none succeeds, a "none succeeds" label appears once on the choice (US-004.EC-1).
- **States**: hint off → unchanged (US-004.AC-2); hint on with one or more winners → those marked (US-004.AC-1); hint on with no winner → "none succeeds" shown (US-004.EC-1).
- **Controls**: unchanged; the mark never selects or confirms (US-004.EC-2).
