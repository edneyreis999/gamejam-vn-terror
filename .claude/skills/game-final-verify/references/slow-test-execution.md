# Execute and account for slow checks

Read when the claim includes slow tests, parallel execution or test-duration reporting. Use project instructions and discover the relevant technology guidance from the installed skill descriptions before preparing runtime checks. Keep engine details in that guidance.

## Prepare the project command

Read the root slow-test configuration and apply its documented request/config/default precedence. Record effective limits and their sources. Reuse the maintained project command across specs. If it lacks selection, isolation or bounded scheduling, use [game-test-infrastructure](../../game-test-infrastructure/SKILL.md) for the smallest missing capability within the authorized verification scope; a review-only request produces findings instead. Do not copy a historical experiment's paths, inventories or baseline dependencies into ordinary execution.

Worker capacity and browser capacity are different. Account for nested runner concurrency, native jobs that open no browser, cases opening multiple browsers and exclusive resources. Unsupported concurrency leaves work in a safe lane or explicitly unrun; it does not authorize weakening an observation. Confirm resource ownership and cleanup, qualify changed execution with existing cases, and then run the required selection. Use technology-specific guidance to resolve rendering and runtime readiness problems.

## Keep coverage and execution claims distinct

Retain the initial inventory, review dispositions and final owners. Justified transfers/removals follow the existing test-review procedure; speed alone is no reason to delete an assertion. Freeze the retained cases, variants, recipes and relevant candidate inputs before the final measured run. Include recipe prerequisites and preserve their ordering. Failed prerequisites block dependent work explicitly while independent work continues.

Account for expected versus executed identities, duplicate/missing outcomes, failures, cancellations, omitted sensors and cleanup defects. Process exit zero, an empty queue or a completed screenshot capture cannot establish all of these. Separate automated assertions from evidence still awaiting human judgment. Keep product defects, test/harness defects and unavailable prerequisites distinct; respect the request's repair boundary.

Ordinary verification may reuse equivalent evidence under the skill's existing rules. A request for the time to execute the complete retained slow selection requires a fresh complete run: do not splice prior attempts or historical results into that duration. A failed or partial run has an elapsed time but not a successful complete-suite time.

## Record useful timings

Record command, selection, candidate, environment/runtime/renderer, effective worker/browser limits, measured overlap and browser peak. Time run-specific preparation through cleanup using a monotonic clock. Separate one-time dependency installation, runner construction, review and fast-test execution from the slow-run interval. Separate native/browser/exclusive execution where useful; concurrent case or lane durations cannot be summed as wall time.

Record any concurrency reduction and its evidence. If an elapsed-time budget exists, report an overrun without silently changing coverage, required runtimes or test timeouts. There is no implicit time budget derived from worker or browser counts. Preserve failed, interrupted and corrected attempts separately. Report absolute times when no comparable baseline exists; do not claim an acceleration percentage or attribute test-review savings to parallel execution.
