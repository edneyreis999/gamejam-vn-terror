---
review_type: implementation-verification-deep-review
reviewed_on: 2026-09-25
base_head: c47c6fcbc847158d0f96c9ec3eab912f6de127e2
scope: rpg-maker/tests, rpg-maker/qa, task-13 candidate audit and receipts
runtime_scope: delegated to the runtime reviewer
verdict: FIX_BEFORE_SHIP
---

# Verification review

This is the frozen read-only review of the test, QA-helper, manifest and candidate-audit surfaces. The current directed campaign was still running when the scope was frozen, so no canonical behavioral test was started by this review and no file outside this report was changed.

## Frozen scope and checks

The frozen tree is based on `c47c6fcbc847158d0f96c9ec3eab912f6de127e2`. SHA-256 was computed over 47 `.mjs`/`.json` files under `rpg-maker/qa` and `rpg-maker/tests`, plus 66 files under `planos/tasks/prototype-feedback-refinement` (excluding this report). The sorted path/hash stream has combined SHA-256 `c19324f65dcfe0a4a310d0aeb3a32b76392d357096bccbe333640df400495784`.

Static checks passed:

- `node --check` over all QA and canonical-test modules: zero syntax failures.
- The 18 imported canonical suites register 144 IDs; `test-manifest.json` contains 144 IDs; duplicates, missing IDs and unexpected IDs are all zero.
- No canonical run was duplicated during the active directed campaign. Existing receipts and retained failures were read as evidence, not rerun or reclassified.

The runtime implementation, engine/plugins, and game data are outside this bounded review. No LIVE, Editor, visual, audio-listening or human-acceptance claim is made here.

## File and lens coverage

| Surface | Files/lens | Result |
| --- | --- | --- |
| Canonical registration | `rpg-maker/tests/campaign.test.mjs`, 18 `rpg-maker/tests/suites/*.mjs`, `test-manifest.json` | PASS: exact 144/144 parity and syntax. |
| Native QA input and waits | `rpg-maker/qa/native-player.mjs`, `native-journeys.test.mjs` | FIX: route choice still lacks the state-settled assertion used by the directed case (F-002). |
| Evidence lifecycle | `rpg-maker/tests/helpers/canonical-cases.mjs`, `native-chrome.mjs`, `tests/suites/memorial.mjs` | FIX: new IT-022 progress output bypasses the run-specific evidence root (F-003); source hashes omit final assets (F-005). |
| Closing lifecycle sensor | `rpg-maker/tests/helpers/closing.mjs`, `tests/suites/memorial.mjs` | WARN: callback records semantic passages, not individual message boxes (F-004). |
| Fixture and receipt boundaries | `task-13-directed.mjs`, task-11/task-13 receipts and QA guide | No additional fixture drift found statically; the current receipts remain historical/retained evidence and the active campaign is still required. |
| Candidate metadata | `audit-candidate.mjs`, `candidate-audit.md`, local inventory | FIX: refresh can produce a self-stale exact inventory (F-001). |
| Remaining helper/suite changes | all frozen QA/test files above | No additional high-confidence defect found by static tracing. |

## Findings

### F-001 — candidate audit can hash the file it rewrites

- **Severity:** medium; **confidence:** high; **effect:** evidence and disposition integrity.
- `planos/tasks/prototype-feedback-refinement/audit-candidate.mjs:6` builds the input set from every untracked path returned by `git ls-files --others --exclude-standard`. It writes `candidate-inventory.json` at line 25 and rewrites `candidate-audit.md` at line 27.
- The current inventory captured at `2026-09-25T18:13:37.321Z` has 170 rows and does not contain `candidate-audit.md`, because that file was created after the first scan. On a refresh, the already-created untracked audit file enters `names`; its hash is captured before line 27 rewrites its contents. The inventory then contains a stale hash for the file whose text advertises that inventory. The new review report is another task-tree output that will also change the scanned set on a later refresh.
- **Required correction:** exclude generated audit outputs from the scan, or write the report first and recapture/recompute the exact inventory after all generated outputs exist. Re-run the candidate audit only after the remaining implementation/sensor changes. Until then, the current `keep:132 / archive:31 / defer:7` counts are a proposal, not a trustworthy final fingerprint.

