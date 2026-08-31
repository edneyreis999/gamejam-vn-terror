# L-008 — Explicitly Account for State Shape Changes

Persistent database migration rules do not apply because the prototype stores no durable state. Technical specs must still name runtime state-shape changes, clean-session defaults, validator updates, and snapshot/test-contract updates; reload remains the only session reset.
