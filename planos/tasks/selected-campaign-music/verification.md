# Verification — 2026-09-29

## Current verdict

Implemented and statically verified for the selected music scope. Full runtime/audio acceptance remains pending; this is not a release-ready verdict.

- PASS: five source WAVs converted to genuine Ogg/Vorbis with portable FFmpeg 9.0.2, quality 5. Each output fully decoded with `ffmpeg -v error -i <output> -f null -` (exit 0). Source/output hashes are in assets.json.
- PASS: structured comparison against HEAD identifies exactly CE002 and CE067 as changed; all other Common Events, IDs and slots are preserved. Conditional branches balance. BGM references resolve to the new assets.
- PASS: all five assets served at the existing local origin match the output SHA-256. Native AudioManager implementation retains the buffer for repeated Play BGM with the same name; opening narration and tavern now use that same descriptor. This source inspection does not claim an observed runtime transition.
- PASS: `node --check` for the three updated canonical suites and `git diff --check`. Assertions changed because the user explicitly replaced cue names and entry silence; added same-buffer allocation-count expectation to existing IT-029. Full suites were not executed: legacy IT-029 injects campaign fixtures and does not satisfy this request's read-only QA constraint.
- Observed: updated game loads its entry screen in the browser without a visible load error. No preexisting save was loaded or overwritten. The user-facing tab remains open by explicit request. Keyboard navigation did not reliably advance the browser session; prologue/tavern playback and route traversals remain unverified. No listening is claimed.
- Global Core validator: FAIL on unchanged baseline targets (`CORE_NOT_ACTIVE`, `CORE_PROVIDER_CONFLICT`, `MESSAGE_SOURCE_CHANGED`, `INACTIVE_COMMAND_PROVIDER` in CE351). Registry, Message plugin and CE351 compare unchanged against HEAD. These are not audio-change findings and were not repaired. Raw diagnostic stays local at `.artifacts/audio-tools/core-validation.json`.
- An initial baseline byte comparison failed on checkout line endings; normalized-text comparison passed. Audio HTTP/hash checks passed before and after that correction.

## Remaining human/runtime checks

Start a new campaign in an empty save slot. Confirm The Well at entry; Man Made Wings throughout the opening and the young Rheed/Ivaí exchange without a restart; Danger in Church; Valley of Ghosts in Park; the simultaneous mix in the final village. Confirm choice screens retain route music, volume/mute controls, and the final mix's repeat boundary. Old saves can contain serialized event lists; do not treat a mid-event old save as proof of updated authorship. Later narration and ending themes retain their prior choices.

## Candidate audit and cleanup

Keep the five game OGGs (runtime consumers), CommonEvents (native authoring), canonical test expectation updates, GDD/provenance, and this incremental spec/ADR/script/manifest (decision and transformation ownership). The one-time script requires the historical input and deliberately fails on a second application; it is not a recurring authoring tool. Preserve the preexisting untracked `docs/sons/` packs and previews; they are source material, not a request to version every unused asset. The game runs from the converted files independently of these sources. Keep converter/download and raw screenshot/diagnostics in ignored `.artifacts/`; no new project dependency or plugin was installed. No staging, commit, publication, or historical-spec rewrite occurred.

Engine, Coreto and original plugins are unchanged. Converted assets are final selected recordings, not placeholders; mix calibration is a prototype baseline. Public-distribution license documentation remains pending in asset provenance. Deslop review found no added production JavaScript or unrelated changes. No additional server was started; the existing local server was reused. Converter processes completed. The game tab is deliberately retained for the requested audition.

## Follow-up — retain expedition audio (2026-09-29)

Implemented the user-confirmed removal of narrator-specific music/plateia during expedition closure and Council. The earlier statements above preserving later narration cues are superseded by this follow-up. CE067 now restricts audience audio to the opening; route selection covers narrated route scenes and Council. Existing Irati/map-reveal tavern-scene exceptions are preserved. No audio assets, plugins, campaign rules or saves changed in this follow-up.

