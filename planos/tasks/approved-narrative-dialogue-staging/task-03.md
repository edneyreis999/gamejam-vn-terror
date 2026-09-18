---
id: "03"
status: completed
depends_on: ["01"]
verification_ids: []
supporting_verification_ids: ["V-001", "V-002", "V-003", "V-005", "V-007", "V-008"]
---

# Task 03 — Thirty native trap-success replacements

## Outcome

Each of A1–A8/B1–B2's three successful approaches displays exactly its approved paragraph over the existing encounter image, with one semantic completion after the last native box. All other trap text and mechanics remain unchanged.

## Authority

- [spec.md](spec.md): RQ-001/010/011/012.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- [PR #18 mapping](source-analysis-pr18.md), [trap boundary ADR](adrs/adr-002-trap-prose-integration-boundary.md), canonical GDD §§10/12/14 and the pinned PR #18 catalogue.
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/data/Map007.json` through `Map016.json`, event001 success bodies only.
- Preservation surface: Maps017–022 (B3–B8), all current approach labels and PictureChoices annotations, descriptions, failure/death text, image references, approach IDs and branches.
- Data/assets: pinned PR #18 ten populated catalogue files as source; six empty files remain source markers, never blank runtime replacements. No new image/audio asset.
- Tests: `rpg-maker/tests/suites/encounters.mjs` (IT-051 and closest result cases); `content.mjs` for existing source/semantic checks only. Reuse canonical encounter/campaign helpers and manifest.
- Fixture/readiness owner: this task owns all 30 legal encounter/approach fixtures, native input resolution, box-boundary/seen/progression traces and preservation comparison against the pre-change baseline.
- QA/docs: source-to-result ledger keyed by encounter/approach/passage, plus canonical test evidence; 09 consumes it for S-03/S-04.
- Delete targets: only the 30 replaced success bodies inside their existing branches. No other text, source marker, CE or file deletion.

## Checklist

- [x] Verify the pinned PR #18 source and capture the pre-change structured map/text/choice/art baseline. Map source sections 1/2/3 to existing approach IDs 1/2/3 and result.<encounter>-<index>.success.01; do not replace choices with source headings.
- [x] Replace exactly the 30 supplied success paragraphs. Preserve words, punctuation and order; split native lines/boxes only for readability. Keep one passage and one owning CaptureContext/ReadingComplete pair for each result.
- [x] Keep the same encounter artwork and no narrator/hero bust. Do not rewrite other prose, fill B3–B8, add an acting hero or expose competencies. Preserve current success/lethal-failure, sacrifice, route progress and checkpoint semantics.
- [x] Run S-03's complete 30-result native-engine matrix through choices. At each first/middle/final box, observe reading/progress before and after acknowledgement; no early seen mark, repeated approach or double consequence. Include held-input and partial/seen-unit controls.
- [x] Compare untouched labels, descriptions, failure/death text, B3–B8 and image references to baseline. Use the pinned source as the independent prose oracle, not expectations extracted solely from candidate maps.
- [x] Run focused canonical cases and record S-03 as native integration with exact variant results and render readiness. Supply long-result entry recipes for S-04 and checkpoint entry recipes/traces for 08/10; task 08 owns the actual two-file save fixtures.

## Validation

Execution mode/reference: Owns S-03 native-engine integration, all 30 successes with first/middle/final box layouts represented and preserved B3–B8/failures checked. S-04's actual expedition and S-10's directed result Continue belong to 10.

Invalidates/reuses: Reuse reviewed canonical fixtures after the new prologue plan in 01. Source catalogue, Maps007–022, Rules, text layout or controls changes invalidate affected correspondence/completion evidence. Never count synthetic encounter setup as a played campaign.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-03/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-001/008 contribution | Source-to-native structured comparison and unchanged-field diff | Exactly 30 faithful replacements; headings stay source-only; all excluded content retained | trap-correspondence |
| V-002/003/005/007 contribution; S-03 | Focused encounters/content plus native 30-case matrix | Chosen result only, native same-art/no-bust, final-box completion once, mechanics unchanged | trap-native-matrix |

## Execution Notes

Scoped implementation and technical validation completed; remaining assigned sensors are below.


### First native matrix

`node --test --test-name-pattern='IT-051|IT-082|IT-083|IT-084' rpg-maker/tests/campaign.test.mjs`: 4/4 PASS, exit0, 313.2s. All30 new successes plus preserved failures/B3–B8 crossed real choices and native completion; transcript comparison uses the pinned-source fixture, independent of candidate prose. All commands outside the30 text spans are structurally unchanged; Maps017–022 remain byte-identical to HEAD. Captures of A1/B2 revealed an orphan-word second box; the task-local script now balances lines across boxes without changing words, punctuation or unit count. Those affected tests rerun in the02/03 frozen batch. Initial script path enumeration was corrected to NUL-delimited Git paths for accented filenames; replay accepts only baseline or exact previous/current generated layouts.


### Scoped closure — 2026-09-18

`node --test --test-name-pattern='IT-081|IT-012|IT-082|IT-083|IT-084' rpg-maker/tests/campaign.test.mjs`: 5/5 PASS, exit 0, 656.7 s. Log: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-02/hero-and-results.log`; individual native receipts/captures remain in the canonical `init-rpg-maker-mz` evidence tree. This is native integration with isolated domain fixtures, not directed gameplay.

The balanced layout passed all 30 changed success paragraphs and the preserved failure/B3–B8 matrix. Pinned-source transcript comparisons, unchanged state before the final box and one completion were observed. B2’s balanced capture was inspected with readable text and no orphan-only final box. Under ADR-G004/G006, long-result held/seen controls remain with task 08’s canonical controls and task 10 S-04/S-11; directed result Continue remains S-10.

No vendor/engine edits, dependency, commit or remote publication. Test-owned browser/server/profile teardown completed. Aggregate delivery flags remain false until their owners finish.
