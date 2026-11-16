# Validation at Independent Boundaries

Read when invalid data crosses independently trusted entry paths. Fix its source first; add another guard only when a separate path can bypass the existing validation or the boundary owns a different guarantee.

## Choose the owning checks

1. Trace where the invalid value originates and which consumers can receive it.
2. Reject invalid external input at its entry boundary. Keep domain invariants with their owning operation.
3. Identify independent paths that bypass that boundary. Add validation there only for a demonstrated gap; internal calls sharing an established invariant do not need duplicate checks.
4. Use environment guards for concrete destructive-operation boundaries when ordinary input validation cannot protect them.
5. Instrument unresolved boundaries during diagnosis. Logging provides evidence, not validation; remove temporary instrumentation after verification.

For example, an empty working-directory argument can cause a filesystem operation to use the process directory. Validate the argument where its contract is established. If a separate test runner can invoke that destructive operation directly, its disposable-workspace restriction is a different guarantee worth enforcing there. Do not copy the same non-empty check into every intermediate method.

## Verify the repair

Use the existing owning checks to exercise the original failure and any independently reachable bypass that motivated an additional guard. Keep valid inputs working. State the boundary established by the evidence rather than declaring the bug impossible under all conditions.

Intentional adapters and validation required by project contracts remain valid. Do not add fallback values that hide a violated invariant, widen cleanup, or redesign unrelated layers merely to satisfy this reference.
