---
id: "06"
status: completed
depends_on: ["01"]
verification_ids: []
---

# Task 06 — Audit image text and deliver localized variants

## Outcome

Every referenced image is visually classified as text-free or containing baked
text. Images with text have final PT and EN variants resolved through native
`[XX]` substitution; if none exist, that result is recorded and no variant is made.

## Authority

- `spec.md`: RQ-001, RQ-004; image text rules
- `coreto-english-localization.technical-art.md`
- `verification.md`: supports V-001 and V-003

## Scope

- Assets: images referenced by maps, Common Events, System and plugin
  parameters under `img/` (206 files in `img/pictures`).
- Config: only if variants exist, `LanguageImages:struct` with distinct tokens
  (for example `English=[EN]`, `Portuguese=[PT]`; the shipped `[XX]` is a no-op)
  and `ConvertDefault=true`. The change reopens V-006.
- Docs: `image-text-audit.md` beside this spec (image, use, text?, disposition).
- No placeholders at delivery. Tests: none new. Delete targets: none.

## Checklist

- [x] List referenced images from data (not filenames alone).
- [x] Inspect each visually; record disposition.
- [x] For baked text: produce final variants preserving size, anchors and
      transparency; request Edney's art approval. Not applicable: no player copy found.
- [x] Pass the D-020 baseline gate before editing assets or parameters.
- [x] Configure native substitution only when needed (not needed); record the parameter
      change for V-006; smoke both languages on port 18737.

## Validation

Execution mode/reference: visual inspection of assets; runtime in 09 (V-003).
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001/V-003) | Visual audit | Every referenced image classified | `image-text-audit.md` |

## Execution Notes

Executed 2026-09-29. Result and inventory: [image-text-audit.md](image-text-audit.md).

- 81 referenced files found from data (Show Picture, VNPictureBusts
  `PictureName`, System, plugin image parameters), all inspected visually;
  the A6 carved name and the MapComplete village were re-checked at full
  resolution.
- No image carries player-facing copy, so no variant was made and
  `LanguageImages` is unchanged; V-006 stays closed.
- 22 referenced images still carry the development marks
  “PLACEHOLDER_CENARIO” / “PLACEHOLDER CHARACTER” (18 scenes: church,
  council, three destinations, three endings, eight epilogues, fig tree,
  memorial; 4 busts: Andirá, Pérola, and the two Rheed files). They are not
  translation targets; replacing them before delivery is the art owner's
  AGENTS.md obligation, outside this spec. Flagged for Edney and for the
  release check.
- No runtime smoke: nothing changed at runtime.

