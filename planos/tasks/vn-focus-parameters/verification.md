---
implemented: true
static_verified: true
runtime_verified: true
human_accepted: true
release_ready: true
---
# Verification — global focus parameters

Scope: RQ001–005 in spec.md. Only current incremental changes, preserving the earlier uncommitted tree. Baseline hashes and source snapshots are local ignored evidence in docs/qa/evidence/vn-focus-parameters/.

Completed: configuration/CLI and unit checks; native custom configuration and style-only Continue; default affected native tests; visual functional inspection and preservation checks. Independent review resolution is recorded below. Final functional acceptance is recorded below; final PNG framing remains deferred. The user's server18727 is preserved; tests use isolated copies and port18728.


## Findings during implementation

The initial79-case run passed78 and failed IT069: the profile entry never called Focus, so its speaker multiplier could not apply. This was a native authorship omission revealed by a non-default parameter, not a reason to weaken the assertion. UT074 then reproduced the missing initial focus at the pure boundary. Added45 native helper calls before the first text in profile, selection, party_full, farewell, epilogue, lovers and council.solo; no new helper or text. Revised native data to `mz-20260911-focus-parameters-02`.

A second boundary was identified during source review: authored scale is bounded to200, but an authorized speaker multiplier can derive a larger target. Internal Focus/recovery transformations now use their already validated bases and global style rather than being revalidated as authored entry commands. Authored commands retain the original bounds. UT074 covers scale220 and a listener coordinate beyond the authored coordinate limit; IT069 uses an authored200 base to cross that limit in real playback and recovery.

Raw runs01/02 retain the initial profile assertion failures. Run03 revalidates all74 units plus IT064/065/067/068/069 on the corrected authorship. The subsequent receipts and image inspections are recorded below.


IT069 fixture corrections after the source fix: the profile has two text boxes before Ivai enters (run03); native saves omit Game_Message and Continue proceeds to the next authored reply, which is verified exactly from the native source rather than expecting a completed line to replay (run04). The vendor applies a requested duration0 on a single picture update; the reduced-mode oracle now records actual forwarded native command arguments and then checks settled composition, retaining the original vendor code (run05). These test-boundary corrections do not alter production behavior or loosen campaign/source preservation. Runs03–05 retain the failures; run06 was the next attempt; its cleanup and visual limitations are recorded below.


## Final evidence

- Run03 (`task-03/2026-09-11T16-32-47-016Z`): all74 unit cases and IT064/065/067/068 passed. Only the new IT069 fixture failed at its then-incorrect profile preparation.
- Run07 (`task-07/2026-09-11T16-45-04-980Z`): UT073/074 + IT069,3/3 PASS, process exit0 and CLI0, after fixing owned Chrome-pipe cleanup.
- Run08 (`task-08/2026-09-11T16-46-29-608Z`): final IT069,1/1 PASS, process exit0 and CLI0. Reduced mode now advances through the next actual authored Focus using player input and requires visible sprites as well as settled numeric targets. The earlier direct injection into a paused message bypassed the normal interpreter boundary that reveals initialized pictures; its empty reduced screenshot is not accepted as visual evidence. No runtime workaround was added.
- Run09 (`task-09/2026-09-11T16-52-20-103Z`): 78/78 PASS, process exit0 and CLI0, on final runtime SHA below. Includes all74 units, IT032/033/034 for CLI behavior, and IT069 for custom native focus/Options/style-only Continue/reduced motion. The three new captures were opened and inspected; `visual-review.json` now binds run09.
- Retained affected native coverage: IT064/065/067/068 from run03. The only later production-code delta passes the validated style to the content graph and corrects Wait validation. Published events contain no Wait after Focus, and all default target/base compositions are equivalent. The earlier focus/rendering/lifecycle evidence remains applicable; it is not presented as newly executed. Combined unique applicable coverage is82 cases (74 units +8 integrations), across the recorded runs, not a full143-case campaign replay.
- Default migration equivalence:41704 full target/base compositions across401 ordered distinct rosters and104 dialogue boxes. Both catalogs retain258 sections/282 boxes; all12 helpers remain. Proof is local `default-equivalence.json` with before/after source hashes.
- Preservation:1184 protected image/audio/engine/other-plugin files unchanged; user package.json unchanged;67 narrative event objects preserve all non-focus commands. Seven Focus calls migrated;45 first-speaker helper calls added. `preservation.json` inventories the exact runtime/test/tool delta.
- Final syntax, content/parameter CLI and whitespace checks pass. The three final run09 PNGs were opened and inspected; `visual-review.json` binds dimensions and hashes. Text/name windows remain readable and the listener darkening is visible. The200% boundary fixture and original oversized art crop the portraits; no final portrait framing or artistic approval is claimed.

