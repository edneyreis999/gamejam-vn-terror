# Game test scenarios

Read the section needed by the actual game capability. The examples are patterns for project-owned tests, not requirements to add features, platforms, or dependencies.

## Reproducible starting states

Build the minimum inventory, progress, settings, and authored inputs needed by the scenario. State what the prepared start omits from the player journey. Save fixtures carry their producer and version/provenance; never fabricate the post-action result the test should establish.

Use fresh objects per test and keep generated fixture IDs unique across invocations. Deterministic data generation and a seed help reproduce a failure, but seeding a data factory does not seed the game's random generator. Use the project's supported randomness control only when the test contract needs it; keep deterministic and natural-randomness claims distinct. Do not introduce a data-generation library for a few literal fixtures.

Parameterize meaningful variants with stable names. Retain cases with different expected outcomes; do not multiply every scene by every locale, device, and save state without a relevant contract. Record seed and variant with failure evidence.

## Menu and screen helpers

Adapt Page Objects to the game's menus and screens. Functions or small objects are sufficient: centralize repeated input and readiness, accept the fixture's page, and expose the observations tests need. Avoid a base-class hierarchy or universal engine adapter. Keep the scenario's expected outcome visible in the test.

```javascript
// This example assumes a real DOM settings menu, not a canvas control.
export function settingsMenu(page) {
  const music = page.getByRole('slider', { name: 'Music volume' });
  return {
    music,
    open: () => page.getByRole('button', { name: 'Settings', exact: true }).click(),
    close: () => page.getByRole('button', { name: 'Back', exact: true }).click(),
  };
}
```

For canvas controls, the same helper boundary can encapsulate observed coordinates and input. It must not implement an action by writing internal state, silently change the context, retry the journey, or suppress a failure.

## Save and reopen

Save through the public interface, await write completion, record discriminating expected values, then reopen and load through the interface. Assert restored state against those pre-close expectations; a slot appearing in the menu is insufficient.

Confirm the active storage backend. Browser storage is origin-bound; a different port is a different origin. When the installed Playwright version supports it, `context.storageState({ indexedDB: true })` captures IndexedDB as well as cookies/localStorage for a new context. It does not capture all possible browser persistence, such as arbitrary filesystem storage or sessionStorage. Inspect what the game uses rather than treating a state file as a complete profile backup.

Snapshot restoration establishes loading from captured storage. For actual persistence across browser-process restart, use a disposable persistent profile and reopen it after a completed shutdown. Do not share that profile between workers. Keep preference storage separate from save-slot data if the game does so, and test each promised persistence boundary. Independent tests start clean unless a declared fixture supplies storage.

## Controlled time

Identify which clock the behavior uses: calendar time, browser timers, animation frames, or an engine-owned simulation clock. Browser clock control does not automatically control engine ticks, worker timers, audio clocks, or services.

When only the displayed calendar value matters, `page.clock.setFixedTime()` fixes `Date` while allowing timers to run. Use it only if fixing `Date.now()` cannot freeze the game's elapsed-time logic. When deliberately testing browser timers, install the clock before navigation and before application timer use. Use explicit dates/timezones where relevant.

If using `pauseAt()`, choose its point from the scenario and account for initialization before pausing. Perform the trigger and advance the declared observation interval, then assert the expected effect. `runFor()` fires timers/frames over the interval; `fastForward()` skips time and fires due timers at most once, so they are not interchangeable for animation or repeated updates. A controlled-clock test does not demonstrate real-time performance or live input cadence. Do not freeze the game loop merely to stabilize a live E2E journey.

## Failures and recovery

For a dependency the game actually has, test a relevant failure and its promised recovery: a missing asset, interrupted load, unavailable service, or rejected write. Scope the fault to the operation, keep its expected error explicit, and restore the original behavior during teardown. Do not replace the code path whose integration the test claims to cover.

```javascript
// The scenario names one asset and supplies the UI action and expected response.
const failAsset = route => route.abort('failed');
await page.route(scenario.assetPattern, failAsset);
try {
  await scenario.triggerLoad(page);
  await scenario.assertFailure(page);
} finally {
  await page.unroute(scenario.assetPattern, failAsset);
}
await scenario.retryLoadThroughUI(page);
await scenario.assertRecovery(page);
```

Install the route before the request. Distinguish an aborted request from an HTTP error response; relevant 404 responses do not emit `requestfailed`. Confirm the route was hit when the fault is essential: cached or service-worker responses can bypass the intended interception. Declare any resulting environment change.

Mocking an external boundary can isolate a failure scenario, but it does not prove the real dependency works. Keep ordinary end-to-end paths real where that integration is the claim. Do not inherit blanket rules to mock every external service or to forbid all mocks of project-owned services; the sensor and intended failure determine the boundary.

## Language, layout, and input

Select the languages, viewports, input methods, and accessibility settings the game supports and the task affects. Browser `locale` changes browser behavior; it may not select the game's language. Exercise the actual language selector and verify persistence when promised.

Check representative long text, missing glyphs, fonts, wrapping, clipping, and relevant bidirectional text. DOM overflow measurements apply only to DOM elements. Canvas text requires rendered or engine-specific geometry observations. Assert localization keys where that is the data contract, and displayed text/layout where presentation is the contract.

Viewport/device emulation helps check layout and supported touch input, but does not certify physical hardware or its GPU. Compute canvas targets after resizing. Cover focus, keyboard-only navigation, cancellation, and held-input release when those are supported interactions. Do not add mobile or gamepad requirements to a desktop-only scenario.

Use automated accessibility analysis for exposed DOM semantics when relevant. It cannot certify an entire canvas game. Observe controls, focus and implemented settings through their actual surfaces, and retain any assigned human judgments. Reduced-motion emulation or a CSS preference alone does not prove that game animations honor it.

## API sources

[Clock](https://playwright.dev/docs/clock), [storage state](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state), [network interception](https://playwright.dev/docs/network), [emulation](https://playwright.dev/docs/emulation), and [accessibility testing](https://playwright.dev/docs/accessibility-testing). Confirm availability in the project's pinned version; these capabilities do not prescribe additional platforms or scenarios.
