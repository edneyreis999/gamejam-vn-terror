# Running, recording, and debugging tests

Use the maintained project command and existing scenario criteria. [Game Playwright Best Practices](../../game-playwright-best-practices/SKILL.md) owns registration, fixtures, evidence, and reliability.

## Run the selected tests

Use the requested scope through the project command. Direct runner syntax, when it is that command's entry point:

```bash
PLAYWRIGHT_HTML_OPEN=never npx --no-install playwright test tests/game/menu.spec.ts
```

The file is an example; choose the actual registered case. A diagnostic run does not silently expand to the full suite. Missing infrastructure goes to its existing owner rather than invoking a new scaffold.

## Attach to a failing test

Check the installed runner's `test --help` for `--debug=cli` and the CLI's `attach --help`. Availability differs by version; do not upgrade the project merely because an upstream example uses a newer feature. If unavailable, use the installed runner's supported debug mode or its existing traces and report that boundary.

When supported, run the selected test in a managed background process and wait for its printed debugging instructions and session name:

```bash
PLAYWRIGHT_HTML_OPEN=never npx --no-install playwright test tests/game/menu.spec.ts --debug=cli
# In another invocation, attach to the actual session name from that output:
playwright-cli attach tw-abcdef
```

Use the attached session identity for subsequent commands, following the CLI output. An ambient `PLAYWRIGHT_CLI_SESSION` must not redirect actions to an unrelated session. Keep the test process alive while investigating; detach and stop the owned background test on every exit, including failure.

Preserve the test's real fixture and starting state. Attach to an existing affected test when diagnosing its failure; do not mandate an empty seed test for unrelated exploration. Inspect screenshots for canvas content, snapshots for DOM content, console/network errors, and the actual failed step. Engine-specific readiness and observations come from discovered technology guidance.

Distinguish a product defect from a stale observation or infrastructure problem. Fix technical mistakes within scope while preserving the contracted outcome. Intentional behavior changes need existing authorization; ambiguity returns to the caller/user. Do not modify expected results to match a regression, or automatically mark the test skipped/fixme because a bug was confirmed. Rerun the affected case through the maintained command and retain the original failure.

## Record actions as source material

```bash
# With an owned, open, named session:
playwright-cli recording-start
# Perform the authorized actions against observed targets.
playwright-cli recording-stop
```

The generated code can help author a test, but recording does not supply independent assertions, fixtures, isolation, or cleanup. Review locators and canvas coordinates; add readiness and assertions from the agreed behavior. A snapshot of the current implementation can identify an element or document a failure, but does not automatically establish the expected value.

Use the project's test layout; neither one file per test nor a new spec document is mandatory. Preserve complete journeys and distinct selectable variants. Generating code does not authorize changing a spec. Interactive user feedback and publishing recordings happen only when requested, not as routine debugging checkpoints.
