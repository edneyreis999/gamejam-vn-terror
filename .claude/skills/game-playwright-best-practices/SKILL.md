---
name: game-playwright-best-practices
description: Write, review, run, and debug Playwright tests for games in a browser. Covers scenario registration, fixtures, canvas interaction, evidence, and stability; engine-specific behavior comes from discovered technology guidance.
license: MIT
metadata:
  author: Loki
  credits: Adapted from Currents Playwright Best Practices v1.2
---

# Game Playwright Best Practices

Use Playwright Test (`@playwright/test`) for maintained browser E2E tests. Exercise the player's path and assert independent expected outcomes. Discover the game's technology guidance for its input, scenes, storage, and runtime limitations; do not invent a generic engine API or assume browser evidence qualifies a native runtime.

## Ownership

- [Game Test Infrastructure](../game-test-infrastructure/SKILL.md) owns creation and repair of project runners and fixtures. The project command remains the execution entry point; this skill supplies Playwright-specific practices.
- [Playwright CLI](../playwright-cli/SKILL.md) supplies interactive browser operation and debugging when that tool is needed. Ordinary suite runs do not require a CLI session.
- [Game Execute QA](../game-execute-qa/SKILL.md) owns persona sessions and public-interface evidence. A scripted test run or a recording is not a persona session or human acceptance.
- The calling task owns scope, criteria, and verdicts. Reuse its records and current authorization; this skill does not require another spec, seed test, report, or delivery loop.

## Defaults

| Concern | Practice |
| --- | --- |
| Test unit | One independently selectable scenario/variant per `test()`; dependent actions use `test.step()` |
| Lifecycle | Browser per worker, isolated context/page per case, cleanup on every exit |
| Helpers | Receive the owned page/context; never hide another browser or campaign |
| Readiness | Bounded observations of actual game/control readiness; no arbitrary sleeps |
| Evidence | Trace the context running the game and measure preparation through cleanup |
| Stability comparison | Retries disabled, preserved coverage, assertions, and observation budgets |

Keep expected results anchored in the agreed behavior. Generated action code and current screenshots are observations to review, not automatic expected values. Diagnose a failing test as product, preparation, infrastructure, or stale observation before changing it. Do not rewrite a spec, weaken an assertion, update a baseline, or mark a defect `fixme` just to obtain green results. Apply already authorized behavior changes; ask only when a missing product decision blocks correct work.

## References

| Task | Read |
| --- | --- |
| Register cases, change fixtures/scheduling, diagnose lifecycle failures, or compare stability | [Fixtures and execution](references/fixtures-and-execution.md) |
| Implement input, waits, visual assertions, traces, error capture, or phase timing | [Interaction and evidence](references/interaction-and-evidence.md) |
| Prepare reproducible data/helpers or test persistence, time, failures, locales, or accessibility | Relevant section of [Test scenarios](references/test-scenarios.md) |

Use only branches required by the game and requested checks. Validate changes with the affected cases through the maintained command; static review alone is not proof that a journey passes or stability improved. Preserve failed attempts and disclose unexecuted work.
