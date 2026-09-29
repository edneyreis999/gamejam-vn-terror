# ADR-002 — Native translation table on the Coreto provider baseline

Status: accepted 2026-09-29 (D-015). Provider scope amended by D-013/D-014;
integration boundary, key model and text treatment amended by D-017–D-021
([peer review 01](../review-01.md)).

## Decision

Localize on top of the full Coreto provider stack that Edney migrated
deliberately (D-013). That migration is owned and validated outside this
increment (D-014); this ADR only uses it. The original motivation, an actual
startup version constraint documented in [source analysis](../source-analysis.md),
justified four providers; the wider migration is Edney's choice.

Use the native `Languages.tsv` as the single editable owner of PT/EN prose, with
stable references in native events. Keep scene flow, speaker attribution,
control tags, block wrappers and rules in their current owners. Show Text is
keyed per block, and multi-line picture text uses native `<WordWrap>`
(D-018). Add the native `textLocale` and `textEffects` rows to the existing
Options configuration. Use Coreto CLI where available, otherwise edit data with
native authoring tools.

Any parameter, tag or callback parameter of the active Coreto plugins may
change, preferring parameters and tags over JavaScript (D-017). No new plugin,
helper script, Coreto source or bundle edit, or workaround. The browser title is
the static English title, never keyed (D-019). Native text treatment follows
D-021. Choice-focus behavior remains native.

## Alternatives and consequences

- Staying on VisuMZ Message does not fulfill the requested Coreto integration.
- Switching only Core/Message fails the installed Message startup version checks
  for Options 1.28 and Save 1.14; disguising versions is not a supported solution.
- Replacing only the four providers matched the evidenced dependency need; D-013
  chose the full migration instead, outside this ADR's ownership.
- Independent translated copies of complete event lists risk control-flow drift.
- Table ownership supports the built-in translation pipeline and review, but
  moves prose editing out of Show Text fields. Native events still own the scene.

On approval, partially supersede only the native-event-exclusive prose editing
rule in GDD §1.1 and init-rpg-maker-mz ADR-006, as referenced there. Record the
reciprocal GDD link when the table lands; do not edit an unavailable historical
artifact or imply its implementation evidence applies here.

No save migration or provider compatibility is asserted by this design. Localized
options, reading, pictures, autosave and Continue require fresh verification.
Sources: [spec](../spec.md), [verification](../verification.md).
