---
name: rpg-maker-mz-workflow-memory
description: Preserves durable execution context inside existing RPG Maker MZ spec artifacts. Use when task execution or loop resumption must record decisions, evidence, progress, risks, and follow-ups without a separate memory tree. Don't use for transient scratch notes or duplicate status stores.
---

# RPG Maker MZ Workflow Memory

Existing artifacts are the memory.

## 1. Read before writing

Read `tasks.md`, the current `task-NN.md`, `verification.md`, `spec.md`, affected discipline contracts, and existing `decision-NNN.md` files. Reconcile their status with the working tree and evidence.

Done when: current progress and contradictions are known without relying on chat history.

## 2. Place each fact once

- Put graph and summary status in `tasks.md`.
- Put task checklist, touched surfaces, focused evidence, and follow-ups in `task-NN.md`.
- Put sensor results, freshness, lifecycle states, and release verdict in `verification.md`.
- Put a durable architectural or product decision in `decision-NNN.md` only when no existing owner can hold it.
- Put discipline-owned game truth in `<slug>.<discipline>.md`.

Done when: every durable fact has one owner and no `memory/`, `state.yaml`, or parallel progress file was created.

## 3. Make resumption deterministic

Record exact paths, commands, inputs, evidence, unresolved risks, and the next dependency-ready task. Keep status truthful when work is partial or blocked.

Done when: another agent can resume from repository files alone.
