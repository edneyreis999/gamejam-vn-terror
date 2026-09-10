---
name: rpg-maker-mz-state-management
description: Models RPG Maker MZ state so source facts stay minimal, derived values stay computed, and invalid quest, event, scene, battle, save, or UI states are not representable. Use when designing or reviewing switches, variables, self switches, plugin state, interpreters, saves, scenes, stores, or asynchronous game flows. Don't use for implementation details before the state model is understood.
---

# RPG Maker MZ State Management

Model domain truth first and map it to MZ storage second.

## Core taxonomy

- **Source state:** authoritative facts that must be stored.
- **Derived state:** values computed from source state and current context.
- **Finite state:** mutually exclusive modes such as `locked`, `available`, `active`, `completed`, or `failed`.
- **Engine state:** map, scene, interpreter, battle, party, switches, variables, and self switches owned by RPG Maker.
- **Plugin state:** domain facts owned by a plugin rather than an event page or scene object.
- **Persistent state:** data that survives save/load and new-scene reconstruction.
- **Ephemeral state:** timers, sprites, windows, interpreters, listeners, and handles that must not enter a save.
- **History state:** checkpoints, undo data, audit events, or previous snapshots.

## Iron rules

- Keep one authority for each fact.
- Compute derived values instead of synchronizing copies.
- Replace mutually exclusive booleans with one explicit status.
- Model updates as domain events and guarded transitions.
- Keep effects at engine boundaries; effects respond to transitions rather than defining truth.
- Store only data that can be serialized and restored with the required compatibility.
- Treat event pages as projections of state, not independent authorities for the same fact.

## 1. Inventory

Read `AGENTS.md`, relevant plugins, data and event definitions, save hooks, scenes, tests, and discipline contracts. List every current or proposed value, its readers, writers, lifetime, persistence, and authority.

Done when: every value is classified and duplicate authorities are visible.

## 2. Define invariants and events

State valid combinations, impossible combinations, finite modes, domain events, guards, transition results, and boundary effects. Include refresh, page changes, transfer, battle, party, scene, new-game, and save/load transitions only when affected.

Done when: each event has valid source states and one deterministic state result.

## 3. Choose placement

Read [the MZ placement reference](references/rpg-maker-mz.md) in full. Use [plain JavaScript](references/no-library.md), [TypeScript modeling](references/typescript-modeling.md), or [async state](references/async-state.md) when those branches apply.

Done when: each source fact has one storage owner and each ephemeral object has a cleanup owner.

## 4. Review or implement

For design, present the inventory, invariants, events, transition table, placement, and save contract before code. For review, read [the review checklist](references/review-checklist.md) in full and lead with concrete invalid states or synchronization defects. Preserve behavior during refactors unless the approved contract changes it.

Done when: stored values are necessary, derived values are computed, invalid states are removed, lifecycle boundaries are explicit, and tests can observe every invariant.
