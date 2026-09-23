# Standing Directives

## SD-001 — Canonical GDD

Read `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` before design or implementation. Numbered GDDs are historical.

## SD-002 — Requirement Status

Keep `Confirmado`, `Baseline de protótipo`, `Pendente`, and `Fora do escopo` distinct in every artifact and implementation decision.

## SD-003 — Incremental Workstreams

Treat a Phase-E spec as an immutable baseline. Put later behavior changes in a new incremental spec and task graph.

## SD-004 — Language Ownership

Write Compozy artifacts in English and player-facing runtime copy in Brazilian Portuguese.

## SD-005 — Local Runtime

Use `rpg-maker/The Dryland Drowned/` as the only game implementation. Run it through the documented local server; consult native data, plugins and `rpg-maker/tests/` for implementation evidence.

## SD-006 — Supported Browser

Promise only current stable desktop Chrome; do not imply cross-browser support.

## SD-007 — Offline and Audio Boundary

Preserve approved native autosave and local audio contracts. Remote assets and services remain outside the approved scope.

## SD-008 — Diegetic Presentation

Keep internal pool and physical/supernatural classification out of player-facing labels; use approved diegetic names and thematic description.

## SD-009 — Domain Ownership

Keep campaign eligibility, progression, locking, completion, randomization, sacrifice, and retreat truth in the engine; render only derived projections.

## SD-010 — Honest Evidence

Record only executed validation, keep human-only checks explicit, and preserve the demonstrable devlog moment plus suggested capture.

## SD-011 — No Implicit Decisions

Do not resolve pending narrative, character, treasure, art-direction, publication, persistence, or audio decisions through placeholders or implementation convenience.

## SD-012 — Task Execution Autonomy

Apply [ADR-G004](../adrs/adr-g004-autonomia-do-harness-na-execucao-de-tarefas.md): reconcile organizational dependencies and verification ownership without renewed approval when approved behavior, required evidence and acceptance remain intact. Record transfers in existing task/verification artifacts; a transferred obligation remains open at its destination.

## SD-013 — Gamepad Test Scope

Apply [ADR-G005](../adrs/adr-g005-exclusao-de-testes-de-gamepad.md): exclude manual and automated gamepad tests from current and future campaigns, preserving functionality and existing code/evidence. Record any existing obligation as explicitly waived, never as an executed pass; retain other inputs and human checks.

## SD-014 — Risk-Based Heavy Tests and Teardown

Apply [ADR-G006](../adrs/adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md): group heavy checks and omit only evidenced redundancies, retaining representative E2E, distinct risks and human acceptance. Record equivalence, residual risk and invalidation conditions. At every session end, including failure/blockage/cancellation, confirm closure of apps, tabs and auxiliary processes opened by the agent, preserving preexisting user resources.

Explicit exception: [revised-trap-prose-integration ADR-003](../../planos/tasks/revised-trap-prose-integration/adrs/adr-003-proportionate-prose-verification.md) waives integration/E2E and related regression matrices for that prose-only increment under D-005; it does not change the default for other specs.

## SD-015 — Self-Produced Test Saves

A spec must not depend on external, user-provided, preexisting or another spec's saves. Start testing from a new campaign on its candidate and produce the needed saves during the tests through normal player inputs and the existing save mechanism. Reuse only that run's own compatible saves, including resumption with recorded provenance; recreate affected saves after relevant authored-list changes. Save/load may serve navigation without becoming a persistence test requirement. No save/state/seed editing is authorized. User decision on 2026-09-22, recorded as D-006 in [revised-trap-prose-integration ADR-003](../../planos/tasks/revised-trap-prose-integration/adrs/adr-003-proportionate-prose-verification.md#independent-save-preparation--d-006).
