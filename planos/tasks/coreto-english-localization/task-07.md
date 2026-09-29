---
id: "07"
status: completed
depends_on: ["02", "03", "04", "05", "06"]
verification_ids: [V-001]
---

# Task 07 — Close corpus coverage and translator handoff

## Outcome

The whole player-facing corpus is keyed, both columns are complete, no PT prose
remains inline in events, and the translation package (source map, glossary,
guide, README workflow) is ready for independent evaluation and editorial review.

## Authority

- `spec.md`: RQ-001, RQ-004; "Failure, validation and packaging", README update;
  table prose ownership in GDD and `AGENTS.md` (D-023e)
- `verification.md`: V-001; stale-assertion rule for existing tests

## Scope

- Checks over `Languages.tsv`, all Maps, CommonEvents, System and plugin text.
- Docs: finalize `source-map.md`, `glossary.md`, `translator-guide.md`; update
  `rpg-maker/README.md` with the native table-editing workflow. Record the
  ADR-002 partial supersession in GDD §1.1 (“Autoria de cenas”) and §26
  (“Autoria pelo editor”) with the reciprocal link, and update `AGENTS.md:17`
  so native events own the scene and `Languages.tsv` owns player prose
  (D-023e; author the line with `writing-agents-md`).
- Existing tests in `rpg-maker/tests/`: select relevant IDs from
  `test-manifest.json`; report assertions on literal PT strings as stale
  separately from real regressions. Do not edit them into a pass.
- Delete targets: none.

## Checklist

- [x] `message language validate --format tsv`; `core validate --json`.
- [x] Read-only review: every `101/401/102/402/105/405` payload and
      PictureTextChange is a key plus native control tags and block wrappers, a
      preserved proper name, or documented non-player text (D-018). Show Text is
      keyed per block. Every key exists and no cell is empty. The table header is
      exactly `Key`, `English`, `Portuguese`, with no template sample key. Both
      columns of a key carry the same set of `\V[n]`, `<I>`,
      `\EFFECT`/`<CLEAR EFFECTS>` and casing tags; `<br>` is free per language.
      No cell has a tab or straight `"`. No `\n` remains in picture text.
      No Portuguese literal remains in a Control Variables (Script) operand.
      Every `\V[n]` choice or picture payload traces to assigners whose values
      are keys, preserved proper names or compositions of them (D-023c).
- [x] Recheck V-006 against `localization_baseline`: all changed parameter
      paths are listed; the registry, Coreto sources and bundles are unchanged.
- [x] Source map complete with hashes against current native baseline.
- [x] Run selected existing tests from the baseline revision; classify failures.
- [x] Finalize the list of treated keys (italic, effects, casing) for the
      editorial packet.
- [x] Update README, GDD §1.1/§26 and `AGENTS.md:17` (D-023e); freeze the
      candidate revision for 08/09.

## Validation

Execution mode/reference: V-001 native CLI validation and read-only source review.
Invalidates/reuses: any later copy/table change reopens V-001.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001 | CLI validate + full source/table review | Every source mapped or justified; no missing/empty keys; tokens and choices correct | Execution Notes; `verification.md` |

## Execution Notes

Executed 2026-09-29 over the whole corpus after tasks 01–06.

### V-001 (native CLI + read-only review): pass

- `message language validate --format tsv`: `keys: 451`, `languages:
  ["English","Portuguese"]`, sha256 `380383434e4ddea1…`. `core validate
  --json`: `valid: true`, only `/QoL/OpenConsole`.
- Table: header exactly `Key`, `English`, `Portuguese`; 451 rows, 3 cells
  each; no duplicate key (case-insensitive), no empty cell, no tab or
  straight `"`, no template sample key, no `\n`. Every key has the same set
  of `\V[n]`, `<I>`, `\EFFECT<…>`/`<CLEAR EFFECTS>` and casing tags in both
  columns.
- References: every `$[key]` in maps, Common Events, `System.json` and
  `plugins.js` exists in the table (0 missing), and every table key is used
  (0 unused).
