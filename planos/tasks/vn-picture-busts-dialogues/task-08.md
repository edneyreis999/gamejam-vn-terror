---
id: "08"
status: completed
depends_on: ["07"]
verification_ids: []
---

# Task 08 — Plan the remaining directed QA and visual coverage

## Outcome

One incremental QA plan maps every remaining variant and stale sensor to a concrete legal journey or labeled integration fixture, reuses valid evidence, and can be executed without approval pauses or guessed setup.

## Authority

- [Verification](verification.md): all nine sensors and D-01–D-10; [spec](spec.md) RQ-001–RQ-008.
- [UI/UX](vn-picture-busts-dialogues.uiux.md), [Technical Art](vn-picture-busts-dialogues.technical-art.md), [Programação](vn-picture-busts-dialogues.programacao.md), [ADR-003](adrs/adr-003.md).
- `docs/qa/README.md`, `docs/qa/guides/native-mz-cycle.md`, current journeys/scenarios/bugs/templates and [shared execution contract](tasks.md).
- Activate `rpg-maker-mz-qa-report`; this is the planning half of the sole QA tail pair.

## Scope

- Dependencies: all implementation leaves, currently task 07. If implementation decomposition changes, update this edge to include every leaf.
- Existing journey owners: `J-mz-complete-campaign`, `J-mz-recovery-export`, `J-mz-qa-accessibility` and `J-mz-creative-review` under `docs/qa/journeys/`.
- Existing scenario owners: FOR-mz-formation-roster, ENC-mz-encounter-sacrifice-retreat, CAM-mz-discovery-closing, ACC-mz-hide-keyboard-qa, LOC-mz-session-recovery-export and ART-mz-visual-audio-runtime under `docs/qa/scenarios/`.
- Planned new documents: `docs/qa/guides/vn-picture-busts-dialogues.md` and `docs/qa/charters/CH-vn-picture-busts-dialogues.md`; update existing taxonomy instead of duplicating campaign scenario files. These paths do not exist merely because they are named here.
- QA tracker impact: local bug registry and discipline ownership only; no remote cards/publication. Human creative/audio baseline reviews are not new gates for this visual increment.
- Fixture/readiness owner: planning consumes 01–07 fixture/recipe manifests, verifies available directed adapter/driver routes and captures missing preparation in the original task owner. No runtime mutation or new game implementation here.
- Delete targets: none. Preserve historical reports, passes and source provenance.

## Checklist

- [x] Read current task results and actual source fingerprints; distinguish passed, stale, incomplete and blocked evidence. Preserve original V ownership.
- [x] Extend the six existing scenario owners with this increment's observables and links, keeping historical verdicts separate from new pending coverage. Do not reset or reuse an old PASS as new evidence.
- [x] Materialize the incremental guide/charter using repository templates and personas. Record exact maps, legal entry/actions, seed provenance, current revision, browser/input/motion/viewport setup, permitted fixture failures and teardown.
- [x] Transport every D-01–D-10 variant from verification into resumable lots: all-eight tavern; farewell/discovery/closing; Council roster/Andirá; controls/Continue/exclusions; isolated 2x2/interruption. Mark fixture observations distinctly from directed journeys.
- [x] Make a per-hero/per-family and per-Council-slot ledger. Include both discovery orders, every hero opinion/epilogue across legal runs, 0/1/2/3 eligible Council heroes, no-epilogue/terminal variants and both final choices.
- [x] Plan V-007 inspection for all twelve assets at 1280×720 and a larger effective game area, normal/reduced motion, maximal ensemble, constrained reflection/prisons, HIDE and same-speaker continuity. Temporal claims require temporal evidence.
- [x] For each lot name retained evidence, invalidation dependencies, primary verifier, exact driver case/extension, completion checkpoint and next executable lot. A missing existing route returns to its owning implementation task, not to the user for approval.
- [x] Apply ADR-005's native save reuse strategy: plan one genuine producer prefix per required roster/history, capture useful Council/pre-ending and terminal checkpoints after the native revision stabilizes, and reuse isolated copies for compatible suffix checks. Preserve full-run provenance and distinct route/death coverage; record native revision/source hashes and cache invalidation. Do not require a new full campaign merely to repeat a suffix that a compatible archived save can reach.
- [x] Keep optional human refinement explicitly non-blocking. Reuse task 07's single brief editor editability check under ADR-004; do not add per-hero/per-scene editor checks or save/reopen/export/playtest cycles. Resolve browser/fixture availability as technical facts; never ask for an approval that ADR-003 already supplies.
- [x] Link the new plan and scenario mapping from verification.md, validate coverage/readiness, mark only planning complete, and continue directly to 09.

## Validation

Execution mode: filesystem/source/evidence inspection and QA plan validation; no live gameplay PASS is produced. The guide must bind D-01–D-10 to the installed directed executor, `rpg-maker/qa/directed-adapter.mjs`, existing `native-journeys.test.mjs` / `native-surfaces.test.mjs` extensions and approved labeled integration fixtures.

| Check | Expected observable | Proposed evidence |
| --- | --- | --- |
| Coverage/readiness audit | Every scenario variant and remaining sensor assigned once; fixture/legal boundaries explicit | task-08/<run-id>/coverage-readiness.json |
| Plan/links/provenance | Executable setup, fresh evidence references, exact scenario owners, no approval dependencies | Incremental guide/charter and verification links |
| QA tail | Planning depends on every implementation leaf; 09 depends on planning | tasks.md and task frontmatter |

Changing source, fixtures or selected variants invalidates only the affected lots; replan those rather than duplicating the whole cycle. Human absence never invalidates readiness under ADR-003. No canonical game test or browser execution is needed to prove this planning outcome.

## Execution Notes

In progress2026-09-11. Task07 implementation/fixtures are available; editor evidence remains technically blocked. Planning preserves that gap and continues independent lots under ADR003/004.

Completed2026-09-11: guide/charter materialized; all six scenario owners and four existing journeys carry incremental scope without rewriting historical PASS/human acceptance. coverage-readiness-20260911/coverage-readiness.json replays all eight versioned recipes through current CampaignRules and confirms21eligible hero/slot pairs plus every opinion hero. D01–D10 map to exact driver/fixture lots, both route orders/endings,0/1/2/3Council, all72tavernboxes, farewell/epilogue/terminal/exclusions and both areas/motion. Source filenames/case syntax are validated. Bank producers capture nativeCouncil payload/index; preboot consumers enforce unchanged origin/revision/source/master and measure phases separately. Raw archives are provenance, not fabricated checkpoints.

Task07 editor gap remains V008 BLOCKED_TECHNICAL; no editor loops or approval added. V007 prison visibility has its own mandatory inspection and cannot inherit PASS from zero offsets. Tasks03/05 fixture readiness has been extended through the existing directed journey driver and a read-only composition observer; no campaign/runtime mutation. Task09 full registered suite is running in a frozen isolated copy; directed browser lots wait for its port to be released. Planning PASS does not claim those runs passed.
