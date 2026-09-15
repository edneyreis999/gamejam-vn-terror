---
id: "29"
status: completed
depends_on: ["28"]
verification_ids: [MAV-011, MAV-012]
---

# Task 29 — Remove remaining displaced Common Events and verify the complete migration

## Outcome

The expanded game has one maintained source for each migrated scene, no confirmed displaced CE body remains, and the canonical integration join passes before QA planning.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-003/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-011, MAV-012; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Final CommonEvents/maps/MapInfos, active configuration/provider selectors and choice tags, project reserve/call code, canonical suites/helpers/test-manifest.json, affected rpg-maker/qa drivers, rpg-maker/README.md and current authoring guides.

**Delete targets:** All remaining confirmed transitive orphans caused by tasks19–28; specifically reconcile CE041/262 and focus/presentation helpers. Preserve still-used routing, configuration, preload, triggers, HIDE, audio, save and memorial bodies.

Tests remain in `rpg-maker/tests/suites/`: native-inventory.mjs, native-boot.mjs, content.mjs, persistence.mjs, native-checkpoints.mjs, native-controls.mjs, native-audio.mjs, shared-ui.mjs and the complete canonical entry. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Reconcile every slice's removal ledger against final source. Inspect call117, map/troop lists, choice tags, provider/configuration selectors, parallel/autorun triggers and project reserve/call sites.
- [x] For each candidate, either migrate its remaining in-scope consumer then null the body, or retain it with a concrete functional reason. Preserve IDs and logical reading identities; no dead named shells or duplicated migrated text.
- [x] Verify each migrated map owns actual content and still-used helpers remain reachable, including memorial death inscriptions and CE350's parallel lifetime.
- [x] Complete current guide/driver/fixture migration so required source never depends on an ignored historical artifact or a deleted CE. Preserve historical plans/results as history.
- [x] Run the full canonical entry and resolve in-scope failures in their owning suites. Verify A/B reading, native Continue/guards, no duplicate action/read/save, pictures, HIDE/Options/FAST and native cue continuity.
- [x] Record exact changed/removed/retained IDs, candidate hashes, commands/results, evidence reuse and limits; hand off implementation fixtures and unresolved human/directed sensors to the reused QA pair.

## Validation and handoff

MAV-011 uses structured static/package audit plus native-inventory execution; MAV-012 uses canonical native integration. MAS-01–07 remain directed/editor/human work for task16; task15 prepares their current run plan.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-29/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed. All scene migrations and the final consumer join have passing canonical evidence. Final cleanup removed CE062/066/072/080/081; authoring/QA consumers target the live map paths. The full run and focused corrections below retain distinct provenance.

## Consumer audit preparation — historical pre-cleanup

Readonly survey identified CE062/066 (reserved named shells), CE072 (unused Council focus), CE080/081 (obsolete tavern focus) as final cleanup candidates. Confirmed retained consumers: CE004 in provider/Bridge configuration; CE030–037 in choice tags; CE064/065 in MessageVisibility; CE350 parallel switch47 and CE349; CE351 preload; CE068–079 except072 remain used by Council, epilogues or discoveries; sixteen inscription units remain selected by CE347. Current canonical IT-067/UT-073 still use CE080 and must move to native Map038 commands before deletion. UT-069 archive fixture should serialize a map root while preserving logical reading83. The maintained README still describes obsolete CE1/5/13/262 paths and must be updated. The final retirement script is materialized but has not run.

## First consumer-check failure and diagnosis

The first UT-069/UT-073/IT-047/IT-067 run passed three cases and failed the newly added IT-047 ownership assertion for prologue.01. This is a test-oracle defect: Map002 preserves three original Query(passageRead, id="") commands, which ask for the current campaign passage, followed by three local capture/text/completion units. The new scanner incorrectly required explicit literal IDs for this legitimate pre-existing protocol. IT-004 already proves the ordered three completions under the Map002 root. Correct the ownership sensor to inspect the prologue native units and keep IT-004 as its semantic signal; do not modify game data to satisfy the scanner. Failure log: `.artifacts/task29/consumer-check.log`. All other migrated passages use literal IDs and keep the stronger unique-owner assertion.

## Historical canonical join failures

The complete134-case run is running against frozen sources. IT-016 failed at its legacy `chain >= 3` assertion for the sacrifice checkpoint. The migrated native path is Map008/event001 → shared CE042, whereas the old path also contained CE040; the checkpoint remains in CE042. IT-015 already passed exact saved checkpoint replay, and IT-017/018 passed write waiting/failure. The owning persistence sensor must assert the new map root and retained CE042 child explicitly, preserving all existing once-only consequence checks. No source is changed while the full run continues. Preserve `.artifacts/task29/canonical-full.log`; the complete candidate has no canonical PASS yet.

IT-059 also failed while preparing its isolated fixture because it still edits retired CE115. The current authoring file is Map002. Its expectation must respect native serialization: an existing checkpoint retains its saved map-command list, while a New Game uses revised map text. Verify both without injecting updated commands into the save, then retain the existing unsupported Map999/LoadError and preserved-byte assertions. This is a consumer/expectation migration, not a change to runtime persistence. The full run remains frozen until completion.


## Reconciled retirement inventory

