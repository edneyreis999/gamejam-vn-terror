---
id: "19"
status: completed
depends_on: ["18"]
verification_ids: [MAV-001]
---

# Task 19 — Migrate Elowen, Griznik and Seraphina to their own interaction maps

## Outcome

H2–H4 use the accepted Gorvak menu/visit lifecycle in real map-authored interactions, with their original text and formation behavior.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-001/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-001; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- User-authorized planning on 2026-09-14, followed by execution authorization (“siga para os proximos passos”). Commits remain outside this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Three appended Taverna child maps, MapInfos.json, CE003 portrait branches, CE006–008 and CE086–097; affected native-player/surface driver and authoring guide.

**Delete targets:** CE006–008 and CE086–097 after all consumers move; preserve observation identities86–97 and all other slots.

Tests remain in `rpg-maker/tests/suites/`: formation.mjs, native-controls.mjs, content.mjs; native-boot/native-inventory support. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Reconcile current IDs/callers and preserve the three heroes' original nine text boxes each, assets and unit identities; allocate maps from the live MapInfos checkout.
- [x] Put actual menu/text/bust/selection/full-party/return commands in each map. Query eligibility and phase; keep Ivaí out of the party and outside his conversational participation.
- [x] Replace the CE003 branches with native transfers and source-path exits. Preserve full/automatic/dead guards, current group display and cancel/return focus.
- [x] Calibrate each hero natively instead of copying H1 scale/position blindly; preserve assets, HIDE/Options/FAST, ambience and reduced motion.
- [x] Migrate affected test/driver consumers, null the displaced bodies and record old/new locations plus preserved logical reading IDs.
- [x] Exercise all three maps and H1 regression through canonical native integration, including unread/reread, selection/removal/rejection and return without campaign change.

## Validation and handoff

MAS-01/05/06/07. Prepare valid native formation fixtures for manual/full/automatic/dead cases; observe actual map root, selected unit and campaign outcome. Directed and human acceptance remain with task16.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-19/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Task authoring changed no game files. Execution started on 2026-09-14 on `experiment/gorvak-interaction-map`; the pre-existing dirty tree is preserved. This execution is bounded to task19/MAV-001. Directed/editor/human expansion acceptance remains with task16.

### Execution checklist and ownership

1. Preserve live IDs, nine original text boxes per hero and observation identities. The pre-change native IT-080 failed at Elowen (`3 !== 38`); source/consumer snapshots are local under `.artifacts/task19/`.
2. Create Map038/event001 (Elowen), Map039/event001 (Griznik) and Map040/event001 (Seraphina), parent Map003. Each autorun owns menu, profile, conversation, selection/full-party feedback and return. CE003 clears outgoing stage pictures, transfers and exits; local guards query phase/alive facts.
3. Retire CE006–008 and CE086–097, preserving null slots and logical units86–97. The original 15 calls were CE003→CE006/007/008 and four private unit calls inside each controller. All other CE bodies remain structurally identical.
4. Reuse original PNGs and native providers; calibrate portrait fields individually. No plugin, engine, asset, dependency, campaign rule or save policy is changed.
5. Update canonical formation/control/content/inventory fixtures and directed return navigation. IT-067/069 edit disposable Map038, IT-071 uses a native replacement call in its disposable map, and IT-024 recognizes the explicit return menu. Existing Common Event edit helpers remain available to their functional consumers.
6. Validate H1 regression, H2–H4 text/reading, selection/removal/full/automatic/dead guards, HIDE/Options/FAST, ambience and native Continue. Native integration is distinct from task16's directed/editor/human sensors.

Implementation transformation: [implement-hero-maps-h2-h4.mjs](implement-hero-maps-h2-h4.mjs). This is a one-time historical transformation with preconditions, not a generation requirement after native editing. The source is directly editable in MZ after this migration; no transformation script is needed to play or edit the maps.


### Result — 2026-09-14

