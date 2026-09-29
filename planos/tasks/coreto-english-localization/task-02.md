---
id: "02"
status: pending
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
  `AutosaveConfirm.VocabAutosaveSuccess`, `AutosaveConfirm.VocabAutosaveFailure`;
  ExtMessageFunc `Buttons.Options`; Options
  `OptionsSettings.buttonAssistCategory`. Also key any other visible string
  field found by the inventory, recorded first.
- Table: `ui.*`, `sys.*`, `title.*` keys in `Languages.tsv`; rows in `source-map.md`.
- Out of scope: symbols, filenames, command names and dynamic browser-title
  switching. Change callback parameters only if no string field covers a
  visible text (D-017). Unused stock battle/database text is inventoried as
  unreachable.
- Tests: none new. Delete targets: none.

## Checklist

- [ ] Pass the D-020 baseline gate.
- [ ] Inventory reachable interface strings from the running candidate and data;
      list unreachable stock text as such in `source-map.md`.
- [ ] Key each reachable string; PT column verbatim, EN translated per glossary.
- [ ] Replace CE002 text via `message text set` (common-event target where
      supported; otherwise native data editing), preserving branches and saves
      variants.
- [ ] Set `gameTitle`, `<title>` and `package.json` `window.title` to “The Dryland
      Drowned” (not a key).
- [ ] Record every changed parameter path for V-006. Record any string with no
      parameter, tag or callback route as a gap for Edney.
- [ ] `message language validate`, `core validate`, JSON parse, focused diff.
- [ ] Smoke both languages on port 18737: title → Options → Save/Load → autosave
      notice → message-console Options button; browser tab title.

## Validation

Execution mode/reference: supporting static checks; runtime proof in 09 (L10).
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + source-map review | All interface keys present, no empty cells | Execution Notes |

## Execution Notes

