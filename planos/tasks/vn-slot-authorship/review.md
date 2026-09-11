# Deep review — `vn-slot-authorship`

## Scope and fingerprint

This is a read-only review of the two owned implementation files in the working tree at commit `ab25a3acd545f28cf9e1e6a735efdbad6c80e965`. The baseline is the repository version and the native-authorship baseline snapshot. No source, test, data, asset, or Git state was changed by this review.

| path | baseline SHA-256 | current SHA-256 | review scope |
| --- | --- | --- | --- |
| `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js` | `7b161464b1ccb489a01502ce8bae57fa4ba2c13fc46ea8ad30c953d984736e55` | `1b08736bf9548a2d97f6bc557a9021e7f701b689ba7926b86c9e5e424b4ade29` | parser, native command aliases, owner lifecycle, reducer, recovery, save/skip/settings/UI integration |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | `1f9b6362f9c7e2b377b598822078c4114994cb2f00fdf675590e0546a0ee062f` | `9e205ab395c124e5ecc55dbc245b12431fe85a94a6a6d592aae1cd6f96ae5977` | event IDs 1–67 preservation, visual metadata/commands, call graph, helpers 68–79 |

The current native data contains 80 array entries (null at index 0), 79 events, 258 sections, 282 text boxes, and 12 marked helpers. `System.json` remains byte-identical to the baseline (`7f0234c5dbe3611c65ca48d2a9ddcc3d5c18123e01305473b8eb69741da66753`). The layout manifest and unrelated working-tree changes were read only as authority/context; they are outside this review's owned delta. The explicit ADR001 PNG exclusion is respected.

Authority read in full: `AGENTS.md`, `.agents/skills/rpg-maker-mz-deep-review/SKILL.md`, `planos/tasks/vn-slot-authorship/spec.md`, `verification.md`, `adrs/adr-001.md`, the three discipline contracts, the canonical GDD sections governing bust authorship and MZ recovery, and the baseline Common Events snapshot. The current implementation files were read in full.

## Findings

### F-001 — helper-count contract is not enforced for future native edits

| field | value |
| --- | --- |
| severity | medium |
| confidence | high |
| status | suppressed after scope clarification |
| rule IDs | RQ002, V001, V006 |
| file/anchor | `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js:246-260,404-418` |

`indexHelpers()` registers every valid marked Common Event but never checks a global upper bound. The initial review treated the RQ002 delivery count of 15 as a parser invariant, but the approved isolated 2×2 authoring fixture legitimately adds six helpers to the current 12. A global parser cap would reject that fixture and expand this increment's authoring boundary, so this candidate is suppressed rather than retained as a defect.

The explored mutation cloned `CommonEvents.json` and appended four valid marked helper events, producing a helper registry of 16 with no parser violation. That observation does not establish a violation because the approved fixture domain is allowed to exceed the current production delivery count while remaining a valid isolated authoring layout.

Disposition: no correction required in this increment. The current native delivery remains at 12 helpers; any future helper-count policy needs an explicit contract that distinguishes production delivery from isolated fixtures.

### F-002 — malformed native entry can pass boot and crash Continue/recovery

| field | value |
| --- | --- |
| severity | major |
| confidence | high |
| status | resolved in the current source; historical defect retained for traceability |
| rule IDs | RQ002, RQ005, RQ006, V002, V004, V006 |
| file/anchor | `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js:152-180,341-400,475-516,857-895` |

`validBustCommand()` checks each command's literal shape, while the pre-fix `finish()` and `presentationGraph()` did not require a `Basic_EnterBust` path to acquire finite authored scale and position before its text. `deriveVisualComposition()` only discovered the omission later and threw `Incomplete native visual entry`. A disposable mutation removing the Scale and Move commands from `profile.H1` was accepted by the pre-fix parser with `violations: []`; native playback could reach the text with the vendor's incomplete picture state, while `reconcileConversation()` called the reducer on Continue/settings recovery and the uncaught reducer error prevented reconstruction. The current `validateVisualEntries()` call at `Dryland_EventBridge.js:472` rejects that mutation before play.

