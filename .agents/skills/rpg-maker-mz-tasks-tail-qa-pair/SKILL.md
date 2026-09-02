---
name: rpg-maker-mz-tasks-tail-qa-pair
description: Appends the canonical RPG Maker MZ QA planning and execution tasks to an implementation task graph. Use when every `rpg-maker-mz-create-tasks` run reaches its task-graph tail. Don't use to execute QA, duplicate existing QA tasks, or add unaffected discipline documents.
---

# RPG Maker MZ QA Tail Pair

## 1. Inspect the graph

Read `tasks.md`, every task file, `verification.md`, affected discipline contracts, and current `docs/qa/`. Identify all implementation leaves and the selected static, runtime, visual, audio, human, and release sensors.

Done when: QA dependencies and required evidence are explicit.

## 2. Append planning QA

Create one pending task that depends on every implementation leaf and activates `rpg-maker-mz-qa-report`. Assign journey/scenario/charter updates and QA tracker impact without stealing implementation criteria.

Done when: the planning task can produce a complete playtest plan from existing authority.

## 3. Append execution QA

Create one pending task that depends on planning QA and activates `rpg-maker-mz-qa-execution`, followed by `rpg-maker-mz-final-verify`. Assign runtime and human criteria from `verification.md` exactly once. Require repair and rerun for in-scope failures.

Done when: the execution task owns every remaining QA criterion and no criterion is duplicated.

## 4. Validate the tail

Update graph edges, IDs, and task summaries. Ensure both tasks use project-declared commands, saves, maps, observables, evidence paths, and teardown requirements. Leave status pending and commits manual.

Done when: the graph has one ordered QA pair at its tail.
