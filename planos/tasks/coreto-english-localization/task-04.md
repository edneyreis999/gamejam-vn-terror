---
id: "04"
status: pending
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

- [ ] Pass the D-020 baseline gate.
- [ ] **A1 pilot (D-018):** key Map007 completely. On port 18737, in both
      languages, confirm that the choice window stays hidden, bindings work, the
      "Recuar" switch gate holds, and the three wrapped labels fit their
      pictures. If a label does not fit, stop and return the decision to Edney.
      Record the outcome before keying the other 15 maps.
- [ ] Map sources and hashes per encounter; translate per glossary; one key per
      Show Text block; D-021 treatment for supernatural voices.
- [ ] Apply keys map by map with `message text set` / `message commands update`
      (`--dry-run` first).
- [ ] Per map: CLI validate, JSON parse, diff limited to text payloads.
- [ ] Smoke one more encounter end-to-end in English (choice → outcome), with
      Text Effects on and off if it contains an animated beat.

## Validation

Execution mode/reference: supporting static checks; runtime/visual proof in 09.
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + per-map diff | 16 maps and listed CEs fully keyed; structure unchanged | Execution Notes |

## Execution Notes

