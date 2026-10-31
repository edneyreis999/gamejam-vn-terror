# Developer Experience: QA Debug Tools

Owner- and QA-facing surfaces outside the game screens. Companion to `_spec.md`.

## Golden Path

1. In the RPG Maker MZ editor, open Plugin Manager and turn on **Dryland_7_QADebug** (disabled by default). Save the project.
2. Run `npm start`, New Game, reach the tavern, open ☰ → **Debug** → **Go to trap** → **A1** → **Confirm**.
3. The Bottled Saci trap opens. The Debug panel shows the seed for the bug report.
4. Before exporting a release, turn the plugin off again. If it stays on, the build gate asks.

## Editor Settings and Commands

- **Plugin Manager → Dryland_7_QADebug**: on/off is its only control. No parameters, no plugin commands. On adds the Debug command to the menu; off removes every Debug surface.
- **Menu command**: the Debug entry lives in `Coreto_1_MainMenuCore` → Command List, visible only while the plugin is enabled. With the plugin off, the entry stays in the list but is never shown.

## Tools

### `npm run prune-build -- --apply` (post-build step)

The exported build has Debug enabled, interactive terminal:

```
Debug (Dryland_7_QADebug) está ATIVO neste build.
Publicar com o Debug ativo? [s/N]
```

- `N` or Enter → `Debug desativado no build (o projeto-fonte não foi alterado).` The plugin's file is then pruned like any disabled plugin. Exit 0.
- `s` → `Debug mantido no build.` Exit 0.

Non-interactive run (no terminal), Debug enabled:

```
Debug (Dryland_7_QADebug) estava ativo; desativado no build. Use --allow-debug para mantê-lo.
```

`--allow-debug` keeps it without asking and prints `Debug mantido no build (--allow-debug).`

Report mode (without `--apply`) only prints `Debug: ativo` or `Debug: inativo` and changes nothing.

Debug disabled or absent in the build: no question, and no change to today's output.

### `npm run verify-build`

- It prints `Debug: ativo` or `Debug: inativo` for the build.
- The only accepted difference from the source project is the Debug plugin's status in `js/plugins.js`, together with the absence of its pruned file. Any other difference fails as today.

## Errors

- **The build differs from the source in anything other than the Debug status**: the existing `verify-build` failure, unchanged.
- **The build was pruned with Debug disabled, but the source has it enabled**: `verify-build` accepts it and prints `Debug: inativo (desativado pelo prune-build)`.
