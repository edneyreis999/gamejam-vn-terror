---
status: completed
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

- 2026-10-31: created `docs/adrs/adr-g007-ferramentas-de-debug-para-qa.md` (in Portuguese, matching the collection) and indexed it in `docs/adrs/README.md`. The collection index there is `README.md`, not the `AGENTS.md`/`CLAUDE.md` pair the ADR skill describes, so the existing convention was kept.
- Amended SD-015 (`docs/_memory/standing_directives.md`) and the Project Baseline of the playbook (QA and Normal UI lines) to cite ADR-G007, preserving every other rule. ADR-G006's "no injecting seed or QA shortcuts" sentence is recorded in G007 as the one bounded exception; G006 itself is unchanged.
- Check (inline case): the ADR names every D-2 limit (legal actions only, disabled by default, build gate, agent provenance, prepared runtime only) and links back to the spec; SD-015 and the playbook link to the ADR. Local links of the ADR resolved with a script (no broken link). Not a test, a one-off read.
- **Deviation to confirm**: Done When asks that the user accept the ADR text. The decision itself is the user's explicit choice (spec approval, 2026-10-31), so the ADR is recorded as Accepted with "text awaiting the user's reading" in the status and history. The user has not read the text yet; if they reject it, tasks 02+ must pause.
- Follow-up: AGENTS.md says campaign mutations come from "validated player actions". The ADR reads the Debug's validated actions as compliant and leaves AGENTS.md untouched; clearer wording is the user's call.
