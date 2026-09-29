---
round: 01
reviewed_fingerprint: >-
  HEAD df3f129 (branch spec/coreto-english-localization) plus uncommitted
  entrevista.md (D-016) and untracked tasks.md, task-01..09.md. sha256:
  spec.md 78b0a9ea, verification.md e377e889, tasks.md f68bb497,
  entrevista.md 542d1f0f, source-analysis.md e28d92e2,
  programacao eabb78bd, uiux fd10c77d, narrativa 02119b15, technical-art 8c5db980,
  _user_stories 6246be3d, adr-001 a1b81a18, adr-002 cde299fd,
  task-01 ed025df5, task-02 184cabe6, task-03 22e047b1, task-04 2b1d349f,
  task-05 8e27cc62, task-06 3061e26f, task-07 8914afcc, task-08 27b423b3,
  task-09 915c41c1, CH-coreto-english-localization 69de93e5.
  Runtime evidence read from the same worktree, including the migration's
  uncommitted edits (coreto/src/picture-choices/choices.js, js/plugins.js, data).
verdict: FIX_BEFORE_SHIP
decisions_recorded: 2026-09-29 (grill-me interview); incorporated 2026-09-29 as D-017–D-021
---

# Spec Peer Review — Round 01

Independent adversarial review of the approved spec, verification contract, discipline
contracts and task graph. Claims were checked against the installed Coreto source
(`coreto/src/message-core`, `options-core`, `picture-choices`, `save-core`), the
Coreto CLI (read-only `--help`, `api describe`, `list`, `get`) and the game data in
the worktree. No file other than this review was written; no game was started.

## Coverage

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | spec RQ-001–006, stories, uiux, active plugin parameters, `System.json` | finding (F-003, F-007, F-008) |
| Authority and disciplines | spec authority map, D-009–D-016, ADR-002, tasks.md execution rules, worktree `git status` | finding (F-003, F-005) |
| MZ runtime and lifecycle | `localization.js`, `text-pipeline.js:202`, `choices.js`, `picture-choices/choices.js`, `picture-text.js`, `layout.js`, `options.js`, `options-core/categories.js`, `Dryland_Presentation.js`, `Dryland_EventBridge.js` | finding (F-001, F-002, F-009) |
| Saves and compatibility | `save-lifecycle.js`, SaveCore `MakeSavefileInfoJS`, `local-game-run.md` | finding (F-004) |
| Presentation and assets | `LanguageImages:struct`, PictureTextChange payloads, technical-art contract | finding (F-002, F-006) |
| Verification and QA | verification.md, tasks 01–09, data inventory | finding (F-004, F-005, F-010) |

### Clear verdicts (evidence-backed)

- **Task data scopes are complete.** A traversal of every map and Common Event for
  codes 101/401/102/402/105/405 and PictureTextChange matches the union of the
  scopes in tasks 02–05 exactly: Map002, Map007–023, Map025–027 and Map029–044, plus
  CE2–4, 38, 39, 42, 43, 59, 61, 63, 117, 263–302, 304, 338–346 and 352–353. The
  PictureTextChange total is 98, matching the spec. Other plugin-command string
  arguments are asset filenames or internal labels.
- **Keys stored in variables do resolve.** Localization runs in `convertTextMacros`
  and again in `preConvertEscapeCharacters`, after `convertVariableEscapeCharacters`
  (`text-pipeline.js:202–207`). The CE004 display-name design works, and domain
  validation only requires non-empty strings (`Dryland_CampaignRules.js:105–125`).
- **The native option row is feasible without code.** OptionsCore uses `TextStr` before
  `TextJS` (`categories.js:90`), so the four Áudio labels are string fields. The
  catalog `textLocale` row's `refreshWindows` exists (`categories.js:159–160`), and the
  compat namespace `Imported.VisuMZ_1_MessageCore` / `VisuMZ.MessageCore.Settings` is
  set (`bootstrap.js:62–64`).
- **Font is preserved.** `LanguageFonts` maps both languages to `rmmz-mainfont`, which
  is the game's current `mainFontFilename`.
- **Speaker names are all preserved proper names.** Rheed, Ivaí, Andirá, the eight
  heroes, Pérola and Floraí need no speaker keys.
- **No save-description surface exists.** No SaveCore description command is used,
  so save slots show no stored prose.

## Findings

### F-001 — Choice control tags must stay in the event, outside the key