The proposed archive disposition for one-shot `apply-*`, `update-*`, `finish-*`, `measure-*`, `repair-*`, `update-qa-*` and `native-authoring-*` scripts is otherwise coherent. Keep canonical tests and directed helpers only after F-002 is corrected; defer unrelated user data/configuration remains the correct non-approval boundary.

### F-002 — maintained campaign runner does not settle route selection on campaign state

- **Severity:** medium; **confidence:** high; **effect:** directed QA reliability and false confidence in the selected route.
- `rpg-maker/qa/native-player.mjs:102-139` supports a `settled` predicate, but its default wait compares only the raw choice labels at line 138.
- The maintained `rpg-maker/qa/native-journeys.test.mjs:181-184` selects a destination with `player.choose(...)` and immediately chooses `Partir`, without passing a predicate for `$gameSystem._dryland.campaign.selectedDungeonId`. The destination choice list in `CommonEvents.json:10291-10304` is rebuilt after the branch jump at `:10329-10334`/label `:9140-9144`; its visible labels can therefore remain the same while the selected state is the real completion boundary.
- The current task-13 directed case already demonstrates the required contract at `planos/tasks/prototype-feedback-refinement/task-13-directed.mjs:135`, using `settled` and `settledArg` for the selected route.
- **Required correction:** update the maintained journey call to use the same explicit selected-destination predicate (or an equivalent observable state boundary), then wait for the departure boundary. Do not weaken the helper's default globally. If this legacy journey is deliberately retired, change its candidate disposition and durable guide instead of keeping it as current proof.

### F-003 — IT-022 diagnostic writes outside the execution evidence root

- **Severity:** medium; **confidence:** high; **effect:** cross-run evidence contamination and unverifiable progress provenance.
- `rpg-maker/tests/helpers/canonical-cases.mjs:11,44-55` defines the run-specific `evidenceRoot` and writes each receipt below `${evidenceRoot}/${id}`. `rpg-maker/tests/helpers/native-chrome.mjs:145` remaps screenshot paths under `docs/qa/evidence/` into that root.
- The new diagnostic in `rpg-maker/tests/suites/memorial.mjs:215-229` instead calls the local historical helper at line 8 (`docs/qa/evidence/init-rpg-maker-mz/task-10/${id}`), then writes `progress.json` directly at lines 218-219. That file bypasses the screenshot remap and can overwrite a shared historical `IT-022` directory while the current execution receipt is elsewhere.
- **Required correction:** write progress below the current `evidenceRoot` (or a run-scoped path passed into the diagnostic) and link that file from the task receipt. Preserve historical files as read-only inputs; do not let a current retry mutate them.

### F-004 — IT-022 progress is passage-level, not box-level

- **Severity:** low/medium; **confidence:** high; **effect:** diagnostic precision and wording.
- `finishNativeClosing` loops over `closingReady` and records one `seen` entry per `reading.sceneId`/`reading.index` at `rpg-maker/tests/helpers/closing.mjs:73-82`. The new observer in `memorial.mjs:219` appends that entry with elapsed time and stage; it has no message-box index or per-box callback.
- This is useful stage/passage progress and does not assert a product failure. It does not support a claim that every box has a recorded elapsed/stage sample. **Required correction:** either record each box boundary and its index, or describe the diagnostic as passage-level in the receipt and candidate notes.

### F-005 — canonical freshness hashes omit final assets

