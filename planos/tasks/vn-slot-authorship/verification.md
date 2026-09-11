---
status: approved
implemented: true
static_verified: true
runtime_verified: true
human_accepted: false
release_ready: true
---

# Verification

> **Closure update — 2026-09-11:** the user accepted the consolidated development delivered by [vn-focus-parameters](../vn-focus-parameters/spec.md#accepted-consolidated-delivery--2026-09-11). This document preserves the historical contract, status flags and execution results of this increment; they do not describe a pending task in the current accepted scope. The [current acceptance record](../vn-focus-parameters/verification.md#human-acceptance-and-closure--2026-09-11) owns the final state. Final PNG framing and the historical unavailable-editor sensor remain explicitly deferred; no historical FAIL/BLOCKED result is relabeled as a successful test.


| ID | Requirements | Sensor and expected observable | Status |
| --- | --- | --- | --- |
| V001 | RQ001/002 | Structured baseline comparison: exact content, IDs1–67, protected files, <=15 helpers, no restore-by-box | PASS |
| V002 | RQ003/004 | Canonical content unit tests: Focus literals, invalid owner/slot/source/cycles, inherited same-source reduction and inserted text box | PASS |
| V003 | RQ003/005 | Real MZ: shared slot focus, idempotency, cold/reduced/interruptions, no effects on unrelated pictures | PASS |
| V004 | RQ004/005/006 | Real save/settings/skip/authoring edit tests: same composition, no repeated story; complete registered suite | PASS |
| V005 | RQ002/005/006 | Directed all-eight T plus Council and native Continue in both areas/modes; inspect actual focus/exit, not final PNG framing | PASS |
| V006 | RQ006 | README and native command metadata review; frozen delta deep review and deslop | PASS |

Commands: existing content CLI, `node --test rpg-maker/tests/*.test.mjs` in a disposable current-tree copy, and installed directed executor. Use port18728 to preserve the user's18727 session. All raw evidence stays under docs/qa/evidence/vn-slot-authorship/. Final standardized-art framing and new editor-window inspection are excluded by the current scoped user instruction/ADR; no human acceptance inferred.

## Execution notes

2026-09-11: baseline captured before mutations. Native CommonEvents216 array entries including null0;148 helpers68–215. Current user package.json modification preserved. Phase1 complete; verification in progress.


## Current implementation and evidence

Native revision `mz-20260911-slot-authorship-03`. Helpers reduced148→12 (IDs68–79), helper commands1911→136. Council has24 image-selection branches but only3 authored layout bases. All258 sections/282 boxes and event identities1–67 are preserved. `verify-preservation.mjs` reports1185 protected files unchanged plus the user package edit preserved; raw receipt is `docs/qa/evidence/vn-slot-authorship/preservation.json`.

The native content CLI and JavaScript syntax check pass. The initial70 unit tests passed. New UT071 and UT072 pass individually; mutation of inherited-source execution is killed by the same composition oracle (`mutation-result.json`, local evidence). IT067 demonstrates edited X342/scale44, Options return and native Continue into an inserted same-focus box. IT062/063 preserve save bytes and campaign progression during recovery; IT068 exercises shared Focus in real MZ at normal/reduced modes, cold/warm assets, four positions, repeated target, HIDE and clean exit; IT065 covers partial and complete seen skip. The full 140-case run on revision02 completed with 139 passes and the obsolete IT064 fixture failure. The corrected IT064 passed in a fresh isolated run; revision03 and later source deltas have the focused revalidation recorded below.

First test attempts are retained under task02–04. They exposed incorrect test preparation: evented title instead of Scene_Title; absent roster opinions are legitimately conditional; multiline metadata had to be mutated inside the marker, not duplicated; the 2×2 fixture needed its former pre-dimmed entry changed to the approved uniform base. These corrections follow the approved contract and do not mask production failures.

Inspection of directed Council captures exposed a real redundant-exit warning despite the old machine verifier completing. See [bug](../../../docs/qa/bugs/BUG-20260911-council-exit-owner-warning.md). IT065 was strengthened and failed against revision02 with the exact PresentationHelper rejection (task06). Revision03 removes the redundant CE53 helper call after Observe already closes the conversation; ownership guards remain unchanged. IT054/061/065 and fresh directed Council/Continue in both modes own the revalidation. Earlier C/R collection status is not a final PASS.

Tavern normal/large directed runs are retained: subsequent native changes concern only CE73 Council entry and CE53 Council exit. Functional visual review includes alternating focus, HIDE and returned formation. Existing large PNGs are visibly cropped, as anticipated by the user-directed artwork deferral; no final framing acceptance is claimed.

The source reducer's zero-duration Scale/Move base update was corrected after UT071 reproduced X304 instead of320 when the author changes only scale mid-listener. Native and pure paths now share `baseTransform`; IT067's second Continue verifies a newly authored scale80 while retaining X342. The fresh focused four-case run (IT063/067, UT071/072), task09 at2026-09-11T14-45-11-896Z, passed4/4 and CLI0. Full preserved source comparison checks41704 target/base pairs over401 ordered distinct rosters and104 boxes; all shipped authoring remains equivalent (`base-equivalence.json`). This qualifies retention of the completed directed paths and earlier broader tests without pretending their source hashes changed.

Directed T/C/R normal and larger/reduced lots: six collection PASS, functional capture review PASS_SCOPED,1182 capture hashes checked, resources closed. The expected fourth-hero selection rejection remains covered in T. Final C/R have zero presentation rejections. Final portrait framing/human judgment remain USER_DEFERRED. Detailed current run ownership and inspection limits are in the [QA report](../../../docs/qa/reports/2026-09-11-vn-slot-authorship.md).

## Candidate audit

Keep the three changed runtime/data files (EventBridge, CommonEvents, native-layout-manifest): they are consumed at boot and are the implementation. System.json is an unchanged baseline dependency; its earlier uncommitted edits retain their prior owner. Keep the canonical content, formation, endings and native-controls test updates, test manifest and2×2 fixture: they protect shared authorship, focus, recovery and the redundant-exit regression. Keep the directed Council assertion in native-journeys: it catches the real visible error that the old verifier missed. Keep README, GDD increment, spec/ADR/discipline contracts, QA report and bug record: they provide editor guidance, scoped authority, results and defect history. This audit does not certify the earlier uncommitted `vn-picture-busts-dialogues` delivery or the user's unrelated package/skill edits.

One-shot implement/migration scripts are historical execution receipts; their pre-mutation inputs live only in the local ignored baseline. They are not current editor tooling or a second source of authored layouts. Proposal: archive these receipts with raw evidence when organizing an accepted commit; do not require them in a fresh clone to run/edit the game. Reusable runners and canonical tools operate from the current repository. No files were staged, committed, deleted from the prior scope or published.

Devlog moment: show the native helper list68–79, then edit one Council slot's coordinates and observe the three possible participants using that position. Suggested future capture: editor list plus the same conversation after the user's standardized portraits are ready. Current cropped-art captures support functional QA only, not final-art promotion.

Independent source review: [review.md](review.md). F002 was accepted and fixed: boot-time entry-field validation now follows branches, helpers and inherited sources, rejecting missing position/scale before a text box or Focus rather than crashing on recovery. UT072 was red for a removed Scale, then green for omitted Scale/Move and an incomplete conditional branch. The validator is pure and does not execute native events. F001's proposed permanent15-helper parser cap is rejected: RQ002 is the shipped delivery footprint, not a limit on future content or isolated fixtures; the valid2×2 fixture deliberately extends12 helpers with6 local helpers. No runtime quota was requested.

The broad run exposed an obsolete interception in IT064: it waited for a native Tone command to pause focus, whereas focus now enters through EventBridge.Focus. The fixture now pauses the real new command; its assertions still require cancellation of the queued stack and preservation of unrelated pictures. This is test-boundary adaptation, with the first failure retained in task05.


## Final verification — 2026-09-11

Contracted implementation: **PASS** for RQ001–006 / V001–006, with final portrait framing explicitly excluded by the user. All 140 registered cases have passing applicable evidence across the complete run and focused reexecutions; this is not a claim of a single 140/140 green run. Human acceptance remains false and does not gate this authorized technical increment. No acceptance or release verdict is extended to the earlier uncommitted delivery.

- Complete isolated run: task05 / `2026-09-11T14-31-49-912Z`, 139/140 PASS, CLI exit0. IT064's old Tone interception and three-level stack expectation failed after helpers were consolidated. Its replacement observes the real Focus boundary and actual owned child, while retaining all cleanup/independent-picture checks.
- Corrected cancellation: task09 / `2026-09-11T15-03-57-071Z`, IT064 + UT072 2/2 PASS, CLI exit0.
- Final source: task09 / `2026-09-11T15-12-45-493Z`, all 72 unit cases + IT067, **73/73 PASS**, CLI exit0. This includes the complete parser, missing entry fields, optional/empty focus, literal/owner validation, native edit, Options return and two native Continues.
- A preceding focused run exposed UT047's existing legacy-runtime check: the new validator used Array.at. Both branch accesses now use indexed arrays; last-text lookup uses a reverse scan. UT047 additionally removes findLastIndex in the legacy VM. The failing run at task09 / `2026-09-11T15-11-38-919Z` remains preserved. No compatibility assertion was weakened.
- F003: Focus on an allocated empty position is a no-op shared by normal playback and reduction, preserving all current targets. UT071 first reproduced the throwing optional branch, then passed for empty/partial rosters and occupied focus. IT067 executes Focus before Enter without rejection. Invalid owners/slots and incomplete native transforms still reject. This implements RQ003 and is explicit in ADR001 and README.
- Revision03 Council exit: IT054/061/065 3/3 PASS (task07 / `2026-09-11T14-39-01-471Z`) and six directed lots retain the exact scopes described above. Final source equivalence rechecked all 41704 target/base maps. Original archive fingerprints remain historical; no new browser replay is inferred from equivalence.

Final EventBridge SHA256: `1b08736bf9548a2d97f6bc557a9021e7f701b689ba7926b86c9e5e424b4ade29`. CommonEvents SHA256: `9e205ab395c124e5ecc55dbc245b12431fe85a94a6a6d592aae1cd6f96ae5977`. Syntax, native CLI, preservation and whitespace checks pass. Independent review resolved F002/F003; F001 was suppressed by its out-of-scope global quota. Deslop inspection retained only the bounded parser/reducer/owner implementation and canonical test changes; no additional cleanup rewrite was needed.

Candidate audit: **PASS for the scoped keep set**, subject to the dependencies and exclusions above. The inventory records exact final file hashes, baseline-only System.json, maintained guidance/tests and historical execution receipts. Git index is unchanged; no commit, publication or post-acceptance archive reorganization was performed. Raw receipts remain local ignored evidence. The existing user server at port18727 remains alive; isolated execution resources are closed. Reload and start a new game to use the revised native layout; incompatible earlier saves are retained.
