# RPG Maker MZ Input to Specs

Use while interviewing for, writing, or reviewing a spec for an MZ game. Each section supplies MZ facts to one decision of the general spec procedure; it neither replaces that procedure nor adds sections to the spec. Turn a fact into a question or an acceptance outcome, never into an implementation recipe: the spec says "the introduction plays once and does not repeat on re-entry", not which switch or command achieves it.

## Capability evidence

Establish what the project already supports before proposing anything:

- **Native**: event commands, database fields and notes, system settings, and editor features.
- **Installed plugins**: the plugin's entry in `js/plugins.js` (status, order, configured parameters) and its file header (`@param`, `@command`, `@arg`, help text). A header describes what a plugin offers; only an active entry with suitable parameters delivers it in this game.

Cite the file or entry that proves each capability. A capability no evidence confirms stays an unknown in the spec.

## Custom code

Custom code has the meaning given in this skill's body. Native event composition is not custom code, but it still accumulates maintenance; say so when an event design grows large.

Flag these as custom-plugin candidates in the capability-gap comparison, with the responsibility each would add. The user decides whether to explore custom code.

- Logic used in several places that has no visual layer.
- A game state machine: a quest, campaign, or system whose states and transitions events would otherwise rebuild from switches and branches.

When the user opens custom code, the spec records for each project plugin:

- **Designer controls** where a design decision exists: Plugin Manager parameters, plugin commands usable in events, or both. An internal adapter with nothing to configure has none; never add placeholder parameters.
- **Public API**: the plugin commands events use to query and change its state. A query writes its result to a switch or variable the command names, so events branch with an ordinary Conditional Branch instead of a script.
- **On/off**: turning the plugin off in the Plugin Manager breaks neither boot nor other plugins. State what disappears with it, including any state it adds to saves.
- **Load order**: the plugins it depends on and must load after.
- **Agent CLI**: a command-line surface for coding agents covering the same controls (discover, read and change parameters, edit its commands in events, validate), with the same effect as the editor. Describe it in the developer-experience companion. A plugin without designer controls needs no CLI.
- **No content**: a plugin never holds or dispatches text, images, or staging; those stay in events.

## Lifecycle outcomes

Use these facts to find the edge cases the changed behavior must decide. Ask about an outcome only where the change touches it.

| Fact | Outcome to decide |
| --- | --- |
| An Autorun or Parallel Common Event runs on the map screen, again and again, while its switch stays on. An Autorun event page restarts each time it finishes while the page stays active. | Does it play once? What ends it, and what happens on re-entry? |
| A map event starts only through its own trigger: Action Button, Player Touch, Event Touch, Autorun, or Parallel. No native command runs another map event; the Common Event command runs a Common Event, as a child of the calling event. | Which trigger starts the interaction, and from where? |
| An event shows its highest-numbered page whose conditions all hold. A variable condition passes when the value is greater than or equal to the one set. | Which state shows which version of the event (before, during, after)? |
| Erase Event lasts until the map is set up again, which a transfer from a different map does. Self switches belong to one map event and are saved. | Does a removed or changed event return when the player leaves and comes back? |
| Transfer Player does not stop the running event: its remaining commands execute on the destination map, and the destination's Autorun starts only after them. | What ends the source scene, and what runs first on arrival? |
| Shown pictures belong to the screen and stay through transfers until erased. | Which images must be gone after the transition? |
| A save holds switches, variables, self switches, actors, party, the map with its running event and that event's command list, the player, the screen with its pictures, the timer, and system settings. It holds neither the open message, the battle troop, nor temporary state. Plugin state survives only if the plugin adds it to the save. | What does the player see after saving here and loading? Does the new state survive? Must a content edit reach saves made mid-scene? |
| With autosave enabled, every transfer requests an autosave. | May an autosave happen in the middle of this sequence? |
| Battle Processing sets Can Escape and Can Lose; without Can Lose, defeat goes to Game Over. | What happens on escape and on defeat? |

## Content organization

These are the recommended defaults for the authoring-location decision. Present each with its cost and record the user's choice when it diverges. A project's first decision of each kind becomes its convention.

- **An event owns its interaction.** Text, choices, staging, and the way back live in the event the player triggers, not in a Common Event it merely calls. An exploration map has one event per thing the player interacts with; a scene map, such as a cutscene or visual-novel scene, has one Autorun event that owns the scene.
- **No shortcut events.** Never add a map event only so authors can find content the game runs from somewhere else.
- **Visual content stays near its use.** Text and images live in the event that shows them, where a designer or technical artist changes wording, image, position, and size in the editor and sees the result. Promote them to a Common Event only when several places use them; real reuse decides, not the number of callers.
- **Non-visual logic and state** stay in Common Events, switches, and variables while native commands express them well. Logic used in several places and game state machines are custom-plugin candidates (see Custom code).
- **A new map or child map** when a scene or interaction needs its own editing context (its own stage, cast, or background) or is one variant of a family, such as one per hero, trap, or ending. A parent map, even an empty one, groups a family in the editor's map tree. A variation on the same stage stays in pages or events of the same map.
- **A child map for image-heavy sequences.** When a map's events or Common Events add and remove many images, consider running that sequence on a child map: transfer the player there and back. A transfer releases every image loaded on the map. The spec records the costs: the parent's images reload on return and earlier preloading is lost, pictures still need explicit erasing, the source event keeps running after the transfer, an autosave may fire, and the way back is an explicit transfer.
- **Localization** moves text out of the event that shows it. MZ has no native multilingual text; the mechanism comes from a plugin. Treat it as an authoring-location decision and state its cost to the designer.
- **Integrated sources.** A document or spreadsheet integrated into the game becomes archived history; native data stays the authority.

## Shared patterns

Compare a proposal with the nearest existing members of:

- plugins: naming, parameter and command conventions, configuration patterns, load order;
- switches and variables: naming and reserved ID ranges;
- Common Events: grouping and naming;
- maps and events: tree organization, naming, and the content-organization choices above.

Likely first members of a family: the first project plugin, the first Common Event of a reusable kind, the first switch or variable range, and the first scene map.

## Environments and verification

The game runs in the editor's Playtest (NW.js), in a browser through a local server, and as exported builds. List the ones the delivery targets. Excluding one is a decision: state what it leaves unverified, since Playtest runs an older Chromium and lacks development-server services. The editor's Playtest cannot be excluded from a spec that touches custom code: a current browser hides every API newer than its Chromium 88 (see the [runtime reference](runtime.md)).

- **Checks without human judgment**: static checks of data and plugin entries, logic checks with the engine scripts loaded, and booting to the title screen with an empty console in each targeted runtime.
- **Checks a person performs**: timing, feel, visuals, audio, camera, and editing the promised content in the editor.
