---
status: approved
slug: coreto-english-localization
stage: ready-for-tasks
product_consolidation: approved-2026-09-28
technical_approval: approved-2026-09-29
amended: 2026-09-29 (D-016–D-023; peer review rounds 01–04)
---

# Whole-game English localization with Coreto

## Objective

Allow the entire game to be played in accessible American English or Brazilian
Portuguese. English is the initial default. Preserve the story's information,
character identities, player choices and horror atmosphere.

The user requested local specification through issue-to-spec and grill-me.
Product decisions D-001–008 and technical decisions D-009–023 are recorded in
the [interview](entrevista.md). The technical design was approved on 2026-09-29
(D-015) and amended the same day by D-016–D-023 after peer review rounds
[01](review-01.md), [02](review-02.md), [03](review-03.md) and
[04](review-04.md). Translation implementation and its verification remain
pending.

## Scope

- Author, implement and verify only in the dedicated branch
  `spec/coreto-english-localization` and its `coreto-english-localization`
  worktree (D-012). Preserve the original checkout and unrelated work.
- Translate the entire playable experience: narrative, choices, speaker labels
  where translatable, menus, configuration, save/load UI, instructions, warnings,
  credits and player-facing text embedded in images.
- Portuguese and English selection using the plugin's native option and normal
  switching/persistence behavior; English is the default without a stored choice.
- Agent-produced translation, an evaluation by a separate agent uninvolved in
  development, and final editorial review by Edney.
- Configuration of the already active Coreto plugins: any parameter, tag or
  callback parameter they expose (D-017). This includes Message Localization and
  LanguageImages, the Options categories, and the player-facing
  text fields of Save, ExtMessageFunc, Options and AniMsgTextEffects.
- Native text treatment of the localized copy (D-021, D-022): italics for voices
  and inscriptions, sparse animated text effects and the native Text Effects
  option.

## Exclusions

Additional languages, new story content, altered campaign rules, translation of
internal code or repository documentation, remote runtime translation services,
new distribution platforms and a custom language-selection flow. D-009 excludes
new plugins, helper scripts, generators, runners, adapters and workarounds. All
localization uses installed plugin capabilities, preferring parameters and tags
over JavaScript (D-017). No engine or existing plugin source/bundle
modification.

The VisuStella → Coreto provider migration is a delivered prerequisite owned by
separate work (D-013, D-014): installing, validating, repairing or requalifying
providers, and migration-side data changes such as the CLI's `PictureIDs`
serialization, are outside this spec.

Gamepad and browser-native zoom tests remain excluded under G005/G003. No
historical prose-only E2E waiver is inherited by this localization increment.

## Part I — Player behavior

### RQ-001 — Two complete playable languages

The player can experience the whole game in Brazilian Portuguese or American
English. English is selected initially when no supported preference exists.
The English path includes every player-facing text surface, including text
embedded in pictures; it is not limited to dialogue. Preserved proper names are
intentional exceptions to translation, not untranslated omissions.

### RQ-002 — Familiar language selection

Use the existing language option and its standard behavior. Changing language
updates the localized presentation according to that behavior and retains the
player's preference for subsequent sessions. Preserve progress and meaningful
choices. Do not require starting a new campaign merely to choose a language.

### RQ-003 — Faithful and accessible horror

English uses natural expressions, clear sentence structure and vocabulary
appropriate to the scene. Preserve meaning, clues, ambiguity deliberately
present in the story, character voice and horror. Do not simplify by deleting
information, explaining intentional mysteries, adding clues or changing outcomes.
Keep character names and names of folklore creatures. Accessibility is not a
requirement to make every sentence short or to remove atmospheric language.

### RQ-004 — Complete and readable presentation

Translated text remains legible and complete in its actual dialogue, choice,
menu or image context. The player can understand available actions and feedback
without accidental mixtures of languages, unresolved translation keys, missing
copy or clipped meaning. Preserve player-paced reading and current controls.

### RQ-005 — Independent readability evaluation

