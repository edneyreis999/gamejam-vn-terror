---
name: game-plan-qa
description: Plan or update QA for a game or its authoring tools from a QA-plan task or direct request. Prepare persona missions, affected technical checks, starting-state requirements, and evidence handoff; does not run QA sessions or maintain a global QA catalogue.
---

# Game Plan QA

When the owning spec has `_execution-metrics.md` and this is authorized execution, use [spec-execution-metrics](../spec-execution-metrics/SKILL.md) before preparation. Attach to the caller’s execution, or initialize a direct one; record planning/preparation activities and link observations or gaps in the existing handoff. Nested work reuses that identity. Freeze a direct execution at closure. The companion does not authorize executing a planning-only request.

Turn the requested scope into a plan an executor can follow without guessing the persona, starting state, expected result, or observation method. Plan by changed behavior and risk, reusing valid coverage and earlier findings.

Use when performing a QA-plan task, repairing its missing or invalidated coverage, or answering a direct QA-planning request. Graph construction stays with [game-create-playtest-tasks](../game-create-playtest-tasks/SKILL.md). Persona sessions belong to [game-execute-qa](../game-execute-qa/SKILL.md); technical execution and task status stay with the caller. Standalone dogfooding can prepare its own mission without a separate planning invocation.

A planning-only request authorizes the plan, not launching a runtime, implementing infrastructure, or executing checks. An authorized QA-plan task also prepares the starting states and playtest handoff its contract requires. Continue that work without routine approval checkpoints; ask only for an unresolved product choice or unavailable external input that prevents correct completion. Planning never supplies a QA pass, human acceptance, or an automatic final-verification stage.

## 1. Establish the scope and existing owner

Read project instructions, the request or QA-plan task, and its cited spec, checks, execution notes, and relevant earlier findings. When present, read `_tests.md`, `_playtest.md`, affected player/author contracts, and the tasks whose evidence the plan will reuse. A direct request needs no spec or task graph. Use the named task or verification record; modification time alone does not identify the intended increment.

Identify the candidate, affected code/content/configuration, public interfaces, target environments, and accepted expectations. Discover the project's technology best-practices skill for engine-specific preparation and observation constraints. Inspect actual consumers and active configuration rather than inferring behavior from an installed plugin, a file name, or a test prefix.

Preserve existing criterion IDs and check ownership. Reuse accepted product decisions; do not derive a new expected result from what the candidate happens to do. An unresolved expectation is a decision to surface, while independently defined parts of the plan can proceed.

## 2. Select observations by risk

Trace each affected behavior from its public input to the promised consequence. Identify who can be harmed, how the failure would appear, and which observation could detect it. A plugin change can affect an author journey, a player journey, or both. Content can change control flow or persistence as well as presentation.

| Claim or risk | Observation to plan when applicable |
| --- | --- |
| Rule, validation, serialization, or authored-data constraint | A focused logic or static check with an independent expected result |
| Plugin parameters, commands, or other public interfaces | Relevant authored input reaching its actual consumer; registration or parser success alone does not prove the runtime effect |
| Composition, lifecycle, ordering, or persistence | Integration at the affected boundary; a public journey when access, continuation, or interaction is part of the claim |
| Player or author completes a goal | Persona session from the real public entry to the true end state, including relevant recovery or abandonment |
| Layout, motion, sound, or native authoring | The corresponding rendered, temporal, audible, or authoring-tool observation; capture alone is not inspection |
| Comfort, artistic intent, or required human play | The assigned human check or experience hypothesis, kept separate from technical results |

Choose the cheapest sensor that actually observes the claim. Do not require every row for every increment. Preserve distinct guarantees when combining setup or selecting representatives: different destinations, persistence paths, or visible outcomes may need separate observations even when the same plugin implements them.

For a changed-scope request, include affected journeys and adjacent ones where shared behavior makes propagation plausible. For broader QA, use the requested scope and prioritize its highest-impact risks. Do not invent a journey when only static work applies; record why and retain any technical checks still owed.

## 3. Reuse evidence and identify remaining work

Inspect the existing check sources, runner selections, fixtures, and relevant results before adding work. Search changed files, identifiers, configuration and player-visible content, then follow shared helpers and consumers where the change can propagate. A named case without an executable source or required producer is unavailable coverage, not a passing check.

For prior results, apply **Evidence and its limits** in the [session protocol](../game-execute-qa/references/session-protocol.md). Match relevant inputs, candidate, environment, expectation and sensor; preserve the original date and scope. Reuse collection and inspection separately. Historical human decisions do not establish acceptance of changed material. When equivalence is unknown, plan the affected observation again.

