# Illustrative quest state model

This is an example, not a default architecture.

A compact linear quest can store its current stage in one numeric variable and
reserve switches for orthogonal facts such as optional discoveries, tutorial
dismissal, or one-time rewards. Gapped values can leave room for later stages.

Use this pattern only when the quest is predominantly linear and one active
stage is sufficient. Prefer a different model when the design requires parallel
objectives, independent completion, reversible branches, multiple owners, or a
data-driven quest system.

Whatever model is chosen, keep these invariants explicit:

- every transition has a source state and allowed destination;
- rewards and destructive effects are idempotent or guarded;
- UI visibility and objective completion derive from authoritative state;
- save/load restores the same active objectives;
- event callers do not advance the state through accidental replay.

Names and numeric values belong to the consumer project and must not be copied
from an example.
