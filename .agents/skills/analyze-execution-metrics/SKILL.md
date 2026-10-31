---
name: analyze-execution-metrics
description: Inventory the errors documented in a completed spec execution's records, classified by origin and category. Manual use only, when the user explicitly asks; read-only survey, no fixes or skill changes.
disable-model-invocation: true
---

# Analyze Execution Metrics

Examine the records available for one spec execution in this game project and produce an inventory of the documented errors. This stage only surveys and classifies: do not modify project files, reproduce executions, or propose changes to skills.

Inputs: the target spec (its directory, usually under the project's task planning folder) and the project root. Ask only if the spec cannot be identified.

## Collect

Scripts in [scripts](scripts) are read-only Python 3 standard-library collectors; run them with `python3 -B` from this skill's directory and see [collection](references/collection.md) for arguments. Write their JSON output to a scratch directory outside the project, not into it. Use them to locate and read records; classification is yours.

Read, in this order, whatever exists: spec documents and task execution notes; the spec's `execution-metrics/` records (recorded findings, quality gaps, failed commands) when present; verification receipts and failed-job logs they cite; documents and artifact files linked from the notes. Treat recorded metrics findings as evidence to cross-check against the notes, not as the inventory. Read the cited lines before selecting them.

## Inventory

For each occurrence record:

- Task and the exact evidence reference (file and lines, or record id).
- What the agent was trying to do and which error occurred.
- Origin, when demonstrable: agent action or omission, pre-existing product defect, environment problem, or indeterminate.
- One primary category: Infrastructure, Tests, Implementation, Instruction discovery, or Planning and coordination. Add secondary categories with a brief justification. If the evidence does not allow classifying, say so.
- Observed consequence, recorded fix or fix attempt, and known result.
- Documented cause; when there are only hints, a cause explicitly labeled as hypothesis.

Rules:

- Keep a reference for every occurrence, even when grouping similar episodes. Separate distinct errors from successive attempts to resolve the same error.
- A failing test is not automatically a product bug or an agent mistake.
- Do not conclude an instruction was missing without checking that hypothesis against the available instructions.
- Missing time or token measurements do not exclude a case; absence of measurement is not zero.

## Deliver

Present the inventory as a table, followed by the sources examined and the gaps that limit completeness (unavailable files, quality gaps, absent transcripts, unreviewed images). [Inventory format](references/inventory-format.md) describes the optional renderer and validator that build and check the table from selected evidence lines. Return the inventory in the reply; save it to a file only at a path the user names.
