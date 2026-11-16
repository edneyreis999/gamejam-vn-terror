# Test registration, fixtures, and execution

Read when registering browser tests, changing fixtures or scheduling, or comparing stability. Use the project-owned command and root resource policy.

## Register the real test unit

Declare each independently selectable E2E scenario/variant as a named `test()` during discovery. Use stable IDs in titles so filtering, reporting, and failures identify the same work. Register from maintained inputs, not from results generated during another test.

When reorganizing an existing harness, map each original browser job to a runner-visible test and preserve its cases, variants, assertions, and dependencies. A subprocess exit code or a successfully written report does not substitute for the original assertions. Do not wrap a whole campaign in one test, or represent independent cases only as steps hidden inside a loop. Fast Node checks and native runtime checks keep their appropriate runners.

Keep dependent player actions, such as New Game → Save → Continue, in one journey with named steps. Separate producer/consumer jobs need an explicit setup dependency and declared artifact handoff; file order, shared globals, and enabling serial mode do not establish that contract. A producer failure leaves its consumers visibly blocked/skipped, never passed.

```javascript
// Project-owned imports: each entry is an independently selectable journey.
import { test } from './fixtures.js';
import { journeys } from './journeys.js';

for (const journey of journeys) {
  test(`${journey.id}: ${journey.name}`, async ({ page, game }) => {
    await test.step('Open game', () => game.open(page));
    await test.step('Player actions', () => journey.play({ page, game }));
    await test.step('Expected outcome', () => journey.assert({ page, game }));
  });
}
```

Here `game` and `journeys` are project helpers, not engine APIs. Their actions use the supplied page; their assertions retain the expected outcomes of every case. Compare `playwright test --list` with the requested IDs/variants, then reconcile actual results. Native scheduling needs independently registered tests, not another queue concealed inside each test.

Playwright normally runs tests within one file sequentially. For independent, isolated journeys registered in one file, enable `fullyParallel` or a parallel describe group when concurrency is intended. Keep dependent actions within their journey and preserve explicit setup dependencies; adding workers alone does not parallelize a single serial file.

## Fixtures and resource lifecycle

Use the built-in `browser` fixture at worker scope and `context`/`page` at test scope. Reuse the browser process while resetting game state and storage between cases. Do not share a mutable page in `beforeAll`, or call `chromium.launch()` inside each journey/helper. Playwright may replace a worker after a failure; worker setup must tolerate recreation.

Put disposable game preparation and its loopback HTTP server in project fixtures. Serve the actual playable build and its assets. A server may be shared when its served inputs are immutable; mutable game data, saves, browser profiles, and evidence paths require isolated ownership. Build shared plugin outputs before dispatch. Use `testInfo.outputPath()` under a distinct output root per invocation for artifacts.

Acquire resources inside a protected scope and register disposal as each acquisition succeeds, including resources created before fixture setup finishes. Use fixture teardown with `try/finally`; attempt all owned disposals even if one fails. Preserve the original failure and report cleanup errors separately. Close additional contexts and servers; let the built-in fixture close its browser. A retained browser after a successful test is expected until worker teardown; an unowned browser or context is not.

For additional contexts, inherit the required viewport/locale and add tracing explicitly. A fresh context does not inherit the first context's saves. Use extra browsers only when the test contract needs them, and account for them under the existing browser ceiling. For the ordinary one-browser-per-worker case, cap workers by both resolved worker and browser limits; account for other active jobs rather than starting nested pools at full capacity.

## Diagnose instability and compare changes

For an authorized stability comparison, keep `retries: 0` before and after. Hold selected IDs/variants, assertions, timeouts, fixture inputs, runtime/renderer, concurrency, and evidence settings constant unless one is the stated variable. Keep failed attempts and label changes in conditions; a faster run with omitted cases is not an improvement.

Use the maintained project command's selection, trace, and repetition options. Playwright's `--repeat-each=N` creates separately reported attempts; choose repetitions for the investigation rather than adding a mandatory burn-in to every edit. Running a failing selection with one worker can help diagnose contention, but record the changed concurrency. Inspect readiness, resource ownership, console errors, and the failing step before changing scheduling. A pass on a later attempt does not erase the first failure.

| Failure pattern | Inspect first |
| --- | --- |
| One reported test represents hundreds of jobs | Discovery and registration; expose real scenario/variant units |
| Fresh browser for every case | Helpers bypassing the worker browser fixture |
| Empty trace while the game fails | A different context/browser owns the game |
| Dialogue confirmation is lost | Window readiness, pending waits, input processing and release |
| Passes alone, fails in parallel | Shared writable inputs, saves, ports, outputs, focus, and renderer contention |
| Continue has no save after reopening | IndexedDB capture/write completion, profile, and exact origin |
| Assertions pass but the command hangs | Fixture teardown, additional contexts, server handles, and worker shutdown |
