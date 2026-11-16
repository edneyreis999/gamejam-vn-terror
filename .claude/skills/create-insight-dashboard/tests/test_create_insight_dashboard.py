"""Behavior checks for the create-insight-dashboard scripts, on synthetic fixtures only."""

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"
sys.path.insert(0, str(SCRIPTS))

import build_dashboard_data as bdd  # noqa: E402
import collect_project_facts as facts  # noqa: E402
import validate_insights as vi  # noqa: E402


def run(script, *args, check=True):
    result = subprocess.run([sys.executable, "-B", str(SCRIPTS / script), *map(str, args)], capture_output=True, text=True)
    if check and result.returncode:
        raise AssertionError(f"{script} failed: {result.stderr}")
    return result


def git(repo, *args):
    subprocess.run(["git", "-C", str(repo), *args], check=True, capture_output=True)


def activity(aid, session, task, category, start, end, state="active"):
    return {"id": aid, "session": session, "task": task, "category": category, "state": state,
            "start": f"2026-01-01T00:{start:02d}:00Z", "end": f"2026-01-01T00:{end:02d}:00Z"}


def token(session, activities, total, cached=0, attribution="interval", minute=5):
    return {"session": session, "activities": activities, "attribution": attribution, "inclusion": "unknown",
            "source": {"timestamp": f"2026-01-01T00:{minute:02d}:00Z"},
            "delta": {"input_tokens": total, "cached_input_tokens": cached, "output_tokens": 0,
                      "reasoning_output_tokens": 0, "total_tokens": total}}


def query(activities, tokens):
    by_task, by_activity = {}, {}
    for a in activities:
        by_task.setdefault(a["task"] or "(spec)", {"activities": [], "declared_seconds": 0, "unknown_duration_count": 0})["activities"].append(a["id"])
        by_activity.setdefault(a["category"], {"activities": [], "declared_seconds": 0})["activities"].append(a["id"])
    return {
        "activities": activities, "tokens": tokens, "commands": [], "by_session": {"coord": {}, "sub": {}},
        "time": {"elapsed_seconds": 600}, "findings": [], "finding_links": [], "gaps": [], "collection": [],
        "defect_counts": {"delivery": {}, "persona": {}}, "hierarchy_total_exact": False,
        "by_task": by_task, "by_activity": by_activity, "published_file_count": 1, "effective_record_count": 1,
    }


RAW = {"acceptance": [], "quality": [], "finding": [], "collector_versions": {}}
MANIFEST = {"coordinator_session": "coord", "metrics": {"available": True, "reason": None}}


class TaskGraph(unittest.TestCase):
    def test_frontmatter_edges(self):
        text = "---\ngraph:\n  nodes:\n    - id: task_01\n    - id: task_02\n    - id: task_03\n  edges:\n" \
               "    - from: task_01\n      to: task_02\n    - from: task_01\n      to: task_03\n---\n# Tasks\n"
        deps, source = facts.parse_graph(text)
        self.assertEqual(source, "frontmatter")
        shape = facts.graph_shape(deps)
        self.assertEqual((shape["tasks"], shape["max_level_width"], shape["strict_linear_chain"]), (3, 2, False))

    def test_depends_on_column(self):
        text = "| # | Task | Depends on | Status |\n| -- | -- | -- | -- |\n| 01 | a | — | done |\n| 02 | b | 01 | done |\n"
        deps, source = facts.parse_graph(text)
        self.assertEqual((source, deps), ("table", {"task_01": [], "task_02": ["task_01"]}))
        self.assertTrue(facts.graph_shape(deps)["strict_linear_chain"])


class Aggregation(unittest.TestCase):
    def test_tokens_stay_mixed_across_tasks(self):
        acts = [activity("a1", "coord", "task_01.md", "implementation", 0, 5),
                activity("a2", "coord", "task_02.md", "verification", 5, 10)]
        data = bdd.build(query(acts, [token("coord", ["a1"], 100), token("coord", ["a1", "a2"], 50, attribution="mixed"),
                                      token("coord", [], 7, attribution="unattributed")]), MANIFEST, RAW, 24)
        tasks = {t["task"]: t for t in data["tasks"]}
        self.assertEqual(tasks["T01"]["tokens"]["total"], 100)
        self.assertEqual(tasks["T02"]["tokens"]["total"], 0)
        self.assertEqual(data["quality"]["task_attribution"]["mixed"]["total"], 50)
        self.assertEqual(data["quality"]["task_attribution"]["unattributed"]["total"], 7)
        self.assertEqual(data["kpis"]["tokens"]["total"], 157)
        self.assertTrue(all(b["available"] for k, b in data["blocks"].items() if k not in ("g5", "g6")))
        self.assertFalse(data["blocks"]["g5"]["available"])

    def test_timeline_folds_lanes_beyond_limit(self):
        acts = [activity(f"s{i}", "sub", "task_01.md", "verification", 0, 10) for i in range(4)]
        data = bdd.build(query(acts, []), MANIFEST, RAW, 2)
        timeline = data["timeline"]
        self.assertEqual((timeline["subagent_lanes_total"], timeline["subagent_lanes"]), (4, 2))
        self.assertEqual(timeline["aggregated_lane"], 1)
        self.assertEqual(max(b["lane"] for b in timeline["bars"]), 1)


