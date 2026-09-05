# Playing an RPG Maker MZ scenario through the browser

Use this guide as player-author or clean replayer. Read `controller-and-route-card.md` in full before browser input. The player-author proves specialist-derived public transactions and writes the reusable JSON card. The clean replayer proves the approved card without help.

## Black-box boundary

Use surfaces available to a human player: the installed controller, visible game image, menus, dialogue, and public reset. Observe before and after whole transactions.

Keep these surfaces outside the player context:

- RPG Maker globals, map data, events, switches, variables, saves, plugins, and source;
- DOM or page-script state used to identify or change gameplay;
- debug, teleport, passability bypass, engine-speed changes, or route automation;
- private specialist analysis and historical learning traces;
- direct Playwright keyboard, mouse, arbitrary waits, or inline input code.

The controller may use visible canvas geometry only to deliver the public `focusCanvas` action. Its cadence sensor and receipt channel are transport instrumentation, not gameplay sensors.

## Prepare the browser and controller

Before gameplay:

1. Read the public contract; identify target, build, entry, reset, guards, scratch root, canonical output, browser owner, and release oracle.
2. Enter through the contracted public URL, file, or command without changing the game.
3. Use only the run-owned browser lease and contracted viewport.
4. Confirm that the live public-pixel sensor returns an image the player can inspect.
5. Generate and run a fresh controller preflight in this browser identity.
6. Require valid cadence and matching controller identity. Record telemetry failure separately without treating it as delivery failure.
7. Execute frozen `setup` transactions through the controller, then establish the initial visible guard before the first `route` transaction.

The technical preflight sends no keyboard or mouse input. Public focus and reset belong in carded `setup` transactions after preflight and before the contracted start signal.

## Execute one checkpoint per turn

The specialist supplies the complete public route and the next checkpoint. One player turn attempts that checkpoint as a whole:

1. **Observe** the public precondition.
2. **Prepare** the named transaction with the bundled helper.
3. **Execute** only the generated runner through `browser_run_code_unsafe({filename})`.
4. **Classify** delivery and telemetry from its returned receipt.
5. During clean replay, **persist** the exact receipt through the run-bound ledger procedure before any next input.
6. **Observe** one stable public image after the transaction.
7. **Compare** it with the postcondition and recovery guard.
8. **Record** the transaction result and public reaction in scratch; during authorship, append proved content to the JSON card.

Do not inspect every discrete pulse. Continue within the same turn while the route and screen agree. Return to the invoker at the checkpoint, on contradiction, when guidance needs correction, or at a technical or safety boundary.

Discovery has no clock, input-slice gate, attempt cap, guidance tier, or checkpoint-time failure. Progress is measured by material public checkpoints.

## Apply transaction boundaries

### Dialogue

Batch the proven confirmation count for consecutive pages. A confirmation may finish text reveal instead of advancing; the count proved during authorship already captures that behavior for the build and controller identity.

End the transaction before an unobserved choice or irreversible action. If the postcondition is absent while the exact safe dialogue guard remains visible, execute only the card's frozen recovery. Otherwise return to specialist-guided authorship.

### Menus and choices

Start `navigateMenu` from a visible selection and mode. It may contain several logical directions followed by confirmation. Verify only the postcondition unless the sequence could enter an unproved irreversible mode.

### Top-down movement

Use one `move` transaction for a browser-proved sequence of directional runs between visible checkpoints. Counts are discrete pulses, not seconds. Confirm arrival, interaction relation, and facing only when the postcondition requires them. Camera and follower motion are not player displacement by themselves.

### Hybrid flows

Separate transactions at choice, menu, transfer, or other boundaries where another input could commit an unseen branch. Safe map-to-dialogue or dialogue-to-map transitions may remain inside a proved transaction.

## Diagnose divergence publicly

When the postcondition does not appear:

1. use the controller result to distinguish complete from uncertain delivery;
2. observe the current public state;
3. execute frozen recovery only when its exact guard matches;
4. otherwise send the current image and controller result through the invoker;
5. let the specialist replace the transaction or recovery;
6. browser-test every executable replacement before writing it to the card.

Do not repeat contradicted guidance as truth. Telemetry failure marks timing invalid but does not stop gameplay. Delivery uncertainty requires observation because the game state may have changed.

Common diagnoses:

| Observation | Controlled response |
|---|---|
| Input has no visible effect | Check the returned delivery status and public focus guard; request specialist correction |
| Character turns without moving | Record orientation separately from displacement |
| Dialogue remains open | Apply only the frozen same-dialogue recovery when its guard matches |
| A choice appears | Stop dialogue input and begin the separately proved menu transaction |
| Wrong menu or scene appears | Stop; use frozen public recovery or return to authorship |
| Live image is black or stale | Replace the rolling scratch image; keep sensor failure separate from gameplay |
| Route contradicts the screen | Stop that transaction and return exact public evidence to the specialist |

## Author and optimize the card

Only the player-author writes executable card content. Keep one JSON card matching `controller-and-route-card.md`. Append transactions from observed execution, including public precondition, action, postcondition, checkpoint relation, and proved recovery.

The specialist may correct route meaning, but the player retests every change to action, order, count, choice, guard, or recovery. Text-only clarifications that do not change execution need no replay.

After the first finish, browser-test specialist-proposed removal of detours, redundant inputs, and unnecessary recovery. Keep failed attempts in scratch, never in the main route. Finalize only when every retained transaction has public proof and the specialist knows no faster public route for the build.

Validate the complete card with the read-only helper. The specialist approves its canonical hash and controller identity; the invoker matches them mechanically.

## Run one clean replay

As clean replayer:

1. receive no authoring trace or private specialist artifact;
2. recalculate the card hash and controller identity;
3. acquire a released browser lease and run a fresh no-input preflight;
4. persist preflight and each later runner receipt to the run-bound ledger before any next input;
5. execute frozen `setup` transactions through the controller to reset publicly;
6. prove the initial guard and start the continuous operational clock;
7. execute only frozen `route` transactions and guarded recovery;
8. observe once after every persisted transaction;
9. persist that same observation only when it is a frozen material checkpoint;
10. stop the operational clock at the visible finish guard;
11. summarize the complete receipt ledger against the approved card.

For a nonmaterial observation, overwrite `<scratch>/live.png`. For a material checkpoint, write its carded PNG basename in the staging area and use the returned image as the live observation. Do not reopen it during replay. After the finish, the invoker reopens and hashes every staged canonical image.

Any unguarded gameplay divergence ends that replay identity and returns the affected transaction to authorship. Missing images or timing data do not revoke an otherwise observed finish.

## Report and release

Separate expectation, observation, and inference. Report gameplay, card, workflow, both timing metrics, browser, visual evidence, and cleanup independently.

Close the run-owned browser pages and verify the harness release oracle. When the harness exposes a profile holder, act only on the recorded run-owned identity. Never match or terminate browsers broadly.

After verified promotion, remove the exact current-run scratch root. Leave artifacts from older executions untouched.
