#!/usr/bin/env python3
"""CLI contract: incomplete runs never claim clean; commands preserve argv.

Runs only disposable fixture commands, not a project suite or an agent eval.
"""
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

HELPER = Path(__file__).with_name("find-polluter.sh").resolve()


class PolluterTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="loki-polluter-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "tests with spaces").mkdir()
        self.test_file = self.root / "tests with spaces" / "case one.test"
        self.test_file.write_text("fixture")

    def run_helper(self, code="pass", *, pattern="./tests with spaces/*.test", env=None):
        return subprocess.run(
            ["bash", str(HELPER), "unexpected output", pattern, "--", sys.executable, "-c", code],
            cwd=self.root, env=env, capture_output=True, text=True, timeout=10,
        )

    def test_clean_selection_preserves_path_and_literal_arguments(self):
        result = self.run_helper(
            "import sys; from pathlib import Path; "
            "assert sys.argv[1] == './tests with spaces/case one.test'; "
            "assert Path(sys.argv[1]).read_text() == 'fixture'"
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("1 successful commands", result.stdout)

    def test_contamination_is_retained_even_when_command_fails(self):
        for status in (0, 7):
            with self.subTest(status=status):
                result = self.run_helper(
                    "from pathlib import Path; "
                    f"Path('unexpected output').write_text('evidence'); raise SystemExit({status})"
                )
                self.assertEqual(result.returncode, 1, result.stderr)
                self.assertIn(f"command exit {status}", result.stdout)
                target = self.root / "unexpected output"
                self.assertEqual(target.read_text(), "evidence")
                target.unlink()

    def test_failed_command_is_incomplete(self):
        result = self.run_helper("raise SystemExit(9)")
        self.assertEqual(result.returncode, 2)
        self.assertIn("exit 9", result.stderr)
        self.assertNotIn("No contamination observed", result.stdout)

    def test_empty_selection_is_incomplete(self):
        result = self.run_helper(pattern="./missing/*.test")
        self.assertEqual(result.returncode, 2)
        self.assertIn("No tests matched", result.stderr)

    def test_existing_target_or_broken_symlink_is_not_removed(self):
        target = self.root / "unexpected output"
        for symlink in (False, True):
            with self.subTest(symlink=symlink):
                if symlink:
                    target.symlink_to("missing")
                else:
                    target.write_text("original")
                result = self.run_helper("raise AssertionError('must not execute')")
                self.assertEqual(result.returncode, 2)
                self.assertTrue(os.path.lexists(target))
                self.assertIn("already exists", result.stderr)
                target.unlink()

    def test_failed_discovery_is_not_a_clean_run(self):
        bin_dir = self.root / "bin"
        bin_dir.mkdir()
        find = bin_dir / "find"
        find.write_text("#!/bin/sh\nexit 1\n")
        find.chmod(0o755)
        result = self.run_helper(env={**os.environ, "PATH": f"{bin_dir}:{os.environ['PATH']}"})
        self.assertEqual(result.returncode, 2)
        self.assertIn("discovery failed", result.stderr)

    def test_shell_metacharacters_in_test_name_are_literal(self):
        self.test_file.rename(self.test_file.with_name("$(touch injected).test"))
        result = self.run_helper("import sys; assert sys.argv[1].endswith('$(touch injected).test')")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertFalse((self.root / "injected").exists())


if __name__ == "__main__":
    unittest.main()
