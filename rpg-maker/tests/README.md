# Verification commands

Run from the repository root with Node, Python 3 and Google Chrome installed. `DRYLAND_CHROME` can select another Chrome executable for canonical tests. The directed recipes use Playwright's Chrome channel.

On Windows, the server probes `python` and launches the returned executable, avoiding the Microsoft Store `python3` alias. Set `DRYLAND_PYTHON` to an installed Python 3 executable when needed. Canonical tests use an ephemeral port by default on Windows; `DRYLAND_QA_PORT` remains an explicit override. Chrome uses ANGLE D3D11 on Windows and Metal on macOS, with `DRYLAND_QA_ANGLE` available for a qualified override. Temporary Windows fixtures use junctions, and browser shutdown waits for normal Chrome exit before removing its profile.

```sh
node rpg-maker/tools/prepare-qa-runtime.mjs
node rpg-maker/tools/run-verification.mjs --scope all --output .artifacts/verification-current
```

Preparation copies the project-owned directed QA runtime from `rpg-maker/tools/qa-runtime/` into `.artifacts/qa-runtime` and installs only its locked dependencies there. The maintained runtime sources are unchanged. `DRYLAND_DIRECTED_RUNTIME` can name another isolated copy. The output directory must be new; create its parent first.

`run-verification` executes fast tests, canonical slow tests, then directed recipes, and records the entire slow interval from preparation through cleanup. It continues independent work after a failure. A failed or blocked recipe is not a complete successful suite, and captured media may still require human review.

For bounded selections, use `run-tests.mjs --scope fast|slow|all` or `--ids ID,ID`; use `run-recipes.mjs --ids ID,ID` for recipe variants. Both accept `--output`, `--maxWorkers` and `--maxBrowsers`; overrides win over root `loki.config.json`, then each missing limit defaults independently to 10. Invalid limits fail before execution. The aggregate command consumes the root configuration.

`execution-groups.json` classifies actual canonical execution boundaries. `test-manifest.json` remains the canonical ownership authority. `qa/recipes.json` records maintained recipe variants, environment and fresh archive dependencies. A recipe-only subset cannot silently borrow another run's checkpoints: include its producer or report the prerequisite blocked. The full selection orders producers automatically. Editor and human sensors remain separate.

Each canonical child has isolated output and temporary directories; ephemeral servers and the browser admission broker prevent collisions. Recipe workers each reserve one browser, reject extra launches, and retain document focus and visibility assertions in headless Chrome. Browser process observations record actual overlap. SIGINT/SIGTERM stop only owned children/browser processes. Owned cleanup failure invalidates the result. The UXDR-001 Windows qualification observed contention at four simultaneous browsers; use fewer than the configured ceiling on that host.

Canonical `--pruned` and directed preparation build disposable pruned game copies. Imported saves use the supported `storageImport` contract to restore original native payload/index bytes on a new loopback origin after source/provenance validation. No source game, installed skill, engine or plugin is modified. Browser results do not establish NW.js/editor/export or listening acceptance.

IT-023's diagnostic sequence assertion now belongs to IT-015, which already performs the same native sacrifice checkpoint, title Continue, exact campaign and save-byte checks. The other checkpoint/interpreter cases remain distinct. Historical references to IT-023 should be read through IT-015 for current coverage.

The portable design-system authoring tools have a separate Node suite because their invariant is preservation of project configuration/assets through real CLI writes, not campaign behavior:

```sh
node --test rpg-maker/tests/design-system-cli.test.mjs
```

This entry point now runs the portable 1.6.1 package's authoring checks and the active consumer's installation checks. It creates disposable registries, rejects stale/invalid writes and restore conflicts, and checks recovery/idempotency. It no longer invokes the frozen 1.3.0 applicator. The required-provider case follows the current Dryland profile (`Coreto_4_MessageVisibility`); SaveCore is optional in this package. It owns no appearance assertions. The one-time migration's directed visual journey and before/after evidence remain in `planos/tasks/coreto-design-system-preset/verification.md`.