- **Severity:** medium residual; **confidence:** high; **effect:** stale PASS receipts after asset replacement.
- `rpg-maker/tests/helpers/canonical-cases.mjs:24-40` hashes tests/tools, data JSON, QA modules and four domain plugins. It does not hash `The Dryland Drowned/img/pictures`, audio or font bytes.
- The approved freshness rule requires reopening evidence when assets/fonts/audio change (`verification.md:59,72,83`; `task-13.md:59`). Asset inventory tests can prove presence during a run, but the `execution.json` source map cannot detect a later PNG/audio/font replacement.
- **Required correction:** include the final candidate asset hashes in the task-13 candidate inventory/directed descriptor and invalidate affected receipts on asset changes. Expanding canonical `sourceHashes` is preferable if it remains within the suite contract; otherwise the final audit must make the asset hash boundary explicit.

## Known boundaries and dispositions

The previously recorded IT-059 bare-boot/global issue, the IT-022 historical 420-second deadline, and the installed runner's Windows sibling-separator defect are not repeated here as product defects. The parent has separate fixes/retests and retained the first failures; the generic media/storage lot passed 2/2 after the environment repair. The current IT-022 rerun and the directed campaign remain pending at this review freeze.

The candidate audit's keep/archive/defer proposal is directionally sound, but F-001 makes its current exact inventory stale on refresh, F-002 prevents the retained legacy journey from being strong current proof, and F-003 makes the newly added IT-022 diagnostic unsafe to use as run-scoped evidence. Final asset hashes (F-005) and the passage-level wording (F-004) must also be reconciled with the freshness contract.

## Verdict

**FIX_BEFORE_SHIP.** The manifest and syntax surfaces are consistent, and no additional test or helper defect was found in this bounded static review. Final verification must first correct or explicitly disposition F-001 through F-003, refresh the candidate inventory after the last changes, and keep LIVE/Editor/visual/audio/human criteria separate from these technical receipts. F-004 and F-005 are residual evidence requirements that must be addressed before using the final audit to claim complete freshness.

## Round 2 — correction review

This round is an append-only review of the corrections made after the frozen round above. It was read-only: no browser, canonical test, candidate-audit command or directed campaign was started. The current combined SHA-256 over the same QA/test/task scopes plus `audio-capture.mjs`, its test and `browser-runtime.mjs` is `54b05fb73b0a10e78e28d8b67fa697dfadcc6c62785f75dd4f9371c056267858` (47 QA/test files, 75 task files excluding this report, and 3 installed-runner files). Static syntax checks over the nine changed modules had zero failures.

The earlier findings are resolved in the current tree:

- **F-001 refresh integrity resolved:** `audit-candidate.mjs:27-35` writes the audit text before hashing rows, includes the output row, writes the inventory and rehashes every row before returning. The current audit row hash matches the file.
- **F-002 resolved:** `native-journeys.test.mjs:184` now waits for `$gameSystem._dryland.campaign.selectedDungeonId` with the route ID before `Partir`.
- **F-003 resolved:** `memorial.mjs:218-220` writes IT-022 progress below the imported `evidenceRoot`, so the diagnostic follows the run-specific receipt root.
- **F-004 resolved:** `closing.mjs:80` records `allText()` for every paused message box. The current progress has 126 entries across nine stages, 18 semantic IDs and 32 distinct texts; repeated IDs such as `memorial.H4`, `memorial.H7` and `memorial.H8` contain distinguishable inscription and variable-box text. The raw `allText()` values still do not replace rendered visual review.
- **F-005 resolved:** the refreshed inventory has 677 asset hashes: 226 pictures, 449 audio files and 2 fonts. Its explicit boundary states that canonical execution receipts do not hash assets and that affected render/audio scopes must be invalidated after replacement.

The current receipt `docs/qa/evidence/native-tests/2026-09-25T18-56-40-949Z/IT-022/execution.json` is `PASS`, has no changed inputs, and finished after 293.4 seconds. IT-074 and IT-085 are also `PASS` with the same source-hash set. The refreshed candidate inventory has 185 rows (`keep:147`, `archive:31`, `defer:7`), and its `candidate-audit.md` row hash matches the current audit file.

### F-006 — PCM transport regression test does not exercise realistic payload size

