# Tail Template

Body guidance for the three tail tasks. Each uses the frontmatter and sections of the general task template; write the applicable instructions and procedure links into the task. Omit a part that does not apply.

## QA plan

- **Outcome:** complete persona-session missions and affected tests are ready, `_playtest.md` matches the delivered behavior, and its starting states are ready.
- **Procedure.** Use [game-plan-qa](../../game-plan-qa/SKILL.md) when performing this task. It owns risk selection, evidence reuse, complete persona missions, the graph tail's affected-test policy, and preparation of the human handoff. Writing the task graph does not invoke that procedure or run QA.
- **Output.** Write the complete missions into the QA execution task's Journeys section and list affected technical tests separately. Keep preparation evidence and unresolved dependencies in this task's Execution Notes. When nothing remains to run, write why there and cite the covering evidence.

## QA execution

- **Outcome:** every planned journey and listed test has run on the integrated build and passed, or carries a precise blocked state.
- **Procedure.** Use [game-execute-qa](../../game-execute-qa/SKILL.md) for persona sessions. The task executor still owns the listed technical tests and task completion; running a recipe or a suite does not substitute for dogfooding.
- **Journeys** (filled by the QA plan), one mission per session using the session protocol's contract:

  ```markdown
  ### J-01 — <title>

  Mission: <what to investigate and why it matters>
  Persona: <goal, familiarity, input method, relevant conditions>
  Tour: <one exploration theme>
  Time ceiling: <explicit limit or the protocol's applicable default>
  Runtime/environment: <runtime and relevant settings>
  Starting state: <provenance and public entry; save or steps when relevant>
  Journey: <guiding actions, end state, relevant branches and recovery>
  Scenarios and proof: <scope, independent expected observables and sensors>
  Reuses: V-NNN, V-NNN
  ```

  Then the separate list of affected technical tests to run, by path.
- **Failures.**
  - A defect in the increment's scope: repair it in this task, prove the fix in the check that owns the behavior, and repeat only the journeys and tests the repair invalidates.
  - A failure of the test harness or environment rather than the game: repair it without asking. Diagnose the root cause and fix it; a rerun with nothing changed is not a repair. After two attempts without new information, record the next refutable hypothesis and continue independent work. Ask the user only when the sensor needs something unavailable (a credential, an installation, a person at the editor) or no repair exists, and then offer to repair, waive, or replace that sensor.
- **Evidence:** initialize planned sessions and scenarios in Execution Notes before starting, then update outcomes and append a short debrief after each session and retest using the session protocol. Link evidence, defects, friction, corrections, and unvisited coverage; create no separate report automatically. A session ceiling does not waive remaining obligations: send them back to the planning owner and continue authorized follow-up work under the caller's workflow. With no journeys planned, cite the QA plan's reason without inventing a session; still run any separately listed technical tests before closing the task.

## Playtest

- **Outcome:** the user has executed `_playtest.md`, or decided not to.
- **Hand-off.** Give the user the script and its prepared starting states. The user executes it; record the results in `_playtest.md` itself.
- **Failed `PT-NNN`:** a defect. Repair it, prove the fix in the check that owns the behavior, and ask the user to replay only the affected item.
- **Negative `PH-NNN`:** a design decision for the user: amend the spec, record a known issue, or accept the result. A passing `PT` is never evidence for a `PH`.
- **Not executed.** Running the playtest is optional. When the user decides not to play, set the task `completed` with "not executed by user decision" and the reason in Execution Notes. `_playtest.md` stays unexecuted; never mark an item as passed.
