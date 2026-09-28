---
id: "03"
status: completed
depends_on: ["02"]
verification_ids: ["V-007/TECH", "T-004/HERO_CHOICE"]
---

# Task 03 — Unify hero interactions, approved speech and narrative choices

## Outcome

Deliver RQ-006, RQ-007, RQ-009 within the approved design. One visible hero target yields one intended interaction, no hover selection or overlapping interception; accepted selection returns after the approved line, while other branches preserve their loop.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Map003.json, Maps037–044.json, CommonEvents.json CE003/038 and the actual Council opinion/farewell consumers including CE282–289; in-scope encounter approach/retreat Show Choices settings; Dryland_Presentation.js and existing PictureChoices/AttachedPictures authoring settings when needed. Existing hero/container art and CE351 preload.
- Canonical tests: `rpg-maker/tests/suites/formation.mjs`, `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own canonical formation/choice fixtures for accepted add, removal, full party, dead exclusion and all eight source mappings. Later directed visits use an own candidate campaign; no historical save dependency.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Remove obsolete duplicated target bindings and superseded source text in the scoped native branches.

## Checklist

- [x] Record baseline hit bindings and every narrative choice family; keep the reported hit-area defect unverified until an actual reproduction is captured.
- [x] Make each living hero picture/name/container a nonoverlapping visible base target using the installed provider, with selected/disabled/focus states and keyboard access. Decorative attachments do not need independent click handlers.
- [x] Integrate all approved source categories for H1–H8: introductions, opinions, farewells, successful selection and full-party lines, preserving identity/order and observation IDs 82–113.
- [x] After a successful addition, show the exact acknowledgement and return to the tavern only after the final player advance. Retain conversation/removal/rejection loops and reject a fourth member without mutation.
- [x] Apply the trap-derived choice language to the approved family inventory, preserving the distinct title/options/readers and the later emphasized final choice.
- [x] Verify full source fidelity and shared release/focus/HIDE cleanup mechanically. Document the container/style authoring pattern for tasks 04–06/09 without adding a vendor patch or new UI framework.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001; T-004/HERO_CHOICE; S-001/S-002/S-004 handoff. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-007/TECH, T-004/HERO_CHOICE | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | One visible hero target yields one intended interaction, no hover selection or overlapping interception; accepted selection returns after the approved line, while other branches preserve their loop. | `docs/qa/evidence/prototype-feedback-refinement/task-03/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Hero sources, choice settings, attachments, target geometry, input guard, native IDs and any changed shared theme invalidate affected downstream target evidence. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

### Manual composition and dialogue correction — 2026-09-26

User feedback explicitly supersedes the hero plates introduced by task 03. Historical source was inspected before editing: Git `c47c6fcbc847158d0f96c9ec3eab912f6de127e2`, CE038, last authored CommonEvents change `8057f9e`. All eight portraits originally used centered origin and 35% scale. Their exact coordinates and expected grouping are recorded in the manual-feedback row of verification.md. The original task-03 mutation proves the defect: it replaced the portraits with 168×208 plates and fitted the art into 148×156, moving/resizing it.

`apply-hero-dialogue-feedback.mjs` restores those historical presentation commands before building native AttachedPictures groups around them. Eight fully transparent group bitmaps supply bounds without painted pixels; existing portrait assets and original name tags/type are retained. CE003/038/039/045/349/351 own bindings, display, return fade, cleanup and preloading. Group layers for Elowen/Griznik are exchanged to keep the original name readable above the foreground silhouette, without changing either image's coordinates. The return fade continues to operate on the containing group. Other preparation controls/actions are preserved.

Dialogue body styling uses the existing game's Presentation extension at Window_Message.resetFontSettings (`#211c14`, outline width 0). A MessageCore text-prefix trial was discarded because it polluted the raw dialogue API; no prefix or story-text change remains. The final extension leaves shared palette, skin, window geometry, source prose and menu fonts untouched. The intermediate direct-name attachment was discarded because it changed overlap layering and introduced fractional name offsets. These are implementation findings, not accepted alternatives.

Verification is limited to this feedback: canonical IT-086 owns original geometry, grouping, picture/name clicks, hero selection and return; IT-009 owns return fade/cleanup; IT-074 owns preloading. IT-087 remains the preparation/map/save regression. Directed hero-dialogue-feedback QA owns public new-game → opening → preparation → hero name visits → conversation → return, with actual dialogue/hero captures. The overall 13-task loop remains paused.

Directed QA reproduced an overlap defect introduced by grouping: Griznik intercepted the visible Elowen name. The existing Presentation extension now limits hero-group hit testing to the top visible group, matching the rendering order without moving artwork or introducing another input handler. IT-086 includes both overlapping name targets. The earlier immediate post-click assertion was also corrected to await the destination scene; it is retained as a sensor failure, separately from the reproduced wrong-hero defect.

Final directed receipts: `fe27df1b-ad6b-455f-9f03-e3bfa62c7e4e` at 1280?720 and `f9e34850-7eba-42a0-8168-65307f6b1d1b` at 1920?1080, under local ignored `docs/qa/evidence/prototype-feedback-refinement/hero-dialogue-feedback/runs/`. Both exited 0 after opening, three name clicks, conversation and return using public input. Agent inspection of opening/conversation and restored/returned hero captures passed: dark dialogue body, no group paint/border, original portrait composition. The runner receipt remains `executed-awaiting-review`; this recorded inspection supplies the agent visual review, not human aesthetic acceptance. Sampled opening-box background `#BAB196` versus ink `#211c14` measures WCAG 7.91:1 with the existing ui-craft contrast tool; this is a sampled color pair, not a claim about every background pixel.

Devlog demonstration: start a fresh game, read the opening, reach preparation, click Elowen?s name, return, and talk to Gorvak. Suggested captures: `dialogue-opening.png`, `heroes-restored.png`, `dialogue-hero.png` from the 1280 receipt. Human visual acceptance and broader task-13 criteria remain pending.

Native regression receipt `2026-09-27T22-54-21-496Z`: IT-086/074/087 passed (80.8/89.9/84.5 seconds); IT-009 was cancelled at its 90-second suite deadline after the initial 180-frame assertions and empty-place capture. This is not a four-case PASS. Earlier corresponding executions were approximately 34.5/37.9/51.1 seconds, confirming a substantial throughput difference. IT-009 now has a 150-second whole-case budget, consistent with the existing preparation regression, for its opening plus two return traversals; every 180-frame, position, state and no-replay assertion is unchanged. The three passed scopes remain valid across that other-case deadline-only change. Final isolated IT-009 receipt `2026-09-27T23-00-28-991Z`: 1/1 PASS, exit 0, 79.0 seconds. All four assigned regression scopes now pass; the cancelled invocation remains preserved.

Final verification verdict: **PASS** for implemented/static/native-runtime and agent-inspected rendering of this manual feedback only. Candidate selection: **PASS** for the scoped changes and recorded dependencies. Human visual acceptance, broader task-13 evidence and release readiness remain pending. The maintained authoring replay reports all three CE phases already applied, and CommonEvents/Presentation hashes remained equal to the frozen candidate.

The causal history and the distinction between the original spec implementation and this manual correction are recorded in the [container postmortem](../../../docs/postmortems/2026-09-27-container-herois/2026-09-27-container-herois.md).

Candidate audit (manual feedback only): **keep** CommonEvents, Presentation and the eight transparent HeroGroup PNGs as runtime inputs; the three existing canonical suites as regression owners; the scoped mutation script as a historical authoring receipt (requires the prior task-03 state and fixed Git revision), and the directed case/two requests as reproducible QA. **Keep** GDD/manual UI contract/verification/task-03/task-13 notes as their existing behavior and evidence owners. Native-authoring is an existing dependency from the prior task set. **Defer/exclude** unrelated pending changes, the superseded HeroContainer asset and old plate-producing scripts from this feedback selection; preserve them for their owning scope. Raw captures/reports and the exact candidate hash manifest remain local ignored evidence, with selected devlog capture paths above. No archive deletion/move, staging, commit or release approval occurs. Deslop reviewed this scope: removed duplicate captures and the discarded MessageCore-prefix mutation from the authoring receipt.

### Historical implementation ? superseded hero plates

Technical scope completed 2026-09-25. [apply-task-03.mjs](apply-task-03.mjs) integrates every approved introduction, acknowledgement, full-party, opinion and farewell in Maps037–044/023 and CE282–289. The existing observations 82–113 remain distinct. Successful addition jumps to the existing return only after its final acknowledgement; removal and rejection retain their loops. Maps007–022 and hero menus use the native 480×56 narrative-choice treatment. [finish-task-03.mjs](finish-task-03.mjs) registers these controls for HIDE. CE38 owns eight nonoverlapping 168×208 base targets with attached portraits and native names; CE3/45/349 detach children on exit. CE351 preloads both final plates.

Baseline source inspection found separate portrait-only targets and old short dialogue; the reported user hit-area defect remains unverified until directed reproduction. UT-077 compares all eight source categories against the approved narrative file. IT-086 clicks portrait/name/container, checks nonoverlap, HIDE restoration, post-acknowledgement return, removal and dead exclusion. IT-081 passed all eight hero visits, observation/FAST/HIDE/Options, selection/full-party/automatic formation at 1280×720 and 1920×1080 with normal/reduced motion: 525.4 s. Its [receipt](../../../docs/qa/evidence/prototype-feedback-refinement/task-03/initial/IT-081.json) retains those reading/formation claims; the later HIDE registration changed only narrative-button visibility and was covered by IT-086.

Final command: `node --test --test-name-pattern 'UT-077|IT-074|IT-086' rpg-maker/tests/campaign.test.mjs`, with DRYLAND_EVIDENCE_ROOT pointing to this task's final directory: **3 selected, 3 PASS**, exit 0. [Receipts and captures](../../../docs/qa/evidence/prototype-feedback-refinement/task-03/final/) are hash-bound. IT-074 separately proves the expanded provider preload before entry/return. Its earlier failures exposed two obsolete fixed list lengths in the fixture; they are retained under initial/preload-fixture-failure, and corrected expectations still compare the complete independent list. UT-077's initial map path lacked zero padding; the canonical fixture now addresses Map037–044 correctly.

Independent read-only source/grammar review found no mapping, branch, label or cleanup defect. Scoped deslop and whitespace review passed. Keep native data, the two final plates, canonical tests and scoped mutation scripts; exclude unrelated preexisting edits from this claim. No staging/commit/remote action occurred; owned Chrome/profile/server cleanup completed. Technical runtime evidence is not a directed campaign or human acceptance. V-007/LIVE and the shared V-009 presentation acceptance remain with task 13.

Public QA/devlog entry: new campaign → taverna → each visible hero → Conversar/Selecionar; advance the accepted line to return, then reopen to remove; form three members and attempt a fourth. Use keyboard and portrait/name/container clicks. Later native approach/retreat choices share the same final plate and HIDE binding; task 09 owns the final-choice variant.
