# RPG Maker MZ Input to Task Planning

Use while decomposing an MZ spec into tasks. Each section supplies MZ facts to one decision of the general planning procedure; it neither replaces that procedure nor adds sections to the task files.

## Shared files

MZ keeps many authoring units in one file, so tasks that look independent write the same file:

- `data/CommonEvents.json` holds every Common Event; `data/System.json` holds switch and variable names, terms, the start position, and system settings; `data/MapInfos.json` holds the map tree.
- Each `data/MapNNN.json` holds every event of one map.
- Each database file (`Actors.json`, `Items.json`, `Troops.json`, `Tilesets.json`, and the others) holds every entry of its kind.
- `js/plugins.js` holds every plugin entry, its order, and its parameters.

Order tasks that write the same file. Database entries, switches, variables, Common Events, and maps are addressed by their position in these files: allocate new IDs from the current checkout when the task runs, never fix them in the plan.

## Data consumers

The editor reads every data file the game reads, so it is a consumer of every data change: a task that changes the structure of a data file names the editor list or screen that must still open and show it. An open editor overwrites external writes when it saves; a task that writes data says to close the editor first and reopen it afterward.

## Content scope

Trace what the player sees back to every place that writes it before scoping a content task: Show Text, Show Choices, Show Scrolling Text, database names, descriptions, and messages, terms in `System.json`, map display names, plugin command arguments and parameters, and variables set by Control Variables and shown through `\V[n]`. Scoping by a list of event command codes misses the writers outside it.

## Code

Every task that changes a project plugin or any other custom code boots the game to the title screen with an empty console in each runtime the delivery targets, including the editor's Playtest and its older Chromium. The task that owns the spec's boot check proves it there; every other such task repeats the boot as an inline case. The boot in the editor's NW.js is never excluded or waived for such a task. The cheap per-task sensors are the runtime-compat check (`scripts/check-runtime-compat/`), and, when the task writes data, the native-data and event-list checks; the [runtime](runtime.md) and [data](data.md) references say how to run them.

A task that adds a project plugin also adds its `js/plugins.js` entry, with its load order and parameters.

## CLI documentation delivery

For tasks that create or change public CLI descriptions, include in `Done When`: the independently defined affected scope (including containers and delegations), the filled CP-01–20 author record, a passing current-description check, and its receipt cited in the task. Read the [CLI documentation checklist](cli-documentation-checklist.md) in full for that deliverable. Assign a missing project integration to the first consuming task; later tasks reuse the maintained command. The independent-evaluation preparation task repeats the check against the descriptions it will hand over. In an existing graph, adjust only future affected tasks; completed tasks retain their historical status.

## Automated runtime checks

Assign missing infrastructure to its first consumer as described by `game-create-game-tasks`, using [game-test-infrastructure](../../game-test-infrastructure/SKILL.md) during authorized execution. Read [runtime test execution](runtime-test-execution.md) for MZ preparation constraints: distinguish browser storage from Playtest saves, identify shared plugin builds/catalogues, and preserve dependencies between fixture producers and consumers before assigning concurrent work. Later tasks reuse the project command and root slow-test limits.

## Graph tail

- For persona-session missions and their assigned observations, read [MZ QA sessions](qa-sessions.md). Keep these engine facts with the general mission supplied by the QA plan; browser recipes and internal-state checks alone do not establish dogfooding.
- The game runs in the editor's Playtest (NW.js), in a browser through a local server, and as exported builds. A journey names the runtime it runs in.
- Saves do not cross runtimes. Playtest writes `save/fileN.rmmzsave` beside the project files; a browser keeps saves in IndexedDB for its origin, keyed by the project's `gameId`. Prepare a starting-state save in the runtime that will load it.
- Reach a starting state with a save or with exact steps from New Game. Never change the start position in `System.json` to reach one; if a session needs it changed, restore it before the change is committed.
