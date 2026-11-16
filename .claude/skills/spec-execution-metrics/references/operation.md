# Operation

Use Python 3.9+ and the standard library. In examples, `metrics` means `python3 <installed-skill-dir>/scripts/metrics.py`, `SPEC` is the actual spec directory, and `RUN` is the returned execution identity. Substitute real values; do not create shell aliases or a second runner. Global options precede the operation. Keep the execution identity in the existing task notes so callers and nested procedures can reuse it. No newest-run inference is supported.

## Entry, participants and resumption

```text
metrics --spec SPEC start --candidate REVISION_AND_DIRTY_INPUT_FINGERPRINT --environment ENVIRONMENT
metrics --spec SPEC --run RUN --producer SESSION participant --session SESSION --parent PARENT
metrics --spec SPEC --run RUN children --session PARENT
```

Resolve the session from `--session` or `CODEX_THREAD_ID`. The reader honors `CODEX_HOME` (default `~/.codex`), verifies session metadata and never substitutes a newer log. `--expected-cwd PATH` checks the initial session directory where needed; a worktree transition need not change that original metadata. Children are discovered only from confirmed `parent_thread_id` metadata. A delegated session freezes only itself with `freeze --session SESSION` before returning; it must not freeze its caller. Register each child during its execution; registration after completion loses its measured prefix and cannot fabricate that baseline.

`--producer` defaults to `CODEX_THREAD_ID`, otherwise `operator`. Each concurrent writer uses its own producer identity. On `start`, keep the returned run, producer and participant IDs. Repeating `start` with an explicit existing run reuses its entry; it does not attach another session. A nested call uses the existing run and participant, opening only its own activity. A new session uses `participant`, not another execution. Pass these ordinary execution identities to delegated agents with their task.

Supply a candidate identifier covering the revision and relevant uncommitted/ignored inputs, with those inputs documented in the task's existing evidence. `unknown` is an explicit gap, not proof that the candidate was frozen. Never pass secret content in a label. Collection does not run Git operations or hash all project files implicitly.

Counter inclusion defaults to `unknown`. Use `--inclusion own` only when the source semantics are established for that session type; use `inclusive` for a provider aggregate. Unknown hierarchy semantics never produce an exact combined total. The observed subset relationships are checked arithmetically; unsupported/missing components remain unknown. Tokens are not currency or generation throughput.

For a pause or handoff, end the current activities and `freeze --mode position` before leaving. This excludes future turns from that segment. Resume with the same run and a fresh stable segment key:

```text
metrics --spec SPEC --run RUN resume --key SEGMENT --reason resumed --candidate CANDIDATE
```

Freeze an existing session window before attaching it again. A new participant baseline excludes unobserved work between segments. Copy the whole spec's `execution-metrics/` unchanged when moving to a worktree; retain identities and history. Readers need no original machine path. Record interruptions and missing prefixes through a quality record and the existing task notes.

## Activities and commands

`record KIND --data JSON` publishes an allowlisted record and returns its ID. `--key KEY` makes publication retry idempotent. A conflicting reuse is reported, not overwritten. Use different keys for distinct real attempts. Single-quote literal JSON appropriately in the calling shell, or invoke the Python module from a script with an argument array.

```text
metrics --spec SPEC --run RUN record activity_start --key prepare --data '{"session":"SESSION","task":null,"category":"preparation","state":"active"}'
metrics --spec SPEC --run RUN record activity_end --key prepare-end --data '{"activity":"RETURNED_ACTIVITY_ID"}'
metrics --spec SPEC --run RUN record activity_start --key implement --data '{"session":"SESSION","task":"task_FILE.md","category":"implementation","state":"active"}'
metrics --spec SPEC --run RUN observe --task task_FILE.md --activity ACTIVITY_ID --key CHECK_ATTEMPT --verification-type e2e --environment browser --tool 'Playwright Test' --check CHECK_ID --candidate CANDIDATE --evidence relative/result.json -- COMMAND ARGUMENTS
```

Categories: `preparation`, `coordination`, `implementation`, `test_creation`, `test_infrastructure`, `verification`, `investigation`, `product_correction`, `test_maintenance`, `retest`, `persona_qa`, `review`, `closure`, `instrumentation`. QA planning uses `preparation` or `coordination`. Use `state: wait` or `pause` for a non-working interval. Optional `parent` is an activity ID; containers are excluded from accumulated agent effort. Do not keep an active parent span around unrelated work to manufacture effort. Transition explicitly even within one turn.

