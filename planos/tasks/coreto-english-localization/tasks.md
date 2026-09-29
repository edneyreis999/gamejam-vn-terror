---
status: approved
slug: coreto-english-localization
spec_approved_on: 2026-09-29
amended_on: 2026-09-29 (D-017–D-023, peer reviews 01–04)
localization_baseline: d17d88640b4c747f4aa0605318987378d2ba68ba (migration commit, recorded 2026-09-29, D-020)
---

# Tasks — Whole-game English localization with Coreto

Authority: approved [spec](spec.md) and [verification](verification.md) (D-015),
amended by D-017–D-023 after peer reviews [01](review-01.md),
[02](review-02.md), [03](review-03.md) and [04](review-04.md). Decisions live in
the [interview](entrevista.md). The Coreto provider stack is a prerequisite owned
by separate work (D-013, D-014), frozen at the `localization_baseline` commit
(D-020).

## Graph

| ID | Task | Depends on | Primary verification IDs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Enable the native language option and table](task-01.md) | — | V-006 | completed |
| 02 | [Localize interface, system and title flow](task-02.md) | 01 | — | completed |
| 03 | [Localize prologue, preparation and campaign feedback](task-03.md) | 01 | — | completed |
| 04 | [Localize the sixteen encounters and their deaths](task-04.md) | 01, 03 | — | completed |
| 05 | [Localize council, closings, epilogues and conversations](task-05.md) | 01, 03 | — | completed |
| 06 | [Audit image text and deliver localized variants](task-06.md) | 01 | — | completed |
| 07 | [Close corpus coverage and translator handoff](task-07.md) | 02, 03, 04, 05, 06 | V-001 | completed |
| 08 | [Plan localization QA](task-08.md) | 07 | — | completed |
| 09 | [Execute QA, independent evaluation and editorial acceptance](task-09.md) | 08 | V-002, V-003, V-004, V-005 | completed |

Tasks 02–06 are independent once 01 lands, except that 04 and 05 reuse the
glossary and the CE004 display-name keys created
in 03. Task 04 opens with the A1 pilot (D-018). Each translation task runs
supporting table/data checks for its own slice; V-001 is closed once, over the
whole corpus, in 07.

## Coverage

| Verification ID | Primary owner task |
| --- | --- |
| V-001 | 07 |
| V-002 | 09 |
| V-003 | 09 |
| V-004 | 09 |
| V-005 | 09 |
| V-006 | 01 |

## Execution rules

- **Baseline gate (D-020):** before task-01, the migration session commits its
  changes on this branch, and its hash is recorded as `localization_baseline` in
  the front matter. No task edits `js/plugins.js`, `System.json`, `index.html`,
  `package.json`, `Languages.tsv`, `data/Map*.json`, `data/CommonEvents.json`
  or assets while that field is pending. Never overwrite, revert or reformat the migration's changes, such as
  `PictureIDs` serialization. A later migration commit reopens V-006 and repeats
  the A1 pilot.
- **Native first (D-009, D-017):** Coreto CLI operations (`message text`,
  `message commands`, `message parameters`, `message language`, `options`,
  `ani-message`) come first; use native data editing for fields the CLI does not
  cover. Any parameter, tag or callback parameter of the active Coreto plugins
  may change. Prefer string fields and tags, and record each changed path with
  before/after and reason in Execution Notes. No new plugin, generator,
  conversion script, test runner or adapter. `coreto/` and `Coreto_*.js` are
  read-only.
- **Pilot first (D-016, D-018):** chained CLI calls from the terminal are allowed;
  no script file is saved. Before keying a whole slice, key one small unit, run
  it in both languages, confirm it works, then apply the rest. The mandatory A1
  pilot opens task-04: approach labels as `\FS[22]<WordWrap>$[key]`, choices as
  `$[key]<Bind Picture: N><Hide Choice Window>`, checked in both languages. If a
  label does not fit, stop and return the decision to Edney.
- **Key and markup model (D-018):** `Languages.tsv` is the single prose owner;
  events keep scene structure, control tags and block wrappers around `$[key]`.
  Keys are semantic (scene, speaker/passage, approach/outcome), never command
  offsets. Use one key per Show Text block. Repeated representations of the same
  choice share one key. Multi-line picture text uses `<WordWrap>` in the
  wrapper, not `\n` in cells. Player-facing literals assigned by Control
  Variables (Script) hold the unresolved key as their value, edited as native
  data; `\V[n]` payloads stay in the event (D-023a/c).
- **Cells (D-021):** no tabs and no straight `"`. Voices and inscriptions use
  `<I>…</I>` in both columns. `\EFFECT`/casing only for supernatural beats, with
  the same placement in both columns. Run `message language validate --format tsv`
  after every table edit. List every treated key in `translator-guide.md`.
- Every translated source is recorded in `source-map.md` (key, native
  owner/field, PT source, source hash, context, treatment, editorial state). The
  PT column keeps the current approved copy verbatim, with 401 lines joined by a
  space.
- Record limitations of the provider baseline that no parameter or tag resolves
  for the migration owner; do not patch Coreto sources or bundles.
- Runtime checks inside implementation tasks are smoke observations only; the
  QA pair owns runtime/visual/human evidence. Always serve the candidate from
  the worktree with `npm start -- --port 18737`, a port exclusive to this
  increment (D-022). Before clearing its origin, confirm with `lsof` that the
  listener is the executor's own server. Never use or clear the user's 18726
  origin (D-020). Read
  [local-game-run.md](../../../docs/_memory/local-game-run.md) before launching
  or reusing a server, and close only agent-started resources.
- No commits, PR or Trello operations are part of this graph. The D-020
  baseline commit belongs to the migration owner.

## Next Ready Task

None: all tasks completed 2026-09-29; final verify PASS.
