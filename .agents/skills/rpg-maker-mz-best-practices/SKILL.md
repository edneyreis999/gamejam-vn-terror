---
name: rpg-maker-mz-best-practices
description: RPG Maker MZ engine facts, conventions, and hazards for projects containing game.rmmzproject — plugins and their CLIs, events, maps, saves, Playwright E2E, test infrastructure, specs, task planning, editor authoring, QA, and verification. Load before specifying, planning, creating, changing, documenting, testing, or dogfooding an MZ game or its tools. Do not use for projects without RPG Maker MZ.
---

# RPG Maker MZ Best Practices

Engine facts and conventions for an RPG Maker MZ project. They inform decisions; the procedure of the task stays with the skill that owns it. Confirm every project fact in the project itself: IDs, paths, and plugin names are never portable defaults.

## Project

- The game root is the directory containing `game.rmmzproject`, with `data/`, `js/`, `img/`, and `audio/` beside it. Never infer it from a documentation or staging folder.
- `js/plugins.js` is structured data: an ordered list of plugin entries with an exact `name`, `status`, `description`, and `parameters`. Parse it rather than reading it as text.
- Plugin relations are independent; none implies another. **Installed**: the file exists. **Active**: its entry is enabled. **Configured**: its parameters set the behavior. **Required**: another plugin declares it necessary. **Ordered**: list position or `@orderAfter`/`@orderBefore` places it. **Optional integration**: a feature appears only when another plugin is present.
- When an installed plugin suite ships its own best-practices skill or command-line tool, consult it before concluding that a capability is missing.

## Runtime

The editor's Playtest runs the game in the editor's embedded NW.js, loading project files directly. Its Chromium is the JavaScript floor for every plugin and script: read it from `process.versions` in the installed editor (MZ 1.10.0 ships NW.js 0.51.0 with Chromium 88) and use no newer API or syntax. Services that only a development server provides are absent in Playtest. A browser or command-line run on a current Chromium hides every violation, so the boot in the real NW.js cannot be excluded or waived for a change that touches custom code.

## Code

- **Custom code** is any project-owned JavaScript: a project plugin, a change to one, the Script event command, script conditions and movement-route scripts, and JavaScript carried in notetags or plugin parameters.
- Never edit `js/rmmz_*.js` or third-party plugins. Adapt them in a project plugin loaded after them.
- A method a plugin installs on an engine class is public API that other plugins may call repeatedly. Decide from authoritative state (such as `$gameMessage`), never from display state the method itself rewrites, and tolerate re-invocation.

## Content

- Native data in `data/*.json` is the content authority, and the editor is its editing surface. A script that edits authored data is one-shot: run it, verify its result, and never keep it as a step later changes must repeat. Builders of disposable test fixtures remain reusable infrastructure; they must never overwrite the authored game.
- Before any write to a file under `data/` or to `js/plugins.js`, even one value, read the [native data shapes](references/data.md): the start map, retired Common Event slots, and number-list parameters each have a shape that breaks the game or the editor.
- An open editor keeps its own copy of the project and overwrites external writes when it saves. Reopen the editor after any external write, before saving there.

## References

| Task | Read |
| --- | --- |
| Writing, updating, or reviewing a spec for an MZ game | [MZ input to specs](references/specs.md) |
| Decomposing an MZ spec into tasks, including its QA and playtest tail | [MZ input to task planning](references/tasks.md) |
| Preparing or walking persona QA journeys in the game or its authoring tools | [MZ QA sessions](references/qa-sessions.md) |
| Creating, updating, or reviewing documentation, help, or public descriptors for an MZ plugin CLI | Read the [CLI documentation checklist](references/cli-documentation-checklist.md) in full; fill the review record, run its verifier, and cite the passing receipt in the task before authoring closure or independent evaluation |
| Adding or changing custom code, or verifying in more than one runtime | [Runtime floor](references/runtime.md); run `scripts/check-runtime-compat/` and `scripts/probe-nwjs.mjs` |
| Any write to `data/*.json`, plugin parameters, or `js/plugins.js`, even one value (such as the start map in `System.json`), or reviewing one | [Native data shapes](references/data.md); run `scripts/check-native-data.mjs` and `scripts/validate_plugins_js_envelope.py` |
| Changing event command lists, plugin commands, or data by script | [Data and plugin mutation](references/mutation.md) and the [data shapes](references/data.md) it points to; run `scripts/check-event-lists.mjs` and `scripts/check-native-data.mjs` afterwards |
| Writing, running, or pruning automated tests for an MZ game, or creating or repairing their infrastructure | [Tests and their upkeep](references/tests.md); for runtime fixtures, executor preparation, or slow-test parallelism, also read [runtime test execution](references/runtime-test-execution.md) |
| Writing, reviewing, running, or debugging Playwright E2E journeys in MZ | [Playwright E2E for MZ](references/playwright-e2e.md), alongside the general [Game Playwright Best Practices](../game-playwright-best-practices/SKILL.md) |

Resolve helper paths from this installed skill's directory. The project checks are read-only. The CLI review helper bootstraps a pending record or verifies it read-only; only explicitly requested outputs are written. Its [integration contract](references/cli-review-integration.md) explains inputs, failures and repair before retry.