**PASS — MAV-001, task19 technical implementation.** Fourteen affected canonical cases passed: IT-001/002/006/007/024/036/047/062/067/069/071/074/080/081. IT-081 exercises H2–H4 through normal 1280×720 and reduced-motion 1920×1080 native sessions, including every original profile/conversation box, partial/completed units, separate numeric identities, Options/HIDE/FAST, selection/removal, full-party rejection and automatic formation. IT-080 proves native map roots, dead-entry rejection, focus return and unchanged People1 playback; H1 regression passed. IT-024 preserves A/B file isolation through real native departures and Continue. IT-067/069/071 prove disposable map edits, native serialization and functional replacement calls.

| Hero | Current native owner | Retired controller and units | Preserved reading IDs | Picture60 active scale / x / y | Listener scale / y |
| --- | --- | --- | --- | --- | --- |
| Elowen | Map038/event001 | CE006, CE086–089 | 86–89 | 38% / 250 / 1320 | 36% / 1254 |
| Griznik | Map039/event001 | CE007, CE090–093 | 90–93 | 50% / 320 / 1100 | 48% / 1058 |
| Seraphina | Map040/event001 | CE008, CE094–097 | 94–97 | 38% / 355 / 1260 | 36% / 1198 |

Each map has 206 native commands, nine preserved narrative text boxes and the group-status menu box. Ivaí uses picture63, x960/y725, 44% when speaking and42% while listening; he is erased before the hero menu. Hero focus moves Y with scale to retain the head within the frame; normal focus takes20 frames and reduced motion is immediate. Inspected normal/reduced captures show the three scenes; Griznik's initial32% framing was enlarged after visual inspection. Existing artwork and writing retain their provisional status, without introducing new assets.

Validation commands:

- `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(001|002|006|007|024|036|047|062|067|069|071|074|080|081)' rpg-maker/tests/campaign.test.mjs`:13 passes, then IT-081's automatic-roster fixture needed its live ordinal corrected.
- `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-081' rpg-maker/tests/campaign.test.mjs`: PASS after that correction and final Griznik calibration. The other13 results retain their scoped applicability: only picture60 scale/Y in Map039 and IT-081's body changed; their routing, text, state, save and expected-result inputs are unchanged.
- Structured JSON/text/consumer audit: PASS. Native calls in maps/CEs/troops, choice tags, serialized active-provider selectors and project call/configuration paths leave no executable reference to the15 retired IDs. CE076/080/081 remain functional for H5–H8; CE044/351 remain shared helpers. Unrelated CE objects, map hierarchy and Map037 are preserved.
- `node --check` on the10 changed JavaScript files and `git diff --check`: PASS. The materialized transformation was replayed against a disposable copy of the original data to verify the final output without overwriting later native-editor work.

Test corrections preserve the approved behavior: FAST resets at each observation-unit boundary, so IT-081 reactivates it for the already-read conversation; IT-069 no longer waits for the removed generic status footer; automatic-roster input uses the visible living-hero ordinal because CE003's Show Switch tags hide dead entries. These correct test assumptions rather than change production policy or suppress failures. The pre-change and intermediate failing logs are retained.

Detailed output is local and ignored at `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-19/`: result/freshness hashes,14 canonical execution records,12 final captures, initial framing, retirement ledger and failing/passing logs. Runtime: Node22.23.2, Chrome153.0.8010.36, isolated origin `http://127.0.0.1:18730/`; temporary browser profiles and test servers were closed. Personal saves were not touched. Native saved interpreter indices from older event structures have no conversion guarantee.

Remaining scope: task20 migrates H5–H8; task29 owns the complete orphan/continuity join; tasks15/16 own directed QA, native-editor demonstration and human framing/navigation/audio judgments. No new human acceptance, release readiness, staging, commit or publication is claimed. Devlog candidate: Taverna → Conversa — Griznik → native menu/dialogue → return, paired with task16's later edited-line demonstration.
