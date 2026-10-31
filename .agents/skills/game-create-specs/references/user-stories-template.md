# User Stories Template

Structure for `_user_stories.md`, the canonical behavior catalog of the spec. Every story, acceptance criterion, and edge case lives here only; `_spec.md` indexes it, `_uiux.md` derives states from it, and `_tests.md` and `_playtest.md` cover it by ID.

## ID Rules

- Stories are `US-NNN`. Acceptance criteria and edge cases are numbered within their story and referenced as `US-NNN.AC-N` and `US-NNN.EC-N`.
- IDs are permanent once written: never renumber or reuse. Mark a dropped story `(withdrawn)` in the index instead of deleting it.

## Document Skeleton

```markdown
# User Stories: <Increment Title>

Canonical behavior catalog for <increment>. Companion to `_spec.md`.

## Personas

- **Player** — <who they are in this increment and what they need from it>
- **Designer** — <the author who edits this increment's content and settings in the editor>

## Story Index

| ID     | Feature Area | Persona | Story                    |
| ------ | ------------ | ------- | ------------------------ |
| US-001 | <area>       | Player  | <one-line story summary> |

## <Feature Area>

### US-001: <Short title>

**As a** <persona>, **I want** <capability>, **so that** <outcome>.

Acceptance criteria:

- AC-1: Given <starting game state>, when <player or author action>, then <observable result>.

Edge cases:

- EC-1: <condition> → <behavior the player or author observes>.
```

## Edge-Case Sweep

Probe each class against the changed behavior only. Record material findings as `EC` entries with their expected behavior; a class that does not apply needs no entry, and there is no quota per story. Dismiss a class after an actual probe, not because the story looks simple.

| Class | Probe |
| --- | --- |
| Repetition and re-entry | Triggering the action again, revisiting the place, replaying the scene: does it repeat, and should it? |
| Save and load | Saving before, during, and after; loading an earlier save: what persists, what resets? |
| Interruption | Battle, menu, scene change, defeat, or quitting mid-flow: what state remains? |
| Ordering | Prerequisite skipped, steps out of order, sequence broken: what does the player see? |
| State transitions | Acting on something already used, defeated, completed, or removed. |
| First use and empty | New game, nothing collected yet, empty party or inventory, zero resources. |

## Writing Rules

- Describe behavior the player or author observes, never implementation ("the reward appears once", not "a flag is set").
- One story per capability; every AC can be marked true or false by playing or authoring.
- Every EC states the condition and the expected behavior.
- Give the designer their own stories when the increment introduces content or settings to edit: where they find it, what they change, how they see the result.
