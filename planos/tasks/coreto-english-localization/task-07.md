---
id: "07"
status: pending
depends_on: ["02", "03", "04", "05", "06"]
verification_ids: [V-001]
---

# Task 07 — Close corpus coverage and translator handoff

## Outcome

The whole player-facing corpus is keyed, both columns are complete, no PT prose
remains inline in events, and the translation package (source map, glossary,
guide, README workflow) is ready for independent evaluation and editorial review.

## Authority

- `spec.md`: RQ-001, RQ-004; "Failure, validation and packaging", README update
- `verification.md`: V-001; stale-assertion rule for existing tests

## Scope

- Checks over `Languages.tsv`, all Maps, CommonEvents, System and plugin text.
- Docs: finalize `source-map.md`, `glossary.md`, `translator-guide.md`; update
  `rpg-maker/README.md` with the native table-editing workflow.
- Existing tests in `rpg-maker/tests/`: select relevant IDs from
  `test-manifest.json`; report assertions on literal PT strings as stale
  separately from real regressions. Do not edit them into a pass.
- Delete targets: none.

## Checklist

- [ ] `message language validate --format tsv`; `core validate --json`.
- [ ] Read-only review: every `101/401/102/402/105/405` payload and
      PictureTextChange is a key plus native control tags and block wrappers, a
      preserved proper name, or documented non-player text (D-018). Show Text is
      keyed per block. Every key exists and no cell is empty. The table header is
      exactly `Key`, `English`, `Portuguese`, with no template sample key. Both
      columns of a key carry the same set of `\V[n]`, `<I>`,
      `\EFFECT`/`<CLEAR EFFECTS>` and casing tags; `<br>` is free per language.
      No cell has a tab or straight `"`. No `\n` remains in picture text.
- [ ] Recheck V-006 against `localization_baseline`: all changed parameter
      paths are listed; the registry, Coreto sources and bundles are unchanged.
- [ ] Source map complete with hashes against current native baseline.
- [ ] Run selected existing tests from the baseline revision; classify failures.
- [ ] Finalize the list of treated keys (italic, effects, casing) for the
      editorial packet.
- [ ] Update README; freeze the candidate revision for 08/09.

## Validation

Execution mode/reference: V-001 native CLI validation and read-only source review.
Invalidates/reuses: any later copy/table change reopens V-001.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001 | CLI validate + full source/table review | Every source mapped or justified; no missing/empty keys; tokens and choices correct | Execution Notes; `verification.md` |

## Execution Notes

