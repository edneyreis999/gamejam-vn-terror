# Browser session management

Use one uniquely named session per invocation; a session preserves browser state across commands, not isolation between test cases.

## Select and own a session

```bash
# Replace the example name with an unused name for this invocation.
export PLAYWRIGHT_CLI_SESSION="game-qa-run01"
playwright-cli open
playwright-cli goto http://localhost:4173
playwright-cli screenshot
playwright-cli close
```

If each shell command starts a fresh environment, pass `-s=game-qa-run01` on every command or set the variable again. `-s=` explicitly selects a session. Inspect `playwright-cli list` before reusing a name; do not take over another task's session. A working session needs no seed test or new spec.

Session separation isolates browser storage and tabs, but not served game files, server ports, profiles explicitly shared on disk, or artifact paths. Give simultaneous sessions distinct writable resources and evidence destinations. Keep actual browser demand within the project's limits; interactive sessions are not an alternate scheduler for the test suite.

## Persistence

Profiles are in memory by default; state survives commands within the session and is lost when the browser closes. Use a disposable persistent profile only when the task needs storage across browser restarts:

```bash
playwright-cli -s=game-save-run01 open http://localhost:4173 --persistent
# Or an explicitly owned profile path:
playwright-cli -s=game-save-run02 open http://localhost:4173 --profile=/path/to/owned/profile
```

Do not share a writable profile between live sessions. Reopen with the same profile and origin for a persistence claim. Read [storage state](storage-state.md) before snapshotting/importing saves; state files are not complete profile backups.

## Attach and detach

Attach to the intended existing target only when its use is authorized. Verify the URL and ownership before issuing actions. Capabilities depend on installed CLI, browser, and runner versions.

```bash
playwright-cli -s=game-debug-run01 attach --cdp=http://localhost:9222
playwright-cli -s=game-debug-run01 tab-list
playwright-cli -s=game-debug-run01 snapshot
playwright-cli -s=game-debug-run01 detach
```

Supported installations can attach by channel (`--cdp=chrome`, `--cdp=msedge`) or extension; inspect `attach --help` for exact options and prerequisites. Attaching to a runner's paused session follows [test debugging](playwright-tests.md). A CDP connection does not itself qualify an older or different native runtime.

`detach` releases the connection while leaving an externally owned browser running. For a browser created with `open`, use `close`. Record who owns the attached browser or background test and who must stop it.

## Cleanup

Stop/export active recordings before closing an owned session, retaining useful evidence even when the task failed. Attempt session cleanup if capture fails; report both failures. Release held input when the page is still reachable. Stop servers or background jobs only through their owned handles.

```bash
playwright-cli -s=game-qa-run01 close
# Only for the disposable profile owned by this run, after evidence/dependents are safe:
playwright-cli -s=game-qa-run01 delete-data
```

`close-all` and `kill-all` affect sessions beyond the current task and are not routine cleanup. Diagnose a stuck owned session and use its process ownership information; do not sweep unrelated browsers. A shutdown error remains visible.

Headless sessions may expire after an idle timeout; headed sessions may remain open. Neither behavior substitutes for explicit cleanup. Check current `open --help` for idle-timeout control rather than depending on expiry for teardown.

## Environment

Choose browser, viewport/device, headed mode, and profile from the requested scenario. Use headed mode when a required observation needs it; otherwise headless can be suitable. Do not select mobile solely to reduce snapshot size.

```bash
playwright-cli -s=game-qa-run01 open http://localhost:4173 --headed
# Configuration alternative, with a project-owned file:
playwright-cli -s=game-qa-run02 open http://localhost:4173 --config=.playwright/my-cli.json
```

The URLs, session names, and paths above are examples. Use the actual bound server URL and current page targets; do not assume port 4173 is free or belongs to this run.
