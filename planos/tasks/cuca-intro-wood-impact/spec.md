# Cuca introduction wood impact — 2026-11-04

Status: implementation requested by the user in this chat. This increment changes only the introduction audio of A3, O Pilão da Cuca; completed audio and encounter specs remain historical baselines.

## Confirmed behavior

Play the user's selected, louder and softened wooden impact throughout A3's description, from the encounter presentation until the escape approaches appear. Repeat the effect while the player reads. Rereading the description plays it again and stops before returning to the same choices. Preserve the route music, dialogue, choices, progress, saving and the existing sacrifice sound.

This request approves this encounter-specific introduction sound as a narrow exception to the original §19.4 exclusion of exclusive encounter effects. It does not authorize effects for other traps. The volume and repetition remain a prototype mix awaiting the user's in-game listening acceptance.

## Implementation

`Map009.json`, event 1, page 1 owns two native Play BGS commands: start after the encounter picture/audio setup, stop after ReadingEnd and before ReadingComplete/checkpoint handling. The next scene pass restores the route ambience through existing CE67. During the description, the impact occupies the native BGS channel in place of the route ambience; BGM continues unchanged. Continue at the choices does not restart the impact. No plugin, switch, rule or save-schema change is required.

The local runtime asset is `audio/bgs/Dryland_A3_Pilao_Madeira.ogg`: stereo Vorbis, 48 kHz, 3 seconds, quality 6, event volume 90, pitch 100, pan 0. It loops through native BGS and respects the player's BGS volume/mute. Source: the user's ElevenLabs file `A_very_strong,_percu_#3-1793818265524.wav`, using the adjusted `pancada-madeira-mais-alta-suave.wav` produced in this chat. No remote service is used by the game.

## Verification and acceptance

Check the exact native-data diff and audio decoding, then run existing IT-049 (repeated rereading) and IT-087 (all sixteen encounters across the three routes) through the maintained runner. No permanent appearance/mix test is added: these journeys already protect reading/progression, while timbre and mix require listening. Preserve the user's browser session and saves; tests own separate profiles and ephemeral ports.

The native data and event-list checks have the same pre-existing findings before/after: missing inactive CreditsPage file, two number-list entries in CE002, and five CE002 choice-grammar findings. The plugin envelope passes. The mutation was verified on a disposable copy first, is idempotent, and preserves every original command and all other map content.

Demonstration: capture A3 from its first dialogue through the escape choices with audio; repeat with Rever descrição. The impacts should repeat only during reading, while the route music continues. Human listening acceptance remains pending; runtime verification does not claim that the sound was heard by the agent.

## Execution results

- **PASS, local Chrome:** IT-049 and IT-087 through `node rpg-maker/tools/run-tests.mjs --ids IT-049,IT-087 --output .artifacts/cuca-intro-audio/chrome-source-utf8`. The runner used the configured ceilings of 3 workers/3 browsers, with two simultaneous workers/browsers; 202.9 seconds, no unrun cases and all owned processes closed. [Receipt](../../../.artifacts/cuca-intro-audio/chrome-source-utf8/run.json). The tests cover rereading and the real native route journey through all sixteen encounters; they do not establish listening acceptance.
- **PASS, asset decoding:** the shipped Ogg decodes as stereo Vorbis at 48 kHz for 3 seconds, with peak approximately -1.15 dBFS and RMS -16.61 dBFS. Runtime asset SHA-256: `98d0e0749fdbbbd422ffa6271798d580f09839385ab8ef88e0dc3da8218d8206`.
- **PASS, scoped authoring review:** exactly two commands were added to Map009; every original command, dialogue, choice and other map property remains identical. All A3 introduction text is between the start/stop commands. Plugin envelope passes and `git diff --check` is clean. Native-data/event validators retain only the pre-existing findings documented above; [before/after logs](../../../.artifacts/cuca-intro-audio/). Deslop review found no extra game code, dependencies or unrelated edits in this change.
- **Blocked, pruned-build preparation:** the first attempt stopped before any browser because the existing `debug-gate.mjs` parser requires LF after `var $plugins =`, while this Windows checkout has CRLF. The same parser is present in HEAD. [Failure log](../../../.artifacts/cuca-intro-audio/chrome/prune.log). The passing run qualifies the requested local source game, not a pruned distribution; this unrelated tooling file was not modified.
- The first source attempt failed before browser launch because Python's default console encoding corrupted the accented user-directory path. The successful run sets `PYTHONUTF8=1` and `DRYLAND_PYTHON` to the installed bundled Python for that invocation only. [Initial receipt](../../../.artifacts/cuca-intro-audio/chrome-source/run.json).

NW.js and the editor UI were not exercised. The user browser/server and saves were preserved. The final mix/cadence remains pending user listening in the game.
