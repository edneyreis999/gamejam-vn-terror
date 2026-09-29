---
id: "01"
status: completed
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

- [x] Pass the D-020 baseline gate: `localization_baseline` is recorded in
      `tasks.md`.
- [x] Record the pre-change parameter values (`message parameters get`) and the
      Options categories.
- [x] Set `Enable=true`, `LangFiletype=tsv`, `TsvFilename=Languages.tsv`,
      `DefaultLocale=English`, `Languages=[English, Portuguese]`, labels
      `English` / `Português`, `AddOption=true` and `Name=$[ui.options.language]`.
      Leave `LanguageImages` to task-06.
- [x] Add a new General category (keyed `Name`) with the catalog `textLocale`
      and `textEffects` rows, keeping both rows' callbacks native. Text Effects
      starts on (native, D-022), and its `ON`/`OFF` stays as an intentional
      control label (D-023f). Set AniMsgTextEffects `Options.AddOption=true` and
      `Options.Name=$[ui.options.text_effects]`.
- [x] Key the Áudio category `Name` and its four rows' `TextStr` (which wins over
      `TextJS`); leave the rows' behavior unchanged.
- [x] Options procedure (no list-insert operation exists): read the current
      `/Categories` (`options parameters get --path /Categories --json`, noting
      its hash). Take the `textLocale` and `textEffects` rows from the plugin
      defaults (`options api describe /Categories --json`). Build the new array
      in a JSON data file in the session scratchpad, never in the repository
      (D-016), then write it with `options parameters set --path /Categories
      --input <file> --expected-hash <hash>` (`--dry-run` first). Confirm that
      the Áudio rows differ only in `Name`/`TextStr`.
- [x] Create `Languages.tsv` via CLI. It holds the 28-language template: reduce
      the header to exactly `Key`, `English`, `Portuguese` and delete the sample
      rows `Greeting`, `Farewell` and `Wow`. Add the Options label keys, then run
      `message language validate --format tsv` and confirm `languages` is
      `["English","Portuguese"]`.
- [x] Write into the three docs: the key convention
      (`<area>.<scene>.<speaker|passage>.<n>`, `ui.*`, `sys.*`, `choice.*`), the
      D-018 markup model, the D-021 cell rules (no tabs or straight quotes,
      `<I>` for voices, effect/casing policy), the source-map columns (including
      treatment), and the editorial states (`draft`, `reviewed`, `accepted`).
- [x] Smoke on `npm start -- --port 18737` from the worktree: open Options from
      the title, see both General rows with localized labels, switch language
      and reopen, toggle Text Effects. Record the observation, not as L10.
- [x] Record V-006 (changed parameter paths versus the baseline) in Execution
      Notes and the verification matrix.

## Validation

Execution mode/reference: read-only configuration inspection (V-006).
Invalidates/reuses: provider-baseline changes from the migration owner reopen V-006.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-006 | `message parameters get`, `options lists list --path /Categories`, `core validate --json`, `git diff <localization_baseline> -- js/plugins.js` | Localization enabled with the two languages, TSV and English default; General category with keyed language and Text Effects rows beside the four keyed Áudio rows; every changed parameter path listed with reason; no plugin added/reordered; Coreto sources and bundles unchanged | Execution Notes |

## Execution Notes

Executed 2026-09-29 in the `coreto-english-localization` worktree, on top of
`localization_baseline` d17d886 (HEAD 92dc14f plus the uncommitted review-04
spec amendments, which were kept untouched).

### Changed parameter paths (V-006, D-017)

| Plugin | Path | Before | After | Reason |
| --- | --- | --- | --- | --- |
| Coreto_1_MessageCore | `/Localization/Enable` | `false` | `true` | RQ-001: turn on the native table |
| Coreto_1_MessageCore | `/Localization/Languages` | 28 template languages | `["English","Portuguese"]` | RQ-001: the two supported languages |
| Coreto_1_MessageCore | `/Localization/Name` | `Text Language` | `$[ui.options.language]` | Keyed language-row label |
| Coreto_1_OptionsCore | `/Categories` | `[Áudio]` | `[General, Áudio]` | New General category (index 0) with the catalog `textLocale` and `textEffects` rows, callbacks native |
| Coreto_1_OptionsCore | `/Categories/0/Name` (new) | — | `$[ui.options.category.general]` | Keyed category label |
| Coreto_1_OptionsCore | `/Categories/1/Name` | `Áudio` | `$[ui.options.category.audio]` | Keyed category label |
| Coreto_1_OptionsCore | `/Categories/1/List/0–3/TextStr` | `Música`, `Ambiente`, `Temas`, `Efeitos` | `$[ui.options.audio.bgm/bgs/me/se]` | Keyed row labels; `TextStr` wins over `TextJS` |
| Coreto_2_AniMsgTextEffects | `/Options/Name` | `Text Effects` | `$[ui.options.text_effects]` | Keyed Text Effects label |

