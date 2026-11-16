---
name: game-execute-qa
description: Run persona-based dogfooding of a game or its authoring tools from a QA task or direct request. Walk public journeys, investigate friction, retain evidence, and repair scoped defects between sessions; does not replace technical tests, final verification, or human playtests.
---

# Game Execute QA

Before mission preparation, check the owning spec for `_execution-metrics.md`. When present, use [spec-execution-metrics](../spec-execution-metrics/SKILL.md), reusing the caller’s execution or initializing a direct one. Record preparation, persona QA, investigation, repairs and retests; preserve persona discovery provenance and link metrics/gaps in the existing session evidence. Freeze a direct execution at closure; nested calls leave closure to their caller. Collection failure does not interrupt the mission.

Experience the game or its authoring tools as a real user would: adopt a persona, walk a journey to its true end state, explore through one theme, and report what happened. Planned steps guide the walk without reducing it to an automated recipe. A session can reveal both functional defects and friction that no assertion fails.

Use for an authorized QA task or direct dogfooding request. Routine test runs use the project command. The calling task owns its technical checks and completion; this skill owns the persona session and its evidence. Neither a session nor a passing suite records human acceptance or invokes final verification automatically.

## 1. Resolve the mission

Read applicable project instructions, the request or QA task, its cited spec/checks, relevant previous findings, and evidence already available. Discover the best-practices skill for the project's technology; it supplies engine-specific preparation and observation constraints.

Read [session protocol](references/session-protocol.md) in full before execution. A task's QA plan uses [game-plan-qa](../game-plan-qa/SKILL.md) to supply the complete mission defined here. If a required element is missing or invalidated, repair the affected plan through that skill within the authorized task flow; do not silently replace the agreed scope. Continue independent ready sessions. For a standalone request, prepare the same mission from the request and project facts, without requiring a separate planning invocation, spec, task graph, or QA documentation tree. Ask only for a missing user decision that prevents correct work.

Use the relevant sections of [personas and tours](references/personas-and-tours.md) when preparing a mission or applying its theme. Select by affected behavior and user risk, not by a quota of personas, tours, cases, or findings. A changed plugin can affect an author journey, a player journey, or both; its label alone does not determine the session.

For changed-scope QA, cover the affected public journeys and adjacent ones where shared behavior makes propagation plausible. A full request consumes its agreed scope, without silently expanding a focused request. When no relevant journey remains, cite why and return without inventing a session.

## 2. Establish the session context

Identify the actual candidate, relevant inputs, runtime, starting state, persona settings, evidence destination, and required sensors. Check the public entry is reachable and preparation preserves the claimed behavior. Disclose deviations from the intended player or author environment. A mock, fabricated save, or prepared scene cannot prove the omitted journey.

Use existing project commands and available interaction tools. If a necessary capability is absent or defective, use [game-test-infrastructure](../game-test-infrastructure/SKILL.md) within the current authorization. Working infrastructure needs no extra invocation. The project owns reusable runners, fixtures, capture, and cleanup; do not install a second executor in this skill. A review-only request remains inspection and proposals.

When using Playwright CLI as the interaction tool, read [its operation guide](../playwright-cli/SKILL.md). Its commands do not change this skill's persona, public-interface, evidence, or session rules; internal evaluation and page-provided tools cannot bypass a player's journey.

Initialize the planned sessions and outcomes in the existing task or verification record before the first session. In a standalone run, introduce the mission in the conversation and return results there. Keep evidence in the project's execution outputs; create a separate report only when requested. Read earlier results before resuming, preserving their candidate and date rather than presenting them as a new walk.

## 3. Walk in persona

Follow the session protocol: enter → act → observe → verify → capture → continue. Use the persona's knowledge and public interfaces. Apply its tour during the journey, probing relevant branches, abandonment, and recovery within the mission. Notice paper cuts throughout; use the applicable experience lenses without imposing a second full walk.

During the session, do not inspect code to discover the intended answer, use internal reads as proof, assign game state, or call an internal feature to bypass the interaction. Preparation may use technical knowledge; diagnosis happens after ending the affected session. A documented public API or CLI is valid only when it is genuinely the chosen persona's interface, not a shortcut around a player's action.

A stall or uncertain input is evidence: capture the attempted action and current state, end the affected leg, and diagnose outside the session. Never nudge through or retry until green. A later clean attempt retains the first failure and states what changed or which hypothesis it tests. Continue other reachable, independent work.

Respect the mission's time ceiling. Ending a session on time does not pass its unvisited scenarios or finish the calling task. Return remaining obligations to the planning owner; continue authorized follow-up sessions through the caller's workflow without routine approval checkpoints. Do not reset the timer to extend the same session or silently enlarge an explicit overall budget.

## 4. Record findings, repair, and retest

After each session, update its outcomes and debrief in the existing record, or in the conversation for a standalone run. Distinguish observed defects, persona-felt friction, and unconfirmed hypotheses. Search related findings before creating another account; link or update an existing defect record when available. Otherwise retain reproduction and evidence with the session. This skill creates no mandatory bug registry, and a reproduced defect is not a known-issue deferral.

An ordinary standalone QA request authorizes contained repairs between sessions when the cause is understood, the expected behavior is unambiguous, and the change is within scope and low risk. Respect broader repair authorization from the calling task and explicit observation-only constraints. Ask about unresolved product choices or work beyond authorization; do not redesign the game to clear a finding.

Classify the cause as product, preparation, infrastructure, or unresolved. Repair infrastructure through its owner. Prove a product fix with the check that owns the invariant, adding coverage only when that invariant is uncovered; presentation changes may use an appropriate before/after replay. Re-walk the affected journey from a reliable starting state, in persona, and check adjacent journeys when propagation is plausible. Preserve the initial failure separately from the retest. Run affected technical checks under the task's existing requirements; do not prescribe a full suite for every session.

After two diagnostic attempts without new information, preserve the evidence and next refutable hypothesis, then continue independent work. Missing tools or human observations remain explicit gaps, not product passes. Only the user can change accepted scope or expected behavior, waive an obligation, or provide required human judgment.

## 5. Close the requested scope

Account for every planned session and in-scope scenario using the session protocol's outcomes. Report journeys actually walked, evidence, defects and friction by user impact, fixes and retests, omissions, environment deviations, cleanup, and remaining decisions. A closed QA round may contain honest failures or gaps; it does not imply a completed delivery task.

Release owned resources on every exit through the project's lifecycle tooling, including partial startup and failed capture. Retain useful failure evidence and disclose incomplete cleanup. Return to the caller for its remaining tests and task status. Human playtest items stay unexecuted until the person actually performs them; technical observation and a simulated persona never supply their acceptance.
