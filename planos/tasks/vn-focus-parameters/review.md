# Deep review — `vn-focus-parameters`

## Scope and fingerprint

This is a read-only review of the current increment against the frozen baseline under `docs/qa/evidence/vn-focus-parameters/baseline/`. The only file written by this review is this report. This follow-up fingerprint includes the bounded F-001 correction after the current data revision `mz-20260911-focus-parameters-02`.

| path | baseline SHA-256 | current SHA-256 | owned delta |
| --- | --- | --- | --- |
| `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js` | `1b08736bf9548a2d97f6bc557a9021e7f701b689ba7926b86c9e5e424b4ade29` | `248ede44d9e1826841f32c9adf14213faed096df934c55000c8c4fa8631a6b14` | Plugin Manager metadata, global focus parser, native/reducer style, recovery and authored/derived validation |
| `rpg-maker/The Dryland Drowned/js/plugins.js` | `b77a0d2e0776c0944f5c5065d5ce5d39c8d4e56b66aaa0b5722b6ce1c5d34566` | `ddd91805d03e4756c021f1222677e9dc90c4e50378c554aff3b0259f6d099139` | serialized five-field Plugin Manager configuration |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | `9e205ab395c124e5ecc55dbc245b12431fe85a94a6a6d592aae1cd6f96ae5977` | `6448bfab20d66fabeb66dd90e3af985eef888cf6e8df6de0593d68e8469a1b1c` | seven Focus argument migrations and 45 initial helper calls |
| `rpg-maker/The Dryland Drowned/native-layout-manifest.json` | `496af0451c98a4a23f6c65f6c884bb711cf1e10b5132b000f9456d18bf39ac3e` | `bacdbf0b2c803fceb947c9f2b0dabc8e8a13e10db3e79a75a51beabe73a34645` | new native revision and Common Events hash |
| `rpg-maker/tools/plugin-settings.mjs` | absent | `52463bdc88ad1adb0a522555e0906a477e7a0549e2a4c28bdbb3aee97df1628d` | new non-executing generated `plugins.js` reader |
| `rpg-maker/tools/validate-content.mjs` | `caa8f2b607315ca5ba79b7ffcb862f7d21e572b0db0396310a0374cfe1f296c8` | `4e7186720a4dcfcbd4ac5410844491180622a38d2a31a9e0a1914d2dc074acb4` | Plugin Manager parameter validation in the CLI |

I read `AGENTS.md`, the deep-review skill, `planos/tasks/vn-focus-parameters/spec.md`, `verification.md`, `tasks.md`, `adrs/adr-001.md`, the canonical GDD, the affected QA evidence and baseline snapshots, and each owned file in full. The review uses RQ001–RQ005 from the approved spec as the contract boundary.

## Findings

### F-001 — migrated Focus no longer supplied a transition to the native content validator (resolved)

| field | value |
| --- | --- |
| severity | medium |
| confidence | high |
| status | resolved in this follow-up |
| rule IDs | RQ001, RQ002, RQ003, RQ004 |
| source trace | `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js:272-346`, especially lines 339-346; runtime call at line 752; CLI calls at `rpg-maker/tools/validate-content.mjs:30-40` |
| data trace | `rpg-maker/The Dryland Drowned/data/CommonEvents.json:1`, helper event `68`, Focus command at `/68/list/1` |

The prior review found that slot-only Focus objects removed `duration`, while `presentationGraph()` still read `p[3].duration`; this made `transition` `NaN` and rejected a following `code:230` even when its wait was valid. The correction adds the optional validated style argument to `parseEventCatalog()`, uses `style.FocusDuration` at line 339, and changes the wait guard to distinguish `null` from `0` at lines 344-346. The runtime catalog call at line 752 passes `focusStyle`. The CLI reads and validates Plugin Manager parameters before catalog parsing, passes the same style, and delays configuration errors until after content errors so malformed-content precedence remains intact.

