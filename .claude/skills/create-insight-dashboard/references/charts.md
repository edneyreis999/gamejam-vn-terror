# Charts and Work-Directory Data

## Reading rules

These follow the `spec-execution-metrics` reader; the scripts already apply them, and claims in insights must respect them too.

- A token record counts toward a task or category only when every activity linked to it shares that key. Otherwise it stays `mixed`; a record with no activity is `unattributed`. Tokens are never split by time.
- Occupied time per group is the union of its active intervals. Groups overlap (parallel subagents), so their durations are never added into a total.
- Token records without a component or baseline are left out of sums and counted as a gap. Unknown values stay unknown, never zero.
- Cached input is part of input. Uncached tokens = uncached input + output.
- Tokens are not subscription quota.

## The eight charts

| # | Question | Breakdown | Basis |
| --- | --- | --- | --- |
| 1 | Where did the cost concentrate? | Task (`TNN`, `spec` for spec-scoped work) | Occupied union, declared sum, attributed tokens |
| 2 | Where did the time go? | Coordinator lanes, packed subagent lanes (lanes beyond `--max-lanes` merge into one), concurrency | Activities with both start and end; wait is hatched |
| 3 | When were tokens spent? | Coordinator vs subagents, 5-minute windows | Snapshot timestamps of complete token records |
| 4 | Which kind of work cost most? | 13 activity categories folded into 8 color groups plus `other` | Occupied union and attributed tokens per category |
| 5 | How much verification ran, and how much failed? | Verification type, check, normalized environment | External command duration; exit code ≠ 0 = failed |
| 6 | Where did errors come from? | Classification × origin, channel, stages (fix, retest, passing retest) | Reader findings and normalized finding links |
| 7 | Did expensive tasks have more findings? | Task | Occupied hours, findings, tokens, acceptance markers |
| 8 | How exact are the charts? | Reader gap codes, quality records, token attribution | Reader gaps, `quality` records, reconciliation states |

A chart without data shows "Data unavailable" and the reason from `blocks.<g1..g8>.reason`.

## Work-directory data

`data` evidence cites these files by source name and a path (see [insights format](insights-format.md#evidence)).

- **`dashboard`** (`dashboard-data.json`): `source` (spec, title, commit, run, reader), `metrics.available`/`reason`, `blocks`, `kpis` (`elapsed_seconds`, `occupied_seconds_by_clock_domain`, `tokens.total`, `coordinator_tokens`, `commands`, `commands_failed`, `findings`, `acceptance_markers`, `defect_counts`, `inclusion`), `tasks[task=TNN]`, `categories[category=…]`, `timeline`, `cumulative`, `commands` (`by_type[type=…]`, `by_check[check=…]`, `by_environment`, `returncodes`, `attempt_values`), `findings` (`list`, `matrix`, `by_channel`, `by_task`, `funnel`, `relation_raw`), `rework[task=TNN]`, `quality` (`gap_codes`, `quality_records`, `token_partition`, `task_attribution`, `category_attribution`, `collector_versions`).
- **`sessions`** (`sessions.json`): `available`/`reason`, `sessions_expected`, `sessions_found`, `missing_sessions`, `coordinator` (`cwd`, `agents_md_dir`, `compactions`, `user_turns`, `tool_calls`, `spawns`), `roles.<coordinator|subagent|exec>` (`sessions`, `compactions`, `agents_md_dirs`, `cwds`, `agent_paths`), `skill_reads[role=…,repo=…,skill=…,file=…]` (`reads`, `sessions`), `coordinator_reads_timeline`. `repo` is `project` (the project or one of its Git worktrees), `other`, or `unresolved` (the command's working directory was not a literal path). A read is a shell command that printed or searched a skill file, so it shows access, not understanding; skills injected into the context leave no read.
- **`facts`** (`facts.json`): `task_graph` (`source`, `tasks`, `dependencies`, `levels`, `max_level_width`, `strict_linear_chain`), `installed_skills.<.agents/skills|.claude/skills>.<name>` (content hash, symlink, tree id at `--commit`), `git` (`head`, `branch`, `commit`, `spec_commits`).

`manifest.json` and `query.json` (the raw reader output) are also in the work directory, for reading only; they cannot be cited.
