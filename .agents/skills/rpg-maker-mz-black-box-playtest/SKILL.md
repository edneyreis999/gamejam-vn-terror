---
name: rpg-maker-mz-black-box-playtest
description: Runs black-box RPG Maker MZ browser playtests from project-supplied operating instructions. Use when an agent must test a player-visible scenario without learning routes or answers from game internals. Don't use for QA planning, harness or unit tests, internal diagnosis, or visual-only capture.
---

# RPG Maker MZ Black-Box Playtest

Coordinate a real-browser player run from project-owned contracts. Treat the bundled protocol as the source of truth for execution mechanics.

## 1. Resolve the local contract

1. Read the scoped `AGENTS.md` files and any operational documents named by the invoker. When none are named, search only the project's QA README or index, current charter, linked journeys and scenarios, and the current task's named verification contract.
2. Assemble in memory every core field required by the bundled guide. Require both a total round budget and a replay SLA with origin, public start and finish events, tolerance, and exclusions.
3. Resolve the durable route-card destination and task identity. Under the fallback convention, require an immutable three-digit spec or work-scope order, a stable scope slug, and a task ID.
4. For a retest, reopen the current card from disk as the primary operating source and validate it against the current contract and public build signals. For first discovery, keep historical reports, prior evidence, and route cards outside the executor's inputs.
5. Request only missing or ambiguous contract values. Apply the guide's `BLOCKED` verdict when a missing value prevents safe execution or the contracted public reset.

*Done when:* every required field, both clocks, the stable task identity, and the public reset procedures are explicit, or the exact blocker is recorded.

## 2. Protect the black-box boundary

1. Give the executor only the resolved contract, public entry, bundled guide, current card for a retest, and artifacts it creates during the run.
2. Use a clean executor context when prior routes or internal knowledge could steer player decisions. When isolation is unavailable, declare the contamination and limit the claim instead of asserting independent black-box discovery.
3. Operate through player-accessible controls and public sensors in a real browser. Select any capable browser controller; no specific tool is required.
4. Return a public divergence to the invoker or preparer. That external role may inspect Git, the task, spec, GDD, and implementation, then provide revised public expectations or player-facing guidance. Keep implementation diffs, internal causes, and state manipulation outside the executor.

*Done when:* every executor input is player-facing or explicitly provenance-marked, and no decision depends on hidden game state.

## 3. Run the protocol

1. Before the first player action, read `references/rpg-maker-mz-agent-playtest.md` in full and execute its core in order. Apply fingerprint, geometry, locale, storage, persona, ending, automation, and resilience modules only when the local contract activates them.
2. Override the guide's optional timing default for this skill: freeze one total budget before the round's first player action and a replay SLA before each attempt. Keep the total budget running across discovery, card writing, resets, replay, and reporting; measure the SLA only after a card exists and public preflight proves the attempt feasible.
3. Accept invoker guidance before the first attempt or after an attempt has been closed. Express every hint as public player actions or signals, record its source and timing, and allow any useful granularity up to a complete route.
4. Preserve each closed result. Apply hints or SLA changes only to a new attempt with a new ID, fresh preflight, and clean public reset; never set a revised SLA below a demonstrated public lower bound.
5. Allow further attempts while the total budget and public resets permit them. Require the final qualifying replay to start from the public reset, use only the current card, receive no new live hint, and finish within the frozen SLA.

*Done when:* the protocol reaches evidence-backed verdicts or a contracted stopping condition, with every attempt, timing revision, and hint provenance preserved.

## 4. Persist and close

1. Write or update the guide's route card after discovery even when it remains `RASCUNHO`, `VENCIDO`, or incomplete. Prefer the project's convention; otherwise use `docs/qa/guides/routes/<NNN>-<spec-or-scope-slug>--<task-id>.md`.
2. Reuse the immutable `NNN` for every task in that spec or scope. Let the invoker provide it on first use and existing cards preserve it later; request ambiguous identity instead of inventing or renumbering it.
3. Keep one card per task, with named sections for multiple routes. Create `--<unit-slug>` files only when explicitly requested, and retain still-valid routes during updates.
4. When guidance contributes to a route, record its content and origin, the prior attempt result, and `Derivado somente de observação pública: não`. Promote the card to `VALIDADO` only after the final clean replay.
5. Persist evidence and the report under local conventions. Return each observed bug with public symptom, expectation, observation, reproducible step, evidence, and verdict impact; keep game, contract, card, and guide verdicts separate and name every unverified claim.
6. Leave repository changes uncommitted. Close only browser contexts and processes created by the round, and record anything that could not be closed.

*Done when:* the durable card, evidence, report, bugs, four verdicts, unverified items, and teardown state all match the recorded run.

## Companions

- Route planning and durable QA design: `rpg-maker-mz-qa-report`.
- General QA or harness execution: `rpg-maker-mz-qa-execution`.
- Specialized visual capture: `rpg-maker-mz-visual-evidence`.
- Completion and release gates: `rpg-maker-mz-final-verify`.
