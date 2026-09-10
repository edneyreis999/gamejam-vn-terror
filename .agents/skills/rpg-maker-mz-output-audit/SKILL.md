---
name: rpg-maker-mz-output-audit
description: Audits agent-produced RPG Maker MZ implementation and evidence for completeness, false confidence, and contract drift. Use when an implementation batch or plausible generated output needs independent checking. Don't use as the primary implementation workflow or as human approval.
---

# RPG Maker MZ Output Audit

Evaluate the output independently from the producing narrative.

## 1. Discover the contract

Read `AGENTS.md`, the spec directory, affected discipline contracts, changed files, tests, QA documents, and claimed evidence. Record the current revision and input set.

Done when: the audit has a frozen claim-to-authority map.

## 2. Audit implementation

Use [the audit template](assets/audit.template.md). Check scope completeness, authority parity, dead or duplicated logic, `PluginManager` registration and aliasing, MZ lifecycle, data references, saves, scenes, rendering, input, audio, assets, cleanup, and tool integration only where affected.

Challenge AI failure patterns: tests that reproduce the implementation, mocks that bypass the defect, copied boilerplate, silent fallbacks, stale evidence, unhandled negative paths, overbroad edits, and plausible output unsupported by runtime observation.

Done when: every changed path and every acceptance criterion has an evidence-backed verdict.

## 3. Audit evidence

Confirm commands exited successfully, outputs are complete, revisions and inputs match, runtime evidence observes the intended surface, human judgments are explicit, and release state does not exceed its prerequisites.

Done when: stale, missing, circular, or weaker-than-claimed evidence is identified.

## 4. Report

Classify findings by severity, confidence, root cause, exact source, player or author impact, and required proof after repair. Deduplicate by root cause and give one verdict: `PASS`, `FIX`, or `REWORK`.

Done when: the report can drive repairs without guessing and no implementation, approval, commit, or remote publication occurred.
