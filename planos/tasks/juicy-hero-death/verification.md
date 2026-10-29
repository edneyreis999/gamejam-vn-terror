# Verification — 2026-10-29

Implementation is on `feat/002-juicy-morte-heroi`. Texts and translations were approved by Edney. No commit, publication, or artistic/audio acceptance is implied.

## Delivered

Eight fear/bravery pairs and focus phrases; existing message box, without title or name plates; native irreversible choices; scene-owned frame, ambience and cues. Sixteen death contexts contain 86 approved boxes and 31 native SE entries. A3 has eleven boxes: its victim fades **before box 9**, not before box 11. Canonical farewells, campaign rules, checkpoints and save schema remain intact.

CE42/43 own selection/staging; CE67 owns the silent-music/ambient boundary; CE266–289 own narration/farewell; CE304 preserves scene pictures while refreshing campaign projections. Variables 221–226 are presentation/name projections. `Dryland_6_SacrificeStage` owns focus replacement and audio-buffer cleanup, after the existing providers. Coreto, engine and third-party code are unchanged.

31 supplied WAV masters were converted with the installed FFmpeg native Vorbis encoder (stereo encoding, quality 5; no normalization); all outputs decoded successfully. Original masters remain in the handoff folder. Initial volumes: BGS50/SE65, pitch100/pan0; frame opacity140/255. These are integration settings, not approved mix values.

## Executed evidence

- `node rpg-maker/tools/run-tests.mjs --scope fast --pruned --output .artifacts/juicy-fast-final`: **61 cases passed**, 10 workers, zero browsers. Subsequent product change only relocates the A3 fade; unchanged rules/persistence proofs are retained under ADR-G006.
- `node rpg-maker/tools/run-recipes.mjs --ids juicy-sacrifice,juicy-sacrifice-reduced --output .artifacts/juicy-recipes-final`: both public-input cases **passed**. Two isolated workers/browsers under configured ceilings of 10/10. Both start New Game, kill all eight heroes through the UI, cover candidate counts 3/2/1, keyboard/mouse, observational focus/HIDE/Options, English preview, mute/restoration, and Continue after one committed death.
- Normal journey exercised A3/A5/A8; reduced-motion journey exercised A2/A4/A7. The native case reports have no errors. The scheduler retains its `executed-awaiting-review` aggregate label; this is not a human playtest approval.
- Visual inspection of the first A3 recording found the fade before box11. Corrected only CE268, then `--ids juicy-a3 --output .artifacts/juicy-a3-final-02` **passed** from a fresh campaign. Inspected its `death-30.png`: victim absent at box9, all eleven texts preserved. The earlier A3 timing evidence is superseded by this retest. A second fresh A3 run, `.artifacts/juicy-a3-audio`, also passed and captured `death-audio-first.webm` after the fix (6.72s of rendered WebAudio; no physical-speaker or human comfort claim).
- Static checks covered all sixteen contexts: localized names/keys, one ReadingEnd per logical context, no Action/Checkpoint added per box, cue immediately before its text, and the final fade before the correct box. B3/B6 have no SE as specified. All expression, frame and sound assets survive pruning.
- `check-runtime-compat`: **24 active plugins, zero errors**. Plugin registry structure/native layout and JavaScript syntax pass; `git diff --check` passes. No NW.js or Editor UI qualification is claimed.

Final run reports and captures are under `.artifacts/juicy-recipes-final/`; corrected A3 evidence is under `.artifacts/juicy-a3-final-02/` and `.artifacts/juicy-a3-audio/`. The candidate uses the existing pruned-fixture adapter, runner and public-input helper. No campaign state/seed/save was injected or edited.

## Diagnosed and repaired

The new preview initially called MZ `newLineX` without its required text-state argument; fixed. Returning from Options recreated the message window without its console; fixed using the existing dimensions/placement lifecycle. A3's special fade timing was fixed after visual review, despite passing rule assertions.

QA preparation defects were retained in `.artifacts/juicy-recipes-01` through `09`: the helper retained a FONTCHANGE escape in visible labels; screenshot IDs collided; navigation omitted the camp menu, category paging and bounded option controls; verification omitted evidence references. These were corrected in project-owned QA code. The earlier A3 targeted attempt tried a completed destination; selection now uses enabled visible entries.

## Baseline diagnostics and scope limits

`vn validate` reproduces the original INVALID_EVENT_LIST diagnostics in CE2/list37 and CE38/list78. Native-data checks also retain the missing disabled VisuMZ_4_CreditsPage file and numeric array items in two CE2 commands. The event grammar helper reports five CE2 branch errors. None belongs to the modified records; no unrelated repair was made.

B-context runtime repetitions are omitted under ADR-G006: the same native five-box/fade/name/reading structure and shared plugin path are checked statically for each, all cue files decode, and runtime representatives exercise those boundaries. This does not establish visual or audible acceptance of every scene. Reopen that coverage if a scene-specific defect or new event shape appears. The eleven-box A3 exception received its own retest.

No gamepad/native-zoom testing, NW.js qualification, complete legacy injected-state browser suite, or publication check was claimed. Local CLI descriptors were not changed; the new specialist's editor commands are documented in its header. Human art finishing, audible mix/loop evaluation and final playtest acceptance remain pending.

## Devlog and cleanup

Suggested captures: `sacrifice-0-slot-*.png` (three focus states), `sacrifice-english-muted.png`, and A3 from confirmation through its final boxes. The latest A3 recording is in `.artifacts/juicy-a3-audio/juicy-a3/evidence/runs/affda2f6-99bf-4904-a69f-ef3e31a9be6c/`: `gameplay-2` in `video/` shows the continued farewell/context and `death-audio-first.webm` captures its rapid advancement audio. Recordings in `video/` are silent; audio captures are separate `death-audio-*.webm` files. Do not present silent video as audio evidence or pre-fix A3 timing as the final result.

All completed runs report closed browser/context/service/input/audio/video resources. Final scheduler: `stillAlive: []`, `unrun: []`. Original local deletions and the supplied handoff files were preserved; no external task/message updates were sent.