PASS: one-time structured transform with preconditions and balanced branches; isolated evaluation of the authored predicates for 11 cases (opening, tavern, both closures, Council, choices, Irati/map-reveal and ending), plus absence of Town1 from CE067. PASS: syntax checks on changed discovery/endings suites and diff whitespace check. These checks do not execute the live interpreter or prove audible continuity. Full runtime journey and listening remain pending. Browser not reloaded, preserving the user's active session. Earlier asset decoding/hash results remain applicable because those files are unchanged. Reviewed scope contains only audio selection, matching test expectations and documentation; no extra production code introduced.

## Council revelation and final-choice refinement — 2026-09-29

Implemented in CE067 and Map023/event1/page1. The structured transformation preserves all 101/401 text commands, 102 choices and 357 domain/plugin actions byte-equivalently as parsed objects. Both native condition stacks balance. Existing asset Darkness1 fully decodes with FFmpeg (exit 0); original duration 1.625397 seconds, playback pitch 80. No new assets/plugins were required.

PASS: executed the real engine Game_Interpreter in an isolated Node VM against CE067's authored audio selection, with read-only synthetic query values and a recording audio-device boundary. Nine cases dispatch the expected single BGM and BGS: Council 24/30; alarm and confession 15/18; subsequent narration/opinions restored to 24/30; final choice 18/20; final exploration and both earlier routes 35/60. This is interpreter/dispatch evidence, not a browser campaign or audible mix check. No live game state or save was injected.

PASS: both native ending branches place BGM/BGS stop and 30-frame wait after their accepted-action guard/checkpoint, not before player input; confession SE occurs immediately before its Show Text command and outside recurring CE067. Branch/text comparison and git diff --check passed. Only Map023 and CE067 changed in runtime for this follow-up. Tests and manifests already changed by earlier work remain preserved.

Pending: fresh-campaign E2E to Council, listening, HIDE/Continue restoration audition and final subjective tension/reading balance. No claim that this mix is artistically final. Existing canonical audio checks remain available but were not run as live E2E. No browser reload or save overwrite was performed. Native volume updates are immediate; a gradual crossfade was not implemented.

Candidate audit: keep Map023, CE067, the one-time transformation and updated GDD/spec/ADR/provenance as the owners of the approved behavior. Darkness1 was already tracked. No extra runtime dependency, production JavaScript or placeholder. Deslop review: focused native data edits, no unrelated source churn. Retain local tool artifacts; no commit/staging/publication.

## Lower reading mix — 2026-09-29

Implemented: 33 authored audio descriptors reduced by 40% (integer rounding) in CommonEvents, Map002, Map023 and six used System interface sounds. PASS: each file parsed before/after; exact structured equality with the intended volume-only transformation; no text, command order, branch, preference, asset or plugin changes. PASS: diff whitespace and native-audio syntax checks. Updated canonical opening expectation to BGM21/BGS15, consistent with the new approved mix. No full live suite or listening was performed. Earlier numerical expectations/results are historical; exact current values live in reading-mix.json. Candidate audit: retain the two additional native data files, transform and volume manifest as required authoring/evidence; no new dependencies. Deslop: localized numeric edits only, no production JavaScript. Browser and user saves were left untouched.

## Final-choice presence override

Implemented BGM 11→18 only under CE067 final_choice. Structured precondition/postcondition passed; no other descriptors, commands, texts or preferences changed. The existing authored branch and native same-name playback behavior remain intact. Full playback/listening not performed. Earlier volume manifest remains a historical reduction record; spec owns this explicit override. Diff reviewed for unrelated edits. Browser not reloaded during active user play.

## PR preparation — 2026-09-29

User explicitly requested committing/pushing this branch and opening a PR to main. Latest origin/main and origin/upedate/sound-design matched HEAD before the new commit. Fresh checks: syntax of all four changed test suites, git diff --check, and seven actual Game_Interpreter dispatch cases with current mix values passed (audio sink mocked). Full browser journey/listening remain pending. Selected for publication: changed game data, five runtime OGGs, test expectations, GDD/provenance and incremental spec records. Excluded: complete untracked docs/sons packs and local previews, portable converter and raw local captures. Local source paths in assets.json are provenance references, not runtime dependencies; historical transforms require those local sources/baselines and are not fresh-clone setup instructions. Draft PR will retain explicit QA and licensing-documentation limits.
