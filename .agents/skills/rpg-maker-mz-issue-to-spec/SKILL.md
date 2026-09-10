---
name: rpg-maker-mz-issue-to-spec
description: Converts a local RPG Maker MZ issue, bug report, or feature brief into the canonical local spec workflow. Use when the starting input is less structured than `planos/tasks/<slug>/spec.md`. Don't use for tracker synchronization, remote publication, or implementation.
---

# RPG Maker MZ Issue to Spec

Keep the repository local artifacts as the only source of truth.

## 1. Normalize the input

Read `AGENTS.md`, the issue text, reproductions, logs, screenshots, saves, plugin parameters, maps, events, and linked local files. Separate observed facts, desired outcomes, constraints, and hypotheses.

Done when: the input has a stable slug, concrete problem statement, evidence, and open decisions.

## 2. Choose the path

- For a defect with known intended behavior, create or update the matching bug record under the existing `docs/qa/` taxonomy, then spec the fix when design or multi-surface work is required.
- For a feature or ambiguous change, activate `rpg-maker-mz-spec-preflight` and `rpg-maker-mz-create-spec`.
- For a duplicate, enrich the existing local artifact and stop.

Done when: one canonical local artifact owns the work.

## 3. Complete the local workflow

Carry source evidence into `spec.md` and `verification.md`, preserve links to QA artifacts, and request approval through the spec skill. After approval, offer local peer review and task creation.

Done when: local files contain all traceability and no tracker synchronization, remote publication, commit, push, or PR action occurred.
