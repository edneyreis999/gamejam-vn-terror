---
name: rpg-maker-mz-create-spec
description: Authors an approval-ready RPG Maker MZ feature spec, verification contract, and affected discipline contracts. Use when a game feature, quest, plugin, event, map, save, battle, UI, audio, or tooling change needs specification. Don't use to implement code or decompose an already approved spec into tasks.
---

# Create RPG Maker MZ Spec

Create the spec set under `planos/tasks/<slug>/`. Activate `rpg-maker-mz-spec-preflight` first and `grill-me` when product or technical decisions remain open.

## 1. Establish authority

Read `AGENTS.md`, existing plans, durable domain contracts, relevant game files, tests, and QA documents. Resolve `<game-root>` from project guidance; use `rpg-maker-mz/` when the repository contract names no alternative.

Done when: current behavior, authority sources, constraints, and unresolved decisions are explicit.

## 2. Classify affected disciplines

Select only disciplines whose owned behavior changes. For each selected discipline, create or update `planos/tasks/<slug>/<slug>.<discipline>.md` using the project's vocabulary and existing schema. Quest examples include narrative flow, dialogue, cutscene staging, audio, and technical art. Keep each contract independently approvable and reference shared scene or state IDs instead of duplicating content.

Start new contracts as `draft`. Only explicit owner or user approval may mark a contract approved. Moving a contract to durable docs is manual organization, not a release condition.

Done when: every changed behavior has one authority owner and unaffected disciplines generated no file.

## 3. Write the spec set

Use [the spec template](assets/spec.template.md) and [the verification template](assets/verification.template.md).

- `spec.md` owns objective, scope, exclusions, behavior, authority map, technical design, affected MZ surfaces, event/save lifecycle, and acceptance summary.
- `verification.md` owns requirement IDs, sensor assignment, scenarios, saves, observables, commands, inputs, evidence, freshness, and lifecycle states.

Keep player outcomes separate from implementation detail. Define plugin, data, event, save, scene, input, rendering, audio, asset, and deployment impact only when affected.

Done when: every acceptance criterion has a stable ID and at least one applicable sensor.

## 4. Validate and approve

Check internal links, paths, ownership, lifecycle semantics, exclusions, and contradictions. Present unresolved decisions one at a time. Save approved edits locally; offer `rpg-maker-mz-spec-peer-review` only after approval.

Done when: the user explicitly approves the spec set and no implementation or task files were created.
