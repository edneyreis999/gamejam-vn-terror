# ADR-001 — Preserve a speaking opportunity in Matinta's fatal sequence

Status: accepted product decision on 2026-09-22 (D-001). Complete specification subsequently approved under D-004 below; implementation remains pending.

## Context

The frozen PR #25 catalogue and the native B1 death narration remove every voice before requiring a hero to answer with their own name. The canonical GDD previously contained the same contradiction. The proposed correction was presented in the narrative contract and recommended again after the product review.

Asked to choose between adopting that correction and retaining the original wording as prototype prose, the user replied: “adotar a correçao”. This selects B1's correction only; it is not blanket source acceptance or authorization to implement the increment.

## Decision

- **Confirmed:** voices disappear progressively. The player-selected hero says their name before losing their own voice and becomes the voice trapped in the house.
- Preserve all existing eligible victims, irreversible selection, farewell before death narration, death commitment and campaign progression. Do not add a timer, automatic victim or restriction to the last speaking hero.
- **Prototype baseline:** accept the exact corrected paragraph in the [narrative contract](../revised-trap-prose-integration.narrativa.md#approved-b1-wording). It replaces the general B1 fatal paragraph, not any of the three approach-specific failures.
- Preserve the original [source catalogue](../source-catalogue.md#source-b1) as immutable evidence. Record the correction as an explicit source exception.
- **Pending:** implementation, integrated readability, full-catalogue scope/source acceptance and complete technical design. No B6 correction or broad editorial rewriting is authorized by this decision.

## Authority and supersession

[RQ-004 and D-001](../spec.md) own the requirement and approval record. The [canonical GDD §12.3/B1](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#b1-o-assobio-da-matinta) now records the same sequence and links to this ADR. The former immediate loss of every voice is superseded only for B1; the sacrifice rules in GDD §13 remain unchanged.

The previous increment's [ADR-002](../../approved-narrative-dialogue-staging/adrs/adr-002-trap-prose-integration-boundary.md) and GDD §12.1 record that PR #20 preserved death prose. That completed delivery remains historical. This new decision authorizes a later B1 wording change within the new spec; it neither rewrites previous acceptance nor adopts the rest of the proposed catalogue boundary.

## Subsequent scope confirmation

Later on 2026-09-22, D-002 confirmed the full integration scope; [ADR-002](adr-002-full-catalogue-boundary.md) records that decision and the prototype source interpretation. The pending catalogue status above describes this ADR's original approval moment. At that point, complete-spec approval and implementation were still pending.

## Alternatives and verification

Keeping the inconsistent paragraph as prototype prose was offered and not selected. Restricting victims or adding timed selection would change mechanics and is excluded.

[V-004](../verification.md#sensor-matrix) records acceptance of this decision separately from the remaining source approval. V-001 must compare B1 against the approved exception; V-002/V-003 must eventually demonstrate the preserved sequence and reading behavior. No runtime validation is claimed by this ADR.

## Complete-spec approval — D-004

On 2026-09-22, after these product decisions, the user approved the complete technical specification and requested task generation with “está aprovado, pode gerar as tarefas”. The pending design-approval references above describe the earlier decision stage. The [task graph](../tasks.md) now exists; implementation and verification remain pending.
