# Tracing

Commands assume the uniquely named session established in [session management](session-management.md).

## Capture the actual session

Open the owned browser before starting its trace, then navigate to the game. Starting after the game loaded misses initialization; opening another session after starting can trace the wrong context.

```bash
playwright-cli open
playwright-cli tracing-start
playwright-cli goto http://localhost:4173
# Perform the authorized journey or reproduction.
playwright-cli screenshot --filename=checkpoint.png
playwright-cli tracing-stop
playwright-cli close
```

Use the actual server URL and an owned artifact destination; filenames are examples. When attaching to an already tracing test, preserve runner-managed tracing instead of starting a conflicting session. Stop/export the capture before closing an owned context. If capture fails, still attempt cleanup and retain the original game failure alongside the capture error.

## Inspect the artifacts

Read the output paths emitted by the installed CLI. Versions can differ in archive layout; preserve the trace, network data, and required resources together. Open a supported artifact with that version's Trace Viewer rather than assuming a standalone `.trace` file is self-contained.

A trace can contain browser actions, DOM snapshots, screenshots, network requests, and console messages. It does not expose objects drawn in a canvas as DOM nodes. Inspect screenshots and the assigned observations for visual claims. Standalone context tracing also does not supply the runner's assertions or prove that the recorded journey met its criteria.

Capture before the suspected failure and preserve failed attempts. Do not remove old artifacts solely by age while they still support a report or dependent investigation. Cleanup is limited to owned disposable artifacts whose consumers are finished.

## Choose the sensor

| Artifact | Useful for | Limit |
| --- | --- | --- |
| Trace | Actions, requests, errors, timing within the captured context | Does not cover host-side preparation/cleanup or a different browser |
| Screenshot | Inspecting a rendered checkpoint or failure | One image does not establish a temporal behavior |
| Video | Observing a sequence or producing a requested demonstration | Recording alone does not establish correctness or audio coverage |

Tracing adds overhead. Keep capture settings comparable in a stability investigation. For maintained tests, read [interaction and evidence](../../game-playwright-best-practices/references/interaction-and-evidence.md) for runner tracing, first-attempt capture, and phase timings.
