# Spec Template

Structure for `_spec.md`, the main document of a spec package. Part I states what the increment delivers and why; Part II states the technical responsibilities, evidence, and choices that delivery depends on, without designing the implementation. Omit a section that does not apply; leave insufficiently known material in Open Questions rather than guessing.

```markdown
---
status: draft            # draft | approved
slug: <slug>
created: YYYY-MM-DD
approved_on:             # set only on explicit user approval
approval: ""             # the user's approving words and where they were given
---

# <Increment Title>
```

---

# Part I — Product

Implementation choices belong to Part II unless the user made them a product constraint.

## Overview

- **Motivating Problem**: the concrete need that triggered this spec and the simplest end-to-end behavior that addresses it, observable by playing or authoring the game. The first playable outcome delivers it.
- Who it is for: players, designers or authors, or both.
- Why it is valuable.

## Goals

Outcomes stated as observable behavior:

- What players or authors can do after delivery that they could not before.
- What the game guarantees once the increment exists.

## User Stories

Index into `_user_stories.md`; do not restate stories:

- One line per feature area: the `US-NNN` range and its theme.
- [Full user stories](_user_stories.md)

## Core Features

- Feature name: what it does, why it matters, high-level behavior.
- How the features interact.

## Business Rules

Game rules the delivery must enforce, stated precisely:

- Invariants that always hold ("a reward is granted once per save").
- State and progression rules: which states exist, what may move where, and when.
- Calculations, limits, and defaults with their exact values.
- Persistence: what survives saving and loading, what resets.

## User Experience

- Player journey through the increment, step by step.
- Author journey: where the designer finds and changes the content and settings this increment introduces, and how they see the result.
- Accessibility and readability requirements.

For screens, menus, HUD, and controls, index `_uiux.md` instead of restating it.

## Constraints

Fixed boundaries the user decided: required integrations, supported platforms and runtimes, performance felt by the player, content or rating limits.

## Non-Goals

Capabilities the user decided this increment will not include, and why. An exclusion records a user decision, never size management: when a wanted capability does not fit, it moves to a named follow-up, never silently out of scope.

## Open Questions

Decisions still needed. Never park a question an existing decision or Non-Goal already answers.

---

# Part II — Technical

Part II serves the behavior in Part I and the companion surfaces. It names responsibilities, evidence, and choices, not an implementation design.

## Scope Boundary

One statement: what the first playable outcome delivers and how it addresses the Motivating Problem, what follows within this spec, and what is out of scope.

## Delivery Approach

How the behavior is delivered, per feature:

- The verified existing capability used (engine-native feature or installed extension), with the evidence for its exact behavior, or the unknown that remains.
- Any gap discovered, the comparison presented, and the user's choice.
- For custom code the user chose: the responsibility it owns, the state and coordination it introduces, its dependencies and affected interactions, and what disappears when it is disabled.

## Programming Responsibilities

What programming must make true, stated as outcomes ("progress survives save and load", "the reward cannot be granted twice"), not as designs. Omit when no programming is needed.

## Affected Game Surfaces

Only the surfaces this increment changes, each with its impact: game data and content, scenes and screens, input, rendering, audio, assets, persistence, tooling, packaging. Unaffected surfaces need no entry.

## Shared Pattern Changes

Only when the interview found one. Per change: the current convention and its evidence (or "first of its family"), the proposed difference, the components or workflows that would differ, required versus optional uniformity work, and the user's choice (preserve, local exception, or new shared pattern; uniformity now or as follow-up).

## Known Issues to Record

Only for work the user deferred and asked to record: uniformity left by a shared-pattern change, a postponed part of a feature, a limitation, or an idea. Per known issue: a title, the gap it describes, and the affected components. Each becomes a `docs/known-issues/KI-NNN-<slug>.md` record, numbered when created, that links back to this spec. Creating them is part of this spec's delivery work.

## Known Issues Addressed

Only when this spec takes up recorded known issues. Per issue: its `KI-NNN` link and whether this spec addresses all of it or which part. On approval the record becomes `planned`; on delivery, `resolved`, or narrowed to the remaining part. Those updates are part of this spec's delivery work.

## Key Decisions

Decision, rationale, trade-offs, rejected alternatives, and the user's decision source, for every consequential choice.

## Known Risks

Risk, likelihood, mitigation, and what needs prototyping or playtesting to resolve.

## Assumptions and Defaults

Every assumption made and default chosen, with its value.

## File References

The read-first index for whoever plans and implements this spec: each project file the spec depends on, with one clause on why it matters. Use `path:line-start-line-end` when a region carries the relevant rule.

## Amendments

Dated entries for changes made after the first approval: what changed, why, and the user's decision source.
