---
status: pending
title: Restore the green maintained suite
---

# Task 07: Restore the green maintained suite

## Outcome

`node rpg-maker/tools/run-tests.mjs --scope all` passes on the current game, so later tasks can use the suite as their regression check. Every test that was failing is either fixed with its cause known, or removed for a stated test-value reason.

## Sources

- Spec: Delivery Obligations, "Green maintained suite" (amendment of 2026-10-31)
- Project rules: AGENTS.md "Testes" (red-test rules and the eight test-value questions); ADR-G006 (heavy-test selection and teardown)

## Checks

- Inline case: a fresh run of `node rpg-maker/tools/run-tests.mjs --scope all --output <new dir>` finishes with no failed or blocked test. Its effective limits and sources, coverage and cleanup outcome are recorded.
- Inline case: `node --test rpg-maker/tests/design-system-cli.test.mjs` passes.
- For each test that was failing, Execution Notes record its ID, the cause found and the resolution: game fixed, test updated, or test deleted with the question it failed.

## Scope

- Starting points: the baseline run listed in Execution Notes; `rpg-maker/tests/README.md`, `test-manifest.json`, `execution-groups.json`.
- Shared files: `rpg-maker/tests/test-manifest.json` (task 06 also registers its checks there; ordered by the graph).
- Stop rule: a failure whose fix would change gameplay, a confirmed GDD rule or a save contract is reported to the user and the task is blocked on it. It is not fixed silently.
- Never run against the user's server on port 18726; the runner uses isolated ports.
- Delete targets: only tests that fail the AGENTS.md test-value questions, each named with its question.

## Done When

No test was deleted only because it was red.

## Execution Notes