Historical minimal reproduction against the pre-validator snapshot: clone the events, remove the code 357 `Scale_ScaleTo` and `Move_MoveToCoordinates` commands from the `profile.H1` range in event 5, then call `parseEventCatalog()` followed by `deriveVisualComposition(events, parsed, 'profile.H1', 0, {})`. The snapshot returned an empty violation list followed by `Error: Incomplete native visual entry: profile.H1`; the current source now returns `invalid_visual_entry` during parsing.

Resolution: `validateVisualEntries()` now tracks entry/scale/position fields through branch alternatives, helper calls and inherited sources, issuing `invalid_visual_entry` before text or Focus. UT072 covers missing scale/move and an incomplete untaken branch; the focused verification notes report UT067/068/070/071/072 and the content CLI green on the current revision. No default transform was added.

### F-003 — optional branch can leave a targeted Focus accepted but empty at runtime

| field | value |
| --- | --- |
| severity | major |
| confidence | high |
| status | resolved in the current source; historical defect retained for traceability |
| rule IDs | RQ003, RQ004, RQ005, RQ006, V002, V004 |
| file/anchor | `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js:481,492-495,509-515,200-203` |

The new validator correctly rejects an incomplete mask, but its targeted-slot check is existential: `some(mask !== 0)` accepts a state containing both `0` (slot absent on one branch) and `7` (slot fully authored on another). A literal Focus for that slot then reaches `focusedTargets()`, whose runtime guard throws when the actual branch left the slot absent. This is the same native authoring boundary the validator is intended to make safe and can surface during Continue/reduction as a scene-level exception.

Minimal reproduction: clone the current `CommonEvents.json`, find event 54's `council.challenge` range, insert a native `117 [68]` call immediately before its first `code:101` text command, and parse with the real local asset list. The current `parseEventCatalog()` returns `violations: []`; the preceding helper 73 leaves slot 60 as optional for an all-zero roster, so `deriveVisualComposition(mutated, parsed, 'council.challenge', 0, {144:0,145:0,146:0})` throws `Error: Focus on empty dialogue slot: 60`. The existing helper 68 is a valid registered Focus command, so this is a reachable editor sequence rather than malformed executable input.

Resolution: RQ003 explicitly makes empty or unowned slots untouched. `focusedTargets()` now returns an empty map when a valid reserved target is absent, so both the executor and reducer perform no operation and preserve occupied targets; the validator retains the incomplete-mask check while allowing optional `{0,7}` absence. UT071 covers absent targets for `[0,0,0]` and `[0,2,3]` rosters and verifies an occupied target still focuses; IT067 covers a valid Focus helper before the first Enter without a rejection.

### R-003 — legacy MZ built-in compatibility in the static validator

The intermediate validator/reducer used `Array.prototype.at(-1)` for the branch top and `findLastIndex()` for the last text boundary. A legacy MZ VM without those built-ins would fail while parsing an otherwise valid catalog. The current source uses `branches[branches.length - 1]` at `Dryland_EventBridge.js:488` and `527`, and an explicit reverse scan at `511-512`; UT047 removes `Object.hasOwn`, `Array.prototype.at` and `Array.prototype.findLastIndex` in an isolated VM and passes. The substitutions preserve the nonempty-branch and `-1` boundary behavior, so this compatibility defect is resolved.

## Confirmed defects resolved during this review round

These were real defects in an earlier current-tree state and are recorded so the review does not silently discard confirmed evidence. They are not open against the current hashes above.

### R-001 — redundant ownerless Council exit helper

At the earlier Common Events revision, event 53 began with `117 [77]` after event 40's `Observe closing` had already called `closeConversation()` in `final_choice`. The new `command117` owner guard then reported `PresentationHelper/invalid_target`, leaving a persistent rejection banner at the final-choice screen. The current event 53 at `CommonEvents.json:55` starts with `Conversation end` and no longer calls helper 77. The red IT065 reproduction and the current green revalidation are also documented in `verification.md`. The helper 77 remains available for generic owned authoring; the correction did not weaken the owner guard.

