"""Standard-library qualification; no project or installed CLI required."""
import copy
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True

spec = importlib.util.spec_from_file_location("check_cli_docs", Path(__file__).with_name("check-cli-docs.py"))
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class ReviewTests(unittest.TestCase):
    def setUp(self):
        self.inventory = {"schemaVersion": 1, "checklistVersion": checker.CHECKLIST, "entries": [
            {"namespace": "demo", "id": id_, "descriptor": {"id": id_, "description": "Read a value", "options": [1, 2]}}
            for id_ in ("one", "two")]}
        self.review = checker.prepare(self.inventory, "task", "author")
        self.review["reviewedAt"] = "2026-10-26"
        self.review["evidence"] = {"shared": {"public": [
            {"namespace": "demo", "id": "one", "pointer": "/description", "value": "Read a value"}],
            "factual": "Demo contract, read operation: verified against the source."}}
        for entry in self.review["entries"]:
            entry["classification"] = "operational"
            entry["criteria"] = {cp: {"status": "conformant", "evidence": ["shared"]} for cp in checker.CRITERIA}

    def result(self):
        return checker.verify(self.inventory, self.review)

    def test_shared_evidence_and_individual_exception(self):
        self.assertEqual(self.result()["status"], "pass")
        self.review["entries"][1]["criteria"]["CP-11"] = {"status": "not_applicable", "reason": "No JavaScript input."}
        self.assertEqual(self.result()["status"], "pass")

    def test_invalid_rows(self):
        mutations = {
            "missing entry": lambda r: r["entries"].pop(),
            "extra entry": lambda r: r["entries"].append({**r["entries"][0], "id": "outside"}),
            "duplicate": lambda r: r["entries"].append(r["entries"][0]),
            "missing criterion": lambda r: r["entries"][0]["criteria"].pop("CP-03"),
            "unknown criterion": lambda r: r["entries"][0]["criteria"].update({"CP-21": {"status": "pending"}}),
            "pending": lambda r: r["entries"][0]["criteria"].update({"CP-03": {"status": "pending"}}),
            "unknown status": lambda r: r["entries"][0]["criteria"].update({"CP-03": {"status": "approved"}}),
            "empty reason": lambda r: r["entries"][0]["criteria"].update({"CP-03": {"status": "not_applicable", "reason": " "}}),
            "missing evidence": lambda r: r["evidence"].clear(),
            "empty factual": lambda r: r["evidence"]["shared"].update(factual=" "),
            "broken pointer": lambda r: r["evidence"]["shared"]["public"][0].update(pointer="/absent"),
            "broken public id": lambda r: r["evidence"]["shared"]["public"][0].update(id="absent"),
            "wrong public value": lambda r: r["evidence"]["shared"]["public"][0].update(value="changed"),
            "version": lambda r: r.update(schemaVersion=2),
            "checklist": lambda r: r.update(checklistVersion="old"),
        }
        for name, mutate in mutations.items():
            with self.subTest(name=name):
                review = copy.deepcopy(self.review)
                mutate(review)
                self.assertEqual(checker.verify(self.inventory, review)["status"], "fail")

    def test_complete_descriptor_and_stable_keys(self):
        descriptor = self.inventory["entries"][0]["descriptor"]
        self.assertEqual(checker.fingerprint(descriptor), checker.fingerprint(dict(reversed(list(descriptor.items())))))
        descriptor["options"].reverse()
        self.assertEqual(self.result()["status"], "fail")
        descriptor["options"].reverse()
        self.inventory["transport"] = {"cwd": "elsewhere"}
        self.assertEqual(self.result()["status"], "pass")

    def test_child_change_invalidates_container_and_preserves_unaffected_review(self):
        child = self.inventory["entries"][1]["descriptor"]
        self.inventory["entries"][0]["descriptor"]["fields"] = [copy.deepcopy(child)]
        self.review["entries"][0]["descriptorHash"] = checker.fingerprint(self.inventory["entries"][0]["descriptor"])
        retained = copy.deepcopy(self.review["entries"][0])
        child["description"] = "Changed"
        self.assertEqual([i["entry"] for i in self.result()["issues"]], ["demo/two"])
        self.assertEqual(self.review["entries"][0], retained)
        self.inventory["entries"][0]["descriptor"]["fields"] = [copy.deepcopy(child)]
        self.assertEqual({i["entry"] for i in self.result()["issues"]}, {"demo/one", "demo/two"})

    def test_invalid_inventory_and_preparation_without_approval(self):
        prepared = checker.prepare(self.inventory, "task", "author")
        self.assertTrue(all(c["status"] == "pending" for e in prepared["entries"] for c in e["criteria"].values()))
        self.assertEqual(checker.verify(self.inventory, prepared)["status"], "fail")
        for entries in ([], [self.inventory["entries"][0]] * 2):
            with self.assertRaises(ValueError):
                checker.verify({**self.inventory, "entries": entries}, self.review)

    def test_cli_files_and_read_only_verification_from_other_cwd(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            inventory, review = root/"inventory.json", root/"review.json"
            inventory.write_text(json.dumps(self.inventory))
            review.write_text(json.dumps(self.review))
            before = {p.name: p.read_bytes() for p in root.iterdir()}
            command = [sys.executable, str(Path(checker.__file__).resolve()), "verify", "--inventory", str(inventory), "--review", str(review)]
            result = subprocess.run(command, cwd=root, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual({p.name: p.read_bytes() for p in root.iterdir()}, before)
            self.assertNotEqual(subprocess.run(command+["--output", str(review)], capture_output=True).returncode, 0)
            review.write_text('{"entries": [], "entries": []}')
            self.assertNotEqual(subprocess.run(command, capture_output=True).returncode, 0)
            review.write_text('invalid')
            self.assertNotEqual(subprocess.run(command, capture_output=True).returncode, 0)
            review.unlink()
            self.assertNotEqual(subprocess.run(command, capture_output=True).returncode, 0)


if __name__ == "__main__":
    unittest.main()
