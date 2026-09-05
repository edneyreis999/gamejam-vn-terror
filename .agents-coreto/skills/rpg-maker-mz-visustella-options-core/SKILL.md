---
name: rpg-maker-mz-visustella-options-core
description: Pilot VisuStella MZ Options Core and option-domain tooling. Use for VisuMZ_1_OptionsCore, VisuMZ_4_Debugger, option categories, custom options, symbols, global configuration persistence, input rebinding, the Options scene, or exposing another plugin's setting as a player option.
---

# VisuStella Options Core

- Options Core replaces the vanilla Options scene; plugins written only for the
  vanilla scene are not automatically compatible.
- Options normally persist through global configuration rather than an
  individual save. Confirm the owning storage before changing behavior.
- A custom option is a complete contract: unique symbol, visibility,
  enablement, presentation, interaction, default, load, and save must agree.
  Enablement is not the option's ON/OFF value.
- Input rebinding must preserve navigation, confirm, cancel, and a recovery path
  from an unusable binding set.
- Keep option symbols stable and normalize loaded values before use. Drawing a
  label should not mutate configuration; changes belong in interaction or
  explicit apply callbacks.
- Defaults cover first run and missing keys, while load and save code preserve
  existing global configuration. Treat those paths as one persistence contract.
- Exposing another plugin's setting in Options does not transfer ownership of
  the underlying mechanic to Options Core.

Debugger is stewarded here as option-domain tooling without implying a runtime
dependency. Load only its or Options Core's current contract from
[the plugin reference index](references/index.md).
