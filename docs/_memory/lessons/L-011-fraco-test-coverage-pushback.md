# L-011 — Test Density Follows Behavior Density

Reject task plans that assign one or two vague checks to a state-machine or UI slice with many documented behaviors. Every test ID in `_tests.md` belongs to exactly one implementing task, with happy, invalid, boundary, ordering, repetition, interruption, and accessibility paths proportional to that task's responsibility.

Tests ship with the behavior they verify. A separate catch-all testing task cannot compensate for missing coverage inside implementation tasks; the trailing QA pair validates the integrated product rather than owning implementation tests.
