# Interview Protocol

Use for both stages of a spec interview. Reuse accepted answers and settled decisions; never repeat an interview or approval already completed. Stop interviewing when the stage's artifact can be written correctly.

## Facts and decisions

Finding facts is the agent's job: inspect project files, installed tools, engine documentation, and the loaded best-practices skills before asking. Never ask the user something the project can answer. When the user states how something works, check it and surface any contradiction before building on the claim.

Decisions belong to the user. Put each unresolved decision to the user; do not settle it through convenience, apparent simplicity, or an implementation preference.

## Frontier rounds

Map the open decisions as a tree: each decision unlocks the decisions that depend on it. The **frontier** is every open decision whose prerequisites are already settled. Ask the whole frontier in one round, numbered, each with a recommended answer:

```
**Q1 — <title>**: <question, with concrete options and their consequences>

Recommended: <answer and one-line reason>
```

A question that depends on another question in the same round belongs to a later round. Continue independent fact-finding while waiting. After each answer, recompute the frontier.

Prefer concrete proposals and trade-offs. Chase vague answers: "it depends" gets "on what?". Stress-test a load-bearing decision with one concrete scenario at its boundary ("the player saves mid-cutscene and loads; what do they see?").

## Stages

- **Stage 1 — Product.** Motivating Problem, players and authors affected, desired behavior, scope, non-goals, business rules, and edge-case outcomes. Questions concern what happens, not how it is built.
- **Stage 2 — Surface and Technical.** How the behavior reaches the player and the author (screens, controls, editor surfaces, content locations), which existing capabilities deliver it, and the technical responsibilities and risks that remain.

## Existing capability before custom code

Propose deliveries built from capabilities verified to exist: engine-native features and installed third-party extensions or tools, on equal footing. Choose whichever verified option best meets the behavior. An unknown capability stays an uncertainty; never present it as available.

A request for a gameplay outcome is not a request for custom code. Custom code — a new project-owned component, an extension of existing project-owned code, or script embedded in content — enters the discussion only when the user explicitly opens it.

When the requested behavior exceeds verified capabilities, explain the gap at the point of choice with a short comparison:

| Choice | Player-facing behavior | Additional responsibility |
| --- | --- | --- |
| Use the existing capability | <What it delivers, without the unsupported part> | <Configuration and integration checks> |
| Explore custom code | <The full requested behavior> | <New state, coordination, and maintenance to examine before committing> |
| Postpone the unsupported part | <Delivered now without it> | <The refinement stays out of this increment by the user's decision> |

The user chooses. When the user postpones the unsupported part, offer to record it under Known Issues to Record. Never silently drop the desired behavior or silently commit custom work. Avoid speculative effort estimates; name the concrete responsibility instead.

If the user opts for custom code, establish before committing: the responsibility it owns, the state and coordination it introduces, the interactions it touches, its dependencies, and what disappears when it is disabled. Custom code must be modular: disabling it removes its own feature without breaking other components. Do not promise that a feature survives disabling the component it depends on, and do not treat "decoupled" as proof of no maintenance.

## Shared-pattern changes

Fire when the proposal adds to or alters how similar components already do something (configuration, authoring, content organization, tooling, verification), or when it creates the first component of a family that later components will likely repeat. A resource-specific difference that changes no shared expectation does not fire.

Compare against the closest existing components, not the whole project, and explain:

1. The current convention and its evidence, or that none exists yet.
2. What the proposal changes.
3. Which existing components or workflows would differ afterward.
4. What this increment requires versus optional work to make the project uniform.

For a first-of-family component, ask once: local exception, or the start of a common pattern?

The user chooses to preserve the current pattern, accept a deliberate local exception, or adopt a new shared pattern. For a new shared pattern, the user also chooses when the uniformity work happens:

- **Now:** the affected components enter this spec's scope.
- **Follow-up:** propose one known issue per coherent gap, each describing the difference and the affected components. List them in the spec's Known Issues to Record section; creating them is part of this spec's delivery work.

The alert never authorizes expanding work to other components on its own.

## Authoring location and authority

Fire when the design decides where authors will edit content, or integrates content authored outside the game (scripts, documents, spreadsheets, generated data). Present the location as a decision with its alternative and cost. Prefer locations the designer can find and edit in the engine's normal editor workflows, with readable fields rather than code or opaque strings. Record one authority for each piece of content; any remaining copy becomes archived history, not something to keep synchronized.

## Verification proportionality

Fire when presenting the verification plan for approval. State the heavy runs it requires (full playthroughs, many variants, special hardware or environments). When the user named a method, when the plan carries a costly dimension the change does not touch, or when a project policy applies ambiguously, offer the lighter alternative with its residual risk and let the user choose.

## Recording

Record ordinary choices in the spec where they apply and consequential ones in Part II's Key Decisions with rationale and rejected alternatives. Keep a genuinely blocking choice explicit in Open Questions; never assume it.
