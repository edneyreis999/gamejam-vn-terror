# ADR-002 — Integrate supplied trap successes and defer text refinement

Status: accepted product decision on 2026-09-17. The consolidated product stage was subsequently confirmed, and the complete spec set was approved by the user on 2026-09-18.

## Context

PR #18 provides three success paragraphs each for A1–A8 and B1–B2. Its six B3–B8 files are empty; playable content already exists for all 16 encounters. The populated files use simplified approach headings that differ from the current player choices and omit some of their clues.

The user accepted integrating only the success paragraphs while retaining the current approach labels. They explicitly requested leaving the rest unchanged and deferring further text refinement, accepting that some wording may not make narrative sense yet.

## Decision

- **Confirmed integration boundary:** replace the 30 corresponding success texts with the supplied prose. Keep current approach labels, descriptions, failures, deaths, B3–B8 text, encounter art and rules.
- **Prototype baseline:** accept the supplied wording for this increment. Do not rewrite it, fill missing source results or repair inconsistencies with untouched text. The user may refine the text later.
- **Out of scope:** additional narrative consistency work or a final editorial approval gate for these trap texts. Do not create implementation/QA tasks that make that deferred work a delivery prerequisite.
- **Preserved requirements:** route each paragraph to the selected approach, retain competencies and all campaign consequences, keep readable native text, and complete the outcome only after its final message. Readability splitting does not authorize prose changes.
- The simplified headings remain source identifiers. The native choices and their PictureChoices behavior remain unchanged.

## Authority and implications

[Spec D-016/D-017 and RQ-012](../spec.md) record the user decision. [Source analysis](../source-analysis-pr18.md) identifies files and native owners. The [canonical GDD §12.1](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#121-estados-de-conteúdo) distinguishes the accepted prototype prose from unchanged mechanics and future editorial work.

This narrows this increment's editorial acceptance; it does not rewrite completed specs or change the game's intended long-term causal writing principles. Integration checks should expose missing, misrouted or altered source text and functional regressions. They must not fail the delivery solely for narrative inconsistencies the user explicitly deferred. No runtime or playtest evidence is claimed here.
