---
id: "05"
status: completed
depends_on: ["01", "02"]
verification_ids: [V-003/FIT-CHOICES, V-003/FIT-PROSE, V-004]
---

# Task 05 — Inspect text fit at 1280×720 and close verification

## Outcome and authority

Inspect revised text where fit can fail, retain static checks from 01/02 and record a scoped delivery verdict. Follow [verification](verification.md), [UI/UX](revised-trap-prose-integration.uiux.md), [ADR-003](adrs/adr-003-proportionate-prose-verification.md) and [local-game-run.md](../../../docs/_memory/local-game-run.md). This checklist replaces the QA planning/execution pair.

## Required visual coverage

| Check | Minimum observation | Evidence |
| --- | --- | --- |
| V-003/FIT-CHOICES | All sixteen choice screens / 48 complete labels at 1280×720; no clipping, overlap or text outside panels | One viewed capture per choice screen, encounter ID and brief result |
| V-003/FIT-PROSE | Risk-selected description, success and death boxes: widest/tallest candidates and splits close to the window/advance indicator/controls | Viewed captures with passage/box IDs and reasons for the shared-format sample |
| V-004 | Delivered source/B1 exception still match D-001–004; D-005/D-006 govern test scope and saves | Short applicability note; no new editorial approval gate |

Choose prose from actual final boxes, considering line width/count, control codes and split positions; character count alone is insufficient. Include at least one description, success and death, plus distinct risky formatting. A1/B3 successes and corrected B1 are candidates when representative, not mandatory random-encounter targets. Do not inspect every narrative box or rerun unchanged failures/successes solely for coverage. If a sample clips, fix it and inspect affected formatting/near-limit siblings.

## Preparation and saves

- Start a new campaign on the integrated candidate. During these tests, create saves needed to revisit text through normal player inputs and the existing native save/checkpoint mechanism. Reuse them within this spec's run, including resumption of that run with recorded provenance.
- Never require/import saves from the user, another spec, a previous campaign or an unknown source. No edited saves, seeds, state injection or test-only production controls. Inspect campaign/storage state read-only.
- Record candidate revision, save/file identity and the player-created entry point needed to resume. Prefer a checkpoint before the target reading; do not use a serialized old reading after its event list changes. Recreate affected saves through normal play when needed.
- Loading is navigation. No save/load assertions, two-file matrix, close/reopen cycle or approach/sacrifice/consequence checklist is required.
- Navigation obtains the listed visual observations; it creates no separate route-family, full-campaign, success/failure, reduced-party or input-device test obligation. Missing required screens remain pending, not passed through sampling.

## Checklist

- [x] Confirm tasks 01/02 and candidate agree; retain their static evidence without rerunning unchanged checks. Verify engine/plugins/rules/assets/layout settings remain outside scope.
- [x] Record preexisting apps/servers and use the documented game at **1280×720 only**. No second resolution, motion mode or keyboard/mouse comparison.
- [x] Create and use this run's own saves, recording enough provenance to resume without external setup.
- [x] View sixteen choice screens and selected prose boxes in the actual game rendering. Keep text, panels and advance indicator unobstructed; preserve backgrounds/fonts and no extra narration bust. Do not create an engine lifecycle matrix to collect images.
- [x] Record results in Execution Notes and the matrix, with selected captures under `docs/qa/evidence/revised-trap-prose-integration/task-05/`. No separate guide/charter/report or full input transcript.
- [x] Repair a text/split defect through its owner and recheck only affected static/visual evidence. If a real issue needs behavior/plugin/layout changes, record the scope change and reassess specific tests instead of silently expanding this edit.
- [x] Audit source approvals and reconcile the five active partitions. Record waived coverage as waived, never PASS; retain visual sample limits.
- [x] Preserve suitable real devlog captures if available; no extra campaign solely for A1/B7 or the sacrifice sequence and no publication requirement.
- [x] Close only resources opened for this run, confirm teardown, and update task graph and delivery flags. Preserve the run's saves for resumption; do not delete user saves.

## Validation boundary

