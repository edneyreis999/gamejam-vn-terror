# Insights Format

`validate_insights.py` enforces everything below except the judgment calls. Write every text field in the dashboard language.

## Rules

- Separate fact, hypothesis and pending decision. A cause supported only by hints is labeled as a hypothesis.
- A failing test is not automatically a product defect or an agent mistake. Test time is not automatically waste. No measurement is not zero, and missing time or token data neither excludes nor demotes a well-documented problem.
- Do not estimate effort from commit counts, or treat figures from sources with different coverage as proof of gain.
- Before proposing an instruction change, compare keeping the text, removing the passage, and replacing it with minimal wording. Separate obligations unique to the passage from protections that other guidance in the agent's context already provides. A general rule does not automatically replace a specific requirement.
- Prefer correcting, simplifying or reorganizing existing material. Add text only when a concrete failure requires it and smaller alternatives are insufficient. Propose a tool only where the need is demonstrated. Leaving guidance unchanged is a valid outcome, and removal is not a goal in itself. Neither brevity nor a newer model proves better behavior.

## Fragment

Each lens returns one JSON object:

```json
{"lens": "harness", "topics": [TOPIC, ...], "no_change": [NO_CHANGE, ...], "pending": [PENDING, ...]}
```

Each topic of the lens appears once (ids in [lenses](lenses.md)). `no_change` and `pending` hold the cases the lens found; their ids must be unique across all fragments.

## Topic

`{id, title, status, note?, items?, see?}`. `status` is `insight` (at least one item) or `none` (no items; `note` says why). `see` lists `"no_change:<id>"` or `"pending:<id>"` references, which must exist.

## Item

Always: `change_kind`, `insight`, `impact`, `recommendation`, `confidence` (`high`, `medium`, `low`) and `evidence[]`.

- `change_kind`: `instruction`, `tool`, `process`, `user_decision`, `local` or `observation`.
- `priority: {selected, rationale}`: required except for `observation`. Lenses set `selected: false`; consolidation selects. Base the rationale on consequence, recurrence, reach and strength of evidence.
- `recurrence: {kind, patterns[], evidence[]}` (optional): `kind` is `recurrence`, `successive_attempts` or `single_execution`; cite every grouped occurrence.
- `recurrence_table[]: {pattern, title, kind, note, evidence[]}` (optional): for an `observation` comparing this execution with earlier ones.

When `change_kind` is `instruction` or `tool`, also:

- `guidance: {state, summary, version, evidence[] | unrecoverable}`. `state` is `absent`, `defective`, `not_loaded`, `misapplied` or `insufficient`. Cite at least one `git` evidence of the version in effect during the execution, or give an `unrecoverable` reason. `misapplied` and `insufficient` also need evidence marked `"reading": true`, which must be `sessions` data or a file citation. If the state cannot be decided, make the case `pending` instead.
- `alternatives[]: {option, loses, judgment, recommended}`, which must include `keep`, `remove` and `minimal`, and may add others. `loses` says what that option gives up; `judgment` says what then depends on the agent's judgment. Exactly one is recommended, and `keep` is a valid recommendation.
- `destination`: `general_skill`, `engine_specialization`, `project_guide_or_helper` or `local_fix`.
- `evaluation`: `signal` (how to tell the change works), `costs`, `lost_protections`, `side_effects`, `textual_review` and `behavioral_benefit`. Keep the last two apart: a completed textual review is not a measured behavioral benefit.
- `proposed_text: {target, base: {repo?, rev, path}, format, text}`: required for `instruction`, optional for `tool`. `format` is `diff` or `before_after`, and `base` must exist in Git. The dashboard shows it as not applied.

## No change and pending

- `no_change[]: {id, title, reason, evidence[]}`: the evidence justifies keeping things as they are.
- `pending[]: {id, title, gap, decide_with, evidence[]}`: not enough basis; `decide_with` names the evidence that would allow deciding.

## Evidence

Every evidence entry has a `label`. Paths are relative to a root: `project` by default, or one the coordinator declares with `--root NAME=DIR` (another worktree, earlier inventories). Absolute paths and `..` leaving the root are refused.

- `{"kind": "file", "root"?, "path", "line"}`: the line must exist. Add `"reading": true` when it proves an agent read something.
- `{"kind": "git", "repo"?, "rev", "path", "line", "same_as"?: {"root"?, "path"}}`: checked with `git show REV:path` in the root named by `repo`. `same_as` requires that file to be byte-identical to the blob, proving that the cited revision is the copy that was in use.
- `{"kind": "data", "source", "path", "show"?}`: `source` is `dashboard`, `sessions` or `facts`; `path` uses keys, list indices and selectors such as `tasks[task=T07].tokens.total` that must match exactly one item; `"show": "len"` displays a length.
- `{"kind": "finding", "label"}`: the label must exist among the reader's findings.

## Consolidation

On the merged draft:

1. Merge duplicate items across lenses, keeping all their evidence.
2. Where lenses conflict, keep the claim the evidence supports. If neither side is settled, record the conflict as `pending`.
3. Select a few priorities (`priority.selected: true`) across the whole document.
4. Move items without enough basis to `pending`, and cases where the evidence justifies no change to `no_change`. Link them from their topics with `see`.
5. Write `scope`: the sources consulted, with revisions, availability and coverage, and what was not reviewed.

## Lens prompt

Fill in the brackets and send one prompt per lens to a fresh subagent.

```text
You are the "[lens title]" lens of an insight dashboard for the spec at [spec path] in the project at [project root].
Read-only: do not edit, create or delete files, and do not run project code or tests.

Topics you own: [topic ids and titles with their questions, copied from lenses.md].
Inputs: the spec directory; the work directory [workdir] with dashboard-data.json, sessions.json and facts.json
(field guide: [path to references/charts.md]); comparison material: [paths or "none"]; extra roots: [NAME=DIR or "none"].
Known gaps: [gaps printed by prepare.py].

Follow [path to references/insights-format.md]: its rules, the item fields and the evidence kinds.
Cite only what you opened; quote the exact line numbers. If a topic has no basis, return it as status "none" with a note.
Write in [language].
Return only one JSON object: {"lens": "[lens id]", "topics": [...], "no_change": [...], "pending": [...]}.
```
