---
status: approved
approved_on: 2026-09-25
owner: Programação
---

# Native event integration and reading lifecycle

Owns the technical design for [spec.md](spec.md). Native JSON events remain executable prose authority. The [source analysis](source-analysis.md) gives event/page, passage and observation IDs. No runtime text loader, JavaScript source change, plugin parameter change or dependency is planned.

## Authored surfaces

| Owner | Permitted delta | Invariants |
| --- | --- | --- |
| Map007–022/event001/page1 | Source descriptions/questions, three labels per map, successes, six approved failures | Autorun/page guards, jumps, ordered approach IDs, actions, 42 other failures, utility choices |
| Map037–044/event001/page1 | Remove preamble; source presentations/selected/full replies; extend native speaker focus for added utterances | Hero-specific guards, selection/rejection conditions, return transfers, menu portrait, existing retained observation IDs |
| Map023/event001/page1 | Two source paragraphs per `opinion.Hn` | Eligibility plan, stable order, focus helpers, Irati/final-choice position and all other Council prose |
| CE266–281 | General source death paragraphs | CE291 caller owns capture/completion; no new action in helper |
| CE282–289 | Source farewells where different, notably H1 | Committed-victim portrait, native exit, same `farewell.Hn` identity |
| CE125/161 | Two exact inscriptions in variable 152's existing string expression | Saved death location, CE347 dispatch, other memorial causes and caption geometry |

Resolve structured anchors before editing. Require exactly one matching map/event/page/passage; fail on missing/duplicate anchors. Preserve JSON layout outside touched fields, command indentation and terminators. Inspect current CLI/catalog help before authoring supported commands; do not replay prior `integrate-prose.py` or reflow scripts over the new checkout.

For approaches, maintain three representations: `102` choices, `402` branch caption and `PictureTextChange` serialized `center:json` on pictures 50–52. Decode/re-encode nested JSON, preserve binding/control tags and font escapes, and leave the branch's assigned approach ID unchanged.

## Removing the profile safely

For hero index n=0..7, retire profile observation ID `82 + 4n`. Remove its two messages, profile-only comments and balanced ObservationBegin/ObservationComplete envelope; do not leave an empty reading that marks deleted content as seen. Keep IDs `83 + 4n`, `84 + 4n`, `85 + 4n` for presentation, selection and full-party feedback. Never renumber/reuse retired IDs or migrate stored `_drylandReadUnits`.

Inspect native picture/focus/preload commands within and around the removed envelope. Preserve any setup needed by the hero's existing menu presence or Ivaí's first line at the retained conversation boundary; remove only profile-specific staging/checkpoint calls proven unnecessary. Keep CE351 preload and the existing caller lifecycle. Preserve no-op safety around absent pictures through existing native conditions, not new plugin patches or arbitrary waits.

Present six source utterances, with native `101` speaker names and `401` text, in the retained conversation observation. Speaker changes trigger the existing hero/Ivaí focus recipes; consecutive lines by the same hero retain focus. Finish observation only after the last source line and required authored cleanup. Selection/full-party observations remain distinct and tied to the same validated result branches.

## Campaign reading and persistence

Preserve `encounter.X.01`, `result.X-n.success.01`, `result.X-n.failure.01`, `death.X.context`, `farewell.Hn` and `opinion.Hn`. Do not derive IDs from text or box counts. Keep ReadingPermission/ReadingEnd around the complete body and one caller-owned ReadingComplete. Reread uses the existing conditional completion path; CE291 remains the completion owner for common-event consequences.

No schema or domain-state change. Native saves can serialize the old interpreter lists; do not promise old-save copy refresh or compatibility, mutate user saves, reset seen flags globally, or add a revision block. Candidate-earned saves are the verification input. Authored-list changes after save creation invalidate the affected QA checkpoints; recreate them with normal player actions.

## Existing test consumers

Observed consumers that require inspection during implementation:

- `tests/helpers/formation.mjs` finds observation units by native commands and is shared by formation/control suites.
- `tests/suites/native-inventory.mjs` IT-047 currently expects four observation units per hero. Update to the three retained IDs and absence of the retired preamble, preserving the inventory invariant.
- `tests/suites/content.mjs` IT-067, IT-069 and IT-071 find or read the profile before exercising editable native staging, Continue and completed-only reading. Retarget their setup to the retained presentation and preserve the independent assertions; do not skip or weaken those cases.
- `tests/suites/formation.mjs` and `native-controls.mjs` consume hero text/units and cover no-mutation consultation, stale entry, HIDE/Options and FAST. Remove obsolete preamble assumptions, not coverage.
- `tests/suites/native-death-context.mjs` owns committed death/location and memorial rendering. Update copy-specific expectations only where superseded.

Use the repository's Node test runner, not a new Jest install. Existing integration fixtures are technical tests, separate from directed-player evidence; no new live campaign/seed/save injection is authorized. Tests that need modification remain in their canonical suite. Expected wording comes from the pinned narrative inputs and exact approved exceptions, not from candidate event output used as its own oracle. Avoid snapshotting whole maps or duplicating all 48 paragraphs as implementation-mirroring unit tests.

## Documentation and cleanup

Update active `rpg-maker/README.md` descriptions of profiles and observation identities when the implementation lands. Keep historical spec/test results unchanged and append only scoped supersession links to maintained ADR records. Carry execution findings into existing FOR/ENC/CAM QA ownership and this increment's verification, without inventing additional bug tickets for the accepted editorial work.

Use the [verification contract](verification.md) for focused regression, directed journeys, rendering and teardown. No script/test/runtime changes are made while authoring this spec.
