---
round: 04
reviewed_fingerprint: commit 92dc14f (clean tree) on top of the D-020 baseline d17d886; sha256/12 spec 76a49c782a2f, verification 490373f640f9, tasks fb57166dd4fe, task-01 f1a68f201888, task-02 2e4164462ec5, task-03 57d53ea5d133, task-04 38122e08776d, task-05 fe1c090ea406, task-06 2650e976d91c, task-07 f39ae8118e2c, task-08 268a499eec0e, task-09 de091a85e3fc, narrativa 43b86c255ac8, programacao 6ca5f340d090, technical-art 0809fe87d23f, uiux 37b6add0519d, adr-001 a1b81a182f8b, adr-002 0d99790adb75
verdict: FIX_BEFORE_SHIP
decisions_recorded: 2026-09-29 (D-023, grill-me interview); all five findings incorporated
---

# Spec Peer Review — Round 04

Rounds 01–03 were performed inline by the agent that authored the spec. This
round was run by a separate agent session that did not author the spec, tasks or
amendments. It is still an agent review, not the L15 player-role evaluation. It
checks the spec and tasks against the game data and the Coreto sources at the
baseline. Only read-only inspection was used: file reads and JSON traversal of
`data/`, `js/plugins.js` and `coreto/src`. No CLI mutation was run, no game was
started, and no file other than this review was written.

## Coverage

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | spec RQ-001/004, "Complete text surfaces"; all Maps and CommonEvents at d17d886 | finding (R4-F-001) |
| Authority and disciplines | GDD §1.1 and §19.1, AGENTS.md, ADR-002, discipline contracts, tasks 01–09 | finding (R4-F-002, R4-F-003, R4-F-005) |
| MZ runtime and lifecycle | `message-core/localization.js`, `text-pipeline.js`, `options.js`, `choices.js`; `options-core/categories.js`; `picture-choices/choices.js` at baseline; Dryland_EventBridge/Presentation | clear |
| Saves and compatibility | `save-core/state.js`, `list.js`; SaveCore parameters; EventBridge catalog | clear |
| Presentation and assets | OptionsCore catalog rows, SaveCore vocab, AniMsg presets, picture-text payloads | finding (R4-F-002, R4-F-004) |
| Verification and QA | verification V-001–V-006, task-07 checklist, `rpg-maker/tools/start-game.mjs` | finding (R4-F-001, R4-F-005) |

### Clear verdicts (evidence-backed)

- **Task coverage of the enumerated command types is complete.** Every map and
  Common Event with Show Text, choices, scroll text or PictureTextChange is in
  a task scope: Map002 (03), Map007–022 (04), Map023, 025–027, 029–044 (05);
  CE002 (02), CE003/038/039/117/300–302/304 (03), CE042/043/263–299 (04),
  CE059/061/063/338–346/352–353 (05). Maps 001, 003–006, 024 and 028 have no
  text; every map `displayName` is empty.
- **Spec counts are exact:** 98 PictureTextChange calls, 38 of them with `\n`
  (34 in Map007–022, 3 in CE039, 1 in CE117), and 48 Show Choices.
- **Speaker labels need no keys.** Every 101 speaker field is a proper name
  (Rheed, Ivaí, Andirá, Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora,
  Vaelith, Draska, Pérola, Floraí), so keeping them in the header is correct.
- **Keys resolve in interface chrome.** `Bitmap.drawText`, `measureTextWidth`
  and `String.prototype.format` run `parseLocalizedText`
  (`localization.js:27–32`). `$[key]` therefore resolves in category names, row
  `TextStr`, Save vocab and System terms wherever they are drawn. Category
  command names stay raw keys, so `setCategory` identity does not change with
  language (`options-core/categories.js:95`).
- **Keys held in variables resolve,** including keys embedded in longer strings.
  `convertEscapeCharacters` expands variables (`text-pipeline.js:206`) before
  `preConvertEscapeCharacters` localizes again (`localization.js:25–26`), and the
  key pattern is global. This is the native route R4-F-001 relies on.
- **`<Hide Choice Window>` survives a language refresh.** At the baseline,
  PictureChoices decides the hidden state from the raw `$gameMessage.choices()`,
  so the rebuild triggered by `refreshLocalizedScene` keeps the window hidden.
- **Choice focus behaves as the spec expects.** `convertChoiceMacros` localizes
  the name before `addCommand` (`message-core/choices.js:99–100`). Dryland's
  remembered focus therefore stores localized names, and a language switch can
  drop the remembered choice. The spec already asks to observe exactly that risk.