The bounded recheck cloned the current Common Events array, inserted `{ code: 230, indent: 0, parameters: [wait] }` at index 2 of helper 68, and called `parseEventCatalog()` with the real `System.json`, manifest assets and each style. It returned no helper violation for default `FocusDuration:20` with waits `20` and rejected `21`; custom `30` accepted `30` and rejected `31`; zero accepted `0` and rejected `1`. The current project CLI returned `{"ok":true,"errors":[]}`. This is the same sequence that returned `[]` in the baseline and failed for every wait in the pre-fix current source.

The required correction is present. FocusDuration now flows from the validated Plugin Manager object to the runtime and CLI graph validators, and zero is treated as a real duration. The correction keeps authored command bounds unchanged and makes parser validation agree with native Focus playback.

## Clean and resolved checks

The five metadata fields in `Dryland_EventBridge.js:6-53` match RQ001 ranges, defaults, Portuguese labels and Plugin Manager serialization. `parseFocusParameters()` at lines 211-236 supplies documented defaults for missing fields and rejects empty, nonliteral, fractional, noninteger and out-of-range values with the named parameter. The direct checks exercised those cases and returned the expected diagnostics.

`focusedTargets()` at lines 249-260 uses one parsed style for listener tone, listener scale, speaker scale and reflected/zero offset behavior. `deriveVisualComposition()` at lines 568-601 receives the same style used by the runtime Focus command at lines 941-950 and by Continue recovery at lines 958-997. The repository equivalence artifact records 41,704 comparisons across 401 rosters with the default migration equivalent to the baseline. The current separation at `executeBust()` lines 886-900 validates authored editor commands while allowing derived Focus/recovery values such as a 150% speaker scale applied to an authored 200% base; this resolves the previously observed derived-bound false rejection and preserves the authored bounds.

The current Common Events array has 79 events, 258 sections, 290 message boxes, 12 marked helpers and seven migrated Focus commands. The 45 new helper calls are before the first text in the specified profile, selection, party, farewell, epilogue, lover and Council solo entries. The native event text/assets/section counts remain unchanged, and the manifest preserves the 1,147-asset list and 39-file inventory while changing only the active native layout revision and Common Events hash. The current `plugins.js` keeps one active EventBridge entry in the existing order.

`plugin-settings.mjs:1-21` parses only the generated JSON array envelope and rejects executable expressions; `validate-content.mjs:1-48` reads the same five-field configuration before catalog validation, preserves content-error precedence, and then runs manifest checks without evaluating `plugins.js`. Save/load code at `Dryland_EventBridge.js:771-812` leaves cosmetic style out of campaign state and reconstructs the current style after native objects are replaced, as required by RQ004 and ADR001. These paths had no additional confirmed defect in this delta.

## Suppressions and bounded candidates

| candidate | disposition and objective reason |
| --- | --- |
| Derived Focus scale/position exceeds the authored `validBustCommand()` bounds | resolved in the current source at `Dryland_EventBridge.js:886-900`: only authored non-recovery commands are revalidated; generated Focus/recovery commands use validated bases and style. The pure scale-220/offset case and the current focused runtime evidence cover the boundary. |
| Style is not serialized into the save envelope | suppressed by RQ004 and ADR001: style is project configuration, cosmetic changes must survive compatible Continue, and `loadGame()` clears transient conversation before `Scene_Map.start()` reconciliation. No campaign fact is stored for style. |
| Unknown Plugin Manager keys are silently ignored | suppressed: the contract names five fields and requires validation of their domain; MZ supplies an object containing other plugin metadata in some projects. The five named fields are parsed and unknown keys do not alter runtime composition. |
| `plugin-settings.mjs` accepts only the generated MZ `var $plugins = [...]` envelope | suppressed after inspecting the actual generated file and malicious-expression cases. The tool is intentionally a non-executing reader for this project format; no alternate envelope is authorized by RQ004. |
| Initial helper calls change narrative events | suppressed: the data diff adds exactly 45 calls to existing helpers, before the first text of the named entries. Counts, text boxes, section IDs, assets and helper count remain stable, and the default composition oracle reports equivalence. |
| Empty or unoccupied Focus target is rejected | suppressed under RQ003: `focusedTargets()` returns an empty map for an absent reserved slot, preserving occupied targets; this is the explicit empty-target no-op semantics. |
| PNG framing, participant expansion, editor CUA inspection and final visual acceptance | suppressed by RQ005/ADR001 and the task boundary. The current increment explicitly preserves PNGs and defers those art/editor concerns. |

