# Inventory and Bounded Review

The coordinator owns the inventory. Scanners gather facts, judges assess guarantees, and challengers try to falsify proposed changes. Review agents do not edit the project or spawn agents.

## Inventory

Discover cases and executable recipes from actual runner entry points, manifests and configuration. Follow helpers and static **and dynamic** imports. Classify fast/slow from the execution boundary: language-runtime or file checks versus a real game/runtime, browser, rendering or equivalent external integration. Record the project's classification and the reason; never infer it from an ID prefix or a time threshold.

List canonical registrations, parameterized variants and noncanonical recipes separately. Include affected unchanged declarations when the delivery changes their inputs or dependencies. Identify helpers/fixtures and consumers. Give each declaration or recipe a stable review ID and enumerate its guarantees; homogeneous families may share explanation but must preserve member IDs and distinct variants. Reconcile the manifest with discovered executable cases so missing, duplicate or unregistered tests remain visible.

Use bounded groups: at most 40 declarations per scanner and about 30 per judge, smaller for large bodies or many guarantees. Keep related proposals available together for challenge. Name a scratch location for cards outside maintained project files; reuse an existing evidence destination when available.

## Cards

Each scanner reads the supplied bodies in full and writes only its assigned card file. One card per inventory ID, in order:

- ID, path/line, execution boundary and classification reason.
- Quoted carrying assertions; initial state, inputs and expected results; separate guarantees within a mixed case.
- Exercised implementation and dependency paths, including dynamic runtime launch; ownership is a fact, not a retention decision.
- Applicable requirements, decision records and verification criteria, with citations; distinguish mandatory variants from incidental repetitions.
- Loop/matrix size and what changes between cells; recipe assertions, captures and stated limits.
- Related owners and callers from cited searches; supporting fixtures and outputs consumed elsewhere.
- Recorded durations and relevant execution environment when available; entry-path compatibility with current content. No runtime execution by the scanner.

Mark unknowns and inferences. A failed search is “no hits” with its pattern, not proof of absence. Use `unread` with the reason when reading fails. Return the card path and `Cards: N of M`.

## Dispatch and completeness

Scanners write their assigned cards where their role permits it. Judges and challengers return their rows to the coordinator, who preserves those responses as evidence; do not require a read-only role to write a file or reinterpret a write refusal as missing judgment.

Use the runtime's existing `scanner`, `judge` and `challenger` roles. Keep at most three review agents active, respecting any smaller runtime limit. Give each a precise scope, read/write boundary and no-spawn instruction; use fresh context for judgment when supported. Do not invent model pins. Record the actual role/model when exposed; otherwise state that model identity is unavailable. If a role is unavailable, use the default subagent with the same bounded responsibilities and report the substitution. If subagents are unavailable or prohibited, perform the stages sequentially and label judgment/challenge `inline (not independent)`.

Scanners receive their inventory, card fields, project instructions and authoritative input paths. Judges receive the full tests lens, inventory, card paths, candidate snapshot, relevant contracts and instructions. Cards may contain wrong ownership, incomplete searches or bad citations; judges open source wherever the card cannot settle the decision, especially loops, recipes and shared-suite hunks. Challenger inputs are defined in [challenge](challenge.md).

The coordinator checks IDs, duplicates and missing rows against its own inventory after each stage, using a script for nontrivial inventories rather than trusting summary counts. Retry missing cards once with a smaller explicit assignment; unresolved items become `defer` with the concrete gap. Split oversized unread groups instead of accepting an effort-based “nothing unread.” Ensure each judge row names the IDs it covers.

Before handing cards to judges, also inspect their observation content. Complete IDs and nonempty fields do not establish usable evidence: a title substituted for a carrying assertion, or a generic “see full body,” does not show what the test observes. Each card must contain the actual cited assertion and concrete initial state, input and expected result, or explicitly identify which facts remain unknown and why. Return only deficient cards for targeted correction, preserving the original output and already usable cards. A stated unknown is not automatically a blocker: judges read the source to resolve facts needed for their decision, and may proceed when an unrelated unknown does not affect it. If material observation evidence remains unavailable, keep that limitation explicit and defer the affected decision rather than treating the card as complete.

Verify cited paths and line locations against the frozen candidate, and inspect the source supporting each proposed change. A resolvable citation is not automatically supporting evidence. Invalidate proposals resting on nonexistent or unsupported citations. Compare project/index state after agent stages with the recorded snapshot; reconcile unexpected writes before proceeding. Review outputs never authorize edits by themselves.

When capacity is exhausted, collect completed work and reuse/close agents when supported, then retry once; continue the remaining stage inline if necessary. Preserve completed results instead of restarting the review. Record substitutions and incomplete items as evidence limits, not silent successful coverage.
