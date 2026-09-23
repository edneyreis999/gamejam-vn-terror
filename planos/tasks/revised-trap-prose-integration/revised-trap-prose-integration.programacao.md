---
status: approved
approved_on: 2026-09-22
owner: Programação
stage: surface-and-technical-design
---

# Native prose integration and static verification

Owns the approved implementation design for RQ-001–007 in [spec.md](spec.md). Preserve the [existing native lifecycle](../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.programacao.md). This change needs native content edits and focused verification; no production JavaScript, engine/vendor bytes, plugin order/parameters, dependency, build or remote service change is planned.

## Edit ownership

| Owner | Intended change | Preserve |
| --- | --- | --- |
| Map007–022, event 001/page 1 | Sixteen description bodies and source questions; all 48 label representations; twenty differing success bodies | One autorun page per map, guards, labels/jumps, branch indices, action IDs, 48 failures and 28 matching successes; only presentation splitting may affect matching prose |
| `CommonEvents.json`, CE266–281 | Sixteen general death bodies; CE274 uses B1's approved exception | IDs, list termination, ReadingPermission/ReadingEnd, native presentation and caller relationships |
| CE042 and CE291 | No production change planned | Victim commitment, farewell/death dispatch, caller-owned CaptureContext/ReadingComplete |
| `Dryland_CampaignRules.js`, `Dryland_EventBridge.js`, `Dryland_Presentation.js` | No production change planned | Semantic identities, truth ownership, provider integration, validated actions and saves |
| Existing `rpg-maker/tests/` fixtures/helpers/suites | Narrow maintenance of obsolete copy/box assumptions only if exposed | Keep existing tests/assertions; no mandated engine matrix, fixture expansion or new runner |

The [source analysis](source-analysis.md#native-ownership-and-actual-differences) supplies exact encounter-to-map/CE pairs. Confirm against the execution checkout before editing; do not infer ownership from line numbers.

## Structured mutation boundary

During task execution, materialize the task-local transformation with explicit preconditions. Parse JSON, resolve the actual event/page and passage query, replace only the intended `101`/`401` groups, and preserve indentation and command grammar. No global string replacement or whole-database reformatting. Missing, duplicate or mismatched anchors must fail the edit rather than choose a plausible location.

For each choice, update Show Choices `102`, matching `402` display text, and MessageCore `PictureTextChange`'s serialized `center:json` on pictures 50–52. Decode/re-encode that JSON field correctly. Preserve font escapes, bindings, Hide Choice Window tags, utility tags and the assigned approach ID. The picture's rendered label and the native choice label must normalize to the same approved sentence despite presentation line breaks.

Preserve source punctuation and wording, removing only editorial Markdown structure. Normalize only known native presentation controls and whitespace for comparison; do not hide omitted words or changed punctuation under a permissive matcher. The frozen catalogue is evidence and test-oracle input, never loaded by the game.

## Interpreter and save contract

Retain `encounter.<id>.01`, `result.<id>-<1..3>.success.01`, `.failure.01` and `death.<id>.context`. The same description body serves first reading and reread. Keep completion conditional on the existing first-reading context; a reread must not advance domain state. All new boxes stay before the existing ReadingEnd and completion boundary.

CE291 captures context on its interpreter before calling a farewell/death helper and completes after that helper returns. Extra boxes in CE266–281 therefore must not own ReadingComplete or SELECT_VICTIM. Failure reaches selection only after its existing causal body; selection commits one death before farewell. B1's progressive voice loss changes only prose.

No state migration, new campaign flags, content-version gate or text-dependent passage IDs. New Game and candidate-earned saves use the candidate's authored lists. Old serialized interpreter lists may preserve old wording; do not overwrite or repair them during load. Preserve native handling and file association.

| Checkpoint under this change | Required Continue behavior |
| --- | --- |
| Reveal | Resume the pending description/choice at the actual saved native position; no reroll or progress increment |
| Approach | Resume the chosen success/failure reading without a second CHOOSE_APPROACH |
| Sacrifice | Keep the same dead hero and location; finish pending farewell/death reading without another SELECT_VICTIM |
| Consequence | Resume the resulting next scene/choice without a repeated result or route reward |

Box count is not checkpoint count. HIDE, Options and reread remain observational. Maintain two-file isolation and native save failure behavior; no extra save policy is introduced.

## Verification ownership — revised under D-005/D-006

[ADR-003](adrs/adr-003-proportionate-prose-verification.md) replaces the original native integration/control/Continue plan. Tasks 01/02 compare all accepted text and native associations against independent source expectations, parse JSON and inspect event structure against the pre-edit baseline. All three choice-label consumers must agree. Allow only intended text fields/message splits; preserve branch indices, bindings, commands and their order, with every new box before its original ReadingEnd/completion boundary.

The frozen catalogue plus B1 is the oracle; edited candidate lists must not generate their own expected copy. Compare preserved failures/unrelated commands with the recorded native baseline. Use a focused local comparison and task notes rather than creating new fixture families or a spec-specific engine runner. No mandatory extension/run of encounter, death, sacrifice, controls, checkpoints or content integration cases remains. Existing tests are retained; narrowly update obsolete expectations/box assumptions when exposed, without weakening assertions or skipping tests.

Task 05 inspects all choice labels and risk-selected narrative boxes at 1280×720. It starts from a new candidate campaign and creates its own navigation saves during testing through normal player inputs. No preexisting/external saves or state injection. Loading those saves is navigation, not Continue verification. The checkpoint table above remains a preserved product contract; no checkpoint/file matrix is required in this delivery.

[Verification](verification.md) owns exact static/visual coverage, waivers and evidence limits. A necessary behavior/plugin/layout change or an observed lifecycle defect requires scoped reassessment; do not silently expand the prose edit or reinstate every historical test.

## Failure and resource boundaries

Preserve unrelated command payloads, art/audio, switches, variables, IDs and helper consumers. Missing source, wrong result association, premature completion or unseen text accelerated by inherited input blocks the affected delivery evidence. Fix the owning edit or lifecycle; do not weaken the expected copy or insert arbitrary waits.

No runtime resources are added. Visual inspection retains existing cleanup and uses readiness conditions. Test campaigns advance only through validated player inputs; inspection stays read-only. Record and close only apps, browser instances and servers started for verification, including on failure, as required by ADR-G006.
