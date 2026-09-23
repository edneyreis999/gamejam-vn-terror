---
id: "01"
status: completed
depends_on: []
verification_ids: [V-001/ENC]
---

# Task 01 — Integrate encounter prose and check the authored data

## Outcome and authority

Integrate approved descriptions, choices and successes without changing encounter behavior. Follow [spec](spec.md), [Narrativa](revised-trap-prose-integration.narrativa.md), [Programação](revised-trap-prose-integration.programacao.md) and reduced [verification](verification.md) under [ADR-003](adrs/adr-003-proportionate-prose-verification.md).

## Scope

- Edit event 001/page 1 of `rpg-maker/The Dryland Drowned/data/Map007.json` through `Map022.json`: sixteen descriptions/questions, 48 labels in their three representations, and twenty differing success bodies. The 28 matching successes may only need presentation splitting.
- Preserve all 48 failures, IDs, approach order/competencies, guards, branches, pictures/bindings/fonts, assets and domain/completion commands.
- Use the frozen catalogue as expected copy, independently of edited maps. Compare unchanged material with the recorded pre-edit baseline. Reuse the existing static comparison owner where practical; no new engine fixture or per-spec test runner is required.
- Update existing test copy expectations or single-box assumptions only if made obsolete by this edit. No extension of IT-005/049/051/082/083/084 or new engine assertions is required.

## Checklist

- [x] Record source/candidate revision and the map baseline before editing; confirm the [source mapping](source-analysis.md#native-ownership-and-actual-differences).
- [x] Materialize a scoped JSON transformation with event/passage preconditions. Preserve native grammar and avoid unrelated reformatting.
- [x] Integrate all sixteen descriptions, retaining both opening paragraphs and the final question in the same reading unit and existing reread path.
- [x] Update all 48 labels in Show Choices `102`, corresponding `402` headings and MessageCore `PictureTextChange` on pictures 50–52. Preserve branch indices, approach IDs and control tags.
- [x] Replace the twenty changed successes (A1-1/A1-2 and B3–B8); compare all 48 successes with the approved source, and all 48 failures with the pre-edit baseline.
- [x] Compare event structure: all new boxes stay inside the original reading boundary; ReadingEnd/completion remains after the body; unrelated commands retain their order and payloads. Preserve same-art/no-bust presentation and the description's reread target.
- [x] Parse changed JSON and review the scoped diff for altered bindings, missing/duplicate bodies and unexpected commands/files. Do not exclude entire command codes from comparison: only the specific text fields and added message boxes may differ.
- [x] Record checks, input revision, correspondence and structural results in Execution Notes and V-001/ENC. Hand final text/split locations to 05.

## Validation

Static only: source correspondence and structured before/after comparison. Normalize only documented presentation controls and line/box breaks; retain punctuation, word order and paragraph boundaries. This catches omissions, wrong associations, stale visible labels and accidental event edits; it does not claim runtime lifecycle verification.

No engine matrix, success/failure replay, control test or capture is required here. Task 05 owns the single visual pass.

## Execution Notes

Completed 2026-09-22. Baseline: `04d5253e81fcd22ec0c120b9e82bd17d2bf541c1`; all sixteen maps were unchanged from that revision before editing. Applied `python3 planos/tasks/revised-trap-prose-integration/integrate-prose.py --write encounters`, then verified with `--scope encounters` (exit 0) and `git diff --check` (exit 0). The first attempt stopped before writing at an overescaped font-prefix precondition; corrected the script to match the actual decoded native prefix and reran.

Full structured equality against the baseline transformed only at the declared text spans/fields confirms preserved map metadata, commands, 48 failures, bindings, branches and reading completion boundaries. Source correspondence: 16 descriptions (two paragraphs plus question), 48 labels in all three consumers, 48 successes (exactly 20 changed). The other 28 success message groups remain byte-equivalent as parsed commands. Paragraphs start separate native boxes; new prose uses at most two authored lines per box, 68-character word-boundary wrapping with explicit `<br>`. Choices use up to two lines at 65-character word boundaries, retaining FS[22]. Character limits are layout preparation, not visual evidence; task 05 must inspect actual rendering.

No engine/plugin/assets/save implementation changed. Candidate hashes are printed by the reproducible verification command. V-001/ENC PASS; visual verification remains task 05. No runtime process opened.

### Narrow test maintenance exposed by inspection

D-005 explicitly permits keeping obsolete copy/box assumptions current. Maintained the existing 30-entry `approved-trap-successes.json` oracle from the independent PR25 Git source (two changed A1 texts; all source hashes refreshed, no added cases). `encounters.mjs` now consumes the authored description boxes before the same final-input checks, and checks every existing initial/reread description box instead of treating its first `401` as the complete reading. Existing assertions/IDs remain; no skip or weakened expected outcome. `node --check rpg-maker/tests/suites/encounters.mjs` passed, and all thirty fixture texts/hashes were compared to PR25. Engine execution remains WAIVED under D-005; these maintained tests are not reported as executed passes.
