# Directed browser regression

## Procedure

1. Select IDs, variants, sensors and independently defined expected effects.
   An absent, partial or wrong-target effect must fail that expected result.
2. Inspect project integration. If absent/incomplete, read
   [project-integration.md](project-integration.md) in full. Prepare isolated
   fixtures before boot; record omitted navigation and storage lifetime.
3. Resolve the installed executor and dependencies. Verify fixture/configuration,
   output, browser, viewport/DPR, fonts and sensor capabilities once per context.
4. Apply public keyboard/pointer actions with condition-based readiness guards.
   Source inspection and labeled internal reads help prepare/diagnose; never
   skip the transition under test by assigning game state or calling the feature.
5. Capture material states. Use temporal sequences only for assigned progression,
   timing or transient claims. Inspect pictures; hidden state is auxiliary.
6. Preserve the first failure and classify product/fixture/infrastructure/unresolved.
   After two controlled attempts without new information, isolate the case and
   continue independent work. Resume only with a refutable new hypothesis.
7. Rerun by affected dependencies, preserving causal history and required variants.
   One valid passage per combination suffices unless repetition is contracted.
8. Persist sources, identities, expected/observed effects, artifacts, errors and
   cleanup. Check bytes before promotion; update the current owner with links.

Completion: all selected claims have adequate evidence or explicit gaps. Cards,
mandatory agent roles and independent replay are not part of this flow. Human
judgment remains pending until explicitly given for the actual material.

## Installation and invocation

Run `npm ci --prefix <installed-skill>/scripts`. Node 22 or newer is required.
The lockfile pins Playwright. The default browser channel is installed Chrome;
prepare that browser explicitly, or install the requested Playwright browser
with `node <installed-skill>/scripts/node_modules/playwright/cli.js install chromium`
and select channel `chromium`. Record the actual browser version. Installing a
browser is separate from launching it; respect any user stop before gameplay.

The project adapter exports prepare/describe/start; the case exports
scenario/execute/verify. Read [project-integration.md](project-integration.md)
for their exact contract. Prepare first, then invoke:

```sh
node <installed-skill>/scripts/directed-browser.mjs --project <project> --fixture <fixture> --case <case.mjs> --adapter <adapter.mjs> --output <new-directory>
```

`--help` does not open a browser. Configuration belongs to scenario.browser:
width, height, dpr and locale are required; channel defaults to chrome, query to
?test, timeoutMs to 15000. Launch arguments are explicit. `reducedMotion` accepts `reduce` or `no-preference` (default). The output's parent
must exist; the output itself must be new and outside the served fixture.

## Evidence and recovery

The runner writes report.json, source snapshots, input records and PNGs with
hashes and document/geometry identities. Exit 0 means collection ended; inspect
status and pendingReviews before claiming PASS. Exit 1 means failure. Captures
use the owned CDP session without applying/restoring metrics around each image.
Geometry changes invalidate the affected capture. Reopen only guarantees affected
by transport/browser/input changes; a new smoke is not an automatic extra gate.

An uncertain input stops the session. Preserve evidence and resume with a new
run from a reliable reset, retaining required history. Cleanup attempts every
owned resource; a secondary error cannot replace the first failure. Time-only
failure invalidates that metric, not an otherwise proven effect. Report speed
separately from correctness. Neither a screenshot nor an internal read proves
sound, files, hardware, exact cadence or comfort.

## Public commands and reopening

`context.input.publicCommand(path, args)` invokes only dotted paths declared in
`scenario.publicCommands`. Use it only for a documented public setup action
permitted by the assigned criterion, at its legal boundary. It records arguments
and the result; it does not authorize campaign mutations through private APIs.

`context.reopen()` closes the owned page and creates a new page in the same
isolated browser context and origin. It retains prior document identities and
input telemetry, then leases the new target. Use it for real tab-close/Continue
criteria; `reload()` is a separate weaker operation.

Reports include request/response/failure observations for network review and
original source paths beside snapshot hashes. These observations are evidence,
not an automatic network policy verdict. The case verifier owns expected errors
and the reviewer owns visual promotion.

## Assigned fault scenarios

For a criterion explicitly requiring failure injection, list IDs in
`scenario.faultIds` and export matching `faults` definitions from the case.
`context.fault(id, enabled)` records the injection separately from player inputs.
A `network` definition supplies a Playwright URL `pattern`; enable blocks it and
disable restores service. A `boundary` definition supplies an `apply` function
for the explicitly assigned I/O rejection. Both require `expectedRef`.
Keep faults at the contracted external boundary in the isolated run; never
construct campaign state or call a feature action through this mechanism.
Document restoration and accept only the errors caused by that declared fault.

## Native browser zoom

For a real desktop zoom criterion, set `scenario.browser.nativeZoom` to a factor
greater than one (for example, `1.1`). Width and height become minimum CSS viewport
dimensions. This mode disables viewport/DPR emulation, records baseline geometry
and waits up to 180 seconds before leasing the document. Use Computer Use on the
owned Chrome window to apply the requested zoom; record its UI percentage in the
project review. Keep gameplay untouched during preparation. The runner checks the
DPR ratio and minimum viewport, then freezes the resulting geometry for every
action and capture. Inspect the canvas rectangle too: viewport dimensions alone
do not prove the minimum effective game area. A timeout preserves the preparation
and fails the run. Closing the isolated context discards its zoom preference.
