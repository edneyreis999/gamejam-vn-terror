---
id: "03"
status: pending
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

- [ ] Pass the D-020 baseline gate before editing maps/Common Events.
- [ ] Extract PT copy per event into `source-map.md` with hashes.
- [ ] Translate; replace payloads with `$[key]` (one per Show Text block),
      preserving speakers, escapes, placeholders, reading-unit IDs and control
      flow. Keep control tags and block wrappers in the event. Apply `<I>` to
      voices and inscriptions in both columns.
- [ ] CE004: store keys in display-name fields only; domain IDs unchanged.
- [ ] CLI validate, JSON parse, focused diff (only text payloads changed).
- [ ] Smoke on port 18737: prologue and destination panel in both languages; a
      dynamic route/encounter name renders translated; the wrapped CE039
      descriptions fit, with the name on its own line.

## Validation

Execution mode/reference: supporting static checks; runtime proof in 09 (L11, L13).
Invalidates/reuses: glossary reused by 04/05.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001) | CLI validate + diff review | Slice fully keyed; only text fields changed | Execution Notes |

## Execution Notes

