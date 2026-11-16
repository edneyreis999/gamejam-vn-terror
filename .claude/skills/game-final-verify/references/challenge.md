# Challenge Proposed Changes

Give the challenger each related family of non-keep proposals together, including interacting transfers/removals from different judge groups. Include their cards, original inventory, full tests lens, candidate snapshot, contracts, proposed surviving assertions and cited evidence. A large family may be bounded into dependent clusters only if cross-cluster conflicts are reconciled by the coordinator.

The challenger reads the files and tries to refute each proposal:

- Does a surviving consumer need an input or setup being removed?
- Does the claimed replacement assert the same observation from a sufficient initial state and input, or merely traverse related behavior?
- Do required variants, persistence/recovery boundaries or data-dependent presentation differ despite common implementation?
- Is a criterion losing its evidence, or can its ownership be updated without weakening the requirement?
- Do proposed changes conflict with each other or depend on a survivor another proposal removes?
- Does a claimed gain rest on known measurements, or an untested assumption?

Return conflicts between proposals, then one row per proposal with `upheld | refuted | needs-human`, cited source evidence and the reason. `upheld` means the attempted refutation found no defeating evidence; it is not execution validation. `needs-human` distinguishes a genuine product decision from missing technical facts. The challenger neither edits nor invents new proposals.

The coordinator recounts rows against the original IDs, checks citations and supporting assertions, rejects refuted/unsupported changes, and records why. Resolve missing technical facts through a bounded inspection or focused probe; if unresolved, retain coverage and mark the proposal deferred. Ask the user only for a blocking decision that existing authorization does not settle. A normal evidence-preserving transfer is not automatically such a decision. Validate upheld changes after applying them; no reviewer can certify an unexecuted candidate merely by agreement.