## Coverage ledger

Every current baseline-to-head hunk and each contract rule is assigned below. “Clean” means the hunk was read and no confirmed current defect was found; F-001 is retained as a resolved trace across the parser and CLI boundary.

### `Dryland_EventBridge.js`

| current lines / baseline hunk | lens and rule | result |
| --- | --- | --- |
| `6-53` / `+6-53` | Plugin Manager metadata and five global fields; RQ001, RQ005 | clean; ranges/defaults/help match the spec |
| `84-112` / `+84-112` | Conversation/Focus command shape and slot-only authoring; RQ002, RQ003 | clean; Focus accepts only `slot` and preserves reserved slot guards |
| `126-136` / `+126-136` | authoring guidance and style/restart/Continue contract; RQ001, RQ004, RQ005 | clean |
| `211-260` / `-179-210,+211-260` | parameter parse, bounds, tone, scale, offset and neutral/empty semantics; RQ001, RQ003 | clean in direct cases; the Focus duration consumer is covered by the resolved F-001 graph change at lines 339-346 |
| `275-360` / `+275-360` | helper index, Focus command graph, Wait transition and restricted native commands; RQ002, RQ003, RQ004 | F-001 resolved: graph uses validated `style.FocusDuration` and accepts zero as a transition |
| `400-451` / `+400-451` | section graph, command authority and metadata extraction; RQ002, RQ004 | clean for all current sections; Focus-followed-Wait validation now uses the project style |
| `512-566` / `+512-566` | visual source graph and native entry field validation; RQ002, RQ003, RQ004 | clean; no incomplete current entry and no source cycle |
| `568-601` / `-515-565,+568-601` | pure reducer uses parsed style and authored bases; RQ003, RQ004 | clean; default equivalence and zero-transform base behavior are preserved |
| `710-717` / `-657-665,+707-717` | exported parser/reducer and Plugin Manager boot parse; RQ001, RQ004 | clean; runtime parser call passes the validated `focusStyle` |
| `738-812` | save, load, persistence and transient conversation recovery; RQ004 | clean; style remains cosmetic and current-style reconstruction is explicit |
| `886-900` / `-832-833,+886-900` | native vendor caller context and authored-versus-derived validation; RQ002, RQ003 | clean; derived targets are no longer rejected by authored limits |
| `941-955` / `-888-896,+941-955` | runtime Focus, duration and reduced-motion path; RQ003, RQ004 | clean for parsed style and duration delivery; parser and native duration boundaries now agree |
| `958-1023` / `-928-933,+983-1023` | Continue/recovery composition, owner and native interpolation; RQ003, RQ004 | clean; recovery uses current style and duration zero |
| remaining current lines `1-1792` | MZ globals, owner lifecycle, waits, scenes, input, Pixi/window/audio and campaign boundaries; RQ003-RQ005 | read in full; no additional current-delta finding |

### `plugins.js`

| current lines / baseline hunk | lens and rule | result |
| --- | --- | --- |
| `1-24`, EventBridge entry at line 23 / `-20+20` | generated Plugin Manager envelope, active status and load order; RQ001, RQ004 | clean; exactly five strings are serialized, one active entry remains in place |

### `CommonEvents.json`

| JSON scope (file is compact, current line 1) | lens and rule | result |
| --- | --- | --- |
| helper events `68,69,70,71,72,74,79`, each Focus object | slot-only migration and helper command authority; RQ002, RQ003 | clean; seven calls contain only `slot`, with no stale per-call style keys |
| events `5-12`: `profile`, `selection`, `party_full` | first-speaker helper insertion and owner-safe entry; RQ002, RQ003 | clean; three new helper calls per hero are before text |
| event `41`: `farewell`, `epilogue`, `opinion` | first-speaker helper insertion and existing branch/text preservation; RQ002, RQ003 | clean; 16 new calls are before their first text |
| events `49-50`: lover warning/second passages | first-speaker slot 63 helper insertion; RQ002, RQ003 | clean; four new calls use helper 71 |
| event `54`: `council.solo` | first-speaker slot 63 helper insertion and Council owner; RQ002, RQ003, RQ004 | clean; one new call is before text and remains under the native Council flow |
| all other event IDs, section markers, text boxes, native vendor commands and assets | data authority and preservation; RQ002, RQ004, RQ005 | clean; 79 events, 258 sections and 290 message boxes match the baseline counts |

