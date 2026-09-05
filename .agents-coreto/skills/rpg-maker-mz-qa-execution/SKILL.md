---
name: rpg-maker-mz-qa-execution
description: Executes RPG Maker MZ QA through the project's real playtest or harness interfaces and records durable evidence. Use when planned journeys or scenarios must be walked, defects reproduced, or human quality judged. Don't use to replace unit tests or approve contracts on the owner's behalf.
---

# RPG Maker MZ QA Execution

Play the game as the named player persona. Use the project's declared automation where it represents the same behavior; use RPG Maker MZ or the packaged NW.js build for runtime and human claims.

## 1. Prepare a reproducible run

Read `AGENTS.md`, the cycle charter, scenario files, `planos/tasks/<slug>/verification.md`, and affected discipline contracts. Record revision, tool versions, game build, plugin set and order, input files or hashes, starting save, map, party, switches, variables, and parameters.

Done when: another tester can recreate the starting state.

## 2. Execute by sensor

- Run scripted harness steps for deterministic state and lifecycle assertions.
- Use live playtest for event timing, transfers, battle flow, input, camera, visual composition, audio, and recovery.
- Observe only public game or authoring surfaces unless the scenario explicitly diagnoses internals.
- Capture screenshots, logs, state dumps, save fixtures, or recordings that prove the expected observable.

Keep unrelated failures separate. When a scenario fails, register the symptom once, preserve evidence, repair through the applicable execution task, and rerun the affected path from a clean start.

Done when: every planned scenario has `pass`, `fail`, or an evidence-backed blocked verdict.

## 3. Record durable truth

Update scenario verdicts and write the dated report under the existing `docs/qa/reports/` convention. Link evidence by path, record deviations and remaining risks, and update `verification.md` without promoting unsupported states.

Done when: the report distinguishes scripted, runtime, and human observations and every claim links to fresh evidence.

## 4. Teardown

Stop playtests, debug servers, watchers, capture processes, and temporary runtime instances created for the run. Follow project teardown instructions when present.

Done when: no process created by the run remains active.
