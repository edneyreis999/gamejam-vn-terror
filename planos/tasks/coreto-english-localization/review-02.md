---
round: 02
reviewed_fingerprint: >-
  HEAD df3f129 plus the D-017–D-021 incorporation (uncommitted). sha256 prefixes:
  spec 03c08cdd, verification eea452d5, tasks 687f3223, entrevista eb3d124f,
  task-01 efba5634, task-02 2468ced2, task-03 7aa89a36, task-04 d9926070,
  task-05 eda6eeec, task-06 689e0ce1, task-07 f3d898be, task-08 951c5c36,
  task-09 079be5e4, narrativa df9732ee, programacao 50a575fa,
  technical-art 0809fe87, uiux 8084cf5f, adr-001 a1b81a18, adr-002 0d99790a,
  CH-coreto-english-localization 76093187.
verdict: FIX_BEFORE_SHIP
decisions_recorded: 2026-09-29 (grill-me interview); incorporated 2026-09-29 as D-022
---

# Spec Peer Review — Round 02

This round targets the amendments made after round 01 (D-017–D-021) and the new
native text-treatment features. It was performed inline by the same agent that
wrote the amendments, deliberately switching to adversarial review. No
independent subagent was used, so treat it as a self-review. Every claim below
was checked against Coreto sources, engine files and game data in the
worktree. No game was started.

## Coverage

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | spec D-019/D-021 sections, CE063 credits, `package.json` | finding (R2-F-004, R2-F-006) |
| Authority and disciplines | D-017–D-021, tasks.md rules, `local-game-run.md` | finding (R2-F-007) |
| MZ runtime and lifecycle | `ani-msg-text-effects/options.js`, `text-pipeline.js`, `layout.js`, `Dryland_Presentation.js`, `rmmz_managers.js`, `rmmz_scenes.js` | finding (R2-F-001, R2-F-003) |
| Saves and compatibility | reading-unit and passage logic, `gameTitle` consumers | clear |
| Presentation and assets | AutoColor rule, picture wrappers, scroll text | finding (R2-F-002, R2-F-003, R2-F-005) |
| Verification and QA | verification V-001/V-003/V-006, L10/L11, tasks 01–09 | clear, apart from the findings above |

### Clear verdicts (evidence-backed)

- **A key per Show Text block is safe for reading state.** Reading units are
  Common Event IDs or explicit unit numbers (`Dryland_Presentation.js:136–152`),
  and campaign passages are semantic ID lists (`Dryland_EventBridge.js:315`). None
  depends on event command indices, so removing 401 lines does not change seen
  history.
- **Tags outside the key work as intended.** `<Bind Picture>` is parsed from the
  localized command name, `<Show Switch>` gates run on the converted text
  (`message-core/choices.js:93–111`), and `<Hide Choice Window>` is read from the
  raw choice (`picture-choices/choices.js:1–5`).
- **Changing `gameTitle` is safe.** Its only consumers are `document.title`
  (`rmmz_scenes.js:384`), savefile info (`rmmz_managers.js:381`) and the default
  Scene_Title drawing, which EventTitleScene replaces. MZ does not validate saves
  by title, and no existing test references the PT title.
- **Every Options row is feasible natively.** The catalog `textEffects` row
  exists; `Imported.VisuMZ_2_AniMsgTextEffects` and `VisuMZ.AniMsgTextEffects` are
  set (`glyphs.js:137–138`). Both row labels come from string parameters drawn
  through `drawTextEx`, so `$[key]` resolves.
- **Inline treatments work inside cells.** Cell backslashes become `\x1b`
  (`localization.js:11`), which matches `\EFFECT<…>` (ANI-RX-001). `<I>` is global
  and is measured and drawn in the same style. Show Text in other windows strips
  `\EFFECT`.

## Findings

### R2-F-001 — The reduced-motion default for Text Effects cannot work natively

