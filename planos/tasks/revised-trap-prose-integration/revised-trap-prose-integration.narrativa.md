---
status: approved
approved_on: 2026-09-22
owner: Narrativa
stage: surface-and-technical-design
product_approved_on: 2026-09-22
---

# Revised trap copy and consequence sequence

Owns RQ-001–004/007 in [spec.md](spec.md). Player-facing copy remains Brazilian Portuguese. The [source catalogue](source-catalogue.md) freezes the sixteen original files of PR #25 at `280b92a489959728cb63cd57625d8621cb495cca`; source import is not final editorial acceptance.

## Approved product selection

| Source section | Player moment | Boundary |
| --- | --- | --- |
| Two opening paragraphs | First encounter description and “Rever descrição” | Preserve paragraph order. The catalogue's question introducing the choices belongs at that choice boundary. The approved UI contract places it at the end of this same description unit, including reread. |
| Three numbered approach sentences | Three player choices | Preserve established order and meaning; success headings are not substitute labels. |
| Three success paragraphs | Corresponding successful approach | All 48 supplied results are accounted for; 28 already match the game and 20 differ. |
| General “Falha” paragraph | Death narration after victim commitment and farewell | Do not replace the three distinct pre-selection causal failures or narrate the victim's completed death before the choice. |

No internal encounter IDs, pool labels, competency names, editorial headings, source hashes or image-production notes appear in player copy. No additional actor executes a success; hero-specific farewell wording is preserved.

## Approved B1 wording

The frozen source and current runtime remove all voices before requiring a spoken response. On 2026-09-22 the user selected the correction with “adotar a correçao” (D-001). The causal sequence is **Confirmed**; the following copy is the accepted **Prototype baseline** for this increment:

> **Falha:** o assobio começa a apagar as vozes do grupo. Para afastar a presença, um dos heróis precisa dizer o próprio nome antes que sua voz desapareça. A casa toma essa voz para si e esquece os demais, que conseguem escapar. O herói passa a ser a nova voz presa no casarão.

This approved exception replaces only B1's general fatal paragraph, after victim commitment and the existing farewell. It does not restrict the eligible victim, introduce a timer or let anyone avoid the sacrifice. The [canonical GDD §12.3/B1](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#b1-o-assobio-da-matinta) reflects the same sequence and [ADR-001](adrs/adr-001-matinta-voice-sequence.md) records the supersession. The frozen source remains unchanged. The decision approves the correction, not its unimplemented runtime presentation or final creative quality.

## Editorial review boundaries

A1-1/A1-2, B3-3 and B7-2 use the refinements already authored in the frozen source. Their documentary revision does not constitute approval of the integrated game's pacing or final creative quality. Source approval and runtime readability remain distinct in [verification](verification.md).

The current forty-eight pre-selection failures remain in scope as preservation constraints. The existing farewell, hero eligibility, reduced-group behavior, memory/death records and death permanence must agree with the revised narration. Report any newly found contradiction rather than inventing mechanics during integration.

Approved exceptions: B1 general fatal paragraph, D-001 / ADR-001, 2026-09-22. Source selection accepted with D-002, as prototype wording in the reviewed integration context (D-003). The user approved the complete spec, including question placement, under D-004 on 2026-09-22. Integrated readability and final creative judgment remain separate. The inherited B6-3 rope ambiguity recorded in [review-01](review-01.md#f-001--b6-3-leaves-the-sacrifice-ropes-availability-unclear) has no approved editorial exception; D-002 preserves those failures; the ambiguity remains known and unrepaired. Its repair is outside this approved integration scope, not an additional delivery gate.
