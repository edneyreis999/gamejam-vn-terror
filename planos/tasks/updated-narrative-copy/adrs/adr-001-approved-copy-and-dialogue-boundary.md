# ADR-001 — Adopt updated copy and remove the recited hero profile

Status: accepted **product** decision on 2026-09-25, D-001–004. The complete technical design and verification were subsequently approved on 2026-09-25 under D-006 (“aprovo”), recorded in [spec.md](../spec.md). No implementation claim.

## Context and evidence

The user designated the sixteen files under `docs/narrativa/armadilhas/` and the exact `docs/narrativa/herois/# Falas de cada herói.md` as updated game copy. Read-only mapping found native destinations for every block, 48 older approach-specific failures absent from those source files, pre-conversation identification/profile messages, and separate memorial causes.

The user explicitly rejected identification at the start of a conversation: “é para remover essa identificação” and “isso precisa dar a entender pelo contexto do jogo.” The resulting agreed boundary starts directly with Ivaí's question, with no identification or explanatory summary. The user accepted the proposed A1/A5 inscriptions with “estão”. After reviewing the comparison with source fatal paragraphs and the uniform sixteen-trap sequence, the user accepted the recommendation with “entendi. concordo com sua recomendação.”

## Decision

1. Integrate the complete supplied trap and hero copy in the mapped moments; treat this source selection as confirmed for the increment, without promoting unrelated final creative/asset judgments.
2. Remove all eight identification messages and third-person profiles before Conversar. Characterization comes from the source dialogue and context. Preserve normal speaker names, current party menu, portraits, hidden competencies and formation rules.
3. Preserve one pattern for every trap: approach-specific failure → explicit victim choice → source hero farewell → complete source general fatal paragraph.
4. Replace exactly six causal failures: A1-1, A5-1, A5-3, A7-2, B3-3 and B6-3. Preserve the other 42. Use the exact approved text in the [narrative contract](../updated-narrative-copy.narrativa.md), not a new rewriting pass.
5. Update only the two approved A1/A5 memorial causes with that contract's exact inscriptions. Preserve actual saved locations and other causes.

## Scoped supersession and preserved history

- [Historical init ADR-024](../../../../docs/adrs/historico/init-rpg-maker-mz/adr-024.md): replaces only the requirement that name/pronouns/race/profession/summary be recited through conversation. Hover, hidden competencies and explicit interaction rules remain.
- [PR3 tavern ADR-001](../../pr3-taverna/adrs/adr-001.md): replaces the preservation/pending-review boundary for these source speech moments; it does not approve final art or revise its historical delivery.
- [Dialogue staging ADR-002](../../vn-picture-busts-dialogues/adrs/adr-002.md): the profile-to-dialogue boundary ceases to exist; dedicated-map menu presence from G001, native authored focus and Council staging remain.
- [Revised-trap ADR-002](../../revised-trap-prose-integration/adrs/adr-002-full-catalogue-boundary.md): replaces its source snapshot for this later increment and its preservation of the six named failures. Its other 42 failures remain; the formerly deferred B6-3 rope issue now has an approved replacement. The old acceptance and evidence are not rewritten.
- [GDD](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) §§1.1/12.1/18 record this current source priority. Older catalogue summaries do not override the selected updated prose; competencies and mechanics still do.

Maintained older ADRs receive dated backlinks only; their historical bodies and evidence remain intact. Old QA waivers are not imported. No additional memory tree, runtime registry, task graph or tracker record is created.

## Consequences

The integration includes native message-list restructuring for the longer hero presentations and removal of obsolete profile envelopes. Therefore technical approval and candidate lifecycle/fit evidence remain separate from product approval. There is no new save migration, revised competency mapping, narrator assignment, victim rule or asset requirement. The [verification contract](../verification.md) preserves representative real-player journeys and the current project evidence policy.
