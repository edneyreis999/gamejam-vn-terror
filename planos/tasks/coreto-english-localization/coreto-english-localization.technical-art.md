---
status: approved
---

# Technical Art — localized image text

Owns only the image portion of RQ-001/004 in [spec.md](spec.md). This is not
permission to redesign scenes, replace existing art generally or approve historic
placeholders as final.

Inspect every referenced image visually for readable text. Record source image,
scene use, whether text is baked in or drawn by PictureTextChange, and disposition.
Text-free assets are retained once for both languages. Native drawn overlays
are localized through the table and do not need duplicate bitmaps.

For baked-in text, deliver final Portuguese and English variants preserving
composition, dimensions, anchors, transparency and non-text art. Use only native
LanguageImages `[XX]` substitution/configuration and matching paths. Verify both
languages, default English and switching back. Do not change file names that
serve control logic without accounting for their native consumers.

The initial MapComplete image inspection found no readable text; the remaining
audit is still required. If the complete audit finds no baked-in text, record
that evidence and make no asset variants. No fabricated translation image may
substitute for an observed runtime screenshot.
