---
status: approved
approved_on: 2026-09-22
owner: UI/UX
stage: surface-and-technical-design
---

# Trap reading and choice presentation

Owns RQ-001/002/003/005 in [spec.md](spec.md). The player reads a dangerous encounter on desktop, compares three actions and receives the corresponding outcome at their own pace. Preserve the [native interaction baseline](../eventbridge-minimal-runtime/eventbridge-minimal-runtime.uiux.md) and [accepted trap-success presentation](../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.uiux.md). The user approved this contract with the complete spec under D-004; it changes copy fit while preserving visual direction and navigation.

## Surface sequence

| Moment | Visible content | Exit and preservation |
| --- | --- | --- |
| First description | Two source opening paragraphs, then the source's question introducing the approaches, in the existing lower native message window | All boxes finish before the three choices become active. No source heading, Markdown markers, encounter code or bust is added. |
| Approaches | Three complete numbered-source sentences, without numbering, in their current order on pictures 50–52 | Every approach remains available regardless of competency. Preserve separate upper Rever descrição/Recuar controls and their eligibility/focus rules. |
| Reread | The exact same description body, including its question, using the existing reading path | Return to the same choices and remembered focus without changing encounter, RNG, party or progress. |
| Success | Selected approach's complete success paragraph over the same background; no hero or narrator bust | Complete the result once after the final box. |
| Failed approach | Existing approach-specific causal explanation | Explicit eligible-victim choice follows, including the current irreversible-death warning. |
| Selected death | Existing selected hero's farewell and its existing staging, then the accepted general fatal paragraph without a bust | Preserve all reading boxes and the single committed death. B1 uses the approved correction. |

The approved question placement ends the existing description rather than adding another heading or UI panel. It gains no separate reading identity or checkpoint.

## Text fit

Keep native fonts, message-window composition and existing approach art. At intake, the approach picture is 1100×96 logical pixels; three instances are centered at (640,375), (640,490), (640,605), with MessageCore font escape `FS[22]` and padding 8. These are existing authoring values, not proof that revised text fits. Preserve them initially.

The longest new label is B5-1 at 110 characters. Compare all 48 labels in the actual renderer; length alone is not a width measurement. Use authored native line breaks to fit complete labels inside the existing panels, keeping text centered and focus/hit regions aligned. Do not silently shorten prose, shrink the font or add scrolling/tooltips. If the existing panel cannot accommodate the text with native wrapping, reopen this surface contract with the actual failing label and rendering evidence.

Split narrative paragraphs across native message boxes at readable boundaries. Keep all words and their order; preserve paragraph boundaries. The question is included once at the end of the description body. Ensure the last line and advance indicator remain inside the message window and clear of reading controls. Do not add automatic advance, ellipses, speaker names or a new illustration.

## Interaction states

- During unread or partial reading, FAST remains unavailable; a passage becomes seen only after all its boxes are acknowledged. Previously completed units use the existing player-selected FAST behavior.
- Enter/click that closes a box cannot activate the following choice. Held confirmation, HIDE restoration and Options return must not commit an approach or victim.
- Preserve visible keyboard focus and mouse activation for approaches and upper controls. HIDE hides their existing bindings and restores appearance without changing the decision; hidden controls remain inactive.
- Normal/reduced motion reaches the same composition and shows the same text. No new animation, audio or image transition is introduced.
- The one-hero sacrifice case still waits for explicit selection. No countdown or last-speaker condition appears in B1.

## Required evidence — revised under D-005/D-006

[ADR-003](adrs/adr-003-proportionate-prose-verification.md) replaces the original two-viewport/native/E2E plan. Use **1280×720 only**, at standard browser zoom; no 1920×1080, gamepad, zoom, reduced-motion or input-device matrix. Interaction states above remain preserved behavior, not mandatory retests for this prose edit.

Inspect all sixteen choice screens / 48 complete labels in the actual renderer. For narrative text, select risky final boxes from description, success and death: widest/tallest content, distinct control-code formatting and splits near the window/advance indicator/controls. A1/B3 and corrected B1 are sample candidates when representative, not forced random-encounter targets. Record sample IDs and reasons; no exhaustive prose-box viewing is required. A clipping defect expands only the affected sample after repair.

Use saves produced during this spec's own candidate play, through normal inputs, to revisit visual targets. No dependency on preexisting, user-provided or another spec's saves. Recreate affected entries after event-list changes; old serialized prose is not candidate evidence. Save/load serves navigation, not a persistence test.

Task 05 owns the single visual pass and selected viewed captures. Geometry/source checks support but do not replace actual viewing. Do not add HIDE/Options/focus/FAST/Continue or full success/sacrifice journeys as capture prerequisites. [Verification](verification.md) records the sample's limits and explicit waivers; no visual result is claimed during authoring.
