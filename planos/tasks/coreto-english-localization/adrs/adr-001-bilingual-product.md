# ADR-001 — Bilingual game with English as the initial default

- Status: accepted product decisions D-001–007 and consolidated Stage 1 D-008,
  2026-09-28. Technical design approved 2026-09-29 (D-015).
- Scope: this localization increment; no implementation claimed.

## Context and decision

The GDD previously limited playable copy to PT-BR and excluded EN-US. The user
requested the whole game in Portuguese and English through Coreto Message Core,
with English as the initial default and the plugin's native language behavior.
The agent translates the entire game; Edney owns editorial review.

Use natural, accessible American English, preserving meaning, clues, deliberate
ambiguity, character names, folklore-creature names and horror atmosphere.
A separate agent uninvolved in development must evaluate complexity from the
player's perspective. Its findings support but do not replace Edney's acceptance.

## Scoped supersession

This replaces only the monolingual boundary in the canonical GDD heading, §3.5
and §22, and the PT-BR-only player-copy assumption in the spec-authoring playbook
and standing directive SD-004 for this increment. English spec/document authoring
and Portuguese source-copy ownership are unaffected. Historical specs remain
unchanged; their approved content remains the semantic source, now localized.

Preserve all unrelated rules, approvals and pending decisions. Do not interpret
this ADR as approval to edit Coreto, change saves, build or add services. The
full provider migration comes from D-013, not from this ADR.

## Consequences

Whole-game localization requires inventory beyond dialogue, including UI and
image text. Native behavior should resolve option placement/persistence before
custom design is considered. Text quality, runtime fit and technical correctness
need separate evidence; translator self-review cannot satisfy the new agent
evaluation requirement.

Sources: [interview](../entrevista.md), [spec](../spec.md),
[GDD](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md).
