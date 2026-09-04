# Playing an RPG Maker MZ scenario through the browser

Use this guide as the player-author or clean replayer. The player-author receives a source-informed public route, proves it through browser actions, and writes a reusable card from observed behavior. The replayer proves that the approved card works without help.

## Black-box boundary

Use the same public surfaces available to a human player: keyboard, mouse, visible menus, dialogue, and inspectable live images. Record public reactions after causal action groups.

Keep these internal surfaces outside the player context:

- RPG Maker globals, map data, events, switches, variables, saves, plugins, and source;
- DOM or page-script state used to identify or change gameplay;
- debug, teleport, passability bypass, engine-speed changes, or route automation;
- private specialist analysis and historical learning traces.

The player may receive exact source-derived **public** instructions through the invoker: keys, clicks, counts, bounded holds, choices, visible landmarks, text, reactions, guards, and recovery. Mark the card as assisted after receiving them.

## Prepare the browser

Before gameplay:

1. Read the public contract and identify the target, build, entry, reset, initial signal, finish oracle, screenshots path, and browser ownership.
2. Enter through the contracted public URL, file, or command without changing the game.
3. Use only the run-owned browser profile or context and contracted viewport.
4. Confirm that a live visual call returns an image the player can actually inspect.
5. Stabilize the first surface and record it before sending gameplay input.

Keep one browser owner. Release every held key even when observation or capture fails. Start only processes named by the contract and record their exact identities for teardown.

## Attempt one checkpoint per turn

The specialist supplies the complete public route before play, and the invoker identifies the next checkpoint as the immediate objective. One player turn attempts that checkpoint as a whole.

Within the turn, repeat:

1. **Observe** the stable screen, focus, selection, orientation, and last change.
2. **Act** with one causal public group: a short movement sequence, one menu operation, one dialogue advance, or another bounded instruction from the route.
3. **Release** every held input.
4. **Stabilize** movement, animation, text reveal, fade, followers, and camera.
5. **Compare** the visible result with the route's reaction and stop guard.
6. **Record** the exact dispatched input and observed result.

Continue within the same turn while the route and current public state agree. Return to the invoker when the checkpoint is reached, the route is contradicted, more precision is needed, or a technical or safety condition appears.

There is no discovery clock, input-slice gate, attempt cap, guidance tier, or checkpoint-time failure. Progress is measured by reached public checkpoints.

## Diagnose a divergence publicly

When the expected guard does not appear:

1. release inputs and stabilize;
2. record the public precondition, exact input, visible reaction, and expected reaction;
3. capture one current-run diagnostic screenshot when it would disambiguate the state;
4. send the screenshot path and input trace through the invoker;
5. wait for corrected or more specific specialist guidance;
6. continue from the current trustworthy state or perform the public recovery supplied by the specialist.

Do not repeat a contradicted instruction as truth. A new specialist instruction may specify exact counts, holds, choices, focus actions, landmarks, or recovery. Execute it only through public controls and confirm each material reaction.

Common public diagnoses include:

| Observation | Controlled response |
|---|---|
| Key appears ignored | Recheck focus and stable state, then try the specialist's bounded hold or alternate public key |
| Character turns without moving | Record orientation change separately from displacement |
| Camera scrolls or followers move | Identify the controlled leader and use visible landmarks rather than screen coordinates |
| Dialogue does not advance | Distinguish text reveal, next page, closed window, and choice state |
| Menu or save screen opens | Release inputs, use the public recovery, and re-establish the card precondition |
| Screenshot is black or stale | Reopen it, retry passively, and keep sensor failure separate from gameplay |
| Route contradicts the screen | Stop that step and request specialist correction with screenshot plus trace |

## Genre-specific observation

### Visual novel

- Wait for the page and continuation indicator to stabilize.
- Use one confirmation per observable dialogue transition unless the approved card has a tested deterministic group.
- Distinguish finishing text reveal, opening the next page, closing the message window, and entering a choice.
- Record every visible choice before selecting the instructed option.
- Keep auto and skip disabled unless the route explicitly tested them as public actions.

### Top-down exploration

- Confirm displacement separately from orientation, collision, follower movement, and camera motion.
- Break long legs at visible anchors such as a door, wall, corridor, object, NPC, or distinctive composition.
- Use exact tested counts or bounded holds between anchors; elapsed time alone never proves arrival.
- Near events and transfers, stabilize and observe before the next action group.
- Record the public relation needed for interaction, including facing direction when material.

### Hybrid flow

Revalidate focus and mode after every transition between movement, dialogue, menu, and choice. An input valid in one mode may advance another unexpectedly.

## Write the route card from execution

Only the player-author writes executable card steps. Append a fragment immediately after reaching each material checkpoint:

```markdown
| Step | Public precondition | Inputs dispatched | Visible reactions | Completion guard | Resume guard | Recovery | Dependencies |
|---|---|---|---|---|---|---|---|
```

The card header records target, build, entry, public reset, initial signal, finish oracle, controls, assisted provenance, validity conditions, revision, and approval status.

For every step:

- describe the state in player-visible language;
- record the inputs that actually worked, including holds and releases;
- bind each action group to its visible reaction;
- end on a stable post-event completion guard;
- state the resume guard even when it equals completion;
- provide safe public recovery;
- make the text executable without a screenshot.

The specialist may correct route meaning, but the player retests every change to inputs, order, duration, choice, guard, or recovery. Spelling, formatting, and metadata-only corrections need no browser replay.

## Optimize after first completion

After the finish oracle appears, execute specialist-proposed optimizations through the browser. Remove detours, redundant interactions, unnecessary dialogue operations, blind waits, and recovery steps from the main path only after a public retest. Keep diagnostic attempts in the trace rather than in the executable route.

Finalize the card only after every retained step has been observed and the specialist knows no faster public route for the build. The complete card then receives one hash and formal approval.

## Clean replays

As a clean replayer:

1. Reopen the durable card and approval; recalculate the hash before browser input.
2. Start from the contracted public reset and prove the initial state.
3. Execute only the approved card. Do not request help, explore, correct, or edit.

### Performance pass

Read `.agents/skills/rpg-maker-mz-black-box-playtest/references/active-clock.md` in full. Run first without screenshots. Measure one continuous interval from the contracted start signal to the finish oracle. Record inputs and passive checkpoint timestamps. Duration is an optimization result, not a gameplay pass threshold.

### Evidence pass

After performance completes, reset and use the same identity, card, and hash. At each frozen checkpoint, stabilize, capture one screenshot, and reopen it before the next input. Retry a bad capture passively up to three times; then record `CAPTURA AUSENTE` and continue. The final screenshot, when available, must show the scenario-specific finish signal.

Any gameplay divergence ends that replay. Preserve its trace and return the card to guided authorship; a corrected hash requires a new replayer and both passes again. Missing screenshots alone do not fail gameplay.

## Report and teardown

Separate expectation, observation, and inference. Report gameplay, card, workflow, browser, and visual evidence independently. A filename or expected checkpoint never proves image contents.

Retain the contract, approved card, manifest, public traces, performance ledger, report, and valid evidence-pass screenshots. After success, remove only run-owned diagnostic captures, invalid images, temporary profiles, and temporary files. Preserve failure artifacts. Close only the browser contexts and processes created by the run, using their exact recorded identities.