- **Severity:** low/medium residual; **confidence:** high; **effect:** test false confidence around the installed runner's former `ERR_STRING_TOO_LONG` failure.
- The correction in `.agents/skills/rpg-maker-mz-qa-execution/scripts/audio-capture.mjs:26,52` is structurally sound: the worklet transfers typed channel buffers, and the page-to-Node read is capped at 16,384 frames. Cleanup removes `__qaAudioStopped` in a `finally` block.
- The new regression at `scripts/tests/audio-capture.test.mjs:91-108` uses a mocked `page.evaluate`, constant `.25`/`-.5` samples, and a 262,144-character assertion. A local serialization comparison for two 16,384-frame channels measured about 163,845 characters for those constants but about 643,298 for a sine waveform. The test therefore proves chunk boundaries and sample preservation, but its payload bound is not a representative Chrome/Playwright transport probe.
- The first directed run's `ERR_STRING_TOO_LONG` remains correctly preserved as a failed tool run with no report and is not being promoted to PASS. **Required disposition:** run the fresh directed request before claiming audio collection complete, and either exercise varied waveform values in the regression or state that the 16,384-frame cap is an engineering bound rather than a measured transport ceiling. No game-runtime defect is indicated.

### F-007 — candidate audit bootstrap still fails before its first output

- **Severity:** medium; **confidence:** high; **effect:** fresh-clone reproducibility of the candidate audit.
- `planos/tasks/prototype-feedback-refinement/candidate-audit.md` is not tracked by Git (`git ls-files --error-unmatch` reports no match). Nevertheless `audit-candidate.mjs:6` unconditionally appends `root+'candidate-audit.md'` to `names`, and `:21` calls `readFileSync(path)` while constructing `rows`, before the first generated report at `:26`.
- The current refresh is internally consistent because the file already exists: 185 rows, 677 asset hashes and a matching audit hash. That does not prove that a fresh clone can run the script; with no prior audit file it fails with `ENOENT` before creating `candidate-audit.md` or the inventory.
- **Required correction:** exclude the audit path from the initial hash set when it does not exist, or create a bootstrap report before collecting rows and then recapture/hash it. Keep the post-write rehash check. A final refresh must be performed after this bootstrap correction and after all remaining candidate changes.

### Round 2 verdict

The corrected QA/test surfaces are **SHIP for the bounded static/receipt review**, subject to F-006's fresh directed audio run and F-007's fresh-clone audit bootstrap correction. The overall delivery remains **FIX_BEFORE_SHIP** until those two evidence/tooling boundaries are closed and the separately pending LIVE, Editor, visual, audio-listening and human criteria receive their own evidence. The preserved first directed failure, IT-022 PASS, IT-074/085 PASS, and 677-asset inventory must remain separate evidence scopes.

## Round 2 correction — final bounded status

The F-007 finding above is withdrawn after re-reading the current file. In `audit-candidate.mjs`, `rows` at lines 8-21 returns only `{path, owner, disposition, reason}`; it does not read the candidate. The first `writeFileSync(root+'candidate-audit.md', ...)` is at line 26, and `hashFile` is declared and applied only at lines 27-28. Including a not-yet-existing audit path at line 6 is therefore safe: its metadata row exists before the report is written, and its bytes are hashed afterward. The current 185-row inventory independently confirms that the audit row hash matches. No F-007 correction is required.

F-006 is also resolved for this bounded tool review. The current PCM implementation transfers typed worklet buffers and converts each page-to-Node block to binary PCM/base64 in `audio-capture.mjs:47-67`, with 262,144-frame chunks. The regression now uses 600,001 variable sine/cosine samples, compares the complete generated WAV byte-for-byte with `encodeWav`, checks both RMS values and all samples, and passed in the reported 8/8 audio/runner lot. The preserved first directed `ERR_STRING_TOO_LONG` remains a failed historical run; the later directed run's CE3/CE39 formation and 15-second cleanup defects remain separate LIVE/runtime issues. This review makes no LIVE claim.

