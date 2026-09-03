#!/usr/bin/env python3
"""Maintain a run-owned monotonic ledger for active playtest time."""

from __future__ import annotations

import argparse
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import platform
import sys
import time
from typing import Iterator


SCHEMA = "rpg-maker-mz-active-clock/v1"
EVENTS = {"start", "pause", "resume", "stop"}
MODES = {"segmented", "continuous"}
STATES = {"running", "paused", "stopped"}


class ClockError(Exception):
    """A contract or ledger violation that the caller can correct."""


@dataclass
class ClockState:
    clock_id: str
    mode: str
    writer: str
    state: str
    total_active_ns: int
    active_started_ns: int | None
    last_monotonic_ns: int
    event_count: int
    label: str


def clock_source() -> dict[str, object]:
    info = time.get_clock_info("monotonic")
    return {
        "host": platform.node(),
        "implementation": info.implementation,
        "monotonic": info.monotonic,
        "adjustable": info.adjustable,
        "resolution_seconds": info.resolution,
    }


def require_text(value: object, field: str, sequence: int) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ClockError(f"event {sequence}: {field} must be non-empty text")
    return value


def require_integer(value: object, field: str, sequence: int) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or value < 0:
        raise ClockError(f"event {sequence}: {field} must be a non-negative integer")
    return value


def load_records(ledger: Path) -> list[dict[str, object]]:
    if not ledger.exists():
        return []
    if ledger.is_symlink() or not ledger.is_file():
        raise ClockError(f"ledger must be a regular non-symlink file: {ledger}")

    records: list[dict[str, object]] = []
    try:
        lines = ledger.read_text(encoding="utf-8").splitlines()
    except OSError as error:
        raise ClockError(f"cannot read ledger {ledger}: {error}") from error

    for line_number, line in enumerate(lines, start=1):
        if not line:
            raise ClockError(f"line {line_number}: blank ledger record")
        try:
            record = json.loads(line)
        except json.JSONDecodeError as error:
            raise ClockError(f"line {line_number}: invalid JSON: {error.msg}") from error
        if not isinstance(record, dict):
            raise ClockError(f"line {line_number}: record must be a JSON object")
        records.append(record)
    return records


