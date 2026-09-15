# Directed browser regression

## Procedure

1. Select IDs, variants, sensors and independently defined expected effects.
   An absent, partial or wrong-target effect must fail that expected result.
2. Inspect project integration. If absent/incomplete, read
   [project-integration.md](project-integration.md) in full. Resolve the evidence
   request below before preparing fixtures; record omitted navigation and storage lifetime.
3. Resolve the installed executor and dependencies. Verify fixture/configuration,
   output, browser configuration, fonts and sensor capabilities once per context.
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
for their exact contract. For an already prepared fixture, the ordinary entry is:

```sh
node <installed-skill>/scripts/directed-browser.mjs --project <project> --fixture <fixture> --case <case.mjs> --adapter <adapter.mjs> --output <new-directory>
```

`--help` does not open a browser. Configuration belongs to scenario.browser:
width, height, dpr and locale are required; channel defaults to chrome, query to
?test, timeoutMs to 15000. Launch arguments are explicit. The output's parent
must exist; the output itself must be new and outside the served fixture.

## Evidence request before preparation

After development, materialize a request from the current task/scenario contract,
using the project QA guide's mappings. The agent supplies the JSON; the human
does not supply hashes or rewrite a contract. Invoke:

```sh
node <installed-skill>/scripts/request-evidence.mjs --project <project> --request <request.json>
```

The v1 request contains `schemaVersion:1`, project-relative `spec`, stable
`requestId`, `consumer`, `case`, `adapter`, `scenario:{id,profile,variant,configuration}`,
and `claims:[{id,variant,sensor,group,source:{id,variant},expected:{path,heading}}]`.
`source` maps the native case criterion to the requesting spec; `group` keeps a
causal sequence indivisible. Markdown expected selects one unique normative
heading; its inputs/references belong in the adapter's dependency map.
Optional fields are `evidenceRoot` (default `docs/qa/runs/<spec-directory>`),
`freshness:{mode:'reuse'|'fresh',reason}` and `budgets:{lookupMs,waitMs}` (15s/30s).
Use a new request ID when the resolved contract changes. An explicit reproduction
or claim `repeat:true` forces collection; age alone does not. Claim
`review:{kind,independentFrom:[reviewerIds],requireNew}` preserves assigned human,
independent or fresh inspection requirements; omit only when none is assigned.

Read the returned result. `reused`/`shared` references existing collection and
eligible inspection; `collected` references a new ordinary run. A missing
inspection stays `executed-awaiting-review`: open the required captures and
perform the assigned review. Record negative findings as failures; an applicable
negative decision remains a failure for that same material and scope. A compatible
inspection already referenced by the result need not be performed again.
The entry uses isolated processes, fixtures, outputs and ports. Unsupported
recipes or receipt/coordination failures invoke ordinary preparation/execution.
A publication failure after collection preserves that collection; use its normal
report and record the limitation with the task. Exit zero still is not visual PASS.
If the optional entry itself cannot start, use adapter.prepare and the ordinary
entry above; record the limitation in the current QA owner and continue.

After actually inspecting, materialize an inspection record containing
`evidenceRoot`, `receiptPath`, `claim:{id,variant}`, `requestId`,
`reviewer:{id,kind:'agent'|'human'}`, `decision:'pass'|'fail'`, and nonempty
`observations` describing the material seen and applicable scope. Then invoke:

```sh
node <installed-skill>/scripts/inspect-evidence.mjs --project <project> --record <inspection.json>
```

This mutating helper binds the observation to the verified artifact bytes and
expected hash. It does not perform inspection or grant human acceptance. If
recording fails, preserve the actual observation in the normal QA documents.
Receipts, inspections and request decisions remain immutable local evidence;
the index and producer reservations under `.receipts` are implementation support,
not task progress. Count terminal decision files once; `accounting.accounted:false`
means an already counted request/context. Collection savings count runs, while
inspection reuse counts claims separately; no wall-clock savings are asserted.

Support modules in the installed `scripts` directory: request-contract validates
the required request; evidence-identity and
evidence-environment read inputs; evidence-store writes/validates records;
evidence-coordination owns reservations; evidence-worker isolates bounded optional
work; normal-evidence prepares through the project adapter. Protocol tests live
in `scripts/tests/evidence-reuse.test.mjs`, run with Node's test runner. Storage, touch and WebM lifecycle coverage also lives in `scripts/browser-storage.test.mjs`,
`scripts/browser-input.test.mjs` and `scripts/browser-audio.test.mjs`, alongside their
modules; `scripts/tests/browser-runtime.test.mjs` covers the combined runner.
The public browser executor owns transport and cleanup.

## Evidence and recovery

The runner writes report.json, source snapshots, input records and PNGs with
hashes and document identities. Exit 0 means collection ended; inspect
status and pendingReviews before claiming PASS. Exit 1 means failure. Captures
use the owned CDP session without applying/restoring metrics around each image.
The runner does not enforce geometry/raster equality or prepare native zoom.
Reopen semantics are explicit in the integration contract; rerun only claims
affected by transport/browser/input changes. A new smoke is not an automatic gate.

An uncertain input stops the session. Preserve evidence and resume with a new
run from a reliable reset, retaining required history. Cleanup attempts every
owned resource; a secondary error cannot replace the first failure. Time-only
failure invalidates that metric, not an otherwise proven effect. Report speed
separately from correctness. Neither a screenshot nor an internal read proves
sound, files, hardware, exact cadence or comfort.
