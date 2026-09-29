---
round: 03
reviewed_fingerprint: commit 524cc10 (spec, reviews 01–02, tasks), on top of the D-020 baseline d17d886
verdict: FIX_BEFORE_SHIP
decisions_recorded: 2026-09-29; all four corrections accepted without interview (executability only, no product decision) and incorporated
---

# Spec Peer Review — Round 03

Rounds 01–02 covered runtime behavior. This round checks executability: whether
the operations that the tasks prescribe exist in the installed Coreto CLI and do
what the spec assumes. It also re-reads the committed documents for internal
contradictions. It was performed inline by the agent that authored the
amendments, switching to adversarial review; no independent subagent was used.
Only read-only CLI operations (`--help`, `api describe`, `list`, `get`) were run.
No file other than this review was written, and no game was started.

## Coverage

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | spec, tasks 01–09 | clear |
| Authority and disciplines | spec key and markup model, task-05, verification V-001 | finding (R3-F-002, R3-F-003) |
| MZ runtime and lifecycle | `rmmz_windows.js` message pagination, Dryland plugins | clear |
| Saves and compatibility | no change since round 02 | clear |
| Presentation and assets | epilogue `<br>`, credits | finding (R3-F-003) |
| Verification and QA / executability | `coreto/tools/coreto/texts.mjs`, `message-language.mjs`, `language-table.mjs`, `options` CLI | finding (R3-F-001, R3-F-002, R3-F-004) |

### Clear verdicts (evidence-backed)

- **One key per block is executable.** `message text set --path text` on a 101
  splices the block's 401 lines to the supplied lines (`texts.mjs:95–101`). A
  one-line value collapses the block, as D-018 requires.
- **Common Events are valid text targets** when the index points to a 101, 102 or
  PictureTextChange header (probed on CE263, index 14).
- **Choices keep their 402 captions in sync.** `--path choice:N` also rewrites the
  matching 402 caption (`texts.mjs:71`), so `$[key]<Bind Picture…>` stays
  consistent with the editor's branch labels.
- **Picture text keeps its annotations in sync.** A picture-text set also rewrites
  the 657 annotation lines (`texts.mjs:103–109`).
- **Longer English does not clip.** Native `Window_Message.needsNewPage`
  (`rmmz_windows.js:5129`) continues overflowing text on a new page, and Coreto
  does not override it. V-003 still watches for awkward mid-sentence breaks.
- **Dryland plugins do not read message or choice text,** apart from the known
  name-based choice focus.

## Findings

### R3-F-001 — `message language create` writes a 28-language template with sample rows

- Severity: medium
- Source: `task-01.md` ("Create `Languages.tsv` via CLI"); `verification.md`
  Commands; `spec.md` ("exact columns `Key`, `English`, `Portuguese`")
- Evidence: `create` always serializes the built-in template
  (`message-language.mjs:48–55`). Its 29 columns are Key plus 28 languages, and it
  has sample rows `Greeting`, `Farewell` and `Wow`. `validate` checks only
  structure (unique Key column, row widths, keys), not the column set
  (`language-table.mjs:17–36`).
- Consequence: the table ships with 26 unused language columns and three sample
  keys. Implicit key matching (`localization.js:33–40`) would translate any
  command named exactly "Wow", "Greeting" or "Farewell". No planned check would
  notice the extra columns.
- Contract correction: after `create`, task-01 reduces the header to exactly
  `Key`, `English`, `Portuguese`, deletes the three sample rows, and runs
  `validate` again. V-001 checks that the header equals `Key` plus
  `Localization.Languages`, and that no sample key remains.
- User decision (2026-09-29): accepted and incorporated.

### R3-F-002 — Credits instructions are stale, and the CLI cannot edit scroll text

- Severity: medium
- Source: `task-05.md` checklist ("credits use `<br>` in cells") versus D-022(e) in
  the same task and the spec; `texts.mjs:82`
- Evidence: the checklist still describes one credits cell joined with `<br>`,
  which contradicts the per-line decision. `message text get` on CE063's 105
  header returns `INVALID_TEXT_TARGET`, because the CLI supports only 101, 102
  and PictureTextChange headers.
- Consequence: an implementer following the checklist would destroy the credits
  layout, and would find no CLI route for the edit.
- Contract correction: replace the checklist line with "CE063: edit the title and
  plugin 405 lines with native data editing (no CLI text operation exists for
  105/405), keeping wrappers in the event; validate JSON and diff". The spec's
  "use native data editing where the CLI has no operation" already covers the
  method.
- User decision (2026-09-29): accepted and incorporated.

### R3-F-003 — The parity rule counts `<br>`, which D-018 lets differ

- Severity: medium
- Source: `spec.md` key and markup model ("Both columns carry the same inline
  tokens", with `<br>` in the list); `verification.md` V-001; `task-07.md`
- Evidence: D-018 keeps the PT column's existing layout `<br>` (29 in the
  epilogues) and has EN use `<br>` only for intentional breaks. Whether a PT `<br>`
  is layout or intentional cannot be told mechanically.
- Consequence: V-001 either fails all the epilogue blocks, or pushes the
  translator to copy PT line breaks into English, which D-018 was meant to
  prevent.
- Contract correction: apply parity only to `\V[n]`, `<I>`, `\EFFECT`/`<CLEAR
  EFFECTS>` and casing tags, compared as sets per key. `<br>` is free per
  language, and V-003 judges it visually.
- User decision (2026-09-29): accepted and incorporated.

### R3-F-004 — Options categories have no list-insert operation

- Severity: low
- Source: `task-01.md` (new General category with catalog rows);
  `coreto-english-localization.programacao.md`
- Evidence: the `options` CLI offers `lists list` and `parameters get|set|reset`
  (`--value` or `--input <file>`), but no insert for `/Categories`
  (`options --help`; `options api describe /Categories`). The catalog rows
  `textLocale`/`textEffects` exist only in the plugin's default `/Categories`.
- Consequence: task-01 has to rewrite the whole `/Categories` array. Without a
  stated procedure, the Áudio rows' callbacks could be altered while being
  re-serialized, or the catalog rows retyped by hand.
- Contract correction: task-01 reads the current `/Categories` and takes the two
  rows from `options api describe /Categories --json` defaults. It builds the
  new array in a JSON data file in the session scratchpad (not the repository;
  consistent with D-016), writes it with `options parameters set --path
  /Categories --input <file> --expected-hash <hash>`, and confirms that the Áudio
  rows are unchanged except `Name`/`TextStr`.
- User decision (2026-09-29): accepted and incorporated.

## Residual Risks

- Self-review limits from round 02 still apply. L15, the independent agent,
  remains the first reviewer uninvolved in authoring.
- The D-018 A1 pilot, which checks that wrapped labels fit, is still the main
  open runtime risk.
