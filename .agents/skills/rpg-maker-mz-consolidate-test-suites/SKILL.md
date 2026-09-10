---
name: rpg-maker-mz-consolidate-test-suites
description: Places RPG Maker MZ tests in the canonical suite that owns the invariant. Use when Jest, harness, save, event, plugin, data, or playtest coverage is being added, moved, or consolidated. Don't use to replace test design or to create a duplicate regression file.
---

# Consolidate RPG Maker MZ Test Suites

## 1. Name the invariant

State the behavior that must remain true, the defect it catches, and whether it belongs to pure logic, plugin integration, event lifecycle, data integrity, save compatibility, scene/rendering, or playtest.

Done when: the invariant can fail independently of its current implementation.

## 2. Find the owning layer

Read `AGENTS.md`, Jest and harness configuration, current test trees, setup files, fixtures, and related suites. Use [the placement rules](references/test-placement-rules.md) in full.

Done when: one canonical suite has the closest authority and runtime fidelity.

## 3. Consolidate

Extend the owning suite and reuse its setup. Merge duplicated fixtures and remove redundant coverage only after the canonical test proves the same invariant. Keep human playtest criteria in QA scenarios rather than encoding subjective claims as brittle snapshots.

Done when: the invariant has one primary test home and no weaker duplicate remains.

## 4. Verify placement

Run the narrow suite, then the affected aggregate command. Confirm isolation, cleanup, deterministic order, and that failures point to the owned behavior.

Done when: the canonical suite fails for the intended regression and passes cleanly without hidden coupling.
