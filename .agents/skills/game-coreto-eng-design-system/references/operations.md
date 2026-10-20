# Operations

## Compatibility and profiles

Require one enabled entry and an installed source file for each provider, in this relative order:

1. Coreto_0_CoreEngine
2. Coreto_1_MessageCore
3. Coreto_1_OptionsCore
4. Coreto_1_SaveCore
5. Coreto_2_ExtMessageFunc
6. Coreto_5_DesignSystem **1.3.0**

Other plugins may appear between them. The applicator validates published parameter descriptors and previews every write before mutation. It uses the installed Coreto CLI and parser; it does not install, enable, reorder, regenerate or edit plugin sources. Install the matching DesignSystem plugin separately before applying the preset. A Coreto distribution containing `tools/coreto/cli.mjs` is required; `--coreto` makes cross-repository use explicit.

Use `--profile coreto` for another game. Use `--profile dryland` for The Dryland Drowned's picture-role mappings. Both preserve additional existing picture roles, custom font families, languages, categories, option symbols, handlers and unrelated parameters. Reapplication deliberately restores every managed visual value. It replaces the drawing callback for the six recognized options: textLocale, textEffects, bgmVolume, bgsVolume, meVolume and seVolume. Unknown options retain their drawing code and are reported as `preservedCustomOptions`.

The preset supplies theme artwork, four font families and their OFL licenses. It does not supply maps, characters, evented menus, translated content or custom options belonging to another game. Resolution remains the game's setting; 1280×720 at DPR 1 is the reference composition. Supported glyph coverage follows the bundled fonts and the game's fallback fonts. Explicit font/text escape codes in authored content retain precedence over the body default.

## Apply

Close the Plugin Manager while applying and reload it afterwards; its unsaved state can overwrite disk changes. Keep the game stopped until application finishes. The applicator rejects missing/disabled/duplicate/out-of-order dependencies before copying assets or writing parameters. Asset paths through symlinks are rejected.

```sh
node "<skill-dir>/scripts/apply-design-system.mjs" --project "<game>" --coreto "<coreto>" --profile coreto --dry-run --json
node "<skill-dir>/scripts/apply-design-system.mjs" --project "<game>" --coreto "<coreto>" --profile coreto --json
```

`--backup <new-directory>` chooses the recovery directory; otherwise it is `<game>/.coreto-design-system-backups/<timestamp>`. Preview creates no backup. An unchanged reapplication writes nothing. Assets are checked against the SHA-256 manifest before application.

## Recovery

Every application that changes files records prior managed values and copies overwritten assets in `backup.json` plus `asset-N` files. A failure records the error and recovery command. The multi-plugin operation is not a single filesystem transaction: keep the backup after interruption and recover through the same CLIs.

```sh
node "<skill-dir>/scripts/apply-design-system.mjs" --project "<game>" --coreto "<coreto>" --restore "<backup.json>" --dry-run --json
node "<skill-dir>/scripts/apply-design-system.mjs" --project "<game>" --coreto "<coreto>" --restore "<backup.json>" --json
```

Restore accepts only values matching the original or applied values, validates asset backup hashes, and rejects later edits to managed fields/assets. It preserves unrelated changes. Inspect conflicting values through `parameters get` and resolve the intended value explicitly. A restored parameter may have an explicit serialized default where the original registry omitted it; recovery promises effective values, not byte-identical formatting.

## DesignSystem CLI

`api list` and `api describe /Group/Field` need no project. Project commands require the existing enabled 1.3.0 plugin:

- `validate`: validate known authored parameters and return the registry hash.
- `parameters get --path /`: return effective defaults merged with authored values.
- `parameters set --path /Group/Field --value <JSON>`: set a field; object writes merge named fields. `--input <JSON-file>` avoids shell quoting for larger values.
- `parameters reset --path /Group`: restore that group's default.

Use `--dry-run` to preview writes and `--expected-hash <hash>` to guard a planned write. Restart playtest to reload parameters. Provider callbacks contain a snapshot of their managed preset values: changing a DesignSystem token alone does not rewrite those callbacks. For a shared-theme change, update the preset and reapply it.
