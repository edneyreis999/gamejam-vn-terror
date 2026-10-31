# Tests Template

Structure for `_tests.md`, the checks that need no human judgment: automated runs, static checks of game data and content, and checks through an external tool such as the editor or a validator. Each check has a stable ID and an observable result, so planning can assign it and implementation can satisfy it. What a person must execute or judge belongs in `_playtest.md`.

## ID Rules

- Checks are `V-NNN`, sequential. IDs are permanent once referenced: never renumber or reuse; mark a dropped check `(withdrawn)`.

## Document Skeleton

```markdown
# Verification: <Increment Title>

Checks that need no human judgment. Companion to `_spec.md`; human checks live in `_playtest.md`.

## Strategy

- Sensors used and how each runs in this project (automated runner, static data check, external tool).
- Representative cases chosen and why they stand for the rest.

## Coverage

| Source       | Behavior                 | Sensor    | Check                  |
| ------------ | ------------------------ | --------- | ---------------------- |
| US-001.AC-1  | <behavior>               | automated | V-001                  |
| US-001.EC-1  | <edge case>              | static    | V-002                  |
| US-001.AC-2  | <behavior a person sees> | human     | `_playtest.md` PT-001  |
| US-002.AC-1  | <behavior>               | existing  | <existing check path>  |

## Checks

- **V-001** (automated): Given <starting game state>, when <action>, then <observable result with exact values>.
- **V-002** (static): <content or data> satisfies <rule>.

## Not Verified Here

- <Behavior or dimension left unchecked, why, and the residual risk.>
```

## Coverage Rules

- Every `US-NNN.AC-N` and `US-NNN.EC-N` has a row whose owner is a `V-NNN`, a `_playtest.md` item, an existing check cited by path, or a one-line reason no check is needed. A row with none of these is a gap.
- Size verification by distinct risk. Give each changed behavior the cheapest sensor that can observe it; cover heavy environments with representative journeys. Reuse existing coverage. There is no quota per feature, edge-case class, enemy, item, or variant.
- When the deliverable runs in more than one environment (for example the editor's test mode and the exported game), each environment the players or authors use needs at least one real check there, or an explicit entry under Not Verified Here.
- When the change alters data that an external consumer reads (the editor, an import tool), that consumer is the sensor; a check asserting the spec's own chosen representation is not evidence the consumer accepts it.
- A check against imported or one-time content is acceptance evidence for this increment, not a permanent fixture, unless its expected value stays valid after future approved changes.

## Case-Writing Rules

- Concrete: real starting state, action, and expected result with exact values. "Verify healing works" is not a check; "hero at 300/1000 HP deals 800 to a 5000 HP target and ends at 1000 HP" is.
- Name what is observed, never how the test is coded: no function, class, suite, or file names.
- One observable behavior per check.
