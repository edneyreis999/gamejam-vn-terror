# Project Glossary

## Requirement States

- **Confirmed / Confirmado**: approved game rule that implementation must follow until a new design decision replaces it.
- **Prototype baseline / Baseline de protótipo**: provisional content or behavior required to execute and evaluate the prototype; not final canon.
- **Pending / Pendente**: deliberately unresolved design question that implementation must not answer implicitly.
- **Out of scope / Fora do escopo**: excluded from the current representative version.

## Game Terms

- **Campaign**: one page-lifetime run from the initial roster to victory or total defeat.
- **Expedition**: one party attempt inside one selected dungeon; retreat or party wipe ends the attempt without ending the campaign when survivors remain.
- **Formation**: the town decision surface where the player prepares the next expedition.
- **Initial dungeon**: either of the two map-half destinations, internally backed by the physical or supernatural encounter pool.
- **Final dungeon**: the destination revealed only after both initial dungeons are completed.
- **Completed dungeon**: a dungeon whose last required encounter was resolved; retreat or partial progress does not complete it.
- **Available destination**: an incomplete dungeon whose unlock condition is satisfied and which may be selected for the next expedition.
- **Locked destination**: a visible destination whose unlock condition is not yet satisfied.
- **Diegetic name**: player-facing name grounded in the fiction that does not expose internal labels such as physical, supernatural, Pool A, or Pool B.
- **Internal dungeon ID**: engine-facing stable identifier such as `physical`, `supernatural`, or `final`; never player copy.
- **Revealed position**: a dungeon position with a persistent encounter assignment.
- **Exploration record**: the greatest number of encounters fully traversed in one attempt on a destination; it survives retreat as knowledge but never acts as a checkpoint.
- **Map part**: player-facing term for either of the two pieces required to unlock the final dungeon; internal QA structures may call these fragments.
- **Current party**: living selectable heroes participating in the active expedition; the bard accompanies them automatically and is not a party slot.

## Compozy Terms

- **Compozy**: the repository's spec-to-task authoring and execution workflow. It is not a runtime dependency, game framework, or player-facing feature.
- **Spec set**: `_spec.md` plus `_user_stories.md`, `_dx.md`, `_uiux.md` when UI-bearing, `_tests.md`, and accepted ADRs for one slug.
- **Capability**: a stable observable behavior available to a user or operator.
- **Recipe**: an ordered set of operational steps that uses capabilities; it is not itself a product capability.
- **Surface**: the observable player or operator contract, independent of its implementation.
- **Incremental spec**: a new spec set that changes a completed baseline without rewriting that baseline's historical artifacts.
- **Phase E**: a completed Compozy workstream with QA complete, review at `SHIP`, and verification at `PASS`.