### R-002 — pure reducer copied focused presentation into the base

The earlier reducer used `Object.assign(bases.get(slot), target)` after a zero-duration Scale or Move. If that command followed Focus, it copied listener offset/scale/tone into the base. A later focus or recovery then diverged from native playback (the static reproduction observed x=304 after Focus versus the native base x=320). The current `baseTransform()` helper at `Dryland_EventBridge.js:195-199` is used by both reducer line 506 and native bookkeeping line 821, copying only the authored Scale or Move fields. UT071 killed the mutation and passed after this correction.

## Rejected or bounded candidates

Every candidate below was traced against the repository and is suppressed because the required harmful state was not established, is explicitly outside this increment, or is already resolved above.

| candidate | disposition and objective reason |
| --- | --- |
| helper registry count above the current 12 / RQ002's delivery number | suppressed after scope clarification: RQ002 records the production delivery footprint, while the approved isolated 2×2 fixture legitimately uses 18 helpers (12 existing plus six fixture helpers). A global parser cap would reject that valid fixture; no parser count invariant is established by the active contract. |
| `ensureCampaign()` does not itself call `closeConversation()` when invalid | suppressed: the reachable invalid-campaign surface enters `presentInvalidCampaign()`, whose `interpreter.clear()` invokes the owner cleanup and whose direct cleanup erases reserved pictures. No valid player mutation was found that leaves an active owner while making the campaign invalid. The `ImageManager.isReady()` ordering is a possible delay during an unrelated pending bitmap, but no code path or evidence establishes a persistent owner leak. |
| rejected/wrong-phase `Conversation` followed by a helper or `Present` | resolved as R-001 plus the current live-serial helper/owner gates at `Dryland_EventBridge.js:775-787` and `1295-1323`. The rejected begin preserves an existing valid owner; the malformed call itself has no presentation effect. No blanket interpreter termination is required by the approved contract. |
| owner-only Checkpoint after load / RD0002 | suppressed as speculative under the approved native layout. `validateCheckpoint()` accepts only the existing safe Scene_Map checkpoints, and the current CE40 order reaches the council owner before its slot-bearing presentation. The harmful sequence requires adding a new checkpoint or manufacturing a save outside the approved editable layout; no source-trace defect was observed. |
| Council CE73 consolidation | suppressed: the three branch bases and all eight asset choices per slot were inspected. The 0/0/0, 1/2/3, 8/7/6, and partial-roster combinations reduce to the expected optional slots; native/reducer comparison produced no difference. This is data-only layout consolidation, not a missing visual branch. |
| `@visualFrom` family/reference/cycle handling | suppressed: current graph references are same-family and acyclic (`speech.H1..H8 → profile.H1..H8`, opinion → council confession, confession → challenge/solo, Andirá → confession); the current parser reports zero violations and the inherited-source mutation oracle kills removal of the inherited hero. |
| owner serial persistence itself | suppressed: the owner is intentionally transient, the save envelope persists campaign/cursor only, and `DataManager.loadGame()` replaces native game objects before `Scene_Map.start()` calls `reconcileConversation()`. Current recovery assigns one fresh serial to the root/ancestor chain. No owner is serialized without a corresponding live module conversation. |
| PNG framing, prison visibility, and inaccessible editor CUA | suppressed by ADR001 and the active scope: artwork normalization/framing and a repeated editor inspection are explicitly deferred. They are not runtime source findings in this review. |

## Coverage ledger

Each changed hunk in the two owned files has an explicit row. The `base→head` notation uses the unified zero-context diff against the repository baseline; a single head line denotes a one-line replacement/addition, and the deleted hunk is listed even though it has no head line.

### EventBridge.js hunks

