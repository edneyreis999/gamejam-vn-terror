---
status: approved
slug: vn-slot-authorship
---

# Positional bust authorship

> **Closure update — 2026-09-11:** the user accepted the consolidated development delivered by [vn-focus-parameters](../vn-focus-parameters/spec.md#accepted-consolidated-delivery--2026-09-11). This document preserves the historical contract, status flags and execution results of this increment; they do not describe a pending task in the current accepted scope. The [current acceptance record](../vn-focus-parameters/verification.md#human-acceptance-and-closure--2026-09-11) owns the final state. Final PNG framing and the historical unavailable-editor sensor remain explicitly deferred; no historical FAIL/BLOCKED result is relabeled as a successful test.


## Objective and authority

Reduce the148 auxiliary Common Events to at most15, using shared slot focus and one native source for playback and recovery. [ADR001](adrs/adr-001.md) records the user's authorization and explicit PNG exclusion. The [GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) governs narrative, sides, continuity, Council and controls; the prior [spec](../vn-picture-busts-dialogues/spec.md) is the implementation baseline.

## Requirements

- RQ001: preserve all258 section identities/282 boxes, exact texts/statuses/choices and campaign rules. Preserve every existing PNG, engine/vendor byte and unrelated package edits. Retain original narrative event IDs1–67.
- RQ002: deliver at most15 named helper events in the published native data; this is not a permanent parser quota for future features or isolated fixtures. Five reusable focus positions cover60–64; reflected Andirá remains65. Native entry selects image and uniform layout base (100% solo/tavern/NPC;60% Council heroes), with common coordinates per slot. Current unstandardized PNGs may not fit; no framing PASS is claimed until user artwork normalization.
- RQ003: finite native Focus command has literal slot, listener percentage/tone, horizontal listening offset and duration. Targets derive from entry-authored scale/position and are idempotent. Same focus avoids restarting unchanged target animation; empty/unowned slots are untouched. Focusing an allocated but empty position is a no-op for the whole composition in playback and recovery; invalid or unowned target positions still reject. No speaker-name inference or per-hero layout JS catalog.
- RQ004: delete all per-box restore recipes. Native `@visualFrom` section metadata explicitly names inherited presentation sources within the same conversation family. Validate references and cycles at boot. Pure composition reduction follows only allowed native helpers/branches/visual commands up to the current text box, ignores nonvisual effects, and emits final native picture operations. Source metadata is not a second script language or a narrative cursor.
- RQ005: Continue, settings return and partial skip use the same reduction and original MZ cursor. Recompute Council projections; never repeat text, domain effects or checkpoints. Preserve bitmap Retry, reduced motion, HIDE and cancellation/cleanup ownership. Source-derived caches remain transient.
- RQ006: deliver editing instructions and fresh native integration/directed evidence for both layout modes. A native edit and inserted same-focus box must reconstruct without another helper. Revise native layout; incompatible old saves remain stored.

## Design and discipline ownership

[Programação](vn-slot-authorship.programacao.md), [UI/UX](vn-slot-authorship.uiux.md), [Technical Art](vn-slot-authorship.technical-art.md) and [verification](verification.md) own the changed surfaces. No narrative/audio/deployment change. Existing EventBridge is extended; plugin activation/order remains unchanged. Data migration starts from the current native baseline, with precondition hashes and a structured content comparison. Common Events68+ may be replaced only after all callers are remapped;1–67 remain stable.

Focus bases and picture interpolation are transient under the conversation owner. The campaign and MZ cursor remain authoritative. Recovery creates only final visual effects and invalidates stale child work. No global focus switches/parallel interpreters are introduced. Unsupported commands, source references, cycles and wrong owners reject rather than silently defaulting.

## Execution

1. Implement native graph, Focus and source-derived recovery.
2. Extend canonical parser/lifecycle/save/authoring tests and run focused then complete suite.
3. Execute affected directed T/C/Continue lots at normal and larger/reduced areas, inspect assigned functional evidence, review/deslop and consolidate.

No art generation, manual-save feature, library change, commit or publication. Prior prison-art/editor limitations remain historical; this increment excludes final standardized-art framing by explicit user instruction.
