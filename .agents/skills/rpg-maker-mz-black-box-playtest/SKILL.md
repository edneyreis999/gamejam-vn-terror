---
name: rpg-maker-mz-black-box-playtest
description: Routes legacy RPG Maker MZ playtest requests to directed QA. Use when an existing task invokes this playtest entry. Don't use to claim independent replay, plan QA, or replace unit tests.
---

# Legacy playtest entry

## Resolve and forward

Resolve the installed sibling `rpg-maker-mz-qa-execution` and read its SKILL.md
in full. Pass the current scenario, verification row, variants and sensors to
that workflow. If unavailable, report the missing skill dependency before boot.
Report `directed-browser` as the actual method. Historical independent runs keep
their identity; an external independence requirement remains an incompatibility.

Done when: the directed owner has the complete contract or the missing dependency
is explicit. This entry owns no controller, card, agent topology or replay.

For a specifically assigned passive pixel sensor, read
[references/passive-pixel-observation.md](references/passive-pixel-observation.md)
in full. These preserved helpers read pixels and write sensor artifacts; inspect
their CLI and report failures without substituting an unavailable sensor.