- Severity: medium
- Source: `spec.md` › "Native option and configuration-only integration" ("The
  `textEffects` row default follows the player's reduced-motion preference");
  `coreto-english-localization.uiux.md`; `task-01.md` checklist
- Evidence: AniMsgTextEffects loads after OptionsCore. Its `applyData` runs last
  and sets `textEffects = 'textEffects' in data ? data.textEffects : true`
  (`ani-msg-text-effects/options.js:6–10`). On a first run there is no stored
  value, so it forces `true` after the row's `DefaultJS`. The stored preference
  wins afterwards, but the initial default can never follow reduced motion
  without plugin code.
- Consequence: task-01 would edit a callback that has no effect, and V-006/L10
  would expect a behavior that cannot be observed.
- Contract correction: remove the reduced-motion default. Text Effects starts on
  (native), and the General row lets players turn it off. Keep `\EFFECT` rare
  (already in D-021).
- User decision (2026-09-29): accepted (D-022a): Text Effects starts on, which is native; players turn it off in the Options row; no reduced-motion default.

### R2-F-002 — AutoColor silently misses accented names, and the real targets are rare

- Severity: medium
- Source: `spec.md` › "Native text treatment (D-021)" › Folklore names;
  `task-03.md`; narrativa contract
- Evidence: AutoColor builds `new RegExp('\\b' + name + '\\b', 'g')` without the
  Unicode flag (`text-pipeline.js:111`), and JavaScript's `\b` is ASCII-only.
  Names starting or ending with an accented letter never match: Ivaí (44
  occurrences), Andirá (13), Floraí (14), Boitatá. The actual folklore-creature
  names are rare in the copy: Saci 2, Corpo-Seco 2, Matinta 2, and Boitatá,
  Mapinguari, Iara, Cuca and Pisadeira once each.
- Consequence: the feature colors a handful of words, skips others with no
  warning (so the same name renders inconsistently), and adds a parameter plus a
  verification item for little player value.
- Contract correction: remove AutoColor from D-021, which is the recommended
  option. The alternative is to restrict the list to names with ASCII
  boundaries, exclude accent-final names, and check each one in the pilot.
- User decision (2026-09-29): accepted (D-022b): AutoColor removed; the ASCII `\b` bug is recorded as a Coreto follow-up in spec.md. After seeing the fix effort (one line upstream, but Coreto is in code freeze here), the user chose removal. Reopens if a fixed Message Core arrives before task-03.

### R2-F-003 — Structural `\n` inside a `<WordWrap>` wrapper collapses into a space

- Severity: medium
- Source: `spec.md` › key and markup model (picture text); `task-03.md` (CE039,
  CE117)
- Evidence: with word wrap on and `LineBreakSpace=true`, `layout.js:97` replaces
  every `\n` with a space; only `<br>` survives as a break. CE039 destination
  cards are
  `\FS[21]\V[173]\n\n\FS[19]Sob a igreja…`: the name, a blank line, then the
  description.
- Consequence: after `<WordWrap>` is added, the destination name and description
  run together on one line in both languages. The spec never says to convert
  structural breaks.
- Contract correction: state that structural breaks in wrappers become `<br>`,
  for example `<WordWrap>\FS[21]\V[173]<br><br>\FS[19]$[dest.a.desc]` (the
  memorial CE059 already does this). V-001/task-07 already reject a leftover
  `\n` in picture text.
- User decision (2026-09-29): accepted (D-022c): structural breaks in `<WordWrap>` wrappers become `<br>`, as in CE059.

### R2-F-004 — The NW.js window title stays in Portuguese

- Severity: low
- Source: `spec.md` › "Game title (D-019)"; `task-02.md`
- Evidence: `rpg-maker/The Dryland Drowned/package.json` has
  `window.title: "Afogados em Terra Seca"`. D-019 covers only `System.gameTitle`
  and the `index.html` `<title>`.
- Consequence: the packaged desktop build still opens a window titled in
  Portuguese, contradicting D-019's static English title.
- Contract correction: add `package.json` `window.title` to D-019, task-02 and
  V-006.
- User decision (2026-09-29): accepted (D-022d): `package.json` `window.title` becomes “The Dryland Drowned”.

### R2-F-005 — Scrolling-credit key granularity is undefined

- Severity: low
- Source: `spec.md` › key and markup model ("one key per Show Text block"; 105/405
  not covered); `task-05.md`
- Evidence: CE063 has six 405 lines, each with its own `<center>` and `\FS[n]`.
  The scroll window does not word-wrap. Only two lines contain translatable text:
  the title and "Plugins: …". The rest are proper names.
- Consequence: applying the Show Text rule (join with a space) would destroy the
  credit layout. Keying every line adds useless keys for names.
- Contract correction: key 405 lines per line, and only the translatable ones,
  with wrappers kept in the event (for example `<center>\FS[32]$[credits.title]`).
- User decision (2026-09-29): accepted (D-022e): credits keyed per line, only on the title and plugin lines, with wrappers kept in the event.

### R2-F-006 — The credits still name VisuStella after the Coreto migration

- Severity: low (product question)
- Source: CE063 line 6 `<center>Plugins: VisuStella`; D-013
- Evidence: D-013 disabled every VisuStella plugin, and the game now runs only
  Coreto plugins.
- Consequence: a faithful translation would carry a factually stale credit into
  both languages.
- Contract correction: Edney decides the credit wording, for example
  "Plugins: Coreto" with or without a VisuStella acknowledgment. This is not a
  translation choice.
- User decision (2026-09-29): decided (D-022f): keep “Plugins: VisuStella” unchanged; the line is translated faithfully (user: “Manter Plugins: VisuStella”; recommendation was “Plugins: Coreto”).

### R2-F-007 — Port 18727 is the project's generic alternative port

- Severity: low
- Source: `spec.md`/`verification.md`/`tasks.md` (D-020);
  `docs/_memory/local-game-run.md` ("execute `npm start -- --port 18727`")
- Evidence: the project memory tells any session with a busy default port to use
  18727, and the migration session tests the same worktree.
- Consequence: another session can share the candidate's storage. L10's "clear
  the 18727 origin" step could wipe that session's test saves, or pick up its
  settings.
- Contract correction: reserve a port unique to this increment (for example
  18737). Before clearing the origin, check it is not in use by another process.
- User decision (2026-09-29): accepted (D-022g): exclusive port 18737, with an `lsof` ownership check before clearing its origin.

## Residual Risks

- The migration diff that D-020 turns into the baseline includes edits to
  `coreto/src` and `Coreto_*.js`, which the project rules mark read-only. That is
  the migration owner's decision, but localization will build on it.
- Under `<WordWrap>`, picture-text wrap measurement starts at x=0 while drawing
  starts at the zone's computed x. Centered labels could wrap slightly
  differently from their measurement. The A1 pilot and V-003 must observe this;
  the CE059 precedent reduces the risk.
- This round is a self-review. An independent reviewer or L15 may still find
  issues in the amendments.