An agent that did not participate in translation or implementation evaluates the
English experience in the role of a player. It identifies unnecessarily complex
wording, unclear choices and any loss of horror, using specific encountered
passages and explaining the comprehension problem. Its report distinguishes
linguistic difficulty from intentional narrative uncertainty.

### RQ-006 — Editorial acceptance

The implementing agent translates the whole game. Edney reviews the translation
and decides editorial acceptance. The separate agent's report supports that
review; neither it nor technical validation substitutes for Edney's judgment.

## Authority map

| Source | Owner/status | Governs | Change |
| --- | --- | --- | --- |
| [Interview](entrevista.md) D-001–007 | User decisions; confirmed individually | Languages, default, native behavior, style, reviewer roles | New product scope |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) §1.1, §3.5, §22, §26 | Confirmed design | Language boundary, reduced motion, authoring owner and preserved narrative/game rules | Replace PT-BR-only exclusion with approved bilingual direction; scope animated text out of reduced motion now (D-023d); record table prose ownership in task-07 (D-023e) |
| [ADR-001](adrs/adr-001-bilingual-product.md) | Accepted individual product decisions | Scoped supersession of monolingual baseline | New record |
| [ADR-002](adrs/adr-002-native-table-and-provider-integration.md) | Accepted 2026-09-29 (D-015), amended by D-017–D-023 | Table ownership of bilingual prose; key/markup model; Coreto baseline boundary | New record |
| [Peer review 01](review-01.md), [02](review-02.md), [03](review-03.md), [04](review-04.md) | Findings decided 2026-09-29 | Evidence behind D-017–D-023 | Historical once incorporated |
| [Standing directives](../../../docs/_memory/standing_directives.md), [ADRs](../../../docs/adrs/README.md) | Accepted | Evidence, own saves, risk grouping, immutable baselines | Preserve except explicit bilingual player-copy boundary |
| [Coreto authoring](../../../coreto/docs/autoria.md), [extensions](../../../coreto/docs/extensoes.md) | Installed capability contracts | Discovery, native configuration, read-only bundles | Preserve |
| [Updated narrative copy](../updated-narrative-copy/spec.md) and current native events | Existing narrative baseline | Source meaning and scene ownership | Translate; do not rewrite historical approvals |
| [Verification](verification.md) | Approved plan; nothing executed | Game-focused evidence and acceptance roles | Execute during implementation |

## Part II — Technical design

### Coreto provider baseline (prerequisite)

[Source analysis](source-analysis.md) records the intake baseline `cee2b112` and
its refresh against `e55783f`. At intake Coreto Message could not start beside
the installed VisuMZ Options 1.28 and Save 1.14, which motivated a four-provider
proposal (D-009). Edney then deliberately migrated the whole stack (D-013). The
worktree registry now activates, in order:

| Tier | Active Coreto plugins (0.1.0) |
| --- | --- |
| 0–1 | CoreEngine, MessageCore, OptionsCore, SaveCore |
| 2 | ExtMessageFunc, PictureChoices, VNPictureBusts, AniMsgTextEffects |
| 3–4 | ChoiceCmnEvts, AttachedPictures, EventTitleScene, MessageVisibility |

followed by Dryland_CampaignRules, Dryland_EventBridge and Dryland_Presentation.
Every VisuStella plugin stays registered and disabled with its files retained.

This registry is a prerequisite delivered and validated by separate work
(D-014); Edney reports the game is functional for translation testing. This spec
does not install, reorder, requalify or repair providers. It does not revert or
reformat the migration's own changes, such as the CLI's `PictureIDs`
serialization. Before task-01, the migration commits its changes on this branch,
and that commit is recorded in `tasks.md` as the localization baseline (D-020).
Every diff, V-006 and the existing-test classification measure against that
hash. A later migration commit reopens V-006 and repeats the A1 pilot.

Under D-017, localization may change any parameter, tag or callback parameter of
the active Coreto plugins, preferring plain text fields and tags over JavaScript.
It creates no plugin and never edits Coreto sources or bundles. Record every
changed parameter path (plugin, path, before, after, reason) in the task's
Execution Notes. Use the Coreto CLI where it exposes the operation. If the
baseline blocks a localized surface and no parameter or tag resolves it, record
the limitation and hand it to the migration owner.