def validate_records(records: list[dict[str, object]]) -> dict[str, ClockState]:
    clocks: dict[str, ClockState] = {}
    expected_source: object | None = None
    previous_global_ns = -1

    for expected_sequence, record in enumerate(records, start=1):
        sequence = require_integer(record.get("sequence"), "sequence", expected_sequence)
        if sequence != expected_sequence:
            raise ClockError(f"event {expected_sequence}: sequence is {sequence}")
        if record.get("schema") != SCHEMA:
            raise ClockError(f"event {sequence}: unsupported schema")

        source = record.get("clock_source")
        if not isinstance(source, dict):
            raise ClockError(f"event {sequence}: clock_source must be an object")
        if expected_source is None:
            expected_source = source
        elif source != expected_source:
            raise ClockError(f"event {sequence}: clock source changed")

        clock_id = require_text(record.get("clock_id"), "clock_id", sequence)
        writer = require_text(record.get("writer"), "writer", sequence)
        event = require_text(record.get("event"), "event", sequence)
        mode = require_text(record.get("mode"), "mode", sequence)
        state_after = require_text(record.get("state"), "state", sequence)
        monotonic_ns = require_integer(record.get("monotonic_ns"), "monotonic_ns", sequence)
        delta_active_ns = require_integer(record.get("delta_active_ns"), "delta_active_ns", sequence)
        total_active_ns = require_integer(record.get("total_active_ns"), "total_active_ns", sequence)
        require_text(record.get("wall_time_utc"), "wall_time_utc", sequence)

        if event not in EVENTS:
            raise ClockError(f"event {sequence}: unknown event {event}")
        if mode not in MODES:
            raise ClockError(f"event {sequence}: unknown mode {mode}")
        if state_after not in STATES:
            raise ClockError(f"event {sequence}: unknown state {state_after}")
        if monotonic_ns < previous_global_ns:
            raise ClockError(f"event {sequence}: monotonic clock regressed")
        previous_global_ns = monotonic_ns

        current = clocks.get(clock_id)
        if event == "start":
            if current is not None:
                raise ClockError(f"event {sequence}: clock {clock_id} already exists")
            label = require_text(record.get("label"), "label", sequence)
            if delta_active_ns != 0 or total_active_ns != 0 or state_after != "running":
                raise ClockError(f"event {sequence}: invalid start accounting")
            clocks[clock_id] = ClockState(
                clock_id=clock_id,
                mode=mode,
                writer=writer,
                state="running",
                total_active_ns=0,
                active_started_ns=monotonic_ns,
                last_monotonic_ns=monotonic_ns,
                event_count=1,
                label=label,
            )
            continue

        if current is None:
            raise ClockError(f"event {sequence}: clock {clock_id} has no start")
        if mode != current.mode:
            raise ClockError(f"event {sequence}: mode changed for {clock_id}")
        if writer != current.writer:
            raise ClockError(f"event {sequence}: writer changed for {clock_id}")
        if monotonic_ns < current.last_monotonic_ns:
            raise ClockError(f"event {sequence}: clock {clock_id} regressed")

        if event == "pause":
            if current.mode != "segmented":
                raise ClockError(f"event {sequence}: continuous clock {clock_id} cannot pause")
            if current.state != "running" or current.active_started_ns is None:
                raise ClockError(f"event {sequence}: clock {clock_id} is not running")
            require_text(record.get("reason"), "reason", sequence)
            expected_delta = monotonic_ns - current.active_started_ns
            expected_total = current.total_active_ns + expected_delta
            if delta_active_ns != expected_delta or total_active_ns != expected_total or state_after != "paused":
                raise ClockError(f"event {sequence}: invalid pause accounting")
            current.state = "paused"
            current.total_active_ns = expected_total
            current.active_started_ns = None
        elif event == "resume":
            if current.mode != "segmented":
                raise ClockError(f"event {sequence}: continuous clock {clock_id} cannot resume")
            if current.state != "paused":
                raise ClockError(f"event {sequence}: clock {clock_id} is {current.state}, not paused")
            label = require_text(record.get("label"), "label", sequence)
            if delta_active_ns != 0 or total_active_ns != current.total_active_ns or state_after != "running":
                raise ClockError(f"event {sequence}: invalid resume accounting")
            current.state = "running"
            current.active_started_ns = monotonic_ns
            current.label = label
        else:
            if current.state == "stopped":
                raise ClockError(f"event {sequence}: clock {clock_id} is already stopped")
            require_text(record.get("reason"), "reason", sequence)
            if current.state == "running":
                if current.active_started_ns is None:
                    raise ClockError(f"event {sequence}: running clock {clock_id} has no active start")
                expected_delta = monotonic_ns - current.active_started_ns
            else:
                expected_delta = 0
            expected_total = current.total_active_ns + expected_delta
            if delta_active_ns != expected_delta or total_active_ns != expected_total or state_after != "stopped":
                raise ClockError(f"event {sequence}: invalid stop accounting")
            current.state = "stopped"
            current.total_active_ns = expected_total
            current.active_started_ns = None

        current.last_monotonic_ns = monotonic_ns
        current.event_count += 1

    return clocks


