---
name: rpg-maker-mz-visustella-save-core
description: Pilot VisuStella MZ Save Core. Use for VisuMZ_1_SaveCore, save-slot policy, autosave request or execution, current-slot saves, global switches or variables, save metadata snapshots, storage identity, save menu behavior, or New Game Plus integration.
---

# VisuStella Save Core

- Storage policy, metadata snapshots, and save-menu presentation are separate
  surfaces. Change the one that owns the requested behavior.
- Autosave Request, Execute, and Force intentionally bypass different gates;
  they are not synonyms. The database autosave setting remains part of the
  effective contract.
- Runtime autosave enable or disable state is local to the current session or
  save unless the project explicitly persists it elsewhere.
- Saving the current slot has context limits; do not assume it is valid during
  battle or from every scene.
- `<Global>` data crosses save files and new games. Never use it for state that
  belongs to one playthrough.
- Changing storage mode, filename format, or storage key changes save identity
  and can make existing saves invisible without deleting their data.
- Save Style controls policy; Save Menu Style controls presentation.

Load the complete current API and defaults from
[the plugin reference index](references/index.md). If the change affects runtime
save behavior, state briefly why Playtest is necessary.
