# Known-Issue Template

Structure for `docs/known-issues/KI-NNN-<slug>.md`. Omit a section that does not apply. Keep the record short: it preserves the deferral and what a resuming spec must know, not the solution.

```markdown
---
id: KI-NNN
title: <Title naming the gap>
status: open            # open | planned | resolved | dropped
created: YYYY-MM-DD
updated: YYYY-MM-DD
origin: <relative link to the spec that deferred it, or "Conversation YYYY-MM-DD: <one-line context>">
addressed_by: []        # relative links to approved specs that address it
---

# KI-NNN: <Title>

## Summary

<The gap, limitation, or deferred idea in a few sentences, and why it matters to
players, authors, or the project.>

## Deferral decision

<Who decided to defer, when, and why, with the source. What this record does not
authorize: no implementation, no change to the components named below.>

## Current state

<As of YYYY-MM-DD: how things work today, with evidence paths. The affected
components, content, or workflows, and how they differ. Name components and
settings rather than line numbers; this is a snapshot for the resuming spec to
recheck.>

## Desired outcome

<The behavior or uniformity wanted, observable by playing or authoring. No
implementation design, alternatives analysis, or test plan.>

## Constraints to preserve

<Behaviors or decisions a future solution must keep, each with its source. Omit
when none are known.>

## Revisit when

<The concrete situation that should reopen this work, for example a scene that
needs it or a new component of the same family.>

## Open questions

<Questions the resuming spec must answer. Omit when none.>

## History

- YYYY-MM-DD — Created from <origin>.
```

<!-- Replace placeholders with supported content or explicit unknowns. Edit the
body in place as the situation changes and add one History line per substantive
change; never add update notices at the top. Remove authoring comments from the
finished record. -->
