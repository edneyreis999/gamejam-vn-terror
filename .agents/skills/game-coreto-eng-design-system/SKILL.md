---
name: game-coreto-eng-design-system
description: Coreto design-system preset. Use when applying the shared visual theme to an RPG Maker MZ project, configuring DesignSystem parameters, or maintaining its delegated provider recipes. Don't use for gameplay rules, campaign content, or installing Coreto plugins.
---
# Coreto design system

Resolve `<skill-dir>` to the directory containing this file, `<game>` to the MZ game directory and `<coreto>` to the installed Coreto distribution. Use Node 22+.

## Apply or recover the preset

1. Read [operations](references/operations.md) in full. Identify the installed providers, target project and profile. Run the preview below; inspect every changed parameter path and asset destination. **Done when:** preflight succeeds and every proposed change belongs to the requested theme application.

   ```sh
   node "<skill-dir>/scripts/apply-design-system.mjs" --project "<game>" --coreto "<coreto>" --profile coreto --dry-run --json
   ```

2. Run the same command without `--dry-run`. Retain the returned backup path. Restart the game, inspect affected screens through player input, and run the command again. **Done when:** the game loads its fonts/images, controls still work, and the second application reports `changed: false`.

3. For recovery, preview `--restore "<backup.json>"` with the same project/Coreto paths, then run without `--dry-run`. **Done when:** readback restores the saved managed values/assets. On a restore conflict, inspect the later edit and the receipt before choosing the desired value through its owning CLI.

## Configure or maintain the theme

1. Read [design and ownership](references/design.md) in full before changing a token, drawing recipe or responsibility. Inspect [preset.json](assets/preset.json), the authoritative portable defaults and asset manifest. **Done when:** each proposed visual change has one owning parameter/provider and affected screens identified.

2. Discover DesignSystem parameters with the dedicated CLI; use the installed Coreto CLI help/catalog for provider parameters. **Done when:** requested values validate, preview and read back through the owning CLI.

   ```sh
   node "<skill-dir>/scripts/design-system-cli.mjs" api list --json
   node "<skill-dir>/scripts/design-system-cli.mjs" api describe /Shapes/PanelRadius --json
   node "<skill-dir>/scripts/design-system-cli.mjs" --project "<game>" --coreto "<coreto>" parameters set --path /Shapes/PanelRadius --value 10 --dry-run --json
   ```

3. For a responsibility migration, capture the original screen first, configure the provider, remove only the superseded DesignSystem implementation, and capture the same player state again. Compare settled images at the same viewport/DPR/locale and inspect them. **Done when:** appearance matches and affected keyboard/mouse actions and native save/load work. Retain the responsibility when public provider parameters cannot express it.

## Bundled helpers

- **Mutating:** `<skill-dir>/scripts/apply-design-system.mjs` copies verified theme assets and invokes parameter CLIs. `--dry-run` is read-only; `--restore` creates its own recovery point.
- **Mutating:** `<skill-dir>/scripts/design-system-cli.mjs` writes only the installed DesignSystem registry entry. `api`, `parameters get`, `validate` and `--dry-run` are read-only. `parameters reset` restores the selected preset default; `--expected-hash` rejects stale registry writes.
- **Read-only internal modules:** `<skill-dir>/scripts/shared.mjs` handles paths, codecs and CLI invocation; `<skill-dir>/scripts/recipes.mjs` composes provider callbacks from the templates linked in the design reference. Import these modules through the two CLIs.