class WithoutMetrics(unittest.TestCase):
    def test_spec_without_records_marks_every_chart_unavailable(self):
        with tempfile.TemporaryDirectory() as tmp:
            project, work = Path(tmp, "game"), Path(tmp, "work")
            (project / "specs" / "001-x").mkdir(parents=True)
            (project / "specs" / "001-x" / "_spec.md").write_text("# Thing\n")
            run("prepare.py", "--project", project, "--spec", "specs/001-x", "--workdir", work)
            data = json.loads((work / "dashboard-data.json").read_text())
            self.assertFalse(data["metrics"]["available"])
            self.assertEqual(data["source"]["title"], "Thing")
            self.assertTrue(all(not b["available"] and b["reason"] for b in data["blocks"].values()))
            self.assertFalse(json.loads((work / "sessions.json").read_text())["available"])
            self.assertEqual(list(project.rglob("*.json")), [])


class Validator(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        base = Path(self.tmp.name)
        self.project, self.work, self.other = base / "game", base / "work", base / "inventories"
        for d in (self.project / "docs", self.work, self.other):
            d.mkdir(parents=True)
        (self.project / "docs" / "guide.md").write_text("line one\nline two\n")
        (self.other / "inv.md").write_text("| E1 | error |\n")
        git(self.project, "init", "-q")
        git(self.project, "-c", "user.email=t@t", "-c", "user.name=t", "add", ".")
        git(self.project, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "init")
        (self.work / "manifest.json").write_text(json.dumps({"project": str(self.project)}))
        (self.work / "dashboard-data.json").write_text(json.dumps(
            {"kpis": {"commands": 3}, "findings": {"list": [{"finding": "F-1", "task": "T01"}]}}))
        (self.work / "sessions.json").write_text(json.dumps({"skill_reads": [{"skill": "a", "reads": 2}]}))
        self.roots = vi.Roots({"project": self.project, "inventories": self.other})
        self.sources = {"dashboard": json.loads((self.work / "dashboard-data.json").read_text()),
                        "sessions": json.loads((self.work / "sessions.json").read_text())}

    def tearDown(self):
        self.tmp.cleanup()

    def item(self, **extra):
        return {"change_kind": "observation", "insight": "i", "impact": "m", "recommendation": "r", "confidence": "high",
                "evidence": [{"kind": "file", "path": "docs/guide.md", "line": 2, "label": "guide"}], **extra}

    def insights(self, item=None, **extra):
        topics = [{"id": t, "title": t, "status": "none"} for t in vi.TOPICS]
        if item is not None:
            topics[0] = {"id": vi.TOPICS[0], "title": "t", "status": "insight", "items": [item]}
        return {"scope": "synthetic", "topics": topics, "no_change": [], "pending": [], **extra}

    def errors(self, doc):
        return vi.validate(doc, self.sources, self.roots)[0]

    def strict_item(self, **overrides):
        item = self.item(
            change_kind="instruction", priority={"selected": True, "rationale": "why"},
            guidance={"state": "absent", "summary": "s", "version": "HEAD",
                      "evidence": [{"kind": "git", "rev": "HEAD", "path": "docs/guide.md", "line": 1, "label": "g"}]},
            alternatives=[{"option": o, "loses": "x", "judgment": "y", "recommended": o == "minimal"} for o in ("keep", "remove", "minimal")],
            destination="general_skill", evaluation={f: "x" for f in vi.EVALUATION_FIELDS},
            proposed_text={"target": "docs/guide.md", "base": {"rev": "HEAD", "path": "docs/guide.md"}, "format": "diff", "text": "+x"})
        item.update(overrides)
        return item

    def test_valid_document_resolves_every_kind(self):
        item = self.strict_item(evidence=[
            {"kind": "file", "path": "docs/guide.md", "line": 2, "label": "f"},
            {"kind": "file", "root": "inventories", "path": "inv.md", "line": 1, "label": "inv"},
            {"kind": "data", "source": "dashboard", "path": "kpis.commands", "label": "d"},
            {"kind": "data", "source": "sessions", "path": "skill_reads[skill=a].reads", "label": "s"},
            {"kind": "finding", "label": "F-1"},
            {"kind": "git", "rev": "HEAD", "path": "docs/guide.md", "line": 2, "label": "g",
             "same_as": {"path": "docs/guide.md"}}])
        doc = self.insights(item)
        self.assertEqual(self.errors(doc), [])
        evidence = doc["topics"][0]["items"][0]["evidence"]
        self.assertEqual((evidence[0]["excerpt"], evidence[2]["value"], evidence[3]["value"]), ("line two", 3, 2))

    def test_broken_citations_are_refused(self):
        cases = {
            "missing file": {"kind": "file", "path": "docs/nope.md", "line": 1, "label": "x"},
            "missing line": {"kind": "file", "path": "docs/guide.md", "line": 9, "label": "x"},
            "absolute path": {"kind": "file", "path": str(self.project / "docs/guide.md"), "line": 1, "label": "x"},
            "leaves root": {"kind": "file", "path": "../inventories/inv.md", "line": 1, "label": "x"},
            "unknown root": {"kind": "file", "root": "elsewhere", "path": "inv.md", "line": 1, "label": "x"},
            "missing data": {"kind": "data", "source": "dashboard", "path": "kpis.nope", "label": "x"},
            "missing finding": {"kind": "finding", "label": "F-404"},
            "missing git rev": {"kind": "git", "rev": "deadbeef", "path": "docs/guide.md", "line": 1, "label": "x"},
        }
        for name, evidence in cases.items():
            with self.subTest(name):
                self.assertNotEqual(self.errors(self.insights(self.item(evidence=[evidence]))), [])

    def test_instruction_change_needs_conditional_fields(self):
        for field in ("guidance", "alternatives", "destination", "evaluation", "proposed_text", "priority"):
            with self.subTest(field):
                item = self.strict_item()
                del item[field]
                self.assertTrue(any(field.split("_")[0] in e for e in self.errors(self.insights(item))), field)

    def test_misapplied_guidance_needs_reading_evidence(self):
        item = self.strict_item()
        item["guidance"]["state"] = "misapplied"
        self.assertTrue(any("reading" in e for e in self.errors(self.insights(item))))

    def test_every_topic_once(self):
        doc = self.insights()
        doc["topics"].pop()
        self.assertTrue(any("appears 0 times" in e for e in self.errors(doc)))

    def test_cli_merges_fragments_and_writes_only_valid_output(self):
        frag = self.work / "fragments"
        frag.mkdir()
        doc = self.insights(self.item())
        for lens, ids in vi.LENSES.items():
            (frag / f"{lens}.json").write_text(json.dumps({"lens": lens, "topics": [t for t in doc["topics"] if t["id"] in ids]}))
        draft = self.work / "draft.json"
        run("validate_insights.py", "--workdir", self.work, "--fragments", frag, "--draft", draft)
        merged = json.loads(draft.read_text())
        self.assertEqual([t["id"] for t in merged["topics"]], vi.TOPICS)
        merged["scope"] = "synthetic"
        draft.write_text(json.dumps(merged))
        out = self.work / "out"
        run("validate_insights.py", "--workdir", self.work, "--root", f"inventories={self.other}", "--insights", draft, "--out", out)
        written = json.loads((out / "insights.json").read_text())
        self.assertEqual(written["roots"], ["inventories", "project"])
        self.assertNotIn(str(self.project), json.dumps(written))
        merged["topics"][0]["items"][0]["evidence"][0]["line"] = 99
        draft.write_text(json.dumps(merged))
        (out / "insights.json").unlink()
        self.assertEqual(run("validate_insights.py", "--workdir", self.work, "--insights", draft, "--out", out, check=False).returncode, 1)
        self.assertFalse((out / "insights.json").exists())


class Render(unittest.TestCase):
    def test_both_languages_embed_every_payload(self):
        with tempfile.TemporaryDirectory() as tmp:
            work, out = Path(tmp, "work"), Path(tmp, "game", "spec", "insight-dashboard")
            work.mkdir()
            out.mkdir(parents=True)
            (work / "manifest.json").write_text(json.dumps({"project": str(Path(tmp, "game"))}))
            (work / "dashboard-data.json").write_text(json.dumps({"source": {"title": "</script>x"}, "metrics": {"available": False, "reason": "r"}, "blocks": {}}))
            for lang in ("en", "pt-BR"):
                with self.subTest(lang):
                    run("render_dashboard.py", "--workdir", work, "--out", out, "--lang", lang)
                    html = (out / "index.html").read_text()
                    self.assertNotIn("/*__", html)
                    self.assertIn(f'"lang":"{lang}"', html)
                    self.assertIn('"link_base":"../../"', html)
                    self.assertNotIn("</script>x", html)


if __name__ == "__main__":
    unittest.main()
