---
name: game-create-game-tasks
description: Decompose an approved game spec into a dependency graph of vertical tasks, each owning the checks of its outcome. Run on request after spec approval; adds the QA and playtest tail through game-create-playtest-tasks; does not implement or plan an unapproved spec.
---

# Create Game Tasks

Plan an approved spec package under `planos/tasks/<slug>/` as `_tasks.md`, which indexes the graph, plus one `task_NN.md` per task, in English. A spec whose `status` is not `approved` is reported to the user instead of planned. Planning does not authorize implementation.

1. **Read the package.** Read `_spec.md` and every companion it has: `_user_stories.md`, `_tests.md`, `_playtest.md`, `_content.md`, `_dx.md`, `_uiux.md`. Read project instructions and the decision records the spec cites. Load the best-practices skill for each technology the project uses when one is available; it supplies the conventions and hazards that shape the cut. Reuse the spec's File References and research; read code or data only to settle an ownership or dependency question.
2. **Cut the work.**
   - **Vertical slices.** Each task delivers one observable outcome and includes all the code, data, events, and content that produce it. Never cut by file type, layer, or sensor (automated checks early, live checks at the end).
   - **Pilot before batch.** When the increment repeats one pattern across many content units, a pilot task proves the pattern on one unit; the batch tasks depend on it.
   - **Foundation with consumer.** A foundation task names the task that consumes it and proves only its own boundary. The first consumer of a shared primitive owns that primitive.
   - **Test infrastructure with its consumer.** When a check needs a capability the project lacks, assign its creation or extension through [game-test-infrastructure](../game-test-infrastructure/SKILL.md) to the first consuming task. Later tasks reuse the command; order tasks that change shared infrastructure. Planning this work does not execute the skill or create a mandatory infrastructure task for every spec.
   - Size tasks by risk and ownership, never by file count or a quota.
   - An edge is a behavior prerequisite, with one exception: tasks that write the same shared file are ordered by an edge even when they are logically independent.
   - Each entry of the spec's Known Issues to Record becomes an item of the task that introduces the difference it describes or delivers the behavior without the postponed part. Each Known Issues Addressed entry becomes an item of the task that completes its part.
   - Every sentence of the spec that requires updating a document or record when something lands becomes an item of the task that lands it.
3. **Assign checks.**
   - Every `V-NNN` of `_tests.md` goes to exactly one task, and that task can prove it with only its own deliverables and its transitive dependencies. A check that needs several slices goes to an integration task that depends on every contributor.
   - `PT-NNN` and `PH-NNN` of `_playtest.md` are not assigned to implementation tasks; `_tasks.md` lists them as reserved for the graph tail until step 6 assigns them.
   - Reuse existing checks by path and the behavior they cover. Add a check only for a concrete gap, with its exact starting state, action, and result. Use representative cases chosen by risk, never one heavy check per variant. Without `_tests.md`, write the task's cases inline.
   - Every claim names the observable that proves it through the real entry path; a fixture that bypasses that path proves nothing about it.
   - A task that changes data lists every consumer of that data (the engine, the editor, tests, documents), and no check asserts the representation the task itself chose.
   - A task owns updating the existing tests its change makes obsolete.
   - Probe every tool operation the plan prescribes, read-only (help, dry run), before writing it into a task.
4. **Write the files** from [the graph template](references/graph-template.md) and [the task template](references/task-template.md).
5. **Self-check once:**
   - The graph is acyclic, and its nodes match the task files.
   - Every `V-NNN` has exactly one owner; every `PT-NNN` and `PH-NNN` is reserved for the tail.
   - Every `US-NNN.AC-N` and `US-NNN.EC-N`, `C-NNN`, changed `_dx.md` or `_uiux.md` surface, required document update, and known issue is reached by some task.
   - Walking the graph in dependency order, each task's checks can pass using only its own deliverables and those of its dependencies.
6. **Add the graph tail** with `game-create-playtest-tasks`: the QA plan and execution of integrated journeys and the playtest task, where they apply.
7. **Present the graph**, tail included, as a numbered list: title, dependencies, what the task delivers, and the checks it owns. Ask whether the granularity is right, whether each dependency really gates its task, and whether tasks should merge or split. Revise until the user approves. Set `status: approved` only on the user's explicit approval, recording its date and words.

## Rules

- A script that edits authored game data is single-use: run it, verify its result, and delete it in the same task. Never keep it as a verifier, a test oracle, or a file in the spec package. Reusable test runners and builders of disposable fixtures remain maintained infrastructure outside spec directories; fixtures must never overwrite the authored game.
- Write no coverage ledgers, hashes, or separate approval files; `_tasks.md` is an index, not an execution log.
- A request after the increment is accepted becomes a new spec, never a task appended to the delivered graph.

## Updating the graph

Reordering tasks or moving a check to another owner while keeping every obligation, expected result, and acceptance criterion is routine during execution: apply it, update `_tasks.md`, and record the old and new owner in the affected task's Execution Notes. Changing scope or an expected result, or dropping a check, needs the user's decision.

When the spec is amended, update only the tasks the amendment affects; a completed task changes only when its inputs changed.
