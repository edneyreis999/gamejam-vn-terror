---
id: "17"
status: completed
depends_on: ["14"]
verification_ids: [EXV-001]
---

# Task 17 — Implement the experimental Gorvak interaction map

## Authority and outcome

**Subsequent adoption — 2026-09-14:** the user approved the implemented organization and promoted the decisions to [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md). This does not migrate other heroes or approve unrelated presentation/content judgments. See [current acceptance](verification.md#architectural-adoption--2026-09-14).

User-authorized experiment, [ADR-005](adrs/adr-005.md), spec EX-001/002/003/005/006 and verification EXV-001. Create one real H1 interaction map with native content and rules integration. This original execution scope excluded other hero migration and reserved architectural acceptance for a later user decision.

## Owned surfaces

Map037.json/MapInfos.json, CE003 and retired CE005/082–085, Dryland_Presentation ObservationBegin metadata/argument, canonical native-controls and formation tests, affected branch documentation. Preserve shared artwork/provider files, campaign rules, native IDs and old evidence.

## Checklist

- [x] Materialize and validate the structured mutation; map owns menu, text, busts, select/remove/full-party responses and explicit return.
- [x] End source interpreter paths across transfers; explicitly clear owned pictures and redraw from campaign facts.
- [x] Preserve numeric reading identities with an optional map-unit argument; canonical tests distinguish implicit CE and explicit map modes.
- [x] Verify native rule states and meaningful failures through the canonical suites; record exact commands/results.
- [x] Update task status/evidence and hand off the changed surface to the existing QA pair.

Runtime claims remain with task16; the later acceptance of architecture and organization is recorded below, while remaining EXV-004 judgments stay in verification.md. No automatic commit or migration of the seven other heroes.

## Execution — 2026-09-14

Branch `experiment/gorvak-interaction-map`, parent `refactor/native-bust-restoration` at `de4f9768c8fda6cdd075e662fc66e02244ec3d06`. `implement-gorvak-map.mjs` materialized the native map and preserved all nine authored dialogue boxes. CE003 transfers and exits; Map037 owns the actual menu/text/selection/return. CE005/082–085 are retired null slots. ObservationBegin accepts an optional explicit positive integer; existing implicit Common Event callers retain their contract.

A first directed capture exposed an entry-focus overlap: VN duration 0 settles on the next picture tick, but a following 20-frame scale command replaced that initial duration. `fix-gorvak-entry-focus.mjs` makes initial/menu focus immediate while keeping later speaker focus animated. No engine/vendor patch or timing sleep was added. Directed normal/reduced and native-editor evidence belongs to task16; canonical compatibility checks are complete; the final scoped results follow.

Technical completion: native IT006/007/024/062/064/066/067/069/071/077/080 passed with their assigned fixtures. IT080 observes Map037 as the actual root, explicit return, unchanged People1 start time across both transfers, and the dead-H1 entry guard. IT077 separately proves implicit Common Event and explicit map reading IDs, partial cancellation, exactly-once completion, FAST, Options and native serialization. EXV-001 is PASS; human adoption remains pending. The aggregate [canonical result](../../../docs/qa/evidence/eventbridge-minimal-runtime/experiments-20260914/canonical-results.json) records source retention and corrected failures. Task16 owns directed/native-editor evidence and the human decision.
