---
id: "05"
status: pending
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

- [ ] Pass the D-020 baseline gate.
- [ ] Map sources and hashes; translate per glossary and translator guide.
- [ ] Apply keys (`--dry-run` first); credits use `<br>` in cells.
- [ ] CLI validate, JSON parse, focused diff.
- [ ] Smoke credits and one epilogue in English on port 18737.

## Validation

Execution mode/reference: supporting static checks; runtime proof in 09 (L13).
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + diff review | Slice fully keyed; structure unchanged | Execution Notes |

## Execution Notes

