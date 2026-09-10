---
name: rpg-maker-mz-black-box-playtest-audit
description: Audits directed RPG Maker MZ execution and evidence on direct human request.
disable-model-invocation: true
---

# Directed playtest audit

## 1. Establish authority

Require a direct human request for this audit. Read the selected scenario,
verification contract and [references/audit-rubric.md](references/audit-rubric.md)
in full. Define whether the request covers existing evidence or a new execution.

Done when: audit scope, sources and authorization are explicit.

## 2. Inspect the evidence

Apply the rubric to the actual run and source identities. Record discrepancies,
missing proof and operational causes without supplying a successful outcome.
If new execution is authorized, use qa-execution's directed workflow and honor
user pauses. Audit does not impose separate roles, card approval or replay.

Done when: each assigned claim is supported or has a concrete finding.

## 3. Report

Persist findings and scoped conclusions in the existing QA artifact owner.
Distinguish code inspection, collected runtime, perceptual review and explicit
human acceptance. Preserve original evidence and cleanup any owned resources.

Done when: every conclusion links to evidence and limits remain visible.
