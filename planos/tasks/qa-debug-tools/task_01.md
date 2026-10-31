---
status: pending
title: Record ADR-G007 and amend the QA policies
---

# Task 01: Record ADR-G007 and amend the QA policies

## Outcome

The project has an accepted general decision that allows a QA-only Debug plugin, used by human QA and by QA agents, within D-2's limits. SD-015 and the spec playbook point to it instead of forbidding it outright.

## Sources

- Spec: `_spec.md` Delivery Obligations, Key Decisions D-1, D-2, D-5, Constraints (policy change)
- Stories: US-007 (agent use and provenance)
- Required document updates:
  - Create `docs/adrs/adr-g007-ferramentas-de-debug-para-qa.md` with `game-create-adr`.
  - Index it in `docs/adrs/README.md`.
  - Amend SD-015 in `docs/_memory/standing_directives.md` and the Project Baseline of `docs/_memory/spec-authoring-playbook.md` ("no shipped QA console or seed setter", "Normal UI: no … seeds, or QA controls") to cite ADR-G007 as the bounded exception, preserving their other rules.

## Checks

- Inline case: given the three documents after this task, then ADR-G007 states every one of D-2's limits: legal actions only; disabled in the source by default; build gate; agent evidence records the jump or scenario and the seed; plugin enabled only in an agent's prepared runtime. The ADR links back to this spec, and SD-015 and the playbook cite it without dropping any other rule.

## Scope

- Starting points: `docs/adrs/README.md`, `docs/adrs/adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md` (the format of the latest general ADR), `docs/_memory/standing_directives.md`, `docs/_memory/spec-authoring-playbook.md`.
- Shared files: none with other tasks.
- Delete targets: none.

## Done When

The user has accepted the ADR text (its status records the date and their words), or the ADR is marked proposed and the task stays blocked until they accept it.

## Execution Notes
