# Designer experience

The shipped [authoring guide](../../../rpg-maker/docs/route-map.md) is the public contract: editor golden path, notes, parameters, commands, CLI examples, persistence, errors and native targets. It is the single reference for interface details.

In MZ, open **Percurso — Expedição (Map047)**. Node events own identity, links and arrival commands. The setup event owns route variants, parallaxes and the assignment-to-art mapping. Variable 227 selects the native page group. Plugin Manager owns colors, square sizes, pawn and duration. The game Bridge remains the host-specific adapter.

Public discovery: `node rpg-maker/tools/route-map.mjs list`, then `describe route-map`. `map 47` returns all 28 authored nodes; `validate` reports whether their graph is valid. Writes support `--dry-run` and `--project` for a disposable copy. The CLI documentation checker collects current descriptors before validating the review record; see verification.md.
