# Verification

## Expected dungeon reading

Sixteen encounter descriptions have two readable pages: setting, then threat and question. Each success and death paragraph fits in one page, without lost words or overlap with native controls. Consecutive same-speaker monologues are grouped within their existing reading boundaries. Speaker changes, sacrifice warning/choice/farewell/death ordering, checkpoints, outcome rules and scene boundaries remain distinct. All choices require their own confirmation. One full public-input journey crosses all three dungeons, closure, Council and a final outcome; own-save resumption and reread preserve the candidate prose. No campaign state is assigned by inspection.

## Status

**PASS — final verification, 2026-09-23.** Implemented, static_verified, runtime_verified and human_accepted for the continuous dungeon dialogue scope. The user tested the promoted configuration and explicitly approved it: “faça o final verify. testei aqui e está aprovado”. No blocking findings remain in this delivery. The sections below preserve the investigation history; their earlier pending states are superseded by this verdict.

## First collection and visual finding

Run `7381723b-02db-4f51-a4ab-0bffbd97c92c`, under `docs/qa/evidence/dungeon-dialogue-reading/runs/`: fresh own campaign; browser exit 0 and zero engine errors. Read all 16 descriptions, 15 successes including B3-3, A3 failure/farewell/death, both closures, Council and reunion consequence. Reread and own-checkpoint Continue succeeded. All 207 authored page projections fit within four rows at font 26 and width 1252.

Opened all 28 selected screenshots. **Visual FAIL:** B4 description page 1 text is complete, but its inline advance icon extends past the window's right edge. Other selected captures fit. Exact evidence: `reading-13-encounter-B4-01.png`; final text line measures 1248px with 1252px available and a configured 32px icon. Similar near-edge terminal lines exist in six unchanged failure texts and map.reveal.02. This is a missing reserved indicator margin, not a need for more pages or smaller text.

Proposed correction: MessageCore `WordWrap:struct` / `EndPadding:num` from `0` to `32`, leaving the plugin binary, window size and all other settings unchanged. The global wrap effect can alter line breaks beyond dungeons; explicit approval was requested via grill-me because project AGENTS requires approved plugin-contract changes. Live configuration remains unchanged until that approval. The first run's observations and negative inspection remain immutable local evidence.

Runner closed owned browser/context/service. User-requested manual server on 18726 preserved.

## Isolated margin preview

Run `aa879535-8ebd-44c3-a09b-c7355cffbba1` used a copied fixture with EndPadding 32 only. Browser exit 0; the full public-input journey, 16 descriptions, reread and own-save Continue completed. Opened four focused captures: B4 description page 1, B3 description page 2, B3-3 longest success and first closure. The B4 advance icon is now fully inside the window; the other inspected pages fit with controls visible. Inspection and capture hashes are in the run's `agent-inspection.json`. Other preview captures remain unreviewed.

Recorded engine widths confirm 13px per character for every projected line. Reprojecting all 207 authored pages at 1220px (1252 minus 32) leaves every page within four rows. This is a static width bound, not a substitute for visual inspection. The original runtime oracle recorded the full contents width; it did not itself subtract the proposed padding.

Reflow verifier passes all 21 native files with exact wording and command-boundary preservation; `git diff --check` passes. Global configuration remains unchanged while the grill-me approval question is pending. No delivery-ready claim is made.

## Approved parameter promotion — 2026-09-22

The user explicitly approved the margin after confirming it changes a plugin parameter rather than plugin source. Applied `margin.py --file "rpg-maker/The Dryland Drowned/js/plugins.js" --write`: PASS. Parsed comparison against HEAD proves the only configuration change is VisuMZ_1_MessageCore / WordWrap:struct / EndPadding:num, 0 → 32; all other parameters, activation and ordering are unchanged. No plugin source was modified.

**PASS — parameter delivery.** Live configuration, MessageCore source and all 21 affected native data files match preview fixture `aa879535-8ebd-44c3-a09b-c7355cffbba1` byte-for-byte. This retains that run's scoped runtime/visual evidence without claiming a new browser execution or expanding the four-capture preview inspection. Original failure is resolved in the inspected B4 capture. Preview resources were closed. User browser/server were preserved; reload is required to load the new parameter.

