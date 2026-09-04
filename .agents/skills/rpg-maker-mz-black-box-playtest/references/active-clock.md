# Performance replay clock

Use the bundled **mutating run-artifact helper** only for the screenshot-free performance replay:

```text
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py
```

Discovery and evidence replay use no verdict-bearing clock. Do not create segmented discovery clocks, parcels, envelopes, or active-time stop conditions.

## Ownership and boundaries

- The invoker freezes the run-owned ledger path, clock ID, writer identity, and public start and finish signals.
- The clean replayer is the only event writer.
- Use one `performance:<attempt>` clock in `continuous` mode.
- Start immediately when the contracted public start signal materializes.
- Stop immediately when the contracted public finish signal materializes.
- Treat any interruption, pause, resume, gameplay help, screenshot, exploration, or card edit inside the interval as an invalid performance attempt.

## Commands

Create the ledger parent before the first event, then start and stop the continuous clock:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> start --clock-id <performance-id> --mode continuous --writer <replayer-id> --label PERFORMANCE

python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> stop --clock-id <performance-id> --writer <replayer-id> --reason finish-signal
```

After the pass, have the invoker run:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> verify --require-stopped
```

The measured `total_active_ns` is the performance result. Report it without applying a universal SLA. When the task supplied a performance goal, compare it separately without changing the gameplay-completion verdict.

## Failure handling

A missing, corrupt, locked, regressing, writer-mismatched, or lifecycle-invalid ledger invalidates the performance measurement, not the already observed guided completion. Preserve the attempt, repair the clock artifact or writer handoff, and rerun both validation passes with a fresh replayer if the card or replay identity changes. Never substitute wall time, message timestamps, tool-call duration, or summed input holds.

Each append-only event records sequence, clock ID, mode, writer, transition, state, monotonic timestamp, audit wall timestamp, active delta, accumulated active time, and clock-source identity. The helper rejects edits that break lifecycle, accounting, ownership, or clock-source consistency.

After changing the clock implementation, run the bundled **read-only regression helper**:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/test_active_clock.py
```
