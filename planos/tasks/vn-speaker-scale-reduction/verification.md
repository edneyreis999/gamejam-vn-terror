---
implemented: true
static_verified: true
runtime_verified: false
human_accepted: false
release_ready: false
---
# Verification — speaker scale reduction

> Historical verification of the superseded initial fix. Current delivery and evidence are owned by [native bust authorship](../vn-native-bust-authorship/verification.md); the removed EventBridge parameter is no longer a live contract.

Executed on 2026-09-11 with Node v22.23.2 against working-tree changes based on `3513a0f925ff101a759723537e764a8dc407ae67`.

| Sensor | Requirement and result |
| --- | --- |
| UT-073, metadata/parser/CLI | RQ001: PASS; editor and shared parser accept 1–150, retain default 100 and reject invalid boundaries. |
| UT-074, pure composition | RQ002: PASS; speaker 80% on authored 200% yields 160% on both axes, keeps base 200%, and leaves listener at its independent 70%. |
| Source and Git review | RQ003: PASS for unchanged configured parameters, data, vendor files and native revision. Save/Chrome execution was not performed for this increment. |

Both focused tests failed before the plugin change: UT-073 found the old metadata minimum and UT-074 could not apply the rejected 80% style. After changing metadata and validation together, `node --test --test-name-pattern='UT-073|UT-074' rpg-maker/tests/*.test.mjs` passed 2/2, exit 0.

`node --test --test-name-pattern='UT-' rpg-maker/tests/*.test.mjs` returned exit 1: 73/74 passed. UT-059 could not start its real-browser server because port 18726 was occupied (`OSError: [Errno 48] Address already in use`). Read-only inspection found an existing Python listener, PID 62392; it was left running. This is an environment failure, not a passing runtime sensor.

`node rpg-maker/tools/validate-content.mjs --json` returned `{"ok":true,"errors":[]}`, exit 0. Plugin `node --check` and `git diff --check` passed. No browser/editor visual walk or human framing acceptance is claimed. The existing rendering calculation and lifecycle were not changed.

Freshness inputs (SHA-256):

- `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js`: `02eb1eb816e1ffb2c55f1bc27058a44cf9517a17cc835be3fe9e441cfdc69b30`.
- `rpg-maker/tests/suites/content.mjs`: `cf412cdbf7515c3a703525663a5237e3ae8daafd25592694e0a7024ed610e33f`.

## Candidate review

The initial working tree was clean. Keep the four modified files (plugin, canonical content tests, editing README, canonical GDD) for their runtime, validation and authoring consumers. Keep this incremental spec and verification as the owner of the changed historical bound and its evidence. Keep `lower-speaker-minimum.py` as the required materialized transformation record: it takes an explicit plugin path and refuses stale preconditions; it is not a routine command for the already-updated tree. No duplicate suite, dependency, placeholder or unrelated refactor was introduced. Existing completed specs remain historical. Generated test execution records remain in the existing ignored evidence tree.

Verdict: **PASS for the implemented parameter-domain change and focused automated verification**. Broader runtime verification remains incomplete due to the occupied port; this is not a release-readiness claim. No files staged, committed, published, deleted or archived.