Keep technical checks separate from persona missions. A passing assertion can remove repeated technical work without establishing the persona's public interaction or friction. Prefer updating an existing mission that still fits to writing a duplicate; preserve earlier debriefs and failed attempts when its plan changes.

For the graph's QA tail, preserve its execution policy: fast static and unit suites run in full; select heavy runtime or end-to-end checks that lack valid evidence after the last relevant change. The full heavy suite runs only when the user asks or the spec requires it. A standalone plan follows its requested coverage and applicable project requirements; it does not inherit a full-suite obligation merely by using this skill.

For an affected check omitted from execution, cite covering evidence, the equivalence rationale, residual risk and what would invalidate that choice. An omission is not a pass. If it would remove an accepted obligation without equivalent proof, keep the obligation pending for the user's decision. Final verification retains its own evidence requirements.

## 4. Prepare complete persona missions

Read **Session mission** in the [session protocol](../game-execute-qa/references/session-protocol.md) and the relevant sections of [personas and tours](../game-execute-qa/references/personas-and-tours.md). Use that shared contract rather than introducing another charter schema, persona catalogue, or status vocabulary.

For each selected journey, supply the objective, persona, public entry and starting-state provenance, guiding actions and true end state, relevant branches, one tour, scenarios or existing criteria, independent expected observations, environments/sensors, and time ceiling. Distinguish required coverage from exploratory prompts and experience hypotheses. A flow diagram is useful for a complicated branch structure, not a prerequisite for every mission.

In the graph tail, choose representative journeys across the integrated slices. Each target runtime gets a journey or an explicit not-verified entry with residual risk. Reuse slice evidence and explain the additional guarantee: composition, a different runtime, public interaction, or persona friction. Select by distinct risk rather than creating one session per variant.

Keep missions feasible within their ceilings and any overall budget. If a previous session ended before required coverage was reached, plan a focused follow-up from its last reliable evidence and starting state. Do not reset its timer, erase the first attempt, or waive the remaining obligation.

## 5. Resolve preparation and human handoff

For each mission or technical check, identify the maintained command or interaction path, prerequisites, starting-state producer, relevant inputs, evidence destination, and resource/cleanup owner. Reuse the project's infrastructure and output convention. Name missing capabilities and dependencies so the executor cannot mistake an unprepared case for a runnable one.

A planning-only request describes preparation and its readiness limits without performing it. When executing an authorized QA-plan task, prepare the starting states its contract requires through the project tooling. Use [game-test-infrastructure](../game-test-infrastructure/SKILL.md) if a required capability is missing or defective, within that authorization; working infrastructure needs no extra invocation. Follow the discovered technology guidance for runtime details and cleanup. Preparation records do not settle the downstream QA session.

When `_playtest.md` belongs to that task's scope, update its steps to the delivered interface, group items sharing a starting state, and prepare a compatible save in the tester's runtime or exact steps from New Game. Keep the accepted expectations and `PT`/`PH` IDs. Do not rewrite a failing expectation to match the implementation or fill the person's results. Name the navigation a prepared state omits; it cannot prove that prefix. A declared save must have actual provenance, not a fabricated state that bypasses the behavior under observation.

Retain preparation evidence and release resources opened for it, including on partial failure. If preparation needs an unavailable input, record the exact dependency, affected work and next action, and continue independent planning. Do not label starting states ready when required preparation remains unperformed.

## 6. Review the plan and hand it back

Write complete missions into the QA execution task's **Journeys** section or the associated verification plan; list technical checks separately with their paths/selections, prerequisites and expected observations. Keep planning decisions, preparation evidence and unresolved dependencies in the QA-plan task's Execution Notes or the existing verification record. Without an associated record, return the plan in the conversation; create a separate file only when requested. Do not bootstrap a QA tree, bug registry, automation backlog, or report for an unrun session.

Check that the requested behavior has an observation owner, each mission satisfies the shared contract, expected results have independent sources, and all required variants, preparation and human dependencies are explicit. Verify references and actual case availability. Distinguish ready work from work still requiring preparation; leave unexecuted results unsettled and preserve prior verdict provenance. When nothing remains to run, state why and cite the covering evidence.

Return the selected journeys and technical checks, reuse/omission rationale, preparation status, output location and unresolved decisions. Planning is finished when this handoff is complete; a QA-plan task also owes its contracted preparation before the task executor can close it. Return to the caller without launching sessions or final verification. Keep defects with their evidence or existing defect record; recording deferred work remains a separate user decision.
