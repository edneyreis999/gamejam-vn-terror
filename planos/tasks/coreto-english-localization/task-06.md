---
id: "06"
status: pending
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

- [ ] List referenced images from data (not filenames alone).
- [ ] Inspect each visually; record disposition.
- [ ] For baked text: produce final variants preserving size, anchors and
      transparency; request Edney's art approval.
- [ ] Pass the D-020 baseline gate before editing assets or parameters.
- [ ] Configure native substitution only when needed; record the parameter
      change for V-006; smoke both languages on port 18737.

## Validation

Execution mode/reference: visual inspection of assets; runtime in 09 (V-003).
Invalidates/reuses: none.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| (supports V-001/V-003) | Visual audit | Every referenced image classified | `image-text-audit.md` |

## Execution Notes

