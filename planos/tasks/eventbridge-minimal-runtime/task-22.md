---
id: "22"
status: completed
depends_on: ["21"]
verification_ids: [MAV-004]
---

# Task 22 — Prove campaign-map handoff through Gorvak's epilogue

## Outcome

Map029 owns H1's epilogue under an explicit, tested native handoff contract that later campaign-map migrations can follow.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-003/004/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-004; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Map029.json, corresponding CE040 and CE041 branches, CE306; existing query/completion/checkpoint helpers and canonical closing/continuity fixtures. Project plugin changes only within the approved boundary if demonstrably required.

**Delete targets:** CE306 after moving the actual content; only its obsolete selector branches. CE040/041 remain while other functional paths use them.

Tests remain in `rpg-maker/tests/suites/`: endings.mjs, persistence.mjs, native-checkpoints.mjs, native-controls.mjs, content.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Record in this task a concrete phase/map/source-interpreter/destination-owner table, including valid and mismatched entry, same-map next passage, transfer and Continue. Use spec MA-003/009 as invariants.
- [x] Move H1 epilogue text and native presentation to Map029. Keep eligibility and passage selection in campaign facts; capture and complete the actual semantic passage on the correct interpreter.
- [x] Change only the corresponding CE040/041 paths so routing cannot execute the migrated body too. Preserve unmigrated campaign branches and shared checkpoints.
- [x] Demonstrate source-chain termination and destination ownership across initial transfer, already-current map, saved-boundary resume and next epilogue/credits; no copied global campaign loop or Bridge content dispatcher.
- [x] Update the epilogue branch of persistence case IT-062 to verify the serialized Map029 root/event identity, saved command position and ordinary continuation instead of requiring `chain.length > 1`. Preserve its picture, campaign, audio and saved-byte assertions; retain the unmigrated Council/farewell branch expectations until their own ownership changes.
- [x] Null CE306 after every caller moves; update the canonical fixture and record the before/after handoff trace as the dependency for tasks23–28.
- [x] Verify no duplicate completion/write, phase mutation from map entry or content execution under the wrong hero/map; retain normal native error behavior.

## Validation and handoff

MAS-03/05/07. Build isolated valid H1 eligible/not-current/already-current/checkpoint fixtures and observe the real interpreter stack plus campaign sequence. Any unmet existing invariant is a task failure to fix, not a new automatic approval checkpoint.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-22/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed: Map029/event001 owns H1 text/presentation and explicit capture/completion; CE040 hands off before audio, including an unconditional exit for the already-current map; CE041 no longer selects H1 epilogue and CE306 is null. IT-062 preserves exact saved map/event/index and ordinary completion; IT-073 visits the expected map, Map004 and a wrong hero map.

Preparation failure retained: the initial writer recognized minified/four-space data but Map029 uses two spaces and a final newline. No game/test was launched against the partial write. CommonEvents was restored byte-for-byte from the task22 pre-change copy, and the materialized writer now checks every destination format before any write and preserves its actual indentation/newline. The corrected transformation completed.


## Native handoff implementation contract

| Entry / phase | Source interpreter | Destination owner | Required behavior |
| --- | --- | --- | --- |
| epilogue / H1 on another map | Native CE040 child of that map | Map029/event001 autorun | Route before audio/content; native transfer, then exit source CE; destination binds the actual passage. |
| epilogue / H1 already on Map029 | Map029/event001 | Same map root | Query current facts and execute local body once. CE040 returns without executing a second body if reached on that map. |
| epilogue / another hero on Map029 | Map029 guard then CE040 | Correct hero map | No H1 bust/text/completion; cross-scene router hands off to the appropriate owner. |
| Another phase on Map029 | Map029 guard then CE040 | Existing phase owner | No epilogue action or new state; ordinary routing handles the valid campaign. |
| Local passage completes | Map029/event001 | Local `scene` label, then router | ReadingComplete once, existing CE044 checkpoint handling, refresh facts, route to next epilogue/credits. |
| Native Continue inside H1 text | Serialized Map029/event001/index | Saved root at same index | Preserve pictures, facts/audio and file bytes; continue ordinary commands, without reconstructing the prefix. |

This table defines the implemented boundaries; focused native verification passed. The materialized campaign migration applies one approved task slice at a time. It copies only each scene's local content and lifecycle; shared rules, checkpoints and cross-scene routing stay in their current owners.


## Result — 2026-09-14

MAV-004 technical PASS. IT-047/048/062/073 passed in one fresh174s run: `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(047|048|062|073)' rpg-maker/tests/campaign.test.mjs`. IT-073 exercises H1 from Map004, already-current Map029 and wrong Map030; H2 entering through Map029 proves the hero guard, and the closing sequence exercises the phase guard toward credits. The native text is owned by Map029/event001 without a child interpreter. IT-062 asserts exact saved map/event/index, pictures, campaign, cues and saved bytes, then ordinary completion once after Continue. IT-048 preserves ending saves, ordering/omissions, transfers and no extra writes. CE306 is null, CE041 retains its other consumers.

All runtime/test inputs stayed unchanged during the run. Two-space Map029 formatting is preserved, as are shared helpers and existing art/scale. No plugin/engine/save policy change was needed. The table above is the proven implementation boundary for tasks23–28; native integration does not pass directed/human judgment. Final evidence is in the ignored task22 path above. Tests/transform/live map-routing and this durable record are maintained; raw logs remain local. Owned profile/server closed, no staging/commit. Task23 follows.