- Severity: high
- Source: `spec.md` › "Translation data and authoring ownership" ("Preserve presentation
  escapes, placeholders and native control tags"); `task-04.md` scope; `verification.md` V-001
- Evidence: all 16 encounter choices carry tags, for example
  `Forçar a janela…<Bind Picture: 50><Hide Choice Window>` and
  `Recuar<Bind Picture: 42><Show Switch: 34>`.
  `applyHideChoiceWindow` decides visibility from the **raw**
  `$gameMessage.choices()` strings (`coreto/src/picture-choices/choices.js:1–5`, the
  migration's current uncommitted version). A raw `$[key]` contains no tag. The spec
  says tags are "preserved" but does not say where they live, and the table is
  declared the single prose owner.
- Consequence: if tags move into table cells, the native choice window reappears on
  top of the picture choices in every encounter, in both languages. V-001's check
  that every 102 payload "is a key" would also reject the correct
  `$[key]<Bind Picture: 50><Hide Choice Window>` form.
- Contract correction: state that native control tags (`<Bind Picture>`,
  `<Hide Choice Window>`, `<Show/Hide Switch>` and the like) stay in the event payload
  around the key, and cells hold only translatable prose and inline text escapes.
  Amend V-001 and task-07 to accept "key plus native tags". Make the D-016 pilot one
  encounter (A1), not a conversation, because the tag and picture-label risks
  (F-002) sit there.
- User decision (2026-09-29): accepted — control tags stay in the event payload around the key; cells hold prose and inline escapes only; V-001/task-07 accept "key + native tags".

### F-002 — "One shared key" conflicts with hand-placed line breaks in approach picture labels

- Severity: high
- Source: `spec.md` › "Complete text surfaces" and "Translation data…" ("Repeated
  representations of the same choice share one key"); `task-04.md` ("One key per
  approach choice shared by `102`, `402` and the picture label")
- Evidence: the picture labels on pictures 50–52 carry their own `\FS[22]` escape and
  manual `\n` breaks sized for Portuguese (for example
  `…garrafas que ainda estão\ninteiras.`). The matching 102 choice text has neither.
  Picture text is drawn by `drawTextEx` in a window where word wrap defaults to off
  (`layout.js:84`). A `<WordWrap>` text code exists (`layout.js:92`), but no part of the
  spec relies on it.
- Consequence: one shared cell either drops the Portuguese breaks, so labels overflow
  or clip in both languages (a regression of the approved PT presentation), or pushes
  breaks into the choice text. Neither satisfies RQ-004. English also needs break
  positions that differ from Portuguese.
- Contract correction: choose one route and record it. (a) The label keeps a shared
  key, and the PictureTextChange wrapper adds `\FS[22]<WordWrap>` outside the key; the
  pilot must prove this with native wrapping. Or (b) picture labels get a sibling key
  (`…approach.N.label`) with language-specific `<br>`, linked to the choice key in the
  source map as the same meaning. Update task-04 and the narrativa contract to match.
- User decision (2026-09-29): accepted, route (a) with no fallback — approach labels use `\FS[22]<WordWrap>$[key]` in the PictureTextChange wrapper, sharing the choice key. If the A1 pilot fails, stop and return the decision to Edney.

### F-003 — Required interface strings live in provider parameters the spec forbids editing

- Severity: high
- Source: `spec.md` › "Coreto provider baseline" (edits "only … Message
  `Localization:struct` and `LanguageImages:struct`, and the Options
  `Categories:arraystruct`"); `entrevista.md` D-014; `verification.md` V-006 ("no other
  provider parameter … changed"); versus RQ-001, "Complete text surfaces" and `task-02.md`
  scope ("Coreto plugin text parameters")
- Evidence: visible PT strings exist outside the three allowed parameters:
  - SaveCore: `VocabLockedSaveSlot` ("Escolha um arquivo para iniciar uma nova
    campanha."), `VocabAutosaveSuccess`, `VocabAutosaveFailure`, `VocabSaveFailure`,
    `VocabLoadFailure`
  - ExtMessageFunc: `Buttons.Options` ("Configurações")
  - OptionsCore: `OptionsSettings.buttonAssistCategory` ("Trocar categoria")

  Implicit key matching only covers `addCommand` and `actorSlotName`
  (`localization.js:33–40`), so it cannot reach these fields.
- Consequence: task-02 cannot finish RQ-001 without breaking V-006 and the D-014
  allowance. Either English players see Portuguese save and console text, or the
  increment silently edits parameters outside its authority.
- Contract correction: ask Edney to widen the D-014 allowance to named, string-typed
  (`:str`, never `:func`/`:eval`) text fields of the active Coreto plugins, set to
  `$[key]`. Record this as D-017, and list the fields in the spec and V-006. The
  alternative is to accept them as documented PT gaps, which conflicts with RQ-001.
- User decision (2026-09-29): accepted, widened — Edney: changing Coreto plugin parameters and using Coreto tags is fully allowed as long as no new plugin is created, and must be preferred over JavaScript workarounds. Callback parameters (`:func`/`:eval`) are editable like any other parameter. Replaces the three-parameter limit in D-014 and the callback restriction in D-009.

### F-004 — Worktree runtime shares browser storage with the user's game

- Severity: medium
- Source: `verification.md` › "Evidence and cleanup" and L10 ("Isolated fresh candidate
  profile, no personal saves"); `task-01.md` to `task-06.md` smoke steps ("boot through
  `npm start`"); `docs/_memory/local-game-run.md`
- Evidence: `npm start` serves `http://127.0.0.1:18726/` for either checkout. Config,
  including the persisted `textLocale`, and browser saves are per-origin
  (`LocalMode` saves in the browser, `ConfigManager` in storage). The spec never says
  how isolation is achieved.
- Consequence: the first smoke in task-01 writes a language preference into the user's
  personal configuration and exposes personal saves to the candidate. L10's "first
  run defaults to English" cannot be observed on an origin that already has a stored
  preference, and running the original checkout afterwards picks up the candidate's
  language setting.
- Contract correction: require the candidate to run from the worktree on a dedicated
  port (for example `npm start -- --port 18727`) or in a dedicated Chrome profile for
  every smoke and QA lot. Record port/profile in the evidence, and state that the
  user's 18726 origin is never used by this increment.
- User decision (2026-09-29): accepted — every smoke and QA run of the candidate uses `npm start -- --port 18727` from the worktree; the 18726 origin is never used; L10 clears only the 18727 origin storage; the port is recorded in evidence.

### F-005 — Entry gate lacks a frozen migration baseline

- Severity: medium
- Source: `tasks.md` › "Execution rules" (D-014 entry gate); `task-01.md`, `task-02.md`,
  `task-06.md` checklists; `verification.md` V-006
- Evidence: the worktree has uncommitted migration edits to `js/plugins.js`,
  `data/CommonEvents.json`, `Map007–022.json`, eleven `Coreto_*.js` bundles, `coreto/src`
  (including the choice behavior F-001 depends on) and four files under
  `rpg-maker/tests/`. Only tasks 03–05 repeat the gate. Tasks 01 (plugins.js), 02
  (CE002, System.json) and 06 (LanguageImages) do not. V-006's "`git diff` of
  `js/plugins.js`" cannot separate localization edits from migration edits in the
  same uncommitted file.
- Consequence: localization and migration changes can mix, making V-006 unprovable.
  A later migration change to Coreto choice or picture behavior could invalidate
  keyed encounters with nothing forcing a recheck.
- Contract correction: make the gate "migration committed; record its commit hash in
  tasks.md as the localization baseline". Measure every diff, V-006 and the stale-test
  classification in task-07 against that hash. Add the gate to tasks 01, 02 and 06.
  State that any later migration commit reopens V-006 and repeats the pilot
  encounter.
- User decision (2026-09-29): accepted — the migration session commits on this branch before task-01; that hash becomes the recorded localization baseline in tasks.md; diffs, V-006 and the task-07 test classification measure against it; a later migration commit reopens V-006 and repeats the A1 pilot.

### F-006 — Language image substitution is inert with the current tokens

- Severity: medium
- Source: `spec.md` › "Complete text surfaces" (last bullet); `task-06.md`;
  technical-art contract
- Evidence: `LanguageImages:struct` maps `English` and `Portuguese` to the literal
  `[XX]`. `ImageManager.loadBitmap` replaces `[XX]` with that per-language value
  (`localization.js:47–50`), so the current values make substitution a no-op. The spec
  and task-06 only mention `ConvertDefault=true`.
- Consequence: if task-06 finds baked text, both languages would load the same
  `…[XX].png` file (or a missing file), and V-003 would fail late.
- Contract correction: when variants exist, require distinct per-language tokens (for
  example `English=[EN]`, `Portuguese=[PT]`) with matching files, plus
  `ConvertDefault=true`. Task-06 must reopen V-006 when it edits `LanguageImages`.
- User decision (2026-09-29): resolved by the F-003 directive — configure distinct per-language LanguageImages tokens and `ConvertDefault=true` when variants exist; task-06 records the parameter change.

### F-007 — The language row's own label and the Options chrome are not keyed

- Severity: medium
- Source: `task-01.md` checklist; uiux contract ("localized General category")
- Evidence: the catalog `textLocale` row has an empty `TextStr`, and its `TextJS`
  returns `TextManager.messageCoreLocalization`, which is `Localization.Name` =
  "Text Language" (`options.js:6`). Task-01 sets only language display names and the
  category name. The row's `ShowJS` also requires `Localization.AddOption=true`.
- Consequence: Portuguese players see the English label "Text Language". If someone
  turns `AddOption` off to "avoid duplicates", the row disappears. Both are
  mixed-language or missing-control defects under RQ-004.
- Contract correction: task-01 sets `Localization.Name` to a key (this is inside the
  allowed `Localization:struct`, and the row callback stays unchanged). It keys the
  category `Name` and the four Áudio `TextStr` fields, and records `AddOption=true` as
  a must-keep value.
- User decision (2026-09-29): resolved by the F-003 directive — key `Localization.Name`, the category Name and the Áudio `TextStr` fields; keep `AddOption=true`.

### F-008 — `System.gameTitle` must not be keyed

- Severity: medium
- Source: `spec.md` › "Game title"; `task-02.md` scope ("`data/System.json` terms")
- Evidence: MZ writes `$dataSystem.gameTitle` directly to `document.title`
  (`Scene_Boot.updateDocumentTitle`) and to savefile info, bypassing the Bitmap and
  text hooks. Localization only resolves text drawn through windows and bitmaps
  (`localization.js:23–31`).
- Consequence: a broad "key every System string" sweep in task-02 would show a literal
  `$[sys.title]` in the browser tab. Separately, the spec already accepts that an
  English-default player sees the Portuguese tab title "Afogados em Terra Seca".
- Contract correction: list `gameTitle` (and any other non-window metadata) as
  explicitly not keyed in the spec and task-02. Keep the static-title consequence
  visible in the Edney review packet (task-08, lot E).
- User decision (2026-09-29): accepted — `System.gameTitle` and the `index.html` `<title>` become the static approved English title “The Dryland Drowned”; gameTitle is never keyed.

### F-009 — One stray straight quote blocks boot

- Severity: low
- Source: `spec.md` › "Failure, validation and packaging"; translator guide
  (task-01/03)
- Evidence: the TSV parser uses CSV-style quoting. A `"` inside an unquoted cell
  throws "Unexpected character outside a quoted cell"
  (`language-table.mjs:56–57`), and a table load error blocks
  `DataManager.isDatabaseLoaded`. Current PT copy has no straight quotes or tabs, but
  English dialogue often adds them, and cells are hand-edited because the CLI has no
  cell writer.
- Consequence: one stray quote stops the game at boot, in both languages.
- Contract correction: the translator guide requires typographic quotes (“ ” ‘ ’) or
  RFC-style `"…""…"` quoting, forbids tabs in cells, and runs
  `message language validate` after every table edit (already planned per slice).
- User decision (2026-09-29): accepted, then refined into D-021. Cells forbid straight double quotes and tabs; voices and inscriptions use native `<I>…</I>` in both columns instead of quotation marks; typographic “ ” only where the prose needs them; `message language validate` runs after every table edit.

### F-010 — Show Text key granularity is undefined

- Severity: low
- Source: `spec.md` › "Translation data…"; tasks.md key convention; task-01 key pattern
  `<area>.<scene>.<speaker|passage>.<n>`
- Evidence: 349 Show Text blocks (318 single-line, 25 two-line, 6 three-line). The
  message window has word wrap on with `LineBreakSpace=true`, so 401 line splits become
  spaces at runtime. The spec does not say whether a key covers one 401 line or the
  whole 101 block.
- Consequence: per-line keys force English sentences into Portuguese line splits and
  fragment the corpus for the reviewer (V-004). Mixed choices across tasks make the
  V-001 coverage check ambiguous.
- Contract correction: one key per Show Text block (the 101 header keeps speaker and
  bust metadata). Use `<br>` only for intentional breaks. The source map records the
  block's reading-unit ID.
- User decision (2026-09-29): accepted — one key per Show Text block; PT cell joins 401 lines with a space and keeps existing explicit `<br>`; EN keeps `<br>` only for intentional breaks; block-level wrappers (`\FS`, `<center>`) stay in the event, `\V[n]` and inline emphasis stay in the cell.

## Rejected or duplicate candidates

- *Choice-focus memory resets after a language switch:* confirmed
  (`choices.js:100` passes the localized text to `addCommand`, and
  `Dryland_Presentation.js:215–230` keys focus by `command.name`), but the spec already
  names this risk and chooses to observe it (D-009). Duplicate; no correction.
- *Font regression when localization is enabled:* rejected; see the clear verdicts.

## Residual Risks

- The migration session is changing Coreto sources and bundles (`coreto/src`,
  `Coreto_*.js`) in this worktree, despite the project's read-only rule for those
  paths. That belongs to D-014's owner, but this spec depends on those behaviors
  (F-001, F-002). Treat it as a moving baseline until F-005's frozen hash exists.
- Existing tests under `rpg-maker/tests/` are also modified by the migration, so
  task-07's stale-versus-real failure classification depends on which revision the
  tests come from.

## Additional decisions from the interview

- All multi-line picture texts (encounter labels, CE039 destination descriptions, CE117 cast) use `<WordWrap>` outside the key, following the existing CE059 memorial precedent. `<br>` is only for structural breaks, such as a name line followed by a description.
