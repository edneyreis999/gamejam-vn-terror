---
name: rpg-maker-mz-visustella-action-sequences
description: Author and review VisuStella MZ Battle Core Action Sequences. Use for Custom Action Sequence flows, Common Event command lists, VisuMZ_3_ActSeqCamera, VisuMZ_3_ActSeqProjectiles, VisuMZ_3_ActSeqImpact, setup, targets, waits, loops, movement, animation, action effects, camera, projectiles, impact, or cleanup.
---

# VisuStella Action Sequences

Model the complete composition: skill or item linkage, Common Event commands,
effect application, and cleanup.

- Setup, action, and finish phases form control flow. Targets, labels, waits,
  branches, and loops must agree with the intended hit and target semantics.
- Movement, animation, camera, sound, and projectiles do not apply the current
  action's damage or effects by themselves. Use Action Effect, explicit
  emulation, or a deliberate visual-only contract.
- Each-target or sequential flows need an explicit exit condition and stable
  target transition; do not assume the editor's initial scope performs the
  loop.
- Camera, projectile, and impact extensions add commands to the Battle Core
  Action Sequence surface. Their installed plugin contracts still determine
  availability and payload.
- Finish the state you open: restore camera, battler position, immortality,
  visibility, and battle-log flow when the sequence changed them.

Load exact plugin APIs from [the plugin reference index](references/index.md),
and load only a matching sanitized fixture from
[the XML example index](references/example-index.md). If runtime behavior needs
Playtest, state briefly what changed and why.