### Translation data and authoring ownership

Use the native UTF-8 `Languages.tsv` at the game root, beside `index.html`, with
exact columns `Key`, `English`, `Portuguese`. Enable localization; configure
`LangFiletype=tsv`, `TsvFilename=Languages.tsv`, `DefaultLocale=English`, languages
`[English, Portuguese]`, and native language labels. Use `English` for EN-US and
`Portuguese` for PT-BR; these native identifiers are not BCP-47 locale strings.

Events retain scene structure, speaker attribution, control flow and stable
reading-unit IDs. Replace translatable payloads with `$[stable.key]`; the table
owns the PT source and corresponding EN copy. Use semantic context in keys
(scene, speaker/passage, approach/outcome), not mutable command offsets. Do not
merge different meanings merely because their Portuguese strings match.
Repeated representations of the same choice share one key. Language-key lookup
is case-insensitive; columns are exact.

Key and markup model (D-018):

- **Show Text:** one key per block (the 101 header and its 401 lines). The 101
  header keeps face, bust and speaker metadata. The PT cell joins the 401 lines
  with a space and keeps the existing explicit `<br>`, which reproduces the
  current word-wrapped rendering (`LineBreakSpace=true`). EN uses `<br>` only for
  intentional pauses or paragraphs, never to copy PT line lengths.
- **Control tags stay in the event, outside the key.** Choice payloads become
  `$[key]<Bind Picture: 50><Hide Choice Window>`, because PictureChoices reads
  `<Hide Choice Window>` from the raw choice text. Block-level wrappers
  (`\FS[n]` for a whole label, `<center>`, `<WordWrap>`) also stay in the event.
- **Cells hold prose and inline markup only:** `\V[n]`, inline emphasis (D-021)
  and intentional `<br>`. Both columns of a key carry the same set of `\V[n]`,
  `<I>`, `\EFFECT<…>`/`<CLEAR EFFECTS>` and casing tags; their order may follow
  each language's syntax. `<br>` is free per language: PT keeps its existing
  layout breaks, EN keeps only intentional ones, and V-003 judges both
  visually.
- **Picture text:** every multi-line picture text uses `<WordWrap>` in the event
  wrapper, following the existing CE059 memorial. With word wrap on, a raw `\n`
  becomes a space, so structural breaks in the wrapper (name / blank line /
  description) become `<br>` (D-022), for example
  `<WordWrap>\FS[21]\V[173]<br><br>\FS[19]$[dest.a.desc]`. Approach labels share the
  choice key as `\FS[22]<WordWrap>$[key]`. Line breaks come from native wrapping,
  not from `\n` in cells. The A1 pilot must show that the labels fit in both
  languages. If they do not, stop and return the decision to Edney (no fallback
  is pre-approved).
- **Cells:** UTF-8, no tabs and no straight double quotes (`"`). The TSV parser
  rejects a stray `"`, and a table load error blocks boot in both languages.
  Run `message language validate` after every table edit.
- **Scrolling text (105/405):** the scroll window does not word-wrap, and each
  405 line has its own `<center>`/`\FS` wrapper. Key per line, and only the
  translatable lines, with wrappers kept in the event (D-022). For the credits,
  that means only the title (`<center>\FS[32]$[credits.title]`) and the plugin
  line. The plugin line keeps its content, “Plugins: VisuStella”, in both
  columns (D-022). Proper-name lines stay literal.

This explicitly changes the earlier rule that prose is edited only inside MZ
events. Native events remain scene owners, while bilingual copy has one editable
table. Do not maintain independent PT prose in both events and the table. The
[authoring ADR](adrs/adr-002-native-table-and-provider-integration.md), accepted
under D-015, partially supersedes that rule (GDD §1.1 "Autoria de cenas" and
§26 "Autoria pelo editor", and `AGENTS.md:17`). Task-07 records the
supersession in those three places when the table lands, not before (D-023e).