@contextmanager
def ledger_lock(ledger: Path) -> Iterator[None]:
    parent = ledger.parent
    if not parent.is_dir():
        raise ClockError(f"ledger parent must already exist: {parent}")
    if ledger.exists() and ledger.is_symlink():
        raise ClockError(f"ledger cannot be a symlink: {ledger}")

    lock_path = ledger.with_name(f"{ledger.name}.lock")
    try:
        descriptor = os.open(lock_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except FileExistsError as error:
        raise ClockError(f"ledger lock exists; inspect its owner before removal: {lock_path}") from error
    try:
        os.write(descriptor, f"pid={os.getpid()}\n".encode())
        os.fsync(descriptor)
        yield
    finally:
        os.close(descriptor)
        try:
            lock_path.unlink()
        except FileNotFoundError:
            pass


def append_record(ledger: Path, record: dict[str, object]) -> None:
    payload = f"{json.dumps(record, sort_keys=True, separators=(',', ':'))}\n".encode()
    try:
        descriptor = os.open(ledger, os.O_APPEND | os.O_CREAT | os.O_WRONLY, 0o600)
        try:
            remaining = memoryview(payload)
            while remaining:
                written = os.write(descriptor, remaining)
                if written == 0:
                    raise ClockError(f"zero-byte append to ledger {ledger}")
                remaining = remaining[written:]
            os.fsync(descriptor)
        finally:
            os.close(descriptor)
    except OSError as error:
        raise ClockError(f"cannot append ledger {ledger}: {error}") from error


def make_record(
    *,
    sequence: int,
    clock_id: str,
    mode: str,
    writer: str,
    event: str,
    state: str,
    monotonic_ns: int,
    delta_active_ns: int,
    total_active_ns: int,
    label: str | None = None,
    reason: str | None = None,
) -> dict[str, object]:
    return {
        "schema": SCHEMA,
        "sequence": sequence,
        "clock_id": clock_id,
        "mode": mode,
        "writer": writer,
        "event": event,
        "state": state,
        "label": label,
        "reason": reason,
        "monotonic_ns": monotonic_ns,
        "wall_time_utc": datetime.now(timezone.utc).isoformat(),
        "delta_active_ns": delta_active_ns,
        "total_active_ns": total_active_ns,
        "clock_source": clock_source(),
    }


def mutate(args: argparse.Namespace) -> dict[str, object]:
    ledger: Path = args.ledger
    with ledger_lock(ledger):
        records = load_records(ledger)
        clocks = validate_records(records)
        current = clocks.get(args.clock_id)
        now = time.monotonic_ns()

        if records and records[0]["clock_source"] != clock_source():
            raise ClockError("current process does not share the ledger clock source")

        if args.command == "start":
            if current is not None:
                raise ClockError(f"clock {args.clock_id} already exists")
            record = make_record(
                sequence=len(records) + 1,
                clock_id=args.clock_id,
                mode=args.mode,
                writer=args.writer,
                event="start",
                state="running",
                monotonic_ns=now,
                delta_active_ns=0,
                total_active_ns=0,
                label=args.label,
            )
        else:
            if current is None:
                raise ClockError(f"clock {args.clock_id} has no start")
            if args.writer != current.writer:
                raise ClockError(f"clock {args.clock_id} belongs to writer {current.writer}")

            if args.command == "pause":
                if current.mode != "segmented":
                    raise ClockError(f"continuous clock {args.clock_id} cannot pause")
                if current.state != "running" or current.active_started_ns is None:
                    raise ClockError(f"clock {args.clock_id} is {current.state}, not running")
                delta = now - current.active_started_ns
                record = make_record(
                    sequence=len(records) + 1,
                    clock_id=args.clock_id,
                    mode=current.mode,
                    writer=current.writer,
                    event="pause",
                    state="paused",
                    monotonic_ns=now,
                    delta_active_ns=delta,
                    total_active_ns=current.total_active_ns + delta,
                    label=current.label,
                    reason=args.reason,
                )
            elif args.command == "resume":
                if current.mode != "segmented":
                    raise ClockError(f"continuous clock {args.clock_id} cannot resume")
                if current.state != "paused":
                    raise ClockError(f"clock {args.clock_id} is {current.state}, not paused")
                record = make_record(
                    sequence=len(records) + 1,
                    clock_id=args.clock_id,
                    mode=current.mode,
                    writer=current.writer,
                    event="resume",
                    state="running",
                    monotonic_ns=now,
                    delta_active_ns=0,
                    total_active_ns=current.total_active_ns,
                    label=args.label,
                )
            else:
                if current.state == "stopped":
                    raise ClockError(f"clock {args.clock_id} is already stopped")
                if current.state == "running":
                    if current.active_started_ns is None:
                        raise ClockError(f"running clock {args.clock_id} has no active start")
                    delta = now - current.active_started_ns
                else:
                    delta = 0
                record = make_record(
                    sequence=len(records) + 1,
                    clock_id=args.clock_id,
                    mode=current.mode,
                    writer=current.writer,
                    event="stop",
                    state="stopped",
                    monotonic_ns=now,
                    delta_active_ns=delta,
                    total_active_ns=current.total_active_ns + delta,
                    label=current.label,
                    reason=args.reason,
                )

        validate_records(records + [record])
        append_record(ledger, record)
        return record


def state_payload(state: ClockState, now: int) -> dict[str, object]:
    total = state.total_active_ns
    if state.state == "running":
        if state.active_started_ns is None:
            raise ClockError(f"running clock {state.clock_id} has no active start")
        if now < state.active_started_ns:
            raise ClockError(f"current monotonic clock regressed for {state.clock_id}")
        total += now - state.active_started_ns
    return {
        "schema": SCHEMA,
        "clock_id": state.clock_id,
        "mode": state.mode,
        "writer": state.writer,
        "state": state.state,
        "label": state.label,
        "event_count": state.event_count,
        "persisted_total_active_ns": state.total_active_ns,
        "total_active_ns": total,
    }


def inspect_ledger(args: argparse.Namespace) -> dict[str, object]:
    ledger: Path = args.ledger
    with ledger_lock(ledger):
        records = load_records(ledger)
        if not records:
            raise ClockError(f"ledger has no events: {ledger}")
        clocks = validate_records(records)
        now = time.monotonic_ns()

        if args.command == "status" and args.clock_id:
            state = clocks.get(args.clock_id)
            if state is None:
                raise ClockError(f"clock {args.clock_id} does not exist")
            return state_payload(state, now)

        payloads = [state_payload(clocks[clock_id], now) for clock_id in sorted(clocks)]
        if args.command == "verify":
            if args.require_inactive:
                running = [payload["clock_id"] for payload in payloads if payload["state"] == "running"]
                if running:
                    raise ClockError(f"running clocks prevent inactive verification: {', '.join(running)}")
            if args.require_stopped:
                unfinished = [payload["clock_id"] for payload in payloads if payload["state"] != "stopped"]
                if unfinished:
                    raise ClockError(f"unfinished clocks prevent stopped verification: {', '.join(unfinished)}")
            return {"schema": SCHEMA, "result": "valid", "event_count": len(records), "clocks": payloads}
        return {"schema": SCHEMA, "event_count": len(records), "clocks": payloads}


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ledger", required=True, type=Path, help="run-owned JSONL ledger path")
    commands = parser.add_subparsers(dest="command", required=True)

    start = commands.add_parser("start", help="create and activate one clock")
    start.add_argument("--clock-id", required=True)
    start.add_argument("--mode", required=True, choices=sorted(MODES))
    start.add_argument("--writer", required=True)
    start.add_argument("--label", required=True)

    pause = commands.add_parser("pause", help="pause a segmented clock")
    pause.add_argument("--clock-id", required=True)
    pause.add_argument("--writer", required=True)
    pause.add_argument("--reason", required=True)

    resume = commands.add_parser("resume", help="resume a paused segmented clock")
    resume.add_argument("--clock-id", required=True)
    resume.add_argument("--writer", required=True)
    resume.add_argument("--label", required=True)

    stop = commands.add_parser("stop", help="stop a running or paused clock")
    stop.add_argument("--clock-id", required=True)
    stop.add_argument("--writer", required=True)
    stop.add_argument("--reason", required=True)

    status = commands.add_parser("status", help="read validated clock state")
    status.add_argument("--clock-id")

    verify = commands.add_parser("verify", help="validate ledger structure and lifecycle")
    requirement = verify.add_mutually_exclusive_group()
    requirement.add_argument("--require-inactive", action="store_true")
    requirement.add_argument("--require-stopped", action="store_true")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    try:
        if args.command in {"start", "pause", "resume", "stop"}:
            result = mutate(args)
        else:
            result = inspect_ledger(args)
    except ClockError as error:
        print(f"active-clock: {error}", file=sys.stderr)
        return 2
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
