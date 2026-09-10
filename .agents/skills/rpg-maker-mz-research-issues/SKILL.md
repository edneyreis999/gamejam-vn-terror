---
name: rpg-maker-mz-research-issues
description: Turns an RPG Maker MZ subsystem question or defect cluster into evidence-backed local research and an executable spec backlog. Use when plugins, events, data, saves, PixiJS, NW.js, assets, or tooling require broad investigation. Don't use for implementation or remote issue publication.
---

# Research RPG Maker MZ Issues

## 1. Frame the investigation

Read `AGENTS.md`, current plans, QA bugs, and relevant game surfaces. Define the question, exclusions, evidence standard, and independent research slices.

Done when: every slice can be investigated without overlapping ownership.

## 2. Investigate

Use native read-only subagents in parallel when available; otherwise work through the same slices sequentially. Trace plugins, data, event commands, save paths, scenes, rendering, audio, inputs, assets, tests, and runtime logs only where relevant. Cite repository paths and line-level evidence.

Done when: each slice distinguishes facts, inferences, risks, and unknowns.

## 3. Synthesize once

Write one `planos/tasks/<slug>/research.md` with problem, current mechanism, evidence, root causes or design forces, options, recommendation, risks, and open decisions. Avoid one file per researcher.

Done when: the synthesis covers every slice without copying their prose.

## 4. Convert to executable work

For design work, activate `rpg-maker-mz-create-spec`; for an approved spec, activate `rpg-maker-mz-create-tasks`. Carry evidence paths and unresolved risks forward. Keep unrelated opportunities in a concise follow-up section.

Done when: each recommended change is owned by a local spec/task or explicitly excluded, with no implementation or remote publication.
