---
status: approved
owner: UI/UX — Pati
---

# UI/UX — Conversation continuity and speaker focus

[Spec](spec.md) owns requirements; [ADR-002](adrs/adr-002.md) owns accepted interview decisions; [verification](verification.md) owns evidence.

## Accepted surface

- Heroes on the left; Ivaí and other non-heroes on the right. Andirá is the accepted left-side exception, opposite Ivaí and confined to the reflection.
- Keep original art orientation. Do not auto-mirror characters.
- Keep participants visible while listening. The speaker has normal tone and greater apparent size; listeners are slightly smaller and softly dimmed. A small forward movement reinforces speaking.
- For every one of the eight tavern heroes, treat the profile and subsequent Ivaí dialogue as one conversation. Preserve the hero across the passage boundary and introduce Ivaí with his first line. Include all selection and full-party lines as one-person feedback; no hero is reserved for a later delivery.
- At the Council demand for explanations, introduce all eligible heroes together. Hide hero busts for Andirá; after his exit restore them to the same positions for their opinions. Ivaí stays right.

## Delegated prototype settings

Under [ADR-003](adrs/adr-003.md), these values are the starting prototype baseline for autonomous calibration, not individually chosen user measurements or claims of visual verification. Tune only within the accepted direction and record final authored values with visual evidence. No tuning sample or conversation requires approval to continue.

| Effect | Initial prototype baseline |
| --- | --- |
| Active size | 100% of the character's calibrated conversation base, not 100% of raw PNG dimensions |
| Listening size | 90% of that same calibrated base |
| Active tone | Normal |
| Listening tone | Soft uniform RGB reduction (-24, -24, -24), gray 0; avoid the reference's stronger Dark preset |
| Focus movement | Active target 16 px toward the center from its resting position; return to the absolute rest target when listening |
| Focus timing | 20 frames with InOutSine movement; scale/tone use the plugin's supported interpolation |
| Entrance / exit | 20 frames, short 32 px offset, OutSine / InSine, collective exit per conversation |
| Reflected/prison-bound art | Keep movement inside the established visual enclosure; zero displacement when needed to preserve that constraint |
| Reduced motion | Apply final states immediately; no entrance, focus or exit interpolation |

Changing focus resets previous listeners/speakers to explicit absolute targets, so repeated dialogue cannot accumulate size or displacement. A single active character stays at its base instead of pulsing between consecutive boxes. Layer order stays fixed; the effect does not promise to draw the speaker over every other portrait.

## Conversation boundaries

| Context | Start and persistence | End |
| --- | --- | --- |
| Tavern Conversar, all H1–H8 | Begin before profile; hero remains into speech; Ivaí enters on his first line | After last speech box, exit both before returning to formation/status feedback |
| Tavern selection / full party, all H1–H8 | One hero after the validated selection/rejection result | Exit after feedback; do not bring Ivaí in merely as listener |
| Farewell | Committed victim's bust during farewell | Exit before contextual death narration |
| Lovers | Speaking lover on their existing discovery line | Exit before unrelated narration, receipt or map assembly |
| Council initial narration | Preserve existing unpopulated composition | Challenge/solo stage introduces participants as contracted |
| Council challenge | All eligible heroes visible together, neutral because this is narration; no invented speaking hero | Retain into confession |
| Council confession | Ivaí enters right; heroes listen | Intervention hides hero busts |
| Andirá | Reflected Andirá left, Ivaí right | Remove Andirá before restoring heroes for opinions |
| Council opinions | Restore the complete eligible roster; focus one speaker, retain Ivaí and listeners | Prototype baseline: collective exit before opening the final-choice menu |
| Epilogues | Eligible hero on the left, one-person presentation | Exit before next epilogue/credits; do not carry heroes between epilogues |

The Council finale menu boundary, neutral narration treatment and reduced-motion settings are part of the delegated prototype baseline under ADR-003. Other listed boundaries preserve existing content/scene separation or accepted interview decisions. Presentation-only returns do not repeat narrative lines or imply that heroes left the Council in fiction.

## Input, readiness and failure

Keep bottom text/names legible throughout motion. HIDE hides UI and leaves the composition; restoration consumes the input without advancement. Preserve mouse/keyboard flow and existing skip-only-seen rules.

Images and initial transforms must be ready before a box becomes readable. Intentional focus interpolation may accompany reading; it must not expose a wrong asset or the global default scale first. Do not add an arbitrary input lock beyond the actual transition boundary. Before a next scene/choice takes ownership, finish or explicitly settle the outgoing composition. Skip/abort cancels directly and cannot leave a late entrance.

Native Retry remains the loading failure surface. No new text-only fallback, custom error dialog, button, history panel or public QA control is introduced.

## Acceptance

The executing agent verifies readability, stable placements, visible focus and input behavior at 1280×720 effective game area and a larger supported area. Normal/reduced motion, HIDE, rapid valid advancement, same-speaker continuity and a maximal 3x1 composition are required, with runtime and visual evidence. Exact framing belongs to Technical Art; tests alone do not prove the experience. Pati/user review remains available as non-blocking refinement. No task waits for that review, and absent feedback is not reported as human acceptance.
