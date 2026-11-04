# Pawn movement footsteps — 2026-11-04

Status: implementation authorized by the user's supplied plan. Increment over `expedition-route-map`; historical opening-walk, suspense and audio-sync records retain their original evidence.

## Confirmed behavior

Remove the dark walking transition before all 16 traps: repeated steps, waits and the 1.5-second reveal. Arrival starts the normal scene, allowing asset loading. Preserve expedition opening conversation, trap dialogue and B2's own footsteps.

Play footsteps during pawn travel, including camps and destinations. Keep 650 ms travel. Reduced motion or zero duration enters directly without sound. Stop at arrival or scene exit, independently of other effects. Continue does not replay movement.

## Implementation contract

Map007–022 retain the encounter image and CE67 audio context but remove the surrounding transition commands and CE377 call. CE377 and its exclusive CE378 helper become empty native slots. No campaign rules, save schema, translations or frozen plugins change.

`Dryland_6_RouteMap` preloads a scene-owned SE buffer, loops it during animated travel and stops/destroys it on scene lifecycle boundaries. MZ stop clears pending load callbacks, so late loading cannot play after arrival. Audio never extends travel. Generic MoveSe is empty; Afogados configures `sfx_b2_passos`, volume 80, pitch 120, pan 0 through plugin parameters and CLI. The existing B2 asset remains.

## Verification scope

Reuse UT-079/080, IT-086 (mouse, keyboard, Continue, arrival, camp, retreat), IT-087 (all routes and destinations, reduced motion) and IT-044 (persistence) on the pruned Chrome build. Repeat representative journeys in NW.js. Inspect the native diff, runtime compatibility, CLI descriptions/validation and pruned audio retention. No permanent appearance/audio timing tests: mix and synchronization require listening/capture and human judgment. Zero duration and repeated input are checked separately if not exercised by those existing journeys.

Gamepad/native zoom are excluded under G005/G003. Full unrelated slow permutations are omitted under G006; the selected journeys cross every changed arrival family. Preserve user's open runtime and saves; close agent-owned test runtimes.

## Acceptance and demonstration

Prototype baseline: 650 ms, volume 80, pitch 120, pan 0. Human acceptance of synchronization/mix remains pending. Capture with audio: second trap → camp → next trap, with footsteps ending on arrival and no dark walk. Results and remaining evidence gaps are recorded below when verified.

## Verification results

- Pruned Chrome: **PASS**, UT-079, UT-080, IT-086, IT-087 and IT-044. [Runner receipt](../../../.artifacts/pawn-steps/chrome/run.json): 3 workers/3 browsers from `loki.config.json`, 191.9 seconds, all five selected cases passed, cleanup confirmed. The full route journey visits all 16 traps, six camps and destinations; no new permanent test was added.
- Native dialogue comparison: all 16 trap speaker/text command lists match the pre-edit snapshot; every Common Event other than retired 377/378 matches. No calls to retired slots remain. `sfx_b2_passos.ogg` is present in the pruned game and remains used by B2.
- CLI: valid audio settings, empty filename, boundary values and Duration 0 accepted; out-of-range/fractional audio values and an extension-bearing filename rejected. [Cases](../../../.artifacts/pawn-steps/cli-cases.json). Current description review **PASS**: [record](cli-review.json), [receipt](../../../.artifacts/pawn-steps/cli-final/receipt.json), using `node rpg-maker/tools/check-cli-docs.mjs --cli rpg-maker/tools/route-map.mjs --project 'rpg-maker/The Dryland Drowned' --scope planos/tasks/pawn-movement-steps/cli-scope.json --review planos/tasks/pawn-movement-steps/cli-review.json --output .artifacts/pawn-steps/cli-final`.
- Runtime floor: all 32 enabled plugins passed the installed compatibility scanner; plugin envelope structural/native-layout checks passed. Native data and event-list checks report the same three/five pre-existing findings documented by the route-map delivery (CreditsPage file and CE002); these checks are not claimed as passing. Logs: `.artifacts/pawn-steps/native.txt` and `events.txt`.
- Temporary capture walks reused existing native input helpers against a disposable pruned game with new campaigns. Read-only frame samples and canvas/master-audio recording captured mouse and keyboard travel, two traps, camp and post-camp trap. [Camp video](../../../.artifacts/pawn-steps/travel-3.webm), [post-camp video](../../../.artifacts/pawn-steps/travel-4.webm); corresponding `travel-1..4.json` record moving/audio flags. Audio playback starts with movement and stops at arrival; no sampled frame plays the dedicated buffer outside movement. Wall-clock intervals are approximately 651–667 ms (650 ms ticker duration, frame quantization).
- Additional captures: repeated Enter and repeated mouse clicks each produced one c0→c1 arrival and one playback interval (`repeated-1` and `clicks-1` video/JSON). A disposable copy authored with Duration 0 reached c1 directly, with zero moving/playing frames (`zero-1` video/JSON). These are one-off observations, not permanent appearance tests. Native WebAudio stop clears load callbacks, and the scene stops its own buffer before termination without calling global stopSe.
- Capture preparation initially called `isBusy()` before the new scene had a message window; the capture predicate was repaired to wait for a started scene/window. The failed observation closed its resources; no game code was changed to accommodate it. Final capture walks reported no exceptions. Opening and arrival screenshots were inspected; audiovisual files are available for listening, but human listening/mix acceptance is **pending**, not established by playback flags. No editor UI inspection was performed.

Deslop review: scoped plugin/data/CLI changes were inspected against the pre-existing workspace and native map diffs. No broad cleanup, dependencies, frozen-code changes, rule changes or test deletions. `git diff --check` and JavaScript syntax checks passed. Pre-existing workspace edits remain intact.

NW.js: **PASS**, IT-086 and IT-087, [run](../../../.artifacts/pawn-steps/nw/run.json), 239.0 seconds, two concurrent workers/browsers with explicit limits of 2/2 to reserve one slot for the separate capture walk (combined ceiling three). Native NW 0.51.0 / Chromium 88.0.4324.96; [probe](../../../.artifacts/pawn-steps/nw-probe.json) reports Scene_Map with no error printer. The runner mutes NW output, so this establishes runtime/flow compatibility, not NW listening acceptance. Both Chrome and NW runners confirm no remaining owned browsers/process groups. The capture helpers close their browser profiles and ephemeral-port servers in `finally`; no user's server or saves were used.

[Arrival through first dialogue](../../../.artifacts/pawn-steps/arrival-1.webm) extends the capture beyond the native map-ID change until the destination message pauses. The earlier short clips show movement and audio stopping, but end before the rendered trap is established; use this extended clip for the visual transition. Its final frame was inspected. All capture processes and ephemeral servers are closed; the zero-duration disposable game copy was removed. Listening remains the explicit human acceptance item.