Native revision: `mz-20260911-focus-parameters-02`. Final runtime EventBridge SHA256: `248ede44d9e1826841f32c9adf14213faed096df934c55000c8c4fa8631a6b14`. All raw receipts are local ignored evidence under docs/qa/evidence/vn-focus-parameters/. The user server18727 remains running; owned test ports18728/18729 are closed.

## Candidate audit and maintenance handoff

Keep the runtime plugin, its configuration, native data and revised manifest as consumed game inputs. Keep the new data-only plugin-settings loader and updated content validator: without them invalid Plugin Manager fields would bypass command-line validation. Keep canonical tests/fixture updates and the native Chrome pipe cleanup that closes a reproduced test resource leak. Keep README, the canonical GDD increment, both known issues and the historical analysis handoff; their consumer is the team editing and planning future work. Keep the incremental spec/ADR/tasks/verification and local review as scoped authority and delivery evidence.

One-shot migration scripts are historical receipts, not editor tooling to rerun on the current data. Their scripts remain preserved beside this spec; proposed future commit organization can archive them with the raw evidence. The isolated runner is reusable current-tree verification. No archive move, file deletion, index change, commit, publication or remote card was performed. This audit does not certify pre-existing uncommitted files from other increments. Final asset framing, native editor-window interaction and subjective motion comfort were not newly verified.

Devlog moment: open the five numeric fields in Plugin Manager, change darkness or speaker scale and show the result after reloading. Suggested capture after the user's art normalization: Plugin Manager values beside a matching conversation. Current integration captures demonstrate function and extreme scale behavior, not final art presentation.


## Independent review correction

F-001 identified that a native Wait after the migrated slot-only Focus still read the removed per-command duration. The graph now receives the validated global style in runtime boot and the CLI, uses FocusDuration, and accepts the zero-duration/zero-wait boundary. UT073 checks parser and real CLI with default20/wait20, default20/wait21, custom30/wait30, custom8/wait9, zero/wait0 and zero/wait1. Valid cases pass; waits exceeding the configured transition fail. IT033 confirms that the documented incomplete-content fixture still returns its original missing-section diagnostic. No published command, asset, campaign fact or native revision changed in this correction.

The run09 receipt above verifies the correction; the bounded independent re-review owns its final finding status in `review.md`. Source whitespace/syntax, default equivalence and baseline preservation were checked again on the final source. The README explains how an editor-added Wait relates to the global duration.


## Final verdict

**PASS — only the five-parameter increment, RQ001–RQ005.** Independent review reports `SHIP` with F-001 resolved. All required technical sensors passed, with retained evidence scoped as described above. Final art framing and native editor-window inspection were explicitly excluded; `human_accepted` is true following the user’s explicit acceptance recorded below. This is acceptance of the delivered functionality with the agreed art/editor boundaries, not evidence that excluded sensors were executed. This technical verdict does not certify the whole dirty working tree or unrelated historical deliveries.

The final candidate inventory is local `docs/qa/evidence/vn-focus-parameters/candidate-inventory.json`: paths, hashes, baseline availability and responsibility/disposition. Runtime/tooling/tests stay with their consumers; authoring instructions and deferred work stay in the guide and known issues. The two one-shot migration scripts and the verification runner stay with the incremental task provenance; raw repeated logs remain ignored local evidence. No staging, commit, publication, archive relocation or removal occurred. Any future commit must preserve the other increments that share these files rather than treating this hash list as approval for their unrelated deltas.


## Human acceptance and closure — 2026-09-11

Edney explicitly accepted the result: “agora ficou bom. atualize a spec com essas ultimas atualizações. e em seguida pode aprovar todo o desenvolvimento.” Acceptance covers the consolidated bust-dialogue development: native composition,12 positional helpers with native-source recovery, and all five global parameters. The latest spec now incorporates the final derived-transform behavior, Wait validation, first-speaker migration and maintenance handoff. ADR001 records this closing decision.

