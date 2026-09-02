---
name: rpg-maker-mz-qa-report
description: Plans RPG Maker MZ playtest coverage as durable QA documents. Use when a spec, quest, plugin, map, event, save, battle, UI, audio, or release change needs journeys, scenarios, charters, bugs, or a run plan. Don't use to execute the playtest or declare behavior verified.
---

# RPG Maker MZ QA Report

Maintain the living QA tree at `docs/qa/`. Extend existing taxonomy and formats before creating files.

## 1. Read authority

Read `AGENTS.md`, `planos/tasks/<slug>/spec.md`, `verification.md`, affected discipline contracts, current journeys, scenarios, bugs, and recent reports. Trace the changed game surfaces under `rpg-maker-mz/js/plugins/` and `rpg-maker-mz/data/`.

Done when: every player-visible or author-visible behavior and affected discipline has an authority source.

## 2. Select journeys and risks

Cover the normal path and only meaningful edges: cancel, defeat, retry, transfer, save/load, party changes, repeated interaction, plugin load order, missing assets, and recovery from interruption. Include timing, camera, audio, input, and comfort only when affected.

Done when: each acceptance criterion maps to a scenario or an explicitly non-QA sensor.

## 3. Update living documents

- Update existing journeys instead of duplicating them.
- Create or reset content-addressed scenario files for changed behavior.
- Create bug records by stable symptom identity; deduplicate the same symptom.
- Write a focused cycle charter with setup, saves, maps, actors, switches, variables, plugin parameters, steps, observables, evidence, and teardown.

Use the repository's existing schemas. Keep run scratch outside durable docs; store only durable evidence links and verdicts.

Done when: the QA tree identifies exactly what must be played, observed, and recorded.

## 4. Handoff

Update `planos/tasks/<slug>/verification.md` with scenario IDs and required human checks. Leave all unexecuted verdicts truthful.

Done when: `rpg-maker-mz-qa-execution` can run the plan without guessing game state or expected outcomes.
