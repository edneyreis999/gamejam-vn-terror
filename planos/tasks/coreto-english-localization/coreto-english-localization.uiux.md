---
status: approved
---

# UI/UX contract

Owns RQ-001/002/004 presentation in [spec.md](spec.md).

Use native Options with a localized General category containing the delivered
language row and the delivered Text Effects row (D-021). Retain Audio and its
four controls, with keyed labels. Show language names in their own language:
English and Português. Key the row labels through `Localization.Name` and
AniMsgTextEffects `Options.Name`. Text Effects starts on, which is native; the
player can turn it off (D-022). Keep native option cycling, persistence,
refresh and title/in-game entry points. No custom selector, restart prompt or
additional navigation. First-time English must allow finding the Portuguese
option through the normal Options route.

Preserve existing font, window size, 32 px word-wrap end padding, layout, bust
staging, controls and player-paced progression. Multi-line picture text,
including the approach labels, uses native `<WordWrap>` in the event wrapper
instead of manual breaks (D-018). The A1 pilot must show that the labels fit in
both languages; otherwise the decision returns to Edney. Adapt translation naturally for
fit without deleting meaning. If a line still cannot fit, use native text markup
or existing editable layout parameters, with visual evidence of the affected
surface. Do not globally shrink text or invent a new pagination engine.

Inspect dialogue/name boxes, long choices, picture overlays, destination labels,
memorial inscriptions, scrolling credits, content warnings, Options and Save/Load
in both languages. Also inspect the D-021 treatments: italic voices and animated
beats with Text Effects on and off, plus CE039 cards whose `<br>` keeps the name
apart from the description. Credits keep their per-line layout. The browser
tab and desktop window show the static title “The Dryland Drowned” (D-019,
D-022). Required display classes are tested at 1280×720; use one
representative 1920×1080 path for scaling risk, not every textual permutation.
No gamepad, native zoom, mobile or new accessibility platform promise.

Changing language must retain campaign choices and the native dialogue position.
Focus behavior remains the existing plugin behavior; no cache patch is allowed.
Observe any loss of usable focus or stale text and report it instead of inventing
a workaround. Native limitations do not become a passing result.

Devlog: native language option, the same atmospheric scene in both languages,
and a readable English choice panel. Use actual gameplay captures after review.
