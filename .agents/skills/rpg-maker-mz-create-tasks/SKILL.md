---
name: rpg-maker-mz-create-tasks
description: Decomposes an approved RPG Maker MZ spec into dependency-aware implementation tasks with complete verification ownership. Use when `spec.md` and `verification.md` are approved and execution files are needed. Don't use to approve the spec, implement tasks, or create unrelated backlog work.
---

# Create RPG Maker MZ Tasks

Write `tasks.md` and `task-NN.md` files under `planos/tasks/<slug>/`.

## 1. Survey the complete contract

Read `AGENTS.md`, `spec.md`, `verification.md`, every `<slug>.<discipline>.md`, durable contracts they reference, affected code/data, and canonical tests. Use a native read-only subagent when available; otherwise perform the same inventory inline.

Done when: every requirement, authority source, affected MZ surface, validation criterion, and local reference is accounted for.

## 2. Design vertical tasks

Split work by independently verifiable behavior, not by file type. Assign dependencies explicitly. Include plugin/data/event/save/tooling work together when they produce one observable slice. Add a separate task only when it owns a distinct outcome.

Done when: each task can be executed without guessing scope and the graph is acyclic.

## 3. Assign verification exactly once

Assign every verification criterion to one implementation or QA task as primary owner. Name the canonical suite before adding tests. Include static, Jest/harness runtime, live playtest, visual, audio, human, and release evidence only when selected by `verification.md`.

Done when: no criterion is unassigned or assigned to multiple primary owners.

## 4. Materialize files

Use [the task graph template](assets/tasks.template.md) and [the task template](assets/task.template.md). Each task names authority sources, files or data, implementation, tests, evidence, dependencies, and completion status. Then activate `rpg-maker-mz-tasks-tail-qa-pair`.

Done when: `tasks.md` and every `task-NN.md` agree on IDs, dependencies, status, and verification ownership.

## 5. Validate with the user

Check paths, graph order, scope size, QA tail, and delete targets. Present the graph and revise until approved. Do not implement or commit.

Done when: the task suite is approved and ready for `rpg-maker-mz-loop-tasks`.
