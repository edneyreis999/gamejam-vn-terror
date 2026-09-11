---
id: "04"
status: completed
depends_on: ["03"]
verification_ids: [V-001]
---

# Task 04 — Migrate remaining dialogue and retire automatic bust inference

## Outcome

Every originally bust-bearing box uses editable native commands, including farewells, lovers and epilogues. The automatic name-to-bust implementation is removed, while content and every unrelated picture owner remain intact.

## Authority

- [Spec](spec.md): RQ-001, RQ-003, RQ-007; [verification](verification.md): V-001, D-02/D-03/D-05/D-08.
- [Inventory](inventory.md), [source evidence](source-evidence.json), [Programação](vn-picture-busts-dialogues.programacao.md), [Technical Art](vn-picture-busts-dialogues.technical-art.md).
- [ADR-003](adrs/adr-003.md), canonical GDD and [shared execution contract](tasks.md).

## Scope

- Implementation/data: CommonEvents farewell.H1–H8, four lover discovery sections and epilogue.H1–H8; CE 40–44/46–52/59–63 callers as actually needed. Extend existing migration phases and refresh the native manifest.
- EventBridge: remove automatic speakerBust construction, bustToken and bust-specific command101 behavior after all 63 sites are migrated; preserve input aliases and independent picture systems.
- Assets: existing Pérola/Floraí prisons and all hero art, unchanged bytes. Native commands contain calibrated one-person framing and bounded transitions.
- Tests: `rpg-maker/tests/suites/content.mjs`, `native-inventory.mjs`, `sacrifice.mjs`, `discovery.mjs`, `memorial.mjs`, `endings.mjs` and `native-death-context.mjs`; existing helpers and manifest as necessary.
- Fixture/readiness owner: independent preservation comparison against 01, per-box source locators, native one-person/constrained-art cases, and legal recipe inputs for remaining directed variants.
- QA/docs: update the current coverage ledger, leaving the dated original inventory intact; prepare evidence for existing encounter/discovery/closing scenario owners.
- Delete targets: named old EventBridge symbols and the superseded bust-specific alias, plus stale JavaScript-authorship claims when documenting changes. No file, PNG, section or native ID deletion.

## Checklist

- [x] Confirm 02/03 migrated all tavern and Council targets, then identify the remaining 20 sections / 20 boxes from the original inventory.
- [x] Author one-person farewell, lover and epilogue recipes. Keep committed sacrifice before farewell, exit before contextual death narration, preserve prisons, and avoid carrying epilogue portraits into the next hero/credits.
- [x] Preserve piece receipt/assembly, memorial, formation/candidates and all six named exclusions. Council challenge remains the only added narrated staging site.
- [x] Remove the complete automatic bust/name inference path and temporary migration coexistence logic. Inspect all remaining picture-18 references and retain only independently justified cleanup.
- [x] Compare the final authored data to the immutable baseline: all 258 identities/metadata/statuses, 282 Show Text boxes/labels/text/order, choices and existing IDs preserved. Account for every original 63/103 target and the separately identified Council challenge staging.
- [x] Validate helper allocation and full transitive grammar; verify no unintended runtime generator or duplicate editable JavaScript catalog owns the new layout. Preserve subsequent manual edits through guarded migration preconditions.
- [x] Run native regression checks for farewell/death, both lover discovery orders, eligible epilogues/credits and unchanged unrelated picture systems. Keep newly required cases in their canonical suites.
- [x] Revise native data, complete V-001's coverage ledger and static comparison, and continue without user approval.

## Validation

Execution modes: structured static comparison plus focused native integration; directed scenario completion is consolidated by 09. Run `node rpg-maker/tools/validate-content.mjs --json`. Initial native filter: `node --test --test-name-pattern='IT-(012|047|052|053|055|056|057|058)' rpg-maker/tests/campaign.test.mjs`; include justified newly registered cases.

| Verification ID | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-001 | Independent parsed-data and source comparison | 63/103 fully migrated; 258/282 preserved; challenge staging accounted separately; automatic builder absent | task-04/<run-id>/preservation.json and coverage-ledger.json |
| D-02/03/05/08 contribution | Canonical native regression and scoped visual observation | One-person boundaries and unrelated pictures preserved | task-04/<run-id>/native-results/ |

Invalidated by any native content/helper/caller change, automatic rendering reintroduction, assets or cleanup changes. Compare preserved facts directly to baseline, not to output emitted by the same migration generator. Regenerating the manifest does not prove preservation.

## Execution Notes

In progress 2026-09-11. Guarded remaining phase requires the exact Council receipt hash,109 Common Events and147 variable entries. It migrated farewell.H1–H8, epilogue.H1–H8 and the four lover warning/second sections (20/20). Farewell/epilogue reuse native hero entry and single-exit helpers; lover helpers109–111 use right slot63, (955,855),52% base, no entrance/focus/exit displacement, preserving unchanged Church/Figtree discovery backgrounds and narrative confinement. No art or narrative detail was added. Single-section ownership closes after native collective exit and root termination, before narration/receipt/next hero.

Removed speakerBust, bustToken and the entire bust-specific command101 alias. No replacement name-to-image map exists in runtime. Source revision mz-20260911-busts-complete-01. Migration receipt: task-04/migration-remaining/receipt.json.

Independent verify-preservation.mjs --complete compared immutable originals:63/103 migrated plus challenge staging;258 identities/282 boxes, metadata/statuses/text/choices retained. All1234 non-edited project files (engine/vendors/plugins.js/assets/maps/rules and other data) retain baseline hashes. Reports: task-04/preservation-20260911.json and preservation-with-assets-20260911.json. The named exclusions are covered by exact unchanged command comparisons, not only catalog counts.

Updated obsolete runtime expectations in sacrifice, discovery and epilogue suites to owned60/63 and full reserved-slot absence where appropriate. SharedUI's obsolete HIDE sprite18 check now checks60; its behavioral validation belongs to06. Remaining slot18 references test absence or reject foreign IDs, while original native cleanup ranges are retained for unrelated surfaces. Focused native regression is running; no fullV001 runtime verdict yet.

Completed 2026-09-11: `task-04/2026-09-11T07-55-13-629Z` passed all8 targeted native regressions and CLI: IT012/047/052/053/055/056/057/058. They exercise sacrifice/Continue, both discovery orders, all-eight epilogues, credits, memorial and unchanged native content. Scoped images inspected: Griznik farewell, Bimbren and Draska epilogues; faces and text remain visible on unchanged backgrounds. Full lover/art/temporal acceptance stays V007/09. Self-review/deslop and diff whitespace checks passed, with no additional runtime generator. V001's preserved/fully migrated ledger is PASS for this source; later native edits require fresh comparison. All owned test resources closed.
