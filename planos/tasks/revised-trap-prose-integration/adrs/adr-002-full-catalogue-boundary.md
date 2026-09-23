# ADR-002 — Integrate the full revised trap catalogue

Status: accepted product boundary on 2026-09-22 (D-002). Complete technical design subsequently approved under D-004 below; implementation remains pending.

## Decision and evidence

After reviewing the spec and accepting B1's correction, the user was asked to confirm this complete scope: update descriptions, approach labels, successes and death narrations for the sixteen traps; preserve the 48 failures preceding victim selection; apply corrected B1; preserve campaign rules. The user answered “confirmo”.

- **Confirmed scope:** sixteen descriptions, 48 ordered approach labels, 48 success results and sixteen general fatal paragraphs. The source/native comparison identifies 20 changed successes and 28 already matching ones.
- **Prototype baseline:** the reviewed [PR #25 source snapshot](../source-catalogue.md), with [B1's approved exception](../revised-trap-prose-integration.narrativa.md#approved-b1-wording), is the integration copy. This source acceptance follows the reviewed spec and confirmation of its integration scope; it is not a separately quoted editorial decision or final canon approval.
- Preserve all 48 pre-selection causal failures. General fatal paragraphs follow victim commitment and farewell. Preserve choice order, competencies, eligibility, death permanence, reading controls, progress and saves.
- Permit only native presentation line/box splitting. Broad rewriting, additional mechanics, assets and dependencies remain out of scope.
- The B6-3 rope ambiguity identified in review remains known: preserving the 48 failures does not authorize repairing it or claiming it corrected. No new final editorial gate is added to the prototype integration; final creative judgment remains separate.

## Supersession

The [historical narrative ADR-002](../../approved-narrative-dialogue-staging/adrs/adr-002-trap-prose-integration-boundary.md) and [canonical GDD §12.1](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#121-estados-de-conteúdo) limited PR #20 to thirty successes. That scope still describes the completed delivery. This incremental decision replaces its preservation boundary for later work on descriptions, labels, death prose, A1-1/A1-2 and B3–B8 successes. It preserves the old source, acceptance and evidence.

The GDD links back to this ADR. [ADR-001](adr-001-matinta-voice-sequence.md) continues to own B1's corrected causal sequence. The rest of the GDD's mechanics remain authoritative.

## Handoff

[Spec D-002/D-003](../spec.md#open-decisions-and-approval) closes the product stage and opens Stage 2. The surface, native integration and verification proposals require complete-spec approval before task decomposition and implementation. This decision does not claim the integration was executed, rendered or playtested.

## Complete-spec approval — D-004

On 2026-09-22, after these product decisions, the user approved the complete technical specification and requested task generation with “está aprovado, pode gerar as tarefas”. The pending design-approval references above describe the earlier decision stage. The [task graph](../tasks.md) now exists; implementation and verification remain pending.
