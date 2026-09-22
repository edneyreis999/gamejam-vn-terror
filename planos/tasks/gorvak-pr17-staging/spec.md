---
status: completed
slug: gorvak-pr17-staging
---

# Restore Gorvak's PR #17 staging

## Authority and scope

The user explicitly requested this correction on 2026-09-22 after the technical comparison: retain the half-body portraits, hide the feet, restore Ivaí's smooth entrance, and limit the change to Gorvak. PR #17 commit `85fc7b03f932337d2daaa100dc830c9b6e0c307d` is the visual reference. The completed `approved-narrative-dialogue-staging` spec remains historical; this increment replaces its adapted Gorvak framing only. The canonical GDD and ADRs G004–G006 apply.

## Behavior

- RQ-001: Gorvak's interaction uses the PR #17 portrait framing, with the lower bodies outside the visible conversation area. Focus scales about the configured (0.5, 0.6) anchor without a compensating foot alignment.
- RQ-002: Ivaí enters smoothly from right to left before “O que espera encontrar nessa viagem, Gorvak?”. On 2026-09-22 the user accepted the restored framing and requested this direction change as the only correction to the PR #17 reference. Preserve the distance, duration, final position and image orientation; reduced motion retains the current instantaneous alternative and reaches the same final composition.
- RQ-003: Preserve dialogue, formation, observation identities, HIDE, menu continuity, native saves and cleanup. No other hero or scene changes.

## Technical design

Only Map037/event001/page1 changes at runtime. Retain native VNPictureBusts commands and current control flow. Use X=320/960, Y=725, speaking scale=50%, listening scale=45%, normal focus/entry duration=20 frames. Retain the reference's initial position command and remove integration-added position compensation after focus scale commands. Restore normal durations on entry/focus commands that currently overwrite the shared picture duration with zero. Retain reduced-motion branches and native explicit picture cleanup.

No engine/vendor, global plugin configuration, asset, dependency, narrative, audio or save-schema change. Existing native saves retain their serialized visual objects; the corrected staging is established on a fresh visit to Gorvak. No old-save visual migration is promised.

Ivaí's `Basic_EnterBust` uses position 8 and StartOffsetX=-640 with HorzMirror=None. With the unchanged native 1280-wide screen and ScreenX formula, this starts at X=1544 and approaches X=960 over 20 frames. This mirrors the reference's X=376 → 960 path horizontally around its destination; Y=725, scale and tone remain unchanged. The plugin negates this offset when HorzMirror is None, so a negative offset starts to the right.

## Delivery

The [technical-art contract](gorvak-pr17-staging.technical-art.md) owns framing and timing. [Verification](verification.md) owns evidence and pending human judgment. [Tasks](tasks.md) records execution. Gamepad and native browser zoom tests are excluded by ADR-G005/G003. Demonstrable devlog moment: the transition from Gorvak's profile into Ivaí's question, followed by Gorvak's reply.
