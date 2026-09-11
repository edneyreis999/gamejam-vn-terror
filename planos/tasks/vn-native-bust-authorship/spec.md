---
status: approved
---
# Native bust authorship and restoration

Authorized by the user on 2026-09-11: create a new branch, remove EventBridge bust validation and focus, and give the artist control through VNPictureBusts event commands. This replaces the visual ownership in [vn-focus-parameters](../vn-focus-parameters/spec.md) and [vn-slot-authorship](../vn-slot-authorship/spec.md), including the pending speaker-scale adjustment. Campaign rules and narrative validation remain authoritative and unchanged.

- RQ001: accept VNPictureBusts command payloads without an EventBridge whitelist of command names, values, images, origins, curves, scales, durations or picture IDs. The native vendor owns their interpretation. Keep the event graph's structural and campaign boundaries; this does not authorize arbitrary campaign mutations in presentation helpers.
- RQ002: remove the EventBridge Focus command, five style parameters, focus calculation and base bookkeeping. Migrate existing focus to editable native visual commands, with shared native helpers for repeated compositions. Preserve text, choices, art bytes and current default framing. The artist owns subsequent validation and direction, including orientation.
- RQ003: restoration extracts only the visual prefix of the selected text box, including inherited sections and native helper/roster branches. Execute that prefix through the installed VNPictureBusts implementation, without a second renderer or transform evaluator. Restore final targets without replaying waits, dialogue, choices, campaign effects, checkpoints or one-shot battle animations. Continuous visual effects may restart their cycle. Vendor expressions are author code evaluated again against current state and must be pure; exact historical expression results and mid-animation timing are not promised.
- RQ004: native playback honors authored timings and parameters. Restoration owns cancellation, bitmap readiness and cleanup of pictures actually created during the conversation, including arbitrary IDs. Retain reduced-motion support for duration-bearing commands without changing vendor files. Scene return, compatible Continue, HIDE and partial skip must preserve the narrative cursor and campaign facts.
- RQ005: update native revision for migrated event lists; prior saves remain stored and incompatible. No visual-only save-compatibility redesign is included. Update the editing guide and durable design authority; preserve historical specs and pending art/narrative status. No dependencies or remote services. Commit and publication were outside the implementation request; the user subsequently authorized a commit and PR to main after final verification on 2026-09-11.

Programming owns extraction and lifecycle; Technical Art owns every native visual command and focus helper. The [decision](adrs/adr-001.md) records the ownership change. [Verification](verification.md) owns test and live-runtime evidence.

Open decisions: none required for this scope. Devlog: edit a formerly rejected origin, curve or animated scale in CE005, then show the same composition after returning from Options.