### `native-layout-manifest.json`

| current lines / baseline hunk | lens and rule | result |
| --- | --- | --- |
| `1`, active `nativeLayoutVersion` | native revision compatibility; RQ002, RQ004 | clean; active revision is `mz-20260911-focus-parameters-02` |
| `35-36`, added revisions | revision history and structural data hash; RQ002, RQ004 | clean; revision 01 and 02 are recorded, with revision 02 hash `7db3510fe7039b769346af87b8b2ba177e0fcb4b3ec2d738338d2bce30db52e1` |
| `39`, `files["data/CommonEvents.json"]`; all other `files` and `assets` entries | manifest/data/assets authority; RQ002, RQ005 | clean; only Common Events file hash changes and the 1,147-asset/39-file inventory is preserved |

### `plugin-settings.mjs`

| current lines | lens and rule | result |
| --- | --- | --- |
| `1-11` | non-executing parse of generated Plugin Manager envelope; RQ001, RQ004 | clean; JSON.parse handles the actual file and rejects appended code/expressions |
| `13-21` | project path, unique active plugin lookup and error diagnostics; RQ001, RQ004 | clean; duplicate/missing/inactive EventBridge entries fail before parameter use |

### `validate-content.mjs`

| current lines | lens and rule | result |
| --- | --- | --- |
| `1-10` | CLI imports and API boundary without plugin execution; RQ001, RQ004 | clean |
| `11-30` | argument parsing, Common Events/System/assets and catalog invocation; RQ002, RQ004 | clean; the CLI obtains validated style before invoking the catalog parser |
| `31-40` | parameter read, defaults/invalid diagnostics and manifest ordering; RQ001, RQ004 | F-001 resolved; custom and zero FocusDuration are passed to the parser while content errors retain precedence |
| `41-48` | stable CLI result and exit codes; RQ001, RQ004, RQ005 | clean; current project returns `{"ok":true,"errors":[]}` |

### Contract coverage

| rule | exercised surfaces | disposition |
| --- | --- | --- |
| RQ001 | metadata, serialized parameters, parser defaults/invalid values, runtime boot and CLI | clean; FocusDuration is now shared with content Wait validation |
| RQ002 | slot-only Focus, helper registry, 45 initial helper calls, native revision and preservation | clean for current data and command shape |
| RQ003 | native Focus, pure reducer, base-relative scale/tone/offset, neutral/empty/idempotent/reduced paths | clean; native Focus and graph Wait validation use the same parsed duration |
| RQ004 | style-only save/reload/Continue, transient owner/recovery, CLI and manifest | clean; parser, CLI and runtime all receive the current validated style |
| RQ005 | Plugin Manager help, CLI diagnostics, preservation/deferred art scope | clean within the owned files; art/editor acceptance remains outside this static review |

## Validation and limits

I ran `node --check` on the current EventBridge and `validate-content.mjs`; both passed. I ran `node rpg-maker/tools/validate-content.mjs --json`, which returned `{"ok":true,"errors":[]}`. I re-exercised the exported parser graph with default `20/21`, custom `30/31`, and zero `0/1` Wait-after-Focus boundaries; accepted waits were accepted and over-duration waits were rejected. Existing repository evidence records the default equivalence result of 41,704 comparisons over 401 rosters and the current preservation/manifest checks.

I did not run a browser, server, serial suite, editor CUA inspection or broad replay. Those results are parent-owned evidence and are outside this bounded reverification. The static F-001 path is resolved in the current fingerprint; remaining visual/editor acceptance stays outside this review.

## Verdict

`SHIP`
