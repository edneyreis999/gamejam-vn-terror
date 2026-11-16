---
name: spec-execution-metrics
description: Observe and reconcile an authorized spec execution when its _execution-metrics.md companion is present. Collect local Codex usage, activity and command timing, and finding provenance; never starts delivery, QA or review itself.
---

# Spec Execution Metrics

Measure the authorized work in this project and retain independently readable observations beside its spec. Check for `_execution-metrics.md` at execution entry, before context preparation and baseline. Without it, proceed normally without metrics artifacts. Its presence does not authorize execution.

1. Read [operation](references/operation.md) for the actual CLI and recovery. Resolve `scripts/metrics.py` relative to this installed skill. Initialize a new execution or explicitly resume the named execution; nested procedures reuse its identity and register their own sessions. Declare preparation immediately. Record any earlier preparation as unmeasured.
2. Declare meaningful activity transitions, responsible session, existing task reference or spec scope. Include instrumentation work. Observe the maintained commands without changing their arguments, environment, stdin/stdout, assertions, concurrency or retry policy. Keep test type, environment and tool separate. Pause/wait and missing ends are explicit; declared spans do not prove continuous work.
3. Before a ready task's E2E acceptance, record its task/candidate acceptance marker. This does not change task status. Record failures as unclassified until evidence supports a cause; retain one finding identity, original discovery channel, origin, confirmations, fixes and retests. Persona discoveries remain separate from delivery defects.
4. Link records and gaps in the existing task/verification evidence. Freeze each participant's measured boundary before returning the execution response. If another execution will follow in this same turn, close this one at the current position as the operation guide specifies; nested calls only end their activities. Close activity spans, but keep final-response tokens pending. A later invocation reconciles the frozen interval, including late events and excluding its own turn. It requires no further user message when another authorized actor can perform it.
5. Use [format and reading](references/format.md) when interpreting, correcting or independently inspecting records. Query from published JSON alone, including after relocation. Keep technical closure, collection closure, human playtest, user acceptance and eventual Git transfer distinct.

If collection fails, continue authorized delivery and disclose the affected interval in its existing evidence. Repair the collector within granted authority, retain its version and previous observations, and resume the same execution. Reconcile available observations; never rerun game work solely to recover metrics or turn old uncertain measurements into exact results. The module chooses no tests, delivery stages or approvals.
