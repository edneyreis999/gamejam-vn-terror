#!/usr/bin/env python3
"""Native pipeline contracts in temporary Git repositories.

Synthetic judgments test helper IO, not review quality or agent behavior.
No provider, network, game runtime, or GitHub publication is exercised.
"""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

SCRIPTS = Path(__file__).resolve().parent


class NativeReviewTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="loki-review-")
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)
        self.out = self.repo / ".deep-review" / "fixture"
        self.git("init", "-q")
        self.git("config", "user.name", "Fixture")
        self.git("config", "user.email", "fixture@example.invalid")
        self.write("data/events.json", '{"enabled": false}\n')
        self.write("data/flags.yaml", "enabled: false\n")
        self.write("src/feature.js", "export const enabled = false;\n")
        self.write("spec.md", "# Fixture\nEnable the feature.\n")
        self.write("AGENTS.md", "# Fixture policy\nPreserve valid textual data.\n")
        (self.repo / "asset.bin").write_bytes(b"\x00old")
        self.git("add", ".")
        self.git("commit", "-qm", "baseline")
        self.write("data/events.json", '{"enabled": true}\n')
        self.write("data/flags.yaml", "enabled: true\n")
        self.write("src/feature.js", "export const enabled = true;\n")
        (self.repo / "asset.bin").write_bytes(b"\x00new")
        self.git("add", ".")
        self.git("commit", "-qm", "enable")
        self.cli("prepare_review.py", "--base", "HEAD~1", "--spec", "spec.md", expected=2)
        decisions = self.read("decisions.template.json")
        for row in decisions["sources"]:
            row.update(status="applied", reason="Fixture policy read; data must remain parseable.")
        decisions.update(intent="Enable the fixture feature.", linters=[])
        self.save("decisions.json", decisions)
        self.cli("prepare_review.py", "--decisions", str(self.out / "decisions.json"))
        self.jobs = self.read("jobs.json")["jobs"]

    def write(self, name, content):
        path = self.repo / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)

    def git(self, *args):
        result = subprocess.run(["git", *args], cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        return result.stdout

    def cli(self, script, *args, expected=0):
        result = subprocess.run(
            [sys.executable, str(SCRIPTS / script), "--out", str(self.out), *args],
            cwd=self.repo, capture_output=True, text=True, timeout=20,
        )
        self.assertEqual(result.returncode, expected, result.stdout + result.stderr)
        return result

    def read(self, name):
        return json.loads((self.out / name).read_text())

    def save(self, name, value):
        (self.out / name).write_text(json.dumps(value))

    def draft(self, job):
        value = self.read(f"agents/{job['label']}.draft.template.json")
        value["summary"] = "Synthetic fixture assessment; not a real review."
        if job["kind"] == "sweep":
            value["assessment"] = {"status": "complete", "note": "Synthetic conformance assessment for helper validation only."}
        for row in value["coverage"]["hunks"]:
            row[1] = "clear"
        for row in value["coverage"]["rules"]:
            row[1:] = ["compliant", "Fixture data is valid."]
        self.save(f"agents/{job['label']}.draft.json", value)
        return value

    def test_native_pipeline_selects_data_and_renders_scoped_reports(self):
        manifest = self.read("manifest.json")
        records = {row["path"]: row for row in manifest["files"]}
        self.assertEqual(records["data/events.json"]["disposition"], "selected")
        self.assertEqual(records["data/flags.yaml"]["disposition"], "selected")
        self.assertEqual(records["asset.bin"]["reason"], "binary")
        self.assertTrue(all(row["risk"] == "normal" for row in self.read("plan.json")["cohorts"]))
        self.assertEqual(self.read("review-context.json")["mode"], "native")
        self.assertTrue(any(job["label"] == "sweep-spec-parity" for job in self.jobs))
        self.cli("run_jobs.py", "--validate-only", expected=1)
        for job in self.jobs:
            self.draft(job)
            self.cli("run_jobs.py", "--job", job["label"], "--submit")
            self.cli("run_jobs.py", "--job", job["label"], "--validate-only")
        self.cli("run_jobs.py", "--validate-only")
        self.cli("merge_findings.py")
        self.cli("render_review.py")
        self.cli("render_html.py")
        report = (self.out / "review.md").read_text()
        self.assertIn("**Verdict: SHIP**", report)
        self.assertIn("asset.bin", report)
        self.assertIn("Binary assets were not inspected", report)
        self.assertIn("SHIP does not authorize release", report)
        self.assertIn("Binary assets were not inspected", (self.out / "review.html").read_text())
        self.assertEqual(self.git("status", "--porcelain", "--untracked-files=no"), "")

    def test_invalid_submission_preserves_prior_valid_output(self):
        job = self.jobs[0]
        value = self.draft(job)
        self.cli("run_jobs.py", "--job", job["label"], "--submit")
        output = self.repo / job["output"]
        prior = output.read_bytes()
        value["job_digest"] = "stale"
        self.save(f"agents/{job['label']}.draft.json", value)
        self.cli("run_jobs.py", "--job", job["label"], "--submit", expected=1)
        self.assertEqual(output.read_bytes(), prior)
        self.assertTrue((self.out / "runs" / f"{job['label']}.repair.md").exists())

    def test_global_validation_rejects_changed_inputs(self):
        for job in self.jobs:
            self.draft(job)
        self.cli("run_jobs.py", "--validate-only")
        self.write("data/events.json", '{"enabled": "changed"}\n')
        self.cli("run_jobs.py", "--validate-only", expected=3)
        self.cli("prepare_review.py", expected=3)

    def test_external_runner_flags_are_rejected(self):
        self.cli("run_jobs.py", "--command", "must-not-run {prompt}", expected=2)


if __name__ == "__main__":
    unittest.main()
