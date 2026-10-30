# Lenses

Six lenses cover the 17 topics. Each topic id appears exactly once in the merged insights, in this order. A topic is `none` when its sources hold no evidence for a claim; the `note` says which source was missing or what was checked. Every lens may read the whole repository, the spec directory (spec, task files, execution notes, verification receipts), the work-directory data in [charts](charts.md#work-directory-data), and any comparison material the user supplied.

## orchestration — Orchestration and context

| Topic id | Title | Questions |
| --- | --- | --- |
| `skills` | Skills that executed the spec | Which skills and references were read, by which role, and how often? Which applicable ones were never read? Were they reread after compactions? Were the installed copies the versions in effect? |
| `coordinator-context` | Coordinator session context | How long did the coordinator run, how often was it compacted, and what share of the tokens did it use? Which directory and `AGENTS.md` did it start from? |
| `parallelism` | Parallelism and orchestration | Did the task graph allow parallel work, and did the execution use it? Where did agents wait? |

Main sources: `sessions`, `dashboard.timeline`, `dashboard.cumulative`, `dashboard.kpis`, `facts.task_graph`, `facts.installed_skills`. Without transcripts, `skills` and `coordinator-context` are usually `none`.

## verification — Verification and tests

| Topic id | Title | Questions |
| --- | --- | --- |
| `test-architecture` | Test architecture | Which test layers and suites ran, how long they took, and whether the selection matched the change. |
| `command-failures` | Command failures and rework | Which commands failed, which checks repeated, and what the notes give as causes. Separate distinct errors from successive attempts at the same one. |
| `fixtures-readiness` | Fixtures, preparation and readiness | Did failures come from fixtures, environment or preparation rather than the product? |
| `test-infrastructure` | Test infrastructure built during the spec | How much time went to building test tooling, and is it reusable? |
| `fresh-agent` | Evaluation by fresh agents | When agents without history verified the work, in which context did they start, and what did they find? |
| `persona-qa` | QA and playtest | What did persona QA or playtests find, and how did that compare with delivery checks? |

Main sources: `dashboard.commands`, `dashboard.findings`, `dashboard.rework`, `dashboard.categories`, task notes and verification receipts. A failing test is not automatically a product defect or an agent mistake, and test time is not automatically waste.

## code — Code and technology

| Topic id | Title | Questions |
| --- | --- | --- |
| `code-architecture` | Code architecture | Did the module structure cause rework, broad changes or hard-to-test code? |
| `technology` | Technology used in the project | Did runtime, tooling or capacity limits shape failures or cost? |

Main sources: the repository code, `dashboard.findings`, `dashboard.commands`, task notes.

## planning — Spec and planning

| Topic id | Title | Questions |
| --- | --- | --- |
| `spec-tasks` | Spec and task size | Did task size and graph shape match the time and rework each task took? Were acceptance criteria clear enough? |
| `findings-recurrence` | Findings and recurrence | Do this execution's findings repeat patterns from the comparison material? |

For recurrence, cite each grouped occurrence. Distinguish a recurrence (the same kind of error across executions) from successive attempts at the same error, and treat a one-off study as evidence of a single execution. Without comparison material, compare only within this execution and say so.

## harness — Harness and instructions

| Topic id | Title | Questions |
| --- | --- | --- |
| `project-instructions` | Project instructions | Which project instructions, decision records and postmortems applied, and did agents load and follow them? |
| `instrumentation` | Metrics instrumentation overhead | What did measuring cost in time and tokens, and did it disturb the work? |

For every guidance problem, decide which of the five states applies: the guidance was absent; wrong, ambiguous, incomplete or conflicting (`defective`); existing but not found or loaded (`not_loaded`); found but misapplied; or applied correctly without resolving the problem (`insufficient`). Cite the version in effect during the execution with `git show REV:path` evidence, or say why it cannot be recovered. Existence does not prove reading: `misapplied` and `insufficient` need reading evidence. When the problem is not in the instructions, say what the evidence supports. These rules also apply to instruction and tool proposals from other lenses.

## delivery — Delivery and storage

| Topic id | Title | Questions |
| --- | --- | --- |
| `delivery` | Closure and delivery | How did technical closure, user acceptance and Git integration go, and where did they stall? |
| `storage` | Evidence and storage | How much evidence and how many artifacts did the execution produce, and is that retention useful? |

Main sources: task notes, `facts.git`, the spec's commits, and the artifact folders the notes cite.
