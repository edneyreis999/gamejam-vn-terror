---
id: "18"
status: completed
depends_on: ["17"]
verification_ids: [EXV-002]
---

# Task 18 — Remove the 42 confirmed map authoring shortcuts

## Authority and outcome

**Subsequent adoption — 2026-09-14:** the user approved the implemented organization and promoted the decisions to [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md). This does not migrate other heroes or approve unrelated presentation/content judgments. See [current acceptance](verification.md#architectural-adoption--2026-09-14).

The user's branch request supersedes the earlier no-execution instruction for the [task16 inventory](task-16.md#follow-up-do-tópico-1--remover-atalhos-de-autoria-nos-mapas). [ADR-005](adrs/adr-005.md), EX-004 and EXV-002 own this experiment. Remove only confirmed map shortcuts; retain source history and actual execution paths.

## Owned surfaces

The 29 map files in the task16 inventory, canonical native-inventory/boot expectations and current authoring directions. The operation preserves null slots and every remaining event ID. CE004 configuration, CE351 preload, other destination Common Events and all automatic entry events stay. H1 content retirement belongs to task17, not this removal.

## Checklist

- [x] Reconcile all 42 identities, bodies, triggers and incoming references against current source before mutation.
- [x] Materialize the exact structured removal with preconditions and postconditions; preserve every non-target map field.
- [x] Verify surviving native callers, map metadata, configuration/provider consumers and representative family execution.
- [x] Update authoring directions to the real editable content; record evidence and hand off to task15/16.

Do not invent new wrappers, rename/renumber unrelated events, erase Common Event destinations, remove maps or claim old saves were migrated. The human topic1 decision remains separate.

## Execution — 2026-09-14

`remove-map-shortcuts.mjs` checked every original command list, trigger, condition and image before replacing 42 slots across 29 maps with null. `removed-map-shortcuts.json` records exact identities/destinations. A structural comparison against the parent commit proves all 33 surviving old map events and every non-target map field unchanged; Map037 adds one actual automatic interaction event. All 685 native Common Event calls resolve. Configuration/preload destinations and the seven other hero interactions remain; retirement of H1's five Common Events is separately owned by task17.

Evidence: `docs/qa/evidence/eventbridge-minimal-runtime/experiments-20260914/static-audit.json`. Current authoring directions point to the real editable map/database content in the QA guide. Representative runtime families passed under canonical verification; task16 owns the directed and human evidence.

Technical completion: IT001/047 verify the package, map hierarchy and live references; IT074/075/076 verify preload and native image failure/recovery boundaries. IT005/049/051 execute encounter entry, rereading and success; IT048 exercises all three ending maps with Continue, IT073 all eight epilogue bodies, and IT079 independent native checkpoint branches. EXV-002 is PASS. The [canonical result](../../../docs/qa/evidence/eventbridge-minimal-runtime/experiments-20260914/canonical-results.json) identifies exact passing executions and source equivalence. The original nativeEncounter test helper now returns explicitly from H1 before selecting the next hero. No game fallback was added.