- **CE004 display names can hold keys.** EventBridge stores the names verbatim
  and only returns them from the `heroName`, `routeName` and `encounterName`
  queries (`Dryland_EventBridge.js:298–348`). No catalog hashing exists. No
  script condition in Maps or Common Events compares display text; they compare
  IDs only.
- **Configuration names exist as written.** The `Localization` fields
  (`DefaultLocale`, `TsvFilename`, `LangFiletype`, `English`, `Portuguese`) exist,
  with `LineBreakSpace=true` and `EndPadding=32`. The presets `SoftShiver`,
  `Flicker`, `Candle` and `Fade` exist in AniMsgTextEffects.
- **The runtime surface works as specified.** `npm start -- --port 18737` is
  supported (`start-game.mjs:10–12`). The server serves `.tsv` as
  `application/octet-stream`, and the loader overrides it to `text/plain`, which
  decodes UTF-8. `Cache-Control: no-cache` makes table edits visible on reload.
- **Rejected candidate:** tasks 02–06 share writers (`Languages.tsv`,
  `CommonEvents.json`). The task loop and ADR-G004–G006 run tasks serially, so
  this is not a concurrency risk.

## Findings

### R4-F-001 — Player-facing text assigned by Control Variables scripts is outside the inventory, tasks and V-001

- Severity: high
- Source: `spec.md` › "Complete text surfaces"; `source-analysis.md` › "Native
  inventory" (counts only 101/401/102/402/105/405 and PictureTextChange; "No
  code355/655"); `task-03.md`, `task-05.md` scopes; `task-07.md` checklist;
  `verification.md` V-001
- Evidence: 68 assignments of 25 distinct Portuguese strings are made with
  Control Variables (code 122, operand Script) and then displayed through `\V[n]`:
  - **Memorial epitaphs:** `V152` in the 16 Common Events `memorial_cause.A1`–`B8`
    (CE125, 134, 143, 152, 161, 170, 179, 188, 197, 206, 215, 224, 233, 242, 251,
    260), for example CE134 `"Sustentou o último tronco<br>para abrir a
    passagem."`. CE059 calls CE347, which calls the matching cause CE. CE059 then
    copies `V152` into `V192–V199` and draws it on each tombstone card
    (`<WordWrap>\FS[24]\V[165]<br>\FS[20]\V[192]…`).
  - **Destination status:** CE039 sets `V176–V178` to `"Disponível"`,
    `"Selecionado"`, `"Bloqueado"` or `"Concluído"`, drawn in pictures 78–80
    (`\FS[20]\V[179]/\V[182] · \V[176]`).
  - **Cast status:** CE117 sets `V153` to `"Presente"`, `"Morto"` or
    `"Presente · No grupo"`, then `V157–V164 = name + ' — ' + status`, drawn in
    picture 71.
  - **Hero visit choice:** Map037–044 set `V153` to `"Selecionar"` or
    `"Retirar do grupo"`, used by the choice `\V[153]<Enable Switch: 30>`.

  None of the 16 `memorial_cause` Common Events is in any task. CE039, CE117 and
  Map037–044 are in scope, but their checklists name only Show Text, choices and
  PictureTextChange. The V-001 and task-07 review enumerates only
  `101/401/102/402/105/405` and PictureTextChange. It also requires every choice
  payload to be "a key plus native control tags". The variable-driven choices
  cannot meet that (`\V[153]<…>` here, and also CE003 `\V[165]<Bind…>` and CE039
  `\V[173]<…>`).
- Consequence: the English game ships Portuguese epitaphs on the memorial, which
  is one of its most emotional screens, plus Portuguese destination and cast
  statuses and a Portuguese choice at every hero visit. V-001 still passes.
  Alternatively, an implementer who enforces the "key plus tags" rule replaces
  `\V[153]` with a fixed key and freezes a label that must alternate.
- Contract correction:
  - Add "Control Variables script literals shown through `\V[n]`" to Complete
    text surfaces. Store the unresolved key as the value (for example
    `"$[memorial.cause.a2]"`). This is the same native route as the CE004 display
    names: it keeps keys unresolved in variables and saves, and it resolves in
    concatenations such as CE117's.
  - Assign the 16 `memorial_cause` Common Events to task-05, the CE039/CE117
    literals to task-03 and the Map037–044 literals to task-05. The CLI text
    operations do not target code 122, so use native data editing.
  - Epitaphs are inscriptions: apply the D-021 `<I>` rule. Their Portuguese
    `<br>` are layout breaks, so the D-018 rule for Portuguese and English breaks
    applies.
  - V-001 and task-07 also scan code-122 string literals. They accept a variable
    reference as a choice or picture payload when every value assigned to that
    variable is a key or a preserved proper name.
  - Add a source-analysis addendum with these counts.