Create a reviewable source mapping beside the spec during implementation: key,
native owner/field, PT source, source hash, intended context and editorial state.
It is traceability, not a second runtime catalog. Translation changes remain
traceable to the current native baseline, including the latest approved copy.
Provide translator guidance and a term glossary with the completed translation.

### Complete text surfaces

- Maps and Common Events: Show Text `101/401`, choices `102`, matching branch
  captions `402`, scrolling credits `105/405`, names and relevant display fields.
- All 98 PictureTextChange calls, including approach labels, encounter titles,
  party/destination feedback and memorial. Preserve alignment, picture IDs,
  bindings, font escapes and ordered approach IDs. Replace the 38 manual `\n`
  breaks (34 approach labels, 3 CE039 destinations, 1 CE117) with `<WordWrap>`
  in the wrapper (D-018).
- CE004 ConfigureRoute/ConfigureEncounter display names: store unresolved keys
  so later rendering uses the current locale; never localize domain identifiers.
  Variable expansion precedes the native localization hook in the text pipeline;
  verify variable-to-key consumers in real rendering. Preserve hero proper names.
- Control Variables (Script) literals shown through `\V[n]` (D-023a): 68
  assignments of 25 distinct strings. They are the memorial cause in `V152` in
  the 16 `memorial_cause.*` Common Events (CE125–CE260, every ninth ID), copied by
  CE059 into `V192–V199`; the destination status in CE039 `V176–V178`; the
  cast status in CE117 `V153`, concatenated into `V157–V164`; and the hero
  visit choice label in Map037–044 `V153`. Assign the unresolved key as the
  value, for example `"$[memorial.cause.a2]"`, by native data editing. The CLI
  text operations do not target code 122. Keys resolve after variable
  expansion, including inside concatenations, and stay unresolved in saves.
  A `\V[n]` choice or picture payload stays as it is when every value assigned
  to `V[n]` is a key, a preserved proper name or a composition of them. The
  memorial cause is a factual caption: it gets no `<I>` (D-023b).
- Reachable System terms, database display names and plugin text parameters,
  set to `$[key]` (D-017). Known fields:
  - Save: `Save.VocabLockedSaveSlot`, `SaveConfirm.VocabSaveFailure`,
    `SaveConfirm.VocabLoadFailure`, `AutosaveConfirm.VocabAutosaveSuccess`,
    `AutosaveConfirm.VocabAutosaveFailure`, `SaveMenu.LatestText` (`NEW!`,
    D-023f). `SaveConfirm.VocabSaveSuccess` is inventoried as unreachable,
    because the game has no manual-save route.
  - ExtMessageFunc: `Buttons.Options`.
  - Options: `OptionsSettings.buttonAssistCategory`, category `Name` and row
    `TextStr`.
  - Message: `Localization.Name`, which labels the language row.
  - AniMsgTextEffects: `Options.Name`.

  Intentional exceptions (D-023f): the Text Effects row's `ON`/`OFF`, which
  its catalog `DrawJS` draws, and the message-console labels `FAST`
  (ExtMessageFunc `Buttons.FastFwd`) and `HIDE` (MessageVisibility
  `ButtonName`) stay as language-neutral control labels in both languages.
  No callback changes for them.

  Other visible string fields found during task-02 are recorded, then keyed.
  Prefer string fields (`TextStr` wins over `TextJS` in Options rows) and native
  implicit key matching. Callback parameters may change under D-017 when no
  string field or tag covers the need. Never rename symbols, filenames, command
  names or rejected-action codes.
- Game title (D-019, D-022): `System.gameTitle`, the `index.html` `<title>` and
  the `package.json` `window.title` become the static English title “The Dryland
  Drowned”. `gameTitle` is never keyed: it
  feeds `document.title` and savefile info outside the localization hooks. In-game
  copy keeps the approved pair “Afogados em Terra Seca” / “The Dryland Drowned”.
- Inspect referenced images for baked-in text; filename or extraction searches
  cannot prove its absence. Reuse text-free art. Where text exists, provide final
  localized assets with the native `[XX]` substitution: set distinct
  `LanguageImages` tokens per language (for example `English=[EN]`,
  `Portuguese=[PT]`, because the shipped value `[XX]` makes substitution a
  no-op), plus `ConvertDefault=true` and matching files. No placeholders at
  delivery.

