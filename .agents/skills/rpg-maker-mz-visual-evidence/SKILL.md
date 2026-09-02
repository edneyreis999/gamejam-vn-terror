---
name: rpg-maker-mz-visual-evidence
description: Captures and validates deterministic RPG Maker MZ visual evidence for scenes, maps, cutscenes, windows, sprites, HUDs, and effects. Use when a spec assigns visual, camera, layout, or presentation claims. Don't use screenshots to prove hidden state, audio, input feel, or event logic.
---

# RPG Maker MZ Visual Evidence

Capture the real game surface at a reproducible state. Use the project's declared capture method; desktop playtest, NW.js automation, or manual capture are all valid when they preserve the same observable.

## 1. Define the contract row

Read `AGENTS.md`, `verification.md`, the owning discipline contract, and any named visual reference. Define map/scene, save or setup, switches and variables, party, plugin parameters, resolution, scale, input step, animation frame or wait point, and expected composition.

Done when: the state and viewport can be recreated without visual guesswork.

## 2. Capture

Render the reference when one exists, then capture the implementation at the same state and resolution. Store the bundle under the project QA evidence convention; otherwise use `docs/qa/evidence/<scenario>/<run>/`. Follow [the bundle template](assets/bundle.template.md).

Done when: reference, implementation, metadata, and any diff use matching conditions.

## 3. Inspect

Check framing, positions, layering, cropping, text, windows, sprites, lighting, animation phase, camera, transitions, placeholder assets, and cleanup only where owned by the contract. Record authorized deltas. Use human judgment for aesthetic or comfort claims.

Done when: every visual criterion has a direct observation and unresolved mismatches are explicit.

## 4. Validate the bundle

Confirm files open, metadata binds revision and inputs, images have expected dimensions, references resolve, and the verdict is `PASS`, `FAIL`, or `BLOCKED`. Update `verification.md` with bundle paths.

Done when: the visual claim is reproducible and does not stand in for another sensor.
