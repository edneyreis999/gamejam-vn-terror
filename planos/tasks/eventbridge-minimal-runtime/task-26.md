---
id: "26"
status: completed
depends_on: ["25"]
verification_ids: [MAV-008]
---

# Task 26 — Prove map-owned encounter execution with A1

## Outcome

Map007 owns A1's encounter content under a tested phase/handoff contract without duplicating shared campaign rules or consequences.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-003/007/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-008; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Map007, A1-related CE040/262 paths, CE013/118–124/126; shared CE042/043/044/291/304 and CE347 are retained consumers to inspect.

**Delete targets:** CE013, CE118–124 and CE126 after migration; preserve CE125, consumed by the memorial death-inscription selector CE347.

Tests remain in `rpg-maker/tests/suites/`: encounters.mjs, retreat.mjs, sacrifice.mjs, native-death-context.mjs, native-checkpoints.mjs, content.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Extend the task22 table to encounter_intro/choice, reread, approach result, retreat confirmation, sacrifice/death, automatic retreat and route completion, with one owner per phase and transition.
- [x] Author A1 description, all three approaches and their success/failure text/presentation in Map007. Keep assignment/requirements/results in CampaignRules.
- [x] Preserve functional shared sacrifice/consequence/checkpoint helpers, rejected actions and memorial death inscription; entry/re-read must not repeat campaign completion.
- [x] Replace the A1 CE040/262 content path without changing the other fifteen encounters. End source paths on transfers and preserve Continue after approach/victim commitment.
- [x] Null displaced A1 bodies only after every consumer moves; verify all three approaches with valid success/failure contexts, reread, retreat cancel/confirm, sacrifice, death and onward routing.
- [x] Record the native traces and reusable fixture contract required before tasks27/28; no copied sixteen-map campaign state machine.

## Validation and handoff

MAS-04/05/06/07. Isolated native fixtures cover exhaustive A1 states and rejected contexts; genuine directed entry and irreversible choices remain task16's responsibility.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-26/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed. Applied the seven-phase local handoff below to A1, with the description shared by a native label and consequences retained in functional helpers.


## Encounter handoff implementation contract

| Current phase / identity | Native map responsibility | Shared continuation |
| --- | --- | --- |
| encounter_intro / A1 | Capture and read the one local description, then complete it | CE044, refresh local facts |
| encounter_choice / A1 | Local three approaches; capture the choice context | CHOOSE_APPROACH and existing approach checkpoint |
| reread selected | Clear choice pictures; jump to the same local description; omit campaign completion | Return to local choices, with unchanged campaign |
| retreat_confirmation / A1 | Local confirm/cancel and existing actions | Confirm uses CE348/checkpoint; CE040 then routes formation to Map003 |
| approach_result / A1 | Select one of six local original results, capture and complete once | CE044 and refresh |
| sacrifice_choice / A1 | Call existing CE042 (including CE043 stage) | Its action/checkpoint remains shared |
| death_result / automatic_retreat / A1 | Call CE291 then CE044 | Existing context/farewell/consequence units remain shared |
| Identity or phase no longer owned | Guard calls CE040 and exits the map source path | Router hands off; CE040 retains dungeon introduction/reveal, route rewards, memorial and credits |

All seven encounter phases participate in CE040's native target routing before audio. The map contains only its own encounter lifecycle, not the whole campaign loop. The description has one authored copy shared through a native label; existing transient v21 distinguishes reread from campaign reading and is reset at the local loop entry. After an encounter, `dungeon_intro` without a reading performs the existing ENTER_DUNGEON/reveal checkpoint in CE040 before routing to the next assigned encounter; no extra Map004 transfer is introduced for that automatic step. Initial route-introduction content retains its existing route entry.

Task26 proved this contract before tasks27/28 apply it.

Pilot signal: IT-082 passed in31s with six independent GDD provider/outcome contexts, actual local Map007/event001 list ownership, original text, one approach checkpoint, reread, retreat cancel/confirm and result-to-next-reveal/sacrifice. The shared regression subsequently passed as recorded below.

## Result — 2026-09-14

MAV-008 technical PASS. IT-082 passed (31s), then IT-005/049/051/013/012/014/057/047 passed (239s), with identical game/test inputs. Commands: `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-082' rpg-maker/tests/campaign.test.mjs` and the same entry filtered by `IT-(005|049|051|013|012|014|057|047)`. Nine IDs passed, none failed. Exact native list/root, six approach outcomes, once-only checkpoints, reread, retreat, sacrifice/death, automatic-return and native Continue are covered. CE013/118–124/126 are null; CE125 remains called by CE347. The remaining fifteen encounter bodies are unchanged. Evidence: ignored task26 directory with pilot/shared logs, retirement ledger and canonical source hashes. The native fixture uses validated domain transitions and an explicitly assigned encounter before entering through native map execution; it is not player-earned QA. All owned resources closed; no engine/plugin/assets/save-policy change or staging/commit.