**Accepted delivery: PASS.** Implemented, static_verified, runtime_verified, human_accepted and release_ready are true for the final contracted functionality. The original `vn-picture-busts-dialogues` verification remains a historical record: its failed art framing and unavailable editor sensor were not executed anew or turned into PASS. The subsequent accepted scopes explicitly deferred final PNG framing and editor-window inspection; participant expansion and further parameterization remain in the linked known issues. No active implementation task remains in the accepted workstream.

The12 runtime/tooling/test paths in the existing candidate inventory were hashed again and match the verified delivery. The accepted runtime remains `248ede44d9e1826841f32c9adf14213faed096df934c55000c8c4fa8631a6b14`, native revision `mz-20260911-focus-parameters-02`. This turn updates documentation and acceptance only; tests are retained from the recorded runs, not claimed as rerun.

## Post-acceptance organization

Current behavior and acceptance are consolidated in this spec set. Historical specs/graph receive a pointer to this closure without rewriting their original requirements, results or failures. Runtime, tests, guide and known issues remain in their audited maintained locations. Migration scripts remain historical provenance, explicitly not a maintenance procedure.

Selected run09 captures are preserved in [custom style](../../../docs/qa/deliveries/vn-focus-parameters/custom-style.png) and [updated style after Continue](../../../docs/qa/deliveries/vn-focus-parameters/updated-style-continue.png). They show the actual technical boundary fixture (base200%) with the existing cropped art: initial darkness60/listener80/speaker110, then darkness80/listener75/speaker120 after compatible Continue. They support the functional handoff, not final art approval. Suggested final devlog image remains Plugin Manager beside a conversation after PNG normalization.

Excess logs, original screenshots and baseline comparisons remain in the existing ignored local evidence directory; no archive move or deletion is necessary under the keep disposition. Selected copies were compared byte-for-byte against run09. Document links and whitespace were checked. The acceptance-update manifest is local `docs/qa/evidence/vn-focus-parameters/acceptance-update.json`; the original candidate inventory remains an immutable pre-acceptance fingerprint. No staging, commit, publication or remote tracker update occurred.


## Final Verify execution — 2026-09-11

Executed on the user's explicit request after acceptance. **Delivery PASS; scoped candidate audit PASS; post-acceptance organization PASS.** All five verification states remain true for the accepted functionality. No new blocker was found. The approved PNG/editor boundaries and future known issues remain deferred.

Fresh checks: Node v22.23.2 syntax checks for EventBridge, plugin-settings and validate-content; native content/parameter/manifest CLI returned `{"ok":true,"errors":[]}`; whitespace check passed. Compared all1479 files inventoried by run09:1478 are byte-identical, with only README differing and matching the accepted documentation fingerprint. The maintained source file set is unchanged; two newly present native user save files are excluded from the source comparison and preserved untouched. All32 accepted source/document/capture paths match their accepted hashes before this verification-record update. The1184 protected image/audio/engine/vendor files remain unchanged.

Runtime evidence is **retained, not rerun**: run09 has78/78 PASS and CLI/process exit0, with identical runtime, data, asset, tool and test sources. Earlier affected native evidence retains only the previously documented scopes. Repeating unchanged browser tests would not add evidence for this documentation-only closure. SHIP review remains applicable to the exact accepted runtime hash; the final correction and current acceptance remain recorded above.

Reopened both maintained selected captures, confirmed their hashes against the original run09 files, and checked153 local links. All32 candidate paths are outside ignore rules; raw evidence remains ignored. The manifest records linked inherited dependencies and their tracked/untracked/local-evidence status: a future commit must include its required earlier increments, and this verification is not blanket approval of unrelated working-tree changes. Current specs, historical pointers and known issues remain consistent with the accepted scope. No additional archive move or deletion is needed under the audited keep disposition.

Detailed frozen inventory, source comparison, command exit codes, dependency dispositions and Git state are local `docs/qa/evidence/vn-focus-parameters/final-verify-20260911.json`. The index is unchanged. This execution adds only the final verification record and local audit receipt; no gameplay mutation, source change, staging, commit, PR or publication occurred.
