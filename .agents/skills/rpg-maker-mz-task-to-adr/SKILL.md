---
name: rpg-maker-mz-task-to-adr
description: Extracts durable project decisions from approved RPG Maker MZ specs and executed tasks. Use when evaluating proven migration decisions for future specs or creating approved ADRs from that analysis. Don't use for speculative designs, generic best practices, or implementation.
---

# RPG Maker MZ Task to ADR

Promote proven decisions into project policy only within the user's approved scope.

## 1. Establish the decision record

Read applicable `AGENTS.md`, the source `spec.md`, relevant tasks, discipline contracts, `verification.md`, and linked execution evidence. Resolve the ADR owner from project instructions and existing records, including `docs/adr/` or `docs/adrs/`. If both exist, follow the declared owner; ask only when that authority is ambiguous. Use `docs/adr/` only when no owner or existing ADR directory is present.

Identify each decision, its alternatives, original scope, approval, and evidence that it worked. Separate adopted decisions from proposals, superseded notes, and implementation details. Approval of a spec alone does not demonstrate a successful outcome; retain unproven candidates as pending with the missing evidence named.

Done when: every candidate has traceable sources, approval and evidence status, and a known relationship to existing decision records.

## 2. Apply all tree filters

Evaluate each decision against all tree criteria; select it only when every criterion passes:

| Criterion | Required justification |
| --- | --- |
| Durable ADR | A project choice between plausible alternatives whose context, rationale, and consequences remain useful for 5–10 years, even if later superseded. Generic best practices and temporary implementation details do not qualify. |
| Project knowledge the model cannot safely infer | A preference, rejected alternative, or lesson that a frontier LLM cannot establish from general knowledge and available code alone. Being able to suggest the solution does not establish that the project chose it. |
| Guidance for future specs | A concrete effect on future scope, architecture, compatibility, authoring, or acceptance decisions that prevents repeated questions or incompatible proposals. Historical interest alone is insufficient. |

Done when: each candidate has a pass/fail justification for every filter and a disposition of selected, excluded, or pending evidence.

## 3. Resolve existing ADR coverage

For every selected decision, compare its proposed policy with existing ADRs and classify it as already covered, new, full replacement, or partial invalidation. Reuse an existing ADR when it already governs the choice.

For a replacement or partial invalidation, identify the original ADR, the exact provisions affected, the reason, and the provisions that remain valid. Propose a new ADR with reciprocal links to the original; preserve the original rationale and history. Treat a conflict with an adopted ADR as a proposed policy change until approved.

Done when: every selected decision has one proposed canonical owner and each supersession has explicit scope and planned links in both directions.

## 4. Present the analysis for approval

Present selected decisions as bullet points with the tree justifications, source evidence, proposed policy wording, consequences, and ADR disposition. List excluded and pending candidates with their reasons. Follow the user's requested output location; otherwise present the analysis in the response without creating a parallel memory tree.

Ask the user to approve the concrete policy and affected ADR changes before creating or modifying ADR files. An analysis-only request ends with the analysis. Approval of the original spec does not authorize promotion into project-wide policy. Reuse explicit approval already provided for the same policy and changes; ask only about unresolved scope.

Done when: all candidates are accounted for and either the analysis-only request is complete or the selected ADR changes have explicit approval. If approval is pending, stop before step 5.

## 5. Write and verify the approved ADRs

Recheck the ADR directory before assigning identifiers; follow its numbering, filenames, language, and status conventions. Write only approved decisions, including context, policy and scope, alternatives, rationale, consequences, source approval/evidence links, and how future specs apply the policy. Keep versions and run details in linked source artifacts unless they define the decision's boundary.

For approved replacements, link the new ADR to the original and add the reciprocal link and supersession status to the original. For partial invalidation, mark only the affected provisions and retain the rest as active. Preserve historical acceptance records in source specs and tasks.

Check that every approved policy has one owner, all local links resolve, supersession links agree, and no unapproved policy was marked adopted. Report created, updated, and reused ADRs, plus any pending decisions. Keep delivery local; commits and publication require their own authorization.

Done when: the approved ADR set is internally consistent, traceable, and usable by future spec authors without reconstructing the conversation.
