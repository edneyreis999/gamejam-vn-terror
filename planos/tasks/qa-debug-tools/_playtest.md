# Playtest: QA Debug Tools

Build: ______  Tester: ______  Date: ______

## Setup

Enable **Dryland_7_QADebug** in the Plugin Manager (or, for an agent, in its own prepared runtime copy; never in the authored game). Start with `npm start` after reading `docs/_memory/local-game-run.md`, in current stable desktop Chrome. Start from New Game, without depending on earlier saves (SD-015 as amended by this spec's ADR).

## Functional Checks

### PT-001 — Debug appears and the panel reads the campaign (US-001.AC-1, US-005)

Steps:
1. New Game, pass the prologue, reach the tavern, open ☰.
2. Choose Debug.

Expected: Debug is listed. The panel shows seed, phase, route/position, party, dead heroes, completed routes and hint status, in the current language, and Cancel returns to the menu.

Result: [ ] Pass [ ] Fail
Notes:

### PT-002 — Disabled plugin restores the default game (US-001.AC-2)

Steps: disable the plugin, reload, New Game, reach the tavern, open ☰, enter one trap.

Expected: no Debug command and no approach marks; the menu and flow are as in the default game.

Result: [ ] Pass [ ] Fail
Notes:

### PT-003 — Go to A1, cancel and confirm (US-002.AC-1–5, US-002.EC-1)

Steps:
1. Debug → Go to trap → A1 → Cancel. Check that the panel is unchanged.
2. Go to trap → A1 → Confirm. Note the seed.
3. Reload the page and choose Continue.
4. Go to trap → A1 → Confirm again.

Expected: (1) nothing changes. (2) The Bottled Saci trap opens as the first church encounter with a party of three, and the panel shows the seed. (3) Continue resumes at the Saci opening. (4) The same seed.

Result: [ ] Pass [ ] Fail
Notes:

### PT-004 — Jump from mid-campaign and a B trap (US-002.AC-2, US-002.EC-2)

Steps: during a campaign at camp or in a conversation, open Debug where the menu is reachable → Go to trap → B5 → Confirm.

Expected: the new campaign replaces the old one and opens on B5 as the first park encounter.

Result: [ ] Pass [ ] Fail
Notes:

### PT-005 — A jump's save without the plugin (US-001.EC-1)

Steps: after PT-003, disable the plugin, reload, Continue, and play one approach.

Expected: the campaign loads and plays normally.

Result: [ ] Pass [ ] Fail
Notes:

### PT-006 — Winning-approach hint (US-004, US-001.EC-2, US-002.EC-4)

Steps:
1. Turn the hint on. Go to trap → A1 → Confirm.
2. At the approach choice, compare the marks with the outcome of a marked choice.
3. Reload; check the hint is still on. Find an encounter where no approach wins, or choose an unmarked approach.
4. Disable the plugin, reload; then enable it again.

Expected: (2) marks in the NEW style on the winning approaches, and the marked choice succeeds. (3) Still on. "None succeeds" appears when no approach wins, and an unmarked choice fails into the normal sacrifice flow. (4) No marks while disabled; the hint is on again after re-enabling.

Result: [ ] Pass [ ] Fail
Notes:

### PT-007 — Scenarios (US-003.AC-1, AC-3 Total loss, AC-4, EC-1–2)

Steps: for Final route unlocked and Ending: Total loss, Debug → Scenarios → choose → Confirm, then reload and Continue. Repeat one of them and compare seeds. (Council, Reunite and Destroy are not checked here by the user's lighter-verification decision of 2026-10-31.)

Expected: the tavern formation with the final route available; the start of Total loss with all eight heroes dead through real sacrifices. Continue resumes at the same point. The repeated scenario shows the same seed.

Result: [ ] Pass [ ] Fail
Notes:

### PT-008 — Agent session provenance (US-007)

Steps: an agent persona session (`game-execute-qa`) starts from Go to trap → A1 and from one scenario.

Expected: the session record names the jump or scenario and the seed. The plugin is enabled only in the agent's prepared runtime, the authored `js/plugins.js` is unchanged, and evidence from after the jump is labeled as such.

Result: [ ] Pass [ ] Fail
Notes:

## Experience Hypotheses

### PH-001 — Time to reach a trap

Steps: from the title screen, reach the Saci trap with Debug.
Observe: can the QA tester reach any trap in under a minute without help?

Answer: [ ] Yes [ ] Partly [ ] No
Notes:

## Verdict

[ ] Accept  [ ] Adjust (list below)  [ ] Reject
Adjustments:
