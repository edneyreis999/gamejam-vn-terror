---
id: "01"
status: completed
depends_on: []
verification_ids: ["V-001/TECH", "T-004/GATE"]
---

# Task 01 — Separate title and fresh age acknowledgement

## Outcome

Deliver RQ-001 within the approved design. Correct native entry is invoked only after a fresh acknowledgement; cancel/re-entry cannot carry acceptance or activate the restored menu. The title contains the supplementary 16+ mark.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Map001.json/event001 and CommonEvents.json CE002; existing EventTitleScene entry commands; Dryland_Presentation.js only for transient gate/input behavior absent from native commands. Reuse Dryland_Taverna.png; preserve plugins.js order.
- Canonical tests: `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own a no-campaign technical fixture plus an isolated provider save fixture for gate/entry integration. Directed S-001 must later create its own campaign through the title; do not open a personal save.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Retire the combined visible warning/title flow inside CE002.

## Checklist

- [x] Capture the combined title/notice baseline and current NewGame/LoadScreen cancellation behavior without changing campaign files.
- [x] Implement title/menu on the darkened empty tavern with the discreet 16+ mark, followed by the exact black notice and checkbox.
- [x] Keep requested new/continue entry and acknowledgement transient. Enable Jogar only when checked; visible return and Escape cancel from either checkbox state without loading, starting or writing a campaign.
- [x] Consume the opening/closing gesture; every subsequent title entry starts unchecked. Preserve the provider file selector, occupied-file replacement confirmation and cancelled selection behavior.
- [x] Check exact copy, provider commands, control states and picture cleanup; prepare the S-001 entry variants and the title-to-notice devlog frames.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001 source/metadata; T-004/GATE; S-001 handoff. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001/TECH, T-004/GATE | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Correct native entry is invoked only after a fresh acknowledgement; cancel/re-entry cannot carry acceptance or activate the restored menu. The title contains the supplementary 16+ mark. | `docs/qa/evidence/prototype-feedback-refinement/task-01/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Title events, checkbox/entry lifetime, picture layout, entry providers or input cleanup invalidate this slice. Existing baseline screenshots are reference only. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

### Manual title correction — 2026-09-25

The user's later feedback supersedes this task's original title picture-button treatment. `apply-title-options-style.mjs` changes CE002 only: removes three picture controls and their picture-choice binding, reveals the existing native choice window, and positions it below the title through MessageCore's scoped `ChoiceWindowDistance` command. The command resets after each title selection. Options and title now share the installed selectable-window skin, font, item rendering and input behavior; no engine/plugin code or raster assets were added or changed for this correction. Continue eligibility, entry destinations and CE354 acknowledgement remain intact.

Canonical validation: `node --test --test-name-pattern 'IT-085|IT-047' rpg-maker/tests/campaign.test.mjs`, **2/2 PASS**, exit 0, run `2026-09-25T19-55-34-765Z`. IT-085 covers shared appearance, Options return, disabled/entry semantics, fresh acknowledgement, held confirmation and dragging a press outside the menu. IT-047 checks native references/assets. Earlier title captures above are historical.

Focused public-input QA uses `title-options-style.qa.mjs` and its two request files. The 1280 normal run `9211700d-9f13-413a-bb53-eb0127558903` exited 0, with no browser errors and all resources closed. It exercises keyboard focus, disabled Continue, hover, press/release, Options round-trip, new campaign creation and Continue to the native file menu. The initial run `0ffe4743-f30d-4dfe-8c7b-7f1af197c410` completed these actions but failed report validation because `limits` was omitted; the case report was corrected and recollected without changing game behavior.

Candidate audit for this feedback: **keep** CE002 runtime data and the existing IT-085 regression; **keep** the materialized mutation plus focused QA case/requests as reproducible authoring and inspection inputs; **keep** the GDD/UI contract/verification/task notes as decision and result owners. Raw runs remain local evidence under `docs/qa/evidence/prototype-feedback-refinement/title-options-style/`; other working-tree changes belong to the paused 13-task delivery and are excluded from this correction's verdict. No files were staged, committed, deleted or archived. Review under `deslop` found no new runtime abstraction, copied style or workaround.

Devlog moment: move focus between title commands using keyboard and pointer, open Configurações, and show the matching item treatment. Suggested captures are `title-hover-options.png` and `options-reference.png` from the focused run. This is a capture recipe and correction record, not publication or human acceptance of the full spec.

Final bounded verification: **PASS** for implementation, native behavior and inspected title/Options appearance. The 1920×1080 reduced-motion run `dfac876d-be1a-4fec-9f7a-49ef9fdebf5c` also exited 0 with no errors and all resources closed. Inspected normal, keyboard-disabled, hover/pressed and Options-reference captures at 1280, plus the enabled-Continue/title and Options-reference captures at 1920: shared borders, type and selection treatment; no title overlap or clipped labels. The raw runner status remains `executed-awaiting-review`; this note records the subsequent agent inspection, not human acceptance. CommonEvents SHA256: `dfbb00048d490630bac90944be9651e46a48b5852da62cea5dc8ed6eeebba493`. Reapplying the mutation preserved that hash. Full-spec LIVE/human and release status remain unchanged.

Technical scope completed on 2026-09-25. CE002 now draws the darkened tavern/title/16+ and native entry menu; new CE354 owns the black notice and exact approved copy. Game_Temp holds the acknowledgement, cleared on every entry/cancel/handoff. Existing NewGame/LoadScreen retain SaveCore file selection. No campaign field, engine/vendor change or new plugin was added. Six final native text/button plates implement the approved treatment without illustration placeholders.

1. Baseline: [IT-085 failing receipt](../../../docs/qa/evidence/prototype-feedback-refinement/task-01/baseline/execution.json) observes the missing separate title/gate. The earlier Chrome GPU failure was sandbox infrastructure; approved execution outside it reached the game.
2. Implementation: [apply-task-01.mjs](apply-task-01.mjs) and [native-authoring.mjs](native-authoring.mjs) validate scoped CE002/354 mutations and preserve unrelated records. Map001 remains the caller. Entry helpers now traverse the notice through public input; Windows Python/Chrome paths were corrected without dependencies.
3. `node --test --test-name-pattern 'IT-085|IT-001|IT-047|IT-028' rpg-maker/tests/campaign.test.mjs`: **4 selected, 4 PASS**, exit 0; [hash-bound receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-01/integrated/). Final mouse-boundary IT-085: **1 selected, 1 PASS**, exit 0, [receipt](../../../docs/qa/evidence/prototype-feedback-refinement/task-01/integrated/IT-085-pointer.json). Covers both entries, unchecked/checked Escape, visible return, fresh acknowledgement, held OK, mouse input and canceled provider selection with an own test save.
4. Inspection exposed duplicate native choices; the documented Hide Choice Window tag repairs it. [Current notice](../../../docs/qa/evidence/prototype-feedback-refinement/task-01/notice-checked.png) and [title](../../../docs/qa/evidence/prototype-feedback-refinement/task-01/title.png) are technical captures. A pointer fixture incorrectly expected an outside-target release to open the notice; the provider correctly cancels it. The [failure](../../../docs/qa/evidence/prototype-feedback-refinement/task-01/pointer-fixture-failure/execution.json) is retained; the corrected case checks cancellation and a deliberate subsequent click.
5. Keep the consumed native events/assets, authoring scripts and canonical checks. Preserve unrelated preexisting changes. Scoped self-review/deslop and `git diff --check` passed. Browser/profile/server cleanup hooks completed; no port 18726 listener remained. No commit, staging or remote operation occurred.
6. QA/devlog recipe: title → Novo jogo or Continue → unchecked notice → checkbox → Jogar → provider selector; cancel via Escape/Voltar and reenter. Final V-001/LIVE, second viewport and human acceptance remain with task 13.
