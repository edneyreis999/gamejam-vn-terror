---
name: rpg-maker-mz-visustella-skills-states-core
description: Pilot VisuStella MZ Skills and States Core and skill-state extensions. Use for VisuMZ_1_SkillsStatesCore, VisuMZ_2_EnhancedTpSystem, VisuMZ_3_LifeStateEffects, VisuMZ_3_StateTooltips, VisuMZ_3_VisualStateEffect, VisuMZ_4_SkillShop, skill costs, passive states, buffs, debuffs, slip effects, state duration, TP modes, skill learning, or state presentation.
---

# Skills and States Core

- Passive states are indirect traits, not normally applied states. Affected-state
  checks, turns, removal, and add or expire hooks do not behave the same way;
  remove a passive by removing its source.
- Passive conditions must not create circular dependencies through other
  passives, traits, or parameters derived from states.
- A custom skill-cost type must keep calculation, payment eligibility, payment,
  and presentation coherent.
- Slip damage or healing can be cached when a state is applied. Passive sources
  and explicit refresh change that lifecycle; slip formulas are not a safe home
  for unrelated mechanical side effects.
- Action-end updates change duration semantics. Reapplication and buff/debuff
  stacking are configured policies, not vanilla assumptions.

Enhanced TP, Life State Effects, State Tooltips, Visual State Effects, and Skill
Shop are stewarded here by their primary skill/state surface; cross-dependencies
remain independent facts. Load exact contracts from
[the plugin reference index](references/index.md).
