---
status: draft
slug: <slug>
---

# <Feature>

## Objective

<Player or author outcome.>

## Scope

- <Included behavior>

## Exclusions

- <Explicit non-goal>

## Behavior

### RQ-001 — <Requirement>

<Observable behavior, preconditions, result, and failure behavior.>

## Authority Map

| Source         | Owner                  | Status/version           | Governs       | Will change? |
| -------------- | ---------------------- | ------------------------ | ------------- | ------------ |
| `<local path>` | <discipline or system> | <draft/approved/version> | <facts owned> | <yes/no>     |

## Technical Design

### Game surfaces

- Plugins: <paths or no impact>
- Data/events: <paths or no impact>
- Saves: <schema and compatibility or no impact>
- Scenes/battles/party: <boundaries or no impact>
- Rendering/input/audio/assets: <affected contracts or no impact>
- Tooling/packaging: <affected commands or no impact>

### Event and save lifecycle

<Page eligibility, interpreter ownership, refresh, transfer, battle, scene, new-game, and save/load behavior that applies.>

### Failure and cleanup

<Recovery, idempotency, disposal, and delete targets.>

## Acceptance Summary

| ID     | Expected observable | Verification ID |
| ------ | ------------------- | --------------- |
| RQ-001 | <observable>        | V-001           |

## Open Decisions

- <Only unresolved decisions; empty when approved.>
