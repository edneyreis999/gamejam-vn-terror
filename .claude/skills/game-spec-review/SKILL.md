---
name: game-spec-review
description: Review a requested game spec with three independent pessimistic reviewers, challenge their findings, and discuss one finding at a time before incorporating user-selected corrections. Not an approval gate, code review, or implementation workflow.
---

# Game Spec Review

Review a saved draft or approved spec only when requested. Three reviewers look for plausible failures; the coordinator challenges both their claims and their solutions against the project's current maturity. The user decides what changes.

## Prepare and dispatch

Resolve the spec from the user's path or the conversation. Ask if the target remains ambiguous; do not select a spec merely because it was edited last. Read its applicable companions, project instructions, relevant decisions, and nearby project files. Establish the intended outcome, agreed scope, existing capabilities and patterns, and evidence of the project's maturity. Distinguish recorded decisions from assumptions; do not assume every consuming project is still a prototype.

Start three fresh, independent subagents in parallel, without conversation history. Give each the same factual context, input paths, relevant user decisions, the reviewer rules below, and exactly one focus:

| Focus | Review question |
| --- | --- |
| Implementation gaps | What missing or contradictory behavior, capability, dependency, lifecycle outcome, or acceptance condition prevents the spec from delivering its objective? |
| Existing patterns | Where does the spec diverge from demonstrated project conventions, and what concrete inconsistency or maintenance cost does that introduce? Inspect the closest existing counterparts. |
| Overengineering | What complexity, abstraction, infrastructure, or verification obligation costs more than its benefit for the agreed scope and current maturity? |

Use the runtime's default model unless the user explicitly selected another. If independent subagents are unavailable, report the limitation instead of simulating independent reviews. A failed or incomplete reviewer is missing coverage, not a clean result; disclose it before discussing the available findings.

### Reviewer rules

- Work read-only. Inspect the files needed to substantiate your focus; load relevant technology best-practices guidance when available.
- Return each finding with its focus, spec location, evidence, concrete failure or cost scenario, impact, suggested severity, and proposed correction with rationale. Distinguish an unverified dependency from a proven failure.
- Pessimism means investigating plausible failures, not inventing defects. No finding quota: return zero when justified, with a short account of coverage and limitations.
- A spec describes intent, behavior, responsibilities, constraints, and acceptance. Missing code, algorithms, signatures, or file-by-file implementation plans is not itself a gap.
- Demonstrate an existing pattern before alleging a break. A first-of-its-kind component has no existing pattern to violate; a deliberate exception is not automatically a defect.
- Name the distinct risk before proposing another obligation. Prefer a proportionate correction; do not silently narrow the user's objective or decide gameplay or scope for them.

## Challenge and order

Wait for the reviewers, then check every claim against its cited evidence. Merge duplicate problems while preserving their originating focuses and materially different proposed solutions.

For each unique finding, assess the problem and proposed solution separately. State **agree**, **partially agree**, or **disagree**, explain the counterargument, and recommend a concrete action, including leaving the spec unchanged when appropriate. Consider the agreed scope, actual project maturity, existing coverage, correction cost, and residual risk. Challenge critically without forcing disagreement. Early maturity can justify a lighter solution; it does not excuse failure to deliver the objective.

Assign the coordinator's severity and order supported findings from highest to lowest:

- **High:** prevents the intended outcome or leaves a necessary delivery decision contradictory or missing.
- **Medium:** creates material rework, inconsistency, or unnecessary cost without preventing the core outcome.
- **Low:** a bounded clarity or simplification issue with limited impact.
- **Not substantiated:** the evidence does not support the alleged problem. Present these last, with the reason; never silently discard a reviewer's finding.

Within a severity, prioritize the greater demonstrated impact. Count unique findings after consolidation and keep their positions stable throughout the discussion. Report material coverage limitations separately; do not turn them into invented findings or a global readiness verdict.

## Discuss one finding at a time

Present the following structure in the conversation's language. `N` is the total number of unique findings, including those not substantiated; `i` is the current position, not the number accepted.

```markdown
Total findings: N

# Finding (i/N): <Title>

Severity: <High | Medium | Low | Not substantiated>

## Problem origin
<Originating focus, spec location, evidence, concrete scenario, and impact.>

## Pessimistic agent's proposed solution
<Proposed correction and rationale; preserve distinct alternatives after merging.>

## My recommendation
<Agree, partially agree, or disagree; counterargument; recommended action and tradeoffs.>
```

After each finding, ask the user to choose the coordinator's recommendation, the reviewer's solution, or no change; accept a written alternative or deferral. Collapse identical options. Use an interactive question tool when available; otherwise ask in the conversation. Wait for the answer before presenting the next finding. Clarify an ambiguous correction only when needed to apply it correctly.

Keep the selected correction or no-change/deferral decision associated with its finding in the conversation. Do not edit the spec during this discussion. If there are zero findings, report `Total findings: 0`, mention any coverage limitations, and finish without a decision prompt.

## Incorporate selected corrections

After the last decision, apply the authorized corrections through the update procedure in `game-create-specs`, including affected companions and its amendment requirements. Do not request routine approval again. Resolve conflicting selections with the user before applying the affected corrections; continue independent authorized corrections. If the user stops the discussion early, do not assume unreviewed findings are accepted or apply pending corrections without their direction.

Summarize the decisions, actual changes, and remaining gaps. Do not automatically create a review file or run another round. Reviewing does not approve the spec, change its status, plan tasks, implement the game, commit, or publish. A new review requires a user request.