Focused deslop/candidate audit: keep the one serialized parameter change, the existing mutation script and this approved decision in spec/verification; no added runtime code or dependencies. Earlier unrelated working-tree changes are excluded from this parameter-delivery verdict. Expanded pacing acceptance and the remaining preview capture inspection are not implied by parameter approval. No staging, commit or publication.

## Final evidence and candidate audit — 2026-09-23

Re-ran `python3 planos/tasks/dungeon-dialogue-reading/reflow.py`, `python3 planos/tasks/dungeon-dialogue-reading/margin.py --file "rpg-maker/The Dryland Drowned/js/plugins.js"` and `git diff --check`: exit 0. All 21 native data files preserve exact normalized wording and command boundaries; the net reduction is 89 message boxes relative to the accepted A-description baseline. No additional runtime changes were made during final verification.

Compared every file under the tested fixture's js, data and fonts directories against the live game: **99 files byte-identical**. The successful historical Chrome journey remains applicable; no new browser execution is claimed. Completed visual inspection of the remaining 24 selected preview captures, bringing the total to 28/28. No clipped text, clipped advance indicators or covered controls were found. The complete campaign, reread, own-save Continue, zero engine errors and closed owned resources are supported by the original report. Inspection hashes are in `final-inspection.json` beside that report.

Limits retained: other success/death branches and alternative final consequences have exact-content and font-width coverage rather than individual playthroughs. Chrome 1280×720 is the inspected profile. User acceptance supplies the pacing judgment; it is not an exhaustive branch-coverage claim. Heavy re-execution, unrelated suites, gamepad, audio and new resolution matrices were not warranted under G006 because runtime bytes are identical and no new defect appeared.

Candidate dispositions:

- **Keep:** 21 native data files and js/plugins.js: game consumers, approved prose layout and one serialized margin parameter; no plugin-source changes.
- **Keep:** this spec, tasks and verification plus the dungeon-reading paragraphs of the canonical GDD: durable authority and accepted behavior. Other GDD edits belong to prior deliveries.
- **Keep:** reflow.py and margin.py: explicit reproducible transformations/structural verification; visual.mjs, reading-pages.json and request.json: directed scenario and frozen authored layout inputs. The width oracle records full contents width; the 32px-adjusted projection and actual visual review are separately documented above. Do not treat the projection as pixel proof.
- **Keep as historical proposal recipe:** margin-preview-adapter.mjs and margin-preview-request.json: reproduce the isolated configuration used by the accepted evidence. Their proposal wording records the pre-approval stage, not a current approval requirement.
- **Keep dependencies, under prior scope ownership:** trap-a-description-reading/reflow.py and revised-trap-prose-integration source catalogue/integration script, plus the shared QA adapter/player/save archive and competency fixture. These are maintained or already proposed baseline inputs; the scenario does not require ignored captures to execute.
- **Keep selected delivery media; archive raw evidence locally:** see organization result below.
- **Exclude from this verdict and preserve:** standing directives, ADR changes, encounters test/fixture updates and prior delivery/spec artifacts unrelated to this increment. Shared native files contain earlier approved prose changes; this verdict covers the incremental layout on that baseline, not an independent re-review of the earlier delivery.

The frozen candidate inventory records base/head, file ownership, hashes, Git status and excluded working-tree paths in the local evidence root. No independent ready verdict is assigned to the entire dirty working tree. Focused deslop review found no runtime-code additions, unnecessary dependency or unrelated cleanup to remove.

## Post-acceptance organization

**PASS.** Recorded the user's final acceptance and marked task 02 complete. Selected three inspected real captures (B4 description, longest B3 success and first closure) in `docs/qa/deliveries/dungeon-dialogue-reading/`, with source paths, hashes and factual devlog context in its manifest. Copies were verified byte-for-byte; the images were already visually inspected in the preview review.

Preserved 237 raw evidence files in place under the ignored `docs/qa/evidence/dungeon-dialogue-reading/` tree and wrote `archive-manifest.json` with checksums and relative paths. This is a local archive, not a durable remote backup or a fresh-clone dependency. No origin was removed. Required scenario inputs remain in the candidate source tree. The selected delivery media are not ignored; raw evidence is ignored. No browser or server was opened during this final verification; the prior runner's owned resources were closed and the user session was not changed. No staging, commit or publication occurred.