Unused stock combat/database text is inventoried and identified as unreachable;
it does not authorize a new gameplay surface. Shared terms used by reachable
windows are in scope even if originally introduced by engine defaults.

### Native option and configuration-only integration

The Coreto Options configuration inherited only the Áudio category. Add a
localized General category with two delivered catalog rows: `textLocale`
(language) and `textEffects` (animated text on/off, D-021). Retain the four
Áudio rows and key their category `Name` and row `TextStr` fields.
Use the catalog's standard callbacks and native `changeVisuMzTextLocale`/refresh
methods; do not invent a selector, confirmation dialog or restart requirement.
The language row's label comes from `Localization.Name` and the effects row's
from AniMsgTextEffects `Options.Name`; key both. Keep `Localization.AddOption`
and AniMsgTextEffects `Options.AddOption` set to `true`, because the catalog
rows' `ShowJS` requires them. Text Effects starts on: AniMsgTextEffects forces
it on when no preference is stored, and its `applyData` runs after OptionsCore,
so no reduced-motion default is possible natively (D-022). Players turn it off
in the row, and the stored choice persists. Animated text therefore ignores
the system reduced-motion preference. GDD §1.1 and its QA policy record this
exception for animated text only (D-023d). Every other motion still follows
`V47` (`MotionPreference`).
Language validation, persistence, refresh and unsupported-preference behavior
remain native.
The title CE002 already opens Options; the existing message console provides
the in-game entry. Validate both, without adding another entry point.

There is no new plugin, game specialist or helper script. Keep existing
choice focus behavior, including its transient name-based cache, unchanged.
Observe focus after switching as a regression risk; do not add cache hooks.
No new campaign state, translations in JavaScript or mirrored language store.
CLI lacks a generic language-cell editing operation: create/validate through the
CLI, edit the TSV as data, then validate again. `message language create`
writes the built-in 28-language template with sample rows (`Greeting`,
`Farewell`, `Wow`). Reduce it to exactly `Key`, `English`, `Portuguese` and
delete the sample rows before adding keys; `validate` checks structure, not the
column set. For fields without a CLI operation (including scrolling text
105/405), use native editor/data authoring, never a new generator or
conversion script.

### Native text treatment (D-021)

Use native Message Core and AniMsgTextEffects features, with restraint and the
same meaning in both languages:

- **Voices and inscriptions:** quoted voices, remembered speech, songs and
  written inscriptions use `<I>…</I>` in both columns instead of quotation
  marks. Typographic quotes “ ” are used only where the prose needs them; straight
  `"` is never used in cells. `<I>` is measured and drawn in the same style, so
  word wrap stays correct in all windows, including picture text.
- **No AutoColor (D-022):** names get no automatic color. Coreto's AutoColor
  whole-word rule uses ASCII-only `\b` (`text-pipeline.js:111`), so accented
  names such as Ivaí, Andirá, Floraí and Boitatá never match. See the Coreto
  follow-up below.
- **Animated beats:** `\EFFECT<Preset>` appears sparingly, only on supernatural
  voices or visions in Show Text (other windows strip it). Use subdued existing
  presets (for example `SoftShiver`, `Flicker`, `Candle`, `Fade`), end with
  `<CLEAR EFFECTS>`, and use the same placement in both columns. Selection resets
  each page. Players can disable animation with the Text Effects row. Effects
  keep the plugin's standard behavior, outside the reduced-motion rule
  (D-023d).
- **Casing:** `<CAPS>`/`<CHAOS>` only for a possessed or creature voice, in both
  columns.
- **Not used:** text macros inside cells, because Message Core expands macros
  before resolving keys, so macros in cells only work through a fragile second
  Show Text pass.

The translator guide lists every treated key. The editorial packet shows each
use to Edney (V-005). The source map records the treatment in the key's context.

### Lifecycle and invariants

