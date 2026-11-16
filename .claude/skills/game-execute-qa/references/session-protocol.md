# Persona Session Protocol

Read before running a session. A QA planning task reads **Session mission** when preparing the execution task; that mission is planning output, not evidence that a session ran.

## Session mission

A mission is the original QA charter's role: one persona investigates one journey through one thematic tour within a time ceiling. Keep it in the execution task's Journeys section or the existing verification plan. For a standalone request, state it in the conversation. No separate charter file or catalogue is required.

Each mission supplies:

- **Identity and objective:** a local session label, what to investigate, and why it matters to the user.
- **Persona:** goal, relevant familiarity, interaction method, and environment or locale constraints. Distinguish player and author needs.
- **Journey:** public entry, starting state and its provenance, intended end state, guiding actions, and relevant branches or abandonment/recovery paths. Separate required coverage from exploratory prompts.
- **Tour:** one theme from the applicable [personas and tours](personas-and-tours.md) section, adapted to the actual risk.
- **Scope and proof:** scenarios or existing criterion IDs, independent expected observables, required environments and sensors, and earlier evidence reused. Hypotheses about experience remain questions rather than invented acceptance criteria.
- **Time ceiling:** honor an explicit request or planned limit; otherwise use 30 minutes for a narrow or retest session, 60 by default, or 90 for a complex journey. These are maximums, never a requirement to spend time or find a certain number of bugs.

Start timing on persona entry, after preparation. End earlier when the mission is adequately investigated, the journey cannot continue, or the user stops it. End at the ceiling and record unvisited coverage. Infrastructure work and repairs are separate activities, still subject to any overall user budget. A task's mandatory checks remain owed after a time-boxed session; its planner scopes follow-up work without silently waiving them.

## Enter and act

Prepare the persona's real interaction conditions when supported: input modality, display, locale, relevant settings, and declared starting state. Record unavailable conditions rather than simulating success. Do not impose devices or network faults unrelated to the game and mission.

1. Enter as the persona would. A prepared starting point omits a prefix; say which prefix it cannot prove. A new-player mission cannot rely on directions or shortcuts the product never taught that player.
2. Observe the current interactive state and act through the public surface. Reobserve after transitions; stale controls or coordinates are not reliable input.
3. Verify the expected effect, including its identity and destination. Use condition-based readiness within the existing deadline; fixed sleeps and extra retries do not establish readiness.
4. Capture meaningful checkpoints and divergences, and note attempted action, observation, and outcome. Explore through the chosen tour without abandoning the mission for unrelated discoveries.
5. Reach the true end state, including recovery or persistence where promised. A success banner or a loaded screen alone does not prove completion.

Do not expose session IDs or evaluator language to an interactive product when that would change its behavior. A persona using a development tool may naturally use its testing vocabulary; the prohibition concerns coaching the product to pass this QA session.

## Evidence and its limits

- Prove actions and effects through read paths available to the persona. For saved mutations, reopen or use an independent public read path to confirm the same state; require persistence only where it is promised, not for transient controls.
- Retain candidate/runtime identity, relevant starting-state inputs, attempted actions, expected versus observed effects, and artifact paths. A reference expected value comes from the agreed contract, never the candidate's output.
- Capture the goal state and material failures. Inspect images for visual claims; use a sequence for temporal claims and actual sound observation for audio claims. Captures awaiting inspection stay pending. State variables, counters, logs, and process exits cannot replace the assigned observation.
- Technical diagnostics may support a finding after the session, but label them separately from the persona's evidence. Do not turn an internal-state assertion into proof of a public journey.
- Reuse earlier collection or inspection only for equivalent relevant code, content, assets, configuration, starting state, runtime, expected result, and sensor. Preserve provenance and distinguish the two reuse decisions. When equivalence is unknown, recollect the affected evidence. An explicit reproduction requires a new attempt; reused artifacts do not count as a newly walked journey.
- A technical inspection can establish visible clipping or an observed transition; comfort, artistic intent, and required human play remain the assigned person's judgment. A screenshot or an agent persona is not human acceptance or an independent playtest.

## Outcomes and incremental records

Use these session/scenario outcomes in the existing owner; they do not replace task frontmatter statuses:

| Outcome | Meaning |
| --- | --- |
| Pending | Not yet settled, including collected material awaiting inspection |
| Pass | The required observable has adequate evidence |
| Fail | A confirmed defect or failed obligation remains |
| Fixed | The original failure is retained, an authorized repair was made, and its retest passed |
| Skipped | Not executed; record why and the remaining risk, never count it as passed |
| Blocked | Name the unavailable prerequisite, required human observation, or unresolved decision and next action |

Before a planned run, list its sessions/scenarios as Pending. Update each session and relevant scenario after the walk and each repair/retest. Interrupted work stays Pending with its last reliable checkpoint. At round close, account for remaining rows explicitly rather than silently dropping them. A time ceiling is not an external blocker or permission to skip a mandatory task obligation.

Append a short debrief per session in the task's Execution Notes or existing verification record:

- Mission/persona, actual candidate and environment, start/end time, and whether the ceiling was respected.
- Actions attempted, branches visited, end state reached or not, expected/observed outcomes, and evidence links.
- Defects, root cause when established, impact on the user, related finding links, and paper cuts in the persona's terms.
- Repairs and fresh retests linked to the first failure; unresolved hypotheses remain separate.
- What was not observed, pending inspection or human judgment, cleanup gaps, and the next useful mission if work remains.

For a standalone request, provide these facts in conversational updates and the final response with evidence paths. Do not create a session report, status store, or bug tree automatically. An explicitly requested report uses its requested destination. In all contexts, retain useful artifacts through the project's existing output convention; avoid capturing every frame or creating duplicate narratives.