The final source has352 slots, including the null sentinel, with232 previously populated CE bodies now null. IDs are unchanged. The exact local ledger is `.artifacts/task29/retirement-final.json`, with original names and before/current hashes. Retirement groups: CE001; CE005–028; CE041; CE053–057; CE062/066/072/080/081; CE082–116; CE118–261 except the16 memorial inscription units `125 + 9*n` for n0–15; CE262; CE305–336. This includes the original Gorvak slice, later hero/campaign slices and the final five-helper cleanup.

The final native list audit covers Common Events, every map page and troop page:552 call117 references and8 choice tags resolve to surviving events. CE350 remains the sole triggered Common Event (parallel, switch47); CE349 clears its lifetime. The provider/project source trace additionally retains configuration CE004, focus callbacks CE030–037, HIDE CE064/065 and preload CE351. CE068–079 except072 remain functional for Council/epilogues/discoveries; CE347 retains all16 encounter-specific memorial inscriptions. Logical observation IDs82–113 remain in map commands and serialized UI history.

Documentation reconciliation also found partial historical supersession of init ADR-016/017/018's shared-prose requirement and the active ADR-002 scene-body ownership. ADR-006 and preserved historical records now have reciprocal links. No map hierarchy, campaign rule or checkpoint policy is replaced.

IT-058 also failed in its expected-text reader: `walkWithEpilogues` still looks up deleted epilogue Common Events by name. The correction must read the owning Map029–036 native text and retain all eight hero/bust checks plus once-only credits exits. This is the third confirmed stale test consumer; implementation remains frozen for the complete run.


The independent test review and full run also confirmed IT-079's obsolete navigation: it returns to Taverna only for Gorvak, then tries to select Griznik while still in Elowen's menu. Return after every selection; keep the genuine file7 producer/A/B archive, party/route and immutable-master checks. IT-064's fixed two/seven-box loop also waits for another message after its own selected-effect hook has already paused the interpreter. Wait for the explicit held effect or the next native message, retaining the bounded loop and all cancellation/picture/campaign assertions. These corrections belong to canonical fixtures, not the product.

Independent campaign and hero reviews found no remaining functional game defect after source-level adjudication. The alleged Council fallthrough and stale hero sequence were retracted: native Jump scene/hero both return before their refresh/CaptureContext commands. The alleged failed-approach QA branch overrun was also retracted: both outcomes stop at approach_result before reading completion. Editor provenance remains the planned separate CUA sensor. Two author-facing documentation corrections remain: current eight-hero reading IDs/FAST in Presentation help and accepted ADR-G001 in Gorvak's comments; neither changes executable commands or indices.


## Full run and focused correction batch

`DRYLAND_QA_PORT=18730 node --test rpg-maker/tests/*.test.mjs` finished with exit1 after2684.583s:134 canonical registrations,129PASS/5FAIL; TAP reports138 tests including four nested subtests,133PASS/5FAIL. All134 source records have `changedInputs: []`. Failures are exactly IT-016/059/058/064/079 described above. The untouched full evidence was copied before retesting to `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-29/canonical-full/`.

Applied the five focused corrections in persistence.mjs, memorial.mjs, native-controls.mjs and native-checkpoints.mjs. `update-map-authoring-notes.mjs` updated two Presentation help lines and five Map037 comments, preserving executable plugin code and command order/indices. No gameplay instruction changed in this correction batch. Syntax checks and `git diff --check` pass. The focused run adds IT-047 to the five corrected cases; its final result remains pending here until completion. Native source backups and the candidate disposition audit remain in local `.artifacts/task29/`.


### Second consumer diagnosis — interruption and memorial import

The first six-case retest ended5PASS/1FAIL and is preserved in `task-29/focused-first/`. IT064 reached the hero menu while waiting for `Basic_ExitBusts`: Maps037–044 now retain busts at that menu and their return label executes native Erase Picture60/63 before transfer. The test now advances the real conversation, selects Voltar à taverna through native input, holds immediately after command235 erases60 and checks that63/Ivaí and map38 remain because the rest of the interpreter was cancelled. Focus still intercepts the real Tone_CustomToneBust. No game commands were changed for this correction.

Independent review also caught removal of the `events` import still used by IT056. The import was restored; IT056 joins the final focused run, alongside016/047/058/059/064/079. Full-run and first-retest failures retain their original verdicts.


## Final technical result

MAV-011 and MAV-012 **PASS**. The seven-case focused command `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(016|047|056|058|059|064|079)' rpg-maker/tests/campaign.test.mjs` passed in two focused commands: the seven-case retest retained six PASS and exposed an incorrect exit-picture expectation in IT064; its final isolated retest passed with exit0. The case records preserve both execution dates. The current134-case composite has7 fresh and127 retained PASS records in `task-29/composite.json`; it does not relabel the original full command as passing. Equivalence is limited to the five corrected test consumers and two documentation-only runtime files. The preserved full sources, corrected sources, exact hashes and case results support this distinction.

The retirement ledger, actor/menu native fixtures, campaign matrices, save/controls/audio/loader checks and current authoring paths are ready for task15's planning delta. Technical image inspection covered8 normal conversation captures and4 reduced menus from IT081; it is labeled integration, not directed or human acceptance. All required directed/editor/audio and human sensors remain with task16. No rules, save policy, assets, engine/vendor implementation, staging or commit changed.
