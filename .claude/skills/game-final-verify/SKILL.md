---
name: game-final-verify
description: "On explicit request, verify a game delivery and improve its affected fast and slow tests before issuing PASS, FAIL, or BLOCKED. Review-only requests remain read-only; does not publish or record human acceptance."
---

# Game Final Verify

For an explicitly invoked verification whose spec contains `_execution-metrics.md`, use [spec-execution-metrics](../spec-execution-metrics/SKILL.md) before context preparation. Reuse its active execution or initialize a direct one; observe review, check, repair and closure activities, commands and findings, and link metrics/gaps in the existing verification record. Freeze direct-execution boundaries at closure. Collection does not invoke this procedure or widen review-only authorization.

Verify the contracted behavior and the candidate that will actually be delivered. Review test value before the final verdict, apply justified changes within authorization, then validate the retained guarantees. Fewer cases or a shorter run is not a success criterion by itself.

Use only when explicitly requested. Do not attach this procedure automatically to a task or delivery loop. A request to execute Final Verify authorizes supported test improvements and repairs within the delivery's scope. An expressly review-only request authorizes inspection and proposals, not edits. Neither request authorizes relaxing accepted requirements, recording human acceptance, committing, pushing, or publishing.

## 1. Establish the claim and candidate

Read project instructions, the accepted spec/task and its verification and playtest contracts, execution notes, relevant decisions, and changed files. Use the project's actual layout. Identify each claimed criterion, its expected observable, required variants, and assigned sensor, including human judgment when required.

Freeze the delivery's base/head, index and working tree, additions and deletions, and relevant input hashes; list relevant ignored inputs separately. Assign each candidate an owning scope. Preserve and explicitly exclude unrelated pending work. An unchanged HEAD does not prove a dirty tree was checked.

The normal test-review scope is the delivery delta **and tests affected through its dependencies**, even when their declarations are unchanged. Trace changed helpers, fixtures, content, configuration, and runtime dependencies. Inspect neighbors to establish coverage, without silently turning a delivery review into whole-project cleanup. A requested seed or global review may include the entire suite.

When a later snapshot inherits an earlier review, reapply its edits against the new baseline instead of copying files. Carry a change only where the baseline is unchanged. Where both sides changed the same code, keep the later owner and re-derive the earlier assertions on it. A clean text merge is not semantic compatibility, so run the inherited candidate before judging it. List every earlier assertion that was not carried and give that list to the judges. They otherwise judge the weaker candidate as if it were the starting point.

## 2. Inventory and judge test guarantees

Read [scan cards](references/scan-cards.md) in full to inventory and dispatch the bounded review, and [the tests lens](references/purge-tests.md) in full to judge it. Inventory fast and slow tests and executable QA recipes from runners, manifests, imports, and consumers. Names such as UT/IT and elapsed time alone do not establish execution boundaries.

Use the `scanner`, `judge`, and `challenger` roles as specified by the review references. The coordinator owns inventory completeness and reconciles their evidence. Judge guarantees and carrying assertions, not only whole test files. A test can retain runtime assertions while transferring authored-file or logic assertions to a fast owner.

Read [challenge](references/challenge.md) before reconciling non-keep proposals. Confirm the surviving observation, required variants, consumers, and evidence for every change. An accepted requirement is not waived because a reviewer calls a check redundant. If a proposal needs a new product decision, retain the existing coverage and continue independent work; ask only when that decision blocks correct completion.

## 3. Apply supported changes and validate

In execution mode, apply defended changes and repair scoped failures at their source without another routine approval. In review-only mode, leave proposals unapplied and distinguish the current candidate from the hypothetical result. A retained test that exposes a failure is evidence to diagnose, never a reason to remove or weaken it.

When a required check lacks reliable infrastructure, use [game-test-infrastructure](../game-test-infrastructure/SKILL.md) to create, extend, or repair the project's capability within this verification's authorization. Review-only findings remain proposals. Working commands need no infrastructure invocation; this procedure retains ownership of coverage and the final verdict.

Update the existing coverage owner when assertions move. Preserve diagnostic independence when sharing setup; do not join unrelated guarantees into an opaque journey just to avoid startup. Avoid production architecture changes solely to manufacture a fast substitute. Validate changed registration, affected tests and consumers with the project's commands. Use a targeted negative control only when it resolves a material replacement uncertainty; remove temporary mutations before final validation.

Audit the candidate using [candidate audit](references/candidate-audit.md) before the final verdict, updating it for changes made during this run. This covers all proposed artifacts; it is not a documents or environment-variable purge. Apply ordinary scoped correctness repairs, but do not infer authorization for unrelated archiving or deletion from an inclusion proposal.

## 4. Establish final evidence

When the claim includes slow tests, parallel execution or duration measurement, read [slow-test execution](references/slow-test-execution.md) in full. Consume the project's configured worker and browser ceilings, reuse or prepare its shared executor within authorization, and reconcile the retained inventory with actual execution. Load applicable technology guidance through skill discovery; do not infer runtime readiness or isolation from a concurrency flag.

For a **whole-spec delivery PASS**, account for every retained canonical test with valid passing execution evidence on the final candidate. A focused run alone cannot satisfy this. Reuse earlier results only when source, fixtures/content, dependencies, build/configuration, sensor and relevant environment remain equivalent; rerun invalidated cases. Account for discovery and shared-runner changes that may invalidate more than an edited declaration. Evidence reuse preserves the original execution date and scope, not a claim of a new run.

For a task or narrower claim, execute its required checks and name the remaining integration obligations without implying whole-spec readiness. Canonical suite coverage does not replace required executable recipes, runtime checks, builds, or human playtests outside that suite. Keep their evidence and outcomes distinct. A tooling check that cannot start because a declared dependency is not installed is an environment gap, not a pass and not a failure of its guarantee. Install the declared version in an isolated copy, never in the delivery tree, or report the check as unrun.

Check applicable states: implementation exists; required static and runtime checks pass; explicit human acceptance exists where the contract requires it; all release-readiness obligations within the claim are satisfied. Challenge whether the evidence observes the capability itself, including relevant failure, recovery and cleanup boundaries, rather than setup or an adjacent helper. A source trace or narrow reproduction supports a finding; label unsupported suspicions separately.

Reuse valid evidence and an equivalent candidate audit. Do not require fresh before/after full runs on every invocation. If reporting performance gains, use comparable complete conditions: record outcomes, fast/slow counts and duration sums, command wall time, and relevant environment/concurrency. Separate focused, failed and interrupted attempts; preserve their records. Distinguish edited-case differences from movement in unchanged cases, and do not equate parallel case-duration sums with wall time. A single run per condition is an observation with run-to-run uncertainty, not a stable causal estimate. Without comparable measurements, leave savings unmeasured.

## 5. Report the result

Issue `PASS`, `FAIL`, or `BLOCKED` for the exact claim and candidate. `PASS` requires all applicable obligations, not merely a green subset. `FAIL` identifies confirmed failed obligations; repair authorized failures and repeat only invalidated checks. `BLOCKED` identifies the unavailable external input or unresolved decision preventing verification. A skip, omission, waiver, or unrun check is not a pass.

Record a concise verdict, applied or proposed changes, rejected proposals, coverage transfers, evidence and material limits in the existing verification owner (or the requested review response). Keep detailed cards and run artifacts in local evidence, linked where useful, without creating a competing status system. Distinguish delivery correctness, candidate inclusion, pending human judgment and actual Git actions. Finish when the requested scope and applicable checks are satisfied, or report the concrete blocker and completed independent work.
