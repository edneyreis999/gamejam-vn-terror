---
id: "01"
status: completed
depends_on: []
verification_ids: []
supporting_verification_ids: ["V-001", "V-002", "V-003", "V-004", "V-005", "V-006", "V-007", "V-008"]
---

# Task 01 — Rheed prologue and temporal presentation foundation

## Outcome

A fresh campaign plays all six approved Rheed units, visibly and audibly distinguishes present from past, and enters preparation once after the final response. This supplies the native temporal composition/audio foundation used by later route and Council cuts.

## Authority

- [spec.md](spec.md): RQ-001/002/003/008/009/010/011.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [technical-art](approved-narrative-dialogue-staging.technical-art.md), [audio](approved-narrative-dialogue-staging.audio.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- [PR #19 source analysis](source-analysis-pr19.md), [temporal ADR](adrs/adr-001-rheed-temporal-presentation.md), canonical GDD §§19/26/27 and the spec's pinned PR #17/#19 revisions.
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/data/Map002.json` event001; `js/plugins/Dryland_CampaignRules.js` prologue plan; `js/plugins.js`; CE067 and the actual prologue/tavern entry consumers in `data/CommonEvents.json`. Inspect Map003 and CE351; update their existing scope only where needed by the imported tavern/portraits.
- Data/assets: PR #19's `img/pictures/Reed final.png` and `Reed-novo.png`, PR #17's `Dryland_Taverna.png`; local Town1/People2/Applause1 and Town3/People1, plus the approved past-location context. Preserve exact spelling and source pixels.
- Tests: `rpg-maker/tests/suites/content.mjs` (IT-004/035/071, UT-057 as applicable), `native-inventory.mjs`, `native-audio.mjs` (IT-028/029); adapt canonical helpers/manifest only for affected assertions.
- Fixture/readiness owner: this task owns six-unit/nine-source-box fixtures, permission/completion/transfer observations and opening audio descriptors; capture actual final native box counts if readability requires additional splits. An isolated engine fixture is not S-01's directed run.
- QA/docs: record source heads and import hashes in this task/verification, and maintained asset provenance beside the existing `rpg-maker/asset-provenance/` records where necessary. Preserve source-history contracts; do not import the PR's entire docs/test tree.
- Delete targets: only replaced Map002 executable prose/staging commands; no file, vendor, source art or historical-spec deletion.

## Checklist

- [x] Recheck all five PR heads against the spec. Record accepted source bytes and any delta; capture current plugin order/vendor hashes and all consumers affected by global defaults before editing.
- [x] Compose only PR #17's VNPictureBusts anchor Y .6 and scales 50 with PR #19's enabled AttachedPictures and empty automatic picture list. Retain order and unrelated parameters. Update stale inventory expectations, including the current three-completion prologue assertion.
- [x] Import the six prologue.rheed.01–.06 identities and exact source script, including the final question/response. Capture/complete on the owning interpreter after each unit's last acknowledgement; final completion transfers once. Keep Rheed outside selectable party/sacrifice rules.
- [x] Stage older Rheed alone, full color over black; retire past pictures/attachments first. Stage young Rheed left and Ivaí right in the source tavern, preserving the supplied pastel palette. Adapt PR #17 entrance/focus/dimming/exit per portrait with normal 20-frame and reduced 0-frame alternatives.
- [x] Implement native temporal cue selection using the audio contract, without persistent time flags or an audio manager. Present Town1 45/People2 25; opening Applause1 35 only in the original welcome path; past tavern Town3 35/People1 60 and existing location BGS/contextual effects. Retain same-context tracks and player multipliers. Later tasks wire their own new scene boundaries.
- [x] Preserve the new_campaign checkpoint, including the possibility that unsaved opening text replays. Do not put applause in a recurring context/restore helper or add a checkpoint to each passage. Verify HIDE/Settings cannot retrigger consumed effects and normal tavern return does not invoke Map002.
- [x] Run focused canonical tests; provide transcript/source correspondence, old/young geometry and representative renders, motion observations, audio descriptors and the earned-checkpoint setup recipe for task 08/10. Update tracking without claiming directed or listening PASS.

## Validation

Execution mode/reference: S-01 directed-browser remains assigned to 10. Here run source comparison plus pure-domain/native-engine opening fixtures and audio buffer integration. Prepare 1280×720 normal and 1920×1080 reduced, keyboard/mouse and muted variants for the later directed run.

Invalidates/reuses: Source PR #19 images/screenshots establish provenance only. Changes to Map002, Rules, tavern/portraits, either plugin entry, audio or controls invalidate affected opening evidence and default-dependent consumer captures. Supply the audited default-consumer list to 02/04/05/07.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-01/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-001/008 contribution | Pinned script/art and combined plugin-entry diff | Six source units preserved; exact imports; both deltas compose with unchanged vendor/order | source-and-plugin-comparison |
| V-002/003 contribution | Focused content/native-inventory cases | No early completion, duplicate transfer or unrelated party change; native attachments clean | opening-native |
| V-004/005/006/007 contribution | Native render/control/audio/checkpoint observations | Correct two-era composition and cue ownership; controls retain position; actual saved boundary documented | opening-presentation |

## Execution Notes

Started 2026-09-18 through the explicitly requested task loop. Baseline HEAD: `82aad84dd5df2376e18d53720747fae8d8c0e9ac`. `git ls-remote origin refs/pull/{15,16,17,18,19}/head` (expanded individual refs) confirmed all five pinned revisions unchanged. No runtime edit or test result yet. No automatic commit or remote mutation.


### First focused execution

IT-004/035/047/071 and UT-057 each passed, but the command exited 1 because module-level `phaseFixtures()` replayed the historical three-unit prologue and attempted TOGGLE_HERO while still in intro. The approved six-unit contract requires three additional ADVANCE_TEXT entries and corresponding expectedSequence shifts in the canonical boundary recipes; the pinned PR19 supplies exactly that fixture update. This is a stale fixture, not permission to loosen the production transition guard. Opening stills were inspected: older Rheed is colored alone over black; young Rheed is left and Ivaí right with visible faces in the supplied tavern. Full directed, motion and listening verdicts remain pending.

### Scoped closure — 2026-09-18

**PASS for the reconciled task-01 implementation and focused native checks.** Exact command: `node --test --test-name-pattern='IT-004|IT-035|IT-047|IT-071|UT-057|IT-028|IT-029' rpg-maker/tests/campaign.test.mjs`, Node v22.23.2, 7/7 passed, exit 0, 126.2 s. Log: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-01/focused-third.log`. Canonical per-case `execution.json` receipts remain at their runner-owned paths under `docs/qa/evidence/init-rpg-maker-mz/`; each includes candidate hashes. The second run's input-freshness guard detected a test-file edit during execution; that stale run was discarded and the third run held inputs fixed.

Changes: Map002 source transcription (six units, nine boxes), explicit portrait cleanup and native normal/reduced durations; CE067 temporal music; combined VNPictureBusts/AttachedPictures entries; six Rules identities; exact tavern/Rheed assets and versioned `rpg-maker/asset-provenance/approved-narrative-opening.json`; existing tests/fixtures adapted to the approved reading contract. The task-local transformation records pinned sources and preconditions. Engine/vendor hashes match the captured baseline, plugin order and unrelated parameters are unchanged, and `git diff --check` passes.

Source comparison preserves every 101/401 parameter of PR19. The opening checkpoint stays `new_campaign` before the welcome; earn it with New Game → select file → opening. Continue may replay unsaved text from that boundary. Task08 owns cross-file/reward/result/Council/ending continuity. CE351 already names the replacement tavern and Ivaí; prologue-only Rheed assets do not expand its tavern preload scope.

**ADR-G004/G006 reconciliation:** task10 now owns this task's remaining full transition capture, 1920×1080/reduced inspection, directed control/Continue run and actual listening, within unchanged S-01/S-11 and V-004–007. Static normal/reduced command targets and inspected 1280×720 stills support those sensors but do not close them. Existing tasks02/04/05/07 retain calibration of their default consumers; the complete 40-owner inventory is `task-01/bust-consumers.json`. No required sensor is waived or marked played. This grouping avoids certifying intermediate global-default consumers before their owning tasks update them.

Candidate audit: keep runtime/art, source provenance, focused tests and the task-local reproducible transformation; raw logs/captures remain ignored evidence. Preserve pre-existing document changes. No deletion, staging, commit or publication. Test Chrome profiles and loopback servers were closed by teardown; port18726 is free. Final spec flags remain false.
