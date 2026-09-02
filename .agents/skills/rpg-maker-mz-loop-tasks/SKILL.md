---
name: rpg-maker-mz-loop-tasks
description: Drives an approved RPG Maker MZ task graph through implementation, QA, review, and final verification using only repository state. Use when `planos/tasks/<slug>/tasks.md` must run uninterrupted. Don't use for spec authoring, one-off work without a task graph, or automatic commits.
---

# RPG Maker MZ Task Loop

Resume from durable artifacts. Do not create separate workflow state or memory files; derive progress from `tasks.md`, `task-NN.md`, and `verification.md`. Continue in the same session until complete or evidence-backed blocked.

## Phase 0 — Detect

Read `AGENTS.md`, the full spec directory, affected discipline contracts, current Git state, and QA state. Trace affected plugins, data/events, saves, and runtime/playtest evidence. Reconcile task status with actual implementation and evidence. Select the earliest dependency-ready pending task.

Done when: exactly one next phase is selected: task, QA, review, final verification, or done.

## Phase B — Execute one task

Mark one ready task `in_progress`, activate `rpg-maker-mz-execute-task`, and run its focused validation. Update `task-NN.md`, `tasks.md`, and `verification.md` only after evidence is fresh. Leave the verified diff for manual commit.

When native subagents exist, use them only for independent bounded exploration or review. Execute inline when unavailable; missing subagents never block progress.

Done when: the task is completed or carries a precise blocked state, and no commit or remote action occurred.

## Phase C — QA tail

After implementation tasks complete, activate `rpg-maker-mz-qa-report`, then `rpg-maker-mz-qa-execution`. Repair in-scope failures through the owning task and rerun affected scenarios.

Done when: both QA tasks have truthful evidence-backed status.

## Phase D — Review

Activate `rpg-maker-mz-deep-review` over the full spec diff. Resolve confirmed findings, rerun stale checks, and repeat until the verdict is `SHIP` or an external blocker is proven.

Done when: the review verdict applies to the current tree.

## Phase E — Close

Activate `deslop` and `rpg-maker-mz-final-verify`. Require explicit human approval only for criteria assigned to human judgment. Record the final lifecycle states in `verification.md`.

Done when: every task and required sensor passes, the final verdict is truthful, processes are torn down, and all commits remain manual.
