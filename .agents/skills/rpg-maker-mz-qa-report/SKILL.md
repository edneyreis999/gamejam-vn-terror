---
name: rpg-maker-mz-qa-report
description: Plans RPG Maker MZ playtest coverage as durable QA documents. Use when a spec, quest, plugin, map, event, save, battle, UI, audio, or release change needs journeys, scenarios, charters, bugs, or a run plan. Don't use to execute the playtest or declare behavior verified.
---

# RPG Maker MZ QA Report

Maintain the living QA tree at `docs/qa/`. Extend existing taxonomy and formats before creating files.

## 1. Read authority

Read `AGENTS.md`, `planos/tasks/<slug>/spec.md`, `verification.md`, affected discipline contracts, current journeys, scenarios, bugs, and recent reports. Trace the changed game surfaces under the resolved game root (project guidance first).

Done when: every player-visible or author-visible behavior and affected discipline has an authority source.

## 2. Select journeys and risks

Cover the normal path and only meaningful edges: cancel, defeat, retry, transfer, save/load, party changes, repeated interaction, plugin load order, missing assets, and recovery from interruption. Include timing, camera, audio, input, and comfort only when affected.

Done when: each acceptance criterion maps to a scenario or an explicitly non-QA sensor.

## 3. Update living documents

- Update existing journeys instead of duplicating them.
- Update scenario contracts while preserving historical runs and verdict provenance.
- Create bug records by stable symptom identity; deduplicate the same symptom.
- Write a focused cycle charter with setup, saves, maps, actors, switches, variables, plugin parameters, steps, observables, evidence, and teardown.

Use the repository's existing schemas. Keep run scratch outside durable docs; store only durable evidence links and verdicts.

Done when: the QA tree identifies exactly what must be played, observed, and recorded.

## 4. Handoff

Carry execution mode/reference, independent expected result, required variants, retained evidence and invalidation dependencies in each lot. Record hardware as required/when-available and actual availability before execution; keep human judgments separate. Reconcile existing plans and call planning again only for missing or affected coverage.

Update `planos/tasks/<slug>/verification.md` with scenario IDs and required human checks. Leave all unexecuted verdicts truthful.

Done when: `rpg-maker-mz-qa-execution` can run the plan without guessing game state or expected outcomes.