One documentation freshness gap remains: `planos/tasks/prototype-feedback-refinement/task-13.md:83` still says the recorder transfers at most 16,384 frames per message, while the current implementation's bounded binary page transfer uses 262,144 frames. Update that durable note to the final implementation and retain the old 16,384 statement only if it is explicitly labeled as an intermediate historical correction. The current final fingerprint for this correction review is `08e29ad51fbcfd4984590ad778808578e2faae98540ca6e44da50d3ca3925d15` over 47 QA/test files, 75 task files (excluding this report) and 3 installed-runner files; nine changed modules pass `node --check`.

With F-001-F-006 resolved and F-007 withdrawn, the bounded verification review is **SHIP**. The overall delivery remains **FIX_BEFORE_SHIP** until the task-13 recorder note is reconciled and the separately pending directed LIVE, Editor, visual, audio-listening and human criteria are completed. No source or runtime file was edited by this review.

## Round 3 — task-13 directed coverage audit

This is a read-only comparison of the current `task-13-directed.mjs` against Lots A–D in `task-13.md`. No case, helper, fixture or runtime file was changed, and no browser/test run was started.

- **A/C baseline:** the completed `a1afddb0-7ca9-410a-b6c5-98052ddb9825` report is an own physical-first campaign with `endingId: "reunite"`, no dead heroes and all three routes completed. Its own archives include `closure-first-01.archive.json`, `closure-second-01.archive.json`, and `council-parent.archive.json`. The report's `returns` contains only the intro and first route return; it does not prove the second route's return boundary. The parent already retained this as a sensor gap, not a LIVE verdict.
- **Automatic retreat remains unproved in the directed matrix:** the only explicit retreat navigation is the voluntary choice at `task-13-directed.mjs:161-164`. There is no dedicated `automatic_retreat` branch or assertion with surviving reserves. The `bad` terminal assertion requires eight dead heroes at `:184-185`, while `return-only` stops at formation with seven dead at `:141-144` and `:184`; neither endpoint guarantees the required automatic-retreat-with-survivors case from Lot B / `verification.md:50,58`.
- **Post-death consultation is incomplete:** `board()` at `task-13-directed.mjs:106-110` preserves campaign state and captures a frame, but does not assert the deceased-name surface or the absence animation. `return-only` exits immediately after that board at `:141-144`. The bad path therefore has no directed hero, destination-map, board and Options round-trip after a death that demonstrates no replay, as required by `docs/qa/guides/prototype-feedback-refinement.md:24` and `verification.md:58`.
- **Branch provenance must be explicit:** `branch-destroy` enters the branch only when the adapter supplies `descriptor.nativeArchive` (`task-13-directed.mjs:15-16`). The request JSON declares the variant but no archive path; `rpg-maker/qa/directed-adapter.mjs:11-22` obtains it only from `DRYLAND_QA_SAVE_ARCHIVE`. A branch run without that own archive would take the `Continuar` path against a fresh title and is not a valid branch proof. The compatible own `a1afddb0.../council-parent.archive.json` is the smallest starting point for the destroy branch; it is at Council after all three routes with no deaths.

The smallest additional public-input coverage is: (1) use the own bad-run checkpoint immediately before a failed approach, choose the nonviable approach through the real menu until the engine exposes `automatic_retreat`, and retain the resulting return with surviving reserves; (2) use the own seven-death formation archive for one hero, destination-map, Quadro and Options consultation round-trip, checking dead-picture cleanup and unchanged state; (3) continue `council-parent.archive.json` through Destruir, then reopen the produced own terminal archive with Continue to check the saved ending; and (4) continue `closure-second-01.archive.json` through the remaining closing boxes and the formation boundary if the full physical run does not yield a second `returns` entry. All four use `DRYLAND_QA_SAVE_ARCHIVE` and public inputs only; they do not mutate the fixture or manufacture campaign state.

This round adds coverage gaps and provenance requirements only. It makes no LIVE, visual, audio-listening or human-acceptance claim; the bounded verification verdict remains **SHIP**, and the overall delivery remains **FIX_BEFORE_SHIP** until these directed gaps and the separately pending acceptance criteria are evidenced or explicitly dispositioned.
