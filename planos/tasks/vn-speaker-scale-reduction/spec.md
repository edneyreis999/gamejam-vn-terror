---
status: approved
---
# Speaker scale reduction

> Superseded in the current workstream by [native bust authorship](../vn-native-bust-authorship/spec.md), which removes the EventBridge focus settings entirely. The original uncommitted fix is preserved in the Git stash created before the new branch.

The user's request on 2026-09-11 authorizes reducing the speaker below its authored base. This increment replaces only the SpeakerScale lower bound in the accepted [focus parameters baseline](../vn-focus-parameters/spec.md). Product authority remains the [canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md).

- RQ001: Plugin Manager and runtime/CLI validation accept integer SpeakerScale values from 1 through 150, default 100. Zero, negatives, fractions and values above 150 remain invalid.
- RQ002: the existing base-relative calculation applies unchanged: a 60% base with SpeakerScale 80 produces 48% on both axes. Listener scale stays independent; neutral focus restores the base. To keep listeners smaller, authors choose a ListenerScale below SpeakerScale.
- RQ003: preserve configured values, native events, PNGs, vendor plugins, plugin order, campaign state and save revision. Saving the setting and reloading applies the current style through the existing compatible-save reconstruction.

Programming owns the metadata and parameter domain; the maintained editing guide owns author instructions. No new scene, asset, animation or lifecycle is introduced. The implementation changes the editor minimum and the shared parser domain together; failures keep the existing Portuguese diagnostic.

Verification uses existing content cases UT-073 (metadata/parser/CLI) and UT-074 (base-relative composition), plus the unit aggregate and content validator. Final framing and an editor/Chrome visual walk are not claimed by these checks. [Verification](verification.md) records results. No open product decision or new art approval is implied.

Devlog suggestion: show the same speaking bust at 100% and 80%, with listeners set below 80%; no capture is required for this parameter-domain change.