Already correct at baseline, left unchanged: `LangFiletype=tsv`,
`TsvFilename=Languages.tsv`, `DefaultLocale=English`, `AddOption=true`,
labels `English`/`Português`, AniMsgTextEffects `Options.AddOption=true`.
`LanguageImages` left to task-06.

The two catalog rows came from `options api describe /Categories` (UI
category). The set operation rejects the catalog-only fields `Accessibility`,
`Functions` and `Data` (all empty in the catalog), so they were dropped. The
Áudio rows differ from the baseline only in `Name`/`TextStr` (checked by a
parsed comparison). The row `ShowJS` reads `Imported.VisuMZ_1_MessageCore`,
`VisuMZ.MessageCore.Settings` and `VisuMZ.AniMsgTextEffects.Settings`; the
Coreto bundles define these aliases, and both rows appear at runtime.

The CLI rewrites each touched plugin entry in `js/plugins.js` as one compact
JSON line (its native serialization). A parsed comparison against d17d886
shows: same plugin order, same status flags, and no parameter change outside
the rows above. `git diff d17d886 -- coreto 'rpg-maker/The Dryland Drowned/js/plugins' 'rpg-maker/The Dryland Drowned/data' index.html package.json`
is empty. `core validate --json`: `valid: true`, one pre-existing warning
(`/QoL/OpenConsole` has no effect in the browser).

Title clause of V-006 (`gameTitle`, `<title>`, `window.title`): still
“Afogados em Terra Seca”; task-02 owns the change, so V-006 closes after
task-02.

### Table

`message language create --format tsv` wrote the 28-language template with
`Greeting`/`Farewell`/`Wow`. It was reduced to exactly `Key`, `English`,
`Portuguese`, the sample rows were removed, and the eight `ui.options.*` keys
were added. `message language validate --format tsv --json`: `keys: 8`,
`languages: ["English","Portuguese"]`, sha256 `91e3402116bf5936…`.

### Docs

`source-map.md` (key convention, D-018 markup model, columns, editorial
states, the eight Options rows), `glossary.md` (name rules, eight UI terms),
`translator-guide.md` (table format, D-021 cell rules, treatment policy,
treated-key list).

### Smoke observation (not L10)

Own server `npm start -- --port 18737 --no-open` (PID 9211, confirmed with
`lsof`), a fresh Playwright browser context with empty storage, 1280×720:

- First boot: `ConfigManager.textLocale = English`, `textEffects = true`, no
  stored config; the title opens Options through the CE002 choice.
- Options shows General / Audio; General holds Language (English selected,
  Português beside it) and Text Effects (ON); Audio shows Music, Ambience,
  Jingles, Sound Effects.
- Right on Language → labels refresh live to Geral / Áudio / Idioma /
  Efeitos de texto; Áudio rows Música, Ambiente, Temas, Efeitos.
- Text Effects Left/Right/Left toggles false/true/false; stored config
  reads `textLocale: Portuguese`, `textEffects: false`.
- After a reload: Portuguese and Text Effects off retained. Switching back
  gives English with Text Effects on.
- Out of scope for this task, observed: the title warning, the choices and
  the Options button assist (`Q/W:Trocar categoria…`) are still Portuguese
  (task-02). The console shows repeated engine `CanvasTextAlign 'undefined'`
  warnings from `rmmz_core.js:1676`, with no errors.

Captures: `.playwright-mcp/t01-*.png` in the original checkout (raw, not
evidence for L10).

### Tests

No new tests (D-009). Existing suites were not run for this read-only config
task. Note for QA: `rpg-maker/tests/helpers/native-chrome.mjs` defaults to
port 18726, the user's origin, so any run of this increment must set
`DRYLAND_QA_PORT` to a free port other than 18726.

