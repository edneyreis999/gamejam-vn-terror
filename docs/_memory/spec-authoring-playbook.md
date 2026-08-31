# Compozy Spec Authoring Playbook

## Purpose

This playbook governs Compozy specs for the Expedition and Sacrifice project. It supplements the authoring skills with project-specific authority, scope, and handoff rules.

## Authority Order

1. The current user decision in the active grill.
2. `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` after the decision is incorporated.
3. Accepted ADRs in the active incremental spec.
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

- Runtime: local HTML, CSS, and classic JavaScript with no build or server.
- Supported surface: current stable desktop Chrome opened through `file://`.
- Session: memory only; reload starts a new campaign.
- Audio: out of scope.
- Player copy: Brazilian Portuguese.
- Normal UI: no internal pool IDs, competency mappings, seeds, or QA controls.
- QA: the frozen `window.expeditionQA` surface plus the direct browser test document.

An incremental spec may change these only through an explicit user decision and ADR.

## Requirement Status Discipline

- **Confirmed**: implement exactly; replacement requires a new design decision.
- **Prototype baseline**: required for the executable prototype but not final canon.
- **Pending**: leave undecided; do not resolve through implementation convenience.
- **Out of scope**: exclude from production and verification.

Every new or replaced GDD rule must state its status. A local prototype detail must not be promoted to confirmed game design without user approval.

## Evidence and Handoff

- Record only commands, browser walks, screenshots, and human checks actually performed.
- Keep VoiceOver, cultural/editorial approval, and other human-only checks explicit until a person performs them.
- Preserve or update the devlog moment and capture suggestion when the visible flow changes.
- After full spec approval, hand off to `cy-create-tasks`; execute the resulting graph with `cy-loop-tasks`.