- User decision (2026-09-29): accepted (D-023a–c). Keys go in the variable values through native data editing. CE039 and CE117 go to task-03; the 16 `memorial_cause` Common Events and Map037–044 go to task-05. The cause line is a factual caption, so it gets no `<I>`; this replaces the italic suggestion above. V-001 traces `\V[n]` payloads to their assigners.

### R4-F-002 — Animated text ignores the confirmed reduced-motion requirement

- Severity: medium
- Source: `spec.md` › "Native text treatment (D-021)" and "Native option…"
  (D-022a); `coreto-english-localization.uiux.md`; `verification.md` V-003/L11;
  GDD §1.1 (line 81: "Mantêm-se teclado, foco visível, texto legível e redução de
  movimento") and the QA policy on line 83 ("movimento reduzido em escala
  padrão")
- Evidence: the game applies reduced motion everywhere. 263
  `Dryland_Presentation:MotionPreference` calls store `prefers-reduced-motion` in
  `V47`, and bust entries, exits and tones use `Duration:
  $gameVariables.value(47) ? 0 : 20`. The memorial (CE059) and the tavern
  disappearance (§19.1) follow the same rule. AniMsgTextEffects has no
  reduced-motion support and forces `textEffects=true` when no preference is
  stored (`ani-msg-text-effects/options.js:1–10`). The proposed `SoftShiver` is a
  position shake, and `Flicker`, `Candle` and `Fade` animate opacity. R2-F-001
  presented only the missing native default. It did not mention the GDD
  requirement or the existing `V47` pattern, and the spec records no exception to
  §1.1.
- Consequence: a player whose operating system asks for reduced motion gets
  animated text on the first playthrough. This is the only animation in the game
  that ignores that preference. V-003 and L11 never test with reduced motion on,
  so the conflict would not be observed.
- Contract correction (Edney chooses one):
  - (a) Drop `\EFFECT` from D-021 and keep `<I>` and casing. This is the smallest
    change.
  - (b) Keep effects only as an event-level wrapper around the key, branched on
    `V47` with the existing pattern: `\EFFECT<X>$[key]<CLEAR EFFECTS>` when
    motion is allowed, `$[key]` otherwise. This needs a pilot to confirm that
    reading-unit boundaries stay intact with duplicated Show Text branches.
  - (c) Keep D-022a, but record an explicit exception to GDD §1.1 with Edney's
    decision, and add a reduced-motion observation to V-003.
- User decision (2026-09-29): decided (D-023d). Animated text keeps the plugin's standard behavior: on at start and switched off in the row (D-022a stands). The GDD records an exception scoped to animated text in §1.1 and the QA policy; `V47` keeps governing every other motion. User: “Mantenha os textos animados com o comportamento padrão do plugin. remova/atualize essa sessão no GDD”, then chose the text-only exception.

### R4-F-003 — Required authority updates have no task owner

- Severity: medium
- Source: `spec.md` › "Translation data and authoring ownership" ("record it in
  the GDD when the table lands"); ADR-002 › "Record the reciprocal GDD link when
  the table lands"; `AGENTS.md:17`; `spec.md` › "Demonstrable moment"; tasks 01–09
- Evidence: no task checklist records the partial supersession in GDD §1.1/§26
  or the reciprocal ADR-006 link. `AGENTS.md:17`, an instruction every agent
  loads at startup, still says "Mantenha conteúdo nos eventos nativos". No spec,
  ADR or task lists it for update. Task-07 updates only `rpg-maker/README.md`. No
  task owns collecting the devlog captures named in "Demonstrable moment", and
  task-09 does not mention them.
- Consequence: after delivery, the two authoritative sources for any later
  change, the GDD and AGENTS.md, still send prose edits to native events. An
  agent that follows them edits Show Text directly. That overwrites `$[key]` or
  creates Portuguese-only prose, which the table model was designed to prevent.
- Contract correction: task-07 records the ADR-002 supersession in GDD §1.1/§26,
  with the reciprocal link, and adds a one-line update to `AGENTS.md:17`: native
  events own the scene, and `Languages.tsv` owns player prose. Author that line
  with the `writing-agents-md` rules. Task-09 collects the devlog captures after
  V-005 acceptance.
- User decision (2026-09-29): accepted (D-023e). Task-07 updates the GDD and `AGENTS.md:17` when the table lands. Task-09 collects the devlog captures after V-005.

### R4-F-004 — Options and Load screens keep English literals in Portuguese

- Severity: low
- Source: `spec.md` › "Complete text surfaces" (known fields); `task-01.md`
  ("keeping both rows' callbacks native"); `verification.md` V-006
- Evidence: the `textEffects` catalog row's `DrawJS` hardcodes `const off =
  'OFF'; const on = 'ON';` (OptionsCore `/Categories` default), so every player
  sees "ON/OFF". SaveCore `SaveMenu.LatestText` is `NEW!`, drawn on the newest
  save in the Load list. `SaveConfirm.VocabSaveSuccess` is `Save Successful!`,
  though a manual-save path may not be reachable. None is in the known-field list,
  and task-01 forbids the only route that can key ON/OFF (editing `DrawJS`, which
  D-017 allows when no string field exists).
- Consequence: Portuguese players see English in the new General row and on the
  Load screen, contrary to RQ-004's "no accidental mixtures". Otherwise task-02
  discovers them late, and task-01 prevents the fix.
- Contract correction: add `SaveMenu.LatestText` and
  `SaveConfirm.VocabSaveSuccess` to the known fields. For ON/OFF, Edney chooses
  one of two routes. Either edit the row's `DrawJS` literals to `$[ui.options.off]`
  and `$[ui.options.on]`, recorded as a D-017 callback change and allowed by
  task-01, or keep "ON/OFF" as an intentional control label, as the game already
  does with "FAST" and "AUTO". In the second case, record the exception.
- User decision (2026-09-29): decided (D-023f). `ON`/`OFF` stays as an intentional control label, like FAST and HIDE, with no callback change (user: “Manter ON/OFF”). `SaveMenu.LatestText` is keyed. `SaveConfirm.VocabSaveSuccess` is inventoried as unreachable, because the game has no manual-save route.

### R4-F-005 — Stale statements after rounds 02–03 and the baseline commit

- Severity: low
- Source: `spec.md:18–23`, `spec.md` › "Decisions and approval", authority map;
  `verification.md:139–147`; `coreto-english-localization.programacao.md`
  (allowed production surfaces); `tasks.md` (baseline gate); `verification.md`
  V-006 setup/inputs
- Evidence:
  - The spec cites "technical decisions D-009–021" and rounds 01–02. Its closing
    decision summary omits D-022, and the authority map omits review 03.
  - The verification audit still says no task files are part of the delivery,
    and it calls the provider-migration edits "uncommitted". The tasks exist, and
    the migration was committed as d17d886.
  - The allowed production surfaces omit `package.json` (D-022d). The `tasks.md`
    gate list omits `package.json` and `Languages.tsv`. The V-006 inputs omit
    `package.json`.
- Consequence: executors and reviewers read contradictory authority. An edit to
  `package.json` looks out of contract, and the audit misdescribes the delivery.
- Contract correction: update these statements, with no behavior change.
- User decision (2026-09-29): accepted (D-023g), incorporated with no behavior change.

## Residual Risks

- The baseline d17d886 patches `coreto/src` and `Coreto_*.js`: PictureChoices
  reads `<Hide Choice Window>` from raw choices, and array numbers are decoded.
  This goes against the Coreto code freeze, and the commit records it as a
  migration decision. If a redelivered Coreto bundle lacks these patches, for
  example the AutoColor follow-up, `<Hide Choice Window>` would regress after a
  language refresh. The spec's reopen rule (V-006 plus the A1 pilot) detects
  this. Carrying the patch upstream belongs to the migration owner.
- Single-line picture texts are not wrapped: CE038 "Destino não escolhido", the
  CE039 status line and the labels in CE042/043/061/304. Longer English there
  relies only on the V-003 visual check.
- Without `--no-open`, `npm start` opens the user's own Chrome
  (`start-game.mjs:76–79`). Automated smokes should pass `--no-open` and drive
  their own browser, so only agent-owned tabs are created.
- The A1 wrapped-label pilot is still the main open runtime risk. L15 remains the
  first player-role evaluation.