Language is a global native configuration preference, independent of save slots.
New games and Continue use that preference. Preserve current semantic seen-text
history (`seenPassageIds`, `_drylandReadUnits`) across languages; translation does
not create a new passage or mark any unfinished passage complete. Maintain FAST
and AUTO controls and their existing permission boundaries.

Native keys remain unresolved until display, including stored picture texts and
display variables. Switching through Options refreshes using native behavior;
returning to dialogue/choices must not advance the interpreter, commit a choice,
duplicate a death/checkpoint or retain obsolete translated graphics. No new
autosave triggers. SaveCore's native extraction restores picture refresh state.

No save schema migration, old-save rewrite, revision gate or deletion is planned.
Changed interpreter lists and the provider migration can invalidate historical saves;
do not promise migration or reuse them as test prerequisites. Candidate-produced
saves must resume correctly in either language. Leave personal saves untouched.

### Failure, validation and packaging

Native missing keys can render `undefined`, empty cells `UNDEFINED!`; they do not
fall back to English. A straight `"` inside an unquoted cell makes the whole
table fail to load, which blocks boot. Preserve the native failure contract and prevent these
defects through exhaustive coverage checks before delivery. Do not hide missing
translations with PT fallback. A malformed/unavailable table blocks native
database readiness with a retryable load error. This is a documented native
contract, not a request to retest the plugin's loader/failure matrix (D-011).
Normal boot must never create or rewrite the table.

Ship TSV and localized assets in the existing build-free package. Confirm actual
table retrieval and asset resolution using the supported local Chrome surface,
served from this worktree with `npm start -- --port 18737` (D-020). The user's
`127.0.0.1:18726` origin, with its saves and configuration, is never used by
this increment.
No runtime translation API or external service. Keep source engine/Coreto hashes
unchanged. Test-resource teardown follows G006 and preserves user resources.

### Ownership and verification

[Narrativa](coreto-english-localization.narrativa.md) owns translation and review;
[UI/UX](coreto-english-localization.uiux.md) owns readable bilingual presentation;
[Programação](coreto-english-localization.programacao.md) owns configuration,
integration and coverage; [Technical Art](coreto-english-localization.technical-art.md)
owns only the image-text audit and any necessary localized variants. No Audio
contract: audio content is unchanged; provider regressions belong to the migration owner (D-014).

Use only applicable existing game tests under `rpg-maker/tests/`, native CLI
checks of changed data, read-only content review and actual browser inputs.
Do not retest plugin internals or qualify the provider baseline (D-011, D-014).
Do not create new test code, adapters, runners or generators under D-009. Test
files belong to the D-020 baseline revision. A historical test asserting literal
PT event strings or old provider identities is reviewed against the new source
mapping; do not edit it into a pass or silently omit its failure. Report obsolete
assertions separately from real regressions and supply native/observed evidence.
The [verification contract](verification.md) and
[QA charter](../../../docs/qa/charters/CH-coreto-english-localization.md) define
separate-agent evaluation, representative runtime paths and human acceptance.
Update `rpg-maker/README.md` with the final native table-editing workflow at
implementation. Do not run obsolete whole-map generators.

### QA scope reduction (D-024)

On 2026-09-29, during task-09, Edney reduced the runtime QA of this
increment: “sobre a task 9, teste somente os 30% mais importantes. eu assumo
os riscos. Mas tente mitigar o maximo que conseguir”. The static sensors
(V-001, V-006) and Edney's editorial decision (V-005) were not reduced.

**Selection rationale.** Each runtime check in L10–L15 was ranked by three
questions, and a check stayed only if it scored high on the first two:

1. *Can a defect here break the game or lose player progress?* Language
   preference, live switching and Continue in the other language touch
   configuration, saves and the running interpreter; a defect there breaks
   every session, not one passage.
2. *Is the surface still unobserved at runtime?* Tasks 01–04 had already
   seen the title, Options, Save/Load, prologue, tavern panels, cast list,
   encounter labels, sacrifice screen, a death and a farewell. Council,
   closings, memorial cards, epilogues, credits and the only animated line
   (Andirá) had never been seen; static checks cannot show layout or
   animation.
