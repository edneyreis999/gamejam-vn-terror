import base64
import json
from pathlib import Path
import subprocess
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from observe_public_pixels import observe
from public_pixel_predicate import digest


class ObservationBudgetTests(unittest.TestCase):
    def setUp(self):
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.transport = self.root / "transport.mjs"
        self.transport.write_text("// Isolated transport boundary in orchestration unit tests\n")
        self.lease = self.root / "lease.json"
        self.lease.write_text(json.dumps({"transportSha256": digest(self.transport.read_bytes()),
                                         "observationDeadlineSeconds": 10, "captureTimeoutSeconds": 2}))
        self.output = self.root / "episode"
        self.predicate = patch("observe_public_pixels.PublicPixelPredicate").start()
        self.addCleanup(patch.stopall)
        self.predicate.return_value.sha256 = "frozen-contract"
        self.predicate.return_value.target = {"readiness": {"type": "single-frame"}}
        self.predicate.return_value.geometry = {"width": 64, "height": 48, "dpr": 1}
        self.predicate.return_value.match.return_value = {"status": "MATCH"}

    def tool_response(self, path):
        request = json.loads(next(self.output.glob("*-request.json")).read_text())
        binding = json.loads(request["arguments"]["code"].split("const binding = ", 1)[1].split(";", 1)[0])
        return {"errors": [], "result": {"nonce": binding["nonce"], "data": base64.b64encode(b"unit-boundary").decode()}}

    def run_observer(self, times, rpc):
        with patch("observe_public_pixels.time.monotonic", side_effect=times), \
             patch("observe_public_pixels.subprocess.run", rpc), \
             patch("observe_public_pixels.tool_result", side_effect=self.tool_response):
            return observe(self.root / "contract.json", "MESSAGE", self.lease, self.transport, self.output)

    def test_insufficient_remaining_budget_starts_no_rpc(self):
        with patch("subprocess.run") as rpc:
            result = self.run_observer([0, 0, 9], rpc)
        rpc.assert_not_called()
        self.assertEqual(result["status"], "UNMET_RESOURCE_BOUND")
        self.assertFalse((self.output / "observation.png").exists())

    def test_started_rpc_uses_frozen_timeout(self):
        with patch("subprocess.run") as rpc:
            result = self.run_observer([0, 0, 0, 1], rpc)
        self.assertEqual(rpc.call_args.kwargs["timeout"], 2)
        self.assertEqual(result["status"], "MATCH")
        self.assertEqual((self.output / "observation.png").read_bytes(), b"unit-boundary")

    def test_late_matching_analysis_cannot_publish_success(self):
        with patch("subprocess.run") as rpc:
            result = self.run_observer([0, 0, 0, 11], rpc)
        self.assertEqual(result["status"], "UNMET_RESOURCE_BOUND")
        self.assertFalse((self.output / "observation.png").exists())

    def test_real_transport_timeout_stays_uncertain(self):
        with patch("subprocess.run", side_effect=subprocess.TimeoutExpired(["node"], 2, stderr=b"capture stalled")) as rpc:
            result = self.run_observer([0, 0, 0], rpc)
        self.assertEqual(result["status"], "SENSOR_ERROR")
        self.assertTrue(result["remoteOperationMayStillBeRunning"])
        self.assertEqual(result["error"]["stderr"], "capture stalled")
        self.assertEqual(rpc.call_count, 1)
        self.assertFalse((self.output / "observation.png").exists())


if __name__ == "__main__":
    unittest.main()
