# Compozy Spec Authoring Playbook

## Purpose

This playbook governs Compozy specs for the Expedition and Sacrifice project. It supplements the authoring skills with project-specific authority, scope, and handoff rules.

## Authority Order

1. The current user decision in the active grill.
2. `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` after the decision is incorporated.
3. Accepted [general project ADRs](../adrs/README.md) and applicable ADRs in the active incremental spec, respecting their explicit full or partial supersession links.
4. The active spec and its companions.
5. Completed specs as historical implementation baselines.
6. Numbered GDD versions as history only.

Never silently reinterpret a confirmed GDD rule. When a requested feature conflicts with one, expose the conflict, obtain a new design decision, update the canonical GDD, and record the replacement in an ADR.

## Spec Boundary

- Create a new incremental slug for behavior requested after a workstream reached Phase E.
- Read the completed spec and current implementation as the baseline; do not rewrite their history.
- Keep the incremental spec limited to the changed player behavior and the state, UI, QA, and documentation contracts it affects.
- Preserve all unrelated rules and pending creative decisions.

## Stage 1 — Product

1. Research the canonical GDD, completed spec, implementation, tests, QA evidence, and relevant user expectations before asking questions.
2. Grill only observable product decisions: player choice, feedback, locking, recovery, accessibility, and scope.
3. Record a product ADR when a confirmed GDD rule is replaced or a durable player-facing trade-off is selected.
4. Update the canonical GDD only after the replacement rule and its status are explicit.
5. Write `_user_stories.md` and Part I of `_spec.md` in English; keep runtime player copy in Brazilian Portuguese.
6. Run the Part I leakage check and obtain the user's Stage 1 confirmation before opening Stage 2.

## Stage 2 — Surface and Technical Design

1. Read all active ADRs and the completed baseline's `_spec.md`, `_dx.md`, `_uiux.md`, and `_tests.md`.
2. Draft `_dx.md` and `_uiux.md` as changed-surface contracts, preserving unchanged baseline behavior by reference.
3. Grill the visible surface before choosing internals.
4. Design the smallest change to the existing build-free layers; name state migrations or compatibility behavior only when they actually exist.
5. Keep domain truth in the engine and rendering as a projection of validated state.
6. Write `_tests.md` with unit, integration, browser-journey, accessibility, and fail-closed cases proportional to the changed behavior.
7. Run the six-marker check, then present the complete spec for approval.

## Project Baseline

- Runtime: RPG Maker MZ in `rpg-maker/The Dryland Drowned/`, with local engine and approved plugins; no build.
- Supported surface: current stable desktop Chrome through the documented local server.
- Persistence: native SaveCore file selection and current-file autosave; Continue uses native objects without a content-revision gate. Structural save compatibility is evaluated separately.
- Audio: approved local native audio; retain its acceptance status.
- Player copy: Brazilian Portuguese.
- Normal UI: no internal pool IDs, competency mappings, seeds, or QA controls.
- QA: read-only observations of native MZ objects, `rpg-maker/tests/`, and the current native QA plan. Player inputs alone mutate directed campaigns; no shipped QA console or seed setter. Each increment selects its required sensors.

An incremental spec may change these only through an explicit user decision and ADR.

## Requirement Status Discipline

- **Confirmed**: implement exactly; replacement requires a new design decision.
- **Prototype baseline**: required for the executable prototype but not final canon.
- **Pending**: leave undecided; do not resolve through implementation convenience.
- **Out of scope**: exclude from production and verification.

Every new or replaced GDD rule must state its status. A local prototype detail must not be promoted to confirmed game design without user approval.

## Evidence and Handoff

- Apply [ADR-G004](../adrs/adr-g004-autonomia-do-harness-na-execucao-de-tarefas.md), [ADR-G005](../adrs/adr-g005-exclusao-de-testes-de-gamepad.md) and [ADR-G006](../adrs/adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) during authoring, decomposition, execution and final verification. Organizational reconciliation and eligible risk-based omissions do not need renewed approval; product changes still do.
- Mark gamepad tests out of scope before decomposition. Keep required outcomes, sensors and owners explicit; select heavy checks by distinct risk and preserve representative E2E. Reconcile existing matrices with grouped representatives and justified omissions before closure; preserve historical approvals and results.
- Keep executed results, explicit waivers, omissions for redundancy/covered risk, and pending/blocked checks distinct. Policy adoption alone closes no delivery. Plan teardown and report confirmed closure of resources opened by the agent, preserving preexisting user sessions.
- Record only commands, browser walks, screenshots, and human checks actually performed.
- Keep VoiceOver, cultural/editorial approval, and other human-only checks explicit until a person performs them.
- Preserve or update the devlog moment and capture suggestion when the visible flow changes.
- After full spec approval, hand off to `cy-create-tasks`; execute the resulting graph with `cy-loop-tasks`.
