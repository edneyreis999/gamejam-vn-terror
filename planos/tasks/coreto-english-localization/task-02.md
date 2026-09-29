---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: []
---

# Task 02 — Localize interface, system and title flow

## Outcome

Menus, Options, Save/Load, message-console controls, reachable System terms and
database display names, and the title content warning/entry (CE002) show in the
selected language. The browser title is the static “The Dryland Drowned”
(D-019).

## Authority

- `spec.md`: RQ-001, RQ-004; "Complete text surfaces" (System terms, plugin
  text parameters, game title)
- `coreto-english-localization.uiux.md`, `coreto-english-localization.programacao.md`
- `verification.md`: supports V-001 (closed in 07) and L10 (run in 09)

## Scope

- Data: `data/System.json` terms and `gameTitle` (static English, never keyed),
  the `index.html` `<title>`, the `package.json` `window.title` (D-022), reachable database display names, and
  `data/CommonEvents.json` CE002.
- Coreto text parameters set to `$[key]` (D-017): Save `Save.VocabLockedSaveSlot`,
  `SaveConfirm.VocabSaveFailure`, `SaveConfirm.VocabLoadFailure`,
  `AutosaveConfirm.VocabAutosaveSuccess`, `AutosaveConfirm.VocabAutosaveFailure`,
  `SaveMenu.LatestText` (`NEW!`, D-023f);
  ExtMessageFunc `Buttons.Options`; Options
  `OptionsSettings.buttonAssistCategory`. Also key any other visible string
  field found by the inventory, recorded first.
- Table: `ui.*`, `sys.*`, `title.*` keys in `Languages.tsv`; rows in `source-map.md`.
- Out of scope: symbols, filenames, command names and dynamic browser-title
  switching. Change callback parameters only if no string field covers a
  visible text (D-017). Unused stock battle/database text is inventoried as
  unreachable, as is `SaveConfirm.VocabSaveSuccess`: the game has no
  manual-save route. The Text Effects `ON`/`OFF`, `FAST` and `HIDE` are
  recorded in `source-map.md` as intentional control labels, not keyed
  (D-023f).
- Tests: none new. Delete targets: none.

## Checklist

- [x] Pass the D-020 baseline gate.
- [x] Inventory reachable interface strings from the running candidate and data;
      list unreachable stock text as such in `source-map.md`.
- [x] Key each reachable string; PT column verbatim, EN translated per glossary.
- [x] Replace CE002 text via `message text set` (common-event target where
      supported; otherwise native data editing), preserving branches and saves
      variants.
- [x] Set `gameTitle`, `<title>` and `package.json` `window.title` to “The Dryland
      Drowned” (not a key).
- [x] Record every changed parameter path for V-006. Record any string with no
      parameter, tag or callback route as a gap for Edney.
- [x] `message language validate`, `core validate`, JSON parse, focused diff.
- [x] Smoke both languages on port 18737: title → Options → Save/Load → autosave
      notice → message-console Options button; browser tab title.

## Validation

Execution mode/reference: supporting static checks; runtime proof in 09 (L10).
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + source-map review | All interface keys present, no empty cells | Execution Notes |

## Execution Notes

Executed 2026-09-29 in the worktree on top of task-01.

### Pilot (D-016)

`terms.messages.file` → `$[sys.file]` and SaveCore `VocabLockedSaveSlot` →
`$[ui.save.locked_slot]` first; after a reload the New Game slot picker read
“Choose a file to start a new campaign.” and “File 1…6”. The rest was applied
after that.

### Changed parameter paths (V-006)

| Plugin | Path | Before | After |
| --- | --- | --- | --- |
| Coreto_1_SaveCore | `/Save/VocabLockedSaveSlot` | Escolha um arquivo para iniciar uma nova campanha. | `$[ui.save.locked_slot]` |
| Coreto_1_SaveCore | `/SaveConfirm/VocabSaveFailure` | Não foi possível salvar. | `$[ui.save.save_failure]` |
| Coreto_1_SaveCore | `/SaveConfirm/VocabLoadFailure` | Esta campanha não pode ser carregada. | `$[ui.save.load_failure]` |
| Coreto_1_SaveCore | `/AutosaveConfirm/VocabAutosaveSuccess` | Salvo automaticamente. | `$[ui.save.autosave_success]` |
| Coreto_1_SaveCore | `/AutosaveConfirm/VocabAutosaveFailure` | Não foi possível salvar. | `$[ui.save.autosave_failure]` |
| Coreto_1_SaveCore | `/SaveMenu/LatestText` | NEW! | `$[ui.save.latest]` |
| Coreto_2_ExtMessageFunc | `/Buttons/Options` | Configurações | `$[ui.console.options]` |
| Coreto_1_OptionsCore | `/OptionsSettings/buttonAssistCategory` | Trocar categoria | `$[ui.assist.switch_category]` |
| Coreto_0_CoreEngine | `/ButtonAssist/OkText` | Selecionar | `$[ui.assist.ok]` (found by the inventory) |
| Coreto_0_CoreEngine | `/ButtonAssist/CancelText` | Voltar | `$[ui.assist.cancel]` (found by the inventory) |