- Payload sweep over every 401/405/102/402, PictureTextChange zone, CE004
  name and Control Variables (Script) literal: all are keys plus control tags
  and wrappers, except the documented exceptions in `source-map.md` (hero
  names in editor-only 402 captions, `Auto`, the CE063 credit names, `✓`,
  internal action codes `reread`/`retreat`). No `\n` in picture text. No
  Portuguese literal in a code-122 operand.
- Show Text is keyed per block (tasks 03–05 replaced whole blocks).
- D-023c: every variable shown through `\V[n]` (V150–151, 153, 157–215) was
  traced to its assigners: EventBridge queries for counts, hero names (proper
  names), route/encounter names (keys from CE004), quoted keys in code 122,
  and compositions (`V157–164` = name + ` — ` + status key; `V192–199` ←
  `V152` cause keys). `V186` receives `deathRoute`/`deathEncounter` IDs only
  as an identity input (CE059), never on screen.
- `source-map.md`: 451 rows, one per key, with source hashes against the
  current native baseline (d17d886 plus the documented copy edits).

### V-006 recheck: pass

A parsed comparison of `js/plugins.js` against d17d886 shows the same plugin
order and status flags, and exactly the 15 parameter paths recorded in the
task-01/02 notes. `git diff d17d886 -- coreto 'rpg-maker/The Dryland
Drowned/js/plugins'` is empty. The title clause passed in task-02.
`LanguageImages` untouched (task-06).

### Existing tests (baseline suite, unedited, D-009)

`DRYLAND_QA_PORT=18738 node --test rpg-maker/tests/*.test.mjs` (port 18738,
not the user's 18726; ~26 min): 136 tests, **56 pass, 80 fail**.

- **78 stale (title precondition):** the shared helpers wait for
  `$gameMessage.choices().includes('Jogar')` (or `'Novo jogo'`) before doing
  anything. The observed state in every failure is the correct localized
  title: `choices: ["$[choice.title.play]","$[choice.title.options]"]`. These
  tests never reach the behavior they check, so **their behavior is not
  verified by this run**; it is not a pass. This includes the subtests of
  IT-078 and IT-005.
- **2 stale (literal prose):** UT-033 and UT-034 compare Show Text to the old
  Portuguese (`“No cofre, encontramos…”`, `Ivaí junta as duas metades…`) and
  now read `$[council.rheed.1]` / `$[closing.reunite.1]`.
- **1 environment:** IT-079 cannot import `playwright` from
  `.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs`; the
  package is not installed. Unrelated to localization.
- **Real regressions found: none.** With 78 behavioral tests blocked at the
  title, the suite cannot show regressions in formation, encounters,
  sacrifice, persistence, endings or controls. Runtime coverage of those
  areas therefore rests on task-09 (L10–L13).
- **Follow-up for Edney (outside D-009):** updating the test helpers to pick
  title choices by key or by index would restore the suite. Not done here.

### Docs (D-023e)

- `AGENTS.md`: the content line now reads that events keep scene structure
  and `Languages.tsv` holds PT/EN player text (events only `$[chave]`),
  written through the `writing-agents-md` Gate branch (updated in place).
- GDD §1.1 “Autoria de cenas” and §26 “Autoria pelo editor”: partial
  supersession notes linking ADR-002; ADR-002 records the reciprocal link.
- `rpg-maker/README.md`: new “Idiomas e textos” section (table format, cell
  rules, validate command, reload, failure display); the Gorvak walkthrough
  and the audio sentence now point to keys and the new labels.
- Treated keys for the editorial packet: listed in `translator-guide.md`
  (Irati's note, seven farewells, Rheed/Ivaí quoted lines, Andirá's animated
  line, Draska's plaque; Gorvak's farewell flagged).

### Candidate freeze

Candidate for 08/09: the worktree at HEAD 92dc14f plus the uncommitted changes
of tasks 01–07 (no commits, per the graph rules). Any later copy or table
change reopens V-001.

