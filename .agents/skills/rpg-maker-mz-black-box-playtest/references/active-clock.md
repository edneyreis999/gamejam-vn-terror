# Replay performance clocks

One clean replay produces two independent measurements.

## Active route time

The controller is the authority. Each `route` transaction receipt measures public input delivery plus controller-owned game waits. Frozen route recovery counts when executed. Setup receipts are validated but excluded. Model analysis, live-image transport, evidence persistence, and reporting remain outside this metric.

Persist every preflight, main, and executed recovery receipt before the next gameplay input, then summarize the complete bound ledger against the approved card exactly as described in `controller-and-route-card.md`. A missing receipt makes active route time `NOT_MEASURED`; malformed, duplicate, mixed-identity, out-of-order, card-drifted, or uncertain-delivery receipts make it `INVALID`. Neither result exposes a partial subtotal, stops gameplay, nor revokes observed completion.

## Total operational time

Use the bundled **mutating run-artifact helper**:

```text
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py
```

The invoker freezes the scratch ledger path, clock ID, writer identity, and public start and finish guards. The clean replayer is the only event writer.

Create the ledger parent before starting. Run one continuous clock:

```text
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <scratch>/operational-clock.jsonl start --clock-id operational:<attempt> --mode continuous --writer <replayer-id> --label TOTAL_OPERATIONAL

python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <scratch>/operational-clock.jsonl stop --clock-id operational:<attempt> --writer <replayer-id> --reason finish-guard
```

Start when the contracted public start guard materializes. Stop when the visible finish guard materializes. Because the clock is continuous, it includes model observation, evidence capture, tool latency, and game waits. Preflight occurs before it; post-finish receipt extraction, image reopening, hashing, and reporting occur after it.

Have the invoker run the **read-only verification command**:

```text
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/active_clock.py --ledger <scratch>/operational-clock.jsonl verify --require-stopped
```

The verified `total_active_ns` field is total operational time despite the helper's historical field name.

## Human goals

The skill supplies no universal SLA. Attach a human goal only to its named metric:

- route or quest: active route time;
- agent, end-to-end, replay-total, or total: total operational time;
- no named metric or conflicting terms: compare it with both measurements and report `SCOPE_AMBIGUOUS` without choosing one verdict.

A specialist estimate is optimization guidance, not an SLA. Performance never changes whether the public finish was observed.

## Failure handling

A missing, corrupt, locked, regressing, writer-mismatched, or lifecycle-invalid operational ledger invalidates only total operational time. Continue attempting the quest. Do not rerun a successful gameplay replay solely to recover timing unless the request explicitly makes a valid measurement a required deliverable.

Input-delivery uncertainty is different: observe the public state and use frozen recovery or renewed authorship. Never relabel it as a clock failure.

After changing the clock implementation, run the bundled **read-only regression helper**:

```text
python3 .agents/skills/rpg-maker-mz-black-box-playtest/scripts/test_active_clock.py
```
