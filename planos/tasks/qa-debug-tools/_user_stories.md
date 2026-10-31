# User Stories: QA Debug Tools

Canonical behavior catalog for the QA Debug Tools increment. Companion to `_spec.md`.

## Personas

- **QA tester**: a person who plays the game to find defects. They need to reach a specific trap, a route or an ending in seconds instead of replaying the campaign until luck cooperates.
- **QA agent**: an automated persona or test session that navigates the game for evidence. The user decided on 2026-10-31 that it may use the same jumps.
- **Owner**: Edney, who builds and publishes the game. They need to know that the published build is the default game unless they deliberately decide otherwise.

## Story Index

| ID     | Feature Area      | Persona    | Story |
| ------ | ----------------- | ---------- | ----- |
| US-001 | Activation        | Owner      | Turning the plugin on adds Debug; turning it off restores the default game |
| US-002 | Jump to trap      | QA tester  | Start a campaign that opens directly on a chosen trap |
| US-003 | Named scenarios   | QA tester  | Start a campaign at the final route, the Council or a chosen ending |
| US-004 | Winning approach  | QA tester  | See which approach succeeds with the current party |
| US-005 | State panel       | QA tester  | Read the campaign facts needed for a bug report |
| US-006 | Build gate        | Owner      | Be asked before a build ships with Debug enabled |
| US-007 | Agent navigation  | QA agent   | Reach the same starting points with recorded provenance |

## Activation

### US-001: Debug exists only while the plugin is enabled

**As the** owner, **I want** Debug to depend only on the plugin being enabled, **so that** disabling the plugin restores the default game without a separate test build.

Acceptance criteria:

- AC-1: Given the plugin enabled in the Plugin Manager, when the QA tester opens the in-game menu, then a Debug command appears.
- AC-2: Given the plugin disabled, when anyone opens the in-game menu, then no Debug command appears and the menu, flow and campaign behave exactly as in the default game.
- AC-3: Given the source project as delivered, then the plugin is disabled by default; the QA tester enables it when needed.

Edge cases:

- EC-1: A save created after a jump is loaded with the plugin disabled → it loads and plays like any normal campaign, because jumps only produce states a player could reach.
- EC-2: The winning-approach hint was left on and the plugin is then disabled → no hint appears; enabling the plugin again restores the remembered setting.

## Jump to trap

### US-002: Open a campaign directly on a chosen trap

**As a** QA tester, **I want** to choose any trap from A1–A8 or B1–B8 and land on it, **so that** I can test that trap's map (for example A1, the Bottled Saci) without replaying until it is drawn.

Acceptance criteria:

- AC-1: Given Debug open, when the tester chooses "Go to trap" and a trap, then the game asks for confirmation that the current campaign will be replaced.
- AC-2: Given the confirmation, when the jump completes, then a new campaign is showing the opening of the chosen trap as the first encounter of its own initial route (A traps on the church route, B traps on the park route), with an automatically formed party of three.
- AC-3: Given the jump completed, then the campaign is saved at that encounter's normal save point, and Continue after a reload resumes there.
- AC-4: Given the same trap requested twice, then both jumps use the same seed and reveal the same trap.
- AC-5: Given the jump completed, then the state panel shows the seed the jump used.

Edge cases:

- EC-1: The tester cancels the confirmation → nothing changes; the current campaign and its save remain.
- EC-2: A jump is requested while a campaign is mid-route, at camp or in a conversation → after confirmation the new campaign replaces it, as New Game would.
- EC-3: The tester later travels to the other initial route → its traps follow from the same seed as in a normal campaign; nothing else about the draw is forced.
- EC-4: The chosen trap fails with the automatic party → the normal failure and sacrifice flow follows; nothing is forced.

## Named scenarios

### US-003: Start at a later point of the campaign

**As a** QA tester, **I want** a list of named starting points, **so that** I can test the final route, the Council and every ending without replaying the campaign.

Acceptance criteria:

- AC-1: Given Debug open, when the tester chooses "Final route unlocked", then after confirmation a new campaign shows the tavern formation with both initial routes completed and the final route available.
- AC-2: When the tester chooses "Council", then after confirmation a new campaign shows the Council before the final choice.
- AC-3: When the tester chooses an ending (Reunite, Destroy or Total loss), then after confirmation a new campaign shows the beginning of that ending.
- AC-4: Given any scenario completed, then the campaign is saved at that point's normal save point, its history contains only actions a player could take, and the state panel shows its seed.

Edge cases:

- EC-1: Total loss requires every hero to die → the scenario reaches it only through real failures and sacrifices, never by removing heroes.
- EC-2: The same scenario requested twice → the same campaign path and seed both times.

## Winning approach

### US-004: Know which approach succeeds

**As a** QA tester, **I want** an on/off hint that marks the approach that succeeds with my current party, **so that** I can steer toward success or failure on purpose.

Acceptance criteria:

- AC-1: Given the hint on, when an encounter's approach choice is shown, then each approach that succeeds with the current party is marked.
- AC-2: Given the hint off, then the approach choice looks exactly like the default game.
- AC-3: Given the hint turned on, when the game is reloaded or restarted, then it stays on until the tester turns it off.

Edge cases:

- EC-1: No approach succeeds with the current party → the hint says that none succeeds.
- EC-2: Showing the hint never chooses an approach or changes the outcome; the player's choice alone decides.

## State panel

### US-005: Read the facts for a bug report

**As a** QA tester, **I want** a panel with the current campaign facts, **so that** my report lets anyone reproduce the state.

Acceptance criteria:

- AC-1: Given Debug open, then the panel shows the seed, current phase, route and position, party, dead heroes, completed routes and whether the hint is on.
- AC-2: Given no campaign started, then the panel says so instead of showing empty values.

## Build gate

### US-006: Decide before shipping Debug

**As the** owner, **I want** the post-build step to stop me when the exported build has Debug enabled, **so that** a test build never ships by accident.

Acceptance criteria:

- AC-1: Given an exported build with the plugin enabled, when the post-build step runs interactively, then it asks whether the build should keep Debug.
- AC-2: Given the answer "no", then the build's copy disables the plugin and the plugin file leaves the build; the source project is never changed.
- AC-3: Given the answer "yes", then the build keeps Debug and the build verification reports that Debug is enabled.
- AC-4: Given a non-interactive run, then Debug is disabled in the build unless the run explicitly allows it.

Edge cases:

- EC-1: The exported build has the plugin disabled or absent → no question; the step continues as today.

## Agent navigation

### US-007: Agents reuse the jumps

**As a** QA agent, **I want** the same jumps and scenarios, **so that** I start a session at the needed point without replaying.

Acceptance criteria:

- AC-1: Given a session that started from a jump or scenario, then its evidence records which one and the seed.
- AC-2: Given the plugin is disabled in the source project, then an agent session enables it only in its own prepared runtime, never in the authored game.

Edge cases:

- EC-1: Evidence that depends on the jump itself (save, death, progress) states that it came from a jump, so it is never presented as a full manual playthrough.
