---
name: create-insight-dashboard
description: Build an HTML dashboard of a spec execution's metrics and evidence-backed proposals to improve the instructions, guides and tools agents use in this project. Manual use only, when the user explicitly asks; proposals are never applied.
disable-model-invocation: true
---

# Create Insight Dashboard

Build `<spec>/insight-dashboard/index.html` for one spec execution: eight metric charts, followed by Insights in which six lens subagents examine the execution and you consolidate their findings into a few prioritized proposals, cases that need no change, and pending investigations.

## Inputs

- **Spec:** its directory, plus `--run` when `execution-metrics/` holds more than one run, and `--commit` when the records are retained in a Git revision rather than the working tree. Ask only if the spec cannot be identified.
- **Language:** the conversation's, or the one the project instructions set. The interface supports `en` and `pt-BR` (use `en` otherwise); write insight text in the chosen language.
- **Comparison material (optional):** `insights.json` files of earlier dashboards, or error inventories of earlier specs, to measure recurrence.
- **Work directory:** a scratch directory outside the project for intermediate data.

Write only `<spec>/insight-dashboard/`. Do not change skills or project files, reproduce the execution, or run product verifications. A spec without `execution-metrics/` still gets a dashboard: each chart states why its data is unavailable, and topics without a basis stay `none`.

## Procedure

Scripts are Python 3 standard-library helpers in [scripts](scripts); run them with `python3 -B` from this skill's directory. They read the project and write only to the work directory or `--out`. The metrics reader comes from the installed `spec-execution-metrics` skill; pass `--metrics PATH` if it is installed elsewhere.

1. **Prepare.** `prepare.py --project ROOT --spec SPEC --workdir TMP [--run ID] [--commit REV] [--sessions-root DIR] [--max-lanes N]`. It writes `manifest.json`, `dashboard-data.json`, `sessions.json` and `facts.json` to `TMP`, and prints the gaps. Record the gaps; never fill them in.
2. **Triage.** Read the data in [charts](references/charts.md) and the spec's own notes. Skip a lens if none of its topics has any input. Write those topics as `none`, each with a `note` explaining why, in `TMP/fragments/coordinator.json`.
3. **Lenses.** Start one fresh, read-only subagent per remaining lens, all in parallel, using the prompt in [insights format](references/insights-format.md#lens-prompt) and its lens from [lenses](references/lenses.md). Save each returned fragment as `TMP/fragments/<lens>.json`.
4. **Merge.** Run `validate_insights.py --workdir TMP [--root NAME=DIR ...] --fragments TMP/fragments --draft TMP/draft.json`. Declare every root outside the project that the fragments cite. Send each broken citation back to its lens, or remove the claim; never invent evidence.
5. **Consolidate** the draft according to [insights format](references/insights-format.md#consolidation): deduplicate, resolve or expose conflicts between lenses, select a few priorities, move cases to `no_change` or `pending`, and write `scope`.
6. **Validate.** Run `validate_insights.py --workdir TMP [--root ...] --insights TMP/draft.json --out SPEC/insight-dashboard`. On success it writes `insights.json`; on any error it writes nothing.
7. **Render.** Run `render_dashboard.py --workdir TMP --out SPEC/insight-dashboard --lang en|pt-BR`. When a browser is available, open the page and check that the console is clean and the charts and insights appear.
8. **Deliver** the generated paths, the counts of priority proposals, no-change cases and pending investigations, and the gaps. The proposals remain proposals: changing skills or project files requires the user's decision.

To revise the insights later, edit `SPEC/insight-dashboard/insights.json`, then repeat steps 6 and 7 with that file as `--insights`.

## Charts

1. **Time and tokens per task:** occupied time, declared sum, and total and uncached tokens per task.
2. **Execution timeline:** coordinator and packed subagent lanes colored by activity group, with subagent concurrency.
3. **Cumulative tokens:** coordinator and subagent tokens over time, total and uncached.
4. **Cost per activity category:** occupied time and tokens per category, with instrumentation highlighted.
5. **Verification commands:** each command's duration by type, the most repeated checks, and failures.
6. **Findings:** classification × origin, discovery channel, and handling stages.
7. **Rework per task:** occupied hours against findings, sized by tokens, plus acceptance markers.
8. **Measurement quality:** reader gaps, quality records, and how tokens were attributed.

Tokens are not subscription quota; the records hold no quota data. Session context and skill reads come only from local Codex transcripts (default `~/.codex/sessions`). Without them, the topics about context and skills usually end as `none`.
