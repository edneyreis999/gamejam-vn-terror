---
name: rpg-maker-mz-game-docs-impact
description: Audits an RPG Maker MZ change across game runtime, authoring data, saves, presentation, QA, and durable discipline contracts. Use when specs, tasks, or completion claims need downstream impact analysis. Don't use to generate documents for unaffected disciplines.
---

# RPG Maker MZ Game and Docs Impact

## 1. Establish touched behavior

Read the spec/task, `AGENTS.md`, changed paths, and resolved references. Trace direct and downstream consumers rather than classifying by filename alone.

Done when: each touched behavior has an owning runtime, authoring, test, QA, or documentation surface.

## 2. Audit applicable surfaces

- `rpg-maker-mz/js/plugins/`: metadata, parameters, commands, aliases, load order, globals, scenes, windows, sprites, PixiJS, NW.js.
- `rpg-maker-mz/data/`: maps, events, common events, database IDs, switches, variables, troops, actors, items, system data.
- Lifecycle: page priority, interpreter waits, refresh, transfer, battle, party, scene, save/load, new game.
- Presentation: dialogue, cutscene blocking, camera, animation, UI, input, audio, assets, resolution, accessibility or comfort.
- Tooling: Jest/harness, build, packaging, generated data, editor workflow.
- Durable truth: affected `<slug>.<discipline>.md` contracts and `docs/qa/` journeys, scenarios, bugs, and reports.

Done when: every applicable surface has concrete impact or evidence-backed no impact.

## 3. Co-ship ownership

Add missing implementation, test, evidence, cleanup, and documentation items to the owning spec or task. Generate discipline contracts only for changed ownership. Name obsolete files, commands, parameters, data, and docs as delete targets when the change replaces them.

Done when: no downstream consumer or stale contract is left implicit.