All through the CLI (`save`, `ext-message`, `options`, `core parameters
set`). Reason for every row: RQ-001, player-visible text keyed (D-017). No
callback parameter changed.

### Native data edits

- `data/System.json` (no CLI operation for System terms; edited as data,
  round-trip identical to the original 4-space format):
  `terms.messages.file/loadMessage/saveMessage/autosave` → `$[sys.*]`;
  `gameTitle` → “The Dryland Drowned”.
- `index.html` `<title>` and `package.json` `window.title` → “The Dryland
  Drowned” (D-019, D-022).
- CE002: choices 102 at indexes 8 and 22 through `message text set --path
  choices`, which also rewrote the matching 402 captions. The two Show Text
  blocks (indexes 6 and 20) could not go through the CLI: their single 401
  line held embedded `\n` characters, and `message text get/set` rejects
  such lines (`INVALID_TEXT_VALUE`). They were replaced as data with
  `$[title.warning]`; `message text get` now reads them as valid. Branches,
  plugin commands and indexes are unchanged.

### Inventory and decisions

Reachable interface strings were found in the data, the Coreto parameters and
the running candidate (title, Options, New Game slot picker, Continue load
screen, message console). Rows, unreachable text and intentional control
labels are in `source-map.md`. Decisions:

- `title.warning`: PT joins the old `\n` lines with a space, which is how
  word wrap already rendered them. EN adds one intentional `<br>` after the
  title.
- `ui.save.latest`: the source is the English `NEW!`; PT reads `NOVO!` so the
  key has a reason to exist (D-023f). Flagged for Edney.
- `sys.save_message` and `sys.autosave` are keyed although the locked save
  style and the `current` autosave type do not show them; keying costs nothing
  and covers them if they appear.
- Gap for Edney: none. Every visible string had a string field or data route.

### Validation

- `message language validate --format tsv`: `keys: 27`, `languages:
  ["English","Portuguese"]`.
- `core validate --json`: `valid: true`, only the pre-existing
  `/QoL/OpenConsole` warning.
- JSON parse: `System.json`, `CommonEvents.json`, `package.json` ok.
- `git diff d17d886 -- coreto 'rpg-maker/The Dryland Drowned/js/plugins'`:
  empty.
- The autosave notice draws through `textSizeEx`/`drawTextEx`
  (`Window_AutosaveConfirm.refresh`), so the key resolves and the width is
  measured on the resolved text.

### Smoke observation (not L10)

Own server on 18737 (PID 9211), fresh Playwright context, 1280×720:

- Tab title “The Dryland Drowned”.
- EN: warning “The Dryland Drowned / Intended age rating: 16+. …”, choices
  Play / Options, and Continue / New Game / Options with a save present;
  Options assist bar “Q/W:Switch category  Z:Select  X:Back”; New Game
  picker “Choose a file to start a new campaign.”, “File 1” with `NEW!`;
  Continue screen “Load which file?”; message console FAST / Options / HIDE.
- PT: warning, Continuar / Novo jogo / Configurações, “Carregar qual
  arquivo?”, “Arquivo 1” with `NOVO!`, assist “Selecionar / Voltar”, console
  FAST / Configurações / HIDE.
- The autosave notice was not seen: one autosave fired when the campaign
  started, before the first capture, and 200 dialogue advances reached no
  other checkpoint. L10 owns that observation.

### Stale assertions for QA (not edited, D-009)

These existing tests match the old Portuguese title choices through
`$gameMessage.choices()`, which now returns the keys:
`suites/native-checkpoints.mjs:65` (`Jogar`/`Novo jogo`),
`suites/persistence.mjs:284/290/334/379` (`Novo jogo`),
`suites/content.mjs:112` (`Novo jogo`). Task-09 classifies them as obsolete
assertions, separate from real regressions.

