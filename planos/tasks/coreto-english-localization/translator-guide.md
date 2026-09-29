---
status: in_progress
---

# Translator guide — Coreto English localization

How to edit `rpg-maker/The Dryland Drowned/Languages.tsv` safely. Keys and
their origins are in [source-map.md](source-map.md); shared terms are in
[glossary.md](glossary.md).

## Table format

- UTF-8, tab-separated, exact header `Key`, `English`, `Portuguese`.
- The Coreto CLI has no cell-write operation: edit the file as data, then run
  `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' message language validate --format tsv --json`
  after every edit. `languages` must read `["English","Portuguese"]`.
- A missing key renders `undefined`; an empty cell renders `UNDEFINED!`.
  Neither falls back to the other language.

## Cell rules (D-021)

- No tabs and no straight double quotes (`"`) in any cell. A stray `"` makes
  the whole table fail to load, and the game does not boot in either language.
  Use typographic “ ” only where the prose needs quotation marks.
- Cells hold prose and inline markup only: `\V[n]`, `<I>…</I>`,
  `\EFFECT<Preset>`/`<CLEAR EFFECTS>`, `<CAPS>`/`<CHAOS>` and intentional
  `<br>`. Control tags (`<Bind Picture: N>`, `<Hide Choice Window>`) and block
  wrappers (`\FS[n]`, `<center>`, `<WordWrap>`) stay in the event (D-018).
- Both columns of a key carry the same set of `\V[n]`, `<I>`, effect and casing
  tags. Their order may follow each language's syntax. `<br>` is free per
  language: PT keeps its existing layout breaks, EN keeps only intentional
  pauses or paragraphs.
- No text macros inside cells.

## Text treatment (D-021, D-022, D-023b)

- Voices, remembered speech, songs and inscriptions: `<I>…</I>` in both columns
  instead of quotation marks.
- `\EFFECT<Preset>` only for supernatural voices or visions in Show Text, with
  subdued presets (`SoftShiver`, `Flicker`, `Candle`, `Fade`), closed with
  `<CLEAR EFFECTS>`, placed the same way in both columns.
- `<CAPS>`/`<CHAOS>` only for a possessed or creature voice, in both columns.
- No automatic name color.
- The memorial cause line is a factual caption: no `<I>`.
- Intentional literal labels in both languages: `ON`/`OFF` in the Text Effects
  row, `FAST` and `HIDE` in the message console (D-023f).

## Style (D-006, D-007)

Natural American English, adapting expressions to keep meaning and horror.
Accessible does not mean short: keep atmospheric sentences, but prefer familiar
words, clear referents and one idea per clause when the Portuguese stacks
several. Keep each speaker's register (Rheed is plain and a little wry; Ivaí is
warm but evasive). Keep subtext: “Você não está esquecendo de nenhuma
informação?” hints that Ivaí hides something, so the English keeps the hint
(“Aren't you leaving something out?”).

Keep clues,
intended ambiguity, character voice and every piece of information. Horror
comes from image, rhythm and consequence, not ornate synonyms. Do not explain
mysteries, add clues or shorten outcomes. See the
[narrative contract](coreto-english-localization.narrativa.md).

## Display names and variables

- Encounter and route names live in CE004 as unresolved keys and reach the
  screen through variables (`\V[173–175]`, `\V[185]`, `\V[186]`). A variable
  that holds a key must stay in the event: the text pipeline expands
  variables, resolves keys once, then expands variables again, so a key that
  arrives through a `\V[n]` placed inside a cell is never resolved.
- Plain numbers (`\V[150]`, `\V[187]`) may sit in the event wrapper; this
  keeps cells as pure prose.
- Status words assigned by Control Variables (Script) hold the key as a quoted
  string (`"$[dest.status.available]"`), including inside concatenations.
- The Coreto CLI edits only plugin commands registered under a Coreto plugin
  ID. The event PictureTextChange commands still carry `VisuMZ_1_MessageCore`
  (migration baseline), so their text arguments are edited as data.

## Treated keys

Every key that uses `<I>`, `\EFFECT` or casing is listed here, so Edney can
review each use (V-005).

| Key | Treatment | Reason |
| --- | --- | --- |
| campaign.irati_02_01.narrator | `<I>` | Irati's written note on the map piece (inscription); replaces the “ ” quotes in both columns |
| farewell.h2.elowen | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h3.griznik | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h4.seraphina | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h5.bimbren | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h6.liora | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h7.vaelith | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h8.draska | `<I>` | Spoken farewell; the source wraps it in “ ”, replaced by `<I>` in both columns |
| farewell.h1.gorvak | — | For Edney: the only farewell without quotes in the source, so it has no `<I>`; the other seven do |
| council.andira | `<I>` + `\EFFECT<SoftShiver>` … `<CLEAR EFFECTS>` | Andirá speaks from the reflection; the only animated beat in the game (water spirit, drowning). The narration before the colon stays plain |
| council.rheed.1, council.rheed.2, council.rheed.3 | `<I>` | Rheed narrates in “ ” in the source (remembered account) |
| council.ivai.1, council.ivai.2 | `<I>` | Ivaí's lines in “ ” in the source; the eight heroes' council lines have no quotes and stay plain |
| closure.first.rheed, closure.second.rheed | `<I>` | Rheed's remembered account in “ ” |
| epilogue.draska.4 | `<I>` | The plaque inscription |
