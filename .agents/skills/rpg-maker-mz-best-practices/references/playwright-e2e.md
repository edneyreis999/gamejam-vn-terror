# Playwright E2E for RPG Maker MZ

Read when writing, reviewing, running, or debugging browser journeys in an MZ game. Use [Game Playwright Best Practices](../../game-playwright-best-practices/SKILL.md) for registration, fixtures, evidence, and stability comparisons. This reference supplies MZ observations and runtime boundaries.

For resource ceilings, disposable game copies, process cleanup, renderer selection, and exclusive lanes, read [runtime test execution](runtime-test-execution.md). For runtime compatibility, read [runtime floor](runtime.md): passing on Playwright's Chromium does not qualify the editor's NW.js. NW.js is not Electron; do not apply Playwright's Electron launcher to it or assume current Chromium APIs work there.

## Prepare the MZ game

Serve the playable game root containing `index.html`, `data/`, `js/`, and assets. Keep authored files unchanged when preparing disposable fixtures. Trace DOM snapshots do not expose the Pixi scene graph. Observe the canvas and the assigned engine state; check the MZ error surface because the engine may catch exceptions that do not reach `pageerror`.

## Wait for MZ readiness

Playwright's DOM auto-waiting cannot tell whether an MZ window accepts confirmation. `page.goto()`, a visible canvas, an idle network, or a changed map ID is insufficient. Use a bounded predicate specific to the next action. Do not use `waitForTimeout()` or larger timeouts to conceal missing preconditions.

For example, after entering a map through the game UI:

```javascript
await page.waitForFunction(() => {
  const scene = globalThis.SceneManager && SceneManager._scene;
  return typeof Scene_Map !== 'undefined' && scene instanceof Scene_Map &&
    scene.isStarted() && !scene.isBusy() && !SceneManager.isSceneChanging() &&
    globalThis.$gamePlayer && !$gamePlayer.isTransferring() && $gamePlayer.canMove();
}, undefined, { timeout: 10_000 });
```

This predicate suits a step requiring free player movement. It would be wrong for an autorun event that intentionally prevents movement. Set the bound from the scenario's observation budget; the example is not a universal timeout. If fixture setup must mutate scene state, check readiness and perform the mutation in the same JavaScript turn when an intervening frame could invalidate it.

Before confirming a message, inspect the actual message window: pause state, completed text, wait counter, and any active choice/number/item input. Confirming while `_waitCount` is still positive can lose the action even though text is visible. Plugins can change these predicates; inspect the installed implementation instead of assuming one predicate fits every dialogue.

Use `expect.poll()` to repeat a read-only observation, not an action:

```javascript
import { expect } from '@playwright/test';

// IDs and expected values come from the scenario, not a portable MZ default.
await expect.poll(
  () => page.evaluate(id => $gameVariables.value(id), scenario.progressVariableId),
  { message: 'Player interaction completes the event', timeout: 10_000 },
).toBe(scenario.expectedProgress);
```

Polling and auto-retrying assertions are bounded waits within one attempt; `retries: 0` does not disable them. Do not put a click, save, or plugin command inside a retrying assertion callback.

## Canvas input and observations

MZ windows and buttons are generally Pixi objects drawn inside the canvas. `getByRole()` and `getByText()` work for real DOM controls, not those drawn objects. Locate the actual game canvas (normally `#gameCanvas`), then use player keyboard/mouse input and observe the resulting engine state or rendered output.

### Keyboard

A rapid `keyboard.press()` can send both events between MZ input updates. Wait for the input to be processed and for release to be observed before the next press. This example targets the native Enter → `ok` mapping in a running MZ loop; confirm the project's key mapping and Input implementation first.

```javascript
await page.waitForFunction(() => globalThis.Input && !Input._previousState.ok);
try {
  await page.keyboard.down('Enter');
  await page.waitForFunction(() => Input._previousState.ok);
} finally {
  await page.keyboard.up('Enter');
}
await page.waitForFunction(() => !Input._previousState.ok);
```

Configure a finite `actionTimeout` for waits without a local timeout. The observation of `Input._previousState` establishes that MZ processed the key; the test must still assert the intended outcome. Keep holds short to avoid key-repeat behavior. For deliberate movement/holds, wait for the specific movement outcome and release in `finally`. If using frame barriers, observe frames after dispatch and account for scene/frame-counter resets; a fixed millisecond sleep is not a frame barrier.

### Mouse and rendering coordinates

Convert a scenario's logical target to CSS coordinates using the canvas's current bounds and game dimensions. Verify its target is enabled and ready first. For the standard borderless MZ canvas:

```javascript
const canvas = page.locator('#gameCanvas');
const box = await canvas.boundingBox();
if (!box) throw new Error('Game canvas is not visible');
const size = await page.evaluate(() => ({ width: Graphics.width, height: Graphics.height }));
await canvas.click({ position: {
  x: scenario.target.x * box.width / size.width,
  y: scenario.target.y * box.height / size.height,
} });
```

Derive logical targets from the authored scenario or current window geometry, not desktop coordinates. Recompute after resizing. Read-only `page.evaluate()` may inspect `$gameMap`, `$gameMessage`, windows, and sprites; calling `DataManager.saveGame()`, setting progress variables, or changing scenes directly does not prove the player's Save, event, or menu path. Such mutations belong only to declared starting-state preparation or explicitly classified integration tests.

## Save and Continue

Browser MZ saves normally use origin-bound IndexedDB through localforage; NW.js saves use the game's filesystem. Confirm the active storage implementation. Cookies/localStorage alone do not carry IndexedDB saves, and changing the HTTP port changes the origin.

Use the [persistence scenario guidance](../../game-playwright-best-practices/references/test-scenarios.md#save-and-reopen) for write completion, captured storage, real restart, and independent expected values. Keep global preferences distinct from slot data. Browser storage cannot prove NW.js filesystem persistence.

## Visual sensor

MZ's game canvas uses WebGL. Do not request its 2D context. Wait for the relevant Pixi assets, fonts, dialogue and animation state before capture. Stopping `SceneManager` or the graphics loop creates an integration-test condition; it does not prove live player progression.

## Version applicability

These engine-specific observations were checked against MZ 1.10.0. Confirm them against this game's engine version and active plugins.
