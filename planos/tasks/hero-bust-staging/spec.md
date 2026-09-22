---
status: completed
slug: hero-bust-staging
---

# Extend the accepted Gorvak staging to the other hero visits

## Authority and scope

On 2026-09-22 the user accepted Gorvak, including Ivaí's right-to-left entrance, and explicitly requested generalization to all other heroes. The accepted [Gorvak increment](../gorvak-pr17-staging/spec.md) is the reference; its former scope exclusion remains historical. This increment owns only Map038–044/event001/page1: Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith and Draska. The existing GDD and ADRs G004–G006 apply.

## Behavior

- RQ-001: Each hero visit shows the upper body with the feet outside the scene, keeps the head visible and scales around a fixed (0.5, 0.6) anchor. Preserve each artwork's orientation and native image.
- RQ-002: Reuse Gorvak's accepted focus/dimming/entrance timing. Ivaí enters from right to left with the same trajectory and final composition. Reduced motion reaches the same final composition immediately.
- RQ-003: Preserve each hero's texts, identity, formation/menu logic, reading units, HIDE/save behavior and cleanup. The approved Gorvak map remains unchanged.

## Technical design

Copy only the native VNPictureBusts presentation sequence from approved Map037 (SHA-256 `765dc8dbcf136a0dc5cfd09dd7fd33a364912594b9118ee4d363f7ad1b34da7b`). Preserve each target event's nonvisual commands and all branch grammar. Remove focus-time foot compensation. Hero Y is fixed across focus, with per-art values recorded in technical art. Keep the existing hero X offsets to respect the asymmetric artwork. Calibrate the speaking scale from the image's alpha top to Gorvak's visible top at Y=166.7; listening scale is 90% of that scale. Bimbren uses a visual correction because his staff defines the alpha top; Elowen and Vaelith need larger scales and adjusted fixed Y positions because of their transparent canvas margins. Values remain explicit editable native command arguments, not runtime calculations. Ivaí's commands are copied unchanged from the accepted reference.

The [technical-art contract](hero-bust-staging.technical-art.md) records the measured inputs and chosen scales. No assets, vendor, engine, global plugin parameters, dependencies or save-schema changes. Council, farewells, epilogues and other non-visit scenes are outside this request. Existing serialized saves preserve their old visual state until a new hero visit; no save migration is introduced.

## Acceptance and delivery

See [verification](verification.md) and [tasks](tasks.md). The generalization is authorized; individual new compositions need actual visual inspection before a visual PASS. Preserve the devlog moment: hero profile → Ivaí enters from the right → hero takes focus. Gamepad and native zoom tests remain excluded by ADR-G005/G003.
