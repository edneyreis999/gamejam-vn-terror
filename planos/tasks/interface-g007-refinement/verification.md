# Interface verification

Technical verdict: **PASS for the requested interface increment**, 2026-09-28. Human artistic acceptance is not inferred. No commit or staging operation was performed.

## Executed evidence

Final real-game run: [final-06/report.json](../../../docs/qa/evidence/interface-g007-refinement/final-06/report.json). The game was served by `npm start -- --no-open` from the project root and traversed in an isolated Chrome context at 1280×720. Only public keyboard/pointer actions changed the campaign; observations were read-only. A new campaign produced its own manual save, subsequently loaded through Continue. No preexisting save was used. The runtime matched `.artifacts/interface-g007-final06` byte-for-byte.

The runner completed every assertion with zero runtime errors. Its `executed-awaiting-review` status describes collection; the agent subsequently opened and inspected title, dialogue, age, menu, party-ready, Quadro, Options and loaded-save captures. This document records that completed inspection separately, without rewriting the immutable runner report.

| User criterion | Result and evidence |
| --- | --- |
| 1–2: age controls follow G007 without duplication | PASS. Existing choice list draws the acknowledgement, Jogar and return action; no pictures 3–5 remain. Checked/unchecked, disabled Jogar, Escape, re-entry and pointer activation exercised. See `age-unchecked.png`, `age-checked.png`. |
| 3–4: green ornament removed; messages still advance | PASS. ExtMessageFunc custom cursor is disabled centrally. The standard MZ pause arrow remains. The prologue and selection acknowledgements advance by input; Hide/Tab preserves and restores the message. See `dialogue.png`, `dialogue-hidden.png`. |
| 5: exact common ink | PASS. Runtime measurements assert title, message, name box, Configurações and Hide equal `#211c14`, supplied by `ColorManager.drylandDialogueInk`. The title's existing text window now supplies a readable native backing. |
| 6: specified tavern text controls | PASS. Existing spatial label/Seguir renderers use Window.png and native cursor; menu actions use Window_ChoiceList. See `formation.png`, `menu.png`, `party-ready.png`. |
| 7: unchanged hero artwork | PASS. All eight world positions, 0.35 scales and asset identities match the baseline. Full runtime comparison confirms no image bytes or maps changed; authored portrait transforms are unchanged. |
| 8–9: menu actions and original functions | PASS. Quadro displays the original empty roster and returns; Configurações enters native Options and returns; saving shows Campanha salva and Continue restores the identical saved campaign. Consultations do not mutate the campaign. |
| 10–11: no hero obstruction or competing input | PASS. Menu bounds `(1116,84,152,456)` do not intersect any hero target. A pointer click on Draska while it is open remains in the menu. Escape and Fechar menu restore focus to Menu. Old independent actions are absent. |
| 12: Seguir preserved | PASS. Authored `(1136,664)` and 100% scales preserved. Disabled before party formation, enabled after three selections, and pointer activation reaches the original preparation introduction. |
| 13: affected-flow regression | PASS within this directed scope. Title/gate/dialogue/Hide/tavern/actions/hero selection/Seguir/manual-save loading completed with no runtime errors. This does not certify all unrelated campaign branches. |

Static validation: `node --test --test-name-pattern=UT-080 rpg-maker/tests/campaign.test.mjs` passed (1/1); plugin syntax and `git diff --check` passed. UT-080 owns no-duplicate controls, original actions and authored geometry in the existing content suite. Existing integration-test navigation was updated to the new public menu; the broader fixture-based suites were not re-executed and are not claimed as passed.

## Risk selection and history

One grouped journey covers all changed interactions under G006, including fresh acknowledgement, cancel, disabled action, modal ownership and real save/load. Second-resolution repetition was omitted: authored logical geometry, assets and scaling path are unchanged; the new menu bounds were measured against every portrait. Reopen this choice if the logical resolution, scaling implementation or layout changes. Gamepad and native zoom tests remain excluded under G005/G003. Audio, Editor, NW.js and full campaign endings are outside this presentation increment.

Earlier runs remain preserved. `baseline-01` collected the original defects but failed verification metadata because its result omitted `limits`; its screenshots are diagnostic baseline only. `candidate-01` exposed the non-rendering copy of attached pictures and stale title ink; both lifecycle issues were repaired. `candidate-02` exposed a test comparing window-local bounds with world bounds and insufficient height for multiline save text; coordinates were corrected and rows enlarged. `candidate-03` reached a preexisting hero-menu return after Draska's acknowledgement; navigation was updated to use the unchanged public return action, with no hero-map changes. `candidate-04` and `live-05` passed their assertions; `final-06` validates the final runtime, including native saving-progress presentation and owned-bitmap cleanup.

The optional evidence-request optimizer reported no verified Windows browser probe. Its final fallback attempted a second server while the owned npm server was running and received WinError 10013. The ordinary directed runner then used `live-adapter.mjs` against the documented npm server successfully. This infrastructure failure is not a product pass.

## Candidate audit and cleanup

Against the pre-edit runtime copy, only `data/CommonEvents.json` (CE002/003/038/354), `js/plugins.js` and `js/plugins/Dryland_Presentation.js` changed. All engine, vendor/Coreto, maps and image files are identical. Preserve these runtime changes, the canonical GDD update, incremental decision/spec, mutation scripts and canonical test/navigation updates. Preserve raw run artifacts locally as evidence, not as a second game implementation. All other previously staged/unstaged work belongs to earlier scopes and is excluded from this verdict.

The final runner confirmed browser/context/input/capture cleanup. The npm server was owned separately from the adapter: Ctrl+C ended its session, and `netstat` confirmed no LISTENING socket on 18726 (only expired-connection TIME_WAIT entries). No user browser session or unknown process was terminated. No archive, commit, PR or publication was performed.

## Devlog capture

Use `final-06/formation.png` followed by `final-06/menu.png`, then `final-06/party-ready.png`. These show the preserved artwork, relocated utilities and unchanged Seguir position. Pair `baseline-01/dialogue.png` with `final-06/dialogue.png` for the cursor/color correction.
