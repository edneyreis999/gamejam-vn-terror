# L-009 — Isolate Concurrent QA Sessions

The prototype has no daemon, ports, shared `COMPOZY_HOME`, or persistent runtime state. Concurrent worktrees therefore do not need service isolation, but each automated or manual QA session must use its own browser tab/controller and must not share mutable globals across test fixtures.

Activate `eng-worktree-isolation` only when an execution environment introduces shared Compozy runtime state or concurrent browser automation. Do not add infrastructure solely to satisfy a generic concurrency template.
