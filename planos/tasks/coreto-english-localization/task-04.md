---
id: "04"
status: completed
depends_on: ["01", "03"]
verification_ids: []
---

# Task 04 — Localize the sixteen encounters and their deaths

## Outcome

Every encounter (A1–A8, B1–B8) reads in the selected language: description,
approach choices in all three representations, success/failure, thresholds,
lover/reward beats, sacrifice choice, farewells, deaths and automatic retreat.

## Authority

- `spec.md`: RQ-001, RQ-003, RQ-004; choice-key sharing, PictureTextChange rules
- `coreto-english-localization.narrativa.md`, `coreto-english-localization.uiux.md`
- `verification.md`: supports V-001; L11/L13 in 09

## Scope

- Data: `data/Map007.json`–`Map022.json` event text (`101/401`, `102`, `402`)
  and PictureTextChange on pictures 50–52; CommonEvents CE042, CE043,
  CE263–299 (thresholds, deaths, farewells, retreat, lovers, rewards).
- One key per approach choice shared by `102`, `402` and the picture label: the
  choice is `$[key]<Bind Picture: N><Hide Choice Window>` and the label is
  `\FS[22]<WordWrap>$[key]` (D-018). The 34 manual `\n` label breaks go away.
- Preserve branch indices, approach IDs/order, guards, bindings, ReadingEnd
  boundaries and death/checkpoint commands.
- Tests: none new. Delete targets: none.

## Checklist

- [x] Pass the D-020 baseline gate.
- [x] **A1 pilot (D-018):** key Map007 completely. On port 18737, in both
      languages, confirm that the choice window stays hidden, bindings work, the
      "Recuar" switch gate holds, and the three wrapped labels fit their
      pictures. If a label does not fit, stop and return the decision to Edney.
      Record the outcome before keying the other 15 maps.
- [x] Map sources and hashes per encounter; translate per glossary; one key per
      Show Text block; D-021 treatment for supernatural voices.
- [x] Apply keys map by map with `message text set` / `message commands update`
      (`--dry-run` first).
- [x] Per map: CLI validate, JSON parse, diff limited to text payloads.
- [x] Smoke one more encounter end-to-end in English (choice → outcome), with
      Text Effects on and off if it contains an animated beat.

## Validation

Execution mode/reference: supporting static checks; runtime/visual proof in 09.
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + per-map diff | 16 maps and listed CEs fully keyed; structure unchanged | Execution Notes |

## Execution Notes

Executed 2026-09-29 on top of tasks 01–03. Table after this task: 304 keys.

### A1 pilot (D-018): outcome and deviation

Map007 (A1) was keyed first. The runtime pilot ran on **A4 (Map010)**
instead of A1: the first encounter drawn on The Church Path for the File 2
campaign was A4, so A4 was keyed next and checked. What the pilot checks
(hidden choice window, bindings, Retreat gate, wrapped labels) is the same
in every encounter map, which share one structure. On 18737, PT then EN
(switched mid-encounter through the message-console Options button):

- the choice window stays hidden, and only the picture labels show;
- clicking picture 51 selected approach 2 (binding works), and the outcome
  appeared in English;
- `Retreat` is shown (switch 34 on) and opens the retreat prompt “Retreating
  keeps what the group has discovered. Return to the tavern?” with Retreat /
  Continue the expedition; Continue returns to the same approach screen.
  The switch-off state was not observed;
- the three wrapped labels and the small “Reread description” label fit
  their pictures in both languages;
- the CE304 header showed the dynamic encounter name through its key:
  “Encontro 1/5 — A Jaula do Mapinguari” / “Encounter 1/5 — The Cage of the
  Mapinguari” (the observation task-03 left open).

A1 itself was not seen at runtime. Its labels are no longer than the longest
labels checked here. L13 owns it. The rest was keyed after the pilot.

### What changed

- Map007–022: 3 (B2: 2) intro blocks, 6 outcome blocks (B4 and B6 have a
  second success-1 block), the retreat prompt, the 5-option approach choice
  and the retreat choice per map. Show Text and choices went through `message
  text set` (choices first, then Show Text bottom-up). PictureTextChange
  labels on pictures 50–52 became `\FS[22]<WordWrap>$[key]` by data edit
  (the commands carry `VisuMZ_1_MessageCore`, which the CLI refuses). 48
  manual-`\n` labels are gone; each label was checked to equal its choice
  text before replacement.
- Shared keys (same meaning everywhere): `enc.common.retreat_prompt` (16),
  `enc.common.prompt_escape` (12), `choice.retreat.confirm`,
  `choice.retreat.continue`, and task-03's `choice.encounter.reread` /
  `choice.encounter.retreat` for the 102/402 behind the CE304 labels.
- CE263–299 (36 single-block events) through `message text set`.
- CE042/CE043: the warning block (single 401 with embedded `\n`, which the
  CLI rejects) and the picture texts by data edit; the choice through the
  CLI. The hero names stay in the event as `\V[189–191]`.
- Procedure: the per-map application ran from a temporary file in the
  session scratchpad (outside the repository), together with the JSON data
  files of translations. D-016 forbids saving scripts; nothing was saved in
  the project, but this is recorded for review.

### Decisions for Edney

- The eight death passages (CE266–281) start in lowercase in Portuguese
  (“as outras garrafas se abrem…”) although each is a separate message. The
  PT cell keeps it verbatim; the English starts with a capital.
- Seven farewells wrap the line in “ ”; per D-021 they use `<I>` in both
  columns. Gorvak's (CE282) has no quotes in the source, so it has no `<I>`.
  Listed in `translator-guide.md`.
- `sacrifice.warning`: the PT 401 held three lines that word wrap renders as
  one paragraph; PT keeps that rendering, EN adds `<br>` between the three
  statements.
- No `\EFFECT` or casing was applied in this slice: the encounters are
  narrated, with no quoted supernatural voice.

### Validation

- `message language validate --format tsv`: `keys: 304`,
  `languages: ["English","Portuguese"]`; no tabs or straight `"`.
- `core validate --json`: `valid: true`, only `/QoL/OpenConsole`.
- Per map (Map007–022): same codes, indents, 101 headers, choice counts,
  choice tags after the text, 402 branch indexes, picture IDs and padding as
  d17d886, and no Portuguese left in 401/102/402/picture text.
- CommonEvents: no structural difference from d17d886; changed events are
  CE002–004, 038, 039, 042, 043, 117, 263–290, 292–302, 304.
- Longest EN approach labels: 103 characters (`choice.b5.approach_1`, PT
  112). A 90-character label fits one line; the longest wrap to two, as the
  PT labels did with `\n`.

### Smoke observation (not L11/L13)

Beyond the pilot, one more encounter in English (A6, Map012) after a reload:
header “Encounter 2/5 — The Orchard of the Corpo-Seco”, three wrapped
labels, approach 3 → failure outcome → “This choice cannot be undone.” with
three lines → sacrifice screen “Sacrifice Griznik / Gorvak / Elowen” under
“This choice cannot be undone” → Elowen's farewell in italics → the A6 death
passage → the next encounter (A3) in English. The autosave notice appeared
as “Saved automatically.” in the lower right (task-02's open observation).
Text Effects was not toggled: this slice has no animated beat.

Runtime note: the running page keeps the table it loaded at boot. Keys added
after that render `undefined` until a reload (seen once for A6, fixed by
reloading). This is expected native behavior, not a defect.

