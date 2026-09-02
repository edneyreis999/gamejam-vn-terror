---
name: rpg-maker-mz-visustella-core-engine
description: Pilot VisuStella MZ Core Engine. Use for VisuMZ_0_CoreEngine, Tier 0 ordering, engine-wide settings, parameter formulas and caps, Core Engine notetags or plugin commands, window and UI behavior, and script failsafes. Do not use as documentation for Tier 2–5 plugins.
---

# VisuStella Core Engine

- Keep Core Engine above higher-tier VisuStella plugins. Tier order describes
  placement; only declared requirements create runtime dependencies.
- Treat global parameters, object or map notetags, runtime plugin commands, and
  hard-coded engine patches as distinct scopes.
- Basic, X, and S parameter formulas combine separate Plus, Rate, Flat, and cap
  channels. Avoid deriving a parameter from the final value currently being
  calculated; use base or independent inputs to prevent recursion.
- Core failsafes can turn errors in Script Calls, Conditional Branches, Control
  Variables, or Movement Routes into console-logged no-ops. Absence of a crash
  does not prove the script executed.
- Engine-wide settings can change database interpretation, input, rendering,
  formulas, saves, and every dependent plugin. Preserve the project's chosen
  behavior instead of replacing it with a reference default.
- Confirm the exact parameter, command, notetag target, and evaluation context
  before writing. A documented extension hook does not prove that its owning
  extension is installed or active.

This skill owns no Tier 2–5 knowledge. Load only the current Core Engine
contract needed by the task from [the plugin reference index](references/index.md).
