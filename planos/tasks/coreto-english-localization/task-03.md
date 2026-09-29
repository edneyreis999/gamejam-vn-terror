---
id: "03"
status: completed
depends_on: ["01"]
verification_ids: []
---

# Task 03 — Localize prologue, preparation and campaign feedback

## Outcome

The prologue, tavern preparation, party selection and destination panel read in
the selected language, including picture overlays and route/encounter/hero
display names, without changing domain identifiers.

## Authority

- `spec.md`: RQ-001, RQ-003, RQ-004; CE004 display names, PictureTextChange
- `coreto-english-localization.narrativa.md`, `coreto-english-localization.programacao.md`
- `verification.md`: supports V-001; L11 variable-to-key rendering in 09

## Scope

- Data: `data/Map002.json` (Prólogo); CommonEvents CE003, CE004
  (ConfigureRoute/Encounter display names → unresolved keys; hero proper
  names kept), CE038, CE039, CE117, CE300–302, CE304.
- Variable-held text (D-023a): the Control Variables (Script) literals in CE039
  (`V176–V178`: “Disponível”, “Selecionado”, “Bloqueado”, “Concluído”) and
  CE117 (`V153`: “Presente”, “Morto”, “Presente · No grupo”, concatenated
  into `V157–V164`) become unresolved keys, by native data editing. The
  `\V[n]` payloads that show them stay in the event.
- Picture text: PictureTextChange payloads in those events via
  `message commands update`; keep picture IDs, alignment, bindings, font escapes.
  Replace manual `\n` breaks in CE039 (3) and CE117 (1) with `<WordWrap>` in the
  wrapper, outside the key (D-018). Structural breaks (name / blank line /
  description) become `<br>` in the wrapper (D-022).
- Docs: seed `glossary.md` (names, folklore creatures, recurring terms) and
  `translator-guide.md` (voice, horror, accessibility rules from D-006/D-007,
  D-018 markup and D-021 treatment rules, with a list of treated keys).
- Tests: none new. Delete targets: none.

## Checklist

- [x] Pass the D-020 baseline gate before editing maps/Common Events.
- [x] Extract PT copy per event into `source-map.md` with hashes.
- [x] Translate; replace payloads with `$[key]` (one per Show Text block),
      preserving speakers, escapes, placeholders, reading-unit IDs and control
      flow. Keep control tags and block wrappers in the event. Apply `<I>` to
      voices and inscriptions in both columns.
- [x] CE004: store keys in display-name fields only; domain IDs unchanged.
- [x] CE039/CE117: replace each script literal with its quoted key and record
      the variable and its assigners in `source-map.md` (D-023a/c).
- [x] CLI validate, JSON parse, focused diff (only text payloads changed).
- [x] Smoke on port 18737: prologue and destination panel in both languages; a
      dynamic route/encounter name renders translated; the wrapped CE039
      descriptions fit, with the name on its own line; a destination status
      and the cast list read translated.

## Validation

Execution mode/reference: supporting static checks; runtime proof in 09 (L11, L13).
Invalidates/reuses: glossary reused by 04/05.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + diff review | Slice fully keyed; only text fields changed | Execution Notes |

## Execution Notes

Executed 2026-09-29 on top of tasks 01–02. Table after this task: 80 keys.

### Pilot (D-016)

`prologue.tavern.rheed.1` (Map002 first block), `route.physical.name` (CE004)
and `dest.physical.desc` (CE039 card with `<WordWrap>`) first. On 18737: the
PT block rendered with the same wrap as before; switching to English through
the message-console Options button refreshed the same line in place; the
Destinations card showed “The Church Path”, a blank line and the wrapped
description. The rest of the slice was applied after that.

### What changed

- Map002 (9 blocks) and CE300–302 (3 blocks): `message text set --path text`,
  bottom-up so indexes stay valid. One key per block; speakers (Rheed, Ivaí)
  stay in the 101 header.