| base→head hunk | lens/rule | result |
| --- | --- | --- |
| `35→36-86` | PluginManager metadata/command surface; RQ003/V006 | inspected; Conversation/Focus arguments are literal and bounded; no open finding in this hunk |
| `89→141-220` | VN vendor command parser, slot/tone/asset literals; RQ002/RQ003/V002 | inspected; current command literals are validated; F-002 is historical and F-003 is the remaining targeted-Focus path gap |
| `93→225` | exported API surface; RQ004/V002 | inspected; reducer is exported for the canonical oracle |
| `111→244-312` | helper index and restricted presentation graph; RQ002/RQ004/V002 | inspected; the current helper registry is valid; the explored global-count candidate is suppressed as a delivery/fixture scope distinction |
| `148→350` | section presentation graph invocation; RQ004/V002 | inspected; graph validation runs for every section |
| `153→355-356` | allowed native content command set; RQ001/RQ004 | inspected; existing narrative command authority preserved |
| `159→363-365` | presentation-depth/branch parsing; RQ004 | inspected; current 258 sections parse without violation |
| `180→386` | native terminator/branch validation; RQ001/RQ004 | inspected; clean for current data |
| `183→389` | branch indentation guard; RQ004 | inspected; clean for current data |
| `192→399` | `visualFrom` metadata capture; RQ004 | inspected; current references captured once per section |
| `196→404-418` | common-event shape, helper parsing and pure helper validation; RQ002/RQ004/V001 | inspected; current helper registry is 12 and the global-count candidate is suppressed |
| `226→448` | metadata grammar including `@visualFrom`; RQ004/V002 | inspected; duplicate/unsafe metadata remains rejected |
| `240→462-521` | source graph, `validateVisualEntries()` and pure composition reducer; RQ003/RQ004/RQ006 | inspected; F-002 and F-003 are resolved by the current parser/reducer semantics; R-002 and R-003 are fixed |
| `336→617` | public API freeze and export; RQ004/V002 | inspected; no mutable catalog port exposed |
| `381→663-664` | New Game transient cleanup and campaign initialization; RQ005 | inspected; owner/recovery state is cleared before new campaign |
| `426→710-711` | load cleanup/persistence status; RQ005/RQ006 | inspected; native objects are replaced before reconciliation |
| `431→717-932` | owner serial, helper gate, VN alias, Focus, waits, recovery, scene/message/sprite lifecycle; RQ003/RQ005/RQ006/V003/V004 | inspected in full; R-001/R-002 fixed; no other confirmed current defect |
| `493→995` | formation transition cleanup; RQ005 | inspected; active conversation is closed before formation redraw |
| `548→1051-1055` | Scene_Map termination and owner cleanup; RQ005 | inspected; transfer/title/gameover boundaries clear transient presentation |
| `667→1175` | Observe projection refresh; RQ004/RQ005 | inspected; Council projection refresh is derived from campaign state |
| `722→1231` | closing observation ownership; RQ005 | inspected; council remains available through the final-choice boundary |
| `724→1234` | memorial cleanup; RQ005 | inspected; presentation owner is not retained into memorial |
| `726→1237` | credits cleanup; RQ005 | inspected; presentation owner is not retained into credits |
| `805→1317-1323` | Present owner allocation and owner-key gate; RQ003/RQ005 | inspected; self-owned passage families allocate explicitly and slot-bearing inherited families require the live key |
| `816→1335-1341` | partial skip/recompose cursor; RQ005/RQ006/V004 | inspected; skip preserves native cursor and re-enters reducer for the new passage |
| `819→1345-1346` | recursive interpreter cleanup; RQ005 | inspected; child and owner are cleared together |
| `821→1349-1350` | transient marker cleanup; RQ005 | inspected; owner/recovery markers do not persist through clear |
| `830→1360` | presentation termination and campaign completion; RQ005 | inspected; only non-observational presentations complete the campaign passage |
| `996-1028→deleted` | removed per-box restore recipes; RQ004/RQ006 | inspected; no restore-by-box catalog remains |
| `1075→1573-1586` | initial-target verification, invalid campaign barrier; RQ003/RQ005 | inspected; transient native picture verification and direct invalid surface are retained |
| `1115-1116→1626-1630` | skip pause/input handoff and notice windows; RQ005/V003/V004 | inspected; skip releases native pause and uses existing input boundary |

### CommonEvents.json hunks

