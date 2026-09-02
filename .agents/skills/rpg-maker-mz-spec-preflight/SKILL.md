---
name: rpg-maker-mz-spec-preflight
description: Loads and checks the authoritative RPG Maker MZ context before spec or task authoring. Use when `rpg-maker-mz-create-spec` or `rpg-maker-mz-create-tasks` is about to run, or when an existing plan may be stale. Don't use to approve, implement, or silently rewrite contracts.
---

# RPG Maker MZ Spec Preflight

## 1. Resolve repository guidance

Read root and scoped `AGENTS.md` files. Resolve the task root `planos/tasks/`, QA root `docs/qa/`, game root, project commands, package manager, Jest/harness configuration, and playtest instructions from repository evidence. Use `rpg-maker-mz/` only when project guidance names no alternative game root.

Done when: no path or command needed by the selected phase is guessed.

## 2. Load authoritative context

Read existing spec artifacts, affected discipline contracts, durable docs, QA scenarios and bugs, relevant plugins, data JSON, tests, and local references. For quest work, inspect narrative flow, dialogue, cutscene, audio, and technical-art contracts only when affected.

Done when: each behavior has one authority source and contradictions are listed.

## 3. Check MZ lifecycle risk

Classify impact on plugin metadata and order, plugin commands, event pages, interpreters, switches and variables, maps and transfers, scenes, battles, party, saves, input, rendering, camera, audio, assets, packaging, and authoring workflow.

Done when: every affected surface has a planned contract and sensor.

## 4. Gate the next phase

For spec authoring, require objective, scope, exclusions, authority map, affected disciplines, and open decisions. For task authoring, require approved `spec.md` and `verification.md`, resolved references, stable requirement IDs, and selected sensors. Report missing prerequisites without manufacturing them.

Done when: the next skill receives a complete context packet or an exact blocker.
