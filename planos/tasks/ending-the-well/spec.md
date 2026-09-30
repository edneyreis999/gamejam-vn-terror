# The Well immediately after the final choice

## Confirmed request

The user reported a victory-like sound after choosing the ending and requested its removal, keeping the epilogue music instead. Both successful choices now start The Well at volume 35 as soon as the ending context refreshes. Remove both Musical1 and Organ selections from this context. Stop an already-playing ME before starting BGM. Continue through ending text, any memorial, hero epilogues and credits without restarting the same track.

The total-loss ending is outside the final choice and keeps its existing silent BGM. Revelation and final-choice tension tracks remain unchanged. This supersedes the outcome-theme preservation clauses of earlier audio increments only for reunite/destroy. No asset, engine/plugin, campaign rule or save-schema changes.

## Implementation

Replace CE67's ending audio block: stop ME; select The Well for reunite/destroy, otherwise stop BGM; stop BGS; retain the existing audio ending marker (variable 64). Do not stop BGM before reselecting The Well, so repeated context calls retain native playback. Existing epilogue selection uses the same track and volume. Other contexts and authored event lists remain intact.

## Verification and delivery

Scoped checks PASS: both decisions select The Well at 35 and only an empty ME cue. Executing the installed native AudioManager methods with buffer doubles confirms an existing ending ME is destroyed, repeated ending refresh and epilogue entry retain one looping buffer/play call. Total-loss BGM remains empty; seven other context outputs are unchanged. Structural comparison against baseline a621d78 confines the change to the ending block; syntax, whitespace and focused diff review passed. CommonEvents SHA-256: `82fd143984c8b1849cf43d3416d7279c66f03cbb40b0e69de4209104f1251e2d`. Isolated method checks are not a browser playthrough or listening session. Keep the focused data/GDD changes, this incremental decision and authoring script. Suggested devlog clip: final choice flowing into The Well without a victory cue, then epilogues. The user subsequently requested a local commit of this follow-up. No push requested.

No browser/server launched; actual listening remains pending.
