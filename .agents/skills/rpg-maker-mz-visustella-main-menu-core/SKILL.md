---
name: rpg-maker-mz-visustella-main-menu-core
description: Pilot VisuStella MZ Main Menu Core. Use for VisuMZ_1_MainMenuCore, the main-menu command registry, command symbols, visibility or enablement, actor selection, handlers, extension data, menu layouts, actor portraits, status-list rendering, or integrations exposed through Scene_Menu.
---

# VisuStella Main Menu Core

- Treat the live Command Window List as a routing registry, not merely a visual
  list. Symbols identify commands; visibility, enablement, extension data, and
  handlers have different roles.
- Normal handlers execute directly. Personal handlers execute after actor
  selection and must preserve that context.
- Forced visibility or enablement does not create missing prerequisites and can
  expose an invalid command.
- Static command text can override calculated text.
- Non-default command-window styles can own the `Scene_Menu` arrangement and
  supersede layout coordinates from Core Engine.
- Actor graphic source and status-list layout or draw code are separate design
  surfaces.
- Keep command symbols unique. When a command enters another scene, confirm its
  handler, actor requirement, extension payload, return path, and refresh
  behavior as one navigation contract.
- Preserve show and enable formulas that depend on game state; evaluating them
  once during setup can leave the menu stale after switches or party state
  change.
- Use the command registry configured in the project, not assumed defaults from
  another installation.

Load exact commands, parameters, defaults, and notetags from
[the plugin reference index](references/index.md).
