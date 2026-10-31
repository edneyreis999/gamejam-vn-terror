# Tests Lens

Judge only the supplied scope. Return evidence-backed proposals; do not edit files or execute tests as a reviewer. Both fast and slow tests can earn retention, transfer assertions, or contain dispensable work. Support files are judged through their consumers.

## Decide by guarantee

For each inventory item, read its body and dependencies directly or through complete cards. Identify:

- The guarantee, concrete regression and authority: accepted requirement, decision, defect evidence or maintained integration contract.
- The observable: initial state, input, exercised boundary, expected result and assertion that detects a regression.
- The existing and proposed coverage owners, with cited assertions rather than a neighboring test's name.
- Variants required by the contract, distinct behavior exercised by each remaining variant, and the exact work proposed for removal.
- Setup and execution dependencies, recorded cost when available, replacement evidence and residual risk. Unknown duration is unknown, not a guessed saving.

Ask whether the player or game owner would notice the lost behavior, or whether evidence tooling could otherwise certify a false result. Ask whether a cheaper observation detects that same defect. Keep required guarantees; improve their ownership and cost where the evidence supports it.

Engine/vendor ownership does not invalidate a game integration contract. A redundant characterization of an unchanged library may add little, while real loading, storage, input, rendering or recovery can depend on that same library. Subjective styling is different from contracted readability, visible controls and functional geometry. A structural file check cannot by itself establish rendered behavior.

## Transfers and multiplicity

Split a mixed test when its assertions observe different boundaries. Fast tests should read the actual maintained inputs or exercise the real logic they claim, rather than a mock that returns the expectation. State what the new observation does not cover: pre-load structure, for example, is not proof of loader transformations or live registration. Preserve the necessary runtime owner.

For consolidation, compare **initial state, inputs, observation, expected result and required variants**. Visiting the same screen, executing the same function or sharing a fixture is insufficient. Name the surviving assertion that would catch the removed check's regression. Retain the original when equivalence cannot be established.

A matrix may repeat implementation while varying meaningful data. Distinct prose can produce distinct geometry; a later persistence checkpoint is not covered merely because an earlier checkpoint uses the same save mechanism. Inspect the actual input classes and boundary assertions. Remove only a proven extra combination, with retained obligations and residual risk explicit. Do not sample required variants without a user decision changing the requirement.

Shared preparation is useful when it preserves isolation and diagnostics. Distinguish necessary setup from repeated assertions. Do not remove setup that later checks consume, and do not merge unrelated failures into a single difficult-to-diagnose test solely to reduce case count.

## Recipes and tooling

Executable QA recipes belong in the inventory even when stored outside test directories. Distinguish automated assertions, captures for human judgment, and documented limits. A screenshot without inspection is not visual acceptance. A recipe's unique runtime or human-observed behavior is not replaced by another test's successful setup.

Check the current entry path and data. A stale driver needs diagnosis and repair or an explicit retirement decision; preserve its uncovered obligation until another owner exists. QA tooling can protect evidence integrity, isolation, and cleanup that prevents later false results. Do not remove a cleanup check simply because it is tooling. Conversely, a redundant startup-only check needs a distinct failure it detects beyond the suite already failing to start.

## Return

Use `keep | fix | consolidate | remove | defer`, one row per supplied ID, with assertion-level subproposals where needed. Include the guarantee/source, cited observation, surviving owner, variants, reason, cost evidence, validation needed and residual risk. `remove` names what is lost; `consolidate` names the survivor. A criterion citation does not prohibit a valid transfer: update its owner without weakening its obligation. Mark actual conflicts as `contract-conflict <criterion>`.

Missing evidence or an unread body means `defer`, never an inferred keep or removal. A deferral does not delete coverage, waive a requirement or prove readiness. Do not defer merely because a family is large; report the unread items so the coordinator can split it. Red or flaky status calls for diagnosis, not deletion. End with `Judged: N of M` and enumerate unresolved IDs; the coordinator's inventory owns M.
