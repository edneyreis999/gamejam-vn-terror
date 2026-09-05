#!/usr/bin/env python3
"""Black-box tests for the run-owned active clock ledger."""

from __future__ import annotations

import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


SCRIPT = Path(__file__).with_name("active_clock.py")


class ActiveClockCliTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.ledger = Path(self.temp_dir.name) / "clock.jsonl"

    def run_clock(self, *args: str, ok: bool = True) -> subprocess.CompletedProcess[str]:
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--ledger", str(self.ledger), *args],
            check=False,
            capture_output=True,
            text=True,
        )
        if ok and result.returncode != 0:
            self.fail(f"clock command failed: {result.stderr}")
        if not ok and result.returncode == 0:
            self.fail(f"clock command unexpectedly passed: {result.stdout}")
        return result

    def records(self) -> list[dict[str, object]]:
        return [json.loads(line) for line in self.ledger.read_text().splitlines()]

    def test_segmented_clock_excludes_paused_interval(self) -> None:
        self.run_clock(
            "start",
            "--clock-id",
            "discovery:CP-01",
            "--mode",
            "segmented",
            "--writer",
            "player",
            "--label",
            "MINIMAL",
        )
        self.run_clock(
            "pause",
            "--clock-id",
            "discovery:CP-01",
            "--writer",
            "player",
            "--reason",
            "specialist-review",
        )
        self.run_clock(
            "resume",
            "--clock-id",
            "discovery:CP-01",
            "--writer",
            "player",
            "--label",
            "OPERATIONAL-1",
        )
        self.run_clock(
            "stop",
            "--clock-id",
            "discovery:CP-01",
            "--writer",
            "player",
            "--reason",
            "checkpoint-complete",
        )

        records = self.records()
        self.assertEqual([record["event"] for record in records], ["start", "pause", "resume", "stop"])
        elapsed = int(records[-1]["total_active_ns"])
        wall_span = int(records[-1]["monotonic_ns"]) - int(records[0]["monotonic_ns"])
        paused_span = int(records[2]["monotonic_ns"]) - int(records[1]["monotonic_ns"])
        self.assertGreaterEqual(elapsed, 0)
        self.assertEqual(wall_span - elapsed, paused_span)

        status = json.loads(self.run_clock("status", "--clock-id", "discovery:CP-01").stdout)
        self.assertEqual(status["state"], "stopped")
        self.assertEqual(status["total_active_ns"], elapsed)

    def test_continuous_clock_rejects_pause(self) -> None:
        self.run_clock(
            "start",
            "--clock-id",
            "performance:R1",
            "--mode",
            "continuous",
            "--writer",
            "replayer",
            "--label",
            "SLA",
        )
        rejected = self.run_clock(
            "pause",
            "--clock-id",
            "performance:R1",
            "--writer",
            "replayer",
            "--reason",
            "screenshot",
            ok=False,
        )
        self.assertIn("continuous", rejected.stderr)
        self.assertEqual(len(self.records()), 1)
        self.run_clock(
            "stop",
            "--clock-id",
            "performance:R1",
            "--writer",
            "replayer",
            "--reason",
            "finish-signal",
        )

    def test_invalid_transition_does_not_append(self) -> None:
        self.run_clock(
            "start",
            "--clock-id",
            "discovery:CP-02",
            "--mode",
            "segmented",
            "--writer",
            "player",
            "--label",
            "MINIMAL",
        )
        wrong_writer = self.run_clock(
            "pause",
            "--clock-id",
            "discovery:CP-02",
            "--writer",
            "invoker",
            "--reason",
            "routing",
            ok=False,
        )
        self.assertIn("belongs to writer player", wrong_writer.stderr)
        self.assertEqual(len(self.records()), 1)

        rejected = self.run_clock(
            "resume",
            "--clock-id",
            "discovery:CP-02",
            "--writer",
            "player",
            "--label",
            "OPERATIONAL-1",
            ok=False,
        )
        self.assertIn("running", rejected.stderr)
        self.assertEqual(len(self.records()), 1)

    def test_verify_fails_closed_for_running_or_corrupt_ledger(self) -> None:
        self.run_clock(
            "start",
            "--clock-id",
            "discovery:CP-03",
            "--mode",
            "segmented",
            "--writer",
            "player",
            "--label",
            "MINIMAL",
        )
        running = self.run_clock("verify", "--require-inactive", ok=False)
        self.assertIn("running", running.stderr)

        self.run_clock("pause", "--clock-id", "discovery:CP-03", "--writer", "player", "--reason", "routing")
        verified = json.loads(self.run_clock("verify", "--require-inactive").stdout)
        self.assertEqual(verified["result"], "valid")

        with self.ledger.open("a", encoding="utf-8") as stream:
            stream.write("not-json\n")
        corrupt = self.run_clock("status", ok=False)
        self.assertIn("invalid JSON", corrupt.stderr)


if __name__ == "__main__":
    unittest.main()