| base→head hunk | lens/rule | result |
| --- | --- | --- |
| `5→5` (event 3) | tavern Conversation begin/end, Present and native exit; RQ003/RQ005/RQ006 | inspected; owner is begun before profile/speech and ended after native exit |
| `7-14→7-14` (events 5–12) | all eight profile/speech/selection/party_full native sources and inherited metadata; RQ001/RQ003/RQ004/RQ006 | inspected; exact current section/text preservation and same-source composition are clean |
| `42-43→42-43` (events 40–41) | campaign/council flow, slot allocation, opinion helper calls; RQ001/RQ003/RQ005 | inspected; projection variables and helper order trace to the active Council owner |
| `51-52→51-52` (events 49–50) | lovers slot 63 enter/exit paths; RQ003/RQ005 | inspected; single-slot owner paths are bounded and clean |
| `55-56→55-56` (events 53–54) | final-choice cancellation and Council visual sources; RQ004/RQ005 | inspected; CE53 redundant helper was removed in the current revision; R-001 resolved |
| `69-70→69-82` (helpers 68–79) | helper count, names, native command arguments, CE73 conditional layout and exit helpers; RQ002/RQ003/RQ004/RQ006 | inspected; current 12 helpers and 3 Council bases are valid; optional Council state exposes F-003 only when a targeted helper is authored outside its guard |

### Follow-up coverage — `validateVisualEntries()` delta

| current anchor | lens/rule | result |
| --- | --- | --- |
| `Dryland_EventBridge.js:472` | parser call ordering; RQ004/RQ005/V002 | inspected; the validator runs after structural/source violations are clear and contributes a normal catalog violation before runtime |
| `Dryland_EventBridge.js:476-516` | branch/helper/source field tracking; RQ002/RQ003/RQ004/RQ006/V002/V004 | inspected; missing scale/move and incomplete inherited/untaken paths are rejected, while optional `{0,7}` absence is intentionally allowed under RQ003 |
| `Dryland_EventBridge.js:488,511-512,527` | legacy MZ built-in compatibility; RQ002/RQ004/V002 | inspected; branch-top and reverse-last-text logic no longer depends on `Array.at` or `findLastIndex`; UT047 passes in the API-deleted VM |
| `content.mjs:537-550` (UT071) | empty-target no-op, occupied-target focus and composition preservation; RQ003/RQ005/RQ006/V004 | inspected and passed; the former F-003 mutation now proves no-op for absent targets and normal focus for occupied targets |
| `content.mjs:458-508` (IT067) | owner-valid Focus before native Enter and Continue preservation; RQ003/RQ005/RQ006/V003/V004 | inspected; the new assertion requires no rejection while the empty owned slot is untouched |
| `content.mjs:563-597` (UT072) | cycle, cross-family, missing-field, untaken-branch and Focus argument checks; RQ003/RQ004/V002 | inspected and passed; invalid slot/argument paths remain rejected independently of the empty-target no-op |

## Validation and limits

Static checks already available in the repository evidence and execution notes: JavaScript syntax check passed; current parser reports zero violations for 258 sections and 12 helpers; all 258 sections × current boxes and roster combinations reduced without errors; native command simulation and reducer comparison reported no current-data target differences; baseline/current comparison preserved 258 sections, 282 boxes, event IDs 1–67, and 1185 protected files; inherited-source mutation was killed by the composition oracle. UT047's API-deleted VM, UT071's malformed-entry and empty-target cases, UT072's focused parser cases, and the focused pure-base regression were green after their corrections according to the task verification notes. The former optional-target mutation was red before the no-op correction and now preserves composition; occupied-target assertions remain active.

This reviewer did not run a browser, server, serial suite, or visual/editor inspection. Parent-owned real-MZ evidence is treated as provenance only; it is not substituted for static proof. F-002 and F-003 are resolved in the current source; the helper-count candidate is suppressed by scope.

No overall shipping verdict is issued here; merge/report stages own that decision. The review artifact records F-002/F-003, R-003 and the two earlier runtime defects as resolved, the helper-count candidate as suppressed, complete owned-hunk coverage, and bounded suppressions.
