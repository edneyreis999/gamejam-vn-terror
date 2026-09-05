---
name: rpg-maker-mz-visustella-elements-status-menu-core
description: Pilot VisuStella MZ Elements and Status Menu Core and element-domain extensions. Use for VisuMZ_1_ElementStatusCore, VisuMZ_4_WeaknessPopups, elemental damage, weaknesses, resistances, absorption, reflection, pierce, multi-element actions, Trait Sets, or elemental Status Menu presentation.
---

# Elements and Status Menu Core

Treat elemental resolution, Trait Sets, and Status Menu presentation as
separate surfaces.

- Element calculations have distinct received and dealt stages. Plus applies
  before Rate and Flat after Rate; Flat changes the elemental multiplier, not
  HP damage.
- Multi-element aggregation and formulas are configurable. Follow the active
  project contract instead of assuming the RPG Maker vanilla maximum rule.
- Reflection resolves before damage and before Magic Reflection; absorption
  follows elemental-rate resolution. Pierce bypasses elemental immunity,
  reflection, and absorption, but not miss or counter.
- Forced action elements can have source precedence. Preserve the effective
  ordering found in the plugin contract rather than merging every source.
- Trait Sets are configured named bundles, not states. Their `Element` concept
  is also distinct from the damage elements of an action. Changing a Trait Set
  can alter battler properties and invalidate equipment.

Weakness Popups is stewarded here by domain; that does not make Elements and
Status Menu Core a runtime dependency. Load the exact plugin contract from
[the reference index](references/index.md).
