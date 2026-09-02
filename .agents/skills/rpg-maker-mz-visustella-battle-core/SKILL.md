---
name: rpg-maker-mz-visustella-battle-core
description: Pilot VisuStella MZ Battle Core and battle-loop extensions. Use for VisuMZ_1_BattleCore, VisuMZ_2_BattleSystemATB, VisuMZ_3_AutoSkillTriggers, VisuMZ_3_BattleAI, VisuMZ_3_VisualCutinEffect, damage styles, criticals, targeting, base troops, forced actions, ATB, battle AI, or battle presentation. Do not use for authoring Action Sequences.
---

# VisuStella Battle Core

Battle Core replaces important vanilla battle semantics.

- A Damage Style can make the database damage field a formula, multiplier, or
  power expression. Confirm the effective style, Hit Type, and Damage Type
  before editing damage or balance.
- Base Troops inject their event pages into every troop; inspect them when
  behavior has no local troop source.
- Forced Actions wait until the current action or Common Event completes.
  Random Enemy scopes ignore TGR. Multi-weapon basic attacks resolve each
  equipped weapon separately.
- ATB operates on the MZ TPB foundation. Casting, gauge speed, interrupts, and
  optional field presentation are separate mechanics.
- Auto Skill Triggers evaluate the original action scope, require a usable
  skill, and prevent trigger-to-trigger cascades.
- Battle AI combines style, AI level, rating variance, ALL/ANY conditions, and
  TGR weighting; a configured condition is not necessarily absolute.

Visual Cutin Effect is stewarded here by its main battle surface. Load only the
relevant contract from [the plugin reference index](references/index.md). If a
runtime change needs Playtest, state briefly what changed and why.