This task proves rendered legibility for all choice labels and selected prose. It does not requalify controls, engine lifecycle, sacrifice rules, Continue or file isolation. S-02/S-03/S-04, engine integration and former E2E lots are waived under D-005. Product behavior remains required.

No gameplay or capture has run during this documentation revision. Release remains pending until implementation, static verification and visual observations are complete.

## Execution Notes

Visual collection and inspection completed 2026-09-22. Final review/closure is recorded in verification.md. Directed mode uses the installed qa-execution runner and existing `rpg-maker/qa/directed-adapter.mjs`; no seed/state/save edits, domain calls or external campaign. `task-05-visual.mjs` is the bounded visual navigation recipe, not an added canonical engine suite.

### Collection, failures and resumption

Local evidence root: `docs/qa/evidence/revised-trap-prose-integration/task-05/` (ignored raw output, retained on this machine).

1. Run `aeab19f8-885e-4ff7-b813-2c37985c623b`: failed at the first prose capture because the case supplied dots in a capture ID. The runner requires safe IDs. Corrected the case's capture name; no product fix. This run collected no required choice screen and supplies no PASS.
2. Run `0b0f6808-071b-45d5-8925-6ecc08889232`: started a new isolated candidate campaign through Jogar → file 1, chose Gorvak/Elowen/Griznik through hero menus, and produced `own-first-reveal.archive.json` at sequence 14, encounter A7. Continued normally to eight choice screens, then the case rejected its own formation at B5: after Gorvak's sacrifice it had selected Liora, leaving no covered B5 competency. Corrected the next legal formation to Bimbren. This is a navigation-policy failure, not a game defect. Captures had a 1280×720 CSS viewport but 2560×1440 macOS raster; final run explicitly selects device scale 1.
3. Run `e8a6bfee-ae8b-4299-b739-0347693799fa`: resumed the previous run's own sequence-14 archive before first page, selected Continue/file 1 through UI, and collected all sixteen screens plus five prose samples. The archive validator confirmed unchanged game source hashes, campaign and native payload. A further Continue used this run's own reveal save. Collection exited 0, `executed-awaiting-review`, with no browser/runtime errors. Codex then opened and visually inspected all 21 selected PNGs; the PASS below is this separate inspection, not the process exit code.

Invocation from repository root:

```sh
DRYLAND_QA_PORT=18732 DRYLAND_QA_SAVE_ARCHIVE="$PWD/docs/qa/evidence/revised-trap-prose-integration/task-05/runs/0b0f6808-071b-45d5-8925-6ecc08889232/own-first-reveal.archive.json" node .agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs --project "$PWD" --request planos/tasks/revised-trap-prose-integration/task-05-request.json
```

For an independent fresh run, omit `DRYLAND_QA_SAVE_ARCHIVE`; the case starts with Jogar and makes its own saves. The historical archive above is optional resumption provenance, never a fresh-clone prerequisite. The adapter lacks a complete receipt-reuse dependency recipe, so request-evidence used ordinary preparation/collection (`incomplete-dependencies`); no collection receipt was issued for inspect-evidence. Inspection is recorded here under the skill's ordinary fallback. No optimization repair or additional gate was introduced.

Chrome 153.0.8010.53, Node 22.23.2, macOS arm64. Final PNGs are exactly 1280×720. All inventoried game bytes in the final run match the current candidate, including CommonEvents with preserved four-space indentation. The original unformatted first attempt is not used as candidate evidence.

Own reveal save: file 1, `encounter_intro`, sequence 14, payload SHA-256 `2c8f0ed1f5dd7b2cdaa276c9c4814a98e8a4625d5c064d19f7ea8a286aba569b`. Final own save: file 1, `council`, sequence 100, SHA-256 `f3fd834c942982c74d0a289e6ce996ccc200ef2eb8708f5ef5c7800e8dbc3955`. Both archives/storage exports remain with the run, unchanged. Save/load was navigation, not a persistence matrix.

### Viewed evidence

