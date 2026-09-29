---
status: approved
---

# UI/UX contract

Owns RQ-001/002/004 presentation in [spec.md](spec.md).

Use native Options with a localized General category containing the delivered
language row. Retain Audio and its four controls. Show language names in their
own language: English and Português. Keep native option cycling, persistence,
refresh and title/in-game entry points. No custom selector, restart prompt or
additional navigation. First-time English must allow finding the Portuguese
option through the normal Options route.

Preserve existing font, window size, 32 px word-wrap end padding, layout, bust
staging, controls and player-paced progression. Adapt translation naturally for
fit without deleting meaning. If a line still cannot fit, use native text markup
or existing editable layout parameters, with visual evidence of the affected
surface. Do not globally shrink text or invent a new pagination engine.

Inspect dialogue/name boxes, long choices, picture overlays, destination labels,
memorial inscriptions, scrolling credits, content warnings, Options and Save/Load
in both languages. Required display classes are tested at 1280×720; use one
representative 1920×1080 path for scaling risk, not every textual permutation.
No gamepad, native zoom, mobile or new accessibility platform promise.

Changing language must retain campaign choices and the native dialogue position.
Focus behavior remains the existing plugin behavior; no cache patch is allowed.
Observe any loss of usable focus or stale text and report it instead of inventing
a workaround. Native limitations do not become a passing result.

Devlog: native language option, the same atmospheric scene in both languages,
and a readable English choice panel. Use actual gameplay captures after review.
