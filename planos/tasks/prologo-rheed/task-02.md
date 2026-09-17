---
id: 02
status: completed
depends_on: [01]
verification_ids: []
---

# Task 02 — Plan the directed QA cycle

## Outcome and authority

Activate `rpg-maker-mz-qa-report`. Turn [verification](verification.md) S01–S05 into a resumable cycle in the existing `docs/qa/` tree. Depends on the sole implementation leaf, task 01. Owns QA planning only; it does not take V-001–006 verdict ownership.

## Scope and checklist

- [x] Read the delivered diff, task-01 evidence, approved spec and all four discipline contracts; retain explicit unverified items.
- [x] Update existing native complete-campaign/local-entry journeys and applicable scenarios/charters, using the existing QA schema. Do not rewrite historical reports as new passes.
- [x] Prepare a cycle covering S01 opening, S02 controls, S03 persistence, S04 return, S05 audio. Name actual baseline/new save fixtures, real checkpoint availability and observation methods supplied by task 01.
- [x] Carry mouse/keyboard, supported native viewports, normal/reduced-motion, narrator/Ivaí/no-bust states and baseline/new-save distinctions. Honor ADR-G003's native-zoom exclusion.
- [x] Use 1280×720 and 1920×1080 effective game areas at standard browser scale per ADR-G003. Historical native-mz-cycle instructions mentioning expeditionQA, setSeed or revision gates are superseded by GDD §26: do not reuse those removed APIs or mutate the campaign through inspection.
- [x] Assign resumable lots: opening/composition; controls/persistence/return; audio/editorial review. Each gets entry state, steps, expected authority, evidence path, invalidation dependencies and completion checkpoint.
- [x] Identify human requests for framing, audio listening and narrative pacing; no automated inference of human approval.
- [x] Record QA tracker impact. In-scope defects belong to the existing discipline bug registry; do not create separate remote QA cards or send messages without authorization.

## Validation and operations

Planning references [spec](spec.md) and [verification](verification.md), not assumed UI behavior. Use `npm start` only when runtime preparation is needed, after reading `docs/_memory/local-game-run.md`; default URL is `http://127.0.0.1:18726/`. Verify served content before reusing an occupied port; do not terminate unknown processes. A new port has separate saves. Track session-owned processes for teardown.

Evidence target: `docs/qa/evidence/prologo-rheed/task-02/`; cycle report under `docs/qa/reports/`. Reuse task-01 hashes/fixtures, not old runtime verdicts. Plan completeness, traceability and runnable setup are this task's output. No production data, assets or test code changes; delete targets: none.

## Execution notes

Completed on 2026-09-17. The runnable guide, charter and cycle report are in docs/qa; five existing scenarios and four native journeys now link the incremental scope. PR-N/PR-D must be earned through public actions; PR-F is not a save and PR-OLD is unavailable. Task-01 technical evidence is retained only as supporting evidence. No runtime, assets, tests or remote tracker were changed; no QA session or human acceptance is claimed. Local Markdown targets, S01–S05/V-002–006 coverage and diff whitespace checked.
