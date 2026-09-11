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