Activities may carry `verification_type`, `environment`, `tool`; creating a test does not mean it executed. `observe` inherits the caller's working directory, environment and streams, passes the original argument array without a shell, and returns the process status. For shell syntax, invoke the project's documented shell command explicitly. It never captures process text or environment values. Arguments are redacted by default; repeat `--public-arg N` to publish a known-public, 1-based argument, after automatic credential-pattern redaction. Never publish shell bodies or arbitrary input values merely for nicer reports. Supply runner duration afterward as an explicit `command_end` correction, retaining external duration; never equate the two.

If this helper cannot be loaded at all, execute the original command directly and record the gap in task evidence. Collector diagnostics are not product failures. A missing command endpoint remains unknown; do not rerun the command to recreate its measurement.

## Acceptance and findings

```text
metrics --spec SPEC --run RUN record acceptance --key accept-CANDIDATE --data '{"task":"task_FILE.md","candidate":"CANDIDATE"}'
metrics --spec SPEC --run RUN record finding --key FINDING --data '{"finding":"FINDING","task":"task_FILE.md","candidate":"CANDIDATE","channel":"e2e","classification":"unclassified","origin":"unknown","discovered_at":"OBSERVED_UTC","acceptance":"MARKER_ID","evidence":["relative/result.json"],"rationale":"Observed failure; diagnosis pending."}'
```

Channels: `e2e`, `unit`, `review`, `construction`, `persona` (the `persona_qa` activity category is not a discovery channel). Classifications: `product`, `infrastructure`, `obsolete_expectation`, `test`, `unclassified`. Origins: `introduced`, `pre_existing`, `unknown`. Count a delivery defect only with product diagnosis/evidence and an E2E discovery after the matching task/candidate marker. A later marker cannot promote an earlier discovery.

Amend a diagnosis with `record finding --supersedes RECORD_ID --key NEW_KEY --data FULL_CORRECTED_DATA`. Retain finding identity, task/candidate, discovery timestamp/channel and original marker. Append `finding_link` records with `finding`, `relation`, `activity`, `evidence`; relations can name confirmation, fix, regression test, failed retest or passing retest. Preserve all attempts. New findings reject unsupported labels. For an older malformed label, query its gap and publish an explicit correction using the original discovery evidence and a rationale identifying the registration error. Correct only unsupported labels; never replace a valid discovery channel or infer a missing observation. Two checks confirming one finding do not create two defects. Keep status in the task, not these records.

## Closure and repair

```text
metrics --spec SPEC --run RUN freeze
metrics --spec SPEC --run RUN reconcile
metrics --spec SPEC --run RUN query
```

Default `freeze` fixes each participant's current turn, allowing final-response events until that turn's completion. Use this only immediately before returning the measured response. If more authorized work outside this execution will continue in the same turn (for example a direct task followed by a separate loop), freeze the finished execution with `--mode position` instead. Its unfinished model-call tail remains a boundary gap; it must not absorb the following execution. Nested calls inside one execution end their activities and leave freezing to the outer caller. Run it before the measured agent returns. Do not wait until a later invocation to infer which turn was intended. `--session SESSION` limits the operation; freeze delegated participants before their return. `--mode position` intentionally stops at the latest observed counter for a pause, rather than awaiting the response. A later invocation runs `reconcile` against the saved boundary; repeat safely as late events arrive. Its own work is outside the frozen interval, and its record timestamp identifies that later instrumentation.

A lost completion marker, absent component, reset, incompatible source edit, missing participant or unknown hierarchy inclusion remains a gap. Source-event identity combines session, stream position and measurement fingerprint. Reconciliation refuses incompatible rewrites; it never silently replaces prior counts. Keep `pending` when a measured response has not ended, `incomplete` when unavailable evidence remains, and `closed` only for the supported measured window. The entry-prefix gap can remain even when all later windows close.

Record a collection incident with `record quality`: `code`, concise `detail`, `affected` interval/record ID, and relative `evidence` paths. Include collector version and affected window in the existing verification evidence; every record also carries the collector version. Repair the reusable source/integration, run affected checks, update the installation while preserving local differences, and resume the same run. Use explicit corrections for recoverable recorded errors, not rewrites. Disclose irrecoverable gaps. `--strict` makes collector-only errors return failure during mechanism testing; ordinary collection degrades without stopping delivery.
