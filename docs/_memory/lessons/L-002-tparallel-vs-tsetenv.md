# L-002 — Respect the Project Test Runtime

Go-specific `t.Parallel` and `t.Setenv` constraints do not apply because this project has no Go test suite. The browser runner executes registered JavaScript cases sequentially in one local document. New cases must isolate DOM roots, restore clock or browser globals they control, destroy controllers after use, and never depend on another case's mutation.

Do not introduce a second test framework or pretend Go conventions apply. Preserve stable globally unique IDs and the runner's exact expected-count canary.