- CE004: 16 encounter and 3 route `name` fields → `$[enc.*.name]` /
  `$[route.*.name]`. IDs unchanged; hero names unchanged.
- CE038, CE039, CE117, CE304 PictureTextChange arguments, CE003/CE039/CE117
  choices and the CE039/CE117 status literals: native data edits (exact
  string replacement, each match count asserted). Reasons: the CLI rejects
  the PictureTextChange commands because they still carry the plugin ID
  `VisuMZ_1_MessageCore` (`COMMAND_MISMATCH`, migration baseline, not
  changed here), rejects CE003's choice block because its 402 captions differ
  from the 102 text (`INVALID_TEXT_TARGET`), and has no code-122 operation.
- CE039 route 402 captions aligned to their `\V[173–175]` 102 text (editor
  labels only).
- Manual `\n` breaks: CE039 (3 cards) and CE117 (1 list) now use
  `<WordWrap>` with structural `<br>` in the wrapper.
- `campaign.irati_02_01.narrator`: Irati's written note uses `<I>` in both
  columns instead of “ ” (D-021).

### Decisions

- A variable that holds a key stays in the event wrapper: the pipeline
  resolves keys once, between two variable passes
  (`coreto/src/message-core/text-pipeline.js` `convertEscapeCharacters`), so a
  key-valued `\V[186]` inside a cell would print raw. This slice keeps every
  `\V[n]` in the wrapper.
- `choice.encounter.reread` and `choice.encounter.retreat` were created for
  the CE304 picture labels; task-04 must reuse them for the matching 102/402
  in Map007–022.
- `Auto` (party counter) stays literal in both languages.
- Trailing spaces at the end of some 401 lines were dropped when joining
  (they do not render).

### Validation

- `message language validate --format tsv`: `keys: 80`,
  `languages: ["English","Portuguese"]`; no tabs or straight `"` in cells.
- `core validate --json`: `valid: true`, only `/QoL/OpenConsole`.
- Structural comparison against d17d886: every Common Event and Map002 has
  the same command codes, indents, 101 headers, choice counts and settings,
  402 branch indexes, 122 targets and 357 plugin/command/picture/padding/ID
  arguments. Only text changed, in CE002–004, CE038, CE039, CE117, CE300–302,
  CE304 and Map002.
- Remaining non-keyed strings in the slice are proper names, editor-only 402
  captions, `Auto`/`✓`, comments and JS expressions (listed in
  `source-map.md`).
- Maps no task names (Map001, 003–006, 024, 028) hold no player text.

### Smoke observation (not L11/L13)

Own server on 18737, File 2 campaign created by normal play, 1280×720:

- EN prologue, e.g. “The maps were incomplete. Ivaí admitted it as soon as
  he unrolled them. Part of the way was still unknown.”
- EN tavern: “No destination chosen”, “Party 0/3”, “Destinations”, “Cast”,
  “Depart”.
- EN Destinations: The Church Path / Haunted Waters Park / The Broken
  Village, each name on its own line above its wrapped description; statuses
  “0/5 · Available”, “0/6 · Locked”; “Close”.
- EN Cast: “Gorvak — Present” … “Draska — Present”; `V157` holds
  `Gorvak — $[cast.status.present]` and renders resolved; “Close”.
- PT Destinations: Caminho da Igreja / Parque das Águas Assombradas /
  Vilarejo Partido with their descriptions wrapped, “Disponível”,
  “Bloqueado”, “Fechar”.
- Not observed: the CE304 encounter header with a dynamic encounter name
  (needs a party of three and a departure; the conversation choices are
  task-05 copy, and the mouse-driven attempt toggled one hero instead). L11
  owns it. A dynamic route name did render translated through `V173`.

### Stale assertions for QA (not edited)

`suites/formation.mjs:348` expects the destination label to include
“Caminho da Igreja”; with English as the default it reads “The Church Path”.

