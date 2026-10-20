# Verification — portable design system

Verdict: **PASS for the contracted migration, preset tools and documented browser coverage**, verified 2026-10-19 (2026-10-20 UTC). No commit or publication was made. This is technical verification; no separate human visual acceptance is claimed.

## Delivered behavior

- DesignSystem 1.3.0 removes duplicate option/save renderers, callback-source configuration extraction and redundant provider fallbacks. OptionsCore and SaveCore execute focused rendering recipes through supported JavaScript parameters; CoreEngine dispatches item-background drawing. Other Coreto sources and the engine are unchanged.
- The portable skill supplies a dedicated DesignSystem parameter CLI, applicator, 26 image/font/license assets, four drawing templates and two profiles. The applicator writes parameters only through CLIs. It validates every dependency and proposed write before mutation, supports preview, verified assets, recovery/conflict checks and idempotent reapplication.
- DesignSystem retains window surfaces/states, option geometry, choice wrapping, speaker/continue placement and picture-role presentation because public provider parameters do not reproduce them. The configurable `Body` font/size removes a dependency on the destination game's native font; MessageCore still registers the actual font files.
- Plugin runtime bytes decreased from 46,682 to 36,438 (**21.9%**, measured from the IIFE in the original file bytes, including line endings). Total plugin bytes decreased from 52,624 to 48,378; the expanded native parameter metadata accounts for much of the remainder. The nine decoded provider callbacks decreased from 85,313 to 44,490 bytes (**47.9%**). These are code-size measurements, not performance claims.

## Evidence

| Criterion | Result and sensor |
| --- | --- |
| Exact before/after visuals | PASS: 13 full-image RGB comparisons, zero differing pixels, no masks. Title, general options, hover, pressed, audio options, changed volume, age notice, empty saves, named dialogue, formation, Continue transition, filled save and loaded formation. [Comparison manifest](../../../docs/qa/deliveries/coreto-design-system-preset/comparison.json) binds images, environment and candidate hashes. |
| Runtime/input/persistence | PASS: directed public keyboard/mouse inputs; volume 40→30→40; reopen retains configuration; native selected save loads and restores the exact serialized campaign; normal dialogue inputs return to formation. No campaign injection or edited save timestamps. |
| Final pruned candidate | PASS: `before-final` versus `after-final` directed runs. Candidate is the pruned runtime with the exact final plugin and registry hashes. Pruning retained required theme assets; the journey completed without runtime errors. |
| Portable target | PASS: `portable-01` boots a second fixture with a different project title, native Cinzel/32px body setting, modified panel radius and all 26 preset assets initially absent. The applicator reinstalls assets and defaults; the same journey, save/load and option checks pass. This is a controlled project fixture, not an independently authored commercial game. |
| CLI safety and recovery | PASS: `node --test rpg-maker/tests/design-system-cli.test.mjs` — 3/3, final log `cli-tests-final-2.tap`. Covers invalid/stale writes, isolation, native struct encoding, missing-provider preflight, dry-run, assets, custom picture roles, preservation of other entries, idempotency, restore conflicts and recovery. |
| Skill metadata and audit | PASS: writing-skills metadata validator exits 0; [item-by-item audit](skill-audit.md). |
| Scope and syntax | PASS: `git diff --check`, Node syntax checks; only DesignSystem differs among all original `Coreto_*.js` sources. Registry identity, order and activation are unchanged; only CoreEngine, OptionsCore and SaveCore parameter entries differ from the original game. |

The final images were inspected directly: option spacing/state contrast, filled-save metadata/icons, dialogue text/speaker/console and formation picture surfaces match the original. Five representative pairs remain under [delivery media](../../../docs/qa/deliveries/coreto-design-system-preset/). All 13 comparisons are enumerated in the manifest. Save creation times happened within the same displayed minute and both native playtimes were 00:00:02; neither was modified to obtain equality.

## Reproduction and historical limits

The maintained [directed journey](visual.mjs) runs with the installed `coreto/tools/qa/runner/directed-browser.mjs`, `coreto/tools/qa/game-adapter.mjs`, Node 22.23.2 and Chrome 155 on macOS/Metal at 1280×720, DPR 1, English. The final report records exact environment versions.

```sh
node coreto/tools/qa/game-adapter.mjs --project 'rpg-maker/The Dryland Drowned' --output .artifacts/design-current-game
node coreto/tools/qa/runner/directed-browser.mjs --project . --fixture .artifacts/design-current-game --case planos/tasks/coreto-design-system-preset/visual.mjs --adapter coreto/tools/qa/game-adapter.mjs --output .artifacts/design-current-run --diagnostic 'Design system regression journey'
node --test rpg-maker/tests/design-system-cli.test.mjs
```

Use new fixture/output directories. Runner collection success alone does not establish pixel equivalence: compare settled captures separately. The original 1.2.0 fixture, all raw run reports, failed runs, backups, test logs and one-time authoring scripts are preserved locally under `.artifacts/design-system/`; they are historical evidence, unavailable from a fresh clone. The delivered skill has no dependency on that archive.

Earlier capture runs exposed harness errors (scene/readiness assumptions, pointer-button API usage, repeated screenshot IDs and undeclared storage capture), corrected without campaign writes. The native save is a prologue checkpoint, so the final case compares its campaign immediately after loading and then advances to formation normally. Final cleanup also briefly removed the public `fonts` export: `pruned-01/02` caught the resulting ReferenceError; restoring the export resolved it, and `pruned-03` plus the final frozen run passed. No failed evidence was overwritten.

The portable run preceded the final removal of an unused adapter property and addition of a null-safe item-background callback dispatch. Those changes preserve the enabled theme path; the final exact-candidate pruned run exercises it, while final CLI tests exercise the updated recipes. The second fixture's native typography differences did not require System.json changes by the installer.

Coverage excludes the full campaign, other viewport/locale combinations, NW.js/editor/export acceptance, gamepad and zoom. No release-wide `verify-build` result is claimed. The supported preset changes presentation; another game's events, authored text escapes, custom options, picture assets and resolution remain its own content/settings.

## Candidate audit and organization

- **Keep:** the skill and its assets/scripts/references (portable application and authoring); plugin/registry changes and design revision metadata (runtime and provenance); tooling tests and test README (configuration preservation); spec, journey, audit and this verification owner (contract/evidence); selected image pairs and comparison manifest (review/devlog).
- **Keep:** narrowly scoped ignore exceptions that allow the new skill while keeping other local agent/session files and recovery backups ignored.
- **Archive locally:** one-time extraction/migration scripts and excess runs in `.artifacts/design-system/`; reusable installation uses only skill files and installed Coreto tools. No current instruction depends on one-time scripts.
- **Exclude/preserve:** the pre-existing `.coreto-project.json` edit. Commands use explicit game paths and leave its content untouched.

No new dependency or remote service was added; QA used the existing runner lockfile. Final candidate hashes and Git base are recorded in the local `candidate-inventory.json`. Files remain unstaged and uncommitted. Devlog material demonstrates the same Options screen before/after and a second preset application returning `changed: false`; no devlog was published.
