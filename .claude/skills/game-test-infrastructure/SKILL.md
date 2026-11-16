---
name: game-test-infrastructure
description: Create, extend, or repair project-owned test infrastructure when a requested check lacks a reliable execution path. Covers runners, fixtures, selection, and resource lifecycle; ordinary test runs use the project command.
---

# Game Test Infrastructure

When invoked within a spec containing `_execution-metrics.md`, use [spec-execution-metrics](../spec-execution-metrics/SKILL.md) before preparation: attach to the existing execution or initialize the authorized direct one, distinguish infrastructure work from test creation and product correction, and observe maintained commands. Return activity references and collection gaps to the existing evidence owner. Freeze only direct-execution closure; nested calls retain the caller’s identity and boundaries. Collection never authorizes infrastructure work by itself.

Make the support needed by concrete checks available through the project's reusable test command. Build it with its first consumer and extend it when later checks need a new capability. This procedure covers fast logic and static checks as well as runtime checks; a spec does not need every kind.

Use on a direct request or when an authorized task or verification encounters missing or defective infrastructure. A standalone request needs no spec package. Planning and review-only requests produce findings or a proposed change, without installing dependencies, writing files, or launching a runtime. Continue authorized implementation and repair without routine approval checkpoints; ask only for an unresolved decision or unavailable external input that blocks correct work.

The caller owns the behavior, expected results, coverage, journeys, and delivery verdict. This skill owns the means to execute and observe those checks. The maintained runner owns preparation and cleanup on each execution; no separate bootstrap session is required for an ordinary run.

## 1. Identify the required capability

Read the task's checks and cited spec sections, `_tests.md` when present, relevant project instructions, and technical decisions. For a direct request, use its stated checks and outcomes. Identify the starting state, real entry path, expected observation, required environment, and dependencies of the checks this infrastructure must support.

Distinguish what needs isolated logic, integration, a running game, rendered or recorded output, an authoring tool, or human judgment. Plugin parameters and commands can require authored input to reach a real consumer; a parser result or command inventory alone does not establish that effect. Preserve the assigned sensor and independent expected result. Missing capability does not authorize replacing the check with an easier observation.

Discover and load the best-practices skill for the project's technology when available. It supplies engine-specific preparation, formats, runtime constraints, and helpers. Resolve bundled helpers from their owning skill's directory.

For Playwright browser tests, use [Game Playwright Best Practices](../game-playwright-best-practices/SKILL.md) for runner registration, fixtures, context ownership, and evidence. Interactive CLI operation is a separate capability; it does not replace the maintained test runner or require a second executor.

## 2. Locate the gap

Inspect the project's current command, registrations, fixtures, and actual consumers. Reuse infrastructure from earlier specs. When it already supports the requested checks, hand back its command and prerequisites without rebuilding or adding another runner.

For a missing capability, identify the smallest change that makes the consuming check runnable. Follow imports and parameterized cases where selection changes; names and UT/IT prefixes do not establish execution boundaries. Keep maintained checks distinct from historical evidence. Missing case sources, builds, or starting-state producers must remain visible rather than disappearing from the selection.

## 3. Implement support in the project

Keep the shared command, reusable helpers, and fixture builders outside spec directories. Use the runner's native selection and scheduling when adequate; introduce wrappers only for a demonstrated missing capability. A fresh project starts with what its first checks need. Extend the same command as capabilities grow, without copying a research controller, adopting a universal executor, or creating an adapter framework for hypothetical engines.

- **Selection:** expose independently selectable checks or groups with their required variants. Keep identities, execution boundaries, and dependencies with registration or a small maintained selection manifest. Reconcile requested and observed cases so omissions, duplicates, failures, and cancellations cannot become an aggregate pass.
- **Preparation:** make dependencies, builds, fixture inputs, and starting-state producers reproducible from maintained sources. Build shared outputs before consumers run, or isolate the outputs. Preserve producer/consumer ordering and report unavailable prerequisites while independent work continues.
- **Resources:** when slow checks need scheduling, consume the root `loki.config.json` policy rather than introducing new defaults. Account separately for worker and browser demand, including nested runners. Admit jobs within both ceilings and serialize work sharing an exclusive resource. Do not add browser machinery to checks that need none.
- **Results:** retain the selected identities, relevant inputs and environment, actual outcomes, and cleanup result using the project's runner output. Capture completion and observations awaiting inspection remain distinct. A successful process exit alone is insufficient evidence of complete execution.

Keep the task's assertions and acceptance criteria with their owning checks. Share preparation only when each check retains its intended observation and independent state.

## 4. Own preparation and cleanup

Give each concurrent run or job its own mutable fixtures, temporary paths, storage, and evidence destinations. Share read-only inputs where safe. Fixture builders may remain in the project, but their outputs must never overwrite the authored game. Preserve generated saves or other outputs until their declared consumers finish.

Give every launched process and acquired resource an owner and a close operation. Clean partial startup as well as success, failure, timeout, and interruption; release capacity only after cleanup. An occupied requested resource fails explicitly without terminating an unrelated owner. Preserve failure evidence, report incomplete cleanup, and repair the scoped infrastructure cause before declaring the capability ready.

## 5. Verify the changed capability

Run representative consuming checks through the project command. Reuse existing checks; for a new capability, use its first consumer's check and independent expected result. Establish that the required behavior is observable, not merely that a server or browser starts.

When preparing a task's pre-change signal, a failure at the intended assertion can establish that the execution path works before the behavior is implemented. Record it as an expected failing check, never a product pass.

Verify affected infrastructure properties at their owning boundary: exact selection and nested variants when discovery changes; missing/partial/invalid configuration and overrides when the resolver changes; overlap and measured resource ceilings when scheduling changes; collision, failure, interruption, and cleanup when resource lifecycle changes. Choose checks for the actual change rather than imposing this entire list on every invocation.

Diagnose product failures, infrastructure failures, and unavailable prerequisites separately. Do not weaken assertions, change expected results, inflate timeouts, or add retries to manufacture success. A working executor can expose a product defect; report that outcome to the caller with its evidence. Qualification of a few consumers does not establish a passing full suite or human acceptance.

## 6. Document and return

Maintain a concise usage guide beside the infrastructure, covering the command, selections, prerequisites, output locations, applicable limits, and how later checks join it. Update an existing guide when extending the capability. Keep runtime records in the runner's outputs rather than creating another QA status system.

Record the capability added or repaired, files changed, commands and outcomes, cleanup, and remaining limitations in the originating task's Execution Notes, existing verification record, or direct response. Return to the caller for its remaining checks and verdict. Do not invoke final verification merely because infrastructure work finished.

Finish when the requested capability is implemented, its changed properties and consuming checks have the applicable evidence, and owned resources are released. Where evidence is unavailable or a consumer exposes a product failure, state the exact boundary and continue independent authorized work without presenting the blocked check as passed.
