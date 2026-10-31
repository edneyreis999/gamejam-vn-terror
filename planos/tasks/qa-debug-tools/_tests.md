# Verification: QA Debug Tools

Checks that need no human judgment. Companion to `_spec.md`; human and agent-session checks live in `_playtest.md`.

## Strategy

- **Automated tests: only the build gate** (user decision, 2026-10-31). It is the one thing the owner would lose without noticing: a test build published by accident. These tests run on disposable exported-build fixtures and never touch the source project. Because they test tooling, not a plugin, they do not conflict with the rule that tests only read what the game loads.
- **Jumps, scenarios, hint and panel**: no automated tests by user decision. They are covered by the human playtest and the agent persona sessions in `_playtest.md`. Residual risk is under Not Verified Here.
- **One-off delivery checks**: the runtime-compatibility check for the new and changed plugins, and the native-data checks for `js/plugins.js`, plugin parameters and `Languages.tsv`. They prove the delivery and are not kept as suite members.

## Coverage

| Source       | Behavior                                                 | Sensor    | Check |
| ------------ | -------------------------------------------------------- | --------- | ----- |
| US-001.AC-1  | Debug appears with the plugin enabled                    | human     | PT-001 |
| US-001.AC-2  | Plugin disabled → default game                           | human + static | PT-002, V-006 |
| US-001.AC-3  | Disabled by default in the source                        | static    | V-006 |
| US-001.EC-1  | A save made after a jump loads without the plugin        | human     | PT-005 |
| US-001.EC-2  | Remembered hint hidden while the plugin is off           | human     | PT-006 |
| US-002.AC-1–5 | Go to trap lands on the trap, saved, same seed, shown  | human + agent | PT-003, PT-004 |
| US-002.EC-1  | Cancel changes nothing                                   | human     | PT-003 |
| US-002.EC-2  | Jump from mid-campaign replaces it                       | human     | PT-004 |
| US-002.EC-3  | Other route draws follow from the seed                   | none      | Not forced, so nothing new to observe; the normal draw is unchanged |
| US-002.EC-4  | Failure follows the normal flow                          | human     | PT-006 |
| US-003.AC-1, AC-3 (Total loss), AC-4, EC-1–2 | Final route unlocked and Total loss land, legal history | human + agent | PT-007 |
| US-003.AC-2, AC-3 (Reunite, Destroy) | Council and the two medallion endings land | none | Lighter verification chosen by the user, 2026-10-31; see Not Verified Here |
| US-004.AC-1–3, EC-1–2 | Hint marks, persists, never chooses             | human     | PT-006 |
| US-005.AC-1–2 | Panel facts, no-campaign state                          | human     | PT-001, PT-003 |
| US-006.AC-1  | Interactive question when Debug is enabled               | automated | V-001 |
| US-006.AC-2  | "No" disables in the build only and prunes the file      | automated | V-002 |
| US-006.AC-3  | "Yes" keeps it, verify-build reports it                  | automated | V-003 |
| US-006.AC-4  | Non-interactive → disabled unless allowed                | automated | V-004 |
| US-006.EC-1  | Disabled or absent → no question                         | automated | V-001 |
| US-007.AC-1–2, EC-1 | Agent sessions record provenance, prepared runtime only | agent | PT-008 |

## Checks

- **V-001** (automated): given a disposable exported build with Dryland_7_QADebug enabled, when `prune-build --apply` runs with an interactive input, then it asks the Debug question before deleting anything. Given the same build with the plugin disabled, and again with its entry absent, then no question is asked and the output matches today's.
- **V-002** (automated): given V-001's enabled build and the answer "N", then the build's `js/plugins.js` has the plugin's status false, its file is gone from `js/plugins/`, every other plugin entry is byte-for-byte unchanged, and the source project's `js/plugins.js` hash is unchanged.
- **V-003** (automated): given the answer "s", then the plugin stays enabled with its file present. `verify-build`'s identity step accepts the build and reports `Debug: ativo`. Given a build where only the Debug status differs from the source after "N", the identity step accepts it and reports `Debug: inativo (desativado pelo prune-build)`. Any other changed file still fails.
- **V-004** (automated): given a non-interactive run on an enabled build, then the plugin is disabled in the build and the exact notice is printed. With `--allow-debug`, it stays enabled without a question.
- **V-005** (static, one-off): the runtime-compatibility check passes for `Dryland_7_QADebug.js` and the changed `Dryland_EventBridge.js` at the Chromium 88 floor.
- **V-006** (static, one-off): the native-data and `plugins.js` envelope checks pass. Dryland_7_QADebug is registered after its dependencies with status false. The menu entry exists in `Coreto_1_MainMenuCore`'s Command List. Every `debug.*` key exists in `Languages.tsv` in PT and EN.

## Not Verified Here

- **Automated coverage of jumps and scenarios** (user decision, 2026-10-31). A regression in seed search, legal replay or landing only shows up when a person or agent uses Debug. Mitigation: the playtest and agent sessions in `_playtest.md` for each delivery that touches the plugin or the campaign flow.
- **Council, Reunite and Destroy scenarios** (lighter verification, user decision 2026-10-31): no check confirms that these three land correctly. Residual risk: a broken landing for them is found only when someone uses them. They share the legal-replay and landing mechanism with the two scenarios that are checked; a regression specific to the medallion path or the Council map is not covered.
- **NW.js / editor Playtest**: excluded under the project's local runtime exception (ADR-G006). V-005 checks syntax and API compatibility statically only. This is not reported as verified in NW.js.
- **Gamepad**: out of scope (ADR-G005).
