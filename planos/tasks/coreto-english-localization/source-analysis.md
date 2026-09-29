# Source analysis — 2026-09-28

Baseline HEAD: `cee2b112aea98bc9169d6e750c83b94e048eccec`. Working tree was clean
before these specification documents. Runtime was inspected read-only; no game,
provider or language file was changed. No gameplay test has been performed.

## Native inventory

Read-only JSON traversal of Maps and CommonEvents found 349 Show Text headers,
386 text continuations, 48 Show Choices commands, 162 branch captions, one scroll
text header/six continuation records, and 98 PictureTextChange calls. These are
authored command counts, not unique words, table rows or reachability proof.
No code355/655 event scripts were found in those lists.

The same traversal found 8 ConfigureHero, 16 ConfigureEncounter and 3
ConfigureRoute entries in CE004. Route and encounter names are read into the
domain catalog by `Dryland_EventBridge.readConfiguration`, then exposed through
queries and display variables. Keep IDs and mechanics language-neutral.

CE002 presents the title/content warning and branches to native LoadScreen,
NewGame and Options, with variants depending on available saves. The Options
registry has only one Audio category with bgmVolume/bgsVolume/meVolume/seVolume.
Adding the native language row is necessary; `AddOption=true` alone does not add
it to this custom Categories configuration.

System terms are PT-BR. `index.html` has the Portuguese title. Current map art
`img/pictures/Dryland_MapComplete.png` was visually inspected and contains no
readable labels; this is not evidence that all referenced images are text-free.
All referenced picture families require an image-text audit at implementation.

## Exact provider facts

Current active registry: Core 1.90, Message 1.57, Options 1.28, Save 1.14,
ExtMessageFunc 1.22, PictureChoices 1.02, VNPictureBusts 1.03, ChoiceCmnEvts 1.02,
AttachedPictures 1.05, EventTitleScene 1.06 and MessageVisibility 1.03, all VisuMZ;
then Dryland_CampaignRules, Dryland_EventBridge and Dryland_Presentation.

Coreto catalogs report 0.1.0 providers. `message-core/bootstrap.js` requires
Coreto_0_CoreEngine first and exactly one Message provider; it validates active
VisuMZ Options at 1.27 and Save at 1.13. The game versions fail those predicates.
Coreto Options and Save accept Coreto Core/Message 0.1.0, so the smallest evidenced
provider proposal replaces four. Coreto Core forbids the original Core enabled.
Core and Message expose compatibility namespaces; Message and Save register
legacy command IDs. Supported metadata is not gameplay evidence.

## Localization capabilities and risks

CLI `message api describe /Localization` documents root CSV/TSV tables, exact
locale columns, `$[key]` / `\KEY[key]`, `<br>`, missing-key behavior and load-error
handling. `message install --dry-run --json` completed successfully against the
current registry; it does not install dependencies or certify runtime boot.

`message-core/options.js` defines the default, native selection and ConfigManager
persistence. `localization.js` refreshes windows, picture text and `[XX]` images.
The native Options catalog includes a reusable textLocale row; its LoadJS copies
raw config. D-009 preserves that native callback rather than patching it. Invalid
stored preferences are a native limitation to observe, not a new custom contract.

`text-pipeline.js:202` expands variables before preConvertEscapeCharacters, where
localization runs again. This supports unresolved display keys in variables.
`picture-text.js` measures/draws through native text windows, and
`save-lifecycle.js` requests picture text refresh after extracting a save.

Dryland_Presentation stores semantic read IDs independent of language and
remembers choice focus by rendered command name. Preserve both native behaviors
under D-009; a translated-name mismatch may reset remembered focus. Dryland_EventBridge owns
campaign transitions/checkpoints; localization must never become a rule input.

## Refresh — 2026-09-29

HEAD `e55783f` adds PRs #30, #31 and #33 on top of the intake baseline; they
edit 14 data files with small copy changes. A read-only recount of Maps and
CommonEvents in the worktree gives the same totals as above (349/386/48/162,
1/6 scroll, 98 PictureTextChange, 8/16/3 CE004 entries, no code355/655).

The provider facts above describe intake. The worktree registry now activates
twelve Coreto 0.1.0 plugins, including AniMsgTextEffects, with every VisuStella
plugin disabled (D-013). That migration, and its uncommitted data edits such as
`PictureIDs` serialization, are owned by separate work (D-014). Localization is
still disabled there: `Localization:struct` has `Enable=false` with the default
28-language list, `Languages.tsv` does not exist, and Options has only the
Áudio category with its four volume rows.



## Addendum — 2026-09-29 (peer review 04)

The inventory above counts only Show Text, choices, scroll text and
PictureTextChange. A read-only traversal at the D-020 baseline d17d886 also
finds 68 player-facing assignments of 25 distinct Portuguese strings, made by
Control Variables (Script) and shown through `\V[n]`:

- 16 memorial causes (`V152`) in `memorial_cause.A1`–`B8` (CE125–CE260, every
  ninth ID), dispatched by CE347 and copied by CE059 into `V192–V199`.
- 12 destination-status assignments in CE039 (`V176–V178` × “Disponível”,
  “Selecionado”, “Bloqueado”, “Concluído”).
- 24 cast-status assignments in CE117 (`V153` × “Presente”, “Morto”,
  “Presente · No grupo”, once per hero), concatenated into `V157–V164`.
- 16 assignments in Map037–044 (`V153`: “Selecionar” / “Retirar do grupo”),
  used by the choice `\V[153]<Enable Switch: 30>`.

No script condition compares these literals. D-023 routes them through keys
stored as variable values.

The full keyed source map and visual image-text audit belong to implementation.
No table keys, translations, specialist code or test cases exist yet. Preserve
the distinction between inspected capabilities and executed candidate behavior.
All source references are inside the maintained repository; this document does
not depend on the temporary CLI output used during exploration.
