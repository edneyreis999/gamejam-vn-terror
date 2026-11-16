# Interaction and evidence

Read when implementing browser input, waits, visual assertions, error capture, or phase timing. Engine guidance supplies concrete scene/input predicates.

## Readiness and actions

DOM auto-waiting does not establish readiness inside a canvas. A loaded URL, visible canvas, or idle network does not prove the game accepts input. Wait for the specific scene/control/resource condition with a bounded predicate; do not hide missing readiness with sleeps or inflated timeouts. Poll observations, not clicks, saves, or other mutations. Assertion polling remains enabled when test retries are zero.

Use semantic locators for real DOM controls. For canvas content, observe screenshots and use keyboard/mouse or supported touch input; compute coordinates from current canvas bounds and logical target geometry. Do not assume drawn text or buttons have DOM locators. Confirm input was processed, release held keys/buttons in `finally`, and verify the resulting action. Engine guidance determines whether frame barriers or input-state observations are needed.

In a technical E2E test, read-only state observations can support assertions but do not replace a required visual, audio, or public-interface sensor. Setting state or calling the internal feature under test belongs to declared preparation or an explicitly classified integration test. Persona QA follows its own public-observation protocol.

## Traces, errors, and phase timing

### Trace the context running the game

Prefer Playwright Test tracing for the fixture context: it includes runner steps and assertions. Standalone `context.tracing` captures browser operations but does not itself record test assertions. A trace of the wrapper page says nothing about a helper's separate browser or subprocess.

For ordinary runs, `trace: 'retain-on-failure'` captures the first attempt and retains failures. For an authorized before/after diagnostic comparison, use the same capture policy on both sides; `trace: 'on'` is useful when comparing successful attempts too. `trace: 'on-first-retry'` captures nothing when retries are disabled.

Start tracing any additional context before its first navigation, stop/export before closing it, and attach the resulting zip under a unique test/attempt path. Do not start a second tracing session on a context already managed by the runner. Export failure must not prevent context/server cleanup. Browser trace DOM snapshots do not expose the rendered scene graph; supplement with explicit state observations and screenshots where those are the required sensor.

Configuration fragment, merged into the project's existing config:

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 0,
  use: {
    browserName: 'chromium',
    actionTimeout: 10_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
```

The example omits project-specific server and worker configuration; preserve the existing resource policy and scenario budgets.

### Errors and diagnostics

Install `pageerror`, console-error, and relevant failed-resource listeners before navigation, on every page that runs the game. An engine can catch an exception and display its own error screen, so inspect that surface as well as uncaught exceptions. A missing asset can return HTTP 404 without emitting `requestfailed`; inspect relevant response statuses or the engine's resource error too.

Collect errors and assert them at an awaited test/fixture boundary rather than throwing from an event listener. Expected-error cases declare the exact expected error and count; broad ignore lists hide regressions. Attach collected diagnostics even when readiness or an assertion fails, before disposing the page. Record a failed screenshot/trace capture without replacing the original game failure or skipping cleanup.

### Measure the whole lifecycle

Use named steps/fixture phases and monotonic durations for preparation, navigation, game initialization, player actions/assertions, and cleanup. Measure host-side phases with Node's `performance.now()` or `process.hrtime.bigint()`; keep page-side timing separate because its time origin differs. Measure with `try/finally` so failed phases also have a duration and outcome.

Navigation ends at the chosen load milestone; initialization ends at the scenario's game readiness predicate. Cleanup includes closing contexts, servers, and disposable fixtures; worker browser launch/close is shared overhead, reported once per worker rather than charged to every test. Attach phase results to the test attempt, including cleanup failures. Capture overall wall time through worker shutdown; do not add concurrent case durations to claim elapsed-time savings. A trace alone cannot account for filesystem preparation or process cleanup outside its context.

## Visual checks

Wait for the intended scene, assets/fonts, and animation state before capturing. Fix viewport, scale, browser version, fonts, and renderer environment for comparisons. Assert meaningful layout or pixels; a nonempty canvas and a saved PNG do not prove correct presentation.

For a stable rendered state, use `expect(canvas).toHaveScreenshot('menu.png')`. Choose tolerances from the visual contract and inspect diffs before accepting a new baseline. Do not raise thresholds to hide missing text or controls. Pixel/geometry assertions remain appropriate when they directly measure that contract.

Playwright's `animations: 'disabled'` controls CSS/Web Animations, not the JavaScript game loop. Do not replace `requestAnimationFrame` globally or stop the game loop in a live E2E journey to make screenshots stable. A deterministic paused-frame integration test is a different sensor and cannot establish live progression. For a WebGL canvas, do not request a 2D context or use an arbitrary pixel as a generic readiness check. Capture the rendered canvas or use a justified renderer observation for the asserted visual outcome.
