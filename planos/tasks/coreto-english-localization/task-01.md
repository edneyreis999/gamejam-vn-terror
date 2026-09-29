---
id: "01"
status: pending
depends_on: []
verification_ids: [V-006]
---

# Task 01 — Enable the native language option and table

## Outcome

The game boots with Coreto localization enabled and English as the default. A
General Options category holds the native language row and the native Text
Effects row, beside the four Áudio rows, with every Options label keyed.
`Languages.tsv` exists with the exact columns. The key convention, markup
model, glossary and source-map skeleton are ready for the translation tasks.

## Authority

- `spec.md`: RQ-001, RQ-002; "Translation data and authoring ownership",
  "Native option and configuration-only integration", "Coreto provider baseline"
- `verification.md`: V-006
- `coreto-english-localization.programacao.md`: allowed surfaces, CLI sequence
- `coreto-english-localization.uiux.md`: General category, native labels
- `adrs/adr-002-native-table-and-provider-integration.md`

## Scope

- Implementation: `js/plugins.js` parameters of Coreto_1_MessageCore
  (`Localization`), Coreto_1_OptionsCore (`Categories`) and
  Coreto_2_AniMsgTextEffects (`Options.Name`, `Options.AddOption`), through the
  `message parameters`, `options` and `ani-message parameters` CLI operations,
  after `--help` and `api describe` (D-017).
- Data/assets: `rpg-maker/The Dryland Drowned/Languages.tsv` created by
  `message language create --format tsv`.
- Docs: `source-map.md`, `glossary.md` and `translator-guide.md` beside this
  spec (skeletons: key convention, columns, editorial states).
- Tests: no new tests (D-009). Delete targets: none.
- Fixture and readiness owner: this task proves both options exist and the
  language persists, with a smoke observation on port 18737; full L10 belongs
  to 09.

## Checklist

- [ ] Pass the D-020 baseline gate: `localization_baseline` is recorded in
      `tasks.md`.
- [ ] Record the pre-change parameter values (`message parameters get`) and the
      Options categories.
- [ ] Set `Enable=true`, `LangFiletype=tsv`, `TsvFilename=Languages.tsv`,
      `DefaultLocale=English`, `Languages=[English, Portuguese]`, labels
      `English` / `Português`, `AddOption=true` and `Name=$[ui.options.language]`.
      Leave `LanguageImages` to task-06.
- [ ] Add a new General category (keyed `Name`) with the catalog `textLocale`
      and `textEffects` rows, keeping both rows' callbacks native. Text Effects
      starts on (native, D-022). Set AniMsgTextEffects `Options.AddOption=true` and
      `Options.Name=$[ui.options.text_effects]`.
- [ ] Key the Áudio category `Name` and its four rows' `TextStr` (which wins over
      `TextJS`); leave the rows' behavior unchanged.
- [ ] Create `Languages.tsv` via CLI; add the Options label keys so the table is
      not empty; run `message language validate --format tsv`.
- [ ] Write into the three docs: the key convention
      (`<area>.<scene>.<speaker|passage>.<n>`, `ui.*`, `sys.*`, `choice.*`), the
      D-018 markup model, the D-021 cell rules (no tabs or straight quotes,
      `<I>` for voices, effect/casing policy), the source-map columns (including
      treatment), and the editorial states (`draft`, `reviewed`, `accepted`).
- [ ] Smoke on `npm start -- --port 18737` from the worktree: open Options from
      the title, see both General rows with localized labels, switch language
      and reopen, toggle Text Effects. Record the observation, not as L10.
- [ ] Record V-006 (changed parameter paths versus the baseline) in Execution
      Notes and the verification matrix.

## Validation

Execution mode/reference: read-only configuration inspection (V-006).
Invalidates/reuses: provider-baseline changes from the migration owner reopen V-006.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-006 | `message parameters get`, `options lists list --path /Categories`, `core validate --json`, `git diff <localization_baseline> -- js/plugins.js` | Localization enabled with the two languages, TSV and English default; General category with keyed language and Text Effects rows beside the four keyed Áudio rows; every changed parameter path listed with reason; no plugin added/reordered; Coreto sources and bundles unchanged | Execution Notes |

## Execution Notes

