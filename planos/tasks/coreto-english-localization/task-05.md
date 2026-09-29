---
id: "05"
status: completed
depends_on: ["01", "03"]
verification_ids: []
---

# Task 05 — Localize council, closings, epilogues and conversations

## Outcome

The council, the three closings (Reunir, Destruir, Perda total), memorial,
closure lines, epilogues, hero conversations and scrolling credits read in the
selected language.

## Authority

- `spec.md`: RQ-001, RQ-003, RQ-004; scrolling credits `105/405`, memorial,
  approved title pair
- `coreto-english-localization.narrativa.md`, `coreto-english-localization.uiux.md`
- `verification.md`: supports V-001; L13 in 09

## Scope

- Data: `data/Map023.json`, `Map025.json`–`Map027.json`, `Map029.json`–`Map044.json`;
  CommonEvents CE059, CE061, CE063 (scroll text), CE338–346, CE352–353.
- Variable-held text (D-023a): the memorial cause `V152` in the 16
  `memorial_cause.*` Common Events (CE125, 134, 143, 152, 161, 170, 179, 188,
  197, 206, 215, 224, 233, 242, 251, 260; dispatched by CE347 and copied by
  CE059 into `V192–V199`), and the hero-visit choice label `V153`
  (“Selecionar” / “Retirar do grupo”) in Map037–044. They become unresolved
  keys by native data editing. The `\V[153]<Enable Switch: 30>` choice stays
  in the event. The cause line is a factual caption with no `<I>` (D-023b);
  its Portuguese `<br>` stay in the PT column, and EN keeps only intentional
  breaks.
- Preserve character voice per hero and the approved title pair.
- Scrolling credits (CE063): key per line, and only the title and the plugin
  line, with `<center>`/`\FS` kept in the event. The plugin line stays
  “Plugins: VisuStella” in both columns (D-022).
- One key per Show Text block. The epilogues' 29 PT `<br>` stay in the PT
  column; EN relies on word wrap and keeps `<br>` only for intentional breaks
  (D-018). Apply D-021 treatment to inscriptions, memorial lines and
  supernatural voices.
- Tests: none new. Delete targets: none.

## Checklist

- [x] Pass the D-020 baseline gate.
- [x] Map sources and hashes; translate per glossary and translator guide.
- [x] Apply keys (`--dry-run` first) to Show Text and choices.
- [x] Replace the memorial-cause and hero-visit script literals with quoted
      keys; record each variable and its assigners in `source-map.md`
      (D-023a/c).
- [x] CE063 credits: no CLI text operation exists for 105/405, so edit only the
      title and plugin 405 lines with native data editing. The title line becomes
      `<center>\FS[32]$[credits.title]` and the plugin line
      `<center>$[credits.plugins]` (“Plugins: VisuStella” in both columns). Other
      lines stay literal. Validate the JSON and review the diff.
- [x] CLI validate, JSON parse, focused diff.
- [ ] Smoke credits, one epilogue and the memorial cards (cause line) in
      English on port 18737. Deferred to L13 (task-09); see Execution Notes.

## Validation

Execution mode/reference: supporting static checks; runtime proof in 09 (L13).
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + diff review | Slice fully keyed; structure unchanged | Execution Notes |

## Execution Notes

Executed 2026-09-29 on top of tasks 01–04. Table after this task: 451 keys.

### What changed

- Show Text through `message text set` (bottom-up per page): Map023 council
  (25 blocks, the two identical Rheed blocks 191/236 share one key),
  Map025–027 closings (2 each), Map029–036 epilogues (2–4 each), Map037–044
  conversations (9 each, with `conv.party_count` and `conv.ivai.help` shared
  by all eight), CE338–346 memorial lines, CE352–353 closures.
- Council choice (Map023) through `message text set --path choices`.
- Native data edits: the conversation choices and their 402 captions (the
  402 of the middle choice read “Selecionar / Retirar do grupo” while the 102
  shows `\V[153]<Enable Switch: 30>`, so the CLI refused the block; the
  caption was aligned to the 102), the `V153` literals in Map037–044, the
  `V152` memorial causes in the 16 `memorial_cause.*` events, the CE061 skip
  hint and the two CE063 credit lines. Other credit lines stay literal.

### Decisions for Edney

- D-021 applied mechanically: every block wrapped in “ ” uses `<I>` in both
  columns (Rheed's council narration and closures, Ivaí's two council lines).
  The heroes' council lines have no quotes in the source and stay plain.
- Andirá's line is the only animated beat: `<I>\EFFECT<Underwater>…<CLEAR
  EFFECTS></I>` in both columns (existing opacity preset; water spirit tied to
  drowning). The syntax matches the AniMsgTextEffects help. **Superseded in
  task-09:** Underwater faded the words to low contrast on the light message
  box (darkest pixel 133 vs 72 with Text Effects OFF), so the preset is now
  `SoftShiver` (movement, full opacity).
- Draska's plaque (`epilogue.draska.4`) is an inscription: `<I>`.
- Epilogue blocks split mid-sentence in the source (Elowen, Griznik,
  Seraphina, Bimbren, Vaelith, Draska); English splits at the same point.
- Two epilogue blocks end without a period in Portuguese (Griznik 3,
  Bimbren 3); PT keeps it, English ends with a period.
- Memorial causes: PT keeps its layout `<br>`; English has none (word wrap)
  and no `<I>` (D-023b). B1, B3 and B7 causes use singular “their” because
  the hero is not known in advance.

### Validation

- `message language validate --format tsv`: `keys: 451`,
  `languages: ["English","Portuguese"]`; no tabs or straight `"`.
- `core validate --json`: `valid: true`, only `/QoL/OpenConsole`.
- Every map and Common Event against d17d886: no structural difference
  (codes, indents, headers, choice counts and tags, 402 indexes, 122 targets,
  357 plugin/command/IDs). A sweep of all 401/405/102/402/122-literal/picture
  text leaves only proper names, `Auto`, the literal credit names and the
  internal `reread`/`retreat` action codes.
- Length check: the longest EN cells (~375 characters) can need a fifth
  line; the native message window pauses and continues on a new page when
  text reaches the last row, so nothing is clipped. V-003 judges the result.

### Smoke observation

- EN conversation (Map042, Liora) after a reload: “Party: 2/3”, Talk /
  Select / Back to the tavern, Liora's first answer in English on four lines.
- **Not observed here:** credits, an epilogue and the memorial cards need a
  finished campaign. L13 (task-09) plays an English campaign to an ending with
  a loss, which is where these three surfaces appear, so they are deferred
  there rather than played twice. Andirá's animated line (with Text Effects
  on and off) is in the same journey.

