---
status: approved
slug: coreto-english-localization
stage: ready-for-tasks
product_consolidation: approved-2026-09-28
technical_approval: approved-2026-09-29
---

# Whole-game English localization with Coreto

## Objective

Allow the entire game to be played in accessible American English or Brazilian
Portuguese. English is the initial default. Preserve the story's information,
character identities, player choices and horror atmosphere.

The user requested local specification through issue-to-spec and grill-me.
Product decisions D-001–008 and technical decisions D-009–015 are recorded in
the [interview](entrevista.md). The technical design was approved on 2026-09-29
(D-015). Translation implementation and its verification remain pending.

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
- Localization configuration of the already active Coreto providers: Message
  Localization and LanguageImages parameters, and the Options category that
  hosts the native language row.

## Exclusions

Additional languages, new story content, altered campaign rules, translation of
internal code or repository documentation, remote runtime translation services,
new distribution platforms and a custom language-selection flow. D-009 excludes
new plugins, custom code, helper scripts, rewritten callbacks and workarounds;
all localization uses installed plugin capabilities. No engine or existing plugin
source/bundle modification.

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
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) §3.5, §22 | Confirmed design | Language boundary and preserved narrative/game rules | Replace PT-BR-only exclusion with approved bilingual direction |
| [ADR-001](adrs/adr-001-bilingual-product.md) | Accepted individual product decisions | Scoped supersession of monolingual baseline | New record |
| [ADR-002](adrs/adr-002-native-table-and-provider-integration.md) | Accepted 2026-09-29 (D-015) | Table ownership of bilingual prose; Coreto baseline boundary | New record |
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
does not install, reorder, requalify or repair providers, and does not touch
migration-side data edits. Localization edits only the provider parameters it
owns: Message `Localization:struct` and `LanguageImages:struct`, and the Options
`Categories:arraystruct` entry for the language row. Use the Coreto CLI where it
exposes the operation. If the baseline blocks a localized surface, record it and
hand it to the migration owner instead of patching it here.

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
Repeated representations of the same choice share one key. Preserve presentation
escapes, placeholders and native control tags; table cells use `<br>` instead of
physical newlines. Language-key lookup is case-insensitive; columns are exact.

This explicitly changes the earlier rule that prose is edited only inside MZ
events. Native events remain scene owners, while bilingual copy has one editable
table. Do not maintain independent PT prose in both events and the table. The
[authoring ADR](adrs/adr-002-native-table-and-provider-integration.md), accepted
under D-015, partially supersedes that rule; record it in the GDD when the
table lands.

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
  bindings, font escapes and ordered approach IDs.
- CE004 ConfigureRoute/ConfigureEncounter display names: store unresolved keys
  so later rendering uses the current locale; never localize domain identifiers.
  Variable expansion precedes the native localization hook in the text pipeline;
  verify variable-to-key consumers in real rendering. Preserve hero proper names.
- Reachable System terms, database display names and plugin text parameters:
  Options categories/help, Save/Load prompts, message-console controls, warnings
  and text consumed by existing callbacks. Prefer existing text/string fields
  and native implicit key matching where needed. Do not author or rewrite JS
  callbacks, symbols, filenames, command names or rejected-action codes. If a
  visible string cannot be localized by a native supported route, record that
  gap for resolution rather than injecting code.
- Game title: preserve the approved pair “Afogados em Terra Seca” / “The Dryland
  Drowned” in localized in-game copy. Browser/document-title metadata follows
  existing native behavior; dynamic browser-title switching is not a requirement
  and no hook is introduced to implement it.
- Inspect referenced images for baked-in text; filename or extraction searches
  cannot prove its absence. Reuse text-free art. Where text exists, provide final
  localized assets with the native `[XX]` substitution and `ConvertDefault=true`
  so both languages resolve explicitly. No placeholders at delivery.

Unused stock combat/database text is inventoried and identified as unreachable;
it does not authorize a new gameplay surface. Shared terms used by reachable
windows are in scope even if originally introduced by engine defaults.

### Native option and configuration-only integration

The Coreto Options configuration inherited only the Áudio category. Add the
delivered native `textLocale` row in a localized General category, retaining
the four Audio rows.
Use the catalog's standard callbacks and native `changeVisuMzTextLocale`/refresh
methods; do not invent a selector, confirmation dialog or restart requirement.
Reuse the delivered native row unchanged in its executable callback logic.
Language validation, persistence, refresh and unsupported-preference behavior
remain native; no custom callback is introduced.
The title CE002 already opens Options; the existing message console provides
the in-game entry. Validate both, without adding another entry point.

There is no new game specialist or other custom executable code. Keep existing
choice focus behavior, including its transient name-based cache, unchanged.
Observe focus after switching as a regression risk; do not add cache hooks.
No new campaign state, translations in JavaScript or mirrored language store.
CLI lacks a generic language-cell editing operation: create/validate through the
CLI, edit the TSV as data, then validate again. For fields without a CLI operation,
use native editor/data authoring, never a new generator or conversion script.

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
fall back to English. Preserve the native failure contract and prevent these
defects through exhaustive coverage checks before delivery. Do not hide missing
translations with PT fallback. A malformed/unavailable table blocks native
database readiness with a retryable load error. This is a documented native
contract, not a request to retest the plugin's loader/failure matrix (D-011).
Normal boot must never create or rewrite the table.

Ship TSV and localized assets in the existing build-free package. Confirm actual
table retrieval and asset resolution using the supported local Chrome surface.
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
Do not create new test code,
adapters, runners or generators under D-009. A historical test asserting literal
PT event strings or old provider identities is reviewed against the new source
mapping; do not edit it into a pass or silently omit its failure. Report obsolete
assertions separately from real regressions and supply native/observed evidence.
The [verification contract](verification.md) and
[QA charter](../../../docs/qa/charters/CH-coreto-english-localization.md) define
separate-agent evaluation, representative runtime paths and human acceptance.
Update `rpg-maker/README.md` with the final native table-editing workflow at
implementation. Do not run obsolete whole-map generators.

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
play; prepared mockups do not constitute runtime evidence.

## Decisions and approval

Stage 1 is approved under D-008. D-009–012 set the native-only constraint, CLI
use, game-focused QA and isolated workspace; D-013 widens the provider baseline
to the full Coreto stack; D-014 moves that baseline outside this spec; D-015
approves the technical design. No product or technical decision remains open.
If runtime evidence reveals a provider/API limitation, record it, hand it to
the migration owner and amend the affected design rather than editing Coreto
or patching around it.