Selected images are preserved both in the raw run and the maintained [delivery directory](../../../docs/qa/deliveries/revised-trap-prose-integration/manifest.json). The manifest binds each image to its SHA-256, native input hashes and original report. No full input transcript or duplicate campaign report was added to maintained docs.

| Encounter | Viewed capture | Result |
| --- | --- | --- |
| A1 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A1.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A2 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A2.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A3 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A3.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A4 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A4.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A5 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A5.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A6 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A6.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A7 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A7.png) | PASS: full labels inside separate panels, no clipping/overlap |
| A8 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-A8.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B1 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B1.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B2 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B2.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B3 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B3.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B4 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B4.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B5 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B5.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B6 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B6.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B7 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B7.png) | PASS: full labels inside separate panels, no clipping/overlap |
| B8 | [Three options](../../../docs/qa/deliveries/revised-trap-prose-integration/choices-B8.png) | PASS: full labels inside separate panels, no clipping/overlap |

| Prose sample | Reason and observed result |
| --- | --- |
| [encounter.A7.01 / box 1](../../../docs/qa/deliveries/revised-trap-prose-integration/prose-1-encounter-A7-01-box1.png) | Two-line revised description; measured widest line 884 px in 1256 px content width. PASS: complete lines and indicator clear of controls. |
| [encounter.A7.01 / box 5](../../../docs/qa/deliveries/revised-trap-prose-integration/prose-2-encounter-A7-01-box5.png) | Final question separated at its paragraph boundary, 338 px. PASS: complete question and visible advance indicator. |
| [result.A7-1.success.01 / box 1](../../../docs/qa/deliveries/revised-trap-prose-integration/prose-3-result-A7-1-success-01-box1.png) | Existing accepted success with three lines, 949 px; taller than every newly split prose box. PASS: final line/indicator above controls. |
| [result.A8-1.success.01 / box 1](../../../docs/qa/deliveries/revised-trap-prose-integration/prose-4-result-A8-1-success-01-box1.png) | Wider three-line accepted success, 1014 px. PASS: complete prose, indicator inside window, no bust. |
| [death.A6.context / box 1](../../../docs/qa/deliveries/revised-trap-prose-integration/prose-5-death-A6-context-box1.png) | Revised death after the selected hero's farewell; two lines, 858 px. PASS: no bust, clipping or control overlap. |

Sample rationale: actual rendered font 26, line height 36, unchanged 1280×204 message window, native headers and `<br>` formatting are shared. All new prose boxes use at most two lines; the observed success samples retain already matching catalogue text and exercise the taller/wider three-line format encountered during the same navigation. They were not separate reruns of unchanged content. The widest revised-description sample and death sample exercise the newly authored two-line format. No new font/control code or distinct layout exists in unsampled revised successes/B1. This supports the approved shared-format sample; it does not certify every unviewed narrative box or visual pacing. No clipping defect required expansion.

### Approval, resources and delivery

V-004 PASS: the immutable sixteen-source catalogue matches PR25 original bodies/hashes; B1 is the sole prose exception under D-001. D-002–004 approve this prototype integration; D-005 governs waived sensors and D-006 the own-save chain above. This does not promote prototype copy to final canon or repair the known B6-3 ambiguity.

No preexisting server listened on 18726/18732 at inventory. The runner owned isolated Chrome contexts and the fixture server on 18732; personal browser/app sessions were not used. All three reports confirm browser/context/service cleanup, and a final process/port check found no owned runner/fixture process or listener. Test saves and evidence are retained; user saves were untouched.

Devlog material: the A7 description → options → matching success captures are available, plus A1's complete options and the separate A6 death sample. No staged extra campaign, asset generation or publication. All 16 choice images and five samples are retained as the necessary inspection record. Raw navigation captures/logs/source copies remain local-only under the ignored evidence tree; selected delivery copies were hash-verified before retention. No staging or commit.

Final closure: [independent review 02](review-02.md) is SHIP, with no confirmed open finding. `deslop` found no further code correction needed. The final candidate audit, scoped release verdict and exclusions are recorded in verification.md.
