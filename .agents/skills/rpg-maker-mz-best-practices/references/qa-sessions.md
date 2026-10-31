# MZ Input to Persona QA Sessions

Read when preparing or walking a player or author journey in an MZ project. [Game Execute QA](../../game-execute-qa/SKILL.md) owns the persona procedure, time ceiling, records, and repair loop. This reference supplies engine constraints; it does not prescribe a browser executor or another QA documentation tree.

## Candidate, environment, and preparation

Locate the actual game through `game.rmmzproject`. Identify active plugins, their order and effective parameters, authored events, relevant localized text and assets, and the runtime the mission claims. A filename, disabled registry entry, or installed tool is not evidence of an active integration.

Use the project's maintained preparation/launch commands and interaction tools. Read [runtime test execution](runtime-test-execution.md) when preparing fixtures, storage, or lifecycle tooling; it owns isolation, resource limits, readiness details, and cleanup. Infrastructure gaps go through [game-test-infrastructure](../../game-test-infrastructure/SKILL.md). Do not copy an executor from a reference project or install a second skill-owned runner.

A browser session proves only that browser environment. It does not qualify the editor's NW.js Playtest or an exported build. Read [runtime floor](runtime.md) when verifying across runtimes or after a repair changes custom code; preserve its actual-NW.js requirement. Serve or launch the intended candidate, including a pruned export when that is the claim, rather than observing another checkout accidentally reachable at a familiar URL.

## Starting states and public transitions

- Use exact steps from New Game or a declared, compatible save produced in the runtime being tested. Browser saves are origin-bound IndexedDB; Playtest saves live beside the game. They are not interchangeable fixtures.
- Preserve save provenance and native payloads when a supported preparation path restores storage before boot. The player must still select Continue/Load through the UI and observe the expected campaign. Storage import, a changed map ID, or matching hashes alone do not prove successful continuation.
- Name navigation omitted by a prepared save. When producing that save is part of the claim, reach it through player actions and verify the public save/continue cycle. Do not fabricate a campaign or alter save contents to satisfy a journey.
- A small test map may exercise a plugin's integration, but it does not prove the authored campaign reaches that behavior. A campaign journey uses the actual authored data and public route. Never change the authored `System.json` start position to manufacture that proof.
- During a player session, use real keyboard, pointer, or supported controller interactions. Do not invoke `PluginManager.callCommand`, assign switches/variables, force a scene, or manipulate characters to bypass the action under observation. Those operations can belong to separately identified integration tests, not persona evidence.

MZ gameplay is commonly rendered on a canvas; a browser DOM snapshot may show no useful controls. Observe the rendered game, maintain viewport/input coordinates when needed, and reobserve after each transition. Use the actual scene's readiness through existing tooling, without treating its internal predicate as behavioral proof. Keep read-only readiness checks distinct from assertions about what the player experienced. Never replace bounded readiness with arbitrary sleeps or an inflated timeout.

## Authors, plugin parameters, and commands

For an author persona, identify the interface the project actually promises: Plugin Manager, event command editor, documented CLI, or documented plugin API. Use that interface with the author's legitimate knowledge. A parameter parser or list of registered commands does not prove that an authored value reaches the intended runtime consumer.

When native authoring is the claim, operate the relevant editor controls on an isolated copy, save, reopen, and exercise the authored result. Scripted JSON edits or a browser test named `editor` cannot prove GUI authoring. A `plugins.js` file accepted by JavaScript may still be rejected by the editor; preserve the [native data shapes](data.md) and their envelope checks when writes are needed. Close/reopen the editor around external changes so its cached project does not overwrite them.

A public command invoked through a documented author API can prove that API journey; it does not establish player reachability. Keep plugin configuration, dispatch, and the actual visible or persistent consequence distinguishable in the mission's evidence.

## Observe the promised effect

| Claim | Required observation and limit |
| --- | --- |
| Choice, progress, or event consequence | Player action and its actual destination or consequence; map IDs and interpreter state are auxiliary diagnostics |
| Save and resume | Public save/checkpoint, persistence completion, restart and Continue/Load with the same campaign; prepared storage alone is insufficient |
| Dialogue, choices, portraits, or localized layout | Inspect actual rendered text and composition; raw message keys, sprite state, or valid localization data do not prove legibility |
| Motion, transition, flash, or ordering | Observe a temporal sequence or video; a single still cannot establish the transition |
| Audio | Observe the promised audible effect through a capable sensor; gain values or playing buffers do not prove hearing, mix, or comfort |
| Native authoring | Actual editor operation and save/reopen; browser success and parseable JSON do not substitute |

Keep capture, inspection, and human acceptance separate. If the tool cannot expose the assigned sound, editor, device, or perception sensor, leave that observation pending with exact handoff instructions and continue independent work. Do not infer a human's `PT` or `PH` result from an agent walk.

Technical harnesses may force language, shorten routes, or inject state. Inspect such setup before using their outputs, record the altered boundary, and use public settings during persona sessions. Traces and native-state assertions can diagnose a failure outside the session; they cannot replace what the persona saw or heard.
