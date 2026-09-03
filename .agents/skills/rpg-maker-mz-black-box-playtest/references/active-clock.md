# Active clock ledger

Use the bundled mutating run-artifact helper as the sole authority for active playtest time:

```text
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py
```

It changes only the run-owned JSONL path supplied through `--ledger`. It never reads or controls the game. Wall timestamps exist for audit correlation; every verdict-bearing duration comes from `time.monotonic_ns()`.

## Ownership and domains

- The invoker freezes the ledger path, clock IDs, modes, budgets, start/finish guards, and permitted pause reasons. It reads and validates the ledger mechanically.
- The current browser owner is the only writer for a clock. The player-author writes checkpoint-clock transitions; the clean replayer writes the performance-clock transitions.
- Give every checkpoint attempt or renewed budget a unique `discovery:<attempt>:<checkpoint>` ID in `segmented` mode.
- Give every performance replay a unique `performance:<attempt>` ID in `continuous` mode. The evidence replay receives no SLA clock.
- Keep all clocks for one workflow in the same ledger so one monotonic source and global event order cover every role handoff.

## Commands

Create the ledger parent before the first command. Start a checkpoint only after its public start guard and actionable orientation are both present:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> start --clock-id <discovery-id> --mode segmented --writer <player-id> --label MINIMAL
```

Keep the clock active while the player observes, decides, enters controls, explores, or changes executable card content. Pause it before specialist review, invoker routing, passive capture or persistence, controlled reset, and browser handoff:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> pause --clock-id <discovery-id> --writer <player-id> --reason <contracted-reason>
```

Resume only after the browser owner again has an actionable orientation:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> resume --clock-id <discovery-id> --writer <player-id> --label <guidance-level>
```

Stop after the completion guard, terminal decision, or retirement of that clock:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> stop --clock-id <discovery-id> --writer <player-id> --reason <outcome>
```

For the performance replay, start a continuous clock immediately after the contracted public start signal and stop it immediately when the finish signal materializes:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> start --clock-id <performance-id> --mode continuous --writer <replayer-id> --label SLA
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> stop --clock-id <performance-id> --writer <replayer-id> --reason finish-signal
```

A continuous clock rejects pause and resume. Any interruption between its contracted signals invalidates the performance attempt instead of subtracting time.

## Mechanical gates

Read one clock or the whole ledger with `status`. Before review, routing, reset, or handoff, require the browser owner to pause its segmented clock and make the invoker run:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> verify --require-inactive
```

At teardown, require every clock to be stopped:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <run-owned-clock.jsonl> verify --require-stopped
```

The invoker compares `total_active_ns` with the frozen budget; agent wall time, message timestamps, tool-call duration, input-hold totals, and confidence estimates never substitute for this value.

Treat a missing, corrupt, locked, regressing, writer-mismatched, or lifecycle-invalid ledger as `BLOCKED: clock telemetry`. Release public inputs, preserve artifacts, and keep the budget verdict unset until a valid ledger exists. Never declare `PRESO`, SLA pass, or SLA failure from fallback timing.

## Record contract

Each append-only event records schema, sequence, clock ID, mode, writer, transition, state, label/reason, monotonic timestamp, audit wall timestamp, active delta, accumulated active time, and clock-source identity. The helper rejects edits that break sequence, accounting, lifecycle, writer ownership, or clock-source consistency.

Run the read-only regression helper after changing the clock implementation:

```sh
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/test_active_clock.py
```
