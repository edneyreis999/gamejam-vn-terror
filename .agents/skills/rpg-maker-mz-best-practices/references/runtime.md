# MZ Runtime Floor

Read when a task or spec adds or changes custom code, or verifies a game in more than one runtime.

## The floor

The editor's Playtest runs the game in its embedded NW.js. MZ 1.10.0 ships NW.js 0.51.0: Chromium 88, V8 8.8, Node 15.5.1. Every enabled plugin and script must run there. Confirm the version in the installed editor (`process.versions` in a running Playtest, or `probe-nwjs.mjs`); a project can be opened by a different editor build.

The floor is per feature, not a language level. Chromium 88 supports class public and private fields, private methods, static fields, `??=`, `||=`, `&&=`, `replaceAll`, `Promise.any`, numeric separators, and optional catch binding. It lacks these, among others:

| Feature | First Chromium |
| --- | --- |
| `Array.prototype.at`, `String.prototype.at` | 92 |
| `crypto.randomUUID` | 92 |
| `Object.hasOwn`, `new Error(msg, { cause })` (the option is silently ignored) | 93 |
| Class static blocks | 94 |
| `#x in obj`, regular-expression `d` flag | 91, 90 |
| `findLast`, `findLastIndex` | 97 |
| `structuredClone` | 98 |
| `toSorted`, `toReversed`, `toSpliced`, `Array.prototype.with` | 110 |
| `Object.groupBy`, `Map.groupBy` | 117 |

A browser or command-line run on a current Chromium hides every one of these. One missing API throws at plugin load and cascades into unrelated errors, so the first error on screen is rarely the cause.

## Sensors

- **Static check** — `scripts/check-runtime-compat/`. Run `npm install` there once, then `node scripts/check-runtime-compat/run.mjs <project-root>`. It lints every plugin enabled in `js/plugins.js` (never a name prefix) with `eslint-plugin-es-x`, flags everything newer than ES2020 except what Chromium 88 supports, and adds `structuredClone` and `crypto.randomUUID`. It catches `.at(index)` on an array of unknown type. It reads the source only, so it proves nothing about APIs it does not know: the boot below is the floor.
- **Boot in the real NW.js** — the check no other sensor replaces, and the one that cannot be excluded or waived for a change that touches custom code. Launch the editor's own NW.js on the project with remote debugging, for example `<editor>/…/nwjs-mac/nwjs.app/Contents/MacOS/nwjs <project-root> --remote-debugging-port=<port>`, reach the title screen, and run `node scripts/probe-nwjs.mjs --port <port>`. It reports the runtime versions, whether `Object.hasOwn` and `Array.prototype.at` exist (they must be `undefined` on the floor), the current scene and map, and any error the game printed; it exits 0 only when no error is printed. Close the process you opened. Run it against a copy of the project when the game writes saves.
- **Title map.** When a title-map plugin is installed, the map the probe reports at the title screen is the title map. Pass it to `check-native-data.mjs --title-map` (see the data reference).

Chrome does not qualify NW.js, and a command-line run does not qualify the editor.

## Writing code for the floor

- Replace `Object.hasOwn(o, k)` with `Object.prototype.hasOwnProperty.call(o, k)`, `list.at(-1)` with `list[list.length - 1]`, and `new Error(msg, { cause })` with an explicit property assignment. Use no polyfill.
- Fix every occurrence, not the first stack line: one incident had 11 `hasOwn` calls and 5 `.at(-1)` in the same files.
- A new plugin or script ships with the static check passing and a recorded boot in the real NW.js; a spec states which runtimes it targets and verifies the NW.js boot in each task that changes custom code.