3. *Is it already mitigated by another sensor or by equivalence?* V-001
   checks every key and payload of the whole corpus statically; the three
   closings, the PT column and larger resolutions reuse the same windows,
   wrapping and scaling as the observed paths.

**Kept (the most important ~30%).** L10 and L11 (first boot in English,
Options, preference persistence, Text Effects, switching mid-dialogue); L12
(Continue in the other language after a committed death); one English L13
campaign to an ending covering council, Andirá with Text Effects on and off,
the Reunite closing, memorial, an epilogue and credits; L15 reduced to a
fresh agent's read-only review of the whole English corpus, since reading
quality (RQ-003) is the part no technical check covers.

**Cut, risk accepted by Edney.** The PT comparison sequence, the 1920×1080
path, the Destroy and Total loss closings, the L15 played route and a
re-evaluation of keys changed after L15.

**Mitigation applied.** V-001 was rerun after every table change; the
reduced run still found and fixed two presentation defects (Andirá's preset
faded the text; four memorial causes overflowed their card); 12 of 16 L15
findings were fixed in the English column; the memorial fix, not replayed,
is backed by an equivalent card that renders whole. Details:
[task-09](task-09.md) and the
[QA report](../../../docs/qa/reports/2026-09-29-coreto-english-localization.md).

## Follow-ups outside this spec

- **Coreto Message Core (upstream):** AutoColor builds `\b${name}\b` without the
  Unicode flag (`coreto/src/message-core/text-pipeline.js:111`), so words that
  start or end with an accented letter are never colored. A likely fix is
  Unicode-aware boundaries (`(?<![\p{L}\p{N}_])…(?![\p{L}\p{N}_])` with the `u`
  flag), plus a test with accented names. It belongs to the Coreto project (code
  freeze here). A redelivered bundle would change the D-020 baseline, reopen
  V-006, repeat the A1 pilot, and reopen D-022(b) if it arrives before task-03.

## Acceptance summary

| Requirement | Expected observable | Verification |
| --- | --- | --- |
| RQ-001 | Whole game available in both languages, initial English | V-001, V-002, V-006 |
| RQ-002 | Native switching and preference, campaign continuity | V-002 |
| RQ-003 | Accessible faithful English retaining horror | V-004, V-005 |
| RQ-004 | Complete readable text in its actual presentation | V-001, V-003, V-004 |
| RQ-005 | Separate agent's evidenced readability assessment | V-004 |
| RQ-006 | Edney's explicit editorial acceptance | V-005 |

## Demonstrable moment

Show the native language option, an English scene and its Portuguese counterpart,
then a meaningful English choice. Suggested captures: language option, an
atmospheric dialogue and a long choice panel. Collect during actual candidate
play; prepared mockups do not constitute runtime evidence. Task-09 selects the
captures after Edney's editorial acceptance (V-005, D-023e).

## Decisions and approval

Stage 1 is approved under D-008. D-009–012 set the native-only constraint, CLI
use, game-focused QA and isolated workspace; D-013 widens the provider baseline
to the full Coreto stack; D-014 moves that baseline outside this spec; D-015
approves the technical design; D-016 allows chained CLI calls after a pilot.
Peer review round 01 produced D-017 (open Coreto parameters, tags and callbacks,
native first), D-018 (key and markup model), D-019 (static English browser
title), D-020 (frozen baseline and isolated runtime) and D-021 (native text
treatment). Round 02 produced D-022 (Text Effects default, AutoColor removal,
`<br>` in picture wrappers, window title, credits and port 18737). Round 03
corrected executability without a new decision. Round 04 produced D-023
(variable-held text, reduced-motion exception for animated text, authority
updates at task-07, ON/OFF and Save fields). During execution, D-024 reduced
the task-09 runtime QA with the risk accepted by Edney (see “QA scope
reduction”). No product or technical decision
remains open, except the D-018 A1 pilot condition. If runtime evidence reveals a provider/API limitation, first
look for a Coreto parameter or tag. Otherwise record it, hand it to the
migration owner and amend the affected design, without editing Coreto sources or
bundles.
