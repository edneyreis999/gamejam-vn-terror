---
name: rpg-maker-mz-execute-task
description: Executes one approved RPG Maker MZ spec task end to end, including contract survey, implementation, focused validation, and tracking. Use when a concrete `task-NN.md` must be completed. Don't use for generic coding, spec authoring, review-only work, or automatic commits.
---

# Execute RPG Maker MZ Task

Execute uninterrupted. Resolve ordinary ambiguity through authority precedence and record the decision. Stop only for missing authority, destructive scope requiring permission, or an external evidence blocker.

## 1. Survey the complete contract

Read `AGENTS.md`, the task, `spec.md`, `verification.md`, `tasks.md`, every affected discipline contract, durable references, and relevant QA documents. Inventory the whole spec directory with a native read-only subagent when available; otherwise do it inline. Open every cited local artifact.

Authority precedence: machine-checkable constraints; owner-approved discipline contracts; verification criteria; `spec.md`; durable project decisions; task paraphrase; existing implementation. Record any conflict resolution.

Done when: every deliverable, requirement, affected MZ surface, and evidence obligation is in a numbered checklist.

## 2. Reconcile and implement

Capture a pre-change signal. Inspect current Git and runtime state, preserving unrelated work. Implement the smallest coherent behavior while following project patterns and real dependency APIs. Keep plugin code, data ownership, event lifecycle, save schema, presentation, and tooling responsibilities separated.

Done when: every checklist implementation item is complete and out-of-scope work is recorded rather than silently added.

## 3. Validate

Run each task command and the canonical affected suite. Activate `rpg-maker-mz-testing-boss` for test design, `rpg-maker-mz-jest` for Jest work, and `rpg-maker-mz-final-verify` for the task claim. Use runtime or human evidence where `verification.md` assigns it. Fix failures at their root and rerun stale checks.

Done when: every checklist criterion has fresh evidence or an exact blocked verdict.

## 4. Update tracking

Activate `rpg-maker-mz-workflow-memory`. Record decisions, touched surfaces, evidence, and follow-ups in existing durable artifacts. Mark the task completed only after verification and self-review; reconcile `tasks.md` and `verification.md` without changing graph topology accidentally.

Done when: tracking matches the tree, no process remains active, and the verified diff is left for manual commit.

## Directed execution and resumption

Resolve the approved execution mode/reference and later scoped user decisions.
Route browser work through installed qa-execution, which owns the procedure.
Honor user pauses before browser launch, including smoke checks. Reconcile the
existing plan; invoke qa-report only for missing/affected planning. Consolidate
valid evidence and remaining gaps by lot; continue independent lots when one
is blocked. A dependent sensor failure cannot be treated as PASS. Preserve first
failure, causal prefix and required history; after two attempts without new
information, record the gap and next refutable hypothesis in the task owner.
